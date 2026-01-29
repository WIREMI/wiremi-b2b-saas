'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Send,
  Calendar,
  User,
  DollarSign,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Modal from '@/components/ui/modal'
import Select from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'
import { formatCurrency } from '@/lib/utils'

interface PaymentTemplate {
  id: string
  name: string
  description: string
  recipientName: string
  recipientEmail: string
  recipientAccount: string
  amount: number
  currency: string
  wallet: string
  frequency: 'one-time' | 'weekly' | 'monthly' | 'quarterly'
  lastUsed?: Date
  timesUsed: number
  category: 'vendor' | 'payroll' | 'subscription' | 'other'
}

export default function PaymentTemplatesPage() {
  const { showToast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<PaymentTemplate | null>(null)

  // New template form
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    recipientName: '',
    recipientEmail: '',
    recipientAccount: '',
    amount: '',
    currency: 'USD',
    wallet: '',
    frequency: 'one-time',
    category: 'other',
  })

  // Mock templates
  const templates: PaymentTemplate[] = [
    {
      id: '1',
      name: 'Monthly Office Rent',
      description: 'Regular monthly rent payment to landlord',
      recipientName: 'Property Management Inc.',
      recipientEmail: 'billing@propertymanagement.com',
      recipientAccount: '****5678',
      amount: 5000,
      currency: 'USD',
      wallet: 'Main Operating Account',
      frequency: 'monthly',
      lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      timesUsed: 24,
      category: 'vendor',
    },
    {
      id: '2',
      name: 'Contractor Payment - John Doe',
      description: 'Weekly payment to freelance developer',
      recipientName: 'John Doe',
      recipientEmail: 'john@freelancer.com',
      recipientAccount: '****1234',
      amount: 2500,
      currency: 'USD',
      wallet: 'Main Operating Account',
      frequency: 'weekly',
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      timesUsed: 48,
      category: 'payroll',
    },
    {
      id: '3',
      name: 'Software Subscription - SaaS Tool',
      description: 'Monthly subscription for project management software',
      recipientName: 'SaaS Provider Ltd.',
      recipientEmail: 'billing@saasprovider.com',
      recipientAccount: '****9012',
      amount: 299,
      currency: 'USD',
      wallet: 'Main Operating Account',
      frequency: 'monthly',
      lastUsed: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      timesUsed: 12,
      category: 'subscription',
    },
    {
      id: '4',
      name: 'Quarterly Tax Payment',
      description: 'Estimated quarterly tax payment',
      recipientName: 'Tax Authority',
      recipientEmail: 'payments@taxauthority.gov',
      recipientAccount: '****3456',
      amount: 15000,
      currency: 'USD',
      wallet: 'Main Operating Account',
      frequency: 'quarterly',
      lastUsed: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      timesUsed: 8,
      category: 'other',
    },
    {
      id: '5',
      name: 'Supplier Payment - Tech Supplies',
      description: 'Monthly order from tech equipment supplier',
      recipientName: 'Tech Supplies Co.',
      recipientEmail: 'orders@techsupplies.com',
      recipientAccount: '****7890',
      amount: 3500,
      currency: 'USD',
      wallet: 'Main Operating Account',
      frequency: 'monthly',
      lastUsed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      timesUsed: 18,
      category: 'vendor',
    },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'all' || template.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = (template: PaymentTemplate) => {
    showToast({
      type: 'success',
      title: 'Template Loaded',
      message: `Payment details from "${template.name}" have been loaded`,
    })
    // In real app, would navigate to payment form with pre-filled data
  }

  const handleDuplicateTemplate = (template: PaymentTemplate) => {
    showToast({
      type: 'success',
      title: 'Template Duplicated',
      message: `Created a copy of "${template.name}"`,
    })
  }

  const handleDeleteTemplate = () => {
    if (selectedTemplate) {
      showToast({
        type: 'success',
        title: 'Template Deleted',
        message: `"${selectedTemplate.name}" has been deleted`,
      })
      setShowDeleteModal(false)
      setSelectedTemplate(null)
    }
  }

  const handleCreateTemplate = () => {
    showToast({
      type: 'success',
      title: 'Template Created',
      message: `"${newTemplate.name}" has been created successfully`,
    })
    setShowCreateModal(false)
    setNewTemplate({
      name: '',
      description: '',
      recipientName: '',
      recipientEmail: '',
      recipientAccount: '',
      amount: '',
      currency: 'USD',
      wallet: '',
      frequency: 'one-time',
      category: 'other',
    })
  }

  const getCategoryBadge = (category: string) => {
    const variants: Record<string, any> = {
      vendor: 'info',
      payroll: 'success',
      subscription: 'warning',
      other: 'default',
    }
    return variants[category] || 'default'
  }

  const getFrequencyLabel = (frequency: string) => {
    const labels: Record<string, string> = {
      'one-time': 'One-time',
      weekly: 'Weekly',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
    }
    return labels[frequency] || frequency
  }

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Templates
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Save and reuse payment details for recurring transactions
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => setShowCreateModal(true)}
          >
            Create Template
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-500" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Templates</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {templates.length}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-success" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Recurring</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {templates.filter(t => t.frequency !== 'one-time').length}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-warning" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Times Used</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {templates.reduce((sum, t) => sum + t.timesUsed, 0)}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-error" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Total</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(
                templates
                  .filter(t => t.frequency === 'monthly')
                  .reduce((sum, t) => sum + t.amount, 0),
                'USD'
              )}
            </p>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5" />}
            iconPosition="left"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'primary' : 'outline'}
            size="md"
            onClick={() => setSelectedCategory('all')}
          >
            All
          </Button>
          <Button
            variant={selectedCategory === 'vendor' ? 'primary' : 'outline'}
            size="md"
            onClick={() => setSelectedCategory('vendor')}
          >
            Vendors
          </Button>
          <Button
            variant={selectedCategory === 'payroll' ? 'primary' : 'outline'}
            size="md"
            onClick={() => setSelectedCategory('payroll')}
          >
            Payroll
          </Button>
          <Button
            variant={selectedCategory === 'subscription' ? 'primary' : 'outline'}
            size="md"
            onClick={() => setSelectedCategory('subscription')}
          >
            Subscriptions
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} variant="interactive" className="p-5 transition-all">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <Badge variant={getCategoryBadge(template.category)} size="sm">
                    {template.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {template.description}
                </p>
              </div>
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<MoreVertical className="w-4 h-4" />}
                />
                <div className="hidden group-hover:block absolute right-0 top-full mt-1 w-48 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-xl z-10">
                  <button
                    onClick={() => handleDuplicateTemplate(template)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                  <button
                    onClick={() => {}}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(template)
                      setShowDeleteModal(true)
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error/5 transition-colors rounded-b-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200 dark:border-dark-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Recipient</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {template.recipientName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Amount</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(template.amount, template.currency)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Frequency</span>
                <Badge variant="default" size="sm">
                  {getFrequencyLabel(template.frequency)}
                </Badge>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                {template.lastUsed ? (
                  <span>Last used {template.lastUsed.toLocaleDateString()}</span>
                ) : (
                  <span>Never used</span>
                )}
                <span className="mx-2">•</span>
                <span>Used {template.timesUsed} times</span>
              </div>
              <Button
                variant="primary"
                size="sm"
                icon={<Send className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => handleUseTemplate(template)}
              >
                Use Template
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No templates found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchQuery ? `No templates match "${searchQuery}"` : 'Create your first payment template to get started'}
          </p>
          {!searchQuery && (
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setShowCreateModal(true)}
            >
              Create Template
            </Button>
          )}
        </Card>
      )}

      {/* Create Template Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Payment Template"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Template Name"
            placeholder="e.g., Monthly Office Rent"
            value={newTemplate.name}
            onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Brief description of this payment"
              value={newTemplate.description}
              onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Recipient Name"
              placeholder="John Doe"
              value={newTemplate.recipientName}
              onChange={(e) => setNewTemplate({...newTemplate, recipientName: e.target.value})}
              required
            />

            <Input
              label="Recipient Email"
              type="email"
              placeholder="recipient@example.com"
              value={newTemplate.recipientEmail}
              onChange={(e) => setNewTemplate({...newTemplate, recipientEmail: e.target.value})}
              required
            />

            <Input
              label="Account Number"
              placeholder="1234567890"
              value={newTemplate.recipientAccount}
              onChange={(e) => setNewTemplate({...newTemplate, recipientAccount: e.target.value})}
              required
            />

            <Input
              label="Amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={newTemplate.amount}
              onChange={(e) => setNewTemplate({...newTemplate, amount: e.target.value})}
              required
            />

            <Select
              label="Frequency"
              options={[
                { value: 'one-time', label: 'One-time' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'quarterly', label: 'Quarterly' },
              ]}
              value={newTemplate.frequency}
              onChange={(e) => setNewTemplate({...newTemplate, frequency: e.target.value})}
            />

            <Select
              label="Category"
              options={[
                { value: 'vendor', label: 'Vendor' },
                { value: 'payroll', label: 'Payroll' },
                { value: 'subscription', label: 'Subscription' },
                { value: 'other', label: 'Other' },
              ]}
              value={newTemplate.category}
              onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowCreateModal(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleCreateTemplate}
            className="flex-1"
          >
            Create Template
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Template"
        size="md"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete "{selectedTemplate?.name}"? This action cannot be undone.
        </p>

        <div className="flex gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowDeleteModal(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="lg"
            onClick={handleDeleteTemplate}
            className="flex-1"
          >
            Delete Template
          </Button>
        </div>
      </Modal>
    </PageLayout>
  )
}
