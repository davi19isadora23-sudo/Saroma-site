'use client'

import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'

const brands = [
  {
    id: 'beira-rio',
    name: 'Beira Rio',
    description: 'Conforto e elegância',
    image: '/categorias/beira-rio-categoria.png',
  },
  {
    id: 'moleca',
    name: 'Moleca',
    description: 'Estilo contemporâneo',
    image: '/categorias/moleca-categoria.png',
  },
  {
    id: 'modare',
    name: 'Modare',
    description: 'Sofisticação em cada passo',
    image: '/categorias/modare-categoria.png',
  },
]

export default function FeaturedBrands() {
  return (
    <section id="categorias" className="py-24 md:py-40 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-red-600 text-sm font-semibold uppercase tracking-widest mb-4">
            Lojas Saroma
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 text-balance mb-6">
            Marcas em Destaque
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Parceiras reconhecidas pela qualidade excepcional, conforto incomparável e estilo que define tendências. Cada marca traz o melhor da moda feminina.
          </p>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/sandalias/${brand.id}`}
              className="group relative"
            >
              {/* Card Container */}
              <div
                className="
                  bg-white rounded-2xl overflow-hidden shadow-lg
                  transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
                  border border-gray-100 hover:border-red-200
                "
              >
                {/* Image Container */}
                <div className="relative w-full h-96 overflow-hidden bg-gray-100">
                  <img
                    src={brand.image || "/placeholder.svg"}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {brand.name}
                      </h3>
                      <p className="text-red-600 text-sm font-medium">
                        {brand.description}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center gap-2 text-red-600 font-medium group-hover:gap-3 transition-all mt-6">
                    <span>Ver modelos</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* MOBILE STACK */}
        <div className="md:hidden space-y-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/sandalias/${brand.id}`}
              className="group block"
            >
              <div
                className="
                  bg-white rounded-2xl overflow-hidden shadow-lg
                  border border-gray-100 hover:border-red-200
                  transition-all duration-500 hover:shadow-xl hover:-translate-y-1
                "
              >
                <div className="relative w-full h-72 overflow-hidden bg-gray-100">
                  <img
                    src={brand.image || "/placeholder.svg"}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {brand.name}
                  </h3>
                  <p className="text-red-600 text-sm font-medium mb-4">
                    {brand.description}
                  </p>
                  <div className="flex items-center gap-2 text-red-600 font-medium group-hover:gap-3 transition-all">
                    <ShoppingBag size={18} />
                    <span>Ver modelos</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
