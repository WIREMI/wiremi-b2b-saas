'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Award,
  Users,
  DollarSign,
  Calendar,
  Target,
  Edit,
  ArrowLeft,
  Mail,
  Phone,
  BookOpen,
  TrendingUp,
  CheckCircle,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  MOCK_SCHOLARSHIPS,
  getScholarshipById,
  getScholarshipRecipients,
} from '@/lib/mock-data/education'

export default function ScholarshipDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  const scholarship = getScholarshipById(params.id as string)
  const recipients = scholarship ? getScholarshipRecipients(scholarship.id) : []

  if (!scholarship) {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Scholarship Not Found</h1>
        </div>
        <Card className="p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Scholarship program not found</p>
          <Button onClick={() => router.push('/education/scholarships')}>Back to Scholarships</Button>
        </Card>
      </PageLayout>
    )
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, 'success' | 'info' | 'warning' | 'error' | 'default'> = {
      merit: 'warning',
      'need-based': 'info',
      athletic: 'success',
      academic: 'warning',
      full: 'success',
      partial: 'info',
    }
    return colors[type] || 'default'
  }

  const totalAwarded = scholarship.amount * scholarship.currentRecipients
  const availableSlots = scholarship.maxRecipients - scholarship.currentRecipients
  const fillRate = (scholarship.currentRecipients / scholarship.maxRecipients) * 100

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Award },
    { id: 'recipients', label: 'Recipients', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ]

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/education/scholarships')}
          >
            Back to Scholarships
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {scholarship.name}
                </h1>
                {scholarship.isActive && <Badge variant="success">Active</Badge>}
                <Badge variant={getTypeColor(scholarship.type)}>{scholarship.type}</Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{scholarship.description}</p>
            </div>

            <Button
              variant="outline"
              icon={<Edit className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push(`/education/scholarships/${scholarship.id}/edit`)}
            >
              Edit Scholarship
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Awarded"
            value={formatCurrency(totalAwarded, scholarship.currency)}
            icon={<DollarSign className="w-5 h-5" />}
          />
          <StatsCard
            label="Current Recipients"
            value={scholarship.currentRecipients}
            icon={<Users className="w-5 h-5" />}
          />
          <StatsCard
            label="Available Slots"
            value={availableSlots}
            icon={<CheckCircle className="w-5 h-5" />}
          />
          <StatsCard
            label="Fill Rate"
            value={`${fillRate.toFixed(0)}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            trend={fillRate > 80 ? 'up' : undefined}
          />
        </div>

        {/* Scholarship Info Card */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Scholarship Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Scholarship Type
              </h3>
              <Badge variant={getTypeColor(scholarship.type)} className="capitalize">
                {scholarship.type.replace('-', ' ')}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Award Amount</h3>
              <div className="text-gray-900 dark:text-white">
                <span className="text-lg font-semibold">
                  {formatCurrency(scholarship.amount, scholarship.currency)}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  ({scholarship.percentage}% Coverage)
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Academic Year
              </h3>
              <span className="text-gray-900 dark:text-white">{scholarship.academicYear}</span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</h3>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm">
                  {formatDate(scholarship.startDate)} - {formatDate(scholarship.endDate)}
                </span>
              </div>
            </div>

            {scholarship.sponsor && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sponsor</h3>
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Target className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{scholarship.sponsor}</span>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Capacity</h3>
              <div>
                <div className="text-gray-900 dark:text-white mb-1">
                  {scholarship.currentRecipients} / {scholarship.maxRecipients} Recipients
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all"
                    style={{ width: `${fillRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Eligibility Criteria Card */}
        {scholarship.eligibilityCriteria.length > 0 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Eligibility Criteria
            </h2>
            <ul className="space-y-2">
              {scholarship.eligibilityCriteria.map((criteria, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-gray-900 dark:text-white">{criteria}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex gap-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-500'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Program Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Budget</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(scholarship.amount * scholarship.maxRecipients, scholarship.currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Funds Committed</span>
                  <span className="font-semibold text-success">
                    {formatCurrency(totalAwarded, scholarship.currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Remaining Budget</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(scholarship.amount * availableSlots, scholarship.currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Fill Rate</span>
                  <Badge variant={fillRate > 80 ? 'success' : fillRate > 50 ? 'warning' : 'default'}>
                    {fillRate.toFixed(0)}%
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Add New Recipient
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email All Recipients
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="w-4 h-4 mr-2" />
                  Update Criteria
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'recipients' && (
          <div className="space-y-4">
            {recipients.length > 0 ? (
              recipients.map((student) => (
                <Card key={student.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        {student.firstName[0]}
                        {student.lastName[0]}
                      </div>

                      {/* Student Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {student.firstName} {student.lastName}
                          </h3>
                          <Badge variant="info">{student.studentId}</Badge>
                          <Badge variant="success">{student.level}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Mail className="w-4 h-4" />
                            <span>{student.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Phone className="w-4 h-4" />
                            <span>{student.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <BookOpen className="w-4 h-4" />
                            <span>{student.program}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Award className="w-4 h-4" />
                            <span>GPA: {student.gpa?.toFixed(2) || 'N/A'}</span>
                          </div>
                        </div>

                        {/* Scholarship Info */}
                        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Scholarship Award
                            </span>
                            <span className="text-sm font-semibold text-success">
                              {formatCurrency(scholarship.amount, scholarship.currency)} ({scholarship.percentage}% Coverage)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/education/students/${student.id}`)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <Users className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No recipients yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start awarding this scholarship to eligible students
                </p>
                <Button variant="primary">Add First Recipient</Button>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <Card className="p-12 text-center">
            <TrendingUp className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Analytics coming soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed scholarship analytics and impact reports will be available here
            </p>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
