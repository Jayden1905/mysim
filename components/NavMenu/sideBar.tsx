'use client'
import { dashboardMenu } from '@/lib/store'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { Icon } from '../Buttons/buttons'
import { dashbaordLinks } from '@/lib/links'

export default function SideBar() {
  const [openMenu, setOpenMenu] = useAtom(dashboardMenu)
  const [menuLoading, setMenuLoading] = useState(false)
  const path = usePathname()

  const active = (href: string) =>
    path === href ? 'bg-accent text-white hover:!bg-blue-700' : ''

  useEffect(() => {
    setTimeout(() => {
      setMenuLoading(true)
    }, 250)
  }, [])

  return (
    <motion.div
      className={`absolute ${
        menuLoading ? 'block' : 'hidden'
      } absolute z-20 h-[calc(100vh-32px)] w-[20rem] translate-x-0 overflow-hidden rounded-xl bg-primary dark:bg-[#151515] px-6 py-10 shadow-lg xl:relative xl:block xl:!translate-x-0`}
      initial={{ x: -100 }}
      animate={{ x: openMenu ? 0 : -350 }}
      transition={{
        druation: 0.5,
        ease: 'easeInOut',
      }}
    >
      <div
        onClick={() => setOpenMenu(!openMenu)}
        className="absolute left-72 top-0 block cursor-pointer rounded-md p-2 hover:bg-slate-100 dark:hover:bg-secondary lg:hidden"
      >
        <RxCross1 className="mx-auto text-xl" />
      </div>
      <Link
        scroll={false}
        href={'/'}
        className="mb-6 pl-4 text-2xl font-bold text-accent"
      >
        MYSIM
      </Link>
      <p className="mb-4 pl-4 text-sm tracking-wide opacity-40">Dashboard</p>
      <ScrollArea className="flex flex-col gap-2">
        {dashbaordLinks.map((link, index) => (
          <Link
            href={link.href}
            key={index}
            onClick={() => setOpenMenu(false)}
            className={`flex place-items-center items-center rounded-lg px-4 pb-3 pt-2 ${active(
              link.href
            )} tracking-wide hover:bg-accent hover:text-white`}
            scroll={false}
          >
            <Icon icon={link.icon} className="mr-3" />
            <p className="pt-1 tracking-wide">{link.name}</p>
          </Link>
        ))}
      </ScrollArea>
    </motion.div>
  )
}
