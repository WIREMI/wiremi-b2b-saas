'use client'

import { useState, FormEvent, ReactNode, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  Send,
  User,
  Building2,
  Smartphone,
  Globe,
  CheckCircle2,
  Info,
  AlertCircle,
  Search,
  Clock,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import { formatNumber } from '@/lib/utils'

interface WalletOption {
  value: string
  label: string
  currency: string
  symbol: string
  balance: number
  flag: string
}

interface RecipientType {
  id: string
  name: string
  description: string
  icon: ReactNode
}

interface SavedRecipient {
  id: string
  name: string
  type: string
  identifier: string
  lastUsed: string
}

function SendMoneyPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()

  const [step, setStep] = useState<'recipient' | 'amount' | 'confirm'>('recipient')
  const [selectedWallet, setSelectedWallet] = useState(searchParams.get('wallet') || '')
  const [recipientType, setRecipientType] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Recipient details
  const [recipientName, setRecipientName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bankName, setBankName] = useState('')
  const [swiftCode, setSwiftCode] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  const [selectedRecipient, setSelectedRecipient] = useState<SavedRecipient | null>(null)

  const wallets: WalletOption[] = [
    { value: '1', label: 'Main Operating Account', currency: 'USD', symbol: '$', balance: 125430.50, flag: '🇺🇸' },
    { value: '2', label: 'Euro Operations', currency: 'EUR', symbol: '€', balance: 87250.00, flag: '🇪🇺' },
    { value: '3', label: 'UK Payroll', currency: 'GBP', symbol: '£', balance: 45890.25, flag: '🇬🇧' },
    { value: '4', label: 'Asia-Pacific Reserve', currency: 'SGD', symbol: 'S$', balance: 62100.00, flag: '🇸🇬' },
    { value: '5', label: 'Vendor Payments', currency: 'CAD', symbol: 'C$', balance: 28650.75, flag: '🇨🇦' },
  ]

  const recipientTypes: RecipientType[] = [
    {
      id: 'wiremi',
      name: 'Wiremi User',
      description: 'Send to another Wiremi account instantly',
      icon: <User className="w-6 h-6" />,
    },
    {
      id: 'bank',
      name: 'Bank Account',
      description: 'Send via bank transfer or wire',
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      description: 'Send to M-Pesa, MTN, or Airtel',
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      id: 'international',
      name: 'International',
      description: 'Send money overseas',
      icon: <Globe className="w-6 h-6" />,
    },
  ]

  const savedRecipients: SavedRecipient[] = [
    {
      id: '1',
      name: 'John Doe',
      type: 'wiremi',
      identifier: 'john.doe@email.com',
      lastUsed: '2 days ago',
    },
    {
      id: '2',
      name: 'Acme Corporation',
      type: 'bank',
      identifier: 'Bank of America - ****4532',
      lastUsed: '5 days ago',
    },
    {
      id: '3',
      name: 'Jane Smith',
      type: 'mobile',
      identifier: '+254 712 345 678',
      lastUsed: '1 week ago',
    },
  ]

  const selectedWalletData = wallets.find(w => w.value === selectedWallet)

  const validateAmount = () => {
    const newErrors: Record<string, string> = {}

    if (!amount) {
      newErrors.amount = 'Amount is required'
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    } else if (selectedWalletData && parseFloat(amount) > selectedWalletData.balance) {
      newErrors.amount = 'Insufficient balance'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRecipientTypeSelect = (typeId: string) => {
    setRecipientType(typeId)
  }

  const handleSavedRecipientSelect = (recipient: SavedRecipient) => {
    setSelectedRecipient(recipient)
    setRecipientType(recipient.type)
    setStep('amount')
  }

  const handleContinueToAmount = () => {
    if (!recipientName || !getRecipientIdentifier()) {
      showToast({
        type: 'error',
        title: 'Missing Information',
        message: 'Please fill in all required recipient details',
      })
      return
    }
    setStep('amount')
  }

  const handleContinueToConfirm = () => {
    if (!validateAmount()) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please check the amount and try again',
      })
      return
    }
    setStep('confirm')
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))

      showToast({
        type: 'success',
        title: 'Payment Sent Successfully',
        message: `${selectedWalletData?.symbol}${amount} sent to ${recipientName || selectedRecipient?.name}`,
      })

      setTimeout(() => {
        router.push('/wallets')
      }, 1500)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Transaction Failed',
        message: 'Unable to send payment. Please try again.',
      })
      setIsLoading(false)
    }
  }

  const getRecipientIdentifier = () => {
    switch (recipientType) {
      case 'wiremi':
        return email
      case 'mobile':
        return phoneNumber
      case 'bank':
      case 'international':
        return accountNumber
      default:
        return ''
    }
  }

  const getTransferFee = () => {
    const amountNum = parseFloat(amount) || 0
    switch (recipientType) {
      case 'wiremi':
        return 0
      case 'mobile':
        return amountNum * 0.015
      case 'bank':
        return 5
      case 'international':
        return amountNum * 0.025 + 15
      default:
        return 0
    }
  }

  const getProcessingTime = () => {
    switch (recipientType) {
      case 'wiremi':
        return 'Instant'
      case 'mobile':
        return 'Instant'
      case 'bank':
        return '1-3 business days'
      case 'international':
        return '2-5 business days'
      default:
        return 'Unknown'
    }
  }

  // Recipient Selection Step
  if (step === 'recipient') {
    return (
      <PageLayout maxWidth="normal">
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

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
              <Send className="w-8 h-8 text-primary-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Send Money
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Choose a recipient or select from your saved contacts
            </p>
          </div>

          {/* Wallet Selection */}
          <Card className="p-6 mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Send From <span className="text-error">*</span>
            </label>
            <Select
              options={[
                { value: '', label: 'Choose a wallet' },
                ...wallets.map(w => ({
                  value: w.value,
                  label: `${w.flag} ${w.label} (${w.currency}) - ${w.symbol}${formatNumber(w.balance)}`
                }))
              ]}
              value={selectedWallet}
              onChange={(e) => setSelectedWallet(e.target.value)}
            />
            {selectedWalletData && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Available Balance</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedWalletData.symbol}{formatNumber(selectedWalletData.balance)}
                  </span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Saved Recipients */}
        {savedRecipients.length > 0 && selectedWallet && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Recipients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedRecipients.map((recipient) => (
                <Card
                  key={recipient.id}
                  className="p-4 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 cursor-pointer"
                  onClick={() => handleSavedRecipientSelect(recipient)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                      {recipient.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {recipient.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {recipient.identifier}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="default" size="sm">
                          {recipient.type}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {recipient.lastUsed}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recipient Types */}
        {selectedWallet && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Or Choose Recipient Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {recipientTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`p-6 transition-all duration-200 cursor-pointer ${
                    recipientType === type.id
                      ? 'border-primary-500 dark:border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                      : 'hover:border-primary-500 dark:hover:border-primary-500'
                  }`}
                  onClick={() => handleRecipientTypeSelect(type.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400">
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {type.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Recipient Details Form */}
        {recipientType && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recipient Details
            </h3>

            <div className="space-y-4">
              <Input
                label="Recipient Name"
                type="text"
                placeholder="Enter full name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />

              {recipientType === 'wiremi' && (
                <Input
                  label="Email or Username"
                  type="text"
                  placeholder="user@email.com or @username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              )}

              {recipientType === 'mobile' && (
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+254 712 345 678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              )}

              {(recipientType === 'bank' || recipientType === 'international') && (
                <>
                  <Input
                    label="Account Number"
                    type="text"
                    placeholder="Enter account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                  />
                  <Input
                    label="Bank Name"
                    type="text"
                    placeholder="Enter bank name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    required
                  />
                  {recipientType === 'international' && (
                    <Input
                      label="SWIFT/BIC Code"
                      type="text"
                      placeholder="Enter SWIFT code"
                      value={swiftCode}
                      onChange={(e) => setSwiftCode(e.target.value)}
                      required
                    />
                  )}
                </>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setRecipientType('')}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleContinueToAmount}
                >
                  Continue
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Info Banner */}
        {!selectedWallet && (
          <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-primary-900 dark:text-primary-300">
                Please select a wallet to send from
              </p>
            </div>
          </div>
        )}
      </PageLayout>
    )
  }

  // Amount Step
  if (step === 'amount') {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => setStep('recipient')}
            className="mb-4"
          >
            Back
          </Button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
              <Send className="w-8 h-8 text-primary-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Enter Amount
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              How much do you want to send?
            </p>
          </div>
        </div>

        <Card className="p-8">
          {/* Recipient Info */}
          <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary-900 dark:text-primary-300">
                Sending to: <strong>{recipientName || selectedRecipient?.name}</strong>
              </span>
            </div>
            <p className="text-xs text-primary-700 dark:text-primary-400">
              {getRecipientIdentifier() || selectedRecipient?.identifier}
            </p>
          </div>

          {/* Wallet Info */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                From: {selectedWalletData?.label}
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Balance: {selectedWalletData?.symbol}{formatNumber(selectedWalletData?.balance || 0)}
              </span>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-6">
            <Input
              label="Amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                setErrors(prev => ({ ...prev, amount: '' }))
              }}
              error={errors.amount}
              helperText={`Enter amount in ${selectedWalletData?.currency}`}
              required
            />
          </div>

          {/* Transfer Details */}
          {amount && parseFloat(amount) > 0 && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Transfer Amount</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {selectedWalletData?.symbol}{parseFloat(amount).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Transfer Fee</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {getTransferFee() === 0 ? 'FREE' : `${selectedWalletData?.symbol}${getTransferFee().toFixed(2)}`}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-200 dark:border-dark-border">
                <span className="font-semibold text-gray-900 dark:text-white">Total Debit</span>
                <span className="font-bold text-error">
                  {selectedWalletData?.symbol}{(parseFloat(amount) + getTransferFee()).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Processing Time</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {getProcessingTime()}
                </span>
              </div>
            </div>
          )}

          {/* Note */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Note (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Add a note for this payment..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setStep('recipient')}
            >
              Back
            </Button>
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={handleContinueToConfirm}
              disabled={!amount || parseFloat(amount) <= 0}
            >
              Continue
            </Button>
          </div>
        </Card>
      </PageLayout>
    )
  }

  // Confirmation Step
  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => setStep('amount')}
          className="mb-4"
          disabled={isLoading}
        >
          Back
        </Button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-2xl mb-4">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Confirm Payment
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review your payment details before confirming
          </p>
        </div>
      </div>

      <Card className="p-8">
        {/* Summary */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-border">
            <span className="text-gray-600 dark:text-gray-400">From</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {selectedWalletData?.flag} {selectedWalletData?.label}
            </span>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-border">
            <span className="text-gray-600 dark:text-gray-400">To</span>
            <div className="text-right">
              <p className="font-semibold text-gray-900 dark:text-white">
                {recipientName || selectedRecipient?.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                {getRecipientIdentifier() || selectedRecipient?.identifier}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-border">
            <span className="text-gray-600 dark:text-gray-400">Amount</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedWalletData?.symbol}{amount}
            </span>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-border">
            <span className="text-gray-600 dark:text-gray-400">Fee</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {getTransferFee() === 0 ? 'FREE' : `${selectedWalletData?.symbol}${getTransferFee().toFixed(2)}`}
            </span>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-border">
            <span className="text-gray-600 dark:text-gray-400">Processing Time</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {getProcessingTime()}
            </span>
          </div>

          {note && (
            <div className="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-dark-border">
              <span className="text-gray-600 dark:text-gray-400">Note</span>
              <span className="font-medium text-gray-900 dark:text-white text-right max-w-xs">
                {note}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Debit</span>
            <span className="text-3xl font-bold text-error">
              {selectedWalletData?.symbol}{(parseFloat(amount) + getTransferFee()).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Warning */}
        <div className="mb-8 p-4 bg-warning/10 border border-warning/20 rounded-xl">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <p className="text-sm text-warning">
              Please verify all details carefully. Once confirmed, this transaction cannot be reversed.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setStep('amount')}
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={handleSubmit}
            loading={isLoading}
            icon={<CheckCircle2 className="w-5 h-5" />}
            iconPosition="left"
          >
            Confirm & Send
          </Button>
        </div>
      </Card>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border">
        <div className="flex gap-3">
          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-gray-900 dark:text-white mb-1">
              Secure Transaction
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              All transactions are encrypted and processed securely. Your payment will be sent according to the processing time shown above.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default function SendMoneyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SendMoneyPageContent />
    </Suspense>
  )
}
