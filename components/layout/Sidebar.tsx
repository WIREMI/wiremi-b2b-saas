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
  Hotel,
  Brain,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  badge?: string
  children?: NavItem[]
  alwaysExpanded?: boolean
}

interface SidebarProps {
  className?: string
  organizationName?: string
}

export default function Sidebar({ className, organizationName = 'Tech Solutions Ltd' }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  // Financial Core is always expanded by default
  const [expandedSections, setExpandedSections] = useState<string[]>(['Financial Core'])

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
    alwaysExpanded: true,
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
    name: 'AI Business Agent',
    href: '#',
    icon: <Brain className="w-5 h-5" />,
    children: [
      {
        name: 'Agent Dashboard',
        href: '/ai/agent',
        icon: <Sparkles className="w-4 h-4" />,
        badge: 'New',
      },
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

  // Auto-expand Financial Core and active section on mount
  useEffect(() => {
    const findActiveSectionName = (items: NavItem[], currentPath: string): string | null => {
      for (const item of items) {
        if (item.children) {
          for (const child of item.children) {
            if (currentPath.startsWith(child.href) && child.href !== '#') {
              return item.name
            }
            if (child.children) {
              for (const grandchild of child.children) {
                if (currentPath.startsWith(grandchild.href) && grandchild.href !== '#') {
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
    setExpandedSections((prev) => {
      const newSections = new Set(prev)
      // Always keep Financial Core expanded
      newSections.add('Financial Core')
      // Add the active section if found
      if (activeSectionName) {
        newSections.add(activeSectionName)
      }
      return Array.from(newSections)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const toggleSection = (sectionName: string, alwaysExpanded?: boolean) => {
    // Don't collapse if it's always expanded
    if (alwaysExpanded && expandedSections.includes(sectionName)) {
      return
    }
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
            onClick={() => toggleSection(item.name, item.alwaysExpanded)}
            className={cn(
              'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
              'hover:bg-dark-elevated',
              'text-gray-300',
              'group'
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 text-gray-400 group-hover:text-primary-500">
                {item.icon}
              </span>
              {!collapsed && (
                <span className="font-medium text-sm truncate">{item.name}</span>
              )}
            </div>
            {!collapsed && (
              <ChevronDown
                className={cn(
                  'w-4 h-4 shrink-0 transition-transform duration-200 text-gray-400',
                  isExpanded && 'transform rotate-180'
                )}
              />
            )}
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && !collapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-dark-border pl-3">
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
          'flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group mb-0.5',
          'hover:bg-dark-elevated',
          active
            ? 'bg-primary-900/30 text-primary-400'
            : 'text-gray-300',
          level > 0 && 'text-sm py-1.5'
        )}
      >
        <span
          className={cn(
            'shrink-0 transition-colors',
            active
              ? 'text-primary-400'
              : 'text-gray-400 group-hover:text-primary-500'
          )}
        >
          {item.icon}
        </span>
        {!collapsed && (
          <>
            <span className="font-medium truncate">{item.name}</span>
            {item.badge && (
              <span className="ml-auto text-[10px] px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded-full font-medium">
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
          'fixed left-0 top-0 z-40 lg:sticky lg:top-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        {/* Organization Name at Top */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-dark-border shrink-0">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white text-sm truncate">
                  {organizationName}
                </p>
                <p className="text-xs text-gray-500 truncate">Business Account</p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-dark-elevated transition-colors shrink-0"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 scrollbar-hide">
          <div className="space-y-0.5">
            {allNavigationItems.map((item) => renderNavItem(item))}
          </div>
        </nav>

        {/* Wiremi Logo at Bottom */}
        <div className="p-4 border-t border-dark-border shrink-0">
          <div className={cn(
            "flex items-center gap-3",
            collapsed ? "justify-center" : "px-2"
          )}>
            {/* Wiremi Logo */}
            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/20">
              <span className="text-white font-black text-lg tracking-tight">W</span>
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">powered by</p>
                <p className="font-black text-white text-lg tracking-tight -mt-0.5">WIREMI</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  )
}
