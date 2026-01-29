'use client'

import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  DollarSign,
  CreditCard,
  User,
  Calendar,
  Clock,
  ExternalLink,
  Trash2,
  Archive,
  MoreVertical,
  FileText,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function NotificationDetailPage() {
  const router = useRouter()
  const params = useParams()

  // Mock notification data - in real app, fetch by ID
  const notification = {
    id: params.id,
    type: 'payment_received' as 'payment_received' | 'payment_sent' | 'low_balance' | 'card_transaction' | 'system',
    title: 'Payment Received',
    message: '$5,000.00 from Acme Corporation',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    priority: 'high' as 'high' | 'medium' | 'low',
    details: {
      transactionId: 'TXN-2024-001234',
      amount: 5000.00,
      currency: 'USD',
      from: 'Acme Corporation',
      fromEmail: 'accounts@acmecorp.com',
      to: 'Main Operating Account',
      method: 'Bank Transfer',
      reference: 'Invoice #INV-2024-0156',
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      fee: 25.00,
    },
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'payment_received':
        return { icon: <CheckCircle className="w-6 h-6" />, bg: 'bg-green-100 dark:bg-green-500/20', color: 'text-green-500' }
      case 'payment_sent':
        return { icon: <DollarSign className="w-6 h-6" />, bg: 'bg-blue-100 dark:bg-blue-500/20', color: 'text-blue-500' }
      case 'low_balance':
        return { icon: <AlertTriangle className="w-6 h-6" />, bg: 'bg-yellow-100 dark:bg-yellow-500/20', color: 'text-yellow-500' }
      case 'card_transaction':
        return { icon: <CreditCard className="w-6 h-6" />, bg: 'bg-purple-100 dark:bg-purple-500/20', color: 'text-purple-500' }
      default:
        return { icon: <Info className="w-6 h-6" />, bg: 'bg-gray-100 dark:bg-gray-500/20', color: 'text-gray-500 dark:text-gray-400' }
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      case 'failed':
        return <Badge variant="error">Failed</Badge>
      default:
        return <Badge variant="default">{status}</Badge>
    }
  }

  const iconConfig = getIcon()
  const timeAgo = getTimeAgo(notification.timestamp)

  function getTimeAgo(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/notifications')}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Back to Notifications"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Notification Details
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {timeAgo}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" icon={<Archive className="w-4 h-4" />}>
                Archive
              </Button>
              <Button variant="outline" size="sm" icon={<Trash2 className="w-4 h-4" />}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Main Notification Card */}
        <Card className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-16 h-16 ${iconConfig.bg} rounded-xl flex items-center justify-center ${iconConfig.color}`}>
              {iconConfig.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {notification.title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {notification.message}
                  </p>
                </div>
                {getStatusBadge(notification.details.status)}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {notification.details.timestamp.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant={notification.priority === 'high' ? 'error' : 'default'} size="sm">
                    {notification.priority} priority
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Transaction Details */}
        {notification.type === 'payment_received' && (
          <>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transaction Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Transaction ID</span>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {notification.details.transactionId}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(notification.details.transactionId)}
                      className="text-primary-500 hover:text-primary-600 text-xs"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Amount</span>
                  <span className="text-2xl font-bold text-green-500">
                    +${notification.details.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Currency</span>
                  <span className="font-medium text-gray-900 dark:text-white">{notification.details.currency}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">From</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900 dark:text-white">{notification.details.from}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">{notification.details.fromEmail}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">To Account</span>
                  <span className="font-medium text-gray-900 dark:text-white">{notification.details.to}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                  <span className="font-medium text-gray-900 dark:text-white">{notification.details.method}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Reference</span>
                  <span className="font-medium text-gray-900 dark:text-white">{notification.details.reference}</span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 dark:text-gray-400">Transaction Fee</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${notification.details.fee.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  icon={<ExternalLink className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push(`/transactions/${notification.details.transactionId}`)}
                >
                  View Transaction
                </Button>
                <Button
                  variant="outline"
                  icon={<User className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push(`/contacts/${notification.details.from}`)}
                >
                  View Contact
                </Button>
                <Button
                  variant="outline"
                  icon={<DollarSign className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/payments/send')}
                >
                  Send Payment
                </Button>
              </div>
            </Card>

            {/* Related Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Related Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-dark-card rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Invoice Generated</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Invoice #INV-2024-0156 was automatically generated</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-dark-card rounded-lg">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">Payment Confirmed</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Funds have been credited to your account</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">5 minutes ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
