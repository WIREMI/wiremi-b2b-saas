'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import {
  CreditCard,
  Check,
  Lock,
  Shield,
  CheckCircle2,
  Zap,
  Loader2,
  Star,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency } from '@/lib/utils'

type BillingCycle = 'monthly' | 'yearly'
type CheckoutStep = 'plan' | 'payment' | 'processing' | 'success'

interface Plan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  popular?: boolean
}

export default function SubscriptionCheckoutPage() {
  const params = useParams()
  const subscriptionId = params.id as string

  const [step, setStep] = useState<CheckoutStep>('plan')
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly')
  const [selectedPlan, setSelectedPlan] = useState<string>('pro')
  const [isLoading, setIsLoading] = useState(false)

  // Card form
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardName, setCardName] = useState('')
  const [email, setEmail] = useState('')

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for individuals',
      monthlyPrice: 9,
      yearlyPrice: 7,
      features: [
        '5 projects',
        '10 GB storage',
        'Basic analytics',
        'Email support',
      ],
    },
    {
      id: 'pro',
      name: 'Professional',
      description: 'Best for growing teams',
      monthlyPrice: 29,
      yearlyPrice: 24,
      features: [
        'Unlimited projects',
        '100 GB storage',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
        'API access',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 99,
      yearlyPrice: 79,
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Dedicated account manager',
        'Custom contracts',
        'SLA guarantee',
        'SSO/SAML',
        'Audit logs',
      ],
    },
  ]

  const currentPlan = plans.find(p => p.id === selectedPlan)
  const price = billingCycle === 'yearly' ? currentPlan?.yearlyPrice : currentPlan?.monthlyPrice
  const savings = billingCycle === 'yearly' && currentPlan
    ? (currentPlan.monthlyPrice - currentPlan.yearlyPrice) * 12
    : 0

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const parts = []
    for (let i = 0; i < v.length && i < 16; i += 4) {
      parts.push(v.substring(i, i + 4))
    }
    return parts.join(' ')
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleSubscribe = async () => {
    setStep('processing')
    await new Promise(resolve => setTimeout(resolve, 3000))
    setStep('success')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CloudApp Pro</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Lock className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Plan Selection Step */}
        {step === 'plan' && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Choose your plan</h1>
              <p className="text-lg text-gray-400 mb-8">Start your 14-day free trial. No credit card required.</p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-4 p-1.5 bg-white/10 rounded-xl">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={cn(
                    'px-6 py-2.5 rounded-lg text-sm font-medium transition-all',
                    billingCycle === 'monthly'
                      ? 'bg-white text-gray-900'
                      : 'text-gray-300 hover:text-white'
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={cn(
                    'px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                    billingCycle === 'yearly'
                      ? 'bg-white text-gray-900'
                      : 'text-gray-300 hover:text-white'
                  )}
                >
                  Yearly
                  <span className="px-2 py-0.5 bg-success text-white text-xs rounded-full">Save 20%</span>
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={cn(
                    'relative rounded-2xl p-6 cursor-pointer transition-all',
                    selectedPlan === plan.id
                      ? 'bg-white ring-2 ring-primary-500'
                      : 'bg-white/10 hover:bg-white/15 border border-white/10',
                    plan.popular && 'md:-mt-4 md:mb-4'
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full text-sm font-medium text-white flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className={cn(
                      'text-xl font-bold mb-1',
                      selectedPlan === plan.id ? 'text-gray-900' : 'text-white'
                    )}>
                      {plan.name}
                    </h3>
                    <p className={cn(
                      'text-sm',
                      selectedPlan === plan.id ? 'text-gray-500' : 'text-gray-400'
                    )}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className={cn(
                        'text-4xl font-bold',
                        selectedPlan === plan.id ? 'text-gray-900' : 'text-white'
                      )}>
                        ${billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className={selectedPlan === plan.id ? 'text-gray-500' : 'text-gray-400'}>
                        /month
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className={cn(
                        'text-sm mt-1',
                        selectedPlan === plan.id ? 'text-success' : 'text-primary-400'
                      )}>
                        Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className={cn(
                          'flex items-center gap-2 text-sm',
                          selectedPlan === plan.id ? 'text-gray-700' : 'text-gray-300'
                        )}
                      >
                        <Check className={cn(
                          'w-4 h-4',
                          selectedPlan === plan.id ? 'text-success' : 'text-primary-400'
                        )} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                    selectedPlan === plan.id
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-500'
                  )}>
                    {selectedPlan === plan.id && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setStep('payment')}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="px-8"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => setStep('plan')}
              className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to plans
            </button>

            <div className="bg-white rounded-2xl p-8">
              {/* Plan Summary */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6">
                <div>
                  <p className="font-semibold text-gray-900">{currentPlan?.name} Plan</p>
                  <p className="text-sm text-gray-500">Billed {billingCycle}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${price}/mo</p>
                  {savings > 0 && (
                    <p className="text-sm text-success">Saving ${savings}/year</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                />
              </div>

              {/* Card Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                    <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      maxLength={4}
                      placeholder="123"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleSubscribe}
              >
                Start Free Trial
              </Button>

              <p className="mt-4 text-center text-sm text-gray-500">
                You won't be charged until your trial ends. Cancel anytime.
              </p>

              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Lock className="w-4 h-4" />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing */}
        {step === 'processing' && (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-primary-400 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Setting up your account</h2>
            <p className="text-gray-400">Please wait...</p>
          </div>
        )}

        {/* Success */}
        {step === 'success' && (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to {currentPlan?.name}!</h2>
            <p className="text-gray-400 mb-8">
              Your 14-day free trial has started. You can manage your subscription at any time.
            </p>

            <div className="bg-white/10 rounded-xl p-6 mb-6 text-left">
              <div className="flex justify-between mb-4 pb-4 border-b border-white/10">
                <span className="text-gray-400">Plan</span>
                <span className="text-white font-medium">{currentPlan?.name}</span>
              </div>
              <div className="flex justify-between mb-4 pb-4 border-b border-white/10">
                <span className="text-gray-400">Billing</span>
                <span className="text-white font-medium capitalize">{billingCycle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Trial Ends</span>
                <span className="text-white font-medium">
                  {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Button variant="primary" size="lg" className="w-full">
              Go to Dashboard
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            Powered by <span className="font-semibold text-gray-400">Wiremi</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
