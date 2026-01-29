'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  Users,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Search,
  Bed,
  DollarSign,
  User,
  Mail,
  Phone,
  AlertCircle,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/useToast'
import { formatCurrency } from '@/lib/utils'
import { MOCK_ROOMS, MOCK_GUESTS } from '@/lib/mock-data/hospitality'
import type { RoomType } from '@/types/hospitality'

export default function CreateBookingPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Step 1: Dates & Room
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [adultsCount, setAdultsCount] = useState('2')
  const [childrenCount, setChildrenCount] = useState('0')
  const [selectedRoomId, setSelectedRoomId] = useState('')
  const [roomTypeFilter, setRoomTypeFilter] = useState('all')

  // Step 2: Guest Info
  const [guestSearchQuery, setGuestSearchQuery] = useState('')
  const [selectedGuestId, setSelectedGuestId] = useState('')
  const [isNewGuest, setIsNewGuest] = useState(false)
  const [newGuestFirstName, setNewGuestFirstName] = useState('')
  const [newGuestLastName, setNewGuestLastName] = useState('')
  const [newGuestEmail, setNewGuestEmail] = useState('')
  const [newGuestPhone, setNewGuestPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

  // Step 3: Payment
  const [depositAmount, setDepositAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')

  const steps = [
    { number: 1, title: 'Dates & Room', icon: Calendar },
    { number: 2, title: 'Guest Information', icon: Users },
    { number: 3, title: 'Payment', icon: CreditCard },
  ]

  const roomTypeOptions = [
    { value: 'all', label: 'All Room Types' },
    { value: 'standard', label: 'Standard' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'suite', label: 'Suite' },
    { value: 'penthouse', label: 'Penthouse' },
  ]

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'cash', label: 'Cash' },
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'mobile-money', label: 'Mobile Money' },
  ]

  // Get today's date for date validation
  const today = new Date().toISOString().split('T')[0]

  // Filter available rooms based on criteria
  const availableRooms = MOCK_ROOMS.filter((room) => {
    if (room.status !== 'available') return false
    if (roomTypeFilter !== 'all' && room.type !== roomTypeFilter) return false

    const adults = parseInt(adultsCount) || 0
    const children = parseInt(childrenCount) || 0

    return room.capacity.adults >= adults && room.capacity.children >= children
  })

  // Filter guests for search
  const filteredGuests = MOCK_GUESTS.filter((guest) => {
    if (!guestSearchQuery) return true
    const query = guestSearchQuery.toLowerCase()
    return (
      guest.firstName.toLowerCase().includes(query) ||
      guest.lastName.toLowerCase().includes(query) ||
      guest.email.toLowerCase().includes(query) ||
      guest.guestCode.toLowerCase().includes(query)
    )
  }).slice(0, 5)

  // Calculate booking details
  const selectedRoom = MOCK_ROOMS.find((r) => r.id === selectedRoomId)
  const selectedGuest = MOCK_GUESTS.find((g) => g.id === selectedGuestId)

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0
    const start = new Date(checkInDate)
    const end = new Date(checkOutDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const totalNights = calculateNights()
  const subtotal = selectedRoom ? selectedRoom.basePrice * totalNights : 0
  const taxAmount = subtotal * 0.1 // 10% tax
  const totalAmount = subtotal + taxAmount

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!checkInDate) {
      newErrors.checkInDate = 'Check-in date is required'
    }
    if (!checkOutDate) {
      newErrors.checkOutDate = 'Check-out date is required'
    }
    if (checkInDate && checkOutDate && new Date(checkInDate) >= new Date(checkOutDate)) {
      newErrors.checkOutDate = 'Check-out must be after check-in'
    }
    if (!selectedRoomId) {
      newErrors.selectedRoomId = 'Please select a room'
    }
    if (!adultsCount || parseInt(adultsCount) < 1) {
      newErrors.adultsCount = 'At least 1 adult is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (isNewGuest) {
      if (!newGuestFirstName.trim()) {
        newErrors.newGuestFirstName = 'First name is required'
      }
      if (!newGuestLastName.trim()) {
        newErrors.newGuestLastName = 'Last name is required'
      }
      if (!newGuestEmail.trim()) {
        newErrors.newGuestEmail = 'Email is required'
      }
      if (!newGuestPhone.trim()) {
        newErrors.newGuestPhone = 'Phone is required'
      }
    } else {
      if (!selectedGuestId) {
        newErrors.selectedGuestId = 'Please select or create a guest'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}

    if (!depositAmount || parseFloat(depositAmount) < 0) {
      newErrors.depositAmount = 'Deposit amount is required'
    }
    if (parseFloat(depositAmount) > totalAmount) {
      newErrors.depositAmount = 'Deposit cannot exceed total amount'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false

    if (currentStep === 1) {
      isValid = validateStep1()
    } else if (currentStep === 2) {
      isValid = validateStep2()
    }

    if (isValid) {
      setCurrentStep(currentStep + 1)
      setErrors({})
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleSubmit = () => {
    if (!validateStep3()) {
      return
    }

    const newBooking = {
      checkInDate,
      checkOutDate,
      roomId: selectedRoomId,
      guestId: isNewGuest ? 'new-guest' : selectedGuestId,
      newGuest: isNewGuest
        ? {
            firstName: newGuestFirstName,
            lastName: newGuestLastName,
            email: newGuestEmail,
            phone: newGuestPhone,
          }
        : null,
      numberOfGuests: {
        adults: parseInt(adultsCount),
        children: parseInt(childrenCount),
      },
      specialRequests,
      totalNights,
      subtotal,
      taxAmount,
      totalAmount,
      depositAmount: parseFloat(depositAmount),
      balanceDue: totalAmount - parseFloat(depositAmount),
      paymentMethod,
    }

    console.log('Creating booking:', newBooking)

    showToast({
      type: 'success',
      title: 'Booking Created',
      message: `Booking for Room ${selectedRoom?.roomNumber} has been successfully created.`,
    })

    router.push('/hospitality/bookings')
  }

  const getRoomTypeLabel = (type: RoomType) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

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
        Back to Bookings
      </Button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
          <Calendar className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create New Booking
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Select dates, room, and guest information to create a reservation
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number

            return (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                      isCompleted
                        ? 'bg-success border-success'
                        : isActive
                        ? 'bg-primary-500 border-primary-500'
                        : 'bg-gray-50 dark:bg-dark-card border-gray-300 dark:border-dark-border'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <StepIcon
                        className={`w-6 h-6 ${
                          isActive
                            ? 'text-white'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                      />
                    )}
                  </div>
                  <p
                    className={`mt-2 text-sm font-medium text-center ${
                      isActive
                        ? 'text-primary-500'
                        : isCompleted
                        ? 'text-success'
                        : 'text-gray-500 dark:text-gray-400 dark:text-gray-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`w-24 h-0.5 mx-4 mb-8 ${
                      currentStep > step.number
                        ? 'bg-success'
                        : 'bg-gray-300 dark:bg-dark-border'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Steps */}
      <Card className="p-8">
        {/* Step 1: Dates & Room */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Select Dates & Room
            </h2>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-in Date <span className="text-error">*</span>
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  min={today}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.checkInDate && (
                  <p className="mt-1 text-sm text-error">{errors.checkInDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Check-out Date <span className="text-error">*</span>
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  min={checkInDate || today}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.checkOutDate && (
                  <p className="mt-1 text-sm text-error">{errors.checkOutDate}</p>
                )}
              </div>
            </div>

            {/* Guest Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Number of Adults"
                type="number"
                min="1"
                value={adultsCount}
                onChange={(e) => setAdultsCount(e.target.value)}
                error={errors.adultsCount}
                icon={<Users className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <Input
                label="Number of Children"
                type="number"
                min="0"
                value={childrenCount}
                onChange={(e) => setChildrenCount(e.target.value)}
                icon={<Users className="w-5 h-5" />}
                iconPosition="left"
              />
            </div>

            {/* Nights Summary */}
            {totalNights > 0 && (
              <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Total nights selected:
                  </span>
                  <span className="text-lg font-bold text-primary-500">{totalNights}</span>
                </div>
              </div>
            )}

            {/* Room Type Filter */}
            <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
              <Select
                label="Filter by Room Type"
                options={roomTypeOptions}
                value={roomTypeFilter}
                onChange={(e) => setRoomTypeFilter(e.target.value)}
              />
            </div>

            {/* Available Rooms */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Available Rooms ({availableRooms.length})
              </h3>

              {availableRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                  {availableRooms.map((room) => (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() => setSelectedRoomId(room.id)}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        selectedRoomId === room.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                          : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-primary-500 dark:hover:border-primary-500'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Room {room.roomNumber}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Floor {room.floor} • {getRoomTypeLabel(room.type)}
                          </p>
                        </div>
                        <Badge variant="success" size="sm">Available</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Bed className="w-4 h-4" />
                          <span>{room.bedConfiguration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>Up to {room.capacity.adults} adults, {room.capacity.children} children</span>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-dark-border">
                          <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Per night</span>
                          <span className="text-lg font-bold text-primary-500">
                            {formatCurrency(room.basePrice)}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-dark-bg rounded-lg">
                  <Bed className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    No available rooms match your criteria
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    Try adjusting the guest count or room type filter
                  </p>
                </div>
              )}

              {errors.selectedRoomId && (
                <p className="mt-3 text-sm text-error flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.selectedRoomId}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Guest Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Guest Information
            </h2>

            {/* Guest Type Selection */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setIsNewGuest(false)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  !isNewGuest
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                    : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                }`}
              >
                <Search className={`w-8 h-8 mx-auto mb-3 ${!isNewGuest ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} />
                <p className="font-semibold text-gray-900 dark:text-white text-center">
                  Existing Guest
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center">
                  Search from guest list
                </p>
              </button>
              <button
                type="button"
                onClick={() => setIsNewGuest(true)}
                className={`p-6 rounded-xl border-2 transition-all ${
                  isNewGuest
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                    : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                }`}
              >
                <User className={`w-8 h-8 mx-auto mb-3 ${isNewGuest ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} />
                <p className="font-semibold text-gray-900 dark:text-white text-center">
                  New Guest
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center">
                  Create new profile
                </p>
              </button>
            </div>

            {/* Existing Guest Search */}
            {!isNewGuest ? (
              <div>
                <Input
                  label="Search Guest"
                  placeholder="Search by name, email, or guest code..."
                  value={guestSearchQuery}
                  onChange={(e) => setGuestSearchQuery(e.target.value)}
                  icon={<Search className="w-5 h-5" />}
                  iconPosition="left"
                />

                <div className="mt-4 space-y-3 max-h-80 overflow-y-auto">
                  {filteredGuests.length > 0 ? (
                    filteredGuests.map((guest) => (
                      <button
                        key={guest.id}
                        type="button"
                        onClick={() => setSelectedGuestId(guest.id)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          selectedGuestId === guest.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                            : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 dark:text-white mb-1">
                              {guest.firstName} {guest.lastName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {guest.email}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                              {guest.guestCode} • {guest.phone}
                            </p>
                          </div>
                          {guest.guestType === 'vip' && (
                            <Badge variant="warning" size="sm">VIP</Badge>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {guestSearchQuery ? 'No guests found' : 'Start typing to search'}
                    </div>
                  )}
                </div>

                {errors.selectedGuestId && (
                  <p className="mt-3 text-sm text-error flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.selectedGuestId}
                  </p>
                )}
              </div>
            ) : (
              /* New Guest Form */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  placeholder="John"
                  value={newGuestFirstName}
                  onChange={(e) => setNewGuestFirstName(e.target.value)}
                  error={errors.newGuestFirstName}
                  icon={<User className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />

                <Input
                  label="Last Name"
                  placeholder="Doe"
                  value={newGuestLastName}
                  onChange={(e) => setNewGuestLastName(e.target.value)}
                  error={errors.newGuestLastName}
                  icon={<User className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={newGuestEmail}
                  onChange={(e) => setNewGuestEmail(e.target.value)}
                  error={errors.newGuestEmail}
                  icon={<Mail className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />

                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={newGuestPhone}
                  onChange={(e) => setNewGuestPhone(e.target.value)}
                  error={errors.newGuestPhone}
                  icon={<Phone className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />
              </div>
            )}

            {/* Special Requests */}
            <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Special Requests
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
                placeholder="Any special requests or preferences..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        )}

        {/* Step 3: Payment & Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Payment & Confirmation
            </h2>

            {/* Booking Summary */}
            <Card className="p-6 bg-gray-50 dark:bg-dark-bg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Booking Summary
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Room</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Room {selectedRoom?.roomNumber} ({selectedRoom?.type})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Guest</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {isNewGuest
                      ? `${newGuestFirstName} ${newGuestLastName}`
                      : `${selectedGuest?.firstName} ${selectedGuest?.lastName}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Check-in</span>
                  <span className="font-medium text-gray-900 dark:text-white">{checkInDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Check-out</span>
                  <span className="font-medium text-gray-900 dark:text-white">{checkOutDate}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-dark-border">
                  <span className="text-gray-600 dark:text-gray-400">
                    {totalNights} nights × {formatCurrency(selectedRoom?.basePrice || 0)}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax (10%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(taxAmount)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-dark-border">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Amount
                  </span>
                  <span className="text-xl font-bold text-primary-500">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Payment Method"
                options={paymentMethods}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />

              <Input
                label="Deposit Amount"
                type="number"
                min="0"
                step="0.01"
                placeholder={totalAmount.toFixed(2)}
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                error={errors.depositAmount}
                icon={<DollarSign className="w-5 h-5" />}
                iconPosition="left"
                helperText={`Total: ${formatCurrency(totalAmount)}`}
                required
              />
            </div>

            {depositAmount && parseFloat(depositAmount) < totalAmount && (
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Balance due at check-in: <span className="font-semibold text-warning">
                    {formatCurrency(totalAmount - parseFloat(depositAmount))}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-dark-border">
          <div>
            {currentStep > 1 && (
              <Button
                variant="outline"
                size="md"
                icon={<ArrowLeft className="w-5 h-5" />}
                iconPosition="left"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="md"
              onClick={() => router.push('/hospitality/bookings')}
            >
              Cancel
            </Button>

            {currentStep < 3 ? (
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                onClick={handleNext}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                icon={<CheckCircle2 className="w-5 h-5" />}
                iconPosition="left"
                onClick={handleSubmit}
              >
                Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
