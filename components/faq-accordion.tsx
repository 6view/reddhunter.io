'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQ_ITEMS = [
  {
    q: "Qu'est-ce que le GEO et pourquoi Reddit ?",
    a: "Le GEO (Generative Engine Optimization) consiste à apparaître dans les réponses des LLMs comme ChatGPT et Perplexity. Reddit est sur-indexé dans leurs sources de données — un commentaire bien placé sur un subreddit actif peut apparaître dans des milliers de réponses IA.",
  },
  {
    q: "En quoi Reddhunter est différent de GummySearch ?",
    a: "GummySearch a fermé en novembre 2025, laissant 135 000 utilisateurs sans outil. Reddhunter combine Explore (feed automatique), Hunt (recherche temps réel), et un moteur IA pour le Viral Score et les Comment Starters — le tout à $5/mois.",
  },
  {
    q: "Comment fonctionne le Viral Score IA ?",
    a: "Claude Haiku analyse chaque post : engagement ratio, format du titre, heure de publication, type de contenu. Il génère un score 0-100 avec une explication des patterns qui ont contribué à la performance.",
  },
  {
    q: "Est-ce que ça viole les CGU de Reddit ?",
    a: "Non. Reddhunter utilise l'API officielle Reddit (OAuth 2.0) pour récupérer les posts publics, dans les limites de taux autorisées. Aucun scraping raw, aucune automatisation de publication.",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui. L'abonnement Pro est mensuel, sans engagement. Un clic depuis le dashboard suffit pour annuler — aucun email requis.",
  },
  {
    q: "Quels subreddits sont couverts ?",
    a: "12 subreddits pré-configurés inclus dès le plan Free : r/indiehackers, r/SaaS, r/startups, r/entrepreneur, r/buildinpublic, r/growthhacking, r/sidehustle, r/smallbusiness, r/digitalnomad, r/Entrepreneur, r/marketing, r/growmybusiness. Le plan Pro permet d'en ajouter autant que vous voulez.",
  },
  {
    q: "Le Comment Starter publie-t-il pour moi ?",
    a: "Non. L'IA génère un draft de commentaire contextualisé que vous copiez-collez vous-même sur Reddit. C'est intentionnel : ça garantit un ton authentique et évite tout risque de spam automatisé.",
  },
  {
    q: "Quand sortent les nouvelles features ?",
    a: "Reddhunter est construit en public. La roadmap est publique et mise à jour chaque semaine. Les updates sont annoncées sur X (Twitter) @reddhunter_io.",
  },
] as const

export function FaqAccordion() {
  return (
    <Accordion type="multiple" className="w-full space-y-2">
      {FAQ_ITEMS.map((item, i) => (
        <AccordionItem
          key={item.q}
          value={`item-${i}`}
          className="bg-[#111113] border border-[#27272a] rounded-xl px-6 data-[state=open]:border-[#FF4500]/30"
        >
          <AccordionTrigger className="text-white text-sm font-medium text-left hover:no-underline py-5">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="text-[#71717a] text-sm leading-relaxed pb-5">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
