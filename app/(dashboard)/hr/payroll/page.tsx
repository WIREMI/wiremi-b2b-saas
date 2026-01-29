'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  Download,
  Play,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  Search,
  FileText,
  Eye,
  MoreVertical,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Edit,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { formatNumber } from '@/lib/utils'

interface PayrollRun {
  id: string
  period: string
  payDate: string
  employees: number
  grossPay: number
  deductions: number
  netPay: number
  status: 'draft' | 'scheduled' | 'processing' | 'completed' | 'failed'
  createdAt: string
  processedBy?: string
}

interface EmployeePayroll {
  id: string
  employeeId: string
  employeeName: string
  department: string
  grossPay: number
  deductions: number
  netPay: number
  status: 'pending' | 'approved' | 'paid'
}

type SortField = 'period' | 'payDate' | 'employees' | 'netPay' | 'status'
type SortOrder = 'asc' | 'desc'

export default function PayrollProcessingPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortField, setSortField] = useState<SortField>('payDate')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [selectedPayroll, setSelectedPayroll] = useState<string | null>(null)

  // Mock payroll runs data
  const payrollRuns: PayrollRun[] = [
    {
      id: '1',
      period: 'December 2025',
      payDate: '2026-01-05',
      employees: 247,
      grossPay: 485200,
      deductions: 97040,
      netPay: 388160,
      status: 'scheduled',
      createdAt: '2025-12-20',
    },
    {
      id: '2',
      period: 'November 2025',
      payDate: '2025-12-05',
      employees: 245,
      grossPay: 478900,
      deductions: 95780,
      netPay: 383120,
      status: 'completed',
      createdAt: '2025-11-20',
      processedBy: 'Amanda White',
    },
    {
      id: '3',
      period: 'October 2025',
      payDate: '2025-11-05',
      employees: 242,
      grossPay: 472500,
      deductions: 94500,
      netPay: 378000,
      status: 'completed',
      createdAt: '2025-10-20',
      processedBy: 'Amanda White',
    },
    {
      id: '4',
      period: 'November 2025 (Bonus)',
      payDate: '2025-12-15',
      employees: 247,
      grossPay: 125000,
      deductions: 25000,
      netPay: 100000,
      status: 'draft',
      createdAt: '2025-12-10',
    },
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
  ]

  // Filter and sort payrolls
  const filteredPayrolls = payrollRuns
    .filter((payroll) => {
      const matchesSearch = payroll.period.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === 'all' || payroll.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'period':
          comparison = a.period.localeCompare(b.period)
          break
        case 'payDate':
          comparison = new Date(a.payDate).getTime() - new Date(b.payDate).getTime()
          break
        case 'employees':
          comparison = a.employees - b.employees
          break
        case 'netPay':
          comparison = a.netPay - b.netPay
          break
        case 'status':
          comparison = a.status.localeCompare(b.status)
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 opacity-30" />
    }
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    )
  }

  const getStatusBadge = (status: PayrollRun['status']) => {
    switch (status) {
      case 'draft':
        return <Badge variant="default" size="sm">Draft</Badge>
      case 'scheduled':
        return <Badge variant="info" size="sm">Scheduled</Badge>
      case 'processing':
        return <Badge variant="warning" size="sm">Processing</Badge>
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>
      case 'failed':
        return <Badge variant="error" size="sm">Failed</Badge>
    }
  }

  const stats = {
    totalPayrolls: payrollRuns.length,
    scheduled: payrollRuns.filter((p) => p.status === 'scheduled').length,
    completed: payrollRuns.filter((p) => p.status === 'completed').length,
    totalPayments: payrollRuns.reduce((sum, p) => sum + p.netPay, 0),
  }

  const upcomingPayroll = payrollRuns.find((p) => p.status === 'scheduled')

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Payroll Processing
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and process employee payroll
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-5 h-5" />}
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<Play className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push('/hr/payroll/new')}
            >
              Run Payroll
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalPayrolls}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Payroll Runs
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-info" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.scheduled}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Scheduled Payrolls
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.completed}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Completed This Year
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              ${formatNumber(stats.totalPayments)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Paid Out
            </p>
          </Card>
        </div>

        {/* Upcoming Payroll Alert */}
        {upcomingPayroll && (
          <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Upcoming Payroll: {upcomingPayroll.period}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Pay date: {new Date(upcomingPayroll.payDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {upcomingPayroll.employees} employees
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      ${formatNumber(upcomingPayroll.netPay)} net pay
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => router.push(`/hr/payroll/${upcomingPayroll.id}`)}
                >
                  View Details
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  icon={<Play className="w-5 h-5" />}
                  iconPosition="left"
                >
                  Process Now
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by period..."
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

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
              <Select
                label="Status"
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredPayrolls.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{payrollRuns.length}</span> payroll runs
            </p>
          </div>
        </Card>
      </div>

      {/* Payroll Runs Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('period')}
                >
                  <div className="flex items-center gap-2">
                    Period
                    {getSortIcon('period')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('payDate')}
                >
                  <div className="flex items-center gap-2">
                    Pay Date
                    {getSortIcon('payDate')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('employees')}
                >
                  <div className="flex items-center gap-2">
                    Employees
                    {getSortIcon('employees')}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Gross Pay
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Deductions
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('netPay')}
                >
                  <div className="flex items-center gap-2">
                    Net Pay
                    {getSortIcon('netPay')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {getSortIcon('status')}
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredPayrolls.map((payroll) => (
                <tr
                  key={payroll.id}
                  className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {payroll.period}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Created {new Date(payroll.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {new Date(payroll.payDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {payroll.employees}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    ${formatNumber(payroll.grossPay)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    ${formatNumber(payroll.deductions)}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-success">
                    ${formatNumber(payroll.netPay)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(payroll.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => router.push(`/hr/payroll/${payroll.id}`)}
                      />
                      {payroll.status === 'draft' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit className="w-4 h-4" />}
                          onClick={() => router.push(`/hr/payroll/${payroll.id}/edit`)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredPayrolls.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No payroll runs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSearchQuery('')
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
