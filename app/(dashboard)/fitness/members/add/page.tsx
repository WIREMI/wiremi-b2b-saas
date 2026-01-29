'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  UserPlus,
  ArrowLeft,
  ArrowRight,
  User,
  CreditCard,
  FileText,
  Check,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
import { MOCK_MEMBERSHIP_PLANS } from '@/lib/mock-data/fitness'

type Step = 1 | 2 | 3

export default function AddMemberPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Step 1: Personal Info
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male')
  const [emergencyName, setEmergencyName] = useState('')
  const [emergencyPhone, setEmergencyPhone] = useState('')
  const [emergencyRelationship, setEmergencyRelationship] = useState('')

  // Step 2: Membership Plan
  const [selectedPlan, setSelectedPlan] = useState('')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])

  // Step 3: Medical & Preferences
  const [medicalNotes, setMedicalNotes] = useState('')
  const [fitnessGoals, setFitnessGoals] = useState('')

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Membership Plan', icon: CreditCard },
    { number: 3, title: 'Medical & Goals', icon: FileText },
  ]

  const handleNext = () => {
    if (currentStep === 1) {
      if (!firstName || !lastName || !email || !phone || !dateOfBirth) {
        showToast({
          type: 'error',
          title: 'Required Fields',
          message: 'Please fill in all required fields'
        })
        return
      }
      if (!emergencyName || !emergencyPhone || !emergencyRelationship) {
        showToast({
          type: 'error',
          title: 'Emergency Contact Required',
          message: 'Please provide emergency contact information'
        })
        return
      }
    }

    if (currentStep === 2) {
      if (!selectedPlan) {
        showToast({
          type: 'error',
          title: 'Plan Required',
          message: 'Please select a membership plan'
        })
        return
      }
    }

    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    showToast({
      type: 'success',
      title: 'Member Added',
      message: 'Member added successfully!'
    })
    router.push('/fitness/members')
  }

  const selectedPlanDetails = MOCK_MEMBERSHIP_PLANS.find((p) => p.id === selectedPlan)

  return (
    <PageLayout maxWidth="normal">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Add New Member
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create a new gym member account
            </p>
          </div>
          <Button
            variant="outline"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/fitness/members')}
          >
            Back to Members
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = currentStep === step.number
            const isCompleted = currentStep > step.number

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-all ${
                      isCompleted
                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                        : isActive
                        ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-dark-surface text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <StepIcon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div
                      className={`text-sm font-medium ${
                        isActive || isCompleted
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 dark:text-gray-400'
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-4 transition-colors ${
                      currentStep > step.number
                        ? 'bg-green-500'
                        : 'bg-gray-300 dark:bg-dark-border'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Step Content */}
      {currentStep === 1 && (
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Personal Information
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
              />
              <Input
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@example.com"
                required
              />
              <Input
                label="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Date of Birth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
              <Select
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' }
                ]}
                required
              />
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Emergency Contact
              </h3>
              <div className="space-y-6">
                <Input
                  label="Contact Name"
                  type="text"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Contact Phone"
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                  <Input
                    label="Relationship"
                    type="text"
                    value={emergencyRelationship}
                    onChange={(e) => setEmergencyRelationship(e.target.value)}
                    placeholder="Spouse, Parent, Sibling, etc."
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Choose Membership Plan
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_MEMBERSHIP_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 dark:border-dark-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {plan.description}
                      </p>
                    </div>
                    {selectedPlan === plan.id && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      /{plan.billingCycle === 'monthly' ? 'mo' : plan.billingCycle === 'quarterly' ? 'qtr' : 'yr'}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {plan.benefits.slice(0, 4).map((benefit, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                      >
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
              <Input
                label="Membership Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            {selectedPlanDetails && (
              <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Selected Plan: {selectedPlanDetails.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Member will be charged ${selectedPlanDetails.price} {selectedPlanDetails.billingCycle}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {currentStep === 3 && (
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Medical Information & Fitness Goals
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Medical Notes (Optional)
              </label>
              <textarea
                value={medicalNotes}
                onChange={(e) => setMedicalNotes(e.target.value)}
                placeholder="Any medical conditions, injuries, or health concerns we should be aware of..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-card border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fitness Goals (Optional)
              </label>
              <textarea
                value={fitnessGoals}
                onChange={(e) => setFitnessGoals(e.target.value)}
                placeholder="What are your fitness goals? (e.g., weight loss, muscle gain, improve endurance, etc.)"
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-card border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-500/10 rounded-xl border border-green-200 dark:border-green-500/20">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Review Information</h4>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <span className="font-medium">Name:</span> {firstName} {lastName}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {phone}
                </p>
                <p>
                  <span className="font-medium">Plan:</span> {selectedPlanDetails?.name}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          Back
        </Button>

        {currentStep < 3 ? (
          <Button
            variant="primary"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={handleNext}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            icon={<Check className="w-4 h-4" />}
            iconPosition="left"
            onClick={handleSubmit}
            loading={isSubmitting}
          >
            Create Member
          </Button>
        )}
      </div>
    </PageLayout>
  )
}
