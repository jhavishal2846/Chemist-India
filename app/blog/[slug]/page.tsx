import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { posts, getPost, getRelatedPosts } from '@/lib/blog/posts'

export async function generateStaticParams() {
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Article Not Found' }
  return {
    title:       post.title,
    description: post.excerpt.slice(0, 160),
    openGraph: {
      title:       post.title,
      description: post.excerpt,
      type:        'article',
      authors:     [post.author],
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(slug, 3)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-surface-dark pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Photo + colored brand overlay */}
        <div className="absolute inset-0">
          <Image
            src="/brand/hero-pharmacy.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(125deg, ${post.color}f0 0%, ${post.color}cc 50%, rgba(7,20,40,0.85) 100%)` }}
          />
        </div>

        <div className="container-wide relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-white/70">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/50 truncate max-w-[200px] sm:max-w-none">{post.title}</span>
          </nav>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/15 text-white backdrop-blur-sm">
              {post.category}
            </span>
            <span className="text-sm text-white/70">{post.date}</span>
            <span className="text-white/30">·</span>
            <span className="text-sm text-white/70">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight max-w-4xl mb-8 text-balance">
            {post.title}
          </h1>

          {/* Author chip */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">
              {post.author.split(' ').slice(-1)[0]?.[0] ?? '?'}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{post.author}</p>
              <p className="text-xs text-white/60">{post.authorRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-bg">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Main content */}
            <article className="lg:col-span-8 lg:col-start-2">
              <div className="bg-surface border border-border rounded-2xl p-8 lg:p-12">

                {/* Excerpt lede */}
                <p className="text-lg lg:text-xl text-ink-muted leading-relaxed pb-8 mb-8 border-b border-border italic">
                  {post.excerpt}
                </p>

                {/* Sections */}
                <div className="space-y-8">
                  {post.sections.map((section, idx) => (
                    <div key={idx}>
                      {section.heading && (
                        <h2 className="font-display font-bold text-2xl text-ink mb-4 mt-2">
                          {section.heading}
                        </h2>
                      )}
                      {section.paragraphs.map((p, pi) => (
                        <p key={pi} className="text-ink-muted leading-relaxed mb-4 last:mb-0">
                          {p}
                        </p>
                      ))}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="mt-5 space-y-2.5">
                          {section.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-3 text-ink-muted leading-relaxed">
                              <span
                                className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: post.color }}
                              />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA at end of article */}
                <div
                  className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">Have a sourcing question on this topic?</p>
                    <p className="text-sm text-ink-subtle">Our team responds within 24 business hours.</p>
                  </div>
                  <Link
                    href="/enquiry"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cta text-white text-sm font-bold hover:bg-cta-dark transition-colors whitespace-nowrap"
                  >
                    Talk to Our Team
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Author footer */}
              <div className="mt-8 bg-surface border border-border rounded-2xl p-6 flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                  style={{ backgroundColor: post.color }}
                >
                  {post.author.split(' ').slice(-1)[0]?.[0] ?? '?'}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-ink-subtle font-semibold mb-1">Written by</p>
                  <p className="font-display font-bold text-base text-ink">{post.author}</p>
                  <p className="text-sm text-ink-subtle">{post.authorRole}</p>
                </div>
              </div>
            </article>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-20">
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-display font-bold text-2xl text-ink">Continue Reading</h2>
                <Link
                  href="/blog"
                  className="text-sm font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                >
                  All articles
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    <div className="h-2" style={{ backgroundColor: r.color }} />
                    <div className="p-6 flex flex-col flex-1">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full self-start mb-3"
                        style={{ backgroundColor: `${r.color}15`, color: r.color }}
                      >
                        {r.category}
                      </span>
                      <h3 className="font-display font-bold text-base text-ink mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <p className="text-xs text-ink-subtle line-clamp-2 mb-3 flex-1">{r.excerpt}</p>
                      <p className="text-xs text-ink-subtle">{r.date} · {r.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
