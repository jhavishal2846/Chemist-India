import { NextResponse, type NextRequest } from 'next/server'
import { getQueue } from '@/lib/email/queue'
import { checkRate } from '@/lib/email/rate-limit'
import { MAIL_FROM, MAIL_TO_INTERNAL } from '@/lib/email/transporter'
import {
  logoAttachment,
  partnerAckHtml,
  partnerAckSubject,
  partnerAckText,
  partnerInternalHtml,
  partnerInternalSubject,
  partnerInternalText,
  type PartnerPayload,
} from '@/lib/email/templates'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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

  const name        = s(body.name)
  const company     = s(body.company)
  const email       = s(body.email, 200).toLowerCase()
  const phone       = s(body.phone, 60)
  const country     = s(body.country, 100)
  const partnerType = s(body.partnerType, 100)
  const message     = s(body.message, MAX_MESSAGE)

  if (!name || !company || !country || !partnerType) {
    return NextResponse.json({ ok: false, error: 'Name, company, country and partnership type are required.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'A valid email address is required.' }, { status: 400 })
  }

  const payload: PartnerPayload = {
    name, company, email, phone, country, partnerType, message,
    submittedAt: new Date(),
    ip,
  }

  try {
    const queue = getQueue()
    const logo = await logoAttachment()

    queue.enqueue({
      from: MAIL_FROM,
      to: MAIL_TO_INTERNAL,
      replyTo: `"${name}" <${email}>`,
      subject: partnerInternalSubject(payload),
      text: partnerInternalText(payload),
      html: partnerInternalHtml(payload),
      attachments: [logo],
      headers: { 'X-Chemist-India-Form': 'partner' },
    })

    queue.enqueue({
      from: MAIL_FROM,
      to: `"${name}" <${email}>`,
      replyTo: MAIL_TO_INTERNAL,
      subject: partnerAckSubject(payload),
      text: partnerAckText(payload),
      html: partnerAckHtml(payload),
      attachments: [logo],
      headers: { 'X-Chemist-India-Form': 'partner-ack' },
    })
  } catch (err) {
    console.error('[partner] enqueue failed', err)
    return NextResponse.json(
      { ok: false, error: 'Unable to submit right now. Please email us directly.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, queued: true }, { status: 202 })
}
