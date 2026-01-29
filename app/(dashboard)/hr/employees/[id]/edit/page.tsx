'use client'

import { useState, FormEvent, use } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  FileText,
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
  employeeId: string
  department: string
  position: string
  employmentType: string
  startDate: string
  manager: string
  location: string
  salary: string
  payFrequency: string
  currency: string
  bankAccount: string
  taxId: string
}

export default function EditEmployeePage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Mock employee data - in real app, fetch from API
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@wiremi.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    employeeId: 'EMP-001',
    department: 'engineering',
    position: 'Senior Software Engineer',
    employmentType: 'full-time',
    startDate: '2023-01-15',
    manager: '1',
    location: 'ny',
    salary: '125000',
    payFrequency: 'monthly',
    currency: 'USD',
    bankAccount: '****1234',
    taxId: '***-**-1234',
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.department) newErrors.department = 'Department is required'
    if (!formData.position.trim()) newErrors.position = 'Position is required'
    if (!formData.salary.trim() || parseFloat(formData.salary) <= 0) {
      newErrors.salary = 'Valid salary is required'
    }

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
        title: 'Employee Updated',
        message: `${formData.firstName} ${formData.lastName} has been updated successfully`,
      })

      setTimeout(() => {
        router.push(`/hr/employees/${params.id}`)
      }, 1000)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Update Employee',
        message: 'Please try again',
      })
      setIsLoading(false)
    }
  }

  const updateFormData = (field: keyof EmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
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
        Back to Employee
      </Button>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
          <User className="w-8 h-8 text-primary-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Edit Employee
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update employee information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <Card className="p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Personal Information
          </h2>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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

          <div className="mt-6">
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
              icon={<Calendar className="w-5 h-5" />}
              iconPosition="left"
            />
          </div>

          <div className="mt-6">
            <Input
              label="Address"
              placeholder="123 Main Street"
              value={formData.address}
              onChange={(e) => updateFormData('address', e.target.value)}
              icon={<MapPin className="w-5 h-5" />}
              iconPosition="left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Input
              label="City"
              placeholder="New York"
              value={formData.city}
              onChange={(e) => updateFormData('city', e.target.value)}
            />
            <Input
              label="State"
              placeholder="NY"
              value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)}
            />
            <Input
              label="ZIP Code"
              placeholder="10001"
              value={formData.zipCode}
              onChange={(e) => updateFormData('zipCode', e.target.value)}
            />
          </div>
        </Card>

        {/* Employment Information */}
        <Card className="p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Employment Information
          </h2>

          <Input
            label="Employee ID"
            placeholder="EMP-XXX"
            value={formData.employeeId}
            onChange={(e) => updateFormData('employeeId', e.target.value)}
            icon={<Hash className="w-5 h-5" />}
            iconPosition="left"
            helperText="Unique identifier for this employee"
            disabled
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
              required
            />
          </div>

          <div className="mt-6">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => updateFormData('startDate', e.target.value)}
              icon={<Calendar className="w-5 h-5" />}
              iconPosition="left"
            />
            <Select
              label="Reports To (Manager)"
              options={managers}
              value={formData.manager}
              onChange={(e) => updateFormData('manager', e.target.value)}
            />
          </div>

          <div className="mt-6">
            <Select
              label="Work Location"
              options={locations}
              value={formData.location}
              onChange={(e) => updateFormData('location', e.target.value)}
            />
          </div>
        </Card>

        {/* Compensation */}
        <Card className="p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Compensation & Banking
          </h2>

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
            />
          </div>

          <div className="mt-6">
            <Select
              label="Currency"
              options={currencies}
              value={formData.currency}
              onChange={(e) => updateFormData('currency', e.target.value)}
            />
          </div>

          <div className="mt-6">
            <Input
              label="Bank Account Number"
              placeholder="Account number for direct deposit"
              value={formData.bankAccount}
              onChange={(e) => updateFormData('bankAccount', e.target.value)}
              icon={<Building2 className="w-5 h-5" />}
              iconPosition="left"
              helperText="Used for payroll direct deposit"
            />
          </div>

          <div className="mt-6">
            <Input
              label="Tax ID / SSN"
              placeholder="XXX-XX-XXXX"
              value={formData.taxId}
              onChange={(e) => updateFormData('taxId', e.target.value)}
              icon={<FileText className="w-5 h-5" />}
              iconPosition="left"
              helperText="Required for tax reporting"
            />
          </div>
        </Card>

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
