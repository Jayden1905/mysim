'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function SignInButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <>...</>
  }

  if (status === 'authenticated') {
    return (
      <Avatar>
        <AvatarImage src={session.user?.image!} />
        <AvatarFallback>
          {session.user?.name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    )
  }

  return <button onClick={() => signIn()}>Sign in</button>
}

export function SignOutButton() {
  const { status } = useSession()
  if (status === 'authenticated') {
    return <button onClick={() => signOut()}>Sign out</button>
  }

  return null
}
