'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Edit,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Ticket,
  Clock,
  TrendingUp,
  BarChart3,
  UserCheck,
  Eye,
  Mail,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatNumber } from '@/lib/utils'
import { MOCK_EVENTS, getTicketsForEvent, getPopulatedAttendees } from '@/lib/mock-data/events'
import type { EventStatus } from '@/types/events'

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'attendees'>('overview')

  // Find the event
  const event = MOCK_EVENTS.find((e) => e.id === params.id)
  const ticketTypes = getTicketsForEvent(params.id as string)
  const attendees = getPopulatedAttendees(params.id as string)
  const checkedInCount = attendees.filter((a) => a.checkedIn).length

  if (!event) {
    return (
      <PageLayout maxWidth="normal">
        <Card className="p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Event not found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The event you're looking for doesn't exist
          </p>
          <Button variant="primary" onClick={() => router.push('/events')}>
            Back to Events
          </Button>
        </Card>
      </PageLayout>
    )
  }

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'draft':
        return <Badge variant="default" size="md">Draft</Badge>
      case 'published':
        return <Badge variant="success" size="md">Published</Badge>
      case 'ongoing':
        return <Badge variant="info" size="md">Ongoing</Badge>
      case 'completed':
        return <Badge variant="default" size="md">Completed</Badge>
      case 'cancelled':
        return <Badge variant="error" size="md">Cancelled</Badge>
    }
  }

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }

    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('en-US', options)
    }

    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`
  }

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'tickets' as const, label: 'Tickets' },
    { id: 'attendees' as const, label: 'Attendees' },
  ]

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
          Back to Events
        </Button>

        {/* Event Header Card */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {event.name}
                </h1>
                {getStatusBadge(event.status)}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {event.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4" />
                  {event.eventCode}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatEventDate(event.startDateTime, event.endDateTime)}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {event.venue}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                icon={<Edit className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => router.push(`/events/${event.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={<BarChart3 className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => router.push(`/events/${event.id}/analytics`)}
              >
                Analytics
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-500/20 dark:to-primary-600/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {formatNumber(event.capacity)}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Capacity
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-success/20 dark:to-success/30 rounded-xl flex items-center justify-center">
              <Ticket className="w-6 h-6 text-success" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {formatNumber(event.ticketsSold)}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tickets Sold
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-info/20 dark:to-info/30 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-info" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            ${formatNumber(event.totalRevenue)}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Revenue
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-warning/20 dark:to-warning/30 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-warning" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {checkedInCount}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Checked In
          </p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-dark-border mb-6">
        <nav className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Sales Progress */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Sales Progress
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    {formatNumber(event.ticketsSold)} of {formatNumber(event.capacity)} tickets sold
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {Math.round((event.ticketsSold / event.capacity) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-3">
                  <div
                    className="bg-primary-500 h-3 rounded-full transition-all"
                    style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Event Details */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Event Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Venue</p>
                  <p className="font-medium text-gray-900 dark:text-white">{event.venue}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">{event.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Organizer</p>
                  <p className="font-medium text-gray-900 dark:text-white">{event.organizerName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{event.organizerEmail}</p>
                </div>
              </div>
            </Card>

            {/* Recent Registrations */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Registrations
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/events/${event.id}/attendees`)}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {attendees.slice(0, 5).map((attendee) => (
                  <div
                    key={attendee.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {attendee.firstName} {attendee.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {attendee.ticketType?.name} • {new Date(attendee.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                    {attendee.checkedIn ? (
                      <Badge variant="success" size="sm">Checked In</Badge>
                    ) : (
                      <Badge variant="default" size="sm">Registered</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full"
                  icon={<Users className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={() => router.push(`/events/${event.id}/attendees`)}
                >
                  View Attendees
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full"
                  icon={<UserCheck className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={() => router.push(`/events/${event.id}/check-in`)}
                >
                  Check-in
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full"
                  icon={<Ticket className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={() => router.push(`/events/${event.id}/tickets`)}
                >
                  Manage Tickets
                </Button>
              </div>
            </Card>

            {/* Event Stats */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Statistics
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tickets Available</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatNumber(event.ticketsAvailable)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Check-in Rate</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {event.ticketsSold > 0 ? Math.round((checkedInCount / event.ticketsSold) * 100) : 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Ticket Price</span>
                  <span className="text-sm font-semibold text-success">
                    ${event.ticketsSold > 0 ? formatNumber(event.totalRevenue / event.ticketsSold) : 0}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Ticket Types
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/events/${event.id}/tickets`)}
              >
                Manage Tickets
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Ticket Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Sold / Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                {ticketTypes.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 dark:text-white">{ticket.name}</p>
                      {ticket.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.description}</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        ${formatNumber(ticket.price)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {formatNumber(ticket.quantitySold)} / {formatNumber(ticket.quantity)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={ticket.status === 'sold-out' ? 'error' : ticket.status === 'available' ? 'success' : 'default'}
                        size="sm"
                      >
                        {ticket.status === 'sold-out' ? 'Sold Out' : ticket.status === 'available' ? 'Available' : 'Unavailable'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full">
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                          <span>{Math.round((ticket.quantitySold / ticket.quantity) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${ticket.status === 'sold-out' ? 'bg-error' : 'bg-primary-500'}`}
                            style={{ width: `${(ticket.quantitySold / ticket.quantity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'attendees' && (
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Attendees ({attendees.length})
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/events/${event.id}/attendees`)}
              >
                View All
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Attendee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Ticket Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Purchase Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                {attendees.slice(0, 10).map((attendee) => (
                  <tr key={attendee.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {attendee.firstName} {attendee.lastName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{attendee.email}</p>
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
                      {attendee.checkedIn ? (
                        <Badge variant="success" size="sm">Checked In</Badge>
                      ) : (
                        <Badge variant="default" size="sm">Registered</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </PageLayout>
  )
}
