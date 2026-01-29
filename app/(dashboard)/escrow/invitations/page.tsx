'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import EmptyState from '@/components/ui/empty-state'
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Shield,
  DollarSign,
  Building,
  Calendar,
  Users
} from 'lucide-react'
import { getPendingInvitations } from '@/lib/mock-data/escrow'
import type { Escrow } from '@/types/escrow'
import { STATE_LABELS } from '@/types/escrow'

export default function InvitationsPage() {
  const router = useRouter()
  const currentUserEmail = 'partners@buildright.com' // Mock
  const [processingId, setProcessingId] = useState<string | null>(null)

  const invitations = getPendingInvitations(currentUserEmail)

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleAccept = async (escrowId: string) => {
    setProcessingId(escrowId)
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push(`/escrow/${escrowId}`)
  }

  const handleDecline = async (escrowId: string) => {
    setProcessingId(escrowId)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setProcessingId(null)
    // In real app, would remove from invitations list
  }

  const getUserRole = (escrow: Escrow): 'Beneficiary' | 'Stakeholder' | null => {
    if (escrow.beneficiary.email === currentUserEmail && escrow.beneficiary.status === 'INVITED') {
      return 'Beneficiary'
    }
    const stakeholder = escrow.stakeholders.find(
      s => s.email === currentUserEmail && s.status === 'INVITED'
    )
    return stakeholder ? 'Stakeholder' : null
  }

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Escrow Invitations
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review and respond to escrow invitations
        </p>
      </div>

      <Button
        variant="outline"
        onClick={() => router.push('/escrow')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Escrows
      </Button>

      {invitations.length === 0 ? (
        <EmptyState
          icon={<Mail className="w-12 h-12" />}
          title="No pending invitations"
          description="You don't have any escrow invitations at the moment"
          action={{
            label: 'View All Escrows',
            onClick: () => router.push('/escrow')
          }}
        />
      ) : (
        <div className="space-y-6">
          {/* Summary Card */}
          <Card variant="stat">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Invitations</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {invitations.length}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                  Require your response
                </p>
              </div>
              <Mail className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </Card>

          {/* Invitations List */}
          <div className="grid grid-cols-1 gap-4">
            {invitations.map((escrow) => {
              const role = getUserRole(escrow)
              const isProcessing = processingId === escrow.id

              return (
                <Card key={escrow.id} variant="interactive">
                  <div className="flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {escrow.name}
                            </h3>
                            <Badge variant="info">
                              {STATE_LABELS[escrow.state]}
                            </Badge>
                            {role && (
                              <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                                Invited as {role}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {escrow.escrowId} • {escrow.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">Total Amount</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {formatCurrency(escrow.totalAmount, escrow.currency)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">Custodian</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {escrow.custodian.businessName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">Invited</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {formatDate(role === 'Beneficiary' ? escrow.beneficiary.invitedAt : escrow.stakeholders.find(s => s.email === currentUserEmail)?.invitedAt || escrow.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Purpose */}
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mb-1">Purpose</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {escrow.purpose}
                      </p>
                    </div>

                    {/* Participants */}
                    {escrow.stakeholders.length > 0 && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>
                          {escrow.stakeholders.length} stakeholder{escrow.stakeholders.length !== 1 ? 's' : ''} •
                          {role === 'Beneficiary' ? ` You'll receive funds` : ` You'll help approve releases`}
                        </span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        variant="primary"
                        onClick={() => handleAccept(escrow.id)}
                        disabled={isProcessing}
                        className="flex-1"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept Invitation
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleDecline(escrow.id)}
                        disabled={isProcessing}
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </PageLayout>
  )
}
