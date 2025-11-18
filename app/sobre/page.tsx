import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AboutPage() {
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
            Sobre a Saroma
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Nossa História
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A Saroma nasceu da paixão por moda feminina e da vontade de democratizar o estilo para todas as mulheres. 
              Aqui em Maringá, cultivamos a crença de que toda mulher merece se sentir linda e confiante.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Com mais de 5 anos de experiência, consolidamos nossa marca como referência em qualidade, estilo e inclusão.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Nossa Missão
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Oferecer moda acessível, elegante e inclusiva que celebra a diversidade feminina em todas as suas formas.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Nossas Coleções
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <div>
                  <span className="font-medium text-foreground">Moda Adulta:</span> Para as mulheres que sabem o que querem
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <div>
                  <span className="font-medium text-foreground">Plus Size:</span> Estilo e conforto para todos os corpos
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <div>
                  <span className="font-medium text-foreground">Infantil:</span> Looks divertidos para as pequenas fashionistas
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <div>
                  <span className="font-medium text-foreground">Calçados:</span> Para complementar com perfeição
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Nos Encontre
            </h2>
            <p className="text-muted-foreground mb-4">
              Localizada em Maringá, PR, a Saroma está sempre pronta para atender você com atenção e carinho.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><span className="font-medium text-foreground">Endereço:</span> Maringá, Paraná</p>
              <p><span className="font-medium text-foreground">WhatsApp:</span> <a href="https://wa.me/5544984147413" className="text-primary hover:underline">(44) 98414-7413</a></p>
              <p><span className="font-medium text-foreground">Instagram:</span> <a href="https://instagram.com/saroma_saroma" className="text-primary hover:underline">@saroma_saroma</a></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
