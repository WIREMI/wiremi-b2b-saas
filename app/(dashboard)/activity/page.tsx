'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Activity,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  DollarSign,
  Users,
  Settings,
  FileText,
  CheckCircle2,
  AlertCircle,
  Info,
  Shield,
  Trash2,
  Edit,
  Eye,
  Plus,
  LogIn,
  LogOut,
  Key,
  Mail,
  Clock,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'

interface ActivityLog {
  id: string
  user: string
  userId: string
  action: string
  category: 'account' | 'transaction' | 'team' | 'settings' | 'security' | 'hr'
  details: string
  timestamp: string
  ipAddress: string
  device: string
  status: 'success' | 'warning' | 'error'
}

export default function ActivityLogsPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateRange, setDateRange] = useState('7d')
  const [showFilters, setShowFilters] = useState(false)

  // Mock activity logs data
  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      user: 'Sarah Johnson',
      userId: 'sarah.johnson@wiremi.com',
      action: 'Login',
      category: 'security',
      details: 'Successfully logged in from New York, NY',
      timestamp: '2026-01-19T10:30:00',
      ipAddress: '192.168.1.1',
      device: 'Chrome on MacOS',
      status: 'success',
    },
    {
      id: '2',
      user: 'Michael Chen',
      userId: 'michael.chen@wiremi.com',
      action: 'Created Payment',
      category: 'transaction',
      details: 'Initiated payment of $5,000 to Acme Corp',
      timestamp: '2026-01-19T10:15:00',
      ipAddress: '192.168.1.2',
      device: 'Safari on iPhone',
      status: 'success',
    },
    {
      id: '3',
      user: 'Emily Rodriguez',
      userId: 'emily.rodriguez@wiremi.com',
      action: 'Updated Employee',
      category: 'hr',
      details: 'Modified salary for David Kim',
      timestamp: '2026-01-19T09:45:00',
      ipAddress: '192.168.1.3',
      device: 'Chrome on Windows',
      status: 'success',
    },
    {
      id: '4',
      user: 'System',
      userId: 'system',
      action: 'Processed Payroll',
      category: 'hr',
      details: 'Monthly payroll processed for 247 employees',
      timestamp: '2026-01-19T09:00:00',
      ipAddress: 'Internal',
      device: 'Automated Process',
      status: 'success',
    },
    {
      id: '5',
      user: 'David Kim',
      userId: 'david.kim@wiremi.com',
      action: 'Failed Login Attempt',
      category: 'security',
      details: 'Incorrect password from Seattle, WA',
      timestamp: '2026-01-19T08:30:00',
      ipAddress: '192.168.1.4',
      device: 'Firefox on Windows',
      status: 'error',
    },
    {
      id: '6',
      user: 'Jessica Taylor',
      userId: 'jessica.taylor@wiremi.com',
      action: 'Added Team Member',
      category: 'team',
      details: 'Invited robert.anderson@wiremi.com to the team',
      timestamp: '2026-01-19T08:00:00',
      ipAddress: '192.168.1.5',
      device: 'Chrome on MacOS',
      status: 'success',
    },
    {
      id: '7',
      user: 'Michael Chen',
      userId: 'michael.chen@wiremi.com',
      action: 'Updated Settings',
      category: 'settings',
      details: 'Modified notification preferences',
      timestamp: '2026-01-18T16:30:00',
      ipAddress: '192.168.1.2',
      device: 'Safari on iPhone',
      status: 'success',
    },
    {
      id: '8',
      user: 'Sarah Johnson',
      userId: 'sarah.johnson@wiremi.com',
      action: 'Exported Report',
      category: 'account',
      details: 'Downloaded financial report for Q4 2025',
      timestamp: '2026-01-18T15:45:00',
      ipAddress: '192.168.1.1',
      device: 'Chrome on MacOS',
      status: 'success',
    },
    {
      id: '9',
      user: 'Emily Rodriguez',
      userId: 'emily.rodriguez@wiremi.com',
      action: 'Approved Transaction',
      category: 'transaction',
      details: 'Approved bulk payout of $125,000',
      timestamp: '2026-01-18T14:20:00',
      ipAddress: '192.168.1.3',
      device: 'Chrome on Windows',
      status: 'success',
    },
    {
      id: '10',
      user: 'System',
      userId: 'system',
      action: 'Security Alert',
      category: 'security',
      details: 'Unusual login location detected',
      timestamp: '2026-01-18T13:00:00',
      ipAddress: 'Internal',
      device: 'Security System',
      status: 'warning',
    },
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'account', label: 'Account' },
    { value: 'transaction', label: 'Transactions' },
    { value: 'team', label: 'Team' },
    { value: 'settings', label: 'Settings' },
    { value: 'security', label: 'Security' },
    { value: 'hr', label: 'HR & Payroll' },
  ]

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'success', label: 'Success' },
    { value: 'warning', label: 'Warning' },
    { value: 'error', label: 'Error' },
  ]

  const dateRanges = [
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
  ]

  // Filter activity logs
  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getActionIcon = (category: ActivityLog['category']) => {
    switch (category) {
      case 'account':
        return <User className="w-5 h-5 text-primary-500" />
      case 'transaction':
        return <DollarSign className="w-5 h-5 text-success" />
      case 'team':
        return <Users className="w-5 h-5 text-info" />
      case 'settings':
        return <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
      case 'security':
        return <Shield className="w-5 h-5 text-error" />
      case 'hr':
        return <FileText className="w-5 h-5 text-warning" />
    }
  }

  const getStatusBadge = (status: ActivityLog['status']) => {
    switch (status) {
      case 'success':
        return <Badge variant="success" size="sm">Success</Badge>
      case 'warning':
        return <Badge variant="warning" size="sm">Warning</Badge>
      case 'error':
        return <Badge variant="error" size="sm">Error</Badge>
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const stats = {
    total: activityLogs.length,
    success: activityLogs.filter((l) => l.status === 'success').length,
    warning: activityLogs.filter((l) => l.status === 'warning').length,
    error: activityLogs.filter((l) => l.status === 'error').length,
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Activity Logs
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track all actions and changes across your organization
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-5 h-5" />}
              iconPosition="left"
            >
              Export Logs
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Events</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.success}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.warning}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Warnings</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-error" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.error}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Errors</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by user, action, or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                iconPosition="left"
              />
            </div>
            <div className="flex gap-3">
              <Select
                options={dateRanges}
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              />
              <Button
                variant="outline"
                size="md"
                icon={<Filter className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
              <Select
                label="Category"
                options={categories}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
              <Select
                label="Status"
                options={statuses}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredLogs.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{activityLogs.length}</span> activity logs
            </p>
          </div>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Activity Timeline
        </h2>
        <div className="space-y-4">
          {filteredLogs.map((log, index) => (
            <div
              key={log.id}
              className="flex gap-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-50 dark:bg-dark-surface rounded-xl flex items-center justify-center flex-shrink-0">
                {getActionIcon(log.category)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">
                      {log.action}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {log.details}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {log.user}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimestamp(log.timestamp)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {log.ipAddress}
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="w-3 h-3" />
                        {log.device}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(log.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No activity logs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSearchQuery('')
                setCategoryFilter('all')
                setStatusFilter('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Card>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-primary-900 dark:text-primary-300 mb-1">
              Activity Log Retention
            </p>
            <p className="text-primary-800 dark:text-primary-400">
              Activity logs are retained for 90 days. For compliance requirements, you can export logs at any time to maintain your own records.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
