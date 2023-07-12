import ServerAvatar from '@/components/Server/Avatar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { isAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashbaordPage() {
  const session = await getServerSession(authOptions)

  if (!isAdmin(session)) {
    redirect('/')
  }

  return (
    <div>
      <p>Dashbaord page</p>
      <ServerAvatar />
    </div>
  )
}
