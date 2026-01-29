'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ShoppingCart,
  Package,
  Store,
  Zap,
  CheckCircle,
  Copy,
  Key,
  FileCode,
  Download,
  ExternalLink,
  Settings,
  Code,
  Globe,
  Lock,
  ArrowRight,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const integrations = [
  {
    id: 'wordpress',
    name: 'WordPress',
    description: 'Accept payments on your WordPress site with our official plugin',
    icon: <Globe className="w-6 h-6" />,
    color: 'blue',
    status: 'active',
    category: 'CMS',
    features: [
      'WooCommerce integration',
      'Easy shortcode support',
      'Customizable payment forms',
      'Real-time transaction sync',
    ],
    installation: 'Plugin',
    version: '2.5.0',
    downloads: '150K+',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    description: 'Seamless payment gateway for WooCommerce stores',
    icon: <ShoppingCart className="w-6 h-6" />,
    color: 'purple',
    status: 'active',
    category: 'E-commerce',
    features: [
      'One-click checkout',
      'Multiple payment methods',
      'Subscription support',
      'Automatic refunds',
    ],
    installation: 'Plugin',
    version: '3.1.2',
    downloads: '200K+',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Native Shopify app for enhanced payment processing',
    icon: <Store className="w-6 h-6" />,
    color: 'green',
    status: 'active',
    category: 'E-commerce',
    features: [
      'Native Shopify checkout',
      'Multi-currency support',
      'Order management sync',
      'Fraud detection',
    ],
    installation: 'App',
    version: '1.8.5',
    downloads: '85K+',
  },
  {
    id: 'magento',
    name: 'Magento',
    description: 'Enterprise-grade payment extension for Magento',
    icon: <Package className="w-6 h-6" />,
    color: 'orange',
    status: 'active',
    category: 'E-commerce',
    features: [
      'Advanced fraud protection',
      'B2B payment options',
      'Multi-store support',
      'Custom payment flows',
    ],
    installation: 'Extension',
    version: '2.0.1',
    downloads: '45K+',
  },
  {
    id: 'bigcommerce',
    name: 'BigCommerce',
    description: 'Complete payment solution for BigCommerce stores',
    icon: <Zap className="w-6 h-6" />,
    color: 'red',
    status: 'active',
    category: 'E-commerce',
    features: [
      'Instant checkout',
      'Global payment methods',
      'Recurring billing',
      'Analytics dashboard',
    ],
    installation: 'App',
    version: '1.5.3',
    downloads: '38K+',
  },
  {
    id: 'prestashop',
    name: 'PrestaShop',
    description: 'Flexible payment module for PrestaShop stores',
    icon: <Store className="w-6 h-6" />,
    color: 'pink',
    status: 'coming-soon',
    category: 'E-commerce',
    features: [
      'Easy installation',
      'Mobile-optimized',
      'Multi-language support',
      'Custom branding',
    ],
    installation: 'Module',
    version: 'Coming Soon',
    downloads: 'N/A',
  },
]

export default function PaymentIntegrationsPage() {
  const router = useRouter()
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('sk_live_...')
  const [copied, setCopied] = useState(false)

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600',
      pink: 'from-pink-500 to-pink-600',
    }
    return colors[color] || colors.blue
  }

  return (
    <PageLayout maxWidth="normal">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              E-commerce Integrations
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Connect Wiremi to your online store and start accepting payments
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<Key className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => router.push('/settings/api')}
          >
            Manage API Keys
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-blue-600/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <Badge variant="success" size="sm">Active</Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Integrations</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-500/20 dark:to-green-600/20 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <Badge variant="info" size="sm">Total</Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">518K+</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Downloads</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-500/20 dark:to-purple-600/20 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <Badge variant="default" size="sm">Available</Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">6</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Platforms Supported</p>
        </Card>
      </div>

      {/* API Key Section */}
      <Card className="p-6 mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-500/20 dark:to-primary-600/20 rounded-xl flex items-center justify-center">
            <Key className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Your API Key
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Use this key to authenticate your integrations with Wiremi
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl font-mono text-sm text-gray-900 dark:text-white">
                {apiKey}
              </div>
              <Button
                variant="outline"
                size="md"
                icon={copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                iconPosition="left"
                onClick={handleCopyApiKey}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm text-gray-600 dark:text-gray-400">
              <Lock className="w-4 h-4" />
              <span>Keep your API key secure and never share it publicly</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Integrations Grid */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Available Integrations
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card
            key={integration.id}
            className="p-6 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedIntegration(integration.id)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${getColorClasses(integration.color)} rounded-xl flex items-center justify-center text-white`}>
                {integration.icon}
              </div>
              <Badge
                variant={integration.status === 'active' ? 'success' : 'default'}
                size="sm"
              >
                {integration.status === 'active' ? 'Active' : 'Coming Soon'}
              </Badge>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {integration.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {integration.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                <span>{integration.installation}</span>
                <span>•</span>
                <span>v{integration.version}</span>
                <span>•</span>
                <span>{integration.downloads}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4 space-y-2">
              {integration.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant={integration.status === 'active' ? 'primary' : 'outline'}
                size="sm"
                icon={integration.status === 'active' ? <Download className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
                iconPosition="left"
                onClick={(e) => {
                  e.stopPropagation()
                  if (integration.status === 'active') {
                    window.open(`https://wiremi.com/integrations/${integration.id}`, '_blank')
                  }
                }}
                className="flex-1"
                disabled={integration.status !== 'active'}
              >
                {integration.status === 'active' ? 'Install' : 'Coming Soon'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<FileCode className="w-4 h-4" />}
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(`https://docs.wiremi.com/integrations/${integration.id}`, '_blank')
                }}
              >
                Docs
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Developer Resources */}
      <Card className="p-6 mt-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-500/20 dark:to-gray-600/20 rounded-xl flex items-center justify-center">
            <Code className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Developer Resources
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Build custom integrations with our REST API and SDKs
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="right"
                onClick={() => window.open('https://docs.wiremi.com/api', '_blank')}
              >
                API Documentation
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="right"
                onClick={() => window.open('https://github.com/wiremi', '_blank')}
              >
                GitHub
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="right"
                onClick={() => window.open('https://wiremi.com/integrations', '_blank')}
              >
                All Integrations
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
