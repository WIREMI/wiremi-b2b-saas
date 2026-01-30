'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Link2,
  Globe,
  Code,
  Smartphone,
  QrCode,
  FileText,
  Zap,
  CreditCard,
  Wallet,
  Bitcoin,
  Building,
  Plus,
  Copy,
  Check,
  Eye,
  Settings,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PaymentCollectionStudioPage() {
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const collectionMethods = [
    {
      id: 'links',
      name: 'Payment Links',
      icon: Link2,
      description: 'Share payment links via WhatsApp, email, or social media',
      useCases: ['Freelancers', 'Social sellers', 'Churches', 'NGOs'],
      difficulty: 'No-code',
      badge: 'Most Popular',
      color: 'from-primary-500 to-primary-600',
    },
    {
      id: 'pages',
      name: 'Hosted Payment Pages',
      icon: Globe,
      description: 'Fully customizable checkout pages hosted by Wiremi',
      useCases: ['E-commerce', 'Service providers', 'Subscriptions'],
      difficulty: 'No-code',
      badge: 'Recommended',
      color: 'from-primary-500 to-primary-600',
    },
    {
      id: 'widgets',
      name: 'Embeddable Widgets',
      icon: Code,
      description: 'Add payment forms to your website or app',
      useCases: ['Websites', 'React apps', 'WordPress', 'Webflow'],
      difficulty: 'Low-code',
      badge: null,
      color: 'from-primary-500 to-primary-600',
    },
    {
      id: 'pos',
      name: 'In-Person (POS)',
      icon: Smartphone,
      description: 'Accept payments physically via QR, NFC, or manual entry',
      useCases: ['Retail', 'Restaurants', 'Events', 'Markets'],
      difficulty: 'No-code',
      badge: null,
      color: 'from-primary-500 to-primary-600',
    },
    {
      id: 'qr',
      name: 'QR Codes',
      icon: QrCode,
      description: 'Generate static or dynamic QR codes for payment',
      useCases: ['Table tents', 'Posters', 'Product labels', 'Invoices'],
      difficulty: 'No-code',
      badge: null,
      color: 'from-primary-500 to-primary-600',
    },
    {
      id: 'invoices',
      name: 'Invoices & Requests',
      icon: FileText,
      description: 'Send professional invoices with embedded payment',
      useCases: ['B2B', 'Contractors', 'Agencies', 'Schools'],
      difficulty: 'No-code',
      badge: null,
      color: 'from-primary-500 to-primary-600',
    },
    {
      id: 'api',
      name: 'Developer API',
      icon: Zap,
      description: 'Build custom payment flows with full API control',
      useCases: ['Platforms', 'SaaS', 'Marketplaces', 'Integrations'],
      difficulty: 'Full-code',
      badge: 'Advanced',
      color: 'from-primary-500 to-primary-600',
    },
  ]

  const paymentMethods = [
    { name: 'Cards', icon: CreditCard, supported: true },
    { name: 'Mobile Money', icon: Smartphone, supported: true },
    { name: 'Bank Transfer', icon: Building, supported: true },
    { name: 'Crypto', icon: Bitcoin, supported: true },
    { name: 'Wallet Balance', icon: Wallet, supported: true },
  ]

  const coreFeatures = [
    {
      icon: Zap,
      title: 'One Financial Core',
      description: 'Every payment method connects to the same financial infrastructure - wallets, ledgers, settlement, compliance.',
      color: 'text-primary-600',
      bg: 'bg-primary-100 dark:bg-primary-900/30',
    },
    {
      icon: Globe,
      title: 'Cross-Border Ready',
      description: 'Multi-currency support, automatic conversion, and local payment methods in every market.',
      color: 'text-primary-600',
      bg: 'bg-primary-100 dark:bg-primary-900/30',
    },
    {
      icon: Settings,
      title: 'No-Code to Full-Code',
      description: 'Start with simple links, grow into custom integrations. Same platform, infinite flexibility.',
      color: 'text-primary-600',
      bg: 'bg-primary-100 dark:bg-primary-900/30',
    },
    {
      icon: CheckCircle2,
      title: 'Instant Reconciliation',
      description: 'Automatic ledgering, real-time settlement tracking, and unified reporting across all channels.',
      color: 'text-primary-600',
      bg: 'bg-primary-100 dark:bg-primary-900/30',
    },
  ]

  const integrations = [
    'Education Fees',
    'Hospitality Bookings',
    'Event Tickets',
    'Invoicing',
    'Subscriptions',
    'Donations',
    'E-commerce',
    'Marketplace',
    'Savings Goals',
    'Escrow',
    'Sub-Accounts',
    'Wallets',
  ]

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-full mb-6 border border-primary-200 dark:border-primary-800">
            <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              Powered by Wiremi Financial Core
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Payment Collection Studio
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Accept payments <span className="font-semibold text-gray-900 dark:text-white">anywhere</span>, from <span className="font-semibold text-gray-900 dark:text-white">anyone</span>, using <span className="font-semibold text-gray-900 dark:text-white">any method</span>.
            <br />
            One unified financial core. Seven collection channels. Infinite possibilities.
          </p>

          {/* Supported Payment Methods */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">All methods supported:</span>
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <method.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {method.name}
                </span>
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
            ))}
          </div>
        </div>

        {/* Collection Methods Grid */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Choose Your Collection Channel
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Every method creates the same PaymentIntent object, processed through Wiremi's unified financial infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {collectionMethods.map((method) => {
              const Icon = method.icon
              return (
                <Card
                  key={method.id}
                  variant="interactive"
                  className="group p-6 cursor-pointer transition-all hover:shadow-xl dark:hover:shadow-primary/10 hover:-translate-y-1"
                  onClick={() => router.push(`/payments/collect/${method.id}`)}
                >
                  {/* Icon with gradient */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {method.badge && (
                      <Badge variant="success" size="sm">
                        {method.badge}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {method.name}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {method.description}
                  </p>

                  {/* Use Cases */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-500 mb-2">
                      Best for:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {method.useCases.slice(0, 2).map((useCase) => (
                        <span
                          key={useCase}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
                        >
                          {useCase}
                        </span>
                      ))}
                      {method.useCases.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md">
                          +{method.useCases.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Badge variant="default" size="sm">
                      {method.difficulty}
                    </Badge>
                    <ArrowRight className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Financial Core Features */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Wiremi Collection Studio?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="p-6">
                  <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Start Guide */}
        <Card className="p-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  New to Payment Collection?
                </h2>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start with a <strong>Payment Link</strong> - no code required, shareable in seconds, powered by the same financial core as our enterprise API.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Set your amount or let customers enter theirs</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>All payment methods automatically enabled (cards, mobile money, crypto, bank)</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Share via WhatsApp, email, social media, or embed as QR code</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Real-time reconciliation, instant settlement to your wallet</span>
                </li>
              </ul>

              <Button
                variant="primary"
                size="lg"
                icon={<Plus className="w-5 h-5" />}
                onClick={() => router.push('/payments/collect/links')}
              >
                Create Your First Payment Link
              </Button>
            </div>

            {/* Preview Card */}
            <div className="w-full lg:w-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl max-w-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <Link2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      Payment Link
                    </div>
                    <div className="text-xs text-gray-500">Wiremi-powered</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    $50.00 USD
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Product/Service Name
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {paymentMethods.slice(0, 3).map((method) => (
                    <div
                      key={method.name}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <method.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {method.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>Powered by Wiremi</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Integration Ecosystem */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Connects to Everything You Build
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Payment Collection Studio integrates seamlessly with all Wiremi modules. Every payment flows through the same financial core.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
            {integrations.map((integration) => (
              <div
                key={integration}
                className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                {integration}
              </div>
            ))}
          </div>

          {/* Integration Guide CTA */}
          <div className="mt-6 p-6 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl border border-primary-200 dark:border-primary-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Integration Guides & Code Examples
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Complete guides with code snippets for React, Vue, JavaScript, WordPress, Webflow, mobile apps, and REST API integration.
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                onClick={() => router.push('/payments/collect/integrate')}
                className="whitespace-nowrap"
              >
                View Integration Docs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="p-8 text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white border-0">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Collecting Payments?
          </h2>
          <p className="text-lg text-primary-50 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using Wiremi's Payment Collection Studio to accept payments globally.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-50 border-white"
              icon={<Eye className="w-5 h-5" />}
            >
              View Documentation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-primary-600 text-white hover:bg-primary-700 border-white"
              icon={<Plus className="w-5 h-5" />}
              onClick={() => router.push('/payments/collect/links')}
            >
              Create Collection Method
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
