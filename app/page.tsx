'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/* ─── Animated Counter ────────────────────────────────────────────────────── */

function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const duration = 1600
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * to))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, to])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

/* ─── Molecule SVG Background ─────────────────────────────────────────────── */

function MoleculeBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      viewBox="0 0 1200 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Hexagon rings */}
      <polygon points="600,120 660,155 660,225 600,260 540,225 540,155" stroke="#5AA344" strokeWidth="1.2" />
      <polygon points="660,225 720,260 720,330 660,365 600,330 600,260" stroke="#5AA344" strokeWidth="1.2" />
      <polygon points="540,225 600,260 600,330 540,365 480,330 480,260" stroke="#5AA344" strokeWidth="0.8" />
      <polygon points="600,330 660,365 660,435 600,470 540,435 540,365" stroke="#5AA344" strokeWidth="0.8" />
      <polygon points="720,260 780,295 780,365 720,400 660,365 660,295" stroke="#5AA344" strokeWidth="0.6" />
      <polygon points="480,260 540,295 540,365 480,400 420,365 420,295" stroke="#5AA344" strokeWidth="0.6" />
      {/* Atoms */}
      <circle cx="600" cy="190" r="6" fill="#5AA344" opacity="0.9" />
      <circle cx="660" cy="225" r="5" fill="#5AA344" opacity="0.7" />
      <circle cx="540" cy="225" r="5" fill="#5AA344" opacity="0.7" />
      <circle cx="660" cy="295" r="4" fill="#F97316" opacity="0.8" />
      <circle cx="540" cy="295" r="4" fill="#F97316" opacity="0.8" />
      <circle cx="600" cy="330" r="6" fill="#5AA344" opacity="0.9" />
      <circle cx="720" cy="330" r="3.5" fill="#5AA344" opacity="0.5" />
      <circle cx="480" cy="330" r="3.5" fill="#5AA344" opacity="0.5" />
      {/* Right side molecule */}
      <polygon points="950,200 1000,228 1000,284 950,312 900,284 900,228" stroke="#5AA344" strokeWidth="1" />
      <circle cx="950" cy="256" r="5" fill="#5AA344" opacity="0.6" />
      <circle cx="1000" cy="284" r="4" fill="#F97316" opacity="0.6" />
      {/* Left side molecule */}
      <polygon points="200,280 250,308 250,364 200,392 150,364 150,308" stroke="#5AA344" strokeWidth="1" />
      <circle cx="200" cy="336" r="5" fill="#5AA344" opacity="0.5" />
      {/* Bonds top-right */}
      <line x1="600" y1="190" x2="950" y2="240" stroke="#5AA344" strokeWidth="0.4" strokeDasharray="6 8" />
      <line x1="600" y1="470" x2="200" y2="380" stroke="#5AA344" strokeWidth="0.4" strokeDasharray="6 8" />
      {/* Floating atoms scattered */}
      <circle cx="100" cy="150" r="3" fill="#F97316" opacity="0.4" />
      <circle cx="1100" cy="500" r="3" fill="#5AA344" opacity="0.4" />
      <circle cx="300" cy="600" r="2.5" fill="#5AA344" opacity="0.3" />
      <circle cx="1050" cy="100" r="2.5" fill="#F97316" opacity="0.3" />
      {/* Chemical formula labels */}
      <text x="620" y="185" fill="#5AA344" fontSize="11" fontFamily="monospace" opacity="0.6">C</text>
      <text x="656" y="220" fill="#5AA344" fontSize="10" fontFamily="monospace" opacity="0.5">N</text>
      <text x="534" y="220" fill="#F97316" fontSize="10" fontFamily="monospace" opacity="0.5">O</text>
      <text x="590" y="328" fill="#5AA344" fontSize="11" fontFamily="monospace" opacity="0.6">C</text>
      <text x="615" y="462" fill="#5AA344" fontSize="9"  fontFamily="monospace" opacity="0.4">H₂</text>
    </svg>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const words = ['Precision', 'Chemistry.', 'Global', 'Trust.']

  return (
    <section ref={ref} className="relative overflow-hidden bg-surface-dark pt-32 pb-28 lg:pt-40 lg:pb-36">
      {/* Pharmacy photo background with brand gradient overlay */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/brand/hero-pharmacy.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Navy → green brand gradient */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(110deg, rgba(36,55,116,0.92) 0%, rgba(36,55,116,0.85) 45%, rgba(90,163,68,0.78) 100%)' }}
        />
        {/* Subtle hex pattern texture */}
        <div className="absolute inset-0 hex-pattern opacity-20" />
      </motion.div>

      {/* Animated rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[200, 320, 440].map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-cyan/10"
            style={{ width: size, height: size, top: -size / 2, left: -size / 2 }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="container-wide relative z-10">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/30 bg-cyan/10 text-cyan text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            India · China · UK · USA
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-black text-white leading-none mb-6">
          <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.15 + i * 0.1 }}
                className="inline-block mr-4"
                style={{ color: word.includes('.') ? '#5AA344' : 'white' }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.55 }}
          className="max-w-xl text-lg lg:text-xl text-white/70 leading-relaxed mb-10"
        >
          India's trusted supplier of Active Pharmaceutical Ingredients, industrial chemicals, nutraceuticals, herbal extracts and specialty chemicals — serving clients across four continents.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.7 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <Link
            href="/products/apis"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cta text-white text-sm font-bold hover:bg-cta-dark active:scale-95 transition-all duration-150"
            style={{ boxShadow: '0 8px 24px -4px rgba(90,163,68,0.4)' }}
          >
            Explore Products
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white text-sm font-bold hover:bg-white/10 active:scale-95 transition-all duration-150 backdrop-blur-sm"
          >
            Contact Us
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">Certified:</span>
          {['GMP Certified', 'ISO 9001:2015', 'WHO-GMP', 'DMF Filed', 'CEP/COS'].map((cert) => (
            <span
              key={cert}
              className="px-3 py-1 text-xs font-semibold border border-white/15 text-white/60 rounded-full backdrop-blur-sm"
            >
              {cert}
            </span>
          ))}
        </motion.div>
      </motion.div>

    </section>
  )
}

/* ─── Stats ───────────────────────────────────────────────────────────────── */

function StatsSection() {
  const stats = [
    { value: 25,  suffix: '+', label: 'Years of Experience',  desc: 'Trusted since 1999' },
    { value: 500, suffix: '+', label: 'Products & Compounds', desc: 'Across all categories' },
    { value: 50,  suffix: '+', label: 'Countries Served',     desc: 'Global distribution' },
    { value: 2000, suffix: '+', label: 'Satisfied Clients',   desc: 'And growing' },
  ]

  return (
    <section className="relative -mt-1 z-10">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.08 }}
              viewport={{ once: true, margin: '-40px' }}
              className="group relative bg-surface border border-border hover:border-primary/30 transition-colors duration-300 p-8 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="font-display font-black text-4xl lg:text-5xl text-primary mb-1">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="font-semibold text-ink mb-1 text-sm">{s.label}</div>
              <div className="text-xs text-ink-subtle">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Product Categories ──────────────────────────────────────────────────── */

const categories = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "API's",
    desc: 'Active Pharmaceutical Ingredients meeting global pharmacopoeial standards — USP, BP, EP, JP.',
    count: '200+ products',
    href: '/products/apis',
    color: '#243774',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: 'Intermediates',
    desc: 'High-purity synthesis intermediates for pharmaceutical and fine chemical manufacturing.',
    count: '150+ products',
    href: '/products/intermediates',
    color: '#468534',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Industrial Chemicals',
    desc: 'Comprehensive A-Z catalog of industrial-grade organic and inorganic chemicals.',
    count: '500+ products',
    href: '/products/industrial-chemicals',
    color: '#3A4F9C',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Nutraceuticals',
    desc: 'Premium vitamins, minerals, amino acids and functional ingredients for dietary supplements.',
    count: '100+ products',
    href: '/products/nutraceuticals',
    color: '#243774',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Herbal Extracts',
    desc: 'Standardised botanical extracts with guaranteed active content — validated by HPLC.',
    count: '80+ products',
    href: '/products/herbal-extracts',
    color: '#468534',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: 'Excipients',
    desc: 'Pharmaceutical-grade excipients for solid, liquid, and semi-solid dosage forms.',
    count: '120+ products',
    href: '/products/excipients',
    color: '#3A4F9C',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'Dyes & Intermediates',
    desc: 'Synthetic and natural dyes, pigments, and dye intermediates for pharma and industry.',
    count: '90+ products',
    href: '/products/dyes-and-intermediates',
    color: '#243774',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: 'Food Chemicals',
    desc: 'Food-grade chemicals, preservatives, flavours and additives meeting FSSAI & Codex standards.',
    count: '60+ products',
    href: '/products/food-chemicals',
    color: '#468534',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: 'Pellets',
    desc: 'Multi-particulate pellet systems for controlled and modified drug-release formulations.',
    count: '30+ products',
    href: '/products/pellets',
    color: '#3A4F9C',
  },
]

function ProductCategoriesSection() {
  return (
    <section className="py-24 bg-bg">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          viewport={{ once: true, margin: '-60px' }}
          className="mb-14 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-xlight text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            Product Portfolio
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-ink mb-4 text-balance">
            Comprehensive Chemical Catalog
          </h2>
          <p className="text-ink-muted text-lg leading-relaxed">
            From Active Pharmaceutical Ingredients to specialty food chemicals — we stock and source compounds to meet every requirement with guaranteed quality and documentation.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.06 }}
              viewport={{ once: true, margin: '-40px' }}
            >
              <Link
                href={cat.href}
                className="group relative flex flex-col h-full bg-surface border border-border rounded-2xl p-6 overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Hover tint */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ backgroundColor: `${cat.color}05` }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  {cat.icon}
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-lg text-ink mb-2 group-hover:text-primary transition-colors duration-200">
                  {cat.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed flex-1 mb-4">
                  {cat.desc}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-cyan bg-cyan/10 px-2.5 py-1 rounded-full">
                    {cat.count}
                  </span>
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/enquiry"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-primary text-primary text-sm font-bold hover:bg-primary hover:text-white active:scale-95 transition-all duration-200"
          >
            Request a Custom Quote
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Industries ──────────────────────────────────────────────────────────── */

const industries = [
  {
    name: 'Pharmaceutical',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
    desc: 'APIs and excipients for drug formulation',
  },
  {
    name: 'Nutraceutical',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    desc: 'Vitamins, minerals & supplements',
  },
  {
    name: 'Food & Beverage',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>,
    desc: 'Food-grade additives & preservatives',
  },
  {
    name: 'Cosmetics & Personal Care',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    desc: 'Ingredients for personal care products',
  },
  {
    name: 'Agrochemical',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.707.707M18.364 18.364l.707.707M3 11h1m16 0h1M4.22 17.78l.707-.707M18.364 5.636l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>,
    desc: 'Pesticide intermediates & agro chemicals',
  },
  {
    name: 'Paint & Coatings',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    desc: 'Pigments, dyes & coating chemicals',
  },
  {
    name: 'Textile',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
    desc: 'Dye intermediates & textile chemicals',
  },
  {
    name: 'Research & Academia',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    desc: 'Reference standards & lab chemicals',
  },
]

function IndustriesSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          viewport={{ once: true }}
          className="mb-14 text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-xlight text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            Industries We Serve
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-ink mb-4">
            Serving Diverse Industries Globally
          </h2>
          <p className="text-ink-muted text-lg">
            Our chemicals and ingredients power critical industries worldwide. We understand each sector's unique requirements and compliance needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.05 }}
              viewport={{ once: true, margin: '-30px' }}
            >
              <Link
                href="/industry-served"
                className="group flex flex-col items-center text-center p-6 rounded-2xl border border-border hover:border-cyan/40 hover:bg-primary-xlight/50 transition-all duration-300 h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 text-primary group-hover:scale-110 transition-transform duration-300">
                  {ind.icon}
                </div>
                <h3 className="font-display font-bold text-sm text-ink group-hover:text-primary mb-1.5 transition-colors">
                  {ind.name}
                </h3>
                <p className="text-xs text-ink-subtle leading-relaxed">{ind.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/industry-served"
            className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all duration-200"
          >
            View All Industries
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Why Choose Us ───────────────────────────────────────────────────────── */

const pillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Guaranteed Quality',
    desc: 'Every product undergoes rigorous in-house QC testing. COA, MSDS, and pharmacopoeial standards documentation provided with every shipment.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Global Compliance',
    desc: 'Regulatory-ready documentation including DMF filings, CEP, COS, and COPP certifications for seamless import/export worldwide.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Reliable Supply Chain',
    desc: 'Established manufacturing and sourcing partnerships in India, China, and Europe ensure consistent availability and competitive pricing.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: 'Expert Support',
    desc: 'Dedicated technical and regulatory affairs teams provide application support, sample assistance, and swift response to your enquiries.',
  },
]

function WhyUsSection() {
  return (
    <section className="py-24 bg-surface-dark relative overflow-hidden">
      <div className="absolute inset-0 hex-pattern opacity-20 pointer-events-none" />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-14 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/30 bg-cyan/10 text-cyan text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            Why Chemist India
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-white mb-4 text-balance">
            Your Trusted Chemist Partner Since 1999
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            We combine scientific expertise, global sourcing capabilities, and uncompromising quality control to deliver chemicals your business can rely on.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.1 }}
              viewport={{ once: true, margin: '-40px' }}
              className="group flex gap-5 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center flex-shrink-0 text-cyan group-hover:scale-110 transition-transform duration-300">
                {p.icon}
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{p.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Global Presence ─────────────────────────────────────────────────────── */

const offices = [
  {
    country: 'India',
    code: 'IN',
    city: 'Mumbai',
    desc: 'Head Office & R&D Centre',
    address: 'Lower Parel, Mumbai — 400 013',
    phone: '+91 22 4000 5000',
    email: 'india@chemicalindia.com',
  },
  {
    country: 'China',
    code: 'CN',
    city: 'Beijing',
    desc: 'Asia-Pacific Sourcing Hub',
    address: 'Zhongguancun, Beijing — 100 080',
    phone: '+86 10 6200 0000',
    email: 'china@chemicalindia.com',
  },
  {
    country: 'United Kingdom',
    code: 'UK',
    city: 'London',
    desc: 'Europe & Middle East Office',
    address: 'Canary Wharf, London — E14 5AB',
    phone: '+44 20 7000 0000',
    email: 'uk@chemicalindia.com',
  },
  {
    country: 'USA',
    code: 'US',
    city: 'New Jersey',
    desc: 'Americas Regional Office',
    address: 'Edison, New Jersey — NJ 08837',
    phone: '+1 732 000 0000',
    email: 'usa@chemicalindia.com',
  },
]

function GlobalPresenceSection() {
  return (
    <section className="py-24 bg-bg">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-14 text-center max-w-xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-xlight text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            Global Presence
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-ink mb-4">
            Four Countries. One Standard.
          </h2>
          <p className="text-ink-muted text-lg">
            Regional offices ensure local expertise and faster response times across all major markets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {offices.map((office, i) => (
            <motion.div
              key={office.country}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.08 }}
              viewport={{ once: true, margin: '-30px' }}
              className="group bg-surface border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-xs font-black text-primary tracking-wider">{office.code}</span>
              </div>
              <h3 className="font-display font-bold text-ink text-lg mb-0.5">{office.city}</h3>
              <p className="text-xs text-cyan font-semibold mb-3">{office.desc}</p>
              <p className="text-xs text-ink-subtle leading-relaxed mb-3">{office.address}</p>
              <div className="space-y-1">
                <a href={`tel:${office.phone}`} className="block text-xs text-ink-muted hover:text-primary transition-colors">{office.phone}</a>
                <a href={`mailto:${office.email}`} className="block text-xs text-primary font-medium hover:text-primary-dark transition-colors">{office.email}</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Certifications ──────────────────────────────────────────────────────── */

const certs = [
  { name: 'GMP Certified',    desc: 'Good Manufacturing Practice' },
  { name: 'ISO 9001:2015',    desc: 'Quality Management System' },
  { name: 'WHO-GMP',          desc: 'World Health Organization' },
  { name: 'FSMA Compliant',   desc: 'FDA Food Safety Modernization' },
  { name: 'DMF Filed',        desc: 'Drug Master File — USFDA' },
  { name: 'CEP/COS',          desc: 'Certificate of Suitability — EDQM' },
  { name: 'REACH Compliant',  desc: 'European Chemicals Agency' },
  { name: 'Halal Certified',  desc: 'Selected product lines' },
]

function CertificationsSection() {
  return (
    <section className="py-20 bg-surface border-y border-border overflow-hidden">
      <div className="container-wide mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display font-bold text-3xl text-ink mb-2">Quality & Compliance</h2>
          <p className="text-ink-muted">Internationally recognised certifications you can trust</p>
        </motion.div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 px-6">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            viewport={{ once: true }}
            className="group flex flex-col items-center gap-1.5 px-5 py-4 rounded-2xl border border-border hover:border-primary/30 hover:bg-primary-xlight/40 bg-bg transition-all duration-300 min-w-[140px]"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <span className="font-display font-bold text-sm text-ink">{cert.name}</span>
            <span className="text-xs text-ink-subtle text-center">{cert.desc}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─── Blog Preview ────────────────────────────────────────────────────────── */

const blogPosts = [
  {
    date: 'May 15, 2025',
    tag: 'Regulatory',
    title: 'Understanding DMF Filings: A Complete Guide for API Suppliers',
    excerpt: 'Drug Master Files are critical for API registration in regulated markets. Learn the types, requirements, and best practices for successful DMF submissions.',
    href: '/blog',
  },
  {
    date: 'Apr 28, 2025',
    tag: 'Industry Trends',
    title: 'The Growing Demand for Herbal Extract Standardisation',
    excerpt: 'As nutraceuticals gain mainstream acceptance, standardised herbal extracts with validated active content are becoming the industry norm.',
    href: '/blog',
  },
  {
    date: 'Apr 10, 2025',
    tag: 'Quality',
    title: 'What is CEP/COS Certification and Why Does It Matter?',
    excerpt: 'A Certificate of Suitability from the EDQM is the most widely recognised route for demonstrating API compliance to European regulatory authorities.',
    href: '/blog',
  },
]

function BlogPreviewSection() {
  return (
    <section className="py-24 bg-bg">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-xlight text-primary text-xs font-bold tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
              Knowledge Hub
            </span>
            <h2 className="font-display font-bold text-4xl text-ink">Latest from the Blog</h2>
          </div>
          <Link
            href="/blog"
            className="flex-shrink-0 inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all duration-200"
          >
            View All Posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.08 }}
              viewport={{ once: true, margin: '-30px' }}
            >
              <Link
                href={post.href}
                className="group flex flex-col h-full bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                {/* Card top accent */}
                <div className="h-1 bg-primary group-hover:bg-cta transition-colors duration-300" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-0.5 bg-primary-xlight text-primary text-xs font-bold rounded-full">{post.tag}</span>
                    <span className="text-xs text-ink-subtle">{post.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-ink text-lg leading-snug mb-3 group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-primary text-sm font-bold">
                    Read more
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProductCategoriesSection />
      <IndustriesSection />
      <WhyUsSection />
      <CertificationsSection />
      <GlobalPresenceSection />
      <BlogPreviewSection />
    </>
  )
}
