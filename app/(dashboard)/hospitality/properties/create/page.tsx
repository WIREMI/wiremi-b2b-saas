'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Building2,
  MapPin,
  FileText,
  Image as ImageIcon,
  Star,
  Check,
  Wifi,
  Car,
  UtensilsCrossed,
  Dumbbell,
  Coffee,
  Wine,
  Wind,
  Tv,
  ShowerHead,
  Shield,
  Dog,
  Cigarette,
  Upload,
  X,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/useToast'
import type { PropertyType, CancellationPolicy } from '@/types/hospitality'

export default function CreatePropertyPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    type: 'HOTEL' as PropertyType,
    shortDescription: '',
    longDescription: '',
    starRating: 3,

    // Location
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    latitude: '',
    longitude: '',

    // Contact
    contactEmail: '',
    contactPhone: '',

    // Policies
    checkInTime: '15:00',
    checkOutTime: '11:00',
    cancellationPolicy: 'MODERATE' as CancellationPolicy,
    houseRules: ['No smoking in rooms', 'Pets not allowed', 'Quiet hours: 10 PM - 7 AM'],

    // Amenities
    selectedAmenities: [] as string[],

    // Photos
    photos: [] as { url: string; category: string; preview: string }[],
  })

  const availableAmenities = [
    { id: 'wifi', name: 'WiFi', icon: Wifi },
    { id: 'parking', name: 'Free Parking', icon: Car },
    { id: 'restaurant', name: 'Restaurant', icon: UtensilsCrossed },
    { id: 'gym', name: 'Fitness Center', icon: Dumbbell },
    { id: 'breakfast', name: 'Breakfast Included', icon: Coffee },
    { id: 'bar', name: 'Bar/Lounge', icon: Wine },
    { id: 'ac', name: 'Air Conditioning', icon: Wind },
    { id: 'tv', name: 'TV', icon: Tv },
    { id: 'spa', name: 'Spa', icon: ShowerHead },
    { id: 'security', name: '24/7 Security', icon: Shield },
    { id: 'pets', name: 'Pet Friendly', icon: Dog },
    { id: 'smoking', name: 'Smoking Area', icon: Cigarette },
  ]

  const steps = [
    { number: 1, title: 'Basic Information', icon: Building2 },
    { number: 2, title: 'Location', icon: MapPin },
    { number: 3, title: 'Photos & Media', icon: ImageIcon },
    { number: 4, title: 'Details & Policies', icon: FileText },
    { number: 5, title: 'Amenities', icon: Star },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(amenityId)
        ? prev.selectedAmenities.filter(id => id !== amenityId)
        : [...prev.selectedAmenities, amenityId]
    }))
  }

  const handleSubmit = async (saveAs: 'DRAFT' | 'SUBMITTED') => {
    setIsSaving(true)

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      const property = {
        ...formData,
        id: `prop_${Date.now()}`,
        businessId: 'business_123',
        status: saveAs,
        amenityIds: formData.selectedAmenities,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          postalCode: formData.postalCode,
          latitude: parseFloat(formData.latitude) || 0,
          longitude: parseFloat(formData.longitude) || 0,
        },
        media: [],
        roomTypes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      console.log('Creating property:', property)

      showToast({
        type: 'success',
        title: 'Success',
        message: saveAs === 'DRAFT'
          ? 'Property saved as draft successfully!'
          : 'Property submitted for review successfully!',
      })

      router.push('/hospitality/properties')
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to create property. Please try again.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const files = e.target.files
    if (!files) return

    // Convert files to preview URLs
    const newPhotos = Array.from(files).map(file => ({
      url: URL.createObjectURL(file),
      category: category,
      preview: URL.createObjectURL(file),
    }))

    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }))
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.type && formData.shortDescription
      case 2:
        return formData.street && formData.city && formData.country
      case 3:
        return formData.photos.length >= 1 // At least 1 photo required
      case 4:
        return formData.contactEmail && formData.contactPhone
      case 5:
        return true
      default:
        return false
    }
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => router.push('/hospitality/properties')}
          className="mb-4"
        >
          Back to Properties
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Property</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Fill in the details below to list your property on the marketplace
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    currentStep === step.number
                      ? 'bg-primary-500 text-white'
                      : currentStep > step.number
                      ? 'bg-success text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <p className={`mt-2 text-sm font-medium ${
                  currentStep === step.number
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 transition-colors ${
                  currentStep > step.number
                    ? 'bg-success'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card className="p-8">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>

            <Input
              label="Property Name *"
              placeholder="e.g., Grand Sunset Hotel"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Type *
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['HOTEL', 'RESORT', 'GUEST_HOUSE'] as PropertyType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleInputChange('type', type)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      formData.type === type
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <p className={`font-medium ${
                      formData.type === type
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {type.replace('_', ' ')}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Star Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleInputChange('starRating', rating)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        rating <= formData.starRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Short Description *"
              placeholder="Brief description (1-2 sentences)"
              value={formData.shortDescription}
              onChange={(e) => handleInputChange('shortDescription', e.target.value)}
              maxLength={200}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Description
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={6}
                placeholder="Detailed description of your property..."
                value={formData.longDescription}
                onChange={(e) => handleInputChange('longDescription', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Location Details
            </h2>

            <Input
              label="Street Address *"
              placeholder="123 Main Street"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City *"
                placeholder="City name"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
              <Input
                label="State/Province"
                placeholder="State or Province"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Country *"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              />
              <Input
                label="Postal Code"
                placeholder="12345"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Latitude (optional)"
                type="number"
                step="any"
                placeholder="0.0000"
                value={formData.latitude}
                onChange={(e) => handleInputChange('latitude', e.target.value)}
              />
              <Input
                label="Longitude (optional)"
                type="number"
                step="any"
                placeholder="0.0000"
                value={formData.longitude}
                onChange={(e) => handleInputChange('longitude', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 3: Photos & Media */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Property Photos
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Upload high-quality photos of your property. At least one photo is required.
            </p>

            {/* Photo Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exterior Photos */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 dark:text-white">Exterior Views</h3>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-colors bg-gray-50 dark:bg-gray-800">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload exterior photos</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'EXTERIOR')}
                  />
                </label>
              </div>

              {/* Lobby/Reception Photos */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 dark:text-white">Lobby & Reception</h3>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-colors bg-gray-50 dark:bg-gray-800">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload lobby photos</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'LOBBY')}
                  />
                </label>
              </div>

              {/* Room Photos */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 dark:text-white">Rooms</h3>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-colors bg-gray-50 dark:bg-gray-800">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload room photos</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'ROOM')}
                  />
                </label>
              </div>

              {/* Common Areas Photos */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 dark:text-white">Common Areas</h3>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-colors bg-gray-50 dark:bg-gray-800">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload common area photos</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e, 'COMMON_AREAS')}
                  />
                </label>
              </div>
            </div>

            {/* Uploaded Photos Preview */}
            {formData.photos.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Uploaded Photos ({formData.photos.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo.preview}
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded">
                        {photo.category}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.photos.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                <p>No photos uploaded yet. Please add at least one photo to continue.</p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Details & Policies */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Details & Policies
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Contact Email *"
                type="email"
                placeholder="property@example.com"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              />
              <Input
                label="Contact Phone *"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Check-in Time"
                type="time"
                value={formData.checkInTime}
                onChange={(e) => handleInputChange('checkInTime', e.target.value)}
              />
              <Input
                label="Check-out Time"
                type="time"
                value={formData.checkOutTime}
                onChange={(e) => handleInputChange('checkOutTime', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cancellation Policy
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['FLEXIBLE', 'MODERATE', 'STRICT'] as CancellationPolicy[]).map((policy) => (
                  <button
                    key={policy}
                    type="button"
                    onClick={() => handleInputChange('cancellationPolicy', policy)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      formData.cancellationPolicy === policy
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <p className={`font-medium text-sm ${
                      formData.cancellationPolicy === policy
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {policy}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Amenities */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Property Amenities
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select all amenities available at your property
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availableAmenities.map((amenity) => {
                const Icon = amenity.icon
                const isSelected = formData.selectedAmenities.includes(amenity.id)

                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon className={`w-6 h-6 ${
                        isSelected
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        isSelected
                          ? 'text-primary-700 dark:text-primary-300'
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {amenity.name}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Selected: {formData.selectedAmenities.length} amenities
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="flex gap-3">
            {currentStep === steps.length ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleSubmit('DRAFT')}
                  loading={isSaving}
                  disabled={isSaving}
                >
                  Save as Draft
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleSubmit('SUBMITTED')}
                  loading={isSaving}
                  disabled={isSaving}
                >
                  Submit for Review
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                onClick={nextStep}
                disabled={!isStepValid()}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
