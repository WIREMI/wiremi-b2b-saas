'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Send,
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Calendar,
  Search,
  Eye,
  EyeOff,
  MoreVertical,
  Settings,
  Lock,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Table from '@/components/ui/table'
import { formatCurrency, formatNumber, formatRelativeTime } from '@/lib/utils'

interface Transaction {
  id: string
  type: 'credit' | 'debit'
  category: 'payment' | 'transfer' | 'exchange' | 'fee' | 'refund'
  description: string
  amount: number
  balanceAfter: number
  counterparty: string
  reference?: string
  status: 'completed' | 'pending' | 'failed'
  date: Date
}

export default function WalletDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [balanceHidden, setBalanceHidden] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [dateRange, setDateRange] = useState('30d')

  // Mock wallet data (would fetch based on params.id)
  const wallet = {
    id: params.id,
    name: 'Main Operating Account',
    currency: 'USD',
    currencySymbol: '$',
    flag: '🇺🇸',
    balance: 125430.50,
    availableBalance: 120430.50,
    pendingBalance: 5000.00,
    reservedBalance: 0,
    status: 'active',
    accountNumber: '****4532',
    createdDate: new Date('2025-01-01'),
  }

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      category: 'payment',
      description: 'Payment received from Acme Inc.',
      amount: 5000.00,
      balanceAfter: 125430.50,
      counterparty: 'Acme Inc.',
      reference: 'INV-2026-001',
      status: 'completed',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'debit',
      category: 'transfer',
      description: 'Transfer to Euro Operations',
      amount: 3000.00,
      balanceAfter: 120430.50,
      counterparty: 'Euro Operations',
      status: 'completed',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: '3',
      type: 'credit',
      category: 'refund',
      description: 'Refund from vendor',
      amount: 450.00,
      balanceAfter: 123430.50,
      counterparty: 'Tech Supplies Co.',
      status: 'completed',
      date: new Date(Date.now() - 8 * 60 * 60 * 1000),
    },
    {
      id: '4',
      type: 'debit',
      category: 'payment',
      description: 'Payment to contractor',
      amount: 2500.00,
      balanceAfter: 122980.50,
      counterparty: 'John Doe Consulting',
      reference: 'PAYROLL-JAN-2026',
      status: 'pending',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: '5',
      type: 'debit',
      category: 'fee',
      description: 'Transaction fee',
      amount: 15.00,
      balanceAfter: 125480.50,
      counterparty: 'Wiremi',
      status: 'completed',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: '6',
      type: 'credit',
      category: 'payment',
      description: 'Customer payment - Invoice #1234',
      amount: 8900.00,
      balanceAfter: 125495.50,
      counterparty: 'Global Partners Ltd.',
      reference: 'INV-1234',
      status: 'completed',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: '7',
      type: 'debit',
      category: 'exchange',
      description: 'Currency exchange to EUR',
      amount: 5000.00,
      balanceAfter: 116595.50,
      counterparty: 'Currency Exchange',
      status: 'completed',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: '8',
      type: 'credit',
      category: 'transfer',
      description: 'Transfer from UK Payroll',
      amount: 12000.00,
      balanceAfter: 121595.50,
      counterparty: 'UK Payroll',
      status: 'completed',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
  ]

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType =
      filterType === 'all' ||
      (filterType === 'credit' && tx.type === 'credit') ||
      (filterType === 'debit' && tx.type === 'debit')

    return matchesSearch && matchesType
  })

  const columns = [
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (tx: Transaction) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {formatRelativeTime(tx.date)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
            {tx.date.toLocaleDateString()}
          </p>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (tx: Transaction) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {tx.description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
            {tx.counterparty}
            {tx.reference && ` • ${tx.reference}`}
          </p>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (tx: Transaction) => (
        <Badge
          variant={
            tx.category === 'payment' ? 'info' :
            tx.category === 'transfer' ? 'default' :
            tx.category === 'exchange' ? 'warning' :
            tx.category === 'fee' ? 'error' : 'success'
          }
          size="sm"
        >
          {tx.category.charAt(0).toUpperCase() + tx.category.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      className: 'text-right',
      render: (tx: Transaction) => (
        <div className="text-right">
          <p className={`text-sm font-semibold ${
            tx.type === 'credit' ? 'text-success' : 'text-error'
          }`}>
            {tx.type === 'credit' ? '+' : '-'}
            {wallet.currencySymbol}{formatNumber(tx.amount)}
          </p>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (tx: Transaction) => (
        <Badge
          variant={
            tx.status === 'completed' ? 'success' :
            tx.status === 'pending' ? 'warning' : 'error'
          }
          size="sm"
        >
          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: 'balanceAfter',
      label: 'Balance',
      className: 'text-right',
      render: (tx: Transaction) => (
        <p className="text-sm text-gray-600 dark:text-gray-400 text-right">
          {balanceHidden ? '••••••' : `${wallet.currencySymbol}${formatNumber(tx.balanceAfter)}`}
        </p>
      ),
    },
  ]

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.back()}
          className="mb-4"
        >
          Back to Wallets
        </Button>

        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 dark:bg-dark-bg rounded-2xl flex items-center justify-center text-3xl">
              {wallet.flag}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {wallet.name}
              </h1>
              <div className="flex items-center gap-3">
                <p className="text-gray-600 dark:text-gray-400">
                  {wallet.currency} • Account {wallet.accountNumber}
                </p>
                <Badge variant="success" size="sm">
                  {wallet.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Settings className="w-4 h-4" />}
            >
              Settings
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={<MoreVertical className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="stat" gradient="primary" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-white/80">Total Balance</p>
              <button
                onClick={() => setBalanceHidden(!balanceHidden)}
                className="text-white/60 hover:text-white transition-colors"
              >
                {balanceHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-3xl font-bold text-white mb-1">
              {balanceHidden ? '••••••' : `${wallet.currencySymbol}${formatNumber(wallet.balance)}`}
            </p>
            <div className="flex items-center gap-1 text-white/90">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">+11.2% this month</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
              <Lock className="w-4 h-4 text-success" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {balanceHidden ? '••••••' : `${wallet.currencySymbol}${formatNumber(wallet.availableBalance)}`}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ready for withdrawal
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {balanceHidden ? '••••••' : `${wallet.currencySymbol}${formatNumber(wallet.pendingBalance)}`}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              In processing
            </p>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Button
          variant="primary"
          size="lg"
          icon={<Send className="w-4 h-4" />}
          iconPosition="left"
          className="w-full"
          onClick={() => router.push(`/wallets/send-money?wallet=${wallet.id}`)}
        >
          Send Payment
        </Button>
        <Button
          variant="outline"
          size="lg"
          icon={<RefreshCw className="w-4 h-4" />}
          iconPosition="left"
          className="w-full"
          onClick={() => router.push(`/transfer?from=${wallet.id}`)}
        >
          Transfer Funds
        </Button>
        <Button
          variant="outline"
          size="lg"
          icon={<ArrowUpRight className="w-4 h-4" />}
          iconPosition="left"
          className="w-full"
          onClick={() => router.push(`/wallets/add-funds?wallet=${wallet.id}`)}
        >
          Add Funds
        </Button>
        <Button
          variant="outline"
          size="lg"
          icon={<Download className="w-4 h-4" />}
          iconPosition="left"
          className="w-full"
        >
          Export
        </Button>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Inflows & Outflows (30 days)
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <ArrowDownRight className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Inflows</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {wallet.currencySymbol}{formatNumber(89350)}
                  </p>
                </div>
              </div>
              <Badge variant="success" size="sm">+24%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-error" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Outflows</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {wallet.currencySymbol}{formatNumber(62180)}
                  </p>
                </div>
              </div>
              <Badge variant="error" size="sm">-18%</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Transaction Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">248</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Transaction</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {wallet.currencySymbol}{formatNumber(610)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">Largest Transaction</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {wallet.currencySymbol}{formatNumber(12000)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Transactions Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Transaction History
          </h2>
          <div className="flex items-center gap-3">
            <Select
              options={[
                { value: '7d', label: 'Last 7 days' },
                { value: '30d', label: 'Last 30 days' },
                { value: '90d', label: 'Last 90 days' },
                { value: 'all', label: 'All time' },
              ]}
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              iconPosition="left"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'primary' : 'outline'}
              size="md"
              onClick={() => setFilterType('all')}
            >
              All
            </Button>
            <Button
              variant={filterType === 'credit' ? 'primary' : 'outline'}
              size="md"
              onClick={() => setFilterType('credit')}
            >
              Credits
            </Button>
            <Button
              variant={filterType === 'debit' ? 'primary' : 'outline'}
              size="md"
              onClick={() => setFilterType('debit')}
            >
              Debits
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          data={filteredTransactions}
          emptyMessage="No transactions found"
        />
      </Card>
    </PageLayout>
  )
}
