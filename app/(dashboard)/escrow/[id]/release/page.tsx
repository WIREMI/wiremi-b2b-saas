'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import EmptyState from '@/components/ui/empty-state'
import {
  Shield,
  ArrowLeft,
  Send,
  DollarSign,
  Wallet,
  AlertCircle,
  CheckCircle,
  Lock
} from 'lucide-react'
import { getEscrowById } from '@/lib/mock-data/escrow'

interface Props {
  params: Promise<{ id: string }>
}

export default function ReleaseFundsPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const [selectedWallet, setSelectedWallet] = useState('wallet-main-001')
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const escrow = getEscrowById(id)
  const currentUserId = 'user-custodian-logitrans' // Mock

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
            onClick: () => router.push('/escrow')
          }}
        />
      </PageLayout>
    )
  }

  const isCustodian = escrow.custodian.userId === currentUserId

  if (!isCustodian) {
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
          description="Only the custodian can release funds."
          action={{
            label: 'Back to Escrow',
            onClick: () => router.push(`/escrow/${id}`)
          }}
        />
      </PageLayout>
    )
  }

  if (escrow.state !== 'AUTHORIZED') {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cannot Release Funds
          </h1>
        </div>
        <EmptyState
          icon={<AlertCircle className="w-12 h-12" />}
          title="Cannot release funds"
          description={`Escrow must be in AUTHORIZED state. Current state: ${escrow.state}`}
          action={{
            label: 'Back to Escrow',
            onClick: () => router.push(`/escrow/${id}`)
          }}
        />
      </PageLayout>
    )
  }

  const currentRequest = escrow.fundRequests[escrow.fundRequests.length - 1]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: escrow.currency
    }).format(amount)
  }

  const handleRelease = async () => {
    if (!twoFactorCode || twoFactorCode.length !== 6) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push(`/escrow/${id}`)
  }

  // Mock wallets
  const wallets = [
    { id: 'wallet-main-001', name: 'Main Operating Account', balance: 1250000, currency: 'USD' },
    { id: 'wallet-reserve-001', name: 'Reserve Account', balance: 500000, currency: 'USD' },
    { id: 'wallet-escrow-001', name: 'Escrow Holding Account', balance: 750000, currency: 'USD' }
  ]

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Release Funds
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Authorize fund release for {escrow.name}
        </p>
      </div>

      <Button variant="outline" onClick={() => router.push(`/escrow/${id}`)} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Escrow
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Release Summary */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Release Summary
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount to Release</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(currentRequest?.amount || 0)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">To</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {escrow.beneficiary.businessName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">{escrow.beneficiary.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">For</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {currentRequest?.reason || 'Fund release'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Source Wallet Selection */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Source Wallet
            </h3>
            <div className="space-y-3">
              {wallets.map((wallet) => (
                <label
                  key={wallet.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedWallet === wallet.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={selectedWallet === wallet.id}
                      onChange={() => setSelectedWallet(wallet.id)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Wallet className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{wallet.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                        Balance: {formatCurrency(wallet.balance)}
                      </p>
                    </div>
                  </div>
                  {wallet.balance < (currentRequest?.amount || 0) && (
                    <Badge variant="error">Insufficient</Badge>
                  )}
                </label>
              ))}
            </div>
          </Card>

          {/* 2FA Verification */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Security Verification
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg flex items-start gap-3">
                <Lock className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-200">
                    Two-Factor Authentication Required
                  </p>
                  <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                    Enter the 6-digit code from your authenticator app to authorize this transaction
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  6-Digit Authentication Code
                </label>
                <Input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-2xl font-mono tracking-widest"
                />
              </div>

              <Button
                variant="primary"
                onClick={handleRelease}
                disabled={twoFactorCode.length !== 6 || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing Release...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Authorize & Release Funds
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Checklist */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Pre-Release Checklist
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    All conditions met
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    {escrow.conditions.filter(c => c.status === 'MET').length} of {escrow.conditions.length}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Request approved
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    By {currentRequest?.approvedBy?.length || 0} approver(s)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Documents signed
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">All parties signed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Sufficient balance
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Wallet has required funds</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Transaction Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Release Amount</span>
                <span className="font-medium">{formatCurrency(currentRequest?.amount || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Transaction Fee</span>
                <span className="font-medium">{formatCurrency(0)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 font-bold">
                <span>Total</span>
                <span>{formatCurrency(currentRequest?.amount || 0)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
