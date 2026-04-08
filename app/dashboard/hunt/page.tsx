import fs from 'fs'
import path from 'path'
import { HuntFeed } from '@/components/hunt-feed'
import type { ScrapeResult } from '@/scraper/types'

function loadLatestScrape(): ScrapeResult | null {
  const outputDir = path.join(process.cwd(), 'scraper', 'output')
  if (!fs.existsSync(outputDir)) return null
  const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.json')).sort().reverse()
  if (files.length === 0) return null
  return JSON.parse(fs.readFileSync(path.join(outputDir, files[0]), 'utf-8')) as ScrapeResult
}

export default function HuntPage() {
  const data = loadLatestScrape()
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 mb-2">Lance le scraper d&apos;abord.</p>
          <code className="text-zinc-600 text-sm">npm run scrape</code>
        </div>
      </div>
    )
  }
  return <HuntFeed data={data} />
}
