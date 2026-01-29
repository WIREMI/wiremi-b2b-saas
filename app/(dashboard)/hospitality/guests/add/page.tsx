'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  User,
  Users,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Mail,
  Phone,
  CreditCard,
  MapPin,
  Calendar,
  Globe,
  Heart,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
import type { GuestType, IDType, FloorPreference, RoomType } from '@/types/hospitality'

export default function AddGuestPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Step 1: Personal Information
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [nationality, setNationality] = useState('')
  const [idType, setIdType] = useState<IDType>('passport')
  const [idNumber, setIdNumber] = useState('')
  const [address, setAddress] = useState('')
  const [guestType, setGuestType] = useState<GuestType>('regular')

  // Step 2: Preferences
  const [roomTypePreference, setRoomTypePreference] = useState<RoomType>('standard')
  const [floorPreference, setFloorPreference] = useState<FloorPreference>('low')
  const [specialNotes, setSpecialNotes] = useState('')

  const steps = [
    { number: 1, title: 'Personal Information', icon: User },
    { number: 2, title: 'Preferences', icon: Heart },
  ]

  const guestTypes = [
    { value: 'regular', label: 'Regular' },
    { value: 'vip', label: 'VIP' },
    { value: 'corporate', label: 'Corporate' },
  ]

  const idTypes = [
    { value: 'passport', label: 'Passport' },
    { value: 'national-id', label: 'National ID' },
    { value: 'drivers-license', label: "Driver's License" },
  ]

  const roomTypes = [
    { value: 'standard', label: 'Standard' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'suite', label: 'Suite' },
    { value: 'penthouse', label: 'Penthouse' },
  ]

  const floorPreferences = [
    { value: 'low', label: 'Lower Floors (1-2)' },
    { value: 'high', label: 'Higher Floors (3+)' },
  ]

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    if (!nationality.trim()) {
      newErrors.nationality = 'Nationality is required'
    }
    if (!idNumber.trim()) {
      newErrors.idNumber = 'ID number is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2)
      setErrors({})
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
    setErrors({})
  }

  const handleSubmit = () => {
    const newGuest = {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      nationality,
      idType,
      idNumber,
      address,
      guestType,
      preferences: {
        roomType: roomTypePreference,
        floorPreference,
        specialNotes,
      },
    }

    console.log('Creating guest:', newGuest)

    showToast({
      type: 'success',
      title: 'Guest Created',
      message: `${firstName} ${lastName} has been successfully added to the guest list.`,
    })

    router.push('/hospitality/guests')
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
        Back to Guests
      </Button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
          <Users className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Add New Guest
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new guest profile
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
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={errors.firstName}
                icon={<User className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <Input
                label="Last Name"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={errors.lastName}
                icon={<User className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <Input
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                icon={<Mail className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <Input
                label="Phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                icon={<Phone className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <Input
                label="Nationality"
                placeholder="e.g., American, British"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                error={errors.nationality}
                icon={<Globe className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <Select
                label="ID Type"
                options={idTypes}
                value={idType}
                onChange={(e) => setIdType(e.target.value as IDType)}
                required
              />

              <Input
                label="ID Number"
                placeholder="Enter ID number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                error={errors.idNumber}
                icon={<CreditCard className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <div className="md:col-span-2">
                <Input
                  label="Address"
                  placeholder="Street address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  icon={<MapPin className="w-5 h-5" />}
                  iconPosition="left"
                />
              </div>

              <Select
                label="Guest Type"
                options={guestTypes}
                value={guestType}
                onChange={(e) => setGuestType(e.target.value as GuestType)}
                required
              />
            </div>
          </div>
        )}

        {/* Step 2: Preferences */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Guest Preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Preferred Room Type"
                options={roomTypes}
                value={roomTypePreference}
                onChange={(e) => setRoomTypePreference(e.target.value as RoomType)}
                helperText="Guest's preferred type of room"
              />

              <Select
                label="Floor Preference"
                options={floorPreferences}
                value={floorPreference}
                onChange={(e) => setFloorPreference(e.target.value as FloorPreference)}
                helperText="Preferred floor level"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Special Notes
                </label>
                <textarea
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  rows={4}
                  placeholder="Any special requests, dietary requirements, accessibility needs, or preferences..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  Include any special requirements or preferences to enhance the guest experience
                </p>
              </div>
            </div>

            {/* Guest Summary */}
            <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Guest Summary
              </h3>
              <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Name:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {firstName} {lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Guest Type:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {guestType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Room Preference:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {roomTypePreference}
                  </span>
                </div>
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
              onClick={() => router.push('/hospitality/guests')}
            >
              Cancel
            </Button>

            {currentStep < 2 ? (
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
                Create Guest
              </Button>
            )}
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
