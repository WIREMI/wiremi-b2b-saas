'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Users, DollarSign, FileText, Edit2, Plus, TrendingUp } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Tabs from '@/components/ui/Tabs'
import StatsCard from '@/components/shared/StatsCard'
import HierarchyBreadcrumb from '@/components/education/HierarchyBreadcrumb'
import PaymentStatusBadge from '@/components/education/PaymentStatusBadge'
import {
  getInstitutionById,
  getFacultyById,
  getDepartmentById,
  getFeeItemsByDepartment,
} from '@/lib/mock-data/education-institutions'
import { formatCurrency } from '@/lib/utils'

export default function DepartmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const institution = getInstitutionById(params.id as string)
  const faculty = getFacultyById(params.facultyId as string)
  const department = getDepartmentById(params.deptId as string)
  const feeItems = getFeeItemsByDepartment(params.deptId as string)

  if (!institution || !faculty || !department) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Department Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The department you're looking for doesn't exist or has been removed.
          </p>
          <Button
            variant="primary"
            onClick={() => router.push(`/education/institutions/${params.id}/faculties/${params.facultyId}`)}
          >
            Back to Faculty
          </Button>
        </div>
      </PageLayout>
    )
  }

  const breadcrumbItems = [
    { label: 'Institutions', href: '/education/institutions' },
    { label: institution.displayName, href: `/education/institutions/${params.id}` },
    { label: faculty.name, href: `/education/institutions/${params.id}/faculties/${params.facultyId}` },
    { label: department.name },
  ]

  const levelConfig = {
    undergraduate: { label: 'Undergraduate', variant: 'info' as const },
    postgraduate: { label: 'Postgraduate', variant: 'primary' as const },
    diploma: { label: 'Diploma', variant: 'success' as const },
    certificate: { label: 'Certificate', variant: 'warning' as const },
    professional: { label: 'Professional', variant: 'primary' as const },
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'fees', label: 'Fee Structures', badge: feeItems.length },
    { id: 'students', label: 'Students', badge: department.totalStudents },
    { id: 'payments', label: 'Payment History' },
    { id: 'analytics', label: 'Analytics' },
  ]

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push(`/education/institutions/${params.id}/faculties/${params.facultyId}`)}
            className="mb-4"
          >
            Back to Faculty
          </Button>

          <HierarchyBreadcrumb items={breadcrumbItems} className="mb-4" />

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Department Info */}
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {department.name}
                </h1>
                <Badge variant={levelConfig[department.level].variant}>
                  {levelConfig[department.level].label}
                </Badge>
                <Badge variant={department.isActive ? 'success' : 'default'}>
                  {department.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Code: <span className="font-mono font-medium text-gray-900 dark:text-white">{department.code}</span>
                {' • '}
                Program: <span className="capitalize font-medium text-gray-900 dark:text-white">{department.programType.replace('-', ' ')}</span>
              </p>

              {department.description && (
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                  {department.description}
                </p>
              )}

              {department.headOfDepartment && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  HOD: <span className="font-medium text-gray-900 dark:text-white">{department.headOfDepartment}</span>
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                icon={<Edit2 className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => console.log('Edit department')}
              >
                Edit
              </Button>
              <Button
                variant="primary"
                icon={<Plus className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => router.push(`/education/institutions/${params.id}/faculties/${params.facultyId}/departments/${params.deptId}/fees/add`)}
              >
                Add Fee
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Students"
            value={department.totalStudents.toLocaleString()}
            icon={<Users className="w-5 h-5" />}
            change="+5%"
            trend="up"
          />
          <StatsCard
            label="Fee Items"
            value={department.totalFeeItems}
            icon={<FileText className="w-5 h-5" />}
          />
          <StatsCard
            label="Total Revenue"
            value={formatCurrency(department.totalRevenue, faculty.defaultCurrency)}
            icon={<DollarSign className="w-5 h-5" />}
            change="+18%"
            trend="up"
          />
          <StatsCard
            label="Outstanding Balance"
            value={formatCurrency(department.outstandingBalance, faculty.defaultCurrency)}
            icon={<DollarSign className="w-5 h-5" />}
          />
        </div>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Department Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Department Code
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1 font-mono">
                        {department.code}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Program Level
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1 capitalize">
                        {department.level}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Program Type
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1 capitalize">
                        {department.programType.replace('-', ' ')}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Currency
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">
                        {faculty.defaultCurrency}
                      </p>
                    </div>

                    {department.headOfDepartment && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Head of Department
                        </label>
                        <p className="text-gray-900 dark:text-white font-medium mt-1">
                          {department.headOfDepartment}
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Status
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">
                        {department.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Created On
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">
                        {new Date(department.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {department.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Description
                      </label>
                      <p className="text-gray-900 dark:text-white mt-1">
                        {department.description}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Recent Activity */}
              <Card>
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Activity
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Activity timeline coming soon...
                  </p>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Collection Statistics
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Total Expected
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(department.totalRevenue + department.outstandingBalance, faculty.defaultCurrency)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Collected
                      </span>
                      <span className="font-semibold text-success">
                        {formatCurrency(department.totalRevenue, faculty.defaultCurrency)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Outstanding
                      </span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        {formatCurrency(department.outstandingBalance, faculty.defaultCurrency)}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Collection Rate
                        </span>
                        <span className="font-bold text-success">
                          {Math.round((department.totalRevenue / (department.totalRevenue + department.outstandingBalance)) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                  </h2>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab('students')}
                    >
                      View Students
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab('fees')}
                    >
                      Manage Fees
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setActiveTab('payments')}
                    >
                      View Payments
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => console.log('Export report')}
                    >
                      Export Report
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Fee Structures ({feeItems.length})
              </h2>
              <Button
                variant="primary"
                icon={<Plus className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => router.push(`/education/institutions/${params.id}/faculties/${params.facultyId}/departments/${params.deptId}/fees/add`)}
              >
                Add Fee
              </Button>
            </div>

            {feeItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {feeItems.map((fee) => (
                  <Card key={fee.id}>
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {fee.name}
                            </h3>
                            <Badge variant={fee.isMandatory ? 'error' : 'default'}>
                              {fee.isMandatory ? 'Mandatory' : 'Optional'}
                            </Badge>
                            <Badge variant="info">
                              {fee.feeType === 'tuition' ? 'Tuition' :
                               fee.feeType === 'acceptance' ? 'Acceptance' :
                               fee.feeType === 'lab' ? 'Lab' :
                               fee.feeType === 'exam' ? 'Exam' :
                               fee.feeType === 'accommodation' ? 'Accommodation' :
                               fee.feeType === 'misc' ? 'Miscellaneous' : 'Custom'}
                            </Badge>
                          </div>

                          {fee.description && (
                            <p className="text-gray-600 dark:text-gray-400 mb-3">
                              {fee.description}
                            </p>
                          )}

                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Amount: </span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(fee.amount, fee.currency)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Payment Type: </span>
                              <span className="font-medium text-gray-900 dark:text-white capitalize">
                                {fee.paymentType.replace('-', ' ')}
                              </span>
                            </div>
                            {fee.installmentConfig && (
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Installments: </span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {fee.installmentConfig.numberOfInstallments}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          icon={<Edit2 className="w-4 h-4" />}
                          iconPosition="left"
                          onClick={() => console.log('Edit fee')}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <div className="p-12 text-center">
                  <FileText className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No fee structures yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Get started by adding your first fee item
                  </p>
                  <Button
                    variant="primary"
                    icon={<Plus className="w-4 h-4" />}
                    iconPosition="left"
                    onClick={() => router.push(`/education/institutions/${params.id}/faculties/${params.facultyId}/departments/${params.deptId}/fees/add`)}
                  >
                    Add Fee
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Students ({department.totalStudents})
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Student list coming soon...
              </p>
            </div>
          </Card>
        )}

        {activeTab === 'payments' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Payment History
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Payment history coming soon...
              </p>
            </div>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Revenue Analytics
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Analytics dashboard coming soon...
              </p>
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
