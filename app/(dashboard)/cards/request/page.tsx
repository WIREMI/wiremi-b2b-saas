'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import {
  ArrowLeft,
  CreditCard,
  User,
  Building,
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'

type CardType = 'PHYSICAL' | 'VIRTUAL'
type SpendingLimitPeriod = 'DAILY' | 'WEEKLY' | 'MONTHLY'

export default function RequestCardPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    cardholderName: '',
    department: '',
    jobTitle: '',
    cardType: 'VIRTUAL' as CardType,
    spendingLimit: '',
    spendingLimitPeriod: 'MONTHLY' as SpendingLimitPeriod,
    purpose: '',
    justification: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Redirect after success
    setTimeout(() => {
      router.push('/cards')
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  if (submitSuccess) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Request Submitted!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your card request has been submitted for approval. You'll be notified once it's reviewed.
            </p>
            <Button onClick={() => router.push('/cards')} fullWidth>
              Back to Cards
            </Button>
          </Card>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Navigation */}
        <div className="mb-2">
          <button
            onClick={() => router.push('/cards')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Corporate Cards</span>
          </button>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Request New Card
          </h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            Submit a request for a new corporate card
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Type Selection */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Card Type
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleInputChange('cardType', 'VIRTUAL')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.cardType === 'VIRTUAL'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">Virtual Card</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Instant issuance, online payments
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('cardType', 'PHYSICAL')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.cardType === 'PHYSICAL'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">Physical Card</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    5-7 days delivery, in-person payments
                  </div>
                </div>
              </button>
            </div>
          </Card>

          {/* Cardholder Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Cardholder Information
            </h2>
            <div className="space-y-4">
              <Input
                label="Cardholder Name"
                placeholder="Full name as it appears on ID"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Department"
                  placeholder="e.g., Marketing, Sales"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  required
                />
                <Input
                  label="Job Title"
                  placeholder="e.g., Marketing Manager"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  required
                />
              </div>
            </div>
          </Card>

          {/* Spending Limits */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Spending Limits
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Spending Limit"
                type="number"
                placeholder="0.00"
                value={formData.spendingLimit}
                onChange={(e) => handleInputChange('spendingLimit', e.target.value)}
                required
                prefix="$"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Period
                </label>
                <select
                  value={formData.spendingLimitPeriod}
                  onChange={(e) => handleInputChange('spendingLimitPeriod', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Purpose & Justification */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Building className="w-5 h-5" />
              Business Purpose
            </h2>
            <div className="space-y-4">
              <Input
                label="Primary Purpose"
                placeholder="e.g., Travel expenses, Client entertainment"
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Justification
                </label>
                <textarea
                  value={formData.justification}
                  onChange={(e) => handleInputChange('justification', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Explain why this card is needed for business operations..."
                  required
                />
              </div>
            </div>
          </Card>

          {/* Info Banner */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900 dark:text-blue-200">
              <p className="font-medium mb-1">Approval Process</p>
              <p>
                Your request will be reviewed by the finance team. You'll receive a notification within 1-2 business days.
                {formData.cardType === 'PHYSICAL' && ' Physical cards will be shipped after approval.'}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/cards')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  )
}
