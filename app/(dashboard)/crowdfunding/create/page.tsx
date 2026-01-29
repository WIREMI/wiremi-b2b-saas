'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  TrendingUp,
  Heart,
  FileText,
  Users,
  CreditCard,
  Target,
  Calendar,
  DollarSign,
  Percent,
  Building2,
  AlertCircle,
  Upload,
  X
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/useToast'

type CampaignType = 'capital' | 'donation'
type CapitalType = 'equity' | 'debt' | 'hybrid'

interface CampaignFormData {
  // Step 1: Campaign Type
  type: CampaignType
  capitalType?: CapitalType

  // Step 2: Basic Details
  title: string
  description: string
  longDescription: string
  category: string
  targetAmount: string
  duration: string
  companyName?: string
  organizationName?: string
  location: string

  // Step 3: Campaign Specifics
  // For Capital
  equityOffered?: string
  valuation?: string
  interestRate?: string
  term?: string
  repaymentSchedule?: string
  minInvestment?: string
  milestones?: string[]
  useOfFunds?: { category: string; percentage: string }[]

  // For Donation
  beneficiaries?: string
  reach?: string
  impactDescription?: string

  // Step 4: Team Information
  teamMembers: { name: string; role: string; bio: string; linkedin?: string }[]

  // Step 5: Media & Documents
  bannerImage?: File
  gallery?: File[]
  documents?: File[]
}

export default function CreateCampaignPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<CampaignFormData>({
    type: 'capital',
    title: '',
    description: '',
    longDescription: '',
    category: '',
    targetAmount: '',
    duration: '30',
    location: '',
    teamMembers: [],
    milestones: ['', '', ''],
    useOfFunds: [
      { category: '', percentage: '' },
      { category: '', percentage: '' },
      { category: '', percentage: '' }
    ]
  })

  const totalSteps = 6

  const categories = [
    'Clean Energy',
    'Healthcare',
    'FinTech',
    'Agriculture',
    'Education',
    'Technology',
    'Real Estate',
    'Consumer Goods',
    'Manufacturing',
    'Environment',
    'Community',
    'Arts & Culture'
  ]

  const durationOptions = [
    { value: '30', label: '30 days' },
    { value: '60', label: '60 days' },
    { value: '90', label: '90 days' },
    { value: '120', label: '120 days' }
  ]

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.type) {
        showToast({ type: 'error', title: 'Error', message: 'Please select a campaign type' })
        return
      }
      if (formData.type === 'capital' && !formData.capitalType) {
        showToast({ type: 'error', title: 'Error', message: 'Please select a capital structure' })
        return
      }
    }

    if (currentStep === 2) {
      if (!formData.title || !formData.description || !formData.targetAmount || !formData.category) {
        showToast({ type: 'error', title: 'Error', message: 'Please fill in all required fields' })
        return
      }
    }

    if (currentStep === 3) {
      if (formData.type === 'capital') {
        if (formData.capitalType === 'equity' && (!formData.equityOffered || !formData.valuation)) {
          showToast({ type: 'error', title: 'Error', message: 'Please fill in equity details' })
          return
        }
        if (formData.capitalType === 'debt' && (!formData.interestRate || !formData.term)) {
          showToast({ type: 'error', title: 'Error', message: 'Please fill in debt details' })
          return
        }
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Show payment step
    if (currentStep === totalSteps) {
      showToast({
        type: 'success',
        title: 'Campaign Submitted!',
        message: 'Your campaign has been submitted for review. Redirecting to payment...'
      })
      setTimeout(() => {
        router.push('/crowdfunding/campaigns/new-campaign-id')
      }, 2000)
    }
  }

  const addTeamMember = () => {
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, { name: '', role: '', bio: '' }]
    })
  }

  const removeTeamMember = (index: number) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((_, i) => i !== index)
    })
  }

  const updateTeamMember = (index: number, field: string, value: string) => {
    const updated = [...formData.teamMembers]
    updated[index] = { ...updated[index], [field]: value }
    setFormData({ ...formData, teamMembers: updated })
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
          onClick={() => router.push('/crowdfunding')}
          className="mb-4"
        >
          Back to Crowdfunding
        </Button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/10 dark:to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Your Campaign
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Raise capital or donations for your project
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-3xl mx-auto mb-8">
          {[
            { num: 1, label: 'Type', icon: <Target className="w-4 h-4" /> },
            { num: 2, label: 'Details', icon: <FileText className="w-4 h-4" /> },
            { num: 3, label: 'Specifics', icon: <DollarSign className="w-4 h-4" /> },
            { num: 4, label: 'Team', icon: <Users className="w-4 h-4" /> },
            { num: 5, label: 'Media', icon: <Upload className="w-4 h-4" /> },
            { num: 6, label: 'Payment', icon: <CreditCard className="w-4 h-4" /> }
          ].map((step, index) => (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep > step.num
                      ? 'bg-primary border-primary text-white'
                      : currentStep === step.num
                      ? 'bg-primary border-primary text-white'
                      : 'bg-gray-50 dark:bg-dark-surface border-gray-300 dark:border-dark-border text-gray-400'
                  }`}
                >
                  {currentStep > step.num ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    currentStep >= step.num
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < 5 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    currentStep > step.num
                      ? 'bg-primary'
                      : 'bg-gray-200 dark:bg-dark-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="max-w-3xl mx-auto p-8">
        {/* Step 1: Campaign Type */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                What type of campaign do you want to create?
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Choose between raising capital for your business or collecting donations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Capital Raise */}
              <button
                onClick={() => setFormData({ ...formData, type: 'capital' })}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  formData.type === 'capital'
                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-gray-200 dark:border-dark-border hover:border-primary/50'
                }`}
              >
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Capital Raise
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Raise capital through equity, debt, or hybrid funding for your business
                </p>
                {formData.type === 'capital' && (
                  <Badge variant="primary" size="sm" className="mt-4">
                    Selected
                  </Badge>
                )}
              </button>

              {/* Donation */}
              <button
                onClick={() => setFormData({ ...formData, type: 'donation', capitalType: undefined })}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  formData.type === 'donation'
                    ? 'border-success bg-success/5 dark:bg-success/10'
                    : 'border-gray-200 dark:border-dark-border hover:border-success/50'
                }`}
              >
                <div className="w-12 h-12 bg-success/10 dark:bg-success/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Donation Campaign
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Collect charitable donations for a cause or community project
                </p>
                {formData.type === 'donation' && (
                  <Badge variant="success" size="sm" className="mt-4">
                    Selected
                  </Badge>
                )}
              </button>
            </div>

            {/* Capital Structure Selection */}
            {formData.type === 'capital' && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Choose Your Capital Structure
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* Equity */}
                  <button
                    onClick={() => setFormData({ ...formData, capitalType: 'equity' })}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.capitalType === 'equity'
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : 'border-gray-200 dark:border-dark-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          Equity Crowdfunding
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Investors receive ownership shares in your company
                        </p>
                      </div>
                      {formData.capitalType === 'equity' && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </button>

                  {/* Debt */}
                  <button
                    onClick={() => setFormData({ ...formData, capitalType: 'debt' })}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.capitalType === 'debt'
                        ? 'border-success bg-success/5 dark:bg-success/10'
                        : 'border-gray-200 dark:border-dark-border hover:border-success/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          Debt Financing
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Investors lend money and receive interest payments
                        </p>
                      </div>
                      {formData.capitalType === 'debt' && (
                        <Check className="w-5 h-5 text-success" />
                      )}
                    </div>
                  </button>

                  {/* Hybrid */}
                  <button
                    onClick={() => setFormData({ ...formData, capitalType: 'hybrid' })}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.capitalType === 'hybrid'
                        ? 'border-info bg-info/5 dark:bg-info/10'
                        : 'border-gray-200 dark:border-dark-border hover:border-info/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          Hybrid (Equity + Debt)
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Investors can choose equity, debt, or a combination of both
                        </p>
                      </div>
                      {formData.capitalType === 'hybrid' && (
                        <Check className="w-5 h-5 text-info" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Basic Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Campaign Details
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Provide the basic information about your campaign
              </p>
            </div>

            <Input
              label="Campaign Title"
              placeholder="e.g., EcoTech Solar Solutions - Series A"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Description <span className="text-error">*</span>
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-gray-100 dark:bg-dark-surface text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                rows={3}
                placeholder="Brief one-sentence description (max 150 characters)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                maxLength={150}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                {formData.description.length}/150 characters
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Description <span className="text-error">*</span>
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-gray-100 dark:bg-dark-surface text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                rows={6}
                placeholder="Detailed description of your campaign, vision, and goals"
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Category"
                options={categories.map(cat => ({ value: cat, label: cat }))}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />

              <Input
                label="Target Amount ($)"
                type="number"
                placeholder="500000"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                icon={<DollarSign className="w-4 h-4" />}
                iconPosition="left"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Campaign Duration"
                options={durationOptions}
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />

              <Input
                label="Location"
                placeholder="e.g., San Francisco, CA"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                icon={<Target className="w-4 h-4" />}
                iconPosition="left"
                required
              />
            </div>

            {formData.type === 'capital' ? (
              <Input
                label="Company Name"
                placeholder="e.g., EcoTech Solar Solutions Inc."
                value={formData.companyName || ''}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                icon={<Building2 className="w-4 h-4" />}
                iconPosition="left"
                required
              />
            ) : (
              <Input
                label="Organization Name"
                placeholder="e.g., Ocean Conservation Alliance"
                value={formData.organizationName || ''}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                icon={<Heart className="w-4 h-4" />}
                iconPosition="left"
                required
              />
            )}
          </div>
        )}

        {/* Step 3: Campaign Specifics */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Campaign Specifics
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {formData.type === 'capital'
                  ? 'Provide investment terms and use of funds'
                  : 'Describe the impact and how donations will be used'}
              </p>
            </div>

            {formData.type === 'capital' && (
              <>
                {/* Equity Fields */}
                {(formData.capitalType === 'equity' || formData.capitalType === 'hybrid') && (
                  <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-lg space-y-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Equity Terms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Equity Offered (%)"
                        type="number"
                        placeholder="15"
                        value={formData.equityOffered || ''}
                        onChange={(e) => setFormData({ ...formData, equityOffered: e.target.value })}
                        icon={<Percent className="w-4 h-4" />}
                        iconPosition="left"
                        required
                      />
                      <Input
                        label="Company Valuation ($)"
                        type="number"
                        placeholder="3000000"
                        value={formData.valuation || ''}
                        onChange={(e) => setFormData({ ...formData, valuation: e.target.value })}
                        icon={<DollarSign className="w-4 h-4" />}
                        iconPosition="left"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Debt Fields */}
                {(formData.capitalType === 'debt' || formData.capitalType === 'hybrid') && (
                  <div className="p-4 bg-success/5 dark:bg-success/10 rounded-lg space-y-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Debt Terms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Interest Rate (% APR)"
                        type="number"
                        placeholder="12"
                        value={formData.interestRate || ''}
                        onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                        icon={<Percent className="w-4 h-4" />}
                        iconPosition="left"
                        required
                      />
                      <Input
                        label="Term (months)"
                        type="number"
                        placeholder="36"
                        value={formData.term || ''}
                        onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                        icon={<Calendar className="w-4 h-4" />}
                        iconPosition="left"
                        required
                      />
                    </div>
                    <Input
                      label="Repayment Schedule"
                      placeholder="e.g., Monthly interest payments, principal at maturity"
                      value={formData.repaymentSchedule || ''}
                      onChange={(e) => setFormData({ ...formData, repaymentSchedule: e.target.value })}
                    />
                  </div>
                )}

                <Input
                  label="Minimum Investment ($)"
                  type="number"
                  placeholder="1000"
                  value={formData.minInvestment || ''}
                  onChange={(e) => setFormData({ ...formData, minInvestment: e.target.value })}
                  icon={<DollarSign className="w-4 h-4" />}
                  iconPosition="left"
                  required
                />

                {/* Use of Funds */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Use of Funds Breakdown
                  </label>
                  <div className="space-y-3">
                    {formData.useOfFunds?.map((item, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="e.g., Manufacturing Equipment"
                          value={item.category}
                          onChange={(e) => {
                            const updated = [...(formData.useOfFunds || [])]
                            updated[index].category = e.target.value
                            setFormData({ ...formData, useOfFunds: updated })
                          }}
                        />
                        <Input
                          type="number"
                          placeholder="Percentage (e.g., 50)"
                          value={item.percentage}
                          onChange={(e) => {
                            const updated = [...(formData.useOfFunds || [])]
                            updated[index].percentage = e.target.value
                            setFormData({ ...formData, useOfFunds: updated })
                          }}
                          icon={<Percent className="w-4 h-4" />}
                          iconPosition="right"
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        useOfFunds: [...(formData.useOfFunds || []), { category: '', percentage: '' }]
                      })
                    }}
                    className="mt-3"
                  >
                    Add More
                  </Button>
                </div>

                {/* Milestones */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Key Milestones (Optional)
                  </label>
                  <div className="space-y-3">
                    {formData.milestones?.map((milestone, index) => (
                      <Input
                        key={index}
                        placeholder={`Milestone ${index + 1}`}
                        value={milestone}
                        onChange={(e) => {
                          const updated = [...(formData.milestones || [])]
                          updated[index] = e.target.value
                          setFormData({ ...formData, milestones: updated })
                        }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {formData.type === 'donation' && (
              <>
                <Input
                  label="Beneficiaries"
                  placeholder="e.g., 50,000+ marine species"
                  value={formData.beneficiaries || ''}
                  onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })}
                  required
                />

                <Input
                  label="Reach/Coverage"
                  placeholder="e.g., 3 coastal communities protected"
                  value={formData.reach || ''}
                  onChange={(e) => setFormData({ ...formData, reach: e.target.value })}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Impact Description
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-gray-100 dark:bg-dark-surface text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                    rows={4}
                    placeholder="Describe the impact your campaign will have"
                    value={formData.impactDescription || ''}
                    onChange={(e) => setFormData({ ...formData, impactDescription: e.target.value })}
                  />
                </div>

                {/* How Donations Used */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    How Donations Will Be Used
                  </label>
                  <div className="space-y-3">
                    {formData.useOfFunds?.map((item, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="e.g., Coral Nursery Setup"
                          value={item.category}
                          onChange={(e) => {
                            const updated = [...(formData.useOfFunds || [])]
                            updated[index].category = e.target.value
                            setFormData({ ...formData, useOfFunds: updated })
                          }}
                        />
                        <Input
                          type="number"
                          placeholder="Percentage (e.g., 30)"
                          value={item.percentage}
                          onChange={(e) => {
                            const updated = [...(formData.useOfFunds || [])]
                            updated[index].percentage = e.target.value
                            setFormData({ ...formData, useOfFunds: updated })
                          }}
                          icon={<Percent className="w-4 h-4" />}
                          iconPosition="right"
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        useOfFunds: [...(formData.useOfFunds || []), { category: '', percentage: '' }]
                      })
                    }}
                    className="mt-3"
                  >
                    Add More
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 4: Team */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Team Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Introduce your team members to build trust with {formData.type === 'capital' ? 'investors' : 'donors'}
              </p>
            </div>

            {formData.teamMembers.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No team members added yet
                </p>
                <Button variant="primary" size="md" onClick={addTeamMember}>
                  Add Team Member
                </Button>
              </div>
            )}

            {formData.teamMembers.map((member, index) => (
              <Card key={index} className="p-6 relative">
                <button
                  onClick={() => removeTeamMember(index)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-error transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Team Member {index + 1}
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="e.g., Dr. Sarah Chen"
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                      required
                    />
                    <Input
                      label="Role/Title"
                      placeholder="e.g., CEO & Co-founder"
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg bg-gray-100 dark:bg-dark-surface text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                      rows={3}
                      placeholder="Brief professional background"
                      value={member.bio}
                      onChange={(e) => updateTeamMember(index, 'bio', e.target.value)}
                    />
                  </div>
                  <Input
                    label="LinkedIn URL (Optional)"
                    placeholder="https://linkedin.com/in/username"
                    value={member.linkedin || ''}
                    onChange={(e) => updateTeamMember(index, 'linkedin', e.target.value)}
                  />
                </div>
              </Card>
            ))}

            {formData.teamMembers.length > 0 && (
              <Button variant="outline" size="md" onClick={addTeamMember} className="w-full">
                Add Another Team Member
              </Button>
            )}
          </div>
        )}

        {/* Step 5: Media & Documents */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Media & Documents
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Upload images and documents to make your campaign more appealing
              </p>
            </div>

            {/* Banner Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Campaign Banner Image
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  PNG, JPG or WEBP (max. 5MB, recommended: 1200x600px)
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Choose File
                </Button>
              </div>
            </div>

            {/* Photo Gallery */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Photo Gallery (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Upload multiple images
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  PNG or JPG (max. 3MB each, up to 10 images)
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Documents */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Supporting Documents (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-8 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Upload business plans, pitch decks, financial projections
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  PDF, DOCX, XLSX (max. 10MB each)
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Choose Files
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Payment */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="mb-6 text-center">
              <div className="w-16 h-16 bg-warning/10 dark:bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-warning" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Campaign Submission Fee
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                A non-refundable fee of $50 is required to publish your campaign
              </p>
            </div>

            {/* Fee Breakdown */}
            <Card className="p-6 bg-warning/5 dark:bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-warning" />
                <h3 className="font-bold text-gray-900 dark:text-white">
                  What This Fee Covers
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Campaign review and verification by our team</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Featured placement in marketplace for 7 days</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Access to analytics and campaign management tools</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Email notifications for new {formData.type === 'capital' ? 'investments' : 'donations'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>Priority customer support</span>
                </li>
              </ul>
            </Card>

            {/* Payment Amount */}
            <div className="p-6 bg-gray-50 dark:bg-dark-card rounded-lg">
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Submission Fee
                </span>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  $50.00
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Payment Method
              </label>
              <div className="space-y-3">
                <button className="w-full p-4 border-2 border-primary bg-primary/5 dark:bg-primary/10 rounded-lg text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          Credit/Debit Card
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Visa, Mastercard, Amex
                        </div>
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                </button>
              </div>
            </div>

            {/* Card Details (Placeholder) */}
            <div className="space-y-4">
              <Input
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                icon={<CreditCard className="w-4 h-4" />}
                iconPosition="left"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry Date" placeholder="MM/YY" />
                <Input label="CVV" placeholder="123" type="password" />
              </div>
              <Input label="Cardholder Name" placeholder="John Doe" />
            </div>

            {/* Terms */}
            <div className="p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the Terms of Service and understand that the $50 submission fee is non-refundable. My campaign will be reviewed within 48 hours.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200 dark:border-dark-border">
          <Button
            variant="outline"
            size="md"
            onClick={handleBack}
            disabled={currentStep === 1}
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
          >
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleSubmit}
              icon={<Check className="w-4 h-4" />}
              iconPosition="right"
            >
              Submit & Pay $50
            </Button>
          )}
        </div>
      </Card>
    </PageLayout>
  )
}
