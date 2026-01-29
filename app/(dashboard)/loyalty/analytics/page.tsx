'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Gift,
  DollarSign,
  Percent,
  UserPlus,
  Repeat,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Building2,
  BarChart3,
  ArrowLeft,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MOCK_MERCHANT_ANALYTICS,
  formatPoints,
} from '@/lib/mock-data/loyalty'

export default function LoyaltyAnalyticsPage() {
  const router = useRouter()

  // In a real app, this would be the current merchant's analytics
  const analytics = MOCK_MERCHANT_ANALYTICS
  const [dateRange, setDateRange] = useState('30d')

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

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  // Calculate lift in basket size
  const basketLift =
    ((analytics.averageBasketWithPoints - analytics.averageBasketWithoutPoints) /
      analytics.averageBasketWithoutPoints) *
    100

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white">Loyalty Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Period: {formatDate(analytics.period.start)} - {formatDate(analytics.period.end)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={dateRange === '7d' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDateRange('7d')}
            >
              7 Days
            </Button>
            <Button
              variant={dateRange === '30d' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDateRange('30d')}
            >
              30 Days
            </Button>
            <Button
              variant={dateRange === '90d' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDateRange('90d')}
            >
              90 Days
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Users */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <Badge variant="default" className="text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12%
              </Badge>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {analytics.activeUsers.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Active Loyalty Users</p>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <UserPlus className="w-3 h-3" />
                {analytics.newLoyaltyUsers} new
              </span>
              <span className="flex items-center gap-1">
                <Repeat className="w-3 h-3" />
                {analytics.repeatCustomers} repeat
              </span>
            </div>
          </Card>

          {/* Points Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <Badge variant="default" className="text-xs text-green-600">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                Issued
              </Badge>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatPoints(analytics.totalPointsEarned)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Points Issued</p>
            <div className="text-xs text-red-600">
              Cost: {formatCurrency(analytics.totalEarnCostUsd)}
            </div>
          </Card>

          {/* Points Redeemed */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <Badge variant="default" className="text-xs text-blue-600 dark:text-blue-400">
                <ArrowDownLeft className="w-3 h-3 mr-1" />
                Redeemed
              </Badge>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatPoints(analytics.totalPointsRedeemed)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Points Redeemed</p>
            <div className="text-xs text-green-600">
              Value: {formatCurrency(analytics.totalRedeemRevenueUsd)}
            </div>
          </Card>

          {/* Net Cost */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${analytics.netLoyaltyCostUsd >= 0 ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'} rounded-lg flex items-center justify-center`}>
                <DollarSign className={`w-6 h-6 ${analytics.netLoyaltyCostUsd >= 0 ? 'text-red-600' : 'text-green-600'}`} />
              </div>
              <Badge variant="default" className="text-xs">
                {analytics.netLoyaltyCostUsd >= 0 ? 'Cost' : 'Profit'}
              </Badge>
            </div>
            <h3 className={`text-3xl font-bold mb-1 ${analytics.netLoyaltyCostUsd >= 0 ? 'text-red-600' : 'text-green-600'}`}>
              {formatCurrency(Math.abs(analytics.netLoyaltyCostUsd))}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Net Loyalty Cost</p>
            <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
              {analytics.netPointsIssued > 0 ? 'Net issuer' : 'Net redeemer'}
            </div>
          </Card>
        </div>

        {/* Engagement & Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Engagement */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">User Engagement</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Loyalty participation metrics</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 dark:from-purple-900/30 to-purple-100 dark:to-purple-900/40 rounded-lg">
                <div>
                  <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">Average Points per User</div>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {formatPoints(analytics.averagePointsPerUser)}
                  </div>
                </div>
                <div className="w-16 h-16 bg-purple-200 dark:bg-purple-700 rounded-full flex items-center justify-center">
                  <Gift className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">New Members</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">
                    {analytics.newLoyaltyUsers}
                  </div>
                  <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +18% vs last period
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Repeat Customers</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">
                    {analytics.repeatCustomers}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    {((analytics.repeatCustomers / analytics.activeUsers) * 100).toFixed(1)}% of
                    active
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Redemption Metrics */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Percent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Redemption Performance</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Points redemption behavior</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 dark:from-blue-900/30 to-blue-100 dark:to-blue-900/40 rounded-lg">
                <div>
                  <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Redemption Rate</div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {formatPercentage(analytics.redemptionRate)}
                  </div>
                </div>
                <div className="w-16 h-16 bg-blue-200 dark:bg-blue-700 rounded-full flex items-center justify-center">
                  <Percent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400 dark:text-gray-400">Avg Basket with Points</span>
                    <Badge variant="default" className="text-xs text-green-600">
                      +{formatPercentage(basketLift)}
                    </Badge>
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white dark:text-white">
                    {formatCurrency(analytics.averageBasketWithPoints)}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Avg Basket without Points</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white dark:text-white">
                    {formatCurrency(analytics.averageBasketWithoutPoints)}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Points Flow */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Points Flow Analysis</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Movement and balance of loyalty points</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Points Earned */}
            <div className="p-6 bg-gradient-to-br from-green-50 dark:from-green-900/30 to-green-100 dark:to-green-900/40 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <ArrowUpRight className="w-5 h-5 text-green-600" />
                <h3 className="text-sm font-semibold text-green-900 dark:text-green-100">Points Earned</h3>
              </div>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100 mb-2">
                {formatPoints(analytics.totalPointsEarned)}
              </div>
              <div className="text-sm text-green-700 mb-4">
                Cost: {formatCurrency(analytics.totalEarnCostUsd)}
              </div>
              <div className="w-full bg-green-200 dark:bg-green-700 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${(analytics.totalPointsEarned / (analytics.totalPointsEarned + analytics.totalPointsRedeemed)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Points Redeemed */}
            <div className="p-6 bg-gradient-to-br from-blue-50 dark:from-blue-900/30 to-blue-100 dark:to-blue-900/40 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <ArrowDownLeft className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">Points Redeemed</h3>
              </div>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                {formatPoints(analytics.totalPointsRedeemed)}
              </div>
              <div className="text-sm text-blue-700 mb-4">
                Value: {formatCurrency(analytics.totalRedeemRevenueUsd)}
              </div>
              <div className="w-full bg-blue-200 dark:bg-blue-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${(analytics.totalPointsRedeemed / (analytics.totalPointsEarned + analytics.totalPointsRedeemed)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Net Position */}
            <div className={`p-6 rounded-lg ${analytics.netPointsIssued >= 0 ? 'bg-gradient-to-br from-red-50 dark:from-red-900/30 to-red-100 dark:to-red-900/40' : 'bg-gradient-to-br from-green-50 dark:from-green-900/30 to-green-100 dark:to-green-900/40'}`}>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className={`w-5 h-5 ${analytics.netPointsIssued >= 0 ? 'text-red-600' : 'text-green-600'}`} />
                <h3 className={`text-sm font-semibold ${analytics.netPointsIssued >= 0 ? 'text-red-900 dark:text-red-100' : 'text-green-900 dark:text-green-100'}`}>
                  Net Position
                </h3>
              </div>
              <div className={`text-3xl font-bold mb-2 ${analytics.netPointsIssued >= 0 ? 'text-red-900 dark:text-red-100' : 'text-green-900 dark:text-green-100'}`}>
                {analytics.netPointsIssued >= 0 ? '+' : ''}
                {formatPoints(analytics.netPointsIssued)}
              </div>
              <div className={`text-sm mb-4 ${analytics.netPointsIssued >= 0 ? 'text-red-700' : 'text-green-700'}`}>
                {analytics.netPointsIssued >= 0
                  ? `More points issued than redeemed`
                  : `More points redeemed than issued`}
              </div>
              <Badge
                className={
                  analytics.netPointsIssued >= 0
                    ? 'bg-red-200 text-red-800'
                    : 'bg-green-200 text-green-800'
                }
              >
                {analytics.netPointsIssued >= 0 ? 'Net Issuer' : 'Net Redeemer'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Settlement Position */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">Cross-Merchant Settlement</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">
                Your position in the Wiremi loyalty network
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Settlement Owed</div>
              <div className="text-2xl font-bold text-red-600 mb-1">
                {formatCurrency(analytics.settlementOwed)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
                Points redeemed by customers from other merchants
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Settlement Receivable</div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatCurrency(analytics.settlementReceivable)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
                Your points redeemed at other merchants
              </div>
            </div>

            <div className={`p-6 rounded-lg ${analytics.netSettlementPosition >= 0 ? 'bg-gradient-to-br from-green-50 dark:from-green-900/30 to-green-100 dark:to-green-900/40' : 'bg-gradient-to-br from-red-50 dark:from-red-900/30 to-red-100 dark:to-red-900/40'}`}>
              <div className={`text-sm mb-2 ${analytics.netSettlementPosition >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                Net Settlement Position
              </div>
              <div className={`text-2xl font-bold mb-1 ${analytics.netSettlementPosition >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(Math.abs(analytics.netSettlementPosition))}
              </div>
              <Badge
                className={
                  analytics.netSettlementPosition >= 0
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                }
              >
                {analytics.netSettlementPosition >= 0 ? 'You Receive' : 'You Pay'}
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
