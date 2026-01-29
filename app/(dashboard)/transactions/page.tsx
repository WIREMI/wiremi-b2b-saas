'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Receipt,
  Download,
  Filter,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Table from '@/components/ui/table'
import { formatNumber, formatRelativeTime } from '@/lib/utils'

interface Transaction {
  id: string
  type: 'credit' | 'debit'
  category: 'payment' | 'transfer' | 'exchange' | 'fee' | 'refund'
  description: string
  amount: number
  currency: string
  currencySymbol: string
  wallet: string
  counterparty: string
  reference?: string
  status: 'completed' | 'pending' | 'failed'
  date: Date
  paymentMethod?: string
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterWallet, setFilterWallet] = useState('all')
  const [dateRange, setDateRange] = useState('30d')
  const [showFilters, setShowFilters] = useState(false)

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: 'TX-001',
      type: 'credit',
      category: 'payment',
      description: 'Payment received from Acme Inc.',
      amount: 5000.00,
      currency: 'USD',
      currencySymbol: '$',
      wallet: 'Main Operating Account',
      counterparty: 'Acme Inc.',
      reference: 'INV-2026-001',
      status: 'completed',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'TX-002',
      type: 'debit',
      category: 'transfer',
      description: 'Transfer to Euro Operations',
      amount: 3000.00,
      currency: 'USD',
      currencySymbol: '$',
      wallet: 'Main Operating Account',
      counterparty: 'Euro Operations',
      status: 'completed',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000),
      paymentMethod: 'Internal Transfer',
    },
    {
      id: 'TX-003',
      type: 'credit',
      category: 'refund',
      description: 'Refund from vendor',
      amount: 450.00,
      currency: 'USD',
      currencySymbol: '$',
      wallet: 'Main Operating Account',
      counterparty: 'Tech Supplies Co.',
      status: 'completed',
      date: new Date(Date.now() - 8 * 60 * 60 * 1000),
      paymentMethod: 'Credit Card',
    },
    {
      id: 'TX-004',
      type: 'debit',
      category: 'payment',
      description: 'Payment to contractor',
      amount: 2500.00,
      currency: 'USD',
      currencySymbol: '$',
      wallet: 'Main Operating Account',
      counterparty: 'John Doe Consulting',
      reference: 'PAYROLL-JAN-2026',
      status: 'pending',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      paymentMethod: 'Bank Transfer',
    },
    {
      id: 'TX-005',
      type: 'debit',
      category: 'fee',
      description: 'Transaction fee',
      amount: 15.00,
      currency: 'USD',
      currencySymbol: '$',
      wallet: 'Main Operating Account',
      counterparty: 'Wiremi',
      status: 'completed',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      paymentMethod: 'Auto-debit',
    },
    {
      id: 'TX-006',
      type: 'credit',
      category: 'payment',
      description: 'Customer payment - Invoice #1234',
      amount: 8900.00,
      currency: 'USD',
      currencySymbol: '$',
      wallet: 'Main Operating Account',
      counterparty: 'Global Partners Ltd.',
      reference: 'INV-1234',
      status: 'completed',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      paymentMethod: 'Wire Transfer',
    },
    {
      id: 'TX-007',
      type: 'debit',
      category: 'exchange',
      description: 'Currency exchange to EUR',
      amount: 5000.00,
      currency: 'USD',
      currencySymbol: '$',
      wallet: 'Main Operating Account',
      counterparty: 'Currency Exchange',
      status: 'completed',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      paymentMethod: 'FX Exchange',
    },
    {
      id: 'TX-008',
      type: 'credit',
      category: 'transfer',
      description: 'Transfer from UK Payroll',
      amount: 12000.00,
      currency: 'USD',
      currencySymbol: '$',
      wallet: 'Main Operating Account',
      counterparty: 'UK Payroll',
      status: 'completed',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      paymentMethod: 'Internal Transfer',
    },
    {
      id: 'TX-009',
      type: 'debit',
      category: 'payment',
      description: 'Vendor payment - Office supplies',
      amount: 1250.00,
      currency: 'EUR',
      currencySymbol: '€',
      wallet: 'Euro Operations',
      counterparty: 'Office Depot EU',
      reference: 'PO-2026-045',
      status: 'completed',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      paymentMethod: 'SEPA Transfer',
    },
    {
      id: 'TX-010',
      type: 'credit',
      category: 'payment',
      description: 'Subscription payment',
      amount: 3500.00,
      currency: 'GBP',
      currencySymbol: '£',
      wallet: 'UK Payroll',
      counterparty: 'Software Solutions Ltd.',
      status: 'failed',
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      paymentMethod: 'Direct Debit',
    },
  ]

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType =
      filterType === 'all' ||
      (filterType === 'credit' && tx.type === 'credit') ||
      (filterType === 'debit' && tx.type === 'debit')

    const matchesStatus =
      filterStatus === 'all' || tx.status === filterStatus

    const matchesWallet =
      filterWallet === 'all' || tx.wallet === filterWallet

    return matchesSearch && matchesType && matchesStatus && matchesWallet
  })

  // Calculate totals
  const totalCredit = filteredTransactions
    .filter(tx => tx.type === 'credit' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalDebit = filteredTransactions
    .filter(tx => tx.type === 'debit' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const columns = [
    {
      key: 'id',
      label: 'Transaction ID',
      sortable: true,
      render: (tx: Transaction) => (
        <Link
          href={`/transactions/${tx.id}`}
          className="text-sm font-medium text-primary-500 hover:text-primary-600"
        >
          {tx.id}
        </Link>
      ),
    },
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
            {tx.date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
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
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              {tx.counterparty}
            </p>
            {tx.reference && (
              <>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  {tx.reference}
                </p>
              </>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'wallet',
      label: 'Wallet',
      render: (tx: Transaction) => (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {tx.wallet}
        </p>
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
            {tx.currencySymbol}{formatNumber(tx.amount)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
            {tx.currency}
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
  ]

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
              Transactions
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              View and manage all your transaction history
            </p>
          </div>
          <div className="flex items-center gap-6 text-[13px]">
            <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between mb-2">
              <Receipt className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {filteredTransactions.length}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Total Transactions
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between mb-2">
              <ArrowDownRight className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                ${formatNumber(totalCredit)}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Total Inflows
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between mb-2">
              <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                ${formatNumber(totalDebit)}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Total Outflows
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by ID, description, counterparty, or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-3 text-[13px] bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-gray-400"
            />
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-9 px-3 text-[13px] font-medium bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{showFilters ? 'Hide' : 'More'} Filters</span>
          </button>
        </div>

        {/* Extended Filters (Collapsible) */}
        {showFilters && (
          <div className="grid grid-cols-3 gap-3 p-4 bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/40">
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-2">
                Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full h-9 px-3 text-[13px] font-medium bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="credit">Credits Only</option>
                <option value="debit">Debits Only</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full h-9 px-3 text-[13px] font-medium bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-2">
                Wallet
              </label>
              <select
                value={filterWallet}
                onChange={(e) => setFilterWallet(e.target.value)}
                className="w-full h-9 px-3 text-[13px] font-medium bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
              >
                <option value="all">All Wallets</option>
                <option value="Main Operating Account">Main Operating Account</option>
                <option value="Euro Operations">Euro Operations</option>
                <option value="UK Payroll">UK Payroll</option>
              </select>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/40 overflow-hidden">
          <Table
            columns={columns}
            data={filteredTransactions}
            emptyMessage="No transactions found matching your filters"
          />
        </div>
      </div>
    </PageLayout>
  )
}
