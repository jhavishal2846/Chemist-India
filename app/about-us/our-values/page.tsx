'use client'

import PageHeader from '@/components/PageHeader'
import { FadeIn } from '@/components/StaggerReveal'
import { motion } from 'framer-motion'

const values = [
  {
    title: 'Quality Above All',
    color: '#243774',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    desc: 'We never compromise on purity, potency, or documentation. Our quality systems go beyond minimum compliance — they reflect our belief that our customers\' patients and consumers deserve the best.',
    points: ['In-house HPLC, GC, and wet chemistry testing', 'CoA and MSDS provided for every batch', 'Pharmacopoeial standards: USP, BP, EP, JP'],
  },
  {
    title: 'Integrity & Transparency',
    color: '#468534',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    desc: 'Honesty governs every transaction. We provide accurate specifications, realistic lead times, and clear pricing — with no hidden fees or surprises. When things go wrong, we own the issue and fix it.',
    points: ['Clear, accurate product specifications', 'Honest communication at every stage', 'Full traceability from manufacturer to delivery'],
  },
  {
    title: 'Global Partnership',
    color: '#F97316',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    desc: 'We celebrate the global nature of chemistry. Our team, our suppliers, and our customers span continents, cultures, and regulatory environments. This diversity makes us stronger and more responsive.',
    points: ['Offices in India, China, UK & USA', 'Suppliers across 20+ countries', 'Regulatory expertise for EU, US, APAC markets'],
  },
  {
    title: 'Customer Success',
    color: '#3A4F9C',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    desc: 'Our success is measured by yours. We work to understand your formulation needs, compliance requirements, and budget constraints — providing tailored solutions rather than generic catalogue responses.',
    points: ['Dedicated account management', 'Technical and regulatory support', 'Custom sampling and trial quantities'],
  },
  {
    title: 'Sustainable Chemistry',
    color: '#10B981',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    desc: 'We actively promote responsible sourcing, green chemistry alternatives where available, and environmentally compliant manufacturing. Sustainability is not a trend for us — it is a long-term commitment.',
    points: ['Green chemistry alternatives highlighted', 'REACH-compliant supply chain', 'Responsible waste and packaging practices'],
  },
  {
    title: 'Innovation Drive',
    color: '#243774',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    desc: 'We constantly expand our portfolio with emerging compounds, new herbal extracts, novel excipients, and next-generation delivery systems. Early adoption of new molecules gives our customers a competitive edge.',
    points: ['New product additions every quarter', 'Early access to novel APIs and intermediates', 'R&D collaboration support'],
  },
]

export default function OurValuesPage() {
  return (
    <>
      <PageHeader
        title="Our Values"
        subtitle="Six core values guide every decision, every partnership, and every product we supply. They are not aspirational statements — they are operational standards."
        breadcrumbs={[{ label: 'About Us', href: '/about-us' }, { label: 'Our Values' }]}
        variant="gradient"
        tag="What We Stand For"
      />

      <section className="py-20 bg-bg">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.08 }}
                viewport={{ once: true, margin: '-30px' }}
                className="group bg-surface border border-border rounded-2xl p-7 hover:shadow-lg transition-all duration-300 hover:border-transparent"
                style={{ '--hover-shadow': `0 10px 30px -5px ${v.color}20` } as React.CSSProperties}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${v.color}15`, color: v.color }}
                >
                  {v.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-ink mb-3" style={{ color: v.color }}>{v.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed mb-5">{v.desc}</p>
                <ul className="space-y-2">
                  {v.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-xs text-ink-muted">
                      <span className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ backgroundColor: `${v.color}20` }}>
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ color: v.color }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
