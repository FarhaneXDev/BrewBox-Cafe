// app/api/orders/[id]/route.js
import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function GET(request, { params }) {
  try {
    const { id } = await params

    const order = await prisma.order.findUnique({
      where: { orderNumber: id },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                image: true,
                slug: true,
              },
            },
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Commande introuvable' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: order })
  } catch (error) {
    console.error('GET /api/orders/[id] error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// Mettre à jour le statut d'une commande (utile pour le dashboard admin)
export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, paymentStatus } = body

    const updateData = {}
    if (status) updateData.status = status
    if (paymentStatus) updateData.paymentStatus = paymentStatus

    const order = await prisma.order.update({
      where: { orderNumber: id },
      data: updateData,
    })

    return NextResponse.json({ success: true, data: order })
  } catch (error) {
    console.error('PATCH /api/orders/[id] error:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
