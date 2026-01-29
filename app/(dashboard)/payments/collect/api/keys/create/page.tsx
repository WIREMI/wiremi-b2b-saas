'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Key,
  Shield,
  AlertTriangle,
  Copy,
  Check,
  Eye,
  EyeOff,
  CheckCircle2,
  Info,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type KeyEnvironment = 'live' | 'test'

interface Permission {
  id: string
  name: string
  description: string
  enabled: boolean
}

export default function CreateAPIKeyPage() {
  const router = useRouter()
  const [step, setStep] = useState<'configure' | 'created'>('configure')
  const [isLoading, setIsLoading] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    environment: 'test' as KeyEnvironment,
    expiresIn: 'never',
    ipWhitelist: '',
  })

  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 'payments_read', name: 'Read Payments', description: 'View payment transactions and details', enabled: true },
    { id: 'payments_write', name: 'Create Payments', description: 'Create new payment requests', enabled: true },
    { id: 'refunds', name: 'Process Refunds', description: 'Issue refunds for payments', enabled: false },
    { id: 'customers_read', name: 'Read Customers', description: 'View customer information', enabled: true },
    { id: 'customers_write', name: 'Manage Customers', description: 'Create and update customers', enabled: false },
    { id: 'webhooks', name: 'Manage Webhooks', description: 'Create and configure webhooks', enabled: false },
    { id: 'reports', name: 'Access Reports', description: 'Generate and download reports', enabled: false },
  ])

  // Generated key (mock - would come from API in production)
  const [generatedKey, setGeneratedKey] = useState('')

  const expiryOptions = [
    { value: 'never', label: 'Never expires' },
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
    { value: '180', label: '6 months' },
    { value: '365', label: '1 year' },
  ]

  const togglePermission = (id: string) => {
    setPermissions(permissions.map(p =>
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ))
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      return false
    }
    // Validate IP whitelist format if provided
    if (formData.ipWhitelist.trim()) {
      const ips = formData.ipWhitelist.split(',').map(ip => ip.trim())
      const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\/(?:[0-9]|[1-2][0-9]|3[0-2]))?$/
      for (const ip of ips) {
        if (ip && !ipRegex.test(ip)) {
          return false
        }
      }
    }
    return true
  }

  const handleCreate = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    // Simulate API call - In production, this would call the backend API
    // The backend would generate cryptographically secure keys using crypto.randomBytes()
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock key generation for demo purposes only
    // IMPORTANT: In production, keys MUST be generated server-side using crypto.randomBytes()
    const prefix = formData.environment === 'live' ? 'pk_live_' : 'pk_test_'
    const randomKey = Array.from({ length: 32 }, () =>
      'abcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 36)]
    ).join('')

    setGeneratedKey(prefix + randomKey)
    setIsLoading(false)
    setStep('created')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (step === 'created') {
    return (
      <PageLayout maxWidth="normal">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              API Key Created Successfully
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Your new {formData.environment === 'live' ? 'production' : 'test'} API key has been created.
            </p>
          </div>

          <Card className="p-6 mb-6">
            <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl mb-6">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-400">
                  Save your API key now
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  This is the only time you'll be able to see the full API key. Make sure to copy and store it securely.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Name
                </label>
                <p className="text-gray-900 dark:text-white font-medium">{formData.name}</p>
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
                  API Key
                </label>
                <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg font-mono text-sm">
                  <Key className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <code className="flex-1 text-gray-900 dark:text-white break-all">
                    {showKey ? generatedKey : generatedKey.substring(0, 12) + '••••••••••••••••••••••••••••'}
                  </code>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
                    title={showKey ? 'Hide key' : 'Show key'}
                    aria-label={showKey ? 'Hide API key' : 'Show API key'}
                    type="button"
                  >
                    {showKey ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-800 rounded transition-colors"
                    title="Copy key"
                    aria-label="Copy API key to clipboard"
                    type="button"
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

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push('/payments/collect/api')}
              className="flex-1"
            >
              Back to API Keys
            </Button>
            <Button
              variant="primary"
              onClick={copyToClipboard}
              icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              iconPosition="left"
              className="flex-1"
            >
              {copied ? 'Copied!' : 'Copy API Key'}
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
              <Key className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create API Key
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Generate a new API key for your application
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Basic Info */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Name *
                </label>
                <Input
                  placeholder="e.g., Production Server, Mobile App"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  A descriptive name to identify this key
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Environment *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormData({ ...formData, environment: 'test' })}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all',
                      formData.environment === 'test'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="info" size="sm">Test</Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Test Mode</p>
                    <p className="text-xs text-gray-500 mt-1">
                      For development and testing
                    </p>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, environment: 'live' })}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left transition-all',
                      formData.environment === 'live'
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="success" size="sm">Live</Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Production</p>
                    <p className="text-xs text-gray-500 mt-1">
                      For live transactions
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiration
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                  value={formData.expiresIn}
                  onChange={(e) => setFormData({ ...formData, expiresIn: e.target.value })}
                >
                  {expiryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Permissions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Permissions
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select the permissions this API key should have
            </p>
            <div className="space-y-3">
              {permissions.map((permission) => (
                <div
                  key={permission.id}
                  className={cn(
                    'p-4 rounded-xl border-2 transition-all cursor-pointer',
                    permission.enabled
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  )}
                  onClick={() => togglePermission(permission.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                        permission.enabled
                          ? 'bg-primary-500 border-primary-500'
                          : 'border-gray-300 dark:border-gray-600'
                      )}>
                        {permission.enabled && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {permission.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Security */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Security Settings
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                IP Whitelist (Optional)
              </label>
              <Input
                placeholder="e.g., 192.168.1.1, 10.0.0.0/24"
                value={formData.ipWhitelist}
                onChange={(e) => setFormData({ ...formData, ipWhitelist: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Comma-separated list of IP addresses or CIDR ranges that can use this key
              </p>
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex gap-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-medium">Security Best Practices</p>
                <ul className="mt-2 space-y-1 text-blue-700 dark:text-blue-400">
                  <li>• Never expose API keys in client-side code</li>
                  <li>• Use environment variables to store keys</li>
                  <li>• Rotate keys periodically for enhanced security</li>
                  <li>• Use the minimum permissions required</li>
                </ul>
              </div>
            </div>
          </Card>

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
              disabled={!formData.name || isLoading}
              icon={isLoading ? undefined : <Key className="w-4 h-4" />}
              iconPosition="left"
              className="flex-1"
            >
              {isLoading ? 'Creating...' : 'Create API Key'}
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
