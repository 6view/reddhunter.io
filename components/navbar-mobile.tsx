'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  { href: '#features',     label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing',      label: 'Pricing' },
  { href: '#faq',          label: 'FAQ' },
]

export function NavbarMobile() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-[#111113] border-[#27272a] w-72">
        <nav className="flex flex-col gap-6 mt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4 border-t border-[#27272a] pt-6">
            <Button
              variant="outline"
              className="border-[#3f3f46] text-zinc-300 bg-transparent hover:bg-[#1c1c1e] hover:text-white"
              asChild
            >
              <a href="#">Sign in</a>
            </Button>
            <Button className="bg-[#FF4500] hover:bg-[#CC3700] text-white" asChild>
              <a href="#">Get Started — $5/mo</a>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
