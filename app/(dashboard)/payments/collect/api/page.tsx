'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Zap,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Key,
  Code,
  Book,
  Webhook,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Activity,
  FileCode,
  ExternalLink,
  Download,
  RefreshCw,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatNumber } from '@/lib/utils'

// Mock API keys data
const MOCK_API_KEYS = [
  {
    id: 'key-001',
    name: 'Production API Key',
    key: 'pk_live_1234567890abcdefghijklmnopqrstuvwxyz',
    environment: 'live' as const,
    status: 'active' as const,
    createdAt: '2026-01-01T09:00:00Z',
    lastUsed: '2026-01-20T14:30:00Z',
    requestsToday: 1240,
    requestsMonth: 45600,
  },
  {
    id: 'key-002',
    name: 'Test API Key',
    key: 'pk_test_abcdefghijklmnopqrstuvwxyz1234567890',
    environment: 'test' as const,
    status: 'active' as const,
    createdAt: '2025-12-15T10:00:00Z',
    lastUsed: '2026-01-19T16:45:00Z',
    requestsToday: 340,
    requestsMonth: 12400,
  },
  {
    id: 'key-003',
    name: 'Staging Environment',
    key: 'pk_test_0987654321zyxwvutsrqponmlkjihgfedcba',
    environment: 'test' as const,
    status: 'active' as const,
    createdAt: '2026-01-10T11:00:00Z',
    lastUsed: '2026-01-18T12:00:00Z',
    requestsToday: 56,
    requestsMonth: 2340,
  },
]

// Mock webhooks data
const MOCK_WEBHOOKS = [
  {
    id: 'webhook-001',
    url: 'https://myapp.com/webhooks/payment',
    events: ['payment.completed', 'payment.failed'],
    status: 'active' as const,
    successRate: 99.2,
    totalCalls: 1567,
    createdAt: '2026-01-01T09:00:00Z',
  },
  {
    id: 'webhook-002',
    url: 'https://staging.myapp.com/api/webhooks',
    events: ['payment.completed', 'payment.refunded', 'payment.disputed'],
    status: 'active' as const,
    successRate: 98.5,
    totalCalls: 456,
    createdAt: '2026-01-10T10:00:00Z',
  },
]

type KeyEnvironment = 'live' | 'test'
type KeyStatus = 'active' | 'revoked'

export default function DeveloperAPIPage() {
  const router = useRouter()
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({})
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const stats = {
    totalRequests: MOCK_API_KEYS.reduce((sum, k) => sum + k.requestsMonth, 0),
    todayRequests: MOCK_API_KEYS.reduce((sum, k) => sum + k.requestsToday, 0),
    activeKeys: MOCK_API_KEYS.filter((k) => k.status === 'active').length,
    webhooks: MOCK_WEBHOOKS.length,
  }

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys((prev) => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const copyToClipboard = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(keyId)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const maskKey = (key: string) => {
    return key.substring(0, 10) + '••••••••••••••••' + key.substring(key.length - 4)
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Developer API
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Build custom payment flows with full API control
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Book className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => window.open('https://docs.wiremi.com/api', '_blank')}
            >
              Documentation
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push('/payments/collect/api/keys/create')}
            >
              Create API Key
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="API Requests (Month)"
            value={formatNumber(stats.totalRequests)}
            icon={<Activity className="w-5 h-5" />}
            trend="up"
            change="+15%"
          />
          <StatsCard
            label="Requests Today"
            value={formatNumber(stats.todayRequests)}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            change="+8%"
          />
          <StatsCard
            label="Active Keys"
            value={stats.activeKeys}
            icon={<Key className="w-5 h-5" />}
          />
          <StatsCard
            label="Webhooks"
            value={stats.webhooks}
            icon={<Webhook className="w-5 h-5" />}
          />
        </div>

        {/* API Keys */}
        <Card>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                API Keys
              </h2>
              <Button
                variant="ghost"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => router.push('/payments/collect/api/keys/create')}
              >
                Add Key
              </Button>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {MOCK_API_KEYS.map((apiKey) => (
              <div key={apiKey.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {apiKey.name}
                      </h3>
                      <Badge variant={apiKey.environment === 'live' ? 'success' : 'info'} size="sm">
                        {apiKey.environment === 'live' ? 'Production' : 'Test'}
                      </Badge>
                      <Badge variant="default" size="sm">
                        {apiKey.status === 'active' ? 'Active' : 'Revoked'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Created {new Date(apiKey.createdAt).toLocaleDateString()} • Last used{' '}
                      {new Date(apiKey.lastUsed).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg font-mono text-sm">
                    <Key className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <code className="flex-1 text-gray-900 dark:text-white truncate">
                      {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                    </code>
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
                      title={showKeys[apiKey.id] ? 'Hide key' : 'Show key'}
                    >
                      {showKeys[apiKey.id] ? (
                        <EyeOff className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
                      title="Copy key"
                    >
                      {copiedKey === apiKey.id ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Today's Requests</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatNumber(apiKey.requestsToday)}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">This Month</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatNumber(apiKey.requestsMonth)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Webhooks */}
        <Card>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Webhooks
              </h2>
              <Button
                variant="ghost"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                onClick={() => router.push('/payments/collect/api/webhooks/create')}
              >
                Add Webhook
              </Button>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {MOCK_WEBHOOKS.map((webhook) => (
              <div key={webhook.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Webhook className="w-5 h-5 text-primary-600" />
                      <code className="text-sm font-mono text-gray-900 dark:text-white">
                        {webhook.url}
                      </code>
                      <Badge variant="success" size="sm">Active</Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Created {new Date(webhook.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Listening for events:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {webhook.events.map((event) => (
                      <Badge key={event} variant="info" size="sm">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Success Rate</p>
                    <p className="text-lg font-semibold text-success">
                      {webhook.successRate}%
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Calls</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatNumber(webhook.totalCalls)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Start Code */}
        <Card>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Start
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Initialize Payment */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  1. Initialize Payment
                </h3>
                <Button variant="ghost" size="sm" icon={<Copy className="w-4 h-4" />}>
                  Copy
                </Button>
              </div>
              <div className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono">
                  <code>{`curl https://api.wiremi.com/v1/payments \\
  -X POST \\
  -H "Authorization: Bearer pk_live_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 5000,
    "currency": "USD",
    "description": "Product purchase",
    "customer": {
      "email": "customer@example.com",
      "name": "John Doe"
    },
    "metadata": {
      "order_id": "ORD-12345"
    }
  }'`}</code>
                </pre>
              </div>
            </div>

            {/* Response */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  2. Response
                </h3>
              </div>
              <div className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-blue-400 font-mono">
                  <code>{`{
  "id": "pay_1234567890",
  "status": "pending",
  "amount": 5000,
  "currency": "USD",
  "payment_url": "https://pay.wiremi.com/checkout/pay_1234567890",
  "expires_at": "2026-01-21T14:30:00Z"
}`}</code>
                </pre>
              </div>
            </div>

            {/* Webhook Event */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  3. Webhook Event (payment.completed)
                </h3>
              </div>
              <div className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-purple-400 font-mono">
                  <code>{`{
  "event": "payment.completed",
  "payment": {
    "id": "pay_1234567890",
    "status": "completed",
    "amount": 5000,
    "currency": "USD",
    "customer": {
      "email": "customer@example.com"
    }
  }
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </Card>

        {/* Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                API Documentation
              </h3>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
              Complete API reference with examples in multiple languages
            </p>
            <Button
              variant="ghost"
              size="sm"
              icon={<ExternalLink className="w-4 h-4" />}
              iconPosition="right"
              className="text-blue-700 dark:text-blue-300"
              onClick={() => window.open('https://docs.wiremi.com/api', '_blank')}
            >
              Read Docs
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <FileCode className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                SDKs & Libraries
              </h3>
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-200 mb-4">
              Official libraries for Node.js, Python, PHP, Ruby, and more
            </p>
            <Button
              variant="ghost"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              iconPosition="right"
              className="text-purple-700 dark:text-purple-300"
            >
              Browse SDKs
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                API Testing
              </h3>
            </div>
            <p className="text-sm text-green-800 dark:text-green-200 mb-4">
              Interactive API explorer and Postman collection
            </p>
            <Button
              variant="ghost"
              size="sm"
              icon={<RefreshCw className="w-4 h-4" />}
              iconPosition="right"
              className="text-green-700 dark:text-green-300"
            >
              Try API
            </Button>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
