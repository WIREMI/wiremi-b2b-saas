'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Building2,
  MapPin,
  Globe,
  Users,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Mail,
  Phone,
  FileText,
  Upload,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import PasswordInput from '@/components/ui/password-input'
import OTPInput from '@/components/ui/otp-input'
import { useToast } from '@/components/ui/toast'
import { isValidEmail } from '@/lib/utils'

type SignUpStep = 1 | 2 | 3 | 4

interface BusinessInfo {
  legalName: string
  tradingName: string
  registrationNumber: string
  industry: string
  country: string
  address: string
  city: string
  postalCode: string
  website: string
}

interface OwnerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  nationality: string
  password: string
  confirmPassword: string
}

interface VerificationInfo {
  otp: string
}

interface KYBDocuments {
  registrationCertificate: File | null
  proofOfAddress: File | null
  ownerIdentification: File | null
}

const industryOptions = [
  { value: '', label: 'Select industry' },
  { value: 'technology', label: 'Technology & Software' },
  { value: 'ecommerce', label: 'E-commerce & Retail' },
  { value: 'professional', label: 'Professional Services' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'healthcare', label: 'Healthcare & Medical' },
  { value: 'education', label: 'Education & Training' },
  { value: 'finance', label: 'Financial Services' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other', label: 'Other' },
]

const countryOptions = [
  { value: '', label: 'Select country' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'SG', label: 'Singapore' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'KE', label: 'Kenya' },
]

export default function SignUpPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [currentStep, setCurrentStep] = useState<SignUpStep>(1)
  const [isLoading, setIsLoading] = useState(false)

  // Form data state
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    legalName: '',
    tradingName: '',
    registrationNumber: '',
    industry: '',
    country: '',
    address: '',
    city: '',
    postalCode: '',
    website: '',
  })

  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    password: '',
    confirmPassword: '',
  })

  const [verificationInfo, setVerificationInfo] = useState<VerificationInfo>({
    otp: '',
  })

  const [kybDocuments, setKybDocuments] = useState<KYBDocuments>({
    registrationCertificate: null,
    proofOfAddress: null,
    ownerIdentification: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation functions
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!businessInfo.legalName.trim()) newErrors.legalName = 'Legal business name is required'
    if (!businessInfo.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required'
    if (!businessInfo.industry) newErrors.industry = 'Please select an industry'
    if (!businessInfo.country) newErrors.country = 'Please select a country'
    if (!businessInfo.address.trim()) newErrors.address = 'Business address is required'
    if (!businessInfo.city.trim()) newErrors.city = 'City is required'
    if (!businessInfo.postalCode.trim()) newErrors.postalCode = 'Postal code is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!ownerInfo.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!ownerInfo.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!ownerInfo.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!isValidEmail(ownerInfo.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!ownerInfo.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!ownerInfo.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (!ownerInfo.nationality) newErrors.nationality = 'Nationality is required'

    // Password validation
    if (!ownerInfo.password) {
      newErrors.password = 'Password is required'
    } else if (ownerInfo.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!ownerInfo.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (ownerInfo.password !== ownerInfo.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {}

    if (!verificationInfo.otp || verificationInfo.otp.length !== 6) {
      newErrors.otp = 'Please enter the 6-digit verification code'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {}

    if (!kybDocuments.registrationCertificate) {
      newErrors.registrationCertificate = 'Business registration certificate is required'
    }
    if (!kybDocuments.proofOfAddress) {
      newErrors.proofOfAddress = 'Proof of business address is required'
    }
    if (!kybDocuments.ownerIdentification) {
      newErrors.ownerIdentification = 'Owner identification document is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Step handlers
  const handleNext = async () => {
    let isValid = false

    switch (currentStep) {
      case 1:
        isValid = validateStep1()
        break
      case 2:
        isValid = validateStep2()
        if (isValid) {
          // Send OTP to email
          setIsLoading(true)
          await new Promise(resolve => setTimeout(resolve, 1500))
          setIsLoading(false)
          showToast({
            type: 'success',
            title: 'Verification Code Sent',
            message: `We've sent a 6-digit code to ${ownerInfo.email}`,
          })
        }
        break
      case 3:
        isValid = validateStep3()
        if (isValid) {
          // Verify OTP
          setIsLoading(true)
          await new Promise(resolve => setTimeout(resolve, 1500))
          setIsLoading(false)
          showToast({
            type: 'success',
            title: 'Email Verified',
            message: 'Your email has been verified successfully',
          })
        }
        break
      case 4:
        isValid = validateStep4()
        if (isValid) {
          // Submit all data
          setIsLoading(true)
          await new Promise(resolve => setTimeout(resolve, 2000))
          setIsLoading(false)
          showToast({
            type: 'success',
            title: 'Account Created!',
            message: 'Redirecting to onboarding...',
          })
          setTimeout(() => router.push('/onboarding'), 1500)
        }
        break
    }

    if (isValid && currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as SignUpStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as SignUpStep)
      setErrors({})
    }
  }

  const handleFileUpload = (field: keyof KYBDocuments, file: File | null) => {
    setKybDocuments(prev => ({ ...prev, [field]: file }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    showToast({
      type: 'success',
      title: 'Code Resent',
      message: `A new verification code has been sent to ${ownerInfo.email}`,
    })
  }

  // Progress indicator
  const steps = [
    { number: 1, title: 'Business Info', icon: Building2 },
    { number: 2, title: 'Owner Info', icon: User },
    { number: 3, title: 'Verification', icon: Shield },
    { number: 4, title: 'Documentation', icon: FileText },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg py-12 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">W</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Your Business Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join thousands of businesses using Wiremi
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-success text-white'
                          : isActive
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-200 dark:bg-dark-border text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <p
                      className={`mt-2 text-sm font-medium hidden sm:block ${
                        isActive || isCompleted
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all ${
                        isCompleted
                          ? 'bg-success'
                          : 'bg-gray-200 dark:bg-dark-border'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-gray-100 dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-200 dark:border-dark-border p-8">
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Business Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us about your business
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="Legal Business Name"
                  placeholder="Acme Corporation Ltd."
                  value={businessInfo.legalName}
                  onChange={(e) => {
                    setBusinessInfo(prev => ({ ...prev, legalName: e.target.value }))
                    setErrors(prev => ({ ...prev, legalName: '' }))
                  }}
                  error={errors.legalName}
                  icon={<Building2 className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />

                <Input
                  label="Trading Name (Optional)"
                  placeholder="Acme"
                  value={businessInfo.tradingName}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, tradingName: e.target.value }))}
                  icon={<Building2 className="w-5 h-5" />}
                  iconPosition="left"
                />

                <Input
                  label="Business Registration Number"
                  placeholder="12345678"
                  value={businessInfo.registrationNumber}
                  onChange={(e) => {
                    setBusinessInfo(prev => ({ ...prev, registrationNumber: e.target.value }))
                    setErrors(prev => ({ ...prev, registrationNumber: '' }))
                  }}
                  error={errors.registrationNumber}
                  icon={<FileText className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />

                <Select
                  label="Industry"
                  options={industryOptions}
                  value={businessInfo.industry}
                  onChange={(e) => {
                    setBusinessInfo(prev => ({ ...prev, industry: e.target.value }))
                    setErrors(prev => ({ ...prev, industry: '' }))
                  }}
                  error={errors.industry}
                  required
                />

                <Select
                  label="Country"
                  options={countryOptions}
                  value={businessInfo.country}
                  onChange={(e) => {
                    setBusinessInfo(prev => ({ ...prev, country: e.target.value }))
                    setErrors(prev => ({ ...prev, country: '' }))
                  }}
                  error={errors.country}
                  required
                />

                <Input
                  label="Website (Optional)"
                  type="url"
                  placeholder="https://acme.com"
                  value={businessInfo.website}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, website: e.target.value }))}
                  icon={<Globe className="w-5 h-5" />}
                  iconPosition="left"
                />

                <div className="md:col-span-2">
                  <Input
                    label="Business Address"
                    placeholder="123 Main Street"
                    value={businessInfo.address}
                    onChange={(e) => {
                      setBusinessInfo(prev => ({ ...prev, address: e.target.value }))
                      setErrors(prev => ({ ...prev, address: '' }))
                    }}
                    error={errors.address}
                    icon={<MapPin className="w-5 h-5" />}
                    iconPosition="left"
                    required
                  />
                </div>

                <Input
                  label="City"
                  placeholder="New York"
                  value={businessInfo.city}
                  onChange={(e) => {
                    setBusinessInfo(prev => ({ ...prev, city: e.target.value }))
                    setErrors(prev => ({ ...prev, city: '' }))
                  }}
                  error={errors.city}
                  required
                />

                <Input
                  label="Postal Code"
                  placeholder="10001"
                  value={businessInfo.postalCode}
                  onChange={(e) => {
                    setBusinessInfo(prev => ({ ...prev, postalCode: e.target.value }))
                    setErrors(prev => ({ ...prev, postalCode: '' }))
                  }}
                  error={errors.postalCode}
                  required
                />
              </div>
            </div>
          )}

          {/* Step 2: Owner Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Owner Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Details about the business owner or authorized representative
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  label="First Name"
                  placeholder="John"
                  value={ownerInfo.firstName}
                  onChange={(e) => {
                    setOwnerInfo(prev => ({ ...prev, firstName: e.target.value }))
                    setErrors(prev => ({ ...prev, firstName: '' }))
                  }}
                  error={errors.firstName}
                  icon={<User className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />

                <Input
                  label="Last Name"
                  placeholder="Doe"
                  value={ownerInfo.lastName}
                  onChange={(e) => {
                    setOwnerInfo(prev => ({ ...prev, lastName: e.target.value }))
                    setErrors(prev => ({ ...prev, lastName: '' }))
                  }}
                  error={errors.lastName}
                  icon={<User className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@acme.com"
                  value={ownerInfo.email}
                  onChange={(e) => {
                    setOwnerInfo(prev => ({ ...prev, email: e.target.value }))
                    setErrors(prev => ({ ...prev, email: '' }))
                  }}
                  error={errors.email}
                  icon={<Mail className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={ownerInfo.phone}
                  onChange={(e) => {
                    setOwnerInfo(prev => ({ ...prev, phone: e.target.value }))
                    setErrors(prev => ({ ...prev, phone: '' }))
                  }}
                  error={errors.phone}
                  icon={<Phone className="w-5 h-5" />}
                  iconPosition="left"
                  required
                />

                <Input
                  label="Date of Birth"
                  type="date"
                  value={ownerInfo.dateOfBirth}
                  onChange={(e) => {
                    setOwnerInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))
                    setErrors(prev => ({ ...prev, dateOfBirth: '' }))
                  }}
                  error={errors.dateOfBirth}
                  required
                />

                <Select
                  label="Nationality"
                  options={countryOptions}
                  value={ownerInfo.nationality}
                  onChange={(e) => {
                    setOwnerInfo(prev => ({ ...prev, nationality: e.target.value }))
                    setErrors(prev => ({ ...prev, nationality: '' }))
                  }}
                  error={errors.nationality}
                  required
                />

                <div className="md:col-span-2">
                  <PasswordInput
                    label="Password"
                    placeholder="Create a strong password"
                    value={ownerInfo.password}
                    onChange={(e) => {
                      setOwnerInfo(prev => ({ ...prev, password: e.target.value }))
                      setErrors(prev => ({ ...prev, password: '' }))
                    }}
                    error={errors.password}
                    showStrength
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Re-enter your password"
                    value={ownerInfo.confirmPassword}
                    onChange={(e) => {
                      setOwnerInfo(prev => ({ ...prev, confirmPassword: e.target.value }))
                      setErrors(prev => ({ ...prev, confirmPassword: '' }))
                    }}
                    error={errors.confirmPassword}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Verify Your Email
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We've sent a 6-digit verification code to
                </p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {ownerInfo.email}
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <OTPInput
                  length={6}
                  value={verificationInfo.otp}
                  onChange={(value) => {
                    setVerificationInfo({ otp: value })
                    setErrors(prev => ({ ...prev, otp: '' }))
                  }}
                  error={errors.otp}
                  label="Verification Code"
                />

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Didn't receive the code?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                    className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors disabled:opacity-50"
                  >
                    Resend Code
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: KYB Documentation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Business Documentation
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload required documents to verify your business (KYB)
                </p>
              </div>

              <div className="space-y-5">
                {/* Registration Certificate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Business Registration Certificate <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('registrationCertificate', e.target.files?.[0] || null)}
                      className="hidden"
                      id="registration-cert"
                    />
                    <label
                      htmlFor="registration-cert"
                      className={`flex items-center justify-center gap-3 px-4 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                        errors.registrationCertificate
                          ? 'border-error bg-error/5'
                          : kybDocuments.registrationCertificate
                          ? 'border-success bg-success/5'
                          : 'border-gray-300 dark:border-dark-border hover:border-primary-500 bg-gray-50 dark:bg-dark-bg'
                      }`}
                    >
                      <Upload className="w-6 h-6 text-gray-400" />
                      <div className="text-center">
                        {kybDocuments.registrationCertificate ? (
                          <p className="text-sm font-medium text-success">
                            ✓ {kybDocuments.registrationCertificate.name}
                          </p>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PDF, JPG, or PNG (max 10MB)
                            </p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                  {errors.registrationCertificate && (
                    <p className="mt-2 text-sm text-error">{errors.registrationCertificate}</p>
                  )}
                </div>

                {/* Proof of Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Proof of Business Address <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('proofOfAddress', e.target.files?.[0] || null)}
                      className="hidden"
                      id="proof-address"
                    />
                    <label
                      htmlFor="proof-address"
                      className={`flex items-center justify-center gap-3 px-4 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                        errors.proofOfAddress
                          ? 'border-error bg-error/5'
                          : kybDocuments.proofOfAddress
                          ? 'border-success bg-success/5'
                          : 'border-gray-300 dark:border-dark-border hover:border-primary-500 bg-gray-50 dark:bg-dark-bg'
                      }`}
                    >
                      <Upload className="w-6 h-6 text-gray-400" />
                      <div className="text-center">
                        {kybDocuments.proofOfAddress ? (
                          <p className="text-sm font-medium text-success">
                            ✓ {kybDocuments.proofOfAddress.name}
                          </p>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Utility bill, bank statement (max 10MB)
                            </p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                  {errors.proofOfAddress && (
                    <p className="mt-2 text-sm text-error">{errors.proofOfAddress}</p>
                  )}
                </div>

                {/* Owner Identification */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Owner Identification Document <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('ownerIdentification', e.target.files?.[0] || null)}
                      className="hidden"
                      id="owner-id"
                    />
                    <label
                      htmlFor="owner-id"
                      className={`flex items-center justify-center gap-3 px-4 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                        errors.ownerIdentification
                          ? 'border-error bg-error/5'
                          : kybDocuments.ownerIdentification
                          ? 'border-success bg-success/5'
                          : 'border-gray-300 dark:border-dark-border hover:border-primary-500 bg-gray-50 dark:bg-dark-bg'
                      }`}
                    >
                      <Upload className="w-6 h-6 text-gray-400" />
                      <div className="text-center">
                        {kybDocuments.ownerIdentification ? (
                          <p className="text-sm font-medium text-success">
                            ✓ {kybDocuments.ownerIdentification.name}
                          </p>
                        ) : (
                          <>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Passport, National ID, Driver's License (max 10MB)
                            </p>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                  {errors.ownerIdentification && (
                    <p className="mt-2 text-sm text-error">{errors.ownerIdentification}</p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-100 dark:border-primary-500/20">
                <p className="text-sm text-primary-900 dark:text-primary-300">
                  <strong>Note:</strong> All documents will be securely stored and encrypted. We use them only to verify your business identity and comply with regulatory requirements.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleBack}
                icon={<ArrowLeft className="w-5 h-5" />}
                iconPosition="left"
                disabled={isLoading}
              >
                Back
              </Button>
            )}

            <Button
              type="button"
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={handleNext}
              loading={isLoading}
              icon={currentStep === 4 ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              {currentStep === 4 ? 'Complete Registration' : 'Continue'}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/signin" className="text-primary-500 hover:text-primary-600 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
