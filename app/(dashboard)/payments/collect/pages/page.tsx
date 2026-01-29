'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Globe,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Copy,
  Edit,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Palette,
  Sparkles,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock hosted pages data
const MOCK_HOSTED_PAGES = [
  {
    id: 'page-001',
    name: 'E-Commerce Store Checkout',
    description: 'Main product checkout page',
    url: 'https://pay.wiremi.com/page/store-checkout',
    slug: 'store-checkout',
    status: 'active' as const,
    theme: {
      primaryColor: '#3B82F6',
      logo: '/logo.png',
      backgroundImage: null,
    },
    visits: 1240,
    conversions: 987,
    totalCollected: 45600,
    currency: 'USD',
    createdAt: '2026-01-10T09:00:00Z',
    lastModified: '2026-01-18T14:30:00Z',
  },
  {
    id: 'page-002',
    name: 'Monthly Subscription Signup',
    description: 'Pro plan subscription page',
    url: 'https://pay.wiremi.com/page/subscribe-pro',
    slug: 'subscribe-pro',
    status: 'active' as const,
    theme: {
      primaryColor: '#8B5CF6',
      logo: '/logo.png',
      backgroundImage: '/gradient-bg.jpg',
    },
    visits: 856,
    conversions: 432,
    totalCollected: 12960,
    currency: 'USD',
    createdAt: '2026-01-05T11:20:00Z',
    lastModified: '2026-01-15T16:45:00Z',
  },
  {
    id: 'page-003',
    name: 'Event Ticket Sales',
    description: 'Conference ticket purchase page',
    url: 'https://pay.wiremi.com/page/conference-2026',
    slug: 'conference-2026',
    status: 'paused' as const,
    theme: {
      primaryColor: '#F59E0B',
      logo: '/event-logo.png',
      backgroundImage: '/conference-bg.jpg',
    },
    visits: 2340,
    conversions: 1890,
    totalCollected: 472500,
    currency: 'USD',
    createdAt: '2025-12-01T08:00:00Z',
    lastModified: '2026-01-10T10:15:00Z',
  },
]

type PageStatus = 'active' | 'paused' | 'draft'

export default function HostedPagesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<PageStatus | 'all'>('all')

  // Calculate statistics
  const stats = {
    totalPages: MOCK_HOSTED_PAGES.length,
    activePages: MOCK_HOSTED_PAGES.filter((p) => p.status === 'active').length,
    totalVisits: MOCK_HOSTED_PAGES.reduce((sum, p) => sum + p.visits, 0),
    totalCollected: MOCK_HOSTED_PAGES.reduce((sum, p) => sum + p.totalCollected, 0),
    avgConversionRate:
      (MOCK_HOSTED_PAGES.reduce((sum, p) => sum + (p.conversions / p.visits) * 100, 0) /
        MOCK_HOSTED_PAGES.length).toFixed(1),
  }

  // Filter pages
  const filteredPages = MOCK_HOSTED_PAGES.filter((page) => {
    const matchesSearch =
      page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || page.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: PageStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Active</Badge>
      case 'paused':
        return <Badge variant="warning" size="sm">Paused</Badge>
      case 'draft':
        return <Badge variant="default" size="sm">Draft</Badge>
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Hosted Payment Pages
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Fully customizable checkout pages hosted by Wiremi
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
              onClick={() => router.push('/payments/collect/pages/create')}
            >
              Create Page
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Pages"
            value={stats.totalPages}
            icon={<Globe className="w-5 h-5" />}
            trend="up"
            change="+2"
          />
          <StatsCard
            label="Page Visits"
            value={formatNumber(stats.totalVisits)}
            icon={<Users className="w-5 h-5" />}
            trend="up"
            change="+12%"
          />
          <StatsCard
            label="Total Collected"
            value={formatCurrency(stats.totalCollected, 'USD')}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+18%"
          />
          <StatsCard
            label="Avg Conversion"
            value={`${stats.avgConversionRate}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            change="+3.2%"
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
                    placeholder="Search by name, description, or slug..."
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
              {(['all', 'active', 'paused', 'draft'] as const).map((status) => (
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

        {/* Pages Grid */}
        {filteredPages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page) => {
              const conversionRate = ((page.conversions / page.visits) * 100).toFixed(1)
              return (
                <Card
                  key={page.id}
                  variant="interactive"
                  className="group cursor-pointer transition-all hover:shadow-xl dark:hover:shadow-primary/10"
                  onClick={() => router.push(`/payments/collect/pages/${page.id}`)}
                >
                  {/* Preview Thumbnail */}
                  <div
                    className="h-48 rounded-t-xl bg-gradient-to-br relative overflow-hidden"
                    style={{
                      backgroundImage: page.theme.backgroundImage
                        ? `url(${page.theme.backgroundImage})`
                        : `linear-gradient(135deg, ${page.theme.primaryColor}20 0%, ${page.theme.primaryColor}40 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                        style={{ backgroundColor: page.theme.primaryColor }}
                      >
                        <Globe className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(page.status)}
                    </div>
                    <div className="absolute top-3 left-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: page.theme.primaryColor }}
                      >
                        <Palette className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Page Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {page.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {page.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-gray-700 dark:text-gray-300 flex-1 truncate">
                        {page.slug}
                      </code>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(page.url)
                        }}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        title="Copy URL"
                      >
                        <Copy className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Visits</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatNumber(page.visits)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conv. Rate</p>
                        <p className="text-sm font-semibold text-success">{conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Collected</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(page.totalCollected, page.currency)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(page.url, '_blank')
                        }}
                        className="flex-1"
                      >
                        Preview
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/payments/collect/pages/${page.id}/edit`)
                        }}
                        className="flex-1"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <Globe className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No payment pages found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Create your first hosted payment page'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/payments/collect/pages/create')}
                >
                  Create Payment Page
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Info Card */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Why Use Hosted Payment Pages?
              </h3>
              <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                  <span>
                    <strong>No coding required</strong> - customize colors, logos, and content visually
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                  <span>
                    <strong>Hosted by Wiremi</strong> - no SSL certificates, no infrastructure management
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                  <span>
                    <strong>Optimized for conversion</strong> - mobile-first, fast loading, multi-currency
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                  <span>
                    <strong>Built-in analytics</strong> - track visits, conversions, and revenue in real-time
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
