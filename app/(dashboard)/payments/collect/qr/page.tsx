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

// Clean QR Code Design - Telegram style (no logo inside)
function StyledQRCode({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-40 h-40',
    xl: 'w-64 h-64',
  }

  return (
    <div className={`${sizeClasses[size]} relative`}>
      {/* Clean QR Code Pattern - Telegram style */}
      <div className="absolute inset-0 bg-white rounded-xl overflow-hidden p-2">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Position detection patterns - corners with rounded look */}
          {/* Top-left */}
          <rect x="2" y="2" width="22" height="22" fill="#1a1a2e" rx="3" />
          <rect x="5" y="5" width="16" height="16" fill="white" rx="2" />
          <rect x="8" y="8" width="10" height="10" fill="#1a1a2e" rx="2" />

          {/* Top-right */}
          <rect x="76" y="2" width="22" height="22" fill="#1a1a2e" rx="3" />
          <rect x="79" y="5" width="16" height="16" fill="white" rx="2" />
          <rect x="82" y="8" width="10" height="10" fill="#1a1a2e" rx="2" />

          {/* Bottom-left */}
          <rect x="2" y="76" width="22" height="22" fill="#1a1a2e" rx="3" />
          <rect x="5" y="79" width="16" height="16" fill="white" rx="2" />
          <rect x="8" y="82" width="10" height="10" fill="#1a1a2e" rx="2" />

          {/* Data modules - dense pattern for realistic look */}
          {[
            // Top row data
            [28, 2], [32, 2], [36, 2], [44, 2], [48, 2], [56, 2], [60, 2], [68, 2], [72, 2],
            [28, 6], [40, 6], [48, 6], [52, 6], [64, 6], [72, 6],
            [28, 10], [32, 10], [44, 10], [52, 10], [56, 10], [60, 10], [68, 10],
            [28, 14], [36, 14], [40, 14], [48, 14], [56, 14], [64, 14], [68, 14], [72, 14],
            [28, 18], [32, 18], [40, 18], [44, 18], [52, 18], [60, 18], [72, 18],
            // Middle rows
            [2, 28], [6, 28], [10, 28], [14, 28], [18, 28], [28, 28], [36, 28], [44, 28], [52, 28], [60, 28], [68, 28], [76, 28], [80, 28], [84, 28], [88, 28], [92, 28],
            [6, 32], [14, 32], [22, 32], [32, 32], [40, 32], [48, 32], [56, 32], [64, 32], [72, 32], [80, 32], [88, 32],
            [2, 36], [10, 36], [18, 36], [28, 36], [36, 36], [44, 36], [52, 36], [60, 36], [68, 36], [84, 36], [92, 36],
            [6, 40], [14, 40], [22, 40], [32, 40], [40, 40], [48, 40], [56, 40], [64, 40], [72, 40], [80, 40], [88, 40],
            [2, 44], [10, 44], [18, 44], [28, 44], [36, 44], [52, 44], [60, 44], [68, 44], [76, 44], [84, 44], [92, 44],
            [6, 48], [14, 48], [22, 48], [32, 48], [44, 48], [48, 48], [56, 48], [64, 48], [72, 48], [80, 48], [88, 48],
            [2, 52], [10, 52], [18, 52], [28, 52], [36, 52], [40, 52], [52, 52], [60, 52], [68, 52], [84, 52], [92, 52],
            [6, 56], [14, 56], [22, 56], [32, 56], [44, 56], [48, 56], [56, 56], [64, 56], [72, 56], [80, 56], [88, 56],
            [2, 60], [10, 60], [18, 60], [28, 60], [36, 60], [52, 60], [60, 60], [68, 60], [76, 60], [84, 60], [92, 60],
            [6, 64], [14, 64], [22, 64], [32, 64], [40, 64], [48, 64], [56, 64], [64, 64], [72, 64], [80, 64], [88, 64],
            [2, 68], [10, 68], [18, 68], [28, 68], [36, 68], [44, 68], [52, 68], [60, 68], [68, 68], [84, 68], [92, 68],
            [6, 72], [14, 72], [22, 72], [32, 72], [40, 72], [48, 72], [56, 72], [64, 72], [72, 72], [80, 72], [88, 72],
            // Bottom row data
            [28, 78], [36, 78], [44, 78], [52, 78], [60, 78], [68, 78], [76, 78], [84, 78], [92, 78],
            [28, 82], [32, 82], [40, 82], [48, 82], [56, 82], [64, 82], [80, 82], [88, 82],
            [28, 86], [36, 86], [44, 86], [52, 86], [60, 86], [72, 86], [84, 86], [92, 86],
            [28, 90], [32, 90], [40, 90], [48, 90], [64, 90], [68, 90], [76, 90], [80, 90], [88, 90],
            [28, 94], [36, 94], [52, 94], [56, 94], [60, 94], [72, 94], [84, 94], [92, 94],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="4" height="4" fill="#1a1a2e" rx="0.5" />
          ))}
        </svg>
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

        {/* Preview Content - Telegram-style large QR layout */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800 overflow-auto max-h-[calc(90vh-80px)]">
          <div className="max-w-2xl mx-auto">
            {/* Large QR Code - Primary Focus */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-6">
              <div className="flex flex-col items-center">
                {/* Large QR Code */}
                <StyledQRCode size="xl" />

                {/* QR Info */}
                <div className="mt-6 text-center">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{qr.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{qr.description}</p>
                  {qr.amount && (
                    <p className="mt-3 text-2xl font-bold text-primary-600">
                      {formatCurrency(qr.amount, qr.currency)}
                    </p>
                  )}
                </div>

                {/* Scan instruction */}
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Scan className="w-4 h-4" />
                  <span>Scan with your phone camera</span>
                </div>
              </div>
            </div>

            {/* Action buttons and details - Compact section */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Actions */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Download & Share</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Download className="w-4 h-4" />}
                    className="flex-1"
                  >
                    PNG
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Download className="w-4 h-4" />}
                    className="flex-1"
                  >
                    SVG
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Printer className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Print
                  </Button>
                </div>
              </div>

              {/* Payment Preview Summary */}
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Options</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg text-xs font-medium flex items-center gap-1">
                    <CreditCard className="w-3 h-3" />
                    Card
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    Mobile
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                    PayPal
                  </span>
                  <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                    Bank
                  </span>
                </div>
              </div>
            </div>

            {/* Powered by footer */}
            <p className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Powered by Wiremi
            </p>
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
