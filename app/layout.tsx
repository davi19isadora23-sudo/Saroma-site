import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Saroma - Moda Feminina em Maringá',
  description: 'Confira nossas coleções exclusivas de roupas femininas, plus size, infantil e calçados em Maringá. Acompanhe nossas novidades no Instagram e compre pelo WhatsApp.',
  keywords: 'moda Maringá, loja de roupas, roupas femininas, plus size, infantil, calçados, Saroma',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/saroma.png',
        sizes: 'any',
      },
    ],
    apple: '/saroma.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        {children}

      </body>
    </html>
  )
}
