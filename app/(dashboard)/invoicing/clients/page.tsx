'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import {
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  Building,
  DollarSign,
  FileText,
  ArrowLeft,
  Eye,
  Edit,
  MoreVertical,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { mockClients } from '@/lib/mock-data/invoicing'
import { formatCurrency } from '@/types/invoicing'

export default function ClientsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  // Filter clients
  const filteredClients = mockClients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Clients
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Manage your clients and their billing information
            </p>
          </div>
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={() => router.push('/invoicing/clients/new')}
          >
            Add Client
          </Button>
        </div>
      </div>

      <div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockClients.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockClients.filter((c) => c.invoiceCount > 0).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(
                    mockClients.reduce((sum, c) => sum + c.totalPaid, 0),
                    'USD'
                  )}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Outstanding</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(
                    mockClients.reduce((sum, c) => sum + c.outstandingBalance, 0),
                    'USD'
                  )}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-6 mb-6">
          <Input
            placeholder="Search clients by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            iconPosition="left"
          />
        </Card>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.length === 0 ? (
            <div className="col-span-full">
              <Card className="p-12 text-center">
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No clients found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm
                    ? 'Try adjusting your search terms'
                    : 'Get started by adding your first client'}
                </p>
                {!searchTerm && (
                  <Button
                    icon={<Plus className="w-4 h-4" />}
                    onClick={() => router.push('/invoicing/clients/new')}
                  >
                    Add Client
                  </Button>
                )}
              </Card>
            </div>
          ) : (
            filteredClients.map((client) => (
              <Card
                key={client.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/invoicing/clients/${client.id}`)}
              >
                {/* Client Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {client.name}
                      </h3>
                      {client.companyName && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {client.companyName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Building className="w-4 h-4 mt-0.5" />
                      <span className="line-clamp-2">
                        {client.address.street}, {client.address.city}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Total Revenue
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(client.totalPaid, client.currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Outstanding
                    </p>
                    <p className="font-semibold text-warning">
                      {formatCurrency(client.outstandingBalance, client.currency)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Invoices
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {client.invoiceCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Payment Terms
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {client.paymentTerms || 30} days
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    icon={<Eye className="w-3 h-3" />}
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/invoicing/clients/${client.id}`)
                    }}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<FileText className="w-3 h-3" />}
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/invoicing/create?client=${client.id}`)
                    }}
                  >
                    Invoice
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </PageLayout>
  )
}
