'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import EmptyState from '@/components/ui/empty-state'
import {
  Shield,
  ArrowLeft,
  Clock,
  FileText,
  DollarSign,
  CheckCircle,
  XCircle,
  UserPlus,
  Send,
  AlertCircle
} from 'lucide-react'
import { getEscrowById } from '@/lib/mock-data/escrow'
import { STATE_LABELS, ROLE_LABELS } from '@/types/escrow'
import type { EscrowActionType } from '@/types/escrow'

interface Props {
  params: Promise<{ id: string }>
}

export default function ActivityLogPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
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
            onClick: () => router.push('/escrow')
          }}
        />
      </PageLayout>
    )
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

  const getActivityIcon = (action: EscrowActionType) => {
    const iconMap: Record<string, React.ReactNode> = {
      CREATED: <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      INVITED_PARTICIPANT: <UserPlus className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      ACCEPTED_INVITATION: <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />,
      FUNDED: <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />,
      REQUESTED_FUNDS: <DollarSign className="w-4 h-4 text-orange-600 dark:text-orange-400" />,
      APPROVED_REQUEST: <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />,
      REJECTED_REQUEST: <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />,
      RELEASED_FUNDS: <Send className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
      UPLOADED_DOCUMENT: <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />,
      SIGNED_DOCUMENT: <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />,
      STATE_CHANGED: <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      DISPUTED: <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />,
      CANCELLED: <XCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />,
      CLOSED: <CheckCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
    }
    return iconMap[action] || <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Activity Log
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete activity history for {escrow.name}
        </p>
      </div>

      <Button variant="outline" onClick={() => router.push(`/escrow/${id}`)} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Escrow
      </Button>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Activity Timeline
          </h3>
          <Badge variant="info">{escrow.activities.length} events</Badge>
        </div>

        <div className="space-y-4">
          {escrow.activities.map((activity, index) => (
            <div key={activity.id} className="flex gap-4">
              {/* Icon Column */}
              <div className="flex flex-col items-center">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  {getActivityIcon(activity.action)}
                </div>
                {index < escrow.activities.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 my-2" />
                )}
              </div>

              {/* Content Column */}
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-600 dark:text-gray-400">
                      <span>{activity.actorName}</span>
                      <span>•</span>
                      <span>{ROLE_LABELS[activity.actorRole]}</span>
                      <span>•</span>
                      <span>{formatDate(activity.timestamp)}</span>
                    </div>
                  </div>
                  {activity.newState && (
                    <Badge variant="info">{STATE_LABELS[activity.newState]}</Badge>
                  )}
                </div>

                {/* Metadata */}
                {activity.metadata && (
                  <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Additional Details
                    </p>
                    <div className="space-y-1">
                      {Object.entries(activity.metadata).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-gray-900 dark:text-gray-100 font-medium">
                            {typeof value === 'number' && key.toLowerCase().includes('amount')
                              ? new Intl.NumberFormat('en-US', {
                                  style: 'currency',
                                  currency: escrow.currency
                                }).format(value)
                              : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* State Transition */}
                {activity.previousState && activity.newState && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <Badge variant="info">{STATE_LABELS[activity.previousState]}</Badge>
                    <span className="text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">→</span>
                    <Badge variant="info">{STATE_LABELS[activity.newState]}</Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {escrow.activities.length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Events</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {new Set(escrow.activities.map(a => a.actorId)).size}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Participants</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {Math.ceil(
                  (new Date().getTime() - new Date(escrow.createdAt).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Days Active</p>
            </div>
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
