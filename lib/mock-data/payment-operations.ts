/**
 * Payment Operations Mock Data
 * Comprehensive mock data for payment transactions, failures, chargebacks, refunds, and processor health
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

export type TransactionType = 'payment' | 'refund' | 'payout' | 'adjustment' | 'reversal'
export type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
export type PaymentProcessor = 'stripe' | 'paypal' | 'square' | 'adyen' | 'flutterwave'

export interface Transaction {
  id: string
  businessId: string
  businessName: string
  amount: number
  currency: string
  type: TransactionType
  status: TransactionStatus
  processor: PaymentProcessor
  timestamp: string
  completedAt?: string
  metadata?: {
    description?: string
    orderId?: string
    customerId?: string
    [key: string]: any
  }
}

export interface FailedPayment {
  id: string
  transactionId: string
  businessId: string
  businessName: string
  amount: number
  currency: string
  errorCode: string
  errorMessage: string
  failureReason: 'insufficient_funds' | 'card_declined' | 'expired_card' | 'invalid_cvv' | 'processor_error' | 'network_error' | 'authentication_failed' | 'rate_limit' | 'other'
  processor: PaymentProcessor
  failedAt: string
  retryCount: number
  nextRetryAt?: string
  canRetry: boolean
}

export interface Chargeback {
  id: string
  transactionId: string
  businessId: string
  businessName: string
  amount: number
  currency: string
  status: 'pending' | 'under_review' | 'won' | 'lost' | 'settled'
  reason: 'fraudulent' | 'product_not_received' | 'product_unacceptable' | 'duplicate_transaction' | 'unauthorized' | 'other'
  filedAt: string
  dueDate?: string
  resolvedAt?: string
  winRate?: number
  evidenceUploaded: boolean
  notes?: string
}

export interface RefundRequest {
  id: string
  transactionId: string
  businessId: string
  businessName: string
  amount: number
  currency: string
  status: 'pending' | 'approved' | 'rejected' | 'processed'
  reason: string
  requestedAt: string
  approvedAt?: string
  approvedBy?: string
  processedAt?: string
  rejectionReason?: string
}

export interface ProcessorStatus {
  processor: PaymentProcessor
  status: 'operational' | 'degraded' | 'offline'
  uptime: number
  lastStatusCheck: string
  successRate: number
  averageResponseTime: number
  transactionsProcessed: number
  failureCount: number
}

// ============================================
// MOCK DATA GENERATORS
// ============================================

const BUSINESS_NAMES = [
  'Tech Innovations Ltd',
  'Global Commerce Co',
  'Digital Solutions Inc',
  'Enterprise Systems',
  'Market Leaders LLC',
  'Innovation Hub',
  'Future Tech Inc',
  'Data Analytics Pro',
  'Cloud Services Co',
  'Business Solutions',
  'Premium Analytics',
  'Growth Partners',
  'Smart Retail Corp',
  'Finance Plus',
  'Logistics Network',
  'E-Commerce Pro',
  'Payment Gateway Ltd',
  'Trading Hub Inc',
  'Investment Partners',
  'Marketplace Solutions'
]

const PROCESSORS: PaymentProcessor[] = ['stripe', 'paypal', 'square', 'adyen', 'flutterwave']

const ERROR_CODES: Record<string, string> = {
  'INSUF_FUNDS': 'Insufficient Funds',
  'CARD_DECLINED': 'Card Declined',
  'EXPIRED_CARD': 'Expired Card',
  'INVALID_CVV': 'Invalid CVV',
  'PROC_ERROR': 'Processor Error',
  'NET_ERROR': 'Network Error',
  'AUTH_FAILED': 'Authentication Failed',
  'RATE_LIMIT': 'Rate Limit Exceeded',
  'INVALID_AMOUNT': 'Invalid Amount',
  'DUPLICATE': 'Duplicate Transaction'
}

const FAILURE_REASONS: FailedPayment['failureReason'][] = [
  'insufficient_funds',
  'card_declined',
  'expired_card',
  'invalid_cvv',
  'processor_error',
  'network_error',
  'authentication_failed',
  'rate_limit',
  'other'
]

const CHARGEBACK_REASONS = [
  'fraudulent',
  'product_not_received',
  'product_unacceptable',
  'duplicate_transaction',
  'unauthorized',
  'other'
]

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomBusinessName(): string {
  return getRandomItem(BUSINESS_NAMES)
}

function generateTransactionId(): string {
  return 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase()
}

function generateChargebackId(): string {
  return 'CB_' + Math.random().toString(36).substr(2, 9).toUpperCase()
}

function generateRefundId(): string {
  return 'REF_' + Math.random().toString(36).substr(2, 9).toUpperCase()
}

function generateBusinessId(): string {
  return 'BIZ_' + Math.random().toString(36).substr(2, 9).toUpperCase()
}

function getRandomDate(daysAgo: number = 30): string {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))
  date.setHours(Math.floor(Math.random() * 24))
  date.setMinutes(Math.floor(Math.random() * 60))
  return date.toISOString()
}

// ============================================
// MOCK DATA ARRAYS
// ============================================

export const MOCK_TRANSACTIONS: Transaction[] = Array.from({ length: 65 }, (_, i) => {
  const timestamp = getRandomDate(30)
  const status = Math.random() > 0.05 ? 'completed' : getRandomItem(['pending', 'processing', 'failed', 'cancelled'])

  return {
    id: generateTransactionId(),
    businessId: generateBusinessId(),
    businessName: getRandomBusinessName(),
    amount: Math.floor(Math.random() * 50000) + 100,
    currency: 'USD',
    type: getRandomItem(['payment', 'refund', 'payout', 'adjustment', 'reversal'] as TransactionType[]),
    status: status as TransactionStatus,
    processor: getRandomItem(PROCESSORS),
    timestamp,
    completedAt: status === 'completed' ? new Date(new Date(timestamp).getTime() + Math.random() * 3600000).toISOString() : undefined,
    metadata: {
      description: `Transaction for ${getRandomBusinessName()}`,
      orderId: 'ORD_' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      customerId: 'CUST_' + Math.random().toString(36).substr(2, 8).toUpperCase()
    }
  }
})

export const MOCK_FAILED_PAYMENTS: FailedPayment[] = Array.from({ length: 28 }, (_, i) => {
  const failedAt = getRandomDate(30)
  const retryCount = Math.floor(Math.random() * 4)
  const canRetry = retryCount < 3

  return {
    id: 'FP_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    transactionId: generateTransactionId(),
    businessId: generateBusinessId(),
    businessName: getRandomBusinessName(),
    amount: Math.floor(Math.random() * 25000) + 50,
    currency: 'USD',
    errorCode: getRandomItem(Object.keys(ERROR_CODES)),
    errorMessage: getRandomItem(Object.values(ERROR_CODES)),
    failureReason: getRandomItem(FAILURE_REASONS),
    processor: getRandomItem(PROCESSORS),
    failedAt,
    retryCount,
    nextRetryAt: canRetry ? new Date(new Date(failedAt).getTime() + (1 + retryCount) * 3600000).toISOString() : undefined,
    canRetry
  }
})

export const MOCK_CHARGEBACKS: Chargeback[] = Array.from({ length: 18 }, (_, i) => {
  const filedAt = getRandomDate(60)
  const status = getRandomItem(['pending', 'under_review', 'won', 'lost', 'settled'] as const)
  const resolvedAt = ['won', 'lost', 'settled'].includes(status)
    ? new Date(new Date(filedAt).getTime() + Math.random() * 30 * 24 * 3600000).toISOString()
    : undefined

  return {
    id: generateChargebackId(),
    transactionId: generateTransactionId(),
    businessId: generateBusinessId(),
    businessName: getRandomBusinessName(),
    amount: Math.floor(Math.random() * 15000) + 100,
    currency: 'USD',
    status,
    reason: getRandomItem(CHARGEBACK_REASONS as Chargeback['reason'][]),
    filedAt,
    dueDate: new Date(new Date(filedAt).getTime() + 45 * 24 * 3600000).toISOString(),
    resolvedAt,
    winRate: Math.random() > 0.5 ? Math.floor(Math.random() * 60) + 40 : undefined,
    evidenceUploaded: Math.random() > 0.3,
    notes: Math.random() > 0.5 ? `Dispute regarding transaction authenticity and customer claims.` : undefined
  }
})

export const MOCK_REFUNDS: RefundRequest[] = Array.from({ length: 35 }, (_, i) => {
  const requestedAt = getRandomDate(30)
  const status = Math.random() > 0.2 ? 'processed' : getRandomItem(['pending', 'approved', 'rejected'] as const)
  const approvedAt = ['approved', 'processed'].includes(status)
    ? new Date(new Date(requestedAt).getTime() + Math.random() * 24 * 3600000).toISOString()
    : undefined
  const processedAt = status === 'processed'
    ? new Date(new Date(approvedAt || requestedAt).getTime() + Math.random() * 24 * 3600000).toISOString()
    : undefined

  return {
    id: generateRefundId(),
    transactionId: generateTransactionId(),
    businessId: generateBusinessId(),
    businessName: getRandomBusinessName(),
    amount: Math.floor(Math.random() * 20000) + 50,
    currency: 'USD',
    status,
    reason: getRandomItem([
      'Customer requested cancellation',
      'Product defect',
      'Duplicate charge',
      'Service not rendered',
      'Customer dissatisfaction',
      'Partial refund for returned items'
    ]),
    requestedAt,
    approvedAt,
    approvedBy: approvedAt ? getRandomItem(['admin_user_1', 'admin_user_2', 'admin_user_3']) : undefined,
    processedAt,
    rejectionReason: status === 'rejected' ? getRandomItem([
      'Outside refund window',
      'Insufficient documentation',
      'Transaction already disputed',
      'Custom conditions not met'
    ]) : undefined
  }
})

export const MOCK_PROCESSOR_STATUS: ProcessorStatus[] = [
  {
    processor: 'stripe',
    status: 'operational',
    uptime: 99.98,
    lastStatusCheck: new Date(Date.now() - 60000).toISOString(),
    successRate: 99.74,
    averageResponseTime: 185,
    transactionsProcessed: 1248562,
    failureCount: 3246
  },
  {
    processor: 'paypal',
    status: 'operational',
    uptime: 99.95,
    lastStatusCheck: new Date(Date.now() - 120000).toISOString(),
    successRate: 99.61,
    averageResponseTime: 245,
    transactionsProcessed: 856234,
    failureCount: 3342
  },
  {
    processor: 'square',
    status: 'operational',
    uptime: 99.89,
    lastStatusCheck: new Date(Date.now() - 45000).toISOString(),
    successRate: 99.52,
    averageResponseTime: 215,
    transactionsProcessed: 624315,
    failureCount: 3000
  },
  {
    processor: 'adyen',
    status: 'degraded',
    uptime: 99.72,
    lastStatusCheck: new Date(Date.now() - 90000).toISOString(),
    successRate: 98.95,
    averageResponseTime: 425,
    transactionsProcessed: 445812,
    failureCount: 4512
  },
  {
    processor: 'flutterwave',
    status: 'operational',
    uptime: 99.81,
    lastStatusCheck: new Date(Date.now() - 75000).toISOString(),
    successRate: 99.38,
    averageResponseTime: 305,
    transactionsProcessed: 298456,
    failureCount: 1848
  }
]

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getTransactionStats() {
  const total = MOCK_TRANSACTIONS.length
  const completed = MOCK_TRANSACTIONS.filter(t => t.status === 'completed').length
  const failed = MOCK_TRANSACTIONS.filter(t => t.status === 'failed').length
  const pending = MOCK_TRANSACTIONS.filter(t => ['pending', 'processing'].includes(t.status)).length

  const totalAmount = MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0)
  const completedAmount = MOCK_TRANSACTIONS.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)

  return {
    total,
    completed,
    completedRate: ((completed / total) * 100).toFixed(2),
    failed,
    failureRate: ((failed / total) * 100).toFixed(2),
    pending,
    totalAmount,
    completedAmount,
    averageAmount: (totalAmount / total).toFixed(2)
  }
}

export function getFailureStats() {
  const total = MOCK_FAILED_PAYMENTS.length
  const canRetry = MOCK_FAILED_PAYMENTS.filter(p => p.canRetry).length
  const totalAmount = MOCK_FAILED_PAYMENTS.reduce((sum, p) => sum + p.amount, 0)

  const reasonCounts = MOCK_FAILED_PAYMENTS.reduce((acc, p) => {
    acc[p.failureReason] = (acc[p.failureReason] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topErrorCodes = Object.entries(
    MOCK_FAILED_PAYMENTS.reduce((acc, p) => {
      acc[p.errorCode] = (acc[p.errorCode] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return {
    total,
    canRetry,
    totalAmount,
    reasonCounts,
    topErrorCodes
  }
}

export function getChargebackStats() {
  const total = MOCK_CHARGEBACKS.length
  const won = MOCK_CHARGEBACKS.filter(c => c.status === 'won').length
  const lost = MOCK_CHARGEBACKS.filter(c => c.status === 'lost').length
  const pending = MOCK_CHARGEBACKS.filter(c => c.status === 'pending').length
  const underReview = MOCK_CHARGEBACKS.filter(c => c.status === 'under_review').length

  const winRate = total > 0 ? ((won / (won + lost)) * 100).toFixed(2) : '0'
  const totalAmount = MOCK_CHARGEBACKS.reduce((sum, c) => sum + c.amount, 0)
  const averageAmount = (totalAmount / total).toFixed(2)

  return {
    total,
    won,
    lost,
    pending,
    underReview,
    winRate,
    totalAmount,
    averageAmount
  }
}

export function getRefundStats() {
  const total = MOCK_REFUNDS.length
  const approved = MOCK_REFUNDS.filter(r => r.status === 'approved').length
  const processed = MOCK_REFUNDS.filter(r => r.status === 'processed').length
  const rejected = MOCK_REFUNDS.filter(r => r.status === 'rejected').length
  const pending = MOCK_REFUNDS.filter(r => r.status === 'pending').length

  const approvalRate = total > 0 ? (((approved + processed) / total) * 100).toFixed(2) : '0'
  const totalAmount = MOCK_REFUNDS.reduce((sum, r) => sum + r.amount, 0)

  return {
    total,
    approved,
    processed,
    rejected,
    pending,
    approvalRate,
    totalAmount
  }
}

export function getProcessorHealthStats() {
  const totalProcessors = MOCK_PROCESSOR_STATUS.length
  const operational = MOCK_PROCESSOR_STATUS.filter(p => p.status === 'operational').length
  const degraded = MOCK_PROCESSOR_STATUS.filter(p => p.status === 'degraded').length
  const offline = MOCK_PROCESSOR_STATUS.filter(p => p.status === 'offline').length

  const totalTransactions = MOCK_PROCESSOR_STATUS.reduce((sum, p) => sum + p.transactionsProcessed, 0)
  const totalFailures = MOCK_PROCESSOR_STATUS.reduce((sum, p) => sum + p.failureCount, 0)
  const averageUptime = MOCK_PROCESSOR_STATUS.reduce((sum, p) => sum + p.uptime, 0) / totalProcessors
  const averageSuccessRate = MOCK_PROCESSOR_STATUS.reduce((sum, p) => sum + p.successRate, 0) / totalProcessors
  const averageResponseTime = MOCK_PROCESSOR_STATUS.reduce((sum, p) => sum + p.averageResponseTime, 0) / totalProcessors

  return {
    totalProcessors,
    operational,
    degraded,
    offline,
    totalTransactions,
    totalFailures,
    averageUptime: averageUptime.toFixed(2),
    averageSuccessRate: averageSuccessRate.toFixed(2),
    averageResponseTime: Math.round(averageResponseTime)
  }
}

// Alias for backwards compatibility
export const getFailedPaymentStats = getFailureStats
