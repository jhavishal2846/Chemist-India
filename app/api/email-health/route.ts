import { NextResponse } from 'next/server'
import { getTransporter, MAIL_FROM, MAIL_TO_INTERNAL } from '@/lib/email/transporter'
import { getQueue } from '@/lib/email/queue'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Diagnostic endpoint. GET to ping SMTP, POST to send a real test email.
 * Disabled in production unless EMAIL_HEALTH_ENABLED=1 is set.
 *
 *   curl http://localhost:3001/api/email-health
 *   curl -X POST http://localhost:3001/api/email-health
 */

function isAllowed(): boolean {
  if (process.env.NODE_ENV !== 'production') return true
  return process.env.EMAIL_HEALTH_ENABLED === '1'
}

export async function GET() {
  if (!isAllowed()) {
    return NextResponse.json({ ok: false, error: 'disabled' }, { status: 404 })
  }

  const config = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    user: process.env.SMTP_USER,
    passSet: Boolean(process.env.SMTP_PASS),
    passLen: process.env.SMTP_PASS?.length ?? 0,
    from: MAIL_FROM,
    to: MAIL_TO_INTERNAL,
    poolMax: Number(process.env.SMTP_POOL_MAX ?? 4),
    queueConcurrency: Number(process.env.MAIL_QUEUE_CONCURRENCY ?? 3),
  }

  try {
    const ok = await getTransporter().verify()
    return NextResponse.json({
      ok,
      verified: ok,
      config,
      queue: getQueue().stats(),
    })
  } catch (err) {
    const e = err as {
      message?: string; code?: string; command?: string;
      response?: string; responseCode?: number;
    }
    return NextResponse.json({
      ok: false,
      config,
      queue: getQueue().stats(),
      error: {
        message: e?.message,
        code: e?.code,
        command: e?.command,
        response: e?.response,
        responseCode: e?.responseCode,
      },
    }, { status: 500 })
  }
}

export async function POST() {
  if (!isAllowed()) {
    return NextResponse.json({ ok: false, error: 'disabled' }, { status: 404 })
  }

  try {
    const info = await getTransporter().sendMail({
      from: MAIL_FROM,
      to: MAIL_TO_INTERNAL,
      subject: 'Chemist India — SMTP test',
      text: 'This is a test email confirming SMTP credentials work. Sent ' + new Date().toISOString(),
    })
    return NextResponse.json({
      ok: true,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    })
  } catch (err) {
    const e = err as {
      message?: string; code?: string; command?: string;
      response?: string; responseCode?: number;
    }
    return NextResponse.json({
      ok: false,
      error: {
        message: e?.message,
        code: e?.code,
        command: e?.command,
        response: e?.response,
        responseCode: e?.responseCode,
      },
    }, { status: 500 })
  }
}
