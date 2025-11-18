'use client'

import { ExternalLink, Heart, MessageCircle, Share2 } from 'lucide-react'

export interface InstagramPost {
  id: string
  caption: string
  image: string
  likes: number
  comments: number
  url: string
  productId?: string
}

interface InstagramFeedProps {
  posts?: InstagramPost[]
}

const defaultPosts: InstagramPost[] = [
  {
    id: '1',
    caption: 'Vestido floral perfeito para o verão! Chegou a nova coleção',
    image: '/elegant-floral-dress-women.jpg',
    likes: 234,
    comments: 18,
    url: 'https://instagram.com/saroma_saroma',
    productId: 'vestido-floral-01',
  },
  {
    id: '2',
    caption: 'Plus size com estilo! Porque moda é para todos os corpos',
    image: '/plus-size-dress-women-comfortable.jpg',
    likes: 567,
    comments: 42,
    url: 'https://instagram.com/saroma_saroma',
    productId: 'vestido-plus-01',
  },
  {
    id: '3',
    caption: 'Sapato social em couro, perfeito para eventos',
    image: '/black-formal-women-shoes.jpg',
    likes: 189,
    comments: 15,
    url: 'https://instagram.com/saroma_saroma',
    productId: 'sapato-feminino-01',
  },
  {
    id: '4',
    caption: 'Moda infantil com cores vibrantes e estampas divertidas',
    image: '/kids-casual-outfit-children-clothes.jpg',
    likes: 312,
    comments: 28,
    url: 'https://instagram.com/saroma_saroma',
    productId: 'conjunto-infantil-01',
  },
  {
    id: '5',
    caption: 'Blusa em linho 100% natural, confortável para o dia a dia',
    image: '/linen-blouse-women-premium.jpg',
    likes: 445,
    comments: 35,
    url: 'https://instagram.com/saroma_saroma',
    productId: 'blusa-linho-01',
  },
  {
    id: '6',
    caption: 'Novidade: Coleção de calçados que chegou hoje na loja!',
    image: '/women-shoes-collection-fashion.jpg',
    likes: 298,
    comments: 22,
    url: 'https://instagram.com/saroma_saroma',
    productId: 'tenis-feminino-01',
  },
]

export default function InstagramFeed({ posts = defaultPosts }: InstagramFeedProps) {
  return (
    <section id="instagram" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm md:text-base tracking-widest uppercase mb-2">
            Siga-nos
          </p>
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
            @saroma_saroma
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Acompanhe as últimas novidades, looks inspiradores e promoções exclusivas
          </p>
          <a
            href="https://instagram.com/saroma_saroma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-accent transition-colors font-medium"
          >
            <ExternalLink size={18} />
            Seguir no Instagram
          </a>
        </div>

        {/* Instagram Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative overflow-hidden rounded-lg bg-card border border-border hover:shadow-lg transition-shadow"
            >
              {/* Post Image */}
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100">
                  <div className="flex flex-col items-center gap-2 text-white">
                    <Heart size={24} />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-white">
                    <MessageCircle size={24} />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Post Info */}
              <div className="p-4">
                <p className="text-foreground text-sm line-clamp-2 mb-3">{post.caption}</p>
                <div className="flex items-center gap-2">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:bg-accent transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    Ver no Instagram
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
