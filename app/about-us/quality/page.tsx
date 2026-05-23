'use client'

import PageHeader from '@/components/PageHeader'
import { FadeIn } from '@/components/StaggerReveal'
import { motion } from 'framer-motion'

const qcSteps = [
  { step: '01', title: 'Supplier Qualification', desc: 'Every new supplier undergoes a rigorous audit process including GMP certification review, facility inspection reports, and regulatory history assessment before we accept a single sample.' },
  { step: '02', title: 'Incoming Inspection', desc: 'Each batch received is quarantined and sampled. Identification tests (IR, UV) are conducted on every batch. Full quantitative analysis is performed on a risk-based frequency.' },
  { step: '03', title: 'Analytical Testing', desc: 'Our in-house laboratory is equipped with HPLC, GC, KF moisture analyzer, dissolution apparatus, melting point instruments, and ICP-OES for elemental impurity testing.' },
  { step: '04', title: 'Microbial Testing', desc: 'For APIs, excipients, herbal extracts, and food chemicals, microbial limits testing (Total Aerobic Count, Yeast & Mould, E.coli, Salmonella) is performed per USP/BP/EP requirements.' },
  { step: '05', title: 'Documentation Review', desc: 'Our QA team reviews CoA, MSDS, DMF references, regulatory filings, and batch manufacturing records before approving any product for supply.' },
  { step: '06', title: 'Release & Dispatch', desc: 'Only products that meet all specification criteria and have complete documentation are released for dispatch. Each shipment includes CoA, MSDS, and packing list.' },
]

const certifications = [
  { name: 'GMP Certified', issuer: 'Schedule M (India)', desc: 'Good Manufacturing Practices compliance for pharmaceutical products.' },
  { name: 'ISO 9001:2015', issuer: 'Bureau Veritas', desc: 'Quality Management System certified by internationally recognised body.' },
  { name: 'WHO-GMP', issuer: 'World Health Organization', desc: 'WHO Good Manufacturing Practices for selected APIs and excipients.' },
  { name: 'FSMA Compliant', issuer: 'US FDA', desc: 'Food Safety Modernization Act compliance for food-grade chemicals.' },
  { name: 'DMF Filed', issuer: 'USFDA / MHRA', desc: 'Drug Master Files filed with US FDA and UK MHRA for key APIs.' },
  { name: 'CEP / COS', issuer: 'EDQM', desc: 'Certificates of Suitability from EDQM for European market APIs.' },
  { name: 'REACH Compliant', issuer: 'ECHA', desc: 'European Chemicals Agency registration and compliance documentation.' },
  { name: 'COPP', issuer: 'CDSCO India', desc: 'Certificate of Pharmaceutical Product for export registration support.' },
]

export default function QualityPage() {
  return (
    <>
      <PageHeader
        title="Our Quality Standards"
        subtitle="Quality is not a department at Chemist India — it is a culture. Every person, process, and product is held to the same rigorous standard."
        breadcrumbs={[{ label: 'About Us', href: '/about-us' }, { label: 'Quality' }]}
        variant="gradient"
        tag="Quality Assurance"
      />

      {/* QC Process */}
      <section className="py-20 bg-bg">
        <div className="container-wide">
          <FadeIn direction="up" className="mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-xlight text-primary text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              Quality Control Process
            </span>
            <h2 className="font-display font-bold text-4xl text-ink mb-4">Six-Stage Quality Assurance</h2>
            <p className="text-ink-muted text-lg max-w-2xl">From supplier selection to final dispatch, every step is controlled, documented, and auditable.</p>
          </FadeIn>

          <div className="space-y-4">
            {qcSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.08 }}
                viewport={{ once: true, margin: '-30px' }}
                className="group flex gap-6 bg-surface border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                  <span className="font-display font-black text-white text-sm">{step.step}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-ink mb-1.5 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-ink-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="container-wide">
          <FadeIn direction="up" className="mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-xlight text-primary text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              Certifications & Compliance
            </span>
            <h2 className="font-display font-bold text-4xl text-ink">Internationally Recognised Credentials</h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="bg-bg border border-border rounded-2xl p-5 hover:border-primary/30 hover:bg-primary-xlight/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-sm text-ink mb-0.5">{cert.name}</h3>
                <p className="text-xs text-cyan font-semibold mb-2">{cert.issuer}</p>
                <p className="text-xs text-ink-subtle leading-relaxed">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
