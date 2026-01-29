'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Search,
  Download,
  DollarSign,
  FileText,
  Clock,
  AlertCircle,
  TrendingUp,
  Users,
  Eye,
  MoreVertical,
  ArrowLeft,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { getAllInvoices, getAnalytics } from '@/lib/mock-data/invoicing'
import { InvoiceStatus, getInvoiceStatusColor, getDaysOverdue, getDaysUntilDue, isOverdue } from '@/types/invoicing'

export default function InvoicingPage() {
  const router = useRouter()
  const invoices = getAllInvoices()
  const analytics = getAnalytics()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | InvoiceStatus>('ALL')

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusFilters: Array<{ value: 'ALL' | InvoiceStatus; label: string }> = [
    { value: 'ALL', label: 'All' },
    { value: 'DRAFT', label: 'Draft' },
    { value: 'SENT', label: 'Sent' },
    { value: 'VIEWED', label: 'Viewed' },
    { value: 'PARTIAL', label: 'Partial' },
    { value: 'PAID', label: 'Paid' },
    { value: 'OVERDUE', label: 'Overdue' },
  ]

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Back Navigation */}
      <div className="mb-2">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Invoicing
          </h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            Create, send, and track invoices with multiple payment options
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/invoicing/clients')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-700/50 rounded-lg"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Clients</span>
          </button>
          <button
            onClick={() => router.push('/invoicing/create')}
            className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              ${(analytics.totalRevenue / 1000).toFixed(1)}K
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Total Revenue
          </div>
          <div className="text-[12px] text-green-600 dark:text-green-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12% vs last month
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              ${(analytics.outstandingAmount / 1000).toFixed(1)}K
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Outstanding
          </div>
          <div className="text-[12px] text-gray-500">
            {analytics.sentCount + analytics.overdueCount} invoices
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              ${(analytics.overdueAmount / 1000).toFixed(1)}K
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Overdue
          </div>
          <div className="text-[12px] text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {analytics.overdueCount} invoice{analytics.overdueCount !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              ${(analytics.revenueThisMonth / 1000).toFixed(1)}K
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Paid This Month
          </div>
          <div className="text-[12px] text-gray-500">
            {analytics.paidCount} invoices
          </div>
        </div>
      </div>


      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices by number or client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 text-[13px] bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`px-3 py-1.5 text-[13px] rounded-lg whitespace-nowrap transition-colors ${
                  statusFilter === filter.value
                    ? 'bg-teal-600 text-white'
                    : 'bg-white dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <button
            className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-gray-700/50 rounded-lg"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-700/40">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Invoice
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-[11px] font-medium text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 dark:divide-gray-700/40">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-[13px] text-gray-500">No invoices found</p>
                    <button
                      onClick={() => router.push('/invoicing/create')}
                      className="mt-4 px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                    >
                      Create Your First Invoice
                    </button>
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => {
                  const statusColor = getInvoiceStatusColor(invoice.status)
                  const overdueCheck = isOverdue(invoice)
                  const daysInfo = overdueCheck
                    ? `${getDaysOverdue(invoice)} days overdue`
                    : invoice.status !== 'PAID' && invoice.status !== 'DRAFT'
                    ? `Due in ${getDaysUntilDue(invoice)} days`
                    : null

                  return (
                    <tr
                      key={invoice.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors"
                      onClick={() => router.push(`/invoicing/${invoice.id}`)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-[13px] font-medium text-gray-900 dark:text-white">
                              {invoice.invoiceNumber}
                            </p>
                            {invoice.viewCount > 0 && invoice.status !== 'DRAFT' && (
                              <p className="text-[11px] text-gray-500 flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                Viewed {invoice.viewCount} time{invoice.viewCount !== 1 ? 's' : ''}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-[13px] font-medium text-gray-900 dark:text-white">{invoice.clientName}</p>
                        <p className="text-[11px] text-gray-500">{invoice.clientEmail}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-[13px] text-gray-900 dark:text-white">
                          {new Date(invoice.issueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-[13px] text-gray-900 dark:text-white">
                          {new Date(invoice.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                        {daysInfo && (
                          <p className={`text-[11px] ${overdueCheck ? 'text-red-600 dark:text-red-400' : 'text-gray-500'}`}>
                            {daysInfo}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-[13px] font-semibold text-gray-900 dark:text-white tabular-nums">
                          ${invoice.total.toLocaleString()}
                        </p>
                        {invoice.amountPaid > 0 && invoice.amountPaid < invoice.total && (
                          <p className="text-[11px] text-gray-500">
                            ${invoice.amountPaid.toLocaleString()} paid
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          size="sm"
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
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Show action menu
                          }}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white mb-1">Create Invoice</h3>
                <p className="text-[12px] text-gray-500 mb-3">
                  Generate a new invoice for your client with multiple payment options
                </p>
                <button
                  onClick={() => router.push('/invoicing/create')}
                  className="text-[12px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                >
                  Get Started →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white mb-1">Manage Clients</h3>
                <p className="text-[12px] text-gray-500 mb-3">
                  Add and manage your client list for quick invoicing
                </p>
                <button
                  onClick={() => router.push('/invoicing/clients')}
                  className="text-[12px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                >
                  View Clients →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white mb-1">View Analytics</h3>
                <p className="text-[12px] text-gray-500 mb-3">
                  Track revenue, payment trends, and client insights
                </p>
                <button
                  onClick={() => router.push('/invoicing/analytics')}
                  className="text-[12px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                >
                  View Reports →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
