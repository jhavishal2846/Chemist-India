import type { Metadata } from 'next'
import './globals.css'
import { Figtree, Noto_Sans } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Chemist India',
    default:  'Chemist India — Global Pharmaceutical & Chemical Supplier',
  },
  description:
    'Chemist India is a leading supplier of Active Pharmaceutical Ingredients (APIs), industrial chemicals, nutraceuticals, herbal extracts, excipients, dyes, and more. Serving global markets from India, China, UK & USA.',
  keywords: [
    'active pharmaceutical ingredients',
    'API supplier India',
    'industrial chemicals',
    'nutraceuticals supplier',
    'herbal extracts',
    'pharmaceutical excipients',
    'chemical supplier India',
    'DMF CEP COS COPP',
    'GMP certified',
  ],
  metadataBase: new URL('https://chemistindia.com'),
  openGraph: {
    type:     'website',
    siteName: 'Chemist India',
    locale:   'en_IN',
    title:    'Chemist India — Global Pharmaceutical & Chemical Supplier',
    description:
      'Precision chemistry, global trust. APIs, industrial chemicals, nutraceuticals, herbal extracts & more.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`h-full scroll-smooth antialiased ${figtree.variable} ${notoSans.variable}`}>
      <body className="flex min-h-dvh flex-col bg-bg text-ink font-sans">
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
