'use client'

import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Receipt, Download, DollarSign, Calendar, CreditCard } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import { MOCK_STUDENTS, MOCK_PAYMENTS, getPaymentsForStudent } from '@/lib/mock-data/education'

export default function StudentPaymentHistoryPage() {
  const router = useRouter()
  const params = useParams()

  const student = MOCK_STUDENTS.find((s) => s.id === params.id)
  const payments = getPaymentsForStudent(params.id as string).sort(
    (a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
  )

  if (!student) {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Student Not Found</h1>
            </div>
          </div>
        </div>
        <Card className="p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Student not found</p>
          <Button onClick={() => router.push('/education/students')}>Back to Students</Button>
        </Card>
      </PageLayout>
    )
  }

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success'
      case 'partial':
        return 'warning'
      case 'overdue':
        return 'error'
      case 'pending':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{`${student.firstName} ${student.lastName} - Payment History`}</h1>
            <p className="text-gray-600 dark:text-gray-400">{student.studentId}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.push(`/education/students/${student.id}`)}
        >
          Back to Profile
        </Button>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Fees</h3>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(student.totalFees, 'USD')}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Paid</h3>
            <Receipt className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(student.totalPaid, 'USD')}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {payments.length} payment(s)
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">Balance Due</h3>
            <DollarSign className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {formatCurrency(student.balance, 'USD')}
          </div>
        </Card>
      </div>

      {/* Balance Breakdown */}
      {student.balance > 0 && (
        <Card className="p-6 mb-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-500/10 dark:to-red-500/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Outstanding Balance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please make a payment to clear your balance
              </p>
            </div>
            <Button
              variant="primary"
              icon={<DollarSign className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/education/payments/collect')}
            >
              Make Payment
            </Button>
          </div>
        </Card>
      )}

      {/* Payment Timeline */}
      <Card>
        <div className="p-6 border-b border-gray-200 dark:border-dark-border">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Timeline</h3>
        </div>

        {payments.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-dark-border">
            {payments.map((payment, index) => (
              <div key={payment.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Receipt className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {payment.description}
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(payment.paymentDate)}
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="w-4 h-4" />
                            {payment.paymentMethod.replace('-', ' ').toUpperCase()}
                          </div>
                          {payment.reference && (
                            <div className="text-xs">Ref: {payment.reference}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {formatCurrency(payment.amount, payment.currency)}
                        </div>
                        <Badge variant={getPaymentStatusVariant(payment.status)} size="sm">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Receipt: <span className="font-medium">{payment.receiptNumber}</span>
                      </div>
                      {payment.isInstallment && (
                        <Badge variant="info" size="sm">
                          Installment {payment.installmentNumber}/{payment.totalInstallments}
                        </Badge>
                      )}
                    </div>

                    {payment.notes && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-dark-card rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Note: {payment.notes}
                        </div>
                      </div>
                    )}

                    <div className="mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Download className="w-4 h-4" />}
                        iconPosition="left"
                      >
                        Download Receipt
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">No payment history available</p>
            <Button
              variant="primary"
              icon={<DollarSign className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/education/payments/collect')}
            >
              Make First Payment
            </Button>
          </div>
        )}
      </Card>

      {/* Upcoming Installments */}
      {student.balance > 0 && (
        <Card className="mt-8">
          <div className="p-6 border-b border-gray-200 dark:border-dark-border">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upcoming Installments
            </h3>
          </div>
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Installment schedule will be displayed here
            </p>
          </div>
        </Card>
      )}
    </PageLayout>
  )
}
