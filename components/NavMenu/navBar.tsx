import { menuLinks } from '@/lib/links'
import { Session } from 'next-auth'
import {
  AvatarDropDown,
  HamburgerMenu,
  LinkButton,
  SignInButton,
} from '../Buttons/buttons'
import Logo from '../Logo/Logo'
import ThemeSwitch from '../Theme/themeSwitch'

type HomePageProps = {
  session: Session | null
}

export function Nav(props: HomePageProps) {
  return (
    <nav className="fixed z-50 flex w-full items-center justify-between shadow-xl bg-primary dark:bg-secondary px-2 py-4 sm:px-12">
      <Logo />
      <ul className="grid grid-flow-col items-center gap-8">
        {menuLinks.map((link, index) => (
          <li key={index} className="hidden sm:block">
            <LinkButton href={link.href}>{link.name}</LinkButton>
          </li>
        ))}
        <li>
          {props.session?.user ? (
            <AvatarDropDown session={props.session} />
          ) : (
            <div className="flex">
              <HamburgerMenu />
              <ThemeSwitch />
              <SignInButton />
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}
