'use client'

import { BookOpen, Users, DollarSign, FileText, Award } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Department } from '@/types/education'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface DepartmentCardProps {
  department: Department
  onClick?: () => void
  facultyName?: string
}

const levelLabels = {
  undergraduate: 'Undergraduate',
  postgraduate: 'Postgraduate',
  diploma: 'Diploma',
  certificate: 'Certificate',
  professional: 'Professional',
}

const programTypeLabels = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  online: 'Online',
  hybrid: 'Hybrid',
  evening: 'Evening',
  weekend: 'Weekend',
}

export default function DepartmentCard({ department, onClick, facultyName }: DepartmentCardProps) {
  return (
    <Card
      variant="interactive"
      onClick={onClick}
      className="h-full transition-all duration-200 hover:shadow-lg dark:hover:shadow-primary/10"
    >
      <div className="p-5 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex-shrink-0 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-1">
                {department.name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {department.code}
              </p>
              {facultyName && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                  {facultyName}
                </p>
              )}
            </div>
          </div>

          <Badge
            variant={department.isActive ? 'success' : 'default'}
            size="sm"
            className="flex-shrink-0"
          >
            {department.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        {/* Level & Program Type */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="info" size="sm">
            <Award className="w-3 h-3 mr-1" />
            {levelLabels[department.level]}
          </Badge>
          <Badge variant="default" size="sm">
            {programTypeLabels[department.programType]}
          </Badge>
        </div>

        {/* Description */}
        {department.description && (
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {department.description}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-0.5">
              <Users className="w-3 h-3" />
              <span className="text-xs font-medium">Students</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {formatNumber(department.totalStudents)}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-0.5">
              <FileText className="w-3 h-3" />
              <span className="text-xs font-medium">Fee Items</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {department.totalFeeItems}
            </p>
          </div>

          <div className="col-span-2">
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-0.5">
              <DollarSign className="w-3 h-3" />
              <span className="text-xs font-medium">Revenue / Outstanding</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                {formatCurrency(department.totalRevenue, 'XAF')}
              </p>
              <span className="text-xs text-gray-400">/</span>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                {formatCurrency(department.outstandingBalance, 'XAF')}
              </p>
            </div>
          </div>
        </div>

        {/* HOD */}
        {department.headOfDepartment && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              HOD: {department.headOfDepartment}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
