'use client'

import PageHeader from '@/components/PageHeader'
import Pagination from '@/components/Pagination'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { toSlug } from '@/lib/products/utils'
import { industrialListing as products } from '@/lib/products/listings'
import { useState, useEffect } from 'react'

const cats = ['All', 'Acid', 'Base', 'Alcohol', 'Aromatic', 'Halide', 'Inorganic', 'Ester', 'Ketone']
const PER_PAGE = 15
const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.04 } }, exit: {} }
const rowVariants  = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit:   { opacity: 0, y: -4, transition: { duration: 0.12 } },
}

export default function IndustrialChemicalsPage() {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')
  const [page, setPage]     = useState(1)

  const filtered = products.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.cas.includes(search))
  )
  useEffect(() => { setPage(1) }, [search, cat])
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      <PageHeader
        title="Industrial Chemicals A–Z"
        subtitle="Comprehensive catalog of laboratory-grade, analytical-grade, and industrial-grade chemicals for research, manufacturing, and process applications."
        breadcrumbs={[{ label: 'Products', href: '/products' }, { label: 'Industrial Chemicals' }]}
        variant="dark"
        tag="Industrial Grade"
      />
      <section className="py-20 bg-bg">
        <div className="container-wide">
          <div className="mb-6 relative max-w-sm">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="search" placeholder="Search by name or CAS…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {cats.map(c => (
              <motion.button key={c} whileTap={{ scale: 0.94 }} onClick={() => setCat(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  cat === c ? 'bg-primary text-white shadow-sm' : 'bg-surface border border-border text-ink-muted hover:border-primary hover:text-primary'
                }`}>
                {c}
              </motion.button>
            ))}
          </div>
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-raised">
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">Chemical Name</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">CAS Number</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">Grade</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">Type</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <AnimatePresence mode="wait">
                  <motion.tbody key={`${cat}-${page}`} variants={listVariants} initial="hidden" animate="show" exit="exit">
                    {paged.map(p => (
                      <motion.tr key={p.cas} variants={rowVariants} whileHover={{ backgroundColor: 'rgba(0,180,216,0.04)' }}
                        className="border-b border-border last:border-0">
                        <td className="px-6 py-4 font-medium text-ink">{p.name}</td>
                        <td className="px-6 py-4 font-mono text-xs text-ink-muted">{p.cas}</td>
                        <td className="px-6 py-4"><span className="px-2.5 py-0.5 text-xs font-semibold bg-primary-xlight text-primary rounded-full">{p.grade}</span></td>
                        <td className="px-6 py-4 text-xs text-ink-subtle">{p.category}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Link href={`/products/industrial-chemicals/${toSlug(p.name)}`}
                              className="text-xs font-bold text-ink-subtle hover:text-primary transition-colors">Details</Link>
                            <Link href={`/enquiry?product=${encodeURIComponent(p.name)}`}
                              className="text-xs font-bold text-primary hover:text-primary-dark transition-colors">Enquire →</Link>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </AnimatePresence>
              </table>
            </div>
          </div>
          <Pagination total={filtered.length} perPage={PER_PAGE} current={page} onChange={setPage} />
        </div>
      </section>
    </>
  )
}
