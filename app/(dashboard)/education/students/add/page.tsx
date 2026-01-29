'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  UserPlus,
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  GraduationCap,
  DollarSign,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'
import { MOCK_SESSIONS, MOCK_FEE_STRUCTURES, MOCK_SCHOLARSHIPS } from '@/lib/mock-data/education'

export default function EnrollStudentPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    guardianName: '',
    guardianRelationship: '',
    guardianPhone: '',
    guardianEmail: '',
    // Academic Info
    program: '',
    department: '',
    level: 'undergraduate',
    enrollmentType: 'full-time',
    sessionId: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    // Fee & Payment
    feeStructureId: '',
    scholarshipId: '',
    initialPayment: '',
    paymentMethod: 'bank-transfer',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      showToast({
        type: 'success',
        title: 'Student Enrolled',
        message: 'Student enrolled successfully!'
      })
      router.push('/education/students')
    }, 1500)
  }

  const selectedFeeStructure = MOCK_FEE_STRUCTURES.find((f) => f.id === formData.feeStructureId)
  const selectedScholarship = MOCK_SCHOLARSHIPS.find((s) => s.id === formData.scholarshipId)

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Academic Info', icon: GraduationCap },
    { number: 3, title: 'Fee & Payment', icon: DollarSign },
  ]

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Enroll Student</h1>
            <p className="text-gray-600 dark:text-gray-400">Add a new student to the system</p>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 font-bold text-base transition-all ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                        : 'bg-gray-100 dark:bg-dark-surface text-gray-400 dark:text-gray-500'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      currentStep >= step.number
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 ${
                      currentStep > step.number ? 'bg-orange-500' : 'bg-gray-200 dark:bg-dark-card'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Step 1: Personal Info */}
      {currentStep === 1 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              required
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
            <Input
              label="Last Name"
              required
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
            <Input
              label="Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <Input
              label="Phone"
              required
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            <Input
              label="Date of Birth"
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            />
            <Select
              label="Gender"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' }
              ]}
            />
          </div>

          <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-8 mb-4">Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Street Address"
              className="md:col-span-2"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
            />
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
            <Input
              label="State"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
            />
            <Input
              label="ZIP Code"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
            />
            <Input
              label="Country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            />
          </div>

          <h4 className="text-md font-semibold text-gray-900 dark:text-white mt-8 mb-4">
            Guardian Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Guardian Name"
              value={formData.guardianName}
              onChange={(e) => handleInputChange('guardianName', e.target.value)}
            />
            <Input
              label="Relationship"
              value={formData.guardianRelationship}
              onChange={(e) => handleInputChange('guardianRelationship', e.target.value)}
            />
            <Input
              label="Guardian Phone"
              value={formData.guardianPhone}
              onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
            />
            <Input
              label="Guardian Email"
              type="email"
              value={formData.guardianEmail}
              onChange={(e) => handleInputChange('guardianEmail', e.target.value)}
            />
          </div>
        </Card>
      )}

      {/* Step 2: Academic Info */}
      {currentStep === 2 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Academic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Program"
              required
              placeholder="e.g., Computer Science"
              value={formData.program}
              onChange={(e) => handleInputChange('program', e.target.value)}
            />
            <Input
              label="Department"
              required
              placeholder="e.g., Engineering"
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
            />
            <Select
              label="Academic Level"
              required
              value={formData.level}
              onChange={(e) => handleInputChange('level', e.target.value)}
              options={[
                { value: 'undergraduate', label: 'Undergraduate' },
                { value: 'graduate', label: 'Graduate' },
                { value: 'doctorate', label: 'Doctorate' },
                { value: 'diploma', label: 'Diploma' },
                { value: 'certificate', label: 'Certificate' }
              ]}
            />
            <Select
              label="Enrollment Type"
              required
              value={formData.enrollmentType}
              onChange={(e) => handleInputChange('enrollmentType', e.target.value)}
              options={[
                { value: 'full-time', label: 'Full-Time' },
                { value: 'part-time', label: 'Part-Time' },
                { value: 'online', label: 'Online' },
                { value: 'hybrid', label: 'Hybrid' }
              ]}
            />
            <Select
              label="Academic Session"
              required
              value={formData.sessionId}
              onChange={(e) => handleInputChange('sessionId', e.target.value)}
              options={[
                { value: '', label: 'Select Session' },
                ...MOCK_SESSIONS.map((session) => ({
                  value: session.id,
                  label: session.name
                }))
              ]}
            />
            <Input
              label="Enrollment Date"
              type="date"
              required
              value={formData.enrollmentDate}
              onChange={(e) => handleInputChange('enrollmentDate', e.target.value)}
            />
          </div>
        </Card>
      )}

      {/* Step 3: Fee & Payment */}
      {currentStep === 3 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Fee Structure & Payment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Fee Structure"
              required
              className="md:col-span-2"
              value={formData.feeStructureId}
              onChange={(e) => handleInputChange('feeStructureId', e.target.value)}
              options={[
                { value: '', label: 'Select Fee Structure' },
                ...MOCK_FEE_STRUCTURES.map((fee) => ({
                  value: fee.id,
                  label: `${fee.name} - $${fee.totalAmount}`
                }))
              ]}
            />

            {selectedFeeStructure && (
              <div className="md:col-span-2 p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Fee Breakdown</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Tuition:</div>
                  <div className="text-right">${selectedFeeStructure.fees.tuition}</div>
                  <div>Registration:</div>
                  <div className="text-right">${selectedFeeStructure.fees.registration}</div>
                  <div>Library:</div>
                  <div className="text-right">${selectedFeeStructure.fees.library}</div>
                  <div>Laboratory:</div>
                  <div className="text-right">${selectedFeeStructure.fees.laboratory}</div>
                  <div className="font-semibold pt-2 border-t dark:border-dark-border">Total:</div>
                  <div className="font-semibold pt-2 border-t dark:border-dark-border text-right">
                    ${selectedFeeStructure.totalAmount}
                  </div>
                </div>
              </div>
            )}

            <Select
              label="Scholarship (Optional)"
              className="md:col-span-2"
              value={formData.scholarshipId}
              onChange={(e) => handleInputChange('scholarshipId', e.target.value)}
              options={[
                { value: '', label: 'No Scholarship' },
                ...MOCK_SCHOLARSHIPS.filter((s) => s.isActive).map((scholarship) => ({
                  value: scholarship.id,
                  label: `${scholarship.name} - ${scholarship.percentage}%`
                }))
              ]}
            />

            <Input
              label="Initial Payment Amount"
              type="number"
              placeholder="0.00"
              value={formData.initialPayment}
              onChange={(e) => handleInputChange('initialPayment', e.target.value)}
            />
            <Select
              label="Payment Method"
              value={formData.paymentMethod}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              options={[
                { value: 'bank-transfer', label: 'Bank Transfer' },
                { value: 'card', label: 'Credit/Debit Card' },
                { value: 'cash', label: 'Cash' },
                { value: 'mobile-money', label: 'Mobile Money' },
                { value: 'check', label: 'Check' }
              ]}
            />
          </div>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={currentStep === 1 ? () => router.push('/education/students') : handlePrevious}
        >
          {currentStep === 1 ? 'Cancel' : 'Previous'}
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
            loading={loading}
          >
            Enroll Student
          </Button>
        )}
      </div>
    </PageLayout>
  )
}
