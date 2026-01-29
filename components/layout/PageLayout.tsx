'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { cn } from '@/lib/utils'

interface PageLayoutProps {
  children: ReactNode
  className?: string
  maxWidth?: 'full' | 'wide' | 'normal'
}

export default function PageLayout({
  children,
  className,
  maxWidth = 'wide',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <TopBar />

        {/* Page Content */}
        <main
          className={cn(
            'p-6 md:p-8 flex-1 bg-gray-50 dark:bg-dark-bg',
            maxWidth === 'full' && 'max-w-full',
            maxWidth === 'wide' && 'max-w-7xl mx-auto w-full',
            maxWidth === 'normal' && 'max-w-5xl mx-auto w-full',
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
