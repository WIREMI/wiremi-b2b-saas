'use client'

import { useRouter } from 'next/navigation'
import {
  Send,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  List,
  Layers,
  Eye,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import {
  MOCK_VENDORS,
  MOCK_PAYOUTS,
  getPendingApprovalPayouts,
  getPayoutsByStatus,
  getActiveVendors,
} from '@/lib/mock-data/payouts'

export default function PayoutsDashboardPage() {
  const router = useRouter()

  // Calculate stats
  const totalPayouts = MOCK_PAYOUTS.length
  const pendingApproval = getPendingApprovalPayouts().length
  const completedThisMonth = getPayoutsByStatus('completed').filter((p) => {
    const payoutDate = new Date(p.completedDate || p.createdAt)
    const now = new Date()
    return payoutDate.getMonth() === now.getMonth() && payoutDate.getFullYear() === now.getFullYear()
  }).length

  const totalAmount = MOCK_PAYOUTS.reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = getPendingApprovalPayouts().reduce((sum, p) => sum + p.amount, 0)
  const completedAmount = getPayoutsByStatus('completed').reduce((sum, p) => sum + p.amount, 0)

  const activeVendors = getActiveVendors().length
  const totalVendorsPaid = MOCK_VENDORS.reduce((sum, v) => sum + v.totalPaid, 0)

  // Recent payouts (last 5)
  const recentPayouts = [...MOCK_PAYOUTS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Pending approvals (first 5)
  const pendingApprovals = getPendingApprovalPayouts().slice(0, 5)

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'approved':
        return 'info'
      case 'pending-approval':
        return 'warning'
      case 'processing':
        return 'primary'
      case 'draft':
        return 'default'
      case 'failed':
        return 'error'
      case 'cancelled':
        return 'default'
      default:
        return 'default'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'salary':
        return 'text-blue-600 dark:text-blue-400'
      case 'commission':
        return 'text-green-600 dark:text-green-400'
      case 'invoice':
        return 'text-purple-600 dark:text-purple-400'
      case 'refund':
        return 'text-orange-600 dark:text-orange-400'
      case 'contractor-payment':
        return 'text-indigo-600 dark:text-indigo-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
              Payouts
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Manage vendor payments and disbursements
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/payouts/create')}
            className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Create Payout</span>
          </button>
          <button
            onClick={() => router.push('/payouts/batch')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Create Batch</span>
          </button>
          <button
            onClick={() => router.push('/payouts/vendors')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Vendors</span>
          </button>
          <button
            onClick={() => router.push('/payouts/list')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <List className="w-3.5 h-3.5" />
            <span>All Payouts</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-3">
          <div
            className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer"
            onClick={() => router.push('/payouts/list')}
          >
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {formatNumber(totalPayouts)}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Total Payouts
            </div>
          </div>

          <div
            className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer"
            onClick={() => router.push('/payouts/approvals')}
          >
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {formatNumber(pendingApproval)}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Pending Approval
            </div>
          </div>

          <div
            className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer"
            onClick={() => router.push('/payouts/list')}
          >
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {formatNumber(completedThisMonth)}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Completed This Month
            </div>
          </div>

          <div
            className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-3.5 border border-gray-200/60 dark:border-gray-700/40 hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer"
            onClick={() => router.push('/payouts/list')}
          >
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {formatCurrency(totalAmount, 'USD')}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Total Amount
            </div>
          </div>
        </div>

        {/* Payment Status Breakdown */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-500/20 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                  {formatCurrency(pendingAmount, 'USD')}
                </div>
                <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Pending Amount</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-500/20 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                  {formatCurrency(completedAmount, 'USD')}
                </div>
                <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Completed Amount</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-50 dark:bg-teal-500/20 rounded-lg flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                  {formatNumber(activeVendors)}
                </div>
                <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Active Vendors</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Recent Payouts */}
          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/40 overflow-hidden">
            <div className="p-4 border-b border-gray-200/60 dark:border-gray-700/40">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                  Recent Payouts
                </h3>
                <button
                  onClick={() => router.push('/payouts/list')}
                  className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200/60 dark:divide-gray-700/40">
              {recentPayouts.map((payout) => (
                <div
                  key={payout.id}
                  className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
                  onClick={() => router.push(`/payouts/${payout.id}`)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[13px] font-medium text-gray-900 dark:text-white truncate">
                          {payout.vendorName}
                        </span>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                          payout.status === 'completed' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' :
                          payout.status === 'pending-approval' ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400' :
                          'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                        }`}>
                          {payout.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {payout.referenceNumber}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[13px] font-semibold text-gray-900 dark:text-white tabular-nums">
                        {formatCurrency(payout.amount, payout.currency)}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {formatDate(payout.scheduledDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/40 overflow-hidden">
            <div className="p-4 border-b border-gray-200/60 dark:border-gray-700/40">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                  Pending Approvals
                </h3>
                <button
                  onClick={() => router.push('/payouts/approvals')}
                  className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200/60 dark:divide-gray-700/40">
              {pendingApprovals.length > 0 ? (
                pendingApprovals.map((payout) => (
                  <div
                    key={payout.id}
                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
                    onClick={() => router.push(`/payouts/${payout.id}`)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-gray-900 dark:text-white mb-1 truncate">
                          {payout.vendorName}
                        </div>
                        <div className="text-[11px] text-gray-500 line-clamp-1">
                          {payout.description}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Clock className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                          <span className="text-[11px] text-orange-600 dark:text-orange-400">
                            Awaiting approval
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[13px] font-semibold text-gray-900 dark:text-white tabular-nums mb-2">
                          {formatCurrency(payout.amount, payout.currency)}
                        </div>
                        <button
                          className="px-3 py-1.5 text-[11px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/payouts/${payout.id}`)
                          }}
                        >
                          <Eye className="w-3 h-3" />
                          <span>Review</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-[13px] text-gray-600 dark:text-gray-400">No pending approvals</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-4 gap-3">
          <div
            className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/40 hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer"
            onClick={() => router.push('/payouts/vendors')}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-gray-900 dark:text-white">Vendors</div>
                <div className="text-[11px] text-gray-500">
                  Manage vendors
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/40 hover:border-purple-300 dark:hover:border-purple-600 transition-all cursor-pointer"
            onClick={() => router.push('/payouts/list')}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-purple-50 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
                <List className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-gray-900 dark:text-white">All Payouts</div>
                <div className="text-[11px] text-gray-500">
                  View all payouts
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/40 hover:border-green-300 dark:hover:border-green-600 transition-all cursor-pointer"
            onClick={() => router.push('/payouts/batch')}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-gray-900 dark:text-white">Batch Payouts</div>
                <div className="text-[11px] text-gray-500">
                  Bulk processing
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-white dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/40 hover:border-orange-300 dark:hover:border-orange-600 transition-all cursor-pointer"
            onClick={() => router.push('/payouts/approvals')}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 bg-orange-50 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-gray-900 dark:text-white">Approvals</div>
                <div className="text-[11px] text-gray-500">
                  Pending approvals
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
