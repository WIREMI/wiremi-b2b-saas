'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Building2, Smartphone, Wallet, Bitcoin, ChevronRight, Lock, CheckCircle2, Loader2, ArrowLeft, Shield, Globe, Copy, Check, QrCode, AlertCircle } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

type PaymentMethod = 'card' | 'mobile' | 'bank' | 'wallet' | 'crypto'

interface PaymentDetails {
  merchantName: string
  merchantLogo?: string
  amount: number
  currency: string
  description: string
  reference: string
  customerEmail?: string
  expiresAt?: string
  metadata?: Record<string, string>
}

export default function HostedCheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [saveCard, setSaveCard] = useState(false)
  const [mobileProvider, setMobileProvider] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [walletType, setWalletType] = useState('')
  const [cryptoType, setCryptoType] = useState('bitcoin')
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds

  // Mock payment details - in production, this would be fetched from the API
  const paymentDetails: PaymentDetails = {
    merchantName: 'Wiremi Technologies',
    amount: 150.00,
    currency: 'USD',
    description: 'Professional Services - Invoice #INV-2024-001',
    reference: 'PAY-HOSTED-001',
    customerEmail: 'customer@example.com',
    expiresAt: '2024-03-15T23:59:59Z',
    metadata: {
      'Invoice Number': 'INV-2024-001',
      'Due Date': 'March 15, 2024'
    }
  }

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !isSuccess) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft, isSuccess])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const paymentMethods = [
    { id: 'card' as const, name: 'Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'mobile' as const, name: 'Mobile Money', icon: Smartphone, description: 'M-Pesa, MTN, Airtel' },
    { id: 'bank' as const, name: 'Bank Transfer', icon: Building2, description: 'Direct bank payment' },
    { id: 'wallet' as const, name: 'Digital Wallet', icon: Wallet, description: 'PayPal, Apple Pay' },
    { id: 'crypto' as const, name: 'Crypto', icon: Bitcoin, description: 'BTC, ETH, USDT' },
  ]

  const mobileProviders = [
    { id: 'mpesa', name: 'M-Pesa', color: 'bg-green-500' },
    { id: 'mtn', name: 'MTN Mobile Money', color: 'bg-yellow-500' },
    { id: 'airtel', name: 'Airtel Money', color: 'bg-red-500' },
    { id: 'orange', name: 'Orange Money', color: 'bg-orange-500' },
  ]

  const banks = [
    { id: 'chase', name: 'Chase Bank' },
    { id: 'bofa', name: 'Bank of America' },
    { id: 'wells', name: 'Wells Fargo' },
    { id: 'citi', name: 'Citibank' },
  ]

  const wallets = [
    { id: 'paypal', name: 'PayPal', icon: '💳' },
    { id: 'apple', name: 'Apple Pay', icon: '🍎' },
    { id: 'google', name: 'Google Pay', icon: '🔵' },
  ]

  const cryptoOptions = [
    { id: 'bitcoin', name: 'Bitcoin (BTC)', address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5' },
    { id: 'ethereum', name: 'Ethereum (ETH)', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' },
    { id: 'usdt', name: 'USDT (TRC20)', address: 'TN2Sxkv2ioFQZuMnijkFsrSjX7ERaxJQy3' },
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
    if (/^4/.test(cleaned)) return 'visa'
    if (/^5[1-5]/.test(cleaned)) return 'mastercard'
    if (/^3[47]/.test(cleaned)) return 'amex'
    if (/^6(?:011|5)/.test(cleaned)) return 'discover'
    return null
  }

  const cardType = getCardType(cardNumber)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsProcessing(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your payment of {formatCurrency(paymentDetails.amount, paymentDetails.currency)} has been processed.
          </p>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Reference</span>
              <span className="font-medium text-gray-900 dark:text-white">{paymentDetails.reference}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Merchant</span>
              <span className="font-medium text-gray-900 dark:text-white">{paymentDetails.merchantName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Date</span>
              <span className="font-medium text-gray-900 dark:text-white">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            A confirmation email has been sent to {paymentDetails.customerEmail}
          </p>

          <button className="w-full py-3 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Download Receipt
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{paymentDetails.merchantName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Secure Checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Lock className="w-4 h-4 text-green-500" />
            <span className="text-gray-600 dark:text-gray-400">256-bit SSL</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Payment Form - Left Side */}
          <div className="lg:col-span-3 space-y-6">
            {/* Timer Warning */}
            {timeLeft < 300 && (
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-400">Session expiring soon</p>
                  <p className="text-xs text-amber-600 dark:text-amber-500">Complete payment within {formatTime(timeLeft)}</p>
                </div>
              </div>
            )}

            {/* Payment Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Payment Method</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all text-left",
                      selectedMethod === method.id
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    )}
                  >
                    <method.icon className={cn(
                      "w-6 h-6 mb-2",
                      selectedMethod === method.id ? "text-indigo-500" : "text-gray-400"
                    )} />
                    <p className={cn(
                      "font-medium text-sm",
                      selectedMethod === method.id ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"
                    )}>{method.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{method.description}</p>
                  </button>
                ))}
              </div>

              {/* Card Payment Form */}
              {selectedMethod === 'card' && (
                <div className="space-y-4">
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
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400"
                      />
                      {cardType && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <span className="text-xs font-medium uppercase text-gray-500 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                            {cardType}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

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
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        maxLength={4}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-indigo-500 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Save card for future payments</span>
                  </label>
                </div>
              )}

              {/* Mobile Money Form */}
              {selectedMethod === 'mobile' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Provider
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {mobileProviders.map((provider) => (
                        <button
                          key={provider.id}
                          onClick={() => setMobileProvider(provider.id)}
                          className={cn(
                            "p-3 rounded-xl border-2 flex items-center gap-3 transition-all",
                            mobileProvider === provider.id
                              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                              : "border-gray-200 dark:border-gray-700"
                          )}
                        >
                          <div className={cn("w-8 h-8 rounded-lg", provider.color)} />
                          <span className="font-medium text-sm text-gray-900 dark:text-white">{provider.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="+254 7XX XXX XXX"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-400">
                      You will receive a payment prompt on your phone. Enter your PIN to complete the payment.
                    </p>
                  </div>
                </div>
              )}

              {/* Bank Transfer Form */}
              {selectedMethod === 'bank' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Your Bank
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {banks.map((bank) => (
                        <button
                          key={bank.id}
                          onClick={() => setSelectedBank(bank.id)}
                          className={cn(
                            "p-3 rounded-xl border-2 flex items-center gap-3 transition-all",
                            selectedBank === bank.id
                              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                              : "border-gray-200 dark:border-gray-700"
                          )}
                        >
                          <Building2 className="w-5 h-5 text-gray-400" />
                          <span className="font-medium text-sm text-gray-900 dark:text-white">{bank.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Transfer Details</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Account Name</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Wiremi Inc.</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Account Number</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">1234567890</span>
                          <button onClick={() => handleCopy('1234567890')} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Reference</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{paymentDetails.reference}</span>
                          <button onClick={() => handleCopy(paymentDetails.reference)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Digital Wallet Form */}
              {selectedMethod === 'wallet' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        onClick={() => setWalletType(wallet.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all",
                          walletType === wallet.id
                            ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                            : "border-gray-200 dark:border-gray-700"
                        )}
                      >
                        <span className="text-2xl">{wallet.icon}</span>
                        <span className="font-medium text-sm text-gray-900 dark:text-white">{wallet.name}</span>
                      </button>
                    ))}
                  </div>

                  {walletType && (
                    <div className="bg-blue-50 dark:bg-blue-500/10 rounded-xl p-4 text-center">
                      <p className="text-sm text-blue-800 dark:text-blue-400">
                        You will be redirected to {wallets.find(w => w.id === walletType)?.name} to complete your payment.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Crypto Form */}
              {selectedMethod === 'crypto' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Cryptocurrency
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {cryptoOptions.map((crypto) => (
                        <button
                          key={crypto.id}
                          onClick={() => setCryptoType(crypto.id)}
                          className={cn(
                            "p-3 rounded-xl border-2 text-center transition-all",
                            cryptoType === crypto.id
                              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10"
                              : "border-gray-200 dark:border-gray-700"
                          )}
                        >
                          <span className="font-medium text-sm text-gray-900 dark:text-white">{crypto.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 text-center">
                    <div className="w-32 h-32 bg-white dark:bg-gray-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <QrCode className="w-24 h-24 text-gray-800 dark:text-gray-200" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Send exactly</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">0.00312 BTC</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">to this address:</p>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-600 p-3 rounded-lg">
                      <code className="text-xs text-gray-600 dark:text-gray-300 flex-1 truncate">
                        {cryptoOptions.find(c => c.id === cryptoType)?.address}
                      </code>
                      <button
                        onClick={() => handleCopy(cryptoOptions.find(c => c.id === cryptoType)?.address || '')}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-500 rounded"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Pay {formatCurrency(paymentDetails.amount, paymentDetails.currency)}
                </>
              )}
            </button>
          </div>

          {/* Order Summary - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Description</span>
                  <span className="font-medium text-gray-900 dark:text-white text-right max-w-[180px]">{paymentDetails.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Reference</span>
                  <span className="font-medium text-gray-900 dark:text-white">{paymentDetails.reference}</span>
                </div>
                {paymentDetails.metadata && Object.entries(paymentDetails.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{key}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(paymentDetails.amount, paymentDetails.currency)}
                  </span>
                </div>
              </div>

              {/* Timer */}
              <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Session expires in</span>
                  <span className={cn(
                    "font-mono font-medium",
                    timeLeft < 300 ? "text-amber-500" : "text-gray-900 dark:text-white"
                  )}>{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Security Badges */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Lock className="w-4 h-4" />
                  <span>Encrypted</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>Powered by Wiremi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Powered by <span className="font-semibold">Wiremi</span>
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Privacy</a>
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Terms</a>
              <a href="#" className="hover:text-gray-700 dark:hover:text-gray-300">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
