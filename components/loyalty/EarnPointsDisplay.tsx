'use client'

import { motion } from 'framer-motion'
import { Coins, TrendingUp, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatPoints, formatUsdValue, usdToPoints } from '@/lib/mock-data/loyalty'
import type { MerchantLoyaltyConfig } from '@/types/loyalty'

interface EarnPointsDisplayProps {
  merchantConfig: MerchantLoyaltyConfig
  transactionAmount: number
  showDetails?: boolean
}

export function EarnPointsDisplay({
  merchantConfig,
  transactionAmount,
  showDetails = true,
}: EarnPointsDisplayProps) {
  // Calculate points to be earned
  const isEligible = transactionAmount >= merchantConfig.minPurchaseAmount
  const earnedAmount = transactionAmount * (merchantConfig.earnRatePercent / 100)
  const pointsToEarn = Math.floor(usdToPoints(earnedAmount))

  // Apply cap if configured
  const finalPoints =
    merchantConfig.maxPointsPerTransaction && pointsToEarn > merchantConfig.maxPointsPerTransaction
      ? merchantConfig.maxPointsPerTransaction
      : pointsToEarn

  if (!isEligible) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <Coins className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Spend ${merchantConfig.minPurchaseAmount.toFixed(2)} or more to earn points
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-green-500 dark:bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-green-900 dark:text-green-100">
              You'll earn {formatPoints(finalPoints)} points
            </h3>
            <Badge className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs">
              +{formatUsdValue(finalPoints)} value
            </Badge>
          </div>
          {showDetails && (
            <div className="space-y-2 mt-3">
              <div className="flex items-center justify-between text-xs text-green-700 dark:text-green-300">
                <span>Transaction amount</span>
                <span className="font-medium">${transactionAmount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-green-700 dark:text-green-300">
                <span>Earn rate ({merchantConfig.earnRatePercent}%)</span>
                <span className="font-medium">{formatPoints(finalPoints)} points</span>
              </div>
              {merchantConfig.maxPointsPerTransaction &&
                pointsToEarn > merchantConfig.maxPointsPerTransaction && (
                  <div className="flex items-start gap-1 mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
                    <Info className="w-3 h-3 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      Maximum {formatPoints(merchantConfig.maxPointsPerTransaction)} points per
                      transaction reached
                    </p>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
