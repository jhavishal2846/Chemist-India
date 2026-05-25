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
      title:         post.title,
      description:   post.excerpt,
      type:          'article',
      authors:       [post.author],
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related      = getRelatedPosts(slug, 3)
  const initial      = post.author.split(' ').slice(-1)[0]?.[0] ?? '?'

  return (
    <article className="bg-surface">
      {/* ── HERO ───────────────────────────────────────────────────────────
          Full-width photo with brand-tinted overlay. Title + meta sit on
          the photo so the page opens with editorial weight.
      */}
      <header className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/brand/hero-pharmacy.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Per-post color → navy gradient + vignette so text is readable
              regardless of where the photo is light or busy. */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, rgba(7,20,40,0.30) 0%, rgba(7,20,40,0.55) 60%, rgba(7,20,40,0.85) 100%),
                linear-gradient(115deg, ${post.color}b3 0%, ${post.color}66 45%, rgba(7,20,40,0.4) 100%)
              `,
            }}
          />
        </div>

        <div className="container-wide relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm">
            <Link href="/" className="text-white/65 hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/blog" className="text-white/65 hover:text-white transition-colors">Journal</Link>
            <span className="text-white/40">/</span>
            <span className="text-white/45 truncate max-w-[220px] sm:max-w-md">{post.title}</span>
          </nav>

          <div className="max-w-3xl">
            {/* Category */}
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] backdrop-blur-sm border border-white/20"
              style={{ backgroundColor: `${post.color}40`, color: '#fff' }}
            >
              {post.category}
            </span>

            {/* Title */}
            <h1 className="font-display font-black text-white leading-[1.05] text-4xl sm:text-5xl lg:text-6xl mt-6 mb-6 text-balance">
              {post.title}
            </h1>

            {/* Excerpt as deck/standfirst */}
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl text-pretty">
              {post.excerpt}
            </p>

            {/* Byline */}
            <div className="mt-8 flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base border border-white/25"
                style={{ backgroundColor: `${post.color}` }}
                aria-hidden="true"
              >
                {initial}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-white">{post.author}</p>
                <p className="text-white/55 text-xs">
                  {post.authorRole} · {post.date} · {post.readTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY ───────────────────────────────────────────────────────────
          Single column, ~680px wide, generous line-height. No card wrapper:
          the prose sits directly on a white surface for distraction-free reading.
      */}
      <div className="bg-surface">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto py-16 lg:py-24">

            {/* First paragraph — drop cap + slightly larger text for editorial feel */}
            {post.sections[0] && (
              <div className="mb-10">
                {post.sections[0].heading && (
                  <h2 className="font-display font-bold text-2xl lg:text-3xl text-ink mb-5 leading-tight">
                    {post.sections[0].heading}
                  </h2>
                )}
                {post.sections[0].paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`text-lg leading-[1.75] text-ink-muted mb-5 last:mb-0 ${
                      i === 0
                        ? 'first-letter:font-display first-letter:font-black first-letter:text-5xl first-letter:float-left first-letter:leading-[0.85] first-letter:mr-2 first-letter:mt-1.5 first-letter:text-ink'
                        : ''
                    }`}
                  >
                    {p}
                  </p>
                ))}
                {post.sections[0].bullets && (
                  <BulletList items={post.sections[0].bullets} color={post.color} />
                )}
              </div>
            )}

            {/* Remaining sections */}
            {post.sections.slice(1).map((section, idx) => (
              <section key={idx} className="mb-10 last:mb-0">
                {section.heading && (
                  <h2 className="font-display font-bold text-2xl lg:text-3xl text-ink mb-5 mt-12 leading-tight">
                    <span
                      className="inline-block w-1 h-7 rounded-full mr-3 align-middle"
                      style={{ backgroundColor: post.color }}
                    />
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-lg leading-[1.75] text-ink-muted mb-5 last:mb-0">
                    {p}
                  </p>
                ))}
                {section.bullets && <BulletList items={section.bullets} color={post.color} />}
              </section>
            ))}

            {/* End-of-article CTA */}
            <div
              className="mt-16 rounded-2xl p-6 lg:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
              style={{ backgroundColor: `${post.color}0d`, border: `1px solid ${post.color}1f` }}
            >
              <div>
                <p className="font-display font-bold text-ink text-lg leading-snug">
                  Sourcing the materials covered in this article?
                </p>
                <p className="text-sm text-ink-subtle mt-1">
                  Our team responds within 24 business hours with COA, MSDS, and pricing.
                </p>
              </div>
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cta text-white text-sm font-bold hover:bg-cta-dark transition-colors whitespace-nowrap"
              >
                Talk to Our Team
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Author footer */}
            <div className="mt-10 pt-8 border-t border-border flex items-start gap-5">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                style={{ backgroundColor: post.color }}
                aria-hidden="true"
              >
                {initial}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle font-bold mb-1">Written by</p>
                <p className="font-display font-bold text-ink text-base">{post.author}</p>
                <p className="text-sm text-ink-muted leading-relaxed">{post.authorRole} at Chemist India Ltd.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Related ─────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-bg border-t border-border py-16 lg:py-20">
          <div className="container-wide">
            <div className="flex items-end justify-between mb-8 max-w-6xl mx-auto">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-ink-subtle font-bold mb-1">More from the Journal</p>
                <h2 className="font-display font-bold text-2xl lg:text-3xl text-ink">Continue Reading</h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
              >
                All articles
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                >
                  <div className="h-1.5" style={{ backgroundColor: r.color }} />
                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full self-start mb-4"
                      style={{ backgroundColor: `${r.color}15`, color: r.color }}
                    >
                      {r.category}
                    </span>
                    <h3 className="font-display font-bold text-base lg:text-lg text-ink mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {r.title}
                    </h3>
                    <p className="text-sm text-ink-subtle line-clamp-2 mb-4 flex-1 leading-relaxed">{r.excerpt}</p>
                    <p className="text-xs text-ink-subtle">{r.date} · {r.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}

/* ─── Bullet List ─────────────────────────────────────────────────────── */
function BulletList({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((b, bi) => (
        <li key={bi} className="flex items-start gap-3 text-lg leading-[1.7] text-ink-muted">
          <svg
            className="w-5 h-5 mt-1 flex-shrink-0"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            style={{ color }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  )
}
