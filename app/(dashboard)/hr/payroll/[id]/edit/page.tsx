'use client'

import { useState, FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Save,
  Calendar,
  Info,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'

export default function EditPayrollPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [period, setPeriod] = useState('December 2025')
  const [payDate, setPayDate] = useState('2026-01-05')
  const [payrollType, setPayrollType] = useState('monthly')
  const [includeBonuses, setIncludeBonuses] = useState(true)

  const payrollTypes = [
    { value: 'monthly', label: 'Monthly Payroll' },
    { value: 'bonus', label: 'Bonus Payment' },
    { value: 'commission', label: 'Commission Payment' },
    { value: 'special', label: 'Special Payment' },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!period.trim()) newErrors.period = 'Period is required'
    if (!payDate) newErrors.payDate = 'Pay date is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please complete all required fields',
      })
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      showToast({
        type: 'success',
        title: 'Payroll Updated',
        message: `Payroll for ${period} has been updated successfully`,
      })

      setTimeout(() => {
        router.push(`/hr/payroll/${params.id}`)
      }, 1000)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Update Payroll',
        message: 'Please try again',
      })
      setIsLoading(false)
    }
  }

  return (
    <PageLayout maxWidth="normal">
      <Button
        variant="ghost"
        size="sm"
        icon={<ArrowLeft className="w-4 h-4" />}
        iconPosition="left"
        onClick={() => router.back()}
        className="mb-6"
      >
        Back to Payroll
      </Button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Edit Payroll
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update payroll run details
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Payroll Details
          </h2>

          <div className="space-y-6">
            <Select
              label="Payroll Type"
              options={payrollTypes}
              value={payrollType}
              onChange={(e) => setPayrollType(e.target.value)}
              required
            />

            <Input
              label="Period"
              placeholder="e.g., January 2026"
              value={period}
              onChange={(e) => {
                setPeriod(e.target.value)
                setErrors((prev) => ({ ...prev, period: '' }))
              }}
              error={errors.period}
              icon={<Calendar className="w-5 h-5" />}
              iconPosition="left"
              required
            />

            <Input
              label="Pay Date"
              type="date"
              value={payDate}
              onChange={(e) => {
                setPayDate(e.target.value)
                setErrors((prev) => ({ ...prev, payDate: '' }))
              }}
              error={errors.payDate}
              icon={<Calendar className="w-5 h-5" />}
              iconPosition="left"
              required
              min={new Date().toISOString().split('T')[0]}
            />

            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-dark-bg rounded-lg">
              <input
                type="checkbox"
                id="includeBonuses"
                checked={includeBonuses}
                onChange={(e) => setIncludeBonuses(e.target.checked)}
                className="w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <label
                htmlFor="includeBonuses"
                className="flex-1 text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
              >
                Include bonuses and commissions in this payroll run
              </label>
            </div>
          </div>
        </Card>

        {/* Warning Banner */}
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-semibold mb-1">Editing Active Payroll</p>
              <p>Changes to this payroll will affect all employee payments. Review carefully before saving.</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            icon={<Save className="w-5 h-5" />}
            iconPosition="left"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </PageLayout>
  )
}
