'use client'

import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  DollarSign,
  Calendar,
  FileText,
  Edit,
  Send,
  TrendingUp,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import { getVendorById, getPayoutsForVendor } from '@/lib/mock-data/payouts'

export default function VendorProfilePage() {
  const router = useRouter()
  const params = useParams()
  const vendor = getVendorById(params.id as string)
  const vendorPayouts = vendor ? getPayoutsForVendor(vendor.id) : []

  if (!vendor) {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Vendor Not Found</h1>
            </div>
          </div>
        </div>
        <Card className="p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">Vendor not found</p>
          <Button variant="primary" onClick={() => router.push('/payouts/vendors')} className="mt-4">
            Back to Vendors
          </Button>
        </Card>
      </PageLayout>
    )
  }

  const getTypeIcon = () => {
    switch (vendor.type) {
      case 'company':
        return <Building2 className="w-6 h-6" />
      case 'individual':
        return <Mail className="w-6 h-6" />
      default:
        return <FileText className="w-6 h-6" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'default'
      case 'suspended':
        return 'error'
      default:
        return 'default'
    }
  }

  const getPayoutStatusVariant = (status: string) => {
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

  const recentPayouts = vendorPayouts.slice(0, 10)
  const avgPayout = vendorPayouts.length > 0
    ? vendorPayouts.reduce((sum, p) => sum + p.amount, 0) / vendorPayouts.length
    : 0

  return (
    <PageLayout maxWidth="normal">
      <Button
        variant="ghost"
        size="sm"
        icon={<ArrowLeft className="w-4 h-4" />}
        iconPosition="left"
        onClick={() => router.push('/payouts/vendors')}
        className="mb-6"
      >
        Back to Vendors
      </Button>

      {/* Vendor Header */}
      <Card className="p-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white">
              {getTypeIcon()}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {vendor.name}
                </h1>
                <Badge variant={getStatusVariant(vendor.status)}>
                  {vendor.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{vendor.vendorId}</span>
                <span>•</span>
                <span className="capitalize">{vendor.type}</span>
                {vendor.category && (
                  <>
                    <span>•</span>
                    <span>{vendor.category}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              icon={<Edit className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push(`/payouts/vendors/${vendor.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="primary"
              icon={<Send className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push(`/payouts/create?vendor=${vendor.id}`)}
            >
              Create Payout
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatNumber(vendor.totalPayouts)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Payouts</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(vendor.totalPaid, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Paid</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(avgPayout, 'USD')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Payout</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {vendor.lastPaymentDate ? formatDate(vendor.lastPaymentDate) : 'N/A'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Last Payment</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact & Address */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Email</div>
                <div className="text-gray-900 dark:text-white">{vendor.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Phone</div>
                <div className="text-gray-900 dark:text-white">{vendor.phone}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Address</div>
                <div className="text-gray-900 dark:text-white">
                  {vendor.address.street}<br />
                  {vendor.address.city}, {vendor.address.state} {vendor.address.zipCode}<br />
                  {vendor.address.country}
                </div>
              </div>
            </div>
            {vendor.contactPerson && (
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Contact Person</div>
                  <div className="text-gray-900 dark:text-white">{vendor.contactPerson}</div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Banking Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Banking Details
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Bank Name</div>
                <div className="text-gray-900 dark:text-white">{vendor.bankingDetails.bankName}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Account Number</div>
                <div className="text-gray-900 dark:text-white">{vendor.bankingDetails.accountNumber}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Account Name</div>
                <div className="text-gray-900 dark:text-white">{vendor.bankingDetails.accountName}</div>
              </div>
            </div>
            {vendor.bankingDetails.swiftCode && (
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">SWIFT Code</div>
                  <div className="text-gray-900 dark:text-white">{vendor.bankingDetails.swiftCode}</div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="mt-8">
        <div className="p-6 border-b border-gray-200 dark:border-dark-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Payment History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Reference
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Description
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Amount
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentPayouts.map((payout) => (
                <tr
                  key={payout.id}
                  className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors cursor-pointer"
                  onClick={() => router.push(`/payouts/${payout.id}`)}
                >
                  <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                    {payout.referenceNumber}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                    {payout.description}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(payout.amount, payout.currency)}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(payout.scheduledDate)}
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={getPayoutStatusVariant(payout.status)} size="sm">
                      {payout.status}
                    </Badge>
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
