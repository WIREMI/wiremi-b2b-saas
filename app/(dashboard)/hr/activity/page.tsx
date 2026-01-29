'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  Search,
  Filter,
  UserPlus,
  DollarSign,
  Award,
  Clock,
  Download,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { formatNumber } from '@/lib/utils'

interface Activity {
  id: string
  type: 'hire' | 'payroll' | 'leave' | 'promotion' | 'termination' | 'update'
  employee: string
  employeeId?: string
  description: string
  date: string
  time: string
  amount?: number
  performedBy: string
  status: 'completed' | 'pending' | 'scheduled'
}

export default function ActivityLogPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const activities: Activity[] = [
    {
      id: '1',
      type: 'hire',
      employee: 'Sarah Johnson',
      employeeId: 'EMP-001',
      description: 'New hire - Software Engineer',
      date: '2026-01-19',
      time: '10:30 AM',
      performedBy: 'Amanda White',
      status: 'completed',
    },
    {
      id: '2',
      type: 'payroll',
      employee: 'All Employees',
      description: 'Monthly payroll processed for December 2025',
      date: '2026-01-18',
      time: '02:15 PM',
      amount: 485200,
      performedBy: 'System',
      status: 'completed',
    },
    {
      id: '3',
      type: 'leave',
      employee: 'Michael Chen',
      employeeId: 'EMP-002',
      description: 'Annual leave approved (Jan 25-Feb 1)',
      date: '2026-01-18',
      time: '11:20 AM',
      performedBy: 'Amanda White',
      status: 'pending',
    },
    {
      id: '4',
      type: 'promotion',
      employee: 'Emily Rodriguez',
      employeeId: 'EMP-003',
      description: 'Promoted to Senior Sales Director',
      date: '2026-01-17',
      time: '03:45 PM',
      amount: 145000,
      performedBy: 'Amanda White',
      status: 'completed',
    },
    {
      id: '5',
      type: 'update',
      employee: 'David Kim',
      employeeId: 'EMP-004',
      description: 'Updated salary information',
      date: '2026-01-17',
      time: '09:30 AM',
      amount: 115000,
      performedBy: 'Amanda White',
      status: 'completed',
    },
    {
      id: '6',
      type: 'termination',
      employee: 'John Smith',
      employeeId: 'EMP-099',
      description: 'Employment terminated - End of contract',
      date: '2026-01-16',
      time: '04:00 PM',
      performedBy: 'Amanda White',
      status: 'completed',
    },
    {
      id: '7',
      type: 'payroll',
      employee: 'All Employees',
      description: 'Bonus payroll scheduled',
      date: '2026-01-15',
      time: '01:00 PM',
      amount: 125000,
      performedBy: 'Amanda White',
      status: 'scheduled',
    },
    {
      id: '8',
      type: 'hire',
      employee: 'Lisa Anderson',
      employeeId: 'EMP-248',
      description: 'New hire - Marketing Manager',
      date: '2026-01-15',
      time: '10:00 AM',
      performedBy: 'Amanda White',
      status: 'completed',
    },
  ]

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'hire', label: 'New Hires' },
    { value: 'payroll', label: 'Payroll' },
    { value: 'leave', label: 'Leave' },
    { value: 'promotion', label: 'Promotions' },
    { value: 'termination', label: 'Terminations' },
    { value: 'update', label: 'Updates' },
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'scheduled', label: 'Scheduled' },
  ]

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.employeeId?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === 'all' || activity.type === typeFilter
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'hire':
        return <UserPlus className="w-5 h-5 text-primary-500" />
      case 'payroll':
        return <DollarSign className="w-5 h-5 text-success" />
      case 'leave':
        return <Calendar className="w-5 h-5 text-warning" />
      case 'promotion':
        return <Award className="w-5 h-5 text-info" />
      case 'termination':
        return <UserPlus className="w-5 h-5 text-error" />
      case 'update':
        return <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
    }
  }

  const getStatusBadge = (status: Activity['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>
      case 'scheduled':
        return <Badge variant="info" size="sm">Scheduled</Badge>
    }
  }

  const getTypeLabel = (type: Activity['type']) => {
    const labels: Record<Activity['type'], string> = {
      hire: 'New Hire',
      payroll: 'Payroll',
      leave: 'Leave',
      promotion: 'Promotion',
      termination: 'Termination',
      update: 'Update',
    }
    return labels[type]
  }

  return (
    <PageLayout maxWidth="wide">
      <Button
        variant="ghost"
        size="sm"
        icon={<ArrowLeft className="w-4 h-4" />}
        iconPosition="left"
        onClick={() => router.push('/hr')}
        className="mb-6"
      >
        Back to HR
      </Button>

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Activity Log
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track all HR and payroll activities
            </p>
          </div>
          <Button
            variant="outline"
            size="md"
            icon={<Download className="w-5 h-5" />}
            iconPosition="left"
          >
            Export Log
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by employee, activity, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                iconPosition="left"
              />
            </div>
            <div className="flex gap-3">
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

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
              <Select
                label="Activity Type"
                options={typeOptions}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              />
              <Select
                label="Status"
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredActivities.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{activities.length}</span> activities
            </p>
          </div>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="p-6">
        <div className="space-y-6">
          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className="relative">
              {index !== filteredActivities.length - 1 && (
                <div className="absolute left-5 top-12 w-0.5 h-full bg-gray-200 dark:bg-dark-border" />
              )}

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-50 dark:bg-dark-surface rounded-lg flex items-center justify-center flex-shrink-0 relative z-10">
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 bg-gray-50 dark:bg-dark-bg rounded-xl p-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="default" size="sm">{getTypeLabel(activity.type)}</Badge>
                        {getStatusBadge(activity.status)}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {activity.employee}
                      </h3>
                      {activity.employeeId && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-2">
                          {activity.employeeId}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                      {activity.amount && (
                        <p className="text-sm font-semibold text-success mt-2">
                          ${formatNumber(activity.amount)}
                        </p>
                      )}
                    </div>

                    <div className="text-right text-sm">
                      <p className="text-gray-900 dark:text-white font-medium">
                        {new Date(activity.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400">
                        {activity.time}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-2">
                        by {activity.performedBy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No activities found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSearchQuery('')
                setTypeFilter('all')
                setStatusFilter('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Card>
    </PageLayout>
  )
}
