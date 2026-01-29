'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Plug,
  Key,
  Copy,
  Plus,
  Trash2,
  CheckCircle2,
  Globe,
  Settings,
  AlertCircle,
  X,
  Eye,
  EyeOff,
  ExternalLink,
  Zap,
  Shield,
  Activity,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'

interface APIKey {
  id: string
  name: string
  key: string
  fullKey?: string
  created: string
  lastUsed: string
  status: 'active' | 'revoked'
  permissions: string[]
  requests: number
}

interface Integration {
  id: string
  name: string
  description: string
  category: string
  status: 'connected' | 'available' | 'configuring'
  icon: string
  features: string[]
  docsUrl?: string
}

interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  status: 'active' | 'inactive'
  created: string
  lastTriggered?: string
  deliveries: number
  failureRate: number
}

export default function IntegrationsPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['read'])
  const [generatedKey, setGeneratedKey] = useState('')
  const [showFullKey, setShowFullKey] = useState(false)

  // Webhook state
  const [showWebhookModal, setShowWebhookModal] = useState(false)
  const [showWebhookSecretModal, setShowWebhookSecretModal] = useState(false)
  const [newWebhookName, setNewWebhookName] = useState('')
  const [newWebhookUrl, setNewWebhookUrl] = useState('')
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const [showWebhookSecret, setShowWebhookSecret] = useState(false)
  const [webhookSecret, setWebhookSecret] = useState('')

  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'pk_live_••••••••••••1234',
      fullKey: 'pk_live_3yK8vH9qR2mN7pL4sD6wT1fJ',
      created: '2024-01-15',
      lastUsed: '2 hours ago',
      status: 'active',
      permissions: ['read', 'write'],
      requests: 12847
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'pk_test_••••••••••••5678',
      fullKey: 'pk_test_9zX2cB5tY8nM3kP7hQ4vR6wS',
      created: '2024-01-10',
      lastUsed: 'Never',
      status: 'active',
      permissions: ['read'],
      requests: 0
    },
  ])

  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: '1',
      name: 'Transaction Updates',
      url: 'https://api.example.com/webhooks/transactions',
      events: ['transaction.created', 'transaction.updated'],
      status: 'active',
      created: '2024-01-12',
      lastTriggered: '2 minutes ago',
      deliveries: 2847,
      failureRate: 0.3
    },
    {
      id: '2',
      name: 'Payment Notifications',
      url: 'https://hooks.slack.com/services/T00/B00/XXX',
      events: ['payment.succeeded', 'payment.failed'],
      status: 'active',
      created: '2024-01-08',
      lastTriggered: '1 hour ago',
      deliveries: 1256,
      failureRate: 0.1
    },
  ])

  const integrations: Integration[] = [
    {
      id: '1',
      name: 'Slack',
      description: 'Receive real-time notifications and alerts in your Slack workspace',
      category: 'Communication',
      status: 'connected',
      icon: '💬',
      features: ['Transaction alerts', 'Payment notifications', 'Team mentions'],
      docsUrl: 'https://docs.wiremi.com/integrations/slack'
    },
    {
      id: '2',
      name: 'QuickBooks',
      description: 'Sync transactions and financial data with QuickBooks Online',
      category: 'Accounting',
      status: 'connected',
      icon: '📊',
      features: ['Auto-sync transactions', 'Invoice sync', 'Expense tracking'],
      docsUrl: 'https://docs.wiremi.com/integrations/quickbooks'
    },
    {
      id: '3',
      name: 'Stripe',
      description: 'Accept payments and manage subscriptions with Stripe',
      category: 'Payments',
      status: 'available',
      icon: '💳',
      features: ['Payment processing', 'Subscription management', 'Refund handling'],
      docsUrl: 'https://docs.wiremi.com/integrations/stripe'
    },
    {
      id: '4',
      name: 'Xero',
      description: 'Connect your Xero accounting software for seamless data sync',
      category: 'Accounting',
      status: 'available',
      icon: '💼',
      features: ['Bank reconciliation', 'Invoice management', 'Expense tracking'],
      docsUrl: 'https://docs.wiremi.com/integrations/xero'
    },
    {
      id: '5',
      name: 'Zapier',
      description: 'Connect to 5,000+ apps and automate your workflows',
      category: 'Automation',
      status: 'available',
      icon: '⚡',
      features: ['Custom workflows', 'Multi-app automation', 'Trigger actions'],
      docsUrl: 'https://docs.wiremi.com/integrations/zapier'
    },
    {
      id: '6',
      name: 'Google Workspace',
      description: 'Integrate with Gmail, Calendar, and Google Drive',
      category: 'Productivity',
      status: 'available',
      icon: '🔗',
      features: ['Email notifications', 'Calendar sync', 'Document storage'],
      docsUrl: 'https://docs.wiremi.com/integrations/google'
    },
  ]

  const permissions = [
    { id: 'read', label: 'Read', description: 'View data and transactions' },
    { id: 'write', label: 'Write', description: 'Create and modify records' },
    { id: 'delete', label: 'Delete', description: 'Remove records and data' },
    { id: 'admin', label: 'Admin', description: 'Full administrative access' },
  ]

  const webhookEvents = [
    { id: 'transaction.created', label: 'Transaction Created', description: 'Fired when a new transaction is created' },
    { id: 'transaction.updated', label: 'Transaction Updated', description: 'Fired when a transaction is updated' },
    { id: 'transaction.deleted', label: 'Transaction Deleted', description: 'Fired when a transaction is deleted' },
    { id: 'payment.succeeded', label: 'Payment Succeeded', description: 'Fired when a payment is successful' },
    { id: 'payment.failed', label: 'Payment Failed', description: 'Fired when a payment fails' },
    { id: 'invoice.created', label: 'Invoice Created', description: 'Fired when an invoice is created' },
    { id: 'invoice.paid', label: 'Invoice Paid', description: 'Fired when an invoice is paid' },
    { id: 'customer.created', label: 'Customer Created', description: 'Fired when a new customer is added' },
  ]

  const handleCreateAPIKey = () => {
    if (!newKeyName) {
      showToast({
        type: 'error',
        title: 'Name Required',
        message: 'Please enter a name for your API key',
      })
      return
    }

    const newKey = `pk_live_${Math.random().toString(36).substring(2, 26)}`
    setGeneratedKey(newKey)

    const newAPIKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `pk_live_••••••••••••${newKey.slice(-4)}`,
      fullKey: newKey,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active',
      permissions: selectedPermissions,
      requests: 0
    }

    setApiKeys([newAPIKey, ...apiKeys])
    setShowCreateModal(false)
    setShowKeyModal(true)
    setNewKeyName('')
    setSelectedPermissions(['read'])
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    showToast({
      type: 'success',
      title: 'Copied',
      message: 'API key copied to clipboard',
    })
  }

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.map(key =>
      key.id === id ? { ...key, status: 'revoked' as const } : key
    ))
    showToast({
      type: 'success',
      title: 'API Key Revoked',
      message: 'The API key has been revoked and can no longer be used',
    })
  }

  const handleTogglePermission = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission))
    } else {
      setSelectedPermissions([...selectedPermissions, permission])
    }
  }

  const handleToggleEvent = (event: string) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter(e => e !== event))
    } else {
      setSelectedEvents([...selectedEvents, event])
    }
  }

  const handleCreateWebhook = () => {
    if (!newWebhookName) {
      showToast({
        type: 'error',
        title: 'Name Required',
        message: 'Please enter a name for your webhook',
      })
      return
    }

    if (!newWebhookUrl) {
      showToast({
        type: 'error',
        title: 'URL Required',
        message: 'Please enter a webhook URL',
      })
      return
    }

    if (selectedEvents.length === 0) {
      showToast({
        type: 'error',
        title: 'Events Required',
        message: 'Please select at least one event to subscribe to',
      })
      return
    }

    const secret = `whsec_${Math.random().toString(36).substring(2, 26)}`
    setWebhookSecret(secret)

    const newWebhook: Webhook = {
      id: Date.now().toString(),
      name: newWebhookName,
      url: newWebhookUrl,
      events: selectedEvents,
      status: 'active',
      created: new Date().toISOString().split('T')[0],
      deliveries: 0,
      failureRate: 0
    }

    setWebhooks([newWebhook, ...webhooks])
    setShowWebhookModal(false)
    setShowWebhookSecretModal(true)
  }

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id))
    showToast({
      type: 'success',
      title: 'Webhook Deleted',
      message: 'The webhook has been removed',
    })
  }

  const handleToggleWebhookStatus = (id: string) => {
    setWebhooks(webhooks.map(webhook =>
      webhook.id === id
        ? { ...webhook, status: webhook.status === 'active' ? 'inactive' : 'active' }
        : webhook
    ))
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.back()}
          className="mb-4"
        >
          Back to Settings
        </Button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center">
              <Plug className="w-8 h-8 text-success" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API & Integrations</h1>
              <p className="text-gray-600 dark:text-gray-400">Connect third-party services and manage API access</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="md"
            icon={<ExternalLink className="w-4 h-4" />}
            iconPosition="right"
          >
            View Documentation
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* API Keys Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">API Keys</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Create and manage API keys for programmatic access</p>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => setShowCreateModal(true)}
            >
              Create API Key
            </Button>
          </div>

          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <Key className="w-5 h-5 text-primary-500 mt-1" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-1">{key.name}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded">
                          {key.key}
                        </code>
                        <button
                          onClick={() => handleCopyKey(key.fullKey || key.key)}
                          className="text-primary-500 hover:text-primary-600"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                        <span>Created {key.created}</span>
                        <span>•</span>
                        <span>Last used {key.lastUsed}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          {key.requests.toLocaleString()} requests
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {key.permissions.map(perm => (
                          <Badge key={perm} variant="default" size="sm" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={key.status === 'active' ? 'success' : 'error'} size="sm">
                      {key.status}
                    </Badge>
                    {key.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 className="w-4 h-4" />}
                        onClick={() => handleRevokeKey(key.id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                  Keep your API keys secure
                </p>
                <p className="text-blue-700 dark:text-blue-400">
                  Never share your API keys publicly or commit them to version control. Rotate keys regularly and use read-only keys when possible.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Integrations Section */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Available Integrations</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Connect with your favorite tools and services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((app) => (
              <div key={app.id} className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{app.icon}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 dark:text-white">{app.name}</p>
                        {app.status === 'connected' && (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{app.description}</p>
                      <Badge variant="default" size="sm">{app.category}</Badge>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Features:</p>
                  <div className="space-y-1">
                    {app.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={app.status === 'connected' ? 'outline' : 'primary'}
                    size="sm"
                    className="flex-1"
                    icon={app.status === 'connected' ? <Settings className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                  >
                    {app.status === 'connected' ? 'Configure' : 'Connect'}
                  </Button>
                  {app.docsUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<ExternalLink className="w-4 h-4" />}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Webhooks Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Webhooks</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive real-time notifications for events</p>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setShowWebhookModal(true)}
            >
              Add Webhook
            </Button>
          </div>

          <div className="space-y-3">
            {webhooks.map((webhook) => (
              <div key={webhook.id} className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-primary-500 mt-1" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-1">{webhook.name}</p>
                      <code className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded block mb-2">
                        {webhook.url}
                      </code>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-2">
                        <span>Created {webhook.created}</span>
                        <span>•</span>
                        <span>Last triggered {webhook.lastTriggered || 'Never'}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          {webhook.deliveries.toLocaleString()} deliveries
                        </span>
                        <span>•</span>
                        <span className={webhook.failureRate < 1 ? 'text-green-600' : 'text-red-600'}>
                          {webhook.failureRate}% failure rate
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {webhook.events.map(event => (
                          <Badge key={event} variant="default" size="sm" className="text-xs">
                            {event}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleWebhookStatus(webhook.id)}
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        webhook.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {webhook.status}
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => handleDeleteWebhook(webhook.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                  Webhook Security
                </p>
                <p className="text-blue-700 dark:text-blue-400">
                  All webhook payloads are signed with a secret key. Verify the signature before processing webhook data.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create API Key</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Name
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Production API Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Permissions
                </label>
                <div className="space-y-2">
                  {permissions.map(perm => (
                    <label key={perm.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm.id)}
                        onChange={() => handleTogglePermission(perm.id)}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{perm.label}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{perm.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    The API key will only be shown once. Make sure to copy and store it securely.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  onClick={handleCreateAPIKey}
                >
                  Create Key
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Show Generated Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">API Key Created</h3>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg">
                <div className="flex items-start gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Your API key has been created successfully. Copy it now and store it securely.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  API Key
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm break-all">
                    {showFullKey ? generatedKey : `${generatedKey.slice(0, 15)}${'•'.repeat(15)}`}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={showFullKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    onClick={() => setShowFullKey(!showFullKey)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Copy className="w-4 h-4" />}
                    onClick={() => handleCopyKey(generatedKey)}
                  />
                </div>
              </div>

              <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-400">
                    This is the only time you'll see this key. If you lose it, you'll need to create a new one.
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setShowKeyModal(false)}
              >
                I've Saved My Key
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Create Webhook Modal */}
      {showWebhookModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create Webhook</h3>
              <button
                onClick={() => setShowWebhookModal(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Webhook Name
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Transaction Updates"
                  value={newWebhookName}
                  onChange={(e) => setNewWebhookName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Endpoint URL
                </label>
                <Input
                  type="url"
                  placeholder="https://api.example.com/webhooks"
                  value={newWebhookUrl}
                  onChange={(e) => setNewWebhookUrl(e.target.value)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                  This URL will receive POST requests when subscribed events occur
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Events to Subscribe
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {webhookEvents.map(event => (
                    <label key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)}
                        onChange={() => handleToggleEvent(event.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{event.label}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{event.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    A signing secret will be generated for this webhook. Use it to verify the authenticity of webhook payloads.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => {
                    setShowWebhookModal(false)
                    setNewWebhookName('')
                    setNewWebhookUrl('')
                    setSelectedEvents([])
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  onClick={handleCreateWebhook}
                >
                  Create Webhook
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Webhook Secret Modal */}
      {showWebhookSecretModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Webhook Created</h3>
              <button
                onClick={() => {
                  setShowWebhookSecretModal(false)
                  setNewWebhookName('')
                  setNewWebhookUrl('')
                  setSelectedEvents([])
                  setWebhookSecret('')
                  setShowWebhookSecret(false)
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Your webhook has been created successfully. Copy the signing secret now and store it securely.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Signing Secret
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm break-all">
                    {showWebhookSecret ? webhookSecret : `${webhookSecret.slice(0, 15)}${'•'.repeat(15)}`}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={showWebhookSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Copy className="w-4 h-4" />}
                    onClick={() => handleCopyKey(webhookSecret)}
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                      How to use this secret
                    </p>
                    <p className="text-blue-700 dark:text-blue-400 mb-2">
                      Use this secret to verify webhook signatures. Each webhook payload includes a signature header that you should validate before processing.
                    </p>
                    <code className="text-xs bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                      X-Wiremi-Signature
                    </code>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-400">
                    This is the only time you'll see this secret. If you lose it, you'll need to regenerate it.
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setShowWebhookSecretModal(false)
                  setNewWebhookName('')
                  setNewWebhookUrl('')
                  setSelectedEvents([])
                  setWebhookSecret('')
                  setShowWebhookSecret(false)
                  showToast({
                    type: 'success',
                    title: 'Webhook Created',
                    message: 'Your webhook is now active and ready to receive events',
                  })
                }}
              >
                I've Saved My Secret
              </Button>
            </div>
          </Card>
        </div>
      )}
    </PageLayout>
  )
}
