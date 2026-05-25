'use client'

import PageHeader from '@/components/PageHeader'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { posts } from '@/lib/blog/posts'

const categories = ['All', 'Regulatory', 'Technical', 'Market Insight', 'Documentation']

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)
  const featured = posts[0]

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
                <Link href={`/blog/${featured.slug}`} className="lg:col-span-2 h-56 lg:h-auto relative overflow-hidden">
                  <Image
                    src="/brand/hero-pharmacy.jpg"
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Brand-tinted overlay so text legibility is consistent across photos */}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${featured.color}cc 0%, ${featured.color}80 100%)` }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-black/40 backdrop-blur-sm">
                      Featured
                    </span>
                  </div>
                </Link>
                <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${featured.color}15`, color: featured.color }}>
                      {featured.category}
                    </span>
                    <span className="text-xs text-ink-subtle">{featured.date} · {featured.readTime}</span>
                  </div>
                  <h2 className="font-display font-bold text-2xl text-ink mb-3 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-ink-muted leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-ink">{featured.author}</p>
                      <p className="text-xs text-ink-subtle">{featured.authorRole}</p>
                    </div>
                    <Link href={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all"
                      style={{ backgroundColor: featured.color }}>
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
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="h-3" style={{ backgroundColor: post.color }} />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${post.color}15`, color: post.color }}>
                      {post.category}
                    </span>
                    <span className="text-xs text-ink-subtle">{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="font-display font-bold text-lg text-ink mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-ink-muted leading-relaxed mb-5 flex-1 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-xs font-semibold text-ink">{post.author}</p>
                      <p className="text-xs text-ink-subtle">{post.date}</p>
                    </div>
                    <Link href={`/blog/${post.slug}`}
                      className="text-xs font-bold transition-colors hover:opacity-80" style={{ color: post.color }}>
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
            <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for monthly regulatory updates, market insights, and new product announcements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@company.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white text-sm text-ink placeholder:text-ink-subtle/70 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
              />
              <button className="px-6 py-3 rounded-xl bg-white text-cta font-bold text-sm hover:bg-white/90 transition-colors whitespace-nowrap shadow-sm">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
