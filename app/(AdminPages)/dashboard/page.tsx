import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import DashbaordHome from '@/components/Pages/dashboard'
import { isAdmin, teamRoles } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Dashboard page',
  keywords: 'dashboard',
}

export default async function DashbaordPage() {
  const session = await getServerSession(authOptions)

  if (!isAdmin(session)) {
    redirect('/')
  }

  const userCount = await prisma.user.count()

  const team = await prisma.user.findMany({
    where: {
      role: {
        in: teamRoles,
      },
    },
  })

  return (
    <div>
      <DashbaordHome team={team} userCount={userCount} />
    </div>
  )
}
