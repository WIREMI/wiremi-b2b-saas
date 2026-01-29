'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, ArrowLeft, Receipt, Clock, Check, X, DollarSign, User, Mail, Phone, Printer, Download, TrendingUp } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type TransactionStatus = 'processing' | 'success' | 'failed'

interface Transaction {
  id: string
  amount: number
  currency: string
  cardLast4: string
  cardBrand: string
  customerName: string
  customerEmail: string
  status: TransactionStatus
  timestamp: string
  receiptUrl?: string
}

// Mock transaction history
const mockTransactions: Transaction[] = [
  {
    id: 'txn_1',
    amount: 249.99,
    currency: 'USD',
    cardLast4: '4242',
    cardBrand: 'Visa',
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    status: 'success',
    timestamp: '2026-01-21T14:30:00Z',
  },
  {
    id: 'txn_2',
    amount: 89.50,
    currency: 'USD',
    cardLast4: '5555',
    cardBrand: 'Mastercard',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@example.com',
    status: 'success',
    timestamp: '2026-01-21T13:15:00Z',
  },
  {
    id: 'txn_3',
    amount: 150.00,
    currency: 'USD',
    cardLast4: '3782',
    cardBrand: 'Amex',
    customerName: 'Michael Brown',
    customerEmail: 'mbrown@example.com',
    status: 'failed',
    timestamp: '2026-01-21T12:45:00Z',
  },
  {
    id: 'txn_4',
    amount: 499.99,
    currency: 'USD',
    cardLast4: '6011',
    cardBrand: 'Discover',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@example.com',
    status: 'success',
    timestamp: '2026-01-21T11:20:00Z',
  },
]

export default function POSPage() {
  const router = useRouter()
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [currentStep, setCurrentStep] = useState<'input' | 'processing' | 'result'>('input')
  const [transactionResult, setTransactionResult] = useState<TransactionStatus | null>(null)

  // Form states
  const [amount, setAmount] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [description, setDescription] = useState('')

  // Statistics
  const todayTransactions = transactions.filter(t => {
    const today = new Date().toDateString()
    return new Date(t.timestamp).toDateString() === today
  })
  const todayRevenue = todayTransactions
    .filter(t => t.status === 'success')
    .reduce((acc, t) => acc + t.amount, 0)
  const successRate = transactions.length > 0
    ? (transactions.filter(t => t.status === 'success').length / transactions.length * 100).toFixed(1)
    : '0'

  const processPayment = () => {
    setCurrentStep('processing')

    // Simulate payment processing
    setTimeout(() => {
      const isSuccess = Math.random() > 0.1 // 90% success rate
      const status: TransactionStatus = isSuccess ? 'success' : 'failed'
      setTransactionResult(status)
      setCurrentStep('result')

      if (isSuccess) {
        const newTransaction: Transaction = {
          id: `txn_${Date.now()}`,
          amount: parseFloat(amount),
          currency: 'USD',
          cardLast4: cardNumber.slice(-4),
          cardBrand: getCardBrand(cardNumber),
          customerName: customerName || cardholderName,
          customerEmail: customerEmail || 'N/A',
          status: 'success',
          timestamp: new Date().toISOString(),
        }
        setTransactions([newTransaction, ...transactions])
      }
    }, 2000)
  }

  const getCardBrand = (number: string): string => {
    const firstDigit = number.charAt(0)
    if (firstDigit === '4') return 'Visa'
    if (firstDigit === '5') return 'Mastercard'
    if (firstDigit === '3') return 'Amex'
    if (firstDigit === '6') return 'Discover'
    return 'Card'
  }

  const resetTerminal = () => {
    setCurrentStep('input')
    setTransactionResult(null)
    setAmount('')
    setCardNumber('')
    setExpiryDate('')
    setCvc('')
    setCardholderName('')
    setCustomerName('')
    setCustomerEmail('')
    setCustomerPhone('')
    setDescription('')
  }

  const closeTerminal = () => {
    resetTerminal()
    setIsTerminalOpen(false)
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const chunks = cleaned.match(/.{1,4}/g) || []
    return chunks.join(' ')
  }

  const printReceipt = (transaction: Transaction) => {
    alert(`Printing receipt for transaction ${transaction.id}`)
  }

  const downloadReceipt = (transaction: Transaction) => {
    alert(`Downloading receipt for transaction ${transaction.id}`)
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/payments')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                POS Terminal
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Accept card payments in-person with virtual terminal
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<CreditCard className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => setIsTerminalOpen(true)}
          >
            Open Terminal
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Today's Revenue</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${todayRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>{todayTransactions.length} transactions today</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Transactions</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{transactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Receipt className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>All time</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{successRate}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Based on all transactions</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Transaction History */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Recent Transactions
        </h2>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-hover rounded-xl border border-gray-200 dark:border-dark-border"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  transaction.status === 'success'
                    ? 'bg-green-100 dark:bg-green-500/20'
                    : 'bg-red-100 dark:bg-red-500/20'
                }`}>
                  {transaction.status === 'success' ? (
                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                  ) : (
                    <X className="w-6 h-6 text-red-600 dark:text-red-400" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {transaction.customerName}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'success'
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{transaction.cardBrand} •••• {transaction.cardLast4}</span>
                    <span>•</span>
                    <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                    <span>•</span>
                    <span>{transaction.customerEmail}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {transaction.currency}
                  </p>
                </div>

                {transaction.status === 'success' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => printReceipt(transaction)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-dark-border rounded-lg transition-colors"
                      title="Print Receipt"
                    >
                      <Printer className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => downloadReceipt(transaction)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-dark-border rounded-lg transition-colors"
                      title="Download Receipt"
                    >
                      <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {transactions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-dark-hover rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">No transactions yet</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-2">
                Process your first payment to see it here
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Virtual Terminal Modal */}
      {isTerminalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-50 dark:bg-dark-surface rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Virtual POS Terminal
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Process card payment manually
                  </p>
                </div>
                <button
                  onClick={closeTerminal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {currentStep === 'input' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Payment Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Payment Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Amount *
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 dark:text-gray-400">$</span>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-2xl font-bold"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description (Optional)
                        </label>
                        <input
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="e.g., Product purchase, Service fee"
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-8">
                      Customer Information (Optional)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Customer Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="John Smith"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="customer@example.com"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Card Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          value={formatCardNumber(cardNumber)}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ''))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-lg"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-lg"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVC *
                          </label>
                          <input
                            type="text"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-lg"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                          placeholder="JOHN SMITH"
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent uppercase"
                          required
                        />
                      </div>

                      {/* Card Preview */}
                      <div className="mt-8 p-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl text-white">
                        <div className="flex justify-between items-start mb-8">
                          <div className="w-12 h-8 bg-yellow-400 rounded"></div>
                          <CreditCard className="w-8 h-8 opacity-50" />
                        </div>
                        <div className="mb-6">
                          <p className="text-xl font-mono tracking-wider">
                            {formatCardNumber(cardNumber) || '•••• •••• •••• ••••'}
                          </p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs opacity-70 mb-1">CARDHOLDER</p>
                            <p className="font-semibold uppercase">
                              {cardholderName || 'YOUR NAME'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs opacity-70 mb-1">EXPIRES</p>
                            <p className="font-semibold">
                              {expiryDate || 'MM/YY'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 'processing' && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Clock className="w-12 h-12 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Processing Payment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Please wait while we process the transaction...
                  </p>
                </div>
              )}

              {currentStep === 'result' && (
                <div className="text-center py-16">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    transactionResult === 'success'
                      ? 'bg-green-100 dark:bg-green-500/20'
                      : 'bg-red-100 dark:bg-red-500/20'
                  }`}>
                    {transactionResult === 'success' ? (
                      <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
                    ) : (
                      <X className="w-12 h-12 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {transactionResult === 'success' ? 'Payment Successful!' : 'Payment Failed'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {transactionResult === 'success'
                      ? `Successfully charged $${parseFloat(amount).toFixed(2)}`
                      : 'The payment could not be processed. Please try again.'}
                  </p>

                  {transactionResult === 'success' && (
                    <div className="max-w-md mx-auto mb-8 p-6 bg-gray-50 dark:bg-dark-hover rounded-xl">
                      <div className="space-y-3 text-left">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Amount</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ${parseFloat(amount).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Card</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {getCardBrand(cardNumber)} •••• {cardNumber.slice(-4)}
                          </span>
                        </div>
                        {customerName && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Customer</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {customerName}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Time</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {new Date().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 justify-center">
                    {transactionResult === 'success' && (
                      <Button
                        variant="outline"
                        icon={<Printer className="w-5 h-5" />}
                        iconPosition="left"
                        onClick={() => alert('Printing receipt...')}
                      >
                        Print Receipt
                      </Button>
                    )}
                    <Button
                      variant="primary"
                      onClick={transactionResult === 'success' ? resetTerminal : () => setCurrentStep('input')}
                    >
                      {transactionResult === 'success' ? 'New Transaction' : 'Try Again'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {currentStep === 'input' && (
              <div className="p-6 border-t border-gray-200 dark:border-dark-border flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={closeTerminal}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={processPayment}
                  disabled={!amount || !cardNumber || !expiryDate || !cvc || !cardholderName}
                  icon={<CreditCard className="w-5 h-5" />}
                  iconPosition="left"
                >
                  Charge ${amount || '0.00'}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </PageLayout>
  )
}
