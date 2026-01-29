'use client'

import { useState } from 'react'
import {
  TrendingUp,
  DollarSign,
  Home,
  Calendar,
  Users,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Smartphone,
  Globe,
  Phone,
  Building2,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  MOCK_PROPERTY_ANALYTICS,
  MOCK_REVENUE_BY_MONTH,
  MOCK_BOOKING_SOURCES,
  MOCK_ROOM_TYPE_PERFORMANCE,
  MOCK_PROPERTIES,
} from '@/lib/mock-data/hospitality'

export default function HospitalityAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const analytics = MOCK_PROPERTY_ANALYTICS

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate trends (simplified - comparing to previous period)
  const trends = {
    occupancy: +5.3,
    adr: +2.1,
    revpar: +7.8,
    revenue: +8.2,
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics & Performance</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track key metrics and property performance
            </p>
          </div>
          <div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Occupancy Rate */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-primary-500" />
            </div>
            <Badge
              variant={trends.occupancy >= 0 ? 'success' : 'error'}
              size="sm"
            >
              <div className="flex items-center gap-1">
                {trends.occupancy >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(trends.occupancy)}%
              </div>
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {analytics.occupancyRate}%
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Occupancy Rate</p>
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all"
              style={{ width: `${analytics.occupancyRate}%` }}
            />
          </div>
        </Card>

        {/* Average Daily Rate (ADR) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <Badge
              variant={trends.adr >= 0 ? 'success' : 'error'}
              size="sm"
            >
              <div className="flex items-center gap-1">
                {trends.adr >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(trends.adr)}%
              </div>
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {formatCurrency(analytics.averageDailyRate)}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Average Daily Rate</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-2">
            Per occupied room per night
          </p>
        </Card>

        {/* Revenue Per Available Room (RevPAR) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <Badge
              variant={trends.revpar >= 0 ? 'success' : 'error'}
              size="sm"
            >
              <div className="flex items-center gap-1">
                {trends.revpar >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(trends.revpar)}%
              </div>
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {formatCurrency(analytics.revenuePerAvailableRoom)}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">RevPAR</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-2">
            ADR × Occupancy Rate
          </p>
        </Card>

        {/* Total Revenue */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <Badge
              variant={trends.revenue >= 0 ? 'success' : 'error'}
              size="sm"
            >
              <div className="flex items-center gap-1">
                {trends.revenue >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(trends.revenue)}%
              </div>
            </Badge>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {formatCurrency(analytics.totalRevenue)}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-2">
            {analytics.totalBookings} bookings
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
          <div className="space-y-3">
            {MOCK_REVENUE_BY_MONTH.map((month, index) => {
              const maxRevenue = Math.max(...MOCK_REVENUE_BY_MONTH.map(m => m.revenue))
              const widthPercentage = (month.revenue / maxRevenue) * 100

              return (
                <div key={month.month}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {new Date(month.month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(month.revenue)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${widthPercentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {month.bookings} bookings
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {month.occupancyRate}% occupancy
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Booking Sources */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Booking Sources</h3>
          <div className="space-y-4">
            {MOCK_BOOKING_SOURCES.map((source) => {
              const icons: Record<string, any> = {
                DIRECT: Globe,
                MOBILE_APP: Smartphone,
                OTA: Building2,
                PHONE: Phone,
                WALK_IN: Users,
              }
              const Icon = icons[source.source]

              return (
                <div key={source.source} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {source.source.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(source.revenue)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                        {source.count} bookings
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full transition-all"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 min-w-[40px] text-right">
                      {source.percentage}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Room Type Performance */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Room Type Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Room Type</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Bookings</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Revenue</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">Occupancy</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">ADR</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ROOM_TYPE_PERFORMANCE.map((roomType) => (
                <tr key={roomType.roomTypeId} className="border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900 dark:text-white">{roomType.roomTypeName}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-gray-700 dark:text-gray-300">{roomType.totalBookings}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(roomType.revenue)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-primary-500 h-1.5 rounded-full"
                          style={{ width: `${roomType.occupancyRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[40px]">
                        {roomType.occupancyRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(roomType.averageDailyRate)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Stay Length</h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.averageStayLength} nights</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-teal-100 dark:bg-teal-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Repeat Guests</h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.repeatGuestRate}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-500/20 rounded-lg flex items-center justify-center">
              <PieChart className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Cancellation Rate</h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.cancellationRate}%</p>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
