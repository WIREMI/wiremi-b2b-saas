'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Edit,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Calendar,
  Plus,
  DollarSign,
  Bed,
  Star,
  AlertCircle,
  Heart,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { MOCK_GUESTS, getPopulatedBookings } from '@/lib/mock-data/hospitality'
import type { GuestType } from '@/types/hospitality'

interface GuestDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function GuestDetailsPage({ params }: GuestDetailsPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()

  // Find the guest by ID
  const guest = MOCK_GUESTS.find((g) => g.id === resolvedParams.id)

  if (!guest) {
    return (
      <PageLayout maxWidth="normal">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Guest Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The guest you're looking for doesn't exist.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push('/hospitality/guests')}
          >
            Back to Guests
          </Button>
        </div>
      </PageLayout>
    )
  }

  // Get bookings for this guest
  const allBookings = getPopulatedBookings()
  const guestBookings = allBookings
    .filter((b) => b.guestId === guest.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const getGuestTypeBadge = (type: GuestType) => {
    switch (type) {
      case 'regular':
        return <Badge variant="default" size="md">Regular</Badge>
      case 'vip':
        return <Badge variant="warning" size="md">VIP</Badge>
      case 'corporate':
        return <Badge variant="info" size="md">Corporate</Badge>
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

  // Calculate average booking value
  const avgBookingValue = guest.totalBookings > 0 ? guest.totalSpent / guest.totalBookings : 0

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
        Back to Guests
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-primary-500" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {guest.firstName} {guest.lastName}
                </h1>
                {getGuestTypeBadge(guest.guestType)}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Guest Code: {guest.guestCode}
              </p>
              {guest.lastVisit && (
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                  Last visit: {formatDate(new Date(guest.lastVisit))}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Edit className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push(`/hospitality/guests/${guest.id}/edit`)}
            >
              Edit Profile
            </Button>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {guest.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {guest.phone}
                  </p>
                </div>
              </div>

              {guest.address && (
                <div className="flex items-start gap-4 sm:col-span-2">
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {guest.address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Personal Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Personal Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nationality</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {guest.nationality}
                  </p>
                </div>
              </div>

              {guest.dateOfBirth && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-error" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Date of Birth</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatDate(new Date(guest.dateOfBirth))}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ID Type</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                    {guest.idType.replace('-', ' ')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ID Number</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {guest.idNumber}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Preferences */}
          {guest.preferences && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-5 h-5 text-primary-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Guest Preferences
                </h2>
              </div>

              <div className="space-y-4">
                {guest.preferences.roomType && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Preferred Room Type</span>
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {guest.preferences.roomType}
                    </span>
                  </div>
                )}

                {guest.preferences.floorPreference && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Floor Preference</span>
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {guest.preferences.floorPreference === 'low' ? 'Lower Floors' : 'Higher Floors'}
                    </span>
                  </div>
                )}

                {guest.preferences.specialNotes && (
                  <div className="p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Special Notes</p>
                    <p className="text-gray-900 dark:text-white leading-relaxed">
                      {guest.preferences.specialNotes}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Booking History */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Booking History
            </h2>

            {guestBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Booking Ref
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Room
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
                    {guestBookings.slice(0, 10).map((booking) => (
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
                            Room {booking.room?.roomNumber}
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
              <div className="text-center py-8 bg-gray-50 dark:bg-dark-bg rounded-lg">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  No booking history
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
              Guest Statistics
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {guest.totalBookings}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(guest.totalSpent)}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Booking</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(avgBookingValue)}
                </p>
              </div>

              {guest.lastVisit && (
                <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Visit</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatDate(new Date(guest.lastVisit))}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Member Since</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatDate(new Date(guest.createdAt))}
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>

            <div className="space-y-2">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => router.push('/hospitality/bookings/create')}
              >
                Create New Booking
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router.push(`/hospitality/guests/${guest.id}/edit`)}
              >
                Edit Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router.push('/hospitality/bookings')}
              >
                View All Bookings
              </Button>
            </div>
          </Card>

          {/* VIP Status */}
          {guest.guestType === 'vip' && (
            <Card className="p-6 bg-warning/5 border-2 border-warning/20">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-warning" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  VIP Guest
                </h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                This guest is marked as VIP. Ensure premium service and special attention.
              </p>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
