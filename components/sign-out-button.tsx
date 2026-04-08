'use client'

import { useClerk } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'

export function SignOutButton() {
  const { signOut } = useClerk()

  return (
    <button
      onClick={() => signOut(() => { window.location.href = '/' })}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-zinc-500 hover:text-white hover:bg-[#111113] transition-colors group w-full"
    >
      <LogOut size={16} className="flex-shrink-0 group-hover:text-[#FF4500] transition-colors" />
      Se déconnecter
    </button>
  )
}
