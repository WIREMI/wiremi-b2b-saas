'use client'

import { useState, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Save,
  Info,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
import { MOCK_EVENTS } from '@/lib/mock-data/events'
import type { EventCategory } from '@/types/events'

interface EventFormData {
  name: string
  description: string
  category: EventCategory | ''
  venue: string
  address: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  capacity: string
}

export default function EditEventPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()

  const event = MOCK_EVENTS.find((e) => e.id === params.id)

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<EventFormData>({
    name: event?.name || '',
    description: event?.description || '',
    category: event?.category || '',
    venue: event?.venue || '',
    address: event?.address || '',
    startDate: event?.startDateTime.split('T')[0] || '',
    startTime: event?.startDateTime.split('T')[1]?.substring(0, 5) || '',
    endDate: event?.endDateTime.split('T')[0] || '',
    endTime: event?.endDateTime.split('T')[1]?.substring(0, 5) || '',
    capacity: event?.capacity.toString() || '',
  })

  if (!event) {
    return (
      <PageLayout maxWidth="normal">
        <Card className="p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Event not found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The event you're trying to edit doesn't exist
          </p>
          <Button variant="primary" onClick={() => router.push('/events')}>
            Back to Events
          </Button>
        </Card>
      </PageLayout>
    )
  }

  const categoryOptions = [
    { value: '', label: 'Select category' },
    { value: 'conference', label: 'Conference' },
    { value: 'concert', label: 'Concert' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'sports', label: 'Sports' },
    { value: 'networking', label: 'Networking' },
    { value: 'other', label: 'Other' },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Event name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.startDate) newErrors.startDate = 'Start date is required'
    if (!formData.startTime) newErrors.startTime = 'Start time is required'
    if (!formData.endDate) newErrors.endDate = 'End date is required'
    if (!formData.endTime) newErrors.endTime = 'End time is required'
    if (!formData.capacity.trim()) {
      newErrors.capacity = 'Capacity is required'
    } else if (parseInt(formData.capacity) <= 0) {
      newErrors.capacity = 'Capacity must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please complete all required fields',
      })
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      showToast({
        type: 'success',
        title: 'Event Updated',
        message: `${formData.name} has been updated successfully`,
      })

      setTimeout(() => {
        router.push(`/events/${event.id}`)
      }, 1500)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Update Event',
        message: 'Please try again',
      })
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof EventFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  return (
    <PageLayout maxWidth="normal">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.back()}
          className="mb-4"
        >
          Back to Event
        </Button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
            <Calendar className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Edit Event
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Update event details and settings
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Input
              label="Event Name"
              placeholder="Tech Innovation Summit 2026"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              error={errors.name}
              required
              autoFocus
            />

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description <span className="text-error">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Describe your event..."
                  rows={4}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border rounded-xl focus:outline-none focus:ring-2 text-gray-900 dark:text-white ${
                    errors.description
                      ? 'border-error focus:ring-error/20'
                      : 'border-gray-200 dark:border-dark-border focus:ring-primary-500/20'
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-error">{errors.description}</p>
                )}
              </div>
            </div>

            <Select
              label="Category"
              options={categoryOptions}
              value={formData.category}
              onChange={(e) => updateFormData('category', e.target.value)}
              error={errors.category}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Venue Name"
                placeholder="Convention Center"
                value={formData.venue}
                onChange={(e) => updateFormData('venue', e.target.value)}
                error={errors.venue}
                icon={<MapPin className="w-5 h-5" />}
                iconPosition="left"
                required
              />
              <Input
                label="Capacity"
                type="number"
                placeholder="500"
                value={formData.capacity}
                onChange={(e) => updateFormData('capacity', e.target.value)}
                error={errors.capacity}
                required
              />
            </div>

            <Input
              label="Full Address"
              placeholder="123 Event Street, City, State ZIP"
              value={formData.address}
              onChange={(e) => updateFormData('address', e.target.value)}
              error={errors.address}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => updateFormData('startDate', e.target.value)}
                error={errors.startDate}
                required
              />
              <Input
                label="Start Time"
                type="time"
                value={formData.startTime}
                onChange={(e) => updateFormData('startTime', e.target.value)}
                error={errors.startTime}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => updateFormData('endDate', e.target.value)}
                error={errors.endDate}
                required
              />
              <Input
                label="End Time"
                type="time"
                value={formData.endTime}
                onChange={(e) => updateFormData('endTime', e.target.value)}
                error={errors.endTime}
                required
              />
            </div>

            {/* Info Banner */}
            <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-primary-900 dark:text-primary-300">
                  <strong>Note:</strong> Changes to event capacity and dates may affect existing ticket sales and attendee registrations.
                </p>
              </div>
            </div>

            <div className="flex justify-between gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isLoading}
                icon={<Save className="w-5 h-5" />}
                iconPosition="right"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </PageLayout>
  )
}
