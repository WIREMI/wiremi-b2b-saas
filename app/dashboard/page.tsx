'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Table from '@/components/ui/table'
import { useToast } from '@/components/ui/toast'
import Modal from '@/components/ui/modal'
import EmptyState from '@/components/ui/empty-state'
import { Skeleton } from '@/components/ui/loading'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  Send,
  Wallet as WalletIcon,
} from 'lucide-react'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  currency: string
  type: 'incoming' | 'outgoing'
  status: 'completed' | 'pending' | 'failed'
}

export default function DashboardPage() {
  const { showToast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)

  // Mock data
  const wallets = [
    {
      currency: 'USD',
      balance: 50000,
      change: 8.3,
      trend: 'up' as const,
    },
    {
      currency: 'EUR',
      balance: 45000,
      change: 5.2,
      trend: 'up' as const,
    },
    {
      currency: 'GBP',
      balance: 40000,
      change: -2.1,
      trend: 'down' as const,
    },
  ]

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$125,420',
      change: '+12.5%',
      trend: 'up' as const,
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      title: 'Active Customers',
      value: '1,234',
      change: '+8.2%',
      trend: 'up' as const,
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: 'Transactions',
      value: '2,345',
      change: '+15.3%',
      trend: 'up' as const,
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      title: 'Profit Margin',
      value: '24.5%',
      change: '-1.2%',
      trend: 'down' as const,
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ]

  const transactions: Transaction[] = [
    {
      id: '1',
      date: new Date(Date.now() - 300000).toISOString(),
      description: 'Payment from Acme Corp',
      amount: 5000,
      currency: 'USD',
      type: 'incoming',
      status: 'completed',
    },
    {
      id: '2',
      date: new Date(Date.now() - 7200000).toISOString(),
      description: 'Salary payout - Engineering',
      amount: 32000,
      currency: 'EUR',
      type: 'outgoing',
      status: 'completed',
    },
    {
      id: '3',
      date: new Date(Date.now() - 86400000).toISOString(),
      description: 'Client invoice payment',
      amount: 12500,
      currency: 'USD',
      type: 'incoming',
      status: 'completed',
    },
    {
      id: '4',
      date: new Date(Date.now() - 172800000).toISOString(),
      description: 'Vendor payment',
      amount: 800,
      currency: 'GBP',
      type: 'outgoing',
      status: 'pending',
    },
  ]

  const columns = [
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (item: Transaction) => formatRelativeTime(item.date),
    },
    {
      key: 'description',
      label: 'Description',
      sortable: true,
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      render: (item: Transaction) => (
        <span
          className={
            item.type === 'incoming'
              ? 'text-success font-semibold'
              : 'text-gray-900 dark:text-white font-semibold'
          }
        >
          {item.type === 'incoming' ? '+' : '-'}
          {formatCurrency(item.amount, item.currency)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Transaction) => (
        <Badge
          variant={
            item.status === 'completed'
              ? 'success'
              : item.status === 'pending'
              ? 'warning'
              : 'error'
          }
        >
          {item.status}
        </Badge>
      ),
    },
  ]

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-heading-xl text-gray-900 dark:text-white mb-2">
          Good morning, John! 👋
        </h1>
        <p className="text-body-lg text-gray-600 dark:text-gray-400">
          Here's what's happening with your business today
        </p>
      </div>

      {/* Wallet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {wallets.map((wallet) => (
          <Card key={wallet.currency} variant="stat" gradient="primary">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm font-medium mb-1">
                  {wallet.currency} Wallet
                </p>
                <p className="text-3xl font-bold">
                  {formatCurrency(wallet.balance, wallet.currency)}
                </p>
              </div>
              <WalletIcon className="w-8 h-8 text-white/60" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              {wallet.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>
                {wallet.change > 0 ? '+' : ''}
                {wallet.change}% from last month
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button
          variant="primary"
          icon={<Send className="w-5 h-5" />}
          onClick={() =>
            showToast({
              type: 'success',
              title: 'Payment sent',
              message: 'Your payment has been processed successfully',
            })
          }
        >
          Send Payment
        </Button>
        <Button
          variant="secondary"
          icon={<Plus className="w-5 h-5" />}
          onClick={() => setModalOpen(true)}
        >
          Request Payment
        </Button>
        <Button variant="outline" icon={<Download className="w-5 h-5" />}>
          Export
        </Button>
        <Button
          variant="ghost"
          onClick={() =>
            showToast({
              type: 'info',
              title: 'Info notification',
              message: 'This is an informational message',
            })
          }
        >
          Show Toast
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center text-primary-500">
                {metric.icon}
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-success' : 'text-error'
                }`}
              >
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {metric.change}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {metric.title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {metric.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading-lg text-gray-900 dark:text-white">
            Recent Transactions
          </h2>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <Table
          columns={columns}
          data={transactions}
          onRowClick={(transaction) =>
            showToast({
              type: 'info',
              title: 'Transaction clicked',
              message: `You clicked on transaction ${transaction.id}`,
            })
          }
        />
      </div>

      {/* Loading States Demo */}
      <Card className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Loading States Examples
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton width="100%" height="20px" />
            <Skeleton width="80%" height="20px" />
            <Skeleton width="60%" height="20px" />
          </div>
          <div className="flex gap-4">
            <Skeleton variant="circular" width="48px" height="48px" />
            <div className="flex-1 space-y-2">
              <Skeleton width="40%" height="16px" />
              <Skeleton width="60%" height="16px" />
            </div>
          </div>
        </div>
      </Card>

      {/* Modal Example */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Request Payment"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setModalOpen(false)
                showToast({
                  type: 'success',
                  title: 'Payment requested',
                  message: 'Payment request has been sent',
                })
              }}
            >
              Send Request
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            This is a modal dialog example. You can put any content here including
            forms, images, or other components.
          </p>
          <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
            <p className="text-sm text-primary-700 dark:text-primary-300">
              This modal demonstrates the overlay, animations, and flexible content
              layout.
            </p>
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
