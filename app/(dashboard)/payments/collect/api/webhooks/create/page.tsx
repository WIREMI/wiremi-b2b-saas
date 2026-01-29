'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Webhook,
  Shield,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  EyeOff,
  AlertTriangle,
  Info,
  Globe,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface WebhookEvent {
  id: string
  name: string
  description: string
  category: string
  enabled: boolean
}

export default function CreateWebhookPage() {
  const router = useRouter()
  const [step, setStep] = useState<'configure' | 'created'>('configure')
  const [isLoading, setIsLoading] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    url: '',
    description: '',
    environment: 'test' as 'live' | 'test',
  })

  const [events, setEvents] = useState<WebhookEvent[]>([
    { id: 'payment.created', name: 'Payment Created', description: 'When a new payment is initiated', category: 'Payments', enabled: true },
    { id: 'payment.completed', name: 'Payment Completed', description: 'When a payment is successfully completed', category: 'Payments', enabled: true },
    { id: 'payment.failed', name: 'Payment Failed', description: 'When a payment fails', category: 'Payments', enabled: true },
    { id: 'payment.refunded', name: 'Payment Refunded', description: 'When a payment is refunded', category: 'Payments', enabled: false },
    { id: 'payment.disputed', name: 'Payment Disputed', description: 'When a chargeback is initiated', category: 'Payments', enabled: false },
    { id: 'customer.created', name: 'Customer Created', description: 'When a new customer is created', category: 'Customers', enabled: false },
    { id: 'customer.updated', name: 'Customer Updated', description: 'When customer details are updated', category: 'Customers', enabled: false },
    { id: 'payout.created', name: 'Payout Created', description: 'When a payout is initiated', category: 'Payouts', enabled: false },
    { id: 'payout.completed', name: 'Payout Completed', description: 'When a payout is completed', category: 'Payouts', enabled: false },
  ])

  // Generated webhook secret (mock)
  const [webhookSecret, setWebhookSecret] = useState('')

  const toggleEvent = (id: string) => {
    setEvents(events.map(e =>
      e.id === id ? { ...e, enabled: !e.enabled } : e
    ))
  }

  const toggleAllInCategory = (category: string) => {
    const categoryEvents = events.filter(e => e.category === category)
    const allEnabled = categoryEvents.every(e => e.enabled)
    setEvents(events.map(e =>
      e.category === category ? { ...e, enabled: !allEnabled } : e
    ))
  }

  const validateUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url)
      // Require HTTPS for security
      if (parsed.protocol !== 'https:') {
        return false
      }
      return true
    } catch {
      return false
    }
  }

  const handleCreate = async () => {
    // Validate URL
    if (!validateUrl(formData.url)) {
      return
    }

    // Validate at least one event is selected
    if (events.filter(e => e.enabled).length === 0) {
      return
    }

    setIsLoading(true)
    // Simulate API call - In production, this would call the backend API
    // The backend would generate cryptographically secure secrets using crypto.randomBytes()
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock secret generation for demo purposes only
    // IMPORTANT: In production, secrets MUST be generated server-side using crypto.randomBytes()
    const randomSecret = 'whsec_' + Array.from({ length: 32 }, () =>
      'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]
    ).join('')

    setWebhookSecret(randomSecret)
    setIsLoading(false)
    setStep('created')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookSecret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const categories = [...new Set(events.map(e => e.category))]

  if (step === 'created') {
    return (
      <PageLayout maxWidth="normal">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Webhook Created Successfully
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your webhook endpoint has been configured.
            </p>
          </div>

          <Card className="p-6 mb-6">
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl mb-6">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-400">
                  Save your webhook secret
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Use this secret to verify webhook signatures. This is the only time you'll see it.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Endpoint URL
                </label>
                <p className="text-gray-900 dark:text-white font-mono text-sm">{formData.url}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Environment
                </label>
                <Badge variant={formData.environment === 'live' ? 'success' : 'info'}>
                  {formData.environment === 'live' ? 'Production' : 'Test'}
                </Badge>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Events Subscribed
                </label>
                <div className="flex flex-wrap gap-2">
                  {events.filter(e => e.enabled).map(event => (
                    <Badge key={event.id} variant="info" size="sm">
                      {event.id}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Webhook Secret
                </label>
                <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg font-mono text-sm">
                  <Shield className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <code className="flex-1 text-gray-900 dark:text-white break-all">
                    {showSecret ? webhookSecret : webhookSecret.substring(0, 10) + '••••••••••••••••••••••••'}
                  </code>
                  <button
                    onClick={() => setShowSecret(!showSecret)}
                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    {showSecret ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Verification Code Example */}
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Verify Webhook Signatures
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-green-400 font-mono">
                <code>{`const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSig)
  );
}`}</code>
              </pre>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push('/payments/collect/api')}
              className="flex-1"
            >
              Back to Developer API
            </Button>
            <Button
              variant="primary"
              onClick={copyToClipboard}
              icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              iconPosition="left"
              className="flex-1"
            >
              {copied ? 'Copied!' : 'Copy Secret'}
            </Button>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.back()}
            className="mb-4"
          >
            Back to Developer API
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Webhook className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create Webhook
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Receive real-time notifications for events
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Endpoint Configuration */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Endpoint Configuration
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Endpoint URL *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="url"
                    placeholder="https://your-server.com/webhooks/wiremi"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Must be a valid HTTPS URL
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <Input
                  placeholder="e.g., Production payment notifications"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Environment
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormData({ ...formData, environment: 'test' })}
                    className={cn(
                      'p-3 rounded-xl border-2 text-center transition-all',
                      formData.environment === 'test'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                        : 'border-gray-200 dark:border-gray-700'
                    )}
                  >
                    <Badge variant="info" size="sm">Test</Badge>
                    <p className="text-xs text-gray-500 mt-1">Receive test events</p>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, environment: 'live' })}
                    className={cn(
                      'p-3 rounded-xl border-2 text-center transition-all',
                      formData.environment === 'live'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                        : 'border-gray-200 dark:border-gray-700'
                    )}
                  >
                    <Badge variant="success" size="sm">Live</Badge>
                    <p className="text-xs text-gray-500 mt-1">Receive live events</p>
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Event Selection */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Events to Listen For
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select which events should trigger this webhook
            </p>

            {categories.map((category) => (
              <div key={category} className="mb-6 last:mb-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">{category}</h3>
                  <button
                    onClick={() => toggleAllInCategory(category)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    {events.filter(e => e.category === category).every(e => e.enabled)
                      ? 'Deselect all'
                      : 'Select all'}
                  </button>
                </div>
                <div className="space-y-2">
                  {events.filter(e => e.category === category).map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        'p-3 rounded-xl border-2 transition-all cursor-pointer',
                        event.enabled
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      )}
                      onClick={() => toggleEvent(event.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                          event.enabled
                            ? 'bg-primary-500 border-primary-500'
                            : 'border-gray-300 dark:border-gray-600'
                        )}>
                          {event.enabled && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {event.name}
                          </p>
                          <p className="text-xs text-gray-500">{event.description}</p>
                        </div>
                        <code className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {event.id}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Card>

          {/* Info */}
          <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-300">
              <p className="font-medium">Webhook Security</p>
              <p className="mt-1 text-blue-700 dark:text-blue-400">
                All webhook payloads are signed with HMAC-SHA256. Always verify signatures before processing events.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreate}
              disabled={!formData.url || events.filter(e => e.enabled).length === 0 || isLoading}
              icon={isLoading ? undefined : <Webhook className="w-4 h-4" />}
              iconPosition="left"
              className="flex-1"
            >
              {isLoading ? 'Creating...' : 'Create Webhook'}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
