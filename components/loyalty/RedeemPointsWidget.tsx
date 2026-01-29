'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coins, AlertTriangle, CheckCircle, Info, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPoints, formatUsdValue, pointsToUsd } from '@/lib/mock-data/loyalty'
import type { MerchantLoyaltyConfig, LoyaltyWallet } from '@/types/loyalty'

interface RedeemPointsWidgetProps {
  merchantConfig: MerchantLoyaltyConfig
  userWallet: LoyaltyWallet
  billAmount: number
  onRedeemChange: (pointsToRedeem: number, usdValue: number) => void
}

export function RedeemPointsWidget({
  merchantConfig,
  userWallet,
  billAmount,
  onRedeemChange,
}: RedeemPointsWidgetProps) {
  const [pointsToRedeem, setPointsToRedeem] = useState(0)
  const [showWidget, setShowWidget] = useState(false)

  // Check if redemption is allowed
  if (!merchantConfig.allowRedemption) {
    return null
  }

  // Calculate redemption limits
  const maxRedeemableAmount = billAmount * (merchantConfig.maxRedemptionPercent / 100)
  const maxRedeemablePoints = Math.floor(maxRedeemableAmount * 100) // Convert USD to points
  const availableForRedemption = Math.min(
    userWallet.availablePoints,
    maxRedeemablePoints,
    merchantConfig.minRedemptionPoints > 0 ? userWallet.availablePoints : 0
  )

  // Check eligibility
  const hasEnoughPoints = userWallet.availablePoints >= merchantConfig.minRedemptionPoints
  const canRedeem = hasEnoughPoints && availableForRedemption > 0

  const handleRedeemPoints = (points: number) => {
    const capped = Math.min(Math.max(0, points), availableForRedemption)
    setPointsToRedeem(capped)
    onRedeemChange(capped, pointsToUsd(capped))
  }

  const handleQuickRedeem = (percentage: number) => {
    const points = Math.floor(availableForRedemption * (percentage / 100))
    handleRedeemPoints(points)
  }

  const redeemValue = pointsToUsd(pointsToRedeem)
  const remainingAmount = billAmount - redeemValue

  if (!canRedeem) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <Coins className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Points Redemption</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {!hasEnoughPoints
                ? `You need at least ${formatPoints(merchantConfig.minRedemptionPoints)} points to redeem at this merchant.`
                : 'Redemption is not available for this transaction.'}
            </p>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Your balance: {formatPoints(userWallet.availablePoints)} (
              {formatUsdValue(userWallet.availablePoints)})
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div
        className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 cursor-pointer"
        onClick={() => setShowWidget(!showWidget)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-0.5">Redeem Your Points</h3>
              <p className="text-xs text-primary-100">
                {formatPoints(userWallet.availablePoints)} available • Up to{' '}
                {formatPoints(availableForRedemption)} redeemable
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            {showWidget ? 'Hide' : 'Redeem'}
          </Button>
        </div>
      </div>

      {/* Redemption Widget */}
      <AnimatePresence>
        {showWidget && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            <div className="p-4 space-y-4">
              {/* Info Banner */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex gap-2">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  You can redeem up to {merchantConfig.maxRedemptionPercent}% of your bill (
                  {formatUsdValue(maxRedeemablePoints)}) with points at this merchant.
                </div>
              </div>

              {/* Points Input */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Points to Redeem
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRedeemPoints(pointsToRedeem - 100)}
                    disabled={pointsToRedeem === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={pointsToRedeem}
                      onChange={(e) => handleRedeemPoints(parseInt(e.target.value) || 0)}
                      min={0}
                      max={availableForRedemption}
                      step={100}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Max: {formatPoints(availableForRedemption)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRedeemPoints(pointsToRedeem + 100)}
                    disabled={pointsToRedeem >= availableForRedemption}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Redeem Buttons */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleQuickRedeem(25)}
                >
                  25%
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleQuickRedeem(50)}
                >
                  50%
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleQuickRedeem(75)}
                >
                  75%
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleQuickRedeem(100)}
                >
                  Max
                </Button>
              </div>

              {/* Redemption Preview */}
              {pointsToRedeem > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h4 className="text-sm font-semibold text-green-900 dark:text-green-100">Redemption Summary</h4>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Original Bill</span>
                      <span className="font-medium text-gray-900 dark:text-white">${billAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Points Redeemed</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        -{formatPoints(pointsToRedeem)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Points Value</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        -${redeemValue.toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-green-300 dark:border-green-700 pt-2 mt-2 flex justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">Amount to Pay</span>
                      <span className="font-bold text-lg text-gray-900 dark:text-white">
                        ${remainingAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-green-700 dark:text-green-300 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    You'll save ${redeemValue.toFixed(2)} on this transaction
                  </div>
                </motion.div>
              )}

              {/* Warnings */}
              {pointsToRedeem > 0 &&
                remainingAmount < merchantConfig.minPurchaseAmount &&
                merchantConfig.minPurchaseAmount > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 flex gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-700 dark:text-amber-300">
                      <strong>Note:</strong> Your remaining amount after redemption ($
                      {remainingAmount.toFixed(2)}) is below the minimum purchase amount for earning
                      new points (${merchantConfig.minPurchaseAmount.toFixed(2)}).
                    </div>
                  </div>
                )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    handleRedeemPoints(0)
                    setShowWidget(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  disabled={pointsToRedeem === 0}
                  onClick={() => setShowWidget(false)}
                >
                  Apply {pointsToRedeem > 0 && `(${formatPoints(pointsToRedeem)})`}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
