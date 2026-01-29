'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Activity,
  Clock,
  AlertCircle,
  Edit,
  RefreshCw,
  DollarSign,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate, formatCurrency } from '@/lib/utils'
import { MOCK_MEMBERS, MOCK_CHECKINS, MOCK_PAYMENTS, MOCK_FITNESS_CLASSES } from '@/lib/mock-data/fitness'

export default function MemberProfilePage() {
  const router = useRouter()
  const params = useParams()
  const memberId = params.id as string

  const [activeTab, setActiveTab] = useState<'overview' | 'checkins' | 'payments' | 'classes'>(
    'overview'
  )

  const member = MOCK_MEMBERS.find((m) => m.id === memberId)
  const memberCheckIns = MOCK_CHECKINS.filter((c) => c.memberId === memberId)
  const memberPayments = MOCK_PAYMENTS.filter((p) => p.memberId === memberId)
  const memberClasses = memberCheckIns
    .filter((c) => c.classId)
    .map((c) => MOCK_FITNESS_CLASSES.find((fc) => fc.id === c.classId))
    .filter((c) => c !== undefined)

  if (!member) {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Member Not Found</h1>
            </div>
          </div>
        </div>
        <Card className="p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Member not found</p>
          <Button
            variant="primary"
            onClick={() => router.push('/fitness/members')}
            className="mt-4"
          >
            Back to Members
          </Button>
        </Card>
      </PageLayout>
    )
  }

  const daysUntilExpiry = Math.ceil(
    (new Date(member.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )

  const activeDays = Math.floor(
    (new Date().getTime() - new Date(member.joinDate).getTime()) / (1000 * 60 * 60 * 24)
  )

  const totalPaid = memberPayments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'expired':
        return 'error'
      case 'suspended':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getTierVariant = (tier: string) => {
    switch (tier) {
      case 'vip':
        return 'primary'
      case 'premium':
        return 'info'
      case 'basic':
        return 'default'
      default:
        return 'default'
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'checkins', label: 'Check-in History' },
    { id: 'payments', label: 'Payments' },
    { id: 'classes', label: 'Classes' },
  ]

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{`${member.firstName} ${member.lastName}`}</h1>
            <p className="text-gray-600 dark:text-gray-400">{member.memberCode}</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/fitness/members')}
            >
              Back
            </Button>
            <Button
              variant="outline"
              icon={<Edit className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push(`/fitness/members/${member.id}/edit`)}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
      {/* Member Header */}
      <Card className="p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            {member.firstName[0]}
            {member.lastName[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.firstName} {member.lastName}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={getTierVariant(member.membershipTier) as any}>
                    {member.membershipTier.toUpperCase()}
                  </Badge>
                  <Badge variant={getStatusVariant(member.membershipStatus)}>
                    {member.membershipStatus}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{member.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Joined {formatDate(member.joinDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Expires {formatDate(member.expiryDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {member.totalCheckIns}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Check-ins</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{activeDays}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Days</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {memberClasses.length}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Classes Attended</p>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card className="mb-8">
        <div className="border-b border-gray-200 dark:border-dark-border">
          <div className="flex gap-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Membership Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                      Membership Tier
                    </label>
                    <Badge variant={getTierVariant(member.membershipTier) as any} size="md">
                      {member.membershipTier.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                      Status
                    </label>
                    <Badge variant={getStatusVariant(member.membershipStatus)} size="md">
                      {member.membershipStatus}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                      Join Date
                    </label>
                    <p className="text-gray-900 dark:text-white">{formatDate(member.joinDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                      Expiry Date
                    </label>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 dark:text-white">
                        {formatDate(member.expiryDate)}
                      </p>
                      {daysUntilExpiry > 0 && daysUntilExpiry <= 7 && (
                        <Badge variant="error" size="sm">
                          {daysUntilExpiry}d left
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                {member.membershipStatus === 'active' && (
                  <div className="mt-6">
                    <Button
                      variant="primary"
                      icon={<RefreshCw className="w-4 h-4" />}
                      iconPosition="left"
                    >
                      Renew Membership
                    </Button>
                  </div>
                )}
              </div>

              {member.medicalNotes && (
                <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Medical Notes
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {member.medicalNotes}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                      Name
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {member.emergencyContact.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                      Phone
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {member.emergencyContact.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 block mb-1">
                      Relationship
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {member.emergencyContact.relationship}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Check-ins Tab */}
          {activeTab === 'checkins' && (
            <div className="space-y-3">
              {memberCheckIns.length > 0 ? (
                memberCheckIns.map((checkIn) => (
                  <div
                    key={checkIn.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-card rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
                        <Activity className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(checkIn.checkInTime).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(checkIn.checkInTime).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                          {checkIn.checkOutTime &&
                            ` - ${new Date(checkIn.checkOutTime).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                            })}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {checkIn.duration && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {checkIn.duration} min
                        </p>
                      )}
                      <Badge
                        variant={checkIn.checkOutTime ? 'default' : 'success'}
                        size="sm"
                      >
                        {checkIn.checkOutTime ? 'Completed' : 'Active'}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  No check-in history
                </div>
              )}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-3">
              {memberPayments.length > 0 ? (
                memberPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-card rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(payment.amount, payment.currency)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {payment.billingPeriod} - {payment.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {formatDate(payment.paymentDate)}
                      </p>
                      <Badge
                        variant={
                          payment.status === 'paid'
                            ? 'success'
                            : payment.status === 'pending'
                            ? 'warning'
                            : 'error'
                        }
                        size="sm"
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  No payment history
                </div>
              )}
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div className="space-y-3">
              {memberClasses.length > 0 ? (
                memberClasses.map((fitnessClass) => (
                  <div
                    key={fitnessClass?.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-card rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {fitnessClass?.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {fitnessClass?.instructor}
                      </p>
                    </div>
                    <Badge variant="primary" size="sm">
                      {fitnessClass?.category}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  No classes attended
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </PageLayout>
  )
}
