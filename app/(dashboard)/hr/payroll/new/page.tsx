'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Play,
  Calendar,
  Users,
  DollarSign,
  Info,
  CheckCircle2,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'

export default function NewPayrollPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [period, setPeriod] = useState('')
  const [payDate, setPayDate] = useState('')
  const [payrollType, setPayrollType] = useState('monthly')
  const [includeBonuses, setIncludeBonuses] = useState(false)

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
      await new Promise((resolve) => setTimeout(resolve, 2000))

      showToast({
        type: 'success',
        title: 'Payroll Created',
        message: `Payroll for ${period} has been created successfully`,
      })

      setTimeout(() => {
        router.push('/hr/payroll')
      }, 1000)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Create Payroll',
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
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
          <Play className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Run New Payroll
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new payroll run for your team
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
              helperText="Specify the pay period (e.g., December 2025, Q4 2025)"
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
              helperText="Date when employees will receive payment"
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

        {/* Estimated Summary */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Estimated Summary
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-500" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">Eligible Employees</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">247</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-success" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">Estimated Net Pay</span>
              </div>
              <span className="text-xl font-bold text-success">$388,160</span>
            </div>
          </div>
        </Card>

        {/* Info Banner */}
        <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-primary-900 dark:text-primary-300">
              <p className="font-semibold mb-1">Before Processing:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Review all employee payment details</li>
                <li>Verify tax calculations and deductions</li>
                <li>Ensure sufficient funds are available</li>
                <li>Payroll can be edited before the scheduled pay date</li>
              </ul>
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
            icon={<CheckCircle2 className="w-5 h-5" />}
            iconPosition="left"
          >
            Create Payroll
          </Button>
        </div>
      </form>
    </PageLayout>
  )
}
