'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DollarSign,
  Search,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building,
  Bitcoin,
  Wallet,
  Info,
  Check,
  ArrowRight,
  Zap,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/toast'
import { formatCurrency } from '@/lib/utils'
import { MOCK_STUDENTS } from '@/lib/mock-data/education'

type PaymentMethod = 'card' | 'mobile-money' | 'bank-transfer' | 'crypto' | 'wallet' | 'cash'

export default function CollectEducationPaymentPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<string>('')
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [paymentData, setPaymentData] = useState({
    amount: '',
    reference: '',
    notes: '',
  })

  const activeStudents = MOCK_STUDENTS.filter((s) => s.status === 'active' && s.balance > 0)
  const filteredStudents = activeStudents.filter((student) =>
    `${student.firstName} ${student.lastName} ${student.studentId}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const student = MOCK_STUDENTS.find((s) => s.id === selectedStudent)

  // Payment methods powered by Wiremi Financial Core
  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      name: 'Card Payment',
      icon: CreditCard,
      description: 'Visa, Mastercard, Amex',
      processingTime: 'Instant',
      badge: 'Most Popular',
    },
    {
      id: 'mobile-money' as PaymentMethod,
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'MTN, Orange, Airtel',
      processingTime: 'Instant',
      badge: null,
    },
    {
      id: 'bank-transfer' as PaymentMethod,
      name: 'Bank Transfer',
      icon: Building,
      description: 'Direct bank payment',
      processingTime: '1-2 business days',
      badge: null,
    },
    {
      id: 'crypto' as PaymentMethod,
      name: 'Cryptocurrency',
      icon: Bitcoin,
      description: 'BTC, ETH, USDT',
      processingTime: '10-30 minutes',
      badge: null,
    },
    {
      id: 'wallet' as PaymentMethod,
      name: 'Wiremi Wallet',
      icon: Wallet,
      description: 'Pay from wallet balance',
      processingTime: 'Instant',
      badge: 'Fastest',
    },
    {
      id: 'cash' as PaymentMethod,
      name: 'Cash Payment',
      icon: DollarSign,
      description: 'In-person cash',
      processingTime: 'Manual verification',
      badge: null,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedMethod) {
      showToast({
        type: 'error',
        title: 'Payment Method Required',
        message: 'Please select a payment method to continue'
      })
      return
    }

    setLoading(true)

    // Simulate PaymentIntent creation via Financial Core
    setTimeout(() => {
      setLoading(false)
      showToast({
        type: 'success',
        title: 'Payment Initiated',
        message: `Payment of ${formatCurrency(parseFloat(paymentData.amount), 'USD')} via ${paymentMethods.find(m => m.id === selectedMethod)?.name} is being processed`
      })
      router.push('/education/payments')
    }, 1500)
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/education/payments')}
          >
            Back to Payments
          </Button>

          <div className="mt-4">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Collect Student Payment
              </h1>
              <Badge variant="info" size="sm">
                <Zap className="w-3 h-3 mr-1" />
                Financial Core
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Process fee payment through Wiremi's unified payment infrastructure
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Selection */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                1. Select Student
              </h3>
              <Input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
                className="mb-4"
              />
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredStudents.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStudent(s.id)
                      setPaymentData({ ...paymentData, amount: '' })
                    }}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedStudent === s.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500 shadow-sm'
                        : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {s.firstName} {s.lastName}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{s.studentId}</div>
                      </div>
                      {selectedStudent === s.id && (
                        <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      )}
                    </div>
                    <div className="text-sm font-semibold text-orange-600 dark:text-orange-400 mt-2">
                      Outstanding: {formatCurrency(s.balance, 'USD')}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Payment Details */}
          <div className="lg:col-span-2">
            {student ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Info */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      2. Payment Details
                    </h3>
                    <Badge variant="success">{student.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Name</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {student.firstName} {student.lastName}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Student ID</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {student.studentId}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Program</div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {student.program}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Level</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {student.level}
                      </div>
                    </div>
                  </div>

                  {/* Fee Balance */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Fees</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(student.totalFees, 'USD')}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Paid</div>
                      <div className="text-lg font-bold text-success">
                        {formatCurrency(student.totalPaid, 'USD')}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Outstanding</div>
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        {formatCurrency(student.balance, 'USD')}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Payment Method Selection */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    3. Choose Payment Method
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    All methods are powered by Wiremi's secure financial infrastructure
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon
                      const isSelected = selectedMethod === method.id
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSelectedMethod(method.id)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            isSelected
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-sm'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isSelected
                                  ? 'bg-primary-100 dark:bg-primary-800'
                                  : 'bg-gray-100 dark:bg-gray-700'
                              }`}>
                                <Icon className={`w-5 h-5 ${
                                  isSelected
                                    ? 'text-primary-600 dark:text-primary-400'
                                    : 'text-gray-600 dark:text-gray-400'
                                }`} />
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {method.name}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {method.description}
                                </div>
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {method.processingTime}
                            </span>
                            {method.badge && (
                              <Badge variant="success" size="sm">
                                {method.badge}
                              </Badge>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </Card>

                {/* Amount and Details */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    4. Enter Amount
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Input
                        label="Payment Amount (USD)"
                        type="number"
                        step="0.01"
                        required
                        placeholder="0.00"
                        value={paymentData.amount}
                        onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setPaymentData({ ...paymentData, amount: (student.balance / 2).toString() })}
                        >
                          Pay Half
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setPaymentData({ ...paymentData, amount: student.balance.toString() })}
                        >
                          Pay Full
                        </Button>
                      </div>
                    </div>

                    <Input
                      label="Reference Number (Optional)"
                      placeholder="Transaction reference"
                      value={paymentData.reference}
                      onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Add payment notes..."
                      value={paymentData.notes}
                      onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                    />
                  </div>

                  {/* Financial Core Notice */}
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900 dark:text-blue-100">
                        <strong>Powered by Wiremi Financial Core:</strong> This payment will be processed
                        through Wiremi's unified payment infrastructure, with automatic ledgering,
                        settlement, and wallet updates.
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Submit */}
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/education/payments')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                    loading={loading}
                    disabled={!selectedMethod || !paymentData.amount}
                  >
                    Process Payment via {selectedMethod && paymentMethods.find(m => m.id === selectedMethod)?.name}
                  </Button>
                </div>
              </form>
            ) : (
              <Card className="p-12 text-center">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select a student to begin
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a student from the list to process their payment
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
