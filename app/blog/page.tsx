'use client'

import PageHeader from '@/components/PageHeader'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const posts = [
  {
    slug: 'gmp-compliance-pharmaceutical-manufacturing',
    title: 'GMP Compliance in Pharmaceutical Raw Material Sourcing',
    excerpt: 'Understanding Good Manufacturing Practice requirements when procuring APIs, excipients, and intermediates — what documentation you need and how to audit your suppliers.',
    category: 'Regulatory',
    date: 'May 12, 2026',
    readTime: '7 min read',
    color: '#243774',
    author: 'Dr. Priya Sharma',
    authorRole: 'Head of Regulatory Affairs',
  },
  {
    slug: 'nutraceutical-market-growth-india-2025',
    title: 'India\'s Nutraceutical Market: Growth Drivers and Sourcing Opportunities',
    excerpt: 'The Indian nutraceutical sector is growing at 15% CAGR. We explore the key ingredients in demand, regulatory landscape under FSSAI, and how manufacturers can build resilient supply chains.',
    category: 'Market Insight',
    date: 'Apr 28, 2026',
    readTime: '9 min read',
    color: '#10B981',
    author: 'Rahul Mehta',
    authorRole: 'VP Business Development',
  },
  {
    slug: 'understanding-coa-msds-documentation',
    title: 'COA, MSDS, and DMF: Essential Documentation for Chemical Imports',
    excerpt: 'A practical guide to the documentation bundle required for importing pharmaceutical and industrial chemicals — Certificate of Analysis, Material Safety Data Sheets, Drug Master Files, and more.',
    category: 'Documentation',
    date: 'Apr 14, 2026',
    readTime: '6 min read',
    color: '#6366F1',
    author: 'Ananya Patel',
    authorRole: 'Quality Assurance Manager',
  },
  {
    slug: 'pellet-technology-modified-release',
    title: 'Multi-Particulate Pellet Technology for Modified-Release Formulations',
    excerpt: 'From MCC starter pellets to enteric-coated PPI systems — an overview of pellet manufacturing technologies, their advantages over conventional tablets, and key quality parameters.',
    category: 'Technical',
    date: 'Mar 31, 2026',
    readTime: '11 min read',
    color: '#F97316',
    author: 'Dr. Vikram Joshi',
    authorRole: 'Technical Director',
  },
  {
    slug: 'reach-regulation-chemical-exports-europe',
    title: 'REACH Compliance for Chemical Exports to the European Union',
    excerpt: 'Everything you need to know about Registration, Evaluation, Authorisation and Restriction of Chemicals (REACH) — who needs to comply, key timelines, and SVHC restrictions.',
    category: 'Regulatory',
    date: 'Mar 17, 2026',
    readTime: '8 min read',
    color: '#468534',
    author: 'Sarah Mitchell',
    authorRole: 'EU Regulatory Consultant',
  },
  {
    slug: 'herbal-extract-standardisation',
    title: 'Standardisation of Herbal Extracts: Quality Markers and Testing Methods',
    excerpt: 'How are herbal extracts standardised to guarantee consistent active compound concentrations? We break down marker compounds, HPLC testing, and how to evaluate supplier specifications.',
    category: 'Technical',
    date: 'Feb 28, 2026',
    readTime: '10 min read',
    color: '#84CC16',
    author: 'Dr. Meena Reddy',
    authorRole: 'Phytochemistry Specialist',
  },
  {
    slug: 'dye-intermediates-global-supply-chain',
    title: 'Global Dye Intermediates Supply: Challenges and Resilience Strategies',
    excerpt: 'Supply disruptions in 2024 exposed vulnerabilities in dye intermediate sourcing. This piece analyses the causes, their impact on textile and pharma sectors, and practical diversification strategies.',
    category: 'Market Insight',
    date: 'Feb 10, 2026',
    readTime: '7 min read',
    color: '#EF4444',
    author: 'Arjun Singhania',
    authorRole: 'Supply Chain Analyst',
  },
  {
    slug: 'impurity-profiling-api-characterisation',
    title: 'Impurity Profiling: Why Reference Standards Matter in API Manufacturing',
    excerpt: 'ICH Q3A and Q3B guidelines require manufacturers to identify and control impurities in APIs. We explain the role of certified reference standards in impurity profiling and regulatory submissions.',
    category: 'Technical',
    date: 'Jan 25, 2026',
    readTime: '9 min read',
    color: '#F59E0B',
    author: 'Dr. Priya Sharma',
    authorRole: 'Head of Regulatory Affairs',
  },
  {
    slug: 'food-chemical-regulations-fssai-eu',
    title: 'Food Chemical Regulations: Navigating FSSAI and EU Standards',
    excerpt: 'Food manufacturers sourcing preservatives, sweeteners, and emulsifiers must comply with both Indian FSSAI regulations and EU food additive directives. Here is a side-by-side comparison.',
    category: 'Regulatory',
    date: 'Jan 12, 2026',
    readTime: '8 min read',
    color: '#10B981',
    author: 'Kavita Nair',
    authorRole: 'Food Compliance Specialist',
  },
]

const categories = ['All', 'Regulatory', 'Technical', 'Market Insight', 'Documentation']

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)

  return (
    <>
      <PageHeader
        title="Knowledge Hub"
        subtitle="Industry insights, regulatory updates, technical guides, and market intelligence from the Chemist India team."
        breadcrumbs={[{ label: 'Blog' }]}
        variant="dark"
        tag="Expert Insights"
      />

      <section className="py-20 bg-bg">
        <div className="container-wide">

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface border border-border text-ink-muted hover:border-primary/40 hover:text-primary'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {activeCategory === 'All' && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10 group bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-2 h-56 lg:h-auto relative overflow-hidden"
                  style={{ backgroundColor: `${posts[0].color}10` }}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <svg viewBox="0 0 200 200" className="w-48 h-48" style={{ color: posts[0].color }} fill="currentColor">
                      <path d="M100 10 L130 55 L180 55 L145 85 L160 130 L100 105 L40 130 L55 85 L20 55 L70 55 Z" />
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: posts[0].color }}>
                      Featured
                    </span>
                  </div>
                </div>
                <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${posts[0].color}15`, color: posts[0].color }}>
                      {posts[0].category}
                    </span>
                    <span className="text-xs text-ink-subtle">{posts[0].date} · {posts[0].readTime}</span>
                  </div>
                  <h2 className="font-display font-bold text-2xl text-ink mb-3 group-hover:text-primary transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-ink-muted leading-relaxed mb-6">{posts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-ink">{posts[0].author}</p>
                      <p className="text-xs text-ink-subtle">{posts[0].authorRole}</p>
                    </div>
                    <Link href={`/blog/${posts[0].slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all"
                      style={{ backgroundColor: posts[0].color }}>
                      Read Article
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === 'All' ? filtered.slice(1) : filtered).map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="h-3" style={{ backgroundColor: post.color }} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${post.color}15`, color: post.color }}>
                      {post.category}
                    </span>
                    <span className="text-xs text-ink-subtle">{post.readTime}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed mb-5 flex-1 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-xs font-semibold text-ink">{post.author}</p>
                      <p className="text-xs text-ink-subtle">{post.date}</p>
                    </div>
                    <Link href={`/blog/${post.slug}`}
                      className="text-xs font-bold transition-colors" style={{ color: post.color }}>
                      Read →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 bg-cta rounded-2xl p-10 text-center text-white"
          >
            <h2 className="font-display font-bold text-3xl mb-3">Stay Informed</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for monthly regulatory updates, market insights, and new product announcements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@company.com"
                className="flex-1 px-4 py-3 rounded-xl text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-white/50" />
              <button className="px-6 py-3 rounded-xl bg-white text-cta font-bold text-sm hover:bg-white/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
