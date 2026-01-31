'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  Send,
  Building2,
  Smartphone,
  CheckCircle2,
  Info,
  AlertCircle,
  Clock,
  Wallet,
  Bitcoin,
  Phone,
  Hash,
  Mail,
  DollarSign,
  FileText,
  Calendar,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import { formatNumber, cn } from '@/lib/utils'

interface WalletOption {
  value: string
  label: string
  currency: string
  symbol: string
  balance: number
  flag: string
}

type PayoutMethod = 'wiremi' | 'bank' | 'mobile_money' | 'crypto' | 'digital_wallet'
type BankRail = 'local' | 'swift' | 'sepa' | 'ach' | 'fedwire' | 'faster_payments' | 'pix' | 'spei' | 'eft' | 'interac'
type CryptoNetwork = 'ethereum' | 'tron' | 'solana' | 'polygon' | 'arbitrum' | 'base' | 'optimism' | 'avalanche'
type DigitalWalletType = 'paypal' | 'alipay' | 'wechat'

interface PaymentFormData {
  fromWallet: string
  payoutMethod: PayoutMethod | null
  // Wiremi fields
  wiremiId: string
  wiremiRecipientName: string
  // Bank fields
  bankRail: BankRail
  recipientName: string
  accountNumber: string
  routingNumber: string
  swiftCode: string
  iban: string
  bankName: string
  bankCountry: string
  // Mobile Money fields
  mobileProvider: string
  mobileNumber: string
  mobileCountry: string
  // Crypto fields
  cryptoCurrency: string
  cryptoNetwork: CryptoNetwork
  walletAddress: string
  // Digital Wallet fields
  digitalWallet: DigitalWalletType
  walletEmail: string
  walletPhone: string
  // Payment details
  amount: string
  currency: string
  reference: string
  description: string
  paymentDate: 'now' | 'scheduled'
  scheduledDate?: string
}

// Payout method configurations
const payoutMethods = [
  {
    id: 'wiremi' as const,
    name: 'Wiremi',
    description: 'Send instantly via Wiremi ID',
    icon: '💎',
    badge: 'Instant',
    color: 'from-teal-500 to-teal-600',
  },
  {
    id: 'bank' as const,
    name: 'Bank Transfer',
    description: 'ACH, SWIFT, SEPA, Faster Payments, PIX & more',
    icon: Building2,
    badge: null,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'mobile_money' as const,
    name: 'Mobile Money',
    description: 'M-Pesa, MTN MoMo, Airtel Money & more',
    icon: Smartphone,
    badge: null,
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'crypto' as const,
    name: 'Cryptocurrency',
    description: 'USDC, USDT, EURC on multiple networks',
    icon: Bitcoin,
    badge: null,
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 'digital_wallet' as const,
    name: 'Digital Wallets',
    description: 'PayPal, Alipay, WeChat Pay',
    icon: Wallet,
    badge: null,
    color: 'from-purple-500 to-purple-600',
  },
]

const bankRails = [
  { id: 'local' as const, name: 'Local Transfer', description: 'Domestic bank transfer' },
  { id: 'ach' as const, name: 'ACH', description: 'US domestic transfers' },
  { id: 'fedwire' as const, name: 'Fedwire', description: 'Same-day US transfers' },
  { id: 'swift' as const, name: 'SWIFT', description: 'International wire transfer' },
  { id: 'sepa' as const, name: 'SEPA', description: 'European transfers' },
  { id: 'faster_payments' as const, name: 'Faster Payments', description: 'UK instant transfers' },
  { id: 'pix' as const, name: 'PIX', description: 'Brazil instant transfers' },
  { id: 'spei' as const, name: 'SPEI', description: 'Mexico instant transfers' },
  { id: 'eft' as const, name: 'EFT', description: 'South Africa transfers' },
  { id: 'interac' as const, name: 'Interac e-Transfer', description: 'Canada transfers' },
]

const mobileMoneyProviders = [
  { id: 'mpesa', name: 'M-Pesa', countries: ['KE', 'TZ', 'GH', 'EG'] },
  { id: 'mtn_momo', name: 'MTN Mobile Money', countries: ['GH', 'NG', 'UG', 'ZA', 'CI', 'CM'] },
  { id: 'airtel_money', name: 'Airtel Money', countries: ['KE', 'UG', 'TZ', 'NG', 'GH'] },
  { id: 'orange_money', name: 'Orange Money', countries: ['SN', 'CI', 'CM', 'ML'] },
  { id: 'wave', name: 'Wave', countries: ['SN', 'CI', 'ML', 'BF'] },
  { id: 'chipper', name: 'Chipper Cash', countries: ['NG', 'GH', 'KE', 'UG', 'TZ', 'ZA'] },
]

const cryptoCurrencies = [
  { id: 'usdc', name: 'USDC', fullName: 'USD Coin' },
  { id: 'usdt', name: 'USDT', fullName: 'Tether' },
  { id: 'eurc', name: 'EURC', fullName: 'Euro Coin' },
]

const cryptoNetworks = [
  { id: 'ethereum' as const, name: 'Ethereum', fee: 'High' },
  { id: 'polygon' as const, name: 'Polygon', fee: 'Low' },
  { id: 'arbitrum' as const, name: 'Arbitrum', fee: 'Low' },
  { id: 'base' as const, name: 'Base', fee: 'Low' },
  { id: 'optimism' as const, name: 'Optimism', fee: 'Low' },
  { id: 'solana' as const, name: 'Solana', fee: 'Very Low' },
  { id: 'tron' as const, name: 'Tron', fee: 'Very Low' },
  { id: 'avalanche' as const, name: 'Avalanche', fee: 'Low' },
]

const digitalWallets = [
  { id: 'paypal' as const, name: 'PayPal', icon: '💳' },
  { id: 'alipay' as const, name: 'Alipay', icon: '🔵' },
  { id: 'wechat' as const, name: 'WeChat Pay', icon: '💬' },
]

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'EU', name: 'European Union' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'GH', name: 'Ghana' },
  { code: 'KE', name: 'Kenya' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'CA', name: 'Canada' },
  { code: 'IN', name: 'India' },
  { code: 'SG', name: 'Singapore' },
  { code: 'AU', name: 'Australia' },
  { code: 'CN', name: 'China' },
]

function SendMoneyPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [wiremiLookupResult, setWiremiLookupResult] = useState<{ name: string; verified: boolean } | null>(null)
  const [isLookingUp, setIsLookingUp] = useState(false)

  const [formData, setFormData] = useState<PaymentFormData>({
    fromWallet: searchParams.get('wallet') || '',
    payoutMethod: null,
    // Wiremi
    wiremiId: '',
    wiremiRecipientName: '',
    // Bank
    bankRail: 'local',
    recipientName: '',
    accountNumber: '',
    routingNumber: '',
    swiftCode: '',
    iban: '',
    bankName: '',
    bankCountry: 'US',
    // Mobile Money
    mobileProvider: '',
    mobileNumber: '',
    mobileCountry: 'NG',
    // Crypto
    cryptoCurrency: 'usdc',
    cryptoNetwork: 'polygon',
    walletAddress: '',
    // Digital Wallet
    digitalWallet: 'paypal',
    walletEmail: '',
    walletPhone: '',
    // Payment
    amount: '',
    currency: 'USD',
    reference: '',
    description: '',
    paymentDate: 'now',
  })

  const wallets: WalletOption[] = [
    { value: '1', label: 'Main Operating Account', currency: 'USD', symbol: '$', balance: 125430.50, flag: '🇺🇸' },
    { value: '2', label: 'Euro Operations', currency: 'EUR', symbol: '€', balance: 87250.00, flag: '🇪🇺' },
    { value: '3', label: 'UK Payroll', currency: 'GBP', symbol: '£', balance: 45890.25, flag: '🇬🇧' },
    { value: '4', label: 'Naira Account', currency: 'NGN', symbol: '₦', balance: 12450000.00, flag: '🇳🇬' },
  ]

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'NGN', label: 'NGN - Nigerian Naira' },
    { value: 'GHS', label: 'GHS - Ghanaian Cedi' },
    { value: 'KES', label: 'KES - Kenyan Shilling' },
    { value: 'ZAR', label: 'ZAR - South African Rand' },
    { value: 'BRL', label: 'BRL - Brazilian Real' },
    { value: 'MXN', label: 'MXN - Mexican Peso' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
  ]

  const selectedWalletData = wallets.find((w) => w.value === formData.fromWallet)

  // Wiremi ID lookup
  const handleWiremiLookup = async () => {
    if (!formData.wiremiId.trim()) return

    setIsLookingUp(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (formData.wiremiId.toLowerCase().startsWith('wm')) {
      setWiremiLookupResult({
        name: 'Acme Corporation Ltd',
        verified: true,
      })
      setFormData((prev) => ({ ...prev, wiremiRecipientName: 'Acme Corporation Ltd' }))
    } else {
      setWiremiLookupResult(null)
      setErrors((prev) => ({ ...prev, wiremiId: 'Wiremi ID not found' }))
    }
    setIsLookingUp(false)
  }

  useEffect(() => {
    if (formData.wiremiId.length >= 8) {
      const timeout = setTimeout(handleWiremiLookup, 500)
      return () => clearTimeout(timeout)
    } else {
      setWiremiLookupResult(null)
    }
  }, [formData.wiremiId])

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.fromWallet) newErrors.fromWallet = 'Please select a wallet'
      if (!formData.payoutMethod) newErrors.payoutMethod = 'Please select a payout method'
    }

    if (currentStep === 2) {
      switch (formData.payoutMethod) {
        case 'wiremi':
          if (!formData.wiremiId.trim()) newErrors.wiremiId = 'Wiremi ID is required'
          if (!wiremiLookupResult) newErrors.wiremiId = 'Please enter a valid Wiremi ID'
          break
        case 'bank':
          if (!formData.recipientName.trim()) newErrors.recipientName = 'Recipient name is required'
          if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required'
          if (formData.bankRail === 'swift' && !formData.swiftCode.trim()) newErrors.swiftCode = 'SWIFT code is required'
          if (['sepa'].includes(formData.bankRail) && !formData.iban.trim()) newErrors.iban = 'IBAN is required'
          if (['ach', 'fedwire'].includes(formData.bankRail) && !formData.routingNumber.trim()) newErrors.routingNumber = 'Routing number is required'
          break
        case 'mobile_money':
          if (!formData.mobileProvider) newErrors.mobileProvider = 'Please select a provider'
          if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Phone number is required'
          break
        case 'crypto':
          if (!formData.walletAddress.trim()) newErrors.walletAddress = 'Wallet address is required'
          break
        case 'digital_wallet':
          if (formData.digitalWallet === 'paypal' && !formData.walletEmail.trim()) {
            newErrors.walletEmail = 'PayPal email is required'
          }
          if (['alipay', 'wechat'].includes(formData.digitalWallet) && !formData.walletPhone.trim()) {
            newErrors.walletPhone = 'Phone number is required'
          }
          break
      }
    }

    if (currentStep === 3) {
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        newErrors.amount = 'Please enter a valid amount'
      }
      if (selectedWalletData && parseFloat(formData.amount) > selectedWalletData.balance) {
        newErrors.amount = 'Insufficient balance'
      }
      if (formData.paymentDate === 'scheduled' && !formData.scheduledDate) {
        newErrors.scheduledDate = 'Please select a date'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 4) as 1 | 2 | 3 | 4)
    } else {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please complete all required fields',
      })
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3 | 4)
    setErrors({})
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      showToast({
        type: 'success',
        title: 'Payment Sent Successfully',
        message: `Payment of ${formData.currency} ${formData.amount} has been initiated`,
      })
      setTimeout(() => router.push('/wallets'), 1500)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Payment Failed',
        message: 'Unable to process payment. Please try again.',
      })
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const steps = [
    { number: 1, title: 'Payout Method' },
    { number: 2, title: 'Recipient Details' },
    { number: 3, title: 'Payment Amount' },
    { number: 4, title: 'Review & Send' },
  ]

  const calculateFees = () => {
    const amount = parseFloat(formData.amount) || 0
    let feePercent = 0.005

    if (formData.payoutMethod === 'wiremi') feePercent = 0
    if (formData.payoutMethod === 'crypto') feePercent = 0.001
    if (formData.bankRail === 'swift') feePercent = 0.02

    const fee = amount * feePercent
    return { fee, total: amount + fee }
  }

  const { fee, total } = calculateFees()

  const getMethodName = () => {
    const method = payoutMethods.find((m) => m.id === formData.payoutMethod)
    return method?.name || ''
  }

  const getRecipientSummary = () => {
    switch (formData.payoutMethod) {
      case 'wiremi':
        return { name: formData.wiremiRecipientName, detail: `Wiremi ID: ${formData.wiremiId}` }
      case 'bank':
        return { name: formData.recipientName, detail: `Account: ${formData.accountNumber}` }
      case 'mobile_money':
        return { name: formData.mobileNumber, detail: mobileMoneyProviders.find((p) => p.id === formData.mobileProvider)?.name }
      case 'crypto':
        return { name: `${formData.walletAddress.slice(0, 8)}...${formData.walletAddress.slice(-6)}`, detail: `${formData.cryptoCurrency.toUpperCase()} on ${cryptoNetworks.find((n) => n.id === formData.cryptoNetwork)?.name}` }
      case 'digital_wallet':
        return { name: formData.walletEmail || formData.walletPhone, detail: digitalWallets.find((w) => w.id === formData.digitalWallet)?.name }
      default:
        return { name: '', detail: '' }
    }
  }

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
              Send Money
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Send payments globally via bank, mobile money, crypto, or digital wallets
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
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
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-semibold">{step.number}</span>}
                    </div>
                    <p className={`mt-2 text-xs font-medium ${isActive || isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 transition-all ${isCompleted ? 'bg-success' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Step 1: Choose Payout Method */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">From Wallet</h2>
              <p className="text-sm text-gray-500 mb-4">Select the wallet to send from</p>
              <Select
                options={[
                  { value: '', label: 'Choose a wallet' },
                  ...wallets.map((w) => ({
                    value: w.value,
                    label: `${w.flag} ${w.label} (${w.currency}) - ${w.symbol}${formatNumber(w.balance)}`,
                  })),
                ]}
                value={formData.fromWallet}
                onChange={(e) => updateFormData('fromWallet', e.target.value)}
                error={errors.fromWallet}
              />
              {selectedWalletData && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Available Balance</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedWalletData.symbol}{formatNumber(selectedWalletData.balance)}
                    </span>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Payout Method</h2>
              <p className="text-sm text-gray-500 mb-6">Choose how you want to send the payment</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {payoutMethods.map((method) => {
                  const isSelected = formData.payoutMethod === method.id
                  const Icon = typeof method.icon === 'string' ? null : method.icon

                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => updateFormData('payoutMethod', method.id)}
                      className={cn(
                        'p-4 rounded-xl border-2 text-left transition-all',
                        isSelected
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white`}>
                          {Icon ? <Icon className="w-5 h-5" /> : <span className="text-lg">{method.icon as string}</span>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900 dark:text-white">{method.name}</p>
                            {method.badge && <Badge variant="success" size="sm">{method.badge}</Badge>}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-primary-500" />}
                      </div>
                    </button>
                  )
                })}
              </div>
              {errors.payoutMethod && <p className="text-sm text-red-500 mt-2">{errors.payoutMethod}</p>}
            </Card>

            <div className="flex gap-4">
              <Button type="button" variant="primary" size="lg" className="flex-1" onClick={handleNext}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Recipient Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Recipient Details
              </h2>

              {/* Wiremi Method */}
              {formData.payoutMethod === 'wiremi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Wiremi ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g., WM-ACME-1234"
                        value={formData.wiremiId}
                        onChange={(e) => updateFormData('wiremiId', e.target.value.toUpperCase())}
                        className="w-full px-4 py-3 pr-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                      />
                      {isLookingUp && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                    {errors.wiremiId && <p className="text-sm text-red-500 mt-1">{errors.wiremiId}</p>}
                  </div>

                  {wiremiLookupResult && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{wiremiLookupResult.name}</p>
                          <p className="text-sm text-green-600">
                            {wiremiLookupResult.verified ? 'Verified Account' : 'Account Found'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Wiremi transfers are instant and free between Wiremi accounts.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer Method */}
              {formData.payoutMethod === 'bank' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Transfer Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      {bankRails.map((rail) => (
                        <button
                          key={rail.id}
                          type="button"
                          onClick={() => updateFormData('bankRail', rail.id)}
                          className={cn(
                            'p-3 rounded-lg border-2 text-center transition-all',
                            formData.bankRail === rail.id
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                          )}
                        >
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{rail.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{rail.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Recipient Name"
                      placeholder="Full name or business name"
                      value={formData.recipientName}
                      onChange={(e) => updateFormData('recipientName', e.target.value)}
                      error={errors.recipientName}
                      required
                    />

                    <Select
                      label="Country"
                      options={countries.map((c) => ({ value: c.code, label: c.name }))}
                      value={formData.bankCountry}
                      onChange={(e) => updateFormData('bankCountry', e.target.value)}
                    />

                    <Input
                      label="Bank Name"
                      placeholder="e.g., Chase Bank"
                      value={formData.bankName}
                      onChange={(e) => updateFormData('bankName', e.target.value)}
                    />

                    {['sepa'].includes(formData.bankRail) ? (
                      <Input
                        label="IBAN"
                        placeholder="e.g., DE89370400440532013000"
                        value={formData.iban}
                        onChange={(e) => updateFormData('iban', e.target.value.toUpperCase())}
                        error={errors.iban}
                        required
                      />
                    ) : (
                      <Input
                        label="Account Number"
                        placeholder="1234567890"
                        value={formData.accountNumber}
                        onChange={(e) => updateFormData('accountNumber', e.target.value)}
                        error={errors.accountNumber}
                        required
                      />
                    )}

                    {['ach', 'fedwire'].includes(formData.bankRail) && (
                      <Input
                        label="Routing Number"
                        placeholder="021000021"
                        value={formData.routingNumber}
                        onChange={(e) => updateFormData('routingNumber', e.target.value)}
                        error={errors.routingNumber}
                        required
                      />
                    )}

                    {formData.bankRail === 'swift' && (
                      <Input
                        label="SWIFT/BIC Code"
                        placeholder="e.g., CHASUS33"
                        value={formData.swiftCode}
                        onChange={(e) => updateFormData('swiftCode', e.target.value.toUpperCase())}
                        error={errors.swiftCode}
                        required
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Money Method */}
              {formData.payoutMethod === 'mobile_money' && (
                <div className="space-y-6">
                  <Select
                    label="Country"
                    options={countries.filter((c) => ['NG', 'GH', 'KE', 'ZA', 'UG', 'TZ', 'SN', 'CI', 'CM'].includes(c.code)).map((c) => ({ value: c.code, label: c.name }))}
                    value={formData.mobileCountry}
                    onChange={(e) => {
                      updateFormData('mobileCountry', e.target.value)
                      updateFormData('mobileProvider', '')
                    }}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Mobile Money Provider
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {mobileMoneyProviders
                        .filter((p) => p.countries.includes(formData.mobileCountry))
                        .map((provider) => (
                          <button
                            key={provider.id}
                            type="button"
                            onClick={() => updateFormData('mobileProvider', provider.id)}
                            className={cn(
                              'p-4 rounded-xl border-2 text-center transition-all',
                              formData.mobileProvider === provider.id
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            )}
                          >
                            <Smartphone className="w-6 h-6 mx-auto mb-2 text-green-600" />
                            <p className="font-medium text-sm text-gray-900 dark:text-white">{provider.name}</p>
                          </button>
                        ))}
                    </div>
                    {errors.mobileProvider && <p className="text-sm text-red-500 mt-1">{errors.mobileProvider}</p>}
                  </div>

                  <Input
                    label="Phone Number"
                    placeholder="e.g., +234 801 234 5678"
                    value={formData.mobileNumber}
                    onChange={(e) => updateFormData('mobileNumber', e.target.value)}
                    error={errors.mobileNumber}
                    icon={<Phone className="w-5 h-5" />}
                    iconPosition="left"
                    required
                  />
                </div>
              )}

              {/* Crypto Method */}
              {formData.payoutMethod === 'crypto' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Cryptocurrency
                      </label>
                      <div className="flex gap-2">
                        {cryptoCurrencies.map((crypto) => (
                          <button
                            key={crypto.id}
                            type="button"
                            onClick={() => updateFormData('cryptoCurrency', crypto.id)}
                            className={cn(
                              'flex-1 p-3 rounded-lg border-2 text-center transition-all',
                              formData.cryptoCurrency === crypto.id
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                            )}
                          >
                            <p className="font-bold text-gray-900 dark:text-white">{crypto.name}</p>
                            <p className="text-xs text-gray-500">{crypto.fullName}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Network
                      </label>
                      <select
                        value={formData.cryptoNetwork}
                        onChange={(e) => updateFormData('cryptoNetwork', e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500"
                      >
                        {cryptoNetworks.map((network) => (
                          <option key={network.id} value={network.id}>
                            {network.name} (Fee: {network.fee})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Input
                    label="Wallet Address"
                    placeholder="0x..."
                    value={formData.walletAddress}
                    onChange={(e) => updateFormData('walletAddress', e.target.value)}
                    error={errors.walletAddress}
                    icon={<Hash className="w-5 h-5" />}
                    iconPosition="left"
                    required
                  />

                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        Double-check the wallet address and network. Crypto transfers are irreversible.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Digital Wallet Method */}
              {formData.payoutMethod === 'digital_wallet' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Select Wallet
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {digitalWallets.map((wallet) => (
                        <button
                          key={wallet.id}
                          type="button"
                          onClick={() => updateFormData('digitalWallet', wallet.id)}
                          className={cn(
                            'p-4 rounded-xl border-2 text-center transition-all',
                            formData.digitalWallet === wallet.id
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                          )}
                        >
                          <span className="text-2xl mb-2 block">{wallet.icon}</span>
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{wallet.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.digitalWallet === 'paypal' && (
                    <Input
                      label="PayPal Email"
                      type="email"
                      placeholder="recipient@email.com"
                      value={formData.walletEmail}
                      onChange={(e) => updateFormData('walletEmail', e.target.value)}
                      error={errors.walletEmail}
                      icon={<Mail className="w-5 h-5" />}
                      iconPosition="left"
                      required
                    />
                  )}

                  {['alipay', 'wechat'].includes(formData.digitalWallet) && (
                    <Input
                      label="Phone Number"
                      placeholder="+86 138 0000 0000"
                      value={formData.walletPhone}
                      onChange={(e) => updateFormData('walletPhone', e.target.value)}
                      error={errors.walletPhone}
                      icon={<Phone className="w-5 h-5" />}
                      iconPosition="left"
                      required
                    />
                  )}
                </div>
              )}
            </Card>

            <div className="flex gap-4">
              <Button type="button" variant="outline" size="lg" onClick={handleBack} icon={<ArrowLeft className="w-5 h-5" />} iconPosition="left">
                Back
              </Button>
              <Button type="button" variant="primary" size="lg" className="flex-1" onClick={handleNext}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Amount */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Details</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    Description (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Add a note for this payment..."
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 resize-none"
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
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all',
                        formData.paymentDate === 'now'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      )}
                    >
                      <Send className="w-6 h-6 text-gray-600 dark:text-gray-400 mb-2" />
                      <p className="font-medium text-gray-900 dark:text-white">Send Now</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateFormData('paymentDate', 'scheduled')}
                      className={cn(
                        'p-4 rounded-xl border-2 transition-all',
                        formData.paymentDate === 'scheduled'
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      )}
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
                  <div className="p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 rounded-xl">
                    <div className="flex gap-3">
                      <DollarSign className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-primary-900 dark:text-primary-300 mb-1">
                          Transaction Fee: {formData.currency} {fee.toFixed(2)}
                          {formData.payoutMethod === 'wiremi' && ' (Free)'}
                        </p>
                        <p className="text-primary-700 dark:text-primary-400">
                          Total: {formData.currency} {total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <div className="flex gap-4">
              <Button type="button" variant="outline" size="lg" onClick={handleBack} icon={<ArrowLeft className="w-5 h-5" />} iconPosition="left">
                Back
              </Button>
              <Button type="button" variant="primary" size="lg" className="flex-1" onClick={handleNext}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Confirm */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Review Payment</h2>

              {/* Amount Summary */}
              <div className="text-center mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 mb-2">You're sending</p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {formData.currency} {parseFloat(formData.amount).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">via {getMethodName()}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">From</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedWalletData?.flag} {selectedWalletData?.label}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Recipient</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{getRecipientSummary().name}</p>
                  <p className="text-xs text-gray-500">{getRecipientSummary().detail}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">When</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formData.paymentDate === 'now' ? 'Immediately' : `Scheduled for ${formData.scheduledDate}`}
                  </p>
                </div>

                {formData.reference && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Reference</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{formData.reference}</p>
                  </div>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Payment Amount</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formData.currency} {parseFloat(formData.amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Fee</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {formData.currency} {fee.toFixed(2)}
                      {formData.payoutMethod === 'wiremi' && <Badge variant="success" size="sm" className="ml-2">Free</Badge>}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {formData.currency} {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-800 dark:text-green-200">
                  This payment is secured with bank-level encryption and will be processed according to your selected method.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" size="lg" onClick={handleBack} icon={<ArrowLeft className="w-5 h-5" />} iconPosition="left" disabled={isLoading}>
                Back
              </Button>
              <Button
                type="button"
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleSubmit}
                loading={isLoading}
                icon={<Send className="w-5 h-5" />}
                iconPosition="right"
              >
                Confirm & Send Payment
              </Button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default function SendMoneyPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <SendMoneyPageContent />
    </Suspense>
  )
}
