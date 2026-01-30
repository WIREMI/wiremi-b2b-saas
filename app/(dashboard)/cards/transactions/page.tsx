'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import {
  Search,
  Filter,
  Download,
  Receipt,
  AlertTriangle,
  Check,
  X,
  Clock,
  ArrowLeft,
  FileText,
  Calendar,
  DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { mockTransactions } from '@/lib/mock-data/corporate-cards'
import {
  getTransactionStatusColor,
  formatCurrency,
} from '@/types/corporate-cards'
import type { TransactionStatus, TransactionCategory } from '@/types/corporate-cards'

export default function TransactionsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'ALL'>('ALL')
  const [categoryFilter, setCategoryFilter] = useState<TransactionCategory | 'ALL'>('ALL')

  // Filter transactions
  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesSearch =
      txn.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.cardholderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.cardLastFour.includes(searchTerm)

    const matchesStatus = statusFilter === 'ALL' || txn.status === statusFilter
    const matchesCategory = categoryFilter === 'ALL' || txn.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Calculate stats
  const totalAmount = filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0)
  const pendingCount = filteredTransactions.filter((txn) => txn.status === 'PENDING').length
  const disputedCount = filteredTransactions.filter((txn) => txn.status === 'DISPUTED').length
  const completedCount = filteredTransactions.filter((txn) => txn.status === 'COMPLETED').length

  return (
    <PageLayout maxWidth="full">
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Back Navigation */}
        <div className="mb-2">
          <button
            onClick={() => router.push('/cards')}
            className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Corporate Cards</span>
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              All Transactions
            </h1>
            <p className="text-[13px] text-gray-500 mt-0.5">
              View and manage all card transactions
            </p>
          </div>
          <button
            className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-700/50 rounded-lg"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(totalAmount)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {completedCount}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {pendingCount}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-error" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Disputed</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {disputedCount}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by merchant, cardholder, card number, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-4 h-4" />}
                iconPosition="left"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as TransactionStatus | 'ALL')}
                className="px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white"
              >
                <option value="ALL">All Statuses</option>
                <option value="COMPLETED">Completed</option>
                <option value="PENDING">Pending</option>
                <option value="DECLINED">Declined</option>
                <option value="REFUNDED">Refunded</option>
                <option value="DISPUTED">Disputed</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as TransactionCategory | 'ALL')}
                className="px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white"
              >
                <option value="ALL">All Categories</option>
                <option value="ADVERTISING">Advertising</option>
                <option value="SOFTWARE">Software</option>
                <option value="OFFICE_SUPPLIES">Office Supplies</option>
                <option value="TRAVEL">Travel</option>
                <option value="MEALS">Meals</option>
                <option value="ENTERTAINMENT">Entertainment</option>
                <option value="UTILITIES">Utilities</option>
                <option value="SUBSCRIPTIONS">Subscriptions</option>
                <option value="HARDWARE">Hardware</option>
                <option value="PROFESSIONAL_SERVICES">Professional Services</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Cardholder
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No transactions found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Try adjusting your filters or search terms
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((txn) => (
                    <tr
                      key={txn.id}
                      className="hover:bg-gray-50 dark:hover:bg-dark-surface cursor-pointer transition-colors"
                      onClick={() => router.push(`/cards/transactions/${txn.id}`)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {txn.merchantName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {txn.description || txn.merchantCategory}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                            •••• {txn.cardLastFour}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-900 dark:text-white">
                          {txn.cardholderName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="default" size="sm">
                          {txn.category.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-900 dark:text-white">
                            {new Date(txn.transactionDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            {(() => {
                              const date = new Date(txn.transactionDate)
                              const hours = date.getHours()
                              const minutes = date.getMinutes()
                              const ampm = hours >= 12 ? 'PM' : 'AM'
                              const displayHours = hours % 12 || 12
                              return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`
                            })()}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(txn.amount)}
                          </p>
                          {txn.localAmount && txn.localCurrency !== txn.currency && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                              {formatCurrency(txn.localAmount, txn.localCurrency)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={getTransactionStatusColor(txn.status) as any}>
                          {txn.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {txn.receiptUploaded ? (
                          <div className="flex items-center gap-1 text-success">
                            <Receipt className="w-4 h-4" />
                            <span className="text-sm">Yes</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">No</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
