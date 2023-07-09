'use client'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const queryClient = new QueryClient()

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          disableTransitionOnChange
          enableSystem={true}
          attribute="class"
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
