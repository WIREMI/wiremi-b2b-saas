'use client'

import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft,
  Download,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
  DollarSign,
  Calendar,
  CreditCard,
  MessageSquare,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getPayoutById, getVendorById } from '@/lib/mock-data/payouts'

export default function PayoutDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const payout = getPayoutById(params.id as string)
  const vendor = payout ? getVendorById(payout.vendorId) : null

  if (!payout) {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payout Not Found</h1>
            </div>
          </div>
        </div>
        <Card className="p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">Payout not found</p>
          <Button variant="primary" onClick={() => router.push('/payouts/list')} className="mt-4">
            Back to Payouts
          </Button>
        </Card>
      </PageLayout>
    )
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'approved':
      case 'processing':
        return 'info'
      case 'pending-approval':
        return 'warning'
      case 'failed':
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6" />
      case 'pending-approval':
        return <Clock className="w-6 h-6" />
      case 'failed':
        return <XCircle className="w-6 h-6" />
      default:
        return <Clock className="w-6 h-6" />
    }
  }

  const handleApprove = () => {
    console.log('Approving payout:', payout.id)
  }

  const handleReject = () => {
    console.log('Rejecting payout:', payout.id)
  }

  return (
    <PageLayout maxWidth="normal">
      <Button
        variant="ghost"
        size="sm"
        icon={<ArrowLeft className="w-4 h-4" />}
        iconPosition="left"
        onClick={() => router.push('/payouts/list')}
        className="mb-6"
      >
        Back to Payouts
      </Button>

      {/* Payout Header */}
      <Card className="p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              payout.status === 'completed' ? 'bg-green-100 dark:bg-green-500/20' :
              payout.status === 'pending-approval' ? 'bg-orange-100 dark:bg-orange-500/20' :
              'bg-blue-100 dark:bg-blue-500/20'
            }`}>
              {getStatusIcon(payout.status)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {payout.referenceNumber}
                </h1>
                <Badge variant={getStatusVariant(payout.status)}>
                  {payout.status}
                </Badge>
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {payout.description}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {payout.status === 'pending-approval' && (
              <>
                <Button
                  variant="outline"
                  icon={<XCircle className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={handleReject}
                >
                  Reject
                </Button>
                <Button
                  variant="primary"
                  icon={<CheckCircle className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={handleApprove}
                >
                  Approve
                </Button>
              </>
            )}
            {payout.status === 'draft' && (
              <Button
                variant="outline"
                icon={<Edit className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => router.push(`/payouts/${payout.id}/edit`)}
              >
                Edit
              </Button>
            )}
            <Button variant="outline" icon={<Download className="w-4 h-4" />} iconPosition="left">
              Download
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Payment Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Payment Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
                <DollarSign className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Amount</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(payout.amount, payout.currency)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Category</div>
                    <div className="text-gray-900 dark:text-white capitalize">
                      {payout.category.replace('-', ' ')}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Payment Method</div>
                    <div className="text-gray-900 dark:text-white capitalize">
                      {payout.paymentMethod.replace('-', ' ')}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Scheduled Date</div>
                    <div className="text-gray-900 dark:text-white">
                      {formatDate(payout.scheduledDate)}
                    </div>
                  </div>
                </div>
                {payout.completedDate && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Completed Date</div>
                      <div className="text-gray-900 dark:text-white">
                        {formatDate(payout.completedDate)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Approval Workflow */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Approval Workflow
            </h3>
            <div className="space-y-4">
              {payout.approvalWorkflow.map((step, index) => (
                <div key={step.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.action === 'approved' ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' :
                      step.action === 'rejected' ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' :
                      'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                    }`}>
                      {step.action === 'approved' ? <CheckCircle className="w-5 h-5" /> :
                       step.action === 'rejected' ? <XCircle className="w-5 h-5" /> :
                       <Clock className="w-5 h-5" />}
                    </div>
                    {index < payout.approvalWorkflow.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 dark:bg-dark-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {step.approverName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {step.approverRole} • {step.action}
                    </div>
                    {step.comments && (
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                        "{step.comments}"
                      </div>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                      {formatDate(step.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Vendor Info */}
          {vendor && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Vendor Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Name</div>
                    <div className="text-gray-900 dark:text-white">{vendor.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Vendor ID</div>
                    <div className="text-gray-900 dark:text-white">{vendor.vendorId}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push(`/payouts/vendors/${vendor.id}`)}
                >
                  View Vendor Profile
                </Button>
              </div>
            </Card>
          )}

          {/* Transaction Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Transaction Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Created By:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {payout.createdBy}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Created:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatDate(payout.createdAt)}
                </span>
              </div>
              {payout.transactionId && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Transaction ID:</span>
                  <span className="font-medium text-gray-900 dark:text-white font-mono text-xs">
                    {payout.transactionId}
                  </span>
                </div>
              )}
              {payout.failureReason && (
                <div className="pt-3 border-t border-gray-200 dark:border-dark-border">
                  <div className="text-red-600 dark:text-red-400 font-medium mb-1">
                    Failure Reason:
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    {payout.failureReason}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
