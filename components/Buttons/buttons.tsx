'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { DashboardIcon, DropdownMenuIcon } from '@radix-ui/react-icons'
import { LuLayoutDashboard } from 'react-icons/lu'

export function SignInButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <>...</>
  }

  if (status === 'authenticated') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className="cursor-pointer"
          aria-label="Avatar dropdown"
        >
          <Avatar className="select-none rounded-sm">
            <AvatarImage src={session.user?.image!} alt="avatar" />
            <AvatarFallback>
              {session.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <LuLayoutDashboard className="mr-4" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return <Button onClick={() => signIn()}>Sign In</Button>
}

export function SignOutButton() {
  const { status } = useSession()
  if (status === 'authenticated') {
    return <button onClick={() => signOut()}>Sign out</button>
  }

  return null
}
