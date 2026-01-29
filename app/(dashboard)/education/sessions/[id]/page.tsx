'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Calendar,
  Users,
  DollarSign,
  Clock,
  Edit,
  ArrowLeft,
  BookOpen,
  TrendingUp,
  FileText,
  CheckCircle,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import {
  MOCK_SESSIONS,
  MOCK_SEMESTERS,
  getSessionById,
  getSemestersForSession,
  getStudentsForSession,
} from '@/lib/mock-data/education'

export default function SessionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  const session = getSessionById(params.id as string)
  const semesters = session ? getSemestersForSession(session.id) : []
  const students = session ? getStudentsForSession(session.id) : []

  if (!session) {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Session Not Found</h1>
            </div>
          </div>
        </div>
        <Card className="p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Academic session not found</p>
          <Button onClick={() => router.push('/education/sessions')}>Back to Sessions</Button>
        </Card>
      </PageLayout>
    )
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'current':
        return 'success'
      case 'upcoming':
        return 'info'
      case 'completed':
        return 'default'
      default:
        return 'default'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'semesters', label: 'Semesters', icon: Calendar },
    { id: 'students', label: 'Students', icon: Users },
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
            onClick={() => router.push('/education/sessions')}
          >
            Back to Sessions
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {session.name}
                </h1>
                {session.isCurrent && <Badge variant="success">Current</Badge>}
                <Badge variant={getStatusVariant(session.status)}>{session.status}</Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Code: {session.code} • {semesters.length} Semesters
              </p>
            </div>

            <Button
              variant="outline"
              icon={<Edit className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push(`/education/sessions/${session.id}/edit`)}
            >
              Edit Session
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Students"
            value={formatNumber(session.totalStudents)}
            icon={<Users className="w-5 h-5" />}
          />
          <StatsCard
            label="Total Revenue"
            value={formatCurrency(session.totalRevenue, session.currency)}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+12.5%"
          />
          <StatsCard
            label="Semesters"
            value={session.semesters}
            icon={<Calendar className="w-5 h-5" />}
          />
          <StatsCard
            label="Active Semesters"
            value={semesters.filter((s) => s.isActive).length}
            icon={<CheckCircle className="w-5 h-5" />}
          />
        </div>

        {/* Session Info Card */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Session Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Academic Period
              </h3>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{formatDate(session.startDate)} - {formatDate(session.endDate)}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Registration Period
              </h3>
              <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{formatDate(session.registrationStart)} - {formatDate(session.registrationEnd)}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </h3>
              <Badge variant={getStatusVariant(session.status)} size="sm">
                {session.status}
              </Badge>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Currency
              </h3>
              <span className="text-gray-900 dark:text-white">{session.currency}</span>
            </div>
          </div>
        </Card>

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
                Quick Summary
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Enrolled Students</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatNumber(session.totalStudents)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Revenue Generated</span>
                  <span className="font-semibold text-success">
                    {formatCurrency(session.totalRevenue, session.currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Number of Semesters</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {session.semesters}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Active Semesters</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {semesters.filter((s) => s.isActive).length}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Important Dates
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Session Start</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatDate(session.startDate)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Session End</div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatDate(session.endDate)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Registration Opens
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatDate(session.registrationStart)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Registration Closes
                  </div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatDate(session.registrationEnd)}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'semesters' && (
          <div className="space-y-4">
            {semesters.length > 0 ? (
              semesters.map((semester) => (
                <Card key={semester.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {semester.name}
                        </h3>
                        {semester.isActive && <Badge variant="success" size="sm">Active</Badge>}
                        <Badge variant="info" size="sm" className="capitalize">
                          {semester.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Semester {semester.semesterNumber}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Semester Period
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {formatDate(semester.startDate)} - {formatDate(semester.endDate)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            Registration Period
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {formatDate(semester.registrationStart)} - {formatDate(semester.registrationEnd)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <Calendar className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No semesters found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No semesters have been added to this session yet.
                </p>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <Card className="p-12 text-center">
            <Users className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Student list coming soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {session.totalStudents} students enrolled in this session
            </p>
          </Card>
        )}

        {activeTab === 'analytics' && (
          <Card className="p-12 text-center">
            <TrendingUp className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Analytics coming soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed analytics and reports will be available here
            </p>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
