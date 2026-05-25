'use client'

import PageHeader from '@/components/PageHeader'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function EnquiryPage() {
  const [rows, setRows] = useState([{ product: '', cas: '', qty: '', unit: 'kg', grade: '' }])
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', country: '', remarks: '' })
  const [website, setWebsite] = useState('') // honeypot — must stay empty
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addRow = () => setRows(prev => [...prev, { product: '', cas: '', qty: '', unit: 'kg', grade: '' }])
  const removeRow = (i: number) => setRows(prev => prev.filter((_, idx) => idx !== i))
  const updateRow = (i: number, field: string, value: string) =>
    setRows(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: value } : r))

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const resetAll = () => {
    setRows([{ product: '', cas: '', qty: '', unit: 'kg', grade: '' }])
    setForm({ name: '', company: '', email: '', phone: '', country: '', remarks: '' })
    setSubmitted(false)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rows, website }),
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
        title="Product Enquiry"
        subtitle="Submit your product requirements and receive a detailed quotation with pricing, COA samples, and full documentation within 24 hours."
        breadcrumbs={[{ label: 'Enquiry' }]}
        variant="gradient"
        tag="Request a Quote"
      />

      <section className="py-20 bg-bg">
        <div className="container-wide max-w-4xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-surface border border-border rounded-2xl"
            >
              <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-3xl text-ink mb-3">Enquiry Submitted!</h2>
              <p className="text-ink-muted text-lg max-w-md mx-auto mb-8">
                Thank you for your enquiry. Our team will review your requirements and respond with a detailed quotation within 24 business hours.
              </p>
              <button onClick={resetAll}
                className="px-8 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors">
                Submit Another Enquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-surface border border-border rounded-2xl p-8 lg:p-12"
            >
              {/* Contact info */}
              <h2 className="font-display font-bold text-2xl text-ink mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                {[
                  { name: 'name',    label: 'Your Name *',      type: 'text',  placeholder: 'Full name' },
                  { name: 'company', label: 'Company *',         type: 'text',  placeholder: 'Company or organisation' },
                  { name: 'email',   label: 'Email Address *',   type: 'email', placeholder: 'your@company.com' },
                  { name: 'phone',   label: 'Phone / WhatsApp',  type: 'tel',   placeholder: 'With country code' },
                  { name: 'country', label: 'Country *',         type: 'text',  placeholder: 'Destination country' },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-xs font-semibold text-ink-muted mb-1.5">{f.label}</label>
                    <input type={f.type} name={f.name} value={form[f.name as keyof typeof form]}
                      onChange={handleFormChange} placeholder={f.placeholder} required={f.label.includes('*')}
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                ))}
              </div>

              {/* Product requirements */}
              <h2 className="font-display font-bold text-2xl text-ink mb-2">Product Requirements</h2>
              <p className="text-sm text-ink-subtle mb-6">Add one or more products. Include CAS number and grade for faster processing.</p>

              <div className="space-y-3 mb-4">
                {rows.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-3 items-start p-4 bg-bg border border-border rounded-xl"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-2">{i + 1}</div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 flex-1">
                      <div className="col-span-2 md:col-span-2">
                        <input value={row.product} onChange={e => updateRow(i, 'product', e.target.value)}
                          placeholder="Product name *" required
                          className="w-full px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:border-primary transition-all" />
                      </div>
                      <input value={row.cas} onChange={e => updateRow(i, 'cas', e.target.value)}
                        placeholder="CAS number"
                        className="px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:border-primary transition-all" />
                      <div className="flex gap-2">
                        <input value={row.qty} onChange={e => updateRow(i, 'qty', e.target.value)}
                          placeholder="Qty" type="number" min="0"
                          className="flex-1 px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:border-primary transition-all w-20" />
                        <select value={row.unit} onChange={e => updateRow(i, 'unit', e.target.value)}
                          className="px-2 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:border-primary bg-white">
                          {['kg', 'g', 'MT', 'L', 'mL'].map(u => <option key={u}>{u}</option>)}
                        </select>
                      </div>
                      <input value={row.grade} onChange={e => updateRow(i, 'grade', e.target.value)}
                        placeholder="Grade (USP/BP…)"
                        className="px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:border-primary transition-all" />
                    </div>
                    {rows.length > 1 && (
                      <button type="button" onClick={() => removeRow(i)}
                        className="mt-2 p-1.5 rounded-lg text-ink-subtle hover:text-error hover:bg-error/10 transition-colors flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              <button type="button" onClick={addRow}
                className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors mb-10">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Another Product
              </button>

              {/* Remarks */}
              <div className="mb-8">
                <label className="block text-xs font-semibold text-ink-muted mb-1.5">Additional Remarks / Specifications</label>
                <textarea name="remarks" value={form.remarks} onChange={handleFormChange} rows={3}
                  placeholder="Any specific purity requirements, documentation needed, or other details..."
                  className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
              </div>

              {/* Honeypot — visually hidden but in the DOM. Real users never fill this. */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off"
                  value={website} onChange={e => setWebsite(e.target.value)} />
              </div>

              {error && (
                <div role="alert" className="mb-5 px-4 py-3 rounded-xl bg-error/5 border border-error/30 text-sm text-error">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button type="submit" disabled={submitting}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl bg-cta text-white font-bold text-sm hover:bg-cta-dark active:scale-[0.99] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
                  {submitting && (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  )}
                  {submitting ? 'Submitting…' : 'Submit Enquiry →'}
                </button>
                <p className="text-xs text-ink-subtle text-center sm:text-left">
                  We respond within 24 business hours. Your data is kept strictly confidential.
                </p>
              </div>
            </motion.form>
          )}
        </div>
      </section>
    </>
  )
}
