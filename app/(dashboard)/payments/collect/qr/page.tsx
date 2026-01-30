'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  QrCode,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Copy,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  Printer,
  Share2,
  Sparkles,
  FileImage,
  X,
  CreditCard,
  Lock,
  Smartphone,
  Scan,
  Heart,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock QR codes data
const MOCK_QR_CODES = [
  {
    id: 'qr-001',
    name: 'Table 5 - Restaurant',
    description: 'Payment QR code for table 5',
    type: 'static' as const,
    amount: null, // Customer enters amount
    currency: 'USD',
    status: 'active' as const,
    scans: 156,
    payments: 142,
    totalCollected: 8540,
    createdAt: '2026-01-05T09:00:00Z',
    lastUsed: '2026-01-20T14:30:00Z',
    printedCopies: 3,
  },
  {
    id: 'qr-002',
    name: 'Event Ticket - $50',
    description: 'Conference ticket purchase',
    type: 'static' as const,
    amount: 50,
    currency: 'USD',
    status: 'active' as const,
    scans: 234,
    payments: 189,
    totalCollected: 9450,
    createdAt: '2025-12-20T10:00:00Z',
    lastUsed: '2026-01-19T16:45:00Z',
    printedCopies: 50,
  },
  {
    id: 'qr-003',
    name: 'Donation Box',
    description: 'Community center donations',
    type: 'static' as const,
    amount: null,
    currency: 'USD',
    status: 'active' as const,
    scans: 89,
    payments: 67,
    totalCollected: 2340,
    createdAt: '2026-01-01T08:00:00Z',
    lastUsed: '2026-01-18T12:15:00Z',
    printedCopies: 5,
  },
  {
    id: 'qr-004',
    name: 'Product Label - Item #SKU123',
    description: 'Quick purchase QR code',
    type: 'dynamic' as const,
    amount: 29.99,
    currency: 'USD',
    status: 'active' as const,
    scans: 45,
    payments: 38,
    totalCollected: 1139.62,
    createdAt: '2026-01-15T11:00:00Z',
    lastUsed: '2026-01-20T10:30:00Z',
    printedCopies: 100,
  },
]

type QRType = 'static' | 'dynamic'
type QRStatus = 'active' | 'paused' | 'expired'

// Elegant QR Code Design with Wiremi Logo
function StyledQRCode({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  }

  const logoSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
  }

  return (
    <div className={`${sizeClasses[size]} relative`}>
      {/* QR Code Pattern Background */}
      <div className="absolute inset-0 bg-white rounded-2xl overflow-hidden">
        {/* Simulated QR pattern */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Position detection patterns - corners */}
          {/* Top-left */}
          <rect x="4" y="4" width="20" height="20" fill="#1a1a2e" rx="2" />
          <rect x="7" y="7" width="14" height="14" fill="white" rx="1" />
          <rect x="10" y="10" width="8" height="8" fill="#1a1a2e" rx="1" />

          {/* Top-right */}
          <rect x="76" y="4" width="20" height="20" fill="#1a1a2e" rx="2" />
          <rect x="79" y="7" width="14" height="14" fill="white" rx="1" />
          <rect x="82" y="10" width="8" height="8" fill="#1a1a2e" rx="1" />

          {/* Bottom-left */}
          <rect x="4" y="76" width="20" height="20" fill="#1a1a2e" rx="2" />
          <rect x="7" y="79" width="14" height="14" fill="white" rx="1" />
          <rect x="10" y="82" width="8" height="8" fill="#1a1a2e" rx="1" />

          {/* Data modules - scattered pattern */}
          {[
            [28, 4], [32, 4], [40, 4], [48, 4], [52, 4], [56, 4], [64, 4], [68, 4],
            [28, 8], [36, 8], [44, 8], [56, 8], [60, 8], [68, 8],
            [4, 28], [8, 28], [12, 32], [16, 28], [20, 32],
            [76, 28], [80, 32], [84, 28], [88, 32], [92, 28],
            [4, 56], [8, 52], [12, 60], [16, 56], [20, 52],
            [76, 56], [80, 60], [84, 52], [88, 56], [92, 60],
            [28, 92], [32, 88], [40, 92], [48, 88], [52, 92], [56, 88], [64, 92], [68, 88],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="4" height="4" fill="#1a1a2e" rx="0.5" />
          ))}

          {/* Gradient overlay for modern look */}
          <defs>
            <linearGradient id="qrGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#qrGradient)" />
        </svg>
      </div>

      {/* Center Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${logoSizeClasses[size]} bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 ring-4 ring-white`}>
          <span className={`text-white font-black ${textSizeClasses[size]} tracking-tight`}>W</span>
        </div>
      </div>
    </div>
  )
}

// QR Code Preview Modal - Shows what appears when scanned
function QRPreviewModal({
  qr,
  onClose,
}: {
  qr: typeof MOCK_QR_CODES[0]
  onClose: () => void
}) {
  const [showScanAnimation, setShowScanAnimation] = useState(true)

  // Determine the type of payment screen
  const isDonation = qr.name.toLowerCase().includes('donation')
  const isEvent = qr.name.toLowerCase().includes('event') || qr.name.toLowerCase().includes('ticket')
  const isTable = qr.name.toLowerCase().includes('table')
  const isProduct = qr.name.toLowerCase().includes('product')

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
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                QR Code Scan Preview
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                What customers see when they scan this QR code
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 overflow-auto max-h-[calc(90vh-80px)]">
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* QR Code Display */}
            <div className="flex flex-col items-center">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <StyledQRCode size="lg" />
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
                <Scan className="w-4 h-4 inline mr-1" />
                Scan with any camera app
              </p>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Download className="w-4 h-4" />}
                >
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Printer className="w-4 h-4" />}
                >
                  Print
                </Button>
              </div>
            </div>

            {/* Phone Preview */}
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Customer&apos;s phone will show:
              </p>

              {/* Phone Frame */}
              <div className="relative">
                {/* Phone outline */}
                <div className="w-[280px] h-[560px] bg-gray-900 rounded-[40px] p-2 shadow-2xl">
                  {/* Screen */}
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-[32px] overflow-hidden">
                    {/* Status bar */}
                    <div className="h-8 bg-gray-100 dark:bg-gray-900 flex items-center justify-between px-6">
                      <span className="text-xs text-gray-600 dark:text-gray-400">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-gray-400 rounded-sm" />
                        <div className="w-4 h-2 bg-gray-400 rounded-sm" />
                        <div className="w-6 h-3 bg-green-500 rounded-sm" />
                      </div>
                    </div>

                    {/* Payment Screen Content */}
                    <div className="p-4 space-y-4">
                      {/* Payment Info */}
                      <div className="text-center py-4">
                        {isDonation && <Heart className="w-12 h-12 mx-auto text-primary-500 mb-2" />}
                        {!isDonation && !isEvent && (
                          <div className="w-12 h-12 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-2">
                            <DollarSign className="w-6 h-6 text-primary-600" />
                          </div>
                        )}
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">{qr.name}</h4>
                        <p className="text-sm text-gray-500">{qr.description}</p>
                      </div>

                      {/* Amount */}
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center">
                        {qr.amount ? (
                          <>
                            <p className="text-xs text-gray-500 mb-1">Amount to pay</p>
                            <p className="text-3xl font-bold text-primary-600">
                              {formatCurrency(qr.amount, qr.currency)}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-xs text-gray-500 mb-2">Enter amount</p>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">$</span>
                              <input
                                type="text"
                                placeholder="0.00"
                                className="w-full text-center text-2xl font-bold py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                                readOnly
                              />
                            </div>
                          </>
                        )}
                      </div>

                      {/* Payment Methods */}
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500">Pay with</p>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="py-2 px-3 rounded-lg border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center gap-1.5 text-xs font-medium text-primary-700 dark:text-primary-300">
                            <CreditCard className="w-3 h-3" />
                            Card
                          </button>
                          <button className="py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.192c-.672 0-1.18.452-1.285 1.074l-.006.032-.898 5.606-.006.032c-.104.624-.596 1.262-1.282 1.262h-.639z"/>
                            </svg>
                            PayPal
                          </button>
                        </div>
                      </div>

                      {/* Pay Button */}
                      <button className="w-full py-3 bg-primary-500 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                        <Lock className="w-3 h-3" />
                        {qr.amount ? `Pay ${formatCurrency(qr.amount, qr.currency)}` : 'Continue to Pay'}
                      </button>

                      <p className="text-[10px] text-center text-gray-400 flex items-center justify-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        Powered by Wiremi
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dynamic notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function QRCodesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<QRType | 'all'>('all')
  const [previewQR, setPreviewQR] = useState<typeof MOCK_QR_CODES[0] | null>(null)

  // Calculate statistics
  const stats = {
    totalQRCodes: MOCK_QR_CODES.length,
    totalScans: MOCK_QR_CODES.reduce((sum, qr) => sum + qr.scans, 0),
    totalPayments: MOCK_QR_CODES.reduce((sum, qr) => sum + qr.payments, 0),
    totalCollected: MOCK_QR_CODES.reduce((sum, qr) => sum + qr.totalCollected, 0),
    conversionRate:
      (MOCK_QR_CODES.reduce((sum, qr) => sum + qr.payments, 0) /
        MOCK_QR_CODES.reduce((sum, qr) => sum + qr.scans, 0)) *
      100,
  }

  // Filter QR codes
  const filteredQRCodes = MOCK_QR_CODES.filter((qr) => {
    const matchesSearch =
      qr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qr.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === 'all' || qr.type === typeFilter

    return matchesSearch && matchesType
  })

  const getTypeBadge = (type: QRType) => {
    return type === 'static' ? (
      <Badge variant="info" size="sm">Static</Badge>
    ) : (
      <Badge variant="success" size="sm">Dynamic</Badge>
    )
  }

  const getStatusBadge = (status: QRStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Active</Badge>
      case 'paused':
        return <Badge variant="warning" size="sm">Paused</Badge>
      case 'expired':
        return <Badge variant="error" size="sm">Expired</Badge>
    }
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                QR Codes
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Generate static or dynamic QR codes for payment collection
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
              onClick={() => router.push('/payments/collect/qr/create')}
            >
              Generate QR Code
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total QR Codes"
            value={stats.totalQRCodes}
            icon={<QrCode className="w-5 h-5" />}
            trend="up"
            change="+3"
          />
          <StatsCard
            label="Total Scans"
            value={formatNumber(stats.totalScans)}
            icon={<Eye className="w-5 h-5" />}
            trend="up"
            change="+24%"
          />
          <StatsCard
            label="Conversion Rate"
            value={`${stats.conversionRate.toFixed(1)}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            change="+3.2%"
          />
          <StatsCard
            label="Total Collected"
            value={formatCurrency(stats.totalCollected, 'USD')}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+18%"
          />
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search QR codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Type:
              </span>
              {(['all', 'static', 'dynamic'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    typeFilter === type
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* QR Codes Grid */}
        {filteredQRCodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQRCodes.map((qr) => {
              const conversionRate = ((qr.payments / qr.scans) * 100).toFixed(1)
              return (
                <Card
                  key={qr.id}
                  variant="interactive"
                  className="group cursor-pointer transition-all hover:shadow-xl dark:hover:shadow-primary/10"
                  onClick={() => router.push(`/payments/collect/qr/${qr.id}`)}
                >
                  <div className="p-6">
                    {/* QR Code Preview with Wiremi Logo */}
                    <div className="mb-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <StyledQRCode size="md" />
                    </div>

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {qr.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {qr.description}
                        </p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-4">
                      {getTypeBadge(qr.type)}
                      {getStatusBadge(qr.status)}
                    </div>

                    {/* Amount */}
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {qr.amount ? 'Fixed Amount' : 'Customer Enters Amount'}
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {qr.amount ? formatCurrency(qr.amount, qr.currency) : 'Flexible'}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Scans</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatNumber(qr.scans)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Payments</p>
                        <p className="text-sm font-semibold text-success">{qr.payments}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conv.</p>
                        <p className="text-sm font-semibold text-primary-600">{conversionRate}%</p>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg border border-primary-200 dark:border-primary-800 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary-700 dark:text-primary-300 font-medium">
                          Total Collected
                        </span>
                        <span className="text-sm font-bold text-primary-900 dark:text-primary-100">
                          {formatCurrency(qr.totalCollected, qr.currency)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-4 gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewQR(qr)
                        }}
                        title="Preview"
                      >
                        <span className="sr-only">Preview</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Download className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        title="Download"
                      >
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Printer className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        title="Print"
                      >
                        <span className="sr-only">Print</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Share2 className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        title="Share"
                      >
                        <span className="sr-only">Share</span>
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
              <QrCode className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No QR codes found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || typeFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Generate your first QR code'}
              </p>
              {!searchTerm && typeFilter === 'all' && (
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/payments/collect/qr/create')}
                >
                  Generate QR Code
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Static QR Codes
              </h3>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-200 mb-4">
              Generate once, use forever. Perfect for physical locations like tables, products, or donation boxes.
            </p>
            <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Fixed or flexible amounts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Download in PNG, SVG, or PDF</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Print multiple copies</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Dynamic QR Codes
              </h3>
            </div>
            <p className="text-sm text-primary-800 dark:text-primary-200 mb-4">
              Update amounts and details without reprinting. Ideal for products with changing prices.
            </p>
            <ul className="space-y-2 text-sm text-primary-700 dark:text-primary-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Update price anytime</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Track individual scans</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Pause or expire codes</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewQR && (
          <QRPreviewModal
            qr={previewQR}
            onClose={() => setPreviewQR(null)}
          />
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
