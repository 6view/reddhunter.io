import Link from 'next/link'
import { Logo } from '@/components/logo'

export const metadata = {
  title: 'Privacy Policy — Reddhunter',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#07080a] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[13px] mb-12">
          <Logo size={18} />
          <span>Reddhunter</span>
          <span className="text-zinc-700 ml-1">← Back</span>
        </Link>

        <h1 className="text-[32px] font-semibold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-zinc-600 text-[13px] mb-10">Last updated: May 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-zinc-400 leading-relaxed text-[14px]">

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">1. Information we collect</h2>
            <p>When you sign up for Reddhunter, we collect your email address and name via Clerk (our authentication provider). If you subscribe, Stripe processes your payment information — we never store card details on our servers.</p>
            <p className="mt-2">We also store the business profile you fill in (product name, description, keywords) to personalize AI features.</p>
          </section>

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">2. How we use your data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide the Reddhunter service (Reddit feed, Viral Score, Comment Starter, IA Lab)</li>
              <li>To manage your subscription and send billing receipts</li>
              <li>To personalize AI recommendations based on your business profile</li>
            </ul>
            <p className="mt-2">We do not sell your data to third parties.</p>
          </section>

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">3. Third-party services</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-white">Clerk</strong> — Authentication</li>
              <li><strong className="text-white">Stripe</strong> — Payment processing</li>
              <li><strong className="text-white">Neon / PostgreSQL</strong> — Database hosting</li>
              <li><strong className="text-white">Anthropic</strong> — AI features (Claude)</li>
              <li><strong className="text-white">Vercel</strong> — Hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">4. Data retention</h2>
            <p>Your data is retained as long as your account is active. You can request deletion at any time by emailing <a href="mailto:reddhuntersoftware@gmail.com" className="text-[#FF4500] hover:underline">reddhuntersoftware@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">5. Contact</h2>
            <p>For any privacy-related questions: <a href="mailto:reddhuntersoftware@gmail.com" className="text-[#FF4500] hover:underline">reddhuntersoftware@gmail.com</a></p>
          </section>

        </div>
      </div>
    </div>
  )
}
