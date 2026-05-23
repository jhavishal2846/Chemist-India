'use client'

import PageHeader from '@/components/PageHeader'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FadeIn } from '@/components/StaggerReveal'

const partnerTypes = [
  {
    type: 'Distributor Partner',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    desc: 'Exclusive or non-exclusive distribution rights in your territory. Ideal for established chemical distributors seeking to expand their pharma/industrial portfolio.',
    benefits: ['Competitive pricing & margin', 'Territory exclusivity available', 'Marketing & technical support', 'Co-branded documentation'],
  },
  {
    type: 'Manufacturer / Supplier',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    desc: 'GMP-certified manufacturers seeking a global distribution channel. We provide market access, regulatory support, and a trusted global customer network.',
    benefits: ['Access to 2000+ global customers', 'Regulatory filing support', 'Consistent volume commitments', 'Quality audit partnership'],
  },
  {
    type: 'Sourcing Agent',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    desc: 'Commission-based sourcing partners who refer customers and product requirements. Perfect for consultants, logistics firms, and industry professionals.',
    benefits: ['Competitive commission structure', 'No inventory risk', 'Full back-office support', 'CRM access for order tracking'],
  },
  {
    type: 'Strategic Alliance',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    desc: 'Long-term strategic collaboration for co-development, joint ventures, or exclusive product supply arrangements for specific markets.',
    benefits: ['Custom partnership terms', 'Co-investment opportunities', 'Brand co-ownership options', 'Executive-level relationship management'],
  },
]

export default function PartnerUsPage() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', country: '', partnerType: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHeader
        title="Partner With Us"
        subtitle="Join Chemist India's global network of distributors, manufacturers, and strategic partners. Together we can serve more markets with more products."
        breadcrumbs={[{ label: 'Partner Us' }]}
        variant="dark"
        tag="Partnership Opportunities"
      />

      {/* Partner types */}
      <section className="py-20 bg-bg">
        <div className="container-wide">
          <FadeIn direction="up" className="mb-14">
            <h2 className="font-display font-bold text-4xl text-ink mb-4">How We Partner</h2>
            <p className="text-ink-muted text-lg max-w-2xl">We offer multiple partnership models designed to create mutual value and long-term growth.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {partnerTypes.map((p, i) => (
              <motion.div
                key={p.type}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, margin: '-30px' }}
                className="group bg-surface border border-border rounded-2xl p-7 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">{p.icon}</div>
                <h3 className="font-display font-bold text-xl text-ink mb-3 group-hover:text-primary transition-colors">{p.type}</h3>
                <p className="text-ink-muted text-sm leading-relaxed mb-5">{p.desc}</p>
                <ul className="space-y-2">
                  {p.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-ink-muted">
                      <svg className="w-4 h-4 text-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Partnership form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="bg-surface border border-border rounded-2xl p-8 lg:p-12"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display font-bold text-3xl text-ink mb-2 text-center">Express Your Interest</h2>
              <p className="text-ink-muted text-center mb-10">Fill in the form below and our partnership team will contact you within 2 business days.</p>

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
                  <h3 className="font-display font-bold text-2xl text-ink mb-2">Thank You!</h3>
                  <p className="text-ink-muted">Your partnership enquiry has been received. Our team will be in touch within 2 business days.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { name: 'name',    label: 'Your Name *',    type: 'text', placeholder: 'Full name' },
                      { name: 'company', label: 'Company Name *', type: 'text', placeholder: 'Organisation name' },
                      { name: 'email',   label: 'Email Address *',type: 'email',placeholder: 'your@company.com' },
                      { name: 'phone',   label: 'Phone / WhatsApp', type: 'tel', placeholder: '+91 or international' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-xs font-semibold text-ink-muted mb-1.5">{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name as keyof typeof form]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required={field.label.includes('*')}
                          className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-ink-muted mb-1.5">Country *</label>
                      <input name="country" value={form.country} onChange={handleChange} required
                        placeholder="Your country" type="text"
                        className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-muted mb-1.5">Partnership Type *</label>
                      <select name="partnerType" value={form.partnerType} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white">
                        <option value="">Select type</option>
                        {partnerTypes.map(p => <option key={p.type} value={p.type}>{p.type}</option>)}
                        <option value="Other">Other / Not sure</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-muted mb-1.5">Tell us about your business & interest</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                      placeholder="Describe your current business, geographic reach, and how you envision the partnership..."
                      className="w-full px-4 py-3 rounded-xl border border-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
                  </div>

                  <button type="submit"
                    className="w-full py-4 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark active:scale-[0.99] transition-all duration-150">
                    Submit Partnership Enquiry
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
