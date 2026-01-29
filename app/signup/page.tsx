'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  CreditCard,
  TrendingUp,
  Wallet,
  Plus,
  Trash2,
  ChevronRight,
  Briefcase,
  UserCheck,
  Lock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import PasswordInput from '@/components/ui/password-input'
import OTPInput from '@/components/ui/otp-input'
import { useToast } from '@/components/ui/toast'
import { isValidEmail } from '@/lib/utils'

type SignUpStep = 1 | 2 | 3 | 4 | 5 | 6

interface BusinessInfo {
  legalName: string
  tradingName: string
  registrationNumber: string
  businessType: string
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

interface Director {
  id: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: string
  nationality: string
  ownershipPercentage: string
  isUBO: boolean
  idDocument: File | null
}

interface KYBDocuments {
  registrationCertificate: File | null
  proofOfAddress: File | null
  memorandumOfAssociation: File | null
  shareholderRegister: File | null
}

const businessTypeOptions = [
  { value: '', label: 'Select business type' },
  { value: 'limited_company', label: 'Private Limited Company (Ltd)' },
  { value: 'plc', label: 'Public Limited Company (PLC)' },
  { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'sole_trader', label: 'Sole Proprietorship' },
  { value: 'corporation', label: 'Corporation' },
]

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

// Carousel slides for the left panel
const carouselSlides = [
  {
    id: 1,
    title: 'Global Accounts',
    subtitle: 'Receive payments in 20+ currencies',
    description: 'Open local currency accounts instantly. Collect payments like a local in major markets worldwide.',
    icon: <Globe className="w-8 h-8" />,
    gradient: 'from-blue-600 to-cyan-500',
    features: ['Unique account details', 'No conversion fees', 'Same-day settlements'],
    stat: '150+',
    statLabel: 'Countries supported',
  },
  {
    id: 2,
    title: 'Corporate Cards',
    subtitle: 'Smart spending for your team',
    description: 'Issue virtual and physical cards with built-in controls. Track expenses in real-time.',
    icon: <CreditCard className="w-8 h-8" />,
    gradient: 'from-purple-600 to-pink-500',
    features: ['Instant virtual cards', 'Spending limits', 'Receipt matching'],
    stat: '3%',
    statLabel: 'Cashback on spend',
  },
  {
    id: 3,
    title: 'Global Payouts',
    subtitle: 'Pay anyone, anywhere',
    description: 'Send payments to 180+ countries. Competitive FX rates with transparent pricing.',
    icon: <TrendingUp className="w-8 h-8" />,
    gradient: 'from-emerald-600 to-teal-500',
    features: ['Batch payments', 'Scheduled transfers', 'Real-time tracking'],
    stat: '0.5%',
    statLabel: 'FX markup',
  },
  {
    id: 4,
    title: 'Business Analytics',
    subtitle: 'Insights that drive growth',
    description: 'AI-powered analytics to understand your cash flow and optimize financial operations.',
    icon: <Wallet className="w-8 h-8" />,
    gradient: 'from-orange-600 to-amber-500',
    features: ['Cash flow forecasting', 'Expense analytics', 'Custom reports'],
    stat: '40%',
    statLabel: 'Time saved',
  },
]

export default function SignUpPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [currentStep, setCurrentStep] = useState<SignUpStep>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  // Form data state
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    legalName: '',
    tradingName: '',
    registrationNumber: '',
    businessType: '',
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

  const [directors, setDirectors] = useState<Director[]>([
    {
      id: '1',
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      nationality: '',
      ownershipPercentage: '',
      isUBO: false,
      idDocument: null,
    },
  ])

  const [kybDocuments, setKybDocuments] = useState<KYBDocuments>({
    registrationCertificate: null,
    proofOfAddress: null,
    memorandumOfAssociation: null,
    shareholderRegister: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation functions
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!businessInfo.legalName.trim()) newErrors.legalName = 'Legal business name is required'
    if (!businessInfo.registrationNumber.trim()) newErrors.registrationNumber = 'Registration number is required'
    if (!businessInfo.businessType) newErrors.businessType = 'Please select a business type'
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

    if (!ownerInfo.password) {
      newErrors.password = 'Password is required'
    } else if (ownerInfo.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(ownerInfo.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and a number'
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

    directors.forEach((director, index) => {
      if (!director.firstName.trim()) newErrors[`director_${index}_firstName`] = 'First name is required'
      if (!director.lastName.trim()) newErrors[`director_${index}_lastName`] = 'Last name is required'
      if (!director.email.trim()) {
        newErrors[`director_${index}_email`] = 'Email is required'
      } else if (!isValidEmail(director.email)) {
        newErrors[`director_${index}_email`] = 'Invalid email address'
      }
      if (!director.dateOfBirth) newErrors[`director_${index}_dateOfBirth`] = 'Date of birth is required'
      if (!director.nationality) newErrors[`director_${index}_nationality`] = 'Nationality is required'
      if (director.isUBO && !director.ownershipPercentage) {
        newErrors[`director_${index}_ownershipPercentage`] = 'Ownership percentage is required for UBOs'
      }
    })

    // Validate total UBO ownership
    const totalOwnership = directors
      .filter(d => d.isUBO)
      .reduce((sum, d) => sum + (parseFloat(d.ownershipPercentage) || 0), 0)

    if (totalOwnership > 100) {
      newErrors.totalOwnership = 'Total UBO ownership cannot exceed 100%'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep5 = () => {
    const newErrors: Record<string, string> = {}

    // Check if at least one UBO has uploaded ID
    const ubosWithId = directors.filter(d => d.isUBO && d.idDocument)
    const totalUBOs = directors.filter(d => d.isUBO)

    if (totalUBOs.length > 0 && ubosWithId.length < totalUBOs.length) {
      newErrors.uboDocuments = 'ID documents are required for all UBOs'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep6 = () => {
    const newErrors: Record<string, string> = {}

    if (!kybDocuments.registrationCertificate) {
      newErrors.registrationCertificate = 'Business registration certificate is required'
    }
    if (!kybDocuments.proofOfAddress) {
      newErrors.proofOfAddress = 'Proof of business address is required'
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
        break
      case 5:
        isValid = validateStep5()
        break
      case 6:
        isValid = validateStep6()
        if (isValid) {
          setIsLoading(true)
          await new Promise(resolve => setTimeout(resolve, 2000))
          setIsLoading(false)
          showToast({
            type: 'success',
            title: 'Account Created!',
            message: 'Redirecting to verification status...',
          })
          setTimeout(() => router.push('/verification'), 1500)
        }
        break
    }

    if (isValid && currentStep < 6) {
      setCurrentStep((prev) => (prev + 1) as SignUpStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as SignUpStep)
      setErrors({})
    }
  }

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Please upload PDF, JPG, or PNG files only.'
    }
    if (file.size > maxSize) {
      return 'File size exceeds 10MB limit.'
    }
    return null
  }

  const handleFileUpload = (field: keyof KYBDocuments, file: File | null) => {
    if (file) {
      const validationError = validateFile(file)
      if (validationError) {
        showToast({
          type: 'error',
          title: 'Invalid File',
          message: validationError,
        })
        return
      }
    }
    setKybDocuments(prev => ({ ...prev, [field]: file }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleDirectorFileUpload = (directorId: string, file: File | null) => {
    if (file) {
      const validationError = validateFile(file)
      if (validationError) {
        showToast({
          type: 'error',
          title: 'Invalid File',
          message: validationError,
        })
        return
      }
    }
    setDirectors(prev => prev.map(d =>
      d.id === directorId ? { ...d, idDocument: file } : d
    ))
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

  const addDirector = () => {
    setDirectors(prev => [...prev, {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      nationality: '',
      ownershipPercentage: '',
      isUBO: false,
      idDocument: null,
    }])
  }

  const removeDirector = (id: string) => {
    if (directors.length > 1) {
      setDirectors(prev => prev.filter(d => d.id !== id))
    }
  }

  const updateDirector = (id: string, field: keyof Director, value: string | boolean | File | null) => {
    setDirectors(prev => prev.map(d =>
      d.id === id ? { ...d, [field]: value } : d
    ))
  }

  // Progress indicator
  const steps = [
    { number: 1, title: 'Business', icon: Building2 },
    { number: 2, title: 'Account', icon: User },
    { number: 3, title: 'Verify', icon: Shield },
    { number: 4, title: 'Directors', icon: Users },
    { number: 5, title: 'UBO ID', icon: UserCheck },
    { number: 6, title: 'Documents', icon: FileText },
  ]

  const slide = carouselSlides[currentSlide]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Carousel/Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[50%] relative overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />

          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-8 xl:p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Image
                src="/images/wiremi-icon.png"
                alt="Wiremi"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">WIREMI</span>
          </div>

          {/* Carousel Content */}
          <div className="flex-1 flex flex-col justify-center max-w-lg">
            <div
              className="transition-all duration-500 ease-in-out"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Feature Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${slide.gradient} flex items-center justify-center text-white mb-6 shadow-lg`}>
                {slide.icon}
              </div>

              {/* Feature Title */}
              <h2 className="text-3xl xl:text-4xl font-bold text-white mb-2">
                {slide.title}
              </h2>
              <p className="text-lg text-primary-200 mb-4">
                {slide.subtitle}
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {slide.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-3 mb-8">
                {slide.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-200">
                    <div className="w-5 h-5 rounded-full bg-primary-500/30 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-primary-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Stat Highlight */}
              <div className="inline-flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                <span className={`text-3xl font-bold bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}>
                  {slide.stat}
                </span>
                <span className="text-gray-300 text-sm">{slide.statLabel}</span>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex items-center gap-3 mt-8">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index)
                    setIsAutoPlaying(false)
                    setTimeout(() => setIsAutoPlaying(true), 10000)
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? 'w-8 h-2 bg-primary-500'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="flex items-center gap-8 pt-6 border-t border-white/10">
            <div>
              <p className="text-2xl font-bold text-white">$2B+</p>
              <p className="text-sm text-gray-400">Processed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">50K+</p>
              <p className="text-sm text-gray-400">Businesses</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-sm text-gray-400">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Panel */}
      <div className="flex-1 lg:w-1/2 xl:w-[50%] bg-gray-50 dark:bg-dark-bg overflow-y-auto">
        <div className="min-h-screen flex flex-col p-6 lg:p-8 xl:p-12">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
            <div className="relative w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
              <Image
                src="/images/wiremi-icon.png"
                alt="Wiremi"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">WIREMI</span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Your Business Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join thousands of businesses using Wiremi for global payments
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.number
                const isCompleted = currentStep > step.number

                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-success text-white'
                            : isActive
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 dark:bg-dark-border text-gray-400'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <p
                        className={`mt-1 text-xs font-medium hidden md:block ${
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
                        className={`h-0.5 flex-1 mx-1 transition-all ${
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
          <div className="flex-1 bg-white dark:bg-dark-surface rounded-2xl shadow-sm border border-gray-200 dark:border-dark-border p-6 xl:p-8">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Business Information
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tell us about your business
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    label="Registration Number"
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
                    label="Business Type"
                    options={businessTypeOptions}
                    value={businessInfo.businessType}
                    onChange={(e) => {
                      setBusinessInfo(prev => ({ ...prev, businessType: e.target.value }))
                      setErrors(prev => ({ ...prev, businessType: '' }))
                    }}
                    error={errors.businessType}
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

                  <div className="md:col-span-2">
                    <Input
                      label="Website (Optional)"
                      type="url"
                      placeholder="https://acme.com"
                      value={businessInfo.website}
                      onChange={(e) => setBusinessInfo(prev => ({ ...prev, website: e.target.value }))}
                      icon={<Globe className="w-5 h-5" />}
                      iconPosition="left"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Owner/Account Information */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Account Setup
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Create your account credentials
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* Step 3: Email Verification */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-full mb-4">
                    <Shield className="w-8 h-8 text-primary-500" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Verify Your Email
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    We've sent a 6-digit verification code to
                  </p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {ownerInfo.email}
                  </p>
                </div>

                <div className="max-w-sm mx-auto">
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

            {/* Step 4: Directors & UBOs */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Directors & Shareholders
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add company directors and Ultimate Beneficial Owners (UBOs) - individuals who own 25% or more
                  </p>
                </div>

                {errors.totalOwnership && (
                  <div className="p-3 bg-error/10 border border-error/20 rounded-xl">
                    <p className="text-sm text-error">{errors.totalOwnership}</p>
                  </div>
                )}

                <div className="space-y-4">
                  {directors.map((director, index) => (
                    <div
                      key={director.id}
                      className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-primary-500" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {director.isUBO ? 'Director & UBO' : 'Director'} {index + 1}
                          </span>
                        </div>
                        {directors.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDirector(director.id)}
                            className="p-1 text-gray-400 hover:text-error transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          label="First Name"
                          placeholder="John"
                          value={director.firstName}
                          onChange={(e) => updateDirector(director.id, 'firstName', e.target.value)}
                          error={errors[`director_${index}_firstName`]}
                          required
                        />

                        <Input
                          label="Last Name"
                          placeholder="Doe"
                          value={director.lastName}
                          onChange={(e) => updateDirector(director.id, 'lastName', e.target.value)}
                          error={errors[`director_${index}_lastName`]}
                          required
                        />

                        <Input
                          label="Email"
                          type="email"
                          placeholder="john@company.com"
                          value={director.email}
                          onChange={(e) => updateDirector(director.id, 'email', e.target.value)}
                          error={errors[`director_${index}_email`]}
                          required
                        />

                        <Input
                          label="Date of Birth"
                          type="date"
                          value={director.dateOfBirth}
                          onChange={(e) => updateDirector(director.id, 'dateOfBirth', e.target.value)}
                          error={errors[`director_${index}_dateOfBirth`]}
                          required
                        />

                        <Select
                          label="Nationality"
                          options={countryOptions}
                          value={director.nationality}
                          onChange={(e) => updateDirector(director.id, 'nationality', e.target.value)}
                          error={errors[`director_${index}_nationality`]}
                          required
                        />

                        <div className="flex items-end gap-3">
                          <div className="flex-1">
                            <Input
                              label="Ownership %"
                              type="number"
                              placeholder="25"
                              value={director.ownershipPercentage}
                              onChange={(e) => updateDirector(director.id, 'ownershipPercentage', e.target.value)}
                              error={errors[`director_${index}_ownershipPercentage`]}
                              disabled={!director.isUBO}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={director.isUBO}
                            onChange={(e) => updateDirector(director.id, 'isUBO', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-500"></div>
                        </label>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Ultimate Beneficial Owner (UBO) - owns 25% or more
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={addDirector}
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  className="w-full"
                >
                  Add Another Director
                </Button>

                <div className="p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-100 dark:border-primary-500/20">
                  <p className="text-sm text-primary-900 dark:text-primary-300">
                    <strong>What is a UBO?</strong> An Ultimate Beneficial Owner is any individual who directly or indirectly owns 25% or more of the company's shares or voting rights, or otherwise exercises control over the company.
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: UBO ID Documents */}
            {currentStep === 5 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    UBO Identity Verification
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload ID documents for all Ultimate Beneficial Owners
                  </p>
                </div>

                {errors.uboDocuments && (
                  <div className="p-3 bg-error/10 border border-error/20 rounded-xl">
                    <p className="text-sm text-error">{errors.uboDocuments}</p>
                  </div>
                )}

                <div className="space-y-4">
                  {directors.filter(d => d.isUBO).length === 0 ? (
                    <div className="p-6 text-center bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border">
                      <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                        No Ultimate Beneficial Owners designated
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        If no individual owns 25% or more of your company, you can proceed to the next step.
                      </p>
                    </div>
                  ) : (
                    directors.filter(d => d.isUBO).map((director) => (
                      <div
                        key={director.id}
                        className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {director.firstName} {director.lastName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {director.ownershipPercentage}% ownership
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Government-Issued ID <span className="text-error">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => handleDirectorFileUpload(director.id, e.target.files?.[0] || null)}
                              className="hidden"
                              id={`ubo-id-${director.id}`}
                              aria-label={`Upload ID document for ${director.firstName || 'UBO'} ${director.lastName || ''}`}
                            />
                            <label
                              htmlFor={`ubo-id-${director.id}`}
                              className={`flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                                director.idDocument
                                  ? 'border-success bg-success/5'
                                  : 'border-gray-300 dark:border-dark-border hover:border-primary-500 bg-white dark:bg-dark-surface'
                              }`}
                            >
                              <Upload className="w-5 h-5 text-gray-400" />
                              <div className="text-center">
                                {director.idDocument ? (
                                  <p className="text-sm font-medium text-success">
                                    {director.idDocument.name}
                                  </p>
                                ) : (
                                  <>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                      Upload ID document
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      Passport, National ID, or Driver's License
                                    </p>
                                  </>
                                )}
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-4 bg-gray-100 dark:bg-dark-border/50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-gray-500 mt-0.5" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      All documents are encrypted and stored securely. They are used solely for identity verification and regulatory compliance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Business Documentation */}
            {currentStep === 6 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    Business Documents
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload required documents to complete KYB verification
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Registration Certificate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Certificate of Incorporation <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('registrationCertificate', e.target.files?.[0] || null)}
                        className="hidden"
                        id="registration-cert"
                        aria-label="Upload Certificate of Incorporation"
                      />
                      <label
                        htmlFor="registration-cert"
                        className={`flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                          errors.registrationCertificate
                            ? 'border-error bg-error/5'
                            : kybDocuments.registrationCertificate
                            ? 'border-success bg-success/5'
                            : 'border-gray-300 dark:border-dark-border hover:border-primary-500 bg-gray-50 dark:bg-dark-bg'
                        }`}
                      >
                        <Upload className="w-5 h-5 text-gray-400" />
                        <div className="text-center">
                          {kybDocuments.registrationCertificate ? (
                            <p className="text-sm font-medium text-success">
                              {kybDocuments.registrationCertificate.name}
                            </p>
                          ) : (
                            <>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Click to upload
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
                        aria-label="Upload Proof of Business Address"
                      />
                      <label
                        htmlFor="proof-address"
                        className={`flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                          errors.proofOfAddress
                            ? 'border-error bg-error/5'
                            : kybDocuments.proofOfAddress
                            ? 'border-success bg-success/5'
                            : 'border-gray-300 dark:border-dark-border hover:border-primary-500 bg-gray-50 dark:bg-dark-bg'
                        }`}
                      >
                        <Upload className="w-5 h-5 text-gray-400" />
                        <div className="text-center">
                          {kybDocuments.proofOfAddress ? (
                            <p className="text-sm font-medium text-success">
                              {kybDocuments.proofOfAddress.name}
                            </p>
                          ) : (
                            <>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Click to upload
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

                  {/* Memorandum of Association (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Memorandum of Association (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('memorandumOfAssociation', e.target.files?.[0] || null)}
                        className="hidden"
                        id="memorandum"
                        aria-label="Upload Memorandum of Association"
                      />
                      <label
                        htmlFor="memorandum"
                        className={`flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                          kybDocuments.memorandumOfAssociation
                            ? 'border-success bg-success/5'
                            : 'border-gray-300 dark:border-dark-border hover:border-primary-500 bg-gray-50 dark:bg-dark-bg'
                        }`}
                      >
                        <Upload className="w-5 h-5 text-gray-400" />
                        <div className="text-center">
                          {kybDocuments.memorandumOfAssociation ? (
                            <p className="text-sm font-medium text-success">
                              {kybDocuments.memorandumOfAssociation.name}
                            </p>
                          ) : (
                            <>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Click to upload
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF, JPG, or PNG (max 10MB)
                              </p>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Shareholder Register (Optional) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Shareholder Register (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('shareholderRegister', e.target.files?.[0] || null)}
                        className="hidden"
                        id="shareholder-register"
                        aria-label="Upload Shareholder Register"
                      />
                      <label
                        htmlFor="shareholder-register"
                        className={`flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                          kybDocuments.shareholderRegister
                            ? 'border-success bg-success/5'
                            : 'border-gray-300 dark:border-dark-border hover:border-primary-500 bg-gray-50 dark:bg-dark-bg'
                        }`}
                      >
                        <Upload className="w-5 h-5 text-gray-400" />
                        <div className="text-center">
                          {kybDocuments.shareholderRegister ? (
                            <p className="text-sm font-medium text-success">
                              {kybDocuments.shareholderRegister.name}
                            </p>
                          ) : (
                            <>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Click to upload
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF, JPG, or PNG (max 10MB)
                              </p>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-100 dark:border-primary-500/20">
                  <p className="text-sm text-primary-900 dark:text-primary-300">
                    <strong>Note:</strong> All documents are securely stored and encrypted. They are used only to verify your business identity and comply with regulatory requirements.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
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
                icon={currentStep === 6 ? <CheckCircle2 className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                {currentStep === 6 ? 'Complete Registration' : 'Continue'}
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/signin" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign In
              </Link>
            </p>
          </div>

          {/* Bottom Branding */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Powered by</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300">WIREMI</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>PCI DSS Compliant</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  <span>GDPR Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
