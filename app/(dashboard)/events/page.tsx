'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Search,
  Filter,
  Plus,
  MapPin,
  Clock,
  Eye,
  Edit,
  BarChart3,
  Ticket,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { formatNumber } from '@/lib/utils'
import { MOCK_EVENTS } from '@/lib/mock-data/events'
import type { Event, EventStatus, EventCategory } from '@/types/events'

export default function EventsPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'conference', label: 'Conference' },
    { value: 'concert', label: 'Concert' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'sports', label: 'Sports' },
    { value: 'networking', label: 'Networking' },
    { value: 'other', label: 'Other' },
  ]

  // Filter events
  const filteredEvents = MOCK_EVENTS.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.eventCode.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Calculate stats
  const stats = {
    totalEvents: MOCK_EVENTS.length,
    published: MOCK_EVENTS.filter((e) => e.status === 'published').length,
    totalRevenue: MOCK_EVENTS.reduce((sum, e) => sum + e.totalRevenue, 0),
    totalAttendees: MOCK_EVENTS.reduce((sum, e) => sum + e.ticketsSold, 0),
  }

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'draft':
        return <Badge variant="default" size="sm">Draft</Badge>
      case 'published':
        return <Badge variant="success" size="sm">Published</Badge>
      case 'ongoing':
        return <Badge variant="info" size="sm">Ongoing</Badge>
      case 'completed':
        return <Badge variant="default" size="sm">Completed</Badge>
      case 'cancelled':
        return <Badge variant="error" size="sm">Cancelled</Badge>
    }
  }

  const getCategoryColor = (category: EventCategory) => {
    switch (category) {
      case 'conference':
        return 'bg-primary-100 dark:bg-primary-500/20 text-primary-500'
      case 'concert':
        return 'bg-purple-100 dark:bg-purple-500/20 text-purple-500'
      case 'workshop':
        return 'bg-info/10 text-info'
      case 'sports':
        return 'bg-success/10 text-success'
      case 'networking':
        return 'bg-warning/10 text-warning'
      default:
        return 'bg-gray-100 dark:bg-gray-500/20 text-gray-500 dark:text-gray-400'
    }
  }

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }

    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString('en-US', options)
    }

    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', options)}`
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Event Ticketing
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage events, ticket sales, and attendee registrations
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => router.push('/events/create')}
          >
            Create Event
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-500/20 dark:to-primary-600/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalEvents}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Events
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-success/20 dark:to-success/30 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.published}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Published Events
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-info/20 dark:to-info/30 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-info" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              ${formatNumber(stats.totalRevenue)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Revenue
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-warning/20 dark:to-warning/30 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-warning" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {formatNumber(stats.totalAttendees)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Attendees
            </p>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search events by name, venue, or event code..."
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
                label="Category"
                options={categoryOptions}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredEvents.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{MOCK_EVENTS.length}</span> events
            </p>
          </div>
        </Card>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="p-5 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {event.name}
                  </h3>
                  <Badge variant={event.status === 'draft' ? 'default' : event.status === 'published' ? 'success' : event.status === 'ongoing' ? 'info' : event.status === 'completed' ? 'default' : 'error'} size="sm" className="">
                    {event.status === 'draft' ? 'Draft' : event.status === 'published' ? 'Published' : event.status === 'ongoing' ? 'Ongoing' : event.status === 'completed' ? 'Completed' : 'Cancelled'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className={`px-2 py-1 rounded text-xs font-medium capitalize ${getCategoryColor(event.category)}`}>
                  {event.category}
                </div>
                <span>•</span>
                <Badge variant="default" size="sm" className="font-mono">{event.eventCode}</Badge>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{formatEventDate(event.startDateTime, event.endDateTime)}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{event.venue}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200 dark:border-dark-border mb-4">
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Tickets Sold</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatNumber(event.ticketsSold)} / {formatNumber(event.capacity)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Revenue</p>
                <p className="text-sm font-semibold text-success">
                  ${formatNumber(event.totalRevenue)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Availability</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatNumber(event.ticketsAvailable)}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                <span>Sales Progress</span>
                <span>{Math.round((event.ticketsSold / event.capacity) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full"
                  style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={<Eye className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => router.push(`/events/${event.id}`)}
                className="flex-1 hover:scale-[1.01] transition-all duration-200"
              >
                View Details
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<Edit className="w-4 h-4" />}
                onClick={() => router.push(`/events/${event.id}/edit`)}
                className="hover:scale-[1.01] transition-all duration-200"
              />
              <Button
                variant="ghost"
                size="sm"
                icon={<BarChart3 className="w-4 h-4" />}
                onClick={() => router.push(`/events/${event.id}/analytics`)}
                className="hover:scale-[1.01] transition-all duration-200"
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <Card className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-dark-surface rounded-full mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No events found
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
              setCategoryFilter('all')
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}
    </PageLayout>
  )
}
