'use client'

import { useEffect, useState } from 'react'
import { Bookmark, ExternalLink, ArrowUp, Trash2 } from 'lucide-react'
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
  indiehackers:  '#FF4500',
  SaaS:          '#0dd3bb',
  startups:      '#ff585b',
  Entrepreneur:  '#46d160',
  buildinpublic: '#ff4081',
  growthhacking: '#ffb300',
  sidehustle:    '#00b0ff',
}
function subColor(sub: string) {
  return SUB_COLORS[sub] ?? '#818384'
}

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
    // Optimistic
    setPosts(prev => prev.filter(p => p.redditId !== redditId))
    await fetch(`/api/saved/${redditId}`, { method: 'DELETE' })
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-[36px] text-white leading-tight mb-2">Favoris</h1>
        <p className="text-zinc-500 text-[13px] leading-relaxed max-w-lg">
          Retrouve tous les posts que tu as sauvegardés.<br />
          Ils persistent entre tes sessions.
        </p>
      </div>

      {/* Count */}
      {!loading && (
        <div className="flex items-center gap-2 mb-6">
          <Bookmark size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-[13px] text-zinc-400">
            {posts.length} post{posts.length !== 1 ? 's' : ''} sauvegardé{posts.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white border border-[#e5e5e5] rounded-xl h-28 animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-20">
          <Bookmark size={32} className="text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-500 text-[14px] mb-2">Aucun post sauvegardé pour l&apos;instant.</p>
          <Link
            href="/dashboard/explore"
            className="text-[#FF4500] text-[13px] hover:underline"
          >
            Explorer le feed →
          </Link>
        </div>
      )}

      {/* Posts */}
      {!loading && posts.length > 0 && (
        <div className="flex flex-col gap-3">
          {posts.map(post => (
            <article
              key={post.id}
              className="flex bg-white border border-[#e5e5e5] rounded-xl hover:border-[#d4d4d4] transition-all overflow-hidden group"
            >
              {/* Vote col */}
              <div className="flex flex-col items-center gap-1 px-2.5 py-3 w-10 flex-shrink-0 bg-[#f6f7f8]">
                <ArrowUp size={16} className="text-[#878a8c]" />
                <span className="text-[11px] font-bold text-[#1c1c1c]">
                  {post.score >= 1000 ? `${(post.score / 1000).toFixed(1)}k` : post.score}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 py-3 pr-4">

                {/* Meta */}
                <div className="flex items-center gap-1.5 text-[11px] text-[#878a8c] mb-2">
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: subColor(post.subreddit) }} />
                  <span className="font-semibold text-[#1c1c1c]">r/{post.subreddit}</span>
                  <span>·</span>
                  <span>Sauvegardé {timeAgo(post.createdAt)}</span>
                  <span className="ml-auto text-[10px]">💬 {post.numComments.toLocaleString()}</span>
                </div>

                {/* Title */}
                <h3 className="text-[16px] font-medium text-[#1c1c1c] leading-snug mb-3">
                  {post.title}
                </h3>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded text-[12px] font-medium text-[#878a8c] hover:bg-[#f6f7f8] hover:text-[#1c1c1c] transition-colors"
                  >
                    <ExternalLink size={12} /> Voir sur Reddit
                  </a>

                  <Link
                    href={`/dashboard/post/${post.redditId}`}
                    className="flex items-center gap-1 px-3 py-1 rounded text-[12px] font-semibold text-[#FF4500] hover:bg-[#FF4500]/10 transition-colors"
                  >
                    Inspecter →
                  </Link>

                  <button
                    onClick={() => handleRemove(post.redditId)}
                    className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded text-[12px] font-medium text-[#878a8c] hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={12} /> Retirer
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
