'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Code, ArrowLeft, Copy, Check, Eye, Settings, CreditCard, ShoppingCart, Zap, Globe } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type WidgetType = 'button' | 'inline' | 'modal' | 'checkout'
type Framework = 'html' | 'react' | 'vue' | 'wordpress'

interface WidgetConfig {
  type: WidgetType
  amount?: string
  currency: string
  buttonText: string
  buttonColor: string
  description: string
  showLogo: boolean
}

const widgetTypes = [
  {
    id: 'button' as WidgetType,
    name: 'Payment Button',
    description: 'Simple button that opens payment modal',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'blue',
    preview: 'A beautiful payment button that opens a secure checkout',
  },
  {
    id: 'inline' as WidgetType,
    name: 'Inline Form',
    description: 'Embedded payment form directly on your page',
    icon: <ShoppingCart className="w-5 h-5" />,
    color: 'green',
    preview: 'A full payment form embedded in your webpage',
  },
  {
    id: 'modal' as WidgetType,
    name: 'Modal Checkout',
    description: 'Full-screen modal checkout experience',
    icon: <Zap className="w-5 h-5" />,
    color: 'purple',
    preview: 'A sleek modal that overlays your content',
  },
  {
    id: 'checkout' as WidgetType,
    name: 'Hosted Checkout',
    description: 'Redirect to hosted payment page',
    icon: <Globe className="w-5 h-5" />,
    color: 'orange',
    preview: 'Redirect customers to a secure hosted page',
  },
]

export default function WidgetsPage() {
  const router = useRouter()
  const [selectedWidget, setSelectedWidget] = useState<WidgetType>('button')
  const [selectedFramework, setSelectedFramework] = useState<Framework>('html')
  const [copiedCode, setCopiedCode] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  // Widget configuration
  const [config, setConfig] = useState<WidgetConfig>({
    type: 'button',
    amount: '99.99',
    currency: 'USD',
    buttonText: 'Pay Now',
    buttonColor: '#FF6B35',
    description: 'Complete your purchase',
    showLogo: true,
  })

  const generateCode = () => {
    const widget = widgetTypes.find(w => w.id === selectedWidget)

    switch (selectedFramework) {
      case 'html':
        return `<!-- Wiremi Payment Widget -->
<script src="https://js.wiremi.com/v1/widget.js"></script>

<div id="wiremi-widget"></div>

<script>
  const widget = Wiremi.Widget({
    publicKey: 'pk_live_xxxxxxxxxx',
    type: '${selectedWidget}',
    amount: ${config.amount ? config.amount : 'null'},
    currency: '${config.currency}',
    buttonText: '${config.buttonText}',
    buttonColor: '${config.buttonColor}',
    description: '${config.description}',
    showLogo: ${config.showLogo},
    onSuccess: (payment) => {
      console.log('Payment successful:', payment);
    },
    onError: (error) => {
      console.error('Payment error:', error);
    }
  });

  widget.mount('#wiremi-widget');
</script>`

      case 'react':
        return `import { WiremiWidget } from '@wiremi/react';

function PaymentPage() {
  const handleSuccess = (payment) => {
    console.log('Payment successful:', payment);
  };

  const handleError = (error) => {
    console.error('Payment error:', error);
  };

  return (
    <WiremiWidget
      publicKey="pk_live_xxxxxxxxxx"
      type="${selectedWidget}"
      amount={${config.amount ? config.amount : 'null'}}
      currency="${config.currency}"
      buttonText="${config.buttonText}"
      buttonColor="${config.buttonColor}"
      description="${config.description}"
      showLogo={${config.showLogo}}
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
}

export default PaymentPage;`

      case 'vue':
        return `<template>
  <WiremiWidget
    :publicKey="publicKey"
    type="${selectedWidget}"
    :amount="${config.amount ? config.amount : 'null'}"
    currency="${config.currency}"
    buttonText="${config.buttonText}"
    buttonColor="${config.buttonColor}"
    description="${config.description}"
    :showLogo="${config.showLogo}"
    @success="handleSuccess"
    @error="handleError"
  />
</template>

<script>
import { WiremiWidget } from '@wiremi/vue';

export default {
  components: {
    WiremiWidget
  },
  data() {
    return {
      publicKey: 'pk_live_xxxxxxxxxx'
    };
  },
  methods: {
    handleSuccess(payment) {
      console.log('Payment successful:', payment);
    },
    handleError(error) {
      console.error('Payment error:', error);
    }
  }
};
</script>`

      case 'wordpress':
        return `<!-- Add this shortcode to any page or post -->
[wiremi_widget
  type="${selectedWidget}"
  amount="${config.amount || ''}"
  currency="${config.currency}"
  button_text="${config.buttonText}"
  button_color="${config.buttonColor}"
  description="${config.description}"
  show_logo="${config.showLogo ? 'true' : 'false'}"
]

<!-- Or use the Gutenberg block -->
<!-- Search for "Wiremi Payment" in the block inserter -->`

      default:
        return ''
    }
  }

  const copyCode = async () => {
    try {
      const code = generateCode()
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code)
        setCopiedCode(true)
        setTimeout(() => setCopiedCode(false), 2000)
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea')
        textArea.value = code
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.select()
        try {
          document.execCommand('copy')
          setCopiedCode(true)
          setTimeout(() => setCopiedCode(false), 2000)
        } catch (err) {
          alert('Failed to copy code')
        }
        document.body.removeChild(textArea)
      }
    } catch (err) {
      alert('Failed to copy to clipboard')
    }
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/payments')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Website Widgets
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Embed payment forms and checkout on your website
              </p>
            </div>
          </div>
        </div>

        {/* Widget Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {widgetTypes.map((widget) => (
            <button
              key={widget.id}
              onClick={() => {
                setSelectedWidget(widget.id)
                setConfig({ ...config, type: widget.id })
              }}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedWidget === widget.id
                  ? `border-${widget.color}-500 bg-${widget.color}-50 dark:bg-${widget.color}-500/10`
                  : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 bg-${widget.color}-100 dark:bg-${widget.color}-500/20 rounded-xl flex items-center justify-center mb-4`}>
                {widget.icon}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {widget.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {widget.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Configure Widget
              </h2>
            </div>

            <div className="space-y-4">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount (optional)
                </label>
                <input
                  type="number"
                  value={config.amount}
                  onChange={(e) => setConfig({ ...config, amount: e.target.value })}
                  placeholder="Leave empty for variable"
                  step="0.01"
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <select
                  value={config.currency}
                  onChange={(e) => setConfig({ ...config, currency: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="KES">KES - Kenyan Shilling</option>
                </select>
              </div>

              {/* Button Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={config.buttonText}
                  onChange={(e) => setConfig({ ...config, buttonText: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              {/* Button Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Button Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={config.buttonColor}
                    onChange={(e) => setConfig({ ...config, buttonColor: e.target.value })}
                    className="w-12 h-10 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.buttonColor}
                    onChange={(e) => setConfig({ ...config, buttonColor: e.target.value })}
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-gray-900 dark:text-white"
                />
              </div>

              {/* Show Logo */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="showLogo"
                  checked={config.showLogo}
                  onChange={(e) => setConfig({ ...config, showLogo: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="showLogo" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Show Wiremi Logo
                </label>
              </div>

              {/* Preview Toggle */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
            </div>
          </Card>
        </div>

        {/* Code and Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Framework Selection */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Select Framework
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['html', 'react', 'vue', 'wordpress'] as Framework[]).map((framework) => (
                <button
                  key={framework}
                  onClick={() => setSelectedFramework(framework)}
                  className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                    selectedFramework === framework
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300'
                      : 'border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 hover:border-primary-300'
                  }`}
                >
                  {framework.toUpperCase()}
                </button>
              ))}
            </div>
          </Card>

          {/* Code Snippet */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Integration Code
                </h3>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-dark-border rounded-lg transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-medium">Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-gray-900 dark:bg-black rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm text-gray-100 font-mono">
                <code>{generateCode()}</code>
              </pre>
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Note:</strong> Replace <code className="px-2 py-1 bg-blue-100 dark:bg-blue-500/20 rounded">pk_live_xxxxxxxxxx</code> with your actual public API key from Settings → API Keys.
              </p>
            </div>
          </Card>

          {/* Live Preview */}
          {showPreview && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Live Preview
                </h3>
              </div>

              <div className="bg-gray-50 dark:bg-dark-hover rounded-xl p-8 min-h-[300px] flex items-center justify-center">
                {selectedWidget === 'button' && (
                  <button
                    style={{ backgroundColor: config.buttonColor }}
                    className="px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {config.buttonText}
                    {config.amount && ` - ${config.currency} $${config.amount}`}
                  </button>
                )}

                {selectedWidget === 'inline' && (
                  <div className="w-full max-w-md bg-gray-100 dark:bg-dark-surface rounded-xl p-6 border border-gray-200 dark:border-dark-border">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {config.description}
                    </h3>
                    {config.amount && (
                      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        {config.currency} ${config.amount}
                      </p>
                    )}
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg"
                        disabled
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg"
                          disabled
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg"
                          disabled
                        />
                      </div>
                      <button
                        style={{ backgroundColor: config.buttonColor }}
                        className="w-full py-3 text-white font-semibold rounded-lg"
                        disabled
                      >
                        {config.buttonText}
                      </button>
                    </div>
                    {config.showLogo && (
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-4">
                        Secured by Wiremi
                      </p>
                    )}
                  </div>
                )}

                {selectedWidget === 'modal' && (
                  <div className="text-center">
                    <button
                      style={{ backgroundColor: config.buttonColor }}
                      className="px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity mb-4"
                    >
                      {config.buttonText}
                    </button>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Clicking this button opens a full-screen modal
                    </p>
                  </div>
                )}

                {selectedWidget === 'checkout' && (
                  <div className="text-center">
                    <button
                      style={{ backgroundColor: config.buttonColor }}
                      className="px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity mb-4"
                    >
                      {config.buttonText}
                    </button>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Redirects to secure hosted checkout page
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Installation Guide */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Installation Guide
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  1. Install the Package
                </h4>
                {selectedFramework === 'html' ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add the Wiremi widget script to your HTML file. No package installation needed.
                  </p>
                ) : selectedFramework === 'wordpress' ? (
                  <div className="bg-gray-900 dark:bg-black rounded-lg p-4">
                    <code className="text-sm text-gray-100 font-mono">
                      Install the "Wiremi Payments" plugin from WordPress dashboard
                    </code>
                  </div>
                ) : (
                  <div className="bg-gray-900 dark:bg-black rounded-lg p-4">
                    <code className="text-sm text-gray-100 font-mono">
                      npm install @wiremi/{selectedFramework}
                    </code>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  2. Get Your API Keys
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Navigate to Settings → API Keys and copy your public key (starts with <code>pk_</code>)
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  3. Add the Code
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Copy the integration code above and paste it into your {selectedFramework === 'html' ? 'HTML file' : selectedFramework === 'wordpress' ? 'page or post' : 'component'}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  4. Test It Out
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use test mode keys to verify the integration before going live
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
