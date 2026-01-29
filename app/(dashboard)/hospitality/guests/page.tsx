'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Star,
  Briefcase,
  User,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatDate } from '@/lib/utils'
import { MOCK_GUESTS } from '@/lib/mock-data/hospitality'
import type { GuestType } from '@/types/hospitality'

export default function GuestsPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Calculate stats
  const totalGuests = MOCK_GUESTS.length
  const vipGuests = MOCK_GUESTS.filter((g) => g.guestType === 'vip').length
  const regularGuests = MOCK_GUESTS.filter((g) => g.guestType === 'regular').length
  const corporateGuests = MOCK_GUESTS.filter((g) => g.guestType === 'corporate').length

  // Filter options
  const guestTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'regular', label: 'Regular' },
    { value: 'vip', label: 'VIP' },
    { value: 'corporate', label: 'Corporate' },
  ]

  // Filter guests
  const filteredGuests = MOCK_GUESTS.filter((guest) => {
    const matchesSearch =
      guest.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.guestCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.phone.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === 'all' || guest.guestType === typeFilter

    return matchesSearch && matchesType
  })

  const getGuestTypeBadge = (type: GuestType) => {
    switch (type) {
      case 'regular':
        return <Badge variant="default" size="sm">Regular</Badge>
      case 'vip':
        return <Badge variant="warning" size="sm">VIP</Badge>
      case 'corporate':
        return <Badge variant="info" size="sm">Corporate</Badge>
    }
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Guests Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage all guest profiles
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push('/hospitality/guests/add')}
            >
              Add Guest
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            label="Total Guests"
            value={totalGuests}
            icon={<Users className="w-5 h-5" />}
            iconBg="bg-primary-100 dark:bg-primary-500/20 text-primary-500"
          />
          <StatsCard
            label="VIP Guests"
            value={vipGuests}
            icon={<Star className="w-5 h-5" />}
            iconBg="bg-warning/10 text-warning"
          />
          <StatsCard
            label="Regular"
            value={regularGuests}
            icon={<User className="w-5 h-5" />}
            iconBg="bg-success/10 text-success"
          />
          <StatsCard
            label="Corporate"
            value={corporateGuests}
            icon={<Briefcase className="w-5 h-5" />}
            iconBg="bg-info/10 text-info"
          />
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, guest code, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                iconPosition="left"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                icon={<Filter className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
              <Select
                label="Guest Type"
                options={guestTypes}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              />
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredGuests.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{MOCK_GUESTS.length}</span> guests
            </p>
          </div>
        </Card>
      </div>

      {/* Guests Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Guest Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredGuests.map((guest) => (
                <tr
                  key={guest.id}
                  className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors cursor-pointer"
                  onClick={() => router.push(`/hospitality/guests/${guest.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-primary-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {guest.firstName} {guest.lastName}
                        </p>
                        {guest.lastVisit && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            Last visit: {formatDate(new Date(guest.lastVisit))}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {guest.guestCode}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {guest.email}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                        {guest.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getGuestTypeBadge(guest.guestType)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {guest.totalBookings}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(guest.totalSpent)}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Eye className="w-4 h-4" />}
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/hospitality/guests/${guest.id}`)
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredGuests.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No guests found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSearchQuery('')
                setTypeFilter('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Card>
    </PageLayout>
  )
}
