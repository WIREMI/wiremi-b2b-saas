'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Settings,
  TrendingUp,
  Shield,
  Clock,
  Percent,
  DollarSign,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  Edit,
  Users,
  Gift,
  AlertTriangle,
  Info,
  ArrowLeft,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MOCK_MERCHANT_LOYALTY_CONFIGS,
  MOCK_MERCHANT_ANALYTICS,
  LOYALTY_PROGRAM_SETTINGS,
  formatPoints,
} from '@/lib/mock-data/loyalty'
import type { LoyaltyConfigStatus } from '@/types/loyalty'

export default function MerchantLoyaltyConfigPage() {
  const router = useRouter()

  // In a real app, this would be the current merchant's ID
  const currentMerchantId = 'merchant-hotel-1'
  const merchantConfig = MOCK_MERCHANT_LOYALTY_CONFIGS.find(
    (config) => config.merchantId === currentMerchantId
  )
  const merchantAnalytics = MOCK_MERCHANT_ANALYTICS

  const [isEditing, setIsEditing] = useState(false)

  if (!merchantConfig || !merchantAnalytics) {
    return <div>Merchant configuration not found</div>
  }

  const STATUS_COLORS: Record<
    LoyaltyConfigStatus,
    { bg: string; text: string; icon: any; label: string }
  > = {
    ACTIVE: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-400',
      icon: CheckCircle,
      label: 'Active',
    },
    PAUSED: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-700 dark:text-yellow-400',
      icon: Pause,
      label: 'Paused',
    },
    INACTIVE: {
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-700 dark:text-gray-300 dark:text-gray-400',
      icon: XCircle,
      label: 'Inactive',
    },
  }

  const statusConfig = STATUS_COLORS[merchantConfig.status]
  const StatusIcon = statusConfig.icon

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <Button
              variant="ghost"
              className="mb-4 -ml-2 gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white">Loyalty Program Configuration</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your {LOYALTY_PROGRAM_SETTINGS.programName} settings and view performance
            </p>
          </div>
          <div className="flex gap-2">
            {merchantConfig.status === 'ACTIVE' ? (
              <Button variant="outline" className="gap-2">
                <Pause className="w-4 h-4" />
                Pause Program
              </Button>
            ) : (
              <Button className="gap-2">
                <Play className="w-4 h-4" />
                Activate Program
              </Button>
            )}
            <Button variant="outline" className="gap-2" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4" />
              Edit Settings
            </Button>
          </div>
        </div>

        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${statusConfig.bg} border border-${statusConfig.text.replace('text-', '')} rounded-lg p-4 flex items-center gap-3`}
        >
          <StatusIcon className={`w-5 h-5 ${statusConfig.text} flex-shrink-0`} />
          <div className="flex-1">
            <h3 className={`text-sm font-semibold ${statusConfig.text}`}>
              Your loyalty program is {statusConfig.label.toLowerCase()}
            </h3>
            <p className={`text-sm ${statusConfig.text} opacity-80 mt-1`}>
              {merchantConfig.status === 'ACTIVE' &&
                'Customers are earning and redeeming points at your business.'}
              {merchantConfig.status === 'PAUSED' &&
                'Point earning and redemption are temporarily suspended.'}
              {merchantConfig.status === 'INACTIVE' &&
                'Activate your program to start offering loyalty rewards.'}
            </p>
          </div>
          <Badge className={`${statusConfig.bg} ${statusConfig.text} border-0`}>
            Enrolled {formatDate(merchantConfig.enrolledAt)}
          </Badge>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Users */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <Badge variant="default" className="text-xs">This Period</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {merchantAnalytics.activeUsers.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Loyalty Users</p>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
              {merchantAnalytics.newLoyaltyUsers} new • {merchantAnalytics.repeatCustomers} repeat
            </div>
          </Card>

          {/* Points Issued */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <Badge variant="default" className="text-xs">Cost</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {formatPoints(merchantAnalytics.totalPointsEarned)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Points Issued</p>
            <div className="mt-3 text-xs text-red-600">
              Cost: {formatCurrency(merchantAnalytics.totalEarnCostUsd)}
            </div>
          </Card>

          {/* Points Redeemed */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <Badge variant="default" className="text-xs">Revenue</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {formatPoints(merchantAnalytics.totalPointsRedeemed)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Points Redeemed</p>
            <div className="mt-3 text-xs text-green-600">
              Value: {formatCurrency(merchantAnalytics.totalRedeemRevenueUsd)}
            </div>
          </Card>

          {/* Net Position */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${merchantAnalytics.netSettlementPosition >= 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'} rounded-lg flex items-center justify-center`}>
                <DollarSign className={`w-6 h-6 ${merchantAnalytics.netSettlementPosition >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <Badge variant="default" className="text-xs">Settlement</Badge>
            </div>
            <h3 className={`text-2xl font-bold mb-1 ${merchantAnalytics.netSettlementPosition >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(Math.abs(merchantAnalytics.netSettlementPosition))}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {merchantAnalytics.netSettlementPosition >= 0 ? 'Net Receivable' : 'Net Payable'}
            </p>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
              Redemption rate: {merchantAnalytics.redemptionRate}%
            </div>
          </Card>
        </div>

        {/* Configuration Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Earning Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Percent className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Earning Settings</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">How customers earn points at your business</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Earn Rate</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Points earned per dollar spent
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {merchantConfig.earnRatePercent}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
                    ({merchantConfig.earnRatePercent * LOYALTY_PROGRAM_SETTINGS.conversionRate} points/$1)
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Minimum Purchase</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Minimum transaction to earn points
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white dark:text-white">
                  {formatCurrency(merchantConfig.minPurchaseAmount)}
                </div>
              </div>

              {merchantConfig.maxPointsPerTransaction && (
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Maximum Points/Transaction</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                      Cap on points earned per transaction
                    </div>
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white dark:text-white">
                    {formatPoints(merchantConfig.maxPointsPerTransaction)}
                  </div>
                </div>
              )}

              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-2">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-700">
                  <strong>Example:</strong> A ${formatCurrency(100).slice(1)} purchase earns{' '}
                  {formatPoints(100 * merchantConfig.earnRatePercent)} points (
                  {formatCurrency(100 * merchantConfig.earnRatePercent * 0.01)} value)
                </div>
              </div>
            </div>
          </Card>

          {/* Redemption Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Gift className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Redemption Settings</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">How customers redeem points</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Redemption Enabled</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Allow points redemption at checkout
                  </div>
                </div>
                <Badge
                  className={
                    merchantConfig.allowRedemption
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }
                >
                  {merchantConfig.allowRedemption ? 'Yes' : 'No'}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Minimum Redemption</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Minimum points required to redeem
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white dark:text-white">
                  {formatPoints(merchantConfig.minRedemptionPoints)}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Maximum Redemption %</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Max % of bill payable with points
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {merchantConfig.maxRedemptionPercent}%
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-2">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-700">
                  <strong>Example:</strong> On a ${formatCurrency(100).slice(1)} bill, customers can redeem up to{' '}
                  {formatPoints(100 * merchantConfig.maxRedemptionPercent)} points (
                  {formatCurrency(100 * merchantConfig.maxRedemptionPercent * 0.01)} off)
                </div>
              </div>
            </div>
          </Card>

          {/* Expiry & Eligibility */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Expiry & Eligibility</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Point expiration and eligible services</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Points Expiry</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Points expire after this period
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white dark:text-white">
                  {merchantConfig.pointsExpiryDays} days
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Eligible Services</div>
                <div className="flex flex-wrap gap-2">
                  {merchantConfig.eligibleServices.map((service) => (
                    <Badge key={service} variant="default" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {merchantConfig.blackoutDates && merchantConfig.blackoutDates.length > 0 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <div className="text-sm font-medium text-amber-900">Blackout Dates</div>
                  </div>
                  <div className="text-xs text-amber-700">
                    Loyalty program is paused on specific dates
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Settlement Info */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Settlement Summary</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cross-merchant redemption settlement</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount Owed</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Points redeemed by other merchants
                  </div>
                </div>
                <div className="text-xl font-bold text-red-600">
                  {formatCurrency(merchantAnalytics.settlementOwed)}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount Receivable</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Your points redeemed elsewhere
                  </div>
                </div>
                <div className="text-xl font-bold text-green-600">
                  {formatCurrency(merchantAnalytics.settlementReceivable)}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <div>
                  <div className="text-sm font-semibold text-primary-900">Net Settlement Position</div>
                  <div className="text-xs text-primary-700 mt-1">
                    {merchantAnalytics.netSettlementPosition >= 0 ? 'You receive' : 'You pay'}
                  </div>
                </div>
                <div className={`text-2xl font-bold ${merchantAnalytics.netSettlementPosition >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(merchantAnalytics.netSettlementPosition))}
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-2">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-700">
                  Settlement occurs monthly. Wiremi charges{' '}
                  {LOYALTY_PROGRAM_SETTINGS.defaultWiremiFeePercent}% on cross-merchant redemptions.
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Performance Insights</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Period: {formatDate(merchantAnalytics.period.start)} -{' '}
                {formatDate(merchantAnalytics.period.end)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-blue-50 dark:from-blue-900/30 to-blue-100 dark:to-blue-900/40 rounded-lg">
              <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">Average Basket with Points</div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {formatCurrency(merchantAnalytics.averageBasketWithPoints)}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                vs {formatCurrency(merchantAnalytics.averageBasketWithoutPoints)} without
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-50 dark:from-green-900/30 to-green-100 dark:to-green-900/40 rounded-lg">
              <div className="text-sm text-green-700 dark:text-green-300 mb-2">Average Points per User</div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                {formatPoints(merchantAnalytics.averagePointsPerUser)}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                {formatCurrency(merchantAnalytics.averagePointsPerUser * 0.01)} value per user
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 dark:from-purple-900/30 to-purple-100 dark:to-purple-900/40 rounded-lg">
              <div className="text-sm text-purple-700 dark:text-purple-300 mb-2">Net Loyalty Cost</div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {formatCurrency(Math.abs(merchantAnalytics.netLoyaltyCostUsd))}
              </div>
              <div className="text-xs text-purple-600 mt-2">
                {merchantAnalytics.netLoyaltyCostUsd >= 0 ? 'Cost' : 'Profit'} this period
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
