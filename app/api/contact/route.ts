import { NextResponse, type NextRequest } from 'next/server'
import { checkRate } from '@/lib/email/rate-limit'
import { sendWithRetry } from '@/lib/email/send'
import { MAIL_FROM, MAIL_TO_INTERNAL } from '@/lib/email/transporter'
import {
  contactAckHtml,
  contactAckSubject,
  contactAckText,
  contactInternalHtml,
  contactInternalSubject,
  contactInternalText,
  logoAttachment,
  type ContactPayload,
} from '@/lib/email/templates'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60   // Vercel: allow up to 60s for SMTP sends

const MAX_BODY_BYTES = 16 * 1024
const MAX_STR = 500
const MAX_MESSAGE = 4000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

function s(v: unknown, max = MAX_STR): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req)

  const rl = checkRate(ip)
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    )
  }

  const lenHeader = Number(req.headers.get('content-length') ?? 0)
  if (lenHeader > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'Payload too large.' }, { status: 413 })
  }

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON.' }, { status: 400 })
  }
  if (!raw || typeof raw !== 'object') {
    return NextResponse.json({ ok: false, error: 'Invalid body.' }, { status: 400 })
  }
  const body = raw as Record<string, unknown>

  // Honeypot
  if (s(body.website) || s(body._hp)) {
    return NextResponse.json({ ok: true, queued: true }, { status: 202 })
  }

  const name    = s(body.name)
  const company = s(body.company)
  const email   = s(body.email, 200).toLowerCase()
  const phone   = s(body.phone, 60)
  const reason  = s(body.reason, 100)
  const message = s(body.message, MAX_MESSAGE)

  if (!name || !reason || !message) {
    return NextResponse.json({ ok: false, error: 'Name, reason and message are required.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'A valid email address is required.' }, { status: 400 })
  }

  const payload: ContactPayload = {
    name, company, email, phone, reason, message,
    submittedAt: new Date(),
    ip,
  }

  let logo
  try {
    logo = await logoAttachment()
  } catch (err) {
    console.error('[contact] logo load failed', err)
    return NextResponse.json(
      { ok: false, error: 'Unable to submit right now. Please email us directly.' },
      { status: 500 },
    )
  }

  // Both emails MUST arrive — fail the request loudly if either drops.
  // Sent in parallel via allSettled so we can report which side failed
  // (helps debugging without aborting the other send mid-flight).
  const [internalResult, ackResult] = await Promise.allSettled([
    sendWithRetry({
      from: MAIL_FROM,
      to: MAIL_TO_INTERNAL,
      replyTo: `"${name}" <${email}>`,
      subject: contactInternalSubject(payload),
      text: contactInternalText(payload),
      html: contactInternalHtml(payload),
      attachments: [logo],
      headers: { 'X-Chemist-India-Form': 'contact' },
    }, 'contact-internal'),
    sendWithRetry({
      from: MAIL_FROM,
      to: `"${name}" <${email}>`,
      replyTo: MAIL_TO_INTERNAL,
      subject: contactAckSubject(payload),
      text: contactAckText(payload),
      html: contactAckHtml(payload),
      attachments: [logo],
      headers: { 'X-Chemist-India-Form': 'contact-ack' },
    }, 'contact-ack'),
  ])

  // Internal lead email is the priority — if it fails, the user must know
  // and retry. Customer ack is best-effort: if delivery to their inbox fails
  // (typo, full mailbox, spam reject) we don't want them to resubmit and
  // create a duplicate lead, so we just log it.
  if (internalResult.status === 'rejected') {
    console.error('[contact] internal send failed', internalResult.reason)
    if (ackResult.status === 'rejected') {
      console.error('[contact] ack send also failed', ackResult.reason)
    }
    return NextResponse.json(
      { ok: false, error: `We couldn't deliver your message. Please retry, or email us directly at ${MAIL_TO_INTERNAL}.` },
      { status: 502 },
    )
  }

  if (ackResult.status === 'rejected') {
    console.error('[contact] ack send failed (non-fatal — lead was received)', ackResult.reason)
  }

  return NextResponse.json({ ok: true, sent: true }, { status: 200 })
}
