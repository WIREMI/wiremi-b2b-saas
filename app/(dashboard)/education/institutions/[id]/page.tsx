'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Building2, MapPin, Phone, Mail, Globe, Edit2, Users, Layers, DollarSign, TrendingUp } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Tabs from '@/components/ui/Tabs'
import StatsCard from '@/components/shared/StatsCard'
import FacultyCard from '@/components/education/FacultyCard'
import { getInstitutionWithDetails } from '@/lib/mock-data/education-institutions'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function InstitutionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const institutionData = getInstitutionWithDetails(params.id as string)

  if (!institutionData) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Institution Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The institution you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="primary" onClick={() => router.push('/education/institutions')}>
            Back to Institutions
          </Button>
        </div>
      </PageLayout>
    )
  }

  const { faculties = [], departments = [], teamMembers = [] } = institutionData

  const statusConfig = {
    verified: { variant: 'success' as const, label: 'Verified' },
    submitted: { variant: 'warning' as const, label: 'Pending Verification' },
    draft: { variant: 'info' as const, label: 'Draft' },
    suspended: { variant: 'error' as const, label: 'Suspended' },
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'faculties', label: 'Faculties & Departments', badge: faculties.length },
    { id: 'team', label: 'Team Members', badge: teamMembers.length },
    { id: 'settings', label: 'Settings' },
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
            onClick={() => router.push('/education/institutions')}
            className="mb-4"
          >
            Back to Institutions
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Institution Info */}
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: institutionData.brandColor || '#1E40AF' }}
              >
                {institutionData.logo ? (
                  <img src={institutionData.logo} alt={institutionData.displayName} className="w-full h-full rounded-xl" />
                ) : (
                  institutionData.displayName.substring(0, 2).toUpperCase()
                )}
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {institutionData.displayName}
                  </h1>
                  <Badge variant={statusConfig[institutionData.status].variant}>
                    {statusConfig[institutionData.status].label}
                  </Badge>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {institutionData.legalName}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{institutionData.address.city}, {institutionData.address.country}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    <span>{institutionData.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    <span>{institutionData.contactEmail}</span>
                  </div>
                  {institutionData.website && (
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-4 h-4" />
                      <a
                        href={institutionData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                icon={<Edit2 className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => router.push(`/education/institutions/${params.id}/edit`)}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Faculties"
            value={institutionData.totalFaculties}
            icon={<Building2 className="w-5 h-5" />}
          />
          <StatsCard
            label="Total Departments"
            value={institutionData.totalDepartments}
            icon={<Layers className="w-5 h-5" />}
          />
          <StatsCard
            label="Total Students"
            value={institutionData.totalStudents.toLocaleString()}
            icon={<Users className="w-5 h-5" />}
            change="+12%"
            trend="up"
          />
          <StatsCard
            label="Total Revenue"
            value={formatCurrency(institutionData.totalRevenue, institutionData.defaultCurrency)}
            icon={<DollarSign className="w-5 h-5" />}
            change="+8.5%"
            trend="up"
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
              {/* Institution Details */}
              <Card>
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Institution Details
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Registration Number
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">
                        {institutionData.registrationNumber}
                      </p>
                    </div>

                    {institutionData.accreditationId && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Accreditation ID
                        </label>
                        <p className="text-gray-900 dark:text-white font-medium mt-1">
                          {institutionData.accreditationId}
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Institution Type
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1 capitalize">
                        {institutionData.type.replace('-', ' ')}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Default Currency
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">
                        {institutionData.defaultCurrency}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Outstanding Balance
                      </label>
                      <p className="text-amber-600 dark:text-amber-400 font-semibold mt-1">
                        {formatCurrency(institutionData.outstandingBalance, institutionData.defaultCurrency)}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Created On
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">
                        {formatDate(institutionData.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Address */}
              <Card>
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Address
                  </h2>

                  <div className="space-y-2">
                    <p className="text-gray-900 dark:text-white">{institutionData.address.street}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {institutionData.address.city}, {institutionData.address.state}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {institutionData.address.zipCode}, {institutionData.address.country}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Settlement Details */}
              {institutionData.settlementBankAccount && (
                <Card>
                  <div className="p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Settlement Account
                    </h2>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Bank Name
                        </label>
                        <p className="text-gray-900 dark:text-white font-medium mt-1">
                          {institutionData.settlementBankAccount.bankName}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Account Number
                        </label>
                        <p className="text-gray-900 dark:text-white font-medium mt-1 font-mono">
                          {institutionData.settlementBankAccount.accountNumber}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Account Name
                        </label>
                        <p className="text-gray-900 dark:text-white font-medium mt-1">
                          {institutionData.settlementBankAccount.accountName}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {institutionData.settlementWalletId && (
                <Card>
                  <div className="p-6 space-y-3">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Wiremi Wallet
                    </h2>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Wallet ID
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1 font-mono text-sm">
                        {institutionData.settlementWalletId}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Verification Status */}
              {institutionData.status === 'verified' && institutionData.verifiedAt && (
                <Card>
                  <div className="p-6 space-y-3">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Verification
                    </h2>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Verified On
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium mt-1">
                        {formatDate(institutionData.verifiedAt)}
                      </p>
                    </div>

                    {institutionData.verifiedBy && (
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Verified By
                        </label>
                        <p className="text-gray-900 dark:text-white font-medium mt-1">
                          {institutionData.verifiedBy}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {activeTab === 'faculties' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Faculties ({faculties.length})
              </h2>
              <Button
                variant="primary"
                onClick={() => router.push(`/education/institutions/${params.id}/faculties/add`)}
              >
                Add Faculty
              </Button>
            </div>

            {faculties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faculties.map((faculty) => (
                  <FacultyCard
                    key={faculty.id}
                    faculty={faculty}
                    onClick={() => router.push(`/education/institutions/${params.id}/faculties/${faculty.id}`)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <div className="p-12 text-center">
                  <Building2 className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No faculties yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Get started by adding your first faculty
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => router.push(`/education/institutions/${params.id}/faculties/add`)}
                  >
                    Add Faculty
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Team Members ({teamMembers.length})
              </h2>
              <Button
                variant="primary"
                onClick={() => console.log('Invite team member')}
              >
                Invite Member
              </Button>
            </div>

            <Card>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Team management interface coming soon...
                </p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Institution Settings
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Settings interface coming soon...
              </p>
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
