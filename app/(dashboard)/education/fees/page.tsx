'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Plus, Search, Filter, Download, Tag } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import {
  MOCK_FEE_ITEMS,
  MOCK_FEE_TEMPLATES,
  MOCK_INSTITUTIONS,
  MOCK_FACULTIES,
  MOCK_DEPARTMENTS,
  getInstitutionById,
  getFacultyById,
  getDepartmentById,
} from '@/lib/mock-data/education-institutions'
import { formatCurrency } from '@/lib/utils'
import type { FeeType, PaymentType } from '@/types/education'

export default function FeesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [feeTypeFilter, setFeeTypeFilter] = useState<FeeType | 'all'>('all')
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<PaymentType | 'all'>('all')
  const [institutionFilter, setInstitutionFilter] = useState<string>('all')

  // Calculate stats
  const totalFees = MOCK_FEE_ITEMS.length
  const mandatoryFees = MOCK_FEE_ITEMS.filter((f) => f.isMandatory).length
  const installmentFees = MOCK_FEE_ITEMS.filter((f) => f.paymentType === 'installment').length
  const totalFeeValue = MOCK_FEE_ITEMS.reduce((sum, f) => sum + f.amount, 0)

  // Filter fees
  const filteredFees = MOCK_FEE_ITEMS.filter((fee) => {
    const matchesSearch =
      fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.description?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFeeType = feeTypeFilter === 'all' || fee.feeType === feeTypeFilter
    const matchesPaymentType = paymentTypeFilter === 'all' || fee.paymentType === paymentTypeFilter
    const matchesInstitution = institutionFilter === 'all' || fee.institutionId === institutionFilter

    return matchesSearch && matchesFeeType && matchesPaymentType && matchesInstitution
  })

  const feeTypeLabels: Record<FeeType, string> = {
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

  const paymentTypeLabels: Record<PaymentType, string> = {
    'one-time': 'One-Time',
    installment: 'Installment',
    flexible: 'Flexible',
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Fee Structures
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage fee items and payment configurations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              icon={<Tag className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/education/fees/templates')}
            >
              Templates
            </Button>
            <Button
              variant="outline"
              icon={<Download className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => console.log('Export fees')}
            >
              Export
            </Button>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/education/fees/add')}
            >
              Add Fee
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Fee Items"
            value={totalFees}
            icon={<FileText className="w-5 h-5" />}
          />
          <StatsCard
            label="Mandatory Fees"
            value={mandatoryFees}
            icon={<FileText className="w-5 h-5" />}
          />
          <StatsCard
            label="Installment Plans"
            value={installmentFees}
            icon={<FileText className="w-5 h-5" />}
          />
          <StatsCard
            label="Total Fee Value"
            value={formatCurrency(totalFeeValue, 'XAF')}
            icon={<FileText className="w-5 h-5" />}
          />
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4 space-y-4">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search fees by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                  iconPosition="left"
                />
              </div>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Institution Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Institution
                </label>
                <select
                  value={institutionFilter}
                  onChange={(e) => setInstitutionFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">All Institutions</option>
                  {MOCK_INSTITUTIONS.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.displayName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fee Type Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Fee Type
                </label>
                <select
                  value={feeTypeFilter}
                  onChange={(e) => setFeeTypeFilter(e.target.value as FeeType | 'all')}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">All Types</option>
                  {Object.entries(feeTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Type Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Payment Type
                </label>
                <select
                  value={paymentTypeFilter}
                  onChange={(e) => setPaymentTypeFilter(e.target.value as PaymentType | 'all')}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">All Payment Types</option>
                  {Object.entries(paymentTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Fee Items List */}
        {filteredFees.length > 0 ? (
          <div className="space-y-4">
            {filteredFees.map((fee) => {
              const institution = getInstitutionById(fee.institutionId)
              const faculty = getFacultyById(fee.facultyId)
              const department = getDepartmentById(fee.departmentId)

              return (
                <Card key={fee.id}>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {fee.name}
                          </h3>
                          <Badge variant={fee.isMandatory ? 'error' : 'default'}>
                            {fee.isMandatory ? 'Mandatory' : 'Optional'}
                          </Badge>
                          <Badge variant="info">
                            {feeTypeLabels[fee.feeType]}
                          </Badge>
                          <Badge variant={fee.isActive ? 'success' : 'default'}>
                            {fee.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>

                        {fee.description && (
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {fee.description}
                          </p>
                        )}

                        {/* Hierarchy */}
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {institution?.displayName} → {faculty?.name} → {department?.name}
                        </div>

                        {/* Fee Details */}
                        <div className="flex items-center gap-6 text-sm flex-wrap">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Amount: </span>
                            <span className="font-semibold text-gray-900 dark:text-white text-lg">
                              {formatCurrency(fee.amount, fee.currency)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Payment Type: </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {paymentTypeLabels[fee.paymentType]}
                            </span>
                          </div>
                          {fee.installmentConfig && (
                            <>
                              <div>
                                <span className="text-gray-600 dark:text-gray-400">Installments: </span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {fee.installmentConfig.numberOfInstallments}
                                </span>
                              </div>
                              {fee.installmentConfig.minimumPayableAmount && (
                                <div>
                                  <span className="text-gray-600 dark:text-gray-400">Min. Payment: </span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {formatCurrency(fee.installmentConfig.minimumPayableAmount, fee.currency)}
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/education/fees/${fee.id}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/education/fees/${fee.id}/edit`)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No fee items found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || feeTypeFilter !== 'all' || paymentTypeFilter !== 'all' || institutionFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by adding your first fee item'}
              </p>
              {!searchTerm && feeTypeFilter === 'all' && paymentTypeFilter === 'all' && institutionFilter === 'all' && (
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/education/fees/add')}
                >
                  Add Fee
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
