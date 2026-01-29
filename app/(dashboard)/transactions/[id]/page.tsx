'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Download,
  Share2,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Calendar,
  CreditCard,
  Building2,
  User,
  Receipt,
  AlertCircle,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatNumber } from '@/lib/utils'

export default function TransactionDetailsPage() {
  const params = useParams()
  const router = useRouter()

  // Mock transaction data (would fetch based on params.id)
  const transaction = {
    id: params.id,
    type: 'credit' as const,
    category: 'payment',
    description: 'Payment received from Acme Inc.',
    amount: 5000.00,
    fee: 25.00,
    netAmount: 4975.00,
    currency: 'USD',
    currencySymbol: '$',
    wallet: {
      id: '1',
      name: 'Main Operating Account',
      accountNumber: '****4532',
    },
    counterparty: {
      name: 'Acme Inc.',
      email: 'payments@acmeinc.com',
      accountNumber: '****8765',
    },
    reference: 'INV-2026-001',
    status: 'completed' as 'completed' | 'pending' | 'failed',
    paymentMethod: 'Bank Transfer',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    completedDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    initiatedBy: {
      name: 'John Smith',
      email: 'john@company.com',
      role: 'Finance Manager',
    },
    balanceBefore: 120430.50,
    balanceAfter: 125430.50,
    metadata: {
      ipAddress: '192.168.1.1',
      device: 'Chrome on MacOS',
      location: 'New York, USA',
    },
    notes: 'Quarterly service payment for Q1 2026',
    attachments: [
      {
        id: '1',
        name: 'invoice-2026-001.pdf',
        size: '245 KB',
        type: 'application/pdf',
      },
    ],
  }

  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-success" />
      case 'pending':
        return <Clock className="w-6 h-6 text-warning" />
      case 'failed':
        return <XCircle className="w-6 h-6 text-error" />
      default:
        return <AlertCircle className="w-6 h-6 text-gray-400" />
    }
  }

  const getStatusColor = () => {
    switch (transaction.status) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'failed':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.back()}
          className="mb-4"
        >
          Back to Transactions
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Transaction Details
              </h1>
              <Badge variant={getStatusColor()} size="sm">
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Transaction ID: {transaction.id}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Share2 className="w-4 h-4" />}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-4 h-4" />}
            >
              Download Receipt
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={<MoreVertical className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Amount Card */}
          <Card className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
                {getStatusIcon()}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {transaction.type === 'credit' ? 'Received' : 'Sent'}
              </p>
              <h2 className={`text-5xl font-bold mb-2 ${
                transaction.type === 'credit' ? 'text-success' : 'text-error'
              }`}>
                {transaction.type === 'credit' ? '+' : '-'}
                {transaction.currencySymbol}{formatNumber(transaction.amount)}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                {transaction.currency}
              </p>
            </div>

            {/* Fee Breakdown */}
            {transaction.fee > 0 && (
              <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Transaction Amount
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.currencySymbol}{formatNumber(transaction.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Processing Fee
                  </span>
                  <span className="text-sm font-medium text-error">
                    -{transaction.currencySymbol}{formatNumber(transaction.fee)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-border">
                  <span className="text-base font-semibold text-gray-900 dark:text-white">
                    Net Amount
                  </span>
                  <span className="text-base font-bold text-gray-900 dark:text-white">
                    {transaction.currencySymbol}{formatNumber(transaction.netAmount)}
                  </span>
                </div>
              </div>
            )}
          </Card>

          {/* Transaction Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Transaction Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-dark-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Description
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-dark-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <Receipt className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Reference
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.reference || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-dark-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Date & Time
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.date.toLocaleString('en-US', {
                      dateStyle: 'full',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-dark-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Payment Method
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-dark-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Wallet
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.wallet.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    Account {transaction.wallet.accountNumber}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Counterparty Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {transaction.type === 'credit' ? 'Sender' : 'Recipient'} Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Name
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.counterparty.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Email
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.counterparty.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-primary-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Account Number
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {transaction.counterparty.accountNumber}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Notes */}
          {transaction.notes && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Notes
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {transaction.notes}
              </p>
            </Card>
          )}

          {/* Attachments */}
          {transaction.attachments && transaction.attachments.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Attachments
              </h3>
              <div className="space-y-3">
                {transaction.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg rounded-xl hover:bg-gray-100 dark:hover:bg-dark-border transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-error" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          {attachment.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />} />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Status Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-success mt-2" />
                </div>
                <div className="flex-1 pb-6">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Completed
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    {transaction.completedDate?.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-200 dark:bg-dark-border mt-2" />
                </div>
                <div className="flex-1 pb-6">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Processing
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    {new Date(transaction.date.getTime() - 30000).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-dark-border rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    Initiated
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    {transaction.date.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Balance Impact */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Balance Impact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Balance Before
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {transaction.currencySymbol}{formatNumber(transaction.balanceBefore)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Transaction
                </span>
                <span className={`text-sm font-semibold ${
                  transaction.type === 'credit' ? 'text-success' : 'text-error'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'}
                  {transaction.currencySymbol}{formatNumber(transaction.amount)}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Balance After
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {transaction.currencySymbol}{formatNumber(transaction.balanceAfter)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Initiated By */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Initiated By
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {transaction.initiatedBy.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  {transaction.initiatedBy.role}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
              {transaction.initiatedBy.email}
            </p>
          </Card>

          {/* Metadata */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Additional Details
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">IP Address</span>
                <span className="text-gray-900 dark:text-white font-mono">
                  {transaction.metadata.ipAddress}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Device</span>
                <span className="text-gray-900 dark:text-white">
                  {transaction.metadata.device}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Location</span>
                <span className="text-gray-900 dark:text-white">
                  {transaction.metadata.location}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
