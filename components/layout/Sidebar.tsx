'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  Send,
  RefreshCw,
  Package,
  Users,
  Building2,
  Calendar,
  Dumbbell,
  GraduationCap,
  Sparkles,
  UserCog,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Zap,
  Menu,
  X,
  TrendingUp,
  Shield,
  FileText,
  Coins,
  Gift,
  Hotel,
  Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  badge?: string
  children?: NavItem[]
}

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const navigationItems: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
  ]

  const financialCore: NavItem = {
    name: 'Financial Core',
    href: '#',
    icon: <Wallet className="w-5 h-5" />,
    children: [
      {
        name: 'Wallets & Accounts',
        href: '/wallets',
        icon: <Wallet className="w-4 h-4" />,
      },
      {
        name: 'Transactions',
        href: '/transactions',
        icon: <ArrowLeftRight className="w-4 h-4" />,
      },
      {
        name: 'Payments',
        href: '/payments',
        icon: <CreditCard className="w-4 h-4" />,
      },
      {
        name: 'Payouts',
        href: '/payouts',
        icon: <Send className="w-4 h-4" />,
      },
      {
        name: 'Corporate Cards',
        href: '/cards',
        icon: <CreditCard className="w-4 h-4" />,
      },
      {
        name: 'Invoicing',
        href: '/invoicing',
        icon: <FileText className="w-4 h-4" />,
      },
      {
        name: 'Currency Exchange',
        href: '/exchange',
        icon: <RefreshCw className="w-4 h-4" />,
      },
    ],
  }

  const businessTools: NavItem = {
    name: 'Business Tools',
    href: '#',
    icon: <Package className="w-5 h-5" />,
    children: [
      {
        name: 'Add-ons Marketplace',
        href: '/addons',
        icon: <Package className="w-4 h-4" />,
      },
      {
        name: 'Crowdfunding',
        href: '/crowdfunding',
        icon: <TrendingUp className="w-4 h-4" />,
      },
      {
        name: 'Escrow',
        href: '/escrow',
        icon: <Shield className="w-4 h-4" />,
      },
      {
        name: 'Loyalty & Rewards',
        href: '/loyalty',
        icon: <Coins className="w-4 h-4" />,
        children: [
          {
            name: 'My Wallet',
            href: '/loyalty/wallet',
            icon: <Wallet className="w-4 h-4" />,
          },
          {
            name: 'Merchant Config',
            href: '/loyalty/merchant-config',
            icon: <Settings className="w-4 h-4" />,
          },
          {
            name: 'Analytics',
            href: '/loyalty/analytics',
            icon: <BarChart3 className="w-4 h-4" />,
          },
          {
            name: 'Settlements',
            href: '/loyalty/settlements',
            icon: <ArrowLeftRight className="w-4 h-4" />,
          },
        ],
      },
      {
        name: 'HR & Payroll',
        href: '/hr',
        icon: <Users className="w-4 h-4" />,
        badge: 'Active',
      },
      {
        name: 'Hospitality Mgmt',
        href: '/hospitality',
        icon: <Building2 className="w-4 h-4" />,
        children: [
          {
            name: 'Dashboard',
            href: '/hospitality',
            icon: <LayoutDashboard className="w-4 h-4" />,
          },
          {
            name: 'Properties',
            href: '/hospitality/properties',
            icon: <Hotel className="w-4 h-4" />,
          },
          {
            name: 'Analytics',
            href: '/hospitality/analytics',
            icon: <BarChart3 className="w-4 h-4" />,
          },
        ],
      },
      {
        name: 'Event Ticketing',
        href: '/events',
        icon: <Calendar className="w-4 h-4" />,
      },
      {
        name: 'Gym & Fitness',
        href: '/fitness',
        icon: <Dumbbell className="w-4 h-4" />,
      },
      {
        name: 'Education',
        href: '/education',
        icon: <GraduationCap className="w-4 h-4" />,
        children: [
          {
            name: 'Dashboard',
            href: '/education',
            icon: <LayoutDashboard className="w-3.5 h-3.5" />,
          },
          {
            name: 'Institutions',
            href: '/education/institutions',
            icon: <Building2 className="w-3.5 h-3.5" />,
          },
          {
            name: 'Students',
            href: '/education/students',
            icon: <Users className="w-3.5 h-3.5" />,
          },
          {
            name: 'Payments',
            href: '/education/payments',
            icon: <CreditCard className="w-3.5 h-3.5" />,
          },
          {
            name: 'Fee Structures',
            href: '/education/fees',
            icon: <FileText className="w-3.5 h-3.5" />,
          },
        ],
      },
    ],
  }

  const aiInsights: NavItem = {
    name: 'AI Insights',
    href: '#',
    icon: <Sparkles className="w-5 h-5" />,
    children: [
      {
        name: 'Business Analytics',
        href: '/ai/analytics',
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        name: 'Financial Forecasting',
        href: '/ai/forecasting',
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        name: 'Workflow Automation',
        href: '/ai/automation',
        icon: <Zap className="w-4 h-4" />,
      },
    ],
  }

  const teamAccess: NavItem = {
    name: 'Team & Access',
    href: '#',
    icon: <UserCog className="w-5 h-5" />,
    children: [
      {
        name: 'Team Members',
        href: '/team',
        icon: <Users className="w-4 h-4" />,
      },
      {
        name: 'Roles & Permissions',
        href: '/team/roles',
        icon: <UserCog className="w-4 h-4" />,
      },
      {
        name: 'Activity Logs',
        href: '/team/logs',
        icon: <BarChart3 className="w-4 h-4" />,
      },
    ],
  }

  const reports: NavItem = {
    name: 'Reports',
    href: '/reports',
    icon: <BarChart3 className="w-5 h-5" />,
  }

  const settings: NavItem = {
    name: 'Settings',
    href: '/settings',
    icon: <Settings className="w-5 h-5" />,
  }

  const allNavigationItems = [
    ...navigationItems,
    financialCore,
    businessTools,
    aiInsights,
    teamAccess,
    reports,
    settings,
  ]

  // Auto-expand the section that contains the current active page
  useEffect(() => {
    const findActiveSectionName = (items: NavItem[], currentPath: string): string | null => {
      for (const item of items) {
        if (item.children) {
          for (const child of item.children) {
            // Check if the current path starts with the child href and it's not just '#'
            if (currentPath.startsWith(child.href) && child.href !== '#') {
              return item.name
            }
            // Check nested children (3 levels deep)
            if (child.children) {
              for (const grandchild of child.children) {
                if (currentPath.startsWith(grandchild.href) && grandchild.href !== '#') {
                  // Return both parent and child names for nested expansion
                  return item.name
                }
              }
            }
          }
        }
      }
      return null
    }

    const activeSectionName = findActiveSectionName(allNavigationItems, pathname)
    if (activeSectionName) {
      setExpandedSections((prev) => {
        // Only update if not already expanded
        if (!prev.includes(activeSectionName)) {
          return [activeSectionName]
        }
        return prev
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((name) => name !== sectionName)
        : [...prev, sectionName]
    )
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/' || pathname === '/dashboard'
    }
    return pathname.startsWith(href) && href !== '#'
  }

  const isSectionExpanded = (sectionName: string) =>
    expandedSections.includes(sectionName)

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = isSectionExpanded(item.name)
    const active = isActive(item.href)

    if (hasChildren) {
      return (
        <div key={item.name} className="mb-1">
          <button
            onClick={() => toggleSection(item.name)}
            className={cn(
              'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
              'hover:bg-gray-100 dark:hover:bg-dark-elevated',
              'text-gray-700 dark:text-gray-300',
              'group'
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-primary-500">
                {item.icon}
              </span>
              {!collapsed && (
                <span className="font-medium text-sm truncate">{item.name}</span>
              )}
            </div>
            {!collapsed && (
              <ChevronDown
                className={cn(
                  'w-4 h-4 shrink-0 transition-transform duration-200',
                  isExpanded && 'transform rotate-180'
                )}
              />
            )}
          </button>

          <AnimatePresence>
            {isExpanded && !collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-dark-border pl-3">
                  {item.children!.map((child) => renderNavItem(child, level + 1))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group mb-1',
          'hover:bg-gray-100 dark:hover:bg-dark-elevated',
          active
            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
            : 'text-gray-700 dark:text-gray-300',
          level > 0 && 'text-sm'
        )}
      >
        <span
          className={cn(
            'shrink-0 transition-colors',
            active
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-gray-500 dark:text-gray-400 group-hover:text-primary-500'
          )}
        >
          {item.icon}
        </span>
        {!collapsed && (
          <>
            <span className="font-medium truncate">{item.name}</span>
            {item.badge && (
              <span className="ml-auto badge badge-success text-xs px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-dark-surface rounded-xl shadow-lg"
      >
        {mobileOpen ? (
          <X className="w-6 h-6 text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-300" />
        )}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: collapsed ? '80px' : '280px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'h-screen bg-dark-surface border-r border-dark-border flex flex-col transition-transform duration-300 shrink-0',
          // Mobile: fixed positioning with slide animation
          'fixed left-0 top-0 z-40 lg:sticky lg:top-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        {/* Logo & Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-dark-border shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <span className="font-bold text-gray-900 dark:text-white truncate">
                WIREMI
              </span>
            )}
          </Link>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-hide">
          <div className="space-y-1">
            {allNavigationItems.map((item) => renderNavItem(item))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-dark-border shrink-0">
          <Link
            href="/settings/account"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-elevated transition-colors group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold shrink-0">
              JD
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                  John Doe
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Owner
                </div>
              </div>
            )}
          </Link>
        </div>
      </motion.aside>
    </>
  )
}
