'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  TrendingUp,
  Edit,
  Plus,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { mockClients, mockInvoices } from '@/lib/mock-data/invoicing'
import { formatCurrency, getInvoiceStatusColor } from '@/types/invoicing'

export default function ClientDetailPage() {
  const router = useRouter()
  const params = useParams()
  const clientId = params.id as string

  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'activity'>('overview')

  const client = mockClients.find((c) => c.id === clientId)
  const clientInvoices = mockInvoices.filter((inv) => inv.clientId === clientId)

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Client not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The client you're looking for doesn't exist
          </p>
          <Button onClick={() => router.push('/invoicing/clients')}>
            Back to Clients
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                icon={<ArrowLeft className="w-4 h-4" />}
                onClick={() => router.push('/invoicing/clients')}
              >
                Back
              </Button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {client.name}
                  </h1>
                  {client.companyName && (
                    <p className="text-gray-600 dark:text-gray-400">{client.companyName}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                icon={<Edit className="w-4 h-4" />}
              >
                Edit Client
              </Button>
              <Button
                icon={<FileText className="w-4 h-4" />}
                onClick={() => router.push(`/invoicing/create?client=${client.id}`)}
              >
                Create Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Client Info */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">{client.email}</p>
                  </div>
                </div>
                {client.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                      <p className="text-gray-900 dark:text-white">{client.phone}</p>
                    </div>
                  </div>
                )}
                {client.website && (
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Website</p>
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:underline"
                      >
                        {client.website}
                      </a>
                    </div>
                  </div>
                )}
                {client.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                      <p className="text-gray-900 dark:text-white">
                        {client.address.street}
                        <br />
                        {client.address.city}, {client.address.state} {client.address.postalCode}
                        <br />
                        {client.address.country}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Client Since</p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(client.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {client.notes && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Notes</p>
                  <p className="text-gray-900 dark:text-white text-sm">{client.notes}</p>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Stats and Details */}
          <div className="lg:col-span-2">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-success" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Total Revenue</p>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(client.totalInvoiced, "USD")}
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-warning" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Outstanding</p>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(client.outstandingBalance, "USD")}
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-info" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Invoices</p>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {client.invoiceCount}
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-primary-500" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Payment Terms</p>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {client.paymentTerms || 30}d
                </p>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-dark-border">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                  activeTab === 'invoices'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Invoices ({clientInvoices.length})
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
                  activeTab === 'activity'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Activity
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Payment Behavior */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Payment Behavior
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Average Payment Time
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {client.paymentTerms} days
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Payment Status
                      </p>
                      <Badge
                        variant={
                          (client.paymentTerms || 30) <= 15
                            ? 'success'
                            : (client.paymentTerms || 30) <= 30
                            ? 'warning'
                            : 'error'
                        }
                      >
                        {(client.paymentTerms || 30) <= 15
                          ? 'Excellent'
                          : (client.paymentTerms || 30) <= 30
                          ? 'Good'
                          : 'Needs Attention'}
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Recent Invoices */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Recent Invoices
                    </h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setActiveTab('invoices')}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {clientInvoices.slice(0, 5).map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-surface rounded-lg hover:shadow transition-shadow cursor-pointer"
                        onClick={() => router.push(`/invoicing/${invoice.id}`)}
                      >
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {invoice.invoiceNumber}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(invoice.issueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(invoice.total, "USD")}
                          </p>
                          <Badge variant={getInvoiceStatusColor(invoice.status) as any} size="sm">
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'invoices' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    All Invoices
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<Download className="w-3 h-3" />}
                  >
                    Export
                  </Button>
                </div>
                <div className="space-y-4">
                  {clientInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-surface rounded-lg hover:shadow transition-shadow cursor-pointer"
                      onClick={() => router.push(`/invoicing/${invoice.id}`)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {invoice.invoiceNumber}
                          </p>
                          <Badge variant={getInvoiceStatusColor(invoice.status) as any} size="sm">
                            {invoice.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Issued: {new Date(invoice.issueDate).toLocaleDateString()} ·
                          Due: {new Date(invoice.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {formatCurrency(invoice.total, "USD")}
                        </p>
                        {invoice.amountDue > 0 && (
                          <p className="text-sm text-warning">
                            {formatCurrency(invoice.amountDue, "USD")} due
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'activity' && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {clientInvoices.slice(0, 10).map((invoice) => (
                    <div key={invoice.id} className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white">
                          Invoice <span className="font-semibold">{invoice.invoiceNumber}</span>{' '}
                          {invoice.status === 'PAID' ? 'paid' : invoice.status.toLowerCase()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(invoice.updatedAt).toLocaleString()}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(invoice.total, "USD")}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
