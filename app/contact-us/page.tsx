'use client'

import PageHeader from '@/components/PageHeader'
import { motion } from 'framer-motion'
import { useState } from 'react'

const contactReasons = [
  'Product Enquiry / Quote Request',
  'Technical Support',
  'Quality Documentation (COA, MSDS)',
  'Regulatory Affairs',
  'Partnership / Distribution',   
  'Logistics & Shipping',
  'Other',
]

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', reason: '', message: '' })
  const [website, setWebsite] = useState('') // honeypot
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)   
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Submission failed. Please try again.')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Reach our team for enquiries, technical support, documentation, or partnership discussions. We respond within 24 business hours."
        breadcrumbs={[{ label: 'Contact Us' }]}
        variant="dark"
        tag="Get in Touch"
      />

      {/* Contact form */}
      <section className="py-20 bg-bg">
        <div className="container-wide">
          {/* Contact form */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="font-display font-bold text-3xl text-ink mb-4">Get in Touch</h2>
              <p className="text-ink-muted mb-8">Have a question or want to discuss a requirement? Send us a message and we'll get back to you promptly.</p>

              <div className="space-y-6">
                {[
                  {
                    icon:  'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                    label: 'Registered Office',
                    value: '1358 FF, Sector 22 B, Chandigarh — 160022',
                  },
                  {
                    icon:  'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
                    label: 'CIN',
                    value: 'U74999CH2021PLC043555',
                    mono:  true,
                  },
                  {
                    icon:  'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M15 10a3 3 0 11-6 0 3 3 0 016 0z',
                    label: 'Reach Us',
                    value: 'Send us a message via the form — we respond within 24 business hours.',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-xlight text-primary flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-ink-subtle mb-0.5">{item.label}</p>
                      <p className={`text-sm font-medium text-ink ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-primary-xlight rounded-2xl border border-primary/20">
                <p className="text-sm font-semibold text-primary mb-1">Response Commitment</p>
                <p className="text-xs text-ink-muted">All enquiries receive a response within <strong>24 business hours</strong>. Urgent matters are handled within 4 hours during business days.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-surface border border-border rounded-2xl p-8"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-2">Message Sent!</h3>
                  <p className="text-ink-muted mb-6">Thank you for reaching out. Our team will respond within 24 business hours.</p>
                  <button onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { name: 'name',    label: 'Your Name *',    type: 'text',  placeholder: 'Full name' },
                      { name: 'company', label: 'Company',        type: 'text',  placeholder: 'Organisation name' },
                      { name: 'email',   label: 'Email Address *',type: 'email', placeholder: 'your@email.com' },
                      { name: 'phone',   label: 'Phone / WhatsApp', type: 'tel', placeholder: 'With country code' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-xs font-semibold text-ink-muted mb-1.5">{field.label}</label>
                        <input
                          type={field.type} name={field.name}
                          value={form[field.name as keyof typeof form]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required={field.label.includes('*')}
                          className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-muted mb-1.5">Reason for Contact *</label>
                    <select name="reason" value={form.reason} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white">
                      <option value="">Select a reason</option>
                      {contactReasons.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-muted mb-1.5">Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={5} required
                      placeholder="Describe your requirement, question, or feedback in detail..."
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                  </div>

                  {/* Honeypot — visually hidden but in the DOM. Real users never fill this. */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="contact-website">Website</label>
                    <input type="text" id="contact-website" name="website" tabIndex={-1} autoComplete="off"
                      value={website} onChange={e => setWebsite(e.target.value)} />
                  </div>

                  {error && (
                    <div role="alert" className="px-4 py-3 rounded-xl bg-error/5 border border-error/30 text-sm text-error">
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={submitting}
                    className="w-full py-4 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark active:scale-[0.99] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
                    {submitting && (
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    )}
                    {submitting ? 'Sending…' : 'Send Message →'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
