'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Edit,
  MoreVertical,
  Bed,
  Users,
  DollarSign,
  Home,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Wifi,
  Tv,
  Wind,
  Coffee,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  ParkingSquare,
  Clock,
  Wrench,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Modal from '@/components/ui/modal'
import { formatCurrency, formatDate } from '@/lib/utils'
import { MOCK_ROOMS, MOCK_BOOKINGS, getPopulatedBookings } from '@/lib/mock-data/hospitality'
import type { Room, RoomStatus } from '@/types/hospitality'

interface RoomDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function RoomDetailsPage({ params }: RoomDetailsPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()

  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<RoomStatus>('available')

  // Find the room by ID
  const room = MOCK_ROOMS.find((r) => r.id === resolvedParams.id)

  if (!room) {
    return (
      <PageLayout maxWidth="normal">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Room Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The room you're looking for doesn't exist.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push('/hospitality/rooms')}
          >
            Back to Rooms
          </Button>
        </div>
      </PageLayout>
    )
  }

  // Get bookings for this room
  const populatedBookings = getPopulatedBookings()
  const roomBookings = populatedBookings
    .filter((b) => b.roomId === room.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Get current booking if room is occupied
  const currentBooking = room.status === 'occupied'
    ? roomBookings.find((b) => b.status === 'checked-in')
    : null

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case 'available':
        return <Badge variant="success" size="md">Available</Badge>
      case 'occupied':
        return <Badge variant="error" size="md">Occupied</Badge>
      case 'cleaning':
        return <Badge variant="warning" size="md">Cleaning</Badge>
      case 'maintenance':
        return <Badge variant="info" size="md">Maintenance</Badge>
      case 'blocked':
        return <Badge variant="default" size="md">Blocked</Badge>
    }
  }

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="info" size="sm">Confirmed</Badge>
      case 'checked-in':
        return <Badge variant="success" size="sm">Checked In</Badge>
      case 'checked-out':
        return <Badge variant="default" size="sm">Checked Out</Badge>
      case 'cancelled':
        return <Badge variant="error" size="sm">Cancelled</Badge>
      default:
        return <Badge variant="default" size="sm">{status}</Badge>
    }
  }

  const getRoomTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const amenityIcons: Record<string, any> = {
    wifi: Wifi,
    tv: Tv,
    ac: Wind,
    'mini-bar': Coffee,
    'room-service': UtensilsCrossed,
    bathtub: Waves,
    'gym-access': Dumbbell,
    parking: ParkingSquare,
  }

  const amenityLabels: Record<string, string> = {
    wifi: 'WiFi',
    tv: 'Smart TV',
    ac: 'Air Conditioning',
    'mini-bar': 'Mini Bar',
    'room-service': 'Room Service',
    bathtub: 'Bathtub',
    'gym-access': 'Gym Access',
    parking: 'Parking',
  }

  const handleUpdateStatus = () => {
    // Here you would normally update via API
    console.log('Updating room status to:', selectedStatus)
    setShowStatusModal(false)
    // In a real app, you'd update the room status and refetch data
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        icon={<ArrowLeft className="w-4 h-4" />}
        iconPosition="left"
        onClick={() => router.back()}
        className="mb-6"
      >
        Back to Rooms
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Room {room.roomNumber}
              </h1>
              {getStatusBadge(room.status)}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {getRoomTypeLabel(room.type)} • Floor {room.floor} • {room.bedConfiguration}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Edit className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push(`/hospitality/rooms/${room.id}/edit`)}
            >
              Edit Room
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowStatusModal(true)}
            >
              Update Status
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Room Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Room Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Home className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Room Size</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {room.sizeSqm} sqm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {room.capacity.adults} Adults, {room.capacity.children} Children
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Bed className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bed Configuration</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {room.bedConfiguration}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-error" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Base Rate</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(room.basePrice)}/night
                  </p>
                </div>
              </div>
            </div>

            {room.description && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {room.description}
                </p>
              </div>
            )}
          </Card>

          {/* Amenities */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Amenities
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {room.amenities.map((amenityId) => {
                const AmenityIcon = amenityIcons[amenityId] || CheckCircle2
                const label = amenityLabels[amenityId] || amenityId

                return (
                  <div
                    key={amenityId}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-bg"
                  >
                    <AmenityIcon className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>

            {room.amenities.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 text-center py-4">
                No amenities listed for this room
              </p>
            )}
          </Card>

          {/* Current Booking */}
          {currentBooking && (
            <Card className="p-6 border-2 border-error">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Current Booking
                </h2>
                {getBookingStatusBadge(currentBooking.status)}
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Guest</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {currentBooking.guest?.firstName} {currentBooking.guest?.lastName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Booking Reference</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {currentBooking.bookingReference}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Check-in</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(new Date(currentBooking.checkInDate))}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Check-out</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(new Date(currentBooking.checkOutDate))}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push(`/hospitality/bookings/${currentBooking.id}`)}
                >
                  View Booking Details
                </Button>
              </div>
            </Card>
          )}

          {/* Booking History */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Booking History
            </h2>

            {roomBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Booking Ref
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Guest
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Dates
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                    {roomBookings.slice(0, 10).map((booking) => (
                      <tr
                        key={booking.id}
                        className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors cursor-pointer"
                        onClick={() => router.push(`/hospitality/bookings/${booking.id}`)}
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {booking.bookingReference}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {booking.guest?.firstName} {booking.guest?.lastName}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {formatDate(new Date(booking.checkInDate))} - {formatDate(new Date(booking.checkOutDate))}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          {getBookingStatusBadge(booking.status)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(booking.totalAmount)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  No booking history for this room
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Stats
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {roomBookings.length}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(
                    roomBookings
                      .filter((b) => b.status !== 'cancelled')
                      .reduce((sum, b) => sum + b.totalAmount, 0)
                  )}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(room.basePrice)}
                </p>
              </div>
            </div>
          </Card>

          {/* Maintenance Info */}
          {room.lastCleaned && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Maintenance
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Last Cleaned</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(new Date(room.lastCleaned))}
                    </p>
                  </div>
                </div>

                {room.nextMaintenance && (
                  <div className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Next Maintenance</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDate(new Date(room.nextMaintenance))}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Update Status Modal */}
      <Modal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        title="Update Room Status"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Select the new status for Room {room.roomNumber}
          </p>

          <div className="space-y-2">
            {(['available', 'occupied', 'cleaning', 'maintenance', 'blocked'] as RoomStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedStatus === status
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                    : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {status}
                  </span>
                  {getStatusBadge(status)}
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowStatusModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleUpdateStatus}
              className="flex-1"
            >
              Update Status
            </Button>
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
