import Link from 'next/link'
import { Logo } from '@/components/logo'

export const metadata = {
  title: 'Terms of Service — Reddhunter',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#07080a] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[13px] mb-12">
          <Logo size={18} />
          <span>Reddhunter</span>
          <span className="text-zinc-700 ml-1">← Back</span>
        </Link>

        <h1 className="text-[32px] font-semibold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-zinc-600 text-[13px] mb-10">Last updated: May 2026</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-zinc-400 leading-relaxed text-[14px]">

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">1. Acceptance</h2>
            <p>By using Reddhunter, you agree to these Terms. If you do not agree, do not use the service.</p>
          </section>

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">2. Service description</h2>
            <p>Reddhunter provides Reddit intelligence tools for founders and indie hackers, including a Reddit feed, AI-powered Viral Scores, Comment Starters, and personalized recommendations.</p>
          </section>

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">3. Subscription & billing</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Plans are billed monthly or annually via Stripe</li>
              <li>You can cancel at any time from your Settings page</li>
              <li>Refunds are handled on a case-by-case basis — contact us within 7 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">4. Acceptable use</h2>
            <p>You agree not to use Reddhunter to spam Reddit, violate Reddit's Terms of Service, or engage in any illegal activity. AI-generated comments are suggestions only — you are responsible for how you use them.</p>
          </section>

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">5. Limitation of liability</h2>
            <p>Reddhunter is provided "as is". We are not responsible for any indirect or consequential damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">6. Changes</h2>
            <p>We may update these Terms at any time. Continued use of the service after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-white text-[16px] font-semibold mb-3">7. Contact</h2>
            <p><a href="mailto:reddhuntersoftware@gmail.com" className="text-[#FF4500] hover:underline">reddhuntersoftware@gmail.com</a></p>
          </section>

        </div>
      </div>
    </div>
  )
}
