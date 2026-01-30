'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Download,
  Send,
  Printer,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  CreditCard,
  ArrowLeft,
} from 'lucide-react'
import { getInvoice, getPaymentsForInvoice } from '@/lib/mock-data/invoicing'
import { getInvoiceStatusColor, getDaysOverdue, getDaysUntilDue, isOverdue, formatCurrency } from '@/types/invoicing'

export default function InvoiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const invoice = getInvoice(params.id as string)
  const payments = invoice ? getPaymentsForInvoice(invoice.id) : []
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  if (!invoice) {
    return (
      <PageLayout maxWidth="wide">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Invoice Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The invoice you are looking for does not exist.
            </p>
            <Button onClick={() => router.push('/invoicing')}>Back to Invoices</Button>
          </div>
        </div>
      </PageLayout>
    )
  }

  const statusColor = getInvoiceStatusColor(invoice.status)
  const overdueCheck = isOverdue(invoice)

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/invoicing')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Invoices</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {invoice.invoiceNumber}
              </h1>
              <Badge
                className={
                  statusColor === 'green'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                    : statusColor === 'blue'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                    : statusColor === 'yellow'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    : statusColor === 'red'
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                }
              >
                {invoice.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Issued {new Date(invoice.issueDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex gap-2">
            {invoice.status === 'DRAFT' && (
              <Button variant="secondary" onClick={() => router.push(`/invoicing/${invoice.id}/edit`)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
            {invoice.status !== 'PAID' && invoice.status !== 'CANCELLED' && (
              <Button onClick={() => setShowPaymentModal(true)}>
                <CreditCard className="w-4 h-4 mr-2" />
                Record Payment
              </Button>
            )}
            <Button variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="secondary">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            {invoice.status === 'DRAFT' && (
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Invoice Preview */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              {/* Invoice Header */}
              <div className="flex items-start justify-between mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div>
                  {invoice.senderLogo && (
                    <img src={invoice.senderLogo} alt={invoice.senderName} className="h-12 mb-4" />
                  )}
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {invoice.senderName}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {invoice.senderAddress.street}<br />
                    {invoice.senderAddress.city}, {invoice.senderAddress.state} {invoice.senderAddress.postalCode}<br />
                    {invoice.senderAddress.country}
                  </p>
                </div>
                <div className="text-right">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">INVOICE</h1>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{invoice.invoiceNumber}</p>
                </div>
              </div>

              {/* Bill To / Due Date */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-2">BILL TO</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{invoice.clientName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {invoice.clientAddress.street}<br />
                    {invoice.clientAddress.city}, {invoice.clientAddress.state} {invoice.clientAddress.postalCode}<br />
                    {invoice.clientAddress.country}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {invoice.clientEmail}
                  </p>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">ISSUE DATE</p>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(invoice.issueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">DUE DATE</p>
                      <p className={overdueCheck ? 'text-red-600 font-semibold' : 'text-gray-900 dark:text-white'}>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">AMOUNT DUE</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(invoice.amountDue, invoice.currency)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="mb-8">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Description
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Rate
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {invoice.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          {item.description}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-white">
                          {formatCurrency(item.rate, invoice.currency)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(item.amount, invoice.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-72 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                  </div>

                  {invoice.discount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Discount ({invoice.discount.type === 'PERCENTAGE' ? `${invoice.discount.value}%` : 'Fixed'})
                      </span>
                      <span className="text-green-600 dark:text-green-400">
                        -{formatCurrency(invoice.discount.amount, invoice.currency)}
                      </span>
                    </div>
                  )}

                  {invoice.taxes.map((tax) => (
                    <div key={tax.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {tax.name} ({tax.rate}%)
                      </span>
                      <span className="text-gray-900 dark:text-white">{formatCurrency(tax.amount, invoice.currency)}</span>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <span className="text-base font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </span>
                  </div>

                  {invoice.amountPaid > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Amount Paid</span>
                        <span className="text-green-600 dark:text-green-400 font-semibold">
                          -{formatCurrency(invoice.amountPaid, invoice.currency)}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                        <span className="text-base font-semibold text-gray-900 dark:text-white">Balance Due</span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          {formatCurrency(invoice.amountDue, invoice.currency)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Notes & Terms */}
              {(invoice.notes || invoice.termsAndConditions) && (
                <div className="pt-8 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  {invoice.notes && (
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">NOTES</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{invoice.notes}</p>
                    </div>
                  )}
                  {invoice.termsAndConditions && (
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">TERMS & CONDITIONS</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{invoice.termsAndConditions}</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Payment Status */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Status</h3>

              {overdueCheck ? (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <p className="font-semibold text-red-900 dark:text-red-100">Overdue</p>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {getDaysOverdue(invoice)} days past due date
                  </p>
                </div>
              ) : invoice.status === 'PAID' ? (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <p className="font-semibold text-green-900 dark:text-green-100">Paid</p>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Payment received on {invoice.paidDate ? new Date(invoice.paidDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <p className="font-semibold text-blue-900 dark:text-blue-100">Pending Payment</p>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Due in {getDaysUntilDue(invoice)} days
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(invoice.total, invoice.currency)}
                  </span>
                </div>
                {invoice.amountPaid > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Paid</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(invoice.amountPaid, invoice.currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-semibold text-gray-900 dark:text-white">Amount Due</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrency(invoice.amountDue, invoice.currency)}
                  </span>
                </div>
              </div>

              {invoice.status !== 'PAID' && invoice.status !== 'CANCELLED' && (
                <Button
                  className="w-full mt-4"
                  onClick={() => router.push(`/invoicing/${invoice.id}/pay`)}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Invoice
                </Button>
              )}
            </Card>

            {/* Payment Methods */}
            {invoice.acceptedPaymentMethods.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Accepted Payment Methods</h3>
                <div className="space-y-2">
                  {invoice.acceptedPaymentMethods.map((method) => (
                    <div key={method} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{method.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Payment History */}
            {payments.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment History</h3>
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div key={payment.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(payment.amount, payment.currency)}
                        </span>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          {payment.paymentStatus}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {payment.paymentMethod.replace('_', ' ')} • {new Date(payment.paymentDate).toLocaleDateString()}
                      </p>
                      {payment.transactionId && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ID: {payment.transactionId}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity</h3>
              <div className="space-y-3 text-sm">
                {invoice.sentAt && (
                  <div className="flex gap-2">
                    <Send className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-900 dark:text-white">Invoice sent</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{new Date(invoice.sentAt).toLocaleString()}</p>
                    </div>
                  </div>
                )}
                {invoice.viewedAt && (
                  <div className="flex gap-2">
                    <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-900 dark:text-white">Viewed {invoice.viewCount} time(s)</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Last: {new Date(invoice.lastViewedAt!).toLocaleString()}</p>
                    </div>
                  </div>
                )}
                {invoice.remindersSent > 0 && (
                  <div className="flex gap-2">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-900 dark:text-white">{invoice.remindersSent} reminder(s) sent</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Last: {invoice.lastReminderAt ? new Date(invoice.lastReminderAt).toLocaleString() : 'N/A'}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
