'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Edit,
  Calendar,
  User,
  Bed,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  LogIn,
  LogOut,
  AlertCircle,
  Mail,
  Phone,
  Users,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Modal from '@/components/ui/modal'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getPopulatedBookings } from '@/lib/mock-data/hospitality'
import type { BookingStatus, ServiceCharge } from '@/types/hospitality'

interface BookingDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { showToast } = useToast()

  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showAddChargeModal, setShowAddChargeModal] = useState(false)
  const [chargeDescription, setChargeDescription] = useState('')
  const [chargeAmount, setChargeAmount] = useState('')

  // Find the booking by ID
  const allBookings = getPopulatedBookings()
  const booking = allBookings.find((b) => b.id === resolvedParams.id)

  if (!booking) {
    return (
      <PageLayout maxWidth="normal">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Booking Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The booking you're looking for doesn't exist.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push('/hospitality/bookings')}
          >
            Back to Bookings
          </Button>
        </div>
      </PageLayout>
    )
  }

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning" size="md">Pending</Badge>
      case 'confirmed':
        return <Badge variant="info" size="md">Confirmed</Badge>
      case 'checked-in':
        return <Badge variant="success" size="md">Checked In</Badge>
      case 'checked-out':
        return <Badge variant="default" size="md">Checked Out</Badge>
      case 'cancelled':
        return <Badge variant="error" size="md">Cancelled</Badge>
    }
  }

  const handleCancelBooking = () => {
    console.log('Cancelling booking:', booking.id)
    setShowCancelModal(false)
    showToast({
      type: 'success',
      title: 'Booking Cancelled',
      message: `Booking ${booking.bookingReference} has been cancelled.`,
    })
    router.push('/hospitality/bookings')
  }

  const handleAddCharge = () => {
    if (!chargeDescription || !chargeAmount) {
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Please fill in all fields',
      })
      return
    }

    console.log('Adding charge:', { description: chargeDescription, amount: chargeAmount })
    setShowAddChargeModal(false)
    setChargeDescription('')
    setChargeAmount('')
    showToast({
      type: 'success',
      title: 'Charge Added',
      message: 'Additional charge has been added to the booking.',
    })
  }

  const canCheckIn = booking.status === 'confirmed'
  const canCheckOut = booking.status === 'checked-in'
  const canCancel = booking.status === 'confirmed' || booking.status === 'pending'

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
        Back to Bookings
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {booking.bookingReference}
              </h1>
              {getStatusBadge(booking.status)}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Created on {formatDate(new Date(booking.createdAt))}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {canCheckIn && (
              <Button
                variant="primary"
                size="md"
                icon={<LogIn className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => router.push(`/hospitality/bookings/${booking.id}/check-in`)}
              >
                Check In
              </Button>
            )}
            {canCheckOut && (
              <Button
                variant="primary"
                size="md"
                icon={<LogOut className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => router.push(`/hospitality/bookings/${booking.id}/check-out`)}
              >
                Check Out
              </Button>
            )}
            {canCancel && (
              <Button
                variant="outline"
                size="md"
                icon={<XCircle className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => setShowCancelModal(true)}
              >
                Cancel Booking
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Guest Information */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Guest Information
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/hospitality/guests/${booking.guestId}`)}
              >
                View Profile
              </Button>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-primary-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {booking.guest?.firstName} {booking.guest?.lastName}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{booking.guest?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{booking.guest?.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Guest Code: {booking.guest?.guestCode}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">
                      {booking.numberOfGuests.adults} Adults, {booking.numberOfGuests.children} Children
                    </span>
                  </div>
                </div>
                {booking.guest?.guestType === 'vip' && (
                  <div className="mt-3">
                    <Badge variant="warning" size="sm">VIP Guest</Badge>
                  </div>
                )}
              </div>
            </div>

            {booking.specialRequests && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Special Requests
                </h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {booking.specialRequests}
                </p>
              </div>
            )}
          </Card>

          {/* Room Information */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Room Information
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/hospitality/rooms/${booking.roomId}`)}
              >
                View Room
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <Bed className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Room Number</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {booking.room?.roomNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Bed className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Room Type</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                    {booking.room?.type}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Bed className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Floor</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Floor {booking.room?.floor}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center flex-shrink-0">
                  <Bed className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bed Configuration</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {booking.room?.bedConfiguration}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Booking Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Booking Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-success" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Check-in Date</p>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatDate(new Date(booking.checkInDate))}
                </p>
                {booking.actualCheckIn && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Checked in: {formatDate(new Date(booking.actualCheckIn))}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-error" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Check-out Date</p>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatDate(new Date(booking.checkOutDate))}
                </p>
                {booking.actualCheckOut && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Checked out: {formatDate(new Date(booking.actualCheckOut))}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary-500" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Nights</p>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {booking.totalNights} {booking.totalNights === 1 ? 'night' : 'nights'}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-warning" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Room Rate</p>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(booking.roomRate)}/night
                </p>
              </div>
            </div>
          </Card>

          {/* Additional Charges */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Additional Charges
              </h2>
              {booking.status === 'checked-in' && (
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => setShowAddChargeModal(true)}
                >
                  Add Charge
                </Button>
              )}
            </div>

            {booking.additionalCharges && booking.additionalCharges.length > 0 ? (
              <div className="space-y-3">
                {booking.additionalCharges.map((charge) => (
                  <div
                    key={charge.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {charge.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                        {charge.serviceType} • {formatDate(new Date(charge.chargedAt))}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(charge.totalAmount)}
                      </p>
                      {charge.quantity > 1 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          {charge.quantity} × {formatCurrency(charge.unitPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-dark-bg rounded-lg">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  No additional charges
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Breakdown */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Pricing Breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Room ({booking.totalNights} nights)
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(booking.subtotal)}
                </span>
              </div>

              {booking.additionalCharges && booking.additionalCharges.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Additional Charges
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(
                      booking.additionalCharges.reduce((sum, c) => sum + c.totalAmount, 0)
                    )}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tax</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(booking.taxAmount)}
                </span>
              </div>

              {booking.discountAmount > 0 && (
                <div className="flex items-center justify-between text-success">
                  <span className="text-sm">Discount</span>
                  <span className="font-medium">
                    -{formatCurrency(booking.discountAmount)}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Amount
                  </span>
                  <span className="text-lg font-bold text-primary-500">
                    {formatCurrency(booking.totalAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Deposit Paid</span>
                  <span className="font-medium text-success">
                    {formatCurrency(booking.depositAmount)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Balance Due
                  </span>
                  <span className={`font-bold ${booking.balanceDue > 0 ? 'text-warning' : 'text-success'}`}>
                    {formatCurrency(booking.balanceDue)}
                  </span>
                </div>
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
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router.push(`/hospitality/guests/${booking.guestId}`)}
              >
                View Guest Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => router.push(`/hospitality/rooms/${booking.roomId}`)}
              >
                View Room Details
              </Button>
              {booking.status === 'checked-in' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push('/hospitality/services')}
                >
                  Add Service Charge
                </Button>
              )}
            </div>
          </Card>

          {/* Booking Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Timeline
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Booking Created
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    {formatDate(new Date(booking.createdAt))}
                  </p>
                </div>
              </div>

              {booking.actualCheckIn && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <LogIn className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Checked In
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {formatDate(new Date(booking.actualCheckIn))}
                    </p>
                  </div>
                </div>
              )}

              {booking.actualCheckOut && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <LogOut className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Checked Out
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {formatDate(new Date(booking.actualCheckOut))}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Cancel Booking Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Booking"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Are you sure you want to cancel booking {booking.bookingReference}? This action cannot be undone.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowCancelModal(false)}
              className="flex-1"
            >
              Keep Booking
            </Button>
            <Button
              variant="danger"
              size="md"
              onClick={handleCancelBooking}
              className="flex-1"
            >
              Cancel Booking
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Charge Modal */}
      <Modal
        isOpen={showAddChargeModal}
        onClose={() => setShowAddChargeModal(false)}
        title="Add Additional Charge"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Description"
            placeholder="e.g., Room Service, Mini Bar"
            value={chargeDescription}
            onChange={(e) => setChargeDescription(e.target.value)}
          />

          <Input
            label="Amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={chargeAmount}
            onChange={(e) => setChargeAmount(e.target.value)}
            icon={<DollarSign className="w-5 h-5" />}
            iconPosition="left"
          />

          <div className="flex items-center gap-3 pt-4">
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowAddChargeModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleAddCharge}
              className="flex-1"
            >
              Add Charge
            </Button>
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
