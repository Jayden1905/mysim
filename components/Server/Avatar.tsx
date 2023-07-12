import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default async function ServerAvatar() {
  const session = await getServerSession(authOptions)
  return (
    <Avatar className="select-none rounded-sm">
      <AvatarImage
        className="rounded-sm"
        src={session?.user?.image!}
        alt="avatar"
      />
      <AvatarFallback className="rounded-sm">
        {session?.user?.name?.charAt(0).toUpperCase() || '?'}
      </AvatarFallback>
    </Avatar>
  )
}
