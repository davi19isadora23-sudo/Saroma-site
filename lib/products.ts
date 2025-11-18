export interface Product {
  id: string
  name: string
  price: number
  category: 'adulto' | 'plus-size' | 'infantil' | 'calcados'
  image: string
  description: string
  instagramPostId?: string
  instagramUrl?: string
  sizes?: string[]
  colors?: string[]
  inStock: boolean
}

export const products: Product[] = [
  // Moda Adulta
  {
    id: 'vestido-floral-01',
    name: 'Vestido Floral Elegante',
    price: 149.90,
    category: 'adulto',
    image: '/elegant-floral-dress-women.jpg',
    description: 'Vestido floral com corte elegante, perfeito para eventos especiais',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Rosa', 'Azul', 'Branco'],
    inStock: true,
  },
  {
    id: 'blusa-linho-01',
    name: 'Blusa Linho Premium',
    price: 89.90,
    category: 'adulto',
    image: '/linen-blouse-women-premium.jpg',
    description: 'Blusa em linho 100% natural, confortável e elegante',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Bege', 'Branco', 'Marrom'],
    inStock: true,
  },
  {
    id: 'calca-jeans-01',
    name: 'Calça Jeans Skinny',
    price: 129.90,
    category: 'adulto',
    image: '/skinny-jeans-women.jpg',
    description: 'Calça jeans com fit perfeito e acabamento premium',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Azul Escuro', 'Preto', 'Azul Claro'],
    inStock: true,
  },
  {
    id: 'cropped-veludo-01',
    name: 'Cropped Veludo',
    price: 99.90,
    category: 'adulto',
    image: '/velvet-cropped-top-women.jpg',
    description: 'Cropped em veludo macio, toque sofisticado',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Marsala', 'Preto', 'Rosa'],
    inStock: true,
  },

  // Plus Size
  {
    id: 'vestido-plus-01',
    name: 'Vestido Plus Size Confortável',
    price: 179.90,
    category: 'plus-size',
    image: '/plus-size-dress-women-comfortable.jpg',
    description: 'Vestido com tecido confortável e corte lisonjeiro para plus size',
    sizes: ['G', 'GG', 'XG', 'XXG'],
    colors: ['Preto', 'Marinho', 'Vinho'],
    inStock: true,
  },
  {
    id: 'blusa-plus-01',
    name: 'Blusa Plus Size Elegante',
    price: 109.90,
    category: 'plus-size',
    image: '/elegant-plus-size-blouse.jpg',
    description: 'Blusa elegante com drapeado, perfeita para qualquer ocasião',
    sizes: ['G', 'GG', 'XG', 'XXG'],
    colors: ['Preto', 'Branco', 'Bege'],
    inStock: true,
  },
  {
    id: 'calca-plus-01',
    name: 'Calça Plus Size Slim',
    price: 139.90,
    category: 'plus-size',
    image: '/plus-size-slim-pants-women.jpg',
    description: 'Calça slim em tecido resistente, modeladora',
    sizes: ['G', 'GG', 'XG', 'XXG'],
    colors: ['Preto', 'Azul Marinho', 'Cinza'],
    inStock: true,
  },

  // Infantil
  {
    id: 'vestido-infantil-01',
    name: 'Vestido Infantil Princesa',
    price: 79.90,
    category: 'infantil',
    image: '/princess-dress-kids-children.jpg',
    description: 'Vestido infantil com estampa divertida, perfeito para festas',
    sizes: ['2-4', '4-6', '6-8', '8-10'],
    colors: ['Rosa', 'Roxo', 'Azul'],
    inStock: true,
  },
  {
    id: 'conjunto-infantil-01',
    name: 'Conjunto Infantil Casual',
    price: 89.90,
    category: 'infantil',
    image: '/kids-casual-outfit-children-clothes.jpg',
    description: 'Conjunto confortável para uso diário',
    sizes: ['2-4', '4-6', '6-8', '8-10'],
    colors: ['Rosa', 'Azul', 'Verde'],
    inStock: true,
  },
  {
    id: 'jaqueta-infantil-01',
    name: 'Jaqueta Infantil Colorida',
    price: 69.90,
    category: 'infantil',
    image: '/colorful-kids-jacket-children.jpg',
    description: 'Jaqueta leve e divertida para crianças',
    sizes: ['2-4', '4-6', '6-8', '8-10'],
    colors: ['Multicolor', 'Rosa', 'Azul'],
    inStock: true,
  },

  // Calçados
  {
    id: 'sapato-feminino-01',
    name: 'Sapato Social Preto',
    price: 159.90,
    category: 'calcados',
    image: '/black-formal-women-shoes.jpg',
    description: 'Sapato social em couro, elegante e confortável',
    sizes: ['33', '34', '35', '36', '37', '38', '39', '40'],
    colors: ['Preto'],
    inStock: true,
  },
  {
    id: 'sandalia-feminina-01',
    name: 'Sandália Rasteira Dourada',
    price: 79.90,
    category: 'calcados',
    image: '/golden-flat-sandal-women.jpg',
    description: 'Sandália confortável, ideal para o verão',
    sizes: ['33', '34', '35', '36', '37', '38', '39', '40'],
    colors: ['Dourado', 'Prata', 'Rose'],
    inStock: true,
  },
  {
    id: 'tenis-feminino-01',
    name: 'Tênis Esportivo Branco',
    price: 119.90,
    category: 'calcados',
    image: '/white-sporty-sneakers-women.jpg',
    description: 'Tênis confortável para uso diário',
    sizes: ['33', '34', '35', '36', '37', '38', '39', '40'],
    colors: ['Branco', 'Preto', 'Rosa'],
    inStock: true,
  },
  {
    id: 'bota-feminina-01',
    name: 'Bota Couro Marrom',
    price: 199.90,
    category: 'calcados',
    image: '/brown-leather-boots-women.jpg',
    description: 'Bota em couro legítimo, sofisticada',
    sizes: ['33', '34', '35', '36', '37', '38', '39', '40'],
    colors: ['Marrom', 'Preto', 'Vinho'],
    inStock: true,
  },
]

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}
