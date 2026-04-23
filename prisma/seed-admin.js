// prisma/seed-admin.js
import 'dotenv/config'
import prisma from '../lib/prisma.js'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Création des comptes admin...')

  // Vider la table admins
  await prisma.admin.deleteMany()

  // Admin principal
  const adminPassword = await bcrypt.hash('Admin@BrewBox2024', 10)
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@brewbox.com',
      password: adminPassword,
      name: 'Admin Principal',
      role: 'ADMIN',
    },
  })
  console.log(`✓ Admin créé : ${admin.email}`)

  // Modérateur
  const modPassword = await bcrypt.hash('Modo@BrewBox2024', 10)
  const moderator = await prisma.admin.create({
    data: {
      email: 'moderateur@brewbox.com',
      password: modPassword,
      name: 'Modérateur',
      role: 'MODERATOR',
    },
  })
  console.log(`✓ Modérateur créé : ${moderator.email}`)

  console.log('\n✅ Comptes admin créés avec succès !')
  console.log('\nIdentifiants :')
  console.log('  Admin     → admin@brewbox.com / Admin@BrewBox2024')
  console.log('  Modérateur → moderateur@brewbox.com / Modo@BrewBox2024')
}

main()
  .catch((e) => {
    console.error('Erreur seed-admin:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
