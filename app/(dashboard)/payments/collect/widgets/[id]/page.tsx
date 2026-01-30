'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Code,
  ArrowLeft,
  Copy,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Download,
  Eye,
  Edit,
  Trash2,
  Activity,
  Calendar,
  Globe,
  Layers,
  FileCode,
  Terminal,
  Sparkles,
  Settings,
  Zap,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock widget data
const MOCK_WIDGET = {
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
  publicKey: 'pk_live_1234567890abcdefghijklmnopqrstuvwxyz',
  recentTransactions: [
    {
      id: 'txn-001',
      amount: 125.50,
      currency: 'USD',
      status: 'completed' as const,
      timestamp: '2026-01-20T14:30:00Z',
      source: 'example.com',
    },
    {
      id: 'txn-002',
      amount: 89.99,
      currency: 'USD',
      status: 'completed' as const,
      timestamp: '2026-01-20T12:15:00Z',
      source: 'shop.example.com',
    },
    {
      id: 'txn-003',
      amount: 45.00,
      currency: 'USD',
      status: 'completed' as const,
      timestamp: '2026-01-19T18:45:00Z',
      source: 'checkout.example.com',
    },
  ],
}

type WidgetType = 'inline' | 'modal' | 'button'
type WidgetPlatform = 'React' | 'Vue' | 'JavaScript' | 'WordPress' | 'Webflow'

export default function WidgetDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [selectedPlatform, setSelectedPlatform] = useState<WidgetPlatform>('React')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const widget = MOCK_WIDGET

  const handleCopyCode = (code: string, label: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(label)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this widget?')) {
      console.log('Deleting widget')
      router.push('/payments/collect/widgets')
    }
  }

  // Code snippets for different platforms
  const codeSnippets = {
    React: {
      install: `npm install @wiremi/react-widget`,
      usage: `import { WiremiCheckout } from '@wiremi/react-widget'

function ProductPage() {
  return (
    <WiremiCheckout
      publicKey="${widget.publicKey}"
      amount={9999}
      currency="USD"
      onSuccess={(payment) => {
        console.log('Payment successful:', payment)
      }}
      onError={(error) => {
        console.error('Payment failed:', error)
      }}
    >
      <button>Pay $99.99</button>
    </WiremiCheckout>
  )
}`,
      typescript: `import { WiremiCheckout, PaymentSuccessEvent } from '@wiremi/react-widget'

interface ProductCheckoutProps {
  productId: string
  amount: number
}

export function ProductCheckout({ productId, amount }: ProductCheckoutProps) {
  const handleSuccess = (payment: PaymentSuccessEvent) => {
    // Update order status
    console.log('Payment ID:', payment.id)
  }

  return (
    <WiremiCheckout
      publicKey="${widget.publicKey}"
      amount={amount}
      currency="USD"
      metadata={{ productId }}
      onSuccess={handleSuccess}
    >
      <button className="btn-primary">
        Checkout
      </button>
    </WiremiCheckout>
  )
}`,
    },
    Vue: {
      install: `npm install @wiremi/vue-widget`,
      usage: `<template>
  <WiremiCheckout
    :publicKey="publicKey"
    :amount="9999"
    currency="USD"
    @success="handleSuccess"
    @error="handleError"
  >
    <button>Pay $99.99</button>
  </WiremiCheckout>
</template>

<script>
import { WiremiCheckout } from '@wiremi/vue-widget'

export default {
  components: {
    WiremiCheckout
  },
  data() {
    return {
      publicKey: '${widget.publicKey}'
    }
  },
  methods: {
    handleSuccess(payment) {
      console.log('Payment successful:', payment)
    },
    handleError(error) {
      console.error('Payment failed:', error)
    }
  }
}
</script>`,
      composition: `<script setup lang="ts">
import { ref } from 'vue'
import { WiremiCheckout } from '@wiremi/vue-widget'

const publicKey = '${widget.publicKey}'
const amount = ref(9999)

const handleSuccess = (payment: any) => {
  console.log('Payment successful:', payment)
}

const handleError = (error: any) => {
  console.error('Payment failed:', error)
}
</script>

<template>
  <WiremiCheckout
    :publicKey="publicKey"
    :amount="amount"
    currency="USD"
    @success="handleSuccess"
    @error="handleError"
  >
    <button class="btn-primary">
      Pay {{ (amount / 100).toFixed(2) }}
    </button>
  </WiremiCheckout>
</template>`,
    },
    JavaScript: {
      install: `<!-- Include via CDN -->
<script src="https://cdn.wiremi.com/widget/v1/wiremi-widget.js"></script>`,
      usage: `<div id="wiremi-checkout"></div>

<script>
  const checkout = new Wiremi.Checkout({
    publicKey: '${widget.publicKey}',
    amount: 9999,
    currency: 'USD',
    onSuccess: function(payment) {
      console.log('Payment successful:', payment)
      alert('Payment completed!')
    },
    onError: function(error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    }
  })

  checkout.mount('#wiremi-checkout')
</script>`,
      customization: `<button id="pay-button">Pay Now</button>

<script>
  const checkout = new Wiremi.Checkout({
    publicKey: '${widget.publicKey}',
    amount: 9999,
    currency: 'USD',
    // Customization options
    style: {
      primaryColor: '#6366f1',
      borderRadius: '8px'
    },
    metadata: {
      orderId: 'ORDER-123',
      customerId: 'CUST-456'
    },
    onSuccess: function(payment) {
      // Redirect to success page
      window.location.href = '/success?payment=' + payment.id
    }
  })

  document.getElementById('pay-button')
    .addEventListener('click', function() {
      checkout.open()
    })
</script>`,
    },
    WordPress: {
      install: `1. Download the Wiremi Payment Widget plugin
2. Upload to /wp-content/plugins/
3. Activate in WordPress admin panel`,
      usage: `<!-- Shortcode method -->
[wiremi_checkout amount="9999" currency="USD" button_text="Pay $99.99"]

<!-- Or using PHP in your theme -->
<?php
if (function_exists('wiremi_checkout_button')) {
    wiremi_checkout_button(array(
        'amount' => 9999,
        'currency' => 'USD',
        'button_text' => 'Pay $99.99',
        'success_url' => home_url('/thank-you'),
        'metadata' => array(
            'product_id' => get_the_ID()
        )
    ));
}
?>`,
      woocommerce: `<!-- WooCommerce Integration -->
1. Go to WooCommerce > Settings > Payments
2. Enable "Wiremi Payments"
3. Enter your Public Key: ${widget.publicKey}
4. Save changes

<!-- Programmatic order creation -->
<?php
$order = wc_create_order();
$order->add_product(get_product($product_id), 1);
$order->set_payment_method('wiremi');
$order->calculate_totals();
$checkout_url = $order->get_checkout_payment_url();
?>`,
    },
    Webflow: {
      install: `1. Add custom code in Project Settings
2. Paste the widget script in <head>
3. Add the embed code to your page`,
      usage: `<!-- Add to <head> in Project Settings > Custom Code -->
<script src="https://cdn.wiremi.com/widget/v1/wiremi-widget.js"></script>

<!-- Add HTML Embed element to your page -->
<div id="wiremi-payment-widget"></div>

<script>
  const widget = new Wiremi.Checkout({
    publicKey: '${widget.publicKey}',
    amount: 9999,
    currency: 'USD',
    onSuccess: function(payment) {
      // Redirect to thank you page
      window.location.href = '/thank-you'
    }
  })

  widget.mount('#wiremi-payment-widget')
</script>`,
      form: `<!-- Webflow Form Integration -->
<form id="payment-form">
  <input type="text" name="email" placeholder="Email" required>
  <input type="number" name="amount" placeholder="Amount" required>
  <button type="submit">Pay Now</button>
</form>

<script>
  document.getElementById('payment-form')
    .addEventListener('submit', function(e) {
      e.preventDefault()

      const formData = new FormData(e.target)
      const amount = parseInt(formData.get('amount')) * 100

      const checkout = new Wiremi.Checkout({
        publicKey: '${widget.publicKey}',
        amount: amount,
        currency: 'USD',
        customer: {
          email: formData.get('email')
        }
      })

      checkout.open()
    })
</script>`,
    },
  }

  const platforms: WidgetPlatform[] = ['React', 'Vue', 'JavaScript', 'WordPress', 'Webflow']

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge variant="success" size="sm">
        <Activity className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge variant="error" size="sm">Inactive</Badge>
    )
  }

  const getTypeBadge = (type: WidgetType) => {
    const badges = {
      inline: <Badge variant="info" size="sm">Inline</Badge>,
      modal: <Badge variant="primary" size="sm">Modal</Badge>,
      button: <Badge variant="success" size="sm">Button</Badge>,
    }
    return badges[type]
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/payments/collect/widgets')}
              className="mb-4"
            >
              Back to Widgets
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {widget.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {widget.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              {getTypeBadge(widget.type)}
              {getStatusBadge(widget.status)}
              <Badge variant="default" size="sm">{widget.platform}</Badge>
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button
              variant="outline"
              size="md"
              icon={<Edit className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push(`/payments/collect/widgets/${params.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="md"
              icon={<Trash2 className="w-5 h-5" />}
              iconPosition="left"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Installs"
            value={widget.installs}
            icon={<Download className="w-5 h-5" />}
            trend="up"
            change="+8"
          />
          <StatsCard
            label="Total Transactions"
            value={formatNumber(widget.totalTransactions)}
            icon={<Activity className="w-5 h-5" />}
            trend="up"
            change="+156"
          />
          <StatsCard
            label="Conversion Rate"
            value="87.2%"
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            change="+2.1%"
          />
          <StatsCard
            label="Total Collected"
            value={formatCurrency(widget.totalCollected, widget.currency)}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+24%"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Widget Info - 1 column */}
          <Card className="lg:col-span-1">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Widget Information
              </h2>

              {/* Public Key */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Public Key
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={widget.publicKey}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-xs font-mono text-gray-600 dark:text-gray-400"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    icon={copiedCode === 'public-key' ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    onClick={() => handleCopyCode(widget.publicKey, 'public-key')}
                  >
                    {copiedCode === 'public-key' ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {widget.type}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Platform</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {widget.platform}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Created</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(widget.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Used</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(widget.lastUsed).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Code Snippets - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Selector */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Integration Code
              </h2>
              <div className="flex items-center gap-2 mb-6 overflow-x-auto">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedPlatform === platform
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>

              {/* Code Blocks */}
              <div className="space-y-4">
                {Object.entries(codeSnippets[selectedPlatform]).map(([key, code]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white capitalize flex items-center gap-2">
                        <Terminal className="w-4 h-4" />
                        {key.replace(/_/g, ' ')}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={copiedCode === key ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        onClick={() => handleCopyCode(code, key)}
                      >
                        {copiedCode === key ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                    <div className="relative">
                      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
                        <code>{code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Transactions
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/payments/collect/widgets/${params.id}/transactions`)}
                  >
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {widget.recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => router.push(`/transactions/${transaction.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {transaction.source}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(transaction.timestamp).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </p>
                        <Badge variant="success" size="sm">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
