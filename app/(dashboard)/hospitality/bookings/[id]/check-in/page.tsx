'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  LogIn,
  CheckCircle2,
  User,
  Bed,
  Calendar,
  CreditCard,
  FileText,
  AlertCircle,
  Clock,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import { useToast } from '@/hooks/useToast'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getPopulatedBookings } from '@/lib/mock-data/hospitality'

interface CheckInPageProps {
  params: Promise<{ id: string }>
}

export default function CheckInPage({ params }: CheckInPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { showToast } = useToast()

  const [idVerified, setIdVerified] = useState(false)
  const [depositCollected, setDepositCollected] = useState(false)
  const [keysIssued, setKeysIssued] = useState(false)
  const [guestSignature, setGuestSignature] = useState(false)

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

  if (booking.status !== 'confirmed') {
    return (
      <PageLayout maxWidth="normal">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-warning mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Cannot Check In
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This booking cannot be checked in. Current status: {booking.status}
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push(`/hospitality/bookings/${booking.id}`)}
          >
            Back to Booking
          </Button>
        </div>
      </PageLayout>
    )
  }

  const handleCheckIn = () => {
    if (!idVerified || !depositCollected || !keysIssued || !guestSignature) {
      showToast({
        type: 'error',
        title: 'Incomplete Check-in',
        message: 'Please complete all check-in steps before proceeding.',
      })
      return
    }

    console.log('Checking in booking:', booking.id)

    showToast({
      type: 'success',
      title: 'Check-in Successful',
      message: `${booking.guest?.firstName} ${booking.guest?.lastName} has been checked in to Room ${booking.room?.roomNumber}.`,
    })

    router.push(`/hospitality/bookings/${booking.id}`)
  }

  const allStepsComplete = idVerified && depositCollected && keysIssued && guestSignature

  return (
    <PageLayout maxWidth="normal">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        icon={<ArrowLeft className="w-4 h-4" />}
        iconPosition="left"
        onClick={() => router.back()}
        className="mb-6"
      >
        Back to Booking
      </Button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-2xl mb-4">
          <LogIn className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Guest Check-in
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Booking Reference: {booking.bookingReference}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Booking Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Booking Summary
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Guest</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {booking.guest?.firstName} {booking.guest?.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    {booking.guest?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Bed className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Room</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Room {booking.room?.roomNumber}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Floor {booking.room?.floor} • {booking.room?.type}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check-in Date</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatDate(new Date(booking.checkInDate))}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Check-out Date</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatDate(new Date(booking.checkOutDate))}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-error" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {booking.totalNights} {booking.totalNights === 1 ? 'Night' : 'Nights'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Guests</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {booking.numberOfGuests.adults} Adults, {booking.numberOfGuests.children} Children
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Check-in Checklist */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Check-in Checklist
            </h2>

            <div className="space-y-4">
              {/* ID Verification */}
              <div
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  idVerified
                    ? 'border-success bg-success/5'
                    : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300'
                }`}
                onClick={() => setIdVerified(!idVerified)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      idVerified
                        ? 'border-success bg-success'
                        : 'border-gray-300 dark:border-dark-border'
                    }`}
                  >
                    {idVerified && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Verify Guest ID
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Check and verify the guest's identification document (passport, ID card, driver's license)
                    </p>
                    <div className="mt-3 bg-gray-50 dark:bg-dark-bg rounded-lg p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Guest Information:</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ID Type: {booking.guest?.idType || 'Not specified'}
                      </p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        ID Number: {booking.guest?.idNumber || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deposit Collection */}
              <div
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  depositCollected
                    ? 'border-success bg-success/5'
                    : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300'
                }`}
                onClick={() => setDepositCollected(!depositCollected)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      depositCollected
                        ? 'border-success bg-success'
                        : 'border-gray-300 dark:border-dark-border'
                    }`}
                  >
                    {depositCollected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Collect Deposit / Outstanding Payment
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Verify deposit payment or collect any outstanding balance
                    </p>
                    <div className="mt-3 bg-gray-50 dark:bg-dark-bg rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Total Amount:</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(booking.totalAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Deposit Paid:</span>
                        <span className="text-sm font-medium text-success">
                          {formatCurrency(booking.depositAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-dark-border">
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">Balance Due:</span>
                        <span className="text-sm font-bold text-warning">
                          {formatCurrency(booking.balanceDue)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Key */}
              <div
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  keysIssued
                    ? 'border-success bg-success/5'
                    : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300'
                }`}
                onClick={() => setKeysIssued(!keysIssued)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      keysIssued
                        ? 'border-success bg-success'
                        : 'border-gray-300 dark:border-dark-border'
                    }`}
                  >
                    {keysIssued && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Issue Room Keys
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Provide room keys or key cards to the guest
                    </p>
                    <div className="mt-3 bg-gray-50 dark:bg-dark-bg rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Room {booking.room?.roomNumber} • Floor {booking.room?.floor}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                        Number of keys to issue: 2
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guest Signature */}
              <div
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  guestSignature
                    ? 'border-success bg-success/5'
                    : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300'
                }`}
                onClick={() => setGuestSignature(!guestSignature)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      guestSignature
                        ? 'border-success bg-success'
                        : 'border-gray-300 dark:border-dark-border'
                    }`}
                  >
                    {guestSignature && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Guest Signature
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Obtain guest signature on registration form and terms & conditions
                    </p>
                    <div className="mt-3 border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-8 bg-gray-50 dark:bg-dark-bg">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-center text-gray-500 dark:text-gray-400 dark:text-gray-400">
                        Digital signature pad placeholder
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Special Requests */}
          {booking.specialRequests && (
            <Card className="p-6 border-2 border-warning/20 bg-warning/5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Special Requests
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {booking.specialRequests}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Check-in Progress
            </h3>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Completion</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {[idVerified, depositCollected, keysIssued, guestSignature].filter(Boolean).length} / 4
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                <div
                  className="bg-success h-2 rounded-full transition-all"
                  style={{
                    width: `${([idVerified, depositCollected, keysIssued, guestSignature].filter(Boolean).length / 4) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${idVerified ? 'bg-success' : 'bg-gray-300 dark:bg-dark-border'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">ID Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${depositCollected ? 'bg-success' : 'bg-gray-300 dark:bg-dark-border'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">Deposit Collection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${keysIssued ? 'bg-success' : 'bg-gray-300 dark:bg-dark-border'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">Keys Issued</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${guestSignature ? 'bg-success' : 'bg-gray-300 dark:bg-dark-border'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">Guest Signature</span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              icon={<LogIn className="w-5 h-5" />}
              iconPosition="left"
              onClick={handleCheckIn}
              disabled={!allStepsComplete}
            >
              Complete Check-in
            </Button>

            {!allStepsComplete && (
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-3">
                Complete all checklist items to proceed
              </p>
            )}

            <Button
              variant="outline"
              size="md"
              className="w-full mt-3"
              onClick={() => router.push(`/hospitality/bookings/${booking.id}`)}
            >
              Cancel
            </Button>
          </Card>

          {/* Guest Info */}
          {booking.guest?.guestType === 'vip' && (
            <Card className="p-6 border-2 border-warning/20 bg-warning/5">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="warning" size="sm">VIP Guest</Badge>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                This is a VIP guest. Ensure premium service and amenities are provided.
              </p>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
