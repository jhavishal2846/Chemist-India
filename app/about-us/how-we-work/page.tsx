'use client'

import PageHeader from '@/components/PageHeader'
import { FadeIn } from '@/components/StaggerReveal'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Enquiry & Requirement Assessment',
    desc: 'Every engagement begins with understanding your need. Submit a product name, CAS number, or description — along with required quantity, purity grade, and destination country. Our team responds within 4 working hours.',
    color: '#243774',
    highlights: ['4-hour response SLA', 'Technical specification review', 'Regulatory pathway assessment'],
  },
  {
    number: '02',
    title: 'Sourcing & Supplier Verification',
    desc: 'We source from our vetted global network of over 500 qualified manufacturers across India, China, Europe, and North America. New suppliers undergo a comprehensive audit before we accept any product for resale.',
    color: '#468534',
    highlights: ['500+ qualified suppliers globally', 'GMP facility audits', 'COA and regulatory review'],
  },
  {
    number: '03',
    title: 'Quality Testing & Analysis',
    desc: 'Every incoming batch is tested in our in-house analytical laboratory. We conduct identification, assay, purity, impurity profiling, heavy metals, and microbial testing as applicable to the product specification.',
    color: '#3A4F9C',
    highlights: ['HPLC, GC, ICP-OES testing', 'Pharmacopoeial methods (USP/BP/EP)', 'Third-party lab confirmation available'],
  },
  {
    number: '04',
    title: 'Documentation Preparation',
    desc: 'Complete regulatory documentation is prepared for every shipment: Certificate of Analysis (CoA), Material Safety Data Sheet (MSDS/SDS), Statement of Origin, and supporting regulatory filings where required.',
    color: '#243774',
    highlights: ['CoA and MSDS every shipment', 'DMF reference letters available', 'CEP/COS copies on request'],
  },
  {
    number: '05',
    title: 'Quotation & Order Confirmation',
    desc: 'We provide a clear, itemised quotation with price per kg, lead time, packing options, and Incoterms. Upon order confirmation, we issue a proforma invoice and assign a dedicated order manager.',
    color: '#468534',
    highlights: ['Transparent pricing', 'Flexible Incoterms', 'Dedicated order tracking'],
  },
  {
    number: '06',
    title: 'Packing, Shipping & Delivery',
    desc: 'Products are packed in UN-approved packaging appropriate to hazard classification. We coordinate customs clearance, freight forwarding, and cold-chain logistics where required. Full tracking provided.',
    color: '#3A4F9C',
    highlights: ['UN-approved packaging', 'Cold-chain logistics available', 'Real-time shipment tracking'],
  },
  {
    number: '07',
    title: 'After-Sales Support',
    desc: 'Our technical and regulatory team remains available after delivery for technical queries, stability data requests, regulatory submissions support, and re-order assistance. We are partners, not just suppliers.',
    color: '#243774',
    highlights: ['Post-delivery technical support', 'Stability and impurity data', 'Regulatory submission assistance'],
  },
]

export default function HowWeWorkPage() {
  return (
    <>
      <PageHeader
        title="How We Work"
        subtitle="From your first enquiry to after-sales support — our structured seven-step process ensures quality, compliance, and confidence at every stage."
        breadcrumbs={[{ label: 'About Us', href: '/about-us' }, { label: 'How We Work' }]}
        variant="gradient"
        tag="Our Process"
      />

      <section className="py-20 bg-bg">
        <div className="container-wide">
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[28px] top-8 bottom-8 w-0.5 bg-border hidden md:block" />

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.08 }}
                  viewport={{ once: true, margin: '-30px' }}
                  className="group relative flex gap-6 md:gap-8"
                >
                  {/* Step indicator */}
                  <div
                    className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-white text-sm shadow-lg"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-surface border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 group-hover:translate-x-1">
                    <h3 className="font-display font-bold text-xl text-ink mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-ink-muted leading-relaxed mb-4">{step.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full"
                          style={{ backgroundColor: `${step.color}10`, color: step.color }}
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
