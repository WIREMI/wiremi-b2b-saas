'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  FileText,
  Plus,
  Trash2,
  Check,
  ChevronDown,
  Info,
  Eye,
  Download,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Table,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'

interface ReportField {
  id: string
  name: string
  type: 'text' | 'number' | 'date' | 'currency'
  aggregate?: 'sum' | 'average' | 'count' | 'min' | 'max'
}

interface ReportFilter {
  id: string
  field: string
  operator: string
  value: string
}

type ReportStep = 1 | 2 | 3

export default function CustomReportBuilderPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [currentStep, setCurrentStep] = useState<ReportStep>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [reportName, setReportName] = useState('')
  const [reportDescription, setReportDescription] = useState('')
  const [reportCategory, setReportCategory] = useState('')
  const [dataSource, setDataSource] = useState('')
  const [reportType, setReportType] = useState('')
  const [dateRange, setDateRange] = useState('')
  const [groupBy, setGroupBy] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  const [selectedFields, setSelectedFields] = useState<ReportField[]>([])
  const [filters, setFilters] = useState<ReportFilter[]>([])

  // Available data sources
  const dataSources = [
    { value: '', label: 'Select data source' },
    { value: 'transactions', label: 'Transactions' },
    { value: 'wallets', label: 'Wallets' },
    { value: 'employees', label: 'Employees' },
    { value: 'payroll', label: 'Payroll' },
    { value: 'team', label: 'Team Members' },
  ]

  const categories = [
    { value: '', label: 'Select category' },
    { value: 'financial', label: 'Financial' },
    { value: 'hr', label: 'HR & Payroll' },
    { value: 'operations', label: 'Operations' },
    { value: 'custom', label: 'Custom' },
  ]

  const reportTypes = [
    { value: '', label: 'Select type' },
    { value: 'table', label: 'Table Report' },
    { value: 'summary', label: 'Summary Report' },
    { value: 'chart', label: 'Chart Report' },
  ]

  const dateRanges = [
    { value: '', label: 'Select date range' },
    { value: 'today', label: 'Today' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'ytd', label: 'Year to date' },
    { value: 'custom', label: 'Custom range' },
  ]

  // Available fields based on data source
  const availableFields: Record<string, ReportField[]> = {
    transactions: [
      { id: '1', name: 'Transaction ID', type: 'text' },
      { id: '2', name: 'Amount', type: 'currency', aggregate: 'sum' },
      { id: '3', name: 'Fee', type: 'currency', aggregate: 'sum' },
      { id: '4', name: 'Date', type: 'date' },
      { id: '5', name: 'Status', type: 'text' },
      { id: '6', name: 'Type', type: 'text' },
      { id: '7', name: 'Category', type: 'text' },
    ],
    employees: [
      { id: '1', name: 'Employee Name', type: 'text' },
      { id: '2', name: 'Employee ID', type: 'text' },
      { id: '3', name: 'Department', type: 'text' },
      { id: '4', name: 'Position', type: 'text' },
      { id: '5', name: 'Salary', type: 'currency', aggregate: 'average' },
      { id: '6', name: 'Start Date', type: 'date' },
      { id: '7', name: 'Status', type: 'text' },
    ],
  }

  const filterOperators = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
  ]

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!reportName.trim()) newErrors.reportName = 'Report name is required'
    if (!reportCategory) newErrors.reportCategory = 'Category is required'
    if (!dataSource) newErrors.dataSource = 'Data source is required'
    if (!reportType) newErrors.reportType = 'Report type is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (selectedFields.length === 0) {
      newErrors.fields = 'Select at least one field'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false

    switch (currentStep) {
      case 1:
        isValid = validateStep1()
        break
      case 2:
        isValid = validateStep2()
        break
    }

    if (isValid) {
      setCurrentStep((currentStep + 1) as ReportStep)
    } else {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please complete all required fields',
      })
    }
  }

  const handleBack = () => {
    setCurrentStep((currentStep - 1) as ReportStep)
    setErrors({})
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      showToast({
        type: 'success',
        title: 'Report Created',
        message: `${reportName} has been created successfully`,
      })

      setTimeout(() => {
        router.push('/reports')
      }, 1500)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Create Report',
        message: 'Please try again',
      })
      setIsLoading(false)
    }
  }

  const addField = (field: ReportField) => {
    if (!selectedFields.find((f) => f.id === field.id)) {
      setSelectedFields([...selectedFields, field])
      setErrors((prev) => ({ ...prev, fields: '' }))
    }
  }

  const removeField = (fieldId: string) => {
    setSelectedFields(selectedFields.filter((f) => f.id !== fieldId))
  }

  const addFilter = () => {
    const newFilter: ReportFilter = {
      id: Date.now().toString(),
      field: '',
      operator: '',
      value: '',
    }
    setFilters([...filters, newFilter])
  }

  const removeFilter = (filterId: string) => {
    setFilters(filters.filter((f) => f.id !== filterId))
  }

  const updateFilter = (filterId: string, key: keyof ReportFilter, value: string) => {
    setFilters(
      filters.map((f) => (f.id === filterId ? { ...f, [key]: value } : f))
    )
  }

  const steps = [
    { number: 1, label: 'Basic Info', icon: FileText },
    { number: 2, label: 'Configure Fields', icon: Table },
    { number: 3, label: 'Preview & Create', icon: Eye },
  ]

  return (
    <PageLayout maxWidth="normal">
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
          Back to Reports
        </Button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Custom Report Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create a custom report tailored to your needs
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.number
              const isCompleted = currentStep > step.number

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-success border-success'
                          : isActive
                          ? 'bg-primary-500 border-primary-500'
                          : 'bg-gray-50 dark:bg-dark-surface border-gray-300 dark:border-dark-border'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <Icon
                          className={`w-6 h-6 ${
                            isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'
                          }`}
                        />
                      )}
                    </div>
                    <p
                      className={`text-sm font-medium mt-2 ${
                        isActive || isCompleted
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 dark:text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 -mt-6 ${
                        isCompleted
                          ? 'bg-success'
                          : 'bg-gray-300 dark:bg-dark-border'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Form */}
      <Card className="p-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Report Information
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Define the basic details of your report
                </p>
              </div>

              <Input
                label="Report Name"
                placeholder="e.g., Monthly Revenue by Department"
                value={reportName}
                onChange={(e) => {
                  setReportName(e.target.value)
                  setErrors((prev) => ({ ...prev, reportName: '' }))
                }}
                error={errors.reportName}
                icon={<FileText className="w-5 h-5" />}
                iconPosition="left"
                required
                autoFocus
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what this report will show..."
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Category"
                  options={categories}
                  value={reportCategory}
                  onChange={(e) => {
                    setReportCategory(e.target.value)
                    setErrors((prev) => ({ ...prev, reportCategory: '' }))
                  }}
                  error={errors.reportCategory}
                  required
                />
                <Select
                  label="Report Type"
                  options={reportTypes}
                  value={reportType}
                  onChange={(e) => {
                    setReportType(e.target.value)
                    setErrors((prev) => ({ ...prev, reportType: '' }))
                  }}
                  error={errors.reportType}
                  required
                />
              </div>

              <Select
                label="Data Source"
                options={dataSources}
                value={dataSource}
                onChange={(e) => {
                  setDataSource(e.target.value)
                  setSelectedFields([])
                  setErrors((prev) => ({ ...prev, dataSource: '' }))
                }}
                error={errors.dataSource}
                helperText="Choose the primary data source for this report"
                required
              />

              <Select
                label="Date Range"
                options={dateRanges}
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              />

              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleNext}
                  disabled={!dataSource}
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Configure Fields */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Configure Report Fields
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Select the data fields to include in your report
                </p>
              </div>

              {/* Available Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Available Fields
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableFields[dataSource]?.map((field) => (
                    <button
                      key={field.id}
                      type="button"
                      onClick={() => addField(field)}
                      disabled={selectedFields.find((f) => f.id === field.id) !== undefined}
                      className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all text-left ${
                        selectedFields.find((f) => f.id === field.id)
                          ? 'border-success bg-success/5 cursor-not-allowed'
                          : 'border-gray-200 dark:border-dark-border hover:border-primary-500 cursor-pointer'
                      }`}
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {field.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          {field.type} {field.aggregate && `(${field.aggregate})`}
                        </p>
                      </div>
                      {selectedFields.find((f) => f.id === field.id) && (
                        <Check className="w-5 h-5 text-success" />
                      )}
                    </button>
                  ))}
                </div>
                {errors.fields && (
                  <p className="mt-2 text-sm text-error">{errors.fields}</p>
                )}
              </div>

              {/* Selected Fields */}
              {selectedFields.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Selected Fields ({selectedFields.length})
                  </label>
                  <div className="space-y-2">
                    {selectedFields.map((field) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-500/10 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {field.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            {field.type} {field.aggregate && `(${field.aggregate})`}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Trash2 className="w-4 h-4" />}
                          onClick={() => removeField(field.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Filters */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filters (Optional)
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    icon={<Plus className="w-4 h-4" />}
                    iconPosition="left"
                    onClick={addFilter}
                  >
                    Add Filter
                  </Button>
                </div>
                {filters.length > 0 && (
                  <div className="space-y-3">
                    {filters.map((filter) => (
                      <div key={filter.id} className="flex items-end gap-3">
                        <div className="flex-1">
                          <Select
                            label="Field"
                            options={[
                              { value: '', label: 'Select field' },
                              ...(availableFields[dataSource]?.map((f) => ({
                                value: f.id,
                                label: f.name,
                              })) || []),
                            ]}
                            value={filter.field}
                            onChange={(e) => updateFilter(filter.id, 'field', e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <Select
                            label="Operator"
                            options={[{ value: '', label: 'Select operator' }, ...filterOperators]}
                            value={filter.operator}
                            onChange={(e) => updateFilter(filter.id, 'operator', e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            label="Value"
                            placeholder="Enter value"
                            value={filter.value}
                            onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="md"
                          icon={<Trash2 className="w-4 h-4" />}
                          onClick={() => removeFilter(filter.id)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleNext}
                  disabled={selectedFields.length === 0}
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Preview & Create */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Review & Create Report
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Review your report configuration before creating
                </p>
              </div>

              {/* Report Summary */}
              <div className="p-6 bg-gray-50 dark:bg-dark-bg rounded-xl space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Report Name</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{reportName}</p>
                </div>
                {reportDescription && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Description</p>
                    <p className="text-gray-900 dark:text-white">{reportDescription}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {reportCategory}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Type</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {reportType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Data Source</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {dataSource}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date Range</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {dateRange || 'All time'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected Fields */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Report Fields ({selectedFields.length})
                </p>
                <div className="space-y-2">
                  {selectedFields.map((field) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-dark-bg rounded-lg"
                    >
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {field.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filters */}
              {filters.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Filters ({filters.length})
                  </p>
                  <div className="space-y-2">
                    {filters.map((filter) => (
                      <div
                        key={filter.id}
                        className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-dark-bg rounded-lg"
                      >
                        <Filter className="w-4 h-4 text-primary-500" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {availableFields[dataSource]?.find((f) => f.id === filter.field)?.name}{' '}
                          {filter.operator} {filter.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info Banner */}
              <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-primary-900 dark:text-primary-300">
                    Your custom report will be saved and can be accessed from the Reports dashboard. You can run it anytime to get the latest data.
                  </p>
                </div>
              </div>

              <div className="flex justify-between gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  icon={<Check className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Create Report
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </PageLayout>
  )
}
