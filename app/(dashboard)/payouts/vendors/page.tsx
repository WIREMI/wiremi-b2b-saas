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
  Building2,
  User,
  Briefcase,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import { MOCK_VENDORS, MOCK_PAYOUTS, getPayoutsForVendor } from '@/lib/mock-data/payouts'
import type { VendorType, VendorStatus } from '@/types/payouts'

export default function VendorsListPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<VendorType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<VendorStatus | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)

  // Filter vendors
  const filteredVendors = MOCK_VENDORS.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.vendorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.category?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === 'all' || vendor.type === typeFilter
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  // Calculate stats
  const totalVendors = MOCK_VENDORS.length
  const activeVendors = MOCK_VENDORS.filter((v) => v.status === 'active').length
  const totalPaid = MOCK_VENDORS.reduce((sum, v) => sum + v.totalPaid, 0)
  const pendingPayments = MOCK_VENDORS.reduce((sum, v) => sum + v.pendingAmount, 0)

  const getTypeIcon = (type: VendorType) => {
    switch (type) {
      case 'company':
        return <Building2 className="w-4 h-4" />
      case 'individual':
        return <User className="w-4 h-4" />
      case 'contractor':
        return <Briefcase className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  const getTypeVariant = (type: VendorType) => {
    switch (type) {
      case 'company':
        return 'info'
      case 'individual':
        return 'primary'
      case 'contractor':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getStatusVariant = (status: VendorStatus) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'default'
      case 'suspended':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout maxWidth="normal">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Vendors
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage payees and vendor information
            </p>
          </div>
          <Button
            variant="primary"
            icon={<UserPlus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/payouts/vendors/add')}
          >
            Add Vendor
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
              {formatNumber(totalVendors)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Vendors</p>
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
              {formatNumber(activeVendors)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Vendors</p>
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
              {formatCurrency(totalPaid, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-500/20 dark:to-orange-600/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(pendingPayments, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending Payments</p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search vendors by name, email, ID, or category..."
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <Select
              label="Vendor Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as VendorType | 'all')}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'company', label: 'Company' },
                { value: 'individual', label: 'Individual' },
                { value: 'contractor', label: 'Contractor' }
              ]}
            />

            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as VendorStatus | 'all')}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'suspended', label: 'Suspended' }
              ]}
            />
          </div>
        )}
      </Card>

      {/* Vendors Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Vendor
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Type
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Contact
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Payouts
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Total Paid
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {vendor.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {vendor.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {vendor.vendorId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getTypeVariant(vendor.type) as any} size="sm">
                        <span className="flex items-center gap-1">
                          {getTypeIcon(vendor.type)}
                          {vendor.type}
                        </span>
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {vendor.email}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {vendor.phone}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {vendor.totalPayouts}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        transactions
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(vendor.totalPaid, 'USD')}
                      </div>
                      {vendor.pendingAmount > 0 && (
                        <div className="text-xs text-orange-600 dark:text-orange-400">
                          {formatCurrency(vendor.pendingAmount, 'USD')} pending
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getStatusVariant(vendor.status)} size="sm">
                        {vendor.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Eye className="w-4 h-4" />}
                          onClick={() => router.push(`/payouts/vendors/${vendor.id}`)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Edit className="w-4 h-4" />}
                          onClick={() => router.push(`/payouts/vendors/${vendor.id}/edit`)}
                        />
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<DollarSign className="w-4 h-4" />}
                          onClick={() => router.push(`/payouts/create?vendor=${vendor.id}`)}
                        >
                          Pay
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-12 h-12 text-gray-400" />
                      <p className="text-gray-600 dark:text-gray-400">No vendors found</p>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<UserPlus className="w-4 h-4" />}
                        iconPosition="left"
                        onClick={() => router.push('/payouts/vendors/add')}
                      >
                        Add First Vendor
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
