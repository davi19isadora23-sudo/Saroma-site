import Image from 'next/image'

export default function About() {
  return (
    <section id="sobre" className="py-16 md:py-28 px-4 sm:px-6 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center md:items-start gap-12 md:gap-20">

        {/* Conteúdo textual */}
        <div className="flex-1">
          <p className="text-red-600 text-sm md:text-base tracking-widest uppercase mb-4 font-semibold">
            Conheça a Saroma
          </p>

          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-8 leading-relaxed md:leading-tight">
            Moda com Propósito e Estilo
          </h2>

          <p className="text-gray-700 mb-6 text-lg md:text-xl leading-relaxed">
            Desde 1990, a Saroma é referência em moda feminina em Maringá. Nosso compromisso é oferecer roupas e calçados de qualidade que celebram a beleza e diversidade de cada mulher.  
            Cada peça é pensada para destacar seu estilo e transmitir confiança, elegância e conforto, respeitando todas as formas e personalidades.
          </p>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Acreditamos que a moda deve ser inclusiva, sustentável e acessível. Por isso, nossas coleções contemplam todos os tamanhos, idades e estilos, trazendo sempre inovação, sofisticação e um toque de exclusividade em cada detalhe.
          </p>
        </div>

        {/* Imagem da loja */}
        <div className="flex-1 w-full max-w-lg md:max-w-none">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/about/saroma.png"
              alt="Loja Saroma"
              width={800}
              height={600}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
