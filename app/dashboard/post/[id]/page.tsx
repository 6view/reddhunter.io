import Link from 'next/link'
import { ArrowLeft, Zap, MessageSquare, BarChart2 } from 'lucide-react'

export default function PostInspectPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">

      {/* Back */}
      <Link href="/dashboard/explore"
        className="absolute top-6 left-6 flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-[13px] transition-colors">
        <ArrowLeft size={14} /> Retour
      </Link>

      {/* Content */}
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-4 mb-8 opacity-30">
          <Zap size={28} className="text-[#FF4500]" />
          <BarChart2 size={28} className="text-zinc-400" />
          <MessageSquare size={28} className="text-zinc-400" />
        </div>

        <h1 className="font-serif text-[42px] text-white leading-tight mb-4">
          Bientôt disponible.
        </h1>
        <p className="text-zinc-500 text-[14px] leading-relaxed mb-8">
          La page d&apos;inspection affichera le Viral Score détaillé,
          l&apos;analyse IA du post, et le Comment Starter généré par Claude Haiku.
        </p>

        <div className="flex flex-col gap-2 text-left bg-[#111113] border border-[#1c1c1e] rounded-xl p-5 mb-8">
          {[
            { icon: Zap,          label: 'Viral Score',      desc: 'Score 0-100 + explication IA' },
            { icon: BarChart2,    label: 'Analyse du post',  desc: 'Pourquoi ce post performe' },
            { icon: MessageSquare,label: 'Comment Starter',  desc: 'Draft de commentaire GEO-optimisé' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-start gap-3 py-2">
              <Icon size={15} className="text-[#FF4500] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[13px] font-medium text-zinc-300">{label}</p>
                <p className="text-[11px] text-zinc-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link href="/dashboard/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF4500] hover:bg-[#CC3700] text-white text-[13px] font-semibold transition-colors">
          <ArrowLeft size={13} /> Retour à Explore
        </Link>
      </div>
    </div>
  )
}
