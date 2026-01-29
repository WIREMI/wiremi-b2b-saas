'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Bed,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getPopulatedBookings } from '@/lib/mock-data/hospitality'
import type { BookingStatus } from '@/types/hospitality'

export default function BookingsPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Get populated bookings with room and guest details
  const allBookings = getPopulatedBookings()

  // Calculate stats
  const totalBookings = allBookings.length
  const confirmedBookings = allBookings.filter((b) => b.status === 'confirmed').length
  const checkedInBookings = allBookings.filter((b) => b.status === 'checked-in').length
  const checkedOutBookings = allBookings.filter((b) => b.status === 'checked-out').length

  // Status filter options
  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'checked-in', label: 'Checked In' },
    { value: 'checked-out', label: 'Checked Out' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  // Filter bookings
  const filteredBookings = allBookings.filter((booking) => {
    const matchesSearch =
      booking.bookingReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guest?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guest?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.room?.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>
      case 'confirmed':
        return <Badge variant="info" size="sm">Confirmed</Badge>
      case 'checked-in':
        return <Badge variant="success" size="sm">Checked In</Badge>
      case 'checked-out':
        return <Badge variant="default" size="sm">Checked Out</Badge>
      case 'cancelled':
        return <Badge variant="error" size="sm">Cancelled</Badge>
    }
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bookings Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage all reservations
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push('/hospitality/bookings/create')}
            >
              New Booking
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            label="Total Bookings"
            value={totalBookings}
            icon={<Calendar className="w-5 h-5" />}
            iconBg="bg-primary-100 dark:bg-primary-500/20 text-primary-500"
          />
          <StatsCard
            label="Confirmed"
            value={confirmedBookings}
            icon={<CheckCircle2 className="w-5 h-5" />}
            iconBg="bg-info/10 text-info"
          />
          <StatsCard
            label="Checked In"
            value={checkedInBookings}
            icon={<Bed className="w-5 h-5" />}
            iconBg="bg-success/10 text-success"
          />
          <StatsCard
            label="Checked Out"
            value={checkedOutBookings}
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          />
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by booking reference, guest name, or room number..."
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
                label="Status"
                options={statuses}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredBookings.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{allBookings.length}</span> bookings
            </p>
          </div>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Booking Ref
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Check-in
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Check-out
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Nights
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors cursor-pointer"
                  onClick={() => router.push(`/hospitality/bookings/${booking.id}`)}
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {booking.bookingReference}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {formatDate(new Date(booking.createdAt))}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-primary-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {booking.guest?.firstName} {booking.guest?.lastName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          {booking.guest?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Room {booking.room?.roomNumber}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      Floor {booking.room?.floor} • {booking.room?.type}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {formatDate(new Date(booking.checkInDate))}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {formatDate(new Date(booking.checkOutDate))}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {booking.totalNights}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(booking.totalAmount)}
                    </p>
                    {booking.balanceDue > 0 && (
                      <p className="text-xs text-warning">
                        Balance: {formatCurrency(booking.balanceDue)}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Eye className="w-4 h-4" />}
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/hospitality/bookings/${booking.id}`)
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
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
