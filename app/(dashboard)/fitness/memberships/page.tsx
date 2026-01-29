'use client'

import { useRouter } from 'next/navigation'
import { CreditCard, Check, Users, Plus, Edit } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { MOCK_MEMBERSHIP_PLANS, MOCK_MEMBERS } from '@/lib/mock-data/fitness'

export default function MembershipPlansPage() {
  const router = useRouter()

  // Calculate subscribers per plan
  const planSubscribers = MOCK_MEMBERSHIP_PLANS.map((plan) => {
    const count = MOCK_MEMBERS.filter(
      (m) => m.membershipTier === plan.tier && m.membershipStatus === 'active'
    ).length
    return { ...plan, subscribers: count }
  })

  const getTierVariant = (tier: string) => {
    switch (tier) {
      case 'vip':
        return 'primary'
      case 'premium':
        return 'info'
      case 'basic':
        return 'default'
      default:
        return 'default'
    }
  }

  const getTierGradient = (tier: string) => {
    switch (tier) {
      case 'vip':
        return 'from-purple-500 to-purple-600'
      case 'premium':
        return 'from-blue-500 to-blue-600'
      case 'basic':
        return 'from-gray-500 to-gray-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <PageLayout maxWidth="normal">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Membership Plans
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage membership tiers and pricing
            </p>
          </div>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/fitness/memberships/add')}
          >
            Add Plan
          </Button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {['basic', 'premium', 'vip'].map((tier) => {
          const tierPlans = planSubscribers.filter((p) => p.tier === tier)
          const mainPlan = tierPlans.find((p) => p.billingCycle === 'monthly') || tierPlans[0]

          return (
            <Card
              key={tier}
              className={`p-8 ${tier === 'premium' ? 'border-2 border-primary' : ''}`}
            >
              {tier === 'premium' && (
                <div className="mb-4">
                  <Badge variant="primary" size="sm">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${getTierGradient(
                    tier
                  )} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{mainPlan.description}</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(mainPlan.price, mainPlan.currency)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/mo</span>
                </div>
                {tierPlans.length > 1 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    or save with annual billing
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {mainPlan.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <Button
                  variant={tier === 'premium' ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                  onClick={() => router.push('/fitness/members/add')}
                >
                  Select Plan
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>
                    {mainPlan.subscribers} active {mainPlan.subscribers === 1 ? 'member' : 'members'}
                  </span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Detailed Plans Table */}
      <Card>
        <div className="p-6 border-b border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Plans & Pricing
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Plan Name
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Tier
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Billing Cycle
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Price
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Subscribers
                </th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {planSubscribers.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900 dark:text-white">{plan.name}</div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={getTierVariant(plan.tier) as any} size="sm">
                      {plan.tier.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {plan.billingCycle}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(plan.price, plan.currency)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {plan.subscribers}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit className="w-4 h-4" />}
                        onClick={() => router.push(`/fitness/memberships/${plan.id}/edit`)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Comparison Table */}
      <Card className="mt-8">
        <div className="p-6 border-b border-gray-200 dark:border-dark-border">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Feature Comparison
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Feature
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Basic
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Premium
                </th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  VIP
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                  Gym Access
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                  Group Classes
                </td>
                <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
                  2/week
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                  Personal Training
                </td>
                <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
                  -
                </td>
                <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
                  1/month
                </td>
                <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
                  4/month
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                  Pool & Sauna
                </td>
                <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
                  -
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                  24/7 Access
                </td>
                <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
                  -
                </td>
                <td className="py-4 px-6 text-center text-sm text-gray-600 dark:text-gray-400">
                  -
                </td>
                <td className="py-4 px-6 text-center">
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </PageLayout>
  )
}
