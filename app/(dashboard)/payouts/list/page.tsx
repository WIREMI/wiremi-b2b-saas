'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import { MOCK_PAYOUTS, getPayoutsByStatus } from '@/lib/mock-data/payouts'
import type { PayoutStatus, PayoutCategory } from '@/types/payouts'

export default function PayoutsListPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<PayoutStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<PayoutCategory | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPayouts = MOCK_PAYOUTS.filter((payout) => {
    const matchesSearch =
      payout.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || payout.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || payout.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const totalPayouts = MOCK_PAYOUTS.length
  const pendingPayouts = getPayoutsByStatus('pending-approval').length
  const completedPayouts = getPayoutsByStatus('completed').length
  const failedPayouts = getPayoutsByStatus('failed').length

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'approved':
      case 'processing':
        return 'info'
      case 'pending-approval':
        return 'warning'
      case 'failed':
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'pending-approval':
        return <Clock className="w-4 h-4" />
      case 'failed':
        return <XCircle className="w-4 h-4" />
      case 'processing':
        return <Clock className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Payouts</h1>
            <p className="text-gray-600 dark:text-gray-400">View and manage all payment transactions</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(totalPayouts)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">All Payouts</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(pendingPayouts)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(completedPayouts)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(failedPayouts)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by vendor, reference, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              icon={<Filter className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
            <Button variant="outline" icon={<Download className="w-4 h-4" />} iconPosition="left">
              Export
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as PayoutStatus | 'all')}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'draft', label: 'Draft' },
                { value: 'pending-approval', label: 'Pending Approval' },
                { value: 'approved', label: 'Approved' },
                { value: 'processing', label: 'Processing' },
                { value: 'completed', label: 'Completed' },
                { value: 'failed', label: 'Failed' },
                { value: 'cancelled', label: 'Cancelled' }
              ]}
            />

            <Select
              label="Category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as PayoutCategory | 'all')}
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'salary', label: 'Salary' },
                { value: 'commission', label: 'Commission' },
                { value: 'invoice', label: 'Invoice' },
                { value: 'refund', label: 'Refund' },
                { value: 'contractor-payment', label: 'Contractor Payment' },
                { value: 'vendor-payment', label: 'Vendor Payment' },
                { value: 'bonus', label: 'Bonus' },
                { value: 'reimbursement', label: 'Reimbursement' }
              ]}
            />
          </div>
        )}
      </Card>

      {/* Payouts Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Reference
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Vendor
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Amount
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Category
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayouts.map((payout) => (
                <tr
                  key={payout.id}
                  className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors cursor-pointer"
                  onClick={() => router.push(`/payouts/${payout.id}`)}
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {payout.referenceNumber}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {payout.vendorName}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-xs">
                      {payout.description}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(payout.amount, payout.currency)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {payout.category.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={getStatusVariant(payout.status)} size="sm">
                      <span className="flex items-center gap-1">
                        {getStatusIcon(payout.status)}
                        {payout.status}
                      </span>
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatDate(payout.scheduledDate)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/payouts/${payout.id}`)
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageLayout>
  )
}
