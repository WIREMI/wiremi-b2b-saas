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
  MoreHorizontal,
  Globe,
  Building2,
  CreditCard,
  ChevronRight,
  Copy,
  ExternalLink,
  Filter,
  ArrowRightLeft,
  Send,
  QrCode,
  Banknote,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { formatCurrency, formatNumber } from '@/lib/utils'

type TabType = 'overview' | 'global-accounts' | 'balances' | 'activity'

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
  accountDetails?: {
    accountNumber: string
    routingNumber?: string
    iban?: string
    swiftBic?: string
    bankName: string
    bankAddress?: string
  }
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

interface GlobalAccount {
  id: string
  currency: string
  currencyName: string
  flag: string
  accountNumber: string
  routingNumber?: string
  iban?: string
  swiftBic: string
  bankName: string
  bankAddress: string
  status: 'active' | 'pending' | 'suspended'
  balance: number
  symbol: string
}

export default function WalletsPage() {
  const [balancesHidden, setBalancesHidden] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null)

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
      accountDetails: {
        accountNumber: '8827364512',
        routingNumber: '021000021',
        swiftBic: 'WIRMIUS33',
        bankName: 'Wiremi Financial Services',
        bankAddress: '100 Financial Center, New York, NY 10004',
      },
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
      accountDetails: {
        accountNumber: 'DE89370400440532013000',
        iban: 'DE89370400440532013000',
        swiftBic: 'WIRMIEUR',
        bankName: 'Wiremi Europe GmbH',
        bankAddress: 'Finanzplatz 1, 60311 Frankfurt, Germany',
      },
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
      accountDetails: {
        accountNumber: '12345678',
        routingNumber: '20-00-00',
        iban: 'GB33BUKB20201555555555',
        swiftBic: 'WIRMIGB2L',
        bankName: 'Wiremi UK Ltd',
        bankAddress: '1 Canada Square, London E14 5AA',
      },
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
      accountDetails: {
        accountNumber: '0012345678',
        swiftBic: 'WIRMISGSG',
        bankName: 'Wiremi Singapore Pte Ltd',
        bankAddress: '1 Raffles Place, Singapore 048616',
      },
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
      accountDetails: {
        accountNumber: '1234567890',
        routingNumber: '00260',
        swiftBic: 'WIRMICATT',
        bankName: 'Wiremi Canada Inc',
        bankAddress: '200 Bay Street, Toronto, ON M5J 2J5',
      },
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

  // Global Accounts data
  const globalAccounts: GlobalAccount[] = [
    {
      id: 'ga-1',
      currency: 'USD',
      currencyName: 'US Dollar',
      flag: '🇺🇸',
      accountNumber: '8827364512',
      routingNumber: '021000021',
      swiftBic: 'WIRMIUS33',
      bankName: 'Wiremi Financial Services',
      bankAddress: '100 Financial Center, New York, NY 10004, USA',
      status: 'active',
      balance: 125430.50,
      symbol: '$',
    },
    {
      id: 'ga-2',
      currency: 'EUR',
      currencyName: 'Euro',
      flag: '🇪🇺',
      accountNumber: 'DE89370400440532013000',
      iban: 'DE89370400440532013000',
      swiftBic: 'WIRMIEUR',
      bankName: 'Wiremi Europe GmbH',
      bankAddress: 'Finanzplatz 1, 60311 Frankfurt, Germany',
      status: 'active',
      balance: 87250.00,
      symbol: '€',
    },
    {
      id: 'ga-3',
      currency: 'GBP',
      currencyName: 'British Pound',
      flag: '🇬🇧',
      accountNumber: '12345678',
      routingNumber: '20-00-00',
      iban: 'GB33BUKB20201555555555',
      swiftBic: 'WIRMIGB2L',
      bankName: 'Wiremi UK Ltd',
      bankAddress: '1 Canada Square, London E14 5AA, UK',
      status: 'active',
      balance: 45890.25,
      symbol: '£',
    },
    {
      id: 'ga-4',
      currency: 'SGD',
      currencyName: 'Singapore Dollar',
      flag: '🇸🇬',
      accountNumber: '0012345678',
      swiftBic: 'WIRMISGSG',
      bankName: 'Wiremi Singapore Pte Ltd',
      bankAddress: '1 Raffles Place, Singapore 048616',
      status: 'active',
      balance: 62100.00,
      symbol: 'S$',
    },
    {
      id: 'ga-5',
      currency: 'AUD',
      currencyName: 'Australian Dollar',
      flag: '🇦🇺',
      accountNumber: '123456789',
      swiftBic: 'WIRMIAUSY',
      bankName: 'Wiremi Australia Pty Ltd',
      bankAddress: '1 Martin Place, Sydney NSW 2000',
      status: 'pending',
      balance: 0,
      symbol: 'A$',
    },
    {
      id: 'ga-6',
      currency: 'HKD',
      currencyName: 'Hong Kong Dollar',
      flag: '🇭🇰',
      accountNumber: '012345678901',
      swiftBic: 'WIRMIHKHH',
      bankName: 'Wiremi Hong Kong Ltd',
      bankAddress: '1 Queen\'s Road Central, Hong Kong',
      status: 'active',
      balance: 156000.00,
      symbol: 'HK$',
    },
  ]

  // Calculate total balance in USD (mock conversion)
  const totalBalanceUSD = wallets.reduce((total, wallet) => {
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
    return matchesSearch
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Would show toast notification here
  }

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: Wallet },
    { id: 'global-accounts' as TabType, label: 'Global Accounts', icon: Globe },
    { id: 'balances' as TabType, label: 'Balances', icon: Banknote },
    { id: 'activity' as TabType, label: 'Activity', icon: Clock },
  ]

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
              Wallets & Accounts
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your global accounts and multi-currency balances
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <Link href="/wallets/add">
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                Open Account
              </button>
            </Link>
          </div>
        </div>

        {/* Total Balance Card - Airwallex Style */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-dark-surface dark:to-dark-elevated rounded-2xl p-6 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Balance</p>
                  <p className="text-xs text-gray-500">Across all currencies (USD equivalent)</p>
                </div>
              </div>
              <button
                onClick={() => setBalancesHidden(!balancesHidden)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {balancesHidden ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-4xl font-bold tracking-tight tabular-nums">
                  {balancesHidden ? '••••••••' : formatCurrency(totalBalanceUSD, 'USD')}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+8.4%</span>
                  </div>
                  <span className="text-sm text-gray-500">vs last month</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Available</p>
                  <p className="text-lg font-semibold tabular-nums">
                    {balancesHidden ? '••••••' : formatCurrency(totalBalanceUSD - 15000, 'USD')}
                  </p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Pending</p>
                  <p className="text-lg font-semibold tabular-nums text-yellow-400">
                    {balancesHidden ? '••••••' : formatCurrency(15000, 'USD')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4">
          <button className="group flex flex-col items-center gap-3 p-5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-sm transition-all">
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-500/10 rounded-xl flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-500/20 transition-colors">
              <Send className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">Send Money</span>
          </button>

          <button className="group flex flex-col items-center gap-3 p-5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-sm transition-all">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-500/20 transition-colors">
              <ArrowDownRight className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">Add Funds</span>
          </button>

          <button className="group flex flex-col items-center gap-3 p-5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-sm transition-all">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors">
              <ArrowRightLeft className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">Convert</span>
          </button>

          <button className="group flex flex-col items-center gap-3 p-5 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-sm transition-all">
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20 transition-colors">
              <QrCode className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">Receive</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-dark-border">
          <nav className="flex gap-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white dark:bg-dark-surface rounded-xl p-4 border border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{globalAccounts.filter(a => a.status === 'active').length}</span>
                </div>
                <p className="text-sm text-gray-500">Active Accounts</p>
              </div>

              <div className="bg-white dark:bg-dark-surface rounded-xl p-4 border border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-500/10 rounded-lg flex items-center justify-center">
                    <ArrowDownRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">$284.5K</span>
                </div>
                <p className="text-sm text-gray-500">Inflows (30d)</p>
              </div>

              <div className="bg-white dark:bg-dark-surface rounded-xl p-4 border border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-red-50 dark:bg-red-500/10 rounded-lg flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">$198.2K</span>
                </div>
                <p className="text-sm text-gray-500">Outflows (30d)</p>
              </div>

              <div className="bg-white dark:bg-dark-surface rounded-xl p-4 border border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">605</span>
                </div>
                <p className="text-sm text-gray-500">Transactions (30d)</p>
              </div>
            </div>

            {/* Currency Balances Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Currency Balances</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search currencies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 w-64"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWallets.map((wallet) => {
                  const isPositiveChange = wallet.change24h.percentage >= 0

                  return (
                    <Link key={wallet.id} href={`/wallets/${wallet.id}`}>
                      <div className="group bg-white dark:bg-dark-surface rounded-xl p-5 border border-gray-200 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md transition-all cursor-pointer">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-50 dark:bg-dark-elevated rounded-xl flex items-center justify-center text-2xl">
                              {wallet.flag}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900 dark:text-white">{wallet.currency}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  wallet.status === 'active'
                                    ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                                    : 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                                }`}>
                                  {wallet.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 truncate max-w-[140px]">{wallet.name}</p>
                            </div>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 dark:hover:bg-dark-elevated rounded-lg transition-all">
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>

                        <div className="mb-3">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white tabular-nums">
                            {balancesHidden ? '••••••' : `${wallet.currencySymbol}${formatNumber(wallet.balance)}`}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-sm">
                            <span className="text-gray-500">
                              Avail: {balancesHidden ? '••••' : `${wallet.currencySymbol}${formatNumber(wallet.availableBalance)}`}
                            </span>
                            {wallet.pendingBalance > 0 && (
                              <span className="text-yellow-600 dark:text-yellow-400">
                                Pending: {balancesHidden ? '••••' : `${wallet.currencySymbol}${formatNumber(wallet.pendingBalance)}`}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-dark-border">
                          <div className="flex items-center gap-1.5">
                            {isPositiveChange ? (
                              <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                            ) : (
                              <TrendingDown className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                            )}
                            <span className={`text-sm font-medium ${
                              isPositiveChange ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                              {isPositiveChange ? '+' : ''}{wallet.change24h.percentage}%
                            </span>
                            <span className="text-xs text-gray-400">24h</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  )
                })}

                {/* Add New Currency Card */}
                <Link href="/wallets/add">
                  <div className="flex flex-col items-center justify-center h-full min-h-[180px] bg-gray-50 dark:bg-dark-elevated rounded-xl border-2 border-dashed border-gray-200 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-500 hover:bg-white dark:hover:bg-dark-surface transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-dark-surface rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary-50 dark:group-hover:bg-primary-500/10 transition-colors">
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-primary-500" />
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      Add Currency
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'global-accounts' && (
          <div className="space-y-6">
            {/* Info Banner */}
            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">Global Account Details</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Share these details with your clients and partners to receive payments in multiple currencies without conversion fees.
                  </p>
                </div>
              </div>
            </div>

            {/* Global Accounts List */}
            <div className="space-y-4">
              {globalAccounts.map((account) => (
                <div
                  key={account.id}
                  className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-50 dark:bg-dark-elevated rounded-xl flex items-center justify-center text-3xl">
                          {account.flag}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {account.currency} - {account.currencyName}
                            </h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              account.status === 'active'
                                ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                                : 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                            }`}>
                              {account.status === 'active' ? (
                                <CheckCircle2 className="w-3 h-3" />
                              ) : (
                                <AlertCircle className="w-3 h-3" />
                              )}
                              {account.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{account.bankName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Balance</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
                          {balancesHidden ? '••••••' : `${account.symbol}${formatNumber(account.balance)}`}
                        </p>
                      </div>
                    </div>

                    {/* Account Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-dark-elevated rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Account Number</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                            {account.accountNumber}
                          </p>
                          <button
                            onClick={() => copyToClipboard(account.accountNumber)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-dark-border rounded transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      {account.routingNumber && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Routing Number</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                              {account.routingNumber}
                            </p>
                            <button
                              onClick={() => copyToClipboard(account.routingNumber!)}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-dark-border rounded transition-colors"
                            >
                              <Copy className="w-3.5 h-3.5 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      )}

                      {account.iban && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">IBAN</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-mono font-medium text-gray-900 dark:text-white truncate max-w-[180px]">
                              {account.iban}
                            </p>
                            <button
                              onClick={() => copyToClipboard(account.iban!)}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-dark-border rounded transition-colors"
                            >
                              <Copy className="w-3.5 h-3.5 text-gray-400" />
                            </button>
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-xs text-gray-500 mb-1">SWIFT/BIC</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                            {account.swiftBic}
                          </p>
                          <button
                            onClick={() => copyToClipboard(account.swiftBic)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-dark-border rounded transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 md:col-span-4">
                        <p className="text-xs text-gray-500 mb-1">Bank Address</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{account.bankAddress}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between px-5 py-3 bg-gray-50 dark:bg-dark-elevated border-t border-gray-100 dark:border-dark-border">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                        <QrCode className="w-4 h-4" />
                        Show QR
                      </button>
                      <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        <ExternalLink className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                    <Link href={`/wallets/${account.id}`}>
                      <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Request New Account */}
            <div className="flex items-center justify-center p-6 bg-gray-50 dark:bg-dark-elevated rounded-xl border-2 border-dashed border-gray-200 dark:border-dark-border">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 dark:bg-dark-surface rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-5 h-5 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Need another currency?</h4>
                <p className="text-sm text-gray-500 mb-4">Request a new global account in any supported currency</p>
                <button className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                  Request Account
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'balances' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by currency or account name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Detailed Balance List */}
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
              <div className="grid grid-cols-6 gap-4 px-5 py-3 bg-gray-50 dark:bg-dark-elevated border-b border-gray-200 dark:border-dark-border text-sm font-medium text-gray-500">
                <div className="col-span-2">Currency</div>
                <div className="text-right">Total Balance</div>
                <div className="text-right">Available</div>
                <div className="text-right">Pending</div>
                <div className="text-right">24h Change</div>
              </div>

              {filteredWallets.map((wallet, index) => {
                const isPositiveChange = wallet.change24h.percentage >= 0

                return (
                  <Link key={wallet.id} href={`/wallets/${wallet.id}`}>
                    <div className={`grid grid-cols-6 gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors cursor-pointer ${
                      index !== filteredWallets.length - 1 ? 'border-b border-gray-100 dark:border-dark-border' : ''
                    }`}>
                      <div className="col-span-2 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 dark:bg-dark-elevated rounded-lg flex items-center justify-center text-xl">
                          {wallet.flag}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{wallet.currency}</p>
                          <p className="text-sm text-gray-500 truncate max-w-[200px]">{wallet.name}</p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col justify-center">
                        <p className="font-semibold text-gray-900 dark:text-white tabular-nums">
                          {balancesHidden ? '••••••' : `${wallet.currencySymbol}${formatNumber(wallet.balance)}`}
                        </p>
                      </div>
                      <div className="text-right flex flex-col justify-center">
                        <p className="text-gray-700 dark:text-gray-300 tabular-nums">
                          {balancesHidden ? '••••' : `${wallet.currencySymbol}${formatNumber(wallet.availableBalance)}`}
                        </p>
                      </div>
                      <div className="text-right flex flex-col justify-center">
                        <p className={`tabular-nums ${wallet.pendingBalance > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400'}`}>
                          {balancesHidden ? '••••' : wallet.pendingBalance > 0 ? `${wallet.currencySymbol}${formatNumber(wallet.pendingBalance)}` : '-'}
                        </p>
                      </div>
                      <div className="text-right flex items-center justify-end gap-1.5">
                        {isPositiveChange ? (
                          <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                        )}
                        <span className={`font-medium tabular-nums ${
                          isPositiveChange ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {isPositiveChange ? '+' : ''}{wallet.change24h.percentage}%
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border">
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-dark-border">
                <h3 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                <div className="flex items-center gap-3">
                  <select className="text-sm bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                    <option>All currencies</option>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                  <select className="text-sm bg-gray-50 dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-dark-border">
                {[
                  { type: 'credit', description: 'Payment received from Acme Inc.', amount: 5000, currency: 'USD', symbol: '$', date: '2 hours ago', status: 'completed' },
                  { type: 'debit', description: 'Transfer to Euro Operations', amount: 3000, currency: 'USD', symbol: '$', date: '5 hours ago', status: 'completed' },
                  { type: 'credit', description: 'Refund from Tech Supplies Co.', amount: 450, currency: 'USD', symbol: '$', date: '8 hours ago', status: 'completed' },
                  { type: 'debit', description: 'Payment to contractor', amount: 2500, currency: 'EUR', symbol: '€', date: '1 day ago', status: 'pending' },
                  { type: 'credit', description: 'Customer payment - Invoice #1234', amount: 8900, currency: 'GBP', symbol: '£', date: '2 days ago', status: 'completed' },
                ].map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'credit'
                          ? 'bg-green-50 dark:bg-green-500/10'
                          : 'bg-red-50 dark:bg-red-500/10'
                      }`}>
                        {tx.type === 'credit' ? (
                          <ArrowDownRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{tx.description}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm text-gray-500">{tx.date}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            tx.status === 'completed'
                              ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                              : 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                          }`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold tabular-nums ${
                        tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {tx.type === 'credit' ? '+' : '-'}{tx.symbol}{formatNumber(tx.amount)}
                      </p>
                      <p className="text-sm text-gray-500">{tx.currency}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-dark-border">
                <button className="w-full py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                  View All Transactions
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredWallets.length === 0 && activeTab !== 'global-accounts' && activeTab !== 'activity' && (
          <div className="bg-white dark:bg-dark-surface rounded-xl p-12 border border-gray-200 dark:border-dark-border text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-dark-elevated rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No wallets found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery
                ? `No wallets match "${searchQuery}"`
                : 'Get started by creating your first wallet'}
            </p>
            {!searchQuery && (
              <Link href="/wallets/add">
                <button className="px-6 py-3 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                  Create Your First Wallet
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
