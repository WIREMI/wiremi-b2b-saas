'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CreditCard,
  Link2,
  QrCode,
  Smartphone,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Download,
  Settings,
  Eye,
  Plus,
  Zap,
  Building,
  Bitcoin,
  Wallet,
  ArrowRight,
  Filter,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatNumber } from '@/lib/utils'

interface PaymentTransaction {
  id: string
  customer: string
  email: string
  amount: number
  currency: string
  method: 'card' | 'mobile-money' | 'bank-transfer' | 'qr-code' | 'payment-link' | 'crypto' | 'wallet'
  status: 'completed' | 'pending' | 'failed'
  date: string
  reference: string
  collectionChannel?: 'link' | 'page' | 'widget' | 'pos' | 'qr' | 'invoice' | 'api'
}

export default function PaymentsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all')

  // Mock statistics
  const stats = {
    todayRevenue: 28450,
    pendingPayments: 8,
    successfulPayments: 156,
    totalCustomers: 1243,
    monthlyGrowth: 15.8,
    successRate: 98.5,
    weeklyRevenue: 142300,
  }

  // Mock recent transactions
  const allTransactions: PaymentTransaction[] = [
    {
      id: '1',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: 1250,
      currency: 'USD',
      method: 'card',
      status: 'completed',
      date: '2026-01-20T10:30:00',
      reference: 'PAY-2026-001234',
      collectionChannel: 'page',
    },
    {
      id: '2',
      customer: 'Sarah Johnson',
      email: 'sarah@company.com',
      amount: 850,
      currency: 'USD',
      method: 'mobile-money',
      status: 'completed',
      date: '2026-01-20T09:15:00',
      reference: 'PAY-2026-001233',
      collectionChannel: 'link',
    },
    {
      id: '3',
      customer: 'Michael Chen',
      email: 'michael@business.com',
      amount: 3200,
      currency: 'USD',
      method: 'payment-link',
      status: 'pending',
      date: '2026-01-20T08:45:00',
      reference: 'PAY-2026-001232',
      collectionChannel: 'link',
    },
    {
      id: '4',
      customer: 'Emma Wilson',
      email: 'emma@email.com',
      amount: 450,
      currency: 'USD',
      method: 'qr-code',
      status: 'completed',
      date: '2026-01-19T16:20:00',
      reference: 'PAY-2026-001231',
      collectionChannel: 'qr',
    },
    {
      id: '5',
      customer: 'David Martinez',
      email: 'david@shop.com',
      amount: 2100,
      currency: 'USD',
      method: 'card',
      status: 'completed',
      date: '2026-01-19T14:10:00',
      reference: 'PAY-2026-001230',
      collectionChannel: 'widget',
    },
    {
      id: '6',
      customer: 'Lisa Anderson',
      email: 'lisa@store.com',
      amount: 680,
      currency: 'USD',
      method: 'crypto',
      status: 'completed',
      date: '2026-01-19T12:05:00',
      reference: 'PAY-2026-001229',
      collectionChannel: 'api',
    },
  ]

  const filteredTransactions = filter === 'all'
    ? allTransactions
    : allTransactions.filter(t => t.status === filter)

  const getStatusBadge = (status: PaymentTransaction['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>
      case 'failed':
        return <Badge variant="error" size="sm">Failed</Badge>
    }
  }

  const getMethodIcon = (method: PaymentTransaction['method']) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-4 h-4" />
      case 'mobile-money':
        return <Smartphone className="w-4 h-4" />
      case 'payment-link':
        return <Link2 className="w-4 h-4" />
      case 'qr-code':
        return <QrCode className="w-4 h-4" />
      case 'bank-transfer':
        return <Building className="w-4 h-4" />
      case 'crypto':
        return <Bitcoin className="w-4 h-4" />
      case 'wallet':
        return <Wallet className="w-4 h-4" />
    }
  }

  const getMethodLabel = (method: PaymentTransaction['method']) => {
    const labels = {
      'card': 'Card',
      'mobile-money': 'Mobile Money',
      'payment-link': 'Payment Link',
      'qr-code': 'QR Code',
      'bank-transfer': 'Bank Transfer',
      'crypto': 'Cryptocurrency',
      'wallet': 'Wallet',
    }
    return labels[method] || method
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
              Payments
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              All payment transactions across collection channels
            </p>
          </div>
          <div className="flex items-center gap-6 text-[13px]">
            <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <button
              onClick={() => router.push('/payments/settings')}
              className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => router.push('/payments/collect')}
              className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Collect Payment</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                ${formatNumber(stats.todayRevenue)}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
              Revenue Today
            </div>
            <div className="text-[11px] text-gray-400">
              ${formatNumber(stats.weeklyRevenue)} this week
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {stats.successfulPayments}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
              Successful Today
            </div>
            <div className="text-[11px] text-gray-400">
              {stats.successRate}% success rate
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {stats.pendingPayments}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
              Pending Payments
            </div>
            <button className="text-[11px] text-teal-600 dark:text-teal-400 hover:text-teal-700">
              Review pending →
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {formatNumber(stats.totalCustomers)}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
              Total Customers
            </div>
            <div className="text-[11px] text-gray-400">
              Across all channels
            </div>
          </div>
        </div>

        {/* Quick Access to Collection Studio */}
        <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-teal-200/60 dark:border-teal-700/40 bg-gradient-to-br from-teal-50/50 to-blue-50/50 dark:from-teal-900/10 dark:to-blue-900/10">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-0.5">
                  Payment Collection Studio
                </h3>
                <p className="text-[13px] text-gray-600 dark:text-gray-400">
                  Accept payments through 7 collection channels - Links, Pages, Widgets, POS, QR, Invoices, API
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/payments/collect')}
              className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Open Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/40 overflow-hidden">
          <div className="p-4 border-b border-gray-200/60 dark:border-gray-700/40">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                Recent Transactions
              </h2>
              <div className="flex items-center gap-3">
                {/* Filter */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                      filter === 'all'
                        ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                      filter === 'completed'
                        ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                      filter === 'pending'
                        ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    Pending
                  </button>
                </div>
                <button
                  onClick={() => router.push('/transactions')}
                  className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
                >
                  View All
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Method
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Reference
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {transaction.customer}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {transaction.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {transaction.currency} {formatNumber(transaction.amount)}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {getMethodIcon(transaction.method)}
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {getMethodLabel(transaction.method)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
                          {transaction.reference}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(transaction.status)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => router.push(`/transactions/${transaction.id}`)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        No transactions found for this filter
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
