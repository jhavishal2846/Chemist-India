'use client'

import PageHeader from '@/components/PageHeader'
import Pagination from '@/components/Pagination'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { toSlug } from '@/lib/products/utils'
import { pelletListing as pellets } from '@/lib/products/listings'
import { useState } from 'react'

const PER_PAGE = 15
const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.04 } }, exit: {} }
const rowVariants  = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit:   { opacity: 0, y: -4, transition: { duration: 0.12 } },
}

export default function PelletsPage() {
  const [page, setPage] = useState(1)
  const paged = pellets.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      <PageHeader
        title="Pellets"
        subtitle="Multi-particulate pellet systems for immediate, enteric, extended, and controlled drug-release formulations. Starter pellets, API-loaded, and coated systems."
        breadcrumbs={[{ label: 'Products', href: '/products' }, { label: 'Pellets' }]}
        variant="dark"
        tag="Drug Delivery Systems"
      />
      <section className="py-20 bg-bg">
        <div className="container-wide">
          <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Starter Pellets', desc: 'MCC & Sugar non-pareils' },
              { label: 'API Pellets',     desc: 'Drug-loaded pellet systems' },
              { label: 'Enteric Coated',  desc: 'pH-resistant acid protection' },
              { label: 'ER/SR Pellets',   desc: 'Extended & sustained release' },
            ].map((item) => (
              <div key={item.label} className="bg-surface border border-border rounded-xl p-4">
                <div className="font-display font-bold text-sm text-primary mb-1">{item.label}</div>
                <div className="text-xs text-ink-subtle">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-raised">
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">Pellet System</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">Particle Size</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">Type</th>
                    <th className="text-left px-6 py-4 text-xs uppercase tracking-widest text-ink-subtle font-semibold">Application</th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <AnimatePresence mode="wait">
                  <motion.tbody key={page} variants={listVariants} initial="hidden" animate="show" exit="exit">
                    {paged.map(p => (
                      <motion.tr key={p.name} variants={rowVariants} whileHover={{ backgroundColor: 'rgba(0,180,216,0.04)' }}
                        className="border-b border-border last:border-0">
                        <td className="px-6 py-4 font-medium text-ink">{p.name}</td>
                        <td className="px-6 py-4 font-mono text-xs text-ink-muted">{p.size}</td>
                        <td className="px-6 py-4"><span className="px-2.5 py-0.5 text-xs font-semibold bg-primary-xlight text-primary rounded-full">{p.type}</span></td>
                        <td className="px-6 py-4 text-xs text-ink-subtle">{p.use}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Link href={`/products/pellets/${toSlug(p.name)}`}
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
          <Pagination total={pellets.length} perPage={PER_PAGE} current={page} onChange={setPage} />
        </div>
      </section>
    </>
  )
}
