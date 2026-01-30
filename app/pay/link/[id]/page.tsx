'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Bitcoin,
  ChevronRight,
  Lock,
  Shield,
  CheckCircle2,
  ArrowLeft,
  Globe,
  Zap,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { cn, formatCurrency } from '@/lib/utils'

type PaymentMethod = 'card' | 'mobile-money' | 'bank-transfer' | 'wallet' | 'crypto'
type PaymentStep = 'select-method' | 'enter-details' | 'processing' | 'success' | 'failed'

interface MobileMoneyProvider {
  id: string
  name: string
  logo: string
  countries: string[]
}

const MOBILE_MONEY_PROVIDERS: MobileMoneyProvider[] = [
  { id: 'mpesa', name: 'M-Pesa', logo: '/images/mpesa.png', countries: ['KE', 'TZ', 'GH'] },
  { id: 'mtn', name: 'MTN Mobile Money', logo: '/images/mtn.png', countries: ['GH', 'UG', 'CM', 'NG'] },
  { id: 'airtel', name: 'Airtel Money', logo: '/images/airtel.png', countries: ['KE', 'UG', 'TZ', 'NG'] },
  { id: 'orange', name: 'Orange Money', logo: '/images/orange.png', countries: ['SN', 'CM', 'CI'] },
]

export default function PaymentCheckoutPage() {
  const params = useParams()
  const linkId = params.id as string

  const [step, setStep] = useState<PaymentStep>('select-method')
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Card form state
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({})

  // Mobile money form state
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState('')

  // Customer info
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  // Mock link data - in production this would come from API
  const linkData = {
    id: linkId,
    merchantName: 'Wiremi Tech Solutions',
    merchantLogo: '/images/wiremi-icon.png',
    itemName: 'Website Development Package',
    description: 'Full-stack web development services including design, development, and deployment.',
    amount: 1500,
    currency: 'USD',
    allowCustomAmount: false,
    enabledMethods: {
      card: true,
      mobileMoney: true,
      bankTransfer: true,
      wallet: true,
      crypto: true,
    },
  }

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : value
  }

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  // Detect card type
  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, '')
    if (/^4/.test(num)) return 'visa'
    if (/^5[1-5]/.test(num)) return 'mastercard'
    if (/^3[47]/.test(num)) return 'amex'
    if (/^6(?:011|5)/.test(num)) return 'discover'
    return null
  }

  const cardType = getCardType(cardNumber)

  // Validate card form
  const validateCardForm = () => {
    const errors: Record<string, string> = {}

    if (!email) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address'
    }

    const num = cardNumber.replace(/\s/g, '')
    if (!num) {
      errors.cardNumber = 'Card number is required'
    } else if (num.length < 15 || num.length > 16) {
      errors.cardNumber = 'Invalid card number'
    }

    if (!cardExpiry) {
      errors.cardExpiry = 'Expiry date is required'
    } else {
      const [month, year] = cardExpiry.split('/')
      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        errors.cardExpiry = 'Invalid month'
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        errors.cardExpiry = 'Card has expired'
      }
    }

    if (!cardCvc) {
      errors.cardCvc = 'CVC is required'
    } else if (cardCvc.length < 3 || cardCvc.length > 4) {
      errors.cardCvc = 'Invalid CVC'
    }

    if (!cardName) {
      errors.cardName = 'Cardholder name is required'
    }

    setCardErrors(errors)
    setEmailError(errors.email || '')
    return Object.keys(errors).length === 0
  }

  // Handle payment submission
  const handlePayment = async () => {
    if (selectedMethod === 'card' && !validateCardForm()) {
      return
    }

    if (selectedMethod === 'mobile-money') {
      if (!email) {
        setEmailError('Email is required')
        return
      }
      if (!selectedProvider) {
        return
      }
      if (!phoneNumber || phoneNumber.length < 10) {
        return
      }
    }

    setStep('processing')
    setIsLoading(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))

    setIsLoading(false)
    setStep('success')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      name: 'Credit / Debit Card',
      description: 'Visa, Mastercard, Amex',
      icon: <CreditCard className="w-6 h-6" />,
      enabled: linkData.enabledMethods.card,
    },
    {
      id: 'mobile-money' as PaymentMethod,
      name: 'Mobile Money',
      description: 'M-Pesa, MTN, Airtel',
      icon: <Smartphone className="w-6 h-6" />,
      enabled: linkData.enabledMethods.mobileMoney,
    },
    {
      id: 'bank-transfer' as PaymentMethod,
      name: 'Bank Transfer',
      description: 'Direct bank payment',
      icon: <Building2 className="w-6 h-6" />,
      enabled: linkData.enabledMethods.bankTransfer,
    },
    {
      id: 'wallet' as PaymentMethod,
      name: 'Wiremi Wallet',
      description: 'Pay with your balance',
      icon: <Wallet className="w-6 h-6" />,
      enabled: linkData.enabledMethods.wallet,
    },
    {
      id: 'crypto' as PaymentMethod,
      name: 'Cryptocurrency',
      description: 'Bitcoin, USDT, ETH',
      icon: <Bitcoin className="w-6 h-6" />,
      enabled: linkData.enabledMethods.crypto,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Order Summary */}
        <div className="lg:w-2/5 xl:w-1/3 bg-white dark:bg-dark-surface lg:bg-gradient-to-br lg:from-gray-900 lg:via-primary-900 lg:to-gray-900 p-6 lg:p-10 xl:p-12">
          <div className="lg:sticky lg:top-10">
            {/* Merchant Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <Image
                  src={linkData.merchantLogo}
                  alt={linkData.merchantName}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white lg:text-white">
                  {linkData.merchantName}
                </h2>
                <p className="text-sm text-gray-500 lg:text-gray-400">Verified Merchant</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white lg:text-white mb-2">
                {linkData.itemName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 lg:text-gray-300 text-sm leading-relaxed">
                {linkData.description}
              </p>
            </div>

            {/* Amount */}
            <div className="p-6 bg-gray-50 dark:bg-dark-elevated lg:bg-white/10 rounded-2xl border border-gray-200 dark:border-dark-border lg:border-white/10 mb-8">
              <p className="text-sm text-gray-500 lg:text-gray-400 mb-1">Amount to pay</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white lg:text-white">
                  {formatCurrency(linkData.amount, linkData.currency)}
                </span>
                <span className="text-lg text-gray-500 lg:text-gray-400">{linkData.currency}</span>
              </div>
            </div>

            {/* Security Badges - Desktop */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-3 text-gray-400 text-sm mb-4">
                <Lock className="w-4 h-4" />
                <span>256-bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm mb-4">
                <Shield className="w-4 h-4" />
                <span>PCI DSS Compliant</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Globe className="w-4 h-4" />
                <span>Powered by Wiremi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Payment Form */}
        <div className="flex-1 p-6 lg:p-10 xl:p-12">
          <div className="max-w-lg mx-auto">
            {/* Step: Select Payment Method */}
            {step === 'select-method' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Choose payment method
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select how you'd like to pay
                  </p>
                </div>

                <div className="space-y-3">
                  {paymentMethods.filter(m => m.enabled).map((method) => (
                    <button
                      key={method.id}
                      onClick={() => {
                        setSelectedMethod(method.id)
                        setStep('enter-details')
                      }}
                      className={cn(
                        'w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 group',
                        'bg-white dark:bg-dark-surface hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/10',
                        'border-gray-200 dark:border-dark-border'
                      )}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-dark-elevated flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {method.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {method.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {method.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    </button>
                  ))}
                </div>

                {/* Security Badge - Mobile */}
                <div className="lg:hidden flex items-center justify-center gap-6 pt-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>PCI DSS</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step: Enter Payment Details */}
            {step === 'enter-details' && (
              <div className="space-y-6">
                {/* Back Button */}
                <button
                  onClick={() => {
                    setStep('select-method')
                    setSelectedMethod(null)
                    setCardErrors({})
                  }}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to payment methods</span>
                </button>

                {/* Card Payment Form */}
                {selectedMethod === 'card' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Card Details
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Enter your card information
                      </p>
                    </div>

                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 space-y-5">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailError('')
                          }}
                          placeholder="you@example.com"
                          className={cn(
                            'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-dark-elevated text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all',
                            emailError ? 'border-error' : 'border-gray-200 dark:border-dark-border'
                          )}
                        />
                        {emailError && (
                          <p className="mt-1.5 text-sm text-error">{emailError}</p>
                        )}
                      </div>

                      {/* Card Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                            placeholder="1234 5678 9012 3456"
                            className={cn(
                              'w-full px-4 py-3 pr-14 rounded-xl border bg-gray-50 dark:bg-dark-elevated text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-mono',
                              cardErrors.cardNumber ? 'border-error' : 'border-gray-200 dark:border-dark-border'
                            )}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {cardType === 'visa' && (
                              <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                            )}
                            {cardType === 'mastercard' && (
                              <div className="w-10 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
                            )}
                            {cardType === 'amex' && (
                              <div className="w-10 h-6 bg-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">AMEX</div>
                            )}
                            {!cardType && <CreditCard className="w-6 h-6 text-gray-400" />}
                          </div>
                        </div>
                        {cardErrors.cardNumber && (
                          <p className="mt-1.5 text-sm text-error">{cardErrors.cardNumber}</p>
                        )}
                      </div>

                      {/* Expiry & CVC */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                            maxLength={5}
                            placeholder="MM/YY"
                            className={cn(
                              'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-dark-elevated text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-mono',
                              cardErrors.cardExpiry ? 'border-error' : 'border-gray-200 dark:border-dark-border'
                            )}
                          />
                          {cardErrors.cardExpiry && (
                            <p className="mt-1.5 text-sm text-error">{cardErrors.cardExpiry}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVC
                          </label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            maxLength={4}
                            placeholder="123"
                            className={cn(
                              'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-dark-elevated text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-mono',
                              cardErrors.cardCvc ? 'border-error' : 'border-gray-200 dark:border-dark-border'
                            )}
                          />
                          {cardErrors.cardCvc && (
                            <p className="mt-1.5 text-sm text-error">{cardErrors.cardCvc}</p>
                          )}
                        </div>
                      </div>

                      {/* Cardholder Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="John Doe"
                          className={cn(
                            'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-dark-elevated text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all',
                            cardErrors.cardName ? 'border-error' : 'border-gray-200 dark:border-dark-border'
                          )}
                        />
                        {cardErrors.cardName && (
                          <p className="mt-1.5 text-sm text-error">{cardErrors.cardName}</p>
                        )}
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={handlePayment}
                    >
                      Pay {formatCurrency(linkData.amount, linkData.currency)}
                    </Button>
                  </div>
                )}

                {/* Mobile Money Form */}
                {selectedMethod === 'mobile-money' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Mobile Money
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Select your provider and enter your number
                      </p>
                    </div>

                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 space-y-5">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailError('')
                          }}
                          placeholder="you@example.com"
                          className={cn(
                            'w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-dark-elevated text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all',
                            emailError ? 'border-error' : 'border-gray-200 dark:border-dark-border'
                          )}
                        />
                        {emailError && (
                          <p className="mt-1.5 text-sm text-error">{emailError}</p>
                        )}
                      </div>

                      {/* Provider Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Select Provider
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {MOBILE_MONEY_PROVIDERS.map((provider) => (
                            <button
                              key={provider.id}
                              onClick={() => setSelectedProvider(provider.id)}
                              className={cn(
                                'p-4 rounded-xl border-2 transition-all text-center',
                                selectedProvider === provider.id
                                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                  : 'border-gray-200 dark:border-dark-border hover:border-gray-300 bg-gray-50 dark:bg-dark-elevated'
                              )}
                            >
                              <div className="w-10 h-10 bg-white dark:bg-dark-surface rounded-lg mx-auto mb-2 flex items-center justify-center">
                                <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              </div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {provider.name}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          placeholder="+254 7XX XXX XXX"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                        />
                      </div>

                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                        <div className="flex gap-2">
                          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            You'll receive a prompt on your phone to authorize the payment.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={handlePayment}
                      disabled={!selectedProvider || !phoneNumber}
                    >
                      Pay {formatCurrency(linkData.amount, linkData.currency)}
                    </Button>
                  </div>
                )}

                {/* Bank Transfer */}
                {selectedMethod === 'bank-transfer' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Bank Transfer
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Transfer the exact amount to complete payment
                      </p>
                    </div>

                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-dark-border">
                        <span className="text-gray-600 dark:text-gray-400">Amount</span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {formatCurrency(linkData.amount, linkData.currency)}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Bank Name</p>
                            <p className="font-medium text-gray-900 dark:text-white">First National Bank</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard('First National Bank')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-elevated rounded-lg transition-colors"
                          >
                            {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>

                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Account Number</p>
                            <p className="font-mono font-medium text-gray-900 dark:text-white">62534891012</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard('62534891012')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-elevated rounded-lg transition-colors"
                          >
                            <Copy className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>

                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Account Name</p>
                            <p className="font-medium text-gray-900 dark:text-white">Wiremi Tech Solutions</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard('Wiremi Tech Solutions')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-elevated rounded-lg transition-colors"
                          >
                            <Copy className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>

                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Reference</p>
                            <p className="font-mono font-medium text-gray-900 dark:text-white">PAY-{linkId?.toString().toUpperCase()}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(`PAY-${linkId?.toString().toUpperCase()}`)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-elevated rounded-lg transition-colors"
                          >
                            <Copy className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-900/30 mt-4">
                        <div className="flex gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-orange-700 dark:text-orange-300">
                            Please include the reference number in your transfer. Payments are typically verified within 1-2 hours.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => setStep('processing')}
                    >
                      I've Made the Transfer
                    </Button>
                  </div>
                )}

                {/* Crypto */}
                {selectedMethod === 'crypto' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Pay with Crypto
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Send payment to the address below
                      </p>
                    </div>

                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 space-y-6">
                      {/* Crypto selector */}
                      <div className="flex gap-3">
                        {['BTC', 'USDT', 'ETH'].map((crypto) => (
                          <button
                            key={crypto}
                            className="flex-1 p-3 rounded-xl border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-center"
                          >
                            <span className="font-semibold text-primary-600 dark:text-primary-400">{crypto}</span>
                          </button>
                        ))}
                      </div>

                      {/* Amount */}
                      <div className="text-center p-4 bg-gray-50 dark:bg-dark-elevated rounded-xl">
                        <p className="text-sm text-gray-500 mb-1">Send exactly</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">0.0435 BTC</p>
                        <p className="text-sm text-gray-500">≈ {formatCurrency(linkData.amount, linkData.currency)}</p>
                      </div>

                      {/* QR Code Placeholder */}
                      <div className="flex justify-center">
                        <div className="w-48 h-48 bg-gray-100 dark:bg-dark-elevated rounded-xl flex items-center justify-center">
                          <div className="text-center">
                            <Bitcoin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">QR Code</p>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Wallet Address</p>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-dark-elevated rounded-lg">
                          <code className="flex-1 text-sm font-mono text-gray-900 dark:text-white break-all">
                            bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                          </code>
                          <button
                            onClick={() => copyToClipboard('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-dark-border rounded-lg transition-colors flex-shrink-0"
                          >
                            <Copy className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => setStep('processing')}
                    >
                      I've Sent the Payment
                    </Button>
                  </div>
                )}

                {/* Wallet */}
                {selectedMethod === 'wallet' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Wiremi Wallet
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Pay instantly with your Wiremi balance
                      </p>
                    </div>

                    <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 space-y-5">
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Wiremi Email or Phone
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            setEmailError('')
                          }}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                        />
                      </div>

                      <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-900/30">
                        <div className="flex items-center gap-3">
                          <Wallet className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">Available Balance</p>
                            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">$2,450.00</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={handlePayment}
                    >
                      Pay {formatCurrency(linkData.amount, linkData.currency)}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Step: Processing */}
            {step === 'processing' && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Loader2 className="w-10 h-10 text-primary-600 dark:text-primary-400 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Processing Payment
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please wait while we process your payment...
                </p>
                <p className="text-sm text-gray-500">
                  Do not close this page
                </p>
              </div>
            )}

            {/* Step: Success */}
            {step === 'success' && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Payment Successful!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your payment of {formatCurrency(linkData.amount, linkData.currency)} has been received.
                </p>

                <div className="bg-gray-50 dark:bg-dark-surface rounded-xl p-4 mb-6 text-left">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Transaction ID</span>
                    <span className="font-mono font-medium text-gray-900 dark:text-white">TXN-2026012845</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A receipt has been sent to your email address.
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-dark-border">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Lock className="w-4 h-4" />
                <span>Payments secured by</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Wiremi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
