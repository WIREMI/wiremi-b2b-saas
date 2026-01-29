'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, X } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import { getSessionById } from '@/lib/mock-data/education'
import type { SessionStatus } from '@/types/education'

export default function EditSessionPage() {
  const router = useRouter()
  const params = useParams()
  const session = getSessionById(params.id as string)

  const [formData, setFormData] = useState({
    name: session?.name || '',
    code: session?.code || '',
    startDate: session?.startDate || '',
    endDate: session?.endDate || '',
    registrationStart: session?.registrationStart || '',
    registrationEnd: session?.registrationEnd || '',
    status: session?.status || 'upcoming' as SessionStatus,
    semesters: session?.semesters || 2,
    currency: session?.currency || 'USD',
    isCurrent: session?.isCurrent || false,
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Saving session:', formData)
    // In production, this would call an API endpoint
    router.push(`/education/sessions/${params.id}`)
  }

  const handleCancel = () => {
    router.push(`/education/sessions/${params.id}`)
  }

  if (!session) {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Session Not Found</h1>
        </div>
        <Card className="p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Academic session not found</p>
          <Button onClick={() => router.push('/education/sessions')}>Back to Sessions</Button>
        </Card>
      </PageLayout>
    )
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push(`/education/sessions/${params.id}`)}
          >
            Back to Session
          </Button>

          <div className="mt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Edit Academic Session
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update session details and settings
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Session Name"
                  placeholder="e.g., Academic Year 2025-2026"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
                <Input
                  label="Session Code"
                  placeholder="e.g., AY-2025-26"
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Academic Period */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Academic Period
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  required
                />
                <Input
                  label="End Date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Registration Period */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Registration Period
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Registration Start"
                  type="date"
                  value={formData.registrationStart}
                  onChange={(e) => handleChange('registrationStart', e.target.value)}
                  required
                />
                <Input
                  label="Registration End"
                  type="date"
                  value={formData.registrationEnd}
                  onChange={(e) => handleChange('registrationEnd', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Session Settings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Session Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value as SessionStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="current">Current</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <Input
                  label="Number of Semesters"
                  type="number"
                  min="1"
                  max="4"
                  value={formData.semesters}
                  onChange={(e) => handleChange('semesters', parseInt(e.target.value))}
                  required
                />

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="XAF">XAF</option>
                    <option value="NGN">NGN</option>
                    <option value="KES">KES</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Current Session Toggle */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <input
                type="checkbox"
                id="isCurrent"
                checked={formData.isCurrent}
                onChange={(e) => handleChange('isCurrent', e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
              />
              <label htmlFor="isCurrent" className="text-sm font-medium text-gray-900 dark:text-white">
                Set as current academic session
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                icon={<X className="w-4 h-4" />}
                iconPosition="left"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon={<Save className="w-4 h-4" />}
                iconPosition="left"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
