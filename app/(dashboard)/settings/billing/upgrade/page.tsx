'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Check,
  CreditCard,
  Shield,
  Zap,
  Users,
  Database,
  Headphones,
  Sparkles,
  ArrowRight,
  Info,
  Lock,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type BillingCycle = 'monthly' | 'annual'
type PlanType = 'starter' | 'professional' | 'enterprise'

export default function UpgradePlanPage() {
  const router = useRouter()
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('annual')
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)

  const plans = [
    {
      id: 'starter' as PlanType,
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      monthlyPrice: 29,
      annualPrice: 24, // $24/month billed annually
      recommended: false,
      features: [
        'Up to 10 team members',
        'Basic payment processing',
        '1,000 transactions/month',
        '5 virtual cards',
        'Email support',
        'Basic reporting',
        'Mobile app access',
        '2FA security',
      ],
      limitations: [
        'No API access',
        'No custom branding',
        'No dedicated support',
      ],
    },
    {
      id: 'professional' as PlanType,
      name: 'Professional',
      description: 'For growing businesses that need more',
      monthlyPrice: 99,
      annualPrice: 82, // $82/month billed annually (~17% discount)
      recommended: true,
      current: true,
      features: [
        'Up to 50 team members',
        'Advanced payment processing',
        'Unlimited transactions',
        '50 virtual cards',
        'Priority support (24/7)',
        'Advanced analytics',
        'API access',
        'Webhook integration',
        'Custom workflows',
        'Multi-currency accounts',
        'Expense management',
        'Invoice automation',
      ],
      limitations: [
        'Limited white-label options',
        'Standard SLA',
      ],
    },
    {
      id: 'enterprise' as PlanType,
      name: 'Enterprise',
      description: 'Complete solution for large organizations',
      monthlyPrice: 399,
      annualPrice: 332, // $332/month billed annually (~17% discount)
      recommended: false,
      features: [
        'Unlimited team members',
        'Enterprise payment processing',
        'Unlimited everything',
        'Unlimited virtual cards',
        'Dedicated account manager',
        'White-label platform',
        'Custom integrations',
        'Advanced security (SSO)',
        'Compliance tools',
        'Custom SLA',
        'Training & onboarding',
        'Advanced fraud protection',
        'Custom API limits',
        'Premium support',
      ],
      limitations: [],
    },
  ]

  const handleSelectPlan = (planId: PlanType) => {
    setSelectedPlan(planId)
    setShowCheckout(true)
  }

  const handleCompleteUpgrade = () => {
    // Simulate upgrade process
    alert(`Upgrading to ${selectedPlan} plan...`)
    router.push('/settings/billing')
  }

  const selectedPlanData = plans.find(p => p.id === selectedPlan)

  if (showCheckout && selectedPlanData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
        <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Complete Your Upgrade
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Review and confirm your plan upgrade
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{selectedPlanData.name} Plan</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{selectedPlanData.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${billingCycle === 'annual' ? selectedPlanData.annualPrice : selectedPlanData.monthlyPrice}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">/month</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-600 dark:text-gray-400">Billing Cycle</span>
                    <Badge variant={billingCycle === 'annual' ? 'success' : 'default'}>
                      {billingCycle === 'annual' ? 'Annual (Save 17%)' : 'Monthly'}
                    </Badge>
                  </div>

                  {billingCycle === 'annual' && (
                    <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-semibold text-gray-900 dark:text-white">Total Today</span>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(selectedPlanData.annualPrice * 12).toFixed(0)}
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 border-2 border-primary-500 bg-primary-50 dark:bg-primary-500/10 rounded-xl">
                    <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Expires 12/2026</div>
                    </div>
                    <Badge variant="success" size="sm">Default</Badge>
                  </div>
                  <Button variant="outline" fullWidth>
                    Add New Payment Method
                  </Button>
                </div>
              </Card>
            </div>

            {/* Upgrade Summary */}
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">What's Included</h3>
                </div>
                <div className="space-y-2">
                  {selectedPlanData.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                  {selectedPlanData.features.length > 6 && (
                    <p className="text-sm text-primary-500 font-medium mt-2">
                      +{selectedPlanData.features.length - 6} more features
                    </p>
                  )}
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-2 mb-3">
                  <Lock className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Secure Payment</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your payment information is encrypted and secure.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">30-Day Money Back</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Not satisfied? Get a full refund within 30 days.
                    </p>
                  </div>
                </div>
              </Card>

              <Button fullWidth size="lg" onClick={handleCompleteUpgrade}>
                Confirm Upgrade
              </Button>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 dark:text-gray-400">
                By confirming, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push('/settings/billing')}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Back to Billing"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Upgrade Your Plan
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Choose the perfect plan for your business needs
              </p>
            </div>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'annual' ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 dark:text-gray-400'}`}>
                Annual
              </span>
              <Badge variant="success" size="sm">Save 17%</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative p-6 ${
                plan.recommended
                  ? 'ring-2 ring-primary-500 shadow-xl scale-105'
                  : plan.current
                  ? 'ring-2 ring-green-500'
                  : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge variant="primary" size="sm" className="shadow-lg">
                    Recommended
                  </Badge>
                </div>
              )}
              {plan.current && (
                <div className="absolute -top-4 right-4">
                  <Badge variant="success" size="sm" className="shadow-lg">
                    Current Plan
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">/month</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Billed ${plan.annualPrice * 12}/year
                  </p>
                )}
              </div>

              <Button
                fullWidth
                variant={plan.current ? 'outline' : plan.recommended ? 'primary' : 'secondary'}
                onClick={() => handleSelectPlan(plan.id)}
                disabled={plan.current}
                icon={plan.current ? undefined : <ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {plan.current ? 'Current Plan' : 'Upgrade Now'}
              </Button>

              <div className="mt-6 space-y-3">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Features:</div>
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Can I change plans later?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes, you can upgrade or downgrade at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We accept all major credit cards, debit cards, and bank transfers.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Is there a long-term contract?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No, all plans are month-to-month with no long-term commitment required.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">What about data security?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All plans include enterprise-grade security with encryption and compliance tools.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
