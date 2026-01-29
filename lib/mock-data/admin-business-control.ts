// Admin Business Control Center Mock Data
// Comprehensive data for the 10-tab Business Control Center

export type WalletStatus = 'active' | 'frozen' | 'suspended' | 'closed'
export type WalletType = 'settlement' | 'collection' | 'reserve' | 'fees'
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded'
export type TransactionType = 'payment_in' | 'payment_out' | 'payout' | 'fee' | 'refund' | 'adjustment'
export type SettlementStatus = 'scheduled' | 'processing' | 'completed' | 'failed' | 'held'
export type PaymentMethodType = 'card' | 'bank_transfer' | 'mobile_money' | 'crypto' | 'cash'
export type ChannelType = 'api' | 'dashboard' | 'mobile_app' | 'pos' | 'hosted_page' | 'widget'
export type ModuleStatus = 'active' | 'trial' | 'suspended' | 'disabled'
export type BillingCycle = 'monthly' | 'quarterly' | 'annual'
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
export type ActionType = 'suspend' | 'freeze' | 'unfreeze' | 'unsuspend' | 'terminate' | 'update_limits'

// Wallet Interface
export interface Wallet {
  id: string
  businessId: string
  type: WalletType
  currency: string
  balance: number
  availableBalance: number
  reservedBalance: number
  status: WalletStatus
  createdDate: string
  lastTransaction?: string
}

// Transaction Interface
export interface Transaction {
  id: string
  businessId: string
  walletId: string
  type: TransactionType
  amount: number
  currency: string
  status: TransactionStatus
  description: string
  channel: ChannelType
  paymentMethod?: PaymentMethodType
  customerName?: string
  customerEmail?: string
  metadata?: Record<string, any>
  createdDate: string
  completedDate?: string
  failureReason?: string
}

// Settlement Interface
export interface Settlement {
  id: string
  businessId: string
  amount: number
  currency: string
  status: SettlementStatus
  bankAccount: {
    name: string
    number: string
    bank: string
  }
  transactionCount: number
  scheduledDate: string
  processedDate?: string
  fee: number
  netAmount: number
}

// End User (Business's Client) Interface
export interface EndUser {
  id: string
  businessId: string
  name: string
  email: string
  phone?: string
  country: string
  totalSpent: number
  transactionCount: number
  firstPurchase: string
  lastPurchase: string
  status: 'active' | 'inactive'
  tags?: string[]
}

// Module Subscription Interface
export interface ModuleSubscription {
  id: string
  businessId: string
  moduleName: string
  moduleType: 'core' | 'addon'
  status: ModuleStatus
  plan: 'starter' | 'professional' | 'enterprise' | 'custom'
  billingCycle: BillingCycle
  monthlyFee: number
  usage?: {
    current: number
    limit: number
    unit: string
  }
  activatedDate: string
  trialEndsDate?: string
  nextBillingDate?: string
}

// Invoice Interface
export interface Invoice {
  id: string
  businessId: string
  invoiceNumber: string
  status: InvoiceStatus
  billingPeriod: string
  issueDate: string
  dueDate: string
  items: {
    description: string
    quantity: number
    unitPrice: number
    amount: number
  }[]
  subtotal: number
  tax: number
  total: number
  paidDate?: string
  paidAmount?: number
}

// Support Ticket Interface
export interface SupportTicket {
  id: string
  businessId: string
  subject: string
  category: 'technical' | 'billing' | 'compliance' | 'general'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'waiting_client' | 'resolved' | 'closed'
  assignedTo?: string
  createdDate: string
  updatedDate: string
  resolvedDate?: string
  messages: {
    id: string
    from: 'business' | 'admin'
    authorName: string
    message: string
    timestamp: string
  }[]
}

// Activity Log Interface
export interface ActivityLog {
  id: string
  businessId: string
  timestamp: string
  actor: string
  actorType: 'admin' | 'business_user' | 'system'
  action: string
  category: 'login' | 'transaction' | 'settings' | 'compliance' | 'module' | 'payment_method' | 'user_management'
  details: string
  ipAddress?: string
  metadata?: Record<string, any>
}

// Admin Action Interface
export interface AdminAction {
  id: string
  businessId: string
  type: ActionType
  performedBy: string
  timestamp: string
  reason: string
  previousState?: any
  newState?: any
  notes?: string
  reversible: boolean
}

// ============================================
// MOCK DATA
// ============================================

// Wallets for biz_001 (Acme Corporation)
export const MOCK_WALLETS: Wallet[] = [
  {
    id: 'wal_001_settlement',
    businessId: 'biz_001',
    type: 'settlement',
    currency: 'USD',
    balance: 45600.00,
    availableBalance: 42300.00,
    reservedBalance: 3300.00,
    status: 'active',
    createdDate: '2023-11-20',
    lastTransaction: '2024-01-25 14:32',
  },
  {
    id: 'wal_001_collection',
    businessId: 'biz_001',
    type: 'collection',
    currency: 'USD',
    balance: 12450.00,
    availableBalance: 12450.00,
    reservedBalance: 0,
    status: 'active',
    createdDate: '2023-11-20',
    lastTransaction: '2024-01-25 12:15',
  },
  {
    id: 'wal_001_reserve',
    businessId: 'biz_001',
    type: 'reserve',
    currency: 'USD',
    balance: 8000.00,
    availableBalance: 8000.00,
    reservedBalance: 0,
    status: 'active',
    createdDate: '2023-11-20',
  },
]

// Transactions for biz_001
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn_001',
    businessId: 'biz_001',
    walletId: 'wal_001_collection',
    type: 'payment_in',
    amount: 450.00,
    currency: 'USD',
    status: 'completed',
    description: 'Payment from customer #2345',
    channel: 'api',
    paymentMethod: 'card',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    createdDate: '2024-01-25 14:32',
    completedDate: '2024-01-25 14:32',
  },
  {
    id: 'txn_002',
    businessId: 'biz_001',
    walletId: 'wal_001_collection',
    type: 'payment_in',
    amount: 1200.00,
    currency: 'USD',
    status: 'completed',
    description: 'Payment from customer #2346',
    channel: 'hosted_page',
    paymentMethod: 'bank_transfer',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah@example.com',
    createdDate: '2024-01-25 12:15',
    completedDate: '2024-01-25 12:20',
  },
  {
    id: 'txn_003',
    businessId: 'biz_001',
    walletId: 'wal_001_settlement',
    type: 'payout',
    amount: 5000.00,
    currency: 'USD',
    status: 'completed',
    description: 'Payout to vendor ABC Inc',
    channel: 'dashboard',
    createdDate: '2024-01-24 16:45',
    completedDate: '2024-01-24 17:12',
  },
  {
    id: 'txn_004',
    businessId: 'biz_001',
    walletId: 'wal_001_collection',
    type: 'payment_in',
    amount: 780.00,
    currency: 'USD',
    status: 'pending',
    description: 'Payment from customer #2347',
    channel: 'widget',
    paymentMethod: 'mobile_money',
    customerName: 'Michael Chen',
    customerEmail: 'michael@example.com',
    createdDate: '2024-01-25 10:20',
  },
  {
    id: 'txn_005',
    businessId: 'biz_001',
    walletId: 'wal_001_settlement',
    type: 'fee',
    amount: 125.50,
    currency: 'USD',
    status: 'completed',
    description: 'Monthly platform fee',
    channel: 'api',
    createdDate: '2024-01-01 00:00',
    completedDate: '2024-01-01 00:01',
  },
  {
    id: 'txn_006',
    businessId: 'biz_001',
    walletId: 'wal_001_collection',
    type: 'payment_in',
    amount: 320.00,
    currency: 'USD',
    status: 'failed',
    description: 'Payment from customer #2348',
    channel: 'pos',
    paymentMethod: 'card',
    customerName: 'Emily Davis',
    customerEmail: 'emily@example.com',
    failureReason: 'Insufficient funds',
    createdDate: '2024-01-24 14:22',
  },
]

// Settlements for biz_001
export const MOCK_SETTLEMENTS: Settlement[] = [
  {
    id: 'set_001',
    businessId: 'biz_001',
    amount: 15600.00,
    currency: 'USD',
    status: 'completed',
    bankAccount: {
      name: 'Acme Corporation Ltd',
      number: '****5678',
      bank: 'Chase Bank',
    },
    transactionCount: 45,
    scheduledDate: '2024-01-22',
    processedDate: '2024-01-22 10:30',
    fee: 78.00,
    netAmount: 15522.00,
  },
  {
    id: 'set_002',
    businessId: 'biz_001',
    amount: 22400.00,
    currency: 'USD',
    status: 'processing',
    bankAccount: {
      name: 'Acme Corporation Ltd',
      number: '****5678',
      bank: 'Chase Bank',
    },
    transactionCount: 68,
    scheduledDate: '2024-01-26',
    fee: 112.00,
    netAmount: 22288.00,
  },
  {
    id: 'set_003',
    businessId: 'biz_001',
    amount: 8900.00,
    currency: 'USD',
    status: 'scheduled',
    bankAccount: {
      name: 'Acme Corporation Ltd',
      number: '****5678',
      bank: 'Chase Bank',
    },
    transactionCount: 32,
    scheduledDate: '2024-01-29',
    fee: 44.50,
    netAmount: 8855.50,
  },
]

// End Users (Business's Clients) for biz_001
export const MOCK_END_USERS: EndUser[] = [
  {
    id: 'eu_001',
    businessId: 'biz_001',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0101',
    country: 'US',
    totalSpent: 5670.00,
    transactionCount: 12,
    firstPurchase: '2023-12-05',
    lastPurchase: '2024-01-25',
    status: 'active',
    tags: ['vip', 'high_value'],
  },
  {
    id: 'eu_002',
    businessId: 'biz_001',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1-555-0102',
    country: 'US',
    totalSpent: 3420.00,
    transactionCount: 8,
    firstPurchase: '2024-01-10',
    lastPurchase: '2024-01-25',
    status: 'active',
    tags: ['regular'],
  },
  {
    id: 'eu_003',
    businessId: 'biz_001',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+1-555-0103',
    country: 'CA',
    totalSpent: 2100.00,
    transactionCount: 5,
    firstPurchase: '2024-01-15',
    lastPurchase: '2024-01-24',
    status: 'active',
  },
  {
    id: 'eu_004',
    businessId: 'biz_001',
    name: 'Emily Davis',
    email: 'emily@example.com',
    country: 'US',
    totalSpent: 890.00,
    transactionCount: 2,
    firstPurchase: '2023-12-20',
    lastPurchase: '2024-01-18',
    status: 'active',
  },
  {
    id: 'eu_005',
    businessId: 'biz_001',
    name: 'David Wilson',
    email: 'david@example.com',
    country: 'US',
    totalSpent: 450.00,
    transactionCount: 1,
    firstPurchase: '2024-01-22',
    lastPurchase: '2024-01-22',
    status: 'inactive',
  },
]

// Module Subscriptions for biz_001
export const MOCK_MODULE_SUBSCRIPTIONS: ModuleSubscription[] = [
  {
    id: 'mod_001',
    businessId: 'biz_001',
    moduleName: 'Payments Core',
    moduleType: 'core',
    status: 'active',
    plan: 'professional',
    billingCycle: 'monthly',
    monthlyFee: 299.00,
    usage: {
      current: 1245,
      limit: 5000,
      unit: 'transactions',
    },
    activatedDate: '2023-12-15',
    nextBillingDate: '2024-02-01',
  },
  {
    id: 'mod_002',
    businessId: 'biz_001',
    moduleName: 'Payouts',
    moduleType: 'addon',
    status: 'active',
    plan: 'professional',
    billingCycle: 'monthly',
    monthlyFee: 149.00,
    usage: {
      current: 234,
      limit: 1000,
      unit: 'payouts',
    },
    activatedDate: '2023-12-20',
    nextBillingDate: '2024-02-01',
  },
  {
    id: 'mod_003',
    businessId: 'biz_001',
    moduleName: 'Virtual Cards',
    moduleType: 'addon',
    status: 'active',
    plan: 'enterprise',
    billingCycle: 'monthly',
    monthlyFee: 499.00,
    usage: {
      current: 45,
      limit: 100,
      unit: 'active_cards',
    },
    activatedDate: '2024-01-05',
    nextBillingDate: '2024-02-01',
  },
  {
    id: 'mod_004',
    businessId: 'biz_001',
    moduleName: 'FX Trading',
    moduleType: 'addon',
    status: 'active',
    plan: 'professional',
    billingCycle: 'monthly',
    monthlyFee: 199.00,
    activatedDate: '2024-01-10',
    nextBillingDate: '2024-02-01',
  },
  {
    id: 'mod_005',
    businessId: 'biz_001',
    moduleName: 'Escrow Services',
    moduleType: 'addon',
    status: 'active',
    plan: 'enterprise',
    billingCycle: 'monthly',
    monthlyFee: 399.00,
    usage: {
      current: 12,
      limit: 50,
      unit: 'active_escrows',
    },
    activatedDate: '2024-01-12',
    nextBillingDate: '2024-02-01',
  },
]

// Invoices for biz_001
export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv_001',
    businessId: 'biz_001',
    invoiceNumber: 'INV-2024-001',
    status: 'paid',
    billingPeriod: 'January 2024',
    issueDate: '2024-01-01',
    dueDate: '2024-01-15',
    items: [
      { description: 'Payments Core - Professional Plan', quantity: 1, unitPrice: 299.00, amount: 299.00 },
      { description: 'Payouts - Professional Plan', quantity: 1, unitPrice: 149.00, amount: 149.00 },
      { description: 'Virtual Cards - Enterprise Plan', quantity: 1, unitPrice: 499.00, amount: 499.00 },
      { description: 'FX Trading - Professional Plan', quantity: 1, unitPrice: 199.00, amount: 199.00 },
      { description: 'Escrow Services - Enterprise Plan', quantity: 1, unitPrice: 399.00, amount: 399.00 },
    ],
    subtotal: 1545.00,
    tax: 154.50,
    total: 1699.50,
    paidDate: '2024-01-10',
    paidAmount: 1699.50,
  },
  {
    id: 'inv_002',
    businessId: 'biz_001',
    invoiceNumber: 'INV-2024-002',
    status: 'sent',
    billingPeriod: 'February 2024',
    issueDate: '2024-02-01',
    dueDate: '2024-02-15',
    items: [
      { description: 'Payments Core - Professional Plan', quantity: 1, unitPrice: 299.00, amount: 299.00 },
      { description: 'Payouts - Professional Plan', quantity: 1, unitPrice: 149.00, amount: 149.00 },
      { description: 'Virtual Cards - Enterprise Plan', quantity: 1, unitPrice: 499.00, amount: 499.00 },
      { description: 'FX Trading - Professional Plan', quantity: 1, unitPrice: 199.00, amount: 199.00 },
      { description: 'Escrow Services - Enterprise Plan', quantity: 1, unitPrice: 399.00, amount: 399.00 },
    ],
    subtotal: 1545.00,
    tax: 154.50,
    total: 1699.50,
  },
]

// Support Tickets for biz_001
export const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tck_001',
    businessId: 'biz_001',
    subject: 'Settlement delay inquiry',
    category: 'billing',
    priority: 'medium',
    status: 'resolved',
    assignedTo: 'Sarah Admin',
    createdDate: '2024-01-20 10:30',
    updatedDate: '2024-01-21 14:45',
    resolvedDate: '2024-01-21 14:45',
    messages: [
      {
        id: 'msg_001',
        from: 'business',
        authorName: 'John Doe',
        message: 'Hi, our settlement scheduled for Jan 20 has not arrived yet. Can you check?',
        timestamp: '2024-01-20 10:30',
      },
      {
        id: 'msg_002',
        from: 'admin',
        authorName: 'Sarah Admin',
        message: 'Thank you for contacting us. I\'m checking the settlement status now.',
        timestamp: '2024-01-20 11:15',
      },
      {
        id: 'msg_003',
        from: 'admin',
        authorName: 'Sarah Admin',
        message: 'The settlement was processed on our end. It typically takes 1-2 business days to reflect in your bank account. Please check again tomorrow.',
        timestamp: '2024-01-20 11:45',
      },
      {
        id: 'msg_004',
        from: 'business',
        authorName: 'John Doe',
        message: 'Got it, thank you! The funds arrived this morning.',
        timestamp: '2024-01-21 09:20',
      },
      {
        id: 'msg_005',
        from: 'admin',
        authorName: 'Sarah Admin',
        message: 'Great to hear! Marking this as resolved. Feel free to reach out if you have any other questions.',
        timestamp: '2024-01-21 14:45',
      },
    ],
  },
  {
    id: 'tck_002',
    businessId: 'biz_001',
    subject: 'API integration question',
    category: 'technical',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Tech Support Team',
    createdDate: '2024-01-24 15:20',
    updatedDate: '2024-01-25 10:30',
    messages: [
      {
        id: 'msg_006',
        from: 'business',
        authorName: 'Jane Developer',
        message: 'We\'re getting a 401 error when trying to create a payment via API. Our API key seems correct.',
        timestamp: '2024-01-24 15:20',
      },
      {
        id: 'msg_007',
        from: 'admin',
        authorName: 'Tech Support',
        message: 'Can you share the API endpoint you\'re calling and the request headers (without sensitive data)?',
        timestamp: '2024-01-25 10:30',
      },
    ],
  },
]

// Activity Logs for biz_001
export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log_001',
    businessId: 'biz_001',
    timestamp: '2024-01-25 14:32',
    actor: 'John Doe',
    actorType: 'business_user',
    action: 'Processed payment',
    category: 'transaction',
    details: 'Payment of $450.00 from customer #2345',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'log_002',
    businessId: 'biz_001',
    timestamp: '2024-01-25 12:15',
    actor: 'Jane Developer',
    actorType: 'business_user',
    action: 'API call - create payment',
    category: 'transaction',
    details: 'Payment of $1,200.00 created via API',
    ipAddress: '192.168.1.105',
  },
  {
    id: 'log_003',
    businessId: 'biz_001',
    timestamp: '2024-01-25 09:15',
    actor: 'John Doe',
    actorType: 'business_user',
    action: 'Logged in',
    category: 'login',
    details: 'Successful login from dashboard',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'log_004',
    businessId: 'biz_001',
    timestamp: '2024-01-24 16:45',
    actor: 'System',
    actorType: 'system',
    action: 'Settlement processed',
    category: 'transaction',
    details: 'Settlement of $15,600.00 processed to bank account',
  },
  {
    id: 'log_005',
    businessId: 'biz_001',
    timestamp: '2024-01-24 14:30',
    actor: 'John Doe',
    actorType: 'business_user',
    action: 'Updated payment method',
    category: 'settings',
    details: 'Added new bank account for settlements',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'log_006',
    businessId: 'biz_001',
    timestamp: '2024-01-23 11:20',
    actor: 'Michael Chen (Admin)',
    actorType: 'admin',
    action: 'Reviewed compliance',
    category: 'compliance',
    details: 'Monthly compliance review completed - no issues found',
  },
]

// Admin Actions for biz_001
export const MOCK_ADMIN_ACTIONS: AdminAction[] = [
  {
    id: 'act_001',
    businessId: 'biz_001',
    type: 'update_limits',
    performedBy: 'Sarah Johnson (Admin)',
    timestamp: '2024-01-15 10:30',
    reason: 'Business requested increase after 2 months of good standing',
    previousState: { dailyLimit: 10000, monthlyLimit: 100000 },
    newState: { dailyLimit: 25000, monthlyLimit: 250000 },
    notes: 'Approved after compliance review',
    reversible: true,
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getWalletsByBusinessId(businessId: string): Wallet[] {
  return MOCK_WALLETS.filter(w => w.businessId === businessId)
}

export function getTransactionsByBusinessId(businessId: string): Transaction[] {
  return MOCK_TRANSACTIONS.filter(t => t.businessId === businessId)
}

export function getSettlementsByBusinessId(businessId: string): Settlement[] {
  return MOCK_SETTLEMENTS.filter(s => s.businessId === businessId)
}

export function getEndUsersByBusinessId(businessId: string): EndUser[] {
  return MOCK_END_USERS.filter(u => u.businessId === businessId)
}

export function getModuleSubscriptionsByBusinessId(businessId: string): ModuleSubscription[] {
  return MOCK_MODULE_SUBSCRIPTIONS.filter(m => m.businessId === businessId)
}

export function getInvoicesByBusinessId(businessId: string): Invoice[] {
  return MOCK_INVOICES.filter(i => i.businessId === businessId)
}

export function getSupportTicketsByBusinessId(businessId: string): SupportTicket[] {
  return MOCK_SUPPORT_TICKETS.filter(t => t.businessId === businessId)
}

export function getActivityLogsByBusinessId(businessId: string): ActivityLog[] {
  return MOCK_ACTIVITY_LOGS.filter(a => a.businessId === businessId)
}

export function getAdminActionsByBusinessId(businessId: string): AdminAction[] {
  return MOCK_ADMIN_ACTIONS.filter(a => a.businessId === businessId)
}

export function getBusinessControlStats(businessId: string) {
  const wallets = getWalletsByBusinessId(businessId)
  const transactions = getTransactionsByBusinessId(businessId)
  const settlements = getSettlementsByBusinessId(businessId)
  const endUsers = getEndUsersByBusinessId(businessId)
  const modules = getModuleSubscriptionsByBusinessId(businessId)

  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0)
  const totalTransactions = transactions.length
  const completedTransactions = transactions.filter(t => t.status === 'completed').length
  const totalRevenue = transactions
    .filter(t => t.type === 'payment_in' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)
  const activeEndUsers = endUsers.filter(u => u.status === 'active').length
  const activeModules = modules.filter(m => m.status === 'active').length

  return {
    totalBalance,
    totalTransactions,
    completedTransactions,
    totalRevenue,
    activeEndUsers,
    activeModules,
  }
}

export function getPaymentMethodStats(businessId: string) {
  const transactions = getTransactionsByBusinessId(businessId)
  const paymentMethods = transactions
    .filter(t => t.paymentMethod && t.status === 'completed')
    .reduce((acc, t) => {
      const method = t.paymentMethod!
      if (!acc[method]) acc[method] = { count: 0, total: 0 }
      acc[method].count++
      acc[method].total += t.amount
      return acc
    }, {} as Record<PaymentMethodType, { count: number; total: number }>)

  return paymentMethods
}

export function getChannelStats(businessId: string) {
  const transactions = getTransactionsByBusinessId(businessId)
  const channels = transactions
    .filter(t => t.status === 'completed')
    .reduce((acc, t) => {
      const channel = t.channel
      if (!acc[channel]) acc[channel] = { count: 0, total: 0 }
      acc[channel].count++
      acc[channel].total += t.amount
      return acc
    }, {} as Record<ChannelType, { count: number; total: number }>)

  return channels
}
