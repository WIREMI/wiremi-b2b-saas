'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  Search,
  Filter,
  Download,
  UserPlus,
  Eye,
  Edit,
  DollarSign,
  AlertCircle,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import { MOCK_STUDENTS, MOCK_PAYMENTS } from '@/lib/mock-data/education'
import type { StudentStatus, AcademicLevel, EnrollmentType } from '@/types/education'

export default function StudentsListPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StudentStatus | 'all'>('all')
  const [levelFilter, setLevelFilter] = useState<AcademicLevel | 'all'>('all')
  const [enrollmentFilter, setEnrollmentFilter] = useState<EnrollmentType | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)

  // Filter students
  const filteredStudents = MOCK_STUDENTS.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.program.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || student.status === statusFilter
    const matchesLevel = levelFilter === 'all' || student.level === levelFilter
    const matchesEnrollment =
      enrollmentFilter === 'all' || student.enrollmentType === enrollmentFilter

    return matchesSearch && matchesStatus && matchesLevel && matchesEnrollment
  })

  // Calculate stats
  const totalStudents = MOCK_STUDENTS.length
  const activeStudents = MOCK_STUDENTS.filter((s) => s.status === 'active').length
  const totalRevenue = MOCK_PAYMENTS.filter((p) => p.status === 'paid').reduce(
    (sum, p) => sum + p.amount,
    0
  )
  const outstandingFees = MOCK_STUDENTS.filter((s) => s.status === 'active').reduce(
    (sum, s) => sum + s.balance,
    0
  )

  const getStatusVariant = (status: StudentStatus) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'graduated':
        return 'info'
      case 'withdrawn':
        return 'default'
      case 'suspended':
        return 'error'
      default:
        return 'default'
    }
  }

  const getLevelVariant = (level: AcademicLevel) => {
    switch (level) {
      case 'doctorate':
        return 'primary'
      case 'graduate':
        return 'info'
      case 'undergraduate':
        return 'default'
      case 'diploma':
        return 'warning'
      case 'certificate':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Students</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage student enrollments and records</p>
          </div>
          <Button
            variant="primary"
            icon={<UserPlus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/education/students/add')}
          >
            Enroll Student
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-blue-600/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(totalStudents)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-500/20 dark:to-green-600/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(activeStudents)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Students</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-500/20 dark:to-purple-600/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalRevenue, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-500/20 dark:to-orange-600/20 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(outstandingFees, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Outstanding Fees</p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search students by name, email, ID, or program..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              icon={<Filter className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
            <Button variant="outline" icon={<Download className="w-4 h-4" />} iconPosition="left">
              Export
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StudentStatus | 'all')}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'graduated', label: 'Graduated' },
                { value: 'withdrawn', label: 'Withdrawn' },
                { value: 'suspended', label: 'Suspended' }
              ]}
            />

            <Select
              label="Academic Level"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value as AcademicLevel | 'all')}
              options={[
                { value: 'all', label: 'All Levels' },
                { value: 'undergraduate', label: 'Undergraduate' },
                { value: 'graduate', label: 'Graduate' },
                { value: 'doctorate', label: 'Doctorate' },
                { value: 'diploma', label: 'Diploma' },
                { value: 'certificate', label: 'Certificate' }
              ]}
            />

            <Select
              label="Enrollment Type"
              value={enrollmentFilter}
              onChange={(e) => setEnrollmentFilter(e.target.value as EnrollmentType | 'all')}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'full-time', label: 'Full-Time' },
                { value: 'part-time', label: 'Part-Time' },
                { value: 'online', label: 'Online' },
                { value: 'hybrid', label: 'Hybrid' }
              ]}
            />
          </div>
        )}
      </Card>

      {/* Students Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Student
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Program
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Level
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Balance
                </th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.firstName[0]}
                          {student.lastName[0]}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {student.studentId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {student.program}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {student.department}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getLevelVariant(student.level) as any} size="sm">
                        {student.level}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getStatusVariant(student.status)} size="sm">
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div
                        className={`font-semibold ${
                          student.balance > 0
                            ? 'text-orange-600 dark:text-orange-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}
                      >
                        {formatCurrency(student.balance, 'USD')}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Eye className="w-4 h-4" />}
                          onClick={() => router.push(`/education/students/${student.id}`)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit className="w-4 h-4" />}
                          onClick={() => router.push(`/education/students/${student.id}/edit`)}
                        />
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<DollarSign className="w-4 h-4" />}
                          onClick={() => router.push('/education/payments/collect')}
                        >
                          Payment
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-12 h-12 text-gray-400" />
                      <p className="text-gray-600 dark:text-gray-400">No students found</p>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<UserPlus className="w-4 h-4" />}
                        iconPosition="left"
                        onClick={() => router.push('/education/students/add')}
                      >
                        Enroll First Student
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageLayout>
  )
}
