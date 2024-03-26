'use client'
import { isAdmin } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { menuLinks } from '@/lib/links'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AiOutlineHome } from 'react-icons/ai'
import { GoSignIn } from 'react-icons/go'
import { LuLayoutDashboard } from 'react-icons/lu'
import { PiSignOut } from 'react-icons/pi'
import { RiMenu2Fill } from 'react-icons/ri'
import { FiSun } from 'react-icons/fi'
import { RiMoonFill } from 'react-icons/ri'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { AvatarDropDownProps, IconProps, LinkButtonProps } from './types'
import { updateUserRole } from '@/lib/actions'
import { Roles } from '@prisma/client'

export function SignInButton() {
  return (
    <Button
      aria-label="signin button"
      className="hidden sm:block ml-6"
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  )
}

export function AvatarDropDown(props: AvatarDropDownProps) {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inset-0 cursor-pointer p-0 outline-none mt-1"
        aria-label="Avatar dropdown"
      >
        <Avatar className="select-none rounded-sm">
          <AvatarImage
            className="rounded-sm"
            src={props.session.user?.image || ''}
            alt="avatar"
          />
          <AvatarFallback className="rounded-sm">
            {props.session.user?.name?.charAt(0).toUpperCase() || '?'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAdmin(props.session) && (
          <>
            <Link scroll={false} href="/dashboard">
              <DropdownMenuItem className="bg-primary dark:bg-secondary">
                <Icon icon={LuLayoutDashboard} />
                <p>Dashboard</p>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </>
        )}
        {menuLinks.map((link, index) => (
          <Link
            scroll={false}
            key={index}
            href={link.href}
            className="block sm:hidden"
          >
            <DropdownMenuItem>
              <Icon icon={link.icon} />
              <p>{link.name}</p>
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator className="block sm:hidden" />

        <DropdownMenuItem onClick={() => void signOut()}>
          <Icon icon={PiSignOut} />
          <p>Sign out</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}
        >
          <Icon icon={theme === 'dark' ? FiSun : RiMoonFill} />
          <p>{theme === 'dark' ? 'Light' : 'Dark'}</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DashboardAvatarDropDown(props: AvatarDropDownProps) {
  const { theme, setTheme } = useTheme()

  const usernameFirstLetter =
    props.session?.user?.name?.charAt(0).toUpperCase() || '?'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inset-0 m-0 cursor-pointer p-0 outline-none"
        aria-label="Avatar dropdown"
      >
        <div>
          <Avatar className="select-none rounded-sm">
            <AvatarImage
              referrerPolicy="no-referrer"
              className="rounded-md"
              src={(props.session.user && props.session.user?.image) || ''}
              alt="avatar"
            />
            <AvatarFallback className="rounded-sm">
              {usernameFirstLetter}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link scroll={false} href={'/'} className="">
          <DropdownMenuItem>
            <Icon icon={AiOutlineHome} />
            <p>Home</p>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void signOut()}>
          <Icon icon={PiSignOut} />
          <p>Sign out</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }}
        >
          <Icon icon={theme === 'dark' ? FiSun : RiMoonFill} />
          <p>{theme === 'dark' ? 'Light' : 'Dark'}</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function LinkButton(props: LinkButtonProps) {
  const pathname = usePathname()
  const active = pathname === props.href

  return (
    <>
      <Link
        href={props.href}
        className={`tracking-wider transition duration-300 relative ${
          active ? 'opacity-100' : 'opacity-60'
        } hover:opacity-100 transition-all duration-75 ease-in-out`}
        scroll={false}
      >
        {props.children}
      </Link>
    </>
  )
}

export function HamburgerMenu() {
  const { data: sessionData } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inset-0 m-0 block cursor-pointer select-none p-0 outline-none sm:hidden"
        aria-label="Hambuger menu"
      >
        <Icon icon={RiMenu2Fill} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAdmin(sessionData) && (
          <Link scroll={false} href="/dashboard">
            <DropdownMenuItem>
              <Icon icon={LuLayoutDashboard} />
              <p>Dashboard</p>
            </DropdownMenuItem>
          </Link>
        )}
        {menuLinks.map((link, index) => (
          <Link
            scroll={false}
            key={index}
            href={link.href}
            className="block sm:hidden"
          >
            <DropdownMenuItem>
              <Icon icon={link.icon} />
              <p>{link.name}</p>
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => void signIn()}>
          <Icon icon={GoSignIn} />
          <p>Sign In</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Icon(props: IconProps) {
  return <props.icon className={cn('mr-4 h-5 w-5', props.className)} />
}

export function UpdateUserButton() {
  const router = useRouter()
  return (
    <div>
      <Button
        onClick={() =>
          updateUserRole({
            email: 'kyawzayannaing@gmail.com',
            role: Roles.developer,
          }).then(() => router.refresh())
        }
      >
        Update Role
      </Button>
    </div>
  )
}
