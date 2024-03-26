import UserPage from '@/components/Pages/users'
import { prisma } from '@/lib/prisma'

export default async function UsersPage() {
  const users = await prisma.user.findMany()
  const userCount = users.length

  const userPageProps = {
    users,
    userCount,
  }

  return (
    <div>
      <UserPage {...userPageProps} />
    </div>
  )
}
