'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  Building2,
  User,
  ArrowRight,
  Check,
  Zap,
  Crown,
  Briefcase,
} from 'lucide-react'

export default function RoleSelectPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'admin' | 'business' | null>(null)

  // Mock user data - in production, this comes from auth
  const user = {
    name: 'John Doe',
    email: 'john@wiremi.com',
    hasAdminAccess: true,
    businesses: [
      { id: 'biz_1', name: 'Acme Corporation', role: 'Owner' },
      { id: 'biz_2', name: 'TechStart Ltd', role: 'Admin' },
      { id: 'biz_3', name: 'Global Trade Inc', role: 'Finance Manager' },
    ],
  }

  const roles = [
    {
      id: 'admin' as const,
      name: 'Wiremi Admin',
      description: 'Platform & Business Management',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      available: user.hasAdminAccess,
      badge: 'Platform Control',
      features: [
        'Manage all businesses',
        'KYB review & approval',
        'Platform configuration',
        'Compliance monitoring',
        'Revenue analytics',
      ],
      route: '/admin/dashboard',
    },
    {
      id: 'business' as const,
      name: 'Business Client',
      description: `Manage ${user.businesses.length} business${user.businesses.length > 1 ? 'es' : ''}`,
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      available: user.businesses.length > 0,
      badge: `${user.businesses.length} Businesses`,
      features: user.businesses.map((b) => `${b.name} (${b.role})`),
      route: '/dashboard',
    },
  ]

  const handleRoleSelect = (roleId: 'admin' | 'business') => {
    const role = roles.find((r) => r.id === roleId)
    if (role && role.available) {
      // In production, this would set session/context
      router.push(role.route)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              WIREMI
            </h1>
          </div>

          <div className="mb-2">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Welcome back, <span className="font-semibold text-gray-900 dark:text-white">{user.name}</span>
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Choose your workspace
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select the environment you want to access
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 max-w-4xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id
            const isAvailable = role.available

            return (
              <Card
                key={role.id}
                variant={isSelected ? 'interactive' : 'default'}
                className={`
                  relative cursor-pointer transition-all duration-200
                  ${isAvailable
                    ? `hover:shadow-xl hover:-translate-y-1 ${isSelected ? `ring-2 ring-offset-2 ${role.borderColor.replace('border-', 'ring-')}` : ''}`
                    : 'opacity-50 cursor-not-allowed'
                  }
                `}
                onClick={() => isAvailable && setSelectedRole(role.id)}
              >
                <div className="p-6">
                  {/* Icon & Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {isAvailable && (
                      <Badge
                        variant={
                          role.id === 'admin' ? 'warning' :
                          role.id === 'business' ? 'info' :
                          'success'
                        }
                        size="sm"
                      >
                        {role.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {role.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {role.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {role.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {role.features.length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 ml-6">
                        +{role.features.length - 3} more
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  {!isAvailable && (
                    <div className="text-sm text-gray-500 dark:text-gray-500 italic">
                      Not available
                    </div>
                  )}

                  {/* Selection Indicator */}
                  {isSelected && isAvailable && (
                    <div className={`absolute top-3 left-3 w-6 h-6 ${role.bgColor} rounded-full flex items-center justify-center border-2 ${role.borderColor}`}>
                      <Check className="w-4 h-4 text-current" />
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            disabled={!selectedRole}
            onClick={() => selectedRole && handleRoleSelect(selectedRole)}
            className="min-w-[200px]"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Demo Mode Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-full">
            <Briefcase className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
              Demo Mode - All data is simulated
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>
            Need help?{' '}
            <a href="/help" className="text-primary-600 dark:text-primary-400 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
