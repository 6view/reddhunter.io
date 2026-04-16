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

export const metadata: Metadata = {
  title: 'Reddhunter — Reddit Intelligence for Founders',
  description:
    'Trouve les posts viraux de ta niche, génère des Viral Scores IA, et rédige tes commentaires GEO-optimisés — pour $5/mois.',
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
