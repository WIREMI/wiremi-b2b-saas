'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Clock,
  Gift,
  Award,
  AlertTriangle,
  Calendar,
  Building2,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  XCircle,
  Filter,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MOCK_USER_LOYALTY_WALLET,
  MOCK_USER_LOYALTY_STATS,
  MOCK_LOYALTY_TRANSACTIONS,
  MOCK_POINTS_BY_MERCHANT,
  formatPoints,
  formatUsdValue,
} from '@/lib/mock-data/loyalty'
import type { LoyaltyEventType } from '@/types/loyalty'

export default function LoyaltyWalletPage() {
  const wallet = MOCK_USER_LOYALTY_WALLET
  const stats = MOCK_USER_LOYALTY_STATS
  const [eventFilter, setEventFilter] = useState<LoyaltyEventType | 'ALL'>('ALL')
  const [merchantFilter, setMerchantFilter] = useState<string>('ALL')
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Filter transactions
  const filteredTransactions = MOCK_LOYALTY_TRANSACTIONS.filter((tx) => {
    const matchesEvent = eventFilter === 'ALL' || tx.eventType === eventFilter
    const matchesMerchant = merchantFilter === 'ALL' || tx.merchantId === merchantFilter
    return matchesEvent && matchesMerchant
  })

  // Get unique merchants for filter
  const uniqueMerchants = Array.from(
    new Set(MOCK_LOYALTY_TRANSACTIONS.map((tx) => tx.merchantId))
  )

  // Tier colors with dark mode support
  const TIER_COLORS = {
    BRONZE: { bg: 'bg-amber-700 dark:bg-amber-600', text: 'text-amber-700 dark:text-amber-400', badge: 'bg-amber-100 dark:bg-amber-900/30' },
    SILVER: { bg: 'bg-slate-400 dark:bg-slate-500', text: 'text-slate-600 dark:text-slate-400', badge: 'bg-slate-100 dark:bg-slate-900/30' },
    GOLD: { bg: 'bg-yellow-500 dark:bg-yellow-600', text: 'text-yellow-600 dark:text-yellow-400', badge: 'bg-yellow-100 dark:bg-yellow-900/30' },
    PLATINUM: { bg: 'bg-purple-500 dark:bg-purple-600', text: 'text-purple-600 dark:text-purple-400', badge: 'bg-purple-100 dark:bg-purple-900/30' },
  }

  const tierColor = stats.tier ? TIER_COLORS[stats.tier] : TIER_COLORS.BRONZE

  // Event type icons and colors with dark mode support
  const EVENT_TYPES = {
    EARN: { icon: ArrowUpRight, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/30' },
    REDEEM: { icon: ArrowDownLeft, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    EXPIRE: { icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
    TRANSFER: { icon: TrendingUp, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    ADJUSTMENT: { icon: TrendingDown, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white">My Loyalty Wallet</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage your Wiremi Rewards points across all merchants
          </p>
        </div>

        {/* Expiring Points Warning */}
        {isMounted && stats.expiringPoints.amount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                {formatPoints(stats.expiringPoints.amount)} points expiring soon
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                You have {formatPoints(stats.expiringPoints.amount)} points (
                {formatUsdValue(stats.expiringPoints.amount)}) expiring on{' '}
                {formatDate(stats.expiringPoints.expiryDate)}. Redeem them before they expire!
              </p>
            </div>
            <Button size="sm" variant="outline" className="border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300">
              View Offers
            </Button>
          </motion.div>
        )}

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Available Balance */}
          <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              {stats.tier && (
                <Badge className="bg-white/20 text-white border-white/30 font-semibold">
                  {stats.tier}
                </Badge>
              )}
            </div>
            <h3 className="text-4xl font-bold mb-2 text-white">
              {formatPoints(wallet.availablePoints)}
            </h3>
            <p className="text-white/90 text-sm mb-4 font-medium">Available Points</p>
            <div className="text-3xl font-bold text-white">{formatUsdValue(wallet.availablePoints)}</div>
            <p className="text-white/80 text-xs mt-2 font-medium">Cash Value Available</p>
          </Card>

          {/* Lifetime Earned */}
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">Total Value</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">
                  {formatUsdValue(stats.lifetimeSavings)}
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white mb-1">
              {formatPoints(wallet.lifetimeEarned)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Lifetime Earned</p>
            <div className="mt-3 text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Keep spending to earn more
            </div>
          </Card>

          {/* Lifetime Redeemed */}
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">Savings</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white dark:text-white">
                  {formatUsdValue(wallet.lifetimeRedeemed)}
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white mb-1">
              {formatPoints(wallet.lifetimeRedeemed)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Lifetime Redeemed</p>
            {isMounted && (
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last redeemed {formatDate(wallet.lastRedeemedAt || new Date().toISOString())}
              </div>
            )}
          </Card>

          {/* Member Since */}
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              {stats.tier && (
                <Badge variant="warning" className="text-xs">
                  {stats.tier} Member
                </Badge>
              )}
            </div>
            {isMounted && (
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white mb-1">
                {formatDate(stats.memberSince)}
              </h3>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
              {stats.favoriteMerchant && (
                <div className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  Favorite: {stats.favoriteMerchant.merchantName}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Points by Merchant */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white dark:text-white">Points by Merchant</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                See where you've earned your points
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_POINTS_BY_MERCHANT.map((merchant) => (
              <Card key={merchant.merchantId} className="p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <Badge variant="default" className="text-xs">
                    {merchant.businessType}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white dark:text-white text-sm mb-1 line-clamp-1">
                  {merchant.merchantName}
                </h3>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {formatPoints(merchant.earnedPoints)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  {formatUsdValue(merchant.earnedUsdValue)} value
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
                  <span>{merchant.transactionCount} transactions</span>
                  <Calendar className="w-3 h-3" />
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Transaction History */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white dark:text-white">Transaction History</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {filteredTransactions.length} transactions
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={eventFilter}
                  onChange={(e) => setEventFilter(e.target.value as LoyaltyEventType | 'ALL')}
                  className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:text-white rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="ALL">All Events</option>
                  <option value="EARN">Earned</option>
                  <option value="REDEEM">Redeemed</option>
                  <option value="EXPIRE">Expired</option>
                  <option value="TRANSFER">Transfer</option>
                  <option value="ADJUSTMENT">Adjustment</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={merchantFilter}
                  onChange={(e) => setMerchantFilter(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:text-white rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="ALL">All Merchants</option>
                  {uniqueMerchants.map((merchantId) => {
                    const tx = MOCK_LOYALTY_TRANSACTIONS.find((t) => t.merchantId === merchantId)
                    return (
                      <option key={merchantId} value={merchantId}>
                        {tx?.merchantName}
                      </option>
                    )
                  })}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {isMounted && filteredTransactions.map((transaction) => {
              const eventConfig = EVENT_TYPES[transaction.eventType]
              const EventIcon = eventConfig.icon
              const isPositive = transaction.pointsDelta > 0

              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 ${eventConfig.bg} dark:bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <EventIcon className={`w-5 h-5 ${eventConfig.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white dark:text-white text-sm">
                        {transaction.merchantName}
                      </h3>
                      <Badge variant="default" className="text-xs">
                        {transaction.businessType}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{transaction.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
                      <span>{formatDateTime(transaction.timestamp)}</span>
                      {transaction.expiresAt && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Expires {formatDate(transaction.expiresAt)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div
                      className={`text-lg font-bold ${
                        isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {formatPoints(transaction.pointsDelta)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {isPositive ? '+' : ''}
                      {formatUsdValue(Math.abs(transaction.pointsDelta))}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400 mt-1">
                      Balance: {formatPoints(transaction.balanceAfter)}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">No transactions found with the selected filters</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setEventFilter('ALL')
                  setMerchantFilter('ALL')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Card>
      </div>
    </PageLayout>
  )
}
