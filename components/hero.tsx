'use client'

import Link from 'next/link'
import { ArrowRight, Heart } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative w-full h-screen md:h-[90vh] lg:h-screen overflow-hidden bg-white">

      {/* Background Image RESPONSIVA */}
      <div className="absolute inset-0 w-full h-full">

        {/* Mobile Image */}
        <img
          src="/models/model1.png"
          alt="Saroma Mobile"
          className="w-full h-full object-cover md:hidden"
        />

        {/* Desktop Image */}
        <img
          src="/models/model1-desktop.png"
          alt="Saroma Desktop"
          className="w-full h-full object-cover hidden md:block"
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl animate-fadeInUp">

          <div className="mb-6 inline-block">
            <span className="text-red-500 text-sm font-semibold tracking-widest uppercase">
              Coleção Exclusiva 2025
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight text-pretty">
            Descubra Sua Elegância
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed text-pretty">
            Moda feminina premium com 35 anos de tradição. Peças exclusivas, qualidade impecável e design sofisticado para quem valoriza o detalhe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="#categorias"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
            >
              Nossas Marcas
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="https://wa.me/5544984147413"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Fale com a Saroma
            </Link>
          </div>

          {/* Indicadores de Confiança */}
          <div className="flex items-center gap-8 text-gray-300 text-sm">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span>35 anos de confiança</span>
            </div>
            <div className="hidden sm:block">•</div>
            <span className="hidden sm:inline">Entrega em Maringá</span>
          </div>
        </div>
      </div>



    </section>
  )
}
