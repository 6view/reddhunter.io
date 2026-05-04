'use client'

import { useState, useEffect } from 'react'
import {
  Sparkles, Globe, Users, Tag, MessageSquare,
  Check, Loader2, ChevronRight, Building2, Zap,
  CreditCard, ExternalLink, Shield
} from 'lucide-react'

type Profile = {
  businessName: string
  businessUrl: string
  businessDescription: string
  targetAudience: string
  keywords: string
  tone: string
}

const PLAN_LABELS: Record<string, { label: string; color: string; desc: string }> = {
  FREE:          { label: 'Free',        color: 'text-zinc-400',   desc: 'Viral Score 3/j · Comment Starter 1/j · Passe à Pro pour plus →' },
  PRO:           { label: 'Pro',         color: 'text-[#FF4500]',  desc: '5€/mois · Viral Score 20/j, Comment Starter 5/j' },
  PRO_ANNUAL:    { label: 'Pro Annual',  color: 'text-[#FF4500]',  desc: '50€/an · 2 mois offerts' },
  PRO_AI:        { label: 'Pro AI',      color: 'text-[#0dd3bb]',  desc: '15€/mois · IA illimitée + IA Lab' },
  PRO_AI_ANNUAL: { label: 'Pro AI Annual', color: 'text-[#0dd3bb]', desc: '120€/an · 2 mois offerts' },
}

const TONES = [
  { value: 'neutral',       label: 'Neutre',       desc: 'Équilibré, professionnel' },
  { value: 'casual',        label: 'Casual',        desc: 'Détendu, humain, proche' },
  { value: 'expert',        label: 'Expert',        desc: 'Autoritaire, technique' },
  { value: 'founder',       label: 'Founder',       desc: 'Build in public, transparent' },
]

function Field({
  label, hint, icon: Icon, children,
}: {
  label: string
  hint?: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon size={13} className="text-zinc-600" />
        <label className="text-[12px] font-semibold text-zinc-400 uppercase tracking-widest">{label}</label>
      </div>
      {hint && <p className="text-[11px] text-zinc-700 -mt-1">{hint}</p>}
      {children}
    </div>
  )
}

export function SettingsClient() {
  const [profile, setProfile] = useState<Profile>({
    businessName: '',
    businessUrl: '',
    businessDescription: '',
    targetAudience: '',
    keywords: '',
    tone: 'neutral',
  })

  const [loading, setLoading]       = useState(true)
  const [saving, setSaving]         = useState(false)
  const [saved, setSaved]           = useState(false)
  const [filled, setFilled]         = useState(false)
  const [plan, setPlan]             = useState<string | null>(null)
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/profile').then(r => r.json()),
      fetch('/api/user').then(r => r.json()),
    ]).then(([profileData, userData]: [Partial<Profile>, { plan?: string }]) => {
      if (profileData) {
        setProfile(p => ({ ...p, ...profileData }))
        setFilled(!!profileData.businessName)
      }
      if (userData?.plan) setPlan(userData.plan)
    }).finally(() => setLoading(false))
  }, [])

  async function handlePortal() {
    setPortalLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const { url } = await res.json()
      if (url) window.location.href = url
    } finally {
      setPortalLoading(false)
    }
  }

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
      setFilled(!!profile.businessName)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  const inputClass = `
    w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3
    text-[13px] text-zinc-300 placeholder-zinc-700
    focus:outline-none focus:border-[#FF4500]/40 focus:bg-white/[0.05]
    transition-all resize-none
  `

  if (loading) {
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
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">Dashboard</span>
            <span className="text-zinc-700">/</span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#FF4500]">Settings</span>
          </div>
          <h1 className="text-[32px] font-semibold text-white tracking-[-0.02em] leading-tight mb-2">
            Ton business
          </h1>
          <p className="text-zinc-600 text-[13px] leading-relaxed">
            Ces infos permettent à Claude de personnaliser chaque analyse et commentaire à ton produit.
          </p>
        </div>

        {/* Subscription section */}
        {plan && (
          <div className="mb-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <div className="flex items-center gap-2 pb-4 border-b border-white/[0.05] mb-5">
              <CreditCard size={14} className="text-[#FFB300]" />
              <h2 className="text-[13px] font-semibold text-zinc-300">Abonnement</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield size={12} className={PLAN_LABELS[plan]?.color ?? 'text-zinc-400'} />
                  <span className={`text-[13px] font-semibold ${PLAN_LABELS[plan]?.color ?? 'text-zinc-400'}`}>
                    {PLAN_LABELS[plan]?.label ?? plan}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-600">{PLAN_LABELS[plan]?.desc}</p>
              </div>
              <button
                onClick={handlePortal}
                disabled={portalLoading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.10] bg-white/[0.03] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200 text-[12px] font-medium transition-all disabled:opacity-50"
              >
                {portalLoading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <ExternalLink size={12} />
                )}
                Gérer l'abonnement
              </button>
            </div>
          </div>
        )}

        {/* AI context banner */}
        <div className={`mb-8 flex items-start gap-3 px-4 py-3.5 rounded-xl border transition-all ${
          filled
            ? 'bg-[#FF4500]/[0.06] border-[#FF4500]/20'
            : 'bg-white/[0.02] border-white/[0.06]'
        }`}>
          <Zap size={14} className={filled ? 'text-[#FF4500] mt-0.5 flex-shrink-0' : 'text-zinc-700 mt-0.5 flex-shrink-0'} />
          <div>
            <p className={`text-[12px] font-semibold mb-0.5 ${filled ? 'text-[#FF4500]' : 'text-zinc-500'}`}>
              {filled ? 'Profil IA actif' : 'Profil IA incomplet'}
            </p>
            <p className="text-[11px] text-zinc-600">
              {filled
                ? `Les Viral Scores et Comment Starters sont adaptés à ${profile.businessName}.`
                : 'Remplis au moins le nom et la description pour activer la personnalisation IA.'}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">

          {/* Section — Identité */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 pb-1 border-b border-white/[0.05]">
              <Building2 size={14} className="text-[#FF4500]" />
              <h2 className="text-[13px] font-semibold text-zinc-300">Identité du produit</h2>
            </div>

            <Field label="Nom du produit / SaaS" icon={Sparkles}>
              <input
                type="text"
                value={profile.businessName}
                onChange={e => update('businessName', e.target.value)}
                placeholder="ex: Reddhunter"
                className={inputClass}
              />
            </Field>

            <Field label="Site web" icon={Globe} hint="URL complète avec https://">
              <input
                type="url"
                value={profile.businessUrl}
                onChange={e => update('businessUrl', e.target.value)}
                placeholder="ex: https://reddhunter.io"
                className={inputClass}
              />
            </Field>

            <Field
              label="Description"
              icon={MessageSquare}
              hint="Ce que fait ton produit, pour qui, le problème qu'il résout. 2-3 phrases max."
            >
              <textarea
                rows={3}
                value={profile.businessDescription}
                onChange={e => update('businessDescription', e.target.value)}
                placeholder="ex: Reddhunter est un outil d'intelligence Reddit pour les fondateurs. Il détecte les posts viraux, score leur potentiel et génère des commentaires optimisés pour gagner en visibilité."
                className={inputClass}
              />
            </Field>
          </div>

          {/* Section — Audience & keywords */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 pb-1 border-b border-white/[0.05]">
              <Users size={14} className="text-[#0dd3bb]" />
              <h2 className="text-[13px] font-semibold text-zinc-300">Audience & positionnement</h2>
            </div>

            <Field
              label="Audience cible"
              icon={Users}
              hint="Qui utilise ton produit ? Sois précis."
            >
              <input
                type="text"
                value={profile.targetAudience}
                onChange={e => update('targetAudience', e.target.value)}
                placeholder="ex: indie hackers, fondateurs SaaS early-stage, solopreneurs"
                className={inputClass}
              />
            </Field>

            <Field
              label="Mots-clés / niche"
              icon={Tag}
              hint="Sépare par des virgules. Utilisés pour filtrer les posts pertinents."
            >
              <input
                type="text"
                value={profile.keywords}
                onChange={e => update('keywords', e.target.value)}
                placeholder="ex: Reddit marketing, growth hacking, SaaS, indie hacker, MRR"
                className={inputClass}
              />
            </Field>
          </div>

          {/* Section — Tone */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2 pb-1 border-b border-white/[0.05]">
              <MessageSquare size={14} className="text-[#FFB300]" />
              <h2 className="text-[13px] font-semibold text-zinc-300">Ton de voix</h2>
            </div>

            <Field label="Ton des commentaires générés" icon={MessageSquare} hint="Claude adaptera le style de rédaction.">
              <div className="grid grid-cols-2 gap-2">
                {TONES.map(t => (
                  <button
                    key={t.value}
                    onClick={() => update('tone', t.value)}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                      profile.tone === t.value
                        ? 'border-[#FF4500]/40 bg-[#FF4500]/08 text-white'
                        : 'border-white/[0.07] bg-white/[0.02] text-zinc-500 hover:border-white/[0.12] hover:text-zinc-300'
                    }`}
                  >
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
            </Field>
          </div>

          {/* Save button */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-zinc-700">
              {saved ? (
                <span className="flex items-center gap-1.5 text-[#46d160]">
                  <Check size={11} /> Profil sauvegardé
                </span>
              ) : 'Les modifications ne sont pas encore sauvegardées'}
            </p>
            <button
              onClick={handleSave}
              disabled={saving}
              className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FF4500] hover:bg-[#CC3700] disabled:opacity-50 text-white text-[13px] font-semibold transition-colors group"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              {saving ? (
                <Loader2 size={13} className="animate-spin" />
              ) : saved ? (
                <Check size={13} />
              ) : (
                <ChevronRight size={13} />
              )}
              {saving ? 'Sauvegarde…' : saved ? 'Sauvegardé !' : 'Sauvegarder'}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
