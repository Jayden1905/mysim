'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FiSun } from 'react-icons/fi'
import { RiMoonFill } from 'react-icons/ri'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../ui/button'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="dark:bg-primary"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <FiSun className="h-4 w-4" />
        ) : (
          <RiMoonFill className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
