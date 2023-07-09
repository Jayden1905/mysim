import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const users = await prisma.user.findMany()

  return NextResponse.json(users)
}

export async function PUT(request: Request) {
  const { id, name } = await request.json()

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
    },
  })

  return
}
