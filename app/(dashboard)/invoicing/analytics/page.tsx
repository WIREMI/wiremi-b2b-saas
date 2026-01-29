'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Download,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { mockAnalytics } from '@/lib/mock-data/invoicing'
import { formatCurrency } from '@/types/invoicing'

export default function InvoiceAnalyticsPage() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  const analytics = mockAnalytics

  const invoicesByStatus = {
    DRAFT: analytics.draftCount,
    SENT: analytics.sentCount,
    PAID: analytics.paidCount,
    OVERDUE: analytics.overdueCount,
  }

  const agingReportArray = [
    { bucket: 'Current', amount: analytics.agingReport.current, count: 0 },
    { bucket: '1-30 days', amount: analytics.agingReport.days30, count: 0 },
    { bucket: '31-60 days', amount: analytics.agingReport.days60, count: 0 },
    { bucket: '61-90 days', amount: analytics.agingReport.days90Plus, count: 0 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                icon={<ArrowLeft className="w-4 h-4" />}
                onClick={() => router.push('/invoicing')}
              >
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Invoice Analytics
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Detailed insights into your invoicing performance
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button variant="outline" icon={<Download className="w-4 h-4" />}>
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <Badge variant="success" size="sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5%
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(analytics.totalRevenue, "USD")}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              vs last period
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <Badge variant="warning" size="sm">
                {analytics.sentCount}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Outstanding</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(analytics.outstandingAmount, "USD")}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {analytics.sentCount} invoices
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-error/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-error" />
              </div>
              <Badge variant="error" size="sm">
                {analytics.overdueCount}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overdue</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(analytics.overdueAmount, "USD")}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Needs attention
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-info" />
              </div>
              <Badge variant="default" size="sm">
                {analytics.averagePaymentTime}d
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Payment Time</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {analytics.averagePaymentTime}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              days on average
            </p>
          </Card>
        </div>

        {/* Invoice Status Breakdown */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Invoice Status Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(invoicesByStatus).map(([status, count]) => {
              let color = 'gray'
              let icon = FileText
              if (status === 'PAID') {
                color = 'success'
                icon = CheckCircle
              } else if (status === 'SENT' || status === 'VIEWED') {
                color = 'info'
              } else if (status === 'OVERDUE') {
                color = 'error'
                icon = AlertTriangle
              } else if (status === 'PARTIAL') {
                color = 'warning'
              }

              const Icon = icon

              return (
                <div
                  key={status}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-surface rounded-xl"
                >
                  <div className={`w-12 h-12 bg-${color}/10 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {count}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {status.charAt(0) + status.slice(1).toLowerCase()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue by Month */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Revenue by Month
            </h2>
            <div className="space-y-4">
              {analytics.revenueByMonth.map((month) => {
                const maxRevenue = Math.max(...analytics.revenueByMonth.map((m) => m.revenue))
                const percentage = (month.revenue / maxRevenue) * 100

                return (
                  <div key={month.month}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {month.month}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(month.revenue, "USD")}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="h-3 bg-primary-500 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {month.invoiceCount} invoices
                    </p>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Top Clients */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Top Clients by Revenue
            </h2>
            <div className="space-y-4">
              {analytics.topClients.map((client, index) => (
                <div
                  key={client.clientId}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-surface rounded-lg hover:shadow transition-shadow cursor-pointer"
                  onClick={() => router.push(`/invoicing/clients/${client.clientId}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {client.clientName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {client.invoiceCount} invoices
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {formatCurrency(client.totalPaid, "USD")}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {((client.totalPaid / analytics.totalRevenue) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Aging Report */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Accounts Receivable Aging
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {agingReportArray.map((bucket) => {
              let colorClass = 'bg-gray-100 dark:bg-gray-800'
              if (bucket.bucket === 'Current') colorClass = 'bg-success/10 dark:bg-success/20'
              else if (bucket.bucket === '1-30 days') colorClass = 'bg-info/10 dark:bg-info/20'
              else if (bucket.bucket === '31-60 days') colorClass = 'bg-warning/10 dark:bg-warning/20'
              else if (bucket.bucket === '61-90 days') colorClass = 'bg-error/10 dark:bg-error/20'
              else colorClass = 'bg-error/20 dark:bg-error/30'

              return (
                <div key={bucket.bucket} className={`p-4 rounded-xl ${colorClass}`}>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {bucket.bucket}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {formatCurrency(bucket.amount, "USD")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {bucket.count} invoice{bucket.count > 1 ? 's' : ''}
                  </p>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Payment Methods Distribution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(analytics.paymentMethodBreakdown).map(([method, count]) => {
              const totalPayments = Object.values(analytics.paymentMethodBreakdown).reduce(
                (sum, val) => sum + val,
                0
              )
              const percentage = ((count / totalPayments) * 100).toFixed(1)

              return (
                <div key={method} className="p-4 bg-gray-50 dark:bg-dark-surface rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {method.replace('_', ' ')}
                    </p>
                    <Badge variant="default" size="sm">
                      {percentage}%
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className="h-2 bg-primary-500 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {count} payment{count > 1 ? 's' : ''}
                  </p>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
