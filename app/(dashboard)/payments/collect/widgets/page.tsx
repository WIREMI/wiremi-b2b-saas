'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code,
  Plus,
  Search,
  Filter,
  Download,
  Copy,
  Eye,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Zap,
  FileCode,
  Sparkles,
  Globe,
  Layers,
  X,
  CreditCard,
  Lock,
  Heart,
  ShoppingCart,
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

// Mock widgets data
const MOCK_WIDGETS = [
  {
    id: 'widget-001',
    name: 'Product Checkout Widget',
    description: 'Inline checkout for e-commerce products',
    type: 'inline' as const,
    platform: 'React' as const,
    status: 'active' as const,
    installs: 45,
    totalTransactions: 1240,
    totalCollected: 86500,
    currency: 'USD',
    createdAt: '2026-01-10T09:00:00Z',
    lastUsed: '2026-01-20T14:30:00Z',
  },
  {
    id: 'widget-002',
    name: 'Donation Modal',
    description: 'Pop-up donation widget for NGO website',
    type: 'modal' as const,
    platform: 'JavaScript' as const,
    status: 'active' as const,
    installs: 12,
    totalTransactions: 456,
    totalCollected: 18900,
    currency: 'USD',
    createdAt: '2026-01-08T11:20:00Z',
    lastUsed: '2026-01-19T16:45:00Z',
  },
  {
    id: 'widget-003',
    name: 'WordPress Store Checkout',
    description: 'WooCommerce payment integration',
    type: 'button' as const,
    platform: 'WordPress' as const,
    status: 'active' as const,
    installs: 8,
    totalTransactions: 890,
    totalCollected: 45600,
    currency: 'USD',
    createdAt: '2026-01-05T08:00:00Z',
    lastUsed: '2026-01-20T10:15:00Z',
  },
  {
    id: 'widget-004',
    name: 'Subscription Button',
    description: 'One-click subscribe widget',
    type: 'button' as const,
    platform: 'Vue' as const,
    status: 'active' as const,
    installs: 23,
    totalTransactions: 670,
    totalCollected: 20100,
    currency: 'USD',
    createdAt: '2025-12-28T14:30:00Z',
    lastUsed: '2026-01-18T12:00:00Z',
  },
]

type WidgetType = 'inline' | 'modal' | 'button'
type WidgetPlatform = 'React' | 'Vue' | 'JavaScript' | 'WordPress' | 'Webflow'

// Widget Preview Modal Component
function WidgetPreviewModal({
  widget,
  onClose,
}: {
  widget: typeof MOCK_WIDGETS[0]
  onClose: () => void
}) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  // Determine widget preview type
  const isDonation = widget.name.toLowerCase().includes('donation')
  const isSubscription = widget.name.toLowerCase().includes('subscription')
  const isWordPress = widget.platform === 'WordPress'
  const isProduct = widget.name.toLowerCase().includes('product')

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
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {widget.name} Preview
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                How this widget will appear on your website
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
              viewMode === 'mobile' ? 'max-w-[375px]' : 'max-w-3xl'
            }`}
          >
            {/* Website Context */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
              {/* Fake website header */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12" />
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12" />
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-12" />
                  </div>
                </div>
              </div>

              {/* Page content with embedded widget */}
              <div className={`p-6 ${viewMode === 'mobile' ? 'p-4' : 'p-8'}`}>
                {/* Fake page content */}
                <div className="space-y-3 mb-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>

                {/* Widget Preview */}
                <div className="border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-xl p-4 bg-primary-50/50 dark:bg-primary-900/10">
                  <p className="text-xs text-primary-600 dark:text-primary-400 mb-3 font-medium text-center">
                    ↓ Your Embedded Widget ↓
                  </p>

                  {isDonation && <DonationWidgetPreview viewMode={viewMode} />}
                  {isProduct && <ProductWidgetPreview viewMode={viewMode} />}
                  {isWordPress && <WordPressWidgetPreview viewMode={viewMode} />}
                  {isSubscription && <SubscriptionWidgetPreview viewMode={viewMode} />}
                  {!isDonation && !isProduct && !isWordPress && !isSubscription && (
                    <ProductWidgetPreview viewMode={viewMode} />
                  )}
                </div>

                {/* More fake content */}
                <div className="space-y-3 mt-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Product checkout widget preview
function ProductWidgetPreview({ viewMode }: { viewMode: 'desktop' | 'mobile' }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary-500" />
          <span className="font-semibold text-gray-900 dark:text-white">Quick Checkout</span>
        </div>
      </div>
      <div className={`p-4 ${viewMode === 'mobile' ? 'space-y-3' : 'space-y-4'}`}>
        {/* Product info */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white">Premium Widget Pro</p>
            <p className="text-sm text-gray-500">1x item</p>
          </div>
          <p className="font-bold text-gray-900 dark:text-white">$99.99</p>
        </div>

        {/* Payment methods - scrollable */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center gap-1.5 text-sm font-medium text-primary-700 dark:text-primary-300">
            <CreditCard className="w-4 h-4" />
            Card
          </button>
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Smartphone className="w-4 h-4" />
            Mobile
          </button>
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.192c-.672 0-1.18.452-1.285 1.074l-.006.032-.898 5.606-.006.032c-.104.624-.596 1.262-1.282 1.262h-.639z"/>
            </svg>
            PayPal
          </button>
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            Bank
          </button>
        </div>

        {/* Card input */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Card number"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            readOnly
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="MM/YY"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
              readOnly
            />
            <input
              type="text"
              placeholder="CVC"
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
              readOnly
            />
          </div>
        </div>

        {/* Pay button */}
        <button className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
          <Lock className="w-4 h-4" />
          Pay $99.99
        </button>

        <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Powered by Wiremi
        </p>
      </div>
    </div>
  )
}

// Donation modal widget preview
function DonationWidgetPreview({ viewMode }: { viewMode: 'desktop' | 'mobile' }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center">
        <Heart className="w-10 h-10 mx-auto mb-2" />
        <h3 className="font-bold text-lg">Support Our Cause</h3>
        <p className="text-sm opacity-90">Every donation makes a difference</p>
      </div>
      <div className={`p-4 ${viewMode === 'mobile' ? 'space-y-3' : 'space-y-4'}`}>
        {/* Preset amounts */}
        <div className="grid grid-cols-3 gap-2">
          {['$10', '$25', '$50'].map((amount, i) => (
            <button
              key={amount}
              className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                i === 1
                  ? 'bg-primary-500 text-white'
                  : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              {amount}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="text"
            placeholder="Custom amount"
            className="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            readOnly
          />
        </div>

        {/* Recurring option */}
        <label className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-primary-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Make this a monthly donation</span>
        </label>

        {/* Payment methods - scrollable */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center gap-1.5 text-sm font-medium text-primary-700 dark:text-primary-300">
            <CreditCard className="w-4 h-4" />
            Card
          </button>
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Smartphone className="w-4 h-4" />
            Mobile
          </button>
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.192c-.672 0-1.18.452-1.285 1.074l-.006.032-.898 5.606-.006.032c-.104.624-.596 1.262-1.282 1.262h-.639z"/>
            </svg>
            PayPal
          </button>
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            Bank
          </button>
        </div>

        {/* Donate button */}
        <button className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors hover:opacity-90">
          <Heart className="w-4 h-4" />
          Donate $25
        </button>

        <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Powered by Wiremi
        </p>
      </div>
    </div>
  )
}

// WordPress WooCommerce widget preview
function WordPressWidgetPreview({ viewMode }: { viewMode: 'desktop' | 'mobile' }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">W</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">WooCommerce Checkout</span>
        </div>
      </div>
      <div className={`p-4 ${viewMode === 'mobile' ? 'space-y-3' : 'space-y-4'}`}>
        {/* Order summary */}
        <div className="space-y-2">
          {[
            { name: 'Blue T-Shirt (L)', price: 29.99, qty: 1 },
            { name: 'Canvas Sneakers', price: 89.99, qty: 1 },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.qty}</p>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">${item.price}</p>
            </div>
          ))}
          <div className="flex justify-between pt-2">
            <span className="font-bold text-gray-900 dark:text-white">Total</span>
            <span className="font-bold text-primary-600">$119.98</span>
          </div>
        </div>

        {/* Payment options */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Payment method</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-2 px-3 rounded-lg border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center gap-1.5 text-sm font-medium text-primary-700 dark:text-primary-300">
              <CreditCard className="w-4 h-4" />
              Card
            </button>
            <button className="py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.192c-.672 0-1.18.452-1.285 1.074l-.006.032-.898 5.606-.006.032c-.104.624-.596 1.262-1.282 1.262h-.639z"/>
              </svg>
              PayPal
            </button>
          </div>
        </div>

        {/* Place order button */}
        <button className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:opacity-90 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
          <Lock className="w-4 h-4" />
          Place Order - $119.98
        </button>

        <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Powered by Wiremi
        </p>
      </div>
    </div>
  )
}

// Subscription button widget preview
function SubscriptionWidgetPreview({ viewMode }: { viewMode: 'desktop' | 'mobile' }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-center">
        <Sparkles className="w-10 h-10 mx-auto mb-2" />
        <h3 className="font-bold text-lg">Pro Membership</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold">$9.99</span>
          <span className="text-sm opacity-90">/month</span>
        </div>
      </div>
      <div className={`p-4 ${viewMode === 'mobile' ? 'space-y-3' : 'space-y-4'}`}>
        {/* Features */}
        <ul className="space-y-2">
          {['Unlimited access', 'Priority support', 'Custom branding', 'API access'].map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-primary-500" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Email input */}
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          readOnly
        />

        {/* Payment methods - scrollable */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center gap-1.5 text-sm font-medium text-primary-700 dark:text-primary-300">
            <CreditCard className="w-4 h-4" />
            Card
          </button>
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Smartphone className="w-4 h-4" />
            Mobile
          </button>
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.192c-.672 0-1.18.452-1.285 1.074l-.006.032-.898 5.606-.006.032c-.104.624-.596 1.262-1.282 1.262h-.639z"/>
            </svg>
            PayPal
          </button>
          <button className="flex-shrink-0 py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            Bank
          </button>
        </div>

        {/* Subscribe button */}
        <button className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors hover:opacity-90">
          <Zap className="w-4 h-4" />
          Subscribe Now
        </button>

        <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          Powered by Wiremi
        </p>
      </div>
    </div>
  )
}

export default function EmbeddableWidgetsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [platformFilter, setPlatformFilter] = useState<WidgetPlatform | 'all'>('all')
  const [previewWidget, setPreviewWidget] = useState<typeof MOCK_WIDGETS[0] | null>(null)

  // Calculate statistics
  const stats = {
    totalWidgets: MOCK_WIDGETS.length,
    totalInstalls: MOCK_WIDGETS.reduce((sum, w) => sum + w.installs, 0),
    totalTransactions: MOCK_WIDGETS.reduce((sum, w) => sum + w.totalTransactions, 0),
    totalCollected: MOCK_WIDGETS.reduce((sum, w) => sum + w.totalCollected, 0),
  }

  // Filter widgets
  const filteredWidgets = MOCK_WIDGETS.filter((widget) => {
    const matchesSearch =
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPlatform = platformFilter === 'all' || widget.platform === platformFilter

    return matchesSearch && matchesPlatform
  })

  const getTypeBadge = (type: WidgetType) => {
    const config = {
      inline: { label: 'Inline', variant: 'info' as const },
      modal: { label: 'Modal', variant: 'success' as const },
      button: { label: 'Button', variant: 'warning' as const },
    }
    const { label, variant } = config[type]
    return <Badge variant={variant} size="sm">{label}</Badge>
  }

  const getPlatformIcon = (platform: WidgetPlatform) => {
    return <Code className="w-4 h-4" />
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Embeddable Widgets
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Add payment forms to your website or app with a few lines of code
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
              onClick={() => router.push('/payments/collect/widgets/create')}
            >
              Create Widget
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Widgets"
            value={stats.totalWidgets}
            icon={<Code className="w-5 h-5" />}
            trend="up"
            change="+2"
          />
          <StatsCard
            label="Active Installs"
            value={stats.totalInstalls}
            icon={<Globe className="w-5 h-5" />}
            trend="up"
            change="+12"
          />
          <StatsCard
            label="Transactions"
            value={formatNumber(stats.totalTransactions)}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            change="+18%"
          />
          <StatsCard
            label="Total Collected"
            value={formatCurrency(stats.totalCollected, 'USD')}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+22%"
          />
        </div>

        {/* Platform Guides */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {(['React', 'Vue', 'JavaScript', 'WordPress', 'Webflow'] as WidgetPlatform[]).map((platform) => {
            const count = MOCK_WIDGETS.filter((w) => w.platform === platform).length
            return (
              <Card
                key={platform}
                variant="interactive"
                className={`p-4 cursor-pointer transition-all ${
                  platformFilter === platform
                    ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'hover:shadow-md'
                }`}
                onClick={() => setPlatformFilter(platformFilter === platform ? 'all' : platform)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {getPlatformIcon(platform)}
                  </div>
                  {count > 0 && (
                    <Badge variant="default" size="sm">{count}</Badge>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {platform}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Integration guide
                </p>
              </Card>
            )
          })}
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search widgets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </Card>

        {/* Widgets Grid */}
        {filteredWidgets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWidgets.map((widget) => (
              <Card
                key={widget.id}
                variant="interactive"
                className="group cursor-pointer transition-all hover:shadow-xl dark:hover:shadow-primary/10"
                onClick={() => router.push(`/payments/collect/widgets/${widget.id}`)}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      {getTypeBadge(widget.type)}
                      <Badge variant="default" size="sm">
                        {widget.platform}
                      </Badge>
                    </div>
                  </div>

                  {/* Widget Info */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {widget.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {widget.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Installs</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {widget.installs}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Transactions</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatNumber(widget.totalTransactions)}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg border border-primary-200 dark:border-primary-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-primary-700 dark:text-primary-300 font-medium">
                        Total Collected
                      </span>
                      <span className="text-sm font-bold text-primary-900 dark:text-primary-100">
                        {formatCurrency(widget.totalCollected, widget.currency)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Copy className="w-4 h-4" />}
                      onClick={(e) => {
                        e.stopPropagation()
                        // Copy widget code
                      }}
                      className="flex-1"
                    >
                      Copy Code
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Eye className="w-4 h-4" />}
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewWidget(widget)
                      }}
                      className="flex-1"
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <Code className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No widgets found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || platformFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Create your first payment widget'}
              </p>
              {!searchTerm && platformFilter === 'all' && (
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/payments/collect/widgets/create')}
                >
                  Create Widget
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Integration Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Inline Widgets
              </h3>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-200 mb-4">
              Embed payment forms directly into your page content
            </p>
            <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Seamless user experience</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Matches your site design</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Modal Widgets
              </h3>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-200 mb-4">
              Trigger payment overlays with button clicks
            </p>
            <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Clean, focused checkout</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Higher conversion rates</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Button Widgets
              </h3>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-200 mb-4">
              One-click payment buttons for quick checkouts
            </p>
            <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Fastest integration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Perfect for donations</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Code Example */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Start Example
            </h2>
            <Button
              variant="ghost"
              size="sm"
              icon={<Copy className="w-4 h-4" />}
            >
              Copy
            </Button>
          </div>
          <div className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono">
              <code>{`<!-- Add Wiremi SDK -->
<script src="https://cdn.wiremi.com/widget.js"></script>

<!-- Add Payment Button -->
<button id="wiremi-pay">Pay Now</button>

<script>
  Wiremi.init({
    publicKey: 'pk_live_your_key_here'
  });

  document.getElementById('wiremi-pay')
    .addEventListener('click', () => {
      Wiremi.openPayment({
        amount: 50.00,
        currency: 'USD',
        description: 'Product purchase',
        onSuccess: (payment) => {
          console.log('Payment successful:', payment);
        }
      });
    });
</script>`}</code>
            </pre>
          </div>
        </Card>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewWidget && (
          <WidgetPreviewModal
            widget={previewWidget}
            onClose={() => setPreviewWidget(null)}
          />
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
