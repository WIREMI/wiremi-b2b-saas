'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Smartphone,
  Building,
  Bitcoin,
  Wallet,
  QrCode,
  Palette,
  Type,
  Image,
  Layout,
  Eye,
  Save,
  Upload,
  Link2,
  Shield,
  Zap,
  Settings,
  X,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { cn } from '@/lib/utils'

type Step = 'basics' | 'payments' | 'branding' | 'fields' | 'preview'

interface PaymentMethod {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  enabled: boolean
  fees?: string
  popular?: boolean
}

interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'number'
  required: boolean
  enabled: boolean
  placeholder?: string
  options?: string[]
}

interface CheckoutPageConfig {
  // Basics
  name: string
  description: string
  slug: string
  amount: number | null
  currency: string
  allowCustomAmount: boolean
  minAmount?: number
  maxAmount?: number

  // Payment Methods
  paymentMethods: PaymentMethod[]

  // Branding
  branding: {
    primaryColor: string
    backgroundColor: string
    textColor: string
    logo: string | null
    backgroundImage: string | null
    showPoweredBy: boolean
    customCss: string
  }

  // Fields
  collectFields: FormField[]

  // Settings
  settings: {
    successUrl: string
    cancelUrl: string
    expiresAt: string | null
    maxPayments: number | null
    requireBillingAddress: boolean
    requireShippingAddress: boolean
    sendReceipt: boolean
    notifyOnPayment: boolean
  }
}

const defaultPaymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit & Debit Cards',
    icon: <CreditCard className="w-5 h-5" />,
    description: 'Visa, Mastercard, Amex, Discover',
    enabled: true,
    fees: '2.9% + $0.30',
    popular: true,
  },
  {
    id: 'mobile-money',
    name: 'Mobile Money',
    icon: <Smartphone className="w-5 h-5" />,
    description: 'M-Pesa, MTN MoMo, Airtel Money, Orange Money',
    enabled: true,
    fees: '1.5%',
    popular: true,
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    icon: <Building className="w-5 h-5" />,
    description: 'ACH, SEPA, Wire Transfer',
    enabled: true,
    fees: '0.8%',
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: <Bitcoin className="w-5 h-5" />,
    description: 'Bitcoin, Ethereum, USDC, USDT',
    enabled: false,
    fees: '1.0%',
  },
  {
    id: 'wallet',
    name: 'Digital Wallets',
    icon: <Wallet className="w-5 h-5" />,
    description: 'Apple Pay, Google Pay, PayPal',
    enabled: true,
    fees: '2.5%',
    popular: true,
  },
  {
    id: 'qr-code',
    name: 'QR Code Payment',
    icon: <QrCode className="w-5 h-5" />,
    description: 'Scan & Pay via mobile banking apps',
    enabled: false,
    fees: '0.5%',
  },
]

const defaultFormFields: FormField[] = [
  { id: 'name', label: 'Full Name', type: 'text', required: true, enabled: true, placeholder: 'John Doe' },
  { id: 'email', label: 'Email Address', type: 'email', required: true, enabled: true, placeholder: 'john@example.com' },
  { id: 'phone', label: 'Phone Number', type: 'phone', required: false, enabled: true, placeholder: '+1 (555) 123-4567' },
  { id: 'company', label: 'Company Name', type: 'text', required: false, enabled: false, placeholder: 'Acme Inc.' },
  { id: 'notes', label: 'Order Notes', type: 'textarea', required: false, enabled: false, placeholder: 'Any special instructions...' },
]

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', flag: '🇰🇪' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', flag: '🇬🇭' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', flag: '🇿🇦' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
]

const colorPresets = [
  { name: 'Blue', primary: '#2D7EF7', bg: '#F8FAFC' },
  { name: 'Purple', primary: '#8B5CF6', bg: '#FAF5FF' },
  { name: 'Green', primary: '#10B981', bg: '#F0FDF4' },
  { name: 'Orange', primary: '#F59E0B', bg: '#FFFBEB' },
  { name: 'Pink', primary: '#EC4899', bg: '#FDF2F8' },
  { name: 'Teal', primary: '#14B8A6', bg: '#F0FDFA' },
  { name: 'Dark', primary: '#1F2937', bg: '#111827' },
  { name: 'Custom', primary: '', bg: '' },
]

export default function CreateCheckoutPagePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('basics')
  const [showPreview, setShowPreview] = useState(false)

  const [config, setConfig] = useState<CheckoutPageConfig>({
    name: '',
    description: '',
    slug: '',
    amount: null,
    currency: 'USD',
    allowCustomAmount: false,
    minAmount: undefined,
    maxAmount: undefined,
    paymentMethods: defaultPaymentMethods,
    branding: {
      primaryColor: '#2D7EF7',
      backgroundColor: '#F8FAFC',
      textColor: '#1F2937',
      logo: null,
      backgroundImage: null,
      showPoweredBy: true,
      customCss: '',
    },
    collectFields: defaultFormFields,
    settings: {
      successUrl: '',
      cancelUrl: '',
      expiresAt: null,
      maxPayments: null,
      requireBillingAddress: false,
      requireShippingAddress: false,
      sendReceipt: true,
      notifyOnPayment: true,
    },
  })

  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: 'basics', label: 'Basics', icon: <Settings className="w-4 h-4" /> },
    { id: 'payments', label: 'Payment Methods', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'branding', label: 'Branding', icon: <Palette className="w-4 h-4" /> },
    { id: 'fields', label: 'Form Fields', icon: <Type className="w-4 h-4" /> },
    { id: 'preview', label: 'Preview & Publish', icon: <Eye className="w-4 h-4" /> },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === currentStep)

  const updateConfig = <K extends keyof CheckoutPageConfig>(
    key: K,
    value: CheckoutPageConfig[K]
  ) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const updateBranding = <K extends keyof CheckoutPageConfig['branding']>(
    key: K,
    value: CheckoutPageConfig['branding'][K]
  ) => {
    setConfig(prev => ({
      ...prev,
      branding: { ...prev.branding, [key]: value },
    }))
  }

  const updateSettings = <K extends keyof CheckoutPageConfig['settings']>(
    key: K,
    value: CheckoutPageConfig['settings'][K]
  ) => {
    setConfig(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value },
    }))
  }

  const togglePaymentMethod = (id: string) => {
    setConfig(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.map(pm =>
        pm.id === id ? { ...pm, enabled: !pm.enabled } : pm
      ),
    }))
  }

  const toggleFormField = (id: string) => {
    setConfig(prev => ({
      ...prev,
      collectFields: prev.collectFields.map(f =>
        f.id === id ? { ...f, enabled: !f.enabled } : f
      ),
    }))
  }

  const toggleFieldRequired = (id: string) => {
    setConfig(prev => ({
      ...prev,
      collectFields: prev.collectFields.map(f =>
        f.id === id ? { ...f, required: !f.required } : f
      ),
    }))
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleNameChange = (name: string) => {
    updateConfig('name', name)
    if (!config.slug || config.slug === generateSlug(config.name)) {
      updateConfig('slug', generateSlug(name))
    }
  }

  const enabledPaymentMethods = config.paymentMethods.filter(pm => pm.enabled)
  const enabledFields = config.collectFields.filter(f => f.enabled)

  const selectedCurrency = currencies.find(c => c.code === config.currency)

  const canProceed = () => {
    switch (currentStep) {
      case 'basics':
        return config.name.trim() !== '' && config.slug.trim() !== ''
      case 'payments':
        return enabledPaymentMethods.length > 0
      case 'branding':
        return true
      case 'fields':
        return enabledFields.some(f => f.id === 'email')
      case 'preview':
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    const idx = steps.findIndex(s => s.id === currentStep)
    if (idx < steps.length - 1) {
      setCurrentStep(steps[idx + 1].id)
    }
  }

  const prevStep = () => {
    const idx = steps.findIndex(s => s.id === currentStep)
    if (idx > 0) {
      setCurrentStep(steps[idx - 1].id)
    }
  }

  const handlePublish = () => {
    // In production, this would save to backend
    console.log('Publishing checkout page:', config)
    router.push('/payments/collect/pages')
  }

  return (
    <PageLayout maxWidth="full">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-elevated rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Checkout Page
              </h1>
              <p className="text-sm text-gray-500">Build a customizable hosted payment page</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                showPreview
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-elevated'
              )}
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button
              onClick={handlePublish}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep
              const isCompleted = index < currentStepIndex

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                      isActive && 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
                      isCompleted && !isActive && 'text-green-600 dark:text-green-400',
                      !isActive && !isCompleted && 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                      isActive && 'bg-primary-500 text-white',
                      isCompleted && !isActive && 'bg-green-500 text-white',
                      !isActive && !isCompleted && 'bg-gray-200 dark:bg-dark-elevated text-gray-500'
                    )}>
                      {isCompleted && !isActive ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">{step.label}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'w-12 h-0.5 mx-2',
                      index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200 dark:bg-dark-border'
                    )} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className={cn('grid gap-6', showPreview ? 'grid-cols-2' : 'grid-cols-1 max-w-3xl mx-auto')}>
          {/* Form Panel */}
          <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-6">
            {/* Step 1: Basics */}
            {currentStep === 'basics' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Page Details
                  </h2>
                  <p className="text-sm text-gray-500">
                    Configure the basic information for your checkout page
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Page Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={config.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g., Pro Subscription Checkout"
                      className="w-full px-4 py-2.5 bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={config.description}
                      onChange={(e) => updateConfig('description', e.target.value)}
                      placeholder="Describe what customers are paying for..."
                      rows={3}
                      className="w-full px-4 py-2.5 bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      URL Slug <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">pay.wiremi.com/</span>
                      <input
                        type="text"
                        value={config.slug}
                        onChange={(e) => updateConfig('slug', generateSlug(e.target.value))}
                        placeholder="your-page-slug"
                        className="flex-1 px-4 py-2.5 bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                      Pricing
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Amount
                          </label>
                          <div className="flex items-center gap-2">
                            <select
                              value={config.currency}
                              onChange={(e) => updateConfig('currency', e.target.value)}
                              className="px-3 py-2.5 bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                            >
                              {currencies.map(c => (
                                <option key={c.code} value={c.code}>
                                  {c.flag} {c.code}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              value={config.amount ?? ''}
                              onChange={(e) => updateConfig('amount', e.target.value ? parseFloat(e.target.value) : null)}
                              placeholder="0.00"
                              disabled={config.allowCustomAmount}
                              className="flex-1 px-4 py-2.5 bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 disabled:opacity-50"
                            />
                          </div>
                        </div>
                      </div>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.allowCustomAmount}
                          onChange={(e) => updateConfig('allowCustomAmount', e.target.checked)}
                          className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                        />
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            Allow custom amount
                          </span>
                          <p className="text-xs text-gray-500">Let customers enter their own amount</p>
                        </div>
                      </label>

                      {config.allowCustomAmount && (
                        <div className="grid grid-cols-2 gap-4 pl-8">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Minimum ({selectedCurrency?.symbol})
                            </label>
                            <input
                              type="number"
                              value={config.minAmount ?? ''}
                              onChange={(e) => updateConfig('minAmount', e.target.value ? parseFloat(e.target.value) : undefined)}
                              placeholder="No minimum"
                              className="w-full px-3 py-2 text-sm bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Maximum ({selectedCurrency?.symbol})
                            </label>
                            <input
                              type="number"
                              value={config.maxAmount ?? ''}
                              onChange={(e) => updateConfig('maxAmount', e.target.value ? parseFloat(e.target.value) : undefined)}
                              placeholder="No maximum"
                              className="w-full px-3 py-2 text-sm bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Methods */}
            {currentStep === 'payments' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Payment Methods
                  </h2>
                  <p className="text-sm text-gray-500">
                    Choose which payment methods to accept on this checkout page
                  </p>
                </div>

                <div className="space-y-3">
                  {config.paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer',
                        method.enabled
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                          : 'border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                      onClick={() => togglePaymentMethod(method.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center',
                          method.enabled
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 dark:bg-dark-elevated text-gray-500'
                        )}>
                          {method.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {method.name}
                            </h3>
                            {method.popular && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{method.description}</p>
                          {method.fees && (
                            <p className="text-xs text-gray-400 mt-1">Fee: {method.fees}</p>
                          )}
                        </div>
                      </div>
                      <div className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                        method.enabled
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300 dark:border-gray-600'
                      )}>
                        {method.enabled && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                        Payment method availability
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        Some payment methods may be unavailable in certain regions. Customers will only see methods available in their location.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Branding */}
            {currentStep === 'branding' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Branding & Design
                  </h2>
                  <p className="text-sm text-gray-500">
                    Customize the look and feel of your checkout page
                  </p>
                </div>

                {/* Color Presets */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Color Theme
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {colorPresets.slice(0, -1).map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => {
                          updateBranding('primaryColor', preset.primary)
                          updateBranding('backgroundColor', preset.bg)
                        }}
                        className={cn(
                          'p-3 rounded-xl border-2 transition-all',
                          config.branding.primaryColor === preset.primary
                            ? 'border-primary-500'
                            : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                        )}
                      >
                        <div
                          className="w-full h-8 rounded-lg mb-2"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.branding.primaryColor}
                        onChange={(e) => updateBranding('primaryColor', e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border-0"
                      />
                      <input
                        type="text"
                        value={config.branding.primaryColor}
                        onChange={(e) => updateBranding('primaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 text-sm font-mono bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Background Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.branding.backgroundColor}
                        onChange={(e) => updateBranding('backgroundColor', e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border-0"
                      />
                      <input
                        type="text"
                        value={config.branding.backgroundColor}
                        onChange={(e) => updateBranding('backgroundColor', e.target.value)}
                        className="flex-1 px-3 py-2 text-sm font-mono bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-dark-elevated rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-dark-border">
                      {config.branding.logo ? (
                        <img src={config.branding.logo} alt="Logo" className="w-full h-full object-contain rounded-xl" />
                      ) : (
                        <Image className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload Logo
                      </button>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB. Recommended: 200x200px</p>
                    </div>
                  </div>
                </div>

                {/* Powered By Toggle */}
                <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-elevated rounded-xl cursor-pointer">
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Show "Powered by Wiremi"
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">Display Wiremi branding on the checkout page</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.branding.showPoweredBy}
                    onChange={(e) => updateBranding('showPoweredBy', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                </label>
              </div>
            )}

            {/* Step 4: Form Fields */}
            {currentStep === 'fields' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Customer Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    Choose what information to collect from customers
                  </p>
                </div>

                <div className="space-y-3">
                  {config.collectFields.map((field) => (
                    <div
                      key={field.id}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl border transition-all',
                        field.enabled
                          ? 'border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface'
                          : 'border-gray-100 dark:border-dark-border/50 bg-gray-50 dark:bg-dark-elevated/50'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={field.enabled}
                          onChange={() => toggleFormField(field.id)}
                          disabled={field.id === 'email'}
                          className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 disabled:opacity-50"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className={cn(
                              'font-medium',
                              field.enabled ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                            )}>
                              {field.label}
                            </h3>
                            {field.id === 'email' && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-dark-elevated text-gray-500 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            Type: {field.type}
                          </p>
                        </div>
                      </div>
                      {field.enabled && field.id !== 'email' && (
                        <label className="flex items-center gap-2 cursor-pointer">
                          <span className="text-sm text-gray-500">Required</span>
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={() => toggleFieldRequired(field.id)}
                            className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>

                {/* Address Collection */}
                <div className="pt-4 border-t border-gray-200 dark:border-dark-border space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Address Collection
                  </h3>

                  <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-elevated rounded-xl cursor-pointer">
                    <div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Collect billing address
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">Required for card payments in some regions</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.settings.requireBillingAddress}
                      onChange={(e) => updateSettings('requireBillingAddress', e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-elevated rounded-xl cursor-pointer">
                    <div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Collect shipping address
                      </span>
                      <p className="text-xs text-gray-500 mt-0.5">For physical product deliveries</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.settings.requireShippingAddress}
                      onChange={(e) => updateSettings('requireShippingAddress', e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Step 5: Preview & Publish */}
            {currentStep === 'preview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    Review & Publish
                  </h2>
                  <p className="text-sm text-gray-500">
                    Review your checkout page configuration before publishing
                  </p>
                </div>

                {/* Summary */}
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-dark-elevated rounded-xl">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Page Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Name</span>
                        <span className="font-medium text-gray-900 dark:text-white">{config.name || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">URL</span>
                        <span className="font-mono text-primary-600 dark:text-primary-400">
                          pay.wiremi.com/{config.slug || '...'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {config.allowCustomAmount
                            ? 'Customer enters amount'
                            : config.amount
                              ? `${selectedCurrency?.symbol}${config.amount.toFixed(2)} ${config.currency}`
                              : '-'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-dark-elevated rounded-xl">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Payment Methods ({enabledPaymentMethods.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {enabledPaymentMethods.map(pm => (
                        <span
                          key={pm.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-dark-surface text-sm rounded-lg border border-gray-200 dark:border-dark-border"
                        >
                          {pm.icon}
                          {pm.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-dark-elevated rounded-xl">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Collected Fields ({enabledFields.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {enabledFields.map(f => (
                        <span
                          key={f.id}
                          className="px-3 py-1.5 bg-white dark:bg-dark-surface text-sm rounded-lg border border-gray-200 dark:border-dark-border"
                        >
                          {f.label}
                          {f.required && <span className="text-red-500 ml-1">*</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Settings */}
                <div className="pt-4 border-t border-gray-200 dark:border-dark-border space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Additional Settings
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Success Redirect URL
                    </label>
                    <input
                      type="url"
                      value={config.settings.successUrl}
                      onChange={(e) => updateSettings('successUrl', e.target.value)}
                      placeholder="https://yoursite.com/thank-you"
                      className="w-full px-4 py-2.5 bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.settings.sendReceipt}
                        onChange={(e) => updateSettings('sendReceipt', e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Send receipt to customer
                      </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.settings.notifyOnPayment}
                        onChange={(e) => updateSettings('notifyOnPayment', e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Notify me on payment
                      </span>
                    </label>
                  </div>
                </div>

                {/* Publish Button */}
                <div className="pt-6">
                  <button
                    onClick={handlePublish}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white bg-primary-500 hover:bg-primary-600 rounded-xl font-medium transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                    Publish Checkout Page
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Your page will be live at pay.wiremi.com/{config.slug}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep !== 'preview' && (
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-dark-border">
                <button
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Live Preview Panel */}
          {showPreview && (
            <div className="sticky top-6">
              <div className="bg-gray-100 dark:bg-dark-elevated rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Live Preview
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark-border rounded-lg">
                      <Smartphone className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark-border rounded-lg bg-gray-200 dark:bg-dark-border">
                      <Layout className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* Mock Checkout Preview */}
                <div
                  className="rounded-xl overflow-hidden shadow-2xl"
                  style={{ backgroundColor: config.branding.backgroundColor }}
                >
                  <div className="p-6 min-h-[500px]">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                      {config.branding.logo ? (
                        <img src={config.branding.logo} alt="Logo" className="h-12 object-contain" />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: config.branding.primaryColor }}
                        >
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        {config.name || 'Checkout Page'}
                      </h2>
                      {config.description && (
                        <p className="text-sm text-gray-500">{config.description}</p>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold" style={{ color: config.branding.primaryColor }}>
                        {config.allowCustomAmount ? (
                          <span className="text-lg text-gray-500">Enter amount</span>
                        ) : config.amount ? (
                          `${selectedCurrency?.symbol}${config.amount.toFixed(2)}`
                        ) : (
                          <span className="text-gray-300">$0.00</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{config.currency}</p>
                    </div>

                    {/* Form Fields Preview */}
                    <div className="space-y-3 mb-6">
                      {enabledFields.slice(0, 3).map(field => (
                        <div key={field.id}>
                          <input
                            type="text"
                            placeholder={field.placeholder || field.label}
                            disabled
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Payment Methods Preview */}
                    <div className="space-y-2 mb-6">
                      {enabledPaymentMethods.slice(0, 3).map(pm => (
                        <div
                          key={pm.id}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="text-gray-500">{pm.icon}</div>
                          <span className="text-sm font-medium text-gray-700">{pm.name}</span>
                        </div>
                      ))}
                      {enabledPaymentMethods.length > 3 && (
                        <p className="text-xs text-center text-gray-400">
                          +{enabledPaymentMethods.length - 3} more methods
                        </p>
                      )}
                    </div>

                    {/* Pay Button */}
                    <button
                      className="w-full py-3 rounded-xl font-medium text-white"
                      style={{ backgroundColor: config.branding.primaryColor }}
                    >
                      Pay {config.amount ? `${selectedCurrency?.symbol}${config.amount.toFixed(2)}` : 'Now'}
                    </button>

                    {/* Powered By */}
                    {config.branding.showPoweredBy && (
                      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                        <Shield className="w-3 h-3" />
                        <span>Powered by Wiremi</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
