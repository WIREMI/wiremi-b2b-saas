'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Ticket,
  Calendar,
  Info,
  CheckCircle2,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Modal from '@/components/ui/modal'
import { useToast } from '@/hooks/useToast'
import { formatNumber } from '@/lib/utils'
import { MOCK_EVENTS, getTicketsForEvent } from '@/lib/mock-data/events'
import type { TicketStatus } from '@/types/events'

interface TicketFormData {
  name: string
  description: string
  price: string
  quantity: string
  salesStart: string
  salesEnd: string
}

export default function ManageTicketsPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()

  const event = MOCK_EVENTS.find((e) => e.id === params.id)
  const ticketTypes = getTicketsForEvent(params.id as string)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<typeof ticketTypes[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<TicketFormData>({
    name: '',
    description: '',
    price: '',
    quantity: '',
    salesStart: '',
    salesEnd: '',
  })

  if (!event) {
    return (
      <PageLayout maxWidth="normal">
        <Card className="p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Event not found
          </h3>
          <Button variant="primary" onClick={() => router.push('/events')}>
            Back to Events
          </Button>
        </Card>
      </PageLayout>
    )
  }

  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case 'available':
        return <Badge variant="success" size="sm">Available</Badge>
      case 'sold-out':
        return <Badge variant="error" size="sm">Sold Out</Badge>
      case 'unavailable':
        return <Badge variant="default" size="sm">Unavailable</Badge>
    }
  }

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      quantity: '',
      salesStart: '',
      salesEnd: '',
    })
    setErrors({})
    setShowAddModal(true)
  }

  const handleOpenEditModal = (ticket: typeof ticketTypes[0]) => {
    setSelectedTicket(ticket)
    setFormData({
      name: ticket.name,
      description: ticket.description || '',
      price: ticket.price.toString(),
      quantity: ticket.quantity.toString(),
      salesStart: ticket.salesStart.split('T')[0],
      salesEnd: ticket.salesEnd.split('T')[0],
    })
    setErrors({})
    setShowEditModal(true)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Ticket name is required'
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required'
    } else if (parseFloat(formData.price) < 0) {
      newErrors.price = 'Price cannot be negative'
    }
    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required'
    } else if (parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
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
      await new Promise((resolve) => setTimeout(resolve, 1500))

      showToast({
        type: 'success',
        title: showEditModal ? 'Ticket Updated' : 'Ticket Added',
        message: `${formData.name} has been ${showEditModal ? 'updated' : 'added'} successfully`,
      })

      setShowAddModal(false)
      setShowEditModal(false)
      setSelectedTicket(null)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Save Ticket',
        message: 'Please try again',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (ticketId: string) => {
    if (!confirm('Are you sure you want to delete this ticket type?')) return

    showToast({
      type: 'success',
      title: 'Ticket Deleted',
      message: 'Ticket type has been deleted successfully',
    })
  }

  const updateFormData = (field: keyof TicketFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  // Calculate stats
  const stats = {
    totalTickets: ticketTypes.reduce((sum, t) => sum + t.quantity, 0),
    totalSold: ticketTypes.reduce((sum, t) => sum + t.quantitySold, 0),
    totalRevenue: ticketTypes.reduce((sum, t) => sum + t.quantitySold * t.price, 0),
    types: ticketTypes.length,
  }

  return (
    <PageLayout maxWidth="wide">
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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Manage Ticket Types
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {event.name}
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-5 h-5" />}
            iconPosition="left"
            onClick={handleOpenAddModal}
          >
            Add Ticket Type
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-100 dark:bg-primary-500/20">
                <Ticket className="w-6 h-6 text-primary-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.types}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ticket Types
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-info/10">
                <CheckCircle2 className="w-6 h-6 text-info" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {formatNumber(stats.totalTickets)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Inventory
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-success/10">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {formatNumber(stats.totalSold)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tickets Sold
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-warning/10">
                <DollarSign className="w-6 h-6 text-warning" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              ${formatNumber(stats.totalRevenue)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Revenue
            </p>
          </Card>
        </div>
      </div>

      {/* Ticket Types List */}
      <div className="space-y-4">
        {ticketTypes.map((ticket) => (
          <Card key={ticket.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {ticket.name}
                  </h3>
                  {getStatusBadge(ticket.status)}
                </div>
                {ticket.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {ticket.description}
                  </p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Price</p>
                    <p className="text-lg font-bold text-primary-500">
                      ${formatNumber(ticket.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Sold / Total</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatNumber(ticket.quantitySold)} / {formatNumber(ticket.quantity)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Revenue</p>
                    <p className="text-lg font-semibold text-success">
                      ${formatNumber(ticket.quantitySold * ticket.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Available</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatNumber(ticket.quantity - ticket.quantitySold)}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <span>Sales Progress</span>
                    <span>{Math.round((ticket.quantitySold / ticket.quantity) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        ticket.status === 'sold-out' ? 'bg-error' : 'bg-primary-500'
                      }`}
                      style={{ width: `${(ticket.quantitySold / ticket.quantity) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Benefits */}
                {ticket.benefits && ticket.benefits.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Benefits:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                      {ticket.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex lg:flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Edit className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => handleOpenEditModal(ticket)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => handleDelete(ticket.id)}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {ticketTypes.length === 0 && (
        <Card className="p-12 text-center">
          <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No ticket types yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first ticket type to start selling tickets
          </p>
          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-5 h-5" />}
            iconPosition="left"
            onClick={handleOpenAddModal}
          >
            Add Ticket Type
          </Button>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal || showEditModal}
        onClose={() => {
          setShowAddModal(false)
          setShowEditModal(false)
          setSelectedTicket(null)
        }}
        title={showEditModal ? 'Edit Ticket Type' : 'Add Ticket Type'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Ticket Name"
            placeholder="General Admission"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            error={errors.name}
            required
            autoFocus
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              placeholder="Describe this ticket type..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (USD)"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => updateFormData('price', e.target.value)}
              error={errors.price}
              icon={<DollarSign className="w-5 h-5" />}
              iconPosition="left"
              required
            />
            <Input
              label="Quantity"
              type="number"
              placeholder="100"
              value={formData.quantity}
              onChange={(e) => updateFormData('quantity', e.target.value)}
              error={errors.quantity}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Sales Start Date"
              type="date"
              value={formData.salesStart}
              onChange={(e) => updateFormData('salesStart', e.target.value)}
              icon={<Calendar className="w-5 h-5" />}
              iconPosition="left"
            />
            <Input
              label="Sales End Date"
              type="date"
              value={formData.salesEnd}
              onChange={(e) => updateFormData('salesEnd', e.target.value)}
              icon={<Calendar className="w-5 h-5" />}
              iconPosition="left"
            />
          </div>

          <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-primary-900 dark:text-primary-300">
                <strong>Note:</strong> Ticket prices and quantities can be adjusted after creation, but changes may affect existing sales.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => {
                setShowAddModal(false)
                setShowEditModal(false)
                setSelectedTicket(null)
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isLoading}
            >
              {showEditModal ? 'Save Changes' : 'Add Ticket'}
            </Button>
          </div>
        </form>
      </Modal>
    </PageLayout>
  )
}
