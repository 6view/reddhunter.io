import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Instrument_Serif } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { cn } from '@/lib/utils'

const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
  weight: '100 900',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const APP_URL = 'https://reddhunter-io.vercel.app'

export const metadata: Metadata = {
  title: {
    default: 'Reddhunter — Reddit Intelligence for Founders',
    template: '%s — Reddhunter',
  },
  description:
    'Find viral Reddit posts in your niche, generate AI Viral Scores, and write GEO-optimized comments — for $5/month.',
  keywords: ['reddit marketing', 'reddit growth', 'saas growth', 'indie hacker', 'viral reddit', 'reddit intelligence'],
  authors: [{ name: 'Reddhunter' }],
  creator: 'Reddhunter',
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: 'website',
    url: APP_URL,
    title: 'Reddhunter — Reddit Intelligence for Founders',
    description: 'Find viral Reddit posts in your niche, generate AI Viral Scores, and write GEO-optimized comments — for $5/month.',
    siteName: 'Reddhunter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reddhunter — Reddit Intelligence for Founders',
    description: 'Find viral Reddit posts in your niche, generate AI Viral Scores, and write GEO-optimized comments — for $5/month.',
    creator: '@reddhunter_io',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={cn('dark', geist.variable, instrumentSerif.variable)}
    >
      <body className="bg-[#07080a] text-white antialiased font-sans">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  )
}
