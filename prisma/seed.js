// prisma/seed.js
import 'dotenv/config'
import { PrismaClient } from '../lib/generated/prisma/index.js'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const products = [
  {
    slug: 'ethiopie-yirgacheffe',
    name: 'Éthiopie Yirgacheffe',
    shortDescription: "Fruité, floral, notes d'agrumes et de jasmin.",
    description: "Originaire de la région de Yirgacheffe en Éthiopie, ce café est considéré comme l'un des meilleurs au monde.",
    price: 14900,
    comparePrice: 17900,
    category: 'cafes',
    subcategory: 'grains',
    origin: 'Éthiopie',
    roast: 'Torréfaction claire',
    process: 'Lavé',
    altitude: '1800 - 2200m',
    tastingNotes: ['Jasmin', 'Agrumes', 'Pêche blanche'],
    grindOptions: ['Grains entiers', 'Mouture fine', 'Mouture moyenne', 'Mouture grossière'],
    weightOptions: [250, 500, 1000],
    stock: 42, rating: 4.9, reviewCount: 128,
    isFeatured: true, isNew: false,
    image: '/images/products/ethiopie-yirgacheffe.jpg',
    images: ['/images/products/ethiopie-yirgacheffe.jpg'],
  },
  {
    slug: 'colombie-huila', name: 'Colombie Huila',
    shortDescription: 'Équilibré, caramel, chocolat au lait, noisette.',
    description: 'Le département de Huila en Colombie produit certains des cafés les plus équilibrés du monde.',
    price: 13500, comparePrice: null,
    category: 'cafes', subcategory: 'grains', origin: 'Colombie',
    roast: 'Torréfaction moyenne', process: 'Lavé', altitude: '1500 - 1800m',
    tastingNotes: ['Caramel', 'Chocolat au lait', 'Noisette'],
    grindOptions: ['Grains entiers', 'Mouture fine', 'Mouture moyenne', 'Mouture grossière'],
    weightOptions: [250, 500, 1000],
    stock: 67, rating: 4.7, reviewCount: 94,
    isFeatured: true, isNew: false,
    image: '/images/products/colombie-huila.jpg', images: ['/images/products/colombie-huila.jpg'],
  },
  {
    slug: 'kenya-aa-nyeri', name: 'Kenya AA Nyeri',
    shortDescription: 'Intense, cassis, tomate mûre, acidité vive.',
    description: "Le Kenya AA de la région de Nyeri est un café d'exception avec une acidité vive.",
    price: 16500, comparePrice: null,
    category: 'cafes', subcategory: 'grains', origin: 'Kenya',
    roast: 'Torréfaction claire', process: 'Lavé', altitude: '1700 - 2100m',
    tastingNotes: ['Cassis', 'Tomate mûre', 'Zeste de citron'],
    grindOptions: ['Grains entiers', 'Mouture fine', 'Mouture moyenne', 'Mouture grossière'],
    weightOptions: [250, 500, 1000],
    stock: 29, rating: 4.8, reviewCount: 61,
    isFeatured: false, isNew: true,
    image: '/images/products/kenya-aa-nyeri.jpg', images: ['/images/products/kenya-aa-nyeri.jpg'],
  },
  {
    slug: 'bresil-cerrado', name: 'Brésil Cerrado',
    shortDescription: 'Doux, rond, chocolat noir, amande grillée.',
    description: "Le Brésil Cerrado est le café idéal pour l'espresso maison.",
    price: 11900, comparePrice: null,
    category: 'cafes', subcategory: 'grains', origin: 'Brésil',
    roast: 'Torréfaction soutenue', process: 'Nature', altitude: '900 - 1200m',
    tastingNotes: ['Chocolat noir', 'Amande grillée', 'Caramel'],
    grindOptions: ['Grains entiers', 'Mouture fine', 'Mouture moyenne', 'Mouture grossière'],
    weightOptions: [250, 500, 1000],
    stock: 88, rating: 4.6, reviewCount: 203,
    isFeatured: true, isNew: false,
    image: '/images/products/bresil-cerrado.jpg', images: ['/images/products/bresil-cerrado.jpg'],
  },
  {
    slug: 'the-vert-sencha-japon', name: 'Thé vert Sencha Japon',
    shortDescription: 'Végétal, umami, douceur iodée du Japon.',
    description: 'Ce Sencha bio provient des jardins de la préfecture de Shizuoka au Japon.',
    price: 9900, comparePrice: 12000,
    category: 'thes', subcategory: 'the-vert', origin: 'Japon',
    roast: null, process: 'Étuvé', altitude: null,
    tastingNotes: ['Végétal', 'Umami', 'Algues'],
    grindOptions: [], weightOptions: [50, 100, 200],
    stock: 54, rating: 4.8, reviewCount: 47,
    isFeatured: true, isNew: false,
    image: '/images/products/sencha-japon.jpg', images: ['/images/products/sencha-japon.jpg'],
  },
  {
    slug: 'rooibos-nature', name: 'Rooibos nature bio',
    shortDescription: 'Doux, vanillé, sans caféine. Pour toute la famille.',
    description: "Ce rooibos bio d'Afrique du Sud est une infusion naturellement sans caféine.",
    price: 7500, comparePrice: null,
    category: 'thes', subcategory: 'infusion', origin: 'Afrique du Sud',
    roast: null, process: 'Fermenté', altitude: null,
    tastingNotes: ['Vanille', 'Miel', 'Bois doux'],
    grindOptions: [], weightOptions: [100, 200],
    stock: 73, rating: 4.5, reviewCount: 38,
    isFeatured: false, isNew: false,
    image: '/images/products/rooibos-nature.jpg', images: ['/images/products/rooibos-nature.jpg'],
  },
  {
    slug: 'chai-epice-inde', name: 'Chai épicé Inde',
    shortDescription: 'Cardamome, cannelle, gingembre — chaleur et réconfort.',
    description: 'Un mélange authentique inspiré du masala chai indien.',
    price: 8900, comparePrice: null,
    category: 'thes', subcategory: 'melange', origin: 'Inde',
    roast: null, process: 'Mélange artisanal', altitude: null,
    tastingNotes: ['Cardamome', 'Cannelle', 'Gingembre'],
    grindOptions: [], weightOptions: [100, 200],
    stock: 61, rating: 4.9, reviewCount: 82,
    isFeatured: true, isNew: false,
    image: '/images/products/chai-epice.jpg', images: ['/images/products/chai-epice.jpg'],
  },
  {
    slug: 'chemex-6-tasses', name: 'Chemex 6 tasses',
    shortDescription: 'Cafetière à filtre iconique, design intemporel.',
    description: 'La Chemex est une cafetière à filtre en verre borosilicaté inventée en 1941.',
    price: 49900, comparePrice: 59900,
    category: 'accessoires', subcategory: 'cafetiere',
    origin: null, roast: null, process: null, altitude: null,
    tastingNotes: [], grindOptions: [], weightOptions: [],
    stock: 15, rating: 4.9, reviewCount: 56,
    isFeatured: true, isNew: false,
    image: '/images/products/chemex-6.jpg', images: ['/images/products/chemex-6.jpg'],
  },
  {
    slug: 'dripper-v60-hario', name: 'Dripper V60 Hario',
    shortDescription: 'Le dripper de référence pour le café filtre.',
    description: "Le V60 de Hario est le dripper filtre préféré des baristas professionnels.",
    price: 24900, comparePrice: null,
    category: 'accessoires', subcategory: 'dripper',
    origin: null, roast: null, process: null, altitude: null,
    tastingNotes: [], grindOptions: [], weightOptions: [],
    stock: 23, rating: 4.8, reviewCount: 91,
    isFeatured: false, isNew: false,
    image: '/images/products/v60-hario.jpg', images: ['/images/products/v60-hario.jpg'],
  },
  {
    slug: 'moulin-manuel-timemore', name: 'Moulin manuel Timemore C3',
    shortDescription: "Mouture précise et régulière, 40 crans d'ajustement.",
    description: "Le Timemore C3 offre une mouture homogène de l'espresso au filtre.",
    price: 59900, comparePrice: 69900,
    category: 'accessoires', subcategory: 'moulin',
    origin: null, roast: null, process: null, altitude: null,
    tastingNotes: [], grindOptions: [], weightOptions: [],
    stock: 11, rating: 4.7, reviewCount: 134,
    isFeatured: true, isNew: false,
    image: '/images/products/timemore-c3.jpg', images: ['/images/products/timemore-c3.jpg'],
  },
  {
    slug: 'coffret-decouverte-cafes', name: 'Coffret découverte cafés',
    shortDescription: '4 origines, 4 expériences — le tour du monde du café.',
    description: 'Ce coffret contient 4 sachets de 125g. Livré dans une boîte cadeau.',
    price: 39900, comparePrice: 47600,
    category: 'coffrets', subcategory: 'decouverte', origin: 'Multi-origines',
    roast: 'Variées', process: null, altitude: null,
    tastingNotes: ['Fruité', 'Chocolaté', 'Équilibré', 'Intense'],
    grindOptions: ['Grains entiers', 'Mouture moyenne'], weightOptions: [],
    stock: 20, rating: 5.0, reviewCount: 43,
    isFeatured: true, isNew: false,
    image: '/images/products/coffret-decouverte.jpg', images: ['/images/products/coffret-decouverte.jpg'],
  },
  {
    slug: 'coffret-starter-kit', name: 'Starter Kit Barista',
    shortDescription: 'V60 + 250g Éthiopie + 40 filtres — tout pour commencer.',
    description: "Le kit parfait pour se lancer dans le café filtre à la maison.",
    price: 44900, comparePrice: 53700,
    category: 'coffrets', subcategory: 'kit',
    origin: null, roast: null, process: null, altitude: null,
    tastingNotes: [], grindOptions: ['Mouture fine', 'Mouture moyenne'], weightOptions: [],
    stock: 17, rating: 4.9, reviewCount: 29,
    isFeatured: false, isNew: true,
    image: '/images/products/starter-kit.jpg', images: ['/images/products/starter-kit.jpg'],
  },
]

async function main() {
  console.log('Démarrage du seed...')
  await prisma.product.deleteMany()
  console.log('Table products vidée.')
  for (const product of products) {
    await prisma.product.create({ data: product })
    console.log(`✓ ${product.name}`)
  }
  console.log(`\n✅ ${products.length} produits insérés avec succès !`)
}

main()
  .catch((e) => {
    console.error('Erreur seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })