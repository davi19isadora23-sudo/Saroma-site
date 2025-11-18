import AnnouncementBar from '@/components/announcement-bar'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Categories from '@/components/categories'
import Instagram from '@/components/instagram'
import About from '@/components/about'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <Hero />
      <Categories />
      <Instagram />
      <About />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
