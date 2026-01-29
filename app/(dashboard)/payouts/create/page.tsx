'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Send,
  ArrowLeft,
  ArrowRight,
  Check,
  Search,
  Upload,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { formatCurrency } from '@/lib/utils'
import { MOCK_VENDORS } from '@/lib/mock-data/payouts'

function CreatePayoutForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedVendor = searchParams.get('vendor')

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    vendorId: preselectedVendor || '',
    amount: '',
    category: 'invoice',
    description: '',
    paymentMethod: 'bank-transfer',
    scheduledDate: new Date().toISOString().split('T')[0],
    notes: '',
  })

  const selectedVendor = MOCK_VENDORS.find((v) => v.id === formData.vendorId)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log('Creating payout:', formData)
    router.push('/payouts')
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Payout</h1>
            <p className="text-gray-600 dark:text-gray-400">Create a new payment to a vendor</p>
          </div>
        </div>
      </div>
      {/* Progress Steps */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: 'Vendor', sublabel: 'Select vendor' },
            { num: 2, label: 'Details', sublabel: 'Payment info' },
            { num: 3, label: 'Review', sublabel: 'Confirm' },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s.num
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-dark-surface text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{s.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{s.sublabel}</div>
                </div>
              </div>
              {idx < 2 && <div className="flex-1 h-0.5 bg-gray-200 dark:bg-dark-border mx-4" />}
            </div>
          ))}
        </div>
      </Card>

      {/* Step 1: Vendor Selection */}
      {step === 1 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Select Vendor
          </h3>
          <Select
            label="Vendor"
            value={formData.vendorId}
            onChange={(e) => handleInputChange('vendorId', e.target.value)}
            options={[
              { value: '', label: 'Select a vendor...' },
              ...MOCK_VENDORS.filter((v) => v.status === 'active').map((vendor) => ({
                value: vendor.id,
                label: `${vendor.name} (${vendor.vendorId})`
              }))
            ]}
            required
          />
          {selectedVendor && (
            <Card className="mt-4 p-4 bg-gray-50 dark:bg-dark-card">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Type:</span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {selectedVendor.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Email:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedVendor.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Bank:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedVendor.bankingDetails.bankName}
                  </span>
                </div>
              </div>
            </Card>
          )}
        </Card>
      )}

      {/* Step 2: Payment Details */}
      {step === 2 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Payment Details
          </h3>
          <div className="space-y-6">
            <Input
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              required
              placeholder="0.00"
              prefix="$"
            />

            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              options={[
                { value: 'salary', label: 'Salary' },
                { value: 'commission', label: 'Commission' },
                { value: 'invoice', label: 'Invoice' },
                { value: 'refund', label: 'Refund' },
                { value: 'contractor-payment', label: 'Contractor Payment' },
                { value: 'vendor-payment', label: 'Vendor Payment' },
                { value: 'bonus', label: 'Bonus' },
                { value: 'reimbursement', label: 'Reimbursement' },
                { value: 'other', label: 'Other' }
              ]}
              required
            />

            <Input
              label="Description"
              type="text"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
              placeholder="Brief description of the payment"
            />

            <Select
              label="Payment Method"
              value={formData.paymentMethod}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              options={[
                { value: 'bank-transfer', label: 'Bank Transfer' },
                { value: 'wire-transfer', label: 'Wire Transfer' },
                { value: 'check', label: 'Check' },
                { value: 'mobile-money', label: 'Mobile Money' },
                { value: 'paypal', label: 'PayPal' },
                { value: 'stripe', label: 'Stripe' }
              ]}
              required
            />

            <Input
              label="Scheduled Date"
              type="date"
              value={formData.scheduledDate}
              onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Additional notes or comments..."
              />
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Review & Submit
          </h3>
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 dark:bg-dark-card rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Vendor:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedVendor?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  {formatCurrency(Number(formData.amount), 'USD')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Category:</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {formData.category.replace('-', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {formData.paymentMethod.replace('-', ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Scheduled Date:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formData.scheduledDate}
                </span>
              </div>
            </div>

            <Card className="p-4 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                This payout will be submitted for approval. It will not be processed until approved
                by the finance team.
              </p>
            </Card>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => {
            if (step === 1) {
              router.back()
            } else {
              setStep(step - 1)
            }
          }}
        >
          {step === 1 ? 'Cancel' : 'Previous'}
        </Button>

        {step < 3 ? (
          <Button
            variant="primary"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => setStep(step + 1)}
            disabled={!formData.vendorId || (step === 2 && !formData.amount)}
          >
            Next Step
          </Button>
        ) : (
          <Button
            variant="primary"
            icon={<Check className="w-4 h-4" />}
            iconPosition="left"
            onClick={handleSubmit}
          >
            Submit for Approval
          </Button>
        )}
      </div>
    </PageLayout>
  )
}

export default function CreatePayoutPage() {
  return (
    <Suspense fallback={<PageLayout maxWidth="normal"><div className="flex items-center justify-center min-h-[60vh]"><div className="text-gray-600 dark:text-gray-400">Loading...</div></div></PageLayout>}>
      <CreatePayoutForm />
    </Suspense>
  )
}
