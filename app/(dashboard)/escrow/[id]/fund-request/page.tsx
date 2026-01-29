'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import EmptyState from '@/components/ui/empty-state'
import {
  Shield,
  ArrowLeft,
  DollarSign,
  FileText,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Send,
  Plus
} from 'lucide-react'
import { getEscrowById } from '@/lib/mock-data/escrow'
import type { ConditionStatus } from '@/types/escrow'

interface Props {
  params: Promise<{ id: string }>
}

interface FundRequestForm {
  amount: string
  reason: string
  description: string
  conditionsMet: string[]
  documents: {
    id: string
    name: string
    size: number
    type: string
  }[]
}

const INITIAL_FORM: FundRequestForm = {
  amount: '',
  reason: '',
  description: '',
  conditionsMet: [],
  documents: []
}

export default function FundRequestPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const [formData, setFormData] = useState<FundRequestForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const escrow = getEscrowById(id)

  if (!escrow) {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Escrow Not Found
          </h1>
        </div>
        <EmptyState
          icon={<Shield className="w-12 h-12" />}
          title="Escrow not found"
          description="The escrow you're looking for doesn't exist or you don't have access to it."
          action={{
            label: 'Back to Escrows',
            onClick: () => router.push('/escrow'),
            icon: <ArrowLeft className="w-4 h-4" />
          }}
        />
      </PageLayout>
    )
  }

  // Check if user can request funds
  const currentUserId = 'user-beneficiary-designpro' // Mock - in real app from auth
  const isBeneficiary = escrow.beneficiary.userId === currentUserId

  if (!isBeneficiary) {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h1>
        </div>
        <EmptyState
          icon={<AlertCircle className="w-12 h-12" />}
          title="Access denied"
          description="Only the beneficiary can request funds from this escrow."
          action={{
            label: 'Back to Escrow',
            onClick: () => router.push(`/escrow/${id}`),
            icon: <ArrowLeft className="w-4 h-4" />
          }}
        />
      </PageLayout>
    )
  }

  if (escrow.state !== 'FUNDED') {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cannot Request Funds
          </h1>
        </div>
        <EmptyState
          icon={<AlertCircle className="w-12 h-12" />}
          title="Cannot request funds"
          description={`This escrow must be in FUNDED state to request funds. Current state: ${escrow.state}`}
          action={{
            label: 'Back to Escrow',
            onClick: () => router.push(`/escrow/${id}`),
            icon: <ArrowLeft className="w-4 h-4" />
          }}
        />
      </PageLayout>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: escrow.currency
    }).format(amount)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    } else if (parseFloat(formData.amount) > escrow.remainingAmount) {
      newErrors.amount = `Amount cannot exceed ${formatCurrency(escrow.remainingAmount)}`
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    // Check if required conditions are met
    const requiredConditions = escrow.conditions.filter(c => c.required && c.status !== 'MET')
    if (requiredConditions.length > 0) {
      newErrors.conditions = 'All required conditions must be met before requesting funds'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Submitting fund request:', formData)

    // In real app, this would create the fund request via API
    // Then redirect to escrow details
    router.push(`/escrow/${id}`)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newDocuments = Array.from(files).map((file, index) => ({
      id: `doc-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type
    }))

    setFormData({
      ...formData,
      documents: [...formData.documents, ...newDocuments]
    })
  }

  const removeDocument = (docId: string) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter(d => d.id !== docId)
    })
  }

  const toggleCondition = (conditionId: string) => {
    const isSelected = formData.conditionsMet.includes(conditionId)
    setFormData({
      ...formData,
      conditionsMet: isSelected
        ? formData.conditionsMet.filter(id => id !== conditionId)
        : [...formData.conditionsMet, conditionId]
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const metConditions = escrow.conditions.filter(c => c.status === 'MET')
  const pendingConditions = escrow.conditions.filter(c => c.status === 'PENDING')
  const requiredPendingConditions = pendingConditions.filter(c => c.required)

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Request Funds
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Request release of funds from {escrow.name}
        </p>
      </div>

      {/* Header */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => router.push(`/escrow/${id}`)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Escrow
        </Button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Request Funds
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {escrow.name} • {escrow.escrowId}
            </p>
          </div>
        </div>
      </div>

      {/* Available Amount Card */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Available to Request</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
              {formatCurrency(escrow.remainingAmount)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
              of {formatCurrency(escrow.totalAmount)} total
            </p>
          </div>
          <DollarSign className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
      </Card>

      {/* Conditions Check */}
      {escrow.conditions.length > 0 && (
        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Release Conditions
          </h3>

          {requiredPendingConditions.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900 dark:text-red-200">
                  Required conditions not met
                </p>
                <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                  {requiredPendingConditions.length} required condition{requiredPendingConditions.length > 1 ? 's' : ''} must be met before requesting funds
                </p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {escrow.conditions.map((condition) => (
              <div
                key={condition.id}
                className={`p-3 rounded-lg border ${
                  condition.status === 'MET'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  {condition.status === 'MET' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {condition.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={condition.status === 'MET' ? 'success' : 'warning'}
                      >
                        {condition.status}
                      </Badge>
                      {condition.required && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Request Form */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Fund Request Details
        </h3>

        <div className="space-y-6">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Request Amount *
            </label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              icon={<DollarSign className="w-4 h-4" />}
              iconPosition="left"
              error={errors.amount}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
              Maximum: {formatCurrency(escrow.remainingAmount)}
            </p>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reason for Request *
            </label>
            <Input
              type="text"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="e.g., Milestone 1: Design Phase Completion"
              error={errors.reason}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Detailed Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide detailed information about the work completed and why funds should be released..."
              rows={5}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.description
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500`}
            />
            {errors.description && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Supporting Documents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Supporting Documents
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Upload proof of work, invoices, or milestone evidence
              </p>
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors inline-block">
                  Choose Files
                </span>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                />
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-2">
                PDF, Word, Images, or ZIP files
              </p>
            </div>

            {/* Uploaded Files */}
            {formData.documents.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          {formatFileSize(doc.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(doc.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conditions Error */}
          {errors.conditions && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-900 dark:text-red-200">
                {errors.conditions}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={() => router.push(`/escrow/${id}`)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting || requiredPendingConditions.length > 0}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Fund Request
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
