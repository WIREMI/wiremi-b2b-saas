'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Link2,
  ArrowLeft,
  Copy,
  Edit,
  Trash2,
  Pause,
  Play,
  Share2,
  Download,
  Eye,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  CheckCircle2,
  QrCode,
  Mail,
  MessageSquare,
  BarChart3,
  X,
  CreditCard,
  Smartphone,
  Building,
  Bitcoin,
  Wallet,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock transaction data for this link
const MOCK_TRANSACTIONS = [
  {
    id: 'txn-001',
    customer: 'John Doe',
    email: 'john@example.com',
    amount: 1500,
    currency: 'USD',
    method: 'card',
    status: 'completed',
    date: '2026-01-20T14:30:00Z',
  },
  {
    id: 'txn-002',
    customer: 'Sarah Smith',
    email: 'sarah@email.com',
    amount: 1500,
    currency: 'USD',
    method: 'mobile-money',
    status: 'completed',
    date: '2026-01-19T10:15:00Z',
  },
  {
    id: 'txn-003',
    customer: 'Mike Johnson',
    email: 'mike@company.com',
    amount: 1500,
    currency: 'USD',
    method: 'wallet',
    status: 'completed',
    date: '2026-01-18T16:45:00Z',
  },
]

export default function PaymentLinkDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'analytics'>('overview')

  // Mock link data
  const link = {
    id: params.id as string,
    name: 'Website Development Package',
    description: 'Full-stack development services',
    amount: 1500,
    currency: 'USD',
    type: 'fixed' as const,
    status: 'active' as const,
    url: 'https://pay.wiremi.com/link/web-dev-001',
    shortCode: 'web-dev-001',
    timesUsed: 12,
    totalCollected: 18000,
    createdAt: '2026-01-15T10:00:00Z',
    expiresAt: null,
    allowCustomAmount: false,
    enabledMethods: {
      card: true,
      mobileMoney: true,
      bankTransfer: true,
      crypto: true,
      wallet: true,
    },
    metadata: {
      category: 'Services',
      tags: ['development', 'web'],
    },
  }

  const stats = {
    totalCollected: link.totalCollected,
    totalPayments: link.timesUsed,
    averagePayment: link.totalCollected / link.timesUsed,
    conversionRate: 85.5,
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleToggleStatus = () => {
    console.log('Toggling link status')
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this payment link? This action cannot be undone.')) {
      console.log('Deleting link')
      router.push('/payments/collect/links')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Active</Badge>
      case 'paused':
        return <Badge variant="warning" size="sm">Paused</Badge>
      case 'expired':
        return <Badge variant="error" size="sm">Expired</Badge>
      default:
        return null
    }
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/payments/collect/links')}
          >
            Back to Payment Links
          </Button>

          <div className="mt-4 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Link2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {link.name}
                  </h1>
                  {getStatusBadge(link.status)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {link.description}
                </p>
                <div className="flex items-center gap-2">
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded font-mono text-gray-700 dark:text-gray-300">
                    {link.url}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    onClick={() => copyToClipboard(link.url)}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="md"
                icon={<QrCode className="w-5 h-5" />}
                iconPosition="left"
              >
                QR Code
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={<Share2 className="w-5 h-5" />}
                iconPosition="left"
              >
                Share
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={<Edit className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => router.push(`/payments/collect/links/${link.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={link.status === 'active' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                iconPosition="left"
                onClick={handleToggleStatus}
              >
                {link.status === 'active' ? 'Pause' : 'Activate'}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Collected"
            value={formatCurrency(stats.totalCollected, link.currency)}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+15%"
          />
          <StatsCard
            label="Total Payments"
            value={stats.totalPayments}
            icon={<CheckCircle2 className="w-5 h-5" />}
            trend="up"
            change="+8"
          />
          <StatsCard
            label="Average Payment"
            value={formatCurrency(stats.averagePayment, link.currency)}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatsCard
            label="Conversion Rate"
            value={`${stats.conversionRate}%`}
            icon={<BarChart3 className="w-5 h-5" />}
            trend="up"
            change="+2.5%"
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'transactions'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Transactions ({MOCK_TRANSACTIONS.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'analytics'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Link Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Link Details
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Payment Amount
                    </h3>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {link.type === 'fixed'
                        ? formatCurrency(link.amount, link.currency)
                        : 'Customer enters amount'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </h3>
                    <Badge variant="info">{link.metadata.category}</Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Created
                    </h3>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(link.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiration
                    </h3>
                    <p className="text-gray-900 dark:text-white">
                      {link.expiresAt ? new Date(link.expiresAt).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Share This Link
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    icon={<MessageSquare className="w-5 h-5" />}
                    iconPosition="left"
                    onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(link.url)}`, '_blank')}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    icon={<Mail className="w-5 h-5" />}
                    iconPosition="left"
                    onClick={() => window.open(`mailto:?body=${encodeURIComponent(link.url)}`, '_blank')}
                  >
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    icon={<QrCode className="w-5 h-5" />}
                    iconPosition="left"
                  >
                    QR Code
                  </Button>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="md"
                    icon={<Eye className="w-5 h-5" />}
                    iconPosition="left"
                    onClick={() => setShowPreview(true)}
                    className="w-full"
                  >
                    Preview Link
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    icon={<Download className="w-5 h-5" />}
                    iconPosition="left"
                    className="w-full"
                  >
                    Download Report
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    icon={<Trash2 className="w-5 h-5" />}
                    iconPosition="left"
                    onClick={handleDelete}
                    className="w-full text-error hover:bg-error/10"
                  >
                    Delete Link
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Enabled Payment Methods
                </h2>
                <div className="space-y-2">
                  {Object.entries(link.enabledMethods)
                    .filter(([_, enabled]) => enabled)
                    .map(([method]) => (
                      <div
                        key={method}
                        className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-sm text-gray-900 dark:text-white capitalize">
                          {method.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
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
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_TRANSACTIONS.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
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
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {transaction.method.replace('-', ' ')}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="success" size="sm">Completed</Badge>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Payment Methods Used
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Card</span>
                  <div className="flex items-center gap-3">
                    <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '45%' }} />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
                      45%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Mobile Money</span>
                  <div className="flex items-center gap-3">
                    <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }} />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
                      30%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Wallet</span>
                  <div className="flex items-center gap-3">
                    <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }} />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white w-12 text-right">
                      25%
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Payment Timeline
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">This Week</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">3 payments</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(4500, link.currency)}
                  </p>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">This Month</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">12 payments</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(link.totalCollected, link.currency)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-primary-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Link Preview</h3>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Preview Content - Simulates the payment page */}
              <div className="p-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  {/* Merchant Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <Link2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {link.name}
                      </div>
                      <div className="text-xs text-gray-500">Wiremi-powered payment</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {link.description}
                  </p>

                  {/* Amount */}
                  <div className="mb-6">
                    {link.type === 'fixed' ? (
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(link.amount, link.currency)}
                      </div>
                    ) : (
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                        <input
                          type="text"
                          placeholder="Enter amount"
                          className="w-full text-2xl font-bold bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                          disabled
                        />
                      </div>
                    )}
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-2 mb-6">
                    {link.enabledMethods.card && (
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Credit/Debit Card</span>
                      </div>
                    )}
                    {link.enabledMethods.mobileMoney && (
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Mobile Money</span>
                      </div>
                    )}
                    {link.enabledMethods.bankTransfer && (
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <Building className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Bank Transfer</span>
                      </div>
                    )}
                    {link.enabledMethods.crypto && (
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <Bitcoin className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Cryptocurrency</span>
                      </div>
                    )}
                    {link.enabledMethods.wallet && (
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <Wallet className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Wallet Balance</span>
                      </div>
                    )}
                  </div>

                  {/* Pay Button */}
                  <Button className="w-full" size="lg">
                    Pay {link.type === 'fixed' ? formatCurrency(link.amount, link.currency) : 'Now'}
                  </Button>

                  {/* Footer */}
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span>Secured by Wiremi</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  This is a preview of how your payment link will appear to customers
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
