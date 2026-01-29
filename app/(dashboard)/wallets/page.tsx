'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Wallet,
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
  Search,
  MoreVertical,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface WalletData {
  id: string
  name: string
  currency: string
  currencySymbol: string
  flag: string
  balance: number
  availableBalance: number
  pendingBalance: number
  status: 'active' | 'frozen' | 'pending'
  lastTransaction: {
    type: 'credit' | 'debit'
    amount: number
    date: string
  }
  change24h: {
    amount: number
    percentage: number
  }
  transactions30d: number
}

export default function WalletsPage() {
  const [balancesHidden, setBalancesHidden] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'frozen'>('all')

  // Mock wallet data
  const wallets: WalletData[] = [
    {
      id: '1',
      name: 'Main Operating Account',
      currency: 'USD',
      currencySymbol: '$',
      flag: '🇺🇸',
      balance: 125430.50,
      availableBalance: 120430.50,
      pendingBalance: 5000.00,
      status: 'active',
      lastTransaction: {
        type: 'credit',
        amount: 5000.00,
        date: '2 hours ago',
      },
      change24h: {
        amount: 12430.50,
        percentage: 11.2,
      },
      transactions30d: 248,
    },
    {
      id: '2',
      name: 'Euro Operations',
      currency: 'EUR',
      currencySymbol: '€',
      flag: '🇪🇺',
      balance: 87250.00,
      availableBalance: 87250.00,
      pendingBalance: 0,
      status: 'active',
      lastTransaction: {
        type: 'debit',
        amount: 3200.00,
        date: '5 hours ago',
      },
      change24h: {
        amount: -2100.00,
        percentage: -2.4,
      },
      transactions30d: 156,
    },
    {
      id: '3',
      name: 'UK Payroll',
      currency: 'GBP',
      currencySymbol: '£',
      flag: '🇬🇧',
      balance: 45890.25,
      availableBalance: 35890.25,
      pendingBalance: 10000.00,
      status: 'active',
      lastTransaction: {
        type: 'debit',
        amount: 8500.00,
        date: '1 day ago',
      },
      change24h: {
        amount: 1890.25,
        percentage: 4.3,
      },
      transactions30d: 89,
    },
    {
      id: '4',
      name: 'Asia-Pacific Reserve',
      currency: 'SGD',
      currencySymbol: 'S$',
      flag: '🇸🇬',
      balance: 62100.00,
      availableBalance: 62100.00,
      pendingBalance: 0,
      status: 'active',
      lastTransaction: {
        type: 'credit',
        amount: 12000.00,
        date: '3 days ago',
      },
      change24h: {
        amount: 5100.00,
        percentage: 8.9,
      },
      transactions30d: 45,
    },
    {
      id: '5',
      name: 'Vendor Payments',
      currency: 'CAD',
      currencySymbol: 'C$',
      flag: '🇨🇦',
      balance: 28650.75,
      availableBalance: 28650.75,
      pendingBalance: 0,
      status: 'active',
      lastTransaction: {
        type: 'debit',
        amount: 1850.00,
        date: '4 days ago',
      },
      change24h: {
        amount: -450.75,
        percentage: -1.5,
      },
      transactions30d: 67,
    },
  ]

  // Calculate total balance in USD (mock conversion)
  const totalBalanceUSD = wallets.reduce((total, wallet) => {
    // Mock conversion rates
    const rates: Record<string, number> = {
      USD: 1,
      EUR: 1.09,
      GBP: 1.27,
      SGD: 0.74,
      CAD: 0.74,
    }
    return total + (wallet.balance * rates[wallet.currency])
  }, 0)

  const filteredWallets = wallets.filter((wallet) => {
    const matchesSearch = wallet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         wallet.currency.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || wallet.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
              Wallets
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Manage your multi-currency wallets and balances
            </p>
          </div>
          <div className="flex items-center gap-6 text-[13px]">
            <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
            <button className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Wallet</span>
            </button>
          </div>
        </div>

        {/* Total Balance Card */}
        <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-200/60 dark:border-gray-700/40">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Total Balance (USD Equivalent)
                </p>
                <button
                  onClick={() => setBalancesHidden(!balancesHidden)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {balancesHidden ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <div className="flex items-baseline gap-4">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white tabular-nums">
                  {balancesHidden ? '••••••' : formatCurrency(totalBalanceUSD, 'USD')}
                </h2>
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[13px] font-medium">+8.4%</span>
                  <span className="text-[11px] text-gray-500">vs last month</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1">Available</p>
                <p className="text-[15px] font-semibold text-gray-900 dark:text-white tabular-nums">
                  {balancesHidden ? '••••••' : formatCurrency(totalBalanceUSD - 15000, 'USD')}
                </p>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-gray-700" />
              <div className="text-right">
                <p className="text-[11px] text-gray-500 uppercase tracking-wide mb-1">Pending</p>
                <p className="text-[15px] font-semibold text-gray-900 dark:text-white tabular-nums">
                  {balancesHidden ? '••••••' : formatCurrency(15000, 'USD')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {wallets.length}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Active Wallets
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between mb-2">
              <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {formatCurrency(284500, 'USD')}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Total Inflows (30d)
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
            <div className="flex items-center justify-between mb-2">
              <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {formatCurrency(198200, 'USD')}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Total Outflows (30d)
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search wallets by name or currency..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-3 text-[13px] bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-gray-400"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'active' | 'frozen')}
            className="h-9 px-3 text-[13px] font-medium bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
          >
            <option value="all">All ({wallets.length})</option>
            <option value="active">Active ({wallets.filter(w => w.status === 'active').length})</option>
          </select>
          <button className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>

        {/* Wallets List */}
        <div className="space-y-2">
          {filteredWallets.map((wallet) => {
            const isPositiveChange = wallet.change24h.percentage >= 0

            return (
              <Link key={wallet.id} href={`/wallets/${wallet.id}`}>
                <div className="group bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    {/* Flag Icon */}
                    <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center text-xl shrink-0">
                      {wallet.flag}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Title + Currency */}
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white truncate">
                          {wallet.name}
                        </h3>
                        <span className="text-[11px] font-medium text-gray-400 uppercase">{wallet.currency}</span>
                      </div>

                      {/* Balance */}
                      <div className="mb-2">
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                          {balancesHidden
                            ? '••••••'
                            : `${wallet.currencySymbol}${formatNumber(wallet.balance)}`}
                        </p>
                        <div className="flex items-center gap-3 text-[12px] text-gray-500 mt-1">
                          <span>
                            Available: {balancesHidden ? '••••' : `${wallet.currencySymbol}${formatNumber(wallet.availableBalance)}`}
                          </span>
                          {wallet.pendingBalance > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-orange-600 dark:text-orange-400">
                                Pending: {balancesHidden ? '••••' : `${wallet.currencySymbol}${formatNumber(wallet.pendingBalance)}`}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Metrics - inline */}
                      <div className="flex items-center gap-6 text-[12px]">
                        <div className="flex items-center gap-1.5">
                          {isPositiveChange ? (
                            <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                          )}
                          <span className={`font-medium ${isPositiveChange ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {isPositiveChange ? '+' : ''}{wallet.change24h.percentage}% (24h)
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <span>{wallet.transactions30d} transactions (30d)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <span className={wallet.lastTransaction.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                            Last: {wallet.lastTransaction.type === 'credit' ? '+' : '-'}
                            {wallet.currencySymbol}{formatNumber(wallet.lastTransaction.amount)}
                          </span>
                          <span>•</span>
                          <span>{wallet.lastTransaction.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover-revealed action */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredWallets.length === 0 && (
          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-12 border border-gray-200/60 dark:border-gray-700/40 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700/50 rounded-full mb-4">
              <Wallet className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-2">
              No wallets found
            </h3>
            <p className="text-[13px] text-gray-600 dark:text-gray-400 mb-4">
              {searchQuery
                ? `No wallets match "${searchQuery}"`
                : 'Get started by creating your first wallet'}
            </p>
            {!searchQuery && (
              <button className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5 mx-auto">
                <Plus className="w-3.5 h-3.5" />
                <span>Create Wallet</span>
              </button>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
