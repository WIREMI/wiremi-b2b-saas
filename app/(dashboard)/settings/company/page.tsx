'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Building2,
  Upload,
  Save,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Hash,
  Calendar,
  Users,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'

export default function CompanySettingsPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Company Information
  const [companyName, setCompanyName] = useState('Wiremi Inc.')
  const [legalName, setLegalName] = useState('Wiremi Incorporated')
  const [industry, setIndustry] = useState('financial-services')
  const [companySize, setCompanySize] = useState('51-200')
  const [foundedYear, setFoundedYear] = useState('2020')
  const [website, setWebsite] = useState('https://wiremi.com')
  const [email, setEmail] = useState('contact@wiremi.com')
  const [phone, setPhone] = useState('+1 (555) 123-4567')

  // Business Registration
  const [registrationNumber, setRegistrationNumber] = useState('REG-123456789')
  const [taxId, setTaxId] = useState('TAX-987654321')
  const [vatNumber, setVatNumber] = useState('VAT-456789123')

  // Address
  const [addressLine1, setAddressLine1] = useState('123 Business Street')
  const [addressLine2, setAddressLine2] = useState('Suite 400')
  const [city, setCity] = useState('San Francisco')
  const [state, setState] = useState('CA')
  const [zipCode, setZipCode] = useState('94105')
  const [country, setCountry] = useState('United States')

  const industries = [
    { value: '', label: 'Select industry' },
    { value: 'financial-services', label: 'Financial Services' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'other', label: 'Other' },
  ]

  const companySizes = [
    { value: '', label: 'Select company size' },
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: '1000+ employees' },
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!companyName.trim()) newErrors.companyName = 'Company name is required'
    if (!legalName.trim()) newErrors.legalName = 'Legal name is required'
    if (!industry) newErrors.industry = 'Industry is required'
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format'
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
        message: 'Please check the form and try again',
      })
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      showToast({
        type: 'success',
        title: 'Settings Saved',
        message: 'Company settings have been updated successfully',
      })
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Save',
        message: 'Please try again',
      })
    } finally {
      setIsLoading(false)
    }
  }

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
          Back to Settings
        </Button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl flex items-center justify-center">
            <Building2 className="w-8 h-8 text-primary-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Company Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your company profile and business information
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Logo */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Company Logo
          </h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-primary-100 dark:bg-primary-500/20 rounded-2xl flex items-center justify-center">
              <Building2 className="w-12 h-12 text-primary-500" />
            </div>
            <div>
              <Button
                type="button"
                variant="outline"
                size="md"
                icon={<Upload className="w-4 h-4" />}
                iconPosition="left"
              >
                Upload Logo
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-2">
                Recommended: Square image, at least 200x200px
              </p>
            </div>
          </div>
        </Card>

        {/* Basic Information */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                placeholder="Your company name"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value)
                  setErrors((prev) => ({ ...prev, companyName: '' }))
                }}
                error={errors.companyName}
                icon={<Building2 className="w-5 h-5" />}
                iconPosition="left"
                required
              />
              <Input
                label="Legal Name"
                placeholder="Official legal name"
                value={legalName}
                onChange={(e) => {
                  setLegalName(e.target.value)
                  setErrors((prev) => ({ ...prev, legalName: '' }))
                }}
                error={errors.legalName}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Industry"
                options={industries}
                value={industry}
                onChange={(e) => {
                  setIndustry(e.target.value)
                  setErrors((prev) => ({ ...prev, industry: '' }))
                }}
                error={errors.industry}
                required
              />
              <Select
                label="Company Size"
                options={companySizes}
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Founded Year"
                type="number"
                placeholder="2020"
                value={foundedYear}
                onChange={(e) => setFoundedYear(e.target.value)}
                icon={<Calendar className="w-5 h-5" />}
                iconPosition="left"
              />
              <Input
                label="Website"
                type="url"
                placeholder="https://example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                icon={<Globe className="w-5 h-5" />}
                iconPosition="left"
              />
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="contact@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrors((prev) => ({ ...prev, email: '' }))
                }}
                error={errors.email}
                icon={<Mail className="w-5 h-5" />}
                iconPosition="left"
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={<Phone className="w-5 h-5" />}
                iconPosition="left"
              />
            </div>
          </div>
        </Card>

        {/* Business Registration */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Business Registration
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Registration Number"
                placeholder="Company registration number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                icon={<Hash className="w-5 h-5" />}
                iconPosition="left"
                helperText="Business registration or incorporation number"
              />
              <Input
                label="Tax ID / EIN"
                placeholder="Tax identification number"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                icon={<Hash className="w-5 h-5" />}
                iconPosition="left"
              />
            </div>

            <Input
              label="VAT Number"
              placeholder="VAT registration number"
              value={vatNumber}
              onChange={(e) => setVatNumber(e.target.value)}
              icon={<Hash className="w-5 h-5" />}
              iconPosition="left"
              helperText="If applicable to your region"
            />
          </div>
        </Card>

        {/* Business Address */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Business Address
          </h2>
          <div className="space-y-4">
            <Input
              label="Address Line 1"
              placeholder="Street address"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              icon={<MapPin className="w-5 h-5" />}
              iconPosition="left"
            />

            <Input
              label="Address Line 2"
              placeholder="Suite, building, floor (optional)"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                label="State / Province"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <Input
                label="ZIP / Postal Code"
                placeholder="12345"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <Input
              label="Country"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              icon={<Globe className="w-5 h-5" />}
              iconPosition="left"
            />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
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
