'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Plus, Search, Filter, Download } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import InstitutionCard from '@/components/education/InstitutionCard'
import { MOCK_INSTITUTIONS, calculateInstitutionStats } from '@/lib/mock-data/education-institutions'
import { formatCurrency } from '@/lib/utils'
import type { InstitutionStatus } from '@/types/education'

export default function InstitutionsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<InstitutionStatus | 'all'>('all')

  const stats = calculateInstitutionStats()

  // Filter institutions
  const filteredInstitutions = MOCK_INSTITUTIONS.filter((institution) => {
    const matchesSearch =
      institution.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.legalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.address.city.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || institution.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: MOCK_INSTITUTIONS.length,
    verified: MOCK_INSTITUTIONS.filter((i) => i.status === 'verified').length,
    submitted: MOCK_INSTITUTIONS.filter((i) => i.status === 'submitted').length,
    draft: MOCK_INSTITUTIONS.filter((i) => i.status === 'draft').length,
    suspended: MOCK_INSTITUTIONS.filter((i) => i.status === 'suspended').length,
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Educational Institutions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage institutions, faculties, and payment structures
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              icon={<Download className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => console.log('Export institutions')}
            >
              Export
            </Button>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/education/institutions/add')}
            >
              Add Institution
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Institutions"
            value={stats.totalInstitutions}
            icon={<Building2 className="w-5 h-5" />}
            change="+12%"
            trend="up"
          />
          <StatsCard
            label="Verified Institutions"
            value={stats.verifiedInstitutions}
            icon={<Building2 className="w-5 h-5" />}
            change="+8"
            trend="up"
          />
          <StatsCard
            label="Total Students"
            value={stats.totalStudents.toLocaleString()}
            icon={<Building2 className="w-5 h-5" />}
          />
          <StatsCard
            label="Total Revenue"
            value={formatCurrency(stats.totalRevenue, 'XAF')}
            icon={<Building2 className="w-5 h-5" />}
            change="+15%"
            trend="up"
          />
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4 space-y-4">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search institutions by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                  iconPosition="left"
                />
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status:
              </span>

              {(['all', 'verified', 'submitted', 'draft', 'suspended'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  <span className="ml-1.5 text-xs opacity-75">({statusCounts[status]})</span>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Institutions Grid */}
        {filteredInstitutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutions.map((institution) => (
              <InstitutionCard
                key={institution.id}
                institution={institution}
                onClick={() => router.push(`/education/institutions/${institution.id}`)}
              />
            ))}
          </div>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <Building2 className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No institutions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first institution'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/education/institutions/add')}
                >
                  Add Institution
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
