'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Layers,
  Upload,
  Plus,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  Download,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import { MOCK_BATCH_PAYOUTS } from '@/lib/mock-data/payouts'

export default function BatchPayoutsPage() {
  const router = useRouter()
  const [showUpload, setShowUpload] = useState(false)

  const totalBatches = MOCK_BATCH_PAYOUTS.length
  const completedBatches = MOCK_BATCH_PAYOUTS.filter((b) => b.status === 'completed').length
  const totalAmount = MOCK_BATCH_PAYOUTS.reduce((sum, b) => sum + b.totalAmount, 0)
  const totalPayouts = MOCK_BATCH_PAYOUTS.reduce((sum, b) => sum + b.totalPayouts, 0)

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'approved':
      case 'processing':
        return 'info'
      case 'pending-approval':
        return 'warning'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Batch Payouts</h1>
            <p className="text-gray-600 dark:text-gray-400">Process multiple payments together</p>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Layers className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(totalBatches)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Batches</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(completedBatches)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(totalPayouts)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Payouts</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(totalAmount, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
          </div>
        </Card>
      </div>

      {/* Create Batch Section */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create New Batch
          </h3>
          <Button
            variant="outline"
            icon={<Upload className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => setShowUpload(!showUpload)}
          >
            {showUpload ? 'Hide Upload' : 'Upload CSV'}
          </Button>
        </div>

        {showUpload ? (
          <div className="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-lg p-12 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Upload CSV File
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Upload a CSV file containing vendor IDs, amounts, and descriptions
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="primary" icon={<Upload className="w-4 h-4" />} iconPosition="left">
                Select File
              </Button>
              <Button variant="outline">Download Template</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              label="Batch Name"
              type="text"
              placeholder="e.g., Monthly Vendor Payments - January 2026"
            />
            <Input
              label="Description (Optional)"
              type="text"
              placeholder="Brief description of this batch"
            />
            <div className="flex gap-3">
              <Button variant="primary" icon={<Plus className="w-4 h-4" />} iconPosition="left">
                Add Payouts to Batch
              </Button>
              <Button variant="outline">Save as Draft</Button>
            </div>
          </div>
        )}
      </Card>

      {/* Batch History */}
      <Card>
        <div className="p-6 border-b border-gray-200 dark:border-dark-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Batch History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Batch Number
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Name
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Payouts
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Total Amount
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BATCH_PAYOUTS.map((batch) => (
                <tr
                  key={batch.id}
                  className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {batch.batchNumber}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {batch.name}
                    </div>
                    {batch.description && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-xs">
                        {batch.description}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {batch.totalPayouts} payouts
                    </div>
                    {batch.successCount !== undefined && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {batch.successCount} success, {batch.failedCount} failed
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(batch.totalAmount, batch.currency)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={getStatusVariant(batch.status)} size="sm">
                      {batch.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatDate(batch.scheduledDate)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Download className="w-4 h-4" />}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageLayout>
  )
}
