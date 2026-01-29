'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Activity,
  Lock,
  Unlock,
  Eye,
  MoreVertical,
  Calendar,
  Users,
  BarChart3,
  FileText,
  ArrowLeft,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Badge } from '@/components/ui/badge'
import {
  mockCorporateCards,
  mockCardAnalytics,
  mockFraudAlerts,
  getUnreviewedFraudAlerts,
  getTotalMonthlySubscriptionCost,
} from '@/lib/mock-data/corporate-cards'
import {
  formatCardNumber,
  getCardStatusColor,
  formatCurrency,
  getSpendingLimitProgress,
} from '@/types/corporate-cards'
import type { CardStatus, CardType } from '@/types/corporate-cards'

export default function CorporateCardsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<CardStatus | 'ALL'>('ALL')
  const [typeFilter, setTypeFilter] = useState<CardType | 'ALL'>('ALL')

  const analytics = mockCardAnalytics
  const unreviewedAlerts = getUnreviewedFraudAlerts()
  const monthlySubscriptionCost = getTotalMonthlySubscriptionCost()

  // Filter cards
  const filteredCards = mockCorporateCards.filter((card) => {
    const matchesSearch =
      card.cardholderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.lastFourDigits.includes(searchTerm)

    const matchesStatus = statusFilter === 'ALL' || card.status === statusFilter
    const matchesType = typeFilter === 'ALL' || card.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Back Navigation */}
      <div className="mb-2">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Corporate Cards
          </h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            Manage company cards, track spending, and monitor transactions
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/cards/requests')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-700/50 rounded-lg"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Card Requests</span>
          </button>
          <button
            onClick={() => router.push('/cards/request')}
            className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Request Card</span>
          </button>
        </div>
      </div>
      {/* Alert Banner for Fraud Alerts */}
      {unreviewedAlerts.length > 0 && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200/60 dark:border-red-700/40 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-[13px] font-semibold text-red-900 dark:text-red-300">
                {unreviewedAlerts.length} Unreviewed Fraud Alert{unreviewedAlerts.length > 1 ? 's' : ''}
              </h3>
              <p className="text-[13px] text-red-700 dark:text-red-400 mt-0.5">
                Suspicious transactions detected. Please review immediately.
              </p>
            </div>
            <button
              onClick={() => router.push('/cards/fraud-alerts')}
              className="text-[13px] text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors px-3 py-1.5 border border-red-200 dark:border-red-700/50 rounded-lg"
            >
              Review Alerts
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <CreditCard className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {analytics.totalCards}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Total Cards
          </div>
          <div className="text-[12px] text-green-600 dark:text-green-400">
            {analytics.activeCards} active
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {formatCurrency(analytics.spendingThisMonth)}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            This Month
          </div>
          <div className="text-[12px] text-red-600 dark:text-red-400">
            {((analytics.spendingThisMonth / analytics.spendingLastMonth - 1) * 100).toFixed(1)}% vs last month
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {formatCurrency(monthlySubscriptionCost)}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Monthly Subscriptions
          </div>
          <div className="text-[12px] text-gray-500">
            Recurring charges
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {unreviewedAlerts.length}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Fraud Alerts
          </div>
          <div className="text-[12px] text-amber-600 dark:text-amber-400">
            Needs review
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <button
            onClick={() => router.push('/cards/transactions')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>View Transactions</span>
          </button>
          <button
            onClick={() => router.push('/cards/analytics')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => router.push('/cards/cardholders')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Cardholders</span>
          </button>
          <button
            onClick={() => router.push('/cards/subscriptions')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Subscriptions</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by cardholder, department, or card number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-[13px] bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as CardStatus | 'ALL')}
              className="h-9 px-3 text-[13px] bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="FROZEN">Frozen</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="EXPIRED">Expired</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as CardType | 'ALL')}
              className="h-9 px-3 text-[13px] bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            >
              <option value="ALL">All Types</option>
              <option value="PHYSICAL">Physical</option>
              <option value="VIRTUAL">Virtual</option>
              <option value="VIRTUAL_SINGLE_USE">Single-Use</option>
              <option value="SUBSCRIPTION">Subscription</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        {filteredCards.length === 0 ? (
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-12 border border-gray-200 dark:border-gray-700/40 text-center">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-2">
              No cards found
            </h3>
            <p className="text-[13px] text-gray-500">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          filteredCards.map((card) => {
            const monthlyLimit = card.spendingLimits.find((l) => l.type === 'MONTHLY')
            const limitProgress = monthlyLimit
              ? getSpendingLimitProgress(monthlyLimit)
              : null

            return (
              <div
                key={card.id}
                className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer"
                onClick={() => router.push(`/cards/${card.id}`)}
              >
                  <div className="flex items-start justify-between">
                    {/* Card Info */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Card Visual */}
                      <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg">
                        <CreditCard className="w-7 h-7 text-white" />
                      </div>

                      {/* Card Details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                            {card.cardholderName}
                          </h3>
                          <Badge variant={getCardStatusColor(card.status) as any} size="sm">
                            {card.status}
                          </Badge>
                          <Badge variant="default" size="sm">
                            {card.type.replace('_', ' ')}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-[13px] text-gray-500">
                          <span className="font-mono">
                            {formatCardNumber(card.lastFourDigits)}
                          </span>
                          <span>{card.department}</span>
                          {card.nickname && <span className="italic">{card.nickname}</span>}
                        </div>

                        {/* Spending Progress */}
                        {limitProgress && monthlyLimit && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-[13px] mb-1.5">
                              <span className="text-gray-500">
                                Monthly Spending
                              </span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(monthlyLimit.spent)} / {formatCurrency(monthlyLimit.amount)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full transition-all ${
                                  limitProgress.status === 'exceeded'
                                    ? 'bg-red-600'
                                    : limitProgress.status === 'critical'
                                    ? 'bg-amber-600'
                                    : limitProgress.status === 'warning'
                                    ? 'bg-amber-600'
                                    : 'bg-green-600'
                                }`}
                                style={{ width: `${Math.min(limitProgress.percentage, 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Stats */}
                    <div className="text-right">
                      <p className="text-xl font-semibold text-gray-900 dark:text-white tabular-nums">
                        {formatCurrency(card.totalSpent)}
                      </p>
                      <p className="text-[13px] text-gray-500 mt-1">
                        {card.transactionCount} transactions
                      </p>
                      {card.lastUsed && (
                        <p className="text-[12px] text-gray-500 mt-2">
                          Last used {new Date(card.lastUsed).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700/40">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/cards/${card.id}`)
                    }}
                    className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-gray-700/50 rounded-lg"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                  {card.status === 'ACTIVE' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle freeze card
                      }}
                      className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-gray-700/50 rounded-lg"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Freeze</span>
                    </button>
                  )}
                  {card.status === 'FROZEN' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle unfreeze card
                      }}
                      className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-gray-700/50 rounded-lg"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Unfreeze</span>
                    </button>
                  )}
                </div>
              </div>
              )
            })
          )}
        </div>

      {/* Department Spending Summary */}
      <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
        <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-4">
          Spending by Department
        </h2>
        <div className="space-y-3">
          {analytics.spendingByDepartment.map((dept) => {
            const totalBudget = dept.cardCount * 10000 // Assume $10k per card
            const percentage = (dept.totalSpend / totalBudget) * 100

            return (
              <div key={dept.department}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-gray-900 dark:text-white">
                      {dept.department}
                    </span>
                    <span className="text-[12px] text-gray-500">
                      {dept.cardCount} card{dept.cardCount > 1 ? 's' : ''}
                    </span>
                  </div>
                  <span className="text-[13px] font-semibold text-gray-900 dark:text-white tabular-nums">
                    {formatCurrency(dept.totalSpend)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="h-1.5 bg-teal-600 rounded-full"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      </div>
    </PageLayout>
  )
}
