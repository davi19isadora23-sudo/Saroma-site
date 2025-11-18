'use client'

import { ExternalLink, Heart, MessageCircle } from 'lucide-react'

const instagramPosts = [
  {
    id: 1,
    caption: 'Sandália Beira Rio, confortável e elegante para o dia a dia',
    image: '/store/beira-rio-sandal-01.jpg',
    likes: 342,
    comments: 28,
    url: 'https://instagram.com/saroma_saroma',
  },
  {
    id: 2,
    caption: 'Sandália Moleca, perfeita para ocasiões casuais',
    image: '/store/moleca-sandal-01.jpg',
    likes: 567,
    comments: 42,
    url: 'https://instagram.com/saroma_saroma',
  },
  {
    id: 3,
    caption: 'Sandália Modare, conforto e estilo em um só modelo',
    image: '/store/modare-sandal-01.jpg',
    likes: 312,
    comments: 18,
    url: 'https://instagram.com/saroma_saroma',
  },
  {
    id: 4,
    caption: 'Sandália Beira Rio com design moderno e elegante',
    image: '/store/beira-rio-sandal-02.jpg',
    likes: 289,
    comments: 15,
    url: 'https://instagram.com/saroma_saroma',
  },
  {
    id: 5,
    caption: 'Sandália Moleca casual, cores vibrantes e detalhes delicados',
    image: '/store/moleca-sandal-02.jpg',
    likes: 445,
    comments: 35,
    url: 'https://instagram.com/saroma_saroma',
  },
  {
    id: 6,
    caption: 'Sandália Modare anatômica, perfeita para longos passeios',
    image: '/store/modare-sandal-02.jpg',
    likes: 298,
    comments: 22,
    url: 'https://instagram.com/saroma_saroma',
  },
]

export default function Instagram() {
  return (
    <section id="instagram" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-12">
          <p className="text-red-600 text-sm md:text-base tracking-widest uppercase mb-2 font-semibold">
            Siga-nos
          </p>
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 mb-4">
            @saroma_saroma
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-6">
            Confira nossas sandálias Beira Rio, Moleca e Modare, looks inspiradores e promoções exclusivas.
          </p>
          <a
            href="https://instagram.com/saroma_saroma"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold shadow-md hover:shadow-lg"
          >
            <ExternalLink size={18} />
            Seguir no Instagram
          </a>
        </div>

        {/* Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-shadow bg-white"
            >
              {/* Imagem */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay métricas */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex flex-col items-center text-white gap-1">
                    <Heart size={24} fill="white" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex flex-col items-center text-white gap-1">
                    <MessageCircle size={24} />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Descrição e link */}
              <div className="p-4">
                <p className="text-gray-900 text-sm line-clamp-2 mb-3">{post.caption}</p>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  <ExternalLink size={16} />
                  Ver no Instagram
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
