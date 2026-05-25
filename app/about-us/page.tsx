'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import { FadeIn } from '@/components/StaggerReveal'

const aboutPages = [
  {
    title: 'Company Philosophy',
    href: '/about-us/company-philosophy',
    desc: 'Our guiding principles of integrity, scientific excellence, and global responsibility that have defined our journey since 1999.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Our Values',
    href: '/about-us/our-values',
    desc: 'The core values that shape every decision, partnership, and product we deliver to customers around the world.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Quality',
    href: '/about-us/quality',
    desc: 'Our commitment to pharmacopoeial standards, GMP compliance, and rigorous quality control at every stage of production.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'How We Work',
    href: '/about-us/how-we-work',
    desc: 'Our end-to-end process — from sourcing and testing to regulatory documentation and global delivery.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
]

export default function AboutUsPage() {
  return (
    <>
      <PageHeader
        title="About Chemist India"
        subtitle="25 years of precision chemistry — supplying APIs, industrial chemicals, and specialty ingredients to pharma, food, and industrial sectors worldwide."
        breadcrumbs={[{ label: 'About Us' }]}
        variant="gradient"
        tag="Since 1999"
      />

      {/* Overview */}
      <section className="py-20 bg-bg">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-xlight text-primary text-xs font-bold tracking-widest uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                Who We Are
              </span>
              <h2 className="font-display font-bold text-4xl text-ink mb-6 text-balance leading-tight">
                A Chemist Supplier Built on Science and Trust
              </h2>
              <div className="space-y-4 text-ink-muted leading-relaxed">
                <p>
                  Chemist India Limited is headquartered in Chandigarh and serves manufacturers across India and overseas with a single mission: making high-quality pharmaceutical and industrial chemicals accessible, traceable, and reliably documented.
                </p>
                <p>
                  We source, quality-test, and supply a comprehensive portfolio of Active Pharmaceutical Ingredients (APIs), intermediates, industrial chemicals, nutraceuticals, herbal extracts, excipients, dyes, food chemicals, impurities, and pellets — backed by full regulatory documentation and technical support.
                </p>
                <p>
                  Our customers include pharmaceutical manufacturers, nutraceutical brands, research institutions, and industrial processors. Every product we supply is tested to pharmacopoeial or equivalent standards and accompanied by COA, MSDS, and applicable regulatory documentation.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '25+', label: 'Years in Business', color: 'text-primary' },
                  { value: '50+', label: 'Countries Served', color: 'text-cyan' },
                  { value: '500+', label: 'Products Stocked', color: 'text-cta' },
                  { value: '2000+', label: 'Active Clients', color: 'text-primary' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-surface border border-border rounded-2xl p-6 text-center">
                    <div className={`font-display font-black text-4xl mb-1 ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-ink-subtle font-semibold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Sub-pages */}
      <section className="py-16 bg-surface border-t border-border">
        <div className="container-wide">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl text-ink mb-10"
          >
            Learn More About Us
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {aboutPages.map((page, i) => (
              <motion.div
                key={page.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Link
                  href={page.href}
                  className="group flex flex-col h-full bg-bg border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-xlight text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {page.icon}
                  </div>
                  <h3 className="font-display font-bold text-ink mb-2 group-hover:text-primary transition-colors">{page.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed flex-1">{page.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-xs font-bold">
                    Explore
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
