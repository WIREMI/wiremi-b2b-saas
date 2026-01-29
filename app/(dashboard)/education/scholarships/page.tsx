'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Award, Plus, Edit, Users, DollarSign, Calendar, Target } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import { MOCK_SCHOLARSHIPS, getScholarshipRecipients } from '@/lib/mock-data/education'

export default function ScholarshipsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<string>('all')

  const filteredScholarships = filter === 'all'
    ? MOCK_SCHOLARSHIPS
    : filter === 'active'
    ? MOCK_SCHOLARSHIPS.filter((s) => s.isActive)
    : MOCK_SCHOLARSHIPS.filter((s) => s.type === filter)

  const totalAwarded = MOCK_SCHOLARSHIPS.reduce((sum, s) => sum + s.amount * s.currentRecipients, 0)
  const activeScholarships = MOCK_SCHOLARSHIPS.filter((s) => s.isActive).length
  const totalRecipients = MOCK_SCHOLARSHIPS.reduce((sum, s) => sum + s.currentRecipients, 0)

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      merit: 'purple',
      'need-based': 'blue',
      athletic: 'green',
      academic: 'orange',
      partial: 'default',
      full: 'success',
    }
    return colors[type] || 'default'
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Scholarships</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage scholarship programs and recipients</p>
          </div>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/education/scholarships/add')}
          >
            Add Scholarship
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalAwarded, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Awarded</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(totalRecipients)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Recipients</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {activeScholarships}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Programs</p>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <Card className="p-6 mb-8">
        <div className="flex flex-wrap gap-3">
          <Button variant={filter === 'all' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('all')}>
            All
          </Button>
          <Button variant={filter === 'active' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('active')}>
            Active
          </Button>
          <Button variant={filter === 'merit' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('merit')}>
            Merit
          </Button>
          <Button variant={filter === 'need-based' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('need-based')}>
            Need-Based
          </Button>
          <Button variant={filter === 'athletic' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('athletic')}>
            Athletic
          </Button>
          <Button variant={filter === 'academic' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('academic')}>
            Academic
          </Button>
        </div>
      </Card>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredScholarships.map((scholarship) => {
          const recipients = getScholarshipRecipients(scholarship.id)
          return (
            <Card key={scholarship.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {scholarship.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {scholarship.description}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant={getTypeColor(scholarship.type) as any} size="sm">
                      {scholarship.type}
                    </Badge>
                    {scholarship.isActive && (
                      <Badge variant="success" size="sm">Active</Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Edit className="w-4 h-4" />}
                  onClick={() => router.push(`/education/scholarships/${scholarship.id}/edit`)}
                />
              </div>

              <div className="border-t border-gray-200 dark:border-dark-border pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount</div>
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(scholarship.amount, scholarship.currency)}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {scholarship.percentage}% Coverage
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Recipients</div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {scholarship.currentRecipients}/{scholarship.maxRecipients}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-1.5 mt-2">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{
                          width: `${(scholarship.currentRecipients / scholarship.maxRecipients) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {formatDate(scholarship.startDate)} - {formatDate(scholarship.endDate)}
                  </div>
                  {scholarship.sponsor && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Target className="w-4 h-4" />
                      Sponsored by: {scholarship.sponsor}
                    </div>
                  )}
                </div>

                {scholarship.eligibilityCriteria.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Eligibility Criteria:
                    </div>
                    <ul className="space-y-1">
                      {scholarship.eligibilityCriteria.map((criteria, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => router.push(`/education/scholarships/${scholarship.id}`)}
                  >
                    View Recipients
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    onClick={() => router.push(`/education/scholarships/${scholarship.id}`)}
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </PageLayout>
  )
}
