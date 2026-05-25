import 'server-only'
import nodemailer, { type Transporter } from 'nodemailer'

/**
 * Lazily-instantiated singleton SMTP transporter.
 *
 * `pool: true` keeps a small set of TCP connections warm and reuses them
 * across messages — under a burst of submissions we don't open a new socket
 * per email, we just pipeline through the pool.
 *
 * `maxConnections` + `maxMessages` are the per-process throttle. The job
 * queue ([[queue.ts]]) adds an application-level concurrency cap on top so
 * that retries also respect these limits.
 *
 * Tuning notes:
 *  - Hotmail / Outlook personal: ~10–30 msg/min sustained. Keep
 *    SMTP_POOL_MAX low (3–5).
 *  - Microsoft 365 business: 30 msg/min, 10k/day.
 *  - Brevo / SES / Resend: hundreds–thousands/sec. Raise the pool to 10+.
 *
 * Switching providers later is a one-line .env change — no code edits.
 */

declare global {
  // eslint-disable-next-line no-var
  var __mailTransporter: { sig: string; t: Transporter } | undefined
}

function envSig(): string {
  // Any change to these values invalidates the cached transporter.
  return [
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_USER,
    process.env.SMTP_PASS,
    process.env.SMTP_POOL_MAX,
  ].join('|')
}

function build(): Transporter {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error(
      '[mail] SMTP_HOST / SMTP_USER / SMTP_PASS must be set in .env.local',
    )
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,                          // 465 = implicit TLS, anything else = STARTTLS where available
    requireTLS: port === 587,                      // only enforce on the standard submission port
    auth: { user, pass },
    pool: true,
    maxConnections: Number(process.env.SMTP_POOL_MAX ?? 4),
    maxMessages: 100,                              // recycle each connection after 100 sends
    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
    socketTimeout: 30_000,
  })
}

export function getTransporter(): Transporter {
  // Cache on globalThis so Next.js dev hot-reload doesn't leak transporters,
  // but rebuild whenever the SMTP env vars change so .env.local edits take
  // effect on the next request without needing a server restart.
  const sig = envSig()
  if (!globalThis.__mailTransporter || globalThis.__mailTransporter.sig !== sig) {
    if (globalThis.__mailTransporter) {
      try { globalThis.__mailTransporter.t.close() } catch { /* ignore */ }
    }
    globalThis.__mailTransporter = { sig, t: build() }
  }
  return globalThis.__mailTransporter.t
}

export const MAIL_FROM =
  process.env.MAIL_FROM ?? `"Chemist India" <${process.env.SMTP_USER}>`

export const MAIL_TO_INTERNAL =
  process.env.MAIL_TO_INTERNAL ?? 'indiachemist@hotmail.com'
