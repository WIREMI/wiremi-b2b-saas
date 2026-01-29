'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QrCode, ArrowLeft, Plus, Download, Copy, MoreVertical, Eye, Trash2, Share2, TrendingUp, DollarSign, Scan } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type QRCodeType = 'fixed' | 'variable'
type QRCodeStatus = 'active' | 'expired' | 'disabled'

interface QRCodeData {
  id: string
  title: string
  description: string
  type: QRCodeType
  amount?: number
  currency: string
  createdAt: string
  expiresAt?: string
  status: QRCodeStatus
  scans: number
  revenue: number
  qrCodeUrl: string
}

// Mock QR codes data
const mockQRCodes: QRCodeData[] = [
  {
    id: 'qr_1',
    title: 'Store Counter Payment',
    description: 'Main counter POS',
    type: 'variable',
    currency: 'USD',
    createdAt: '2026-01-15',
    status: 'active',
    scans: 234,
    revenue: 12450.50,
    qrCodeUrl: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'}/pay/qr_1`,
  },
  {
    id: 'qr_2',
    title: 'Product: Premium Package',
    description: 'Premium subscription QR code',
    type: 'fixed',
    amount: 99.99,
    currency: 'USD',
    createdAt: '2026-01-10',
    expiresAt: '2026-02-10',
    status: 'active',
    scans: 45,
    revenue: 4499.55,
    qrCodeUrl: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'}/pay/qr_2`,
  },
  {
    id: 'qr_3',
    title: 'Event Registration',
    description: 'Tech Conference 2026',
    type: 'fixed',
    amount: 250.00,
    currency: 'USD',
    createdAt: '2026-01-08',
    expiresAt: '2026-01-25',
    status: 'active',
    scans: 156,
    revenue: 39000.00,
    qrCodeUrl: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'}/pay/qr_3`,
  },
  {
    id: 'qr_4',
    title: 'Donation Box',
    description: 'Charity fundraiser',
    type: 'variable',
    currency: 'USD',
    createdAt: '2025-12-20',
    expiresAt: '2026-01-20',
    status: 'expired',
    scans: 89,
    revenue: 2340.00,
    qrCodeUrl: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'}/pay/qr_4`,
  },
]

export default function QRCodesPage() {
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>(mockQRCodes)
  const [selectedQRCode, setSelectedQRCode] = useState<string | null>(null)

  // Form states
  const [qrType, setQRType] = useState<QRCodeType>('variable')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [expiresAt, setExpiresAt] = useState('')

  // Statistics
  const totalScans = qrCodes.reduce((acc, qr) => acc + qr.scans, 0)
  const totalRevenue = qrCodes.reduce((acc, qr) => acc + qr.revenue, 0)
  const activeQRCodes = qrCodes.filter(qr => qr.status === 'active').length

  const handleCreateQRCode = () => {
    const qrId = `qr_${Date.now()}`
    const newQRCode: QRCodeData = {
      id: qrId,
      title,
      description,
      type: qrType,
      amount: qrType === 'fixed' && amount ? parseFloat(amount) : undefined,
      currency,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: expiresAt || undefined,
      status: 'active',
      scans: 0,
      revenue: 0,
      qrCodeUrl: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'}/pay/${qrId}`,
    }

    setQRCodes([newQRCode, ...qrCodes])
    setShowCreateModal(false)

    // Reset form
    setTitle('')
    setDescription('')
    setAmount('')
    setExpiresAt('')
  }

  const downloadQRCode = (qrCode: QRCodeData) => {
    // In a real implementation, this would generate and download the QR code image
    alert(`Downloading QR code for: ${qrCode.title}`)
  }

  const copyQRCodeUrl = async (url: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url)
        alert('QR code URL copied to clipboard!')
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea')
        textArea.value = url
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.select()
        try {
          document.execCommand('copy')
          alert('QR code URL copied to clipboard!')
        } catch (err) {
          alert('Failed to copy. Please copy manually: ' + url)
        }
        document.body.removeChild(textArea)
      }
    } catch (err) {
      alert('Failed to copy to clipboard')
    }
  }

  const deleteQRCode = (id: string) => {
    if (confirm('Are you sure you want to delete this QR code?')) {
      setQRCodes(qrCodes.filter(qr => qr.id !== id))
    }
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/payments')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                QR Code Payments
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Generate QR codes for contactless in-person payments
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<Plus className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => setShowCreateModal(true)}
          >
            Generate QR Code
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Scans</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalScans.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Scan className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+12% from last month</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>+8% from last month</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active QR Codes</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{activeQRCodes}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
                <QrCode className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>{qrCodes.length} total codes</span>
            </div>
          </Card>
        </div>
      </div>

      {/* QR Codes List */}
      <div className="space-y-4">
        {qrCodes.map((qrCode) => (
          <Card key={qrCode.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6 flex-1">
                {/* QR Code Preview */}
                <div className="w-32 h-32 bg-gray-50 dark:bg-dark-hover border-2 border-gray-200 dark:border-dark-border rounded-xl p-2 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-white" />
                  </div>
                </div>

                {/* QR Code Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {qrCode.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      qrCode.status === 'active'
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                        : qrCode.status === 'expired'
                        ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400'
                    }`}>
                      {qrCode.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      qrCode.type === 'fixed'
                        ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
                        : 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400'
                    }`}>
                      {qrCode.type === 'fixed' ? 'Fixed Amount' : 'Variable Amount'}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {qrCode.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {qrCode.type === 'fixed' && qrCode.amount && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {qrCode.currency} ${qrCode.amount.toFixed(2)}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Scans</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {qrCode.scans.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Revenue</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${qrCode.revenue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Created</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {new Date(qrCode.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {qrCode.expiresAt && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expires</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {new Date(qrCode.expiresAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* URL */}
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-dark-hover rounded-lg">
                    <code className="text-sm text-gray-600 dark:text-gray-400 flex-1 truncate">
                      {qrCode.qrCodeUrl}
                    </code>
                    <button
                      onClick={() => copyQRCodeUrl(qrCode.qrCodeUrl)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-dark-border rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadQRCode(qrCode)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                  title="Download QR Code"
                >
                  <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => router.push(`/pay/${qrCode.id}`)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                  title="View Payment Page"
                >
                  <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => copyQRCodeUrl(qrCode.qrCodeUrl)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={() => deleteQRCode(qrCode.id)}
                  className="p-3 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>
          </Card>
        ))}

        {qrCodes.length === 0 && (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <QrCode className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No QR Codes Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Generate your first QR code to start accepting contactless payments
            </p>
            <Button
              variant="primary"
              size="lg"
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => setShowCreateModal(true)}
            >
              Generate QR Code
            </Button>
          </Card>
        )}
      </div>

      {/* Create QR Code Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-50 dark:bg-dark-surface rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Generate QR Code
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Create a new QR code for accepting payments
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* QR Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  QR Code Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setQRType('variable')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      qrType === 'variable'
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10'
                        : 'border-gray-200 dark:border-dark-border hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        qrType === 'variable'
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {qrType === 'variable' && (
                          <div className="w-full h-full rounded-full bg-gray-50 dark:bg-dark-surface scale-50" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">Variable Amount</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Customer enters amount</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setQRType('fixed')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      qrType === 'fixed'
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10'
                        : 'border-gray-200 dark:border-dark-border hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        qrType === 'fixed'
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {qrType === 'fixed' && (
                          <div className="w-full h-full rounded-full bg-gray-50 dark:bg-dark-surface scale-50" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">Fixed Amount</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Preset payment amount</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Store Counter Payment"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description for this QR code"
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Amount (only for fixed) */}
              {qrType === 'fixed' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Amount *
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="KES">KES - Kenyan Shilling</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Expiration Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expiration Date (Optional)
                </label>
                <input
                  type="date"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* QR Code Preview */}
              <div className="bg-gray-50 dark:bg-dark-hover rounded-xl p-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  QR Code Preview
                </p>
                <div className="w-48 h-48 bg-gray-100 dark:bg-dark-card border-2 border-gray-200 dark:border-dark-border rounded-xl p-4 mx-auto flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-white" />
                  </div>
                </div>
                {title && (
                  <p className="text-center mt-4 font-medium text-gray-900 dark:text-white">
                    {title}
                  </p>
                )}
                {qrType === 'fixed' && amount && (
                  <p className="text-center mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {currency} ${parseFloat(amount).toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-dark-border flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCreateQRCode}
                disabled={!title || (qrType === 'fixed' && !amount)}
                icon={<QrCode className="w-5 h-5" />}
                iconPosition="left"
              >
                Generate QR Code
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
