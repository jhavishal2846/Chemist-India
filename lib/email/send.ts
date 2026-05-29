import 'server-only'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import { getTransporter } from './transporter'

/**
 * Synchronous email sender called inline from route handlers. The HTTP
 * response is held until this resolves — callers depend on the thrown
 * error to surface failures back to the user.
 *
 * Retries on transient SMTP failures (network errors, 4xx, and rate-limit
 * 5xx responses like Mailtrap's "Too many emails per second"). Permanent
 * 5xx (auth, bad recipient, etc.) abort on first failure — retrying just
 * gets you greylisted.
 *
 * Route handlers set `maxDuration = 60` on Vercel. MAX_ATTEMPTS=5 with
 * exponential backoff capped at 2s gives us at most ~12s of waiting,
 * well inside the budget.
 */

const MAX_ATTEMPTS = 5
const BASE_BACKOFF_MS = 400

function isPermanent(err: unknown): boolean {
  const e = err as { responseCode?: number; response?: string }
  if (typeof e?.responseCode !== 'number') return false
  if (e.responseCode >= 400 && e.responseCode < 500) return false
  if (e.responseCode >= 500 && e.responseCode < 600) {
    const resp = (e.response ?? '').toLowerCase()
    if (/too many|rate limit|throttl|try again|temporarily|quota|exceed/.test(resp)) {
      return false
    }
    return true
  }
  return false
}

function errDetail(e: unknown): string {
  const err = e as {
    message?: string; code?: string; command?: string;
    response?: string; responseCode?: number;
  }
  const parts: string[] = []
  if (err?.code) parts.push(`code=${err.code}`)
  if (typeof err?.responseCode === 'number') parts.push(`responseCode=${err.responseCode}`)
  if (err?.command) parts.push(`command=${err.command}`)
  if (err?.response) parts.push(`response="${String(err.response).replace(/\s+/g, ' ').slice(0, 300)}"`)
  if (err?.message) parts.push(`message="${err.message.slice(0, 300)}"`)
  return parts.length ? parts.join(' ') : String(e)
}

function fmtTo(to: unknown): string {
  if (typeof to === 'string') return to
  if (Array.isArray(to)) return to.map(String).join(',')
  return String(to ?? '')
}

const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

export async function sendWithRetry(
  mail: SMTPTransport.MailOptions,
  label = 'mail',
): Promise<void> {
  const to = fmtTo(mail.to)
  const t0 = Date.now()
  let attempt = 0

  while (attempt < MAX_ATTEMPTS) {
    attempt++
    try {
      const info = await getTransporter().sendMail(mail)
      console.log(
        `[${label}] sent attempt=${attempt} messageId=${info.messageId} ` +
        `waitMs=${Date.now() - t0} to=${to}`,
      )
      return
    } catch (err) {
      const permanent = isPermanent(err)
      const giveUp = permanent || attempt >= MAX_ATTEMPTS
      const detail = errDetail(err)

      if (giveUp) {
        console.error(
          `[${label}] failed attempt=${attempt} permanent=${permanent} ` +
          `to=${to} :: ${detail}`,
        )
        // Throw so the caller can surface the failure to the user.
        // Previously this swallowed the error and returned, which silently
        // dropped failed sends — defeating any "must succeed" guarantee.
        throw err instanceof Error ? err : new Error(detail)
      }

      const backoff = Math.min(2_000, BASE_BACKOFF_MS * 2 ** (attempt - 1))
      console.warn(
        `[${label}] retry attempt=${attempt} backoffMs=${backoff} ` +
        `to=${to} :: ${detail}`,
      )
      await sleep(backoff)
    }
  }
}
