// Invoicing Module Types
// Comprehensive type system for invoice management, payments, and client tracking

// ==================== Core Types ====================

export type InvoiceStatus =
  | 'DRAFT'           // Invoice created but not sent
  | 'SENT'            // Sent to client, awaiting payment
  | 'VIEWED'          // Client has viewed the invoice
  | 'PARTIAL'         // Partially paid
  | 'PAID'            // Fully paid
  | 'OVERDUE'         // Past due date, unpaid
  | 'CANCELLED'       // Invoice cancelled
  | 'REFUNDED'        // Payment refunded

export type PaymentStatus =
  | 'PENDING'         // Payment initiated
  | 'PROCESSING'      // Payment being processed
  | 'COMPLETED'       // Payment successful
  | 'FAILED'          // Payment failed
  | 'REFUNDED'        // Payment refunded
  | 'DISPUTED'        // Payment disputed

export type PaymentMethod =
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'BANK_TRANSFER'
  | 'ACH'
  | 'WIRE_TRANSFER'
  | 'PAYPAL'
  | 'STRIPE'
  | 'CRYPTO'
  | 'CHECK'
  | 'CASH'
  | 'MOBILE_MONEY'

export type InvoiceFrequency =
  | 'ONE_TIME'
  | 'WEEKLY'
  | 'BI_WEEKLY'
  | 'MONTHLY'
  | 'QUARTERLY'
  | 'SEMI_ANNUAL'
  | 'ANNUAL'

export type TaxType =
  | 'VAT'             // Value Added Tax
  | 'GST'             // Goods and Services Tax
  | 'SALES_TAX'       // Sales Tax
  | 'NONE'            // No tax

export type DiscountType =
  | 'PERCENTAGE'
  | 'FIXED_AMOUNT'

export type ClientType =
  | 'INDIVIDUAL'
  | 'BUSINESS'
  | 'ORGANIZATION'

export type ReminderType =
  | 'BEFORE_DUE'      // X days before due date
  | 'ON_DUE'          // On due date
  | 'AFTER_DUE'       // X days after due date

// ==================== Client Types ====================

export interface Client {
  id: string
  type: ClientType

  // Basic Info
  name: string
  email: string
  phone?: string
  website?: string

  // Business Info (for business clients)
  companyName?: string
  taxId?: string
  vatNumber?: string

  // Address
  address: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }

  // Billing Info
  billingEmail?: string
  paymentTerms?: number // days
  currency: string

  // Metadata
  notes?: string
  tags?: string[]

  // Stats
  totalInvoiced: number
  totalPaid: number
  outstandingBalance: number
  invoiceCount: number

  createdAt: string
  updatedAt: string
}

// ==================== Invoice Item Types ====================

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
  taxable: boolean
  taxRate?: number
}

export interface Tax {
  id: string
  name: string
  type: TaxType
  rate: number
  amount: number
}

export interface Discount {
  type: DiscountType
  value: number
  amount: number
  description?: string
}

// ==================== Invoice Types ====================

export interface Invoice {
  id: string
  invoiceNumber: string
  status: InvoiceStatus

  // Client Info
  clientId: string
  clientName: string
  clientEmail: string
  clientAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }

  // Sender Info
  senderId: string
  senderName: string
  senderEmail: string
  senderAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  senderLogo?: string

  // Dates
  issueDate: string
  dueDate: string
  paidDate?: string

  // Items
  items: InvoiceItem[]

  // Amounts
  subtotal: number
  taxes: Tax[]
  discount?: Discount
  total: number
  amountPaid: number
  amountDue: number
  currency: string

  // Payment Info
  paymentTerms: number // days
  acceptedPaymentMethods: PaymentMethod[]

  // Recurring
  isRecurring: boolean
  recurringFrequency?: InvoiceFrequency
  recurringEndDate?: string
  parentInvoiceId?: string

  // Notes
  notes?: string
  termsAndConditions?: string

  // Tracking
  sentAt?: string
  viewedAt?: string
  lastViewedAt?: string
  viewCount: number
  remindersSent: number
  lastReminderAt?: string

  // Attachments
  attachments?: {
    id: string
    name: string
    url: string
    size: number
    type: string
  }[]

  createdAt: string
  updatedAt: string
}

// ==================== Payment Types ====================

export interface Payment {
  id: string
  invoiceId: string
  invoiceNumber: string
  clientId: string
  clientName: string

  // Amount
  amount: number
  currency: string

  // Payment Info
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  transactionId?: string

  // Dates
  paymentDate: string
  processedAt?: string

  // Additional Info
  reference?: string
  notes?: string

  // Fee Information
  processingFee?: number
  netAmount?: number

  createdAt: string
  updatedAt: string
}

// ==================== Template Types ====================

export interface InvoiceTemplate {
  id: string
  name: string
  description?: string

  // Design
  primaryColor: string
  accentColor: string
  fontFamily: string

  // Layout
  logoPosition: 'LEFT' | 'CENTER' | 'RIGHT'
  showHeader: boolean
  showFooter: boolean

  // Content
  defaultNotes?: string
  defaultTerms?: string

  // Settings
  isDefault: boolean

  createdAt: string
  updatedAt: string
}

// ==================== Reminder Types ====================

export interface InvoiceReminder {
  id: string
  invoiceId: string
  type: ReminderType

  // Timing
  daysOffset: number // negative for before, positive for after

  // Content
  subject: string
  message: string

  // Status
  sent: boolean
  sentAt?: string

  createdAt: string
}

// ==================== Analytics Types ====================

export interface InvoiceAnalytics {
  // Overview
  totalInvoices: number
  totalRevenue: number
  outstandingAmount: number
  overdueAmount: number

  // By Status
  draftCount: number
  sentCount: number
  paidCount: number
  overdueCount: number

  // Revenue
  revenueThisMonth: number
  revenueLastMonth: number
  revenueThisYear: number

  // Averages
  averageInvoiceValue: number
  averagePaymentTime: number // days

  // Payment Methods
  paymentMethodBreakdown: Record<PaymentMethod, number>

  // Timeline
  revenueByMonth: {
    month: string
    revenue: number
    invoiceCount: number
  }[]

  // Top Clients
  topClients: {
    clientId: string
    clientName: string
    totalPaid: number
    invoiceCount: number
  }[]

  // Aging Report
  agingReport: {
    current: number        // 0-30 days
    days30: number         // 31-60 days
    days60: number         // 61-90 days
    days90Plus: number     // 90+ days
  }
}

// ==================== Settings Types ====================

export interface InvoiceSettings {
  // Company Info
  companyName: string
  companyEmail: string
  companyPhone?: string
  companyWebsite?: string
  companyLogo?: string
  companyAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }

  // Tax Info
  taxId?: string
  vatNumber?: string

  // Invoice Settings
  invoicePrefix: string
  nextInvoiceNumber: number
  defaultCurrency: string
  defaultPaymentTerms: number

  // Tax Settings
  defaultTaxType: TaxType
  defaultTaxRate: number
  taxLabel: string

  // Payment Settings
  acceptedPaymentMethods: PaymentMethod[]

  // Reminder Settings
  sendReminders: boolean
  reminderSchedule: {
    type: ReminderType
    daysOffset: number
    enabled: boolean
  }[]

  // Email Settings
  emailFromName: string
  emailFromAddress: string
  emailSubjectTemplate: string
  emailBodyTemplate: string

  // Terms
  defaultTermsAndConditions: string
  defaultNotes: string
}

// ==================== Activity Types ====================

export interface InvoiceActivity {
  id: string
  invoiceId: string
  type: 'CREATED' | 'SENT' | 'VIEWED' | 'PAID' | 'REMINDER_SENT' | 'UPDATED' | 'CANCELLED'
  description: string
  metadata?: Record<string, any>
  timestamp: string
}

// ==================== Helper Functions ====================

export function calculateInvoiceTotals(
  items: InvoiceItem[],
  taxes: Tax[],
  discount?: Discount
): { subtotal: number; taxTotal: number; discountAmount: number; total: number } {
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)

  let discountAmount = 0
  if (discount) {
    discountAmount = discount.type === 'PERCENTAGE'
      ? subtotal * (discount.value / 100)
      : discount.value
  }

  const subtotalAfterDiscount = subtotal - discountAmount

  const taxTotal = taxes.reduce((sum, tax) => {
    const taxableAmount = subtotalAfterDiscount
    return sum + (taxableAmount * (tax.rate / 100))
  }, 0)

  const total = subtotalAfterDiscount + taxTotal

  return { subtotal, taxTotal, discountAmount, total }
}

export function generateInvoiceNumber(prefix: string, number: number): string {
  return `${prefix}${number.toString().padStart(5, '0')}`
}

export function calculateDueDate(issueDate: string, paymentTerms: number): string {
  const date = new Date(issueDate)
  date.setDate(date.getDate() + paymentTerms)
  return date.toISOString()
}

export function isOverdue(invoice: Invoice): boolean {
  if (invoice.status === 'PAID' || invoice.status === 'CANCELLED') {
    return false
  }
  return new Date(invoice.dueDate) < new Date()
}

export function getDaysOverdue(invoice: Invoice): number {
  if (!isOverdue(invoice)) return 0
  const today = new Date()
  const dueDate = new Date(invoice.dueDate)
  const diffTime = Math.abs(today.getTime() - dueDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function getDaysUntilDue(invoice: Invoice): number {
  const today = new Date()
  const dueDate = new Date(invoice.dueDate)
  const diffTime = dueDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

export function getInvoiceStatusColor(status: InvoiceStatus): string {
  switch (status) {
    case 'DRAFT':
      return 'gray'
    case 'SENT':
    case 'VIEWED':
      return 'blue'
    case 'PARTIAL':
      return 'yellow'
    case 'PAID':
      return 'green'
    case 'OVERDUE':
      return 'red'
    case 'CANCELLED':
      return 'gray'
    case 'REFUNDED':
      return 'orange'
    default:
      return 'gray'
  }
}

export function getPaymentStatusColor(status: PaymentStatus): string {
  switch (status) {
    case 'PENDING':
    case 'PROCESSING':
      return 'yellow'
    case 'COMPLETED':
      return 'green'
    case 'FAILED':
      return 'red'
    case 'REFUNDED':
      return 'orange'
    case 'DISPUTED':
      return 'red'
    default:
      return 'gray'
  }
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function getNextRecurringDate(
  lastDate: string,
  frequency: InvoiceFrequency
): string {
  const date = new Date(lastDate)

  switch (frequency) {
    case 'WEEKLY':
      date.setDate(date.getDate() + 7)
      break
    case 'BI_WEEKLY':
      date.setDate(date.getDate() + 14)
      break
    case 'MONTHLY':
      date.setMonth(date.getMonth() + 1)
      break
    case 'QUARTERLY':
      date.setMonth(date.getMonth() + 3)
      break
    case 'SEMI_ANNUAL':
      date.setMonth(date.getMonth() + 6)
      break
    case 'ANNUAL':
      date.setFullYear(date.getFullYear() + 1)
      break
    default:
      break
  }

  return date.toISOString()
}

export function validateInvoice(invoice: Partial<Invoice>): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!invoice.clientId) {
    errors.push('Client is required')
  }

  if (!invoice.items || invoice.items.length === 0) {
    errors.push('At least one item is required')
  }

  if (!invoice.issueDate) {
    errors.push('Issue date is required')
  }

  if (!invoice.dueDate) {
    errors.push('Due date is required')
  }

  if (invoice.issueDate && invoice.dueDate) {
    if (new Date(invoice.dueDate) < new Date(invoice.issueDate)) {
      errors.push('Due date must be after issue date')
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
