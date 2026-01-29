'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Building2, Layers, Users, DollarSign, Plus, Edit2 } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Tabs from '@/components/ui/Tabs'
import StatsCard from '@/components/shared/StatsCard'
import DepartmentCard from '@/components/education/DepartmentCard'
import HierarchyBreadcrumb from '@/components/education/HierarchyBreadcrumb'
import {
  getInstitutionById,
  getFacultyById,
  getDepartmentsByFaculty,
  MOCK_INSTITUTIONS
} from '@/lib/mock-data/education-institutions'
import { formatCurrency } from '@/lib/utils'

export default function FacultyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const institution = getInstitutionById(params.id as string)
  const faculty = getFacultyById(params.facultyId as string)
  const departments = getDepartmentsByFaculty(params.facultyId as string)

  if (!institution || !faculty) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Faculty Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The faculty you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => router.push(`/education/institutions/${params.id}`)}>
            Back to Institution
          </Button>
        </div>
      </PageLayout>
    )
  }

  const breadcrumbItems = [
    { label: 'Institutions', href: '/education/institutions' },
    { label: institution.displayName, href: `/education/institutions/${params.id}` },
    { label: faculty.name },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'departments', label: 'Departments', badge: departments.length },
    { id: 'fees', label: 'Fee Structures' },
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
            onClick={() => router.push(`/education/institutions/${params.id}`)}
            className="mb-4"
          >
            Back to Institution
          </Button>

          <HierarchyBreadcrumb items={breadcrumbItems} className="mb-4" />

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Faculty Info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {faculty.name}
                </h1>
                <Badge variant={faculty.isActive ? 'success' : 'default'}>
                  {faculty.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Faculty Code: <span className="font-mono font-medium text-gray-900 dark:text-white">{faculty.code}</span>
              </p>

              {faculty.description && (
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                  {faculty.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                icon={<Edit2 className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => console.log('Edit faculty')}
              >
                Edit
              </Button>
              <Button
                variant="primary"
                icon={<Plus className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => router.push(`/education/institutions/${params.id}/faculties/${params.facultyId}/departments/add`)}
              >
                Add Department
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Departments"
            value={faculty.totalDepartments}
            icon={<Layers className="w-5 h-5" />}
          />
          <StatsCard
            label="Total Students"
            value={faculty.totalStudents.toLocaleString()}
            icon={<Users className="w-5 h-5" />}
            change="+8%"
            trend="up"
          />
          <StatsCard
            label="Total Revenue"
            value={formatCurrency(faculty.totalRevenue, faculty.defaultCurrency)}
            icon={<DollarSign className="w-5 h-5" />}
            change="+12%"
            trend="up"
          />
          <StatsCard
            label="Outstanding Balance"
            value={formatCurrency(faculty.outstandingBalance, faculty.defaultCurrency)}
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
                    Faculty Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Faculty Code
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1 font-mono">
                        {faculty.code}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Default Currency
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">
                        {faculty.defaultCurrency}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Status
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">
                        {faculty.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Created On
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">
                        {new Date(faculty.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {faculty.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Description
                      </label>
                      <p className="text-gray-900 dark:text-white mt-1">
                        {faculty.description}
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Top Departments by Revenue */}
              <Card>
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Top Departments by Revenue
                  </h2>
                  <div className="space-y-3">
                    {departments
                      .slice()
                      .sort((a, b) => b.totalRevenue - a.totalRevenue)
                      .slice(0, 5)
                      .map((dept) => (
                        <div
                          key={dept.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {dept.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {dept.totalStudents} students
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(dept.totalRevenue, faculty.defaultCurrency)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Quick Stats
                  </h2>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Active Departments
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {departments.filter(d => d.isActive).length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Inactive Departments
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {departments.filter(d => !d.isActive).length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Avg Students/Dept
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {Math.round(faculty.totalStudents / faculty.totalDepartments)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Collection Rate
                      </span>
                      <span className="font-semibold text-success">
                        {Math.round(((faculty.totalRevenue - faculty.outstandingBalance) / faculty.totalRevenue) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Departments ({departments.length})
              </h2>
              <Button
                variant="primary"
                icon={<Plus className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => router.push(`/education/institutions/${params.id}/faculties/${params.facultyId}/departments/add`)}
              >
                Add Department
              </Button>
            </div>

            {departments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((department) => (
                  <DepartmentCard
                    key={department.id}
                    department={department}
                    onClick={() => router.push(`/education/institutions/${params.id}/faculties/${params.facultyId}/departments/${department.id}`)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <div className="p-12 text-center">
                  <Layers className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No departments yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Get started by adding your first department
                  </p>
                  <Button
                    variant="primary"
                    icon={<Plus className="w-4 h-4" />}
                    iconPosition="left"
                    onClick={() => router.push(`/education/institutions/${params.id}/faculties/${params.facultyId}/departments/add`)}
                  >
                    Add Department
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'fees' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Fee Structures
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fee management interface coming soon...
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
