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
  DollarSign,
  Users,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Upload,
  Send,
  Settings,
  MoreHorizontal,
  TrendingUp,
  Calendar,
  Building,
  Mail,
  Phone,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import { getEscrowById } from '@/lib/mock-data/escrow'
import type { Escrow, EscrowRole } from '@/types/escrow'
import { STATE_LABELS, STATE_COLORS, ROLE_LABELS } from '@/types/escrow'

interface Props {
  params: Promise<{ id: string }>
}

export default function EscrowDetailsPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()

  // Mock user - in real app, this would come from auth context
  const currentUserId = 'user-custodian-acme'

  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'activity' | 'participants'>('overview')

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

  // Determine user's role in this escrow
  const userRole: EscrowRole | null =
    escrow.custodian.userId === currentUserId
      ? 'CUSTODIAN'
      : escrow.beneficiary.userId === currentUserId
      ? 'BENEFICIARY'
      : escrow.stakeholders.some(s => s.userId === currentUserId)
      ? 'STAKEHOLDER'
      : null

  // Calculate progress
  const fundingProgress = escrow.totalAmount > 0
    ? (escrow.fundedAmount / escrow.totalAmount) * 100
    : 0

  const releaseProgress = escrow.totalAmount > 0
    ? (escrow.releasedAmount / escrow.totalAmount) * 100
    : 0

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: escrow.currency
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Not yet'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get state badge color
  const getStateBadgeColor = (): 'success' | 'warning' | 'error' | 'info' => {
    const colorMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
      green: 'success',
      emerald: 'success',
      teal: 'success',
      yellow: 'warning',
      orange: 'warning',
      red: 'error',
      blue: 'info',
      cyan: 'info',
      indigo: 'info',
      purple: 'info',
      gray: 'info',
      slate: 'info'
    }
    return colorMap[STATE_COLORS[escrow.state]] || 'info'
  }

  // Get state-specific actions
  const getStateActions = () => {
    const actions: React.ReactNode[] = []

    if (!userRole) return actions

    // Custodian actions
    if (userRole === 'CUSTODIAN') {
      if (escrow.state === 'ACCEPTED') {
        actions.push(
          <Button key="fund" variant="primary" onClick={() => {/* Navigate to fund page */}}>
            <DollarSign className="w-4 h-4 mr-2" />
            Fund Escrow
          </Button>
        )
      }
      if (escrow.state === 'REQUESTED') {
        actions.push(
          <Button key="review" variant="primary" onClick={() => router.push(`/escrow/${escrow.id}/review-request`)}>
            <Eye className="w-4 h-4 mr-2" />
            Review Request
          </Button>
        )
      }
      if (escrow.state === 'AUTHORIZED') {
        actions.push(
          <Button key="release" variant="primary" onClick={() => router.push(`/escrow/${escrow.id}/release`)}>
            <Send className="w-4 h-4 mr-2" />
            Release Funds
          </Button>
        )
      }
    }

    // Beneficiary actions
    if (userRole === 'BENEFICIARY') {
      if (escrow.state === 'INVITED' && escrow.beneficiary.status === 'INVITED') {
        actions.push(
          <Button key="accept" variant="primary" onClick={() => {/* Handle accept invitation */}}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Accept Invitation
          </Button>
        )
      }
      if (escrow.state === 'FUNDED') {
        actions.push(
          <Button key="request" variant="primary" onClick={() => router.push(`/escrow/${escrow.id}/fund-request`)}>
            <DollarSign className="w-4 h-4 mr-2" />
            Request Funds
          </Button>
        )
      }
      if (escrow.state === 'AWAITING_SIGNATURES') {
        actions.push(
          <Button key="sign" variant="primary" onClick={() => router.push(`/escrow/${escrow.id}/sign-documents`)}>
            <FileText className="w-4 h-4 mr-2" />
            Sign Documents
          </Button>
        )
      }
    }

    // Stakeholder actions
    if (userRole === 'STAKEHOLDER') {
      if (escrow.state === 'UNDER_REVIEW') {
        actions.push(
          <Button key="review" variant="primary" onClick={() => router.push(`/escrow/${escrow.id}/review-request`)}>
            <Eye className="w-4 h-4 mr-2" />
            Review Request
          </Button>
        )
      }
      if (escrow.state === 'AWAITING_SIGNATURES') {
        actions.push(
          <Button key="sign" variant="primary" onClick={() => router.push(`/escrow/${escrow.id}/sign-documents`)}>
            <FileText className="w-4 h-4 mr-2" />
            Sign Documents
          </Button>
        )
      }
    }

    return actions
  }

  const stateActions = getStateActions()

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {escrow.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Escrow ID: {escrow.escrowId}
        </p>
      </div>

      {/* Header */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.push('/escrow')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Escrows
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {escrow.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {escrow.escrowId}
                </span>
                <Badge variant={getStateBadgeColor()}>
                  {STATE_LABELS[escrow.state]}
                </Badge>
                {userRole && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                    Your Role: {ROLE_LABELS[userRole]}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {stateActions}
            <Button
              variant="outline"
              onClick={() => router.push(`/escrow/${escrow.id}/settings`)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card variant="stat">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {formatCurrency(escrow.totalAmount)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </Card>

        <Card variant="stat">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Funded</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-1">
                {formatCurrency(escrow.fundedAmount)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {fundingProgress.toFixed(0)}% of total
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </Card>

        <Card variant="stat">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Released</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                {formatCurrency(escrow.releasedAmount)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {releaseProgress.toFixed(0)}% of total
              </p>
            </div>
            <Send className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </Card>

        <Card variant="stat">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
              <p className="text-xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                {formatCurrency(escrow.remainingAmount)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Available to release
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
        </Card>
      </div>

      {/* Progress Bars */}
      <Card className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Funding Progress
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Funded</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {formatCurrency(escrow.fundedAmount)} / {formatCurrency(escrow.totalAmount)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-green-600 dark:bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${fundingProgress}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Released</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {formatCurrency(escrow.releasedAmount)} / {formatCurrency(escrow.totalAmount)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-purple-600 dark:bg-purple-500 h-3 rounded-full transition-all"
                style={{ width: `${releaseProgress}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
            activeTab === 'documents'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Documents
          <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-xs">
            {escrow.documents.length + escrow.fundRequests.reduce((sum, req) => sum + req.documents.length, 0)}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
            activeTab === 'activity'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Activity
          <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-xs">
            {escrow.activities.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('participants')}
          className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
            activeTab === 'participants'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Participants
          <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-xs">
            {2 + escrow.stakeholders.length}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Details */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Escrow Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
                <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">
                  {escrow.description}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Purpose</p>
                <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">
                  {escrow.purpose}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">
                    {escrow.type.replace(/_/g, ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Currency</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">
                    {escrow.currency}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">
                  {formatDate(escrow.createdAt)}
                </p>
              </div>
              {escrow.fundedAt && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Funded</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">
                    {formatDate(escrow.fundedAt)}
                  </p>
                </div>
              )}
              {escrow.completedAt && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">
                    {formatDate(escrow.completedAt)}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Conditions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Release Conditions
            </h3>
            {escrow.conditions.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                No conditions specified
              </p>
            ) : (
              <div className="space-y-3">
                {escrow.conditions.map((condition) => (
                  <div
                    key={condition.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    {condition.status === 'MET' ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    ) : condition.status === 'FAILED' ? (
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {condition.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={
                            condition.status === 'MET'
                              ? 'success'
                              : condition.status === 'FAILED'
                              ? 'error'
                              : 'warning'
                          }
                        >
                          {condition.status}
                        </Badge>
                        {condition.required && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            Required
                          </span>
                        )}
                      </div>
                      {condition.metAt && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                          Met on {formatDate(condition.metAt)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Fund Requests */}
          {escrow.fundRequests.length > 0 && (
            <Card className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Fund Requests
              </h3>
              <div className="space-y-4">
                {escrow.fundRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {request.reason}
                          </h4>
                          <Badge
                            variant={
                              request.status === 'RELEASED'
                                ? 'success'
                                : request.status === 'APPROVED'
                                ? 'success'
                                : request.status === 'REJECTED'
                                ? 'error'
                                : request.status === 'UNDER_REVIEW'
                                ? 'warning'
                                : 'info'
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {request.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          <span>Requested by {request.requestedByName}</span>
                          <span>•</span>
                          <span>{formatDate(request.requestedAt)}</span>
                          <span>•</span>
                          <span>{request.documents.length} documents</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {formatCurrency(request.amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'documents' && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Documents
          </h3>
          {escrow.documents.length === 0 && escrow.fundRequests.every(r => r.documents.length === 0) ? (
            <EmptyState
              icon={<FileText className="w-12 h-12" />}
              title="No documents yet"
              description="Documents will appear here as they are uploaded"
            />
          ) : (
            <div className="space-y-3">
              {escrow.documents.map((doc) => (
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
                  <div className="flex items-center gap-2">
                    <Badge variant={doc.status === 'SIGNED' ? 'success' : 'warning'}>
                      {doc.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {escrow.fundRequests.map((request) =>
                request.documents.map((doc) => (
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
                    <div className="flex items-center gap-2">
                      <Badge variant={doc.status === 'SIGNED' ? 'success' : 'warning'}>
                        {doc.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </Card>
      )}

      {activeTab === 'activity' && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Activity Timeline
          </h3>
          <div className="space-y-4">
            {escrow.activities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  {index < escrow.activities.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 my-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                    {activity.actorName} ({ROLE_LABELS[activity.actorRole]}) • {formatDate(activity.timestamp)}
                  </p>
                  {activity.newState && (
                    <Badge variant="info" className="mt-2">
                      {STATE_LABELS[activity.newState]}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'participants' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Custodian */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Custodian
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {escrow.custodian.businessName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {escrow.custodian.email}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Beneficiary */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Beneficiary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Building className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {escrow.beneficiary.businessName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {escrow.beneficiary.email}
                  </p>
                  <Badge variant={escrow.beneficiary.status === 'ACCEPTED' ? 'success' : 'warning'} className="mt-1">
                    {escrow.beneficiary.status}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Stakeholders */}
          {escrow.stakeholders.length > 0 && (
            <Card className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Stakeholders
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {escrow.stakeholders.map((stakeholder) => (
                  <div
                    key={stakeholder.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {stakeholder.businessName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stakeholder.email}
                      </p>
                      <Badge variant={stakeholder.status === 'ACCEPTED' ? 'success' : 'warning'} className="mt-1">
                        {stakeholder.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </PageLayout>
  )
}
