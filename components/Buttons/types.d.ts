import { Session } from 'next-auth'
import { ReactNode } from 'react'
import { IconType } from 'react-icons/lib'

type AvatarDropDownProps = {
  session: Session
}

type LinkButtonProps = {
  children: ReactNode
  href: string
}

type IconProps = {
  icon: IconType
  className?: string
}
