'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Shield,
  Users,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Info,
  Lock,
  Eye,
  FileText,
  DollarSign,
  Settings,
  UserCheck,
  AlertCircle,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Role {
  id: string
  name: string
  description: string
  members: number
  isCustom: boolean
  permissions: {
    category: string
    items: {
      name: string
      description: string
      granted: boolean
    }[]
  }[]
}

export default function RolesPermissionsPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string>('1')
  const [showEditModal, setShowEditModal] = useState(false)

  // Mock roles data
  const roles: Role[] = [
    {
      id: '1',
      name: 'Owner',
      description: 'Full access to all features and settings',
      members: 1,
      isCustom: false,
      permissions: [
        {
          category: 'Team Management',
          items: [
            { name: 'Manage team members', description: 'Add, edit, and remove team members', granted: true },
            { name: 'Manage roles', description: 'Create and modify roles and permissions', granted: true },
            { name: 'View activity logs', description: 'Access to all team activity logs', granted: true },
          ],
        },
        {
          category: 'Financial Operations',
          items: [
            { name: 'Create transactions', description: 'Initiate payments and transfers', granted: true },
            { name: 'Approve transactions', description: 'Review and approve pending transactions', granted: true },
            { name: 'Manage wallets', description: 'Create and configure wallets', granted: true },
            { name: 'View transaction history', description: 'Access all transaction records', granted: true },
          ],
        },
        {
          category: 'HR & Payroll',
          items: [
            { name: 'Manage employees', description: 'Add, edit, and remove employees', granted: true },
            { name: 'Process payroll', description: 'Run and approve payroll', granted: true },
            { name: 'View payroll reports', description: 'Access payroll analytics', granted: true },
          ],
        },
        {
          category: 'Reports & Analytics',
          items: [
            { name: 'View reports', description: 'Access financial and business reports', granted: true },
            { name: 'Export data', description: 'Download reports and data exports', granted: true },
            { name: 'Create custom reports', description: 'Build custom report templates', granted: true },
          ],
        },
        {
          category: 'Settings',
          items: [
            { name: 'Manage account settings', description: 'Modify company and account settings', granted: true },
            { name: 'Manage billing', description: 'View and update billing information', granted: true },
            { name: 'API access', description: 'Generate and manage API keys', granted: true },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Advanced access with team and financial management',
      members: 2,
      isCustom: false,
      permissions: [
        {
          category: 'Team Management',
          items: [
            { name: 'Manage team members', description: 'Add, edit, and remove team members', granted: true },
            { name: 'Manage roles', description: 'Create and modify roles and permissions', granted: false },
            { name: 'View activity logs', description: 'Access to all team activity logs', granted: true },
          ],
        },
        {
          category: 'Financial Operations',
          items: [
            { name: 'Create transactions', description: 'Initiate payments and transfers', granted: true },
            { name: 'Approve transactions', description: 'Review and approve pending transactions', granted: true },
            { name: 'Manage wallets', description: 'Create and configure wallets', granted: true },
            { name: 'View transaction history', description: 'Access all transaction records', granted: true },
          ],
        },
        {
          category: 'HR & Payroll',
          items: [
            { name: 'Manage employees', description: 'Add, edit, and remove employees', granted: true },
            { name: 'Process payroll', description: 'Run and approve payroll', granted: true },
            { name: 'View payroll reports', description: 'Access payroll analytics', granted: true },
          ],
        },
        {
          category: 'Reports & Analytics',
          items: [
            { name: 'View reports', description: 'Access financial and business reports', granted: true },
            { name: 'Export data', description: 'Download reports and data exports', granted: true },
            { name: 'Create custom reports', description: 'Build custom report templates', granted: true },
          ],
        },
        {
          category: 'Settings',
          items: [
            { name: 'Manage account settings', description: 'Modify company and account settings', granted: false },
            { name: 'Manage billing', description: 'View and update billing information', granted: false },
            { name: 'API access', description: 'Generate and manage API keys', granted: false },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Manager',
      description: 'Department-level management with approval authority',
      members: 8,
      isCustom: false,
      permissions: [
        {
          category: 'Team Management',
          items: [
            { name: 'Manage team members', description: 'Add, edit, and remove team members', granted: false },
            { name: 'Manage roles', description: 'Create and modify roles and permissions', granted: false },
            { name: 'View activity logs', description: 'Access to all team activity logs', granted: true },
          ],
        },
        {
          category: 'Financial Operations',
          items: [
            { name: 'Create transactions', description: 'Initiate payments and transfers', granted: true },
            { name: 'Approve transactions', description: 'Review and approve pending transactions', granted: true },
            { name: 'Manage wallets', description: 'Create and configure wallets', granted: false },
            { name: 'View transaction history', description: 'Access all transaction records', granted: true },
          ],
        },
        {
          category: 'HR & Payroll',
          items: [
            { name: 'Manage employees', description: 'Add, edit, and remove employees', granted: false },
            { name: 'Process payroll', description: 'Run and approve payroll', granted: false },
            { name: 'View payroll reports', description: 'Access payroll analytics', granted: true },
          ],
        },
        {
          category: 'Reports & Analytics',
          items: [
            { name: 'View reports', description: 'Access financial and business reports', granted: true },
            { name: 'Export data', description: 'Download reports and data exports', granted: true },
            { name: 'Create custom reports', description: 'Build custom report templates', granted: false },
          ],
        },
        {
          category: 'Settings',
          items: [
            { name: 'Manage account settings', description: 'Modify company and account settings', granted: false },
            { name: 'Manage billing', description: 'View and update billing information', granted: false },
            { name: 'API access', description: 'Generate and manage API keys', granted: false },
          ],
        },
      ],
    },
    {
      id: '4',
      name: 'Member',
      description: 'Standard access for creating transactions and viewing data',
      members: 12,
      isCustom: false,
      permissions: [
        {
          category: 'Team Management',
          items: [
            { name: 'Manage team members', description: 'Add, edit, and remove team members', granted: false },
            { name: 'Manage roles', description: 'Create and modify roles and permissions', granted: false },
            { name: 'View activity logs', description: 'Access to all team activity logs', granted: false },
          ],
        },
        {
          category: 'Financial Operations',
          items: [
            { name: 'Create transactions', description: 'Initiate payments and transfers', granted: true },
            { name: 'Approve transactions', description: 'Review and approve pending transactions', granted: false },
            { name: 'Manage wallets', description: 'Create and configure wallets', granted: false },
            { name: 'View transaction history', description: 'Access all transaction records', granted: true },
          ],
        },
        {
          category: 'HR & Payroll',
          items: [
            { name: 'Manage employees', description: 'Add, edit, and remove employees', granted: false },
            { name: 'Process payroll', description: 'Run and approve payroll', granted: false },
            { name: 'View payroll reports', description: 'Access payroll analytics', granted: false },
          ],
        },
        {
          category: 'Reports & Analytics',
          items: [
            { name: 'View reports', description: 'Access financial and business reports', granted: true },
            { name: 'Export data', description: 'Download reports and data exports', granted: false },
            { name: 'Create custom reports', description: 'Build custom report templates', granted: false },
          ],
        },
        {
          category: 'Settings',
          items: [
            { name: 'Manage account settings', description: 'Modify company and account settings', granted: false },
            { name: 'Manage billing', description: 'View and update billing information', granted: false },
            { name: 'API access', description: 'Generate and manage API keys', granted: false },
          ],
        },
      ],
    },
    {
      id: '5',
      name: 'Viewer',
      description: 'Read-only access to reports and transaction history',
      members: 3,
      isCustom: false,
      permissions: [
        {
          category: 'Team Management',
          items: [
            { name: 'Manage team members', description: 'Add, edit, and remove team members', granted: false },
            { name: 'Manage roles', description: 'Create and modify roles and permissions', granted: false },
            { name: 'View activity logs', description: 'Access to all team activity logs', granted: false },
          ],
        },
        {
          category: 'Financial Operations',
          items: [
            { name: 'Create transactions', description: 'Initiate payments and transfers', granted: false },
            { name: 'Approve transactions', description: 'Review and approve pending transactions', granted: false },
            { name: 'Manage wallets', description: 'Create and configure wallets', granted: false },
            { name: 'View transaction history', description: 'Access all transaction records', granted: true },
          ],
        },
        {
          category: 'HR & Payroll',
          items: [
            { name: 'Manage employees', description: 'Add, edit, and remove employees', granted: false },
            { name: 'Process payroll', description: 'Run and approve payroll', granted: false },
            { name: 'View payroll reports', description: 'Access payroll analytics', granted: false },
          ],
        },
        {
          category: 'Reports & Analytics',
          items: [
            { name: 'View reports', description: 'Access financial and business reports', granted: true },
            { name: 'Export data', description: 'Download reports and data exports', granted: false },
            { name: 'Create custom reports', description: 'Build custom report templates', granted: false },
          ],
        },
        {
          category: 'Settings',
          items: [
            { name: 'Manage account settings', description: 'Modify company and account settings', granted: false },
            { name: 'Manage billing', description: 'View and update billing information', granted: false },
            { name: 'API access', description: 'Generate and manage API keys', granted: false },
          ],
        },
      ],
    },
  ]

  const selectedRoleData = roles.find((r) => r.id === selectedRole)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Team Management':
        return <Users className="w-5 h-5" />
      case 'Financial Operations':
        return <DollarSign className="w-5 h-5" />
      case 'HR & Payroll':
        return <UserCheck className="w-5 h-5" />
      case 'Reports & Analytics':
        return <FileText className="w-5 h-5" />
      case 'Settings':
        return <Settings className="w-5 h-5" />
      default:
        return <Shield className="w-5 h-5" />
    }
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.back()}
          className="mb-4"
        >
          Back to Team
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Roles & Permissions
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage team roles and configure access permissions
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => setShowEditModal(true)}
          >
            Create Custom Role
          </Button>
        </div>

        {/* Info Banner */}
        <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-4 mb-8">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-primary-900 dark:text-primary-300">
                <strong>Role-Based Access Control (RBAC):</strong> Assign roles to team members to control what they can access and do within your organization. System roles cannot be edited, but you can create custom roles with specific permissions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-2">
              Roles
            </h2>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full text-left p-4 rounded-xl transition-colors ${
                    selectedRole === role.id
                      ? 'bg-primary-50 dark:bg-primary-500/10 border-2 border-primary-500'
                      : 'bg-gray-50 dark:bg-dark-bg border-2 border-transparent hover:border-gray-300 dark:hover:border-dark-border'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className={`w-5 h-5 ${
                        selectedRole === role.id ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'
                      }`} />
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {role.name}
                      </p>
                    </div>
                    {!role.isCustom && (
                      <Badge variant="default" size="sm">System</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {role.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    <Users className="w-3 h-3" />
                    {role.members} {role.members === 1 ? 'member' : 'members'}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Permissions Details */}
        <div className="lg:col-span-2">
          {selectedRoleData && (
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedRoleData.name}
                    </h2>
                    {!selectedRoleData.isCustom && (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {selectedRoleData.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    {selectedRoleData.members} team {selectedRoleData.members === 1 ? 'member' : 'members'} with this role
                  </div>
                </div>
                {selectedRoleData.isCustom && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Edit className="w-4 h-4" />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Trash2 className="w-4 h-4" />}
                      className="text-error hover:bg-error/10"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>

              {/* Permissions Grid */}
              <div className="space-y-6">
                {selectedRoleData.permissions.map((category, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-dark-bg rounded-lg flex items-center justify-center">
                        {getCategoryIcon(category.category)}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category.category}
                      </h3>
                    </div>
                    <div className="space-y-3 pl-13">
                      {category.items.map((permission, permIdx) => (
                        <div
                          key={permIdx}
                          className="flex items-start justify-between p-4 bg-gray-50 dark:bg-dark-bg rounded-xl"
                        >
                          <div className="flex-1 pr-4">
                            <p className="font-medium text-gray-900 dark:text-white mb-1">
                              {permission.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {permission.description}
                            </p>
                          </div>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            permission.granted
                              ? 'bg-success/10'
                              : 'bg-gray-200 dark:bg-dark-border'
                          }`}>
                            {permission.granted ? (
                              <Check className="w-5 h-5 text-success" />
                            ) : (
                              <X className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning for System Roles */}
              {!selectedRoleData.isCustom && (
                <div className="mt-6 p-4 bg-warning/5 border border-warning/20 rounded-xl">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-warning mb-1">
                        System Role
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        This is a system-defined role and cannot be modified. To create a role with custom permissions, create a new custom role.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>

      {/* Role Summary */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Reference
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Owner</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Complete control over all aspects of the organization
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-error" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Admin</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced access to team, finance, and HR management
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-warning" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Manager</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Department-level management with approval authority
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-info" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Member</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Standard access for creating transactions and viewing data
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-dark-bg rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Viewer</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Read-only access to reports and transaction history
            </p>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
