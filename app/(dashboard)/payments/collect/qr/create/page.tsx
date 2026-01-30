'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  QrCode,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Globe,
  AlignLeft,
  Type,
  Palette,
  Download,
  Eye,
  Settings,
  Zap,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function CreateQRCodePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // Form state
  const [qrType, setQRType] = useState<'static' | 'dynamic'>('static')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [amountType, setAmountType] = useState<'fixed' | 'flexible'>('flexible')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [customization, setCustomization] = useState({
    logo: false,
    color: '#EC4899', // pink-500
    backgroundColor: '#FFFFFF',
  })

  const currencies = ['USD', 'EUR', 'GBP', 'NGN', 'KES', 'XAF', 'GHS', 'ZAR']

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleGenerate = () => {
    // Mock QR code generation
    const newQRCodeId = 'qr-' + Math.random().toString(36).substr(2, 9)
    console.log('Generating QR code:', {
      type: qrType,
      name,
      description,
      amountType,
      amount: amountType === 'fixed' ? amount : null,
      currency,
      customization,
    })
    router.push(`/payments/collect/qr/${newQRCodeId}`)
  }

  const canProceed = () => {
    if (step === 1) {
      return name.trim() !== '' && description.trim() !== ''
    }
    if (step === 2) {
      return amountType === 'flexible' || (amountType === 'fixed' && amount.trim() !== '')
    }
    return true
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
            onClick={() => router.push('/payments/collect/qr')}
            className="mb-4"
          >
            Back to QR Codes
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Generate QR Code
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Create a payment QR code in 3 simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= stepNum
                        ? 'bg-primary-500 text-white shadow-lg scale-110'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step > stepNum ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      stepNum
                    )}
                  </div>
                  <p
                    className={`text-xs mt-2 font-medium ${
                      step >= stepNum
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {stepNum === 1 && 'Details'}
                    {stepNum === 2 && 'Amount'}
                    {stepNum === 3 && 'Customize'}
                  </p>
                </div>
                {stepNum < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      step > stepNum
                        ? 'bg-primary-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Step 1: QR Type and Details */}
        {step === 1 && (
          <div className="space-y-6">
            {/* QR Type Selection */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Select QR Code Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setQRType('static')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    qrType === 'static'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    {qrType === 'static' && (
                      <CheckCircle2 className="w-6 h-6 text-primary-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Static QR Code
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Generate once, use forever. Perfect for physical locations.
                  </p>
                  <Badge variant="info" size="sm">Recommended</Badge>
                </button>

                <button
                  onClick={() => setQRType('dynamic')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    qrType === 'dynamic'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    {qrType === 'dynamic' && (
                      <CheckCircle2 className="w-6 h-6 text-primary-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Dynamic QR Code
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Update amounts and details without reprinting.
                  </p>
                  <Badge variant="success" size="sm">Advanced</Badge>
                </button>
              </div>
            </Card>

            {/* Details Form */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                QR Code Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Type className="w-4 h-4" />
                    Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Table 5 - Restaurant"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                    placeholder="e.g., Payment QR code for table 5"
                    rows={3}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Amount Configuration */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Amount Type */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Amount
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setAmountType('flexible')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    amountType === 'flexible'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    {amountType === 'flexible' && (
                      <CheckCircle2 className="w-6 h-6 text-primary-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Flexible Amount
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Customer enters any amount they want to pay
                  </p>
                </button>

                <button
                  onClick={() => setAmountType('fixed')}
                  className={`p-6 rounded-xl border-2 text-left transition-all ${
                    amountType === 'fixed'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    {amountType === 'fixed' && (
                      <CheckCircle2 className="w-6 h-6 text-primary-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Fixed Amount
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Set a specific amount for this QR code
                  </p>
                </button>
              </div>

              {/* Amount Input (if fixed) */}
              {amountType === 'fixed' && (
                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Globe className="w-4 h-4" />
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {currencies.map((curr) => (
                        <option key={curr} value={curr}>
                          {curr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <DollarSign className="w-4 h-4" />
                      Amount
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
                        {currency}
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="w-full pl-20 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Step 3: Customization and Preview */}
        {step === 3 && (
          <div className="space-y-6">
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
                      QR Code Color
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { name: 'Pink', value: '#EC4899' },
                        { name: 'Purple', value: '#A855F7' },
                        { name: 'Blue', value: '#3B82F6' },
                        { name: 'Green', value: '#10B981' },
                        { name: 'Orange', value: '#F59E0B' },
                        { name: 'Red', value: '#EF4444' },
                        { name: 'Indigo', value: '#6366F1' },
                        { name: 'Black', value: '#000000' },
                      ].map((color) => (
                        <button
                          key={color.value}
                          onClick={() =>
                            setCustomization({ ...customization, color: color.value })
                          }
                          className={`w-12 h-12 rounded-lg transition-all ${
                            customization.color === color.value
                              ? 'ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-900 scale-110'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      <Settings className="w-4 h-4" />
                      Additional Options
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="checkbox"
                          checked={customization.logo}
                          onChange={(e) =>
                            setCustomization({
                              ...customization,
                              logo: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-2 focus:ring-primary-500"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Include Logo in Center
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Add your business logo to the QR code
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Preview */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview
                </h2>
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                  <div
                    className="w-full aspect-square rounded-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${customization.color} 0%, ${customization.color}CC 100%)`,
                    }}
                  >
                    <QrCode className="w-3/4 h-3/4 text-white" />
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Summary
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {name || 'Not set'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                    <Badge variant={qrType === 'static' ? 'info' : 'success'} size="sm">
                      {qrType}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {amountType === 'flexible'
                        ? 'Flexible'
                        : `${currency} ${amount || '0.00'}`}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="md"
              onClick={step === 1 ? () => router.push('/payments/collect/qr') : handleBack}
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Step {step} of 3
              </span>
              {step < 3 ? (
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
                  icon={<QrCode className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={handleGenerate}
                >
                  Generate QR Code
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
