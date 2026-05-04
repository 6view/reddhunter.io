'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { CTALink, SignInLink } from '@/components/cta-link'

const NAV_LINKS = [
  { href: '#features',     label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing',      label: 'Pricing' },
  { href: '#faq',          label: 'FAQ' },
]

export function NavbarMobile() {
  const [open, setOpen] = useState(false)
  const { isSignedIn } = useUser()

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
        <SheetHeader>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
        </SheetHeader>
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
            {isSignedIn ? (
              <Button className="bg-[#FF4500] hover:bg-[#CC3700] text-white" asChild>
                <a href="/dashboard/explore" onClick={() => setOpen(false)}>Dashboard →</a>
              </Button>
            ) : (
              <>
                <Button variant="outline" className="border-[#3f3f46] text-zinc-300 bg-transparent hover:bg-[#1c1c1e] hover:text-white" asChild>
                  <SignInLink>Sign in</SignInLink>
                </Button>
                <Button className="bg-[#FF4500] hover:bg-[#CC3700] text-white" asChild>
                  <CTALink>Get Started — $5/mo</CTALink>
                </Button>
              </>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
