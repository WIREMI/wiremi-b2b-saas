'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Building2, Smartphone, Wallet, X, Lock, CheckCircle2, Loader2, ChevronDown, ChevronUp, Shield, Copy, Check, QrCode, Bitcoin, AlertCircle } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

type PaymentMethod = 'card' | 'mobile' | 'bank' | 'wallet' | 'crypto'

interface WidgetConfig {
  merchantName: string
  merchantLogo?: string
  amount: number
  currency: string
  description: string
  reference: string
  theme: 'light' | 'dark' | 'auto'
  primaryColor: string
  showBranding: boolean
  allowedMethods: PaymentMethod[]
  locale: string
}

export default function WidgetPaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [mobileProvider, setMobileProvider] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [copied, setCopied] = useState(false)
  const [cryptoType, setCryptoType] = useState('bitcoin')
  const [error, setError] = useState('')

  // Widget configuration - in production, this would be fetched from API based on widget ID
  const config: WidgetConfig = {
    merchantName: 'Wiremi Store',
    amount: 49.99,
    currency: 'USD',
    description: 'Premium Subscription',
    reference: 'WID-2024-001',
    theme: 'light',
    primaryColor: '#6366f1', // indigo-500
    showBranding: true,
    allowedMethods: ['card', 'mobile', 'bank', 'wallet', 'crypto'],
    locale: 'en-US'
  }

  const paymentMethods = [
    { id: 'card' as const, name: 'Card', icon: CreditCard },
    { id: 'mobile' as const, name: 'Mobile', icon: Smartphone },
    { id: 'bank' as const, name: 'Bank', icon: Building2 },
    { id: 'wallet' as const, name: 'Wallet', icon: Wallet },
    { id: 'crypto' as const, name: 'Crypto', icon: Bitcoin },
  ].filter(m => config.allowedMethods.includes(m.id))

  const mobileProviders = [
    { id: 'mpesa', name: 'M-Pesa' },
    { id: 'mtn', name: 'MTN' },
    { id: 'airtel', name: 'Airtel' },
  ]

  const cryptoOptions = [
    { id: 'bitcoin', name: 'BTC', address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5' },
    { id: 'ethereum', name: 'ETH', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' },
    { id: 'usdt', name: 'USDT', address: 'TN2Sxkv2ioFQZuMnijkFsrSjX7ERaxJQy3' },
  ]

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

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, '')
    if (/^4/.test(cleaned)) return 'VISA'
    if (/^5[1-5]/.test(cleaned)) return 'MC'
    if (/^3[47]/.test(cleaned)) return 'AMEX'
    return null
  }

  const cardType = getCardType(cardNumber)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validateCard = () => {
    if (cardNumber.replace(/\s/g, '').length < 15) return 'Invalid card number'
    if (cardExpiry.length < 5) return 'Invalid expiry date'
    if (cardCvv.length < 3) return 'Invalid CVV'
    if (!cardName.trim()) return 'Cardholder name required'
    return null
  }

  const handleSubmit = async () => {
    setError('')

    if (selectedMethod === 'card') {
      const validationError = validateCard()
      if (validationError) {
        setError(validationError)
        return
      }
    }

    if (selectedMethod === 'mobile' && (!mobileProvider || !mobileNumber)) {
      setError('Please select provider and enter phone number')
      return
    }

    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsSuccess(true)

    // Post message to parent window (for iframe integration)
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'WIREMI_PAYMENT_SUCCESS',
        data: {
          reference: config.reference,
          amount: config.amount,
          currency: config.currency
        }
      }, '*')
    }
  }

  const handleClose = () => {
    // Post message to parent window
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'WIREMI_PAYMENT_CLOSED',
        data: { reference: config.reference }
      }, '*')
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {formatCurrency(config.amount, config.currency)} paid to {config.merchantName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            Reference: {config.reference}
          </p>
          {config.showBranding && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Powered by Wiremi
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">{config.merchantName}</span>
        </div>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Close payment widget"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Amount Display */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{config.description}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(config.amount, config.currency)}
          </p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-2 text-sm text-primary-600 dark:text-primary-400 flex items-center gap-1 mx-auto"
          >
            {showDetails ? 'Hide' : 'Show'} details
            {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showDetails && (
            <div className="mt-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-left">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Reference</span>
                <span className="text-gray-900 dark:text-white">{config.reference}</span>
              </div>
            </div>
          )}
        </div>

        {/* Payment Method Tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => {
                setSelectedMethod(method.id)
                setError('')
              }}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5",
                selectedMethod === method.id
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <method.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{method.name}</span>
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Card Form */}
        {selectedMethod === 'card' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm"
                />
                {cardType && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded">
                    {cardType}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Expiry
                </label>
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  placeholder="123"
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm"
              />
            </div>
          </div>
        )}

        {/* Mobile Money Form */}
        {selectedMethod === 'mobile' && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Provider
              </label>
              <div className="grid grid-cols-3 gap-2">
                {mobileProviders.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setMobileProvider(provider.id)}
                    className={cn(
                      "py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all",
                      mobileProvider === provider.id
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400"
                        : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    )}
                  >
                    {provider.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+254 7XX XXX XXX"
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400 text-sm"
              />
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-500/10 p-2.5 rounded-lg">
              A payment prompt will be sent to your phone.
            </p>
          </div>
        )}

        {/* Bank Transfer Form */}
        {selectedMethod === 'bank' && (
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Transfer to</p>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Bank</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Wiremi Bank</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Account</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white font-mono">1234567890</span>
                    <button onClick={() => handleCopy('1234567890')} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Reference</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white font-mono">{config.reference}</span>
                    <button onClick={() => handleCopy(config.reference)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Amount</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(config.amount, config.currency)}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 bg-amber-50 dark:bg-amber-500/10 p-2.5 rounded-lg">
              Include the reference in your transfer for automatic confirmation.
            </p>
          </div>
        )}

        {/* Wallet Form */}
        {selectedMethod === 'wallet' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'paypal', name: 'PayPal', icon: '💳' },
                { id: 'apple', name: 'Apple Pay', icon: '🍎' },
                { id: 'google', name: 'Google Pay', icon: '🔵' },
              ].map((wallet) => (
                <button
                  key={wallet.id}
                  className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all flex items-center gap-3"
                >
                  <span className="text-xl">{wallet.icon}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{wallet.name}</span>
                  <span className="ml-auto text-gray-400">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Crypto Form */}
        {selectedMethod === 'crypto' && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {cryptoOptions.map((crypto) => (
                <button
                  key={crypto.id}
                  onClick={() => setCryptoType(crypto.id)}
                  className={cn(
                    "py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all",
                    cryptoType === crypto.id
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400"
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                >
                  {crypto.name}
                </button>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
              <div className="w-24 h-24 bg-white dark:bg-gray-700 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <QrCode className="w-16 h-16 text-gray-800 dark:text-gray-200" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Send exactly</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">0.00104 {cryptoOptions.find(c => c.id === cryptoType)?.name}</p>
              <div className="flex items-center gap-2 bg-white dark:bg-gray-700 p-2 rounded-lg">
                <code className="text-xs text-gray-600 dark:text-gray-300 flex-1 truncate">
                  {cryptoOptions.find(c => c.id === cryptoType)?.address}
                </code>
                <button
                  onClick={() => handleCopy(cryptoOptions.find(c => c.id === cryptoType)?.address || '')}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Pay {formatCurrency(config.amount, config.currency)}
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Secure</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>Encrypted</span>
          </div>
          {config.showBranding && (
            <>
              <span>•</span>
              <span>Powered by Wiremi</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
