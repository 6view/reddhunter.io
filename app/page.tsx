import { CTALink, SignInLink } from '@/components/cta-link'
import { CheckoutButton } from '@/components/checkout-button'
import { Navbar } from '@/components/navbar'
import { HeroBackground } from '@/components/hero-background'
import { MotionSection } from '@/components/motion-section'
import { MotionGrid, MotionGridItem } from '@/components/motion-grid'
import { AnimatedCounters } from '@/components/animated-counters'
import { FaqAccordion } from '@/components/faq-accordion'
import { Logo } from '@/components/logo'
import {
  Zap, TrendingUp, Globe, BarChart2, MessageSquare,
  Search, Flame, Send, Check, Twitter, Mail,
  ArrowRight, Rss, Sparkles, Target, Clock,
} from 'lucide-react'


// ─── Command Palette Mockup ──────────────────────────────────────────────────
function CommandPalette() {
  const posts = [
    { sub: 'r/indiehackers', title: 'How I got my first 100 paying customers using Reddit (no paid ads)', upvotes: '1.2k', time: '4h ago', score: 92, color: 'bg-orange-500/20 text-orange-400' },
    { sub: 'r/SaaS',         title: "Launched my scheduling tool 3 weeks ago — here's what actually moved the needle", upvotes: '847', time: '8h ago', score: 87, color: 'bg-blue-500/20 text-blue-400' },
    { sub: 'r/startups',     title: 'Why most B2B founders ignore Reddit and leave money on the table', upvotes: '503', time: '12h ago', score: 74, color: 'bg-purple-500/20 text-purple-400' },
  ]
  return (
    <div className="w-full max-w-xl mx-auto animate-float">
      {/* Window chrome */}
      <div className="bg-[#111115] rounded-2xl border border-white/[0.08] shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0d0d10]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex items-center gap-2 ml-2 bg-white/[0.04] rounded-lg px-3 py-1.5 border border-white/[0.05]">
            <Search size={12} className="text-white/30" />
            <span className="text-white/40 text-xs">Explore Reddit intelligence…</span>
            <span className="ml-auto text-[10px] text-white/20 bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/[0.08]">⌘K</span>
          </div>
        </div>

        {/* Results */}
        <div className="divide-y divide-white/[0.04]">
          {posts.map((post, i) => (
            <div
              key={i}
              className={`px-4 py-3.5 flex items-start gap-3 transition-colors duration-150 ${i === 0 ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]'}`}
            >
              <div className="mt-0.5">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${post.color} border border-current/20`}>
                  {post.sub}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-xs font-medium leading-snug mb-1.5 line-clamp-2">{post.title}</p>
                <div className="flex items-center gap-2 text-[10px] text-white/25">
                  <span>🔺 {post.upvotes}</span>
                  <span>·</span>
                  <span>⏱ {post.time}</span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-xs font-bold text-[#FF4500]">{post.score}</div>
                <div className="text-[9px] text-white/25">viral</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="px-4 py-2.5 border-t border-white/[0.05] bg-[#0d0d10] flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-white/20">
            <span className="flex items-center gap-1"><span className="bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">↑↓</span> navigate</span>
            <span className="flex items-center gap-1"><span className="bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/[0.08]">↵</span> open</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]/60 animate-pulse" />
            Updated 6h ago
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Feature card ────────────────────────────────────────────────────────────
function FeatureCard({ icon, gradient, title, desc }: {
  icon: React.ReactNode; gradient: string; title: string; desc: string
}) {
  return (
    <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl p-5 transition-all duration-200 cursor-default">
      <div className={`w-10 h-10 rounded-xl ${gradient} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
        {icon}
      </div>
      <h3 className="text-white text-sm font-semibold mb-1.5 tracking-tight">{title}</h3>
      <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
    </div>
  )
}

// ─── Subreddit chip ──────────────────────────────────────────────────────────
const SUBREDDITS = ['r/indiehackers','r/SaaS','r/startups','r/entrepreneur','r/buildinpublic','r/growthhacking','r/sidehustle']

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen bg-[#07080a] overflow-x-hidden">

      {/* ── NAVBAR ───────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center text-center px-6 pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Animated canvas background */}
        <HeroBackground />

        <MotionSection className="relative z-10">
          {/* Headline */}
          <h1 className="text-[clamp(2.4rem,6.5vw,4.5rem)] font-semibold tracking-[-0.03em] leading-[1.08] text-white mb-5 max-w-3xl mx-auto">
            Your shortcut to{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF4500] to-[#E83D00] bg-clip-text text-transparent">
              Reddit growth.
            </span>
          </h1>

          {/* Sub */}
          <p className="text-[17px] text-white/50 max-w-lg mx-auto mb-10 leading-relaxed font-normal">
            Find viral posts, score their potential, write GEO-optimized comments.
            All in one interface. From $5/month.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <CTALink
              shine
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-[#FF4500] hover:bg-[#e63d00] text-white rounded-lg transition-all duration-200 hover:shadow-[0_0_28px_rgba(255,69,0,0.4)]"
            >
              Get started for free
              <ArrowRight size={14} />
            </CTALink>
            <a
              href="#features"
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white/50 hover:text-white/80 rounded-lg border border-white/[0.07] hover:border-white/[0.15] transition-all duration-200"
            >
              See how it works
            </a>
          </div>

          {/* Trust line */}
          <p className="text-xs text-white/25 mb-12">
            From $5/month · Cancel anytime · 2-minute setup
          </p>
        </MotionSection>

        {/* Command Palette */}
        <MotionSection className="relative z-10 w-full max-w-xl mx-auto px-4">
          <CommandPalette />
        </MotionSection>
      </section>

      {/* ── 2. LOGOS BAR ─────────────────────────────────────────────────── */}
      <section className="py-10 px-4 flex flex-col items-center gap-5 bg-[#07080a]">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/20">
          Your content gets indexed in
        </p>

        {/* Pill container */}
        <div className="w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm overflow-hidden py-5 relative">
          {/* Fade masks inside the pill */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#0d0d0f] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0d0d0f] to-transparent z-10" />

          <div className="flex animate-marquee-reverse whitespace-nowrap w-max gap-10 px-4">
            {[
              {
                name: 'ChatGPT',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>,
              },
              {
                name: 'Claude',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-1.235-.072L1 12.514l.057-.326.562-.57.692-.17 1.809.121 2.389.17 1.747.17h.146l-.195-.389-1.867-3.39-1.39-2.687-.733-1.56-.032-.472.276-.44.48-.196.648.066.42.284.838 1.43 1.36 2.39 1.504 2.687.243.45.042-.065-.018-.331-.309-2.095-.37-2.461-.162-1.52.162-.39.337-.31.657.049.645.34.293.42.226 1.748.258 1.665.307 1.924.097.742-.065.6-.178.456-.439.236-.634.123-.839-.146-1.019-.42-1.634-.68-2.866-1.01-3.25.13-.472.47-.351.494-.171.632.034.548.244 1.146 2.157 1.26 2.606.58 1.312.274.582.097.339.195-.227.727-.971 1.114-1.39 1.343-1.665 1.682-1.277 1.488-.889 1.01L17.83 5.4l.131-.017.285.082.374.3.08.487-.194.43-1.553 1.812-1.456 1.764-1.114 1.52-.678 1.022-.276.527.42-.017 1.374-.21 2.405-.307 1.763-.194.986.05.51.26.293.504-.016.487-.26.39-.873.098-2.014.178-2.746.243-1.325.105h-.163l.066.146.952 1.65.841 1.326.678 1.13.21.617-.12.529-.37.317-.53.033-.661-.236-1.2-1.877-.954-1.65-.516-.971-.13-.236-.033.05-.468 2.318-.354 1.78-.435 1.618-.27.52-.452.244-.58-.163-.42-.39-.065-.577.306-1.504.5-2.17.468-2.12.08-.439-.048-.033-.276.244-1.601 1.504-1.763 1.585-1.423 1.22-.873.59-.759.29-.63-.123-.384-.44v-.49l.332-.43.743-.374.938-.735 1.326-1.15 1.747-1.601 1.26-1.22.21-.227h-.05l-.353.13-2.55.825-2.761.889-1.293.34-.613-.05-.45-.34-.162-.5.13-.48.42-.38.953-.245z"/></svg>,
              },
              {
                name: 'Gemini',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/></svg>,
              },
              {
                name: 'Perplexity',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M22.197 6.843h-7.67l6.077-5.266-1.118-1.29-6.374 5.525V0h-1.722v5.812L5.516.287 4.397 1.577l6.077 5.266H.803V8.56h4.7v6.507H.803v1.716h4.7v7.217h1.722v-7.217h9.55v7.217h1.722v-7.217h4.7v-1.716h-4.7V8.56h4.7V6.843zM7.225 8.56h9.55v6.507h-9.55V8.56z"/></svg>,
              },
              {
                name: 'Grok',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
              },
              {
                name: 'Meta AI',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6.918 9.45c.677-1.044 1.573-1.885 2.618-2.38a5.13 5.13 0 0 1 2.236-.494c1.157 0 2.225.378 3.13 1.046l.366.27c-.734-.372-1.561-.588-2.443-.588-1.008 0-1.96.29-2.77.787-.81.5-1.487 1.21-1.964 2.072-.476.862-.745 1.858-.745 2.916 0 .62.086 1.22.247 1.79a6.26 6.26 0 0 0 .681 1.558c-.65-.996-1.03-2.183-1.03-3.46 0-.584.079-1.149.224-1.682a6.304 6.304 0 0 1-.35.165zm8.524-.947c.588.455 1.08 1.028 1.443 1.68.365.655.594 1.394.654 2.18.06.784-.04 1.578-.286 2.328-.247.75-.647 1.447-1.174 2.04a5.53 5.53 0 0 1-1.88 1.355 5.456 5.456 0 0 1-2.272.47 5.61 5.61 0 0 1-1.79-.293c.75.384 1.594.604 2.489.604 1.008 0 1.96-.29 2.77-.788a5.573 5.573 0 0 0 1.964-2.072c.476-.862.745-1.858.745-2.916 0-.758-.136-1.48-.386-2.15a5.924 5.924 0 0 0-1.077-1.84l-.2.402zm-5.46 8.21a5.116 5.116 0 0 1-1.493-1.565 5.17 5.17 0 0 1-.73-2.065 5.232 5.232 0 0 1 .156-2.206 5.168 5.168 0 0 1 1.014-1.94 5.1 5.1 0 0 1 1.72-1.35 5.06 5.06 0 0 1 2.121-.459c1.268 0 2.42.463 3.295 1.224l-.228-.43a5.534 5.534 0 0 0-1.915-1.63 5.585 5.585 0 0 0-2.52-.59c-1.008 0-1.96.29-2.77.788a5.573 5.573 0 0 0-1.964 2.072c-.476.862-.745 1.858-.745 2.916 0 1.053.267 2.045.74 2.906a5.631 5.631 0 0 0 1.977 2.084 5.57 5.57 0 0 0 2.802.762c.428 0 .844-.048 1.244-.14a5.138 5.138 0 0 1-2.704-.377z"/></svg>,
              },
              {
                name: 'Mistral',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M0 0h4v4H0zm6.667 0h4v4h-4zM0 6.667h4v4H0zm6.667 0h4v4h-4zm6.666 0h4v4h-4zm3.334-6.667h4v4h-4zM13.333 0h4v4h-4zM0 13.333h4v4H0zm6.667 0h4v4h-4zm6.666 0h4v4h-4zM0 20h4v4H0zm13.333 0h4v4h-4zm6.667 0h4v4h-4zm0-6.667h4v4h-4z"/></svg>,
              },
            ].concat([
              {
                name: 'ChatGPT',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>,
              },
              {
                name: 'Claude',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-1.235-.072L1 12.514l.057-.326.562-.57.692-.17 1.809.121 2.389.17 1.747.17h.146l-.195-.389-1.867-3.39-1.39-2.687-.733-1.56-.032-.472.276-.44.48-.196.648.066.42.284.838 1.43 1.36 2.39 1.504 2.687.243.45.042-.065-.018-.331-.309-2.095-.37-2.461-.162-1.52.162-.39.337-.31.657.049.645.34.293.42.226 1.748.258 1.665.307 1.924.097.742-.065.6-.178.456-.439.236-.634.123-.839-.146-1.019-.42-1.634-.68-2.866-1.01-3.25.13-.472.47-.351.494-.171.632.034.548.244 1.146 2.157 1.26 2.606.58 1.312.274.582.097.339.195-.227.727-.971 1.114-1.39 1.343-1.665 1.682-1.277 1.488-.889 1.01L17.83 5.4l.131-.017.285.082.374.3.08.487-.194.43-1.553 1.812-1.456 1.764-1.114 1.52-.678 1.022-.276.527.42-.017 1.374-.21 2.405-.307 1.763-.194.986.05.51.26.293.504-.016.487-.26.39-.873.098-2.014.178-2.746.243-1.325.105h-.163l.066.146.952 1.65.841 1.326.678 1.13.21.617-.12.529-.37.317-.53.033-.661-.236-1.2-1.877-.954-1.65-.516-.971-.13-.236-.033.05-.468 2.318-.354 1.78-.435 1.618-.27.52-.452.244-.58-.163-.42-.39-.065-.577.306-1.504.5-2.17.468-2.12.08-.439-.048-.033-.276.244-1.601 1.504-1.763 1.585-1.423 1.22-.873.59-.759.29-.63-.123-.384-.44v-.49l.332-.43.743-.374.938-.735 1.326-1.15 1.747-1.601 1.26-1.22.21-.227h-.05l-.353.13-2.55.825-2.761.889-1.293.34-.613-.05-.45-.34-.162-.5.13-.48.42-.38.953-.245z"/></svg>,
              },
              {
                name: 'Gemini',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/></svg>,
              },
              {
                name: 'Perplexity',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M22.197 6.843h-7.67l6.077-5.266-1.118-1.29-6.374 5.525V0h-1.722v5.812L5.516.287 4.397 1.577l6.077 5.266H.803V8.56h4.7v6.507H.803v1.716h4.7v7.217h1.722v-7.217h9.55v7.217h1.722v-7.217h4.7v-1.716h-4.7V8.56h4.7V6.843zM7.225 8.56h9.55v6.507h-9.55V8.56z"/></svg>,
              },
              {
                name: 'Grok',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
              },
              {
                name: 'Meta AI',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6.918 9.45c.677-1.044 1.573-1.885 2.618-2.38a5.13 5.13 0 0 1 2.236-.494c1.157 0 2.225.378 3.13 1.046l.366.27c-.734-.372-1.561-.588-2.443-.588-1.008 0-1.96.29-2.77.787-.81.5-1.487 1.21-1.964 2.072-.476.862-.745 1.858-.745 2.916 0 .62.086 1.22.247 1.79a6.26 6.26 0 0 0 .681 1.558c-.65-.996-1.03-2.183-1.03-3.46 0-.584.079-1.149.224-1.682a6.304 6.304 0 0 1-.35.165zm8.524-.947c.588.455 1.08 1.028 1.443 1.68.365.655.594 1.394.654 2.18.06.784-.04 1.578-.286 2.328-.247.75-.647 1.447-1.174 2.04a5.53 5.53 0 0 1-1.88 1.355 5.456 5.456 0 0 1-2.272.47 5.61 5.61 0 0 1-1.79-.293c.75.384 1.594.604 2.489.604 1.008 0 1.96-.29 2.77-.788a5.573 5.573 0 0 0 1.964-2.072c.476-.862.745-1.858.745-2.916 0-.758-.136-1.48-.386-2.15a5.924 5.924 0 0 0-1.077-1.84l-.2.402zm-5.46 8.21a5.116 5.116 0 0 1-1.493-1.565 5.17 5.17 0 0 1-.73-2.065 5.232 5.232 0 0 1 .156-2.206 5.168 5.168 0 0 1 1.014-1.94 5.1 5.1 0 0 1 1.72-1.35 5.06 5.06 0 0 1 2.121-.459c1.268 0 2.42.463 3.295 1.224l-.228-.43a5.534 5.534 0 0 0-1.915-1.63 5.585 5.585 0 0 0-2.52-.59c-1.008 0-1.96.29-2.77.788a5.573 5.573 0 0 0-1.964 2.072c-.476.862-.745 1.858-.745 2.916 0 1.053.267 2.045.74 2.906a5.631 5.631 0 0 0 1.977 2.084 5.57 5.57 0 0 0 2.802.762c.428 0 .844-.048 1.244-.14a5.138 5.138 0 0 1-2.704-.377z"/></svg>,
              },
              {
                name: 'Mistral',
                icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M0 0h4v4H0zm6.667 0h4v4h-4zM0 6.667h4v4H0zm6.667 0h4v4h-4zm6.666 0h4v4h-4zm3.334-6.667h4v4h-4zM13.333 0h4v4h-4zM0 13.333h4v4H0zm6.667 0h4v4h-4zm6.666 0h4v4h-4zM0 20h4v4H0zm13.333 0h4v4h-4zm6.667 0h4v4h-4zm0-6.667h4v4h-4z"/></svg>,
              },
            ]).map(({ name, icon }, i) => (
              <div key={`${name}-${i}`} className="relative overflow-hidden inline-flex items-center gap-2.5 text-white/60 cursor-default select-none group">
                <span className="text-white/50">{icon}</span>
                <span className="text-[13px] font-semibold tracking-tight text-white/70">{name}</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. STATS ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <MotionSection>
            <AnimatedCounters />
          </MotionSection>
        </div>
      </section>

      {/* ── 4. FEATURES GRID ─────────────────────────────────────────────── */}
      <section id="features" className="border-t border-white/[0.05] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <MotionSection className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF4500]/70 mb-3">Everything you need</p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.025em] text-white leading-[1.1] max-w-sm">
                One tool. Zero guesswork.
              </h2>
              <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                Stop scrolling. Start converting. Every feature built for Reddit-led growth.
              </p>
            </div>
          </MotionSection>

          <MotionGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                icon: <Rss size={16} className="text-white" />,
                gradient: 'bg-gradient-to-br from-[#FF4500] to-[#cc3700]',
                title: 'Viral Posts Feed',
                desc: 'Auto-curated posts from your niche subreddits, refreshed every 6 hours.',
              },
              {
                icon: <Target size={16} className="text-white" />,
                gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
                title: 'Audience Hunter',
                desc: 'Find exactly where your potential customers hang out on Reddit.',
              },
              {
                icon: <BarChart2 size={16} className="text-white" />,
                gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
                title: 'Viral Score AI',
                desc: 'Every post scored 0–100 with an AI explanation of why it performed.',
              },
              {
                icon: <MessageSquare size={16} className="text-white" />,
                gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
                title: 'Comment Starter',
                desc: 'One-click AI-generated comments, GEO-optimized for LLM indexing.',
              },
              {
                icon: <Globe size={16} className="text-white" />,
                gradient: 'bg-gradient-to-br from-pink-500 to-pink-700',
                title: 'GEO Optimization',
                desc: 'Build a Reddit presence that gets cited by ChatGPT, Perplexity, Gemini.',
              },
              {
                icon: <Clock size={16} className="text-white" />,
                gradient: 'bg-gradient-to-br from-amber-500 to-amber-700',
                title: 'Real-time Updates',
                desc: 'Fresh Reddit intelligence delivered every 6 hours. Always current.',
              },
            ].map((f) => (
              <MotionGridItem key={f.title}>
                <FeatureCard {...f} />
              </MotionGridItem>
            ))}
          </MotionGrid>
        </div>
      </section>

      {/* ── 5. FEATURE DETAIL: HUNT ──────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-24 px-6 bg-[#07080a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <MotionSection>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF4500]/70 mb-4">
                Hunt · Find your audience
              </p>
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.025em] text-white leading-[1.1] mb-5">
                Know exactly where your customers are.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm">
                Type any keyword. Reddhunter searches Reddit in real time and returns
                the most active subreddits, their member counts, and activity levels.
                One click to go comment.
              </p>
              <ul className="space-y-3">
                {[
                  'Real-time Reddit API search',
                  'Member count + activity score',
                  'Direct link to subreddit',
                  'Top recent posts per community',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                    <div className="w-4 h-4 rounded-full bg-[#FF4500]/15 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-[#FF4500]" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </MotionSection>

            <MotionSection>
              <div className="bg-[#0d0d10] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                {/* Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05]">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs text-white/25 ml-2 font-medium">Hunt · Find your audience</span>
                </div>
                {/* Search */}
                <div className="p-4">
                  <div className="flex gap-2 mb-5">
                    <div className="flex-1 bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-2.5 flex items-center gap-2">
                      <Search size={12} className="text-white/25" />
                      <span className="text-sm text-white/50">ai scheduling tool</span>
                    </div>
                    <div className="bg-[#FF4500] text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center">
                      Hunt →
                    </div>
                  </div>
                  <div className="space-y-1">
                    {[
                      { sub: 'r/productivity',   members: '2.3M',  hot: true },
                      { sub: 'r/sideprojects',   members: '328k',  hot: false },
                      { sub: 'r/Entrepreneur',   members: '1.8M',  hot: true },
                    ].map((r, i) => (
                      <div key={r.sub} className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${i === 0 ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]'}`}>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-white text-sm font-medium">{r.sub}</p>
                            {r.hot && <span className="text-[9px] font-bold text-[#FF4500] bg-[#FF4500]/10 px-1.5 py-0.5 rounded-full">HOT</span>}
                          </div>
                          <p className="text-white/25 text-xs mt-0.5">{r.members} members</p>
                        </div>
                        <span className="text-[#FF4500] text-xs font-semibold">Comment →</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* ── 6. FEATURE DETAIL: AI ────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <MotionSection className="order-last lg:order-first">
              <div className="space-y-3">
                {/* Viral Score card */}
                <div className="bg-[#0d0d10] border border-white/[0.07] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                        <BarChart2 size={14} className="text-white" />
                      </div>
                      <span className="text-white text-sm font-semibold">Viral Score AI</span>
                    </div>
                    <span className="text-2xl font-semibold text-[#FF4500] tracking-tight">92</span>
                  </div>
                  <div className="w-full bg-white/[0.05] rounded-full h-1 mb-4">
                    <div className="bg-gradient-to-r from-[#FF4500] to-[#FF6B35] h-1 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <p className="text-white/30 text-xs leading-relaxed">
                    "I did X" + personal story + actionable data. Optimal timing (Tue 9AM EST). Exceptional engagement ratio.
                  </p>
                </div>

                {/* Comment Starter card */}
                <div className="bg-[#0d0d10] border border-white/[0.07] rounded-2xl p-5">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                      <MessageSquare size={14} className="text-white" />
                    </div>
                    <span className="text-white text-sm font-semibold">Comment Starter</span>
                    <span className="ml-auto text-[10px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">GEO-optimized</span>
                  </div>
                  <div className="font-mono text-[11px] text-white/35 leading-relaxed bg-black/30 rounded-xl p-3 border border-white/[0.04]">
                    <span className="text-white/20">// draft</span><br/><br/>
                    <span className="text-emerald-400/70">Great breakdown.</span>{' '}I&apos;ve been using{' '}
                    <span className="text-blue-400/70">Reddhunter</span> for this — it surfaces these posts
                    automatically. The <span className="text-[#FF4500]/70">Viral Score</span> explains exactly
                    why certain formats crush it.
                  </div>
                </div>
              </div>
            </MotionSection>

            <MotionSection>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF4500]/70 mb-4">
                Powered by AI
              </p>
              <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.025em] text-white leading-[1.1] mb-5">
                The AI that understands<br className="hidden md:block" /> what makes Reddit tick.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm">
                Every post analyzed, every pattern decoded. Reddhunter&apos;s AI tells you not just
                what performed — but why, and how to replicate it for your product.
              </p>
              <CTALink
                shine
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#FF4500] hover:bg-[#e63d00] text-white rounded-lg transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.35)]"
              >
                Try it free <ArrowRight size={14} />
              </CTALink>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* ── 7. SOCIAL PROOF ──────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-24 px-6 bg-[#07080a]">
        <div className="max-w-6xl mx-auto">
          <MotionSection className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/25 mb-3">The opportunity</p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.025em] text-white leading-[1.1]">
              The gap widens every month.
            </h2>
          </MotionSection>

          <MotionSection>
            <div className="bg-[#0d0d10] border border-white/[0.07] rounded-2xl p-7 md:p-10">
              <div className="flex items-center gap-5 mb-6 justify-end">
                <div className="flex items-center gap-2">
                  <svg width="20" height="2"><line x1="0" y1="1" x2="20" y2="1" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4,3" /></svg>
                  <span className="text-white/30 text-xs">Without GEO</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="20" height="2"><line x1="0" y1="1" x2="20" y2="1" stroke="#FF4500" strokeWidth="2.5" /></svg>
                  <span className="text-white/70 text-xs font-medium">With GEO Reddit</span>
                </div>
              </div>
              <svg viewBox="0 0 600 260" className="w-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="rh-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF4500" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#FF4500" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                {[40,85,130,175,215].map((y) => (
                  <line key={y} x1="60" y1={y} x2="568" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                ))}
                <path d="M60,215 C160,217 260,219 360,221 C460,222 520,222 568,222 L568,222 C520,222 460,222 360,221 C260,219 160,217 60,215Z" fill="none" />
                <path d="M60,215 C110,207 130,199 160,193 C200,184 230,171 260,161 C300,146 330,129 360,118 C400,101 430,80 460,64 C500,40 530,20 568,4 L568,222 C500,222 430,222 360,222 C300,222 230,222 160,221 C130,221 110,220 60,220Z" fill="url(#rh-grad)" />
                <path d="M60,215 C160,217 260,219 360,221 C460,222 520,222 568,222" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="5,3" />
                <path d="M60,215 C110,207 130,199 160,193 C200,184 230,171 260,161 C300,146 330,129 360,118 C400,101 430,80 460,64 C500,40 530,20 568,4" fill="none" stroke="#FF4500" strokeWidth="2" />
                {([[60,215],[160,193],[260,161],[360,118],[460,64],[568,4]] as [number,number][]).map(([x,y]) => (
                  <circle key={x} cx={x} cy={y} r="3.5" fill="#FF4500" stroke="#0d0d10" strokeWidth="2" />
                ))}
                {['M1','M2','M3','M4','M5','M6'].map((l,i) => (
                  <text key={l} x={60+i*101.6} y={245} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="var(--font-geist)">{l}</text>
                ))}
                <text x="574" y="8" fill="#FF4500" fontSize="9" fontWeight="600" fontFamily="var(--font-geist)">+220%</text>
                <text x="574" y="226" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="var(--font-geist)">−8%</text>
              </svg>
              <div className="mt-7 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-semibold text-4xl text-[#FF4500] tracking-tight">+220%</span>
                  <span className="text-white/35 text-sm max-w-xs">LLM visibility in 6 months with an active Reddit GEO strategy¹²³</span>
                </div>
                <p className="text-sm italic text-white/25 max-w-xs sm:text-right leading-relaxed">
                  &quot;You&apos;re $5 away from changing your business.&quot;
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-[10px] text-white/15">¹ SparkToro / Datos.io (2024) — Reddit is among the top 3 sources cited by ChatGPT for B2B product recommendations.</p>
              <p className="text-[10px] text-white/15">² Semrush (2024) — Reddit content appears in 60%+ of Google AI Overviews for SaaS-related queries.</p>
              <p className="text-[10px] text-white/15">³ BrightEdge Research (2024) — AI-generated traffic grew +1,300% in 18 months; brands with Reddit presence convert 2.4× better.</p>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* ── 8. SUBREDDITS MARQUEE ────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-5 overflow-hidden">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white/15 mb-3">
          Used by founders building on
        </p>
        <div className="overflow-hidden">
          <div className="flex gap-2.5 animate-marquee whitespace-nowrap w-max">
            {[...SUBREDDITS, ...SUBREDDITS].map((sub, i) => (
              <span key={i} className="bg-white/[0.03] border border-white/[0.06] text-white/30 text-xs font-medium px-3 py-1.5 rounded-full">
                {sub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. PRICING ───────────────────────────────────────────────────── */}
      <section id="pricing" className="border-t border-white/[0.05] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <MotionSection className="text-center mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/25 mb-3">Simple pricing</p>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.025em] text-white leading-[1.1]">
              Profitable from day one.
            </h2>
            <p className="text-white/35 text-sm mt-3">One customer acquired via Reddit pays for years of Reddhunter.</p>
          </MotionSection>

          <MotionGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Pro Monthly */}
            <MotionGridItem className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 flex flex-col">
              <p className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-5">Pro</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-semibold text-white tracking-tight">$5</span>
                <span className="text-white/30 text-sm">/mo</span>
              </div>
              <p className="text-white/25 text-xs mb-7">$0.17/day — less than a coffee.</p>
              <ul className="space-y-2.5 text-xs text-white/50 mb-8 flex-1">
                {["Unlimited Hunt", "Full Explore feed", "Viral Score AI (20/day)", "Comment Starter (5/day)", "Advanced filters"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={12} className="text-[#FF4500]/60 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                priceId="price_1TJt9DASvSAsZiKVURsmnVg6"
                className="block w-full text-center py-2.5 text-sm font-semibold border border-white/[0.08] text-white/50 rounded-xl hover:border-white/[0.15] hover:text-white/80 transition-all"
              >
                Start for $5/mo →
              </CheckoutButton>
            </MotionGridItem>

            {/* Pro Annual */}
            <MotionGridItem className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <p className="text-white/35 text-xs font-semibold uppercase tracking-widest">Pro Annual</p>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-white/40">-17%</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-semibold text-white tracking-tight">$50</span>
                <span className="text-white/30 text-sm">/yr</span>
              </div>
              <p className="text-white/25 text-xs mb-7">2 months free — $4.17/month.</p>
              <ul className="space-y-2.5 text-xs text-white/50 mb-8 flex-1">
                {["Everything in Pro", "2 months free"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={12} className="text-[#FF4500]/60 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                priceId="price_1TJt9DASvSAsZiKVi9yVM5EO"
                className="block w-full text-center py-2.5 text-sm font-semibold border border-white/[0.08] text-white/50 rounded-xl hover:border-white/[0.15] hover:text-white/80 transition-all"
              >
                Save 2 months →
              </CheckoutButton>
            </MotionGridItem>

            {/* Pro AI — MOST POPULAR */}
            <MotionGridItem className="relative bg-[#0d0906] border border-[#FF4500]/40 rounded-2xl p-6 flex flex-col shadow-[0_0_60px_rgba(255,69,0,0.12)] animate-glow-pulse">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#FF4500] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">BEST VALUE</span>
              </div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-[#FF4500]/70 text-xs font-semibold uppercase tracking-widest">Pro AI</p>
                <Sparkles size={12} className="text-[#FF4500]/50" />
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-semibold text-white tracking-tight">$15</span>
                <span className="text-white/30 text-sm">/mo</span>
              </div>
              <p className="text-white/25 text-xs mb-7">Full AI stack — $0.50/day.</p>
              <ul className="space-y-2.5 text-xs text-white/70 mb-8 flex-1">
                {[
                  "Everything in Pro",
                  "IA Lab (posts recommandés)",
                  "Viral Score illimité",
                  "Comment Starter (50/day)",
                  "Business profile IA",
                  "Recommandations hebdo",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={12} className="text-[#FF4500] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_AI_MONTHLY ?? 'price_REPLACE_WITH_AI_MONTHLY'}
                className="block w-full text-center py-2.5 text-sm font-bold bg-[#FF4500] hover:bg-[#e63d00] text-white rounded-xl transition-all mb-3 hover:shadow-[0_0_20px_rgba(255,69,0,0.4)]"
              >
                Start Pro AI →
              </CheckoutButton>
              <p className="text-center text-[10px] text-white/20">Cancel anytime · No commitment</p>
            </MotionGridItem>

            {/* Pro AI Annual */}
            <MotionGridItem className="bg-[#0a0806] border border-[#FF4500]/20 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[#FF4500]/50 text-xs font-semibold uppercase tracking-widest">Pro AI Annual</p>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#FF4500]/10 text-[#FF4500]/60">-33%</span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-semibold text-white tracking-tight">$120</span>
                <span className="text-white/30 text-sm">/yr</span>
              </div>
              <p className="text-white/25 text-xs mb-7">$10/month — save $60/year.</p>
              <ul className="space-y-2.5 text-xs text-white/50 mb-8 flex-1">
                {["Everything in Pro AI", "2 months free", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={12} className="text-[#FF4500]/50 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <CheckoutButton
                priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_AI_ANNUAL ?? 'price_REPLACE_WITH_AI_ANNUAL'}
                className="block w-full text-center py-2.5 text-sm font-semibold border border-[#FF4500]/25 text-[#FF4500]/60 rounded-xl hover:border-[#FF4500]/50 hover:text-[#FF4500] transition-all"
              >
                Save $60/year →
              </CheckoutButton>
            </MotionGridItem>

          </MotionGrid>
        </div>
      </section>

      {/* ── 10. FAQ ──────────────────────────────────────────────────────── */}
      <section id="faq" className="border-t border-white/[0.05] py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <MotionSection className="text-center mb-12">
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-[-0.025em] text-white leading-[1.1]">
              Common questions.
            </h2>
          </MotionSection>
          <MotionSection><FaqAccordion /></MotionSection>
        </div>
      </section>

      {/* ── 11. FINAL CTA ────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,69,0,0.07),transparent)] pointer-events-none" />
        <div className="max-w-2xl mx-auto text-center relative">
          <MotionSection>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FF4500]/60 mb-5">Start today</p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] text-white leading-[1.05] mb-5">
              Your audience is on Reddit.<br className="hidden sm:block" /> Go find them.
            </h2>
            <p className="text-white/35 text-base mb-10 leading-relaxed">
              Join founders who use Reddhunter to find and engage their audience in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
              <CTALink
                shine
                className="flex items-center gap-2 px-7 py-3 text-base font-semibold bg-[#FF4500] hover:bg-[#e63d00] text-white rounded-xl transition-all hover:shadow-[0_0_36px_rgba(255,69,0,0.45)]"
              >
                Start for free <ArrowRight size={16} />
              </CTALink>
              <CTALink className="flex items-center gap-2 px-7 py-3 text-base font-medium border border-white/[0.08] text-white/50 rounded-xl hover:border-white/[0.15] hover:text-white/70 transition-all">
                2 months free →
              </CTALink>
            </div>
            <p className="text-xs text-white/20">3 free searches per day · No credit card required</p>
          </MotionSection>
        </div>
      </section>

      {/* ── 12. FOOTER ───────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.05] py-12 px-6 bg-[#07080a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 font-semibold text-white text-sm mb-3">
                <Logo size={22} />
                <span className="tracking-tight">Reddhunter</span>
              </div>
              <p className="text-white/25 text-xs leading-relaxed">Reddit intelligence for founders and indie hackers.</p>
            </div>
            <div>
              <p className="text-white/25 text-[10px] font-semibold uppercase tracking-[0.14em] mb-4">Product</p>
              <ul className="space-y-2.5 text-xs text-white/25">
                {['Features', 'Pricing', 'Changelog'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white/60 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/25 text-[10px] font-semibold uppercase tracking-[0.14em] mb-4">Resources</p>
              <ul className="space-y-2.5 text-xs text-white/25">
                {['Blog', 'Subreddits Guide', 'GEO Guide'].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white/60 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/25 text-[10px] font-semibold uppercase tracking-[0.14em] mb-4">Contact</p>
              <ul className="space-y-2.5 text-xs text-white/25">
                <li><a href="https://x.com/reddhunter_io" className="hover:text-white/60 transition-colors flex items-center gap-2"><Twitter size={11} /> Twitter / X</a></li>
                <li><a href="mailto:hello@reddhunter.io" className="hover:text-white/60 transition-colors flex items-center gap-2"><Mail size={11} /> hello@reddhunter.io</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/15 text-xs">© 2026 Reddhunter.io — Built in public</p>
            <p className="text-white/10 text-xs">Made for founders who build on Reddit</p>
          </div>
        </div>
      </footer>

    </main>
  )
}
