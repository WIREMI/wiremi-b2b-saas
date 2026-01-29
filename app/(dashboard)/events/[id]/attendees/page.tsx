'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Mail,
  UserCheck,
  Eye,
  CheckCircle2,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
import { MOCK_EVENTS, getPopulatedAttendees } from '@/lib/mock-data/events'
import type { AttendeeStatus } from '@/types/events'

export default function AttendeesPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()

  const event = MOCK_EVENTS.find((e) => e.id === params.id)
  const allAttendees = getPopulatedAttendees(params.id as string)

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [ticketFilter, setTicketFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([])

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

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'registered', label: 'Registered' },
    { value: 'checked-in', label: 'Checked In' },
    { value: 'no-show', label: 'No Show' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  // Get unique ticket types
  const ticketTypes = Array.from(new Set(allAttendees.map((a) => a.ticketType?.name).filter(Boolean)))
  const ticketOptions = [
    { value: 'all', label: 'All Ticket Types' },
    ...ticketTypes.map((type) => ({ value: type!, label: type! })),
  ]

  // Filter attendees
  const filteredAttendees = allAttendees.filter((attendee) => {
    const matchesSearch =
      attendee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.ticketCode.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || attendee.status === statusFilter
    const matchesTicket = ticketFilter === 'all' || attendee.ticketType?.name === ticketFilter

    return matchesSearch && matchesStatus && matchesTicket
  })

  const getStatusBadge = (status: AttendeeStatus) => {
    switch (status) {
      case 'registered':
        return <Badge variant="default" size="sm">Registered</Badge>
      case 'checked-in':
        return <Badge variant="success" size="sm">Checked In</Badge>
      case 'no-show':
        return <Badge variant="warning" size="sm">No Show</Badge>
      case 'cancelled':
        return <Badge variant="error" size="sm">Cancelled</Badge>
    }
  }

  const handleSelectAll = () => {
    if (selectedAttendees.length === filteredAttendees.length) {
      setSelectedAttendees([])
    } else {
      setSelectedAttendees(filteredAttendees.map((a) => a.id))
    }
  }

  const handleSelectAttendee = (id: string) => {
    if (selectedAttendees.includes(id)) {
      setSelectedAttendees(selectedAttendees.filter((aid) => aid !== id))
    } else {
      setSelectedAttendees([...selectedAttendees, id])
    }
  }

  const handleCheckIn = (attendeeId: string) => {
    showToast({
      type: 'success',
      title: 'Check-in Successful',
      message: 'Attendee has been checked in',
    })
  }

  const stats = {
    total: allAttendees.length,
    checkedIn: allAttendees.filter((a) => a.checkedIn).length,
    registered: allAttendees.filter((a) => !a.checkedIn).length,
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
              Attendees
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {event.name}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Mail className="w-5 h-5" />}
              iconPosition="left"
            >
              Send Email
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-5 h-5" />}
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<UserCheck className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push(`/events/${event.id}/check-in`)}
            >
              Check-in
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-500/20 dark:to-primary-600/20 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Attendees</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 dark:from-success/20 dark:to-success/30 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.checkedIn}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Checked In</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-info/20 dark:to-info/30 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.registered}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Not Checked In</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or ticket code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                iconPosition="left"
              />
            </div>
            <Button
              variant="outline"
              size="md"
              icon={<Filter className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
              <Select
                label="Status"
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
              <Select
                label="Ticket Type"
                options={ticketOptions}
                value={ticketFilter}
                onChange={(e) => setTicketFilter(e.target.value)}
              />
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredAttendees.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{allAttendees.length}</span> attendees
              {selectedAttendees.length > 0 && (
                <span>
                  {' • '}
                  <span className="font-semibold text-primary-500">
                    {selectedAttendees.length} selected
                  </span>
                </span>
              )}
            </p>
          </div>
        </Card>
      </div>

      {/* Attendees Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedAttendees.length === filteredAttendees.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Ticket Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Attendee
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Ticket Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Purchase Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredAttendees.map((attendee) => (
                <tr
                  key={attendee.id}
                  className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedAttendees.includes(attendee.id)}
                      onChange={() => handleSelectAttendee(attendee.id)}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-mono text-gray-900 dark:text-white">
                      {attendee.ticketCode}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {attendee.firstName} {attendee.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {attendee.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {attendee.ticketType?.name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {new Date(attendee.purchaseDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(attendee.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!attendee.checkedIn && (
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<UserCheck className="w-4 h-4" />}
                          onClick={() => handleCheckIn(attendee.id)}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredAttendees.length === 0 && (
          <div className="text-center py-12 px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-dark-surface rounded-full mb-4">
              <CheckCircle2 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No attendees found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
                setTicketFilter('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Card>
    </PageLayout>
  )
}
