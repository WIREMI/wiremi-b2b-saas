'use client'

import { GraduationCap, Users, DollarSign, Layers } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Faculty } from '@/types/education'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface FacultyCardProps {
  faculty: Faculty
  onClick?: () => void
  institutionName?: string
}

export default function FacultyCard({ faculty, onClick, institutionName }: FacultyCardProps) {
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
            <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex-shrink-0 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                {faculty.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Code: {faculty.code}
              </p>
              {institutionName && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                  {institutionName}
                </p>
              )}
            </div>
          </div>

          <Badge
            variant={faculty.isActive ? 'success' : 'default'}
            size="sm"
            className="flex-shrink-0"
          >
            {faculty.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        {/* Description */}
        {faculty.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {faculty.description}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Depts</span>
            </div>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {faculty.totalDepartments}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
              <Users className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Students</span>
            </div>
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              {formatNumber(faculty.totalStudents)}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
              <DollarSign className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Revenue</span>
            </div>
            <p className="text-xs font-semibold text-gray-900 dark:text-white">
              {formatCurrency(faculty.totalRevenue, faculty.defaultCurrency)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
