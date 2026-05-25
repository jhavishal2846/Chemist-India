import 'server-only'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import { getTransporter } from './transporter'

/**
 * Process-local async email queue.
 *
 * Goals:
 *   1. The HTTP request returns *immediately* after `enqueue()` — the user
 *      never waits for SMTP.
 *   2. A burst of submissions cannot open more than N concurrent SMTP
 *      sessions (provider throttling protection).
 *   3. Transient SMTP failures (4xx, ECONNRESET, ETIMEDOUT) are retried
 *      with exponential backoff. Permanent failures (5xx) are logged and
 *      dropped — retrying them just gets you greylisted.
 *
 * Scope: single-process. For multi-instance deployments (e.g., several
 * Vercel/Node containers behind a load balancer), each instance has its
 * own queue — that's fine because they all drain into the same SMTP
 * server. For *durable* delivery across restarts you'd swap this for
 * BullMQ + Redis or a managed queue (QStash, SQS). The public
 * `enqueue` API would stay identical.
 */

type Mail = SMTPTransport.MailOptions

interface Job {
  id: string
  mail: Mail
  attempts: number
  enqueuedAt: number
}

const MAX_ATTEMPTS = 5
const MAX_QUEUE_SIZE = 10_000              // hard ceiling — prevents OOM under attack
// Default concurrency = 1: serialised sends are safe with every provider
// (Hotmail/Gmail/Mailtrap sandbox all rate-limit aggressively). Raise via
// MAIL_QUEUE_CONCURRENCY for SES/Brevo/SendGrid where high throughput is fine.
const CONCURRENCY = Math.max(1, Number(process.env.MAIL_QUEUE_CONCURRENCY ?? 1))

class EmailQueue {
  private q: Job[] = []
  private active = 0
  private totalEnqueued = 0
  private totalSent = 0
  private totalFailed = 0

  enqueue(mail: Mail): { id: string; queued: boolean } {
    if (this.q.length >= MAX_QUEUE_SIZE) {
      // Backpressure — refuse to grow unbounded. Caller still returns 202
      // to the user (we don't want to leak this), but we log it.
      console.error('[mail-queue] full, dropping job', { size: this.q.length })
      return { id: '', queued: false }
    }
    const id = `m_${Date.now().toString(36)}_${(++this.totalEnqueued).toString(36)}`
    this.q.push({ id, mail, attempts: 0, enqueuedAt: Date.now() })
    // Fire-and-forget. Drain runs on the event loop's next tick.
    queueMicrotask(() => this.drain())
    return { id, queued: true }
  }

  stats() {
    return {
      pending: this.q.length,
      active: this.active,
      totalEnqueued: this.totalEnqueued,
      totalSent: this.totalSent,
      totalFailed: this.totalFailed,
    }
  }

  private drain() {
    while (this.active < CONCURRENCY && this.q.length > 0) {
      const job = this.q.shift()!
      this.active++
      void this.process(job)
    }
  }

  private async process(job: Job): Promise<void> {
    job.attempts++
    try {
      const info = await getTransporter().sendMail(job.mail)
      this.totalSent++
      console.log(
        `[mail-queue] sent id=${job.id} attempt=${job.attempts} ` +
        `messageId=${info.messageId} waitMs=${Date.now() - job.enqueuedAt} to=${fmtTo(job.mail.to)}`,
      )
    } catch (err) {
      const isPermanent = this.isPermanent(err)
      const detail = errDetail(err)
      if (!isPermanent && job.attempts < MAX_ATTEMPTS) {
        const backoff = Math.min(30_000, 500 * 2 ** (job.attempts - 1))
        console.warn(
          `[mail-queue] retry id=${job.id} attempt=${job.attempts} ` +
          `backoffMs=${backoff} to=${fmtTo(job.mail.to)} :: ${detail}`,
        )
        setTimeout(() => {
          this.q.unshift(job)        // retry goes to front — preserve order
          this.drain()
        }, backoff).unref()
      } else {
        this.totalFailed++
        console.error(
          `[mail-queue] dropped id=${job.id} attempt=${job.attempts} ` +
          `permanent=${isPermanent} to=${fmtTo(job.mail.to)} :: ${detail}`,
        )
      }
    } finally {
      this.active--
      this.drain()
    }
  }

  private isPermanent(err: unknown): boolean {
    const e = err as { responseCode?: number; code?: string; response?: string }
    // Network / no SMTP response = transient.
    if (typeof e?.responseCode !== 'number') return false
    // 4xx = transient by spec.
    if (e.responseCode >= 400 && e.responseCode < 500) return false
    // 5xx is *usually* permanent, but rate-limit responses (e.g. Mailtrap's
    // 550 "Too many emails per second", Gmail's 421/452 "Try again later")
    // should be retried — they clear on their own with backoff.
    if (e.responseCode >= 500 && e.responseCode < 600) {
      const resp = (e.response ?? '').toLowerCase()
      if (/too many|rate limit|throttl|try again|temporarily|quota|exceed/.test(resp)) {
        return false
      }
      return true
    }
    return false
  }
}

function fmtTo(to: unknown): string {
  if (typeof to === 'string') return to
  if (Array.isArray(to)) return to.map(String).join(',')
  return String(to ?? '')
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

// Bump this string whenever the EmailQueue class shape changes — dev hot-reload
// will discard the stale singleton on the next `getQueue()` call.
const QUEUE_VERSION = '2026-05-25.3'

declare global {
  // eslint-disable-next-line no-var
  var __mailQueue: { version: string; q: EmailQueue } | undefined
}

export function getQueue(): EmailQueue {
  if (!globalThis.__mailQueue || globalThis.__mailQueue.version !== QUEUE_VERSION) {
    globalThis.__mailQueue = { version: QUEUE_VERSION, q: new EmailQueue() }
  }
  return globalThis.__mailQueue.q
}

