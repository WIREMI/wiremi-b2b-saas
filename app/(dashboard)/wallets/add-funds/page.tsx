'use client'

import { useState, FormEvent, ReactNode, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  Plus,
  CreditCard,
  Building2,
  Smartphone,
  Wallet,
  CheckCircle2,
  Info,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
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

interface FundingMethod {
  id: string
  name: string
  description: string
  icon: ReactNode
  processingTime: string
  fee: string
  minAmount: number
  maxAmount: number
}

function AddFundsPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()

  const [step, setStep] = useState<'method' | 'details' | 'confirm'>('method')
  const [selectedWallet, setSelectedWallet] = useState(searchParams.get('wallet') || '')
  const [selectedMethod, setSelectedMethod] = useState('')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Card payment details
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCVC, setCardCVC] = useState('')
  const [cardName, setCardName] = useState('')

  // Bank transfer details
  const [bankName, setBankName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [routingNumber, setRoutingNumber] = useState('')

  // Mobile money details
  const [phoneNumber, setPhoneNumber] = useState('')
  const [provider, setProvider] = useState('mpesa')

  // Crypto details
  const [cryptoCurrency, setCryptoCurrency] = useState('USDT')
  const [copied, setCopied] = useState(false)

  const wallets: WalletOption[] = [
    { value: '1', label: 'Main Operating Account', currency: 'USD', symbol: '$', balance: 125430.50, flag: '🇺🇸' },
    { value: '2', label: 'Euro Operations', currency: 'EUR', symbol: '€', balance: 87250.00, flag: '🇪🇺' },
    { value: '3', label: 'UK Payroll', currency: 'GBP', symbol: '£', balance: 45890.25, flag: '🇬🇧' },
    { value: '4', label: 'Asia-Pacific Reserve', currency: 'SGD', symbol: 'S$', balance: 62100.00, flag: '🇸🇬' },
    { value: '5', label: 'Vendor Payments', currency: 'CAD', symbol: 'C$', balance: 28650.75, flag: '🇨🇦' },
  ]

  const fundingMethods: FundingMethod[] = [
    {
      id: 'card',
      name: 'Debit/Credit Card',
      description: 'Add funds instantly using your card',
      icon: <CreditCard className="w-6 h-6" />,
      processingTime: 'Instant',
      fee: '2.9% + $0.30',
      minAmount: 10,
      maxAmount: 50000,
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Wire transfer from your bank account',
      icon: <Building2 className="w-6 h-6" />,
      processingTime: '1-3 business days',
      fee: 'Free',
      minAmount: 100,
      maxAmount: 1000000,
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      description: 'M-Pesa, MTN, Airtel Money',
      icon: <Smartphone className="w-6 h-6" />,
      processingTime: 'Instant',
      fee: '1.5%',
      minAmount: 5,
      maxAmount: 10000,
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Deposit using USDT, USDC, or other stablecoins',
      icon: <Wallet className="w-6 h-6" />,
      processingTime: '10-30 minutes',
      fee: 'Network fee only',
      minAmount: 50,
      maxAmount: 500000,
    },
  ]

  const selectedWalletData = wallets.find(w => w.value === selectedWallet)
  const selectedMethodData = fundingMethods.find(m => m.id === selectedMethod)

  const validateAmount = () => {
    const newErrors: Record<string, string> = {}

    if (!amount) {
      newErrors.amount = 'Amount is required'
    } else if (parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    } else if (selectedMethodData) {
      if (parseFloat(amount) < selectedMethodData.minAmount) {
        newErrors.amount = `Minimum amount is ${selectedWalletData?.symbol}${selectedMethodData.minAmount}`
      } else if (parseFloat(amount) > selectedMethodData.maxAmount) {
        newErrors.amount = `Maximum amount is ${selectedWalletData?.symbol}${formatNumber(selectedMethodData.maxAmount)}`
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    setStep('details')
  }

  const handleContinue = () => {
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
        title: 'Funds Added Successfully',
        message: `${selectedWalletData?.symbol}${amount} has been added to ${selectedWalletData?.label}`,
      })

      setTimeout(() => {
        router.push('/wallets')
      }, 1500)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Transaction Failed',
        message: 'Unable to add funds. Please try again.',
      })
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Method Selection Step
  if (step === 'method') {
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-2xl mb-4">
              <Plus className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Add Funds
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Choose how you'd like to add funds to your wallet
            </p>
          </div>

          {/* Wallet Selection */}
          <Card className="p-6 mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Wallet <span className="text-error">*</span>
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">Current Balance</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedWalletData.symbol}{formatNumber(selectedWalletData.balance)}
                  </span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Funding Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fundingMethods.map((method) => (
            <Card
              key={method.id}
              className="p-6 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 cursor-pointer"
              onClick={() => selectedWallet && handleMethodSelect(method.id)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center text-primary-600 dark:text-primary-400">
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {method.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Processing Time</span>
                  <span className="font-medium text-gray-900 dark:text-white">{method.processingTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Fee</span>
                  <span className="font-medium text-gray-900 dark:text-white">{method.fee}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Limits</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {selectedWalletData?.symbol}{method.minAmount} - {selectedWalletData?.symbol}{formatNumber(method.maxAmount)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Banner */}
        {!selectedWallet && (
          <div className="mt-8 p-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-primary-900 dark:text-primary-300">
                Please select a wallet first to continue
              </p>
            </div>
          </div>
        )}
      </PageLayout>
    )
  }

  // Details Step
  if (step === 'details') {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => setStep('method')}
            className="mb-4"
          >
            Back
          </Button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-2xl mb-4">
              {selectedMethodData?.icon}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedMethodData?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Enter the amount and payment details
            </p>
          </div>
        </div>

        <Card className="p-8">
          {/* Wallet Info */}
          <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary-900 dark:text-primary-300">
                Adding funds to: <strong>{selectedWalletData?.label}</strong>
              </span>
              <span className="text-sm font-semibold text-primary-900 dark:text-primary-300">
                {selectedWalletData?.flag} {selectedWalletData?.currency}
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
              helperText={`Min: ${selectedWalletData?.symbol}${selectedMethodData?.minAmount} • Max: ${selectedWalletData?.symbol}${formatNumber(selectedMethodData?.maxAmount || 0)}`}
              required
            />
          </div>

          {/* Payment Method Specific Forms */}
          {selectedMethod === 'card' && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Card Details</h3>
              <Input
                label="Card Number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  type="text"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  maxLength={5}
                  required
                />
                <Input
                  label="CVC"
                  type="text"
                  placeholder="123"
                  value={cardCVC}
                  onChange={(e) => setCardCVC(e.target.value)}
                  maxLength={4}
                  required
                />
              </div>
              <Input
                label="Cardholder Name"
                type="text"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>
          )}

          {selectedMethod === 'bank' && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bank Transfer Instructions</h3>
              <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bank Name</p>
                  <p className="font-semibold text-gray-900 dark:text-white">Wiremi Business Bank</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Account Number</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-gray-900 dark:text-white">1234567890123456</p>
                    <button
                      onClick={() => copyToClipboard('1234567890123456')}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-dark-hover rounded"
                    >
                      {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Routing Number</p>
                  <p className="font-mono text-gray-900 dark:text-white">021000021</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Reference Code</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-gray-900 dark:text-white">WIRE-{selectedWallet}-{Date.now().toString().slice(-6)}</p>
                    <button
                      onClick={() => copyToClipboard(`WIRE-${selectedWallet}-${Date.now().toString().slice(-6)}`)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-dark-hover rounded"
                    >
                      {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-warning">
                    <strong>Important:</strong> Include the reference code in your bank transfer. Funds will be credited within 1-3 business days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedMethod === 'mobile' && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mobile Money Details</h3>
              <Select
                label="Provider"
                options={[
                  { value: 'mpesa', label: 'M-Pesa' },
                  { value: 'mtn', label: 'MTN Mobile Money' },
                  { value: 'airtel', label: 'Airtel Money' },
                  { value: 'orange', label: 'Orange Money' },
                ]}
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+254 712 345 678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <div className="p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  You will receive a prompt on your phone to authorize the payment.
                </p>
              </div>
            </div>
          )}

          {selectedMethod === 'crypto' && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cryptocurrency Deposit</h3>
              <Select
                label="Cryptocurrency"
                options={[
                  { value: 'USDT', label: 'USDT (Tether) - ERC20' },
                  { value: 'USDC', label: 'USDC - ERC20' },
                  { value: 'DAI', label: 'DAI - ERC20' },
                ]}
                value={cryptoCurrency}
                onChange={(e) => setCryptoCurrency(e.target.value)}
              />
              <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Deposit Address</p>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm text-gray-900 dark:text-white break-all">
                    0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
                  </p>
                  <button
                    onClick={() => copyToClipboard('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb')}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-dark-hover rounded flex-shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-center p-6 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400">QR Code</span>
                </div>
              </div>
              <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-warning">
                    <p className="font-semibold mb-1">Important:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Only send {cryptoCurrency} to this address</li>
                      <li>Minimum deposit: ${selectedMethodData?.minAmount}</li>
                      <li>Network fee will be deducted from deposit</li>
                      <li>Allow 10-30 minutes for confirmations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-dark-border">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setStep('method')}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={handleContinue}
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
          onClick={() => setStep('details')}
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
            Confirm Transaction
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review your transaction details before confirming
          </p>
        </div>
      </div>

      <Card className="p-8">
        {/* Summary */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-border">
            <span className="text-gray-600 dark:text-gray-400">Wallet</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {selectedWalletData?.flag} {selectedWalletData?.label}
            </span>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-border">
            <span className="text-gray-600 dark:text-gray-400">Method</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {selectedMethodData?.name}
            </span>
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
              {selectedMethodData?.fee}
            </span>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-dark-border">
            <span className="text-gray-600 dark:text-gray-400">Processing Time</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {selectedMethodData?.processingTime}
            </span>
          </div>

          <div className="flex items-center justify-between pt-4">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Credit</span>
            <span className="text-3xl font-bold text-success">
              {selectedWalletData?.symbol}{amount}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mb-8 p-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-xl">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-primary-900 dark:text-primary-300">
              {selectedMethod === 'bank'
                ? 'Please initiate the bank transfer using the provided details. Your funds will be credited once we receive the transfer.'
                : 'By confirming, you authorize this transaction. Your funds will be available according to the processing time shown above.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setStep('details')}
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
            Confirm & Add Funds
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
              All transactions are encrypted and processed securely. Your payment information is protected by bank-grade security.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default function AddFundsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddFundsPageContent />
    </Suspense>
  )
}
