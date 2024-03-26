import SideBar from '@/components/NavMenu/sideBar'
import TopBar from '@/components/NavMenu/topBar'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'
import { authOptions } from '../api/auth/[...nextauth]/options'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <div className="dashboard-area h-screen bg-slate-200 dark:bg-secondary p-4">
      <nav>
        <SideBar />
      </nav>
      <header className="z-10 w-full">
        <TopBar session={session} />
      </header>
      <main className="no-scrollbar h-full w-full overflow-y-scroll pt-20 xl:pt-10">
        <div>{children}</div>
      </main>
    </div>
  )
}
