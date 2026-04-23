// test-auth.js - Script de test rapide
import 'dotenv/config'
import prisma from './lib/prisma.js'
import bcrypt from 'bcryptjs'

async function testAuth() {
  console.log('🔍 Vérification des admins en base...\n')

  // Lister tous les admins
  const admins = await prisma.admin.findMany()
  console.log(`Nombre d'admins trouvés: ${admins.length}`)
  
  if (admins.length === 0) {
    console.log('❌ AUCUN admin en base! Relance le seed.')
    process.exit(1)
  }

  // Détails
  admins.forEach((admin) => {
    console.log(`\n📧 Email: ${admin.email}`)
    console.log(`   ID: ${admin.id}`)
    console.log(`   Rôle: ${admin.role}`)
    console.log(`   Actif: ${admin.isActive}`)
    console.log(`   Hash: ${admin.password.substring(0, 20)}...`)
  })

  // Test de vérification de mot de passe
  console.log('\n🔐 Test de vérification de mot de passe...')
  const adminTest = admins[0]
  const passwordToTest = 'Admin@BrewBox2024'
  
  const isValid = await bcrypt.compare(passwordToTest, adminTest.password)
  console.log(`\nMot de passe "${passwordToTest}" valide? ${isValid ? '✅ OUI' : '❌ NON'}`)

  await prisma.$disconnect()
}

testAuth().catch(console.error)
