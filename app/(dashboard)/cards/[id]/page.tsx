'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import {
  CreditCard,
  ArrowLeft,
  Lock,
  Unlock,
  Ban,
  Eye,
  EyeOff,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  MapPin,
  ShoppingCart,
  Settings,
  Download,
  Receipt,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import {
  mockCorporateCards,
  getTransactionsByCardId,
} from '@/lib/mock-data/corporate-cards'
import {
  formatCardNumber,
  getCardStatusColor,
  formatCurrency,
  getSpendingLimitProgress,
  getTransactionStatusColor,
} from '@/types/corporate-cards'
import type { CardStatus } from '@/types/corporate-cards'

export default function CardDetailPage() {
  const router = useRouter()
  const params = useParams()
  const cardId = params.id as string

  const [showFullCardNumber, setShowFullCardNumber] = useState(false)
  const [showCVV, setShowCVV] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'limits' | 'restrictions'>('overview')

  const card = mockCorporateCards.find((c) => c.id === cardId)
  const transactions = getTransactionsByCardId(cardId)

  if (!card) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Card not found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The card you're looking for doesn't exist
            </p>
            <Button onClick={() => router.push('/cards')}>Back to Cards</Button>
          </div>
        </div>
      </PageLayout>
    )
  }

  const monthlyLimit = card.spendingLimits.find((l) => l.type === 'MONTHLY')
  const dailyLimit = card.spendingLimits.find((l) => l.type === 'DAILY')
  const monthlyProgress = monthlyLimit ? getSpendingLimitProgress(monthlyLimit) : null
  const dailyProgress = dailyLimit ? getSpendingLimitProgress(dailyLimit) : null

  return (
    <PageLayout maxWidth="full">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Back Navigation */}
        <div className="mb-2">
          <button
            onClick={() => router.push('/cards')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Corporate Cards</span>
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {card.cardholderName}
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              {card.department} · {card.type.replace('_', ' ')}
            </p>
          </div>
          <div className="flex gap-3">
            {card.status === 'ACTIVE' && (
              <button
                className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-700/50 rounded-lg"
              >
                <Lock className="w-3.5 h-3.5" />
                Freeze Card
              </button>
            )}
            {card.status === 'FROZEN' && (
              <button
                className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-700/50 rounded-lg"
              >
                <Unlock className="w-3.5 h-3.5" />
                Unfreeze Card
              </button>
            )}
            <button
              className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-700/50 rounded-lg"
            >
              <Settings className="w-3.5 h-3.5" />
              Settings
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Card Visual */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              {/* Card Visual */}
              <div className="relative w-full aspect-[1.586] bg-gradient-to-br from-primary-500 dark:from-primary-600 to-primary-700 dark:to-primary-800 rounded-2xl p-6 text-white mb-6 shadow-xl">
                <div className="flex items-center justify-between mb-8">
                  <CreditCard className="w-10 h-10" />
                  <Badge
                    variant={getCardStatusColor(card.status)}
                    className="bg-white/20 dark:bg-black/20 backdrop-blur-sm"
                  >
                    {card.status}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs opacity-80 mb-1">Card Number</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-mono">
                        {showFullCardNumber
                          ? `4532 **** **** ${card.lastFourDigits}`
                          : formatCardNumber(card.lastFourDigits)}
                      </p>
                      <button
                        onClick={() => setShowFullCardNumber(!showFullCardNumber)}
                        className="p-1 hover:bg-white/20 dark:hover:bg-black/20 rounded"
                      >
                        {showFullCardNumber ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs opacity-80 mb-1">Cardholder</p>
                      <p className="text-sm font-semibold">{card.cardholderName}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-80 mb-1">Expires</p>
                      <p className="text-sm font-semibold">
                        {String(card.expiryMonth).padStart(2, '0')}/{String(card.expiryYear).slice(-2)}
                      </p>
                    </div>
                    {card.cvv && (
                      <div>
                        <p className="text-xs opacity-80 mb-1">CVV</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold font-mono">
                            {showCVV ? card.cvv : '•••'}
                          </p>
                          <button
                            onClick={() => setShowCVV(!showCVV)}
                            className="p-1 hover:bg-white/20 dark:hover:bg-black/20 rounded"
                          >
                            {showCVV ? (
                              <EyeOff className="w-3 h-3" />
                            ) : (
                              <Eye className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                  <p className="text-gray-900 dark:text-white">{card.cardholderEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Department</p>
                  <p className="text-gray-900 dark:text-white">{card.department}</p>
                </div>
                {card.nickname && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Nickname</p>
                    <p className="text-gray-900 dark:text-white italic">{card.nickname}</p>
                  </div>
                )}
                {card.assignedFor && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Purpose</p>
                    <p className="text-gray-900 dark:text-white">{card.assignedFor}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Issued Date</p>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(card.issuedDate).toLocaleDateString()}
                  </p>
                </div>
                {card.lastUsed && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Used</p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(card.lastUsed).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(card.totalSpent)}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {card.transactionCount}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Transaction</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(card.totalSpent / card.transactionCount)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-dark-border">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                  activeTab === 'transactions'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Transactions
              </button>
              <button
                onClick={() => setActiveTab('limits')}
                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                  activeTab === 'limits'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Spending Limits
              </button>
              <button
                onClick={() => setActiveTab('restrictions')}
                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                  activeTab === 'restrictions'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Restrictions
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Spending Limits */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Spending Limits
                  </h3>
                  <div className="space-y-4">
                    {monthlyLimit && monthlyProgress && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600 dark:text-gray-400">Monthly Limit</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(monthlyLimit.spent)} / {formatCurrency(monthlyLimit.amount)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${
                              monthlyProgress.status === 'exceeded'
                                ? 'bg-error'
                                : monthlyProgress.status === 'critical'
                                ? 'bg-warning'
                                : monthlyProgress.status === 'warning'
                                ? 'bg-warning'
                                : 'bg-success'
                            }`}
                            style={{ width: `${Math.min(monthlyProgress.percentage, 100)}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {formatCurrency(monthlyLimit.remaining)} remaining
                        </p>
                      </div>
                    )}

                    {dailyLimit && dailyProgress && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600 dark:text-gray-400">Daily Limit</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(dailyLimit.spent)} / {formatCurrency(dailyLimit.amount)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${
                              dailyProgress.status === 'exceeded'
                                ? 'bg-error'
                                : dailyProgress.status === 'critical'
                                ? 'bg-warning'
                                : dailyProgress.status === 'warning'
                                ? 'bg-warning'
                                : 'bg-success'
                            }`}
                            style={{ width: `${Math.min(dailyProgress.percentage, 100)}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Resets {new Date(dailyLimit.resetDate!).toLocaleTimeString()}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Recent Transactions */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recent Transactions
                    </h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setActiveTab('transactions')}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((txn) => (
                      <div
                        key={txn.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-surface rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-primary-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {txn.merchantName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(txn.transactionDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(txn.amount)}
                          </p>
                          <Badge variant={getTransactionStatusColor(txn.status) as any} size="sm">
                            {txn.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'transactions' && (
              <Card className="p-6">
                <div className="space-y-4">
                  {transactions.map((txn) => (
                    <div
                      key={txn.id}
                      className="flex items-start justify-between p-4 bg-gray-50 dark:bg-dark-surface rounded-lg hover:shadow transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <ShoppingCart className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {txn.merchantName}
                            </p>
                            <Badge variant={getTransactionStatusColor(txn.status) as any} size="sm">
                              {txn.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {txn.category.replace('_', ' ')} · {txn.merchantCountry}
                          </p>
                          {txn.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {txn.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            <span>{new Date(txn.transactionDate).toLocaleString()}</span>
                            {txn.receiptUploaded && (
                              <span className="flex items-center gap-1 text-success">
                                <Receipt className="w-3 h-3" />
                                Receipt
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(txn.amount)}
                        </p>
                        {txn.localAmount && txn.localCurrency !== txn.currency && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatCurrency(txn.localAmount, txn.localCurrency)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'limits' && (
              <Card className="p-6">
                <div className="space-y-6">
                  {card.spendingLimits.map((limit) => {
                    const progress = getSpendingLimitProgress(limit)
                    return (
                      <div key={limit.id}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {limit.type.replace('_', ' ')} Limit
                          </h4>
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Spent</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(limit.spent)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${
                                progress.status === 'exceeded'
                                  ? 'bg-error'
                                  : progress.status === 'critical'
                                  ? 'bg-warning'
                                  : progress.status === 'warning'
                                  ? 'bg-warning'
                                  : 'bg-success'
                              }`}
                              style={{ width: `${Math.min(progress.percentage, 100)}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Remaining</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(limit.remaining)} of {formatCurrency(limit.amount)}
                            </span>
                          </div>
                          {limit.resetDate && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                              Resets on {new Date(limit.resetDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )}

            {activeTab === 'restrictions' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Transaction Controls
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-surface rounded-lg">
                      <span className="text-gray-900 dark:text-white">Online Transactions</span>
                      <Badge variant={card.restrictions.allowOnlineTransactions ? 'success' : 'error'}>
                        {card.restrictions.allowOnlineTransactions ? 'Allowed' : 'Blocked'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-surface rounded-lg">
                      <span className="text-gray-900 dark:text-white">International Transactions</span>
                      <Badge variant={card.restrictions.allowInternational ? 'success' : 'error'}>
                        {card.restrictions.allowInternational ? 'Allowed' : 'Blocked'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-surface rounded-lg">
                      <span className="text-gray-900 dark:text-white">ATM Withdrawals</span>
                      <Badge variant={card.restrictions.allowATMWithdrawal ? 'success' : 'error'}>
                        {card.restrictions.allowATMWithdrawal ? 'Allowed' : 'Blocked'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-surface rounded-lg">
                      <span className="text-gray-900 dark:text-white">Receipt Required</span>
                      <Badge variant={card.restrictions.requireReceipt ? 'warning' : 'default'}>
                        {card.restrictions.requireReceipt ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-surface rounded-lg">
                      <span className="text-gray-900 dark:text-white">Approval Required</span>
                      <Badge variant={card.restrictions.requireApproval ? 'warning' : 'default'}>
                        {card.restrictions.requireApproval ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    {card.restrictions.approvalThreshold && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-surface rounded-lg">
                        <span className="text-gray-900 dark:text-white">Approval Threshold</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(card.restrictions.approvalThreshold)}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>

                {card.restrictions.allowedCategories && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Allowed Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {card.restrictions.allowedCategories.map((cat) => (
                        <Badge key={cat} variant="success">
                          {cat.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}

                {card.restrictions.blockedCategories && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Blocked Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {card.restrictions.blockedCategories.map((cat) => (
                        <Badge key={cat} variant="error">
                          {cat.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
