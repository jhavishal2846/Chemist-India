import 'server-only'
import path from 'node:path'
import { readFile } from 'node:fs/promises'

/* -------------------------------------------------------------------------- */
/*  Shared brand + chrome                                                     */
/* -------------------------------------------------------------------------- */

const BRAND = {
  name: 'Chemist India',
  tagline: 'Precision Chemistry. Global Trust.',
  site: 'https://chemistindia.com',
  email: 'indiachemist@hotmail.com',
  // Matches the live site's primary/cta colors so the email feels native.
  primary: '#0F4C81',
  primaryDark: '#0A3A63',
  cta: '#15803D',
  ink: '#0F172A',
  inkMuted: '#475569',
  bg: '#F8FAFC',
  border: '#E2E8F0',
}

const LOGO_CID = 'chemist-india-logo@brand'

let cachedLogo: Buffer | null = null
async function getLogoBuffer(): Promise<Buffer> {
  if (cachedLogo) return cachedLogo
  // Use the white wordmark — the email header is dark navy, the regular
  // logo's dark text would be invisible against it.
  const p = path.join(process.cwd(), 'public', 'brand', 'logo-horizontal-white.png')
  cachedLogo = await readFile(p)
  return cachedLogo
}

export async function logoAttachment() {
  return {
    filename: 'logo.png',
    content: await getLogoBuffer(),
    cid: LOGO_CID,
    contentDisposition: 'inline' as const,
  }
}

/* -------------------------------------------------------------------------- */
/*  Public payload types                                                      */
/* -------------------------------------------------------------------------- */

export interface EnquiryRow {
  product: string
  cas: string
  qty: string
  unit: string
  grade: string
}

export interface EnquiryPayload {
  name: string
  company: string
  email: string
  phone: string
  country: string
  remarks: string
  rows: EnquiryRow[]
  submittedAt: Date
  ip?: string
}

export interface PartnerPayload {
  name: string
  company: string
  email: string
  phone: string
  country: string
  partnerType: string
  message: string
  submittedAt: Date
  ip?: string
}

/* -------------------------------------------------------------------------- */
/*  HTML helpers                                                              */
/* -------------------------------------------------------------------------- */

function esc(s: string | undefined | null): string {
  if (!s) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function fmtDate(d: Date): string {
  return d.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  }) + ' IST'
}

/**
 * Outer email shell. Uses inline styles + tables because Outlook / Hotmail
 * ignore <style> blocks and modern CSS. Width capped at 600px (de-facto
 * email standard).
 */
function shell(title: string, preheader: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${BRAND.ink};">
<!-- preheader: shown in inbox preview, hidden in body -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;font-size:1px;line-height:1px;">${esc(preheader)}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.bg};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${BRAND.border};border-radius:14px;overflow:hidden;">

      <!-- Header -->
      <tr><td style="background:${BRAND.primary};padding:22px 32px;">
        <img src="cid:${LOGO_CID}" alt="${esc(BRAND.name)}" height="44" style="display:block;height:44px;width:auto;border:0;outline:none;text-decoration:none;">
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:32px;">
        ${body}
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:${BRAND.bg};padding:24px 32px;border-top:1px solid ${BRAND.border};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="font-size:12px;color:${BRAND.inkMuted};line-height:1.6;">
            <strong style="color:${BRAND.ink};">${esc(BRAND.name)}</strong> &middot; Global Pharmaceutical &amp; Chemical Supplier<br>
            <a href="${BRAND.site}" style="color:${BRAND.primary};text-decoration:none;">${BRAND.site.replace(/^https?:\/\//, '')}</a>
            &nbsp;&middot;&nbsp;
            <a href="mailto:${BRAND.email}" style="color:${BRAND.primary};text-decoration:none;">${BRAND.email}</a>
          </td></tr>
          <tr><td style="font-size:11px;color:#94A3B8;padding-top:10px;line-height:1.55;">
            This message was generated by the Chemist India enquiry system. If you received this in error, please reply to let us know.
          </td></tr>
        </table>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

function row(label: string, value: string): string {
  if (!value) return ''
  return `<tr>
    <td style="padding:8px 0;width:140px;font-size:12px;color:${BRAND.inkMuted};text-transform:uppercase;letter-spacing:0.04em;font-weight:600;vertical-align:top;">${esc(label)}</td>
    <td style="padding:8px 0;font-size:14px;color:${BRAND.ink};vertical-align:top;">${esc(value)}</td>
  </tr>`
}

function productsTable(rows: EnquiryRow[]): string {
  const head = `<tr style="background:${BRAND.bg};">
    <th align="left" style="padding:10px 12px;font-size:11px;color:${BRAND.inkMuted};text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid ${BRAND.border};">#</th>
    <th align="left" style="padding:10px 12px;font-size:11px;color:${BRAND.inkMuted};text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid ${BRAND.border};">Product</th>
    <th align="left" style="padding:10px 12px;font-size:11px;color:${BRAND.inkMuted};text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid ${BRAND.border};">CAS</th>
    <th align="left" style="padding:10px 12px;font-size:11px;color:${BRAND.inkMuted};text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid ${BRAND.border};">Quantity</th>
    <th align="left" style="padding:10px 12px;font-size:11px;color:${BRAND.inkMuted};text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid ${BRAND.border};">Grade</th>
  </tr>`
  const body = rows.map((r, i) => `<tr>
    <td style="padding:10px 12px;font-size:13px;color:${BRAND.inkMuted};border-bottom:1px solid ${BRAND.border};">${i + 1}</td>
    <td style="padding:10px 12px;font-size:14px;color:${BRAND.ink};font-weight:600;border-bottom:1px solid ${BRAND.border};">${esc(r.product)}</td>
    <td style="padding:10px 12px;font-size:13px;color:${BRAND.ink};border-bottom:1px solid ${BRAND.border};">${esc(r.cas) || '<span style="color:#94A3B8;">—</span>'}</td>
    <td style="padding:10px 12px;font-size:13px;color:${BRAND.ink};border-bottom:1px solid ${BRAND.border};">${esc(r.qty) ? `${esc(r.qty)} ${esc(r.unit)}` : '<span style="color:#94A3B8;">—</span>'}</td>
    <td style="padding:10px 12px;font-size:13px;color:${BRAND.ink};border-bottom:1px solid ${BRAND.border};">${esc(r.grade) || '<span style="color:#94A3B8;">—</span>'}</td>
  </tr>`).join('')
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BRAND.border};border-radius:10px;border-collapse:separate;border-spacing:0;overflow:hidden;margin:8px 0 20px;">
    ${head}${body}
  </table>`
}

/* -------------------------------------------------------------------------- */
/*  Enquiry — internal notification                                           */
/* -------------------------------------------------------------------------- */

export function enquiryInternalSubject(p: EnquiryPayload): string {
  const first = p.rows[0]?.product?.trim()
  const extra = p.rows.length > 1 ? ` (+${p.rows.length - 1} more)` : ''
  return `New Enquiry — ${p.company || p.name}${first ? ` — ${first}${extra}` : ''}`
}

export function enquiryInternalHtml(p: EnquiryPayload): string {
  const body = `
    <p style="margin:0 0 6px;font-size:12px;color:${BRAND.cta};font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">New Product Enquiry</p>
    <h1 style="margin:0 0 24px;font-size:22px;line-height:1.3;color:${BRAND.ink};">Submitted by ${esc(p.name)} &mdash; ${esc(p.company)}</h1>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
      ${row('Name', p.name)}
      ${row('Company', p.company)}
      ${row('Email', p.email)}
      ${row('Phone', p.phone)}
      ${row('Country', p.country)}
      ${row('Submitted', fmtDate(p.submittedAt))}
      ${p.ip ? row('Source IP', p.ip) : ''}
    </table>

    <h2 style="margin:24px 0 4px;font-size:15px;color:${BRAND.ink};text-transform:uppercase;letter-spacing:0.04em;">Products Requested</h2>
    ${productsTable(p.rows)}

    ${p.remarks ? `
      <h2 style="margin:24px 0 4px;font-size:15px;color:${BRAND.ink};text-transform:uppercase;letter-spacing:0.04em;">Additional Remarks</h2>
      <div style="padding:14px 16px;background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:10px;font-size:14px;line-height:1.6;color:${BRAND.ink};white-space:pre-wrap;">${esc(p.remarks)}</div>
    ` : ''}

    <p style="margin:28px 0 0;font-size:13px;color:${BRAND.inkMuted};line-height:1.6;">
      Reply directly to this email to reach <strong>${esc(p.name)}</strong>. SLA: respond within 24 business hours.
    </p>
  `
  return shell(
    'New Enquiry — Chemist India',
    `${p.company || p.name} requested ${p.rows.length} product${p.rows.length > 1 ? 's' : ''}`,
    body,
  )
}

export function enquiryInternalText(p: EnquiryPayload): string {
  const lines: string[] = []
  lines.push('NEW PRODUCT ENQUIRY — Chemist India')
  lines.push('=====================================')
  lines.push('')
  lines.push(`Name:     ${p.name}`)
  lines.push(`Company:  ${p.company}`)
  lines.push(`Email:    ${p.email}`)
  if (p.phone) lines.push(`Phone:    ${p.phone}`)
  lines.push(`Country:  ${p.country}`)
  lines.push(`Submitted: ${fmtDate(p.submittedAt)}`)
  if (p.ip) lines.push(`Source IP: ${p.ip}`)
  lines.push('')
  lines.push('PRODUCTS REQUESTED')
  lines.push('-------------------')
  p.rows.forEach((r, i) => {
    lines.push(`${i + 1}. ${r.product}`)
    if (r.cas) lines.push(`   CAS:      ${r.cas}`)
    if (r.qty) lines.push(`   Quantity: ${r.qty} ${r.unit}`)
    if (r.grade) lines.push(`   Grade:    ${r.grade}`)
  })
  if (p.remarks) {
    lines.push('')
    lines.push('REMARKS')
    lines.push('-------')
    lines.push(p.remarks)
  }
  lines.push('')
  lines.push(`Reply directly to reach ${p.name} (${p.email}).`)
  return lines.join('\n')
}

/* -------------------------------------------------------------------------- */
/*  Enquiry — auto-acknowledgement to submitter                               */
/* -------------------------------------------------------------------------- */

export function enquiryAckSubject(p: EnquiryPayload): string {
  return `We received your enquiry — Chemist India`
}

export function enquiryAckHtml(p: EnquiryPayload): string {
  const body = `
    <p style="margin:0 0 6px;font-size:12px;color:${BRAND.cta};font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Enquiry Received</p>
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:${BRAND.ink};">Thank you, ${esc(p.name.split(' ')[0] || p.name)}.</h1>

    <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:${BRAND.ink};">
      We've received your enquiry and our team is already on it. You can expect a detailed quotation
      &mdash; including pricing, COA samples and full regulatory documentation &mdash;
      within <strong>24 business hours</strong>.
    </p>

    <div style="padding:16px 18px;background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:10px;margin:0 0 22px;">
      <p style="margin:0 0 8px;font-size:11px;color:${BRAND.inkMuted};text-transform:uppercase;letter-spacing:0.06em;font-weight:700;">Your reference</p>
      <p style="margin:0;font-size:14px;color:${BRAND.ink};line-height:1.6;">
        ${esc(p.rows.length.toString())} product${p.rows.length > 1 ? 's' : ''} requested &middot; submitted ${esc(fmtDate(p.submittedAt))}
      </p>
    </div>

    <h2 style="margin:0 0 10px;font-size:15px;color:${BRAND.ink};text-transform:uppercase;letter-spacing:0.04em;">Summary of your request</h2>
    ${productsTable(p.rows)}

    <p style="margin:24px 0 8px;font-size:14px;line-height:1.6;color:${BRAND.ink};">
      If you need to add, change or urgently expedite anything, simply reply to this email &mdash;
      it routes directly to our sourcing desk.
    </p>

    <p style="margin:28px 0 0;font-size:13px;color:${BRAND.inkMuted};line-height:1.65;">
      Warm regards,<br>
      <strong style="color:${BRAND.ink};">The Chemist India Team</strong>
    </p>
  `
  return shell(
    'We received your enquiry — Chemist India',
    `Thanks ${p.name.split(' ')[0] || p.name}, we'll respond within 24 business hours.`,
    body,
  )
}

export function enquiryAckText(p: EnquiryPayload): string {
  return [
    `Thank you, ${p.name.split(' ')[0] || p.name}.`,
    '',
    `We've received your enquiry and our team will respond with a detailed quotation,`,
    `including pricing, COA samples and full documentation, within 24 business hours.`,
    '',
    `Reference: ${p.rows.length} product(s) requested, submitted ${fmtDate(p.submittedAt)}.`,
    '',
    'Summary:',
    ...p.rows.map((r, i) =>
      `  ${i + 1}. ${r.product}${r.qty ? ` — ${r.qty} ${r.unit}` : ''}${r.grade ? ` — ${r.grade}` : ''}${r.cas ? ` — CAS ${r.cas}` : ''}`,
    ),
    '',
    `Reply to this email if you need to amend or expedite anything.`,
    '',
    `— The Chemist India Team`,
    `https://chemistindia.com  ·  indiachemist@hotmail.com`,
  ].join('\n')
}

/* -------------------------------------------------------------------------- */
/*  Partner — internal notification                                           */
/* -------------------------------------------------------------------------- */

export function partnerInternalSubject(p: PartnerPayload): string {
  return `New Partnership Enquiry — ${p.partnerType || 'General'} — ${p.company || p.name}`
}

export function partnerInternalHtml(p: PartnerPayload): string {
  const body = `
    <p style="margin:0 0 6px;font-size:12px;color:${BRAND.cta};font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">New Partnership Enquiry</p>
    <h1 style="margin:0 0 24px;font-size:22px;line-height:1.3;color:${BRAND.ink};">${esc(p.partnerType || 'General')} &mdash; ${esc(p.company || p.name)}</h1>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
      ${row('Name', p.name)}
      ${row('Company', p.company)}
      ${row('Email', p.email)}
      ${row('Phone', p.phone)}
      ${row('Country', p.country)}
      ${row('Partnership', p.partnerType)}
      ${row('Submitted', fmtDate(p.submittedAt))}
      ${p.ip ? row('Source IP', p.ip) : ''}
    </table>

    ${p.message ? `
      <h2 style="margin:24px 0 4px;font-size:15px;color:${BRAND.ink};text-transform:uppercase;letter-spacing:0.04em;">Their Message</h2>
      <div style="padding:14px 16px;background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:10px;font-size:14px;line-height:1.6;color:${BRAND.ink};white-space:pre-wrap;">${esc(p.message)}</div>
    ` : ''}

    <p style="margin:28px 0 0;font-size:13px;color:${BRAND.inkMuted};line-height:1.6;">
      Reply directly to this email to reach <strong>${esc(p.name)}</strong>. SLA: respond within 2 business days.
    </p>
  `
  return shell(
    'New Partnership Enquiry — Chemist India',
    `${p.partnerType || 'Partnership'} interest from ${p.company || p.name}`,
    body,
  )
}

export function partnerInternalText(p: PartnerPayload): string {
  const lines: string[] = []
  lines.push('NEW PARTNERSHIP ENQUIRY — Chemist India')
  lines.push('========================================')
  lines.push('')
  lines.push(`Name:        ${p.name}`)
  lines.push(`Company:     ${p.company}`)
  lines.push(`Email:       ${p.email}`)
  if (p.phone) lines.push(`Phone:       ${p.phone}`)
  lines.push(`Country:     ${p.country}`)
  lines.push(`Partnership: ${p.partnerType}`)
  lines.push(`Submitted:   ${fmtDate(p.submittedAt)}`)
  if (p.ip) lines.push(`Source IP:   ${p.ip}`)
  if (p.message) {
    lines.push('')
    lines.push('MESSAGE')
    lines.push('-------')
    lines.push(p.message)
  }
  lines.push('')
  lines.push(`Reply directly to reach ${p.name} (${p.email}).`)
  return lines.join('\n')
}

/* -------------------------------------------------------------------------- */
/*  Partner — auto-acknowledgement                                            */
/* -------------------------------------------------------------------------- */

export function partnerAckSubject(_p: PartnerPayload): string {
  return `Thank you for your partnership interest — Chemist India`
}

export function partnerAckHtml(p: PartnerPayload): string {
  const body = `
    <p style="margin:0 0 6px;font-size:12px;color:${BRAND.cta};font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Partnership Enquiry Received</p>
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:${BRAND.ink};">Thank you, ${esc(p.name.split(' ')[0] || p.name)}.</h1>

    <p style="margin:0 0 18px;font-size:15px;line-height:1.65;color:${BRAND.ink};">
      We're delighted that you're interested in partnering with <strong>Chemist India</strong>.
      Our partnership team has received your enquiry and will be in touch within
      <strong>2 business days</strong> to explore the opportunity in detail.
    </p>

    <div style="padding:16px 18px;background:${BRAND.bg};border:1px solid ${BRAND.border};border-radius:10px;margin:0 0 22px;">
      <p style="margin:0 0 8px;font-size:11px;color:${BRAND.inkMuted};text-transform:uppercase;letter-spacing:0.06em;font-weight:700;">Enquiry summary</p>
      <p style="margin:0;font-size:14px;color:${BRAND.ink};line-height:1.7;">
        <strong>Partnership type:</strong> ${esc(p.partnerType)}<br>
        <strong>Company:</strong> ${esc(p.company)}<br>
        <strong>Submitted:</strong> ${esc(fmtDate(p.submittedAt))}
      </p>
    </div>

    <p style="margin:0 0 8px;font-size:14px;line-height:1.65;color:${BRAND.ink};">
      In the meantime, feel free to explore the partnership models, references and capabilities
      on our website. If anything urgent comes up, simply reply to this email &mdash; it reaches
      our partnerships desk directly.
    </p>

    <p style="margin:28px 0 0;font-size:13px;color:${BRAND.inkMuted};line-height:1.65;">
      Warm regards,<br>
      <strong style="color:${BRAND.ink};">The Chemist India Partnerships Team</strong>
    </p>
  `
  return shell(
    'Thank you for your partnership interest — Chemist India',
    `Thanks ${p.name.split(' ')[0] || p.name}, our partnerships team will be in touch within 2 business days.`,
    body,
  )
}

export function partnerAckText(p: PartnerPayload): string {
  return [
    `Thank you, ${p.name.split(' ')[0] || p.name}.`,
    '',
    `We're delighted by your interest in partnering with Chemist India.`,
    `Our partnerships team will be in touch within 2 business days.`,
    '',
    'Summary:',
    `  Partnership type: ${p.partnerType}`,
    `  Company:          ${p.company}`,
    `  Submitted:        ${fmtDate(p.submittedAt)}`,
    '',
    `Reply to this email if you need to add anything urgent.`,
    '',
    `— The Chemist India Partnerships Team`,
    `https://chemistindia.com  ·  indiachemist@hotmail.com`,
  ].join('\n')
}
