import { Nav } from '@/components/NavMenu/Nav'
import { Providers } from '@/components/Providers/providers'
import { ReactNode } from 'react'
import './globals.css'

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="h-screen font-ibm_plex_sans dark:bg-primary">
            <Nav />
            <main className="px-12">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
