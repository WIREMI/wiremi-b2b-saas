'use client'

import { useState, useEffect } from 'react'
import {
  RefreshCw,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  CheckCircle2,
  Search,
  Sparkles,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Select from '@/components/ui/select'
import Input from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { formatNumber } from '@/lib/utils'
import { currencyAPI, SUPPORTED_CURRENCIES, MARKUP_INFO, type ExchangeRate } from '@/lib/services/currencyApi'

interface RecentExchange {
  id: string
  from: string
  to: string
  fromAmount: number
  toAmount: number
  rate: number
  date: Date
  status: 'completed' | 'processing'
}

export default function CurrencyExchangePage() {
  const { showToast } = useToast()

  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingRates, setIsLoadingRates] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [liveRates, setLiveRates] = useState<ExchangeRate[]>([])
  const [currentRate, setCurrentRate] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [apiProvider, setApiProvider] = useState('Loading...')

  // Prevent hydration mismatch for time display
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Load live exchange rates on mount
  useEffect(() => {
    loadExchangeRates()
  }, [fromCurrency])

  // Calculate current exchange rate between selected currencies
  useEffect(() => {
    const calculateRate = async () => {
      if (!fromCurrency || !toCurrency) return

      try {
        const result = await currencyAPI.convertCurrency(1, fromCurrency, toCurrency)
        setCurrentRate(result.rate)
      } catch (error) {
        console.error('Failed to get exchange rate:', error)
      }
    }

    calculateRate()
  }, [fromCurrency, toCurrency])

  // Mock recent exchanges
  const recentExchanges: RecentExchange[] = [
    {
      id: 'EX-001',
      from: 'USD',
      to: 'EUR',
      fromAmount: 5000,
      toAmount: 4600,
      rate: 0.92,
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
    },
    {
      id: 'EX-002',
      from: 'EUR',
      to: 'GBP',
      fromAmount: 3000,
      toAmount: 2580,
      rate: 0.86,
      date: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'completed',
    },
    {
      id: 'EX-003',
      from: 'USD',
      to: 'JPY',
      fromAmount: 10000,
      toAmount: 1495000,
      rate: 149.50,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'processing',
    },
  ]

  const loadExchangeRates = async () => {
    setIsLoadingRates(true)
    try {
      const data = await currencyAPI.getExchangeRates(fromCurrency)
      const formattedRates = await currencyAPI.getFormattedRates(fromCurrency)

      setLiveRates(formattedRates)
      setLastUpdated(data.lastUpdated)
      setApiProvider(data.provider)
    } catch (error) {
      console.error('Failed to load exchange rates:', error)
      showToast({
        type: 'error',
        title: 'Failed to Load Rates',
        message: 'Unable to fetch live exchange rates. Using cached data.',
      })
    } finally {
      setIsLoadingRates(false)
    }
  }

  const fromCurrencyInfo = currencyAPI.getCurrencyInfo(fromCurrency)
  const toCurrencyInfo = currencyAPI.getCurrencyInfo(toCurrency)

  // Calculate conversion
  useEffect(() => {
    if (fromAmount && currentRate && !isNaN(parseFloat(fromAmount))) {
      const calculated = parseFloat(fromAmount) * currentRate
      setToAmount(calculated.toFixed(2))
    } else {
      setToAmount('')
    }
  }, [fromAmount, currentRate])

  const handleSwapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
    setFromAmount('')
    setToAmount('')
  }

  const handleExchange = async () => {
    if (!fromCurrency || !toCurrency || !fromAmount || parseFloat(fromAmount) <= 0) {
      showToast({
        type: 'error',
        title: 'Invalid Input',
        message: 'Please select currencies and enter a valid amount',
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await currencyAPI.convertCurrency(
        parseFloat(fromAmount),
        fromCurrency,
        toCurrency
      )

      await new Promise(resolve => setTimeout(resolve, 1500))

      showToast({
        type: 'success',
        title: 'Exchange Successful',
        message: `Exchanged ${fromCurrencyInfo?.symbol}${fromAmount} to ${toCurrencyInfo?.symbol}${result.convertedAmount.toFixed(2)}`,
      })

      // Reset form
      setFromAmount('')
      setToAmount('')
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Exchange Failed',
        message: 'Unable to process exchange. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshRates = async () => {
    await loadExchangeRates()
    showToast({
      type: 'success',
      title: 'Rates Updated',
      message: 'Live exchange rates have been refreshed',
    })
  }

  // Filter currencies based on search
  const filteredCurrencies = SUPPORTED_CURRENCIES.filter(currency =>
    currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Currency Exchange
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Exchange funds between your multi-currency wallets
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Updated {isMounted && lastUpdated ? lastUpdated.toLocaleTimeString() : '--:--:--'}</span>
            <Button
              variant="outline"
              size="sm"
              icon={<RefreshCw className="w-4 h-4" />}
              onClick={refreshRates}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl mb-8">
          <div className="flex gap-3">
            <Sparkles className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm flex-1">
              <p className="font-medium text-primary-900 dark:text-primary-300 mb-1">
                Live Exchange Rates • {SUPPORTED_CURRENCIES.length}+ Currencies
              </p>
              <p className="text-primary-700 dark:text-primary-400">
                {MARKUP_INFO.description} {apiProvider !== 'Loading...' && `Powered by ${apiProvider}.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Exchange Form */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Exchange Currency
            </h2>

            <div className="space-y-6">
              {/* From Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <Select
                      options={SUPPORTED_CURRENCIES.map(c => ({
                        value: c.code,
                        label: `${c.flag} ${c.code} - ${c.name}`
                      }))}
                      value={fromCurrency}
                      onChange={(e) => {
                        setFromCurrency(e.target.value)
                        setFromAmount('')
                        setToAmount('')
                      }}
                    />
                  </div>
                  {fromCurrencyInfo && (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
                      <span className="text-2xl">{fromCurrencyInfo.flag}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {fromCurrencyInfo.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          {fromCurrencyInfo.code} • {fromCurrencyInfo.symbol}
                        </p>
                      </div>
                    </div>
                  )}
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSwapCurrencies}
                  className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center hover:bg-primary-200 dark:hover:bg-primary-500/30 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-primary-500" />
                </button>
              </div>

              {/* To Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To
                </label>
                <div className="space-y-3">
                  <Select
                    options={SUPPORTED_CURRENCIES
                      .filter(c => c.code !== fromCurrency)
                      .map(c => ({
                        value: c.code,
                        label: `${c.flag} ${c.code} - ${c.name}`
                      }))}
                    value={toCurrency}
                    onChange={(e) => {
                      setToCurrency(e.target.value)
                      setToAmount('')
                    }}
                  />
                  {toCurrencyInfo && (
                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
                      <span className="text-2xl">{toCurrencyInfo.flag}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {toCurrencyInfo.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          {toCurrencyInfo.code} • {toCurrencyInfo.symbol}
                        </p>
                      </div>
                    </div>
                  )}
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={toAmount}
                    disabled
                    className="bg-gray-50 dark:bg-dark-bg"
                  />
                </div>
              </div>

              {/* Exchange Rate Info */}
              {currentRate && fromAmount && parseFloat(fromAmount) > 0 && (
                <div className="p-4 bg-success/5 border border-success/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Exchange Rate
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      1 {fromCurrency} = {currentRate.toFixed(4)} {toCurrency}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Wiremi Fee ({MARKUP_INFO.percentage})
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {fromCurrencyInfo?.symbol}{((parseFloat(fromAmount) * MARKUP_INFO.basisPoints) / 10000).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      You'll Receive
                    </span>
                    <span className="text-lg font-bold text-success">
                      {toCurrencyInfo?.symbol}{toAmount}
                    </span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleExchange}
                loading={isLoading}
                disabled={!fromCurrency || !toCurrency || !fromAmount || parseFloat(fromAmount) <= 0}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Exchange Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search & Live Rates */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Live Rates from {fromCurrency}
              </h3>
              {isLoadingRates && (
                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              )}
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Rates List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {(searchTerm ? filteredCurrencies : liveRates.slice(0, 12)).map((item) => {
                let rate: ExchangeRate | undefined
                let currencyInfo: typeof SUPPORTED_CURRENCIES[number] | undefined

                if (searchTerm) {
                  // item is a Currency object
                  currencyInfo = item as typeof SUPPORTED_CURRENCIES[number]
                  rate = liveRates.find(r => r.currency === currencyInfo!.code)
                } else {
                  // item is an ExchangeRate
                  rate = item as ExchangeRate
                  currencyInfo = SUPPORTED_CURRENCIES.find(c => c.code === rate!.currency)
                }

                if (!rate || !currencyInfo) return null

                return (
                  <button
                    key={rate.currency}
                    onClick={() => {
                      setToCurrency(rate!.currency)
                      setSearchTerm('')
                    }}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg rounded-lg hover:bg-gray-100 dark:hover:bg-dark-border transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{currencyInfo.flag}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {rate.currency}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          {currencyInfo.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {rate.rate.toFixed(4)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                        {currencyInfo.symbol}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {liveRates.length > 12 && !searchTerm && (
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-3">
                Showing 12 of {liveRates.length} currencies • Use search to find more
              </p>
            )}
          </Card>

          {/* Recent Exchanges */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Exchanges
            </h3>
            <div className="space-y-3">
              {recentExchanges.map((exchange) => (
                <div
                  key={exchange.id}
                  className="p-3 bg-gray-50 dark:bg-dark-bg rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {exchange.from} → {exchange.to}
                    </span>
                    <Badge
                      variant={exchange.status === 'completed' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {exchange.status === 'completed' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                      {exchange.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {exchange.fromAmount} {exchange.from} → {exchange.toAmount} {exchange.to}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    Rate: {exchange.rate.toFixed(4)} • {exchange.date.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
