'use client'

import { Megaphone } from 'lucide-react'

interface AnnouncementBarProps {
  transparent?: boolean
}

export default function AnnouncementBar({ transparent = false }: AnnouncementBarProps) {
  return (
    <div
      className={`
        w-full py-2 px-4 text-center text-sm sm:text-base
        flex items-center justify-center gap-2 shadow-md
        animate-[fadeIn_0.6s_ease-in-out]
        ${transparent ? 'bg-black/30 text-white' : 'bg-gradient-to-r from-red-600 to-red-700 text-white'}
      `}
    >
      <Megaphone
        className={`w-4 h-4 animate-pulse ${transparent ? 'text-white' : 'text-white'}`}
      />
      <p className="font-semibold tracking-wide drop-shadow-sm">
        Bem-vindo(a) às Lojas Saroma
      </p>
    </div>
  )
}
