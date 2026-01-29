'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  UserPlus,
  ArrowLeft,
  ArrowRight,
  Check,
  Building2,
  User,
  Briefcase,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

export default function AddVendorPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    type: 'company',
    name: '',
    email: '',
    phone: '',
    taxId: '',
    category: '',
    website: '',
    contactPerson: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    bankName: '',
    accountNumber: '',
    accountName: '',
    swiftCode: '',
    routingNumber: '',
    iban: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // In real app, submit to API
    console.log('Submitting vendor:', formData)
    router.push('/payouts/vendors')
  }

  const canProceed = () => {
    if (step === 1) {
      return formData.name && formData.email && formData.phone
    }
    if (step === 2) {
      return formData.bankName && formData.accountNumber && formData.accountName
    }
    return true
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add Vendor</h1>
            <p className="text-gray-600 dark:text-gray-400">Register a new vendor or payee</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 1
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-dark-border text-gray-500'
              }`}
            >
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Basic Info</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Vendor details</div>
            </div>
          </div>

          <div className="flex-1 h-0.5 bg-gray-200 dark:bg-dark-border mx-4" />

          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= 2
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 dark:bg-dark-border text-gray-500'
              }`}
            >
              2
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Banking</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Payment details</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Basic Information
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                Vendor Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'company', icon: Building2, label: 'Company' },
                  { value: 'individual', icon: User, label: 'Individual' },
                  { value: 'contractor', icon: Briefcase, label: 'Contractor' },
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleInputChange('type', type.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.type === type.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                        : 'border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <type.icon className="w-6 h-6 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Vendor Name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              placeholder="Enter vendor or company name"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="vendor@example.com"
              />
              <Input
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Tax ID / EIN / SSN"
                type="text"
                value={formData.taxId}
                onChange={(e) => handleInputChange('taxId', e.target.value)}
                placeholder="Tax identification number"
              />
              <Input
                label="Category"
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="e.g., Technology, Marketing"
              />
            </div>

            {formData.type === 'company' && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="www.company.com"
                />
                <Input
                  label="Contact Person"
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                  placeholder="Primary contact name"
                />
              </div>
            )}

            <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Address
              </h4>
              <div className="space-y-4">
                <Input
                  label="Street Address"
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  placeholder="123 Main Street"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="City"
                  />
                  <Input
                    label="State/Province"
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="ZIP / Postal Code"
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="Postal code"
                  />
                  <Input
                    label="Country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Step 2: Banking Details */}
      {step === 2 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Banking Details
          </h3>

          <div className="space-y-6">
            <Input
              label="Bank Name"
              type="text"
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              required
              placeholder="Name of the bank"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Account Number"
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                required
                placeholder="Bank account number"
              />
              <Input
                label="Account Name"
                type="text"
                value={formData.accountName}
                onChange={(e) => handleInputChange('accountName', e.target.value)}
                required
                placeholder="Name on the account"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="SWIFT Code"
                type="text"
                value={formData.swiftCode}
                onChange={(e) => handleInputChange('swiftCode', e.target.value)}
                placeholder="International transfers"
              />
              <Input
                label="Routing Number"
                type="text"
                value={formData.routingNumber}
                onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                placeholder="Domestic transfers"
              />
            </div>

            <Input
              label="IBAN (Optional)"
              type="text"
              value={formData.iban}
              onChange={(e) => handleInputChange('iban', e.target.value)}
              placeholder="International Bank Account Number"
            />

            <Card className="p-4 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                Banking information is encrypted and securely stored. This information will be
                used for payment processing.
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

        {step < 2 ? (
          <Button
            variant="primary"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
          >
            Next Step
          </Button>
        ) : (
          <Button
            variant="primary"
            icon={<Check className="w-4 h-4" />}
            iconPosition="left"
            onClick={handleSubmit}
            disabled={!canProceed()}
          >
            Create Vendor
          </Button>
        )}
      </div>
    </PageLayout>
  )
}
