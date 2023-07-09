'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { type User } from '@prisma/client'

export function AboutPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const users = await fetch(`${baseUrl}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
      return users
    },
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        users?.map((user: User) => (
          <div key={user.id}>
            {user.name} is a {user.role}
          </div>
        ))}
    </div>
  )
}
