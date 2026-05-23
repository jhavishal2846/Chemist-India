'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Nav Data ────────────────────────────────────────────────────────────── */

type NavLink    = { label: string; href: string; desc?: string }
type NavSection = { heading: string; links: NavLink[] }
type NavItem    =
  | { label: string; href: string; mega?: false }
  | { label: string; href?: string; mega: true; sections: NavSection[] }

const navItems: NavItem[] = [
  {
    label: 'About Us',
    mega: true,
    sections: [
      {
        heading: 'Company',
        links: [
          { label: 'Company Philosophy', href: '/about-us/company-philosophy', desc: 'Our guiding principles' },
          { label: 'Our Values',         href: '/about-us/our-values',         desc: 'What we stand for' },
          { label: 'Quality',            href: '/about-us/quality',            desc: 'Our quality standards' },
          { label: 'How We Work',        href: '/about-us/how-we-work',        desc: 'Our process & approach' },
        ],
      },
    ],
  },
  {
    label: 'Products',
    mega: true,
    sections: [
      {
        heading: 'Pharmaceuticals',
        links: [
          { label: "API's",          href: '/products/apis',         desc: 'Active Pharma Ingredients' },
          { label: 'Intermediates',  href: '/products/intermediates', desc: 'Synthesis intermediates' },
          { label: 'Impurities',     href: '/products/impurities',   desc: 'Reference standards' },
        ],
      },
      {
        heading: 'Chemicals',
        links: [
          { label: 'Industrial Chemicals A-Z',   href: '/products/industrial-chemicals', desc: 'Full catalog' },
          { label: 'Organic & Inorganic',        href: '/products/organic-inorganic',    desc: 'Lab-grade chemicals' },
          { label: 'Food Chemicals',             href: '/products/food-chemicals',       desc: 'Food-grade approved' },
        ],
      },
      {
        heading: 'Specialty',
        links: [
          { label: 'Nutraceuticals',         href: '/products/nutraceuticals',          desc: 'Vitamins & supplements' },
          { label: 'Herbal Extracts',        href: '/products/herbal-extracts',         desc: 'Botanical extracts' },
          { label: 'Excipients',             href: '/products/excipients',              desc: 'Pharma excipients' },
          { label: 'Dyes & Intermediates',   href: '/products/dyes-and-intermediates',  desc: 'Colorants & dye raw materials' },
          { label: 'Pellets',                href: '/products/pellets',                 desc: 'Multi-particulate systems' },
        ],
      },
    ],
  },
  { label: 'Industry Served', href: '/industry-served' },
  { label: 'Partner Us',      href: '/partner-us' },
  { label: 'Blog',            href: '/blog' },
]

/* ─── Hex Logo Icon ──────────────────────────────────────────────────────── */

function HexIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M14 1L27 8.5V23.5L14 31L1 23.5V8.5L14 1Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="16" r="2.5" fill="currentColor" />
      <line x1="14" y1="1"    x2="14"  y2="13.5"  stroke="currentColor" strokeWidth="1.2" />
      <line x1="27" y1="8.5"  x2="16.2" y2="14.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="27" y1="23.5" x2="16.2" y2="17.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="14" y1="31"   x2="14"  y2="18.5"  stroke="currentColor" strokeWidth="1.2" />
      <line x1="1"  y1="23.5" x2="11.8" y2="17.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="1"  y1="8.5"  x2="11.8" y2="14.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

/* ─── Mega Menu ──────────────────────────────────────────────────────────── */

function MegaMenu({ sections, open }: { sections: NavSection[]; open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,   scale: 1,    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }}
          exit={{    opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.15, ease: [0.7, 0, 0.84, 0] } }}
          className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-2xl border border-border bg-surface/98 backdrop-blur-xl shadow-xl p-6 z-50 w-max ${
            sections.length === 3 ? 'min-w-[640px]' : sections.length === 2 ? 'min-w-[440px]' : 'min-w-[280px]'
          }`}
        >
          <div className={`grid gap-8 ${sections.length === 3 ? 'grid-cols-3' : sections.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            {sections.map((sec) => (
              <div key={sec.heading}>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan">
                  {sec.heading}
                </p>
                <ul className="space-y-0.5">
                  {sec.links.map((lnk) => (
                    <li key={lnk.href}>
                      <Link
                        href={lnk.href}
                        className="group flex flex-col px-2.5 py-2 rounded-xl hover:bg-primary-xlight transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                      >
                        <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors duration-150">
                          {lnk.label}
                        </span>
                        {lnk.desc && (
                          <span className="text-xs text-ink-subtle mt-0.5">{lnk.desc}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Mobile Drawer ──────────────────────────────────────────────────────── */

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => { if (!open) setExpanded(null) }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36, mass: 0.8 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[90vw] bg-surface shadow-2xl overflow-y-auto lg:hidden flex flex-col"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <Link href="/" onClick={onClose} className="flex items-center" aria-label="Chemist India Ltd. — Home">
                <Image
                  src="/brand/logo-horizontal.png"
                  alt="Chemist India Ltd."
                  width={2304}
                  height={301}
                  className="h-9 w-auto"
                />
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 py-4 px-4">
              {navItems.map((item) =>
                item.mega ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold text-ink"
                    >
                      {item.label}
                      <motion.svg
                        className="w-4 h-4 text-ink-subtle"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                        animate={{ rotate: expanded === item.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {expanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                          className="overflow-hidden"
                        >
                          {item.sections.map((sec) => (
                            <div key={sec.heading} className="pl-4 pb-2">
                              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan">
                                {sec.heading}
                              </p>
                              {sec.links.map((lnk) => (
                                <Link
                                  key={lnk.href}
                                  href={lnk.href}
                                  onClick={onClose}
                                  className="block px-3 py-2 rounded-lg text-sm text-ink/80 hover:text-primary hover:bg-primary-xlight transition-colors"
                                >
                                  {lnk.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={onClose}
                    className="block px-3 py-3 rounded-xl text-sm font-semibold text-ink hover:text-primary hover:bg-primary-xlight transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA */}
            <div className="p-5 border-t border-border space-y-2.5">
              <Link
                href="/enquiry"
                onClick={onClose}
                className="flex items-center justify-center w-full px-5 py-3 rounded-full bg-cta text-white text-sm font-bold hover:bg-cta-dark transition-colors"
              >
                Enquire Now
              </Link>
              <Link
                href="/contact-us"
                onClick={onClose}
                className="flex items-center justify-center w-full px-5 py-3 rounded-full border border-border text-sm font-semibold text-ink hover:border-primary hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

/* ─── Main Navbar ─────────────────────────────────────────────────────────── */

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen]           = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const hoverRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const threshold = pathname === '/' ? window.innerHeight * 0.85 : 64
    const check = () => setScrolled(window.scrollY > threshold)
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check) }
  }, [pathname])

  useEffect(() => { setOpen(null); setMobileOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <motion.header
        className="fixed top-0 left-0 right-0 z-30"
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <motion.div
          animate={{
            backgroundColor: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(7,20,40,0.0)',
            backdropFilter:  scrolled ? 'blur(20px)'             : 'blur(0px)',
            borderBottomColor: scrolled ? 'rgba(213,224,234,0.8)' : 'rgba(213,224,234,0)',
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="border-b"
        >
          <div className="container-wide">
            <div className="flex items-center justify-between h-16 lg:h-[72px]">

              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:rounded-lg" aria-label="Chemist India Ltd. — Home">
                <Image
                  src={scrolled ? '/brand/logo-horizontal.png' : '/brand/logo-horizontal-white.png'}
                  alt="Chemist India Ltd."
                  width={2304}
                  height={301}
                  priority
                  className="h-9 w-auto lg:h-10 transition-opacity duration-200"
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
                {navItems.map((item) =>
                  item.mega ? (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => { if (hoverRef.current) clearTimeout(hoverRef.current); setOpen(item.label) }}
                      onMouseLeave={() => { hoverRef.current = setTimeout(() => setOpen(null), 130) }}
                    >
                      <button
                        aria-expanded={open === item.label}
                        aria-haspopup="true"
                        className={`flex items-center gap-1 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:rounded transition-colors duration-150 ${
                          !scrolled ? 'text-white/80 hover:text-white' : 'text-ink/80 hover:text-ink'
                        }`}
                      >
                        {item.label}
                        <motion.svg
                          className="w-3.5 h-3.5 opacity-60"
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                          animate={{ rotate: open === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      <MegaMenu sections={item.sections} open={open === item.label} />
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href!}
                      className={`relative text-sm font-semibold transition-colors duration-150 ${
                        !scrolled ? 'text-white/80 hover:text-white' : 'text-ink/80 hover:text-ink'
                      } ${pathname === item.href ? (!scrolled ? 'text-cyan' : 'text-primary') : ''}`}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-cyan rounded-full"
                        />
                      )}
                    </Link>
                  )
                )}
              </nav>

              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/enquiry"
                  className="inline-flex items-center px-4 py-2 rounded-full border border-cta/60 text-cta text-sm font-semibold hover:bg-cta hover:text-white transition-all duration-150"
                >
                  Enquire Now
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark active:scale-95 transition-all duration-150"
                >
                  Contact Us
                </Link>
              </div>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2.5 rounded-xl hover:bg-black/5 transition-colors focus-visible:ring-2 focus-visible:ring-cyan focus-visible:outline-none"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation"
                aria-expanded={mobileOpen}
              >
                <svg
                  className={`w-5 h-5 transition-colors duration-200 ${!scrolled ? 'text-white' : 'text-ink'}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
