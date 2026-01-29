'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  AlertCircle,
  DollarSign,
  MessageSquare,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate, formatNumber, formatRelativeTime } from '@/lib/utils'
import { getPendingApprovalPayouts, getVendorById } from '@/lib/mock-data/payouts'

export default function PendingApprovalsPage() {
  const router = useRouter()
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([])
  const pendingPayouts = getPendingApprovalPayouts()

  const totalPending = pendingPayouts.length
  const totalAmount = pendingPayouts.reduce((sum, p) => sum + p.amount, 0)
  const avgWaitTime = '2.5 days' // Mock calculation

  const handleSelectPayout = (payoutId: string) => {
    setSelectedPayouts((prev) =>
      prev.includes(payoutId)
        ? prev.filter((id) => id !== payoutId)
        : [...prev, payoutId]
    )
  }

  const handleSelectAll = () => {
    if (selectedPayouts.length === pendingPayouts.length) {
      setSelectedPayouts([])
    } else {
      setSelectedPayouts(pendingPayouts.map((p) => p.id))
    }
  }

  const handleBulkApprove = () => {
    console.log('Bulk approving:', selectedPayouts)
    // In real app, show confirmation dialog and submit
  }

  const handleBulkReject = () => {
    console.log('Bulk rejecting:', selectedPayouts)
    // In real app, show confirmation dialog and submit
  }

  const handleApprove = (payoutId: string) => {
    console.log('Approving:', payoutId)
  }

  const handleReject = (payoutId: string) => {
    console.log('Rejecting:', payoutId)
  }

  const getPriorityColor = (amount: number) => {
    if (amount >= 20000) return 'text-red-600 dark:text-red-400'
    if (amount >= 10000) return 'text-orange-600 dark:text-orange-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pending Approvals</h1>
            <p className="text-gray-600 dark:text-gray-400">Review and approve pending payouts</p>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(totalPending)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending Count</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalAmount, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {avgWaitTime}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Wait Time</p>
          </div>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedPayouts.length > 0 && (
        <Card className="p-4 mb-6 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-sm font-medium text-blue-900 dark:text-blue-200">
                {selectedPayouts.length} payout{selectedPayouts.length !== 1 ? 's' : ''} selected
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Total: {formatCurrency(
                  pendingPayouts
                    .filter((p) => selectedPayouts.includes(p.id))
                    .reduce((sum, p) => sum + p.amount, 0),
                  'USD'
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={<XCircle className="w-4 h-4" />}
                iconPosition="left"
                onClick={handleBulkReject}
              >
                Reject Selected
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<CheckCircle className="w-4 h-4" />}
                iconPosition="left"
                onClick={handleBulkApprove}
              >
                Approve Selected
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Approval Queue */}
      <div className="space-y-4">
        {pendingPayouts.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Approval Queue
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedPayouts.length === pendingPayouts.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            {pendingPayouts.map((payout) => {
              const vendor = getVendorById(payout.vendorId)
              const isSelected = selectedPayouts.includes(payout.id)
              const isPriority = payout.amount >= 10000

              return (
                <Card
                  key={payout.id}
                  className={`p-6 transition-all ${
                    isSelected
                      ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-500/10'
                      : ''
                  } ${isPriority ? 'border-orange-300 dark:border-orange-500/30' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectPayout(payout.id)}
                      className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-dark-border text-primary-500 focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {payout.vendorName}
                            </h4>
                            {isPriority && (
                              <Badge variant="warning" size="sm">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                High Priority
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {payout.referenceNumber} • {vendor?.vendorId}
                          </div>
                          <div className="text-sm text-gray-900 dark:text-white">
                            {payout.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getPriorityColor(payout.amount)}`}>
                            {formatCurrency(payout.amount, payout.currency)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                            {payout.category.replace('-', ' ')}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <div className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Payment Method</div>
                          <div className="text-gray-900 dark:text-white capitalize">
                            {payout.paymentMethod.replace('-', ' ')}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Scheduled Date</div>
                          <div className="text-gray-900 dark:text-white">
                            {formatDate(payout.scheduledDate)}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 dark:text-gray-400 dark:text-gray-400">Submitted</div>
                          <div className="text-gray-900 dark:text-white">
                            {formatRelativeTime(payout.createdAt)}
                          </div>
                        </div>
                      </div>

                      {payout.notes && (
                        <div className="mb-4 p-3 bg-gray-50 dark:bg-dark-card rounded-lg">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {payout.notes}
                            </div>
                          </div>
                        </div>
                      )}

                      {payout.approvalWorkflow.length > 0 && (
                        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                          Submitted by {payout.approvalWorkflow[0].approverName} •{' '}
                          {payout.approvalWorkflow[0].approverRole}
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Eye className="w-4 h-4" />}
                          iconPosition="left"
                          onClick={() => router.push(`/payouts/${payout.id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<XCircle className="w-4 h-4" />}
                          iconPosition="left"
                          onClick={() => handleReject(payout.id)}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<CheckCircle className="w-4 h-4" />}
                          iconPosition="left"
                          onClick={() => handleApprove(payout.id)}
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </>
        ) : (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              All Caught Up!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              There are no pending approvals at the moment.
            </p>
            <Button
              variant="primary"
              onClick={() => router.push('/payouts')}
            >
              Back to Dashboard
            </Button>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
