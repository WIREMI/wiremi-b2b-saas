'use client'

import { useRouter, useParams } from 'next/navigation'
import {
  FileText,
  Edit,
  ArrowLeft,
  Building2,
  Users,
  DollarSign,
  Calendar,
  Check,
  X,
  CreditCard,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  MOCK_FEE_ITEMS,
  getInstitutionById,
  getFacultyById,
  getDepartmentById,
} from '@/lib/mock-data/education-institutions'

export default function FeeDetailPage() {
  const router = useRouter()
  const params = useParams()

  const fee = MOCK_FEE_ITEMS.find((f) => f.id === params.id)
  const institution = fee ? getInstitutionById(fee.institutionId) : null
  const faculty = fee ? getFacultyById(fee.facultyId) : null
  const department = fee ? getDepartmentById(fee.departmentId) : null

  if (!fee) {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Fee Item Not Found</h1>
        </div>
        <Card className="p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Fee item not found</p>
          <Button onClick={() => router.push('/education/fees')}>Back to Fee Structures</Button>
        </Card>
      </PageLayout>
    )
  }

  const feeTypeLabels: Record<string, string> = {
    tuition: 'Tuition',
    acceptance: 'Acceptance',
    lab: 'Laboratory',
    exam: 'Examination',
    accommodation: 'Accommodation',
    registration: 'Registration',
    library: 'Library',
    medical: 'Medical',
    sports: 'Sports',
    technology: 'Technology',
    misc: 'Miscellaneous',
    custom: 'Custom',
  }

  const paymentTypeLabels: Record<string, string> = {
    'one-time': 'One-Time Payment',
    installment: 'Installment Plan',
    flexible: 'Flexible Payment',
  }

  // Mock statistics - in production, these would come from API
  const stats = {
    totalStudents: 245,
    totalCollected: fee.amount * 180,
    averagePayment: fee.amount * 0.73,
    paymentRate: 73,
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/education/fees')}
          >
            Back to Fee Structures
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {fee.name}
                </h1>
                <Badge variant={fee.isActive ? 'success' : 'default'}>
                  {fee.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <Badge variant={fee.isMandatory ? 'error' : 'default'}>
                  {fee.isMandatory ? 'Mandatory' : 'Optional'}
                </Badge>
                <Badge variant="info">{feeTypeLabels[fee.feeType]}</Badge>
              </div>
              {fee.description && (
                <p className="text-gray-600 dark:text-gray-400">{fee.description}</p>
              )}
            </div>

            <Button
              variant="outline"
              icon={<Edit className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push(`/education/fees/${fee.id}/edit`)}
            >
              Edit Fee
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Assigned Students"
            value={stats.totalStudents}
            icon={<Users className="w-5 h-5" />}
          />
          <StatsCard
            label="Total Collected"
            value={formatCurrency(stats.totalCollected, fee.currency)}
            icon={<DollarSign className="w-5 h-5" />}
          />
          <StatsCard
            label="Average Payment"
            value={formatCurrency(stats.averagePayment, fee.currency)}
            icon={<CreditCard className="w-5 h-5" />}
          />
          <StatsCard
            label="Payment Rate"
            value={`${stats.paymentRate}%`}
            icon={<FileText className="w-5 h-5" />}
          />
        </div>

        {/* Fee Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Fee Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fee Type
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {feeTypeLabels[fee.feeType]}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Type
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {paymentTypeLabels[fee.paymentType]}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(fee.amount, fee.currency)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Required
                  </h3>
                  <div className="flex items-center gap-2">
                    {fee.isMandatory ? (
                      <>
                        <Check className="w-5 h-5 text-success" />
                        <span className="text-gray-900 dark:text-white">Mandatory</span>
                      </>
                    ) : (
                      <>
                        <X className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">Optional</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </h3>
                  <div className="flex items-center gap-2">
                    {fee.isActive ? (
                      <>
                        <Check className="w-5 h-5 text-success" />
                        <span className="text-gray-900 dark:text-white">Active</span>
                      </>
                    ) : (
                      <>
                        <X className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900 dark:text-white">Inactive</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {fee.createdAt && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Created
                  </h3>
                  <p className="text-gray-900 dark:text-white">{formatDate(fee.createdAt)}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Hierarchy */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Institution Hierarchy
            </h2>
            <div className="space-y-4">
              {institution && (
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Building2 className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Institution
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {institution.displayName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {institution.country}
                    </p>
                  </div>
                </div>
              )}

              {faculty && (
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Building2 className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Faculty
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium">{faculty.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{faculty.code}</p>
                  </div>
                </div>
              )}

              {department && (
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Building2 className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Department
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium">{department.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {department.code} • {department.level}
                    </p>
                  </div>
                </div>
              )}

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => router.push(`/education/institutions/${institution?.id}`)}
              >
                View Institution Details
              </Button>
            </div>
          </Card>
        </div>

        {/* Installment Configuration */}
        {fee.paymentType === 'installment' && fee.installmentConfig && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Installment Configuration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Installments
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {fee.installmentConfig.numberOfInstallments}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount per Installment
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(
                    fee.amount / fee.installmentConfig.numberOfInstallments,
                    fee.currency
                  )}
                </p>
              </div>

              {fee.installmentConfig.minimumPayableAmount && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Minimum Payable
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(fee.installmentConfig.minimumPayableAmount, fee.currency)}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              View Assigned Students
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              View Payments
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => router.push(`/education/fees/${fee.id}/edit`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Fee
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
