import Link from 'next/link'
import React from 'react'
import ThemeSwitch from '../Theme/themeSwitch'
import { SignInButton, SignOutButton } from '../Buttons/buttons'

export const Nav = () => {
  return (
    <nav className="flex justify-between p-4">
      <h1>Logo</h1>
      <ul className="flex gap-6">
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
          <ThemeSwitch />
        </li>
        <li>
          <SignInButton />
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  )
}
