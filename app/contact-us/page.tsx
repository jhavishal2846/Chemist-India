'use client'

import PageHeader from '@/components/PageHeader'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FadeIn } from '@/components/StaggerReveal'

const offices = [
  {
    city: 'Mumbai',
    country: 'India (HQ)',
    code: 'IN',
    color: '#243774',
    address: 'B-204, Sunshine Business Park, Andheri East, Mumbai – 400 069, Maharashtra, India',
    phone: '+91 22 4890 1234',
    mobile: '+91 98200 56789',
    email: 'info@chemicalindia.com',
    hours: 'Mon–Sat: 9:00 AM – 6:00 PM IST',
    type: 'Headquarters & Export Division',
  },
  {
    city: 'Ahmedabad',
    country: 'India (Manufacturing)',
    code: 'IN',
    color: '#10B981',
    address: 'Plot No. 47, GIDC Phase II, Vatva Industrial Area, Ahmedabad – 382 445, Gujarat, India',
    phone: '+91 79 2688 3456',
    mobile: '+91 98795 12345',
    email: 'manufacturing@chemicalindia.com',
    hours: 'Mon–Sat: 8:00 AM – 5:00 PM IST',
    type: 'Manufacturing & QC Unit',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    code: 'UK',
    color: '#6366F1',
    address: '12 Finsbury Square, 3rd Floor, London EC2A 1AR, United Kingdom',
    phone: '+44 20 7946 0123',
    mobile: '+44 7700 900456',
    email: 'europe@chemicalindia.com',
    hours: 'Mon–Fri: 9:00 AM – 5:00 PM GMT',
    type: 'European Sales Office',
  },
  {
    city: 'New Jersey',
    country: 'United States',
    code: 'US',
    color: '#F97316',
    address: '300 Interpace Parkway, Suite 200, Parsippany, NJ 07054, USA',
    phone: '+1 973 890 4567',
    mobile: '+1 646 789 0123',
    email: 'usa@chemicalindia.com',
    hours: 'Mon–Fri: 9:00 AM – 5:00 PM EST',
    type: 'North America Office',
  },
]

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
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Reach our global team for enquiries, technical support, documentation, or partnership discussions. We respond within 24 business hours."
        breadcrumbs={[{ label: 'Contact Us' }]}
        variant="dark"
        tag="Global Offices"
      />

      {/* Office cards */}
      <section className="py-20 bg-bg">
        <div className="container-wide">
          <FadeIn direction="up" className="mb-14">
            <h2 className="font-display font-bold text-4xl text-ink mb-4">Our Global Offices</h2>
            <p className="text-ink-muted text-lg max-w-2xl">With offices in India, UK, and USA, we provide local support to customers across the globe.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, margin: '-30px' }}
                className="group bg-surface border border-border rounded-2xl p-7 hover:shadow-lg transition-all duration-300"
                style={{ '--office-color': office.color } as React.CSSProperties}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${office.color}15` }}>
                    <span className="text-sm font-black tracking-wider" style={{ color: office.color }}>{office.code}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-ink">{office.city}</h3>
                    <p className="text-sm font-semibold" style={{ color: office.color }}>{office.country}</p>
                    <p className="text-xs text-ink-subtle mt-0.5">{office.type}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: office.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm text-ink-muted leading-relaxed">{office.address}</p>
                  </div>

                  <div className="flex gap-3">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: office.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-sm text-ink">{office.phone}</p>
                      <p className="text-sm text-ink-muted">{office.mobile}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: office.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${office.email}`} className="text-sm transition-colors" style={{ color: office.color }}>
                      {office.email}
                    </a>
                  </div>

                  <div className="flex gap-3">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: office.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-ink-muted">{office.hours}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
                  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'General Enquiries', value: 'info@chemicalindia.com' },
                  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Export Sales', value: 'export@chemicalindia.com' },
                  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'WhatsApp Business', value: '+91 98200 56789' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-xlight text-primary flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-ink-subtle mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-ink">{item.value}</p>
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

                  <button type="submit"
                    className="w-full py-4 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark active:scale-[0.99] transition-all duration-150">
                    Send Message →
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
