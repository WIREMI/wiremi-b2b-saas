'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, X } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import {
  MOCK_FEE_ITEMS,
  MOCK_INSTITUTIONS,
  MOCK_FACULTIES,
  MOCK_DEPARTMENTS,
} from '@/lib/mock-data/education-institutions'
import type { FeeType, PaymentType } from '@/types/education'

export default function EditFeePage() {
  const router = useRouter()
  const params = useParams()

  const existingFee = MOCK_FEE_ITEMS.find((f) => f.id === params.id)

  const [formData, setFormData] = useState({
    name: existingFee?.name || '',
    description: existingFee?.description || '',
    institutionId: existingFee?.institutionId || '',
    facultyId: existingFee?.facultyId || '',
    departmentId: existingFee?.departmentId || '',
    feeType: (existingFee?.feeType || 'tuition') as FeeType,
    amount: existingFee?.amount.toString() || '',
    currency: existingFee?.currency || 'XAF',
    paymentType: (existingFee?.paymentType || 'one-time') as PaymentType,
    isMandatory: existingFee?.isMandatory ?? true,
    isActive: existingFee?.isActive ?? true,
    numberOfInstallments: existingFee?.installmentConfig?.numberOfInstallments || 2,
    minimumPayableAmount: existingFee?.installmentConfig?.minimumPayableAmount?.toString() || '',
  })

  if (!existingFee) {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Fee Not Found</h1>
        </div>
        <Card className="p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">The fee item you're looking for doesn't exist</p>
          <Button onClick={() => router.push('/education/fees')}>Back to Fee Structures</Button>
        </Card>
      </PageLayout>
    )
  }

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log('Updating fee:', formData)
    // In production, this would call an API endpoint
    router.push(`/education/fees/${params.id}`)
  }

  const handleCancel = () => {
    router.push(`/education/fees/${params.id}`)
  }

  // Filter faculties and departments based on selection
  const availableFaculties = formData.institutionId
    ? MOCK_FACULTIES.filter((f) => f.institutionId === formData.institutionId)
    : []

  const availableDepartments = formData.facultyId
    ? MOCK_DEPARTMENTS.filter((d) => d.facultyId === formData.facultyId)
    : []

  const feeTypeOptions: { value: FeeType; label: string }[] = [
    { value: 'tuition', label: 'Tuition' },
    { value: 'acceptance', label: 'Acceptance' },
    { value: 'registration', label: 'Registration' },
    { value: 'lab', label: 'Laboratory' },
    { value: 'exam', label: 'Examination' },
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'library', label: 'Library' },
    { value: 'medical', label: 'Medical' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
    { value: 'misc', label: 'Miscellaneous' },
    { value: 'custom', label: 'Custom' },
  ]

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
            onClick={() => router.push(`/education/fees/${params.id}`)}
          >
            Back to Fee Details
          </Button>

          <div className="mt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Edit Fee Item
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update fee structure details
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
              <div className="space-y-4">
                <Input
                  label="Fee Name"
                  placeholder="e.g., First Year Tuition Fee"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Describe this fee item..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Fee Type
                    </label>
                    <select
                      value={formData.feeType}
                      onChange={(e) => handleChange('feeType', e.target.value as FeeType)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      {feeTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-6 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isMandatory}
                        onChange={(e) => handleChange('isMandatory', e.target.checked)}
                        className="w-4 h-4 text-primary-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Mandatory</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => handleChange('isActive', e.target.checked)}
                        className="w-4 h-4 text-primary-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Active</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Hierarchy Selection */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Institution Hierarchy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Institution
                  </label>
                  <select
                    value={formData.institutionId}
                    onChange={(e) => {
                      handleChange('institutionId', e.target.value)
                      handleChange('facultyId', '')
                      handleChange('departmentId', '')
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  >
                    <option value="">Select Institution</option>
                    {MOCK_INSTITUTIONS.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Faculty
                  </label>
                  <select
                    value={formData.facultyId}
                    onChange={(e) => {
                      handleChange('facultyId', e.target.value)
                      handleChange('departmentId', '')
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    disabled={!formData.institutionId}
                    required
                  >
                    <option value="">Select Faculty</option>
                    {availableFaculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Department
                  </label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => handleChange('departmentId', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    disabled={!formData.facultyId}
                    required
                  >
                    <option value="">Select Department</option>
                    {availableDepartments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Changing the hierarchy may affect student assignments
              </p>
            </div>

            {/* Amount and Currency */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Fee Amount
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
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
                    <option value="XAF">XAF - Central African CFA Franc</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="NGN">NGN - Nigerian Naira</option>
                    <option value="KES">KES - Kenyan Shilling</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Configuration */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Configuration
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Payment Type
                  </label>
                  <select
                    value={formData.paymentType}
                    onChange={(e) => handleChange('paymentType', e.target.value as PaymentType)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="one-time">One-Time Payment</option>
                    <option value="installment">Installment Plan</option>
                    <option value="flexible">Flexible Payment</option>
                  </select>
                </div>

                {formData.paymentType === 'installment' && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Installment Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Number of Installments"
                        type="number"
                        min="2"
                        max="12"
                        value={formData.numberOfInstallments}
                        onChange={(e) => handleChange('numberOfInstallments', parseInt(e.target.value))}
                      />

                      <Input
                        label="Minimum Payable Amount (Optional)"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.minimumPayableAmount}
                        onChange={(e) => handleChange('minimumPayableAmount', e.target.value)}
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      Installments will be automatically calculated and spread evenly across the academic year
                    </p>
                  </div>
                )}
              </div>
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
