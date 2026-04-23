// app/api/orders/route.js
import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function POST(request) {
  try {
    const body = await request.json()
    const { customer, items, subtotal, shipping, total } = body

    // Validation basique
    if (!customer || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Générer un numéro de commande unique
    const orderNumber = `BB-${Date.now().toString().slice(-6)}`

    // Vérifier que tous les produits existent encore en base
    const productIds = items.map((item) => item.id)
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    if (dbProducts.length !== productIds.length) {
      return NextResponse.json(
        { success: false, error: 'Un ou plusieurs produits sont introuvables' },
        { status: 400 }
      )
    }

    // Créer la commande avec ses articles en une seule transaction
    const order = await prisma.order.create({
      data: {
        orderNumber,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        country: customer.country,
        notes: customer.notes || null,
        paymentMethod: customer.paymentMethod,
        subtotal,
        shipping,
        total,
        items: {
          create: items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            options: item.options || null,
            productId: item.id,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(
      { success: true, data: order },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/orders error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: {
              select: { name: true, image: true, slug: true },
            },
          },
        },
      },
    })
    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    console.error('GET /api/orders error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}