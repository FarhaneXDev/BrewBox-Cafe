// app/api/upload/route.js
import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })
    }

    // Vérifier le type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Format non supporté. Utilisez JPG, PNG ou WebP.' },
        { status: 400 }
      )
    }

    // Nom de fichier unique
    const ext = file.name.split('.').pop()
    const fileName = `product-${Date.now()}.${ext}`
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'products')

    // Créer le dossier si inexistant
    await mkdir(uploadDir, { recursive: true })

    // Écrire le fichier
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(path.join(uploadDir, fileName), buffer)

    const imageUrl = `/images/products/${fileName}`
    return NextResponse.json({ success: true, url: imageUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Erreur upload' }, { status: 500 })
  }
}