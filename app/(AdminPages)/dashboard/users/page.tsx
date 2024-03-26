import UserPage from '@/components/Pages/users'
import { getUsers } from '@/lib/actions'

export default async function UsersPage() {
  const users = await getUsers()
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
