'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Search,
  Bell,
  ChevronRight,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TopBarProps {
  className?: string
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'success' | 'warning' | 'error' | 'info'
}

export default function TopBar({ className }: TopBarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [searchQuery, setSearchQuery] = useState('')

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark')
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        setTheme('dark')
        document.documentElement.classList.add('dark')
      }
    }
  }, [])

  // Mock notifications
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Payment received',
      message: '$5,000 from Acme Corp',
      time: '5 min ago',
      read: false,
      type: 'success',
    },
    {
      id: '2',
      title: 'Payroll completed',
      message: '43 employees paid successfully',
      time: '2 hours ago',
      read: false,
      type: 'success',
    },
    {
      id: '3',
      title: 'Low balance warning',
      message: 'EUR wallet below $1,000',
      time: '1 day ago',
      read: true,
      type: 'warning',
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    if (paths.length === 0) return [{ name: 'Dashboard', href: '/dashboard' }]

    return paths.map((path, index) => ({
      name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
      href: '/' + paths.slice(0, index + 1).join('/'),
    }))
  }

  const breadcrumbs = generateBreadcrumbs()

  // Handle keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setNotificationsOpen(false)
        setUserMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setNotificationsOpen(false)
      setUserMenuOpen(false)
    }

    if (notificationsOpen || userMenuOpen) {
      window.addEventListener('click', handleClickOutside)
      return () => window.removeEventListener('click', handleClickOutside)
    }
  }, [notificationsOpen, userMenuOpen])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleLogout = () => {
    // Clear any stored data
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    // Redirect to home page
    router.push('/')
  }

  return (
    <>
      {/* Top Bar */}
      <header
        className={cn(
          'sticky top-0 z-30 h-16 bg-gray-50 dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border',
          className
        )}
      >
        <div className="h-full flex items-center justify-between gap-4 px-6">
          {/* Left: Breadcrumbs */}
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/dashboard"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-gray-900 dark:text-white truncate">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors truncate"
                  >
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right: Search, Notifications, Theme, User */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-dark-elevated rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors group"
            >
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400">
                Search...
              </span>
              <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-dark-surface rounded text-xs text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-dark-border">
                ⌘K
              </kbd>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setNotificationsOpen(!notificationsOpen)
                  setUserMenuOpen(false)
                }}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-80 bg-gray-100 dark:bg-dark-surface rounded-2xl shadow-large border border-gray-200 dark:border-dark-border overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span className="badge badge-error">{unreadCount}</span>
                    )}
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <button
                        key={notification.id}
                        className={cn(
                          'w-full p-4 text-left border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors',
                          !notification.read && 'bg-primary-50/50 dark:bg-primary-900/10'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'w-2 h-2 mt-2 rounded-full shrink-0',
                              notification.type === 'success' && 'bg-success',
                              notification.type === 'warning' && 'bg-warning',
                              notification.type === 'error' && 'bg-error',
                              notification.type === 'info' && 'bg-primary-500'
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <Link
                    href="/notifications"
                    className="block p-3 text-center text-sm text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-dark-elevated font-medium transition-colors"
                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors"
              title="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setUserMenuOpen(!userMenuOpen)
                  setNotificationsOpen(false)
                }}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  JD
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-900 dark:text-white">
                  John Doe
                </span>
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-56 bg-gray-100 dark:bg-dark-surface rounded-2xl shadow-large border border-gray-200 dark:border-dark-border overflow-hidden"
                >
                  <div className="p-3 border-b border-gray-200 dark:border-dark-border">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      john@example.com
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Owner
                    </p>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        Profile
                      </span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        Settings
                      </span>
                    </Link>
                    <Link
                      href="/help"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        Help & Support
                      </span>
                    </Link>
                  </div>

                  <div className="p-2 border-t border-gray-200 dark:border-dark-border">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-error"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-gray-50 dark:bg-dark-surface rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 dark:border-dark-border">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions, contacts, settings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-elevated rounded border border-gray-300 dark:border-dark-border">
                  ESC
                </kbd>
              </div>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              {searchQuery === '' ? (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Start typing to search...
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    No results found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
