'use client'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    setLoading(false)
  }, [])

  if (loading) {
    return null
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <SessionProvider>
      <ThemeProvider
        disableTransitionOnChange
        enableSystem={true}
        attribute="class"
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
