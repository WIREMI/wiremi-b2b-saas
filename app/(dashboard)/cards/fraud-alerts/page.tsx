'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  CreditCard,
  DollarSign,
  Eye,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { mockFraudAlerts, mockCorporateCards } from '@/lib/mock-data/corporate-cards'
import { formatCurrency } from '@/types/corporate-cards'

export default function FraudAlertsPage() {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'CONFIRMED_FRAUD' | 'FALSE_POSITIVE' | 'PENDING_INVESTIGATION'>('ALL')

  // Helper function to get alert status
  const getAlertStatus = (alert: typeof mockFraudAlerts[0]) => {
    if (!alert.reviewed) return 'PENDING'
    return alert.resolution || 'PENDING_INVESTIGATION'
  }

  // Filter alerts
  const filteredAlerts = mockFraudAlerts.filter((alert) => {
    return statusFilter === 'ALL' || getAlertStatus(alert) === statusFilter
  })

  // Calculate stats
  const pendingAlerts = mockFraudAlerts.filter((a) => !a.reviewed).length
  const confirmedAlerts = mockFraudAlerts.filter((a) => a.resolution === 'CONFIRMED_FRAUD').length
  const falsePositives = mockFraudAlerts.filter((a) => a.resolution === 'FALSE_POSITIVE').length
  // Note: FraudAlert doesn't have amount property - would need to join with transactions
  const totalAmount = 0

  const getSeverityColor = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'error'
      case 'HIGH':
        return 'warning'
      case 'MEDIUM':
        return 'info'
      case 'LOW':
        return 'default'
      default:
        return 'default'
    }
  }

  const getSeverityBgClass = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-error/10 dark:bg-error/20'
      case 'HIGH':
        return 'bg-warning/10 dark:bg-warning/20'
      case 'MEDIUM':
        return 'bg-info/10 dark:bg-info/20'
      case 'LOW':
        return 'bg-gray-100 dark:bg-gray-800'
      default:
        return 'bg-gray-100 dark:bg-gray-800'
    }
  }

  const getSeverityTextClass = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-error'
      case 'HIGH':
        return 'text-warning'
      case 'MEDIUM':
        return 'text-info'
      case 'LOW':
        return 'text-gray-600 dark:text-gray-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'warning'
      case 'CONFIRMED':
        return 'error'
      case 'FALSE_POSITIVE':
        return 'success'
      case 'RESOLVED':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                icon={<ArrowLeft className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => router.push('/cards')}
              >
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Fraud Alerts
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Monitor and manage suspicious card activity
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
              >
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pendingAlerts}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-error" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Confirmed Fraud</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {confirmedAlerts}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">False Positives</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {falsePositives}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fraud Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalAmount)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filter */}
        <Card className="p-6 mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending Review</option>
            <option value="CONFIRMED">Confirmed Fraud</option>
            <option value="FALSE_POSITIVE">False Positive</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <Card className="p-12 text-center">
              <Shield className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No fraud alerts
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {statusFilter === 'ALL'
                  ? 'All clear! No suspicious activity detected.'
                  : `No alerts with status: ${statusFilter}`}
              </p>
            </Card>
          ) : (
            filteredAlerts.map((alert) => {
              const card = mockCorporateCards.find((c) => c.id === alert.cardId)

              return (
                <Card
                  key={alert.id}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    if (card) {
                      router.push(`/cards/${card.id}`)
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`w-12 h-12 ${getSeverityBgClass(alert.level)} rounded-xl flex items-center justify-center`}
                      >
                        <AlertTriangle className={`w-6 h-6 ${getSeverityTextClass(alert.level)}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {alert.reason}
                          </h3>
                          <Badge
                            variant={getSeverityColor(alert.level) as 'success' | 'warning' | 'error' | 'info' | 'default'}
                            size="sm"
                          >
                            {alert.level}
                          </Badge>
                          <Badge
                            variant={getStatusColor(getAlertStatus(alert)) as 'success' | 'warning' | 'error' | 'info' | 'default'}
                            size="sm"
                          >
                            {getAlertStatus(alert).replace('_', ' ')}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {alert.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              Transaction ID
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white text-xs">
                              {alert.transactionId}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              Risk Score
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {alert.riskScore}/100
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              Confidence
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {alert.confidence}%
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                              Card ID
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white text-xs">
                              {alert.cardId}
                            </p>
                          </div>
                        </div>

                        {card && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CreditCard className="w-4 h-4" />
                            <span>
                              {card.cardholderName} •••• {card.lastFourDigits}
                            </span>
                          </div>
                        )}

                        {alert.reviewed && alert.reviewedAt && (
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <CheckCircle className="w-4 h-4 text-success" />
                                <span>
                                  Reviewed on{' '}
                                  {new Date(alert.reviewedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                              {alert.reviewedBy && (
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  by {alert.reviewedBy}
                                </span>
                              )}
                            </div>
                            {alert.resolution && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                Resolution: {alert.resolution.replace('_', ' ')}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {getAlertStatus(alert) === 'PENDING' && (
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          icon={<CheckCircle className="w-3 h-3" />}
                          iconPosition="left"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          icon={<XCircle className="w-3 h-3" />}
                          iconPosition="left"
                        >
                          Block
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
