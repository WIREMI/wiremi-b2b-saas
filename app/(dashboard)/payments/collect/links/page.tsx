'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Link2,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Copy,
  Edit,
  Trash2,
  MoreVertical,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  Calendar,
  Share2,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock payment links data
const MOCK_PAYMENT_LINKS = [
  {
    id: 'link-001',
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
    metadata: {
      category: 'Services',
      tags: ['development', 'web'],
    },
  },
  {
    id: 'link-002',
    name: 'Donation for Community Center',
    description: 'Support our community programs',
    amount: 0,
    currency: 'USD',
    type: 'flexible' as const,
    status: 'active' as const,
    url: 'https://pay.wiremi.com/link/donate-cc',
    shortCode: 'donate-cc',
    timesUsed: 47,
    totalCollected: 3850,
    createdAt: '2026-01-10T09:30:00Z',
    expiresAt: null,
    allowCustomAmount: true,
    metadata: {
      category: 'Donations',
      tags: ['charity', 'community'],
    },
  },
  {
    id: 'link-003',
    name: 'Monthly Subscription - Pro Plan',
    description: 'Premium subscription access',
    amount: 29.99,
    currency: 'USD',
    type: 'fixed' as const,
    status: 'active' as const,
    url: 'https://pay.wiremi.com/link/sub-pro',
    shortCode: 'sub-pro',
    timesUsed: 156,
    totalCollected: 4678.44,
    createdAt: '2026-01-05T14:20:00Z',
    expiresAt: null,
    allowCustomAmount: false,
    metadata: {
      category: 'Subscriptions',
      tags: ['recurring', 'pro'],
    },
  },
  {
    id: 'link-004',
    name: 'Event Ticket - Tech Conference 2026',
    description: 'Early bird pricing',
    amount: 250,
    currency: 'USD',
    type: 'fixed' as const,
    status: 'expired' as const,
    url: 'https://pay.wiremi.com/link/tech-conf-2026',
    shortCode: 'tech-conf-2026',
    timesUsed: 89,
    totalCollected: 22250,
    createdAt: '2025-12-01T08:00:00Z',
    expiresAt: '2026-01-15T23:59:59Z',
    allowCustomAmount: false,
    metadata: {
      category: 'Events',
      tags: ['conference', 'tech'],
    },
  },
  {
    id: 'link-005',
    name: 'Consultation Fee',
    description: '1-hour strategy session',
    amount: 150,
    currency: 'USD',
    type: 'fixed' as const,
    status: 'paused' as const,
    url: 'https://pay.wiremi.com/link/consult',
    shortCode: 'consult',
    timesUsed: 23,
    totalCollected: 3450,
    createdAt: '2026-01-12T11:15:00Z',
    expiresAt: null,
    allowCustomAmount: false,
    metadata: {
      category: 'Services',
      tags: ['consulting', 'business'],
    },
  },
]

type PaymentLinkStatus = 'active' | 'paused' | 'expired'

export default function PaymentLinksPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<PaymentLinkStatus | 'all'>('all')

  // Calculate statistics
  const stats = {
    totalLinks: MOCK_PAYMENT_LINKS.length,
    activeLinks: MOCK_PAYMENT_LINKS.filter((l) => l.status === 'active').length,
    totalCollected: MOCK_PAYMENT_LINKS.reduce((sum, l) => sum + l.totalCollected, 0),
    totalTransactions: MOCK_PAYMENT_LINKS.reduce((sum, l) => sum + l.timesUsed, 0),
  }

  // Filter links
  const filteredLinks = MOCK_PAYMENT_LINKS.filter((link) => {
    const matchesSearch =
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.shortCode.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || link.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: PaymentLinkStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Active</Badge>
      case 'paused':
        return <Badge variant="warning" size="sm">Paused</Badge>
      case 'expired':
        return <Badge variant="error" size="sm">Expired</Badge>
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In production, show a toast notification
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Payment Links
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Create shareable payment links for WhatsApp, email, or social media
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
              onClick={() => router.push('/payments/collect/links/create')}
            >
              Create Link
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Links"
            value={stats.totalLinks}
            icon={<Link2 className="w-5 h-5" />}
            trend="up"
            change="+3"
          />
          <StatsCard
            label="Active Links"
            value={stats.activeLinks}
            icon={<CheckCircle2 className="w-5 h-5" />}
            trend="up"
            change="+2"
          />
          <StatsCard
            label="Total Collected"
            value={formatCurrency(stats.totalCollected, 'USD')}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+15%"
          />
          <StatsCard
            label="Transactions"
            value={stats.totalTransactions}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            change="+8%"
          />
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4 space-y-4">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, description, or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status:
              </span>
              {(['all', 'active', 'paused', 'expired'] as const).map((status) => (
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

        {/* Payment Links Table */}
        {filteredLinks.length > 0 ? (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Link Details
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Amount
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Performance
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Created
                    </th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLinks.map((link) => (
                    <tr
                      key={link.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/payments/collect/links/${link.id}`)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Link2 className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                              {link.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                              {link.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-gray-700 dark:text-gray-300">
                                {link.shortCode}
                              </code>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  copyToClipboard(link.url)
                                }}
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                title="Copy link"
                              >
                                <Copy className="w-3.5 h-3.5 text-gray-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          {link.type === 'fixed' ? (
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(link.amount, link.currency)}
                            </p>
                          ) : (
                            <Badge variant="info" size="sm">Customer enters</Badge>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {link.type === 'fixed' ? 'Fixed amount' : 'Flexible'}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(link.totalCollected, link.currency)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {link.timesUsed} {link.timesUsed === 1 ? 'payment' : 'payments'}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {getStatusBadge(link.status)}
                        {link.expiresAt && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Expires {new Date(link.expiresAt).toLocaleDateString()}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(link.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              router.push(`/payments/collect/links/${link.id}`)
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              copyToClipboard(link.url)
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Copy link"
                          >
                            <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <Link2 className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No payment links found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Create your first payment link to start collecting payments'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/payments/collect/links/create')}
                >
                  Create Payment Link
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
