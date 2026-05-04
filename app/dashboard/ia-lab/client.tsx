'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FlaskConical, Building2, Globe, Users, Tag, MessageSquare,
  Sparkles, Check, Loader2, ChevronRight, Zap, ExternalLink,
  ArrowUp, RefreshCw, TrendingUp
} from 'lucide-react'
import type { RedditPost } from '@/scraper/types'

// ─── Types ────────────────────────────────────────────────────────────────────

type Profile = {
  businessName: string
  businessUrl: string
  businessDescription: string
  targetAudience: string
  keywords: string
  tone: string
}

type RecommendedPost = RedditPost & {
  relevance: number
  reason: string
  angle: string
}

const TONES = [
  { value: 'neutral',  label: 'Neutre',  desc: 'Professionnel, équilibré' },
  { value: 'casual',   label: 'Casual',  desc: 'Humain, détendu' },
  { value: 'expert',   label: 'Expert',  desc: 'Autoritaire, technique' },
  { value: 'founder',  label: 'Founder', desc: 'Build in public, honnête' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUB_COLORS: Record<string, string> = {
  indiehackers: '#FF4500', SaaS: '#0dd3bb', startups: '#ff585b',
  Entrepreneur: '#46d160', buildinpublic: '#ff4081',
  growthhacking: '#ffb300', sidehustle: '#00b0ff',
}
function subColor(s: string) { return SUB_COLORS[s] ?? '#52525b' }

function relevanceColor(r: number) {
  if (r >= 80) return { fg: '#FF4500', bg: 'rgba(255,69,0,0.12)', border: 'rgba(255,69,0,0.25)' }
  if (r >= 60) return { fg: '#FFB300', bg: 'rgba(255,179,0,0.10)', border: 'rgba(255,179,0,0.25)' }
  return { fg: '#52525b', bg: 'rgba(82,82,91,0.1)', border: 'rgba(82,82,91,0.2)' }
}

const inputClass = `w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3
  text-[13px] text-zinc-300 placeholder-zinc-700
  focus:outline-none focus:border-[#FF4500]/40 focus:bg-white/[0.05]
  transition-all resize-none`

// ─── Components ───────────────────────────────────────────────────────────────

function FieldLabel({ icon: Icon, label, hint }: {
  icon: React.ElementType; label: string; hint?: string
}) {
  return (
    <div className="flex flex-col gap-1 mb-2">
      <div className="flex items-center gap-2">
        <Icon size={12} className="text-zinc-600" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">{label}</span>
      </div>
      {hint && <p className="text-[11px] text-zinc-700 pl-4">{hint}</p>}
    </div>
  )
}

function RecommendationCard({ post }: { post: RecommendedPost }) {
  const col = relevanceColor(post.relevance)
  const color = subColor(post.subreddit)

  return (
    <div className="group rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all p-4">

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 text-[11px] text-zinc-600 flex-wrap">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
          <span className="font-semibold text-zinc-400">r/{post.subreddit}</span>
          <span>·</span>
          <span className="flex items-center gap-0.5">
            <ArrowUp size={10} className="text-zinc-700" /> {post.score.toLocaleString()}
          </span>
          <span>·</span>
          <span>💬 {post.num_comments.toLocaleString()}</span>
        </div>

        {/* Relevance badge */}
        <span
          className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border"
          style={{ color: col.fg, backgroundColor: col.bg, borderColor: col.border }}
        >
          <TrendingUp size={9} />
          {post.relevance}%
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[14px] font-medium text-zinc-200 leading-snug mb-2 group-hover:text-white transition-colors">
        {post.title}
      </h3>

      {/* AI insight */}
      <div className="flex items-start gap-2 mb-3 px-3 py-2 rounded-lg bg-[#FF4500]/[0.05] border border-[#FF4500]/10">
        <Sparkles size={11} className="text-[#FF4500] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">{post.reason}</p>
          <p className="text-[10px] text-[#FF4500] font-medium mt-1">Angle : {post.angle}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <a href={post.permalink} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.05] transition-all">
          <ExternalLink size={10} /> Reddit
        </a>
        <Link href={`/dashboard/post/${post.id}`}
          className="flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-semibold text-[#FF4500] hover:bg-[#FF4500]/10 border border-transparent hover:border-[#FF4500]/20 transition-all ml-auto">
          Inspecter →
        </Link>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

type Tab = 'profile' | 'recommendations'

export function IaLabClient() {
  const [tab, setTab] = useState<Tab>('profile')

  // Profile state
  const [profile, setProfile] = useState<Profile>({
    businessName: '', businessUrl: '', businessDescription: '',
    targetAudience: '', keywords: '', tone: 'neutral',
  })
  const [profileLoading, setProfileLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [saved, setSaved]     = useState(false)
  const [profileFilled, setProfileFilled] = useState(false)

  // Recommendations state
  const [recs, setRecs]             = useState<RecommendedPost[] | null>(null)
  const [recsLoading, setRecsLoading] = useState(false)
  const [recsError, setRecsError]   = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/profile')
      .then(r => r.json())
      .then((data: Partial<Profile>) => {
        if (data) { setProfile(p => ({ ...p, ...data })); setProfileFilled(!!data.businessName) }
      })
      .finally(() => setProfileLoading(false))
  }, [])

  function update(key: keyof Profile, value: string) {
    setProfile(p => ({ ...p, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      setSaved(true)
      setProfileFilled(!!profile.businessName)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  async function loadRecommendations() {
    setRecsLoading(true)
    setRecsError(null)
    try {
      const res = await fetch('/api/recommendations', { method: 'POST' })
      if (!res.ok) {
        const err = await res.json() as { error: string }
        if (err.error === 'no_profile') setRecsError('no_profile')
        else throw new Error()
        return
      }
      const data = await res.json() as { recommendations: RecommendedPost[] }
      setRecs(data.recommendations)
    } catch {
      setRecsError('failed')
    } finally {
      setRecsLoading(false)
    }
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={18} className="text-zinc-700 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#07080a] text-white">
      <div className="max-w-2xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">Dashboard</span>
            <span className="text-zinc-700">/</span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#FF4500]">IA Lab</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FF4500]/10 border border-[#FF4500]/20">
              <FlaskConical size={16} className="text-[#FF4500]" />
            </div>
            <h1 className="text-[32px] font-semibold text-white tracking-[-0.02em] leading-tight">IA Lab</h1>
          </div>
          <p className="text-zinc-600 text-[13px] leading-relaxed">
            Configure ton business. Claude personnalise chaque analyse et recommande les posts les plus stratégiques.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-8">
          {([
            { key: 'profile',         label: 'Mon Business',      icon: Building2 },
            { key: 'recommendations', label: 'Posts recommandés', icon: Sparkles  },
          ] as { key: Tab; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-all ${
                tab === key
                  ? 'bg-white/[0.07] text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              <Icon size={13} className={tab === key ? 'text-[#FF4500]' : ''} />
              {label}
              {key === 'recommendations' && recs && (
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-[#FF4500]/20 text-[#FF4500]">
                  {recs.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── TAB: PROFILE ─────────────────────────────────────────────────── */}
        {tab === 'profile' && (
          <div className="flex flex-col gap-5">

            {/* Status banner */}
            <div className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border transition-all ${
              profileFilled
                ? 'bg-[#FF4500]/[0.06] border-[#FF4500]/20'
                : 'bg-white/[0.02] border-white/[0.06]'
            }`}>
              <Zap size={14} className={`mt-0.5 flex-shrink-0 ${profileFilled ? 'text-[#FF4500]' : 'text-zinc-700'}`} />
              <div>
                <p className={`text-[12px] font-semibold mb-0.5 ${profileFilled ? 'text-[#FF4500]' : 'text-zinc-500'}`}>
                  {profileFilled ? 'Profil IA actif' : 'Profil IA non configuré'}
                </p>
                <p className="text-[11px] text-zinc-600">
                  {profileFilled
                    ? `Viral Scores, commentaires et recommandations adaptés à ${profile.businessName}.`
                    : 'Remplis le nom et la description pour activer la personnalisation.'}
                </p>
              </div>
            </div>

            {/* Identity */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 pb-2 border-b border-white/[0.05]">
                <Building2 size={13} className="text-[#FF4500]" />
                <h2 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-widest">Identité du produit</h2>
              </div>

              <div>
                <FieldLabel icon={Sparkles} label="Nom du produit" />
                <input type="text" value={profile.businessName}
                  onChange={e => update('businessName', e.target.value)}
                  placeholder="ex: Reddhunter" className={inputClass} />
              </div>

              <div>
                <FieldLabel icon={Globe} label="Site web" hint="URL complète avec https://" />
                <input type="url" value={profile.businessUrl}
                  onChange={e => update('businessUrl', e.target.value)}
                  placeholder="ex: https://reddhunter.io" className={inputClass} />
              </div>

              <div>
                <FieldLabel icon={MessageSquare} label="Description"
                  hint="Ce que fait ton produit, pour qui, le problème qu'il résout." />
                <textarea rows={3} value={profile.businessDescription}
                  onChange={e => update('businessDescription', e.target.value)}
                  placeholder="ex: Reddhunter détecte les posts Reddit viraux, les score avec l'IA et génère des commentaires GEO-optimisés pour les fondateurs SaaS."
                  className={inputClass} />
              </div>
            </div>

            {/* Audience */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 pb-2 border-b border-white/[0.05]">
                <Users size={13} className="text-[#0dd3bb]" />
                <h2 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-widest">Audience & mots-clés</h2>
              </div>

              <div>
                <FieldLabel icon={Users} label="Audience cible" hint="Qui utilise ton produit ?" />
                <input type="text" value={profile.targetAudience}
                  onChange={e => update('targetAudience', e.target.value)}
                  placeholder="ex: indie hackers, fondateurs SaaS, solopreneurs" className={inputClass} />
              </div>

              <div>
                <FieldLabel icon={Tag} label="Mots-clés niche"
                  hint="Séparés par des virgules. Utilisés pour filtrer les posts et les recommandations." />
                <input type="text" value={profile.keywords}
                  onChange={e => update('keywords', e.target.value)}
                  placeholder="ex: Reddit marketing, SaaS growth, MRR, indie hacker, viral post"
                  className={inputClass} />
              </div>
            </div>

            {/* Tone */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 pb-2 border-b border-white/[0.05] mb-4">
                <MessageSquare size={13} className="text-[#FFB300]" />
                <h2 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-widest">Ton de voix</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map(t => (
                  <button key={t.value} onClick={() => update('tone', t.value)}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                      profile.tone === t.value
                        ? 'border-[#FF4500]/40 bg-[#FF4500]/[0.08] text-white'
                        : 'border-white/[0.07] bg-white/[0.02] text-zinc-500 hover:border-white/[0.12] hover:text-zinc-300'
                    }`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      profile.tone === t.value ? 'border-[#FF4500] bg-[#FF4500]' : 'border-zinc-700'
                    }`}>
                      {profile.tone === t.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold">{t.label}</p>
                      <p className="text-[10px] text-zinc-600 mt-0.5">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Save */}
            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-zinc-700">
                {saved ? (
                  <span className="flex items-center gap-1.5 text-[#46d160]"><Check size={11} /> Sauvegardé</span>
                ) : 'Non sauvegardé'}
              </p>
              <button onClick={handleSave} disabled={saving}
                className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF4500] hover:bg-[#CC3700] disabled:opacity-50 text-white text-[13px] font-semibold transition-colors group">
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                {saving ? <Loader2 size={13} className="animate-spin" /> : saved ? <Check size={13} /> : <ChevronRight size={13} />}
                {saving ? 'Sauvegarde…' : saved ? 'Sauvegardé !' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        )}

        {/* ── TAB: RECOMMENDATIONS ─────────────────────────────────────────── */}
        {tab === 'recommendations' && (
          <div>
            {/* No profile */}
            {!profileFilled && (
              <div className="flex flex-col items-center py-16 gap-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
                  <Building2 size={22} className="text-zinc-700" />
                </div>
                <p className="text-[14px] text-zinc-500">Configure ton business d&apos;abord</p>
                <p className="text-[12px] text-zinc-700 max-w-xs">Claude a besoin de connaître ton produit pour te recommander les bons posts.</p>
                <button onClick={() => setTab('profile')}
                  className="px-5 py-2.5 rounded-xl bg-[#FF4500] hover:bg-[#CC3700] text-white text-[13px] font-semibold transition-colors">
                  Configurer mon business →
                </button>
              </div>
            )}

            {/* Has profile, not yet loaded */}
            {profileFilled && !recs && !recsLoading && (
              <div className="flex flex-col items-center py-12 gap-5 text-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-[#FF4500]/10 border border-[#FF4500]/20 flex items-center justify-center">
                    <Sparkles size={24} className="text-[#FF4500]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF4500] flex items-center justify-center">
                    <Zap size={10} className="text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-white mb-1">Recommandations pour {profile.businessName}</p>
                  <p className="text-[12px] text-zinc-600 max-w-sm leading-relaxed">
                    Claude analyse les posts Reddit du jour et sélectionne les 12 plus stratégiques pour ton business.
                  </p>
                </div>
                <button onClick={loadRecommendations}
                  className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF4500] hover:bg-[#CC3700] text-white text-[13px] font-semibold transition-colors group">
                  <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <Sparkles size={14} />
                  Générer mes recommandations
                </button>
                {recsError === 'failed' && (
                  <p className="text-[12px] text-red-500">Erreur — réessaie</p>
                )}
              </div>
            )}

            {/* Loading */}
            {recsLoading && (
              <div className="flex flex-col items-center py-16 gap-4">
                <div className="flex gap-1.5">
                  {[0,1,2,3].map(i => (
                    <span key={i} className="w-2 h-2 rounded-full bg-[#FF4500]"
                      style={{ animation: `bounce 1s ease-in-out ${i*0.12}s infinite` }} />
                  ))}
                </div>
                <p className="text-[13px] text-zinc-500">Claude analyse les posts pour {profile.businessName}…</p>
                <p className="text-[11px] text-zinc-700">Quelques secondes</p>
              </div>
            )}

            {/* Results */}
            {recs && recs.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[13px] text-zinc-400 font-medium">
                      <span className="text-white font-semibold">{recs.length} posts</span> recommandés pour {profile.businessName}
                    </p>
                    <p className="text-[11px] text-zinc-700 mt-0.5">Triés par pertinence — mis à jour à chaque scrape</p>
                  </div>
                  <button onClick={loadRecommendations} disabled={recsLoading}
                    className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.04]">
                    <RefreshCw size={11} className={recsLoading ? 'animate-spin' : ''} />
                    Actualiser
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {recs.map(post => (
                    <RecommendationCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* Empty results */}
            {recs && recs.length === 0 && (
              <div className="text-center py-16 text-zinc-700 text-sm">
                Aucun post pertinent trouvé. Essaie d&apos;élargir tes mots-clés.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
