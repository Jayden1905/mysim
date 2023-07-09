'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { type User } from '@prisma/client'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'

export function AboutPage() {
  const { data: sessionData } = useSession()

  const {
    data: users,
    status,
    refetch: refetchUsers,
    error: usersError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const users = await fetch(`/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
      return users
    },
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    onError: (error) => console.log(error),
  })

  const updateRole = useMutation({
    mutationFn: async () => {
      const body = {
        email: 'kyawzayannaing@gmail.com',
        role: 'developer',
      }

      return await fetch(`/api/users/role`, {
        method: 'PUT',
        body: JSON.stringify({ email: body.email, role: body.role }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(() => void refetchUsers())
    },
  })

  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'success' &&
        users?.map((user: User) => (
          <div key={user.id}>
            {user.name} is a {user.role}
          </div>
        ))}
      <br />

      {status === 'error' && <div>Error fetching users</div>}

      <Button onClick={() => void updateRole.mutate()}>update role</Button>
    </div>
  )
}
