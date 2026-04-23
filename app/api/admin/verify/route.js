// app/api/admin/verify/route.js
import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma.js'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ admin: null }, { status: 400 })
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    })

    if (!admin || !admin.isActive) {
      return NextResponse.json({ admin: null }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, admin.password)
    if (!isValid) {
      return NextResponse.json({ admin: null }, { status: 401 })
    }

    return NextResponse.json({
      admin: {
        id: String(admin.id),
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('Admin verify error:', error)
    return NextResponse.json({ admin: null }, { status: 500 })
  }
}