'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Bed,
  Building2,
  DollarSign,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Users,
  Hash,
  Home,
  Wifi,
  Tv,
  Wind,
  Coffee,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  ParkingSquare,
  Image as ImageIcon,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
import type { RoomType, RoomStatus } from '@/types/hospitality'

export default function AddRoomPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Step 1: Basic Information
  const [roomNumber, setRoomNumber] = useState('')
  const [floor, setFloor] = useState('')
  const [roomType, setRoomType] = useState<RoomType>('standard')
  const [adultsCapacity, setAdultsCapacity] = useState('2')
  const [childrenCapacity, setChildrenCapacity] = useState('1')
  const [status, setStatus] = useState<RoomStatus>('available')

  // Step 2: Amenities & Pricing
  const [amenities, setAmenities] = useState<string[]>([])
  const [basePrice, setBasePrice] = useState('')
  const [currency] = useState('USD')

  // Step 3: Details
  const [sizeSqm, setSizeSqm] = useState('')
  const [bedConfiguration, setBedConfiguration] = useState('')
  const [description, setDescription] = useState('')

  const steps = [
    { number: 1, title: 'Basic Information', icon: Building2 },
    { number: 2, title: 'Amenities & Pricing', icon: DollarSign },
    { number: 3, title: 'Details', icon: Bed },
  ]

  const roomTypes = [
    { value: 'standard', label: 'Standard' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'suite', label: 'Suite' },
    { value: 'penthouse', label: 'Penthouse' },
  ]

  const floors = [
    { value: '1', label: 'Floor 1' },
    { value: '2', label: 'Floor 2' },
    { value: '3', label: 'Floor 3' },
    { value: '4', label: 'Floor 4' },
    { value: '5', label: 'Floor 5' },
  ]

  const statuses = [
    { value: 'available', label: 'Available' },
    { value: 'maintenance', label: 'Under Maintenance' },
    { value: 'blocked', label: 'Blocked' },
  ]

  const bedConfigurations = [
    { value: '1 King Bed', label: '1 King Bed' },
    { value: '1 Queen Bed', label: '1 Queen Bed' },
    { value: '2 Queen Beds', label: '2 Queen Beds' },
    { value: '2 Twin Beds', label: '2 Twin Beds' },
    { value: '1 King + 1 Single', label: '1 King + 1 Single Bed' },
  ]

  const availableAmenities = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'tv', label: 'Smart TV', icon: Tv },
    { id: 'ac', label: 'Air Conditioning', icon: Wind },
    { id: 'mini-bar', label: 'Mini Bar', icon: Coffee },
    { id: 'room-service', label: 'Room Service', icon: UtensilsCrossed },
    { id: 'bathtub', label: 'Bathtub', icon: Waves },
    { id: 'gym-access', label: 'Gym Access', icon: Dumbbell },
    { id: 'parking', label: 'Parking', icon: ParkingSquare },
  ]

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!roomNumber.trim()) {
      newErrors.roomNumber = 'Room number is required'
    }
    if (!floor) {
      newErrors.floor = 'Please select a floor'
    }
    if (!adultsCapacity || parseInt(adultsCapacity) < 1) {
      newErrors.adultsCapacity = 'Adults capacity must be at least 1'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!basePrice || parseFloat(basePrice) <= 0) {
      newErrors.basePrice = 'Base price must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}

    if (!sizeSqm || parseFloat(sizeSqm) <= 0) {
      newErrors.sizeSqm = 'Room size must be greater than 0'
    }
    if (!bedConfiguration) {
      newErrors.bedConfiguration = 'Please select a bed configuration'
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

    // Here you would normally submit to API
    const newRoom = {
      roomNumber,
      floor: parseInt(floor),
      type: roomType,
      capacity: {
        adults: parseInt(adultsCapacity),
        children: parseInt(childrenCapacity),
      },
      status,
      amenities,
      basePrice: parseFloat(basePrice),
      currency,
      sizeSqm: parseFloat(sizeSqm),
      bedConfiguration,
      description,
    }

    console.log('Creating room:', newRoom)

    showToast({
      type: 'success',
      title: 'Room Created',
      message: `Room ${roomNumber} has been successfully created.`,
    })

    router.push('/hospitality/rooms')
  }

  const toggleAmenity = (amenityId: string) => {
    setAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    )
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
        Back to Rooms
      </Button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
          <Bed className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Add New Room
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new room by filling in the details below
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
                    className={`mt-2 text-sm font-medium ${
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
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Room Number"
                placeholder="e.g., 101, 201A"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                error={errors.roomNumber}
                icon={<Hash className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <Select
                label="Floor"
                options={floors}
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                error={errors.floor}
                required
              />

              <Select
                label="Room Type"
                options={roomTypes}
                value={roomType}
                onChange={(e) => setRoomType(e.target.value as RoomType)}
                required
              />

              <Select
                label="Status"
                options={statuses}
                value={status}
                onChange={(e) => setStatus(e.target.value as RoomStatus)}
                required
              />

              <Input
                label="Adults Capacity"
                type="number"
                min="1"
                value={adultsCapacity}
                onChange={(e) => setAdultsCapacity(e.target.value)}
                error={errors.adultsCapacity}
                icon={<Users className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <Input
                label="Children Capacity"
                type="number"
                min="0"
                value={childrenCapacity}
                onChange={(e) => setChildrenCapacity(e.target.value)}
                icon={<Users className="w-5 h-5" />}
                iconPosition="left"
                required
              />
            </div>
          </div>
        )}

        {/* Step 2: Amenities & Pricing */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Amenities & Pricing
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Select Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableAmenities.map((amenity) => {
                  const AmenityIcon = amenity.icon
                  const isSelected = amenities.includes(amenity.id)

                  return (
                    <button
                      key={amenity.id}
                      type="button"
                      onClick={() => toggleAmenity(amenity.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                          : 'border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-card hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <AmenityIcon
                        className={`w-6 h-6 mb-2 ${
                          isSelected
                            ? 'text-primary-500'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          isSelected
                            ? 'text-primary-500'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {amenity.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-dark-border">
              <Input
                label="Base Price per Night"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                error={errors.basePrice}
                icon={<DollarSign className="w-5 h-5" />}
                iconPosition="left"
                helperText="Regular rate for this room type"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency
                </label>
                <div className="px-4 py-3 bg-gray-50 dark:bg-dark-bg rounded-lg border border-gray-200 dark:border-dark-border">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {currency}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                    Default currency
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Room Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Room Size (sqm)"
                type="number"
                min="0"
                step="0.1"
                placeholder="e.g., 35.5"
                value={sizeSqm}
                onChange={(e) => setSizeSqm(e.target.value)}
                error={errors.sizeSqm}
                icon={<Home className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <Select
                label="Bed Configuration"
                options={bedConfigurations}
                value={bedConfiguration}
                onChange={(e) => setBedConfiguration(e.target.value)}
                error={errors.bedConfiguration}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Enter a detailed description of the room..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                Include details about the room's features, view, and unique characteristics
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Room Photos
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-8 text-center bg-gray-50 dark:bg-dark-bg">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Photo upload functionality coming soon
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  Supported formats: JPG, PNG, WebP
                </p>
              </div>
            </div>
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
              onClick={() => router.push('/hospitality/rooms')}
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
                Create Room
              </Button>
            )}
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
