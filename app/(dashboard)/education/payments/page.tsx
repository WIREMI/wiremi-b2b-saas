'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Receipt, Search, Filter, Download, Plus, DollarSign, Calendar, TrendingUp } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import { MOCK_PAYMENTS, MOCK_STUDENTS } from '@/lib/mock-data/education'

export default function PaymentCollectionPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredPayments = MOCK_PAYMENTS.filter((payment) => {
    const student = MOCK_STUDENTS.find((s) => s.id === payment.studentId)
    const matchesSearch =
      payment.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    return matchesSearch && matchesStatus
  }).sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime())

  const todayPayments = MOCK_PAYMENTS.filter((p) => {
    const today = new Date().toISOString().split('T')[0]
    return p.paymentDate.startsWith(today) && p.status === 'paid'
  }).reduce((sum, p) => sum + p.amount, 0)

  const monthPayments = MOCK_PAYMENTS.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)

  const totalOutstanding = MOCK_STUDENTS.filter((s) => s.status === 'active').reduce((sum, s) => sum + s.balance, 0)

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'success'
      case 'partial': return 'warning'
      case 'overdue': return 'error'
      case 'pending': return 'default'
      default: return 'default'
    }
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment Collection</h1>
            <p className="text-gray-600 dark:text-gray-400">Track and manage student payments</p>
          </div>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/education/payments/collect')}
          >
            Collect Payment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(todayPayments, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Collected Today</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(monthPayments, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Receipt className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalOutstanding, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Outstanding</p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by receipt number or student name..."
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
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'paid', label: 'Paid' },
                { value: 'partial', label: 'Partial' },
                { value: 'overdue', label: 'Overdue' },
                { value: 'pending', label: 'Pending' }
              ]}
            />
          </div>
        )}
      </Card>

      {/* Payments Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">Receipt</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">Student</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">Method</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => {
                const student = MOCK_STUDENTS.find((s) => s.id === payment.studentId)
                return (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors cursor-pointer"
                    onClick={() => router.push(`/education/students/${payment.studentId}/payments`)}
                  >
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                      {payment.receiptNumber}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {student?.firstName} {student?.lastName}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{student?.studentId}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                      {formatDate(payment.paymentDate)}
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(payment.amount, payment.currency)}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400 capitalize">
                      {payment.paymentMethod.replace('-', ' ')}
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getPaymentStatusVariant(payment.status)} size="sm">
                        {payment.status}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </PageLayout>
  )
}
