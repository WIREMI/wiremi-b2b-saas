'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  FileText,
  Ticket,
  CheckCircle2,
  Plus,
  Trash2,
  Info,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
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
  organizerName: string
  organizerEmail: string
}

interface TicketTypeForm {
  id: string
  name: string
  description: string
  price: string
  quantity: string
  salesStart: string
  salesEnd: string
  benefits: string[]
}

type FormStep = 1 | 2 | 3

export default function CreateEventPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    description: '',
    category: '',
    venue: '',
    address: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    capacity: '',
    organizerName: '',
    organizerEmail: '',
  })

  const [ticketTypes, setTicketTypes] = useState<TicketTypeForm[]>([
    {
      id: '1',
      name: '',
      description: '',
      price: '',
      quantity: '',
      salesStart: '',
      salesEnd: '',
      benefits: [''],
    },
  ])

  const categoryOptions = [
    { value: '', label: 'Select category' },
    { value: 'conference', label: 'Conference' },
    { value: 'concert', label: 'Concert' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'sports', label: 'Sports' },
    { value: 'networking', label: 'Networking' },
    { value: 'other', label: 'Other' },
  ]

  const validateStep1 = () => {
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

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    ticketTypes.forEach((ticket, index) => {
      if (!ticket.name.trim()) newErrors[`ticket_${index}_name`] = 'Ticket name is required'
      if (!ticket.price.trim()) {
        newErrors[`ticket_${index}_price`] = 'Price is required'
      } else if (parseFloat(ticket.price) < 0) {
        newErrors[`ticket_${index}_price`] = 'Price cannot be negative'
      }
      if (!ticket.quantity.trim()) {
        newErrors[`ticket_${index}_quantity`] = 'Quantity is required'
      } else if (parseInt(ticket.quantity) <= 0) {
        newErrors[`ticket_${index}_quantity`] = 'Quantity must be greater than 0'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false

    switch (currentStep) {
      case 1:
        isValid = validateStep1()
        break
      case 2:
        isValid = validateStep2()
        break
    }

    if (isValid) {
      setCurrentStep((currentStep + 1) as FormStep)
    } else {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please complete all required fields',
      })
    }
  }

  const handleBack = () => {
    setCurrentStep((currentStep - 1) as FormStep)
    setErrors({})
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateStep2()) {
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
        title: 'Event Created',
        message: `${formData.name} has been created successfully`,
      })

      setTimeout(() => {
        router.push('/events')
      }, 1500)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Create Event',
        message: 'Please try again',
      })
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof EventFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const addTicketType = () => {
    setTicketTypes([
      ...ticketTypes,
      {
        id: Date.now().toString(),
        name: '',
        description: '',
        price: '',
        quantity: '',
        salesStart: '',
        salesEnd: '',
        benefits: [''],
      },
    ])
  }

  const removeTicketType = (id: string) => {
    if (ticketTypes.length > 1) {
      setTicketTypes(ticketTypes.filter((t) => t.id !== id))
    }
  }

  const updateTicketType = (id: string, field: keyof TicketTypeForm, value: string) => {
    setTicketTypes(
      ticketTypes.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    )
    setErrors((prev) => {
      const index = ticketTypes.findIndex((t) => t.id === id)
      return { ...prev, [`ticket_${index}_${field}`]: '' }
    })
  }

  const addBenefit = (ticketId: string) => {
    setTicketTypes(
      ticketTypes.map((t) =>
        t.id === ticketId ? { ...t, benefits: [...t.benefits, ''] } : t
      )
    )
  }

  const updateBenefit = (ticketId: string, benefitIndex: number, value: string) => {
    setTicketTypes(
      ticketTypes.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              benefits: t.benefits.map((b, i) => (i === benefitIndex ? value : b)),
            }
          : t
      )
    )
  }

  const removeBenefit = (ticketId: string, benefitIndex: number) => {
    setTicketTypes(
      ticketTypes.map((t) =>
        t.id === ticketId
          ? { ...t, benefits: t.benefits.filter((_, i) => i !== benefitIndex) }
          : t
      )
    )
  }

  const steps = [
    { number: 1, label: 'Event Details', icon: Calendar },
    { number: 2, label: 'Ticket Types', icon: Ticket },
    { number: 3, label: 'Review', icon: CheckCircle2 },
  ]

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
          Back to Events
        </Button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
            <Calendar className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create New Event
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete the form to create a new event
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all ${
                        isCompleted
                          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                          : isActive
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-dark-surface text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <Icon
                          className={`w-6 h-6 ${
                            isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'
                          }`}
                        />
                      )}
                    </div>
                    <p
                      className={`text-sm font-medium mt-2 ${
                        isActive || isCompleted
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 dark:text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 -mt-6 ${
                        isCompleted
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
      </div>

      {/* Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Event Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Event Details
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Enter the basic information about your event
                </p>
              </div>

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

              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleNext}
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Ticket Types */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Ticket Types
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add different ticket types with pricing and benefits
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={addTicketType}
                >
                  Add Ticket Type
                </Button>
              </div>

              {ticketTypes.map((ticket, index) => (
                <Card key={ticket.id} className="p-6 bg-gray-50 dark:bg-dark-bg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Ticket Type {index + 1}
                    </h3>
                    {ticketTypes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 className="w-4 h-4" />}
                        onClick={() => removeTicketType(ticket.id)}
                      />
                    )}
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Ticket Name"
                      placeholder="General Admission"
                      value={ticket.name}
                      onChange={(e) => updateTicketType(ticket.id, 'name', e.target.value)}
                      error={errors[`ticket_${index}_name`]}
                      required
                    />

                    <Input
                      label="Description"
                      placeholder="Standard event access"
                      value={ticket.description}
                      onChange={(e) => updateTicketType(ticket.id, 'description', e.target.value)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Price (USD)"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={ticket.price}
                        onChange={(e) => updateTicketType(ticket.id, 'price', e.target.value)}
                        error={errors[`ticket_${index}_price`]}
                        required
                      />
                      <Input
                        label="Quantity"
                        type="number"
                        placeholder="100"
                        value={ticket.quantity}
                        onChange={(e) => updateTicketType(ticket.id, 'quantity', e.target.value)}
                        error={errors[`ticket_${index}_quantity`]}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Benefits
                      </label>
                      {ticket.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex gap-2 mb-2">
                          <Input
                            placeholder="e.g., All sessions access"
                            value={benefit}
                            onChange={(e) =>
                              updateBenefit(ticket.id, benefitIndex, e.target.value)
                            }
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            icon={<Trash2 className="w-4 h-4" />}
                            onClick={() => removeBenefit(ticket.id, benefitIndex)}
                          />
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        icon={<Plus className="w-4 h-4" />}
                        iconPosition="left"
                        onClick={() => addBenefit(ticket.id)}
                      >
                        Add Benefit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex justify-between gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleNext}
                >
                  Review
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Review & Publish
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Review your event details before publishing
                </p>
              </div>

              {/* Event Summary */}
              <Card className="p-6 bg-gray-50 dark:bg-dark-bg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Event Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Event Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">{formData.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                      <p className="font-medium text-gray-900 dark:text-white">{formData.capacity}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Venue</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formData.venue}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{formData.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Date & Time</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formData.startDate} {formData.startTime} - {formData.endDate} {formData.endTime}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Ticket Types Summary */}
              <Card className="p-6 bg-gray-50 dark:bg-dark-bg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Ticket Types ({ticketTypes.length})
                </h3>
                <div className="space-y-4">
                  {ticketTypes.map((ticket, index) => (
                    <div key={ticket.id} className="p-4 bg-gray-50 dark:bg-dark-surface rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{ticket.name}</h4>
                        <p className="text-lg font-bold text-primary-500">${ticket.price}</p>
                      </div>
                      {ticket.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{ticket.description}</p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quantity: {ticket.quantity}
                      </p>
                      {ticket.benefits.filter(b => b).length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">Benefits:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                            {ticket.benefits.filter(b => b).map((benefit, i) => (
                              <li key={i}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Info Banner */}
              <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-primary-900 dark:text-primary-300">
                    <strong>Ready to publish?</strong> Your event will be published as a draft. You can edit it anytime and publish it when ready.
                  </p>
                </div>
              </div>

              <div className="flex justify-between gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  icon={<CheckCircle2 className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Create Event
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </PageLayout>
  )
}
