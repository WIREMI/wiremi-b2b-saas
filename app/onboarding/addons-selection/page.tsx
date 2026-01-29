'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  Hotel,
  Calendar,
  Dumbbell,
  GraduationCap,
  Brain,
  ArrowRight,
  ArrowLeft,
  Check,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'

interface Addon {
  id: string
  name: string
  icon: typeof Users
  description: string
  price: number
  billingPeriod: 'month'
  features: string[]
  category: 'business' | 'industry' | 'ai'
  popular?: boolean
}

export default function AddonsSelectionPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addons: Addon[] = [
    {
      id: 'hr-payroll',
      name: 'HR & Payroll',
      icon: Users,
      description: 'Complete employee management, payroll processing, and benefits administration',
      price: 49,
      billingPeriod: 'month',
      category: 'business',
      popular: true,
      features: [
        'Employee database management',
        'Automated payroll processing',
        'Tax calculations & compliance',
        'Benefits administration',
        'Time & attendance tracking',
        'Leave management',
      ],
    },
    {
      id: 'hospitality',
      name: 'Hospitality Suite',
      icon: Hotel,
      description: 'Specialized tools for hotels, restaurants, and hospitality businesses',
      price: 39,
      billingPeriod: 'month',
      category: 'industry',
      features: [
        'Booking & reservation management',
        'Table management',
        'Room inventory control',
        'Guest billing integration',
        'POS integration',
        'Revenue management',
      ],
    },
    {
      id: 'events',
      name: 'Events Management',
      icon: Calendar,
      description: 'Plan, manage, and monetize events with integrated ticketing and payments',
      price: 29,
      billingPeriod: 'month',
      category: 'industry',
      features: [
        'Event creation & scheduling',
        'Ticketing & registration',
        'Attendee management',
        'Payment collection',
        'Check-in & badge printing',
        'Post-event analytics',
      ],
    },
    {
      id: 'fitness',
      name: 'Fitness & Wellness',
      icon: Dumbbell,
      description: 'Membership management and billing for gyms, studios, and wellness centers',
      price: 35,
      billingPeriod: 'month',
      category: 'industry',
      features: [
        'Membership management',
        'Class scheduling',
        'Recurring billing',
        'Trainer management',
        'Equipment tracking',
        'Member engagement tools',
      ],
    },
    {
      id: 'education',
      name: 'Education Platform',
      icon: GraduationCap,
      description: 'Student management, course billing, and educational institution tools',
      price: 45,
      billingPeriod: 'month',
      category: 'industry',
      features: [
        'Student enrollment',
        'Course management',
        'Tuition & fee collection',
        'Grade tracking',
        'Parent portal access',
        'Scholarship management',
      ],
    },
    {
      id: 'ai-insights',
      name: 'AI Insights',
      icon: Brain,
      description: 'Advanced AI-powered analytics, forecasting, and business intelligence',
      price: 79,
      billingPeriod: 'month',
      category: 'ai',
      popular: true,
      features: [
        'Predictive cash flow forecasting',
        'Anomaly detection',
        'Smart spending recommendations',
        'Revenue optimization',
        'Risk assessment',
        'Custom AI reports',
      ],
    },
  ]

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    )
  }

  const calculateTotal = () => {
    return selectedAddons.reduce((total, addonId) => {
      const addon = addons.find((a) => a.id === addonId)
      return total + (addon?.price || 0)
    }, 0)
  }

  const handleContinue = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (selectedAddons.length > 0) {
      showToast({
        type: 'success',
        title: 'Add-ons Selected',
        message: `${selectedAddons.length} add-on${selectedAddons.length > 1 ? 's' : ''} added to your plan`,
      })
    }

    router.push('/onboarding/bank-connection')
  }

  const categories = [
    { id: 'business', name: 'Business Tools', description: 'Essential business operations' },
    { id: 'industry', name: 'Industry-Specific', description: 'Specialized for your sector' },
    { id: 'ai', name: 'AI-Powered', description: 'Advanced intelligence & automation' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
      {/* Header */}
      <div className="bg-gray-100 dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">W</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Wiremi
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Step 3 of 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Supercharge Your Business
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from our powerful add-ons to extend Wiremi's capabilities. You can add or remove these at any time.
          </p>
        </div>

        {/* Info Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-primary-900 dark:text-primary-300">
                <strong>Optional:</strong> You can skip this step and add modules later from your dashboard settings. Each add-on can be tried free for 14 days.
              </p>
            </div>
          </div>
        </div>

        {/* Addons by Category */}
        <div className="space-y-12 mb-12">
          {categories.map((category) => {
            const categoryAddons = addons.filter((a) => a.category === category.id)

            return (
              <div key={category.id}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryAddons.map((addon) => {
                    const Icon = addon.icon
                    const isSelected = selectedAddons.includes(addon.id)

                    return (
                      <Card
                        key={addon.id}
                        variant="interactive"
                        className={`relative cursor-pointer transition-all ${
                          isSelected
                            ? 'ring-2 ring-primary-500 shadow-xl'
                            : 'hover:shadow-lg'
                        }`}
                        onClick={() => toggleAddon(addon.id)}
                      >
                        {addon.popular && (
                          <div className="absolute -top-3 -right-3">
                            <Badge variant="success" size="sm">
                              Popular
                            </Badge>
                          </div>
                        )}

                        <div className="p-6">
                          {/* Checkbox */}
                          <div className="absolute top-6 right-6">
                            <div
                              className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                                isSelected
                                  ? 'bg-primary-500 border-primary-500'
                                  : 'border-gray-300 dark:border-dark-border'
                              }`}
                            >
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </div>
                          </div>

                          {/* Icon & Title */}
                          <div className="flex items-center gap-3 mb-4 pr-8">
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-primary-500" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {addon.name}
                              </h3>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {addon.description}
                          </p>

                          {/* Pricing */}
                          <div className="mb-4 pb-4 border-b border-gray-200 dark:border-dark-border">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${addon.price}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">
                                /month
                              </span>
                            </div>
                            <p className="text-xs text-success mt-1">
                              14-day free trial included
                            </p>
                          </div>

                          {/* Features */}
                          <div className="space-y-2">
                            {addon.features.slice(0, 4).map((feature, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-gray-700 dark:text-gray-300">
                                  {feature}
                                </span>
                              </div>
                            ))}
                            {addon.features.length > 4 && (
                              <p className="text-xs text-primary-500 font-medium">
                                +{addon.features.length - 4} more features
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary Card */}
        {selectedAddons.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    Selected Add-ons ({selectedAddons.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAddons.map((addonId) => {
                      const addon = addons.find((a) => a.id === addonId)
                      return (
                        <Badge key={addonId} variant="info" size="sm">
                          {addon?.name}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Monthly total
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${calculateTotal()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    + your base plan
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 max-w-2xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push('/onboarding/plan-selection')}
            icon={<ArrowLeft className="w-5 h-5" />}
            iconPosition="left"
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={handleContinue}
            loading={isLoading}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            {selectedAddons.length > 0 ? 'Continue' : 'Skip for Now'}
          </Button>
        </div>
      </div>
    </div>
  )
}
