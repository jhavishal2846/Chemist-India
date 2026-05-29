import { NextResponse, type NextRequest } from 'next/server'
import { checkRate } from '@/lib/email/rate-limit'
import { sendWithRetry } from '@/lib/email/send'
import { MAIL_FROM, MAIL_TO_INTERNAL } from '@/lib/email/transporter'
import {
  enquiryAckHtml,
  enquiryAckSubject,
  enquiryAckText,
  enquiryInternalHtml,
  enquiryInternalSubject,
  enquiryInternalText,
  logoAttachment,
  type EnquiryPayload,
  type EnquiryRow,
} from '@/lib/email/templates'

export const runtime = 'nodejs'         // nodemailer needs Node APIs, not Edge
export const dynamic = 'force-dynamic'  // never cache POST responses
export const maxDuration = 60           // Vercel: allow up to 60s for SMTP sends

const MAX_BODY_BYTES = 32 * 1024
const MAX_ROWS = 50
const MAX_STR = 500
const MAX_REMARKS = 4000
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

  // 1. Rate-limit before doing any work.
  const rl = checkRate(ip)
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    )
  }

  // 2. Bounded body read — refuse pathologically large payloads early.
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

  // 3. Honeypot — silent bot trap. Real submissions never fill this.
  if (s(body.website) || s(body._hp)) {
    // Pretend success; don't tip off the bot.
    return NextResponse.json({ ok: true, queued: true }, { status: 202 })
  }

  // 4. Validate + normalise.
  const name    = s(body.name)
  const company = s(body.company)
  const email   = s(body.email, 200).toLowerCase()
  const phone   = s(body.phone, 60)
  const country = s(body.country, 100)
  const remarks = s(body.remarks, MAX_REMARKS)

  if (!name || !company || !country) {
    return NextResponse.json({ ok: false, error: 'Name, company and country are required.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'A valid email address is required.' }, { status: 400 })
  }

  const rawRows = Array.isArray(body.rows) ? body.rows : []
  const rows: EnquiryRow[] = rawRows
    .slice(0, MAX_ROWS)
    .map((r): EnquiryRow => {
      const o = (r ?? {}) as Record<string, unknown>
      return {
        product: s(o.product, 200),
        cas:     s(o.cas, 60),
        qty:     s(o.qty, 30),
        unit:    s(o.unit, 10) || 'kg',
        grade:   s(o.grade, 80),
      }
    })
    .filter(r => r.product.length > 0)

  if (rows.length === 0) {
    return NextResponse.json({ ok: false, error: 'Please include at least one product.' }, { status: 400 })
  }

  const payload: EnquiryPayload = {
    name, company, email, phone, country, remarks, rows,
    submittedAt: new Date(),
    ip,
  }

  // 5. Read the logo synchronously (must happen before the response is sent —
  // the file read uses cwd which may not be available inside after()).
  let logo
  try {
    logo = await logoAttachment()
  } catch (err) {
    console.error('[enquiry] logo load failed', err)
    return NextResponse.json(
      { ok: false, error: 'Unable to submit right now. Please email us directly.' },
      { status: 500 },
    )
  }

  // 6. Both emails MUST arrive — fail the request loudly if either drops.
  //    Sent in parallel via allSettled so we can report which side failed
  //    (helps debugging without aborting the other send mid-flight).
  const [internalResult, ackResult] = await Promise.allSettled([
    sendWithRetry({
      from: MAIL_FROM,
      to: MAIL_TO_INTERNAL,
      replyTo: `"${name}" <${email}>`,
      subject: enquiryInternalSubject(payload),
      text: enquiryInternalText(payload),
      html: enquiryInternalHtml(payload),
      attachments: [logo],
      headers: { 'X-Chemist-India-Form': 'enquiry' },
    }, 'enquiry-internal'),
    sendWithRetry({
      from: MAIL_FROM,
      to: `"${name}" <${email}>`,
      replyTo: MAIL_TO_INTERNAL,
      subject: enquiryAckSubject(payload),
      text: enquiryAckText(payload),
      html: enquiryAckHtml(payload),
      attachments: [logo],
      headers: { 'X-Chemist-India-Form': 'enquiry-ack' },
    }, 'enquiry-ack'),
  ])

  // Internal lead email is the priority — if it fails, the user must know
  // and retry. Customer ack is best-effort: if delivery to their inbox fails
  // (typo, full mailbox, spam reject) we don't want them to resubmit and
  // create a duplicate lead, so we just log it.
  if (internalResult.status === 'rejected') {
    console.error('[enquiry] internal send failed', internalResult.reason)
    if (ackResult.status === 'rejected') {
      console.error('[enquiry] ack send also failed', ackResult.reason)
    }
    return NextResponse.json(
      { ok: false, error: `We couldn't deliver your enquiry. Please retry, or email us directly at ${MAIL_TO_INTERNAL}.` },
      { status: 502 },
    )
  }

  if (ackResult.status === 'rejected') {
    console.error('[enquiry] ack send failed (non-fatal — lead was received)', ackResult.reason)
  }

  return NextResponse.json({ ok: true, sent: true }, { status: 200 })
}
