'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FileText,
  Download,
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Eye,
  Filter,
  RefreshCw,
  Share2,
  Bookmark,
  Clock,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Select from '@/components/ui/select'
import { formatNumber } from '@/lib/utils'

interface Report {
  id: string
  name: string
  description: string
  category: 'financial' | 'hr' | 'operations' | 'custom'
  type: 'table' | 'chart' | 'summary'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual'
  lastGenerated: string
  format: string
  isFavorite: boolean
}

interface QuickStat {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ReactNode
  iconBg: string
}

export default function ReportsDashboardPage() {
  const router = useRouter()

  const [categoryFilter, setCategoryFilter] = useState('all')
  const [dateRange, setDateRange] = useState('30d')
  const [showFavorites, setShowFavorites] = useState(false)

  // Mock reports data
  const reports: Report[] = [
    {
      id: '1',
      name: 'Monthly Financial Summary',
      description: 'Comprehensive overview of income, expenses, and cash flow',
      category: 'financial',
      type: 'summary',
      frequency: 'monthly',
      lastGenerated: '2026-01-19T10:00:00',
      format: 'PDF',
      isFavorite: true,
    },
    {
      id: '2',
      name: 'Transaction History Report',
      description: 'Detailed breakdown of all transactions by category',
      category: 'financial',
      type: 'table',
      frequency: 'weekly',
      lastGenerated: '2026-01-19T09:00:00',
      format: 'Excel',
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Payroll Summary',
      description: 'Employee compensation and benefits breakdown',
      category: 'hr',
      type: 'summary',
      frequency: 'monthly',
      lastGenerated: '2026-01-18T15:00:00',
      format: 'PDF',
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Revenue & Expenses Trend',
      description: 'Year-over-year comparison of revenue and expenses',
      category: 'financial',
      type: 'chart',
      frequency: 'quarterly',
      lastGenerated: '2026-01-15T12:00:00',
      format: 'PDF',
      isFavorite: true,
    },
    {
      id: '5',
      name: 'Employee Headcount Report',
      description: 'Department-wise employee distribution and growth',
      category: 'hr',
      type: 'table',
      frequency: 'monthly',
      lastGenerated: '2026-01-18T10:00:00',
      format: 'Excel',
      isFavorite: false,
    },
    {
      id: '6',
      name: 'Cash Flow Statement',
      description: 'Operating, investing, and financing activities',
      category: 'financial',
      type: 'table',
      frequency: 'monthly',
      lastGenerated: '2026-01-17T14:00:00',
      format: 'PDF',
      isFavorite: false,
    },
    {
      id: '7',
      name: 'Department Budget Analysis',
      description: 'Budget vs actual spending by department',
      category: 'operations',
      type: 'chart',
      frequency: 'quarterly',
      lastGenerated: '2026-01-16T11:00:00',
      format: 'PDF',
      isFavorite: false,
    },
    {
      id: '8',
      name: 'Vendor Payment Summary',
      description: 'Top vendors and payment patterns',
      category: 'operations',
      type: 'table',
      frequency: 'monthly',
      lastGenerated: '2026-01-15T09:00:00',
      format: 'Excel',
      isFavorite: false,
    },
  ]

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'financial', label: 'Financial' },
    { value: 'hr', label: 'HR & Payroll' },
    { value: 'operations', label: 'Operations' },
    { value: 'custom', label: 'Custom Reports' },
  ]

  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'ytd', label: 'Year to date' },
    { value: 'custom', label: 'Custom range' },
  ]

  // Quick stats data
  const quickStats: QuickStat[] = [
    {
      label: 'Total Revenue',
      value: '$2.4M',
      change: '+15.3%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      iconBg: 'bg-success/10 text-success',
    },
    {
      label: 'Total Expenses',
      value: '$1.8M',
      change: '+8.2%',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
      iconBg: 'bg-error/10 text-error',
    },
    {
      label: 'Net Profit',
      value: '$600K',
      change: '+22.5%',
      trend: 'up',
      icon: <LineChart className="w-6 h-6" />,
      iconBg: 'bg-primary-100 dark:bg-primary-500/20 text-primary-500',
    },
    {
      label: 'Reports Generated',
      value: '145',
      change: '+12',
      trend: 'up',
      icon: <FileText className="w-6 h-6" />,
      iconBg: 'bg-info/10 text-info',
    },
  ]

  // Filter reports
  const filteredReports = reports.filter((report) => {
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter
    const matchesFavorites = !showFavorites || report.isFavorite
    return matchesCategory && matchesFavorites
  })

  const getTypeIcon = (type: Report['type']) => {
    switch (type) {
      case 'table':
        return <FileText className="w-5 h-5 text-primary-500" />
      case 'chart':
        return <BarChart3 className="w-5 h-5 text-success" />
      case 'summary':
        return <PieChart className="w-5 h-5 text-info" />
    }
  }

  const getCategoryBadge = (category: Report['category']) => {
    switch (category) {
      case 'financial':
        return <Badge variant="success" size="sm">Financial</Badge>
      case 'hr':
        return <Badge variant="info" size="sm">HR</Badge>
      case 'operations':
        return <Badge variant="warning" size="sm">Operations</Badge>
      case 'custom':
        return <Badge variant="default" size="sm">Custom</Badge>
    }
  }

  const formatLastGenerated = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const stats = {
    total: reports.length,
    favorites: reports.filter((r) => r.isFavorite).length,
    financial: reports.filter((r) => r.category === 'financial').length,
    hr: reports.filter((r) => r.category === 'hr').length,
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Reports & Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Generate and download comprehensive business reports
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Select
              options={dateRanges}
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
            <Button
              variant="outline"
              size="md"
              icon={<RefreshCw className="w-5 h-5" />}
              iconPosition="left"
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push('/reports/builder')}
            >
              Create Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
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
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Filters */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Filters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <Select
                  options={categories}
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors ${
                    showFavorites
                      ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-500'
                      : 'hover:bg-gray-50 dark:hover:bg-dark-bg text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${showFavorites ? 'fill-current' : ''}`} />
                  <span className="font-medium">Favorites Only</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Overview
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Reports</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {stats.total}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Favorites</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {stats.favorites}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Financial</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {stats.financial}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">HR Reports</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {stats.hr}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content - Reports Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="p-5 hover:border-primary-500 dark:hover:border-primary-500 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-dark-bg rounded-xl flex items-center justify-center">
                    {getTypeIcon(report.type)}
                  </div>
                  <button
                    onClick={() => {}}
                    className="text-gray-400 hover:text-warning transition-colors"
                  >
                    <Bookmark className={`w-5 h-5 ${report.isFavorite ? 'fill-current text-warning' : ''}`} />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {report.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {report.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  {getCategoryBadge(report.category)}
                  <Badge variant="default" size="sm">{report.format}</Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatLastGenerated(report.lastGenerated)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {report.frequency}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    icon={<Eye className="w-4 h-4" />}
                    iconPosition="left"
                    onClick={() => router.push(`/reports/${report.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    icon={<Download className="w-4 h-4" />}
                    iconPosition="left"
                  >
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredReports.length === 0 && (
            <Card className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No reports found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {showFavorites
                  ? 'You don\'t have any favorite reports yet'
                  : 'Try adjusting your filters or create a new report'}
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setCategoryFilter('all')
                  setShowFavorites(false)
                }}
              >
                Clear Filters
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Popular Report Templates */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Popular Report Templates
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/reports/templates')}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 hover:bg-gray-50 dark:hover:bg-dark-bg cursor-pointer transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Profit & Loss
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Standard P&L statement with YTD comparisons
            </p>
          </Card>

          <Card className="p-4 hover:bg-gray-50 dark:hover:bg-dark-bg cursor-pointer transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-info" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Team Performance
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Employee metrics and productivity analysis
            </p>
          </Card>

          <Card className="p-4 hover:bg-gray-50 dark:hover:bg-dark-bg cursor-pointer transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-warning" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Growth Analysis
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Revenue growth trends and forecasts
            </p>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
