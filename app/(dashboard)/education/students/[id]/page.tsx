'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  DollarSign,
  Receipt,
  Award,
  Edit,
  FileText,
  BookOpen,
  ArrowLeft,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  MOCK_STUDENTS,
  MOCK_PAYMENTS,
  MOCK_SESSIONS,
  MOCK_SCHOLARSHIPS,
  getPaymentsForStudent,
  getSessionById,
  getScholarshipById,
  getAcademicRecordsForStudent,
} from '@/lib/mock-data/education'
import AcademicRecordsTab from '@/components/education/AcademicRecordsTab'

export default function StudentProfilePage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  const student = MOCK_STUDENTS.find((s) => s.id === params.id)
  const payments = getPaymentsForStudent(params.id as string)
  const session = student ? getSessionById(student.sessionId) : null
  const scholarship = student?.scholarshipId ? getScholarshipById(student.scholarshipId) : null
  const academicRecords = student ? getAcademicRecordsForStudent(student.id) : []

  if (!student) {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Student Not Found</h1>
            </div>
          </div>
        </div>
        <Card className="p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Student not found</p>
          <Button onClick={() => router.push('/education/students')}>Back to Students</Button>
        </Card>
      </PageLayout>
    )
  }

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'academic', label: 'Academic Record', icon: BookOpen },
  ]

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{`${student.firstName} ${student.lastName}`}</h1>
            <p className="text-gray-600 dark:text-gray-400">{student.studentId}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.push('/education/students')}
        >
          Back to Students
        </Button>
      </div>

      {/* Student Header */}
      <Card className="p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {student.firstName[0]}
              {student.lastName[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {student.firstName} {student.lastName}
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={getStatusVariant(student.status)}>{student.status}</Badge>
                <Badge variant="default">{student.level}</Badge>
                <Badge variant="info">{student.enrollmentType}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  {student.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  {student.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <GraduationCap className="w-4 h-4" />
                  {student.program}
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  Enrolled: {formatDate(student.enrollmentDate)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              icon={<Edit className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push(`/education/students/${student.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="primary"
              icon={<DollarSign className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/education/payments/collect')}
            >
              Make Payment
            </Button>
          </div>
        </div>
      </Card>

      {/* Fee Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Fees</h3>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(student.totalFees, 'USD')}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Paid</h3>
            <Receipt className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(student.totalPaid, 'USD')}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">Balance</h3>
            <DollarSign className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {formatCurrency(student.balance, 'USD')}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">GPA</h3>
            <GraduationCap className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {student.gpa?.toFixed(2) || 'N/A'}
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-dark-border">
          <nav className="flex gap-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-500'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Personal Information
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Date of Birth</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatDate(student.dateOfBirth)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Gender</div>
                <div className="font-medium text-gray-900 dark:text-white capitalize">
                  {student.gender}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Address</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {student.address.street}
                  <br />
                  {student.address.city}, {student.address.state} {student.address.zipCode}
                  <br />
                  {student.address.country}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Academic Information
            </h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Program</div>
                <div className="font-medium text-gray-900 dark:text-white">{student.program}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Department</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {student.department}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Semester</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {student.currentSemester || 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Expected Graduation</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatDate(student.expectedGraduation)}
                </div>
              </div>
              {session && (
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Academic Session</div>
                  <div className="font-medium text-gray-900 dark:text-white">{session.name}</div>
                </div>
              )}
            </div>
          </Card>

          {student.guardianInfo && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Guardian Information
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Name</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {student.guardianInfo.name}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Relationship</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {student.guardianInfo.relationship}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Phone</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {student.guardianInfo.phone}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Email</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {student.guardianInfo.email}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {scholarship && (
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-500/10 dark:to-orange-600/10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {scholarship.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {scholarship.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge variant="success">{scholarship.percentage}% Coverage</Badge>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(scholarship.amount, scholarship.currency)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'payments' && (
        <Card>
          <div className="p-6 border-b border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Payment History
              </h3>
              <Button
                variant="primary"
                size="sm"
                onClick={() => router.push(`/education/students/${student.id}/payments`)}
              >
                View All
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Receipt
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Method
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover"
                  >
                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                      {payment.receiptNumber}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                      {formatDate(payment.paymentDate)}
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(payment.amount, payment.currency)}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400 capitalize">
                      {payment.paymentMethod.replace('-', ' ')}
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="success" size="sm">
                        {payment.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'documents' && (
        <Card className="p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No documents available</p>
        </Card>
      )}

      {activeTab === 'academic' && (
        <AcademicRecordsTab
          studentId={student.id}
          academicRecords={academicRecords}
          onAddGrade={(data) => {
            console.log('Add grade:', data)
            // In production, this would call an API endpoint
          }}
          onUpdateGrade={(enrollmentId, data) => {
            console.log('Update grade:', enrollmentId, data)
            // In production, this would call an API endpoint
          }}
        />
      )}
    </PageLayout>
  )
}
