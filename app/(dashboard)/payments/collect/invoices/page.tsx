'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Mail,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency, formatNumber } from '@/lib/utils'

// Mock invoices data
const MOCK_INVOICES = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2026-001',
    customer: {
      name: 'Acme Corporation',
      email: 'billing@acme.com',
      company: 'Acme Corp',
    },
    amount: 5000,
    currency: 'USD',
    status: 'paid' as const,
    dueDate: '2026-01-15T00:00:00Z',
    paidDate: '2026-01-14T10:30:00Z',
    issuedDate: '2026-01-01T09:00:00Z',
    items: [
      { description: 'Web Development Services', quantity: 1, unitPrice: 4000, total: 4000 },
      { description: 'Hosting (Annual)', quantity: 1, unitPrice: 1000, total: 1000 },
    ],
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2026-002',
    customer: {
      name: 'Tech Startup Inc',
      email: 'finance@techstartup.com',
      company: 'Tech Startup Inc',
    },
    amount: 3500,
    currency: 'USD',
    status: 'pending' as const,
    dueDate: '2026-01-25T00:00:00Z',
    paidDate: null,
    issuedDate: '2026-01-10T11:00:00Z',
    items: [
      { description: 'Consulting Services', quantity: 20, unitPrice: 150, total: 3000 },
      { description: 'Platform Setup', quantity: 1, unitPrice: 500, total: 500 },
    ],
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2026-003',
    customer: {
      name: 'Global Enterprises',
      email: 'ap@globalent.com',
      company: 'Global Enterprises Ltd',
    },
    amount: 12000,
    currency: 'USD',
    status: 'overdue' as const,
    dueDate: '2026-01-10T00:00:00Z',
    paidDate: null,
    issuedDate: '2025-12-25T09:00:00Z',
    items: [
      { description: 'Enterprise License', quantity: 50, unitPrice: 200, total: 10000 },
      { description: 'Implementation Fee', quantity: 1, unitPrice: 2000, total: 2000 },
    ],
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2026-004',
    customer: {
      name: 'Local Business Co',
      email: 'admin@localbiz.com',
      company: 'Local Business Co',
    },
    amount: 1500,
    currency: 'USD',
    status: 'draft' as const,
    dueDate: '2026-02-01T00:00:00Z',
    paidDate: null,
    issuedDate: '2026-01-20T14:00:00Z',
    items: [
      { description: 'Monthly Subscription', quantity: 1, unitPrice: 1500, total: 1500 },
    ],
  },
]

type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'draft' | 'cancelled'

export default function InvoicesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all')

  // Calculate statistics
  const stats = {
    totalInvoices: MOCK_INVOICES.length,
    totalValue: MOCK_INVOICES.reduce((sum, inv) => sum + inv.amount, 0),
    paid: MOCK_INVOICES.filter((inv) => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    pending: MOCK_INVOICES.filter((inv) => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
    overdue: MOCK_INVOICES.filter((inv) => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0),
  }

  // Filter invoices
  const filteredInvoices = MOCK_INVOICES.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customer.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success" size="sm">Paid</Badge>
      case 'pending':
        return <Badge variant="info" size="sm">Pending</Badge>
      case 'overdue':
        return <Badge variant="error" size="sm">Overdue</Badge>
      case 'draft':
        return <Badge variant="default" size="sm">Draft</Badge>
      case 'cancelled':
        return <Badge variant="error" size="sm">Cancelled</Badge>
    }
  }

  const getStatusIcon = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="w-5 h-5 text-success" />
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'overdue':
        return <AlertTriangle className="w-5 h-5 text-error" />
      case 'draft':
        return <FileText className="w-5 h-5 text-gray-400" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-error" />
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Invoices & Payment Requests
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Send professional invoices with embedded payment options
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
              onClick={() => router.push('/invoicing/create')}
            >
              Create Invoice
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            label="Total Invoices"
            value={stats.totalInvoices}
            icon={<FileText className="w-5 h-5" />}
            trend="up"
            change="+4"
          />
          <StatsCard
            label="Total Value"
            value={formatCurrency(stats.totalValue, 'USD')}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            change="+12%"
          />
          <StatsCard
            label="Paid"
            value={formatCurrency(stats.paid, 'USD')}
            icon={<CheckCircle2 className="w-5 h-5" />}
          />
          <StatsCard
            label="Overdue"
            value={formatCurrency(stats.overdue, 'USD')}
            icon={<AlertTriangle className="w-5 h-5" />}
          />
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by invoice number, customer, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status:
              </span>
              {(['all', 'paid', 'pending', 'overdue', 'draft'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Invoices Table */}
        {filteredInvoices.length > 0 ? (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Invoice
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Customer
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Amount
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Due Date
                    </th>
                    <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => {
                    const daysUntilDue = getDaysUntilDue(invoice.dueDate)
                    return (
                      <tr
                        key={invoice.id}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                        onClick={() => router.push(`/invoicing/${invoice.id}`)}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-lg flex items-center justify-center">
                              {getStatusIcon(invoice.status)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {invoice.invoiceNumber}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Issued {new Date(invoice.issuedDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {invoice.customer.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {invoice.customer.company}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(invoice.amount, invoice.currency)}
                          </p>
                        </td>
                        <td className="py-4 px-6">
                          {getStatusBadge(invoice.status)}
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </p>
                            {invoice.status !== 'paid' && invoice.status !== 'draft' && (
                              <p className={`text-xs ${
                                daysUntilDue < 0 ? 'text-error' : daysUntilDue < 7 ? 'text-warning' : 'text-gray-500 dark:text-gray-400'
                              }`}>
                                {daysUntilDue < 0
                                  ? `${Math.abs(daysUntilDue)} days overdue`
                                  : `${daysUntilDue} days left`}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            {invoice.status !== 'paid' && invoice.status !== 'draft' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={<Send className="w-4 h-4" />}
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                                title="Send reminder"
                              >
                                <span className="sr-only">Send</span>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              icon={<Eye className="w-4 h-4" />}
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/invoicing/${invoice.id}`)
                              }}
                              title="View invoice"
                            >
                              <span className="sr-only">View</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No invoices found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Create your first invoice'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/invoicing/create')}
                >
                  Create Invoice
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Professional Invoices
              </h3>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Create branded invoices with your logo, itemized billing, and custom payment terms
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                Auto Reminders
              </h3>
            </div>
            <p className="text-sm text-purple-800 dark:text-purple-200">
              Schedule automatic payment reminders before and after the due date
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                Embedded Payment
              </h3>
            </div>
            <p className="text-sm text-green-800 dark:text-green-200">
              Customers can pay directly from the invoice with all payment methods enabled
            </p>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
