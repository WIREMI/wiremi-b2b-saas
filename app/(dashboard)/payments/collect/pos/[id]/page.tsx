'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Smartphone,
  ArrowLeft,
  Settings,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Activity,
  Calendar,
  Clock,
  MapPin,
  Zap,
  CreditCard,
  Wallet,
  QrCode,
  Download,
  Power,
  RefreshCw,
  Trash2,
  Edit,
  Eye,
  BarChart3,
  Shield,
  Wifi,
  WifiOff,
  AlertCircle,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock POS terminal data
const MOCK_POS_TERMINAL = {
  id: 'pos-001',
  name: 'Main Store Counter',
  location: 'Downtown Store - Register 1',
  status: 'active' as const,
  deviceId: 'POS-DS-R1-001',
  deviceModel: 'Wiremi POS Pro',
  firmwareVersion: '2.4.1',
  todayTransactions: 45,
  todayRevenue: 3450,
  weekRevenue: 18900,
  monthRevenue: 78500,
  currency: 'USD',
  lastTransaction: '2026-01-20T14:30:00Z',
  activatedAt: '2026-01-01T09:00:00Z',
  lastOnline: '2026-01-20T14:35:00Z',
  batteryLevel: 87,
  connectionType: 'wifi' as const,
  acceptedMethods: ['card', 'mobile-money', 'qr', 'wallet'] as const,
  recentTransactions: [
    {
      id: 'txn-001',
      amount: 125.50,
      currency: 'USD',
      method: 'card' as const,
      status: 'completed' as const,
      timestamp: '2026-01-20T14:30:00Z',
      reference: 'POS-001-20260120-143000',
      cardLast4: '4242',
    },
    {
      id: 'txn-002',
      amount: 89.99,
      currency: 'USD',
      method: 'mobile-money' as const,
      status: 'completed' as const,
      timestamp: '2026-01-20T13:15:00Z',
      reference: 'POS-001-20260120-131500',
    },
    {
      id: 'txn-003',
      amount: 45.00,
      currency: 'USD',
      method: 'qr' as const,
      status: 'completed' as const,
      timestamp: '2026-01-20T12:00:00Z',
      reference: 'POS-001-20260120-120000',
    },
  ],
  dailyActivity: [
    { hour: '09:00', transactions: 3, revenue: 235 },
    { hour: '10:00', transactions: 5, revenue: 412 },
    { hour: '11:00', transactions: 7, revenue: 589 },
    { hour: '12:00', transactions: 9, revenue: 734 },
    { hour: '13:00', transactions: 6, revenue: 456 },
    { hour: '14:00', transactions: 8, revenue: 624 },
    { hour: '15:00', transactions: 7, revenue: 400 },
  ],
}

type POSStatus = 'active' | 'offline' | 'maintenance'
type PaymentMethod = 'card' | 'mobile-money' | 'qr' | 'wallet'

export default function POSTerminalDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [terminal] = useState(MOCK_POS_TERMINAL)

  const averageTransaction = (terminal.todayRevenue / terminal.todayTransactions).toFixed(2)

  const handleRestart = () => {
    console.log('Restarting terminal...')
  }

  const handleDeactivate = () => {
    if (confirm('Are you sure you want to deactivate this terminal?')) {
      console.log('Deactivating terminal')
      router.push('/payments/collect/pos')
    }
  }

  const getStatusBadge = (status: POSStatus) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="success" size="sm">
            <Wifi className="w-3 h-3 mr-1" />
            Online
          </Badge>
        )
      case 'offline':
        return (
          <Badge variant="error" size="sm">
            <WifiOff className="w-3 h-3 mr-1" />
            Offline
          </Badge>
        )
      case 'maintenance':
        return (
          <Badge variant="warning" size="sm">
            <Settings className="w-3 h-3 mr-1" />
            Maintenance
          </Badge>
        )
    }
  }

  const getMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-4 h-4" />
      case 'mobile-money':
        return <Smartphone className="w-4 h-4" />
      case 'qr':
        return <QrCode className="w-4 h-4" />
      case 'wallet':
        return <Wallet className="w-4 h-4" />
    }
  }

  const getMethodLabel = (method: PaymentMethod) => {
    switch (method) {
      case 'card':
        return 'Card Payment'
      case 'mobile-money':
        return 'Mobile Money'
      case 'qr':
        return 'QR Code'
      case 'wallet':
        return 'Wallet'
    }
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/payments/collect/pos')}
              className="mb-4"
            >
              Back to POS Terminals
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {terminal.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {terminal.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              {getStatusBadge(terminal.status)}
              <Badge variant="info" size="sm">
                {terminal.deviceModel}
              </Badge>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button
              variant="outline"
              size="md"
              icon={<RefreshCw className="w-5 h-5" />}
              iconPosition="left"
              onClick={handleRestart}
            >
              Restart
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={<Edit className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push(`/payments/collect/pos/${params.id}/settings`)}
            >
              Settings
            </Button>
            <Button
              variant="danger"
              size="md"
              icon={<Power className="w-5 h-5" />}
              iconPosition="left"
              onClick={handleDeactivate}
            >
              Deactivate
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Today's Transactions"
            value={terminal.todayTransactions}
            icon={<Activity className="w-5 h-5" />}
            trend="up"
            change="+12%"
          />
          <StatsCard
            label="Today's Revenue"
            value={formatCurrency(terminal.todayRevenue, terminal.currency)}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+18%"
          />
          <StatsCard
            label="Average Transaction"
            value={formatCurrency(parseFloat(averageTransaction), terminal.currency)}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            change="+5.2%"
          />
          <StatsCard
            label="Month Revenue"
            value={formatCurrency(terminal.monthRevenue, terminal.currency)}
            icon={<BarChart3 className="w-5 h-5" />}
            trend="up"
            change="+24%"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Terminal Info - 1 column */}
          <Card className="lg:col-span-1">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Terminal Information
              </h2>

              {/* Device ID */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Device ID</p>
                <p className="text-sm font-mono font-semibold text-gray-900 dark:text-white">
                  {terminal.deviceId}
                </p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Firmware</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    v{terminal.firmwareVersion}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Connection</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {terminal.connectionType}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Battery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          terminal.batteryLevel > 50
                            ? 'bg-green-500'
                            : terminal.batteryLevel > 20
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${terminal.batteryLevel}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {terminal.batteryLevel}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Activated</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(terminal.activatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Online</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(terminal.lastOnline).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {/* Accepted Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Accepted Payment Methods
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {terminal.acceptedMethods.map((method) => (
                    <div
                      key={method}
                      className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      {getMethodIcon(method)}
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {getMethodLabel(method)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Activity and Transactions - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Activity Chart */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Today's Activity
                  </h2>
                  <Badge variant="info" size="sm">
                    <Activity className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </div>

                {/* Hourly activity chart */}
                <div className="space-y-3">
                  {terminal.dailyActivity.map((activity, index) => {
                    const maxRevenue = Math.max(...terminal.dailyActivity.map((a) => a.revenue))
                    const revenuePercentage = (activity.revenue / maxRevenue) * 100

                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400 font-medium w-16">
                            {activity.hour}
                          </span>
                          <div className="flex items-center gap-4 flex-1 justify-end">
                            <span className="text-gray-500 dark:text-gray-400">
                              {activity.transactions} txns
                            </span>
                            <span className="text-gray-900 dark:text-white font-semibold w-20 text-right">
                              {formatCurrency(activity.revenue, terminal.currency)}
                            </span>
                          </div>
                        </div>
                        <div className="relative h-6 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all"
                            style={{ width: `${revenuePercentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Transactions
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/payments/collect/pos/${params.id}/transactions`)}
                  >
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {terminal.recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => router.push(`/transactions/${transaction.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          {getMethodIcon(transaction.method)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {getMethodLabel(transaction.method)}
                            </p>
                            {transaction.cardLast4 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                •••• {transaction.cardLast4}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(transaction.timestamp).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </p>
                        <Badge variant="success" size="sm">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="md" fullWidth icon={<Download className="w-4 h-4" />}>
                    Export Report
                  </Button>
                  <Button variant="outline" size="md" fullWidth icon={<Eye className="w-4 h-4" />}>
                    View Analytics
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
