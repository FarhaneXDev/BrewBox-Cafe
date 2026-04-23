// prisma/seed-admin.js
import 'dotenv/config'
import prisma from '../lib/prisma.js'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Création des comptes admin...')

  // Récupérer les passwords depuis les variables d'environnement
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@BrewBox2024'
  const moderatorPassword = process.env.MODERATOR_PASSWORD || 'Modo@BrewBox2024'

  // Vider la table admins
  await prisma.admin.deleteMany()

  // Admin principal
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10)
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@brewbox.com',
      password: adminPasswordHash,
      name: 'Admin Principal',
      role: 'ADMIN',
    },
  })
  console.log(`✓ Admin créé : ${admin.email}`)

  // Modérateur
  const modPasswordHash = await bcrypt.hash(moderatorPassword, 10)
  const moderator = await prisma.admin.create({
    data: {
      email: 'moderateur@brewbox.com',
      password: modPasswordHash,
      name: 'Modérateur',
      role: 'MODERATOR',
    },
  })
  console.log(`✓ Modérateur créé : ${moderator.email}`)

  console.log('\n✅ Comptes admin créés avec succès !')
  console.log('\n⚠️  Les mots de passe utilisés sont stockés de manière sécurisée (hachés)')
  console.log('📝 Assurez-vous de mémoriser ou sauvegarder les identifiants dans un endroit sûr!')
}
}

main()
  .catch((e) => {
    console.error('Erreur seed-admin:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
