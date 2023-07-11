'use client'
import useClientMutation from '@/hooks/useClientMutation'
import useFetchQuery from '@/hooks/useFetchQuery'
import { type User } from '@prisma/client'
import { Button } from '../ui/button'

export function AboutPage() {
  const usersFetchQueries = {
    queryKey: ['users'],
    fetchUrl: `/api/users`,
    method: 'GET',
  }

  const {
    data: users,
    status: usersFetchStatus,
    refetch: refetchUsers,
  } = useFetchQuery(usersFetchQueries)

  const usersMutateQueries = {
    endPoint: `/api/users/role`,
    method: 'PUT',
    body: {
      email: 'kyawzayannaing@gmail.com',
      role: 'admin',
    },
    refetch: refetchUsers,
  }

  const updateRole = useClientMutation(usersMutateQueries)

  return (
    <div>
      {usersFetchStatus === 'loading' && <div>Loading...</div>}
      {usersFetchStatus === 'success' &&
        users?.map((user: User) => (
          <div key={user.id}>
            {user.name} is a {user.role}
          </div>
        ))}
      <br />

      {usersFetchStatus === 'error' && <div>Error fetching users</div>}

      <Button onClick={() => void updateRole.mutate()}>update role</Button>
    </div>
  )
}
