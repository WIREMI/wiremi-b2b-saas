'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  UserPlus,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  FileText,
  Upload,
  CheckCircle2,
  Info,
  Building2,
  Hash,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'

interface EmployeeFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string

  // Employment Information
  employeeId: string
  department: string
  position: string
  employmentType: string
  startDate: string
  manager: string
  location: string

  // Compensation
  salary: string
  payFrequency: string
  currency: string
  bankAccount: string
  taxId: string

  // Documents
  resume?: File
  contract?: File
}

type FormStep = 1 | 2 | 3

export default function AddEmployeePage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [currentStep, setCurrentStep] = useState<FormStep>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    employeeId: '',
    department: '',
    position: '',
    employmentType: '',
    startDate: '',
    manager: '',
    location: '',
    salary: '',
    payFrequency: '',
    currency: 'USD',
    bankAccount: '',
    taxId: '',
  })

  const departments = [
    { value: '', label: 'Select department' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales & Marketing' },
    { value: 'operations', label: 'Operations' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'HR & Admin' },
  ]

  const employmentTypes = [
    { value: '', label: 'Select type' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'intern', label: 'Intern' },
  ]

  const payFrequencies = [
    { value: '', label: 'Select frequency' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'bi-weekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'annual', label: 'Annual' },
  ]

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
  ]

  const managers = [
    { value: '', label: 'Select manager' },
    { value: '1', label: 'Michael Chen - Engineering Manager' },
    { value: '2', label: 'Emily Rodriguez - Sales Director' },
    { value: '3', label: 'David Kim - Operations Manager' },
    { value: '4', label: 'Amanda White - HR Manager' },
  ]

  const locations = [
    { value: '', label: 'Select location' },
    { value: 'ny', label: 'New York, NY' },
    { value: 'sf', label: 'San Francisco, CA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'remote', label: 'Remote' },
  ]

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required'
    if (!formData.department) newErrors.department = 'Department is required'
    if (!formData.position.trim()) newErrors.position = 'Position is required'
    if (!formData.employmentType) newErrors.employmentType = 'Employment type is required'
    if (!formData.startDate) newErrors.startDate = 'Start date is required'
    if (!formData.manager) newErrors.manager = 'Manager is required'
    if (!formData.location) newErrors.location = 'Location is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary is required'
    } else if (parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be greater than 0'
    }

    if (!formData.payFrequency) newErrors.payFrequency = 'Pay frequency is required'
    if (!formData.currency) newErrors.currency = 'Currency is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false

    switch (currentStep) {
      case 1:
        isValid = validateStep1()
        break
      case 2:
        isValid = validateStep2()
        break
      case 3:
        isValid = validateStep3()
        break
    }

    if (isValid) {
      setCurrentStep((currentStep + 1) as FormStep)
    } else {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please complete all required fields',
      })
    }
  }

  const handleBack = () => {
    setCurrentStep((currentStep - 1) as FormStep)
    setErrors({})
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateStep3()) {
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
        title: 'Employee Added',
        message: `${formData.firstName} ${formData.lastName} has been added successfully`,
      })

      setTimeout(() => {
        router.push('/hr/employees')
      }, 1500)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Add Employee',
        message: 'Please try again',
      })
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof EmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const steps = [
    { number: 1, label: 'Personal Info', icon: User },
    { number: 2, label: 'Employment', icon: Briefcase },
    { number: 3, label: 'Compensation', icon: DollarSign },
  ]

  return (
    <PageLayout maxWidth="normal">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.back()}
          className="mb-4"
        >
          Back to Employees
        </Button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
            <UserPlus className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Add New Employee
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete the form to add a new team member
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-success border-success'
                          : isActive
                          ? 'bg-primary-500 border-primary-500'
                          : 'bg-gray-50 dark:bg-dark-surface border-gray-300 dark:border-dark-border'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <Icon
                          className={`w-6 h-6 ${
                            isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'
                          }`}
                        />
                      )}
                    </div>
                    <p
                      className={`text-sm font-medium mt-2 ${
                        isActive || isCompleted
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 dark:text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 -mt-6 ${
                        isCompleted
                          ? 'bg-success'
                          : 'bg-gray-300 dark:bg-dark-border'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Personal Information
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Enter the employee's personal details
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  error={errors.firstName}
                  icon={<User className="w-5 h-5" />}
                  iconPosition="left"
                  required
                  autoFocus
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  error={errors.lastName}
                  icon={<User className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john.doe@wiremi.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  error={errors.email}
                  icon={<Mail className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  error={errors.phone}
                  icon={<Phone className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />
              </div>

              <Input
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                error={errors.dateOfBirth}
                icon={<Calendar className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <Input
                label="Address"
                placeholder="123 Main Street"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                error={errors.address}
                icon={<MapPin className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="City"
                  placeholder="New York"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  error={errors.city}
                  required
                />
                <Input
                  label="State"
                  placeholder="NY"
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value)}
                  error={errors.state}
                />
                <Input
                  label="ZIP Code"
                  placeholder="10001"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value)}
                  error={errors.zipCode}
                />
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleNext}
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Employment Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Employment Information
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Define the employee's role and reporting structure
                </p>
              </div>

              <Input
                label="Employee ID"
                placeholder="EMP-XXX"
                value={formData.employeeId}
                onChange={(e) => updateFormData('employeeId', e.target.value)}
                error={errors.employeeId}
                icon={<Hash className="w-5 h-5" />}
                iconPosition="left"
                helperText="Unique identifier for this employee"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Department"
                  options={departments}
                  value={formData.department}
                  onChange={(e) => updateFormData('department', e.target.value)}
                  error={errors.department}
                  required
                />
                <Select
                  label="Employment Type"
                  options={employmentTypes}
                  value={formData.employmentType}
                  onChange={(e) => updateFormData('employmentType', e.target.value)}
                  error={errors.employmentType}
                  required
                />
              </div>

              <Input
                label="Position/Job Title"
                placeholder="e.g., Software Engineer, Sales Manager"
                value={formData.position}
                onChange={(e) => updateFormData('position', e.target.value)}
                error={errors.position}
                icon={<Briefcase className="w-5 h-5" />}
                iconPosition="left"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Start Date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateFormData('startDate', e.target.value)}
                  error={errors.startDate}
                  icon={<Calendar className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />
                <Select
                  label="Reports To (Manager)"
                  options={managers}
                  value={formData.manager}
                  onChange={(e) => updateFormData('manager', e.target.value)}
                  error={errors.manager}
                  required
                />
              </div>

              <Select
                label="Work Location"
                options={locations}
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                error={errors.location}
                required
              />

              <div className="flex justify-between gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleNext}
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Compensation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Compensation & Banking
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Set up salary and payment information
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Salary"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.salary}
                  onChange={(e) => updateFormData('salary', e.target.value)}
                  error={errors.salary}
                  icon={<DollarSign className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />
                <Select
                  label="Pay Frequency"
                  options={payFrequencies}
                  value={formData.payFrequency}
                  onChange={(e) => updateFormData('payFrequency', e.target.value)}
                  error={errors.payFrequency}
                  required
                />
              </div>

              <Select
                label="Currency"
                options={currencies}
                value={formData.currency}
                onChange={(e) => updateFormData('currency', e.target.value)}
                error={errors.currency}
                required
              />

              <Input
                label="Bank Account Number"
                placeholder="Account number for direct deposit"
                value={formData.bankAccount}
                onChange={(e) => updateFormData('bankAccount', e.target.value)}
                error={errors.bankAccount}
                icon={<Building2 className="w-5 h-5" />}
                iconPosition="left"
                helperText="Used for payroll direct deposit"
              />

              <Input
                label="Tax ID / SSN"
                placeholder="XXX-XX-XXXX"
                value={formData.taxId}
                onChange={(e) => updateFormData('taxId', e.target.value)}
                error={errors.taxId}
                icon={<FileText className="w-5 h-5" />}
                iconPosition="left"
                helperText="Required for tax reporting"
              />

              {/* Info Banner */}
              <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-primary-900 dark:text-primary-300">
                    <strong>Privacy & Security:</strong> All compensation and banking information is encrypted and stored securely. Only authorized personnel can access this data.
                  </p>
                </div>
              </div>

              <div className="flex justify-between gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  icon={<CheckCircle2 className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Add Employee
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </PageLayout>
  )
}
