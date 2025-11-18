'use client'

import Link from 'next/link'
import { Instagram, MessageCircle, Phone, MapPin, Mail } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()
  const yearsInBusiness = currentYear - 35

  return (
    <footer id="contato" className="bg-white text-black">
      {/* NEWSLETTER SECTION */}
      <div className="bg-gradient-to-r from-red-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-black mb-2">
                Novidades & Ofertas
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Receba em primeira mão nossas coleções exclusivas e descontos especiais.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap text-sm"
              >
                {subscribed ? '✓ Inscrito' : 'Inscrever'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-start">
              <img
                src="/saroma.png"
                alt="Saroma Logo"
                className="h-16 w-auto mb-6 hover:opacity-80 transition-opacity"
              />
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Moda feminina de qualidade em Maringá há {yearsInBusiness} anos.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://instagram.com/saroma_saroma"
                  target="_blank"
                  className="text-gray-600 hover:text-red-600 hover:scale-110 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link
                  href="https://wa.me/5544984147413"
                  target="_blank"
                  className="text-gray-600 hover:text-red-600 hover:scale-110 transition-all duration-200"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>

          {/* SHOPPING */}
          <div>
            <h4 className="text-sm font-semibold text-black uppercase tracking-wide mb-6">
              Compras
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#categorias"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Novidades
                </Link>
              </li>
              <li>
                <Link
                  href="#categorias"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Coleções
                </Link>
              </li>
              <li>
                <Link
                  href="#categorias"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Promoções
                </Link>
              </li>
              <li>
                <Link
                  href="#sobre"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Guia de Tamanhos
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="text-sm font-semibold text-black uppercase tracking-wide mb-6">
              Sobre
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#sobre"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Sobre a Saroma
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Nossa História
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Sustentabilidade
                </Link>
              </li>
              <li>
                <Link
                  href="#instagram"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h4 className="text-sm font-semibold text-black uppercase tracking-wide mb-6">
              Atendimento
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Trocas & Devoluções
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors hover:translate-x-1 inline-block"
                >
                  Rastrear Pedido
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold text-black uppercase tracking-wide mb-6">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <Link
                  href="https://wa.me/5544984147413"
                  target="_blank"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors"
                >
                  (44) 92001-0305
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Maringá, PR</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contato@saroma.com.br"
                  className="text-gray-600 text-sm hover:text-red-600 transition-colors"
                >
                  sabrinamarketing4@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left text-xs text-gray-600 mb-6">
            <Link href="#" className="hover:text-red-600 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="#" className="hover:text-red-600 transition-colors">
              Termos & Condições
            </Link>
            <Link href="#" className="hover:text-red-600 transition-colors">
              Política de Trocas
            </Link>
          </div>
          <p className="text-center text-gray-600 text-sm tracking-wide">
            © {currentYear} Saroma — Todos os direitos reservados. • Desenvolvido com
            <span className="text-red-600"> ❤️ </span>
          </p>
        </div>
      </div>
      </footer>
  );
}

