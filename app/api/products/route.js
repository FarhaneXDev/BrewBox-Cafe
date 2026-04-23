// app/api/products/route.js
import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const isNew = searchParams.get('new')

    // Construction du filtre dynamique
    const where = { isActive: true }
    if (category) where.category = category
    if (featured === 'true') where.isFeatured = true
    if (isNew === 'true') where.isNew = true

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    console.error('GET /api/products error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Si on ajoute une image, l'ajouter aussi au tableau images
    const images = body.image ? [body.image] : []
    
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        shortDescription: body.shortDescription,
        description: body.description,
        price: Number(body.price),
        stock: Number(body.stock),
        category: body.category,
        image: body.image || null,
        tastingNotes: [],
        grindOptions: [],
        weightOptions: [],
        images: images,
      },
    })
    return NextResponse.json({ success: true, data: product }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 })
  }
}