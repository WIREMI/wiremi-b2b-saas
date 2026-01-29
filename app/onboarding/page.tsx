'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sparkles,
  CreditCard,
  Globe,
  Zap,
  Shield,
  TrendingUp,
  ArrowRight,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function OnboardingWelcomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Mock user data (would come from session/context in real app)
  const businessName = 'Acme Corporation'

  const handleGetStarted = async () => {
    setIsLoading(true)
    // Simulate navigation delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/onboarding/plan-selection')
  }

  const features = [
    {
      icon: CreditCard,
      title: 'Multi-Currency Wallets',
      description: 'Manage funds in 150+ currencies with real-time exchange rates',
    },
    {
      icon: Globe,
      title: 'Global Payments',
      description: 'Send and receive payments worldwide with competitive FX rates',
    },
    {
      icon: Zap,
      title: 'Instant Transfers',
      description: 'Fast, secure payments with same-day settlement options',
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Military-grade encryption and PCI DSS Level 1 compliance',
    },
    {
      icon: TrendingUp,
      title: 'Financial Insights',
      description: 'AI-powered analytics to optimize your business finances',
    },
  ]

  const steps = [
    { number: 1, title: 'Choose Your Plan', completed: false },
    { number: 2, title: 'Select Add-ons', completed: false },
    { number: 3, title: 'Connect Bank', completed: false },
    { number: 4, title: 'Create Wallet', completed: false },
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
              <span>Step 1 of 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl mb-6 shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Wiremi, {businessName}! 🎉
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Let's set up your account in just a few steps. You'll be managing your finances like a pro in no time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            What you'll get with Wiremi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  variant="default"
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Setup Steps Preview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Your setup journey
          </h2>
          <div className="bg-gray-100 dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-200 dark:border-dark-border p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                        step.completed
                          ? 'bg-success text-white'
                          : 'bg-gray-100 dark:bg-dark-bg text-gray-400'
                      }`}
                    >
                      {step.completed ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <span className="text-lg font-semibold">{step.number}</span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-200 dark:bg-dark-border -translate-x-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to get started?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            It'll only take a few minutes to set up your account. Let's choose the perfect plan for your business needs.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleGetStarted}
            loading={isLoading}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            className="bg-gray-50 dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover text-primary-600 dark:text-primary-400"
          >
            Let's Get Started
          </Button>
        </div>

        {/* Skip Option */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Skip setup for now →
          </button>
        </div>
      </div>
    </div>
  )
}
