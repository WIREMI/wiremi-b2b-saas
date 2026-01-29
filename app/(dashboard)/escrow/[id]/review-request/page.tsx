'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import EmptyState from '@/components/ui/empty-state'
import {
  Shield,
  ArrowLeft,
  CheckCircle,
  XCircle,
  FileText,
  Download,
  AlertCircle,
  DollarSign,
  User,
  Calendar,
  MessageSquare
} from 'lucide-react'
import { getEscrowById } from '@/lib/mock-data/escrow'

interface Props {
  params: Promise<{ id: string }>
}

export default function ReviewRequestPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const [decision, setDecision] = useState<'APPROVED' | 'REJECTED' | null>(null)
  const [comments, setComments] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const escrow = getEscrowById(id)

  if (!escrow) {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Escrow Not Found
          </h1>
        </div>
        <EmptyState
          icon={<Shield className="w-12 h-12" />}
          title="Escrow not found"
          description="The escrow you're looking for doesn't exist or you don't have access to it."
          action={{
            label: 'Back to Escrows',
            onClick: () => router.push('/escrow'),
            icon: <ArrowLeft className="w-4 h-4" />
          }}
        />
      </PageLayout>
    )
  }

  // Check if user can review
  const currentUserId = 'user-stakeholder-cto' // Mock - in real app from auth
  const isCustodian = escrow.custodian.userId === currentUserId
  const isStakeholder = escrow.stakeholders.some(s => s.userId === currentUserId)
  const canReview = isCustodian || isStakeholder

  if (!canReview) {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
        </div>
        <EmptyState
          icon={<AlertCircle className="w-12 h-12" />}
          title="Access denied"
          description="Only custodians and stakeholders can review fund requests."
          action={{
            label: 'Back to Escrow',
            onClick: () => router.push(`/escrow/${id}`),
            icon: <ArrowLeft className="w-4 h-4" />
          }}
        />
      </PageLayout>
    )
  }

  if (!['REQUESTED', 'UNDER_REVIEW'].includes(escrow.state)) {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            No Request to Review
          </h1>
        </div>
        <EmptyState
          icon={<AlertCircle className="w-12 h-12" />}
          title="No active request"
          description={`This escrow must have a pending fund request. Current state: ${escrow.state}`}
          action={{
            label: 'Back to Escrow',
            onClick: () => router.push(`/escrow/${id}`),
            icon: <ArrowLeft className="w-4 h-4" />
          }}
        />
      </PageLayout>
    )
  }

  const currentRequest = escrow.fundRequests[escrow.fundRequests.length - 1]

  if (!currentRequest) {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            No Request Found
          </h1>
        </div>
        <EmptyState
          icon={<AlertCircle className="w-12 h-12" />}
          title="No fund request found"
          description="There are no fund requests to review for this escrow."
          action={{
            label: 'Back to Escrow',
            onClick: () => router.push(`/escrow/${id}`),
            icon: <ArrowLeft className="w-4 h-4" />
          }}
        />
      </PageLayout>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: escrow.currency
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleSubmitReview = async () => {
    if (!decision) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Submitting review:', { decision, comments })

    // In real app, this would submit the review via API
    router.push(`/escrow/${id}`)
  }

  const userReview = currentRequest.reviewers.find(r => r.userId === currentUserId)
  const hasReviewed = userReview?.decision !== undefined

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Review Fund Request
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and approve or reject the fund request for {escrow.name}
        </p>
      </div>

      {/* Header */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.push(`/escrow/${id}`)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Escrow
        </Button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Review Fund Request
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {escrow.name} • {escrow.escrowId}
            </p>
          </div>
        </div>
      </div>

      {/* Already Reviewed Notice */}
      {hasReviewed && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                You've already reviewed this request
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Decision: {userReview.decision} • {formatDate(userReview.reviewedAt!)}
              </p>
              {userReview.comments && (
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Comments: {userReview.comments}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Request Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Summary */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Request Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Requested Amount</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                    {formatCurrency(currentRequest.amount)}
                  </p>
                </div>
                <DollarSign className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reason</p>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {currentRequest.reason}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Description</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {currentRequest.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Requested By</p>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {currentRequest.requestedByName}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Requested On</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {formatDate(currentRequest.requestedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Supporting Documents */}
          {currentRequest.documents.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Supporting Documents
              </h3>
              <div className="space-y-3">
                {currentRequest.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          Uploaded by {doc.uploadedByName} • {formatDate(doc.uploadedAt)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Conditions Status */}
          {escrow.conditions.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Release Conditions
              </h3>
              <div className="space-y-3">
                {escrow.conditions.map((condition) => (
                  <div
                    key={condition.id}
                    className={`p-3 rounded-lg border ${
                      condition.status === 'MET'
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {condition.status === 'MET' ? (
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {condition.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={condition.status === 'MET' ? 'success' : 'warning'}>
                            {condition.status}
                          </Badge>
                          {condition.required && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                              Required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Review Form */}
        <div className="space-y-6">
          {/* Review Status */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Review Status
            </h3>
            <div className="space-y-3">
              {currentRequest.reviewers.map((reviewer) => (
                <div
                  key={reviewer.userId}
                  className={`p-3 rounded-lg ${
                    reviewer.decision === 'APPROVED'
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : reviewer.decision === 'REJECTED'
                      ? 'bg-red-50 dark:bg-red-900/20'
                      : 'bg-gray-50 dark:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {reviewer.name}
                    </p>
                    {reviewer.decision ? (
                      <Badge
                        variant={reviewer.decision === 'APPROVED' ? 'success' : 'error'}
                      >
                        {reviewer.decision}
                      </Badge>
                    ) : (
                      <Badge variant="warning">Pending</Badge>
                    )}
                  </div>
                  {reviewer.comments && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {reviewer.comments}
                    </p>
                  )}
                  {reviewer.reviewedAt && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(reviewer.reviewedAt)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Review Decision Form */}
          {!hasReviewed && (
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Your Review
              </h3>
              <div className="space-y-4">
                {/* Decision Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDecision('APPROVED')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      decision === 'APPROVED'
                        ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-600'
                    }`}
                  >
                    <CheckCircle
                      className={`w-8 h-8 mx-auto mb-2 ${
                        decision === 'APPROVED'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-400'
                      }`}
                    />
                    <p
                      className={`text-sm font-medium ${
                        decision === 'APPROVED'
                          ? 'text-green-900 dark:text-green-200'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Approve
                    </p>
                  </button>

                  <button
                    onClick={() => setDecision('REJECTED')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      decision === 'REJECTED'
                        ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-red-600'
                    }`}
                  >
                    <XCircle
                      className={`w-8 h-8 mx-auto mb-2 ${
                        decision === 'REJECTED'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-400'
                      }`}
                    />
                    <p
                      className={`text-sm font-medium ${
                        decision === 'REJECTED'
                          ? 'text-red-900 dark:text-red-200'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Reject
                    </p>
                  </button>
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Comments (Optional)
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add any comments or feedback about this request..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  variant={decision === 'APPROVED' ? 'primary' : decision === 'REJECTED' ? 'danger' : 'primary'}
                  onClick={handleSubmitReview}
                  disabled={!decision || isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      {decision === 'APPROVED' && <CheckCircle className="w-4 h-4 mr-2" />}
                      {decision === 'REJECTED' && <XCircle className="w-4 h-4 mr-2" />}
                      Submit Review
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}

          {/* Financial Context */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Financial Context
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Escrow</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(escrow.totalAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Already Released</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatCurrency(escrow.releasedAmount)}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">After This Request</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(escrow.remainingAmount - currentRequest.amount)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
