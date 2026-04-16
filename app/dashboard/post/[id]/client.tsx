'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Zap, MessageSquare, ExternalLink,
  ArrowUp, Copy, Check, RefreshCw, ChevronRight,
  TrendingUp, Users, Clock, BarChart2
} from 'lucide-react'
import type { RedditPost } from '@/scraper/types'

// ─── Types ────────────────────────────────────────────────────────────────────

type ViralResult = {
  score: number
  reason: string
  tags: string[]
}

type CommentDraft = {
  tone: string
  text: string
  angle: string
}

type CommentResult = {
  comments: CommentDraft[]
  bestTime: string
  expectedEngagement: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUB_COLORS: Record<string, string> = {
  indiehackers: '#FF4500',
  SaaS: '#0dd3bb',
  startups: '#ff585b',
  Entrepreneur: '#46d160',
  buildinpublic: '#ff4081',
  growthhacking: '#ffb300',
  sidehustle: '#00b0ff',
}
function subColor(sub: string) { return SUB_COLORS[sub] ?? '#818384' }

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const h = Math.floor(diff / 3_600_000)
  const d = Math.floor(h / 24)
  if (d > 0) return `il y a ${d}j`
  if (h > 0) return `il y a ${h}h`
  return 'à l\'instant'
}

function scoreColor(s: number) {
  if (s >= 80) return { fg: '#FF4500', bg: 'rgba(255,69,0,0.12)', border: 'rgba(255,69,0,0.3)' }
  if (s >= 60) return { fg: '#FF8040', bg: 'rgba(255,128,64,0.12)', border: 'rgba(255,128,64,0.3)' }
  if (s >= 40) return { fg: '#FFB300', bg: 'rgba(255,179,0,0.12)', border: 'rgba(255,179,0,0.3)' }
  return { fg: '#71717a', bg: 'rgba(113,113,122,0.1)', border: 'rgba(113,113,122,0.2)' }
}

// ─── Score Arc ─────────────────────────────────────────────────────────────────

function ScoreArc({ score }: { score: number }) {
  const { fg } = scoreColor(score)
  const r = 54
  const circ = 2 * Math.PI * r
  const progress = (score / 100) * circ * 0.75
  const offset = circ * 0.125

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full -rotate-[135deg]" viewBox="0 0 128 128">
        {/* Track */}
        <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.06)"
          strokeWidth="8" strokeDasharray={`${circ * 0.75} ${circ}`}
          strokeDashoffset={-offset} strokeLinecap="round" />
        {/* Progress */}
        <circle cx="64" cy="64" r={r} fill="none" stroke={fg}
          strokeWidth="8"
          strokeDasharray={`${progress} ${circ}`}
          strokeDashoffset={-offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease', filter: `drop-shadow(0 0 6px ${fg}80)` }}
        />
      </svg>
      <div className="text-center z-10">
        <span className="text-4xl font-bold text-white" style={{ color: fg }}>{score}</span>
        <span className="block text-[10px] text-zinc-500 font-medium uppercase tracking-widest mt-0.5">/100</span>
      </div>
    </div>
  )
}

// ─── Stat pill ────────────────────────────────────────────────────────────────

function StatPill({ icon: Icon, label, value, color = '#71717a' }: {
  icon: React.ElementType; label: string; value: string | number; color?: string
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
      <Icon size={14} style={{ color }} />
      <div>
        <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">{label}</p>
        <p className="text-[15px] font-semibold text-white">{value}</p>
      </div>
    </div>
  )
}

// ─── Comment card ─────────────────────────────────────────────────────────────

function CommentCard({ comment }: { comment: CommentDraft }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(comment.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toneColor: Record<string, string> = {
    Expert: '#FF4500',
    Curieux: '#0dd3bb',
    Actionnable: '#FFB300',
  }

  return (
    <div className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all p-5">
      {/* Tone badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
          style={{
            color: toneColor[comment.tone] ?? '#FF4500',
            borderColor: `${toneColor[comment.tone] ?? '#FF4500'}40`,
            backgroundColor: `${toneColor[comment.tone] ?? '#FF4500'}12`,
          }}
        >
          {comment.tone}
        </span>
        <span className="text-[10px] text-zinc-600 italic">{comment.angle}</span>
      </div>

      {/* Text */}
      <p className="text-[13px] text-zinc-300 leading-relaxed mb-4">{comment.text}</p>

      {/* Copy */}
      <button
        onClick={copy}
        className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-600 hover:text-zinc-300 transition-colors"
      >
        {copied ? <Check size={11} className="text-[#46d160]" /> : <Copy size={11} />}
        {copied ? 'Copié !' : 'Copier'}
      </button>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export function PostInspectClient({ post }: { post: RedditPost }) {
  const [viral, setViral] = useState<ViralResult | null>(null)
  const [viralLoading, setViralLoading] = useState(false)
  const [viralError, setViralError] = useState(false)

  const [comments, setComments] = useState<CommentResult | null>(null)
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [commentsError, setCommentsError] = useState(false)

  const accentColor = subColor(post.subreddit)

  async function analyzeViral() {
    setViralLoading(true)
    setViralError(false)
    try {
      const res = await fetch('/api/viral-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          score: post.score,
          num_comments: post.num_comments,
          upvote_ratio: post.upvote_ratio,
          subreddit: post.subreddit,
          selftext: post.selftext,
        }),
      })
      if (!res.ok) throw new Error()
      setViral(await res.json())
    } catch {
      setViralError(true)
    } finally {
      setViralLoading(false)
    }
  }

  async function generateComments() {
    setCommentsLoading(true)
    setCommentsError(false)
    try {
      const res = await fetch('/api/comment-starter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          subreddit: post.subreddit,
          selftext: post.selftext,
          score: post.score,
          num_comments: post.num_comments,
        }),
      })
      if (!res.ok) throw new Error()
      setComments(await res.json())
    } catch {
      setCommentsError(true)
    } finally {
      setCommentsLoading(false)
    }
  }

  const engagement = post.score + post.num_comments * 3

  return (
    <div className="min-h-screen bg-[#07080a] text-white">
      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Back */}
        <Link
          href="/dashboard/explore"
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-300 text-[12px] font-medium transition-colors mb-8 group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Retour à Explore
        </Link>

        {/* Post header */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 mb-6">
          {/* Meta */}
          <div className="flex items-center gap-2 text-[11px] text-zinc-600 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            <span className="font-semibold text-zinc-400">r/{post.subreddit}</span>
            <span>·</span>
            <span>u/{post.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {timeAgo(post.created_at)}
            </span>
            {post.flair && (
              <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] border border-white/10 text-zinc-500 bg-white/[0.03]">
                {post.flair}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-[22px] font-semibold text-white leading-snug mb-4 tracking-tight">
            {post.title}
          </h1>

          {/* Selftext */}
          {post.selftext && post.selftext.length > 20 && (
            <p className="text-[13px] text-zinc-500 leading-relaxed mb-4 border-l-2 border-white/10 pl-3">
              {post.selftext.slice(0, 600)}
              {post.selftext.length > 600 && '…'}
            </p>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <StatPill icon={ArrowUp} label="Upvotes" value={post.score.toLocaleString()} color="#FF4500" />
            <StatPill icon={MessageSquare} label="Comments" value={post.num_comments.toLocaleString()} color="#0dd3bb" />
            <StatPill icon={TrendingUp} label="Engagement" value={engagement.toLocaleString()} color="#FFB300" />
            <StatPill icon={Users} label="Ratio" value={post.upvote_ratio ? `${Math.round(post.upvote_ratio * 100)}%` : 'N/A'} color="#46d160" />
          </div>

          {/* Reddit link */}
          <a
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-zinc-600 hover:text-zinc-300 transition-colors"
          >
            <ExternalLink size={11} />
            Voir sur Reddit
          </a>
        </div>

        {/* ── VIRAL SCORE ───────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Zap size={15} className="text-[#FF4500]" />
            <h2 className="text-[15px] font-semibold text-white tracking-tight">Viral Score IA</h2>
          </div>

          {!viral && !viralLoading && (
            <div className="flex flex-col items-center py-6 gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF4500]/10 border border-[#FF4500]/20">
                <Zap size={24} className="text-[#FF4500]" />
              </div>
              <div className="text-center">
                <p className="text-[14px] text-zinc-400 mb-1">Analyse le potentiel viral de ce post</p>
                <p className="text-[12px] text-zinc-600">Score 0-100 + explication + tags</p>
              </div>
              <button
                onClick={analyzeViral}
                className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF4500] hover:bg-[#CC3700] text-white text-[13px] font-semibold transition-colors group"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <Zap size={13} />
                Analyser avec Claude
              </button>
              {viralError && <p className="text-[12px] text-red-500">Erreur — réessaie</p>}
            </div>
          )}

          {viralLoading && (
            <div className="flex flex-col items-center py-8 gap-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full bg-[#FF4500]"
                    style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
                ))}
              </div>
              <p className="text-[12px] text-zinc-600">Claude Haiku analyse le post…</p>
            </div>
          )}

          {viral && (
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Arc */}
              <ScoreArc score={viral.score} />

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-zinc-300 leading-relaxed mb-4">{viral.reason}</p>

                {/* Tags */}
                {viral.tags && viral.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {viral.tags.map(tag => (
                      <span key={tag}
                        className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-white/10 text-zinc-400 bg-white/[0.03]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  onClick={analyzeViral}
                  className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  <RefreshCw size={10} />
                  Ré-analyser
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── COMMENT STARTERS ─────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare size={15} className="text-[#0dd3bb]" />
            <h2 className="text-[15px] font-semibold text-white tracking-tight">Comment Starters GEO</h2>
          </div>

          {!comments && !commentsLoading && (
            <div className="flex flex-col items-center py-6 gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0dd3bb]/10 border border-[#0dd3bb]/20">
                <MessageSquare size={24} className="text-[#0dd3bb]" />
              </div>
              <div className="text-center">
                <p className="text-[14px] text-zinc-400 mb-1">Génère 3 commentaires prêts à poster</p>
                <p className="text-[12px] text-zinc-600">Expert · Curieux · Actionnable</p>
              </div>
              <button
                onClick={generateComments}
                className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#0dd3bb]/30 hover:border-[#0dd3bb]/60 text-[#0dd3bb] text-[13px] font-semibold transition-all group bg-[#0dd3bb]/5 hover:bg-[#0dd3bb]/10"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#0dd3bb]/15 to-transparent" />
                <MessageSquare size={13} />
                Générer avec Claude
              </button>
              {commentsError && <p className="text-[12px] text-red-500">Erreur — réessaie</p>}
            </div>
          )}

          {commentsLoading && (
            <div className="flex flex-col items-center py-8 gap-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2 h-2 rounded-full bg-[#0dd3bb]"
                    style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
                ))}
              </div>
              <p className="text-[12px] text-zinc-600">Claude rédige tes commentaires…</p>
            </div>
          )}

          {comments && (
            <div>
              {/* Meta info */}
              <div className="flex items-center gap-4 mb-4 text-[11px] text-zinc-600">
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {comments.bestTime}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp size={10} />
                  {comments.expectedEngagement}
                </span>
              </div>

              {/* Comment cards */}
              <div className="flex flex-col gap-3 mb-4">
                {comments.comments.map((c, i) => (
                  <CommentCard key={i} comment={c} />
                ))}
              </div>

              <button
                onClick={generateComments}
                className="flex items-center gap-1.5 text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                <RefreshCw size={10} />
                Régénérer
              </button>
            </div>
          )}
        </div>

        {/* ── POST ANALYSIS ─────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 size={15} className="text-[#FFB300]" />
            <h2 className="text-[15px] font-semibold text-white tracking-tight">Analyse rapide</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Engagement quality */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium mb-1">Engagement / upvote</p>
              <p className="text-[20px] font-bold text-white">
                {post.score > 0 ? (post.num_comments / post.score * 100).toFixed(1) : '0'}%
              </p>
              <p className="text-[11px] text-zinc-600 mt-1">
                {(post.num_comments / Math.max(post.score, 1)) > 0.15
                  ? '🔥 Très discussions — sujet qui divise ou inspire'
                  : '📈 Ratio normal'}
              </p>
            </div>

            {/* Viral potential */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium mb-1">Score engagement brut</p>
              <p className="text-[20px] font-bold text-white">{engagement.toLocaleString()}</p>
              <p className="text-[11px] text-zinc-600 mt-1">
                {engagement > 5000 ? '🚀 Viral — post de référence' :
                  engagement > 1000 ? '⚡ Fort — bonne traction' :
                    engagement > 300 ? '📊 Moyen — audience ciblée' : '💤 Faible — niche ou récent'}
              </p>
            </div>

            {/* Post type */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium mb-1">Type de post</p>
              <p className="text-[15px] font-semibold text-white">{post.is_self ? 'Post texte' : 'Lien externe'}</p>
              <p className="text-[11px] text-zinc-600 mt-1">
                {post.is_self ? 'Texte → meilleur pour les commentaires' : 'Lien → trafic direct'}
              </p>
            </div>

            {/* Title length */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium mb-1">Longueur titre</p>
              <p className="text-[20px] font-bold text-white">{post.title.length} chars</p>
              <p className="text-[11px] text-zinc-600 mt-1">
                {post.title.length < 50 ? '✅ Court et percutant' :
                  post.title.length < 100 ? '✅ Longueur optimale' : '⚠️ Titre long — attention au tronquage'}
              </p>
            </div>
          </div>

          {/* Quick actions footer */}
          <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/[0.06]">
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/10 text-[12px] text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
            >
              <ExternalLink size={12} />
              Voir sur Reddit
            </a>
            <Link
              href="/dashboard/explore"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              <ChevronRight size={12} />
              Post suivant
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
