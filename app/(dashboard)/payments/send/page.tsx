'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Send,
  User,
  Mail,
  Building2,
  CreditCard,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Upload,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'
import { isValidEmail, formatCurrency } from '@/lib/utils'

type PaymentStep = 1 | 2 | 3

interface PaymentFormData {
  fromWallet: string
  recipientType: 'individual' | 'business'
  recipientName: string
  recipientEmail: string
  recipientAccount: string
  recipientBank: string
  amount: string
  currency: string
  reference: string
  description: string
  paymentDate: 'now' | 'scheduled'
  scheduledDate?: string
  attachments: File[]
}

export default function SendPaymentPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [currentStep, setCurrentStep] = useState<PaymentStep>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<PaymentFormData>({
    fromWallet: '',
    recipientType: 'business',
    recipientName: '',
    recipientEmail: '',
    recipientAccount: '',
    recipientBank: '',
    amount: '',
    currency: 'USD',
    reference: '',
    description: '',
    paymentDate: 'now',
    attachments: [],
  })

  // Mock wallets
  const wallets = [
    { value: '1', label: 'Main Operating Account (USD) - $125,430.50' },
    { value: '2', label: 'Euro Operations (EUR) - €87,250.00' },
    { value: '3', label: 'UK Payroll (GBP) - £45,890.25' },
  ]

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
  ]

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fromWallet) newErrors.fromWallet = 'Please select a wallet'
    if (!formData.recipientName.trim()) newErrors.recipientName = 'Recipient name is required'
    if (!formData.recipientEmail.trim()) {
      newErrors.recipientEmail = 'Email is required'
    } else if (!isValidEmail(formData.recipientEmail)) {
      newErrors.recipientEmail = 'Please enter a valid email'
    }
    if (!formData.recipientAccount.trim()) newErrors.recipientAccount = 'Account number is required'
    if (!formData.recipientBank.trim()) newErrors.recipientBank = 'Bank name is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount'
    }
    if (!formData.currency) newErrors.currency = 'Please select a currency'
    if (formData.paymentDate === 'scheduled' && !formData.scheduledDate) {
      newErrors.scheduledDate = 'Please select a date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false

    if (currentStep === 1) {
      isValid = validateStep1()
    } else if (currentStep === 2) {
      isValid = validateStep2()
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3) as PaymentStep)
    } else {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please complete all required fields',
      })
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as PaymentStep)
    setErrors({})
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      showToast({
        type: 'success',
        title: 'Payment Sent Successfully',
        message: `Payment of ${formData.currency} ${formData.amount} has been sent to ${formData.recipientName}`,
      })

      setTimeout(() => {
        router.push('/transactions')
      }, 1500)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Payment Failed',
        message: 'Unable to process payment. Please try again.',
      })
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof PaymentFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const steps = [
    { number: 1, title: 'Recipient Details' },
    { number: 2, title: 'Payment Details' },
    { number: 3, title: 'Review & Confirm' },
  ]

  // Calculate fees (mock)
  const calculateFees = () => {
    const amount = parseFloat(formData.amount) || 0
    const fee = amount * 0.005 // 0.5% fee
    const total = amount + fee
    return { fee, total }
  }

  const { fee, total } = calculateFees()

  return (
    <PageLayout maxWidth="wide">
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
          Back
        </Button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Send Payment
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Send money to individuals or businesses
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => {
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-success text-white'
                          : isActive
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 dark:bg-dark-border text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="font-semibold">{step.number}</span>
                      )}
                    </div>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        isActive || isCompleted
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 dark:text-gray-400'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all ${
                        isCompleted
                          ? 'bg-success'
                          : 'bg-gray-200 dark:bg-dark-border'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Recipient Details */}
          {currentStep === 1 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Recipient Details
              </h2>

              <div className="space-y-6">
                {/* From Wallet */}
                <Select
                  label="From Wallet"
                  options={wallets}
                  value={formData.fromWallet}
                  onChange={(e) => updateFormData('fromWallet', e.target.value)}
                  error={errors.fromWallet}
                  required
                />

                {/* Recipient Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Recipient Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => updateFormData('recipientType', 'individual')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.recipientType === 'individual'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                          : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                      }`}
                    >
                      <User className="w-6 h-6 text-gray-600 dark:text-gray-400 mb-2" />
                      <p className="font-medium text-gray-900 dark:text-white">Individual</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateFormData('recipientType', 'business')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.recipientType === 'business'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                          : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                      }`}
                    >
                      <Building2 className="w-6 h-6 text-gray-600 dark:text-gray-400 mb-2" />
                      <p className="font-medium text-gray-900 dark:text-white">Business</p>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={formData.recipientType === 'business' ? 'Business Name' : 'Full Name'}
                    placeholder="Enter recipient name"
                    value={formData.recipientName}
                    onChange={(e) => updateFormData('recipientName', e.target.value)}
                    error={errors.recipientName}
                    icon={formData.recipientType === 'business' ? <Building2 className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    iconPosition="left"
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="recipient@company.com"
                    value={formData.recipientEmail}
                    onChange={(e) => updateFormData('recipientEmail', e.target.value)}
                    error={errors.recipientEmail}
                    icon={<Mail className="w-5 h-5" />}
                    iconPosition="left"
                    required
                  />

                  <Input
                    label="Account Number"
                    placeholder="1234567890"
                    value={formData.recipientAccount}
                    onChange={(e) => updateFormData('recipientAccount', e.target.value)}
                    error={errors.recipientAccount}
                    icon={<CreditCard className="w-5 h-5" />}
                    iconPosition="left"
                    required
                  />

                  <Input
                    label="Bank Name"
                    placeholder="Chase Bank"
                    value={formData.recipientBank}
                    onChange={(e) => updateFormData('recipientBank', e.target.value)}
                    error={errors.recipientBank}
                    icon={<Building2 className="w-5 h-5" />}
                    iconPosition="left"
                    required
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Step 2: Payment Details */}
          {currentStep === 2 && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Payment Details
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => updateFormData('amount', e.target.value)}
                    error={errors.amount}
                    required
                  />

                  <Select
                    label="Currency"
                    options={currencies}
                    value={formData.currency}
                    onChange={(e) => updateFormData('currency', e.target.value)}
                    error={errors.currency}
                    required
                  />
                </div>

                <Input
                  label="Reference (Optional)"
                  placeholder="Invoice #, PO #, etc."
                  value={formData.reference}
                  onChange={(e) => updateFormData('reference', e.target.value)}
                  icon={<FileText className="w-5 h-5" />}
                  iconPosition="left"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Add a description for this payment..."
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Payment Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    When to send
                  </label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => updateFormData('paymentDate', 'now')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.paymentDate === 'now'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                          : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                      }`}
                    >
                      <Send className="w-6 h-6 text-gray-600 dark:text-gray-400 mb-2" />
                      <p className="font-medium text-gray-900 dark:text-white">Send Now</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateFormData('paymentDate', 'scheduled')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.paymentDate === 'scheduled'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                          : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                      }`}
                    >
                      <Calendar className="w-6 h-6 text-gray-600 dark:text-gray-400 mb-2" />
                      <p className="font-medium text-gray-900 dark:text-white">Schedule</p>
                    </button>
                  </div>

                  {formData.paymentDate === 'scheduled' && (
                    <Input
                      type="date"
                      label="Scheduled Date"
                      value={formData.scheduledDate || ''}
                      onChange={(e) => updateFormData('scheduledDate', e.target.value)}
                      error={errors.scheduledDate}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  )}
                </div>

                {/* Fee Notice */}
                {formData.amount && parseFloat(formData.amount) > 0 && (
                  <div className="p-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-primary-900 dark:text-primary-300 mb-1">
                          Transaction Fee: {formData.currency} {fee.toFixed(2)}
                        </p>
                        <p className="text-primary-700 dark:text-primary-400">
                          Total amount to be deducted: {formData.currency} {total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Step 3: Review & Confirm */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Review Payment
                </h2>

                {/* Amount Summary */}
                <div className="text-center mb-8 pb-8 border-b border-gray-200 dark:border-dark-border">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    You're sending
                  </p>
                  <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    {formData.currency} {parseFloat(formData.amount).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    to {formData.recipientName}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">From</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {wallets.find(w => w.value === formData.fromWallet)?.label}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recipient</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formData.recipientName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {formData.recipientEmail}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Account</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formData.recipientAccount}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {formData.recipientBank}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">When</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formData.paymentDate === 'now' ? 'Immediately' : `Scheduled for ${formData.scheduledDate}`}
                    </p>
                  </div>

                  {formData.reference && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reference</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formData.reference}
                      </p>
                    </div>
                  )}

                  {formData.description && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Description</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formData.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Cost Breakdown */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-border">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Payment Amount</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formData.currency} {parseFloat(formData.amount).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Transaction Fee</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formData.currency} {fee.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-dark-border">
                      <span className="text-base font-semibold text-gray-900 dark:text-white">Total</span>
                      <span className="text-base font-bold text-gray-900 dark:text-white">
                        {formData.currency} {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Security Notice */}
              <div className="p-4 bg-success/5 border border-success/20 rounded-xl">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-success mb-1">
                      Secure Payment
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      This payment will be processed securely. You'll receive a confirmation email once completed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleBack}
                icon={<ArrowLeft className="w-5 h-5" />}
                iconPosition="left"
                disabled={isLoading}
              >
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                type="button"
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleNext}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="flex-1"
                loading={isLoading}
                icon={<Send className="w-5 h-5" />}
                iconPosition="right"
              >
                Confirm & Send Payment
              </Button>
            )}
          </div>
        </form>
      </div>
    </PageLayout>
  )
}
