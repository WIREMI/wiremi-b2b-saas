'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  CreditCard,
  Download,
  CheckCircle2,
  Calendar,
  Package,
  Plus,
  Settings,
  Trash2,
  AlertCircle,
  Users,
  Brain,
  Globe,
  Dumbbell,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AddOn {
  id: string
  name: string
  description: string
  price: number
  icon: React.ElementType
  active: boolean
}

export default function BillingPage() {
  const router = useRouter()

  const currentPlan = {
    name: 'Pro',
    price: 99,
    billingPeriod: 'monthly' as const,
    nextBillingDate: '2026-02-01',
    features: ['Up to 50 users', 'Advanced features', '10GB storage', 'Priority support'],
  }

  const plans = [
    { name: 'Starter', price: 29, features: ['Up to 10 users', 'Basic features', '1GB storage'], current: false },
    { name: 'Pro', price: 99, features: ['Up to 50 users', 'Advanced features', '10GB storage', 'Priority support'], current: true },
    { name: 'Enterprise', price: 299, features: ['Unlimited users', 'All features', 'Unlimited storage', '24/7 support'], current: false },
  ]

  const activeAddOns: AddOn[] = [
    { id: 'corporate-cards', name: 'Corporate Cards', description: 'Issue and manage corporate cards', price: 29, icon: CreditCard, active: true },
    { id: 'hr-payroll', name: 'HR & Payroll', description: 'Complete HR management', price: 49, icon: Users, active: true },
  ]

  const availableAddOns: AddOn[] = [
    { id: 'ai-insights', name: 'AI Insights', description: 'Advanced analytics and predictions', price: 99, icon: Brain, active: false },
    { id: 'multi-currency', name: 'Multi-Currency', description: 'Multi-currency support', price: 19, icon: Globe, active: false },
    { id: 'fitness', name: 'Fitness & Gym', description: 'Gym management tools', price: 39, icon: Dumbbell, active: false },
  ]

  const invoices = [
    { id: '1', date: '2026-01-01', amount: 177, status: 'paid' as const, invoice: 'INV-2026-001', breakdown: { plan: 99, addons: 78 } },
    { id: '2', date: '2025-12-01', amount: 177, status: 'paid' as const, invoice: 'INV-2025-012', breakdown: { plan: 99, addons: 78 } },
    { id: '3', date: '2025-11-01', amount: 128, status: 'paid' as const, invoice: 'INV-2025-011', breakdown: { plan: 99, addons: 29 } },
  ]

  const addOnTotal = activeAddOns.reduce((sum, addon) => sum + addon.price, 0)
  const totalMonthly = currentPlan.price + addOnTotal

  return (
    <PageLayout maxWidth="normal">
      <div className="space-y-6">
        {/* Back Navigation */}
        <div className="mb-2">
          <button
            onClick={() => router.push('/settings')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Settings</span>
          </button>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Billing & Subscription
          </h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            Manage your subscription, add-ons, and payment methods
          </p>
        </div>

        {/* Billing Summary */}
        <Card className="p-6 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-teal-200 dark:border-teal-700/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Monthly Total</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">${totalMonthly}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Next billing on {new Date(currentPlan.nextBillingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-white dark:bg-gray-800/50 rounded-lg px-4 py-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Base Plan</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">${currentPlan.price}</p>
              </div>
              <div className="bg-white dark:bg-gray-800/50 rounded-lg px-4 py-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Add-ons ({activeAddOns.length})</p>
                <p className="text-lg font-semibold text-teal-600 dark:text-teal-400">${addOnTotal}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Current Plan */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Plan</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/settings/billing/upgrade')}
            >
              Change Plan
            </Button>
          </div>
          <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-500/20 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{currentPlan.name}</h3>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${currentPlan.price}<span className="text-sm font-normal text-gray-500">/month</span>
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {currentPlan.features.map((feature, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Active Add-ons */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Active Add-ons</h2>
              <p className="text-sm text-gray-500">Extend your platform with additional features</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/addons')}
            >
              Browse Add-ons
            </Button>
          </div>

          {activeAddOns.length > 0 ? (
            <div className="space-y-3">
              {activeAddOns.map((addon) => {
                const Icon = addon.icon
                return (
                  <div
                    key={addon.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-teal-100 dark:bg-teal-500/20 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{addon.name}</h4>
                        <p className="text-sm text-gray-500">{addon.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">${addon.price}</p>
                        <p className="text-xs text-gray-500">/month</p>
                      </div>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Settings className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                )
              })}

              {/* Total */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="font-medium text-gray-600 dark:text-gray-400">Add-ons Total</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">${addOnTotal}/month</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">No add-ons installed</h3>
              <p className="text-sm text-gray-500 mb-4">Enhance your platform with powerful add-ons</p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => router.push('/addons')}
              >
                Browse Marketplace
              </Button>
            </div>
          )}
        </Card>

        {/* Available Add-ons Preview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recommended Add-ons</h2>
            <button
              onClick={() => router.push('/addons')}
              className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              View all
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableAddOns.slice(0, 3).map((addon) => {
              const Icon = addon.icon
              return (
                <div
                  key={addon.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-teal-300 dark:hover:border-teal-700 transition-colors cursor-pointer"
                  onClick={() => router.push('/addons')}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{addon.name}</h4>
                      <p className="text-xs text-gray-500">{addon.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">${addon.price}/mo</span>
                    <button className="text-xs text-teal-600 dark:text-teal-400 font-medium hover:underline">
                      Add
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Visa ending in 4242</p>
                <p className="text-sm text-gray-500">Expires 12/2027</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </Card>

        {/* Billing History */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Billing History</h2>
            <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />} iconPosition="left">
              Download All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Invoice</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Add-ons</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900 dark:text-white">{invoice.invoice}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(invoice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      ${invoice.breakdown.plan}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      ${invoice.breakdown.addons}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-900 dark:text-white">${invoice.amount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="success" size="sm">Paid</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Cancel Subscription */}
        <Card className="p-6 border-red-200 dark:border-red-500/30">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Cancel Subscription</h3>
              <p className="text-sm text-gray-500 mb-3">
                Cancel your subscription and all add-ons. Your data will be retained for 30 days after cancellation.
              </p>
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-500/30 dark:hover:bg-red-500/10">
                Cancel Subscription
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
