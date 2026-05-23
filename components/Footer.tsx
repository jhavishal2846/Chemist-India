import Link from 'next/link'
import Image from 'next/image'

const aboutLinks = [
  { label: 'Company Philosophy', href: '/about-us/company-philosophy' },
  { label: 'Our Values',         href: '/about-us/our-values' },
  { label: 'Quality',            href: '/about-us/quality' },
  { label: 'How We Work',        href: '/about-us/how-we-work' },
  { label: 'Partner Us',         href: '/partner-us' },
]

const productLinks = [
  { label: "API's",                 href: '/products/apis' },
  { label: 'Intermediates',         href: '/products/intermediates' },
  { label: 'Industrial Chemicals',  href: '/products/industrial-chemicals' },
  { label: 'Nutraceuticals',        href: '/products/nutraceuticals' },
  { label: 'Herbal Extracts',       href: '/products/herbal-extracts' },
  { label: 'Excipients',            href: '/products/excipients' },
  { label: 'Dyes & Intermediates',  href: '/products/dyes-and-intermediates' },
  { label: 'Food Chemicals',        href: '/products/food-chemicals' },
  { label: 'Pellets',               href: '/products/pellets' },
]

const quickLinks = [
  { label: 'Industry Served', href: '/industry-served' },
  { label: 'Enquiry',         href: '/enquiry' },
  { label: 'Contact Us',      href: '/contact-us' },
  { label: 'Blog',            href: '/blog' },
]

const socials = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
]

function HexIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 32" fill="none" className={className}>
      <path d="M14 1L27 8.5V23.5L14 31L1 23.5V8.5L14 1Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="16" r="2.5" fill="currentColor" />
      <line x1="14" y1="1"    x2="14"   y2="13.5"  stroke="currentColor" strokeWidth="1.2" />
      <line x1="27" y1="8.5"  x2="16.2" y2="14.5"  stroke="currentColor" strokeWidth="1.2" />
      <line x1="27" y1="23.5" x2="16.2" y2="17.5"  stroke="currentColor" strokeWidth="1.2" />
      <line x1="14" y1="31"   x2="14"   y2="18.5"  stroke="currentColor" strokeWidth="1.2" />
      <line x1="1"  y1="23.5" x2="11.8" y2="17.5"  stroke="currentColor" strokeWidth="1.2" />
      <line x1="1"  y1="8.5"  x2="11.8" y2="14.5"  stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-navy text-white/70">
      {/* CTA Band */}
      <div className="border-b border-white/8">
        <div className="container-wide py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-display text-2xl lg:text-3xl font-bold text-white text-balance leading-snug">
              Ready to partner with a trusted chemical supplier?
            </p>
            <p className="mt-2 text-sm text-white/50 max-w-md">
              Speak with our team about APIs, industrial chemicals, nutraceuticals, or any custom sourcing requirements.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link
              href="/enquiry"
              className="inline-flex items-center px-6 py-3 rounded-full bg-cta text-white text-sm font-bold hover:bg-cta-dark transition-colors whitespace-nowrap"
            >
              Enquire Now
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center px-6 py-3 rounded-full border border-white/20 text-white/80 text-sm font-semibold hover:border-white/40 hover:text-white transition-colors whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Link Grid */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-5" aria-label="Chemist India Ltd. — Home">
              <Image
                src="/brand/logo-stacked-white.png"
                alt="Chemist India Ltd."
                width={1600}
                height={718}
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/50 mb-5 max-w-xs">
              Precision chemistry, global trust. India's leading supplier of APIs, industrial chemicals, nutraceuticals, herbal extracts, excipients, dyes and more.
            </p>
            <address className="text-xs text-white/40 not-italic leading-relaxed mb-5">
              Mumbai, India | Beijing, China<br />
              London, UK | New York, USA
            </address>
            <div className="flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-white/30">About Us</p>
            <ul className="space-y-2.5">
              {aboutLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-white/30">Products</p>
            <ul className="space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-white/30">Quick Links</p>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-8 mb-3 text-[10px] font-bold uppercase tracking-widest text-white/30">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {['GMP', 'ISO', 'WHO', 'DMF', 'CEP'].map((cert) => (
                <span key={cert} className="px-2 py-0.5 text-[10px] font-bold border border-white/15 text-white/50 rounded">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {year} Chemist India. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span>India · China · UK · USA</span>
            <Link href="/contact-us" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/contact-us" className="hover:text-white/60 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
