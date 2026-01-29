'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function QRCodesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<QRType | 'all'>('all')

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
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
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
                    {/* QR Code Preview */}
                    <div className="mb-4 bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <QrCode className="w-20 h-20 text-white" />
                      </div>
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

                    <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg border border-pink-200 dark:border-pink-800 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-pink-700 dark:text-pink-300 font-medium">
                          Total Collected
                        </span>
                        <span className="text-sm font-bold text-pink-900 dark:text-pink-100">
                          {formatCurrency(qr.totalCollected, qr.currency)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Download className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
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
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Static QR Codes
              </h3>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
              Generate once, use forever. Perfect for physical locations like tables, products, or donation boxes.
            </p>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
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

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                Dynamic QR Codes
              </h3>
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-200 mb-4">
              Update amounts and details without reprinting. Ideal for products with changing prices.
            </p>
            <ul className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
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
    </PageLayout>
  )
}
