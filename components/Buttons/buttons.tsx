'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { LuLayoutDashboard } from 'react-icons/lu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { BiLogIn } from 'react-icons/bi'
import Spinner from '../Loaders/spinner'
import { useRouter } from 'next/navigation'

export function SignInButton() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <Avatar className="gird select-none place-items-center rounded-sm">
        <Spinner width="5" height="5" />
      </Avatar>
    )
  }

  if (status === 'authenticated') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inset-0 m-0 cursor-pointer p-0 outline-none"
          aria-label="Avatar dropdown"
        >
          <Avatar className="select-none rounded-sm">
            <AvatarImage
              className="rounded-sm"
              src={session.user?.image!}
              alt="avatar"
            />
            <AvatarFallback className="rounded-sm">
              {session.user?.name?.charAt(0).toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => router.push('/dashboard')}>
            <LuLayoutDashboard className="mr-4 h-5 w-5" />
            <p>Dashboard</p>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => void signOut()}>
            <BiLogIn className="mr-4 h-5 w-5" />
            <p>Sign out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button aria-label="signin button" onClick={() => signIn()}>
      Sign In
    </Button>
  )
}

export function SignOutButton() {
  const { status } = useSession()
  if (status === 'authenticated') {
    return (
      <Button aria-label="signout button" onClick={() => signOut()}>
        Sign out
      </Button>
    )
  }

  return null
}
