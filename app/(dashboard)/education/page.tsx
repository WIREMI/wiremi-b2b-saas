'use client'

import { useRouter } from 'next/navigation'
import {
  Users,
  DollarSign,
  AlertCircle,
  UserPlus,
  Receipt,
  Calendar,
  TrendingUp,
  BookOpen,
  Award,
  ArrowLeft,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import {
  MOCK_STUDENTS,
  MOCK_PAYMENTS,
  MOCK_SESSIONS,
  getCurrentSession,
} from '@/lib/mock-data/education'

export default function EducationDashboardPage() {
  const router = useRouter()
  const currentSession = getCurrentSession()

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

  // Payment status breakdown
  const studentsWithBalance = MOCK_STUDENTS.filter((s) => s.status === 'active' && s.balance > 0)
    .length
  const studentsFullyPaid = MOCK_STUDENTS.filter((s) => s.status === 'active' && s.balance === 0)
    .length
  const overduePayments = MOCK_PAYMENTS.filter((p) => p.status === 'overdue').length

  // Recent enrollments (last 5)
  const recentEnrollments = [...MOCK_STUDENTS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Recent payments (last 5)
  const recentPayments = [...MOCK_PAYMENTS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const getStatusVariant = (status: string) => {
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

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success'
      case 'partial':
        return 'warning'
      case 'overdue':
        return 'error'
      case 'pending':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Back Navigation */}
      <div className="mb-2">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Education Payments</h1>
          <p className="text-[13px] text-gray-500 mt-0.5">Manage student fees, payments, and academic sessions</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3 border border-gray-200 dark:border-gray-700/40">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => router.push('/education/students/add')}
            className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Enroll Student</span>
          </button>
          <button
            onClick={() => router.push('/education/payments/collect')}
            className="px-4 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Collect Payment</span>
          </button>
          <button
            onClick={() => router.push('/education/sessions')}
            className="px-4 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>View Sessions</span>
          </button>
          <button
            onClick={() => router.push('/education/scholarships')}
            className="px-4 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Scholarships</span>
          </button>
        </div>
      </div>

      {/* Current Session Banner */}
      {currentSession && (
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/10 dark:to-orange-800/10 rounded-xl p-4 border-2 border-orange-200 dark:border-orange-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white">
                  {currentSession.name}
                </h3>
                <p className="text-[12px] text-gray-600 dark:text-gray-400">
                  {formatDate(currentSession.startDate)} - {formatDate(currentSession.endDate)}
                </p>
              </div>
            </div>
            <Badge variant="success">Current Session</Badge>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div onClick={() => router.push('/education/students')} className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40 cursor-pointer hover:border-teal-500 dark:hover:border-teal-500 transition-all">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {formatNumber(totalStudents)}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
            Total Students
          </div>
        </div>

        <div onClick={() => router.push('/education/students')} className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40 cursor-pointer hover:border-teal-500 dark:hover:border-teal-500 transition-all">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {formatNumber(activeStudents)}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
            Active Students
          </div>
        </div>

        <div onClick={() => router.push('/education/payments')} className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40 cursor-pointer hover:border-teal-500 dark:hover:border-teal-500 transition-all">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {formatCurrency(totalRevenue, 'USD')}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
            Total Revenue
          </div>
        </div>

        <div onClick={() => router.push('/education/payments')} className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40 cursor-pointer hover:border-teal-500 dark:hover:border-teal-500 transition-all">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {formatCurrency(outstandingFees, 'USD')}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
            Outstanding Fees
          </div>
        </div>
      </div>

      {/* Payment Status Breakdown */}
      <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
        <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
          Payment Status Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                {studentsFullyPaid}
              </div>
              <div className="text-[12px] text-gray-500">Fully Paid</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                {studentsWithBalance}
              </div>
              <div className="text-[12px] text-gray-500">With Balance</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                {overduePayments}
              </div>
              <div className="text-[12px] text-gray-500">Overdue</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Recent Enrollments */}
        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700/40 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700/40">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                Recent Enrollments
              </h3>
              <button
                onClick={() => router.push('/education/students')}
                className="text-[12px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
              >
                View All →
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200/60 dark:divide-gray-700/40">
            {recentEnrollments.map((student) => (
              <div
                key={student.id}
                className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
                onClick={() => router.push(`/education/students/${student.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-[11px] font-semibold">
                      {student.firstName[0]}
                      {student.lastName[0]}
                    </div>
                    <div>
                      <div className="text-[13px] font-medium text-gray-900 dark:text-white">
                        {student.firstName} {student.lastName}
                      </div>
                      <div className="text-[12px] text-gray-500">
                        {student.program}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStatusVariant(student.status)} size="sm">
                      {student.status}
                    </Badge>
                    <div className="text-[11px] text-gray-500 mt-0.5">
                      {formatDate(student.enrollmentDate)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700/40 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700/40">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                Recent Payments
              </h3>
              <button
                onClick={() => router.push('/education/payments')}
                className="text-[12px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
              >
                View All →
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200/60 dark:divide-gray-700/40">
            {recentPayments.map((payment) => {
              const student = MOCK_STUDENTS.find((s) => s.id === payment.studentId)
              return (
                <div
                  key={payment.id}
                  className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
                  onClick={() => router.push(`/education/students/${payment.studentId}/payments`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-[13px] font-medium text-gray-900 dark:text-white">
                        {student?.firstName} {student?.lastName}
                      </div>
                      <div className="text-[12px] text-gray-500">
                        {payment.receiptNumber}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-semibold text-gray-900 dark:text-white tabular-nums">
                        {formatCurrency(payment.amount, payment.currency)}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Badge variant={getPaymentStatusVariant(payment.status)} size="sm">
                          {payment.status}
                        </Badge>
                        <span className="text-[11px] text-gray-500">
                          {formatDate(payment.paymentDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-all"
          onClick={() => router.push('/education/students')}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-900 dark:text-white">Students</div>
              <div className="text-[12px] text-gray-500">
                Manage all students
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40 cursor-pointer hover:border-purple-500 dark:hover:border-purple-500 transition-all"
          onClick={() => router.push('/education/fees')}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-900 dark:text-white">Fee Structures</div>
              <div className="text-[12px] text-gray-500">
                Manage fee structures
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40 cursor-pointer hover:border-green-500 dark:hover:border-green-500 transition-all"
          onClick={() => router.push('/education/sessions')}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-900 dark:text-white">Sessions</div>
              <div className="text-[12px] text-gray-500">
                Academic sessions
              </div>
            </div>
          </div>
        </div>

        <div
          className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40 cursor-pointer hover:border-orange-500 dark:hover:border-orange-500 transition-all"
          onClick={() => router.push('/education/scholarships')}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-900 dark:text-white">Scholarships</div>
              <div className="text-[12px] text-gray-500">
                Scholarship programs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageLayout>
  )
}
