'use client'

import { ReactNode } from 'react'
import AdminSidebar from './admin-sidebar'
import { cn } from '@/lib/utils'
import { ArrowLeft, LogOut } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface AdminLayoutProps {
  children: ReactNode
  className?: string
  maxWidth?: 'full' | 'wide' | 'normal'
  breadcrumbs?: { label: string; href?: string }[]
  backTo?: { label: string; href: string }
  showBackButton?: boolean
}

export default function AdminLayout({
  children,
  className,
  maxWidth = 'wide',
  breadcrumbs,
  backTo,
  showBackButton = false,
}: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex">
      {/* Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar (Admin Context) */}
        <div className="h-16 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="hidden md:flex items-center gap-2 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {index > 0 && (
                      <span className="text-gray-400 dark:text-gray-600">/</span>
                    )}
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-gray-900 dark:text-white font-medium">
                        {crumb.label}
                      </span>
                    )}
                  </div>
                ))}
              </nav>
            )}
          </div>

          {/* Admin Actions */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                Admin Mode
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Platform Control
              </div>
            </div>
            <Link href="/admin/logout">
              <Button variant="outline" size="sm" className="border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <main
          className={cn(
            'p-6 md:p-8 flex-1',
            maxWidth === 'full' && 'max-w-full',
            maxWidth === 'wide' && 'max-w-7xl mx-auto w-full',
            maxWidth === 'normal' && 'max-w-5xl mx-auto w-full',
            className
          )}
        >
          {/* Back Button */}
          {(showBackButton || backTo) && (
            <div className="mb-6">
              {backTo ? (
                <Link href={backTo.href}>
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {backTo.label}
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  )
}
