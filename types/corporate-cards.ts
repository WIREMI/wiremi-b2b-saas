// Corporate Cards Module Types
// Comprehensive type system for corporate card management, transactions, and controls

// ==================== Core Types ====================

export type CardStatus =
  | 'ACTIVE'          // Card is active and can be used
  | 'INACTIVE'        // Card is inactive, cannot be used
  | 'FROZEN'          // Temporarily frozen by admin
  | 'SUSPENDED'       // Suspended due to suspicious activity
  | 'EXPIRED'         // Card has expired
  | 'CANCELLED'       // Card is permanently cancelled

export type CardType =
  | 'VIRTUAL'         // Virtual card (online use only)
  | 'PHYSICAL'        // Physical card
  | 'VIRTUAL_SINGLE_USE'  // Single-use virtual card
  | 'SUBSCRIPTION'    // Dedicated for subscriptions

export type TransactionStatus =
  | 'PENDING'         // Transaction pending approval
  | 'APPROVED'        // Transaction approved
  | 'DECLINED'        // Transaction declined
  | 'COMPLETED'       // Transaction completed
  | 'REFUNDED'        // Transaction refunded
  | 'DISPUTED'        // Transaction disputed

export type TransactionType =
  | 'PURCHASE'        // Regular purchase
  | 'REFUND'          // Refund
  | 'SUBSCRIPTION'    // Subscription payment
  | 'ATM_WITHDRAWAL'  // ATM withdrawal
  | 'CASH_ADVANCE'    // Cash advance
  | 'FEE'             // Card fee

export type TransactionCategory =
  | 'ADVERTISING'
  | 'SOFTWARE'
  | 'OFFICE_SUPPLIES'
  | 'TRAVEL'
  | 'MEALS'
  | 'ENTERTAINMENT'
  | 'UTILITIES'
  | 'SUBSCRIPTIONS'
  | 'HARDWARE'
  | 'PROFESSIONAL_SERVICES'
  | 'RENT'
  | 'INSURANCE'
  | 'OTHER'

export type SpendingLimitType =
  | 'DAILY'
  | 'WEEKLY'
  | 'MONTHLY'
  | 'ANNUAL'
  | 'PER_TRANSACTION'

export type CardRequestStatus =
  | 'PENDING'         // Request pending approval
  | 'APPROVED'        // Request approved, card being issued
  | 'ISSUED'          // Card issued
  | 'REJECTED'        // Request rejected
  | 'CANCELLED'       // Request cancelled

export type FraudAlertLevel =
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL'

// ==================== Card Types ====================

export interface CorporateCard {
  id: string
  cardNumber: string // Last 4 digits for display
  cardholderName: string
  cardholderEmail: string
  employeeId: string
  department: string

  // Card Details
  type: CardType
  status: CardStatus

  // Card Info
  lastFourDigits: string
  expiryMonth: number
  expiryYear: number
  cvv?: string // Only for virtual cards

  // Limits
  spendingLimits: SpendingLimit[]
  availableBalance: number

  // Controls
  restrictions: CardRestrictions

  // Metadata
  nickname?: string
  assignedFor?: string // Purpose of card
  notes?: string

  // Stats
  totalSpent: number
  transactionCount: number
  lastUsed?: string

  // Dates
  issuedDate: string
  activatedDate?: string
  expiresAt: string
  createdAt: string
  updatedAt: string
}

export interface SpendingLimit {
  id: string
  type: SpendingLimitType
  amount: number
  spent: number
  remaining: number
  resetDate?: string
}

export interface CardRestrictions {
  allowedCategories?: TransactionCategory[]
  blockedCategories?: TransactionCategory[]
  allowedMerchants?: string[]
  blockedMerchants?: string[]
  allowedCountries?: string[]
  blockedCountries?: string[]
  allowOnlineTransactions: boolean
  allowInternational: boolean
  allowATMWithdrawal: boolean
  requireReceipt: boolean
  requireApproval: boolean
  approvalThreshold?: number
}

// ==================== Transaction Types ====================

export interface Transaction {
  id: string
  cardId: string
  cardLastFour: string
  cardholderName: string
  employeeId: string

  // Transaction Details
  type: TransactionType
  status: TransactionStatus
  category: TransactionCategory

  // Merchant Info
  merchantName: string
  merchantCategory: string
  merchantCountry: string

  // Amount
  amount: number
  currency: string
  localAmount?: number
  localCurrency?: string
  exchangeRate?: number

  // Transaction Info
  description?: string
  transactionDate: string
  postDate?: string

  // Receipt & Expense
  receiptUrl?: string
  receiptUploaded: boolean
  expenseReportId?: string
  reimbursable: boolean

  // Notes & Tags
  notes?: string
  tags?: string[]
  customFields?: Record<string, string>

  // Fraud Detection
  fraudScore?: number
  fraudFlags?: string[]

  createdAt: string
  updatedAt: string
}

// ==================== Card Request Types ====================

export interface CardRequest {
  id: string
  requesterId: string
  requesterName: string
  requesterEmail: string
  department: string

  // Request Details
  cardType: CardType
  purpose: string
  justification: string

  // Requested Limits
  requestedLimits: {
    type: SpendingLimitType
    amount: number
  }[]

  // Requested Restrictions
  requestedRestrictions: Partial<CardRestrictions>

  // Approval
  status: CardRequestStatus
  approvedBy?: string
  approvedAt?: string
  rejectedReason?: string

  // Issued Card
  issuedCardId?: string

  createdAt: string
  updatedAt: string
}

// ==================== Analytics Types ====================

export interface CardAnalytics {
  // Overview
  totalCards: number
  activeCards: number
  frozenCards: number
  totalSpend: number

  // By Status
  cardsByStatus: Record<CardStatus, number>

  // Spending
  spendingThisMonth: number
  spendingLastMonth: number
  spendingThisYear: number
  averageTransactionValue: number

  // By Category
  spendingByCategory: Record<TransactionCategory, number>

  // By Department
  spendingByDepartment: {
    department: string
    totalSpend: number
    cardCount: number
  }[]

  // Timeline
  spendingByMonth: {
    month: string
    totalSpend: number
    transactionCount: number
  }[]

  // Top Spenders
  topSpenders: {
    cardId: string
    cardholderName: string
    totalSpent: number
    transactionCount: number
  }[]

  // Top Merchants
  topMerchants: {
    merchantName: string
    totalSpent: number
    transactionCount: number
  }[]

  // Fraud Alerts
  fraudAlerts: number
  suspiciousTransactions: number
}

// ==================== Fraud Alert Types ====================

export interface FraudAlert {
  id: string
  cardId: string
  transactionId: string
  level: FraudAlertLevel

  // Alert Details
  reason: string
  description: string
  flaggedPatterns: string[]

  // Risk Score
  riskScore: number
  confidence: number

  // Status
  reviewed: boolean
  reviewedBy?: string
  reviewedAt?: string
  resolution?: 'CONFIRMED_FRAUD' | 'FALSE_POSITIVE' | 'PENDING_INVESTIGATION'

  createdAt: string
}

// ==================== Card Settings Types ====================

export interface CardSettings {
  // Company Info
  companyName: string
  companyId: string

  // Default Limits
  defaultDailyLimit: number
  defaultMonthlyLimit: number
  defaultTransactionLimit: number

  // Default Restrictions
  defaultRestrictions: CardRestrictions

  // Approval Settings
  requireApprovalForVirtual: boolean
  requireApprovalForPhysical: boolean
  autoApprovalLimit?: number

  // Notification Settings
  notifyOnTransaction: boolean
  notifyOnDecline: boolean
  notifyOnFraud: boolean
  notificationChannels: ('EMAIL' | 'SMS' | 'PUSH')[]

  // Receipt Settings
  requireReceiptForAmount: number
  receiptUploadDeadlineDays: number

  // Integration
  accountingIntegration?: 'QUICKBOOKS' | 'XERO' | 'NETSUITE' | 'CUSTOM'
  expenseIntegration?: 'EXPENSIFY' | 'CONCUR' | 'CUSTOM'
}

// ==================== Subscription Tracking ====================

export interface Subscription {
  id: string
  cardId: string

  // Subscription Details
  merchantName: string
  description: string
  category: TransactionCategory

  // Billing
  amount: number
  currency: string
  billingFrequency: 'MONTHLY' | 'ANNUAL' | 'QUARTERLY'
  nextBillingDate: string

  // Status
  status: 'ACTIVE' | 'CANCELLED' | 'PAUSED'

  // History
  firstCharged: string
  lastCharged?: string
  totalPaid: number
  paymentCount: number

  createdAt: string
  updatedAt: string
}

// ==================== Helper Functions ====================

export function formatCardNumber(lastFour: string): string {
  return `•••• •••• •••• ${lastFour}`
}

export function getCardStatusColor(status: CardStatus): 'success' | 'warning' | 'error' | 'default' {
  switch (status) {
    case 'ACTIVE':
      return 'success'
    case 'INACTIVE':
      return 'default'
    case 'FROZEN':
    case 'SUSPENDED':
      return 'warning'
    case 'EXPIRED':
    case 'CANCELLED':
      return 'error'
    default:
      return 'default'
  }
}

export function getTransactionStatusColor(status: TransactionStatus): string {
  switch (status) {
    case 'COMPLETED':
    case 'APPROVED':
      return 'green'
    case 'PENDING':
      return 'yellow'
    case 'DECLINED':
      return 'red'
    case 'REFUNDED':
      return 'blue'
    case 'DISPUTED':
      return 'orange'
    default:
      return 'gray'
  }
}

export function calculateSpendingPercentage(spent: number, limit: number): number {
  if (limit === 0) return 0
  return Math.min((spent / limit) * 100, 100)
}

export function isCardExpired(expiryMonth: number, expiryYear: number): boolean {
  const now = new Date()
  const expiry = new Date(expiryYear, expiryMonth - 1)
  return expiry < now
}

export function isCardExpiringSoon(expiryMonth: number, expiryYear: number, days: number = 30): boolean {
  const now = new Date()
  const expiry = new Date(expiryYear, expiryMonth - 1)
  const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return daysUntilExpiry > 0 && daysUntilExpiry <= days
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function getSpendingLimitProgress(limit: SpendingLimit): {
  percentage: number
  status: 'safe' | 'warning' | 'critical' | 'exceeded'
} {
  const percentage = calculateSpendingPercentage(limit.spent, limit.amount)

  let status: 'safe' | 'warning' | 'critical' | 'exceeded'
  if (percentage >= 100) {
    status = 'exceeded'
  } else if (percentage >= 90) {
    status = 'critical'
  } else if (percentage >= 75) {
    status = 'warning'
  } else {
    status = 'safe'
  }

  return { percentage, status }
}

export function categorizeMerchant(merchantCategory: string): TransactionCategory {
  const categoryMap: Record<string, TransactionCategory> = {
    'advertising': 'ADVERTISING',
    'saas': 'SOFTWARE',
    'software': 'SOFTWARE',
    'office': 'OFFICE_SUPPLIES',
    'airline': 'TRAVEL',
    'hotel': 'TRAVEL',
    'restaurant': 'MEALS',
    'entertainment': 'ENTERTAINMENT',
    'utilities': 'UTILITIES',
    'subscription': 'SUBSCRIPTIONS',
    'hardware': 'HARDWARE',
    'consulting': 'PROFESSIONAL_SERVICES',
    'insurance': 'INSURANCE',
  }

  const normalized = merchantCategory.toLowerCase()
  for (const [key, value] of Object.entries(categoryMap)) {
    if (normalized.includes(key)) {
      return value
    }
  }

  return 'OTHER'
}

export function validateTransaction(transaction: Partial<Transaction>, card: CorporateCard): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!transaction.amount || transaction.amount <= 0) {
    errors.push('Invalid transaction amount')
  }

  if (card.status !== 'ACTIVE') {
    errors.push('Card is not active')
  }

  if (isCardExpired(card.expiryMonth, card.expiryYear)) {
    errors.push('Card has expired')
  }

  // Check spending limits
  const monthlyLimit = card.spendingLimits.find(l => l.type === 'MONTHLY')
  if (monthlyLimit && transaction.amount) {
    if (monthlyLimit.remaining < transaction.amount) {
      errors.push('Transaction exceeds monthly spending limit')
    }
  }

  // Check restrictions
  if (transaction.category && card.restrictions.blockedCategories?.includes(transaction.category)) {
    errors.push('Transaction category is blocked')
  }

  if (transaction.merchantCountry && card.restrictions.blockedCountries?.includes(transaction.merchantCountry)) {
    errors.push('Merchant country is blocked')
  }

  if (!card.restrictions.allowInternational && transaction.merchantCountry !== 'United States') {
    errors.push('International transactions are not allowed')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
