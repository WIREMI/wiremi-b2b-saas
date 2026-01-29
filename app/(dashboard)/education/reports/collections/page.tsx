'use client'

import { useState } from 'react'
import { Download, TrendingUp, DollarSign, Calendar, PieChart as PieChartIcon } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import {
  MOCK_INSTITUTIONS,
  MOCK_FACULTIES,
  MOCK_DEPARTMENTS,
} from '@/lib/mock-data/education-institutions'
import { formatCurrency } from '@/lib/utils'

export default function CollectionsReportPage() {
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'year'>('month')
  const [groupBy, setGroupBy] = useState<'institution' | 'faculty' | 'department' | 'fee-type'>('faculty')

  // Mock data for demonstration
  const totalCollections = 1250000000 // XAF
  const targetAmount = 1500000000
  const collectionRate = (totalCollections / targetAmount) * 100
  const growth = 15.3

  // Calculate collections by faculty (mock data)
  const facultyCollections = MOCK_FACULTIES.map((faculty) => ({
    ...faculty,
    collected: faculty.totalRevenue,
    target: faculty.totalRevenue + faculty.outstandingBalance,
    rate: (faculty.totalRevenue / (faculty.totalRevenue + faculty.outstandingBalance)) * 100,
  })).sort((a, b) => b.collected - a.collected)

  // Calculate collections by institution
  const institutionCollections = MOCK_INSTITUTIONS.map((institution) => ({
    ...institution,
    collected: institution.totalRevenue,
    target: institution.totalRevenue + institution.outstandingBalance,
    rate: (institution.totalRevenue / (institution.totalRevenue + institution.outstandingBalance)) * 100,
  })).sort((a, b) => b.collected - a.collected)

  const dateRangeLabels = {
    today: 'Today',
    week: 'This Week',
    month: 'This Month',
    year: 'This Year',
  }

  const groupByLabels = {
    institution: 'By Institution',
    faculty: 'By Faculty',
    department: 'By Department',
    'fee-type': 'By Fee Type',
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Collections Report
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track revenue collection across institutions and departments
            </p>
          </div>

          <Button
            variant="outline"
            icon={<Download className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => console.log('Export report')}
          >
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Range */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date Range
                </label>
                <div className="flex gap-2">
                  {(['today', 'week', 'month', 'year'] as const).map((range) => (
                    <Button
                      key={range}
                      variant={dateRange === range ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setDateRange(range)}
                    >
                      {dateRangeLabels[range]}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Group By */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  <PieChartIcon className="w-4 h-4 inline mr-2" />
                  Group By
                </label>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {Object.entries(groupByLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Collections"
            value={formatCurrency(totalCollections, 'XAF')}
            icon={<DollarSign className="w-5 h-5" />}
            change={`+${growth}%`}
            trend="up"
          />
          <StatsCard
            label="Target Amount"
            value={formatCurrency(targetAmount, 'XAF')}
            icon={<DollarSign className="w-5 h-5" />}
          />
          <StatsCard
            label="Collection Rate"
            value={`${collectionRate.toFixed(1)}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            change="+2.3%"
            trend="up"
          />
          <StatsCard
            label="Outstanding"
            value={formatCurrency(targetAmount - totalCollections, 'XAF')}
            icon={<DollarSign className="w-5 h-5" />}
          />
        </div>

        {/* Collections by Faculty/Institution */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Collections {groupByLabels[groupBy]}
            </h2>

            <div className="space-y-4">
              {groupBy === 'faculty' && facultyCollections.map((faculty, index) => (
                <div key={faculty.id} className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className={`text-lg font-bold ${
                      index === 0 ? 'text-amber-500' :
                      index === 1 ? 'text-gray-400' :
                      index === 2 ? 'text-orange-600' :
                      'text-gray-600 dark:text-gray-400'
                    }`}>
                      #{index + 1}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {faculty.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Code: {faculty.code}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(faculty.collected, faculty.defaultCurrency)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          of {formatCurrency(faculty.target, faculty.defaultCurrency)}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            faculty.rate >= 90 ? 'bg-success' :
                            faculty.rate >= 70 ? 'bg-primary-500' :
                            faculty.rate >= 50 ? 'bg-warning' :
                            'bg-error'
                          }`}
                          style={{ width: `${Math.min(faculty.rate, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                        {faculty.rate.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {groupBy === 'institution' && institutionCollections.map((institution, index) => (
                <div key={institution.id} className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className={`text-lg font-bold ${
                      index === 0 ? 'text-amber-500' :
                      index === 1 ? 'text-gray-400' :
                      index === 2 ? 'text-orange-600' :
                      'text-gray-600 dark:text-gray-400'
                    }`}>
                      #{index + 1}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {institution.displayName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {institution.address.city}, {institution.address.country}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(institution.collected, institution.defaultCurrency)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          of {formatCurrency(institution.target, institution.defaultCurrency)}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            institution.rate >= 90 ? 'bg-success' :
                            institution.rate >= 70 ? 'bg-primary-500' :
                            institution.rate >= 50 ? 'bg-warning' :
                            'bg-error'
                          }`}
                          style={{ width: `${Math.min(institution.rate, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                        {institution.rate.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {(groupBy === 'department' || groupBy === 'fee-type') && (
                <div className="text-center py-12">
                  <PieChartIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    {groupByLabels[groupBy]} view coming soon...
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Summary Table */}
        <Card>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Metric
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      Total Revenue Collected
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                      {formatCurrency(totalCollections, 'XAF')}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <Badge variant="success">{collectionRate.toFixed(1)}%</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      Outstanding Balance
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                      {formatCurrency(targetAmount - totalCollections, 'XAF')}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <Badge variant="warning">{(100 - collectionRate).toFixed(1)}%</Badge>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800 font-semibold">
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      Total Expected Revenue
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white text-right">
                      {formatCurrency(targetAmount, 'XAF')}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <Badge variant="info">100%</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
