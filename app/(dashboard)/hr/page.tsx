'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Download,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Award,
  PieChart,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Badge } from '@/components/ui/badge'
import { formatNumber } from '@/lib/utils'

interface QuickStat {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
  iconBg: string
}

interface RecentActivity {
  id: string
  type: 'hire' | 'payroll' | 'leave' | 'promotion'
  employee: string
  description: string
  date: string
  amount?: number
  status: 'completed' | 'pending' | 'scheduled'
}

interface UpcomingPayroll {
  id: string
  period: string
  payDate: string
  employees: number
  totalAmount: number
  status: 'draft' | 'scheduled' | 'processing'
}

interface Department {
  name: string
  employees: number
  budget: number
  percentage: number
  color: string
}

export default function HRPayrollOverviewPage() {
  const router = useRouter()

  // Quick stats data
  const quickStats: QuickStat[] = [
    {
      label: 'Total Employees',
      value: '247',
      change: '+12.5%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      iconBg: 'bg-primary-100 dark:bg-primary-500/20 text-primary-500',
    },
    {
      label: 'Monthly Payroll',
      value: '$485,200',
      change: '+8.3%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      iconBg: 'bg-success/10 text-success',
    },
    {
      label: 'Active Positions',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: <Briefcase className="w-6 h-6" />,
      iconBg: 'bg-info/10 text-info',
    },
    {
      label: 'On Leave Today',
      value: '12',
      change: '-2',
      trend: 'down',
      icon: <Calendar className="w-6 h-6" />,
      iconBg: 'bg-warning/10 text-warning',
    },
  ]

  // Recent activity data
  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'hire',
      employee: 'Sarah Johnson',
      description: 'New hire - Software Engineer',
      date: '2 hours ago',
      status: 'completed',
    },
    {
      id: '2',
      type: 'payroll',
      employee: 'All Employees',
      description: 'Monthly payroll processed',
      date: '1 day ago',
      amount: 485200,
      status: 'completed',
    },
    {
      id: '3',
      type: 'leave',
      employee: 'Michael Chen',
      description: 'Annual leave approved (Dec 20-27)',
      date: '2 days ago',
      status: 'pending',
    },
    {
      id: '4',
      type: 'promotion',
      employee: 'Emily Rodriguez',
      description: 'Promoted to Senior Manager',
      date: '3 days ago',
      amount: 95000,
      status: 'completed',
    },
  ]

  // Upcoming payroll data
  const upcomingPayrolls: UpcomingPayroll[] = [
    {
      id: '1',
      period: 'December 2025',
      payDate: '2026-01-05',
      employees: 247,
      totalAmount: 485200,
      status: 'scheduled',
    },
    {
      id: '2',
      period: 'November 2025 (Bonus)',
      payDate: '2025-12-15',
      employees: 247,
      totalAmount: 125000,
      status: 'draft',
    },
  ]

  // Department breakdown
  const departments: Department[] = [
    { name: 'Engineering', employees: 89, budget: 178000, percentage: 36, color: 'bg-primary-500' },
    { name: 'Sales & Marketing', employees: 52, budget: 104000, percentage: 21, color: 'bg-success' },
    { name: 'Operations', employees: 43, budget: 86000, percentage: 17, color: 'bg-info' },
    { name: 'Finance', employees: 28, budget: 56000, percentage: 11, color: 'bg-warning' },
    { name: 'HR & Admin', employees: 22, budget: 44000, percentage: 9, color: 'bg-error' },
    { name: 'Others', employees: 13, budget: 17200, percentage: 6, color: 'bg-gray-400' },
  ]

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'hire':
        return <UserPlus className="w-4 h-4 text-teal-600 dark:text-teal-400" />
      case 'payroll':
        return <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
      case 'leave':
        return <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
      case 'promotion':
        return <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
    }
  }

  const getStatusBadge = (status: RecentActivity['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>
      case 'scheduled':
        return <Badge variant="info" size="sm">Scheduled</Badge>
    }
  }

  const getPayrollStatusBadge = (status: UpcomingPayroll['status']) => {
    switch (status) {
      case 'draft':
        return <Badge variant="default" size="sm">Draft</Badge>
      case 'scheduled':
        return <Badge variant="success" size="sm">Scheduled</Badge>
      case 'processing':
        return <Badge variant="info" size="sm">Processing</Badge>
    }
  }

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Back Navigation */}
      <div className="mb-2">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            HR & Payroll
          </h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            Manage your team, process payroll, and track employee data
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="px-4 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
          <button
            onClick={() => router.push('/hr/employees/add')}
            className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.iconBg.includes('primary') ? 'bg-teal-100 dark:bg-teal-900/20' : stat.iconBg.includes('success') ? 'bg-green-100 dark:bg-green-900/20' : stat.iconBg.includes('info') ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-orange-100 dark:bg-orange-900/20'}`}>
                  {React.isValidElement(stat.icon) && React.cloneElement(stat.icon, {
                    className: `w-4 h-4 ${stat.iconBg.includes('primary') ? 'text-teal-600 dark:text-teal-400' : stat.iconBg.includes('success') ? 'text-green-600 dark:text-green-400' : stat.iconBg.includes('info') ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}` as string
                  } as any)}
                </div>
                <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                  {stat.value}
                </span>
              </div>
              <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
                {stat.label}
              </div>
              <div className={`text-[12px] font-medium flex items-center gap-0.5 ${
                stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            </div>
          ))}
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-3">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => router.push('/hr/employees')}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors text-left"
              >
                <div className="w-9 h-9 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                    Manage Employees
                  </p>
                  <p className="text-[11px] text-gray-500">
                    View and edit employee records
                  </p>
                </div>
              </button>

              <button
                onClick={() => router.push('/hr/payroll')}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors text-left"
              >
                <div className="w-9 h-9 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                    Process Payroll
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Run payroll and manage payments
                  </p>
                </div>
              </button>

              <button
                onClick={() => router.push('/team')}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors text-left"
              >
                <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                    Team Management
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Manage team access and roles
                  </p>
                </div>
              </button>

              <button
                onClick={() => router.push('/reports')}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors text-left"
              >
                <div className="w-9 h-9 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                    HR Reports
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Generate payroll and HR reports
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Department Breakdown */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                Department Breakdown
              </h2>
              <button className="text-[12px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors flex items-center gap-1">
                <PieChart className="w-3.5 h-3.5" />
                View Details
              </button>
            </div>

            <div className="space-y-3">
              {departments.map((dept, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${dept.color.replace('bg-primary-500', 'bg-teal-600')}`} />
                      <span className="text-[12px] font-medium text-gray-900 dark:text-white">
                        {dept.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-gray-500">
                        {dept.employees} employees
                      </span>
                      <span className="text-[12px] font-semibold text-gray-900 dark:text-white tabular-nums">
                        ${formatNumber(dept.budget)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${dept.color.replace('bg-primary-500', 'bg-teal-600')}`}
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <button
                onClick={() => router.push('/hr/activity')}
                className="text-[12px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
              >
                View All →
              </button>
            </div>

            <div className="space-y-2.5">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg"
                >
                  <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <p className="text-[13px] font-medium text-gray-900 dark:text-white">
                        {activity.employee}
                      </p>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-[12px] text-gray-500 mb-0.5">
                      {activity.description}
                    </p>
                    {activity.amount && (
                      <p className="text-[12px] font-semibold text-green-600 dark:text-green-400 mb-0.5 tabular-nums">
                        ${formatNumber(activity.amount)}
                      </p>
                    )}
                    <p className="text-[11px] text-gray-500">
                      {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-3">
          {/* Upcoming Payrolls */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
              Upcoming Payrolls
            </h2>
            <div className="space-y-3">
              {upcomingPayrolls.map((payroll) => (
                <div
                  key={payroll.id}
                  className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900 dark:text-white mb-0.5">
                        {payroll.period}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-gray-500">
                        <Clock className="w-3 h-3" />
                        Pay date: {new Date(payroll.payDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    {getPayrollStatusBadge(payroll.status)}
                  </div>
                  <div className="space-y-1.5 mb-2.5">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-gray-500">Employees</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {payroll.employees}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-gray-500">Total Amount</span>
                      <span className="font-semibold text-gray-900 dark:text-white tabular-nums">
                        ${formatNumber(payroll.totalAmount)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/hr/payroll/${payroll.id}`)}
                    className="w-full px-3 py-1.5 text-[12px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>{payroll.status === 'draft' ? 'Continue' : 'View Details'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
              Alerts & Reminders
            </h2>
            <div className="space-y-2.5">
              <div className="flex gap-2.5 p-2.5 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-500/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-[12px]">
                  <p className="font-medium text-orange-600 dark:text-orange-400 mb-0.5">
                    3 Probation Periods Ending
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Review required by Dec 31
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 p-2.5 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-[12px]">
                  <p className="font-medium text-blue-600 dark:text-blue-400 mb-0.5">
                    Annual Reviews Due
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    12 employees scheduled this month
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 p-2.5 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/20 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-[12px]">
                  <p className="font-medium text-green-600 dark:text-green-400 mb-0.5">
                    Compliance Up to Date
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    All tax filings submitted
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Summary */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
              This Month
            </h2>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-gray-500">New Hires</span>
                <span className="text-[12px] font-semibold text-gray-900 dark:text-white">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-gray-500">Terminations</span>
                <span className="text-[12px] font-semibold text-gray-900 dark:text-white">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-gray-500">Promotions</span>
                <span className="text-[12px] font-semibold text-gray-900 dark:text-white">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-gray-500">Leave Days</span>
                <span className="text-[12px] font-semibold text-gray-900 dark:text-white">84</span>
              </div>
              <div className="pt-2.5 border-t border-gray-200 dark:border-gray-700/40">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-gray-900 dark:text-white">
                    Net Change
                  </span>
                  <span className="text-[12px] font-bold text-green-600 dark:text-green-400">+6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </PageLayout>
  )
}
