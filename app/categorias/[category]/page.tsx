'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { products, getProductsByCategory, type Product } from '@/lib/products'

const categoryNames: Record<string, string> = {
  adulto: 'Moda Adulta',
  'plus-size': 'Plus Size',
  infantil: 'Infantil',
  calcados: 'Calçados',
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryProducts = getProductsByCategory(params.category)

  const handleWhatsAppClick = (product: Product) => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no produto: ${product.name} - R$ ${product.price.toFixed(2)}`
    )
    window.open(`https://wa.me/5544984147413?text=${message}`, '_blank')
  }

  if (!categoryProducts.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-poppins font-bold mb-4 text-foreground">Categoria não encontrada</h1>
          <Link href="/" className="text-primary hover:underline">
            Voltar para home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-4">
            <ArrowLeft size={20} />
            Voltar
          </Link>
          <h1 className="text-4xl font-poppins font-bold text-foreground">
            {categoryNames[params.category] || 'Produtos'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {categoryProducts.length} produto{categoryProducts.length !== 1 ? 's' : ''} disponível{categoryProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-lg font-poppins font-bold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">{product.description}</p>

                {/* Sizes */}
                {product.sizes && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-foreground mb-1">Tamanhos:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-2 py-1 bg-secondary text-foreground text-xs rounded border border-border"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {product.colors && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-foreground mb-1">Cores:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="px-2 py-1 bg-secondary text-foreground text-xs rounded border border-border"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-poppins font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleWhatsAppClick(product)}
                    className="bg-primary text-primary-foreground p-3 rounded-lg hover:bg-accent transition-colors"
                    aria-label="Comprar via WhatsApp"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
