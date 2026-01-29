'use client'

import { Building2, MapPin, Users, DollarSign, CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Institution } from '@/types/education'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface InstitutionCardProps {
  institution: Institution
  onClick?: () => void
  showStats?: boolean
}

const statusConfig = {
  verified: {
    icon: CheckCircle,
    variant: 'success' as const,
    label: 'Verified',
  },
  submitted: {
    icon: Clock,
    variant: 'warning' as const,
    label: 'Pending Verification',
  },
  draft: {
    icon: AlertTriangle,
    variant: 'info' as const,
    label: 'Draft',
  },
  suspended: {
    icon: XCircle,
    variant: 'error' as const,
    label: 'Suspended',
  },
}

export default function InstitutionCard({ institution, onClick, showStats = true }: InstitutionCardProps) {
  const StatusIcon = statusConfig[institution.status].icon

  return (
    <Card
      variant="interactive"
      onClick={onClick}
      className="h-full transition-all duration-200 hover:shadow-lg dark:hover:shadow-primary/10"
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {institution.logo ? (
              <div
                className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: institution.brandColor || '#1E40AF' }}
              >
                {institution.displayName.substring(0, 2).toUpperCase()}
              </div>
            ) : (
              <div
                className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: institution.brandColor || '#1E40AF' }}
              >
                <Building2 className="w-6 h-6 text-white" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                {institution.displayName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {institution.legalName}
              </p>
            </div>
          </div>

          <Badge
            variant={statusConfig[institution.status].variant}
            size="sm"
            className="flex-shrink-0"
          >
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusConfig[institution.status].label}
          </Badge>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">
            {institution.address.city}, {institution.address.country}
          </span>
        </div>

        {/* Stats */}
        {showStats && (
          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* Top row - Students and Faculties */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-medium">Students</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatNumber(institution.totalStudents)}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 mb-1">
                  <Building2 className="w-4 h-4" />
                  <span className="text-xs font-medium">Faculties</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {institution.totalFaculties}
                </p>
              </div>
            </div>

            {/* Financial Stats - Full width for clarity */}
            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-xs font-medium">Total Revenue</span>
                </div>
                <p className="text-sm font-semibold text-success">
                  {formatCurrency(institution.totalRevenue, institution.defaultCurrency)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-xs font-medium">Outstanding</span>
                </div>
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {formatCurrency(institution.outstandingBalance, institution.defaultCurrency)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
