'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  LogOut,
  CheckCircle2,
  User,
  Bed,
  Calendar,
  DollarSign,
  FileText,
  AlertCircle,
  Download,
  CreditCard,
  Banknote,
  Building2,
  Smartphone,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getPopulatedBookings } from '@/lib/mock-data/hospitality'

interface CheckOutPageProps {
  params: Promise<{ id: string }>
}

export default function CheckOutPage({ params }: CheckOutPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { showToast } = useToast()

  const [paymentMethod, setPaymentMethod] = useState('card')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [roomInspected, setRoomInspected] = useState(false)
  const [keysReturned, setKeysReturned] = useState(false)
  const [paymentReceived, setPaymentReceived] = useState(false)

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

  if (booking.status !== 'checked-in') {
    return (
      <PageLayout maxWidth="normal">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-warning mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Cannot Check Out
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This booking cannot be checked out. Current status: {booking.status}
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

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { value: 'cash', label: 'Cash', icon: Banknote },
    { value: 'bank-transfer', label: 'Bank Transfer', icon: Building2 },
    { value: 'mobile-money', label: 'Mobile Money', icon: Smartphone },
  ]

  // Calculate additional charges
  const additionalChargesTotal = booking.additionalCharges
    ? booking.additionalCharges.reduce((sum, charge) => sum + charge.totalAmount, 0)
    : 0

  const grandTotal = booking.totalAmount + additionalChargesTotal
  const totalPaid = booking.depositAmount
  const balanceDue = grandTotal - totalPaid

  const handleCheckOut = () => {
    if (!roomInspected || !keysReturned || !paymentReceived) {
      showToast({
        type: 'error',
        title: 'Incomplete Check-out',
        message: 'Please complete all check-out steps before proceeding.',
      })
      return
    }

    if (balanceDue > 0 && (!paymentAmount || parseFloat(paymentAmount) < balanceDue)) {
      showToast({
        type: 'error',
        title: 'Payment Required',
        message: `Please collect the full balance due: ${formatCurrency(balanceDue)}`,
      })
      return
    }

    console.log('Checking out booking:', booking.id)

    showToast({
      type: 'success',
      title: 'Check-out Successful',
      message: `${booking.guest?.firstName} ${booking.guest?.lastName} has been checked out from Room ${booking.room?.roomNumber}.`,
    })

    router.push(`/hospitality/bookings/${booking.id}`)
  }

  const handleGenerateInvoice = () => {
    console.log('Generating invoice for booking:', booking.id)
    showToast({
      type: 'success',
      title: 'Invoice Generated',
      message: 'Invoice has been generated and is ready for download.',
    })
  }

  const allStepsComplete = roomInspected && keysReturned && paymentReceived

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
        Back to Booking
      </Button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
          <LogOut className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Guest Check-out & Billing
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Booking Reference: {booking.bookingReference}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Guest Folio / Bill */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Guest Folio
              </h2>
              <Button
                variant="outline"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
                onClick={handleGenerateInvoice}
              >
                Generate Invoice
              </Button>
            </div>

            {/* Guest & Room Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-dark-border">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Guest</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {booking.guest?.firstName} {booking.guest?.lastName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">{booking.guest?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Room</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  Room {booking.room?.roomNumber}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  Floor {booking.room?.floor} • {booking.room?.type}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Check-in</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDate(new Date(booking.checkInDate))}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Check-out</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDate(new Date(booking.checkOutDate))}
                </p>
              </div>
            </div>

            {/* Itemized Charges */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Itemized Charges
              </h3>

              {/* Room Charges */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Room Charges</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    {booking.totalNights} nights × {formatCurrency(booking.roomRate)}
                  </p>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(booking.subtotal)}
                </p>
              </div>

              {/* Additional Charges */}
              {booking.additionalCharges && booking.additionalCharges.length > 0 && (
                <>
                  <div className="pt-3 border-t border-gray-200 dark:border-dark-border">
                    <p className="font-medium text-gray-900 dark:text-white mb-3">
                      Additional Services
                    </p>
                  </div>
                  {booking.additionalCharges.map((charge) => (
                    <div key={charge.id} className="flex items-center justify-between py-2 pl-4">
                      <div>
                        <p className="text-gray-900 dark:text-white">{charge.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          {charge.serviceType} • {formatDate(new Date(charge.chargedAt))}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(charge.totalAmount)}
                      </p>
                    </div>
                  ))}
                </>
              )}

              {/* Subtotal */}
              <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-dark-border">
                <p className="font-medium text-gray-900 dark:text-white">Subtotal</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(booking.subtotal + additionalChargesTotal)}
                </p>
              </div>

              {/* Tax */}
              <div className="flex items-center justify-between py-2">
                <p className="text-gray-600 dark:text-gray-400">Tax (10%)</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(booking.taxAmount)}
                </p>
              </div>

              {/* Discount */}
              {booking.discountAmount > 0 && (
                <div className="flex items-center justify-between py-2 text-success">
                  <p>Discount</p>
                  <p className="font-medium">-{formatCurrency(booking.discountAmount)}</p>
                </div>
              )}

              {/* Grand Total */}
              <div className="flex items-center justify-between py-4 border-t-2 border-gray-300 dark:border-dark-border">
                <p className="text-xl font-bold text-gray-900 dark:text-white">Grand Total</p>
                <p className="text-xl font-bold text-primary-500">
                  {formatCurrency(grandTotal)}
                </p>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Deposit Paid</p>
                  <p className="font-medium text-success">
                    -{formatCurrency(totalPaid)}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-dark-border">
                  <p className="font-semibold text-gray-900 dark:text-white">Balance Due</p>
                  <p className={`text-lg font-bold ${balanceDue > 0 ? 'text-warning' : 'text-success'}`}>
                    {formatCurrency(balanceDue)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Collection */}
          {balanceDue > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Collect Payment
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => {
                      const MethodIcon = method.icon
                      return (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => setPaymentMethod(method.value)}
                          className={`w-full p-3 rounded-lg border-2 text-left transition-all flex items-center gap-3 ${
                            paymentMethod === method.value
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                              : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300'
                          }`}
                        >
                          <MethodIcon className={`w-5 h-5 ${paymentMethod === method.value ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} />
                          <span className={`font-medium ${paymentMethod === method.value ? 'text-primary-500' : 'text-gray-900 dark:text-white'}`}>
                            {method.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <Input
                  label="Payment Amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder={balanceDue.toFixed(2)}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  icon={<DollarSign className="w-5 h-5" />}
                  iconPosition="left"
                  helperText={`Balance due: ${formatCurrency(balanceDue)}`}
                />
              </div>
            </Card>
          )}

          {/* Check-out Checklist */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Check-out Checklist
            </h2>

            <div className="space-y-4">
              {/* Room Inspection */}
              <div
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  roomInspected
                    ? 'border-success bg-success/5'
                    : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300'
                }`}
                onClick={() => setRoomInspected(!roomInspected)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      roomInspected
                        ? 'border-success bg-success'
                        : 'border-gray-300 dark:border-dark-border'
                    }`}
                  >
                    {roomInspected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Room Inspection
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Inspect room for damages, missing items, or cleanliness issues
                    </p>
                  </div>
                </div>
              </div>

              {/* Keys Returned */}
              <div
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  keysReturned
                    ? 'border-success bg-success/5'
                    : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300'
                }`}
                onClick={() => setKeysReturned(!keysReturned)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      keysReturned
                        ? 'border-success bg-success'
                        : 'border-gray-300 dark:border-dark-border'
                    }`}
                  >
                    {keysReturned && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Keys Returned
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Confirm all room keys have been returned by the guest
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Received */}
              <div
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  paymentReceived
                    ? 'border-success bg-success/5'
                    : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300'
                }`}
                onClick={() => setPaymentReceived(!paymentReceived)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      paymentReceived
                        ? 'border-success bg-success'
                        : 'border-gray-300 dark:border-dark-border'
                    }`}
                  >
                    {paymentReceived && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Payment Received
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Confirm all outstanding payments have been collected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Check-out Progress
            </h3>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Completion</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {[roomInspected, keysReturned, paymentReceived].filter(Boolean).length} / 3
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                <div
                  className="bg-success h-2 rounded-full transition-all"
                  style={{
                    width: `${([roomInspected, keysReturned, paymentReceived].filter(Boolean).length / 3) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${roomInspected ? 'bg-success' : 'bg-gray-300 dark:bg-dark-border'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">Room Inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${keysReturned ? 'bg-success' : 'bg-gray-300 dark:bg-dark-border'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">Keys Returned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${paymentReceived ? 'bg-success' : 'bg-gray-300 dark:bg-dark-border'}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">Payment Received</span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              icon={<LogOut className="w-5 h-5" />}
              iconPosition="left"
              onClick={handleCheckOut}
              disabled={!allStepsComplete}
            >
              Complete Check-out
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
              icon={<FileText className="w-4 h-4" />}
              iconPosition="left"
              onClick={handleGenerateInvoice}
            >
              Generate Invoice
            </Button>

            <Button
              variant="outline"
              size="md"
              className="w-full mt-3"
              onClick={() => router.push(`/hospitality/bookings/${booking.id}`)}
            >
              Cancel
            </Button>
          </Card>

          {/* Summary */}
          <Card className="p-6 bg-primary-50 dark:bg-primary-500/10 border-2 border-primary-200 dark:border-primary-500/20">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Stay Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Nights:</span>
                <span className="font-medium text-gray-900 dark:text-white">{booking.totalNights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Room Rate:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(booking.roomRate)}/night
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-primary-200 dark:border-primary-500/20">
                <span className="font-semibold text-gray-900 dark:text-white">Grand Total:</span>
                <span className="font-bold text-primary-500">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
