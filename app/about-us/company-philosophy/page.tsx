'use client'

import PageHeader from '@/components/PageHeader'
import { FadeIn } from '@/components/StaggerReveal'
import { motion } from 'framer-motion'

const principles = [
  {
    number: '01',
    title: 'Scientific Integrity',
    desc: 'Every compound we supply is rigorously tested and documented. We never compromise on purity specifications, analytical data, or regulatory compliance. Our laboratory findings are transparent and reproducible.',
  },
  {
    number: '02',
    title: 'Customer-First Mindset',
    desc: 'We view ourselves as an extension of our customers\' teams. Understanding their processes, challenges, and regulatory environments allows us to provide chemical solutions — not just chemicals.',
  },
  {
    number: '03',
    title: 'Global Responsibility',
    desc: 'Operating across four continents means embracing diverse regulatory frameworks, cultural contexts, and environmental standards. We hold ourselves to the highest applicable standard in every market we serve.',
  },
  {
    number: '04',
    title: 'Continuous Innovation',
    desc: 'The chemical sciences evolve constantly. We invest continuously in expanding our product portfolio, updating our analytical capabilities, and deepening regulatory expertise to stay ahead of our customers\' needs.',
  },
]

export default function PhilosophyPage() {
  return (
    <>
      <PageHeader
        title="Company Philosophy"
        subtitle="Chemistry is the science of transformation. At Chemist India, we transform raw materials into opportunities — and partnerships into shared success."
        breadcrumbs={[{ label: 'About Us', href: '/about-us' }, { label: 'Company Philosophy' }]}
        variant="gradient"
        tag="Our Foundation"
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-bg">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <FadeIn direction="up" delay={0}>
              <div className="bg-surface border border-border rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-cyan mb-3">Our Vision</div>
                <h3 className="font-display font-bold text-2xl text-ink mb-4">To be the most trusted chemical partner for pharmaceutical and industrial manufacturers globally.</h3>
                <p className="text-ink-muted leading-relaxed">
                  We envision a world where every pharmaceutical, food, or industrial manufacturer — regardless of size or geography — has access to consistently high-quality chemicals backed by full scientific documentation and expert support.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.12}>
              <div className="bg-surface border border-border rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-cta/10 text-cta flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-cta mb-3">Our Mission</div>
                <h3 className="font-display font-bold text-2xl text-ink mb-4">To supply precision-verified chemicals with complete regulatory documentation and exceptional customer service.</h3>
                <p className="text-ink-muted leading-relaxed">
                  Our mission is grounded in three commitments: sourcing only from vetted, GMP-compliant manufacturers; testing every product in our in-house analytical laboratory; and delivering complete, audit-ready documentation with every shipment.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Core principles */}
          <FadeIn direction="up">
            <div className="mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-xlight text-primary text-xs font-bold tracking-widest uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                Core Principles
              </span>
              <h2 className="font-display font-bold text-4xl text-ink">The Principles Behind Every Decision</h2>
            </div>
          </FadeIn>

          <div className="space-y-5">
            {principles.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.1 }}
                viewport={{ once: true, margin: '-40px' }}
                className="group flex gap-6 bg-surface border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="font-display font-black text-5xl text-border group-hover:text-primary/20 transition-colors duration-300 flex-shrink-0 leading-none mt-1">
                  {p.number}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-ink mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-ink-muted leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
