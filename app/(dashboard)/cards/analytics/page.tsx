'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Calendar,
  Download,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { mockCorporateCards, mockTransactions } from '@/lib/mock-data/corporate-cards'
import { formatCurrency } from '@/types/corporate-cards'

export default function CardsAnalyticsPage() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')

  // Calculate analytics
  const totalSpent = mockTransactions.reduce((sum, txn) => sum + txn.amount, 0)
  const completedTransactions = mockTransactions.filter((t) => t.status === 'COMPLETED')
  const pendingTransactions = mockTransactions.filter((t) => t.status === 'PENDING')
  const declinedTransactions = mockTransactions.filter((t) => t.status === 'DECLINED')

  const activeCards = mockCorporateCards.filter((c) => c.status === 'ACTIVE').length
  const totalCards = mockCorporateCards.length

  // Calculate spending by department
  const spendingByDepartment = mockCorporateCards.reduce((acc, card) => {
    const dept = card.department || 'Other'
    if (!acc[dept]) {
      acc[dept] = { total: 0, count: 0 }
    }
    acc[dept].total += card.totalSpent
    acc[dept].count += 1
    return acc
  }, {} as Record<string, { total: number; count: number }>)

  // Calculate spending by category
  const spendingByCategory = mockTransactions.reduce((acc, txn) => {
    if (!acc[txn.category]) {
      acc[txn.category] = 0
    }
    acc[txn.category] += txn.amount
    return acc
  }, {} as Record<string, number>)

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
                iconPosition="left"
                onClick={() => router.push('/cards')}
              >
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Card Analytics
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Detailed insights into your corporate card spending
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
              <Button
                variant="outline"
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
              >
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
              <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary-500" />
              </div>
              <Badge variant="success" size="sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.2%
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Spend</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalSpent)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              vs last period
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-success" />
              </div>
              <Badge variant="info" size="sm">
                {activeCards}/{totalCards}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Cards</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {activeCards}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {totalCards} total cards
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-info" />
              </div>
              <Badge variant="default" size="sm">
                {completedTransactions.length}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(completedTransactions.reduce((sum, t) => sum + t.amount, 0))}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {completedTransactions.length} transactions
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <Badge variant="warning" size="sm">
                {pendingTransactions.length}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(pendingTransactions.reduce((sum, t) => sum + t.amount, 0))}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {pendingTransactions.length} transactions
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Spending by Department */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Spending by Department
            </h2>
            <div className="space-y-4">
              {Object.entries(spendingByDepartment)
                .sort(([, a], [, b]) => b.total - a.total)
                .map(([dept, data]) => {
                  const maxSpending = Math.max(
                    ...Object.values(spendingByDepartment).map((d) => d.total)
                  )
                  const percentage = (data.total / maxSpending) * 100

                  return (
                    <div key={dept}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {dept}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(data.total)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="h-3 bg-primary-500 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {data.count} card{data.count > 1 ? 's' : ''}
                      </p>
                    </div>
                  )
                })}
            </div>
          </Card>

          {/* Spending by Category */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Spending by Category
            </h2>
            <div className="space-y-4">
              {Object.entries(spendingByCategory)
                .sort(([, a], [, b]) => b - a)
                .map(([category, amount]) => {
                  const maxAmount = Math.max(...Object.values(spendingByCategory))
                  const percentage = (amount / maxAmount) * 100
                  const txnCount = mockTransactions.filter(
                    (t) => t.category === category
                  ).length

                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {category.replace('_', ' ')}
                        </span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(amount)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="h-3 bg-primary-500 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {txnCount} transaction{txnCount > 1 ? 's' : ''}
                      </p>
                    </div>
                  )
                })}
            </div>
          </Card>
        </div>

        {/* Transaction Status Breakdown */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Transaction Status Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-surface rounded-xl">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedTransactions.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-surface rounded-xl">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pendingTransactions.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-surface rounded-xl">
              <div className="w-12 h-12 bg-error/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-error" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {declinedTransactions.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Declined</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-surface rounded-xl">
              <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockTransactions.filter((t) => t.status === 'REFUNDED').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Refunded</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Top Spending Cards */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Top Spending Cards
          </h2>
          <div className="space-y-4">
            {mockCorporateCards
              .sort((a, b) => b.totalSpent - a.totalSpent)
              .slice(0, 5)
              .map((card, index) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-surface rounded-lg hover:shadow transition-shadow cursor-pointer"
                  onClick={() => router.push(`/cards/${card.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {card.cardholderName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        •••• {card.lastFourDigits} • {card.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">
                      {formatCurrency(card.totalSpent)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {((card.totalSpent / totalSpent) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
