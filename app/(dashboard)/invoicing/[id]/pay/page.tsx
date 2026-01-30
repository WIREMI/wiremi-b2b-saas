'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import {
  CreditCard,
  Building,
  Smartphone,
  Bitcoin,
  CheckCircle,
  Lock,
  ChevronRight,
  ArrowLeft,
  DollarSign,
  Calendar,
  FileText,
} from 'lucide-react'
import { getInvoice } from '@/lib/mock-data/invoicing'
import { PaymentMethod, formatCurrency } from '@/types/invoicing'

const paymentMethods: Array<{ id: PaymentMethod; name: string; icon: any; description: string }> = [
  { id: 'CREDIT_CARD', name: 'Credit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
  { id: 'DEBIT_CARD', name: 'Debit Card', icon: CreditCard, description: 'Debit cards accepted' },
  { id: 'BANK_TRANSFER', name: 'Bank Transfer', icon: Building, description: 'Direct bank transfer' },
  { id: 'ACH', name: 'ACH Transfer', icon: Building, description: 'Automated Clearing House' },
  { id: 'WIRE_TRANSFER', name: 'Wire Transfer', icon: Building, description: 'International wire' },
  { id: 'PAYPAL', name: 'PayPal', icon: DollarSign, description: 'Pay with PayPal' },
  { id: 'STRIPE', name: 'Stripe', icon: CreditCard, description: 'Secure payment via Stripe' },
  { id: 'CRYPTO', name: 'Cryptocurrency', icon: Bitcoin, description: 'Bitcoin, Ethereum' },
  { id: 'MOBILE_MONEY', name: 'Mobile Money', icon: Smartphone, description: 'M-Pesa, GCash, etc.' },
]

export default function PayInvoicePage() {
  const router = useRouter()
  const params = useParams()
  const invoice = getInvoice(params.id as string)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    zip: '',
  })

  const [bankInfo, setBankInfo] = useState({
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    bankName: '',
  })

  if (!invoice) {
    return (
      <PageLayout maxWidth="wide">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Invoice Not Found</h1>
            <Button onClick={() => router.push('/invoicing')}>Back to Invoices</Button>
          </div>
        </div>
      </PageLayout>
    )
  }

  const availableMethods = paymentMethods.filter((method) =>
    invoice.acceptedPaymentMethods.includes(method.id)
  )

  const handlePayment = async () => {
    if (!selectedMethod) return

    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setPaymentComplete(true)
  }

  if (paymentComplete) {
    return (
      <PageLayout maxWidth="wide">
        <div className="flex items-center justify-center min-h-[60vh] p-4">
          <Card className="max-w-2xl w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Your payment has been processed
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Invoice</p>
                <p className="font-semibold text-gray-900 dark:text-white">{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Amount Paid</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(invoice.amountDue, invoice.currency)}
                </p>
              </div>
              <div className="text-left">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Payment Method</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {paymentMethods.find((m) => m.id === selectedMethod)?.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Date</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6 text-sm text-blue-900 dark:text-blue-100">
            <p className="font-medium mb-1">Payment Confirmation Sent</p>
            <p>A receipt has been sent to {invoice.clientEmail}</p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => router.push(`/invoicing/${invoice.id}`)} className="flex-1">
              View Invoice
            </Button>
            <Button onClick={() => router.push('/invoicing')} className="flex-1">
              Back to Invoices
            </Button>
          </div>
        </Card>
      </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push(`/invoicing/${invoice.id}`)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Invoice</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pay Invoice</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete payment for {invoice.invoiceNumber}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Select Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg transition-colors text-left ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedMethod === method.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{method.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{method.description}</p>
                      </div>
                      {selectedMethod === method.id && <CheckCircle className="w-5 h-5 text-blue-500" />}
                    </button>
                  )
                })}
              </div>
            </Card>

            {/* Payment Details Form */}
            {selectedMethod && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment Details</h2>

                {(selectedMethod === 'CREDIT_CARD' || selectedMethod === 'DEBIT_CARD') && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Card Number *
                      </label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardInfo.number}
                        onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Expiry Date *
                        </label>
                        <Input
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV *
                        </label>
                        <Input
                          type="password"
                          placeholder="123"
                          value={cardInfo.cvv}
                          onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cardholder Name *
                      </label>
                      <Input
                        placeholder="Name on card"
                        value={cardInfo.name}
                        onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Billing ZIP Code *
                      </label>
                      <Input
                        placeholder="12345"
                        value={cardInfo.zip}
                        onChange={(e) => setCardInfo({ ...cardInfo, zip: e.target.value })}
                        maxLength={10}
                      />
                    </div>
                  </div>
                )}

                {(selectedMethod === 'BANK_TRANSFER' || selectedMethod === 'ACH') && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Account Holder Name *
                      </label>
                      <Input
                        placeholder="Full name"
                        value={bankInfo.accountName}
                        onChange={(e) => setBankInfo({ ...bankInfo, accountName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Account Number *
                      </label>
                      <Input
                        placeholder="Account number"
                        value={bankInfo.accountNumber}
                        onChange={(e) => setBankInfo({ ...bankInfo, accountNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Routing Number *
                      </label>
                      <Input
                        placeholder="Routing number"
                        value={bankInfo.routingNumber}
                        onChange={(e) => setBankInfo({ ...bankInfo, routingNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bank Name *
                      </label>
                      <Input
                        placeholder="Your bank name"
                        value={bankInfo.bankName}
                        onChange={(e) => setBankInfo({ ...bankInfo, bankName: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === 'PAYPAL' && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      You will be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                )}

                {selectedMethod === 'STRIPE' && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      You will be redirected to Stripe to complete your payment securely.
                    </p>
                  </div>
                )}

                {selectedMethod === 'WIRE_TRANSFER' && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Wire Transfer Instructions
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Please initiate a wire transfer with your bank using the following details:
                    </p>
                    <div className="space-y-1 text-sm">
                      <p><strong>Beneficiary:</strong> {invoice.senderName}</p>
                      <p><strong>Bank:</strong> Example Bank</p>
                      <p><strong>Account:</strong> 1234567890</p>
                      <p><strong>SWIFT:</strong> EXAMPLEXXX</p>
                      <p><strong>Reference:</strong> {invoice.invoiceNumber}</p>
                    </div>
                  </div>
                )}

                {selectedMethod === 'CRYPTO' && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Cryptocurrency payment wallet address will be provided after confirmation.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Accepts BTC, ETH, USDT</p>
                  </div>
                )}

                {selectedMethod === 'MOBILE_MONEY' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mobile Number *
                      </label>
                      <Input placeholder="+1 (555) 000-0000" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      You will receive a payment prompt on your mobile device
                    </p>
                  </div>
                )}
              </Card>
            )}

            {/* Security Notice */}
            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="text-sm font-medium text-green-900 dark:text-green-100">Secure Payment</p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Payment Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Summary</h3>

                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Invoice</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{invoice.invoiceNumber}</p>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Bill To</p>
                  <p className="font-medium text-gray-900 dark:text-white">{invoice.clientName}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                  </div>
                  {invoice.taxes.map((tax) => (
                    <div key={tax.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{tax.name}</span>
                      <span className="text-gray-900 dark:text-white">{formatCurrency(tax.amount, invoice.currency)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={!selectedMethod || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    'Processing...'
                  ) : (
                    <>
                      Pay {formatCurrency(invoice.amountDue, invoice.currency)}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  By completing this payment, you agree to the terms and conditions
                </p>
              </Card>
            </div>
          </div>
        </div>
    </PageLayout>
  )
}
