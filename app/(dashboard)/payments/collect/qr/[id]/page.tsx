'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  QrCode,
  Download,
  Eye,
  Copy,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Printer,
  Share2,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Activity,
  ArrowLeft,
  Pause,
  Play,
  FileImage,
  FileText,
  Settings,
  BarChart3,
  Users,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock QR code data
const MOCK_QR_CODE = {
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
  qrCodeUrl: 'https://qr.wiremi.com/pay/qr-001', // Mock URL
  recentTransactions: [
    {
      id: 'txn-001',
      amount: 45.50,
      currency: 'USD',
      customerName: 'John Doe',
      status: 'completed' as const,
      timestamp: '2026-01-20T14:30:00Z',
    },
    {
      id: 'txn-002',
      amount: 89.99,
      currency: 'USD',
      customerName: 'Jane Smith',
      status: 'completed' as const,
      timestamp: '2026-01-20T12:15:00Z',
    },
    {
      id: 'txn-003',
      amount: 34.00,
      currency: 'USD',
      customerName: 'Bob Johnson',
      status: 'completed' as const,
      timestamp: '2026-01-19T18:45:00Z',
    },
  ],
  scanActivity: [
    { date: '2026-01-15', scans: 12, payments: 10 },
    { date: '2026-01-16', scans: 18, payments: 15 },
    { date: '2026-01-17', scans: 22, payments: 20 },
    { date: '2026-01-18', scans: 28, payments: 25 },
    { date: '2026-01-19', scans: 32, payments: 30 },
    { date: '2026-01-20', scans: 44, payments: 42 },
  ],
}

type QRType = 'static' | 'dynamic'
type QRStatus = 'active' | 'paused' | 'expired'

export default function QRCodeDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg' | 'pdf'>('png')

  const qrCode = MOCK_QR_CODE
  const conversionRate = ((qrCode.payments / qrCode.scans) * 100).toFixed(1)
  const averagePayment = (qrCode.totalCollected / qrCode.payments).toFixed(2)

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(qrCode.qrCodeUrl)
    setCopiedUrl(true)
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  const handleDownload = (format: 'png' | 'svg' | 'pdf') => {
    // Mock download
    console.log(`Downloading QR code as ${format}`)
  }

  const handlePrint = () => {
    // Mock print
    console.log('Printing QR code')
  }

  const handleToggleStatus = () => {
    // Mock toggle
    console.log(`Toggling QR code status from ${qrCode.status}`)
  }

  const handleDelete = () => {
    // Mock delete
    if (confirm('Are you sure you want to delete this QR code?')) {
      console.log('Deleting QR code')
      router.push('/payments/collect/qr')
    }
  }

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
        {/* Header with Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/payments/collect/qr')}
              className="mb-4"
            >
              Back to QR Codes
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {qrCode.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {qrCode.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              {getTypeBadge(qrCode.type)}
              {getStatusBadge(qrCode.status)}
            </div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button
              variant="outline"
              size="md"
              icon={<Edit className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push(`/payments/collect/qr/${params.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={qrCode.status === 'active' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              iconPosition="left"
              onClick={handleToggleStatus}
            >
              {qrCode.status === 'active' ? 'Pause' : 'Activate'}
            </Button>
            <Button
              variant="danger"
              size="md"
              icon={<Trash2 className="w-5 h-5" />}
              iconPosition="left"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Scans"
            value={formatNumber(qrCode.scans)}
            icon={<Eye className="w-5 h-5" />}
            trend="up"
            change="+12%"
          />
          <StatsCard
            label="Successful Payments"
            value={qrCode.payments}
            icon={<CheckCircle2 className="w-5 h-5" />}
            trend="up"
            change="+15%"
          />
          <StatsCard
            label="Conversion Rate"
            value={`${conversionRate}%`}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="up"
            change="+2.8%"
          />
          <StatsCard
            label="Total Collected"
            value={formatCurrency(qrCode.totalCollected, qrCode.currency)}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+24%"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* QR Code Preview Card - Takes 1 column */}
          <Card className="lg:col-span-1">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                QR Code Preview
              </h2>

              {/* QR Code Display */}
              <div className="mb-6 bg-white dark:bg-gray-900 p-8 rounded-xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <div className="w-full max-w-xs aspect-square bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <QrCode className="w-3/4 h-3/4 text-white" />
                </div>
              </div>

              {/* Amount Info */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {qrCode.amount ? 'Fixed Amount' : 'Customer Enters Amount'}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {qrCode.amount ? formatCurrency(qrCode.amount, qrCode.currency) : 'Flexible'}
                </p>
              </div>

              {/* URL */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Payment URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={qrCode.qrCodeUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    icon={copiedUrl ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    onClick={handleCopyUrl}
                  >
                    {copiedUrl ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Download Options */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Download Format
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {(['png', 'svg', 'pdf'] as const).map((format) => (
                    <button
                      key={format}
                      onClick={() => setDownloadFormat(format)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        downloadFormat === format
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-2 border-primary-500'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={<Download className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={() => handleDownload(downloadFormat)}
                >
                  Download {downloadFormat.toUpperCase()}
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="md"
                  icon={<Printer className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={handlePrint}
                >
                  Print
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  icon={<Share2 className="w-5 h-5" />}
                  iconPosition="left"
                >
                  Share
                </Button>
              </div>
            </div>
          </Card>

          {/* Details and Activity - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Details Card */}
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  QR Code Details
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(qrCode.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Used</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(qrCode.lastUsed).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Printed Copies</p>
                    <div className="flex items-center gap-2">
                      <Printer className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {qrCode.printedCopies} copies
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average Payment</p>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(parseFloat(averagePayment), qrCode.currency)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Scan Activity Chart */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Scan Activity (Last 7 Days)
                  </h2>
                  <Badge variant="info" size="sm">
                    <Activity className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </div>

                {/* Simple bar chart visualization */}
                <div className="space-y-3">
                  {qrCode.scanActivity.map((activity, index) => {
                    const maxScans = Math.max(...qrCode.scanActivity.map(a => a.scans))
                    const scansPercentage = (activity.scans / maxScans) * 100
                    const paymentsPercentage = (activity.payments / activity.scans) * 100

                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400 font-medium">
                            {new Date(activity.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-500 dark:text-gray-400">
                              <Eye className="w-3 h-3 inline mr-1" />
                              {activity.scans}
                            </span>
                            <span className="text-success font-medium">
                              <CheckCircle2 className="w-3 h-3 inline mr-1" />
                              {activity.payments}
                            </span>
                          </div>
                        </div>
                        <div className="relative h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg transition-all"
                            style={{ width: `${scansPercentage}%` }}
                          />
                          <div
                            className="absolute top-0 left-0 h-full bg-green-500/80 rounded-lg transition-all"
                            style={{ width: `${(scansPercentage * paymentsPercentage) / 100}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-pink-500 to-purple-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Total Scans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Successful Payments</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Transactions
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/payments/collect/qr/${params.id}/transactions`)}
                  >
                    View All
                  </Button>
                </div>

                <div className="space-y-4">
                  {qrCode.recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => router.push(`/transactions/${transaction.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {transaction.customerName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(transaction.timestamp).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </p>
                        <Badge variant="success" size="sm">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
