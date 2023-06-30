import Link from 'next/link'
import React from 'react'
import ThemeSwitch from '../Theme/themeSwitch'
import { SignInButton, SignOutButton } from '../Buttons/buttons'

export const Nav = () => {
  return (
    <nav className="flex items-center justify-between px-12 py-6">
      <h1>Logo</h1>
      <ul className="flex items-center gap-6">
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/about'}>About</Link>
        </li>
        <li>
          <Link href={'/contact'}>Contact</Link>
        </li>
        <li>
          <SignInButton />
        </li>
        <li>
          <ThemeSwitch />
        </li>
      </ul>
    </nav>
  )
}
