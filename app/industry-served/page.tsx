'use client'

import PageHeader from '@/components/PageHeader'
import { motion } from 'framer-motion'
import Link from 'next/link'

const industries = [
  {
    name: 'Pharmaceutical',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: '#243774',
    desc: 'We supply GMP-certified APIs, excipients, intermediates, and impurity reference standards for oral solid, injectable, topical, and liquid dosage forms.',
    products: ["APIs (USP/BP/EP grade)", "Pharmaceutical Excipients", "Impurities & Reference Standards", "Drug Delivery Pellets"],
    clients: 'Formulators, CMOs, Generic Manufacturers, Innovator Companies',
  },
  {
    name: 'Nutraceutical',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    color: '#10B981',
    desc: 'Premium vitamins, minerals, amino acids, herbal extracts, and specialty ingredients for dietary supplements, functional foods, and health products.',
    products: ['Vitamins & Minerals', 'Amino Acids & Proteins', 'Herbal Extracts (Standardised)', 'Antioxidants & Phytochemicals'],
    clients: 'Supplement Brands, Sports Nutrition Companies, Functional Food Manufacturers',
  },
  {
    name: 'Food & Beverage',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: '#F97316',
    desc: 'Food-grade chemicals, preservatives, sweeteners, emulsifiers, acidulants, colorants, and stabilisers meeting FSSAI, Codex, and EU regulations.',
    products: ['Preservatives & Antioxidants', 'Sweeteners (Bulk & High-Intensity)', 'Emulsifiers & Stabilisers', 'Food Colorants (E-numbered)'],
    clients: 'Food Processors, Beverage Manufacturers, Bakery & Confectionery',
  },
  {
    name: 'Cosmetics & Personal Care',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    color: '#6366F1',
    desc: 'Active ingredients, emollients, humectants, preservatives, and specialty actives for skin care, hair care, and personal care product formulation.',
    products: ['Cosmetic Actives (Niacinamide, Retinol, etc.)', 'Humectants & Emollients', 'Preservative Systems', 'Natural Botanical Extracts'],
    clients: 'Cosmetics Manufacturers, Derma Brands, Private Label Producers',
  },
  {
    name: 'Agrochemical',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: '#84CC16',
    desc: 'Technical-grade agrochemical intermediates, pesticide raw materials, and specialty chemicals for the crop protection and agricultural sector.',
    products: ['Pesticide Intermediates', 'Herbicide Actives', 'Fungicide Components', 'Micronutrient Fertilisers'],
    clients: 'Agrochemical Formulators, Crop Protection Companies, Agri-Input Manufacturers',
  },
  {
    name: 'Paint & Coatings',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    color: '#EF4444',
    desc: 'Pigments, dyes, solvents, resins, additives, and specialty chemicals for architectural paints, industrial coatings, and protective coating systems.',
    products: ['Organic & Inorganic Pigments', 'Dyes & Colorants', 'Solvents & Diluents', 'Coating Additives'],
    clients: 'Paint Manufacturers, Industrial Coating Producers, Construction Chemical Companies',
  },
  {
    name: 'Textile',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: '#F59E0B',
    desc: 'Acid dyes, reactive dyes, disperse dyes, vat dyes, dye intermediates, and textile auxiliaries for fabric dyeing and finishing applications.',
    products: ['Reactive Dyes', 'Acid & Basic Dyes', 'Disperse Dyes', 'Dye Intermediates & Auxiliaries'],
    clients: 'Textile Mills, Dyeing Houses, Garment Manufacturers, Carpet Producers',
  },
  {
    name: 'Research & Academia',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
    color: '#468534',
    desc: 'Reference standards, analytical reagents, HPLC solvents, impurity markers, and specialty chemicals for pharmaceutical research and academic institutions.',
    products: ['HPLC & GC-Grade Solvents', 'Reference Standards', 'Impurity Markers', 'Research-Grade APIs'],
    clients: 'Universities, Research Institutes, Pharmaceutical R&D Labs, CROs',
  },
]

export default function IndustryServedPage() {
  return (
    <>
      <PageHeader
        title="Industries We Serve"
        subtitle="From pharmaceutical manufacturers to textile mills — our comprehensive chemical portfolio serves eight distinct sectors across global markets."
        breadcrumbs={[{ label: 'Industry Served' }]}
        variant="gradient"
        tag="Global Industry Coverage"
      />

      <section className="py-20 bg-bg">
        <div className="container-wide">
          <div className="space-y-6">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.06 }}
                viewport={{ once: true, margin: '-30px' }}
                className="group bg-surface border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:border-transparent"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Icon + title */}
                  <div className="flex items-start gap-5 lg:w-64 flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${ind.color}15`, color: ind.color }}>
                      {ind.icon}
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-xl text-ink group-hover:transition-colors" style={{ '--hover-color': ind.color } as React.CSSProperties}>
                        {ind.name}
                      </h2>
                      <span className="text-xs font-semibold" style={{ color: ind.color }}>
                        {ind.clients.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex-1">
                    <p className="text-ink-muted leading-relaxed mb-4">{ind.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {ind.products.map((p) => (
                        <span key={p} className="px-3 py-1 text-xs font-semibold rounded-full"
                          style={{ backgroundColor: `${ind.color}10`, color: ind.color }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="lg:flex-shrink-0 flex items-center">
                    <Link
                      href="/enquiry"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all duration-200 whitespace-nowrap"
                      style={{ borderColor: ind.color, color: ind.color }}
                    >
                      Request Quote
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
