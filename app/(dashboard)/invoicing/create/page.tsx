'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  X,
  Calendar,
  DollarSign,
  FileText,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Percent,
  Save,
  Send,
  Eye,
  ArrowLeft,
} from 'lucide-react'
import { getAllClients } from '@/lib/mock-data/invoicing'
import { InvoiceItem, DiscountType, TaxType, PaymentMethod } from '@/types/invoicing'
import { calculateInvoiceTotals } from '@/types/invoicing'

export default function CreateInvoicePage() {
  const router = useRouter()
  const clients = getAllClients()

  const [invoiceData, setInvoiceData] = useState({
    clientId: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    paymentTerms: 30,
    notes: '',
    termsAndConditions: 'Payment due within 30 days. Late payments subject to 1.5% monthly interest.',
  })

  const [items, setItems] = useState<Array<Omit<InvoiceItem, 'id' | 'amount'>>>([
    {
      description: '',
      quantity: 1,
      rate: 0,
      taxable: true,
    },
  ])

  const [taxSettings, setTaxSettings] = useState({
    enabled: true,
    type: 'SALES_TAX' as TaxType,
    rate: 8.5,
    name: 'Sales Tax',
  })

  const [discountSettings, setDiscountSettings] = useState<{
    enabled: boolean
    type: DiscountType
    value: number
    description: string
  }>({
    enabled: false,
    type: 'PERCENTAGE',
    value: 0,
    description: '',
  })

  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<PaymentMethod[]>([
    'CREDIT_CARD',
    'BANK_TRANSFER',
  ])

  const selectedClient = clients.find((c) => c.id === invoiceData.clientId)

  // Calculate totals
  const invoiceItems: InvoiceItem[] = items.map((item, index) => ({
    ...item,
    id: `item_${index}`,
    amount: item.quantity * item.rate,
  }))

  const taxes = taxSettings.enabled
    ? [
        {
          id: 'tax_1',
          name: taxSettings.name,
          type: taxSettings.type,
          rate: taxSettings.rate,
          amount: 0,
        },
      ]
    : []

  const discount = discountSettings.enabled
    ? {
        type: discountSettings.type,
        value: discountSettings.value,
        amount: 0,
        description: discountSettings.description,
      }
    : undefined

  const totals = calculateInvoiceTotals(invoiceItems, taxes, discount)

  const addItem = () => {
    setItems([
      ...items,
      {
        description: '',
        quantity: 1,
        rate: 0,
        taxable: true,
      },
    ])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const handleSaveDraft = () => {
    console.log('Saving draft...', { invoiceData, items, totals })
    router.push('/invoicing')
  }

  const handleSendInvoice = () => {
    console.log('Sending invoice...', { invoiceData, items, totals })
    router.push('/invoicing')
  }

  const togglePaymentMethod = (method: PaymentMethod) => {
    if (selectedPaymentMethods.includes(method)) {
      setSelectedPaymentMethods(selectedPaymentMethods.filter((m) => m !== method))
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, method])
    }
  }

  const paymentMethodOptions: Array<{ id: PaymentMethod; name: string }> = [
    { id: 'CREDIT_CARD', name: 'Credit Card' },
    { id: 'DEBIT_CARD', name: 'Debit Card' },
    { id: 'BANK_TRANSFER', name: 'Bank Transfer' },
    { id: 'ACH', name: 'ACH' },
    { id: 'WIRE_TRANSFER', name: 'Wire Transfer' },
    { id: 'PAYPAL', name: 'PayPal' },
    { id: 'STRIPE', name: 'Stripe' },
    { id: 'CRYPTO', name: 'Cryptocurrency' },
  ]

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/invoicing')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Invoices</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Invoice</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Generate a new invoice for your client
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={handleSendInvoice} disabled={!invoiceData.clientId || items.some(i => !i.description)}>
              <Send className="w-4 h-4 mr-2" />
              Send Invoice
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Selection */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                <User className="w-5 h-5 inline mr-2" />
                Client Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Client *
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    value={invoiceData.clientId}
                    onChange={(e) => setInvoiceData({ ...invoiceData, clientId: e.target.value })}
                  >
                    <option value="">Choose a client...</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name} - {client.email}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Don't see your client?{' '}
                    <button
                      onClick={() => router.push('/invoicing/clients/new')}
                      className="text-blue-600 hover:underline"
                    >
                      Add new client
                    </button>
                  </p>
                </div>

                {selectedClient && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{selectedClient.name}</p>
                        {selectedClient.companyName && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedClient.companyName}</p>
                        )}
                      </div>
                      <Badge>{selectedClient.type}</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span>{selectedClient.email}</span>
                      </div>
                      {selectedClient.phone && (
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <Phone className="w-4 h-4" />
                          <span>{selectedClient.phone}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span>
                          {selectedClient.address.city}, {selectedClient.address.state}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Invoice Details */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                <Calendar className="w-5 h-5 inline mr-2" />
                Invoice Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issue Date *
                  </label>
                  <Input
                    type="date"
                    value={invoiceData.issueDate}
                    onChange={(e) => setInvoiceData({ ...invoiceData, issueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Due Date *
                  </label>
                  <Input
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Terms
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                    value={invoiceData.paymentTerms}
                    onChange={(e) =>
                      setInvoiceData({ ...invoiceData, paymentTerms: parseInt(e.target.value) })
                    }
                  >
                    <option value={7}>Due in 7 days</option>
                    <option value={15}>Due in 15 days</option>
                    <option value={30}>Due in 30 days</option>
                    <option value={45}>Due in 45 days</option>
                    <option value={60}>Due in 60 days</option>
                    <option value={90}>Due in 90 days</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Line Items */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                <FileText className="w-5 h-5 inline mr-2" />
                Line Items
              </h2>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 md:col-span-5">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Description *
                        </label>
                        <Input
                          placeholder="Service or product description"
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Qty
                        </label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Rate
                        </label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value))}
                        />
                      </div>
                      <div className="col-span-3 md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Amount
                        </label>
                        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white">
                          ${(item.quantity * item.rate).toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1 flex items-end">
                        <button
                          onClick={() => removeItem(index)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          disabled={items.length === 1}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="secondary" onClick={addItem} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Line Item
                </Button>
              </div>
            </Card>

            {/* Tax & Discount */}
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tax Settings */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tax</h3>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={taxSettings.enabled}
                        onChange={(e) => setTaxSettings({ ...taxSettings, enabled: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Enable</span>
                    </label>
                  </div>

                  {taxSettings.enabled && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tax Name
                        </label>
                        <Input
                          value={taxSettings.name}
                          onChange={(e) => setTaxSettings({ ...taxSettings, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tax Rate (%)
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={taxSettings.rate}
                            onChange={(e) => setTaxSettings({ ...taxSettings, rate: parseFloat(e.target.value) })}
                          />
                          <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Discount Settings */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Discount</h3>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={discountSettings.enabled}
                        onChange={(e) => setDiscountSettings({ ...discountSettings, enabled: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Enable</span>
                    </label>
                  </div>

                  {discountSettings.enabled && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Discount Type
                        </label>
                        <select
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                          value={discountSettings.type}
                          onChange={(e) => setDiscountSettings({ ...discountSettings, type: e.target.value as DiscountType })}
                        >
                          <option value="PERCENTAGE">Percentage</option>
                          <option value="FIXED_AMOUNT">Fixed Amount</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          {discountSettings.type === 'PERCENTAGE' ? 'Discount (%)' : 'Discount Amount'}
                        </label>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          value={discountSettings.value}
                          onChange={(e) => setDiscountSettings({ ...discountSettings, value: parseFloat(e.target.value) })}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                <DollarSign className="w-5 h-5 inline mr-2" />
                Accepted Payment Methods
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {paymentMethodOptions.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => togglePaymentMethod(method.id)}
                    className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPaymentMethods.includes(method.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    {method.name}
                  </button>
                ))}
              </div>
            </Card>

            {/* Notes */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Additional notes for the client..."
                    value={invoiceData.notes}
                    onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Terms & Conditions
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Payment terms and conditions..."
                    value={invoiceData.termsAndConditions}
                    onChange={(e) => setInvoiceData({ ...invoiceData, termsAndConditions: e.target.value })}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Invoice Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-900 dark:text-white">${totals.subtotal.toFixed(2)}</span>
                  </div>

                  {discountSettings.enabled && totals.discountAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Discount</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        -${totals.discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {taxSettings.enabled && totals.taxTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {taxSettings.name} ({taxSettings.rate}%)
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">${totals.taxTotal.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <span className="text-base font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">${totals.total.toFixed(2)}</span>
                  </div>
                </div>

                {selectedClient && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
                    <p className="text-gray-600 dark:text-gray-400 mb-1">Bill To:</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedClient.name}</p>
                    {selectedClient.companyName && (
                      <p className="text-gray-600 dark:text-gray-400">{selectedClient.companyName}</p>
                    )}
                  </div>
                )}

                <Button variant="secondary" className="w-full mb-2">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Invoice
                </Button>

                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <p>• Invoice will be sent to {selectedClient?.email || 'client email'}</p>
                  <p>• Payment due: {invoiceData.dueDate}</p>
                  <p>• {selectedPaymentMethods.length} payment method(s) accepted</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
