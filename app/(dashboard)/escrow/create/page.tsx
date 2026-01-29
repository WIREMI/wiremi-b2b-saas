'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  X,
  Building,
  DollarSign,
  FileText,
  Users,
  Settings
} from 'lucide-react'
import type { EscrowType } from '@/types/escrow'

type Step = 1 | 2 | 3 | 4

interface FormData {
  // Step 1: Basic Info
  name: string
  description: string
  purpose: string
  type: EscrowType
  currency: string
  totalAmount: string

  // Step 2: Beneficiary
  beneficiaryBusinessName: string
  beneficiaryEmail: string
  beneficiaryContactPerson: string
  beneficiaryPhone: string

  // Step 3: Stakeholders (optional)
  stakeholders: {
    businessName: string
    email: string
    contactPerson: string
  }[]

  // Step 4: Conditions & Settings
  conditions: {
    type: string
    description: string
    required: boolean
  }[]
  allowPartialReleases: boolean
  requireUnanimousApproval: boolean
  minimumStakeholders: string
  disputeResolutionProcess: 'MEDIATION' | 'ARBITRATION' | 'LEGAL'
  tags: string[]
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  description: '',
  purpose: '',
  type: 'BUSINESS_TRANSACTION',
  currency: 'USD',
  totalAmount: '',
  beneficiaryBusinessName: '',
  beneficiaryEmail: '',
  beneficiaryContactPerson: '',
  beneficiaryPhone: '',
  stakeholders: [],
  conditions: [],
  allowPartialReleases: false,
  requireUnanimousApproval: true,
  minimumStakeholders: '0',
  disputeResolutionProcess: 'MEDIATION',
  tags: []
}

export default function CreateEscrowPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps = [
    { number: 1, title: 'Basic Info', icon: FileText },
    { number: 2, title: 'Beneficiary', icon: Building },
    { number: 3, title: 'Stakeholders', icon: Users },
    { number: 4, title: 'Settings', icon: Settings }
  ]

  // Validation for each step
  const validateStep = (step: Step): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.description.trim()) newErrors.description = 'Description is required'
      if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required'
      if (!formData.totalAmount || parseFloat(formData.totalAmount) <= 0) {
        newErrors.totalAmount = 'Total amount must be greater than 0'
      }
    }

    if (step === 2) {
      if (!formData.beneficiaryBusinessName.trim()) {
        newErrors.beneficiaryBusinessName = 'Business name is required'
      }
      if (!formData.beneficiaryEmail.trim()) {
        newErrors.beneficiaryEmail = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.beneficiaryEmail)) {
        newErrors.beneficiaryEmail = 'Invalid email format'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((currentStep + 1) as Step)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // In real app, this would create the escrow via API
      console.log('Creating escrow with data:', formData)

      // Simulate successful creation
      router.push('/escrow')
    }
  }

  const addStakeholder = () => {
    setFormData({
      ...formData,
      stakeholders: [
        ...formData.stakeholders,
        { businessName: '', email: '', contactPerson: '' }
      ]
    })
  }

  const removeStakeholder = (index: number) => {
    setFormData({
      ...formData,
      stakeholders: formData.stakeholders.filter((_, i) => i !== index)
    })
  }

  const updateStakeholder = (index: number, field: keyof typeof formData.stakeholders[0], value: string) => {
    const updated = [...formData.stakeholders]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, stakeholders: updated })
  }

  const addCondition = () => {
    setFormData({
      ...formData,
      conditions: [
        ...formData.conditions,
        { type: 'MILESTONE_MET', description: '', required: true }
      ]
    })
  }

  const removeCondition = (index: number) => {
    setFormData({
      ...formData,
      conditions: formData.conditions.filter((_, i) => i !== index)
    })
  }

  const updateCondition = (index: number, field: keyof typeof formData.conditions[0], value: any) => {
    const updated = [...formData.conditions]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, conditions: updated })
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={() => router.push('/escrow')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Escrows
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create New Escrow
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Set up a secure escrow for your business transaction
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isCompleted
                        ? 'bg-green-600 text-white'
                        : isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 dark:text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <StepIcon className="w-6 h-6" />
                    )}
                  </div>
                  <p
                    className={`text-sm font-medium mt-2 text-center ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : isCompleted
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500 dark:text-gray-400 dark:text-gray-400'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 ${
                      isCompleted
                        ? 'bg-green-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Form Content */}
      <Card>
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Basic Information
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Provide the essential details about this escrow agreement
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Escrow Name *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Acme Corp Software License"
                error={errors.name}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the escrow agreement"
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Purpose *
              </label>
              <textarea
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                placeholder="What is the business purpose of this escrow?"
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
              />
              {errors.purpose && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.purpose}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Escrow Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as EscrowType })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="BUSINESS_TRANSACTION">Business Transaction</option>
                  <option value="PROJECT_MILESTONE">Project Milestone</option>
                  <option value="CONDITIONAL_PAYMENT">Conditional Payment</option>
                  <option value="MULTI_PARTY">Multi-Party</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Currency *
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Amount *
              </label>
              <Input
                type="number"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                placeholder="0.00"
                icon={<DollarSign className="w-4 h-4" />}
                iconPosition="left"
                error={errors.totalAmount}
              />
            </div>
          </div>
        )}

        {/* Step 2: Beneficiary */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Beneficiary Details
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Who will receive the funds from this escrow?
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Business Name *
              </label>
              <Input
                type="text"
                value={formData.beneficiaryBusinessName}
                onChange={(e) => setFormData({ ...formData, beneficiaryBusinessName: e.target.value })}
                placeholder="e.g., TechSoft Solutions Ltd"
                icon={<Building className="w-4 h-4" />}
                iconPosition="left"
                error={errors.beneficiaryBusinessName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                value={formData.beneficiaryEmail}
                onChange={(e) => setFormData({ ...formData, beneficiaryEmail: e.target.value })}
                placeholder="contact@business.com"
                error={errors.beneficiaryEmail}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                An invitation will be sent to this email address
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Person (Optional)
                </label>
                <Input
                  type="text"
                  value={formData.beneficiaryContactPerson}
                  onChange={(e) => setFormData({ ...formData, beneficiaryContactPerson: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number (Optional)
                </label>
                <Input
                  type="tel"
                  value={formData.beneficiaryPhone}
                  onChange={(e) => setFormData({ ...formData, beneficiaryPhone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Stakeholders */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Stakeholders & Witnesses
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Add stakeholders who will approve fund releases (optional)
              </p>
            </div>

            {formData.stakeholders.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  No stakeholders added yet
                </p>
                <Button variant="outline" onClick={addStakeholder}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stakeholder
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.stakeholders.map((stakeholder, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        Stakeholder {index + 1}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStakeholder(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        type="text"
                        value={stakeholder.businessName}
                        onChange={(e) => updateStakeholder(index, 'businessName', e.target.value)}
                        placeholder="Business Name"
                      />
                      <Input
                        type="email"
                        value={stakeholder.email}
                        onChange={(e) => updateStakeholder(index, 'email', e.target.value)}
                        placeholder="Email"
                      />
                      <Input
                        type="text"
                        value={stakeholder.contactPerson}
                        onChange={(e) => updateStakeholder(index, 'contactPerson', e.target.value)}
                        placeholder="Contact Person"
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addStakeholder}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Stakeholder
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Settings */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Conditions & Settings
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Configure release conditions and escrow rules
              </p>
            </div>

            {/* Conditions */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                Release Conditions (Optional)
              </h3>
              {formData.conditions.length === 0 ? (
                <div className="text-center py-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    No conditions set
                  </p>
                  <Button variant="outline" size="sm" onClick={addCondition}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Condition
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.conditions.map((condition, index) => (
                    <div
                      key={index}
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-start gap-3">
                        <select
                          value={condition.type}
                          onChange={(e) => updateCondition(index, 'type', e.target.value)}
                          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                        >
                          <option value="MILESTONE_MET">Milestone Met</option>
                          <option value="DOCUMENT_UPLOAD">Document Upload</option>
                          <option value="SIGNATURE_REQUIRED">Signature Required</option>
                          <option value="DATE_PASSED">Date Passed</option>
                          <option value="CUSTOM">Custom</option>
                        </select>
                        <Input
                          type="text"
                          value={condition.description}
                          onChange={(e) => updateCondition(index, 'description', e.target.value)}
                          placeholder="Condition description"
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCondition(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addCondition}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Condition
                  </Button>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                Escrow Settings
              </h3>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.allowPartialReleases}
                  onChange={(e) => setFormData({ ...formData, allowPartialReleases: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Allow Partial Releases
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    Enable milestone-based or incremental fund releases
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.requireUnanimousApproval}
                  onChange={(e) => setFormData({ ...formData, requireUnanimousApproval: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Require Unanimous Approval
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    All stakeholders must approve fund releases
                  </p>
                </div>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dispute Resolution Process
                </label>
                <select
                  value={formData.disputeResolutionProcess}
                  onChange={(e) => setFormData({ ...formData, disputeResolutionProcess: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="MEDIATION">Mediation</option>
                  <option value="ARBITRATION">Arbitration</option>
                  <option value="LEGAL">Legal Process</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < 4 ? (
            <Button variant="primary" onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              <Check className="w-4 h-4 mr-2" />
              Create Escrow
            </Button>
          )}
        </div>
      </Card>
    </PageLayout>
  )
}
