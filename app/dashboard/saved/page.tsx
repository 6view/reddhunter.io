'use client'

import { useEffect, useState } from 'react'
import { Bookmark, ExternalLink, ArrowUp, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface SavedPost {
  id: string
  redditId: string
  title: string
  subreddit: string
  permalink: string
  score: number
  numComments: number
  createdAt: string
}

const SUB_COLORS: Record<string, string> = {
  indiehackers: '#FF4500', SaaS: '#0dd3bb', startups: '#ff585b',
  Entrepreneur: '#46d160', buildinpublic: '#ff4081',
  growthhacking: '#ffb300', sidehustle: '#00b0ff',
}
function subColor(sub: string) { return SUB_COLORS[sub] ?? '#52525b' }

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const h = Math.floor(diff / 3_600_000)
  const d = Math.floor(h / 24)
  if (d > 0) return `il y a ${d}j`
  if (h > 0) return `il y a ${h}h`
  return 'à l\'instant'
}

export default function SavedPage() {
  const [posts, setPosts]     = useState<SavedPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/saved/list')
      .then(r => r.ok ? r.json() : [])
      .then((data: SavedPost[]) => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleRemove(redditId: string) {
    setPosts(prev => prev.filter(p => p.redditId !== redditId))
    await fetch(`/api/saved/${redditId}`, { method: 'DELETE' })
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">Dashboard</span>
          <span className="text-zinc-700">/</span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#FF4500]">Favoris</span>
        </div>
        <h1 className="text-[32px] font-semibold text-white tracking-[-0.02em] leading-tight mb-2">Favoris</h1>
        <p className="text-zinc-600 text-[13px] leading-relaxed">
          Tous tes posts sauvegardés — persistants entre sessions.
        </p>
      </div>

      {/* Count */}
      {!loading && posts.length > 0 && (
        <div className="flex items-center gap-2 mb-5 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] w-fit">
          <Bookmark size={12} className="text-[#FFB300] fill-[#FFB300]" />
          <span className="text-[12px] text-zinc-400 font-medium">
            {posts.length} post{posts.length !== 1 ? 's' : ''} sauvegardé{posts.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={18} className="text-zinc-700 animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!loading && posts.length === 0 && (
        <div className="flex flex-col items-center text-center py-20 gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
            <Bookmark size={22} className="text-zinc-700" />
          </div>
          <p className="text-zinc-500 text-[14px]">Aucun post sauvegardé</p>
          <Link href="/dashboard/explore"
            className="text-[13px] text-[#FF4500] hover:text-[#FF6B35] transition-colors font-medium">
            Explorer le feed →
          </Link>
        </div>
      )}

      {/* Posts */}
      {!loading && posts.length > 0 && (
        <div className="flex flex-col gap-2.5">
          {posts.map(post => {
            const color = subColor(post.subreddit)
            const scoreDisplay = post.score >= 1000 ? `${(post.score / 1000).toFixed(1)}k` : String(post.score)
            return (
              <article key={post.id}
                className="flex rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all overflow-hidden group">

                {/* Vote col */}
                <div className="flex flex-col items-center gap-1 px-2.5 py-4 w-11 flex-shrink-0 bg-white/[0.02] border-r border-white/[0.05]">
                  <ArrowUp size={15} className="text-zinc-700" />
                  <span className="text-[11px] font-bold text-zinc-400">{scoreDisplay}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 py-3.5 pr-4 pl-4">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-600 mb-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    <span className="font-semibold text-zinc-400">r/{post.subreddit}</span>
                    <span>·</span>
                    <span>Sauvegardé {timeAgo(post.createdAt)}</span>
                    <span className="ml-auto text-[10px] text-zinc-700">💬 {post.numComments.toLocaleString()}</span>
                  </div>

                  <h3 className="text-[15px] font-medium text-zinc-200 leading-snug mb-3 group-hover:text-white transition-colors">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-1">
                    <a href={post.permalink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.05] transition-all">
                      <ExternalLink size={10} /> Reddit
                    </a>
                    <Link href={`/dashboard/post/${post.redditId}`}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-semibold text-[#FF4500] hover:bg-[#FF4500]/10 border border-transparent hover:border-[#FF4500]/20 transition-all">
                      Inspecter →
                    </Link>
                    <button onClick={() => handleRemove(post.redditId)}
                      className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] text-zinc-700 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 size={10} /> Retirer
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
