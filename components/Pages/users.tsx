'client'

import { User } from '@prisma/client'
import React from 'react'

type Props = {
  users: User[]
  userCount: number
}

export default function UserPage({ users, userCount }: Props) {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
        </div>
      ))}
      <p>{userCount}</p>
    </div>
  )
}
