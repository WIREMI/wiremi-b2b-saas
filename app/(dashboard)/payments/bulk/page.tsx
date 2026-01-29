'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Upload,
  Download,
  Plus,
  X,
  Send,
  FileText,
  AlertCircle,
  CheckCircle2,
  User,
  Mail,
  DollarSign,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Table from '@/components/ui/table'
import { useToast } from '@/components/ui/toast'
import { formatNumber, isValidEmail } from '@/lib/utils'

interface Recipient {
  id: string
  name: string
  email: string
  accountNumber: string
  amount: number
  currency: string
  status: 'pending' | 'valid' | 'invalid'
  errors?: string[]
}

export default function BulkPayoutsPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [fromWallet, setFromWallet] = useState('')
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  // New recipient form
  const [newRecipient, setNewRecipient] = useState({
    name: '',
    email: '',
    accountNumber: '',
    amount: '',
  })

  // Mock wallets
  const wallets = [
    { value: '1', label: 'Main Operating Account (USD) - $125,430.50' },
    { value: '2', label: 'Euro Operations (EUR) - €87,250.00' },
    { value: '3', label: 'UK Payroll (GBP) - £45,890.25' },
  ]

  const validateRecipient = (recipient: Omit<Recipient, 'id' | 'status' | 'errors'>): { valid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!recipient.name.trim()) errors.push('Name is required')
    if (!recipient.email.trim()) {
      errors.push('Email is required')
    } else if (!isValidEmail(recipient.email)) {
      errors.push('Invalid email format')
    }
    if (!recipient.accountNumber.trim()) errors.push('Account number is required')
    if (recipient.amount <= 0) errors.push('Amount must be greater than 0')

    return { valid: errors.length === 0, errors }
  }

  const addRecipient = () => {
    const recipientData = {
      name: newRecipient.name,
      email: newRecipient.email,
      accountNumber: newRecipient.accountNumber,
      amount: parseFloat(newRecipient.amount),
      currency: 'USD',
    }

    const validation = validateRecipient(recipientData)

    const recipient: Recipient = {
      id: Date.now().toString(),
      ...recipientData,
      status: validation.valid ? 'valid' : 'invalid',
      errors: validation.errors,
    }

    setRecipients([...recipients, recipient])
    setNewRecipient({ name: '', email: '', accountNumber: '', amount: '' })
    setShowAddForm(false)

    showToast({
      type: validation.valid ? 'success' : 'warning',
      title: validation.valid ? 'Recipient Added' : 'Recipient Added with Errors',
      message: validation.valid ? 'Recipient has been added successfully' : 'Please fix the errors before processing',
    })
  }

  const removeRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Simulate CSV parsing
    showToast({
      type: 'info',
      title: 'Processing File',
      message: 'Parsing CSV file...',
    })

    setTimeout(() => {
      const mockRecipients: Recipient[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          accountNumber: '1234567890',
          amount: 500,
          currency: 'USD',
          status: 'valid',
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          accountNumber: '0987654321',
          amount: 750,
          currency: 'USD',
          status: 'valid',
        },
        {
          id: '3',
          name: 'Bob Johnson',
          email: 'invalid-email',
          accountNumber: '5555555555',
          amount: 1000,
          currency: 'USD',
          status: 'invalid',
          errors: ['Invalid email format'],
        },
      ]

      setRecipients([...recipients, ...mockRecipients])
      showToast({
        type: 'success',
        title: 'File Imported',
        message: `${mockRecipients.length} recipients imported`,
      })
    }, 1500)
  }

  const downloadTemplate = () => {
    const csv = 'Name,Email,Account Number,Amount\nJohn Doe,john@example.com,1234567890,500.00\nJane Smith,jane@example.com,0987654321,750.00'
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'bulk-payout-template.csv'
    a.click()
    window.URL.revokeObjectURL(url)

    showToast({
      type: 'success',
      title: 'Template Downloaded',
      message: 'CSV template has been downloaded',
    })
  }

  const calculateTotals = () => {
    const total = recipients.reduce((sum, r) => sum + r.amount, 0)
    const valid = recipients.filter(r => r.status === 'valid').length
    const invalid = recipients.filter(r => r.status === 'invalid').length

    return { total, valid, invalid, count: recipients.length }
  }

  const totals = calculateTotals()

  const handleSubmit = async () => {
    if (!fromWallet) {
      showToast({
        type: 'error',
        title: 'No Wallet Selected',
        message: 'Please select a wallet to send from',
      })
      return
    }

    if (recipients.length === 0) {
      showToast({
        type: 'error',
        title: 'No Recipients',
        message: 'Please add at least one recipient',
      })
      return
    }

    if (totals.invalid > 0) {
      showToast({
        type: 'error',
        title: 'Invalid Recipients',
        message: `Please fix ${totals.invalid} invalid recipient(s) before proceeding`,
      })
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 3000))

      showToast({
        type: 'success',
        title: 'Bulk Payout Initiated',
        message: `${totals.count} payments totaling $${formatNumber(totals.total)} are being processed`,
      })

      setTimeout(() => {
        router.push('/transactions')
      }, 1500)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Payout Failed',
        message: 'Unable to process bulk payout. Please try again.',
      })
      setIsLoading(false)
    }
  }

  const columns = [
    {
      key: 'name',
      label: 'Recipient',
      render: (r: Recipient) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {r.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
            {r.email}
          </p>
        </div>
      ),
    },
    {
      key: 'accountNumber',
      label: 'Account',
      render: (r: Recipient) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          ****{r.accountNumber.slice(-4)}
        </span>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      className: 'text-right',
      render: (r: Recipient) => (
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          ${formatNumber(r.amount)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (r: Recipient) => (
        <Badge
          variant={r.status === 'valid' ? 'success' : 'error'}
          size="sm"
        >
          {r.status === 'valid' ? (
            <><CheckCircle2 className="w-3 h-3 mr-1" /> Valid</>
          ) : (
            <><AlertCircle className="w-3 h-3 mr-1" /> Invalid</>
          )}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: '',
      className: 'text-right',
      render: (r: Recipient) => (
        <Button
          variant="ghost"
          size="sm"
          icon={<X className="w-4 h-4" />}
          onClick={() => removeRecipient(r.id)}
        />
      ),
    },
  ]

  return (
    <PageLayout maxWidth="wide">
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
          Back
        </Button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bulk Payouts
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Send payments to multiple recipients at once
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-4 h-4" />}
              iconPosition="left"
              onClick={downloadTemplate}
            >
              Download Template
            </Button>
            <label>
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button
                variant="outline"
                size="md"
                icon={<Upload className="w-4 h-4" />}
                iconPosition="left"
              >
                Import CSV
              </Button>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wallet Selection */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Payment Source
            </h2>
            <Select
              label="From Wallet"
              options={[
                { value: '', label: 'Select wallet' },
                ...wallets.map(w => ({ value: w.value, label: w.label }))
              ]}
              value={fromWallet}
              onChange={(e) => setFromWallet(e.target.value)}
              required
            />
          </Card>

          {/* Recipients List */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recipients ({recipients.length})
              </h2>
              <Button
                variant="primary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                Add Recipient
              </Button>
            </div>

            {/* Add Recipient Form */}
            {showAddForm && (
              <div className="mb-6 p-6 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  Add New Recipient
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Recipient name"
                    value={newRecipient.name}
                    onChange={(e) => setNewRecipient({...newRecipient, name: e.target.value})}
                    icon={<User className="w-4 h-4" />}
                    iconPosition="left"
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={newRecipient.email}
                    onChange={(e) => setNewRecipient({...newRecipient, email: e.target.value})}
                    icon={<Mail className="w-4 h-4" />}
                    iconPosition="left"
                  />
                  <Input
                    placeholder="Account number"
                    value={newRecipient.accountNumber}
                    onChange={(e) => setNewRecipient({...newRecipient, accountNumber: e.target.value})}
                  />
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={newRecipient.amount}
                    onChange={(e) => setNewRecipient({...newRecipient, amount: e.target.value})}
                    icon={<DollarSign className="w-4 h-4" />}
                    iconPosition="left"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={addRecipient}
                  >
                    Add
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Recipients Table */}
            {recipients.length > 0 ? (
              <div>
                <Table
                  columns={columns}
                  data={recipients}
                  emptyMessage="No recipients added yet"
                />

                {/* Show errors for invalid recipients */}
                {recipients.some(r => r.status === 'invalid') && (
                  <div className="mt-4 p-4 bg-error/5 border border-error/20 rounded-xl">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-error mb-2">
                          Invalid Recipients Found
                        </p>
                        {recipients.filter(r => r.status === 'invalid').map(r => (
                          <div key={r.id} className="mb-2">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {r.name}:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                              {r.errors?.map((err, i) => (
                                <li key={i}>{err}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No recipients added yet
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  Add recipients manually or import from CSV
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Payout Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Total Recipients
                </span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {totals.count}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Valid
                </span>
                <Badge variant="success" size="sm">
                  {totals.valid}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Invalid
                </span>
                <Badge variant="error" size="sm">
                  {totals.invalid}
                </Badge>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${formatNumber(totals.total)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  Processing fee: FREE
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full mt-6"
              onClick={handleSubmit}
              loading={isLoading}
              disabled={!fromWallet || recipients.length === 0 || totals.invalid > 0}
              icon={<Send className="w-5 h-5" />}
              iconPosition="right"
            >
              Process Bulk Payout
            </Button>
          </Card>

          {/* Help */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              How it Works
            </h3>
            <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center text-primary-500 font-semibold text-xs">
                  1
                </span>
                <span>Select the wallet to send from</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center text-primary-500 font-semibold text-xs">
                  2
                </span>
                <span>Add recipients manually or import CSV</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center text-primary-500 font-semibold text-xs">
                  3
                </span>
                <span>Review and fix any validation errors</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center text-primary-500 font-semibold text-xs">
                  4
                </span>
                <span>Process payments instantly</span>
              </li>
            </ol>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
