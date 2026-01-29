'use client'

import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      // Check system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }
  }, [])

  return <>{children}</>
}
