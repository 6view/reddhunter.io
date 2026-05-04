import { fetchRedditPosts } from '@/lib/fetch-reddit'
import { ExploreFeed } from '@/components/explore-feed'

export const revalidate = 86400 // page entière revalidée toutes les 24h

export default async function ExplorePage() {
  const data = await fetchRedditPosts()

  if (!data || data.total_posts === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 mb-2">Impossible de charger les posts Reddit.</p>
          <p className="text-zinc-600 text-sm">Réessaie dans quelques secondes.</p>
        </div>
      </div>
    )
  }

  return <ExploreFeed data={data} />
}
