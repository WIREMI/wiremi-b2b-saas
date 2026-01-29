'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Search,
  UserCheck,
  CheckCircle2,
  XCircle,
  Ticket,
  Mail,
  Phone,
  Clock,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import { useToast } from '@/hooks/useToast'
import { MOCK_EVENTS, getPopulatedAttendees } from '@/lib/mock-data/events'
import { formatNumber } from '@/lib/utils'

export default function CheckInPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()

  const event = MOCK_EVENTS.find((e) => e.id === params.id)
  const allAttendees = getPopulatedAttendees(params.id as string)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAttendee, setSelectedAttendee] = useState<typeof allAttendees[0] | null>(null)
  const [checkedInIds, setCheckedInIds] = useState<string[]>(
    allAttendees.filter((a) => a.checkedIn).map((a) => a.id)
  )

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

  // Filter attendees based on search
  const filteredAttendees = allAttendees.filter((attendee) =>
    searchQuery.length >= 2 &&
    (attendee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendee.ticketCode.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleCheckIn = (attendeeId: string) => {
    setCheckedInIds([...checkedInIds, attendeeId])
    setSelectedAttendee(null)
    setSearchQuery('')
    showToast({
      type: 'success',
      title: 'Check-in Successful',
      message: 'Attendee has been checked in',
    })
  }

  const handleSelectAttendee = (attendee: typeof allAttendees[0]) => {
    setSelectedAttendee(attendee)
    setSearchQuery('')
  }

  const stats = {
    total: allAttendees.length,
    checkedIn: checkedInIds.length,
    remaining: allAttendees.length - checkedInIds.length,
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
            <UserCheck className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Event Check-in
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {event.name}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stats.total}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Expected
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-success mb-2">
                {stats.checkedIn}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Checked In
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-warning mb-2">
                {stats.remaining}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remaining
              </p>
            </div>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="p-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              Check-in Progress
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.round((stats.checkedIn / stats.total) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-3">
            <div
              className="bg-success h-3 rounded-full transition-all"
              style={{ width: `${(stats.checkedIn / stats.total) * 100}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Search Section */}
      <Card className="p-8 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Attendee
          </label>
          <Input
            placeholder="Enter name, email, or ticket code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5" />}
            iconPosition="left"
            autoFocus
          />
        </div>

        {/* Search Results */}
        {searchQuery.length >= 2 && filteredAttendees.length > 0 && (
          <div className="border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden">
            {filteredAttendees.map((attendee) => {
              const isCheckedIn = checkedInIds.includes(attendee.id)
              return (
                <button
                  key={attendee.id}
                  onClick={() => !isCheckedIn && handleSelectAttendee(attendee)}
                  disabled={isCheckedIn}
                  className={`w-full p-4 flex items-center justify-between border-b border-gray-200 dark:border-dark-border last:border-b-0 transition-colors ${
                    isCheckedIn
                      ? 'bg-gray-50 dark:bg-dark-bg cursor-not-allowed opacity-60'
                      : 'hover:bg-gray-50 dark:hover:bg-dark-bg cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary-500">
                        {attendee.firstName[0]}{attendee.lastName[0]}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {attendee.firstName} {attendee.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {attendee.ticketType?.name} • {attendee.ticketCode}
                      </p>
                    </div>
                  </div>
                  {isCheckedIn ? (
                    <Badge variant="success" size="sm">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Checked In
                    </Badge>
                  ) : (
                    <Badge variant="default" size="sm">Check In</Badge>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {searchQuery.length >= 2 && filteredAttendees.length === 0 && (
          <div className="text-center py-8 border border-gray-200 dark:border-dark-border rounded-xl">
            <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">
              No attendees found matching "{searchQuery}"
            </p>
          </div>
        )}
      </Card>

      {/* Selected Attendee Details */}
      {selectedAttendee && (
        <Card className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 dark:bg-primary-500/20 rounded-full mb-4">
              <span className="text-2xl font-bold text-primary-500">
                {selectedAttendee.firstName[0]}{selectedAttendee.lastName[0]}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedAttendee.firstName} {selectedAttendee.lastName}
            </h2>
            <Badge variant="info" size="md">{selectedAttendee.ticketType?.name}</Badge>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
              <Ticket className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ticket Code</p>
                <p className="font-mono font-semibold text-gray-900 dark:text-white">
                  {selectedAttendee.ticketCode}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedAttendee.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {selectedAttendee.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
              <Clock className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Purchase Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(selectedAttendee.purchaseDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setSelectedAttendee(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              icon={<CheckCircle2 className="w-5 h-5" />}
              iconPosition="right"
              onClick={() => handleCheckIn(selectedAttendee.id)}
            >
              Confirm Check-in
            </Button>
          </div>
        </Card>
      )}

      {/* Recent Check-ins */}
      {!selectedAttendee && checkedInIds.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Check-ins
          </h2>
          <div className="space-y-2">
            {allAttendees
              .filter((a) => checkedInIds.includes(a.id))
              .slice(0, 5)
              .map((attendee) => (
                <div
                  key={attendee.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {attendee.firstName} {attendee.lastName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {attendee.ticketType?.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Just now</p>
                </div>
              ))}
          </div>
        </Card>
      )}
    </PageLayout>
  )
}
