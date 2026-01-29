'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Plus,
  Search,
  Calendar,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { mockSubscriptions, mockCorporateCards } from '@/lib/mock-data/corporate-cards'
import { formatCurrency } from '@/types/corporate-cards'

export default function SubscriptionsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'CANCELLED' | 'PAUSED'>('ALL')

  // Filter subscriptions
  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.merchantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.description?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || sub.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Calculate stats
  const totalMonthlySpend = mockSubscriptions
    .filter((s) => s.status === 'ACTIVE')
    .reduce((sum, sub) => {
      if (sub.billingFrequency === 'MONTHLY') return sum + sub.amount
      if (sub.billingFrequency === 'ANNUAL') return sum + sub.amount / 12
      if (sub.billingFrequency === 'QUARTERLY') return sum + (sub.amount * 4) / 12
      return sum
    }, 0)

  const activeSubscriptions = mockSubscriptions.filter((s) => s.status === 'ACTIVE').length
  const pausedSubscriptions = mockSubscriptions.filter((s) => s.status === 'PAUSED').length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                icon={<ArrowLeft className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => router.push('/cards')}
              >
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Subscriptions
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Manage recurring charges and subscriptions
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
              >
                Export
              </Button>
              <Button
                icon={<Plus className="w-4 h-4" />}
                iconPosition="left"
              >
                Add Subscription
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Spend</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalMonthlySpend)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeSubscriptions}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Paused</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pausedSubscriptions}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockSubscriptions.length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search subscriptions by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-4 h-4" />}
                iconPosition="left"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </Card>

        {/* Subscriptions List */}
        <div className="space-y-4">
          {filteredSubscriptions.length === 0 ? (
            <Card className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No subscriptions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm
                  ? 'Try adjusting your search terms or filters'
                  : 'Get started by adding your first subscription'}
              </p>
              {!searchTerm && (
                <Button
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                >
                  Add Subscription
                </Button>
              )}
            </Card>
          ) : (
            filteredSubscriptions.map((sub) => {
              const card = mockCorporateCards.find((c) => c.id === sub.cardId)

              return (
                <Card key={sub.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {sub.merchantName}
                        </h3>
                        <Badge
                          variant={
                            sub.status === 'ACTIVE'
                              ? 'success'
                              : sub.status === 'PAUSED'
                              ? 'warning'
                              : 'default'
                          }
                          size="sm"
                        >
                          {sub.status}
                        </Badge>
                        <Badge variant="default" size="sm">
                          {sub.category.replace('_', ' ')}
                        </Badge>
                      </div>

                      {sub.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {sub.description}
                        </p>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Amount
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(sub.amount)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Frequency
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {sub.billingFrequency.charAt(0) +
                              sub.billingFrequency.slice(1).toLowerCase()}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Next Billing
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {new Date(sub.nextBillingDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Started
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {new Date(sub.firstCharged).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      {card && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CreditCard className="w-4 h-4" />
                          <span>
                            {card.cardholderName} •••• {card.lastFourDigits}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        icon={<ExternalLink className="w-3 h-3" />}
                        iconPosition="left"
                      >
                        Visit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (card) {
                            router.push(`/cards/${card.id}`)
                          }
                        }}
                      >
                        View Card
                      </Button>
                      {sub.status === 'ACTIVE' && (
                        <Button size="sm" variant="outline">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Subscription active</span>
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
