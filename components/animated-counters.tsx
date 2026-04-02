'use client'

import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration: number, triggered: boolean): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!triggered) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [triggered, target, duration])

  return count
}

export function AnimatedCounters() {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true) },
      { threshold: 0.3 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const count135 = useCountUp(135, 1500, triggered)
  const count6 = useCountUp(6, 1200, triggered)

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#111113] border border-[#27272a] rounded-xl p-8 text-center">
        <div className="font-serif text-5xl text-[#FF4500] mb-3">
          {triggered ? `${count135}k+` : '0'}
        </div>
        <p className="text-[#52525b] text-sm leading-relaxed">
          utilisateurs laissés orphelins par GummySearch
        </p>
      </div>
      <div className="bg-[#111113] border border-[#27272a] rounded-xl p-8 text-center">
        <div className="font-serif text-5xl text-[#FF4500] mb-3">
          {triggered ? `${count6}h` : '0h'}
        </div>
        <p className="text-[#52525b] text-sm leading-relaxed">
          fréquence de mise à jour des posts
        </p>
      </div>
      <div className="bg-[#111113] border border-[#27272a] rounded-xl p-8 text-center">
        <div
          className="font-serif text-5xl text-[#FF4500] mb-3 transition-opacity duration-700"
          style={{ opacity: triggered ? 1 : 0 }}
        >
          $5/mo
        </div>
        <p className="text-[#52525b] text-sm leading-relaxed">
          pour remplacer des heures de veille manuelle
        </p>
      </div>
    </div>
  )
}
