'use client'

import { useRouter } from 'next/navigation'
import {
  Building2,
  DollarSign,
  Bed,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  Plus,
  ArrowLeft,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import {
  MOCK_ROOMS,
  MOCK_OCCUPANCY_STATS,
  getPopulatedBookings,
} from '@/lib/mock-data/hospitality'
import type { Room, Booking } from '@/types/hospitality'

export default function HospitalityOverviewPage() {
  const router = useRouter()

  // Calculate today's stats
  const totalRooms = MOCK_ROOMS.length
  const occupiedRooms = MOCK_ROOMS.filter((r) => r.status === 'occupied').length
  const availableRooms = MOCK_ROOMS.filter((r) => r.status === 'available').length
  const cleaningRooms = MOCK_ROOMS.filter((r) => r.status === 'cleaning').length
  const maintenanceRooms = MOCK_ROOMS.filter((r) => r.status === 'maintenance').length

  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100)

  // Get today's bookings
  const today = new Date().toISOString().split('T')[0]
  const populatedBookings = getPopulatedBookings()
  const todayCheckIns = populatedBookings.filter(
    (b) => b.checkInDate === today && b.status === 'confirmed'
  )
  const todayCheckOuts = populatedBookings.filter(
    (b) => b.checkOutDate === today && b.status === 'checked-in'
  )

  // Calculate today's revenue (from checked-in bookings)
  const todayRevenue = populatedBookings
    .filter((b) => b.status === 'checked-in')
    .reduce((sum, b) => sum + b.roomRate, 0)

  // Active bookings (checked-in)
  const activeBookings = populatedBookings.filter((b) => b.status === 'checked-in').length

  // Get last 7 days occupancy data
  const last7Days = MOCK_OCCUPANCY_STATS.slice(-7)

  const getStatusBadge = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return <Badge variant="success" size="sm">Available</Badge>
      case 'occupied':
        return <Badge variant="error" size="sm">Occupied</Badge>
      case 'cleaning':
        return <Badge variant="warning" size="sm">Cleaning</Badge>
      case 'maintenance':
        return <Badge variant="info" size="sm">Maintenance</Badge>
      case 'blocked':
        return <Badge variant="default" size="sm">Blocked</Badge>
    }
  }

  const getBookingStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="info" size="sm">Confirmed</Badge>
      case 'checked-in':
        return <Badge variant="success" size="sm">Checked In</Badge>
      case 'checked-out':
        return <Badge variant="default" size="sm">Checked Out</Badge>
      case 'cancelled':
        return <Badge variant="error" size="sm">Cancelled</Badge>
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>
    }
  }

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Back Navigation */}
      <div className="mb-2">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Hospitality Management
          </h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            Manage rooms, bookings, guests, and hotel operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/hospitality/guests')}
            className="px-3 py-2 text-[13px] font-medium border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Guests</span>
          </button>
          <button
            onClick={() => router.push('/hospitality/bookings/create')}
            className="px-3 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {occupancyRate}%
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Occupancy Rate
          </div>
          <div className="text-[12px] text-green-600 dark:text-green-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +8% vs last week
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {formatCurrency(todayRevenue)}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Today's Revenue
          </div>
          <div className="text-[12px] text-green-600 dark:text-green-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12.5% vs last month
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <Bed className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {activeBookings}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
            Active Bookings
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {availableRooms}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Rooms Available
          </div>
          <div className="text-[12px] text-gray-600 dark:text-gray-400">
            {totalRooms} total
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => router.push('/hospitality/bookings/create')}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/20 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors text-left"
              >
                <div className="w-9 h-9 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                    New Booking
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Create a new reservation
                  </p>
                </div>
              </button>

              <button
                onClick={() => router.push('/hospitality/rooms')}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/20 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors text-left"
              >
                <div className="w-9 h-9 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Bed className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                    Manage Rooms
                  </p>
                  <p className="text-[12px] text-gray-500">
                    View and update room status
                  </p>
                </div>
              </button>

              <button
                onClick={() => router.push('/hospitality/guests')}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/20 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors text-left"
              >
                <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                    Guest Directory
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Manage guest profiles
                  </p>
                </div>
              </button>

              <button
                onClick={() => router.push('/hospitality/housekeeping')}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/20 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors text-left"
              >
                <div className="w-9 h-9 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                    Housekeeping
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Track cleaning tasks
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Room Status Breakdown */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                Room Status Breakdown
              </h2>
              <button
                onClick={() => router.push('/hospitality/rooms')}
                className="text-[13px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1"
              >
                <span>View All Rooms</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    <span className="text-[13px] font-medium text-gray-900 dark:text-white">
                      Available
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-gray-900 dark:text-white tabular-nums">
                    {availableRooms} rooms
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-green-600"
                    style={{ width: `${(availableRooms / totalRooms) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                    <span className="text-[13px] font-medium text-gray-900 dark:text-white">
                      Occupied
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-gray-900 dark:text-white tabular-nums">
                    {occupiedRooms} rooms
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-red-600"
                    style={{ width: `${(occupiedRooms / totalRooms) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-600" />
                    <span className="text-[13px] font-medium text-gray-900 dark:text-white">
                      Cleaning
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-gray-900 dark:text-white tabular-nums">
                    {cleaningRooms} rooms
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-orange-600"
                    style={{ width: `${(cleaningRooms / totalRooms) * 100}%` }}
                  />
                </div>
              </div>

              {maintenanceRooms > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="text-[13px] font-medium text-gray-900 dark:text-white">
                        Maintenance
                      </span>
                    </div>
                    <span className="text-[12px] font-semibold text-gray-900 dark:text-white tabular-nums">
                      {maintenanceRooms} room{maintenanceRooms > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-blue-600"
                      style={{ width: `${(maintenanceRooms / totalRooms) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Today's Arrivals */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                Today's Arrivals ({todayCheckIns.length})
              </h2>
              <button
                onClick={() => router.push('/hospitality/bookings')}
                className="text-[13px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
              >
                View All Bookings
              </button>
            </div>

            <div className="space-y-2">
              {todayCheckIns.length === 0 ? (
                <div className="text-center py-6">
                  <Calendar className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-[13px] text-gray-500">No arrivals scheduled for today</p>
                </div>
              ) : (
                todayCheckIns.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/20 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors cursor-pointer"
                    onClick={() => router.push(`/hospitality/bookings/${booking.id}`)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] font-semibold text-gray-900 dark:text-white">
                          {booking.guest?.firstName} {booking.guest?.lastName}
                        </p>
                        <p className="text-[12px] text-gray-500">
                          Room {booking.room?.roomNumber} • {booking.totalNights} night{booking.totalNights > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getBookingStatusBadge(booking.status)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-5">
          {/* Today's Departures */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
              Today's Departures ({todayCheckOuts.length})
            </h2>
            <div className="space-y-2">
              {todayCheckOuts.length === 0 ? (
                <div className="text-center py-4">
                  <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-[12px] text-gray-500">
                    No departures today
                  </p>
                </div>
              ) : (
                todayCheckOuts.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-2.5 bg-gray-50 dark:bg-gray-700/20 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/40 transition-colors"
                    onClick={() => router.push(`/hospitality/bookings/${booking.id}/check-out`)}
                  >
                    <p className="text-[13px] font-medium text-gray-900 dark:text-white mb-0.5">
                      Room {booking.room?.roomNumber}
                    </p>
                    <p className="text-[12px] text-gray-500">
                      {booking.guest?.firstName} {booking.guest?.lastName}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
              Alerts & Reminders
            </h2>
            <div className="space-y-2">
              {cleaningRooms > 0 && (
                <div className="flex gap-2 p-2.5 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-500/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                  <div className="text-[12px]">
                    <p className="font-medium text-orange-900 dark:text-orange-200 mb-0.5">
                      {cleaningRooms} Room{cleaningRooms > 1 ? 's' : ''} Being Cleaned
                    </p>
                    <p className="text-orange-700 dark:text-orange-300/80">
                      Cleaning in progress
                    </p>
                  </div>
                </div>
              )}

              {maintenanceRooms > 0 && (
                <div className="flex gap-2 p-2.5 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-[12px]">
                    <p className="font-medium text-red-900 dark:text-red-200 mb-0.5">
                      Room Maintenance Required
                    </p>
                    <p className="text-red-700 dark:text-red-300/80">
                      {maintenanceRooms} room{maintenanceRooms > 1 ? 's' : ''} under maintenance
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 p-2.5 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/20 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-[12px]">
                  <p className="font-medium text-green-900 dark:text-green-200 mb-0.5">
                    High Occupancy
                  </p>
                  <p className="text-green-700 dark:text-green-300/80">
                    {occupancyRate}% occupancy rate today
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* This Week Summary */}
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
              Last 7 Days
            </h2>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[12px] text-gray-500">Avg Occupancy</span>
                <span className="text-[13px] font-semibold text-gray-900 dark:text-white tabular-nums">
                  {Math.round(
                    last7Days.reduce((sum, day) => sum + day.occupancyRate, 0) / last7Days.length
                  )}%
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[12px] text-gray-500">Total Revenue</span>
                <span className="text-[13px] font-semibold text-gray-900 dark:text-white tabular-nums">
                  {formatCurrency(last7Days.reduce((sum, day) => sum + day.revenue, 0))}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[12px] text-gray-500">Avg Daily Rate</span>
                <span className="text-[13px] font-semibold text-gray-900 dark:text-white tabular-nums">
                  {formatCurrency(
                    last7Days.reduce((sum, day) => sum + day.averageDailyRate, 0) / last7Days.length
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageLayout>
  )
}
