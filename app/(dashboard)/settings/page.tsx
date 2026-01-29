'use client'

import { useRouter } from 'next/navigation'
import {
  Settings,
  Building2,
  User,
  Shield,
  Bell,
  Plug,
  CreditCard,
  FileCheck,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Info,
  Key,
  Palette,
  Globe,
  Zap,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SettingCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  iconBg: string
  route: string
  badge?: {
    text: string
    variant: 'success' | 'warning' | 'error' | 'info'
  }
  items: {
    label: string
    description: string
  }[]
}

export default function SettingsOverviewPage() {
  const router = useRouter()

  const settingCategories: SettingCategory[] = [
    {
      id: 'company',
      name: 'Company Settings',
      description: 'Manage your company profile and business information',
      icon: <Building2 className="w-6 h-6" />,
      iconBg: 'bg-primary-100 dark:bg-primary-500/20 text-primary-500',
      route: '/settings/company',
      items: [
        { label: 'Company Profile', description: 'Business name, logo, and details' },
        { label: 'Business Information', description: 'Registration and tax details' },
        { label: 'Address & Location', description: 'Office locations and contacts' },
      ],
    },
    {
      id: 'account',
      name: 'Account Settings',
      description: 'Configure your personal account preferences',
      icon: <User className="w-6 h-6" />,
      iconBg: 'bg-info/10 text-info',
      route: '/settings/account',
      items: [
        { label: 'Profile Information', description: 'Name, email, and phone' },
        { label: 'Language & Region', description: 'Localization preferences' },
        { label: 'Privacy Settings', description: 'Control your data and visibility' },
      ],
    },
    {
      id: 'security',
      name: 'Security Settings',
      description: 'Protect your account with advanced security features',
      icon: <Shield className="w-6 h-6" />,
      iconBg: 'bg-error/10 text-error',
      route: '/settings/security',
      badge: {
        text: 'Action Required',
        variant: 'warning',
      },
      items: [
        { label: 'Password Management', description: 'Change password and security' },
        { label: 'Two-Factor Authentication', description: 'Enable 2FA for extra security' },
        { label: 'Active Sessions', description: 'Manage logged-in devices' },
        { label: 'Login History', description: 'View recent login activity' },
      ],
    },
    {
      id: 'notifications',
      name: 'Notification Settings',
      description: 'Control how and when you receive notifications',
      icon: <Bell className="w-6 h-6" />,
      iconBg: 'bg-warning/10 text-warning',
      route: '/settings/notifications',
      items: [
        { label: 'Email Notifications', description: 'Transaction alerts and updates' },
        { label: 'Push Notifications', description: 'Mobile and browser notifications' },
        { label: 'Notification Schedule', description: 'Set quiet hours' },
      ],
    },
    {
      id: 'integrations',
      name: 'API & Integrations',
      description: 'Connect third-party services and manage API access',
      icon: <Plug className="w-6 h-6" />,
      iconBg: 'bg-success/10 text-success',
      route: '/settings/integrations',
      items: [
        { label: 'API Keys', description: 'Generate and manage API keys' },
        { label: 'Webhooks', description: 'Configure webhook endpoints' },
        { label: 'Connected Apps', description: 'Third-party integrations' },
      ],
    },
    {
      id: 'billing',
      name: 'Billing & Subscription',
      description: 'Manage your subscription and payment methods',
      icon: <CreditCard className="w-6 h-6" />,
      iconBg: 'bg-purple-100 dark:bg-purple-500/20 text-purple-500',
      route: '/settings/billing',
      badge: {
        text: 'Pro Plan',
        variant: 'success',
      },
      items: [
        { label: 'Current Plan', description: 'View and upgrade your plan' },
        { label: 'Payment Methods', description: 'Manage cards and billing info' },
        { label: 'Billing History', description: 'Invoices and payment records' },
      ],
    },
    {
      id: 'compliance',
      name: 'Compliance & Audit',
      description: 'Regulatory compliance and audit settings',
      icon: <FileCheck className="w-6 h-6" />,
      iconBg: 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-500',
      route: '/settings/compliance',
      items: [
        { label: 'Compliance Reports', description: 'Generate compliance documents' },
        { label: 'Audit Logs', description: 'Full system audit trail' },
        { label: 'Data Retention', description: 'Configure retention policies' },
      ],
    },
  ]

  const quickActions = [
    {
      icon: <Key className="w-5 h-5" />,
      label: 'Reset Password',
      description: 'Change your account password',
      action: () => router.push('/settings/security'),
    },
    {
      icon: <Palette className="w-5 h-5" />,
      label: 'Appearance',
      description: 'Switch between light and dark mode',
      action: () => router.push('/settings/appearance'),
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: 'Language',
      description: 'Change display language',
      action: () => router.push('/settings/account'),
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Upgrade Plan',
      description: 'Access premium features',
      action: () => router.push('/settings/billing'),
    },
  ]

  const systemStatus = [
    {
      label: 'Account Status',
      value: 'Active',
      status: 'success' as const,
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    {
      label: 'Two-Factor Auth',
      value: 'Disabled',
      status: 'warning' as const,
      icon: <AlertCircle className="w-4 h-4" />,
    },
    {
      label: 'API Access',
      value: 'Enabled',
      status: 'success' as const,
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    {
      label: 'Subscription',
      value: 'Pro Plan',
      status: 'success' as const,
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
  ]

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account, security, and preferences
          </p>
        </div>

        {/* System Status */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Status
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemStatus.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.status === 'success'
                      ? 'bg-success/10 text-success'
                      : 'bg-warning/10 text-warning'
                  }`}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.label}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Security Alert */}
        <div className="bg-warning/5 border border-warning/20 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-warning mb-1">
                Enable Two-Factor Authentication
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Protect your account with an extra layer of security. We strongly recommend enabling 2FA.
              </p>
              <button
                onClick={() => router.push('/settings/security')}
                className="text-sm font-medium text-warning hover:underline"
              >
                Enable Now →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-4">
          {settingCategories.map((category) => (
            <Card
              key={category.id}
              className="p-5 hover:border-primary-500 dark:hover:border-primary-500 transition-all cursor-pointer"
              onClick={() => router.push(category.route)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.iconBg}`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      {category.badge && (
                        <Badge variant={category.badge.variant} size="sm">
                          {category.badge.text}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>

              <div className="pl-16 space-y-2">
                {category.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-gray-50 dark:bg-dark-surface rounded-lg flex items-center justify-center">
                    {action.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {action.label}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Help & Support */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Help & Support
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 dark:bg-dark-bg rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors">
                <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                  Documentation
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Browse help articles and guides
                </p>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 dark:bg-dark-bg rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors">
                <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                  Contact Support
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Get help from our team
                </p>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 dark:bg-dark-bg rounded-lg hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors">
                <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                  Feature Requests
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Suggest new features
                </p>
              </button>
            </div>
          </Card>

          {/* Info */}
          <div className="p-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-primary-900 dark:text-primary-300 mb-1">
                  Settings Auto-Save
                </p>
                <p className="text-primary-800 dark:text-primary-400">
                  All changes are saved automatically. No need to click save!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
