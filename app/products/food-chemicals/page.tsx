'use client'

import PageHeader from '@/components/PageHeader'
import Pagination from '@/components/Pagination'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { toSlug } from '@/lib/products/utils'
import { foodListing as products } from '@/lib/products/listings'
import { useState } from 'react'

const PER_PAGE = 15
const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.04 } }, exit: {} }
const rowVariants  = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit:   { opacity: 0, y: -4, transition: { duration: 0.12 } },
}

export default function FoodChemicalsPage() {
  const [page, setPage] = useState(1)
  const paged = products.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      <PageHeader
        title="Food Chemicals"
        subtitle="Food-grade additives, preservatives, sweeteners, emulsifiers, and acidulants meeting FSSAI, Codex Alimentarius, and EU E-number standards."
        breadcrumbs={[{ label: 'Products', href: '/products' }, { label: 'Food Chemicals' }]}
        variant="dark"
        tag="Food Grade"
      />
      <section className="py-20 bg-bg">
        <div className="container-wide">
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-raised">
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">Product Name</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">CAS Number</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">E Number</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">Category</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">Primary Use</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <AnimatePresence mode="wait">
                  <motion.tbody key={page} variants={listVariants} initial="hidden" animate="show" exit="exit">
                    {paged.map(p => (
                      <motion.tr key={p.cas + p.name} variants={rowVariants} whileHover={{ backgroundColor: 'rgba(0,180,216,0.04)' }}
                        className="border-b border-border last:border-0">
                        <td className="px-6 py-4 font-medium text-ink">{p.name}</td>
                        <td className="px-6 py-4 font-mono text-xs text-ink-muted">{p.cas}</td>
                        <td className="px-6 py-4 font-mono text-xs text-ink-subtle">{p.eno}</td>
                        <td className="px-6 py-4"><span className="px-2.5 py-0.5 text-xs font-semibold bg-primary-xlight text-primary rounded-full">{p.category}</span></td>
                        <td className="px-6 py-4 text-xs text-ink-subtle">{p.use}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Link href={`/products/food-chemicals/${toSlug(p.name)}`}
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
          <Pagination total={products.length} perPage={PER_PAGE} current={page} onChange={setPage} />
        </div>
      </section>
    </>
  )
}
