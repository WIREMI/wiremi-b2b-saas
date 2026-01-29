'use client'

import { useState } from 'react'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  Wallet,
  CreditCard,
  Send,
  FileText,
  Globe,
  Shield,
  Zap,
  ChevronDown,
  Play,
  CheckCircle2,
  ArrowUpRight,
  Building2,
  Users,
  TrendingUp,
  Banknote,
} from 'lucide-react'

// Currency data with flags
const currencies = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', symbol: '$' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', symbol: '$' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', symbol: '₦' },
  { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪', symbol: 'KSh' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', symbol: 'R' },
  { code: 'GHS', name: 'Ghanaian Cedi', flag: '🇬🇭', symbol: '₵' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', symbol: '₹' },
]

// Payment method logos
const paymentMethods = [
  { name: 'Visa', color: '#1A1F71' },
  { name: 'Mastercard', color: '#EB001B' },
  { name: 'Apple Pay', color: '#000000' },
  { name: 'Google Pay', color: '#4285F4' },
  { name: 'PayPal', color: '#003087' },
  { name: 'Alipay', color: '#1677FF' },
  { name: 'M-Pesa', color: '#4CAF50' },
  { name: 'Bank Transfer', color: '#6B7280' },
]

export default function DashboardPage() {
  const [isAccountActivated, setIsAccountActivated] = useState(false)
  const [sendAmount, setSendAmount] = useState('')
  const [sendCurrency, setSendCurrency] = useState(currencies[0])
  const [receiveCurrency, setReceiveCurrency] = useState(currencies[1])
  const [showSendDropdown, setShowSendDropdown] = useState(false)
  const [showReceiveDropdown, setShowReceiveDropdown] = useState(false)

  // Calculate receive amount (mock exchange rate)
  const exchangeRate = 0.92
  const receiveAmount = sendAmount ? (parseFloat(sendAmount) * exchangeRate).toFixed(2) : ''

  const featureCards = [
    {
      title: 'Global Accounts',
      description: 'Open local currency accounts to receive funds in 20+ currencies with unique account details.',
      icon: <Globe className="w-6 h-6" />,
      href: '/wallets',
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Receive in local currencies', 'Unique account numbers', 'No hidden fees'],
    },
    {
      title: 'Corporate Cards',
      description: 'Create employee and company cards in minutes. Track expenses and manage team budgets.',
      icon: <CreditCard className="w-6 h-6" />,
      href: '/cards',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Virtual & physical cards', 'Real-time controls', 'Expense tracking'],
    },
    {
      title: 'Invoicing & Bills',
      description: 'Upload and manage invoices, pay domestic and international bills seamlessly.',
      icon: <FileText className="w-6 h-6" />,
      href: '/invoicing',
      gradient: 'from-orange-500 to-amber-500',
      features: ['Automated invoicing', 'Bill management', 'Payment reminders'],
    },
    {
      title: 'Transfers',
      description: 'Fast, secure transfers to 150+ countries in 60+ currencies with interbank rates.',
      icon: <Send className="w-6 h-6" />,
      href: '/payouts',
      gradient: 'from-emerald-500 to-teal-500',
      features: ['Batch transfers', 'Interbank rates', 'Same-day delivery'],
    },
  ]

  const quickStats = [
    { label: 'Total Balance', value: '$125,420.00', icon: <Wallet className="w-5 h-5" />, trend: '+12.5%' },
    { label: 'Monthly Volume', value: '$45,230.00', icon: <TrendingUp className="w-5 h-5" />, trend: '+8.2%' },
    { label: 'Active Cards', value: '12', icon: <CreditCard className="w-5 h-5" />, trend: '+3' },
    { label: 'Team Members', value: '24', icon: <Users className="w-5 h-5" />, trend: '+2' },
  ]

  return (
    <PageLayout>
      {/* Activation Banner - Shows when account is not activated */}
      {!isAccountActivated && (
        <div className="mb-8 p-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Activate your account</h2>
                <p className="text-white/80">
                  Complete your business verification to start collecting funds and making transfers.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="bg-white text-primary-600 hover:bg-white/90"
                onClick={() => setIsAccountActivated(true)}
              >
                Activate Now
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          {/* Progress indicators */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-300" />
              <span>Email verified</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <div className="w-4 h-4 rounded-full border-2 border-white/40" />
              <span>Business details</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <div className="w-4 h-4 rounded-full border-2 border-white/40" />
              <span>Identity verification</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <div className="w-4 h-4 rounded-full border-2 border-white/40" />
              <span>Bank account</span>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to Wiremi
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your financial operating system for global business
        </p>
      </div>

      {/* Quick Stats - Only show when activated */}
      {isAccountActivated && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat) => (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-500">
                  {stat.icon}
                </div>
                <span className="text-xs font-medium text-green-500">{stat.trend}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </Card>
          ))}
        </div>
      )}

      {/* Get Started Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              Get Started
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Explore what you can do with Wiremi
            </p>
          </div>
          <Link href="/help" className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">
            View all guides <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureCards.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer h-full">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shrink-0`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                        {feature.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item) => (
                        <span key={item} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Transfer Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Send Money Card */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Send Money</h3>
              <p className="text-sm text-gray-500">Fast transfers to 150+ countries</p>
            </div>
          </div>

          {/* You Send */}
          <div className="mb-4">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">You send</label>
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-500">
              <input
                type="number"
                placeholder="0.00"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent text-lg font-medium text-gray-900 dark:text-white outline-none"
              />
              <div className="relative">
                <button
                  onClick={() => setShowSendDropdown(!showSendDropdown)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-xl">{sendCurrency.flag}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{sendCurrency.code}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {showSendDropdown && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSendCurrency(currency)
                          setShowSendDropdown(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                      >
                        <span className="text-xl">{currency.flag}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{currency.code}</span>
                        <span className="text-sm text-gray-500">{currency.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Exchange Rate Indicator */}
          <div className="flex items-center justify-center my-3">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>1 {sendCurrency.code} = {exchangeRate} {receiveCurrency.code}</span>
            </div>
          </div>

          {/* Recipient Gets */}
          <div className="mb-6">
            <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">Recipient gets</label>
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <input
                type="text"
                placeholder="0.00"
                value={receiveAmount}
                readOnly
                className="flex-1 px-4 py-3 bg-transparent text-lg font-medium text-gray-900 dark:text-white outline-none"
              />
              <div className="relative">
                <button
                  onClick={() => setShowReceiveDropdown(!showReceiveDropdown)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-xl">{receiveCurrency.flag}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{receiveCurrency.code}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {showReceiveDropdown && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setReceiveCurrency(currency)
                          setShowReceiveDropdown(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-left"
                      >
                        <span className="text-xl">{currency.flag}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{currency.code}</span>
                        <span className="text-sm text-gray-500">{currency.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            disabled={!isAccountActivated}
          >
            {isAccountActivated ? 'Continue' : 'Activate Account to Send'}
          </Button>

          {!isAccountActivated && (
            <p className="text-xs text-center text-gray-500 mt-2">
              Complete account activation to enable transfers
            </p>
          )}
        </Card>

        {/* Accept Payments Card */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Banknote className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Accept Payments</h3>
              <p className="text-sm text-gray-500">Accept cards & local payment methods in 180+ countries</p>
            </div>
          </div>

          {/* Payment Methods Showcase */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="aspect-[3/2] bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center p-2 hover:shadow-md transition-shadow"
              >
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                  {method.name}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span className="text-gray-600 dark:text-gray-400">Accept local & international cards</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span className="text-gray-600 dark:text-gray-400">Eliminate FX conversion fees</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span className="text-gray-600 dark:text-gray-400">Easy API & no-code integrations</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant={isAccountActivated ? 'primary' : 'secondary'}
              fullWidth
              disabled={!isAccountActivated}
            >
              {isAccountActivated ? 'Set Up Payments' : 'Activate to Accept Payments'}
            </Button>
          </div>

          {/* Video Tutorial Link */}
          <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-primary-500 hover:text-primary-600">
            <Play className="w-4 h-4" />
            Watch how it works
          </button>
        </Card>
      </div>

      {/* Additional Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Corporate Cards Preview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Corporate Cards</h3>
            <Badge variant="info" size="sm">New</Badge>
          </div>

          {/* Card Preview */}
          <div className="relative h-32 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl p-4 mb-4 overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="text-white/80 text-xs font-medium">WIREMI</span>
            </div>
            <div className="absolute bottom-4 left-4">
              <p className="text-white/60 text-xs mb-1">Virtual Card</p>
              <p className="text-white font-mono text-sm">•••• •••• •••• 4242</p>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="text-white/80 text-xl font-bold">VISA</span>
            </div>
          </div>

          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Manage team budgets
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Pay directly from wallet
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              No international fees
            </li>
          </ul>

          <Link href="/cards">
            <Button variant="outline" fullWidth size="sm">
              Explore Cards
            </Button>
          </Link>
        </Card>

        {/* Integration Methods */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Integrations</h3>
            <Badge variant="secondary" size="sm">API</Badge>
          </div>

          <div className="space-y-3 mb-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">REST API</p>
                <p className="text-xs text-gray-500">Full programmatic access</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded flex items-center justify-center">
                <Globe className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Webhooks</p>
                <p className="text-xs text-gray-500">Real-time event notifications</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center">
                <Building2 className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">No-Code</p>
                <p className="text-xs text-gray-500">Connect with Zapier, Make</p>
              </div>
            </div>
          </div>

          <Link href="/settings/integrations">
            <Button variant="outline" fullWidth size="sm">
              View Integrations
            </Button>
          </Link>
        </Card>

        {/* FX Conversion */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">FX Conversion</h3>
            <Badge variant="success" size="sm">Best Rates</Badge>
          </div>

          <div className="text-center py-4 mb-4">
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">0.5%</p>
            <p className="text-sm text-gray-500">Above interbank rate</p>
          </div>

          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center justify-between">
              <span>No hidden fees</span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>Real-time rates</span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>60+ currencies</span>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
          </div>

          <Link href="/exchange">
            <Button variant="outline" fullWidth size="sm">
              Convert Currency
            </Button>
          </Link>
        </Card>
      </div>

      {/* Learning Resources */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Learn how to grow your business</h3>
            <p className="text-sm text-gray-500">Watch tutorials and read case studies from businesses like yours</p>
          </div>
          <Link href="/resources" className="text-sm text-primary-500 hover:text-primary-600">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="group cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
              <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                3:45
              </div>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Getting Started with Wiremi</h4>
            <p className="text-xs text-gray-500">Learn the basics in under 5 minutes</p>
          </div>

          <div className="group cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
              <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                5:20
              </div>
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Accept Global Payments</h4>
            <p className="text-xs text-gray-500">Set up payments in any currency</p>
          </div>

          <div className="group cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
              <FileText className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">Case Study: TechCorp Africa</h4>
            <p className="text-xs text-gray-500">How they scaled to 12 countries</p>
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
