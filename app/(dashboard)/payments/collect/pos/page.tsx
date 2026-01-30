'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Smartphone,
  Plus,
  Search,
  QrCode,
  CreditCard,
  Wallet,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Zap,
  CheckCircle2,
  Clock,
  MapPin,
  Shield,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock POS terminals data
const MOCK_POS_TERMINALS = [
  {
    id: 'pos-001',
    name: 'Main Store Counter',
    location: 'Downtown Store - Register 1',
    status: 'active' as const,
    deviceId: 'POS-DS-R1-001',
    todayTransactions: 45,
    todayRevenue: 3450,
    weekRevenue: 18900,
    monthRevenue: 78500,
    currency: 'USD',
    lastTransaction: '2026-01-20T14:30:00Z',
    activatedAt: '2026-01-01T09:00:00Z',
  },
  {
    id: 'pos-002',
    name: 'Mobile Sales Terminal',
    location: 'Events & Pop-ups',
    status: 'active' as const,
    deviceId: 'POS-MOBILE-002',
    todayTransactions: 23,
    todayRevenue: 1890,
    weekRevenue: 8700,
    monthRevenue: 34200,
    currency: 'USD',
    lastTransaction: '2026-01-20T13:15:00Z',
    activatedAt: '2026-01-05T10:00:00Z',
  },
  {
    id: 'pos-003',
    name: 'Restaurant Counter',
    location: 'Downtown Restaurant',
    status: 'active' as const,
    deviceId: 'POS-REST-001',
    todayTransactions: 67,
    todayRevenue: 5670,
    weekRevenue: 32400,
    monthRevenue: 142000,
    currency: 'USD',
    lastTransaction: '2026-01-20T14:45:00Z',
    activatedAt: '2025-12-15T08:00:00Z',
  },
  {
    id: 'pos-004',
    name: 'Warehouse Terminal',
    location: 'Warehouse - Pickup Station',
    status: 'offline' as const,
    deviceId: 'POS-WH-001',
    todayTransactions: 0,
    todayRevenue: 0,
    weekRevenue: 4500,
    monthRevenue: 18900,
    currency: 'USD',
    lastTransaction: '2026-01-19T17:30:00Z',
    activatedAt: '2026-01-10T11:00:00Z',
  },
]

// Mock recent transactions
const MOCK_POS_TRANSACTIONS = [
  {
    id: 'txn-pos-001',
    terminalId: 'pos-001',
    terminalName: 'Main Store Counter',
    amount: 125.50,
    currency: 'USD',
    method: 'card' as const,
    status: 'completed' as const,
    timestamp: '2026-01-20T14:30:00Z',
    reference: 'POS-001-20260120-143000',
  },
  {
    id: 'txn-pos-002',
    terminalId: 'pos-003',
    terminalName: 'Restaurant Counter',
    amount: 78.90,
    currency: 'USD',
    method: 'mobile-money' as const,
    status: 'completed' as const,
    timestamp: '2026-01-20T14:45:00Z',
    reference: 'POS-003-20260120-144500',
  },
  {
    id: 'txn-pos-003',
    terminalId: 'pos-002',
    terminalName: 'Mobile Sales Terminal',
    amount: 45.00,
    currency: 'USD',
    method: 'qr' as const,
    status: 'completed' as const,
    timestamp: '2026-01-20T13:15:00Z',
    reference: 'POS-002-20260120-131500',
  },
]

type POSStatus = 'active' | 'offline' | 'maintenance'

export default function POSPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<POSStatus | 'all'>('all')

  // Calculate statistics
  const stats = {
    totalTerminals: MOCK_POS_TERMINALS.length,
    activeTerminals: MOCK_POS_TERMINALS.filter((t) => t.status === 'active').length,
    todayTransactions: MOCK_POS_TERMINALS.reduce((sum, t) => sum + t.todayTransactions, 0),
    todayRevenue: MOCK_POS_TERMINALS.reduce((sum, t) => sum + t.todayRevenue, 0),
  }

  // Filter terminals
  const filteredTerminals = MOCK_POS_TERMINALS.filter((terminal) => {
    const matchesSearch =
      terminal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      terminal.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      terminal.deviceId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || terminal.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: POSStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Active</Badge>
      case 'offline':
        return <Badge variant="error" size="sm">Offline</Badge>
      case 'maintenance':
        return <Badge variant="warning" size="sm">Maintenance</Badge>
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-4 h-4" />
      case 'mobile-money':
        return <Smartphone className="w-4 h-4" />
      case 'qr':
        return <QrCode className="w-4 h-4" />
      case 'wallet':
        return <Wallet className="w-4 h-4" />
      default:
        return <DollarSign className="w-4 h-4" />
    }
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                In-Person POS
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Accept payments physically via QR, cards, or manual entry
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-5 h-5" />}
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push('/payments/collect/pos/activate')}
            >
              Activate Terminal
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Active Terminals"
            value={`${stats.activeTerminals}/${stats.totalTerminals}`}
            icon={<Smartphone className="w-5 h-5" />}
            trend="up"
            change="+1"
          />
          <StatsCard
            label="Today's Transactions"
            value={stats.todayTransactions}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            change="+12%"
          />
          <StatsCard
            label="Today's Revenue"
            value={formatCurrency(stats.todayRevenue, 'USD')}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+8%"
          />
          <StatsCard
            label="Avg Transaction"
            value={formatCurrency(
              stats.todayTransactions > 0 ? stats.todayRevenue / stats.todayTransactions : 0,
              'USD'
            )}
            icon={<CheckCircle2 className="w-5 h-5" />}
          />
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search terminals by name, location, or device ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status:
              </span>
              {(['all', 'active', 'offline', 'maintenance'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Terminals Grid */}
        {filteredTerminals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTerminals.map((terminal) => (
              <Card
                key={terminal.id}
                variant="interactive"
                className="group cursor-pointer transition-all hover:shadow-xl dark:hover:shadow-primary/10"
                onClick={() => router.push(`/payments/collect/pos/${terminal.id}`)}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    {getStatusBadge(terminal.status)}
                  </div>

                  {/* Terminal Info */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {terminal.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{terminal.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-500">
                      <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{terminal.deviceId}</span>
                    </div>
                  </div>

                  {/* Today's Stats */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Today</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {terminal.todayTransactions} txns
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Revenue</p>
                      <p className="text-sm font-semibold text-success">
                        {formatCurrency(terminal.todayRevenue, terminal.currency)}
                      </p>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">This Week</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(terminal.weekRevenue, terminal.currency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">This Month</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(terminal.monthRevenue, terminal.currency)}
                      </span>
                    </div>
                  </div>

                  {/* Last Activity */}
                  {terminal.status === 'active' && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          Last transaction{' '}
                          {new Date(terminal.lastTransaction).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <Smartphone className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No terminals found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Activate your first POS terminal'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/payments/collect/pos/activate')}
                >
                  Activate Terminal
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Recent Transactions */}
        <Card>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent POS Transactions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Terminal
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Method
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {MOCK_POS_TRANSACTIONS.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {transaction.terminalName}
                        </p>
                        <p className="text-xs font-mono text-gray-500 dark:text-gray-400">
                          {transaction.reference}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getMethodIcon(transaction.method)}
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {transaction.method.replace('-', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="success" size="sm">Completed</Badge>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(transaction.timestamp).toLocaleString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* POS Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                QR Payments
              </h3>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-200">
              Customers scan QR codes to pay instantly via mobile wallets, no card reader needed
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Card Payments
              </h3>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-200">
              Accept chip cards, contactless payments, and tap-to-pay from all major card networks
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Offline Mode
              </h3>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-200">
              Queue payments when offline and sync automatically when connection is restored
            </p>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
