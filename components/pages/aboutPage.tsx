'use client'
import useClientMutation from '@/hooks/useClientMutation'
import { type User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Button } from '../ui/button'
import useFetchQuery from '@/hooks/useFetchQuery'

export function AboutPage() {
  const twentyFourHours = 1000 * 60 * 60 * 24

  const {
    data: users,
    status: usersFetchStatus,
    refetch: refetchUsers,
    isError,
    fetchError: fetchUsersError,
  } = useFetchQuery({
    queryKey: ['users'],
    fetchUrl: '/api/users',
    method: 'GET',
  })

  const usersMutateQueries = {
    endPoint: `/api/users/role`,
    method: 'PUT',
    body: {
      email: 'kyawzayannaing@gmail.com',
      role: 'developer',
    },
    refetch: refetchUsers,
  }

  const updateRole = useClientMutation(usersMutateQueries)

  if (usersFetchStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {fetchUsersError?.message}</div>
  }

  return (
    <div>
      {users?.map((user: User) => (
        <div key={user.id}>
          {user.name} is a {user.role}
        </div>
      ))}
      <br />

      <Button onClick={() => void updateRole.mutate()}>update role</Button>
    </div>
  )
}
