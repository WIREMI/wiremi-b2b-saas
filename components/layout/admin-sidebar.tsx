'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Building2,
  Shield,
  Wallet,
  Package,
  CreditCard,
  MessageSquare,
  HeadphonesIcon,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Crown,
  Menu,
  X,
  Users,
  FileCheck,
  AlertTriangle,
  BarChart3,
  Zap,
  Bell,
  UserCog,
  CircleDollarSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  badge?: string
  children?: NavItem[]
}

interface AdminSidebarProps {
  className?: string
}

export default function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const navigationItems: NavItem[] = [
    {
      name: 'Admin Dashboard',
      href: '/admin/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
  ]

  const platformOverview: NavItem = {
    name: 'Platform Overview',
    href: '#',
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      {
        name: 'Metrics',
        href: '/admin/metrics',
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        name: 'Health Status',
        href: '/admin/health',
        icon: <Zap className="w-4 h-4" />,
      },
      {
        name: 'System Alerts',
        href: '/admin/alerts',
        icon: <Bell className="w-4 h-4" />,
        badge: '3',
      },
    ],
  }

  const businesses: NavItem = {
    name: 'Businesses',
    href: '#',
    icon: <Building2 className="w-5 h-5" />,
    children: [
      {
        name: 'All Businesses',
        href: '/admin/businesses',
        icon: <Building2 className="w-4 h-4" />,
      },
      {
        name: 'Leads',
        href: '/admin/businesses/leads',
        icon: <Users className="w-4 h-4" />,
        badge: '12',
      },
      {
        name: 'Applications',
        href: '/admin/businesses/applications',
        icon: <FileCheck className="w-4 h-4" />,
        badge: '5',
      },
      {
        name: 'Active',
        href: '/admin/businesses/active',
        icon: <Building2 className="w-4 h-4" />,
      },
      {
        name: 'Suspended',
        href: '/admin/businesses/suspended',
        icon: <AlertTriangle className="w-4 h-4" />,
      },
      {
        name: 'Terminated',
        href: '/admin/businesses/terminated',
        icon: <X className="w-4 h-4" />,
      },
    ],
  }

  const compliance: NavItem = {
    name: 'Compliance',
    href: '#',
    icon: <Shield className="w-5 h-5" />,
    children: [
      {
        name: 'KYB Queue',
        href: '/admin/kyb',
        icon: <FileCheck className="w-4 h-4" />,
        badge: '8',
      },
      {
        name: 'Pending Review',
        href: '/admin/kyb/pending',
        icon: <AlertTriangle className="w-4 h-4" />,
        badge: '8',
      },
      {
        name: 'Approved',
        href: '/admin/kyb/approved',
        icon: <FileCheck className="w-4 h-4" />,
      },
      {
        name: 'Rejected',
        href: '/admin/kyb/rejected',
        icon: <X className="w-4 h-4" />,
      },
      {
        name: 'Ongoing Monitoring',
        href: '/admin/kyb/monitoring',
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        name: 'Sanctions Screening',
        href: '/admin/kyb/sanctions',
        icon: <Shield className="w-4 h-4" />,
      },
      {
        name: 'AML Alerts',
        href: '/admin/compliance/aml',
        icon: <AlertTriangle className="w-4 h-4" />,
        badge: '2',
      },
      {
        name: 'Audit Reports',
        href: '/admin/compliance/audit',
        icon: <FileCheck className="w-4 h-4" />,
      },
    ],
  }

  const financeControl: NavItem = {
    name: 'Finance Control',
    href: '#',
    icon: <Wallet className="w-5 h-5" />,
    children: [
      {
        name: 'Platform Liquidity',
        href: '/admin/finance',
        icon: <CircleDollarSign className="w-4 h-4" />,
      },
      {
        name: 'Settlement Monitor',
        href: '/admin/finance/settlements',
        icon: <Wallet className="w-4 h-4" />,
      },
      {
        name: 'Reserve Accounts',
        href: '/admin/finance/reserves',
        icon: <Wallet className="w-4 h-4" />,
      },
      {
        name: 'Fee Collection',
        href: '/admin/finance/fees',
        icon: <CircleDollarSign className="w-4 h-4" />,
      },
      {
        name: 'Reconciliation',
        href: '/admin/finance/reconciliation',
        icon: <FileCheck className="w-4 h-4" />,
      },
    ],
  }

  const marketplace: NavItem = {
    name: 'Marketplace',
    href: '#',
    icon: <Package className="w-5 h-5" />,
    children: [
      {
        name: 'All Modules',
        href: '/admin/modules',
        icon: <Package className="w-4 h-4" />,
      },
      {
        name: 'Published',
        href: '/admin/modules/published',
        icon: <FileCheck className="w-4 h-4" />,
      },
      {
        name: 'Draft',
        href: '/admin/modules/draft',
        icon: <FileCheck className="w-4 h-4" />,
        badge: '3',
      },
      {
        name: 'Deprecated',
        href: '/admin/modules/deprecated',
        icon: <AlertTriangle className="w-4 h-4" />,
      },
      {
        name: 'Usage Analytics',
        href: '/admin/modules/analytics',
        icon: <BarChart3 className="w-4 h-4" />,
      },
    ],
  }

  const paymentOps: NavItem = {
    name: 'Payment Operations',
    href: '#',
    icon: <CreditCard className="w-5 h-5" />,
    children: [
      {
        name: 'Transaction Monitor',
        href: '/admin/payments/transactions',
        icon: <CreditCard className="w-4 h-4" />,
      },
      {
        name: 'Failed Payments',
        href: '/admin/payments/failed',
        icon: <AlertTriangle className="w-4 h-4" />,
        badge: '15',
      },
      {
        name: 'Chargebacks',
        href: '/admin/payments/chargebacks',
        icon: <AlertTriangle className="w-4 h-4" />,
      },
      {
        name: 'Refunds',
        href: '/admin/payments/refunds',
        icon: <CreditCard className="w-4 h-4" />,
      },
      {
        name: 'Processor Health',
        href: '/admin/payments/processors',
        icon: <Zap className="w-4 h-4" />,
      },
    ],
  }

  const communications: NavItem = {
    name: 'Communications',
    href: '#',
    icon: <MessageSquare className="w-5 h-5" />,
    children: [
      {
        name: 'Message Center',
        href: '/admin/communications/messages',
        icon: <MessageSquare className="w-4 h-4" />,
      },
      {
        name: 'Broadcasts',
        href: '/admin/communications/broadcast',
        icon: <MessageSquare className="w-4 h-4" />,
      },
      {
        name: 'Templates',
        href: '/admin/communications/templates',
        icon: <FileCheck className="w-4 h-4" />,
      },
      {
        name: 'Scheduled',
        href: '/admin/communications/scheduled',
        icon: <Bell className="w-4 h-4" />,
        badge: '2',
      },
      {
        name: 'Delivery Reports',
        href: '/admin/communications/delivery',
        icon: <BarChart3 className="w-4 h-4" />,
      },
    ],
  }

  const support: NavItem = {
    name: 'Support',
    href: '#',
    icon: <HeadphonesIcon className="w-5 h-5" />,
    children: [
      {
        name: 'Ticket Queue',
        href: '/admin/support/tickets',
        icon: <HeadphonesIcon className="w-4 h-4" />,
        badge: '7',
      },
      {
        name: 'Escalations',
        href: '/admin/support/escalations',
        icon: <AlertTriangle className="w-4 h-4" />,
        badge: '1',
      },
      {
        name: 'SLA Monitor',
        href: '/admin/support/sla',
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        name: 'Knowledge Base',
        href: '/admin/support/knowledge-base',
        icon: <FileCheck className="w-4 h-4" />,
      },
    ],
  }

  const platformSettings: NavItem = {
    name: 'Platform Settings',
    href: '#',
    icon: <Settings className="w-5 h-5" />,
    children: [
      {
        name: 'Admin Users',
        href: '/admin/settings/users',
        icon: <UserCog className="w-4 h-4" />,
      },
      {
        name: 'Roles & Permissions',
        href: '/admin/settings/roles',
        icon: <Shield className="w-4 h-4" />,
      },
      {
        name: 'System Config',
        href: '/admin/settings/config',
        icon: <Settings className="w-4 h-4" />,
      },
      {
        name: 'API Keys',
        href: '/admin/settings/api-keys',
        icon: <Zap className="w-4 h-4" />,
      },
      {
        name: 'Webhooks',
        href: '/admin/settings/webhooks',
        icon: <Zap className="w-4 h-4" />,
      },
    ],
  }

  const reports: NavItem = {
    name: 'Reports',
    href: '#',
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      {
        name: 'Business Analytics',
        href: '/admin/analytics/business',
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        name: 'Revenue Reports',
        href: '/admin/analytics/revenue',
        icon: <CircleDollarSign className="w-4 h-4" />,
      },
      {
        name: 'Compliance Reports',
        href: '/admin/analytics/compliance',
        icon: <Shield className="w-4 h-4" />,
      },
      {
        name: 'Custom Reports',
        href: '/admin/reports/custom',
        icon: <BarChart3 className="w-4 h-4" />,
      },
    ],
  }

  const allNavigationItems = [
    ...navigationItems,
    platformOverview,
    businesses,
    compliance,
    financeControl,
    marketplace,
    paymentOps,
    communications,
    support,
    platformSettings,
    reports,
  ]

  // Auto-expand the section that contains the current active page
  useEffect(() => {
    const findActiveSectionName = () => {
      for (const item of allNavigationItems) {
        if (item.children) {
          for (const child of item.children) {
            if (pathname.startsWith(child.href) && child.href !== '#') {
              return item.name
            }
          }
        }
      }
      return null
    }

    const activeSectionName = findActiveSectionName()
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
    if (href === '/admin/dashboard') {
      return pathname === '/admin' || pathname === '/admin/dashboard'
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
              'hover:bg-blue-100/50 dark:hover:bg-blue-900/20',
              'text-gray-700 dark:text-gray-300',
              'group'
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {item.icon}
              </span>
              {!collapsed && (
                <span className="font-medium text-sm truncate">{item.name}</span>
              )}
            </div>
            {!collapsed && (
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                    {item.badge}
                  </span>
                )}
                <ChevronDown
                  className={cn(
                    'w-4 h-4 shrink-0 transition-transform duration-200',
                    isExpanded && 'transform rotate-180'
                  )}
                />
              </div>
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
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-200 dark:border-blue-900 pl-3">
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
          'hover:bg-blue-100/50 dark:hover:bg-blue-900/20',
          active
            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            : 'text-gray-700 dark:text-gray-300',
          level > 0 && 'text-sm'
        )}
      >
        <span
          className={cn(
            'shrink-0 transition-colors',
            active
              ? 'text-blue-700 dark:text-blue-300'
              : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
          )}
        >
          {item.icon}
        </span>
        {!collapsed && (
          <>
            <span className="font-medium truncate">{item.name}</span>
            {item.badge && (
              <span className="ml-auto px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl shadow-lg"
      >
        {mobileOpen ? (
          <X className="w-6 h-6 text-blue-700 dark:text-blue-300" />
        ) : (
          <Menu className="w-6 h-6 text-blue-700 dark:text-blue-300" />
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
          'h-screen bg-gray-50 dark:bg-dark-surface border-r border-blue-200 dark:border-blue-900 flex flex-col transition-transform duration-300 shrink-0',
          // Mobile: fixed positioning with slide animation
          'fixed left-0 top-0 z-40 lg:sticky lg:top-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        {/* Logo & Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-blue-200 dark:border-blue-900 shrink-0 bg-gradient-to-r from-teal-50 to-blue-100 dark:from-blue-950 dark:to-teal-900">
          <Link href="/admin/dashboard" className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <Crown className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <span className="font-bold text-blue-900 dark:text-blue-100 truncate block text-sm">
                  WIREMI ADMIN
                </span>
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  Platform Control
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-hide">
          <div className="space-y-1">
            {allNavigationItems.map((item) => renderNavItem(item))}
          </div>
        </nav>

        {/* Admin User Profile */}
        <div className="p-4 border-t border-blue-200 dark:border-blue-900 shrink-0 bg-teal-50 dark:bg-teal-950">
          <Link
            href="/admin/settings/profile"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shrink-0 shadow-md">
              AD
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-sm text-blue-900 dark:text-blue-100 truncate">
                  Admin User
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 truncate">
                  Super Admin
                </div>
              </div>
            )}
          </Link>
        </div>
      </motion.aside>
    </>
  )
}
