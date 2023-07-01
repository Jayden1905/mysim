import Link from 'next/link'
import { SignInButton } from '../Buttons/buttons'
import { ReactNode } from 'react'

const menuLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Events', href: '/events' },
]

export async function Nav() {
  return (
    <nav className="flex items-center justify-between px-12 py-6">
      <h1>Logo</h1>
      <ul className="grid grid-flow-col items-center gap-8">
        {menuLinks.map((link, index) => (
          <li key={index} className="opacity-60 hover:opacity-100">
            <LinkItem href={link.href}>{link.name}</LinkItem>
          </li>
        ))}
        <li>
          <SignInButton />
        </li>
      </ul>
    </nav>
  )
}

function LinkItem({ children, href }: { children: ReactNode; href: string }) {
  return (
    <>
      <Link
        href={href}
        className="group tracking-wider transition duration-300"
      >
        {children}
        <span className="block h-0.5 w-0 bg-white transition-all duration-500 group-hover:w-1/2"></span>
      </Link>
    </>
  )
}
