'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Download, CheckCircle2, Calendar } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function BillingPage() {
  const router = useRouter()

  const plans = [
    { name: 'Starter', price: 29, features: ['Up to 10 users', 'Basic features', '1GB storage'], current: false },
    { name: 'Pro', price: 99, features: ['Up to 50 users', 'Advanced features', '10GB storage', 'Priority support'], current: true },
    { name: 'Enterprise', price: 299, features: ['Unlimited users', 'All features', 'Unlimited storage', '24/7 support'], current: false },
  ]

  const invoices = [
    { id: '1', date: '2026-01-01', amount: 99, status: 'paid' as const, invoice: 'INV-2026-001' },
    { id: '2', date: '2025-12-01', amount: 99, status: 'paid' as const, invoice: 'INV-2025-012' },
    { id: '3', date: '2025-11-01', amount: 99, status: 'paid' as const, invoice: 'INV-2025-011' },
  ]

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left" onClick={() => router.back()} className="mb-4">Back to Settings</Button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing & Subscription</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your subscription and payment methods</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div key={plan.name} className={`p-6 rounded-xl border-2 ${plan.current ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10' : 'border-gray-200 dark:border-dark-border'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  {plan.current && <Badge variant="success" size="sm">Current</Badge>}
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">${plan.price}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">per month</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.current ? 'outline' : 'primary'} size="sm" className="w-full" disabled={plan.current}>
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expires 12/2027</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Billing History</h2>
            <Button variant="outline" size="sm">Download All</Button>
          </div>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{invoice.invoice}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(invoice.date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-gray-900 dark:text-white">${invoice.amount}</p>
                  <Badge variant="success" size="sm">Paid</Badge>
                  <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
