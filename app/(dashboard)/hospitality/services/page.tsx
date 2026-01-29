'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DollarSign,
  Plus,
  UtensilsCrossed,
  Coffee,
  Shirt,
  Waves,
  Car,
  Phone,
  Sparkles,
  Search,
  Calendar,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Modal from '@/components/ui/modal'
import { useToast } from '@/hooks/useToast'
import { formatCurrency, formatDate } from '@/lib/utils'
import { getPopulatedBookings } from '@/lib/mock-data/hospitality'

export default function ServicesPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [showAddChargeModal, setShowAddChargeModal] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState('')
  const [serviceType, setServiceType] = useState('room-service')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [unitPrice, setUnitPrice] = useState('')

  // Get active bookings (checked-in)
  const allBookings = getPopulatedBookings()
  const activeBookings = allBookings.filter((b) => b.status === 'checked-in')

  // Service types with icons
  const serviceTypes = [
    { value: 'room-service', label: 'Room Service', icon: UtensilsCrossed, color: 'text-primary-500' },
    { value: 'mini-bar', label: 'Mini Bar', icon: Coffee, color: 'text-warning' },
    { value: 'laundry', label: 'Laundry', icon: Shirt, color: 'text-info' },
    { value: 'spa', label: 'Spa & Wellness', icon: Waves, color: 'text-success' },
    { value: 'parking', label: 'Parking', icon: Car, color: 'text-error' },
    { value: 'phone', label: 'Phone Calls', icon: Phone, color: 'text-gray-600 dark:text-gray-400' },
    { value: 'other', label: 'Other Services', icon: Sparkles, color: 'text-purple-500' },
  ]

  // Recent charges (from active bookings)
  const recentCharges = activeBookings
    .flatMap((booking) =>
      (booking.additionalCharges || []).map((charge) => ({
        ...charge,
        booking,
      }))
    )
    .sort((a, b) => new Date(b.chargedAt).getTime() - new Date(a.chargedAt).getTime())
    .slice(0, 20)

  const handleAddCharge = () => {
    if (!selectedBookingId || !description || !unitPrice) {
      showToast({
        type: 'error',
        title: 'Missing Information',
        message: 'Please fill in all required fields',
      })
      return
    }

    const selectedBooking = activeBookings.find((b) => b.id === selectedBookingId)
    const totalAmount = parseFloat(unitPrice) * parseInt(quantity)

    console.log('Adding service charge:', {
      bookingId: selectedBookingId,
      serviceType,
      description,
      quantity: parseInt(quantity),
      unitPrice: parseFloat(unitPrice),
      totalAmount,
    })

    showToast({
      type: 'success',
      title: 'Charge Added',
      message: `Service charge of ${formatCurrency(totalAmount)} added to ${selectedBooking?.room?.roomNumber}`,
    })

    // Reset form
    setShowAddChargeModal(false)
    setSelectedBookingId('')
    setDescription('')
    setQuantity('1')
    setUnitPrice('')
  }

  const getServiceIcon = (type: string) => {
    const service = serviceTypes.find((s) => s.value === type)
    if (!service) return Sparkles
    return service.icon
  }

  const getServiceColor = (type: string) => {
    const service = serviceTypes.find((s) => s.value === type)
    return service?.color || 'text-gray-600 dark:text-gray-400'
  }

  const quickServices = [
    { name: 'Breakfast', type: 'room-service', price: 25 },
    { name: 'Laundry Service', type: 'laundry', price: 15 },
    { name: 'Mini Bar Items', type: 'mini-bar', price: 10 },
    { name: 'Spa Treatment', type: 'spa', price: 80 },
    { name: 'Parking (1 Day)', type: 'parking', price: 20 },
    { name: 'Airport Transfer', type: 'other', price: 50 },
  ]

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Services & Charges
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Add service charges to active guest bookings
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => setShowAddChargeModal(true)}
            >
              Add Charge
            </Button>
          </div>
        </div>

        {/* Active Bookings Summary */}
        <Card className="p-6 bg-primary-50 dark:bg-primary-500/10 border-2 border-primary-200 dark:border-primary-500/20 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeBookings.length} Rooms Checked In
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Service Buttons */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Service Charges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickServices.map((service) => {
              const ServiceIcon = getServiceIcon(service.type)
              return (
                <button
                  key={service.name}
                  onClick={() => {
                    setServiceType(service.type)
                    setDescription(service.name)
                    setUnitPrice(service.price.toString())
                    setShowAddChargeModal(true)
                  }}
                  className="p-4 rounded-xl border-2 border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all text-center"
                >
                  <ServiceIcon className={`w-8 h-8 mx-auto mb-2 ${getServiceColor(service.type)}`} />
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {service.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    {formatCurrency(service.price)}
                  </p>
                </button>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Recent Charges */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Recent Service Charges
        </h2>

        {recentCharges.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                {recentCharges.map((charge) => {
                  const ServiceIcon = getServiceIcon(charge.serviceType)
                  return (
                    <tr
                      key={charge.id}
                      className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors cursor-pointer"
                      onClick={() => router.push(`/hospitality/bookings/${charge.booking.id}`)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatDate(new Date(charge.chargedAt))}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            {new Date(charge.chargedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900 dark:text-white">
                          Room {charge.booking.room?.roomNumber}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {charge.booking.guest?.firstName} {charge.booking.guest?.lastName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ServiceIcon className={`w-4 h-4 ${getServiceColor(charge.serviceType)}`} />
                          <span className="text-sm text-gray-900 dark:text-white capitalize">
                            {charge.serviceType.replace('-', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {charge.description}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {charge.quantity}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(charge.totalAmount)}
                        </p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-dark-bg rounded-lg">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Service Charges Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start adding service charges to active bookings
            </p>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => setShowAddChargeModal(true)}
            >
              Add First Charge
            </Button>
          </div>
        )}
      </Card>

      {/* Add Charge Modal */}
      <Modal
        isOpen={showAddChargeModal}
        onClose={() => setShowAddChargeModal(false)}
        title="Add Service Charge"
        size="lg"
      >
        <div className="space-y-6">
          {/* Booking Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Active Booking <span className="text-error">*</span>
            </label>
            <select
              value={selectedBookingId}
              onChange={(e) => setSelectedBookingId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a room...</option>
              {activeBookings.map((booking) => (
                <option key={booking.id} value={booking.id}>
                  Room {booking.room?.roomNumber} - {booking.guest?.firstName} {booking.guest?.lastName} ({booking.bookingReference})
                </option>
              ))}
            </select>
          </div>

          {/* Service Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Service Type <span className="text-error">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {serviceTypes.map((service) => {
                const ServiceIcon = service.icon
                return (
                  <button
                    key={service.value}
                    type="button"
                    onClick={() => setServiceType(service.value)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      serviceType === service.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                        : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300'
                    }`}
                  >
                    <ServiceIcon className={`w-6 h-6 mx-auto mb-1 ${service.color}`} />
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      {service.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Description */}
          <Input
            label="Description"
            placeholder="e.g., Breakfast, Laundry, Mini Bar"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Quantity and Unit Price */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <Input
              label="Unit Price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              icon={<DollarSign className="w-5 h-5" />}
              iconPosition="left"
              required
            />
          </div>

          {/* Total Preview */}
          {quantity && unitPrice && (
            <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Total Amount:
                </span>
                <span className="text-xl font-bold text-primary-500">
                  {formatCurrency(parseFloat(unitPrice) * parseInt(quantity))}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
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
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
            >
              Add Charge
            </Button>
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
