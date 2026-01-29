'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Wallet,
  CreditCard,
  Users,
  BarChart3,
  BookOpen,
  PlayCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function OnboardingCompletePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti animation
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }, [])

  const handleGoToDashboard = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push('/dashboard')
  }

  const quickActions = [
    {
      icon: CreditCard,
      title: 'Make Your First Payment',
      description: 'Send money to vendors or employees',
      action: 'Create Payment',
      color: 'primary',
    },
    {
      icon: Wallet,
      title: 'Add Funds to Wallet',
      description: 'Top up your wallet balance',
      action: 'Add Funds',
      color: 'success',
    },
    {
      icon: Users,
      title: 'Invite Team Members',
      description: 'Collaborate with your team',
      action: 'Invite Team',
      color: 'warning',
    },
    {
      icon: BarChart3,
      title: 'View Financial Reports',
      description: 'Analyze your business finances',
      action: 'View Reports',
      color: 'primary',
    },
  ]

  const resources = [
    {
      icon: BookOpen,
      title: 'Getting Started Guide',
      description: 'Learn the basics of Wiremi',
      time: '5 min read',
    },
    {
      icon: PlayCircle,
      title: 'Video Tutorials',
      description: 'Watch step-by-step walkthroughs',
      time: '10 videos',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="bg-gray-100 dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">W</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Wiremi
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-success to-success/80 rounded-full mb-6 shadow-lg animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🎉 You're All Set!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Congratulations! Your Wiremi account is ready. Let's start managing your business finances like a pro.
          </p>
          <Badge variant="success" size="sm" className="inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Setup Complete
          </Badge>
        </div>

        {/* What We've Set Up */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            What We've Set Up For You
          </h2>
          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Business Account
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your company profile and verification documents
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Subscription Plan
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Growth Plan with selected add-ons
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Multi-Currency Wallet
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your first wallet is ready to receive funds
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Bank Connection
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Linked accounts for seamless transfers
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            What Would You Like To Do First?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Card
                  key={index}
                  variant="interactive"
                  className="p-6 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-${action.color}/10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 text-${action.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {action.description}
                      </p>
                      <button className="text-sm font-medium text-primary-500 hover:text-primary-600">
                        {action.action} →
                      </button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Helpful Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <Card
                  key={index}
                  variant="interactive"
                  className="p-6 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {resource.description}
                      </p>
                    </div>
                    <Badge variant="info" size="sm">
                      {resource.time}
                    </Badge>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to Transform Your Business Finance?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Everything is set up. Head to your dashboard to start managing payments, tracking expenses, and growing your business.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleGoToDashboard}
            loading={isLoading}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            className="bg-gray-50 dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover text-primary-600 dark:text-primary-400"
          >
            Go to Dashboard
          </Button>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help getting started?{' '}
            <button className="text-primary-500 hover:text-primary-600 font-medium">
              Contact Support
            </button>{' '}
            or{' '}
            <button className="text-primary-500 hover:text-primary-600 font-medium">
              Schedule a Demo
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
