import { notFound } from 'next/navigation'
import { fetchRedditPosts } from '@/lib/fetch-reddit'
import type { RedditPost } from '@/scraper/types'
import { PostInspectClient } from './client'

async function fetchPostById(id: string): Promise<RedditPost | null> {
  // 1. Try the cached daily feed first (fast, no extra request)
  const data = await fetchRedditPosts()
  const found = data.posts.find(p => p.id === id)
  if (found) return found

  // 2. Fallback: fetch directly from Reddit by post ID
  try {
    const res = await fetch(
      `https://www.reddit.com/by_id/t3_${id}.json?raw_json=1`,
      {
        headers: { 'User-Agent': 'Reddhunter/2.0', Accept: 'application/json' },
        next: { revalidate: 3600 },
      },
    )
    if (!res.ok) return null
    const json = await res.json() as { data: { children: { data: Record<string, unknown> }[] } }
    const p = json?.data?.children?.[0]?.data
    if (!p) return null
    return {
      id:               p.id as string,
      title:            p.title as string,
      score:            p.score as number,
      upvote_ratio:     p.upvote_ratio as number,
      num_comments:     p.num_comments as number,
      author:           p.author as string,
      created_utc:      p.created_utc as number,
      created_at:       new Date((p.created_utc as number) * 1000).toISOString(),
      url:              p.url as string,
      permalink:        `https://reddit.com${p.permalink as string}`,
      selftext:         ((p.selftext as string) ?? '').slice(0, 1000),
      subreddit:        p.subreddit as string,
      is_self:          p.is_self as boolean,
      flair:            (p.link_flair_text as string) ?? null,
      thumbnail:        null,
      engagement_score: (p.score as number) + (p.num_comments as number) * 3,
    }
  } catch {
    return null
  }
}

export default async function PostInspectPage({ params }: { params: { id: string } }) {
  const post = await fetchPostById(params.id)
  if (!post) notFound()
  return <PostInspectClient post={post} />
}
