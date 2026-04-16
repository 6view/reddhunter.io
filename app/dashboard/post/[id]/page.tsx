import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import type { ScrapeResult } from '@/scraper/types'
import { PostInspectClient } from './client'

function loadPost(id: string) {
  const outputDir = path.join(process.cwd(), 'scraper', 'output')
  if (!fs.existsSync(outputDir)) return null
  const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.json')).sort().reverse()
  if (files.length === 0) return null
  const data = JSON.parse(fs.readFileSync(path.join(outputDir, files[0]), 'utf-8')) as ScrapeResult
  return data.posts.find(p => p.id === id) ?? null
}

export default function PostInspectPage({ params }: { params: { id: string } }) {
  const post = loadPost(params.id)
  if (!post) notFound()
  return <PostInspectClient post={post} />
}
