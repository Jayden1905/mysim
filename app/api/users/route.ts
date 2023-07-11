import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    throw new Error('Unauthorized')
  }

  const users = await prisma.user.findMany()

  return NextResponse.json(users)
}
