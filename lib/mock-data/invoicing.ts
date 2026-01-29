// Invoicing Module Mock Data
// Comprehensive demonstration data for invoices, clients, payments, and analytics

import {
  Invoice,
  InvoiceStatus,
  Client,
  ClientType,
  Payment,
  PaymentStatus,
  PaymentMethod,
  InvoiceTemplate,
  InvoiceAnalytics,
  InvoiceSettings,
  InvoiceActivity,
  TaxType,
} from '@/types/invoicing'

// ==================== Mock Clients ====================

export const mockClients: Client[] = [
  {
    id: 'client_001',
    type: 'BUSINESS' as ClientType,
    name: 'Acme Corporation',
    email: 'billing@acmecorp.com',
    phone: '+1-555-0123',
    website: 'https://acmecorp.com',
    companyName: 'Acme Corporation',
    taxId: '12-3456789',
    vatNumber: 'US123456789',
    address: {
      street: '123 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94102',
      country: 'United States',
    },
    billingEmail: 'accounts@acmecorp.com',
    paymentTerms: 30,
    currency: 'USD',
    notes: 'Net 30 payment terms. Major client with ongoing projects.',
    tags: ['Corporate', 'Recurring'],
    totalInvoiced: 145000,
    totalPaid: 125000,
    outstandingBalance: 20000,
    invoiceCount: 12,
    createdAt: '2025-01-01T10:00:00Z',
    updatedAt: '2026-01-15T14:30:00Z',
  },
  {
    id: 'client_002',
    type: 'BUSINESS' as ClientType,
    name: 'TechStart Inc',
    email: 'finance@techstart.io',
    phone: '+1-555-0456',
    website: 'https://techstart.io',
    companyName: 'TechStart Inc',
    taxId: '98-7654321',
    address: {
      street: '456 Innovation Dr',
      city: 'Austin',
      state: 'TX',
      postalCode: '78701',
      country: 'United States',
    },
    paymentTerms: 15,
    currency: 'USD',
    tags: ['Startup', 'Tech'],
    totalInvoiced: 78500,
    totalPaid: 78500,
    outstandingBalance: 0,
    invoiceCount: 8,
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 'client_003',
    type: 'INDIVIDUAL' as ClientType,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-0789',
    address: {
      street: '789 Maple Street',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States',
    },
    paymentTerms: 7,
    currency: 'USD',
    notes: 'Freelance consultant. Quick payment.',
    tags: ['Individual', 'Consulting'],
    totalInvoiced: 12500,
    totalPaid: 10000,
    outstandingBalance: 2500,
    invoiceCount: 5,
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2026-01-12T16:00:00Z',
  },
  {
    id: 'client_004',
    type: 'BUSINESS' as ClientType,
    name: 'Global Enterprises Ltd',
    email: 'ap@globalent.com',
    phone: '+44-20-1234-5678',
    website: 'https://globalenterprises.co.uk',
    companyName: 'Global Enterprises Ltd',
    taxId: 'GB987654321',
    vatNumber: 'GB987654321',
    address: {
      street: '10 Downing Street',
      city: 'London',
      state: 'England',
      postalCode: 'SW1A 2AA',
      country: 'United Kingdom',
    },
    billingEmail: 'invoices@globalent.com',
    paymentTerms: 45,
    currency: 'GBP',
    notes: 'International client. Requires VAT invoice.',
    tags: ['International', 'Enterprise'],
    totalInvoiced: 250000,
    totalPaid: 230000,
    outstandingBalance: 20000,
    invoiceCount: 15,
    createdAt: '2024-09-01T10:00:00Z',
    updatedAt: '2026-01-18T11:00:00Z',
  },
]

// ==================== Mock Invoices ====================

export const mockInvoices: Invoice[] = [
  {
    id: 'inv_001',
    invoiceNumber: 'INV-00001',
    status: 'PAID' as InvoiceStatus,
    clientId: 'client_001',
    clientName: 'Acme Corporation',
    clientEmail: 'billing@acmecorp.com',
    clientAddress: {
      street: '123 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94102',
      country: 'United States',
    },
    senderId: 'user_001',
    senderName: 'Wiremi Financial Services',
    senderEmail: 'invoices@wiremi.com',
    senderAddress: {
      street: '100 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    senderLogo: 'https://logo.clearbit.com/wiremi.com',
    issueDate: '2025-12-01T00:00:00Z',
    dueDate: '2025-12-31T00:00:00Z',
    paidDate: '2025-12-28T15:30:00Z',
    items: [
      {
        id: 'item_001',
        description: 'Web Development Services - December 2025',
        quantity: 80,
        rate: 150,
        amount: 12000,
        taxable: true,
      },
      {
        id: 'item_002',
        description: 'UI/UX Design Consultation',
        quantity: 20,
        rate: 175,
        amount: 3500,
        taxable: true,
      },
    ],
    subtotal: 15500,
    taxes: [
      {
        id: 'tax_001',
        name: 'Sales Tax',
        type: 'SALES_TAX' as TaxType,
        rate: 8.5,
        amount: 1317.5,
      },
    ],
    discount: {
      type: 'PERCENTAGE',
      value: 5,
      amount: 775,
      description: 'Early payment discount',
    },
    total: 16042.5,
    amountPaid: 16042.5,
    amountDue: 0,
    currency: 'USD',
    paymentTerms: 30,
    acceptedPaymentMethods: ['CREDIT_CARD', 'BANK_TRANSFER', 'ACH'] as PaymentMethod[],
    isRecurring: false,
    notes: 'Thank you for your business!',
    termsAndConditions: 'Payment due within 30 days. Late payments subject to 1.5% monthly interest.',
    sentAt: '2025-12-01T09:00:00Z',
    viewedAt: '2025-12-01T14:30:00Z',
    lastViewedAt: '2025-12-15T10:00:00Z',
    viewCount: 3,
    remindersSent: 1,
    lastReminderAt: '2025-12-20T08:00:00Z',
    createdAt: '2025-12-01T08:00:00Z',
    updatedAt: '2025-12-28T15:30:00Z',
  },
  {
    id: 'inv_002',
    invoiceNumber: 'INV-00002',
    status: 'OVERDUE' as InvoiceStatus,
    clientId: 'client_001',
    clientName: 'Acme Corporation',
    clientEmail: 'billing@acmecorp.com',
    clientAddress: {
      street: '123 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94102',
      country: 'United States',
    },
    senderId: 'user_001',
    senderName: 'Wiremi Financial Services',
    senderEmail: 'invoices@wiremi.com',
    senderAddress: {
      street: '100 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    senderLogo: 'https://logo.clearbit.com/wiremi.com',
    issueDate: '2026-01-01T00:00:00Z',
    dueDate: '2026-01-15T00:00:00Z',
    items: [
      {
        id: 'item_003',
        description: 'Consulting Services - January 2026',
        quantity: 40,
        rate: 200,
        amount: 8000,
        taxable: true,
      },
      {
        id: 'item_004',
        description: 'Project Management',
        quantity: 1,
        rate: 2000,
        amount: 2000,
        taxable: true,
      },
    ],
    subtotal: 10000,
    taxes: [
      {
        id: 'tax_002',
        name: 'Sales Tax',
        type: 'SALES_TAX' as TaxType,
        rate: 8.5,
        amount: 850,
      },
    ],
    total: 10850,
    amountPaid: 0,
    amountDue: 10850,
    currency: 'USD',
    paymentTerms: 15,
    acceptedPaymentMethods: ['CREDIT_CARD', 'BANK_TRANSFER', 'ACH', 'WIRE_TRANSFER'] as PaymentMethod[],
    isRecurring: false,
    notes: 'Please process payment at your earliest convenience.',
    termsAndConditions: 'Payment due within 15 days. Late payments subject to 1.5% monthly interest.',
    sentAt: '2026-01-01T09:00:00Z',
    viewedAt: '2026-01-02T11:00:00Z',
    lastViewedAt: '2026-01-10T14:00:00Z',
    viewCount: 5,
    remindersSent: 2,
    lastReminderAt: '2026-01-18T08:00:00Z',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-18T08:00:00Z',
  },
  {
    id: 'inv_003',
    invoiceNumber: 'INV-00003',
    status: 'SENT' as InvoiceStatus,
    clientId: 'client_002',
    clientName: 'TechStart Inc',
    clientEmail: 'finance@techstart.io',
    clientAddress: {
      street: '456 Innovation Dr',
      city: 'Austin',
      state: 'TX',
      postalCode: '78701',
      country: 'United States',
    },
    senderId: 'user_001',
    senderName: 'Wiremi Financial Services',
    senderEmail: 'invoices@wiremi.com',
    senderAddress: {
      street: '100 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    senderLogo: 'https://logo.clearbit.com/wiremi.com',
    issueDate: '2026-01-20T00:00:00Z',
    dueDate: '2026-02-04T00:00:00Z',
    items: [
      {
        id: 'item_005',
        description: 'API Integration Development',
        quantity: 60,
        rate: 180,
        amount: 10800,
        taxable: true,
      },
    ],
    subtotal: 10800,
    taxes: [
      {
        id: 'tax_003',
        name: 'Sales Tax',
        type: 'SALES_TAX' as TaxType,
        rate: 8.25,
        amount: 891,
      },
    ],
    total: 11691,
    amountPaid: 0,
    amountDue: 11691,
    currency: 'USD',
    paymentTerms: 15,
    acceptedPaymentMethods: ['CREDIT_CARD', 'STRIPE', 'BANK_TRANSFER'] as PaymentMethod[],
    isRecurring: false,
    notes: 'Invoice for API integration work completed in January.',
    termsAndConditions: 'Payment due within 15 days.',
    sentAt: '2026-01-20T10:00:00Z',
    viewedAt: '2026-01-20T15:30:00Z',
    lastViewedAt: '2026-01-20T15:30:00Z',
    viewCount: 1,
    remindersSent: 0,
    createdAt: '2026-01-20T09:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'inv_004',
    invoiceNumber: 'INV-00004',
    status: 'PARTIAL' as InvoiceStatus,
    clientId: 'client_003',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.johnson@email.com',
    clientAddress: {
      street: '789 Maple Street',
      city: 'Seattle',
      state: 'WA',
      postalCode: '98101',
      country: 'United States',
    },
    senderId: 'user_001',
    senderName: 'Wiremi Financial Services',
    senderEmail: 'invoices@wiremi.com',
    senderAddress: {
      street: '100 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    senderLogo: 'https://logo.clearbit.com/wiremi.com',
    issueDate: '2026-01-18T00:00:00Z',
    dueDate: '2026-01-25T00:00:00Z',
    items: [
      {
        id: 'item_006',
        description: 'Consulting Session - Strategy',
        quantity: 5,
        rate: 250,
        amount: 1250,
        taxable: true,
      },
      {
        id: 'item_007',
        description: 'Report Documentation',
        quantity: 1,
        rate: 750,
        amount: 750,
        taxable: true,
      },
    ],
    subtotal: 2000,
    taxes: [
      {
        id: 'tax_004',
        name: 'Sales Tax',
        type: 'SALES_TAX' as TaxType,
        rate: 10.1,
        amount: 202,
      },
    ],
    total: 2202,
    amountPaid: 1000,
    amountDue: 1202,
    currency: 'USD',
    paymentTerms: 7,
    acceptedPaymentMethods: ['CREDIT_CARD', 'PAYPAL', 'VENMO'] as PaymentMethod[],
    isRecurring: false,
    notes: 'Partial payment received. Balance due.',
    termsAndConditions: 'Payment due within 7 days.',
    sentAt: '2026-01-18T10:00:00Z',
    viewedAt: '2026-01-18T11:30:00Z',
    lastViewedAt: '2026-01-19T09:00:00Z',
    viewCount: 2,
    remindersSent: 0,
    createdAt: '2026-01-18T09:00:00Z',
    updatedAt: '2026-01-21T14:00:00Z',
  },
  {
    id: 'inv_005',
    invoiceNumber: 'INV-00005',
    status: 'DRAFT' as InvoiceStatus,
    clientId: 'client_004',
    clientName: 'Global Enterprises Ltd',
    clientEmail: 'ap@globalent.com',
    clientAddress: {
      street: '10 Downing Street',
      city: 'London',
      state: 'England',
      postalCode: 'SW1A 2AA',
      country: 'United Kingdom',
    },
    senderId: 'user_001',
    senderName: 'Wiremi Financial Services',
    senderEmail: 'invoices@wiremi.com',
    senderAddress: {
      street: '100 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    senderLogo: 'https://logo.clearbit.com/wiremi.com',
    issueDate: '2026-01-22T00:00:00Z',
    dueDate: '2026-03-08T00:00:00Z',
    items: [
      {
        id: 'item_008',
        description: 'Enterprise Software License - Annual',
        quantity: 1,
        rate: 50000,
        amount: 50000,
        taxable: true,
      },
      {
        id: 'item_009',
        description: 'Premium Support Package',
        quantity: 12,
        rate: 2000,
        amount: 24000,
        taxable: true,
      },
    ],
    subtotal: 74000,
    taxes: [
      {
        id: 'tax_005',
        name: 'VAT',
        type: 'VAT' as TaxType,
        rate: 20,
        amount: 14800,
      },
    ],
    total: 88800,
    amountPaid: 0,
    amountDue: 88800,
    currency: 'GBP',
    paymentTerms: 45,
    acceptedPaymentMethods: ['WIRE_TRANSFER', 'BANK_TRANSFER'] as PaymentMethod[],
    isRecurring: false,
    notes: 'Annual enterprise license renewal.',
    termsAndConditions: 'Payment due within 45 days. Bank transfer preferred.',
    viewCount: 0,
    remindersSent: 0,
    createdAt: '2026-01-22T10:00:00Z',
    updatedAt: '2026-01-22T10:00:00Z',
  },
]

// ==================== Mock Payments ====================

export const mockPayments: Payment[] = [
  {
    id: 'pay_001',
    invoiceId: 'inv_001',
    invoiceNumber: 'INV-00001',
    clientId: 'client_001',
    clientName: 'Acme Corporation',
    amount: 16042.5,
    currency: 'USD',
    paymentMethod: 'BANK_TRANSFER' as PaymentMethod,
    paymentStatus: 'COMPLETED' as PaymentStatus,
    transactionId: 'TXN-20251228-001',
    paymentDate: '2025-12-28T15:30:00Z',
    processedAt: '2025-12-28T15:35:00Z',
    reference: 'Payment for INV-00001',
    processingFee: 0,
    netAmount: 16042.5,
    createdAt: '2025-12-28T15:30:00Z',
    updatedAt: '2025-12-28T15:35:00Z',
  },
  {
    id: 'pay_002',
    invoiceId: 'inv_004',
    invoiceNumber: 'INV-00004',
    clientId: 'client_003',
    clientName: 'Sarah Johnson',
    amount: 1000,
    currency: 'USD',
    paymentMethod: 'CREDIT_CARD' as PaymentMethod,
    paymentStatus: 'COMPLETED' as PaymentStatus,
    transactionId: 'ch_3ABC123XYZ',
    paymentDate: '2026-01-21T14:00:00Z',
    processedAt: '2026-01-21T14:01:00Z',
    reference: 'Partial payment for consulting',
    notes: 'First installment',
    processingFee: 29,
    netAmount: 971,
    createdAt: '2026-01-21T14:00:00Z',
    updatedAt: '2026-01-21T14:01:00Z',
  },
]

// ==================== Mock Templates ====================

export const mockTemplates: InvoiceTemplate[] = [
  {
    id: 'template_001',
    name: 'Professional Blue',
    description: 'Clean and professional template with blue accents',
    primaryColor: '#3B82F6',
    accentColor: '#1E40AF',
    fontFamily: 'Inter',
    logoPosition: 'LEFT',
    showHeader: true,
    showFooter: true,
    defaultNotes: 'Thank you for your business!',
    defaultTerms: 'Payment due within 30 days. Late payments subject to 1.5% monthly interest.',
    isDefault: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'template_002',
    name: 'Modern Green',
    description: 'Modern design with green color scheme',
    primaryColor: '#10B981',
    accentColor: '#059669',
    fontFamily: 'Roboto',
    logoPosition: 'CENTER',
    showHeader: true,
    showFooter: true,
    isDefault: false,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
]

// ==================== Mock Analytics ====================

export const mockAnalytics: InvoiceAnalytics = {
  totalInvoices: 5,
  totalRevenue: 127827.5,
  outstandingAmount: 34743,
  overdueAmount: 10850,
  draftCount: 1,
  sentCount: 1,
  paidCount: 1,
  overdueCount: 1,
  revenueThisMonth: 23893,
  revenueLastMonth: 16042.5,
  revenueThisYear: 127827.5,
  averageInvoiceValue: 25565.5,
  averagePaymentTime: 27,
  paymentMethodBreakdown: {
    BANK_TRANSFER: 16042.5,
    CREDIT_CARD: 1000,
    DEBIT_CARD: 0,
    ACH: 0,
    WIRE_TRANSFER: 0,
    PAYPAL: 0,
    STRIPE: 0,
    CRYPTO: 0,
    CHECK: 0,
    CASH: 0,
    MOBILE_MONEY: 0,
  },
  revenueByMonth: [
    { month: '2025-12', revenue: 16042.5, invoiceCount: 1 },
    { month: '2026-01', revenue: 23893, invoiceCount: 3 },
  ],
  topClients: [
    { clientId: 'client_001', clientName: 'Acme Corporation', totalPaid: 16042.5, invoiceCount: 2 },
    { clientId: 'client_003', clientName: 'Sarah Johnson', totalPaid: 1000, invoiceCount: 1 },
  ],
  agingReport: {
    current: 13893,
    days30: 10850,
    days60: 0,
    days90Plus: 0,
  },
}

// ==================== Mock Settings ====================

export const mockSettings: InvoiceSettings = {
  companyName: 'Wiremi Financial Services',
  companyEmail: 'invoices@wiremi.com',
  companyPhone: '+1-555-0100',
  companyWebsite: 'https://wiremi.com',
  companyLogo: 'https://logo.clearbit.com/wiremi.com',
  companyAddress: {
    street: '100 Main Street',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States',
  },
  taxId: '12-3456789',
  vatNumber: 'US123456789',
  invoicePrefix: 'INV-',
  nextInvoiceNumber: 6,
  defaultCurrency: 'USD',
  defaultPaymentTerms: 30,
  defaultTaxType: 'SALES_TAX' as TaxType,
  defaultTaxRate: 8.5,
  taxLabel: 'Sales Tax',
  acceptedPaymentMethods: [
    'CREDIT_CARD',
    'DEBIT_CARD',
    'BANK_TRANSFER',
    'ACH',
    'WIRE_TRANSFER',
    'PAYPAL',
    'STRIPE',
  ] as PaymentMethod[],
  sendReminders: true,
  reminderSchedule: [
    { type: 'BEFORE_DUE', daysOffset: -3, enabled: true },
    { type: 'ON_DUE', daysOffset: 0, enabled: true },
    { type: 'AFTER_DUE', daysOffset: 7, enabled: true },
  ],
  emailFromName: 'Wiremi Billing',
  emailFromAddress: 'invoices@wiremi.com',
  emailSubjectTemplate: 'Invoice {{invoiceNumber}} from {{companyName}}',
  emailBodyTemplate: 'Dear {{clientName}},\n\nPlease find attached invoice {{invoiceNumber}} for {{total}}.\n\nThank you for your business!',
  defaultTermsAndConditions: 'Payment due within 30 days. Late payments subject to 1.5% monthly interest.',
  defaultNotes: 'Thank you for your business!',
}

// ==================== Helper Functions ====================

export function getInvoice(id: string): Invoice | undefined {
  return mockInvoices.find((inv) => inv.id === id)
}

export function getInvoiceByNumber(number: string): Invoice | undefined {
  return mockInvoices.find((inv) => inv.invoiceNumber === number)
}

export function getAllInvoices(userId?: string): Invoice[] {
  // In real app, filter by user
  return mockInvoices
}

export function getInvoicesByStatus(status: InvoiceStatus): Invoice[] {
  return mockInvoices.filter((inv) => inv.status === status)
}

export function getInvoicesByClient(clientId: string): Invoice[] {
  return mockInvoices.filter((inv) => inv.clientId === clientId)
}

export function getClient(id: string): Client | undefined {
  return mockClients.find((c) => c.id === id)
}

export function getAllClients(): Client[] {
  return mockClients
}

export function getPaymentsForInvoice(invoiceId: string): Payment[] {
  return mockPayments.filter((p) => p.invoiceId === invoiceId)
}

export function getPaymentsForClient(clientId: string): Payment[] {
  return mockPayments.filter((p) => p.clientId === clientId)
}

export function getAllPayments(): Payment[] {
  return mockPayments
}

export function getTemplates(): InvoiceTemplate[] {
  return mockTemplates
}

export function getDefaultTemplate(): InvoiceTemplate | undefined {
  return mockTemplates.find((t) => t.isDefault)
}

export function getAnalytics(): InvoiceAnalytics {
  return mockAnalytics
}

export function getSettings(): InvoiceSettings {
  return mockSettings
}
