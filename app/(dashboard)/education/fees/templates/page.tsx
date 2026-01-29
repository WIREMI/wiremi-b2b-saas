'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Tag, Check, FileText } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MOCK_FEE_TEMPLATES } from '@/lib/mock-data/education-institutions'
import { formatCurrency } from '@/lib/utils'

export default function FeeTemplatesPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handleApplyTemplate = (templateId: string) => {
    console.log('Applying template:', templateId)
    // In production, this would:
    // 1. Show a modal to select institution/faculty/department
    // 2. Create all fee items from the template
    // 3. Redirect to fee list with success message
    alert('Template application would show a modal to select institution hierarchy')
  }

  const getTotalAmount = (templateId: string) => {
    const template = MOCK_FEE_TEMPLATES.find((t) => t.id === templateId)
    if (!template) return 0
    return template.feeItems.reduce((sum, item) => sum + item.amount, 0)
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/education/fees')}
          >
            Back to Fee Structures
          </Button>

          <div className="mt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Fee Templates
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Pre-configured fee packages for quick setup
            </p>
          </div>
        </div>

        {/* Info Card */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                How Templates Work
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Templates provide pre-configured fee packages based on common educational programs.
                Select a template and apply it to a department to automatically create all fee items
                with recommended amounts and payment configurations.
              </p>
            </div>
          </div>
        </Card>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {MOCK_FEE_TEMPLATES.map((template) => {
            const totalAmount = getTotalAmount(template.id)
            const mandatoryCount = template.feeItems.filter((f) => f.isMandatory).length
            const installmentCount = template.feeItems.filter((f) => f.paymentType === 'installment').length
            const isSelected = selectedTemplate === template.id

            return (
              <Card
                key={template.id}
                className={`p-6 cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-2 ring-primary-500 shadow-lg'
                    : 'hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Tag className="w-5 h-5 text-primary-600" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {template.name}
                      </h3>
                      {isSelected && <Check className="w-5 h-5 text-primary-600" />}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="info" size="sm">
                        {template.category}
                      </Badge>
                      <Badge variant="default" size="sm">
                        {template.feeItems.length} Fee Items
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Template Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Amount</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(totalAmount, 'XAF')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Mandatory</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {mandatoryCount} items
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Installments</div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {installmentCount} plans
                    </div>
                  </div>
                </div>

                {/* Fee Items List */}
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Included Fees:</h4>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {template.feeItems.map((fee, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded text-sm"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-900 dark:text-white truncate">{fee.name}</span>
                          {fee.isMandatory && (
                            <Badge variant="error" size="sm">M</Badge>
                          )}
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 font-medium ml-2">
                          {formatCurrency(fee.amount, 'XAF')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant={isSelected ? 'primary' : 'outline'}
                  className="w-full"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleApplyTemplate(template.id)
                  }}
                >
                  {isSelected ? 'Apply This Template' : 'Select Template'}
                </Button>
              </Card>
            )
          })}
        </div>

        {/* Create Custom Template */}
        <Card className="p-8 text-center border-dashed border-2 border-gray-300 dark:border-gray-700">
          <Tag className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Need a Custom Template?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your own fee template based on your institution's specific needs
          </p>
          <Button
            variant="outline"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
          >
            Create Custom Template
          </Button>
        </Card>
      </div>
    </PageLayout>
  )
}
