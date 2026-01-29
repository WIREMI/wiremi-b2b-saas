'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Plus, Edit, Users, DollarSign, Clock } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import { MOCK_SESSIONS } from '@/lib/mock-data/education'

export default function AcademicSessionsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<string>('all')

  const filteredSessions = filter === 'all' ? MOCK_SESSIONS : MOCK_SESSIONS.filter((s) => s.status === filter)

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'current': return 'success'
      case 'upcoming': return 'info'
      case 'completed': return 'default'
      default: return 'default'
    }
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Academic Sessions</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage academic years and sessions</p>
          </div>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/education/sessions/add')}
          >
            Add Session
          </Button>
        </div>
      </div>

      {/* Filter */}
      <Card className="p-6 mb-8">
        <div className="flex flex-wrap gap-3">
          <Button variant={filter === 'all' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('all')}>
            All Sessions
          </Button>
          <Button variant={filter === 'current' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('current')}>
            Current
          </Button>
          <Button variant={filter === 'upcoming' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('upcoming')}>
            Upcoming
          </Button>
          <Button variant={filter === 'completed' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('completed')}>
            Completed
          </Button>
        </div>
      </Card>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session) => (
          <Card key={session.id} className={`p-6 ${session.isCurrent ? 'border-2 border-orange-500' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {session.name}
                  </h3>
                  {session.isCurrent && <Badge variant="success" size="sm">Current</Badge>}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Code: {session.code}
                </div>
                <Badge variant={getStatusVariant(session.status)} size="sm">
                  {session.status}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={<Edit className="w-4 h-4" />}
                onClick={() => router.push(`/education/sessions/${session.id}/edit`)}
              />
            </div>

            <div className="border-t border-gray-200 dark:border-dark-border pt-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {formatDate(session.startDate)} - {formatDate(session.endDate)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Students</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(session.totalStudents)}
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Revenue</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {formatCurrency(session.totalRevenue, session.currency)}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-dark-border">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Registration: {formatDate(session.registrationStart)} - {formatDate(session.registrationEnd)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {session.semesters} Semesters
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => router.push(`/education/sessions/${session.id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
