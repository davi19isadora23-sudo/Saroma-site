'use client'

import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group">
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
            onClick={() => onAddToCart(product)}
            className="bg-primary text-primary-foreground p-3 rounded-lg hover:bg-accent transition-colors"
            aria-label="Comprar via WhatsApp"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
