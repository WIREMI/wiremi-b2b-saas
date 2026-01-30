'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Code,
  Plus,
  Search,
  Filter,
  Download,
  Copy,
  Eye,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Zap,
  FileCode,
  Sparkles,
  Globe,
  Layers,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock widgets data
const MOCK_WIDGETS = [
  {
    id: 'widget-001',
    name: 'Product Checkout Widget',
    description: 'Inline checkout for e-commerce products',
    type: 'inline' as const,
    platform: 'React' as const,
    status: 'active' as const,
    installs: 45,
    totalTransactions: 1240,
    totalCollected: 86500,
    currency: 'USD',
    createdAt: '2026-01-10T09:00:00Z',
    lastUsed: '2026-01-20T14:30:00Z',
  },
  {
    id: 'widget-002',
    name: 'Donation Modal',
    description: 'Pop-up donation widget for NGO website',
    type: 'modal' as const,
    platform: 'JavaScript' as const,
    status: 'active' as const,
    installs: 12,
    totalTransactions: 456,
    totalCollected: 18900,
    currency: 'USD',
    createdAt: '2026-01-08T11:20:00Z',
    lastUsed: '2026-01-19T16:45:00Z',
  },
  {
    id: 'widget-003',
    name: 'WordPress Store Checkout',
    description: 'WooCommerce payment integration',
    type: 'button' as const,
    platform: 'WordPress' as const,
    status: 'active' as const,
    installs: 8,
    totalTransactions: 890,
    totalCollected: 45600,
    currency: 'USD',
    createdAt: '2026-01-05T08:00:00Z',
    lastUsed: '2026-01-20T10:15:00Z',
  },
  {
    id: 'widget-004',
    name: 'Subscription Button',
    description: 'One-click subscribe widget',
    type: 'button' as const,
    platform: 'Vue' as const,
    status: 'active' as const,
    installs: 23,
    totalTransactions: 670,
    totalCollected: 20100,
    currency: 'USD',
    createdAt: '2025-12-28T14:30:00Z',
    lastUsed: '2026-01-18T12:00:00Z',
  },
]

type WidgetType = 'inline' | 'modal' | 'button'
type WidgetPlatform = 'React' | 'Vue' | 'JavaScript' | 'WordPress' | 'Webflow'

export default function EmbeddableWidgetsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [platformFilter, setPlatformFilter] = useState<WidgetPlatform | 'all'>('all')

  // Calculate statistics
  const stats = {
    totalWidgets: MOCK_WIDGETS.length,
    totalInstalls: MOCK_WIDGETS.reduce((sum, w) => sum + w.installs, 0),
    totalTransactions: MOCK_WIDGETS.reduce((sum, w) => sum + w.totalTransactions, 0),
    totalCollected: MOCK_WIDGETS.reduce((sum, w) => sum + w.totalCollected, 0),
  }

  // Filter widgets
  const filteredWidgets = MOCK_WIDGETS.filter((widget) => {
    const matchesSearch =
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPlatform = platformFilter === 'all' || widget.platform === platformFilter

    return matchesSearch && matchesPlatform
  })

  const getTypeBadge = (type: WidgetType) => {
    const config = {
      inline: { label: 'Inline', variant: 'info' as const },
      modal: { label: 'Modal', variant: 'success' as const },
      button: { label: 'Button', variant: 'warning' as const },
    }
    const { label, variant } = config[type]
    return <Badge variant={variant} size="sm">{label}</Badge>
  }

  const getPlatformIcon = (platform: WidgetPlatform) => {
    return <Code className="w-4 h-4" />
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Embeddable Widgets
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Add payment forms to your website or app with a few lines of code
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
              onClick={() => router.push('/payments/collect/widgets/create')}
            >
              Create Widget
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Widgets"
            value={stats.totalWidgets}
            icon={<Code className="w-5 h-5" />}
            trend="up"
            change="+2"
          />
          <StatsCard
            label="Active Installs"
            value={stats.totalInstalls}
            icon={<Globe className="w-5 h-5" />}
            trend="up"
            change="+12"
          />
          <StatsCard
            label="Transactions"
            value={formatNumber(stats.totalTransactions)}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            change="+18%"
          />
          <StatsCard
            label="Total Collected"
            value={formatCurrency(stats.totalCollected, 'USD')}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+22%"
          />
        </div>

        {/* Platform Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {(['React', 'Vue', 'JavaScript', 'WordPress', 'Webflow'] as WidgetPlatform[]).map((platform) => {
            const count = MOCK_WIDGETS.filter((w) => w.platform === platform).length
            return (
              <Card
                key={platform}
                variant="interactive"
                className={`p-4 cursor-pointer transition-all ${
                  platformFilter === platform
                    ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setPlatformFilter(platformFilter === platform ? 'all' : platform)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {getPlatformIcon(platform)}
                  </div>
                  {count > 0 && (
                    <Badge variant="default" size="sm">{count}</Badge>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {platform}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Integration guide
                </p>
              </Card>
            )
          })}
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search widgets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </Card>

        {/* Widgets Grid */}
        {filteredWidgets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWidgets.map((widget) => (
              <Card
                key={widget.id}
                variant="interactive"
                className="group cursor-pointer transition-all hover:shadow-xl dark:hover:shadow-primary/10"
                onClick={() => router.push(`/payments/collect/widgets/${widget.id}`)}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      {getTypeBadge(widget.type)}
                      <Badge variant="default" size="sm">
                        {widget.platform}
                      </Badge>
                    </div>
                  </div>

                  {/* Widget Info */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {widget.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {widget.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Installs</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {widget.installs}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Transactions</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatNumber(widget.totalTransactions)}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg border border-primary-200 dark:border-primary-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary-700 dark:text-primary-300 font-medium">
                        Total Collected
                      </span>
                      <span className="text-sm font-bold text-primary-900 dark:text-primary-100">
                        {formatCurrency(widget.totalCollected, widget.currency)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Copy className="w-4 h-4" />}
                      onClick={(e) => {
                        e.stopPropagation()
                        // Copy widget code
                      }}
                      className="flex-1"
                    >
                      Copy Code
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Eye className="w-4 h-4" />}
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/payments/collect/widgets/${widget.id}`)
                      }}
                      className="flex-1"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <Code className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No widgets found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || platformFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Create your first payment widget'}
              </p>
              {!searchTerm && platformFilter === 'all' && (
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/payments/collect/widgets/create')}
                >
                  Create Widget
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Integration Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Inline Widgets
              </h3>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-200 mb-4">
              Embed payment forms directly into your page content
            </p>
            <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Seamless user experience</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Matches your site design</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Modal Widgets
              </h3>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-200 mb-4">
              Trigger payment overlays with button clicks
            </p>
            <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Clean, focused checkout</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Higher conversion rates</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Button Widgets
              </h3>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-200 mb-4">
              One-click payment buttons for quick checkouts
            </p>
            <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Fastest integration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Perfect for donations</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Code Example */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Start Example
            </h2>
            <Button
              variant="ghost"
              size="sm"
              icon={<Copy className="w-4 h-4" />}
            >
              Copy
            </Button>
          </div>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono">
              <code>{`<!-- Add Wiremi SDK -->
<script src="https://cdn.wiremi.com/widget.js"></script>

<!-- Add Payment Button -->
<button id="wiremi-pay">Pay Now</button>

<script>
  Wiremi.init({
    publicKey: 'pk_live_your_key_here'
  });

  document.getElementById('wiremi-pay')
    .addEventListener('click', () => {
      Wiremi.openPayment({
        amount: 50.00,
        currency: 'USD',
        description: 'Product purchase',
        onSuccess: (payment) => {
          console.log('Payment successful:', payment);
        }
      });
    });
</script>`}</code>
            </pre>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
