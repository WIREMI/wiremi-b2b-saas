'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Copy,
  Edit,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Palette,
  Sparkles,
  X,
  CreditCard,
  Lock,
  ShoppingCart,
  Calendar,
  Ticket,
  CheckCircle,
  Smartphone,
  Monitor,
  ExternalLink,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock hosted pages data
const MOCK_HOSTED_PAGES = [
  {
    id: 'page-001',
    name: 'E-Commerce Store Checkout',
    description: 'Main product checkout page',
    url: 'https://pay.wiremi.com/page/store-checkout',
    slug: 'store-checkout',
    status: 'active' as const,
    theme: {
      primaryColor: '#3B82F6',
      logo: '/logo.png',
      backgroundImage: null,
    },
    visits: 1240,
    conversions: 987,
    totalCollected: 45600,
    currency: 'USD',
    createdAt: '2026-01-10T09:00:00Z',
    lastModified: '2026-01-18T14:30:00Z',
  },
  {
    id: 'page-002',
    name: 'Monthly Subscription Signup',
    description: 'Pro plan subscription page',
    url: 'https://pay.wiremi.com/page/subscribe-pro',
    slug: 'subscribe-pro',
    status: 'active' as const,
    theme: {
      primaryColor: '#8B5CF6',
      logo: '/logo.png',
      backgroundImage: '/gradient-bg.jpg',
    },
    visits: 856,
    conversions: 432,
    totalCollected: 12960,
    currency: 'USD',
    createdAt: '2026-01-05T11:20:00Z',
    lastModified: '2026-01-15T16:45:00Z',
  },
  {
    id: 'page-003',
    name: 'Event Ticket Sales',
    description: 'Conference ticket purchase page',
    url: 'https://pay.wiremi.com/page/conference-2026',
    slug: 'conference-2026',
    status: 'paused' as const,
    theme: {
      primaryColor: '#F59E0B',
      logo: '/event-logo.png',
      backgroundImage: '/conference-bg.jpg',
    },
    visits: 2340,
    conversions: 1890,
    totalCollected: 472500,
    currency: 'USD',
    createdAt: '2025-12-01T08:00:00Z',
    lastModified: '2026-01-10T10:15:00Z',
  },
]

type PageStatus = 'active' | 'paused' | 'draft'

// Preview modal component for hosted pages
function HostedPagePreviewModal({
  page,
  onClose,
}: {
  page: typeof MOCK_HOSTED_PAGES[0]
  onClose: () => void
}) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  // Determine page type based on name/slug
  const isSubscription = page.name.toLowerCase().includes('subscription')
  const isEvent = page.name.toLowerCase().includes('event') || page.name.toLowerCase().includes('ticket')
  const isEcommerce = !isSubscription && !isEvent

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600">
              {isSubscription ? (
                <Calendar className="w-5 h-5 text-white" />
              ) : isEvent ? (
                <Ticket className="w-5 h-5 text-white" />
              ) : (
                <ShoppingCart className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {page.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Preview how your hosted page will appear to customers
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  viewMode === 'desktop'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Monitor className="w-4 h-4" />
                Desktop
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  viewMode === 'mobile'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                Mobile
              </button>
            </div>
            <button
              onClick={() => window.open(page.url, '_blank')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-5 h-5 text-gray-500" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 overflow-auto max-h-[calc(90vh-80px)]">
          <div
            className={`mx-auto transition-all duration-300 ${
              viewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-4xl'
            }`}
          >
            {/* Browser Frame */}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-t-xl p-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 bg-white dark:bg-gray-600 rounded-lg px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 font-mono truncate">
                  {page.url}
                </div>
              </div>
            </div>

            {/* Page Preview */}
            <div className="bg-white dark:bg-gray-900 rounded-b-xl shadow-xl overflow-hidden">
              {/* Specific Page Content */}
              <div className={`p-6 ${viewMode === 'mobile' ? 'p-4' : 'p-8'}`}>
                {isEcommerce && (
                  <EcommerceCheckoutPreview
                    viewMode={viewMode}
                  />
                )}
                {isSubscription && (
                  <SubscriptionCheckoutPreview
                    viewMode={viewMode}
                  />
                )}
                {isEvent && (
                  <EventTicketPreview
                    viewMode={viewMode}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// E-commerce checkout preview
function EcommerceCheckoutPreview({
  viewMode,
}: {
  viewMode: 'desktop' | 'mobile'
}) {
  return (
    <div className={`${viewMode === 'mobile' ? 'space-y-4' : 'grid grid-cols-2 gap-8'}`}>
      {/* Order Summary */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order Summary</h2>
        <div className="space-y-3">
          {[
            { name: 'Premium Widget Pro', price: 99.99, qty: 2 },
            { name: 'Extended Warranty', price: 19.99, qty: 1 },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span className="text-gray-900 dark:text-white">$219.97</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Tax</span>
            <span className="text-gray-900 dark:text-white">$17.60</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span className="text-gray-900 dark:text-white">Total</span>
            <span className="text-primary-600">$237.57</span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Details</h2>
        <PaymentMethodsPreview />
        <PaymentFormPreview />
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90">
          <Lock className="w-4 h-4" />
          Pay $237.57
        </button>
        <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Powered by Wiremi
        </p>
      </div>
    </div>
  )
}

// Subscription checkout preview
function SubscriptionCheckoutPreview({
  viewMode,
}: {
  viewMode: 'desktop' | 'mobile'
}) {
  return (
    <div className={`${viewMode === 'mobile' ? 'space-y-4' : 'grid grid-cols-2 gap-8'}`}>
      {/* Plan Details */}
      <div className="space-y-4">
        <div className="p-6 rounded-2xl border-2 border-primary-500 bg-primary-50/50 dark:bg-primary-900/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Pro Plan</h3>
              <p className="text-xs text-gray-500">Monthly subscription</p>
            </div>
          </div>
          <div className="mb-4">
            <span className="text-4xl font-bold text-primary-600">
              $29.99
            </span>
            <span className="text-gray-500">/month</span>
          </div>
          <ul className="space-y-2">
            {[
              'Unlimited transactions',
              'Advanced analytics',
              'Priority support',
              'Custom branding',
              'API access',
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-4 h-4 text-primary-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p className="text-xs text-gray-500 mb-2">Billing cycle</p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 px-3 rounded-lg text-sm font-medium border-2 border-primary-500 text-primary-600">
              Monthly
            </button>
            <button className="flex-1 py-2 px-3 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
              Yearly (Save 20%)
            </button>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Start Subscription</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              readOnly
            />
          </div>
        </div>
        <PaymentMethodsPreview />
        <PaymentFormPreview />
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90">
          <Lock className="w-4 h-4" />
          Subscribe - $29.99/mo
        </button>
        <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Powered by Wiremi
        </p>
      </div>
    </div>
  )
}

// Event ticket preview
function EventTicketPreview({
  viewMode,
}: {
  viewMode: 'desktop' | 'mobile'
}) {
  return (
    <div className={`${viewMode === 'mobile' ? 'space-y-4' : 'grid grid-cols-2 gap-8'}`}>
      {/* Event Details */}
      <div className="space-y-4">
        <div className="relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Calendar className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-xl font-bold">Tech Conference 2026</h3>
              <p className="text-sm opacity-90">March 15-17, 2026</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">March 15-17, 2026</p>
              <p className="text-xs text-gray-500">9:00 AM - 6:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Globe className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Convention Center</p>
              <p className="text-xs text-gray-500">123 Main St, Tech City</p>
            </div>
          </div>
        </div>
        {/* Ticket Selection */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Tickets</p>
          {[
            { name: 'General Admission', price: 199, selected: true },
            { name: 'VIP Access', price: 499, selected: false },
          ].map((ticket, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                ticket.selected
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{ticket.name}</p>
                  <p className="text-xs text-gray-500">Full 3-day access</p>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">${ticket.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Complete Purchase</h2>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">General Admission × 1</span>
            <span className="text-gray-900 dark:text-white">$199.00</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Service Fee</span>
            <span className="text-gray-900 dark:text-white">$10.00</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span className="text-gray-900 dark:text-white">Total</span>
              <span className="text-primary-600">$209.00</span>
            </div>
          </div>
        </div>
        <PaymentMethodsPreview />
        <PaymentFormPreview />
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90">
          <Ticket className="w-4 h-4" />
          Purchase Tickets - $209.00
        </button>
        <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Powered by Wiremi
        </p>
      </div>
    </div>
  )
}

// Shared payment methods preview
function PaymentMethodsPreview() {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600 dark:text-gray-400">Payment method</p>
      <div className="flex gap-2">
        <button className="flex-1 py-2 px-3 rounded-lg border-2 border-primary-500 text-primary-600 flex items-center justify-center gap-2 text-sm font-medium">
          <CreditCard className="w-4 h-4" />
          Card
        </button>
        <button className="flex-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.192c-.672 0-1.18.452-1.285 1.074l-.006.032-.898 5.606-.006.032c-.104.624-.596 1.262-1.282 1.262h-.639z"/>
          </svg>
          PayPal
        </button>
        <button className="flex-1 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          Bank
        </button>
      </div>
    </div>
  )
}

// Shared payment form preview
function PaymentFormPreview() {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Card number</label>
        <div className="relative">
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white pl-10"
            readOnly
          />
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Expiry</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            readOnly
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">CVC</label>
          <input
            type="text"
            placeholder="123"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default function HostedPagesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<PageStatus | 'all'>('all')
  const [previewPage, setPreviewPage] = useState<typeof MOCK_HOSTED_PAGES[0] | null>(null)

  // Calculate statistics
  const stats = {
    totalPages: MOCK_HOSTED_PAGES.length,
    activePages: MOCK_HOSTED_PAGES.filter((p) => p.status === 'active').length,
    totalVisits: MOCK_HOSTED_PAGES.reduce((sum, p) => sum + p.visits, 0),
    totalCollected: MOCK_HOSTED_PAGES.reduce((sum, p) => sum + p.totalCollected, 0),
    avgConversionRate:
      (MOCK_HOSTED_PAGES.reduce((sum, p) => sum + (p.conversions / p.visits) * 100, 0) /
        MOCK_HOSTED_PAGES.length).toFixed(1),
  }

  // Filter pages
  const filteredPages = MOCK_HOSTED_PAGES.filter((page) => {
    const matchesSearch =
      page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || page.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: PageStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Active</Badge>
      case 'paused':
        return <Badge variant="warning" size="sm">Paused</Badge>
      case 'draft':
        return <Badge variant="default" size="sm">Draft</Badge>
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Hosted Payment Pages
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Fully customizable checkout pages hosted by Wiremi
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-5 h-5" />}
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push('/payments/collect/pages/create')}
            >
              Create Page
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Pages"
            value={stats.totalPages}
            icon={<Globe className="w-5 h-5" />}
            trend="up"
            change="+2"
          />
          <StatsCard
            label="Page Visits"
            value={formatNumber(stats.totalVisits)}
            icon={<Users className="w-5 h-5" />}
            trend="up"
            change="+12%"
          />
          <StatsCard
            label="Total Collected"
            value={formatCurrency(stats.totalCollected, 'USD')}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+18%"
          />
          <StatsCard
            label="Avg Conversion"
            value={`${stats.avgConversionRate}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            change="+3.2%"
          />
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4 space-y-4">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, description, or slug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status:
              </span>
              {(['all', 'active', 'paused', 'draft'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Pages Grid */}
        {filteredPages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page) => {
              const conversionRate = ((page.conversions / page.visits) * 100).toFixed(1)
              return (
                <Card
                  key={page.id}
                  variant="interactive"
                  className="group cursor-pointer transition-all hover:shadow-xl dark:hover:shadow-primary/10"
                  onClick={() => router.push(`/payments/collect/pages/${page.id}`)}
                >
                  {/* Preview Thumbnail */}
                  <div
                    className="h-48 rounded-t-xl bg-gradient-to-br relative overflow-hidden"
                    style={{
                      backgroundImage: page.theme.backgroundImage
                        ? `url(${page.theme.backgroundImage})`
                        : `linear-gradient(135deg, ${page.theme.primaryColor}20 0%, ${page.theme.primaryColor}40 100%)`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                        style={{ backgroundColor: page.theme.primaryColor }}
                      >
                        <Globe className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(page.status)}
                    </div>
                    <div className="absolute top-3 left-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: page.theme.primaryColor }}
                      >
                        <Palette className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Page Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {page.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {page.description}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-gray-700 dark:text-gray-300 flex-1 truncate">
                        {page.slug}
                      </code>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(page.url)
                        }}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        title="Copy URL"
                      >
                        <Copy className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Visits</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatNumber(page.visits)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conv. Rate</p>
                        <p className="text-sm font-semibold text-success">{conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Collected</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(page.totalCollected, page.currency)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewPage(page)
                        }}
                        className="flex-1"
                      >
                        Preview
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/payments/collect/pages/${page.id}/edit`)
                        }}
                        className="flex-1"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <Globe className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No payment pages found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Create your first hosted payment page'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/payments/collect/pages/create')}
                >
                  Create Payment Page
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Info Card */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Why Use Hosted Payment Pages?
              </h3>
              <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                  <span>
                    <strong>No coding required</strong> - customize colors, logos, and content visually
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                  <span>
                    <strong>Hosted by Wiremi</strong> - no SSL certificates, no infrastructure management
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                  <span>
                    <strong>Optimized for conversion</strong> - mobile-first, fast loading, multi-currency
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                  <span>
                    <strong>Built-in analytics</strong> - track visits, conversions, and revenue in real-time
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewPage && (
          <HostedPagePreviewModal
            page={previewPage}
            onClose={() => setPreviewPage(null)}
          />
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
