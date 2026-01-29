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
  UserCheck,
  DollarSign,
  AlertCircle,
  Calendar,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { formatCurrency, formatDate } from '@/lib/utils'
import { MOCK_MEMBERS, MOCK_PAYMENTS } from '@/lib/mock-data/fitness'
import type { Member, MembershipStatus, MembershipTier } from '@/types/fitness'

export default function MembersListPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<MembershipStatus | 'all'>('all')
  const [tierFilter, setTierFilter] = useState<MembershipTier | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)

  // Filter members
  const filteredMembers = MOCK_MEMBERS.filter((member) => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.memberCode.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || member.membershipStatus === statusFilter
    const matchesTier = tierFilter === 'all' || member.membershipTier === tierFilter

    return matchesSearch && matchesStatus && matchesTier
  })

  // Calculate stats
  const totalMembers = MOCK_MEMBERS.length
  const activeMembers = MOCK_MEMBERS.filter((m) => m.membershipStatus === 'active').length
  const expiringMembers = MOCK_MEMBERS.filter((m) => {
    if (m.membershipStatus !== 'active') return false
    const daysUntilExpiry = Math.ceil(
      (new Date(m.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    )
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30
  }).length

  const totalRevenue = MOCK_PAYMENTS.filter((p) => p.status === 'paid').reduce(
    (sum, p) => sum + p.amount,
    0
  )

  const getStatusVariant = (status: MembershipStatus) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'expired':
        return 'error'
      case 'suspended':
        return 'warning'
      case 'cancelled':
        return 'default'
      default:
        return 'default'
    }
  }

  const getTierVariant = (tier: MembershipTier) => {
    switch (tier) {
      case 'vip':
        return 'primary'
      case 'premium':
        return 'info'
      case 'basic':
        return 'default'
      default:
        return 'default'
    }
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    return Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <PageLayout maxWidth="normal">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Members
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage gym members and memberships
            </p>
          </div>
          <Button
            variant="primary"
            icon={<UserPlus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/fitness/members/add')}
          >
            Add Member
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
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{totalMembers}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Members</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-500/20 dark:to-green-600/20 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{activeMembers}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Members</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-500/20 dark:to-orange-600/20 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{expiringMembers}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Expiring Soon</p>
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
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search members by name, email, or member code..."
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
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as MembershipStatus | 'all')}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'expired', label: 'Expired' },
                { value: 'suspended', label: 'Suspended' },
                { value: 'cancelled', label: 'Cancelled' }
              ]}
            />

            <Select
              label="Membership Tier"
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as MembershipTier | 'all')}
              options={[
                { value: 'all', label: 'All Tiers' },
                { value: 'basic', label: 'Basic' },
                { value: 'premium', label: 'Premium' },
                { value: 'vip', label: 'VIP' }
              ]}
            />
          </div>
        )}
      </Card>

      {/* Members Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Member
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Membership
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Expiry Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Check-ins
                </th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => {
                  const daysUntilExpiry = getDaysUntilExpiry(member.expiryDate)
                  const isExpiringSoon =
                    member.membershipStatus === 'active' &&
                    daysUntilExpiry > 0 &&
                    daysUntilExpiry <= 7

                  return (
                    <tr
                      key={member.id}
                      className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-semibold">
                            {member.firstName[0]}
                            {member.lastName[0]}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {member.firstName} {member.lastName}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {member.memberCode}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant={getTierVariant(member.membershipTier) as any} size="sm">
                          {member.membershipTier.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant={getStatusVariant(member.membershipStatus)} size="sm">
                          {member.membershipStatus}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-900 dark:text-white">
                            {formatDate(member.expiryDate)}
                          </span>
                          {isExpiringSoon && (
                            <Badge variant="error" size="sm">
                              {daysUntilExpiry}d
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-900 dark:text-white">
                          {member.totalCheckIns}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<Eye className="w-4 h-4" />}
                            onClick={() => router.push(`/fitness/members/${member.id}`)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<Edit className="w-4 h-4" />}
                            onClick={() => router.push(`/fitness/members/${member.id}/edit`)}
                          />
                          <Button
                            variant="primary"
                            size="sm"
                            icon={<UserCheck className="w-4 h-4" />}
                            onClick={() => router.push('/fitness/check-in')}
                          >
                            Check-in
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-12 h-12 text-gray-400" />
                      <p className="text-gray-600 dark:text-gray-400">No members found</p>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<UserPlus className="w-4 h-4" />}
                        iconPosition="left"
                        onClick={() => router.push('/fitness/members/add')}
                      >
                        Add First Member
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
