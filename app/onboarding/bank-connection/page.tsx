'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Building2,
  CreditCard,
  Shield,
  Search,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'

interface Bank {
  id: string
  name: string
  logo: string
  supportsInstant: boolean
  popular?: boolean
}

type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'failed'

export default function BankConnectionPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle')
  const [isLoading, setIsLoading] = useState(false)

  // Mock bank list
  const banks: Bank[] = [
    { id: 'chase', name: 'Chase Bank', logo: '🏦', supportsInstant: true, popular: true },
    { id: 'bofa', name: 'Bank of America', logo: '🏦', supportsInstant: true, popular: true },
    { id: 'wells', name: 'Wells Fargo', logo: '🏦', supportsInstant: true, popular: true },
    { id: 'citi', name: 'Citibank', logo: '🏦', supportsInstant: true },
    { id: 'usbank', name: 'U.S. Bank', logo: '🏦', supportsInstant: true },
    { id: 'pnc', name: 'PNC Bank', logo: '🏦', supportsInstant: false },
    { id: 'capital', name: 'Capital One', logo: '🏦', supportsInstant: true },
    { id: 'td', name: 'TD Bank', logo: '🏦', supportsInstant: true },
    { id: 'truist', name: 'Truist Bank', logo: '🏦', supportsInstant: false },
    { id: 'schwab', name: 'Charles Schwab', logo: '🏦', supportsInstant: true },
  ]

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank)
    setConnectionStatus('idle')
  }

  const handleConnect = async () => {
    if (!selectedBank) return

    setConnectionStatus('connecting')
    setIsLoading(true)

    // Simulate bank connection process
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simulate success (90% success rate)
      if (Math.random() > 0.1) {
        setConnectionStatus('connected')
        showToast({
          type: 'success',
          title: 'Bank Connected',
          message: `Successfully connected to ${selectedBank.name}`,
        })
      } else {
        setConnectionStatus('failed')
        showToast({
          type: 'error',
          title: 'Connection Failed',
          message: 'Unable to connect to your bank. Please try again.',
        })
      }
    } catch (error) {
      setConnectionStatus('failed')
      showToast({
        type: 'error',
        title: 'Connection Error',
        message: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinue = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/onboarding/wallet-setup')
  }

  const handleSkip = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    showToast({
      type: 'info',
      title: 'Bank Connection Skipped',
      message: 'You can connect your bank later from settings',
    })
    router.push('/onboarding/wallet-setup')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
      {/* Header */}
      <div className="bg-gray-100 dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">W</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Wiremi
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Step 4 of 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Connect Your Bank
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Link your business bank account for seamless fund transfers and reconciliation
          </p>
        </div>

        {/* Security Notice */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl p-4">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary-900 dark:text-primary-300 mb-1">
                  Bank-Level Security
                </p>
                <p className="text-xs text-primary-700 dark:text-primary-400">
                  We use industry-leading encryption and never store your banking credentials. Your connection is powered by Plaid, trusted by thousands of financial institutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Bank Selection */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Select Your Bank
              </h2>

              {/* Search */}
              <Input
                placeholder="Search for your bank..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                iconPosition="left"
                className="mb-4"
              />

              {/* Bank List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredBanks.length > 0 ? (
                  filteredBanks.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => handleBankSelect(bank)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                        selectedBank?.id === bank.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                          : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{bank.logo}</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {bank.name}
                          </p>
                          {bank.supportsInstant && (
                            <p className="text-xs text-success">Instant verification</p>
                          )}
                        </div>
                      </div>
                      {bank.popular && (
                        <span className="text-xs bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
                          Popular
                        </span>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No banks found matching "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>

              {/* Manual Option */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Don't see your bank?
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Enter Bank Details Manually
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column: Connection Status */}
          <div>
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Connection Status
              </h2>

              {connectionStatus === 'idle' && selectedBank && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-dark-bg rounded-full mb-4">
                    <CreditCard className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to Connect
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    You've selected <strong>{selectedBank.name}</strong>
                  </p>

                  <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-4 mb-6 text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      What happens next:
                    </p>
                    <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="font-medium">1.</span>
                        <span>You'll be securely redirected to {selectedBank.name}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium">2.</span>
                        <span>Log in with your bank credentials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium">3.</span>
                        <span>Authorize Wiremi to access your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium">4.</span>
                        <span>Select which accounts to connect</span>
                      </li>
                    </ol>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleConnect}
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    Connect to {selectedBank.name}
                  </Button>
                </div>
              )}

              {connectionStatus === 'idle' && !selectedBank && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-dark-bg rounded-full mb-4">
                    <Building2 className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a bank from the list to continue
                  </p>
                </div>
              )}

              {connectionStatus === 'connecting' && (
                <div className="text-center py-12">
                  <div className="inline-block w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Connecting to {selectedBank?.name}...
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Please wait while we securely connect to your bank
                  </p>
                </div>
              )}

              {connectionStatus === 'connected' && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Successfully Connected!
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Your {selectedBank?.name} account is now linked
                  </p>

                  <div className="bg-success/5 border border-success/20 rounded-xl p-4 mb-6 text-left">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          2 accounts connected
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          • Business Checking (...4532)
                          <br />• Business Savings (...7891)
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handleContinue}
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    Continue to Wallet Setup
                  </Button>
                </div>
              )}

              {connectionStatus === 'failed' && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-error/10 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-error" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Connection Failed
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    We couldn't connect to {selectedBank?.name}
                  </p>

                  <div className="bg-error/5 border border-error/20 rounded-xl p-4 mb-6 text-left">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Common issues:
                    </p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Incorrect login credentials</li>
                      <li>• Bank maintenance in progress</li>
                      <li>• Connection timeout</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setConnectionStatus('idle')}
                    >
                      Try Again
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      onClick={handleSkip}
                    >
                      Skip for Now
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Info Notice */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Note:</strong> Connecting your bank is optional but recommended. It enables automatic reconciliation and faster fund transfers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 max-w-2xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push('/onboarding/addons-selection')}
            icon={<ArrowLeft className="w-5 h-5" />}
            iconPosition="left"
            disabled={isLoading || connectionStatus === 'connecting'}
          >
            Back
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="flex-1"
            onClick={handleSkip}
            disabled={isLoading || connectionStatus === 'connecting'}
          >
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  )
}
