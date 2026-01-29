'use client'

import { useState, FormEvent, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'
import { formatNumber } from '@/lib/utils'

interface Wallet {
  value: string
  label: string
  currency: string
  symbol: string
  balance: number
  flag: string
}

function TransferPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()

  const [fromWallet, setFromWallet] = useState(searchParams.get('from') || '')
  const [toWallet, setToWallet] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [needsConversion, setNeedsConversion] = useState(false)
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(0)

  // Mock wallets
  const wallets: Wallet[] = [
    { value: '1', label: 'Main Operating Account', currency: 'USD', symbol: '$', balance: 125430.50, flag: '🇺🇸' },
    { value: '2', label: 'Euro Operations', currency: 'EUR', symbol: '€', balance: 87250.00, flag: '🇪🇺' },
    { value: '3', label: 'UK Payroll', currency: 'GBP', symbol: '£', balance: 45890.25, flag: '🇬🇧' },
    { value: '4', label: 'Asia-Pacific Reserve', currency: 'SGD', symbol: 'S$', balance: 62100.00, flag: '🇸🇬' },
    { value: '5', label: 'Vendor Payments', currency: 'CAD', symbol: 'C$', balance: 28650.75, flag: '🇨🇦' },
  ]

  // Mock exchange rates
  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.92, GBP: 0.79, SGD: 1.35, CAD: 1.35 },
    EUR: { USD: 1.09, GBP: 0.86, SGD: 1.47, CAD: 1.47 },
    GBP: { USD: 1.27, EUR: 1.16, SGD: 1.71, CAD: 1.71 },
    SGD: { USD: 0.74, EUR: 0.68, GBP: 0.58, CAD: 1.00 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, SGD: 1.00 },
  }

  const fromWalletData = wallets.find(w => w.value === fromWallet)
  const toWalletData = wallets.find(w => w.value === toWallet)

  // Check if conversion is needed and calculate
  useEffect(() => {
    if (fromWalletData && toWalletData && amount) {
      const isDifferentCurrency = fromWalletData.currency !== toWalletData.currency
      setNeedsConversion(isDifferentCurrency)

      if (isDifferentCurrency) {
        const rate = exchangeRates[fromWalletData.currency]?.[toWalletData.currency] || 1
        setExchangeRate(rate)
        setConvertedAmount(parseFloat(amount) * rate)
      }
    }
  }, [fromWallet, toWallet, amount, fromWalletData, toWalletData])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!fromWallet) newErrors.fromWallet = 'Please select source wallet'
    if (!toWallet) newErrors.toWallet = 'Please select destination wallet'
    if (fromWallet === toWallet) newErrors.toWallet = 'Cannot transfer to the same wallet'

    if (!amount) {
      newErrors.amount = 'Amount is required'
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    } else if (fromWalletData && parseFloat(amount) > fromWalletData.balance) {
      newErrors.amount = 'Insufficient balance'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSwap = () => {
    const temp = fromWallet
    setFromWallet(toWallet)
    setToWallet(temp)
    setAmount('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please check the form and try again',
      })
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      showToast({
        type: 'success',
        title: 'Transfer Successful',
        message: `Transferred ${fromWalletData?.symbol}${amount} from ${fromWalletData?.label} to ${toWalletData?.label}`,
      })

      setTimeout(() => {
        router.push('/wallets')
      }, 1500)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Transfer Failed',
        message: 'Unable to process transfer. Please try again.',
      })
      setIsLoading(false)
    }
  }

  return (
    <PageLayout maxWidth="normal">
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

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
            <RefreshCw className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Transfer Funds
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Move money between your wallets instantly
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-4 mb-8">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-primary-900 dark:text-primary-300">
              <strong>Instant Transfers:</strong> Funds are transferred immediately between your wallets. Currency conversion uses real-time exchange rates with no additional fees.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* From Wallet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From Wallet <span className="text-error">*</span>
            </label>
            <Select
              options={[
                { value: '', label: 'Select source wallet' },
                ...wallets.map(w => ({
                  value: w.value,
                  label: `${w.flag} ${w.label} (${w.currency}) - ${w.symbol}${formatNumber(w.balance)}`
                }))
              ]}
              value={fromWallet}
              onChange={(e) => {
                setFromWallet(e.target.value)
                setErrors(prev => ({ ...prev, fromWallet: '' }))
              }}
              error={errors.fromWallet}
            />
            {fromWalletData && (
              <div className="mt-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Available Balance
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {fromWalletData.symbol}{formatNumber(fromWalletData.balance)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              disabled={!fromWallet || !toWallet}
              className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center hover:bg-primary-200 dark:hover:bg-primary-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-5 h-5 text-primary-500" />
            </button>
          </div>

          {/* To Wallet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To Wallet <span className="text-error">*</span>
            </label>
            <Select
              options={[
                { value: '', label: 'Select destination wallet' },
                ...wallets
                  .filter(w => w.value !== fromWallet)
                  .map(w => ({
                    value: w.value,
                    label: `${w.flag} ${w.label} (${w.currency}) - ${w.symbol}${formatNumber(w.balance)}`
                  }))
              ]}
              value={toWallet}
              onChange={(e) => {
                setToWallet(e.target.value)
                setErrors(prev => ({ ...prev, toWallet: '' }))
              }}
              error={errors.toWallet}
            />
            {toWalletData && (
              <div className="mt-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Current Balance
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {toWalletData.symbol}{formatNumber(toWalletData.balance)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <Input
              label="Amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                setErrors(prev => ({ ...prev, amount: '' }))
              }}
              error={errors.amount}
              helperText={fromWalletData ? `Enter amount in ${fromWalletData.currency}` : undefined}
              required
            />
          </div>

          {/* Currency Conversion Notice */}
          {needsConversion && amount && parseFloat(amount) > 0 && (
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-xl">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-warning mb-2">
                    Currency Conversion Required
                  </p>
                  <div className="space-y-1 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center justify-between">
                      <span>Exchange Rate:</span>
                      <span className="font-semibold">
                        1 {fromWalletData?.currency} = {exchangeRate.toFixed(4)} {toWalletData?.currency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>You're transferring:</span>
                      <span className="font-semibold">
                        {fromWalletData?.symbol}{parseFloat(amount).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-warning/20">
                      <span className="font-semibold">Recipient will receive:</span>
                      <span className="font-bold text-success">
                        {toWalletData?.symbol}{convertedAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Note (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Add a note for this transfer..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Transfer Summary */}
          {fromWalletData && toWalletData && amount && parseFloat(amount) > 0 && (
            <div className="p-6 bg-success/5 border border-success/20 rounded-xl">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Transfer Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">From</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {fromWalletData.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">To</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {toWalletData.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {fromWalletData.symbol}{parseFloat(amount).toFixed(2)}
                  </span>
                </div>
                {needsConversion && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Converted</span>
                    <span className="text-sm font-medium text-success">
                      {toWalletData.symbol}{convertedAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-success/20">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Fee</span>
                  <span className="text-sm font-bold text-success">FREE</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
              loading={isLoading}
              disabled={!fromWallet || !toWallet || !amount || parseFloat(amount) <= 0}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Transfer Now
            </Button>
          </div>
        </form>
      </Card>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border">
        <div className="flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-gray-900 dark:text-white mb-1">
              Secure & Instant
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              All transfers are instant and processed securely. You'll see the updated balances immediately after the transfer completes.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default function TransferPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransferPageContent />
    </Suspense>
  )
}
