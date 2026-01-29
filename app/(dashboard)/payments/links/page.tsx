'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Link2,
  Plus,
  Copy,
  ExternalLink,
  QrCode,
  Eye,
  Trash2,
  Edit,
  CreditCard,
  Smartphone,
  DollarSign,
  Bitcoin,
  Building2,
  Wallet,
  Check,
  ArrowLeft,
  Download,
  Share2,
  Calendar,
  Clock,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface PaymentLink {
  id: string
  title: string
  description: string
  amount: number
  currency: string
  acceptedMethods: PaymentMethod[]
  status: 'active' | 'inactive' | 'expired'
  link: string
  created: string
  expiresAt?: string
  totalPaid: number
  paymentCount: number
}

type PaymentMethod =
  | 'card'
  | 'mobile-money'
  | 'bank-transfer'
  | 'crypto'
  | 'apple-pay'
  | 'google-pay'

const paymentMethods = [
  {
    id: 'card' as PaymentMethod,
    name: 'Card Payment',
    description: 'Visa, Mastercard, Debit Cards',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'blue',
  },
  {
    id: 'mobile-money' as PaymentMethod,
    name: 'Mobile Money',
    description: 'M-Pesa, MTN, Airtel Money',
    icon: <Smartphone className="w-5 h-5" />,
    color: 'green',
  },
  {
    id: 'bank-transfer' as PaymentMethod,
    name: 'Bank Transfer',
    description: 'Direct bank transfers',
    icon: <Building2 className="w-5 h-5" />,
    color: 'purple',
  },
  {
    id: 'crypto' as PaymentMethod,
    name: 'Cryptocurrency',
    description: 'Bitcoin, USDT, Ethereum',
    icon: <Bitcoin className="w-5 h-5" />,
    color: 'orange',
  },
  {
    id: 'apple-pay' as PaymentMethod,
    name: 'Apple Pay',
    description: 'Quick checkout with Apple Pay',
    icon: <Wallet className="w-5 h-5" />,
    color: 'gray',
  },
  {
    id: 'google-pay' as PaymentMethod,
    name: 'Google Pay',
    description: 'Fast payment with Google Pay',
    icon: <Wallet className="w-5 h-5" />,
    color: 'red',
  },
]

export default function PaymentLinksPage() {
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedLink, setSelectedLink] = useState<PaymentLink | null>(null)
  const [selectedMethods, setSelectedMethods] = useState<PaymentMethod[]>([
    'card',
    'mobile-money',
  ])
  const [linkTitle, setLinkTitle] = useState('')
  const [linkDescription, setLinkDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [expiresAt, setExpiresAt] = useState('')

  // Mock existing payment links
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([
    {
      id: '1',
      title: 'Product Purchase',
      description: 'One-time product payment',
      amount: 99.99,
      currency: 'USD',
      acceptedMethods: ['card', 'mobile-money', 'crypto'],
      status: 'active',
      link: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'}/pay/1`,
      created: '2026-01-15T10:00:00',
      totalPaid: 2999.70,
      paymentCount: 30,
    },
    {
      id: '2',
      title: 'Monthly Subscription',
      description: 'Recurring monthly payment',
      amount: 49.99,
      currency: 'USD',
      acceptedMethods: ['card', 'bank-transfer'],
      status: 'active',
      link: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'}/pay/2`,
      created: '2026-01-10T14:30:00',
      expiresAt: '2026-02-10T14:30:00',
      totalPaid: 1499.70,
      paymentCount: 30,
    },
    {
      id: '3',
      title: 'Consultation Fee',
      description: 'One-hour consultation',
      amount: 150.00,
      currency: 'USD',
      acceptedMethods: ['card', 'mobile-money', 'bank-transfer', 'crypto'],
      status: 'active',
      link: `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'}/pay/3`,
      created: '2026-01-18T09:15:00',
      totalPaid: 750.00,
      paymentCount: 5,
    },
  ])

  const toggleMethod = (method: PaymentMethod) => {
    if (selectedMethods.includes(method)) {
      setSelectedMethods(selectedMethods.filter((m) => m !== method))
    } else {
      setSelectedMethods([...selectedMethods, method])
    }
  }

  const handleCreateLink = () => {
    if (!linkTitle || !amount) {
      alert('Please fill in required fields')
      return
    }

    const newLink: PaymentLink = {
      id: Date.now().toString(),
      title: linkTitle,
      description: linkDescription,
      amount: parseFloat(amount),
      currency,
      acceptedMethods: selectedMethods,
      status: 'active',
      link: `https://pay.wiremi.com/pl_${Math.random().toString(36).substr(2, 9)}`,
      created: new Date().toISOString(),
      expiresAt: expiresAt || undefined,
      totalPaid: 0,
      paymentCount: 0,
    }

    setPaymentLinks([newLink, ...paymentLinks])
    setShowCreateModal(false)

    // Reset form
    setLinkTitle('')
    setLinkDescription('')
    setAmount('')
    setSelectedMethods(['card', 'mobile-money'])
    setExpiresAt('')
  }

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        alert('Copied to clipboard!')
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.select()
        try {
          document.execCommand('copy')
          alert('Copied to clipboard!')
        } catch (err) {
          alert('Failed to copy. Please copy manually: ' + text)
        }
        document.body.removeChild(textArea)
      }
    } catch (err) {
      alert('Failed to copy to clipboard')
    }
  }

  const getMethodColor = (methodId: PaymentMethod) => {
    return paymentMethods.find((m) => m.id === methodId)?.color || 'gray'
  }

  const handleViewQR = (link: PaymentLink) => {
    setSelectedLink(link)
    setShowQRModal(true)
  }

  const handleShare = (link: PaymentLink) => {
    setSelectedLink(link)
    setShowShareModal(true)
  }

  const handleViewDetails = (link: PaymentLink) => {
    router.push(`/pay/${link.id}`)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this payment link?')) {
      setPaymentLinks(paymentLinks.filter(link => link.id !== id))
    }
  }

  const stats = {
    totalLinks: paymentLinks.length,
    activeLinks: paymentLinks.filter((l) => l.status === 'active').length,
    totalRevenue: paymentLinks.reduce((sum, link) => sum + link.totalPaid, 0),
    totalPayments: paymentLinks.reduce((sum, link) => sum + link.paymentCount, 0),
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.push('/payments')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Links
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create shareable payment links with multiple payment methods
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Link2 className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalLinks}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Links</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.activeLinks}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Links</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              ${formatNumber(stats.totalRevenue)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.totalPayments}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Payments Received</p>
          </Card>
        </div>

        {/* Create Button */}
        <div className="flex justify-end mb-6">
          <Button
            variant="primary"
            size="lg"
            icon={<Plus className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => setShowCreateModal(true)}
          >
            Create Payment Link
          </Button>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create Payment Link
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Set up a new shareable payment link with your preferred payment methods
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Link Title *
                    </label>
                    <input
                      type="text"
                      value={linkTitle}
                      onChange={(e) => setLinkTitle(e.target.value)}
                      placeholder="e.g., Product Purchase, Service Fee"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      value={linkDescription}
                      onChange={(e) => setLinkDescription(e.target.value)}
                      placeholder="Add details about what this payment is for"
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

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
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Currency
                      </label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="NGN">NGN</option>
                        <option value="KES">KES</option>
                        <option value="ZAR">ZAR</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expiration Date (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={expiresAt}
                      onChange={(e) => setExpiresAt(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Accepted Payment Methods *
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Select which payment methods customers can use
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => toggleMethod(method.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedMethods.includes(method.id)
                          ? `border-${method.color}-500 bg-${method.color}-50 dark:bg-${method.color}-500/10`
                          : 'border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              selectedMethods.includes(method.id)
                                ? `bg-${method.color}-100 dark:bg-${method.color}-500/20 text-${method.color}-600 dark:text-${method.color}-400`
                                : 'bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-gray-400'
                            }`}
                          >
                            {method.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {method.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        {selectedMethods.includes(method.id) && (
                          <div className={`w-6 h-6 bg-${method.color}-500 rounded-full flex items-center justify-center`}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {selectedMethods.length === 0 && (
                  <p className="text-sm text-red-500 mt-2">
                    Please select at least one payment method
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-dark-border flex justify-end gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleCreateLink}
                disabled={!linkTitle || !amount || selectedMethods.length === 0}
              >
                Create Link
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Payment Links List */}
      <div className="space-y-4">
        {paymentLinks.map((link) => (
          <Card key={link.id} className="p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {link.title}
                  </h3>
                  <Badge
                    variant={link.status === 'active' ? 'success' : 'default'}
                    size="sm"
                  >
                    {link.status}
                  </Badge>
                </div>
                {link.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {link.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {link.currency} {formatNumber(link.amount)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>{link.paymentCount} payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(link.created).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {link.acceptedMethods.map((methodId) => {
                    const method = paymentMethods.find((m) => m.id === methodId)
                    return (
                      <div
                        key={methodId}
                        className={`flex items-center gap-1 px-2 py-1 bg-${getMethodColor(methodId)}-100 dark:bg-${getMethodColor(methodId)}-500/10 text-${getMethodColor(methodId)}-700 dark:text-${getMethodColor(methodId)}-300 rounded-lg text-xs`}
                      >
                        {method?.icon}
                        <span>{method?.name}</span>
                      </div>
                    )
                  })}
                </div>

                {/* Link URL */}
                <div className="mt-4 flex items-center gap-2 p-3 bg-gray-50 dark:bg-dark-hover rounded-lg">
                  <code className="flex-1 text-sm text-gray-600 dark:text-gray-400 truncate">
                    {link.link}
                  </code>
                  <button
                    onClick={() => copyToClipboard(link.link)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded-lg transition-colors"
                    title="Copy link"
                  >
                    <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <a
                    href={`/pay/${link.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-200 dark:hover:bg-dark-card rounded-lg transition-colors"
                    title="Open payment page"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </a>
                </div>
              </div>

              {/* Right Section - Stats & Actions */}
              <div className="flex flex-col items-end gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Collected
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {link.currency} {formatNumber(link.totalPaid)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewQR(link)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                    title="View QR Code"
                  >
                    <QrCode className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleShare(link)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                    title="Share"
                  >
                    <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleViewDetails(link)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                    title="View Payment Page"
                  >
                    <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(link.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {paymentLinks.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-dark-hover rounded-full flex items-center justify-center mx-auto mb-4">
            <Link2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No payment links yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first payment link to start accepting payments
          </p>
          <Button
            variant="primary"
            size="lg"
            icon={<Plus className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => setShowCreateModal(true)}
          >
            Create Payment Link
          </Button>
        </Card>
      )}

      {/* QR Code Modal */}
      {showQRModal && selectedLink && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowQRModal(false)}>
          <div className="bg-gray-50 dark:bg-dark-surface rounded-2xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                QR Code
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedLink.title}
              </p>
              {/* QR Code Preview */}
              <div className="w-64 h-64 bg-gray-50 dark:bg-dark-hover border-2 border-gray-200 dark:border-dark-border rounded-xl p-4 mx-auto mb-6 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Scan this QR code to pay
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowQRModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => alert('QR code downloaded!')}
                  className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedLink && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-gray-50 dark:bg-dark-surface rounded-2xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Share Payment Link
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {selectedLink.title}
              </p>

              {/* Share URL */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Link
                </label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-dark-hover rounded-lg">
                  <code className="flex-1 text-sm text-gray-600 dark:text-gray-400 truncate">
                    {selectedLink.link}
                  </code>
                  <button
                    onClick={() => copyToClipboard(selectedLink.link)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-dark-border rounded-lg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Share buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => {
                    const text = `Pay ${selectedLink.currency} ${selectedLink.amount} - ${selectedLink.title}\n${selectedLink.link}`
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
                  }}
                  className="p-3 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors text-sm font-medium"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => {
                    window.open(`mailto:?subject=${encodeURIComponent(selectedLink.title)}&body=${encodeURIComponent(selectedLink.link)}`, '_blank')
                  }}
                  className="p-3 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors text-sm font-medium"
                >
                  Email
                </button>
              </div>

              <button
                onClick={() => setShowShareModal(false)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
