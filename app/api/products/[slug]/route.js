// app/api/products/[slug]/route.js
import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

// GET par slug ou id
export async function GET(request, { params }) {
  try {
    const { slug } = await params
    // Chercher par slug d'abord, puis par id si c'est un nombre
    const isId = !isNaN(Number(slug))
    const product = isId
      ? await prisma.product.findUnique({ where: { id: Number(slug) } })
      : await prisma.product.findUnique({ where: { slug } })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Produit introuvable' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT — modifier un produit
export async function PUT(request, { params }) {
  try {
    const { slug } = await params
    const body = await request.json()
    
    // Si on ajoute/change l'image, l'ajouter aussi au tableau images
    const images = body.image 
      ? [body.image, ...(body.images?.filter(img => img !== body.image) || [])]
      : body.images || []
    
    const product = await prisma.product.update({
      where: { id: Number(slug) },
      data: {
        name: body.name,
        slug: body.slug,
        shortDescription: body.shortDescription,
        description: body.description,
        price: Number(body.price),
        stock: Number(body.stock),
        category: body.category,
        image: body.image || null,
        images: images,
      },
    })
    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE — supprimer un produit
export async function DELETE(request, { params }) {
  try {
    const { slug } = await params
    await prisma.product.delete({
      where: { id: Number(slug) },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 })
  }
}