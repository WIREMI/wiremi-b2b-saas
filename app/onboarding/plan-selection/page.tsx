'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  Crown,
  Rocket,
  Building,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'

type PlanType = 'starter' | 'growth' | 'enterprise' | null

interface Plan {
  id: PlanType
  name: string
  icon: typeof Rocket
  price: number
  billingPeriod: 'month'
  description: string
  popular?: boolean
  features: string[]
  limitations: string[]
  color: 'primary' | 'success' | 'warning' | 'premium'
}

export default function PlanSelectionPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [selectedPlan, setSelectedPlan] = useState<PlanType>('growth')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [isLoading, setIsLoading] = useState(false)

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      icon: Zap,
      price: 29,
      billingPeriod: 'month',
      description: 'Perfect for small businesses and startups',
      color: 'primary',
      features: [
        'Up to 3 multi-currency wallets',
        '100 transactions per month',
        'Basic payment processing',
        'Email support (24-48 hours)',
        'Standard FX rates',
        'Basic financial reports',
      ],
      limitations: [
        'No bulk payouts',
        'No advanced analytics',
        'No API access',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      icon: Rocket,
      price: 99,
      billingPeriod: 'month',
      description: 'Ideal for growing businesses',
      popular: true,
      color: 'success',
      features: [
        'Up to 10 multi-currency wallets',
        '1,000 transactions per month',
        'Advanced payment processing',
        'Priority support (4-12 hours)',
        'Preferential FX rates',
        'Advanced financial reports & analytics',
        'Bulk payout management',
        'API access (10,000 calls/month)',
        'Team collaboration (up to 5 users)',
      ],
      limitations: [
        'Limited white-label options',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Building,
      price: 299,
      billingPeriod: 'month',
      description: 'For large organizations with complex needs',
      color: 'premium',
      features: [
        'Unlimited multi-currency wallets',
        'Unlimited transactions',
        'Enterprise payment processing',
        'Dedicated account manager',
        'Best-in-class FX rates',
        'Custom financial reports & analytics',
        'Advanced bulk payout management',
        'Unlimited API access',
        'Unlimited team members',
        'White-label options',
        'SLA guarantees (99.9% uptime)',
        'Custom integrations',
        'Priority feature requests',
      ],
      limitations: [],
    },
  ]

  const handleContinue = async () => {
    if (!selectedPlan) {
      showToast({
        type: 'error',
        title: 'No Plan Selected',
        message: 'Please select a plan to continue',
      })
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/onboarding/addons-selection')
  }

  const getAnnualPrice = (monthlyPrice: number) => {
    return Math.floor(monthlyPrice * 12 * 0.8) // 20% discount for annual
  }

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
              <span>Step 2 of 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select the plan that best fits your business needs. You can upgrade or downgrade at any time.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-sm font-medium ${
              billingCycle === 'monthly'
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')
            }
            className={`relative w-14 h-7 rounded-full transition-colors ${
              billingCycle === 'annual'
                ? 'bg-primary-500'
                : 'bg-gray-300 dark:bg-dark-border'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-gray-100 rounded-full transition-transform ${
                billingCycle === 'annual' ? 'translate-x-7' : ''
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              billingCycle === 'annual'
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Annual
          </span>
          {billingCycle === 'annual' && (
            <Badge variant="success" size="sm">
              Save 20%
            </Badge>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const Icon = plan.icon
            const isSelected = selectedPlan === plan.id
            const displayPrice =
              billingCycle === 'annual'
                ? getAnnualPrice(plan.price)
                : plan.price

            return (
              <Card
                key={plan.id}
                variant="interactive"
                className={`relative cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-2 ring-primary-500 shadow-xl'
                    : 'hover:shadow-lg'
                } ${plan.popular ? 'lg:scale-105' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="success" size="sm" className="flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-${plan.color}/10 rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${plan.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${displayPrice}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /{billingCycle === 'annual' ? 'year' : 'month'}
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-sm text-success mt-1">
                        ${plan.price * 12 - displayPrice} saved annually
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Select Button */}
                  <Button
                    variant={isSelected ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Selected
                      </>
                    ) : (
                      'Select Plan'
                    )}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Need Help Section */}
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Not sure which plan is right for you?
          </p>
          <button className="text-primary-500 hover:text-primary-600 font-medium text-sm">
            Compare plans in detail →
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 max-w-2xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push('/onboarding')}
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
            disabled={!selectedPlan}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Continue to Add-ons
          </Button>
        </div>
      </div>
    </div>
  )
}
