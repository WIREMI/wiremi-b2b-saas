'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Link2,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building,
  Bitcoin,
  Wallet,
  Save,
  Eye,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  CheckCircle2,
  Info,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils'

export default function CreatePaymentLinkPage() {
  const router = useRouter()
  const [showPreview, setShowPreview] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amountType: 'fixed' as 'fixed' | 'flexible',
    amount: '',
    currency: 'USD',
    shortCode: '',
    expiresAt: '',
    allowCustomAmount: false,
    enabledMethods: {
      card: true,
      mobileMoney: true,
      bankTransfer: true,
      crypto: true,
      wallet: true,
    },
    metadata: {
      category: 'Services',
      tags: '',
    },
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleMethodToggle = (method: keyof typeof formData.enabledMethods) => {
    setFormData((prev) => ({
      ...prev,
      enabledMethods: {
        ...prev.enabledMethods,
        [method]: !prev.enabledMethods[method],
      },
    }))
  }

  const handleSave = (asDraft = false) => {
    // In production, this would:
    // 1. Validate form data
    // 2. Create PaymentIntent configuration
    // 3. Generate unique link URL
    // 4. Save to database
    // 5. Redirect to link detail page
    console.log('Saving payment link:', { ...formData, status: asDraft ? 'paused' : 'active' })
    router.push('/payments/collect/links')
  }

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Cards', icon: CreditCard, enabled: formData.enabledMethods.card },
    { id: 'mobileMoney', name: 'Mobile Money', icon: Smartphone, enabled: formData.enabledMethods.mobileMoney },
    { id: 'bankTransfer', name: 'Bank Transfer', icon: Building, enabled: formData.enabledMethods.bankTransfer },
    { id: 'crypto', name: 'Cryptocurrency', icon: Bitcoin, enabled: formData.enabledMethods.crypto },
    { id: 'wallet', name: 'Wallet Balance', icon: Wallet, enabled: formData.enabledMethods.wallet },
  ]

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/payments/collect/links')}
          >
            Back to Payment Links
          </Button>

          <div className="mt-4 flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Payment Link
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Set up a shareable payment link in minutes - no coding required
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Basic Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    label="Link Name"
                    placeholder="e.g., Website Development Package"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Internal name for your reference
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe what this payment is for..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <Input
                    label="Short Code (URL)"
                    placeholder="e.g., web-dev-package"
                    value={formData.shortCode}
                    onChange={(e) => handleChange('shortCode', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Your link will be: <span className="font-mono text-primary-600">pay.wiremi.com/link/{formData.shortCode || 'your-code'}</span>
                  </p>
                </div>
              </div>
            </Card>

            {/* Payment Amount */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment Amount
                </h2>
              </div>

              <div className="space-y-4">
                {/* Amount Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Amount Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleChange('amountType', 'fixed')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        formData.amountType === 'fixed'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <DollarSign className={`w-6 h-6 mx-auto mb-2 ${
                          formData.amountType === 'fixed' ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                        <p className={`font-semibold ${
                          formData.amountType === 'fixed' ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'
                        }`}>
                          Fixed Amount
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Set a specific price
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleChange('amountType', 'flexible')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        formData.amountType === 'flexible'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <Settings className={`w-6 h-6 mx-auto mb-2 ${
                          formData.amountType === 'flexible' ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                        <p className={`font-semibold ${
                          formData.amountType === 'flexible' ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'
                        }`}>
                          Flexible Amount
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Customer enters amount
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {formData.amountType === 'fixed' && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Input
                        label="Amount"
                        type="number"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={(e) => handleChange('amount', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Currency
                      </label>
                      <select
                        value={formData.currency}
                        onChange={(e) => handleChange('currency', e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="XAF">XAF</option>
                        <option value="NGN">NGN</option>
                      </select>
                    </div>
                  </div>
                )}

                {formData.amountType === 'flexible' && (
                  <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          Customers will enter their own amount when making payment. Great for donations, tips, or variable pricing.
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Accepted Payment Methods
                </h2>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <div
                      key={method.id}
                      onClick={() => handleMethodToggle(method.id as keyof typeof formData.enabledMethods)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        method.enabled
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${
                            method.enabled ? 'text-primary-600' : 'text-gray-400'
                          }`} />
                          <span className={`font-medium ${
                            method.enabled ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'
                          }`}>
                            {method.name}
                          </span>
                        </div>
                        {method.enabled && (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <Card className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                      All methods recommended
                    </p>
                    <p className="text-xs text-green-800 dark:text-green-200">
                      Enable all payment methods to maximize successful payments. Customers will only see methods available in their region.
                    </p>
                  </div>
                </div>
              </Card>
            </Card>

            {/* Advanced Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Advanced Settings
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    label="Expiration Date (Optional)"
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => handleChange('expiresAt', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Link will automatically deactivate after this date
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.metadata.category}
                    onChange={(e) => handleChange('metadata', { ...formData.metadata, category: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Services">Services</option>
                    <option value="Products">Products</option>
                    <option value="Donations">Donations</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="Events">Events</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Live Preview */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Live Preview
                </h3>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <Link2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formData.name || 'Payment Link'}
                      </div>
                      <div className="text-xs text-gray-500">Wiremi-powered</div>
                    </div>
                  </div>

                  {formData.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {formData.description}
                    </p>
                  )}

                  <div className="mb-6">
                    {formData.amountType === 'fixed' && formData.amount ? (
                      <>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          {formatCurrency(parseFloat(formData.amount), formData.currency)}
                        </div>
                      </>
                    ) : (
                      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                        <input
                          type="text"
                          placeholder="Enter amount"
                          className="w-full text-2xl font-bold bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                          disabled
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mb-6">
                    {paymentMethods.filter(m => m.enabled).slice(0, 3).map((method) => {
                      const Icon = method.icon
                      return (
                        <div
                          key={method.id}
                          className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg"
                        >
                          <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {method.name}
                          </span>
                        </div>
                      )
                    })}
                    {paymentMethods.filter(m => m.enabled).length > 3 && (
                      <p className="text-xs text-center text-gray-500">
                        +{paymentMethods.filter(m => m.enabled).length - 3} more methods
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-300 dark:border-gray-600">
                    <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <span>Powered by Wiremi</span>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Save className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={() => handleSave(false)}
                  className="w-full"
                  disabled={!formData.name || (formData.amountType === 'fixed' && !formData.amount)}
                >
                  Create & Activate Link
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleSave(true)}
                  className="w-full"
                >
                  Save as Draft
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
