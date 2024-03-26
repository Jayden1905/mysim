'use client'

import { dashboardMenu } from '@/lib/store'
import { useAtom } from 'jotai'
import { Session } from 'next-auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiMenu2Fill } from 'react-icons/ri'
import { DashboardAvatarDropDown, Icon } from '../Buttons/buttons'
import React, { Fragment } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { RxSlash } from 'react-icons/rx'

type Props = {
  session: Session | null
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function TopBar(props: Props) {
  const path = usePathname()
  const [openMenu, setOpenMenu] = useAtom(dashboardMenu)

  function getCurrentPageName() {
    const name = path
      .split('/')
      .filter((item) => item !== '')
      .pop()

    const isEditBlog = path.includes('edit-blog')

    const finalName = isEditBlog
      ? 'Edit Blog'
      : name
        ? name
            .split('-')
            .map((word) => capitalize(word))
            .join(' ')
        : 'Dashboard'

    if (isEditBlog) return 'Edit Blog'

    return name
      ? name
          .split('-')
          .map((word) => capitalize(word))
          .join(' ')
      : 'Dashboard'
  }

  return (
    <ul className="flex items-center justify-between rounded-lg bg-primary dark:bg-[#151515] p-4 shadow-md">
      <li>
        <h1 className="font-bold text-xl mb-3 text-accent">
          {getCurrentPageName()}
        </h1>
        <BreadCrumb />
      </li>
      <li className="flex items-center justify-center gap-4">
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="block cursor-pointer rounded-md p-2 outline-none transition-all duration-300 ease-in-out hover:bg-slate-300 dark:hover:bg-zinc-700 xl:hidden"
        >
          <Icon icon={RiMenu2Fill} className="mx-auto" />
        </div>
        <div className="mt-2">
          <DashboardAvatarDropDown session={props.session!} />
        </div>
      </li>
    </ul>
  )
}

export function BreadCrumb() {
  const paths = usePathname()
  const pathNames = paths.split('/').filter((item) => item !== '')

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={'/dashboard'}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathNames.length > 0 && (
          <BreadcrumbSeparator>
            <RxSlash />
          </BreadcrumbSeparator>
        )}

        {pathNames.map((item, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`
          const linkName = capitalize(item)
          const isLastPath = pathNames.length === index + 1

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {!isLastPath ? (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{linkName}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{linkName}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {pathNames.length !== index + 1 && (
                <BreadcrumbSeparator>
                  <RxSlash />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
