'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Building2,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  DollarSign,
  Users,
  Calendar,
  Download,
  Filter,
  ChevronDown,
  ArrowLeft,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MOCK_LOYALTY_SETTLEMENTS, formatPoints } from '@/lib/mock-data/loyalty'
import type { SettlementStatus } from '@/types/loyalty'

export default function LoyaltySettlementsPage() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<SettlementStatus | 'ALL'>('ALL')

  const filteredSettlements = MOCK_LOYALTY_SETTLEMENTS.filter((settlement) => {
    return statusFilter === 'ALL' || settlement.status === statusFilter
  })

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const STATUS_CONFIG: Record<
    SettlementStatus,
    { icon: any; color: string; bg: string; label: string }
  > = {
    PENDING: {
      icon: Clock,
      color: 'text-yellow-700 dark:text-yellow-400',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      label: 'Pending',
    },
    PROCESSING: {
      icon: Clock,
      color: 'text-blue-700 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      label: 'Processing',
    },
    COMPLETED: {
      icon: CheckCircle,
      color: 'text-green-700 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/30',
      label: 'Completed',
    },
    FAILED: {
      icon: XCircle,
      color: 'text-red-700 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/30',
      label: 'Failed',
    },
    CANCELLED: {
      icon: AlertTriangle,
      color: 'text-gray-700 dark:text-gray-300 dark:text-gray-400',
      bg: 'bg-gray-100 dark:bg-gray-800',
      label: 'Cancelled',
    },
  }

  // Calculate summary stats
  const totalSettlementVolume = filteredSettlements.reduce(
    (sum, s) => sum + s.usdValue,
    0
  )
  const totalWiremiFees = filteredSettlements.reduce(
    (sum, s) => sum + s.wiremiFeeAmount,
    0
  )
  const totalNetSettlement = filteredSettlements.reduce(
    (sum, s) => sum + s.netSettlementAmount,
    0
  )
  const totalTransactions = filteredSettlements.reduce(
    (sum, s) => sum + s.transactionIds.length,
    0
  )

  const completedSettlements = filteredSettlements.filter(
    (s) => s.status === 'COMPLETED'
  ).length

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white">Settlement Records</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Cross-merchant loyalty point redemption settlements
            </p>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
              <Badge variant="default" className="text-xs">Total Volume</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(totalSettlementVolume)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Total Settlement Value</p>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
              {formatPoints(totalSettlementVolume * 100)} points
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <Badge variant="default" className="text-xs text-green-600">
                Completed
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {completedSettlements}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Completed Settlements</p>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
              of {filteredSettlements.length} total
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <Badge variant="default" className="text-xs">Wiremi Fees</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(totalWiremiFees)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Total Wiremi Fees</p>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
              {((totalWiremiFees / totalSettlementVolume) * 100).toFixed(2)}% avg rate
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-blue-600" />
              </div>
              <Badge variant="default" className="text-xs">Transactions</Badge>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {totalTransactions}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Total Transactions</p>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
              {Math.floor(totalTransactions / filteredSettlements.length)} avg per settlement
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by Status:</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={statusFilter === 'ALL' ? 'primary' : 'outline'}
                onClick={() => setStatusFilter('ALL')}
              >
                All
              </Button>
              {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                <Button
                  key={status}
                  size="sm"
                  variant={statusFilter === status ? 'primary' : 'outline'}
                  onClick={() => setStatusFilter(status as SettlementStatus)}
                  className="gap-2"
                >
                  <config.icon className="w-3 h-3" />
                  {config.label}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Settlement Records */}
        <div className="space-y-4">
          {filteredSettlements.map((settlement) => {
            const statusConfig = STATUS_CONFIG[settlement.status]
            const StatusIcon = statusConfig.icon

            return (
              <motion.div
                key={settlement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-gray-50 dark:from-gray-800 to-gray-100 dark:to-gray-700 p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={`${statusConfig.bg} ${statusConfig.color}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                        <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">
                          Settlement ID: {settlement.id}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">Settlement Date</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white dark:text-white">
                          {formatDate(settlement.settlementDate)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {/* Merchant Flow */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-blue-600 mb-1">From (Points Earned)</div>
                            <div className="text-sm font-semibold text-blue-900">
                              {settlement.fromMerchantName}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-5 h-5 text-primary-600" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                          <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs text-green-600 mb-1">To (Points Redeemed)</div>
                            <div className="text-sm font-semibold text-green-900">
                              {settlement.toMerchantName}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Settlement Details */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Points Value</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">
                          {formatPoints(settlement.pointsValue)}
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">USD Value</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white dark:text-white">
                          {formatCurrency(settlement.usdValue)}
                        </div>
                      </div>

                      <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                        <div className="text-xs text-orange-600 mb-1">
                          Wiremi Fee ({settlement.wiremiFeePercent}%)
                        </div>
                        <div className="text-lg font-bold text-orange-600">
                          {formatCurrency(settlement.wiremiFeeAmount)}
                        </div>
                      </div>

                      <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <div className="text-xs text-green-600 mb-1">Net Settlement</div>
                        <div className="text-lg font-bold text-green-600">
                          {formatCurrency(settlement.netSettlementAmount)}
                        </div>
                      </div>

                      <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                        <div className="text-xs text-purple-600 mb-1">Users</div>
                        <div className="text-lg font-bold text-purple-600 flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {settlement.userCount}
                        </div>
                      </div>
                    </div>

                    {/* Transaction Info */}
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-blue-700">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {settlement.transactionIds.length} transactions in this settlement
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        View Details
                      </Button>
                    </div>

                    {/* Status Info */}
                    {settlement.status === 'COMPLETED' && settlement.completedAt && (
                      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-center gap-2 text-xs text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          <span>
                            Completed on {formatDateTime(settlement.completedAt)}
                          </span>
                        </div>
                      </div>
                    )}

                    {settlement.status === 'PROCESSING' && settlement.processedAt && (
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-center gap-2 text-xs text-blue-700">
                          <Clock className="w-4 h-4" />
                          <span>
                            Processing since {formatDateTime(settlement.processedAt)}
                          </span>
                        </div>
                      </div>
                    )}

                    {settlement.status === 'FAILED' && settlement.failureReason && (
                      <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-start gap-2 text-xs text-red-700">
                          <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-semibold mb-1">Settlement Failed</div>
                            <div>{settlement.failureReason}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {filteredSettlements.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No settlements found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                There are no settlement records matching your current filters.
              </p>
              <Button variant="outline" onClick={() => setStatusFilter('ALL')}>
                Clear Filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
