'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Users,
  Ticket,
  Calendar,
  Download,
  BarChart3,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Select from '@/components/ui/select'
import { formatNumber } from '@/lib/utils'
import { MOCK_EVENTS, getTicketsForEvent, getPopulatedAttendees } from '@/lib/mock-data/events'

export default function AnalyticsPage() {
  const params = useParams()
  const router = useRouter()

  const event = MOCK_EVENTS.find((e) => e.id === params.id)
  const ticketTypes = getTicketsForEvent(params.id as string)
  const attendees = getPopulatedAttendees(params.id as string)

  const [timeframe, setTimeframe] = useState('all')

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

  const timeframeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
  ]

  // Mock sales data for chart visualization
  const salesData = [
    { date: 'Week 1', sales: 420, revenue: 62950 },
    { date: 'Week 2', sales: 680, revenue: 102000 },
    { date: 'Week 3', sales: 890, revenue: 133500 },
    { date: 'Week 4', sales: 1257, revenue: 188450 },
    { date: 'Current', sales: event.ticketsSold, revenue: event.totalRevenue },
  ]

  const maxSales = Math.max(...salesData.map((d) => d.sales))
  const checkedInCount = attendees.filter((a) => a.checkedIn).length

  // Calculate ticket type breakdown
  const ticketTypeStats = ticketTypes.map((ticket) => ({
    ...ticket,
    percentage: (ticket.quantitySold / event.ticketsSold) * 100,
    revenue: ticket.quantitySold * ticket.price,
  }))

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${formatNumber(event.totalRevenue)}`,
      change: '+24.5%',
      trend: 'up',
      icon: DollarSign,
      iconBg: 'bg-success/10 text-success',
    },
    {
      label: 'Tickets Sold',
      value: formatNumber(event.ticketsSold),
      change: `${Math.round((event.ticketsSold / event.capacity) * 100)}%`,
      trend: 'up',
      icon: Ticket,
      iconBg: 'bg-primary-100 dark:bg-primary-500/20 text-primary-500',
    },
    {
      label: 'Attendees',
      value: formatNumber(attendees.length),
      change: `${checkedInCount} checked in`,
      trend: 'neutral',
      icon: Users,
      iconBg: 'bg-info/10 text-info',
    },
    {
      label: 'Avg. Ticket Price',
      value: `$${formatNumber(event.totalRevenue / event.ticketsSold)}`,
      change: '+12.3%',
      trend: 'up',
      icon: TrendingUp,
      iconBg: 'bg-warning/10 text-warning',
    },
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
          Back to Event
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Event Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {event.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select
              options={timeframeOptions}
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            />
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-5 h-5" />}
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-success">
                    {stat.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sales Over Time */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sales Over Time
              </h2>
              <Button variant="ghost" size="sm" icon={<BarChart3 className="w-4 h-4" />} />
            </div>

            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">{data.date}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatNumber(data.sales)} tickets
                      </span>
                      <span className="font-semibold text-success">
                        ${formatNumber(data.revenue)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${(data.sales / maxSales) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Revenue Breakdown */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Revenue Breakdown
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Gross Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${formatNumber(event.totalRevenue)}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Projected Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${formatNumber((event.totalRevenue / event.ticketsSold) * event.capacity)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Average Order Value</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${formatNumber(event.totalRevenue / attendees.length)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Revenue per Ticket</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${formatNumber(event.totalRevenue / event.ticketsSold)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Capacity Utilization</span>
                <span className="font-semibold text-success">
                  {Math.round((event.ticketsSold / event.capacity) * 100)}%
                </span>
              </div>
            </div>
          </Card>

          {/* Attendance Metrics */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Attendance Metrics
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Check-in Rate</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {checkedInCount} / {attendees.length} ({Math.round((checkedInCount / attendees.length) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                  <div
                    className="bg-success h-2 rounded-full"
                    style={{ width: `${(checkedInCount / attendees.length) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Registration Rate</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {attendees.length} / {event.ticketsSold} ({Math.round((attendees.length / event.ticketsSold) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                  <div
                    className="bg-info h-2 rounded-full"
                    style={{ width: `${(attendees.length / event.ticketsSold) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Type Distribution */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Ticket Type Distribution
            </h2>

            <div className="space-y-4">
              {ticketTypeStats.map((ticket, index) => (
                <div key={ticket.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {ticket.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {formatNumber(ticket.quantitySold)} sold
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        ${formatNumber(ticket.revenue)}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {ticket.percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-primary-500' : index === 1 ? 'bg-success' : 'bg-info'
                      }`}
                      style={{ width: `${ticket.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Metrics */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Key Insights
            </h2>
            <div className="space-y-4">
              <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
                <p className="text-sm font-medium text-success mb-1">Best Seller</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {ticketTypeStats[0]?.name || 'N/A'} - {formatNumber(ticketTypeStats[0]?.quantitySold || 0)} sold
                </p>
              </div>

              <div className="p-3 bg-info/5 border border-info/20 rounded-lg">
                <p className="text-sm font-medium text-info mb-1">Revenue Leader</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  ${formatNumber(ticketTypeStats[0]?.revenue || 0)} from {ticketTypeStats[0]?.name || 'N/A'}
                </p>
              </div>

              <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
                <p className="text-sm font-medium text-warning mb-1">Sales Pace</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {Math.round(event.ticketsSold / 30)} tickets per day avg.
                </p>
              </div>
            </div>
          </Card>

          {/* Event Timeline */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Event Timeline
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Event Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(event.startDateTime).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Created</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(event.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
