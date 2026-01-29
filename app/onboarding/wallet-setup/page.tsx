'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  Wallet,
  ArrowRight,
  ArrowLeft,
  Search,
  Info,
  DollarSign,
  Euro,
  Bitcoin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'

interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
  popular?: boolean
}

export default function WalletSetupPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [walletName, setWalletName] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Popular currencies
  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', popular: true },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', popular: true },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', popular: true },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', popular: true },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', popular: true },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', popular: true },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
  ]

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const popularCurrencies = currencies.filter((c) => c.popular)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!walletName.trim()) {
      newErrors.walletName = 'Wallet name is required'
    } else if (walletName.trim().length < 3) {
      newErrors.walletName = 'Wallet name must be at least 3 characters'
    }

    if (!selectedCurrency) {
      newErrors.currency = 'Please select a currency'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please complete all required fields',
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      showToast({
        type: 'success',
        title: 'Wallet Created',
        message: `${walletName} (${selectedCurrency?.code}) has been created successfully`,
      })

      // Navigate to completion page
      setTimeout(() => {
        router.push('/onboarding/complete')
      }, 1000)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Create Wallet',
        message: 'Please try again',
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
      {/* Header */}
      <div className="bg-gray-100 dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">W</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Wiremi
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Step 5 of 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
            <Wallet className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create Your First Wallet
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Set up a multi-currency wallet to start managing your business finances
          </p>
        </div>

        {/* Info Banner */}
        <div className="mb-8">
          <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-primary-900 dark:text-primary-300">
                <strong>What's a wallet?</strong> A wallet is a virtual account that holds funds in a specific currency. You can create multiple wallets for different currencies and purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <Card className="p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Wallet Name */}
            <div>
              <Input
                label="Wallet Name"
                placeholder="e.g., Main Operating Account, Payroll, Vendor Payments"
                value={walletName}
                onChange={(e) => {
                  setWalletName(e.target.value)
                  setErrors((prev) => ({ ...prev, walletName: '' }))
                }}
                error={errors.walletName}
                helperText="Give your wallet a descriptive name to easily identify it"
                icon={<Wallet className="w-5 h-5" />}
                iconPosition="left"
                required
                autoFocus
              />
            </div>

            {/* Currency Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Base Currency <span className="text-error">*</span>
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Select the primary currency for this wallet
              </p>

              {/* Popular Currencies */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Popular Currencies
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {popularCurrencies.map((currency) => (
                    <button
                      key={currency.code}
                      type="button"
                      onClick={() => {
                        setSelectedCurrency(currency)
                        setErrors((prev) => ({ ...prev, currency: '' }))
                      }}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        selectedCurrency?.code === currency.code
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                          : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{currency.flag}</span>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                          {currency.code}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {currency.symbol}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search All Currencies */}
              <div>
                <Input
                  placeholder="Search currencies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-5 h-5" />}
                  iconPosition="left"
                  className="mb-3"
                />

                {searchQuery && (
                  <div className="max-h-64 overflow-y-auto border border-gray-200 dark:border-dark-border rounded-xl">
                    {filteredCurrencies.length > 0 ? (
                      <div className="divide-y divide-gray-200 dark:divide-dark-border">
                        {filteredCurrencies.map((currency) => (
                          <button
                            key={currency.code}
                            type="button"
                            onClick={() => {
                              setSelectedCurrency(currency)
                              setSearchQuery('')
                              setErrors((prev) => ({ ...prev, currency: '' }))
                            }}
                            className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors ${
                              selectedCurrency?.code === currency.code
                                ? 'bg-primary-50 dark:bg-primary-500/10'
                                : ''
                            }`}
                          >
                            <span className="text-2xl">{currency.flag}</span>
                            <div className="flex-1 text-left">
                              <p className="font-medium text-gray-900 dark:text-white text-sm">
                                {currency.code} - {currency.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {currency.symbol}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No currencies found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {errors.currency && (
                <p className="mt-2 text-sm text-error">{errors.currency}</p>
              )}
            </div>

            {/* Selected Currency Preview */}
            {selectedCurrency && (
              <div className="p-4 bg-success/5 border border-success/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedCurrency.flag}</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedCurrency.name} ({selectedCurrency.code})
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Symbol: {selectedCurrency.symbol}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isLoading}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Create Wallet & Complete Setup
            </Button>
          </form>
        </Card>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl mb-3">
              <DollarSign className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              150+ Currencies
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Support for major global currencies
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-xl mb-3">
              <Euro className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Real-Time FX
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Live exchange rates updated every minute
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-warning/10 rounded-xl mb-3">
              <Bitcoin className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Multiple Wallets
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create unlimited wallets for different needs
            </p>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push('/onboarding/bank-connection')}
            icon={<ArrowLeft className="w-5 h-5" />}
            iconPosition="left"
            disabled={isLoading}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}
