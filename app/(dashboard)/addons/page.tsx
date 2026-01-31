'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Package,
  ArrowLeft,
  Check,
  Star,
  Users,
  GraduationCap,
  Dumbbell,
  Hotel,
  Ticket,
  CreditCard,
  Search,
  Plus,
  CheckCircle,
  X,
  MapPin,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type AddOnCategory = 'all' | 'industry' | 'payments' | 'operations'

interface AddOn {
  id: string
  name: string
  description: string
  icon: React.ElementType
  category: AddOnCategory
  priceUSD: number
  billingPeriod: 'monthly' | 'yearly'
  features: string[]
  popular?: boolean
  installed?: boolean
  comingSoon?: boolean
}

// Region-based currency conversion rates (approximate)
const currencyData: Record<string, { symbol: string; code: string; rate: number }> = {
  US: { symbol: '$', code: 'USD', rate: 1 },
  GB: { symbol: '£', code: 'GBP', rate: 0.79 },
  EU: { symbol: '€', code: 'EUR', rate: 0.92 },
  NG: { symbol: '₦', code: 'NGN', rate: 1550 },
  GH: { symbol: 'GH₵', code: 'GHS', rate: 15.5 },
  KE: { symbol: 'KSh', code: 'KES', rate: 153 },
  ZA: { symbol: 'R', code: 'ZAR', rate: 18.5 },
  IN: { symbol: '₹', code: 'INR', rate: 83 },
  AE: { symbol: 'د.إ', code: 'AED', rate: 3.67 },
  SG: { symbol: 'S$', code: 'SGD', rate: 1.34 },
  AU: { symbol: 'A$', code: 'AUD', rate: 1.53 },
  CA: { symbol: 'C$', code: 'CAD', rate: 1.36 },
  BR: { symbol: 'R$', code: 'BRL', rate: 4.97 },
  MX: { symbol: 'MX$', code: 'MXN', rate: 17.15 },
}

// Premium add-ons only - Core features are included in the base plan
const addOns: AddOn[] = [
  {
    id: 'corporate-cards',
    name: 'Corporate Cards',
    description: 'Issue and manage corporate cards with spending controls, real-time tracking, and expense management.',
    icon: CreditCard,
    category: 'payments',
    priceUSD: 50,
    billingPeriod: 'monthly',
    features: ['Virtual & physical cards', 'Spending limits & controls', 'Receipt capture & matching', 'Real-time fraud alerts', 'Employee card management'],
    installed: true,
  },
  {
    id: 'hr-payroll',
    name: 'HR & Payroll',
    description: 'Complete HR management with employee records, automated payroll processing, and compliance tracking.',
    icon: Users,
    category: 'operations',
    priceUSD: 149,
    billingPeriod: 'monthly',
    features: ['Employee management', 'Automated payroll', 'Time & attendance', 'Benefits administration', 'Compliance reporting'],
    popular: true,
  },
  {
    id: 'education',
    name: 'Education Management',
    description: 'Comprehensive school management with student enrollment, fee collection, and academic operations.',
    icon: GraduationCap,
    category: 'industry',
    priceUSD: 199,
    billingPeriod: 'monthly',
    features: ['Student enrollment', 'Fee collection & billing', 'Academic tracking', 'Parent portal', 'Staff management'],
  },
  {
    id: 'fitness',
    name: 'Fitness & Gym',
    description: 'Complete gym management with membership handling, class scheduling, and member engagement tools.',
    icon: Dumbbell,
    category: 'industry',
    priceUSD: 129,
    billingPeriod: 'monthly',
    features: ['Member management', 'Class scheduling', 'Check-in system', 'Membership billing', 'Trainer scheduling'],
  },
  {
    id: 'hospitality',
    name: 'Hospitality Suite',
    description: 'Hotel and restaurant management with reservations, billing, room management, and guest services.',
    icon: Hotel,
    category: 'industry',
    priceUSD: 249,
    billingPeriod: 'monthly',
    features: ['Room management', 'Reservations & booking', 'POS integration', 'Guest services', 'Housekeeping management'],
    popular: true,
  },
  {
    id: 'event-ticketing',
    name: 'Event Ticketing',
    description: 'Create and manage events, sell tickets, handle attendees, with built-in payment processing.',
    icon: Ticket,
    category: 'industry',
    priceUSD: 149,
    billingPeriod: 'monthly',
    features: ['Event creation', 'Ticket sales & types', 'QR code check-in', 'Attendee management', 'Event analytics'],
  },
]

const categories = [
  { id: 'all', label: 'All Add-ons' },
  { id: 'industry', label: 'Industry Solutions' },
  { id: 'payments', label: 'Payments' },
  { id: 'operations', label: 'Operations' },
]

// Helper to detect user region (mock implementation - in production use geolocation API)
function getUserRegion(): string {
  // In production, this would use a geolocation API or user settings
  // For now, default to US
  if (typeof window !== 'undefined') {
    const savedRegion = localStorage.getItem('wiremi_region')
    if (savedRegion) return savedRegion
  }
  return 'US'
}

// Format price based on region
function formatRegionalPrice(priceUSD: number, region: string): string {
  const currency = currencyData[region] || currencyData['US']
  const convertedPrice = Math.round(priceUSD * currency.rate)

  // Format with proper thousand separators
  const formattedPrice = convertedPrice.toLocaleString()

  return `${currency.symbol}${formattedPrice}`
}

export default function AddonsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<AddOnCategory>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAddOn, setSelectedAddOn] = useState<AddOn | null>(null)
  const [requestedAddOns, setRequestedAddOns] = useState<string[]>([])
  const [userRegion, setUserRegion] = useState('US')
  const [showRegionSelector, setShowRegionSelector] = useState(false)

  useEffect(() => {
    setUserRegion(getUserRegion())
  }, [])

  const handleRegionChange = (region: string) => {
    setUserRegion(region)
    localStorage.setItem('wiremi_region', region)
    setShowRegionSelector(false)
  }

  const filteredAddOns = addOns.filter((addon) => {
    const matchesCategory = selectedCategory === 'all' || addon.category === selectedCategory
    const matchesSearch = addon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      addon.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const installedCount = addOns.filter((a) => a.installed).length
  const totalMonthlyUSD = addOns.filter((a) => a.installed).reduce((sum, a) => sum + a.priceUSD, 0)

  const handleRequestAddOn = (addonId: string) => {
    setRequestedAddOns((prev) => [...prev, addonId])
  }

  const currentCurrency = currencyData[userRegion] || currencyData['US']

  return (
    <PageLayout maxWidth="full">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Back Navigation */}
        <div className="mb-2">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Add-on Marketplace
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Extend your Wiremi platform with powerful modules
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Region Selector */}
            <div className="relative">
              <button
                onClick={() => setShowRegionSelector(!showRegionSelector)}
                className="flex items-center gap-2 px-3 py-2 text-[13px] bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">{currentCurrency.code}</span>
              </button>
              {showRegionSelector && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 max-h-64 overflow-y-auto">
                  {Object.entries(currencyData).map(([code, data]) => (
                    <button
                      key={code}
                      onClick={() => handleRegionChange(code)}
                      className={`w-full px-4 py-2 text-left text-[13px] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        userRegion === code ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {data.symbol} {data.code}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
            <div className="text-right">
              <p className="text-xs text-gray-500">Current add-ons</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{installedCount} installed</p>
            </div>
            <div className="h-10 w-px bg-gray-200 dark:bg-gray-700" />
            <div className="text-right">
              <p className="text-xs text-gray-500">Monthly total</p>
              <p className="text-lg font-semibold text-teal-600 dark:text-teal-400">{formatRegionalPrice(totalMonthlyUSD, userRegion)}/mo</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search add-ons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 text-[13px] bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as AddOnCategory)}
                className={`px-4 py-2 text-[13px] font-medium rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add-ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAddOns.map((addon) => {
            const isRequested = requestedAddOns.includes(addon.id)
            const Icon = addon.icon

            return (
              <Card
                key={addon.id}
                className={`p-5 relative transition-all hover:shadow-lg cursor-pointer ${
                  addon.installed ? 'border-teal-500 dark:border-teal-500/50 bg-teal-50/50 dark:bg-teal-500/5' : ''
                }`}
                onClick={() => setSelectedAddOn(addon)}
              >
                {/* Popular Badge */}
                {addon.popular && !addon.installed && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="warning" size="sm" className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Popular
                    </Badge>
                  </div>
                )}

                {/* Installed Badge */}
                {addon.installed && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="success" size="sm" className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Installed
                    </Badge>
                  </div>
                )}

                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    addon.installed
                      ? 'bg-teal-100 dark:bg-teal-500/20'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      addon.installed
                        ? 'text-teal-600 dark:text-teal-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white truncate">
                      {addon.name}
                    </h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                      {addon.description}
                    </p>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {addon.features.slice(0, 3).map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                  {addon.features.length > 3 && (
                    <span className="px-2 py-0.5 text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 rounded">
                      +{addon.features.length - 3} more
                    </span>
                  )}
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700/50">
                  <div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{formatRegionalPrice(addon.priceUSD, userRegion)}</span>
                    <span className="text-[13px] text-gray-500">/mo</span>
                  </div>
                  {addon.installed ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push('/settings/billing')
                      }}
                      className="px-3 py-1.5 text-[12px] font-medium text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-colors"
                    >
                      Manage
                    </button>
                  ) : isRequested ? (
                    <span className="px-3 py-1.5 text-[12px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
                      Requested
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRequestAddOn(addon.id)
                      }}
                      className="px-3 py-1.5 text-[12px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAddOns.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No add-ons found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Need Custom? */}
        <Card className="p-6 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-teal-200 dark:border-teal-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Need a custom solution?
              </h3>
              <p className="text-[13px] text-gray-600 dark:text-gray-400">
                Contact our team to discuss custom add-ons tailored to your business needs.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => window.open('mailto:support@wiremi.com?subject=Custom Add-on Request', '_blank')}
            >
              Contact Sales
            </Button>
          </div>
        </Card>
      </div>

      {/* Add-on Detail Modal */}
      <AnimatePresence>
        {selectedAddOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAddOn(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      selectedAddOn.installed
                        ? 'bg-teal-100 dark:bg-teal-500/20'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <selectedAddOn.icon className={`w-7 h-7 ${
                        selectedAddOn.installed
                          ? 'text-teal-600 dark:text-teal-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedAddOn.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        {selectedAddOn.installed && (
                          <Badge variant="success" size="sm">Installed</Badge>
                        )}
                        {selectedAddOn.popular && !selectedAddOn.installed && (
                          <Badge variant="warning" size="sm">Popular</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAddOn(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedAddOn.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatRegionalPrice(selectedAddOn.priceUSD, userRegion)}
                  </span>
                  <span className="text-gray-500">/month</span>
                  {userRegion !== 'US' && (
                    <span className="text-sm text-gray-400">(${selectedAddOn.priceUSD} USD)</span>
                  )}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Features included:
                  </h4>
                  <ul className="space-y-2">
                    {selectedAddOn.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[13px] text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-teal-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedAddOn(null)}
                >
                  Cancel
                </Button>
                {selectedAddOn.installed ? (
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => {
                      setSelectedAddOn(null)
                      router.push('/settings/billing')
                    }}
                  >
                    Manage Add-on
                  </Button>
                ) : requestedAddOns.includes(selectedAddOn.id) ? (
                  <Button
                    variant="primary"
                    className="flex-1"
                    disabled
                  >
                    Request Pending
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => {
                      handleRequestAddOn(selectedAddOn.id)
                      setSelectedAddOn(null)
                    }}
                  >
                    Request Add-on - {formatRegionalPrice(selectedAddOn.priceUSD, userRegion)}/mo
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
