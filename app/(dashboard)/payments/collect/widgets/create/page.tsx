'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Code,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Globe,
  Type,
  AlignLeft,
  DollarSign,
  Palette,
  Eye,
  Settings,
  Zap,
  Sparkles,
  CreditCard,
  Smartphone,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function CreateWidgetPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // Form state
  const [widgetType, setWidgetType] = useState<'inline' | 'modal' | 'button'>('inline')
  const [platform, setPlatform] = useState<'React' | 'Vue' | 'JavaScript' | 'WordPress' | 'Webflow'>('React')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [allowCustomAmount, setAllowCustomAmount] = useState(true)
  const [fixedAmount, setFixedAmount] = useState('')
  const [customization, setCustomization] = useState({
    primaryColor: '#6366F1', // indigo-500
    buttonText: 'Pay Now',
    showLogo: true,
  })

  const currencies = ['USD', 'EUR', 'GBP', 'NGN', 'KES', 'XAF', 'GHS', 'ZAR']

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleCreate = () => {
    // Mock widget creation
    const newWidgetId = 'widget-' + Math.random().toString(36).substr(2, 9)
    console.log('Creating widget:', {
      widgetType,
      platform,
      name,
      description,
      currency,
      allowCustomAmount,
      fixedAmount: allowCustomAmount ? null : fixedAmount,
      customization,
    })
    router.push(`/payments/collect/widgets/${newWidgetId}`)
  }

  const canProceed = () => {
    if (step === 1) return true // Type and platform selection
    if (step === 2) return name.trim() !== '' && description.trim() !== ''
    if (step === 3) return allowCustomAmount || fixedAmount.trim() !== ''
    return true // Step 4 customization is optional
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="space-y-6">
        {/* Header */}
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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Payment Widget
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Embed payments into your website or app in 4 simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= stepNum
                        ? 'bg-purple-500 text-white shadow-lg scale-110'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step > stepNum ? <CheckCircle2 className="w-6 h-6" /> : stepNum}
                  </div>
                  <p
                    className={`text-xs mt-2 font-medium ${
                      step >= stepNum
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {stepNum === 1 && 'Type'}
                    {stepNum === 2 && 'Details'}
                    {stepNum === 3 && 'Payment'}
                    {stepNum === 4 && 'Customize'}
                  </p>
                </div>
                {stepNum < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      step > stepNum ? 'bg-purple-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Step 1: Widget Type and Platform */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Widget Type Selection */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Select Widget Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setWidgetType('inline')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    widgetType === 'inline'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    {widgetType === 'inline' && (
                      <CheckCircle2 className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Inline
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Embedded directly in your page content
                  </p>
                  <Badge variant="info" size="sm">Recommended</Badge>
                </button>

                <button
                  onClick={() => setWidgetType('modal')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    widgetType === 'modal'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    {widgetType === 'modal' && (
                      <CheckCircle2 className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Modal
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Pop-up overlay for focused checkout
                  </p>
                  <Badge variant="primary" size="sm">Popular</Badge>
                </button>

                <button
                  onClick={() => setWidgetType('button')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    widgetType === 'button'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    {widgetType === 'button' && (
                      <CheckCircle2 className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Button
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Simple pay button with redirect
                  </p>
                  <Badge variant="success" size="sm">Quick Setup</Badge>
                </button>
              </div>
            </Card>

            {/* Platform Selection */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Select Platform
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {(['React', 'Vue', 'JavaScript', 'WordPress', 'Webflow'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      platform === p
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                    }`}
                  >
                    <Globe className={`w-6 h-6 mx-auto mb-2 ${
                      platform === p ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{p}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Widget Details */}
        {step === 2 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Widget Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Type className="w-4 h-4" />
                  Widget Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Product Checkout Widget"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <AlignLeft className="w-4 h-4" />
                  Description
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Inline checkout for e-commerce products"
                  rows={3}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Globe className="w-4 h-4" />
                  Default Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {currencies.map((curr) => (
                    <option key={curr} value={curr}>
                      {curr}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Payment Configuration */}
        {step === 3 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Payment Configuration
            </h2>
            <div className="space-y-6">
              {/* Amount Type Toggle */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowCustomAmount}
                    onChange={(e) => setAllowCustomAmount(e.target.checked)}
                    className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Allow customers to enter amount
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Customer can pay any amount they choose
                    </p>
                  </div>
                </label>
              </div>

              {/* Fixed Amount (if not allowing custom) */}
              {!allowCustomAmount && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <DollarSign className="w-4 h-4" />
                    Fixed Amount
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                      {currency}
                    </span>
                    <input
                      type="number"
                      value={fixedAmount}
                      onChange={(e) => setFixedAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full pl-20 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}

              {/* Payment Methods Info */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Accepted Payment Methods
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                    <CreditCard className="w-4 h-4" />
                    <span>Card Payments</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                    <Smartphone className="w-4 h-4" />
                    <span>Mobile Money</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Bank Transfer</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                    <Zap className="w-4 h-4" />
                    <span>Instant Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 4: Customization and Preview */}
        {step === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customization Options */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Customize Appearance
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                    Primary Color
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { name: 'Indigo', value: '#6366F1' },
                      { name: 'Purple', value: '#A855F7' },
                      { name: 'Blue', value: '#3B82F6' },
                      { name: 'Green', value: '#10B981' },
                      { name: 'Orange', value: '#F59E0B' },
                      { name: 'Pink', value: '#EC4899' },
                      { name: 'Red', value: '#EF4444' },
                      { name: 'Gray', value: '#6B7280' },
                    ].map((color) => (
                      <button
                        key={color.value}
                        onClick={() =>
                          setCustomization({ ...customization, primaryColor: color.value })
                        }
                        className={`w-12 h-12 rounded-lg transition-all ${
                          customization.primaryColor === color.value
                            ? 'ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-900 scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={customization.buttonText}
                    onChange={(e) =>
                      setCustomization({ ...customization, buttonText: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={customization.showLogo}
                      onChange={(e) =>
                        setCustomization({
                          ...customization,
                          showLogo: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Show Wiremi Logo
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Display powered by Wiremi badge
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </Card>

            {/* Preview */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                {/* Widget Preview based on type */}
                {widgetType === 'inline' && (
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Checkout
                    </h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Amount</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {allowCustomAmount ? 'Enter amount' : `${currency} ${fixedAmount || '0.00'}`}
                        </p>
                      </div>
                      <button
                        style={{ backgroundColor: customization.primaryColor }}
                        className="w-full py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                      >
                        {customization.buttonText}
                      </button>
                    </div>
                  </div>
                )}

                {widgetType === 'modal' && (
                  <div className="relative">
                    <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg">
                      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-2xl max-w-sm mx-auto">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Complete Payment
                        </h3>
                        <div className="space-y-4">
                          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {allowCustomAmount ? 'Custom' : `${currency} ${fixedAmount || '0.00'}`}
                            </p>
                          </div>
                          <button
                            style={{ backgroundColor: customization.primaryColor }}
                            className="w-full py-3 rounded-lg text-white font-medium"
                          >
                            {customization.buttonText}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {widgetType === 'button' && (
                  <div className="flex items-center justify-center py-12">
                    <button
                      style={{ backgroundColor: customization.primaryColor }}
                      className="px-8 py-4 rounded-lg text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
                    >
                      {customization.buttonText}
                    </button>
                  </div>
                )}

                {customization.showLogo && (
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                    Powered by Wiremi
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg space-y-2">
                <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-3">
                  Summary
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-700 dark:text-purple-300">Type:</span>
                  <Badge variant="primary" size="sm">{widgetType}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-700 dark:text-purple-300">Platform:</span>
                  <span className="font-medium text-purple-900 dark:text-purple-100">
                    {platform}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-700 dark:text-purple-300">Amount:</span>
                  <span className="font-medium text-purple-900 dark:text-purple-100">
                    {allowCustomAmount ? 'Custom' : `${currency} ${fixedAmount || '0.00'}`}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="md"
              onClick={step === 1 ? () => router.push('/payments/collect/widgets') : handleBack}
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Step {step} of 4
              </span>
              {step < 4 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  icon={<CheckCircle2 className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={handleCreate}
                >
                  Create Widget
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
