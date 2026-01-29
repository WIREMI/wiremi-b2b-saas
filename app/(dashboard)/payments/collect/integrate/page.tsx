'use client'

import { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  QrCode,
  Smartphone,
  Code2,
  Link2,
  Globe,
  FileText,
  Zap,
  Copy,
  Check,
  ExternalLink,
  Book,
  Webhook,
  Terminal,
  Layers,
  Settings,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

type IntegrationMethod = 'qr' | 'pos' | 'widget' | 'link' | 'page' | 'invoice' | 'api'
type Platform = 'React' | 'Vue' | 'JavaScript' | 'WordPress' | 'Webflow' | 'Mobile' | 'API'

export default function IntegratePage() {
  const [selectedMethod, setSelectedMethod] = useState<IntegrationMethod>('widget')
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('React')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const integrationMethods = [
    {
      id: 'qr' as const,
      name: 'QR Codes',
      icon: QrCode,
      description: 'Static or dynamic QR codes for in-person payments',
      difficulty: 'Easy',
      setupTime: '2 min',
      useCases: ['Restaurants', 'Retail', 'Events'],
    },
    {
      id: 'pos' as const,
      name: 'POS Terminals',
      icon: Smartphone,
      description: 'Physical or mobile POS devices for in-person transactions',
      difficulty: 'Medium',
      setupTime: '5 min',
      useCases: ['Retail', 'Restaurants', 'Service Centers'],
    },
    {
      id: 'widget' as const,
      name: 'Payment Widgets',
      icon: Code2,
      description: 'Embed payment forms directly into your website or app',
      difficulty: 'Medium',
      setupTime: '10 min',
      useCases: ['E-commerce', 'SaaS', 'Marketplaces'],
    },
    {
      id: 'link' as const,
      name: 'Payment Links',
      icon: Link2,
      description: 'Share payment links via email, SMS, or social media',
      difficulty: 'Easy',
      setupTime: '1 min',
      useCases: ['Freelancers', 'Services', 'Quick Sales'],
    },
    {
      id: 'page' as const,
      name: 'Hosted Pages',
      icon: Globe,
      description: 'Fully hosted payment pages with custom branding',
      difficulty: 'Easy',
      setupTime: '5 min',
      useCases: ['Donations', 'Events', 'Subscriptions'],
    },
    {
      id: 'invoice' as const,
      name: 'Invoices',
      icon: FileText,
      description: 'Create and send professional invoices with payment links',
      difficulty: 'Easy',
      setupTime: '3 min',
      useCases: ['B2B', 'Consultants', 'Agencies'],
    },
    {
      id: 'api' as const,
      name: 'API Integration',
      icon: Zap,
      description: 'Full API access for custom payment flows',
      difficulty: 'Advanced',
      setupTime: '30 min',
      useCases: ['Custom Apps', 'Platforms', 'Enterprise'],
    },
  ]

  const quickStartGuides = {
    qr: {
      title: 'Quick Start: QR Codes',
      steps: [
        {
          title: 'Create a QR Code',
          description: 'Choose static (fixed amount) or dynamic (customer enters amount)',
          action: 'Go to QR Codes',
          link: '/payments/collect/qr/create',
        },
        {
          title: 'Customize & Download',
          description: 'Add your logo, choose colors, and download as PNG, SVG, or PDF',
        },
        {
          title: 'Display & Collect',
          description: 'Print or display digitally. Customers scan and pay instantly',
        },
      ],
      code: `// QR Code Payment URL Format
https://pay.wiremi.com/qr/{qr_code_id}

// Customer scans → Enters amount (if dynamic) → Pays
// You get real-time payment notifications via webhook`,
    },
    pos: {
      title: 'Quick Start: POS Terminals',
      steps: [
        {
          title: 'Setup Terminal',
          description: 'Choose physical device or mobile app, then pair with your account',
          action: 'Setup POS',
          link: '/payments/collect/pos/setup',
        },
        {
          title: 'Configure Payment Methods',
          description: 'Enable cards, mobile money, QR codes, and wallets',
        },
        {
          title: 'Start Accepting',
          description: 'Enter amount on terminal, customer pays, receive instant confirmation',
        },
      ],
      code: `// POS Terminal Pairing
1. Generate pairing code in dashboard
2. Enter code on POS device
3. Terminal connects to your account
4. Start accepting payments immediately`,
    },
    widget: {
      title: 'Quick Start: Payment Widgets',
      steps: [
        {
          title: 'Create Widget',
          description: 'Choose inline, modal, or button type and customize appearance',
          action: 'Create Widget',
          link: '/payments/collect/widgets/create',
        },
        {
          title: 'Install Integration',
          description: 'Add widget to your website using React, Vue, or plain JavaScript',
        },
        {
          title: 'Handle Callbacks',
          description: 'Listen for payment events and update your app accordingly',
        },
      ],
      code: {
        React: `import { WiremiCheckout } from '@wiremi/react-widget'

function CheckoutPage() {
  return (
    <WiremiCheckout
      publicKey="pk_live_..."
      amount={9999}
      currency="USD"
      onSuccess={(payment) => {
        console.log('Payment successful!', payment)
        // Redirect to success page
      }}
      onError={(error) => {
        console.error('Payment failed:', error)
      }}
    />
  )
}`,
        Vue: `<template>
  <WiremiCheckout
    :public-key="publicKey"
    :amount="9999"
    currency="USD"
    @success="handleSuccess"
    @error="handleError"
  />
</template>

<script setup>
import { WiremiCheckout } from '@wiremi/vue-widget'

const publicKey = 'pk_live_...'

const handleSuccess = (payment) => {
  console.log('Payment successful!', payment)
}

const handleError = (error) => {
  console.error('Payment failed:', error)
}
</script>`,
        JavaScript: `<script src="https://cdn.wiremi.com/widget/v1/wiremi-widget.js"></script>

<div id="wiremi-checkout"></div>

<script>
  const checkout = new Wiremi.Checkout({
    publicKey: 'pk_live_...',
    amount: 9999,
    currency: 'USD',
    container: '#wiremi-checkout',
    onSuccess: (payment) => {
      console.log('Payment successful!', payment)
    },
    onError: (error) => {
      console.error('Payment failed:', error)
    }
  })

  checkout.render()
</script>`,
        WordPress: `<!-- Install Wiremi Plugin from WordPress Dashboard -->

<!-- Add shortcode to any page or post -->
[wiremi_checkout amount="9999" currency="USD" button_text="Pay Now"]

<!-- Or use in WooCommerce -->
// Wiremi gateway auto-integrates with WooCommerce
// Enable in WooCommerce > Settings > Payments`,
        Webflow: `<!-- Add to Page Settings > Custom Code > Before </body> tag -->
<script src="https://cdn.wiremi.com/widget/v1/wiremi-widget.js"></script>

<!-- Add HTML Embed element where you want the checkout -->
<div id="wiremi-checkout"></div>

<script>
  new Wiremi.Checkout({
    publicKey: 'pk_live_...',
    amount: 9999,
    currency: 'USD',
    container: '#wiremi-checkout',
  }).render()
</script>`,
        Mobile: `// iOS Swift
import WiremiSDK

let checkout = WiremiCheckout(
    publicKey: "pk_live_...",
    amount: 9999,
    currency: "USD"
)

checkout.present(from: self) { result in
    switch result {
    case .success(let payment):
        print("Payment successful: \\(payment.id)")
    case .failure(let error):
        print("Payment failed: \\(error)")
    }
}

// Android Kotlin
import com.wiremi.sdk.Checkout

val checkout = Checkout(
    publicKey = "pk_live_...",
    amount = 9999,
    currency = "USD"
)

checkout.start(this) { result ->
    result.onSuccess { payment ->
        println("Payment successful: \${payment.id}")
    }.onFailure { error ->
        println("Payment failed: \${error.message}")
    }
}`,
        API: `// REST API Example
curl -X POST https://api.wiremi.com/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 9999,
    "currency": "USD",
    "customer": {
      "email": "customer@example.com",
      "name": "John Doe"
    },
    "metadata": {
      "order_id": "order_123"
    }
  }'

// Response
{
  "id": "pay_abc123",
  "status": "pending",
  "amount": 9999,
  "currency": "USD",
  "payment_url": "https://pay.wiremi.com/pay_abc123",
  "created_at": "2024-01-15T10:30:00Z"
}`,
      },
    },
    link: {
      title: 'Quick Start: Payment Links',
      steps: [
        {
          title: 'Create Payment Link',
          description: 'Set amount, add description, and generate shareable link',
          action: 'Create Link',
          link: '/payments/collect/links/create',
        },
        {
          title: 'Share Link',
          description: 'Send via email, SMS, WhatsApp, or social media',
        },
        {
          title: 'Track Payments',
          description: 'Monitor clicks, payments, and revenue in real-time',
        },
      ],
      code: `// Payment Link Format
https://pay.wiremi.com/l/{link_id}

// Share via:
• Email: "Click to pay: https://pay.wiremi.com/l/abc123"
• SMS: "Your payment link: https://pay.wiremi.com/l/abc123"
• WhatsApp: Send link directly
• Social Media: Post or DM the link

// Track engagement:
• Total clicks
• Conversion rate
• Revenue collected
• Payment history`,
    },
    page: {
      title: 'Quick Start: Hosted Payment Pages',
      steps: [
        {
          title: 'Create Hosted Page',
          description: 'Design custom payment page with your branding',
          action: 'Create Page',
          link: '/payments/collect/pages/create',
        },
        {
          title: 'Configure Fields',
          description: 'Add custom fields, logos, colors, and payment methods',
        },
        {
          title: 'Share & Embed',
          description: 'Use standalone URL or embed on your website',
        },
      ],
      code: `// Hosted Page URL
https://pay.wiremi.com/p/{page_id}

// Embed on your website
<iframe
  src="https://pay.wiremi.com/p/{page_id}"
  width="100%"
  height="600px"
  frameborder="0"
></iframe>

// Or redirect to hosted page
window.location.href = 'https://pay.wiremi.com/p/{page_id}'`,
    },
    invoice: {
      title: 'Quick Start: Invoices',
      steps: [
        {
          title: 'Create Invoice',
          description: 'Add items, calculate totals, set due date',
          action: 'Create Invoice',
          link: '/payments/collect/invoices/create',
        },
        {
          title: 'Send to Customer',
          description: 'Email invoice with embedded payment link',
        },
        {
          title: 'Track Payment',
          description: 'Monitor invoice status and send reminders',
        },
      ],
      code: `// Invoice includes:
• Professional PDF invoice
• Embedded payment link
• QR code for mobile payment
• Automatic payment tracking
• Late payment reminders

// Customer experience:
1. Receives email with invoice PDF
2. Clicks "Pay Invoice" button
3. Pays via preferred method
4. Receives payment confirmation
5. Invoice auto-marked as paid`,
    },
    api: {
      title: 'Quick Start: API Integration',
      steps: [
        {
          title: 'Get API Keys',
          description: 'Generate test and live API keys from settings',
          action: 'API Settings',
          link: '/settings/developers',
        },
        {
          title: 'Make API Calls',
          description: 'Use REST API to create payments, manage customers, and more',
        },
        {
          title: 'Setup Webhooks',
          description: 'Receive real-time notifications for payment events',
        },
      ],
      code: {
        React: `// Example: Custom checkout flow
import { WiremiAPI } from '@wiremi/sdk'

const wiremi = new WiremiAPI('pk_live_...')

// Create payment
const payment = await wiremi.payments.create({
  amount: 9999,
  currency: 'USD',
  customer: {
    email: 'customer@example.com',
    name: 'John Doe',
  },
  metadata: {
    order_id: 'order_123',
    product: 'Pro Plan',
  },
})

// Redirect to payment page
window.location.href = payment.payment_url`,
        Vue: `// Example: Server-side payment creation
const express = require('express')
const Wiremi = require('@wiremi/node')

const wiremi = new Wiremi('sk_live_...')

app.post('/create-payment', async (req, res) => {
  try {
    const payment = await wiremi.payments.create({
      amount: req.body.amount,
      currency: 'USD',
      customer: {
        email: req.body.email,
        name: req.body.name,
      },
    })

    res.json({ payment_url: payment.payment_url })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})`,
        JavaScript: `// Webhook handler example
const express = require('express')
const Wiremi = require('@wiremi/node')

const wiremi = new Wiremi('sk_live_...')

app.post('/webhooks/wiremi', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['wiremi-signature']
  let event

  try {
    event = wiremi.webhooks.constructEvent(
      req.body,
      sig,
      'whsec_...'
    )
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`)
  }

  // Handle the event
  switch (event.type) {
    case 'payment.succeeded':
      const payment = event.data.object
      console.log('Payment succeeded:', payment.id)
      // Fulfill order, send confirmation email, etc.
      break
    case 'payment.failed':
      console.log('Payment failed:', event.data.object.id)
      break
    default:
      console.log(\`Unhandled event type: \${event.type}\`)
  }

  res.json({received: true})
})`,
        WordPress: `// PHP SDK Example
<?php
require_once('vendor/autoload.php');

$wiremi = new \\Wiremi\\WiremiClient('sk_live_...');

try {
    $payment = $wiremi->payments->create([
        'amount' => 9999,
        'currency' => 'USD',
        'customer' => [
            'email' => 'customer@example.com',
            'name' => 'John Doe',
        ],
    ]);

    header('Location: ' . $payment->payment_url);
} catch (\\Wiremi\\Exception\\ApiErrorException $e) {
    echo 'Error: ' . $e->getMessage();
}
?>`,
        Webflow: `# Python SDK Example
from wiremi import Wiremi

wiremi = Wiremi('sk_live_...')

# Create payment
payment = wiremi.Payment.create(
    amount=9999,
    currency='USD',
    customer={
        'email': 'customer@example.com',
        'name': 'John Doe',
    },
    metadata={
        'order_id': 'order_123',
    }
)

print(f'Payment URL: {payment.payment_url}')

# Verify webhook signature
def verify_webhook(payload, signature, secret):
    return wiremi.Webhook.verify_signature(
        payload,
        signature,
        secret
    )`,
        Mobile: `// Ruby SDK Example
require 'wiremi'

Wiremi.api_key = 'sk_live_...'

# Create payment
payment = Wiremi::Payment.create(
  amount: 9999,
  currency: 'USD',
  customer: {
    email: 'customer@example.com',
    name: 'John Doe'
  }
)

puts "Payment URL: #{payment.payment_url}"

# List payments
payments = Wiremi::Payment.list(limit: 10)
payments.each do |payment|
  puts "Payment #{payment.id}: #{payment.status}"
end`,
        API: `// Full REST API Reference

# Authentication
Authorization: Bearer sk_live_...

# Create Payment
POST /v1/payments
{
  "amount": 9999,
  "currency": "USD",
  "customer": {
    "email": "customer@example.com",
    "name": "John Doe"
  },
  "metadata": {
    "order_id": "order_123"
  }
}

# Get Payment
GET /v1/payments/:id

# List Payments
GET /v1/payments?limit=10&status=succeeded

# Refund Payment
POST /v1/payments/:id/refund
{
  "amount": 5000,
  "reason": "requested_by_customer"
}

# Create Customer
POST /v1/customers
{
  "email": "customer@example.com",
  "name": "John Doe",
  "phone": "+1234567890"
}

# Create Payment Link
POST /v1/payment_links
{
  "amount": 9999,
  "currency": "USD",
  "description": "Product purchase"
}

# Webhook Events
• payment.succeeded
• payment.failed
• payment.pending
• payment.refunded
• customer.created
• invoice.paid
• invoice.overdue`,
      },
    },
  }

  const webhookGuide = {
    setup: [
      {
        title: 'Add Webhook URL',
        description: 'Go to Settings > Developers > Webhooks and add your endpoint URL',
        example: 'https://yourdomain.com/webhooks/wiremi',
      },
      {
        title: 'Select Events',
        description: 'Choose which events to receive (payment.succeeded, payment.failed, etc.)',
      },
      {
        title: 'Verify Signatures',
        description: 'Always verify webhook signatures to ensure requests are from Wiremi',
      },
      {
        title: 'Return 200 OK',
        description: 'Respond quickly with 200 status. Process async if needed.',
      },
    ],
    events: [
      { name: 'payment.succeeded', description: 'Payment completed successfully' },
      { name: 'payment.failed', description: 'Payment failed or was declined' },
      { name: 'payment.pending', description: 'Payment is pending (e.g., bank transfer)' },
      { name: 'payment.refunded', description: 'Payment was refunded' },
      { name: 'customer.created', description: 'New customer was created' },
      { name: 'invoice.paid', description: 'Invoice was paid' },
      { name: 'invoice.overdue', description: 'Invoice is past due date' },
    ],
  }

  const handleCopyCode = (code: string, label: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(label)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const currentGuide = quickStartGuides[selectedMethod]
  const currentCode = typeof currentGuide.code === 'string'
    ? currentGuide.code
    : currentGuide.code[selectedPlatform]

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Connect to Everything You Build
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Complete integration guides for all payment collection methods
          </p>
        </div>

        {/* Overview Section */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Layers className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                One Platform, Multiple Ways to Collect Payments
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Wiremi provides 7 different payment collection methods to fit any use case. Choose the right method for your business,
                follow the quick start guide, and start collecting payments in minutes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Easy Integration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Multiple Platforms</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Real-time Webhooks</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Integration Methods Grid */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Choose Your Integration Method
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {integrationMethods.map((method) => {
              const Icon = method.icon
              const isSelected = selectedMethod === method.id
              return (
                <Card
                  key={method.id}
                  variant={isSelected ? 'interactive' : 'default'}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? 'ring-2 ring-primary-500 dark:ring-primary-400'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected
                          ? 'bg-primary-100 dark:bg-primary-900/30'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isSelected
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {method.name}
                        </h4>
                        <Badge variant={
                          method.difficulty === 'Easy' ? 'success' :
                          method.difficulty === 'Medium' ? 'info' : 'warning'
                        } size="sm">
                          {method.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {method.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                      <span>Setup: {method.setupTime}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {method.useCases.slice(0, 2).map((useCase) => (
                        <span
                          key={useCase}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Steps */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentGuide.title}
              </h3>
              <Badge variant="info" size="sm">
                {currentGuide.steps.length} Steps
              </Badge>
            </div>
            <div className="space-y-4">
              {currentGuide.steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {step.description}
                    </p>
                    {step.action && step.link && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = step.link}
                      >
                        {step.action}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Code Example */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Code Example
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyCode(currentCode, 'code')}
              >
                {copiedCode === 'code' ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            {/* Platform Selector for Widget and API */}
            {(selectedMethod === 'widget' || selectedMethod === 'api') && (
              <div className="mb-4 flex flex-wrap gap-2">
                {(['React', 'Vue', 'JavaScript', 'WordPress', 'Webflow', 'Mobile', 'API'] as Platform[]).map((platform) => (
                  <Button
                    key={platform}
                    variant={selectedPlatform === platform ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPlatform(platform)}
                  >
                    {platform}
                  </Button>
                ))}
              </div>
            )}

            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
                {currentCode}
              </pre>
            </div>
          </Card>
        </div>

        {/* Webhook Setup Guide */}
        <Card className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Webhook className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Webhook Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive real-time notifications when payment events occur. Essential for keeping your system in sync.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/settings/developers'}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configure Webhooks
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Setup Steps */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Setup Steps</h4>
              <div className="space-y-3">
                {webhookGuide.setup.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                      {step.example && (
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1 inline-block">
                          {step.example}
                        </code>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Events */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Available Events</h4>
              <div className="space-y-2">
                {webhookGuide.events.map((event) => (
                  <div
                    key={event.name}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <code className="text-sm font-mono text-purple-600 dark:text-purple-400">
                        {event.name}
                      </code>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Resources */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Additional Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/docs/api"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Book className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">API Documentation</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Complete API reference</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
            </a>

            <a
              href="/docs/sdks"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Terminal className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">SDKs & Libraries</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Client libraries for all platforms</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
            </a>

            <a
              href="/docs/examples"
              className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Code Examples</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Real-world integration examples</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
            </a>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
