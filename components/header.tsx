'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Search, ShoppingBag, User, PhoneCall } from 'lucide-react'

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <header className="w-full shadow-md bg-white border-b border-gray-200 z-50 sticky top-0">

      {/* 🔥 Main Header */}
      <div className="max-w-[1500px] mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/saroma.png"
            width={80}
            height={80}
            alt="Lojas Saroma"
            className="hover:scale-105 transition"
          />
        </Link>

        {/* Search Bar — desktop */}
        <div className="hidden md:flex flex-1 mx-10">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full px-4 py-3 rounded-xl border shadow-sm focus:ring-2 focus:ring-red-500 outline-none"
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-500"
              size={22}
            />
          </div>
        </div>

        {/* Ícones */}
        <div className="flex items-center gap-5">
          <Link href="/login" className="hidden md:flex items-center gap-1 hover:text-red-600">
            <User size={24} />
            <span className="font-medium">Minha Conta</span>
          </Link>

          <Link href="/carrinho" className="relative hover:text-red-600">
            <ShoppingBag size={26} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
              2
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* 🌟 Categories Bar (desktop) */}
      <nav className="hidden md:flex justify-center bg-gray-50 py-3 border-t">
        <ul className="flex gap-10 text-gray-700 font-medium">
          <li><Link href="#novidades" className="hover:text-red-600">Novidades</Link></li>
          <li><Link href="#feminino" className="hover:text-red-600">Beira Rio</Link></li>
          <li><Link href="#masculino" className="hover:text-red-600">Moleca</Link></li>
          <li><Link href="#calcados" className="hover:text-red-600">Modare</Link></li>
        </ul>
      </nav>

      {/* 📱 Mobile Menu Slide Down */}
      <div
        className={`
          md:hidden bg-white border-t shadow-md overflow-hidden transition-all
          ${openMenu ? 'max-h-[400px] py-5' : 'max-h-0'}
        `}
      >
        <div className="px-5 flex flex-col gap-5 text-lg font-medium">

          {/* Search mobile */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full px-4 py-3 rounded-xl border shadow-sm focus:ring-2 focus:ring-red-500 outline-none"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={22} />
          </div>

          <Link href="#novidades" className="hover:text-red-600">Novidades</Link>
          <Link href="#feminino" className="hover:text-red-600">Beira Rio</Link>
          <Link href="#masculino" className="hover:text-red-600">Moleca</Link>
          <Link href="#calcados" className="hover:text-red-600">Modare</Link>
        </div>
      </div>
    </header>
  )
}
