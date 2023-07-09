'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { SignInButton } from '../Buttons/buttons'

const menuLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Events', href: '/events' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between px-12 py-6">
      <h1>Logo</h1>
      <ul className="grid grid-flow-col items-center gap-8">
        {menuLinks.map((link, index) => (
          <li key={index}>
            <LinkItem href={link.href} active={pathname === link.href}>
              {link.name}
            </LinkItem>
          </li>
        ))}
        <li>
          <SignInButton />
        </li>
      </ul>
    </nav>
  )
}

function LinkItem({
  children,
  href,
  active,
}: {
  children: ReactNode
  href: string
  active: boolean
}) {
  return (
    <>
      <Link
        href={href}
        className={`group tracking-wider transition duration-300 hover:opacity-100 ${
          active ? 'opacity-100' : 'opacity-60'
        }`}
      >
        {children}
        <span className="block h-0.5 w-0 bg-white transition-all duration-700 group-hover:w-full"></span>
      </Link>
    </>
  )
}
