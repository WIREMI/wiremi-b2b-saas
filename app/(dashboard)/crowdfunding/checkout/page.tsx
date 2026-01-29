'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  CreditCard,
  Building2,
  Heart,
  CheckCircle2,
  Lock,
  AlertCircle,
  DollarSign,
  Percent,
  Calendar,
  FileText,
  TrendingUp
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/useToast'

// Mock campaign data (in real app, fetch by campaignId)
const getCampaignById = (id: string) => {
  const campaigns: Record<string, any> = {
    '1': {
      id: '1',
      title: 'EcoTech Solar Solutions - Series A Equity',
      companyName: 'EcoTech Solar Solutions Inc.',
      organizationName: 'EcoTech Solar Solutions Inc.',
      type: 'capital',
      capitalType: 'equity',
      equityOffered: 15,
      minInvestment: 1000,
      category: 'Clean Energy'
    },
    '2': {
      id: '2',
      title: 'Save the Ocean - Coral Reef Restoration',
      companyName: 'Ocean Conservation Alliance',
      organizationName: 'Ocean Conservation Alliance',
      type: 'donation',
      category: 'Environment'
    }
  }
  return campaigns[id] || campaigns['1']
}

function CheckoutForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()

  const campaignId = searchParams.get('campaignId') || '1'
  const amountParam = searchParams.get('amount') || '1000'
  const optionParam = searchParams.get('option') as 'equity' | 'debt' | 'hybrid' | null

  const campaign = getCampaignById(campaignId)
  const isDonation = campaign.type === 'donation'

  const [amount, setAmount] = useState(amountParam)
  const [investmentOption, setInvestmentOption] = useState<'equity' | 'debt' | 'hybrid'>(
    optionParam || 'equity'
  )
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processingFee, setProcessingFee] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  // Payment form state
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardName, setCardName] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [billingCity, setBillingCity] = useState('')
  const [billingZip, setBillingZip] = useState('')

  useEffect(() => {
    // Calculate processing fee (2.5% for cards, 1% for bank transfer)
    const amountNum = parseFloat(amount) || 0
    const feePercent = paymentMethod === 'card' ? 0.025 : 0.01
    setProcessingFee(amountNum * feePercent)
  }, [amount, paymentMethod])

  const totalAmount = parseFloat(amount) + processingFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreeToTerms) {
      showToast({
        type: 'error',
        title: 'Agreement Required',
        message: 'Please agree to the terms and conditions'
      })
      return
    }

    if (parseFloat(amount) < (campaign.minInvestment || 0)) {
      showToast({
        type: 'error',
        title: 'Invalid Amount',
        message: `Minimum ${isDonation ? 'donation' : 'investment'} is $${campaign.minInvestment?.toLocaleString()}`
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      showToast({
        type: 'success',
        title: isDonation ? 'Donation Successful!' : 'Investment Successful!',
        message: `Your ${isDonation ? 'donation' : 'investment'} of $${parseFloat(amount).toLocaleString()} has been processed`
      })

      // Redirect based on type
      setTimeout(() => {
        router.push(isDonation ? '/crowdfunding/my-donations' : '/crowdfunding/my-investments')
      }, 2000)
    }, 3000)
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.push(`/crowdfunding/campaigns/${campaignId}`)}
          className="mb-4"
        >
          Back to Campaign
        </Button>

        <div className="text-center">
          <div className={`w-20 h-20 ${
            isDonation ? 'bg-success/10 dark:bg-success/20' : 'bg-primary/10 dark:bg-primary/20'
          } rounded-2xl flex items-center justify-center mx-auto mb-4`}>
            {isDonation ? (
              <Heart className="w-10 h-10 text-success" />
            ) : (
              <TrendingUp className="w-10 h-10 text-primary" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isDonation ? 'Complete Your Donation' : 'Complete Your Investment'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Securely process your {isDonation ? 'donation' : 'investment'} to support this campaign
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Summary */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Campaign Details
            </h2>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${
                isDonation ? 'bg-success/10 dark:bg-success/20' : 'bg-primary/10 dark:bg-primary/20'
              } rounded-lg flex items-center justify-center flex-shrink-0`}>
                {isDonation ? (
                  <Heart className="w-6 h-6 text-success" />
                ) : (
                  <Building2 className="w-6 h-6 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {campaign.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {campaign.organizationName}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant={isDonation ? 'success' : 'primary'} size="sm">
                    {isDonation ? 'Donation' : 'Capital Raise'}
                  </Badge>
                  <Badge variant="default" size="sm">{campaign.category}</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Investment/Donation Amount */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {isDonation ? 'Donation Amount' : 'Investment Amount'}
            </h2>

            {!isDonation && campaign.capitalType === 'hybrid' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Investment Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setInvestmentOption('equity')}
                    className={`p-3 text-sm font-medium rounded-lg border-2 transition-colors ${
                      investmentOption === 'equity'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-primary/50'
                    }`}
                  >
                    Equity
                  </button>
                  <button
                    type="button"
                    onClick={() => setInvestmentOption('debt')}
                    className={`p-3 text-sm font-medium rounded-lg border-2 transition-colors ${
                      investmentOption === 'debt'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-primary/50'
                    }`}
                  >
                    Debt
                  </button>
                  <button
                    type="button"
                    onClick={() => setInvestmentOption('hybrid')}
                    className={`p-3 text-sm font-medium rounded-lg border-2 transition-colors ${
                      investmentOption === 'hybrid'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-primary/50'
                    }`}
                  >
                    Both
                  </button>
                </div>
              </div>
            )}

            {isDonation && (
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[25, 50, 100, 250].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className={`px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-colors ${
                      amount === preset.toString()
                        ? 'border-success bg-success/10 text-success'
                        : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-success/50'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            )}

            <Input
              label="Amount ($)"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              icon={<DollarSign className="w-4 h-4" />}
              iconPosition="left"
              helperText={
                !isDonation && campaign.minInvestment
                  ? `Minimum investment: $${campaign.minInvestment.toLocaleString()}`
                  : 'Any amount helps make a difference'
              }
              required
            />
          </Card>

          {/* Payment Method */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Payment Method
            </h2>

            <div className="space-y-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-gray-200 dark:border-dark-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Credit/Debit Card
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Visa, Mastercard, Amex (2.5% fee)
                      </div>
                    </div>
                  </div>
                  {paymentMethod === 'card' && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  paymentMethod === 'bank'
                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-gray-200 dark:border-dark-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Bank Transfer
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Direct bank transfer (1% fee)
                      </div>
                    </div>
                  </div>
                  {paymentMethod === 'bank' && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>
            </div>

            {/* Card Details */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <Input
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  icon={<CreditCard className="w-4 h-4" />}
                  iconPosition="left"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    required
                  />
                  <Input
                    label="CVC"
                    placeholder="123"
                    type="password"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    required
                  />
                </div>
                <Input
                  label="Cardholder Name"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Bank Details */}
            {paymentMethod === 'bank' && (
              <div className="p-4 bg-info/5 dark:bg-info/10 rounded-lg border border-info/20">
                <div className="flex gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-info flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      Bank Transfer Instructions
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      Your {isDonation ? 'donation' : 'investment'} will be processed once we receive your bank transfer. Please use the reference number below.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Bank Name:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">Wiremi Bank</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Account Number:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Reference:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">CF-{campaignId}-{Date.now()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Billing Address */}
          {paymentMethod === 'card' && (
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Billing Address
              </h2>
              <div className="space-y-4">
                <Input
                  label="Street Address"
                  placeholder="123 Main St"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    placeholder="San Francisco"
                    value={billingCity}
                    onChange={(e) => setBillingCity(e.target.value)}
                    required
                  />
                  <Input
                    label="Zip Code"
                    placeholder="94102"
                    value={billingZip}
                    onChange={(e) => setBillingZip(e.target.value)}
                    required
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Terms */}
          <Card className="p-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                . {!isDonation && (
                  <>
                    I understand that investing in startups involves risk and I could lose all of my investment.
                  </>
                )}
              </span>
            </label>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {isDonation ? 'Donation Amount' : 'Investment Amount'}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${parseFloat(amount || '0').toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Processing Fee ({paymentMethod === 'card' ? '2.5%' : '1%'})
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${processingFee.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-dark-border">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={isProcessing || !agreeToTerms}
                  icon={isProcessing ? undefined : <Lock className="w-5 h-5" />}
                  iconPosition="left"
                >
                  {isProcessing ? 'Processing...' : `${isDonation ? 'Donate' : 'Invest'} $${totalAmount.toFixed(2)}`}
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  <Lock className="w-3 h-3" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </div>
            </Card>

            {/* Investment/Donation Details */}
            {!isDonation && (
              <Card className="p-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  What You'll Get
                </h4>
                <div className="space-y-3 text-sm">
                  {campaign.equityOffered && (
                    <div className="flex items-start gap-2">
                      <Percent className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          Equity Stake
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {((parseFloat(amount) / 500000) * campaign.equityOffered).toFixed(3)}% ownership
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Investment Certificate
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Emailed within 48 hours
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Updates & Reports
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Quarterly investor updates
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {isDonation && (
              <Card className="p-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Your Impact
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Tax-Deductible Receipt
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Emailed immediately
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Impact Reports
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Regular updates on your contribution
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        100% Goes to Cause
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        We cover platform fees
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <PageLayout maxWidth="wide">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading checkout...</p>
          </div>
        </div>
      </PageLayout>
    }>
      <CheckoutForm />
    </Suspense>
  )
}
