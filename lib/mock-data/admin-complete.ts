/**
 * Comprehensive Admin Mock Data
 * Complete platform-wide administrative data including metrics, compliance, messaging, support, and more
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

// Platform Metrics
export interface PlatformMetric {
  id: string
  category: 'revenue' | 'users' | 'transactions' | 'system' | 'growth' | 'compliance'
  name: string
  value: number | string
  previousValue?: number | string
  unit: string
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  timestamp: string
  target?: number
  status?: 'healthy' | 'warning' | 'critical'
}

// System Alerts
export type AlertLevel = 'critical' | 'warning' | 'info'
export type AlertStatus = 'active' | 'acknowledged' | 'resolved' | 'dismissed'

export interface SystemAlert {
  id: string
  level: AlertLevel
  status: AlertStatus
  title: string
  description: string
  category: 'system' | 'security' | 'compliance' | 'financial' | 'operational'
  timestamp: string
  acknowledgedBy?: string
  acknowledgedAt?: string
  resolvedAt?: string
  affectedServices?: string[]
  actionRequired?: string
  metadata?: Record<string, any>
}

// Business Leads
export type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
export type LeadSource = 'website' | 'referral' | 'partner' | 'cold_outreach' | 'event' | 'advertising'

export interface BusinessLead {
  id: string
  companyName: string
  contactName: string
  email: string
  phone?: string
  website?: string
  industry: string
  country: string
  stage: LeadStage
  source: LeadSource
  estimatedMonthlyVolume?: number
  estimatedRevenue?: number
  score: number
  assignedTo: string
  createdDate: string
  lastContactDate?: string
  nextFollowUp?: string
  notes?: string[]
  tags?: string[]
}

// Business Applications
export type ApplicationStatus = 'pending_review' | 'under_review' | 'approved' | 'rejected' | 'more_info_needed'

export interface BusinessApplication {
  id: string
  businessName: string
  legalName: string
  email: string
  phone?: string
  industry: string
  country: string
  businessType: string
  registrationNumber?: string
  status: ApplicationStatus
  submittedDate: string
  reviewedDate?: string
  reviewedBy?: string
  documents: {
    name: string
    type: string
    status: 'uploaded' | 'verified' | 'rejected'
    uploadedDate: string
  }[]
  riskScore?: number
  expectedVolume?: number
  notes?: string
  rejectionReason?: string
}

// Suspended Businesses
export type SuspensionReason = 'aml_concern' | 'fraud_suspected' | 'kyb_expiry' | 'unpaid_fees' | 'policy_violation' | 'regulatory_request'

export interface SuspendedBusiness {
  id: string
  businessId: string
  businessName: string
  suspendedDate: string
  suspendedBy: string
  reason: SuspensionReason
  details: string
  resolutionPath: string
  expectedResolutionDate?: string
  lastReviewDate?: string
  canReactivate: boolean
  documentsRequired?: string[]
  notes?: string[]
}

// Terminated Businesses
export type TerminationReason = 'voluntary_closure' | 'compliance_failure' | 'fraud_confirmed' | 'repeated_violations' | 'regulatory_action'

export interface TerminatedBusiness {
  id: string
  businessId: string
  businessName: string
  terminatedDate: string
  terminatedBy: string
  reason: TerminationReason
  finalBalance: number
  balanceSettled: boolean
  settlementDate?: string
  auditTrail: {
    date: string
    action: string
    performedBy: string
    details: string
  }[]
  dataRetentionUntil: string
  notes?: string
}

// KYB Status Records
export type KYBStatusType = 'approved' | 'rejected' | 'ongoing_monitoring'

export interface KYBStatusRecord {
  id: string
  businessId: string
  businessName: string
  status: KYBStatusType
  lastReviewDate: string
  nextReviewDate?: string
  reviewedBy: string
  riskScore: number
  findings?: string[]
  conditions?: string[]
  monitoringLevel?: 'standard' | 'enhanced' | 'intensive'
}

// Sanctions Screening
export type ScreeningResult = 'clear' | 'false_positive' | 'confirmed_hit' | 'pending_review'

export interface SanctionsScreening {
  id: string
  targetType: 'business' | 'individual'
  targetId: string
  targetName: string
  screeningDate: string
  result: ScreeningResult
  matchScore: number
  matches?: {
    name: string
    listName: string
    confidence: number
    details: string
  }[]
  reviewedBy?: string
  reviewNotes?: string
  clearedDate?: string
}

// AML Alerts
export type AMLAlertType = 'unusual_pattern' | 'high_velocity' | 'structuring' | 'sanctions_match' | 'high_risk_country'
export type AMLInvestigationStatus = 'new' | 'investigating' | 'escalated' | 'cleared' | 'sar_filed'

export interface AMLAlert {
  id: string
  businessId: string
  businessName: string
  alertType: AMLAlertType
  riskScore: number
  generatedDate: string
  status: AMLInvestigationStatus
  assignedTo?: string
  transactionIds?: string[]
  amount?: number
  currency?: string
  pattern?: string
  investigationNotes?: string[]
  clearedDate?: string
  sarNumber?: string
}

// Audit Reports
export type AuditReportType = 'kyb' | 'aml' | 'financial' | 'system' | 'security' | 'compliance'

export interface AuditReport {
  id: string
  type: AuditReportType
  title: string
  period: {
    start: string
    end: string
  }
  generatedDate: string
  generatedBy: string
  status: 'draft' | 'final' | 'submitted'
  findings: {
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    recommendation: string
  }[]
  summary: string
  fileUrl?: string
}

// Platform Liquidity
export interface PlatformLiquidity {
  totalLiquidity: number
  currency: string
  reserves: number
  availableForSettlement: number
  pendingSettlements: number
  currencyBreakdown: {
    currency: string
    amount: number
    percentage: number
  }[]
  lastUpdated: string
}

// Settlement Batches
export type SettlementStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'

export interface SettlementBatch {
  id: string
  batchNumber: string
  status: SettlementStatus
  totalAmount: number
  currency: string
  transactionCount: number
  businessCount: number
  createdDate: string
  processedDate?: string
  completedDate?: string
  processingTime?: number
  failedTransactions?: number
  fees: number
}

// Reserve Accounts
export type ReserveAccountStatus = 'healthy' | 'warning' | 'critical'

export interface ReserveAccount {
  id: string
  accountNumber: string
  currency: string
  balance: number
  minimumThreshold: number
  maximumThreshold: number
  status: ReserveAccountStatus
  lastReplenished?: string
  complianceStatus: 'compliant' | 'under_review' | 'non_compliant'
  bankName: string
  country: string
}

// Fee Collection
export type FeeType = 'transaction_fee' | 'monthly_subscription' | 'setup_fee' | 'module_fee' | 'fx_fee' | 'chargeback_fee' | 'late_payment_fee'

export interface FeeTransaction {
  id: string
  businessId: string
  businessName: string
  feeType: FeeType
  amount: number
  currency: string
  date: string
  status: 'collected' | 'pending' | 'failed' | 'refunded'
  relatedTransactionId?: string
  description?: string
}

// Reconciliation Records
export type ReconciliationStatus = 'balanced' | 'discrepancy_found' | 'resolved' | 'investigating'

export interface ReconciliationRecord {
  id: string
  periodStart: string
  periodEnd: string
  status: ReconciliationStatus
  expectedBalance: number
  actualBalance: number
  discrepancyAmount?: number
  currency: string
  reconciliationDate: string
  reconciledBy?: string
  discrepancies?: {
    id: string
    type: string
    amount: number
    description: string
    resolved: boolean
  }[]
  notes?: string
}

// Module Management
export type ModuleStatus = 'published' | 'draft' | 'deprecated'

export interface PublishedModule {
  id: string
  name: string
  slug: string
  category: string
  status: ModuleStatus
  version: string
  activeInstallations: number
  totalRevenue: number
  monthlyRevenue: number
  averageRating?: number
  publishedDate: string
  lastUpdated: string
}

export interface DraftModule {
  id: string
  name: string
  slug: string
  category: string
  version: string
  createdDate: string
  lastModified: string
  createdBy: string
  reviewStatus: 'draft' | 'pending_review' | 'changes_requested' | 'approved'
  reviewer?: string
  feedback?: string
  estimatedLaunchDate?: string
}

export interface DeprecatedModule {
  id: string
  name: string
  slug: string
  deprecatedDate: string
  deprecatedBy: string
  reason: string
  replacementModule?: string
  activeInstallations: number
  migrationPlan: string
  sunsetDate: string
  notificationsSent: number
}

export interface ModuleUsageAnalytics {
  moduleId: string
  moduleName: string
  adoptionRate: number
  activeUsers: number
  totalRevenue: number
  averageRevenuePerUser: number
  churnRate: number
  topFeatures: {
    name: string
    usageCount: number
  }[]
  growthRate: number
}

// Message Center
export type MessageStatus = 'unread' | 'read' | 'archived' | 'draft'
export type MessagePriority = 'low' | 'normal' | 'high' | 'urgent'

export interface Message {
  id: string
  from: string
  fromName: string
  to: string[]
  toNames?: string[]
  subject: string
  body: string
  status: MessageStatus
  priority: MessagePriority
  category: 'inbox' | 'sent' | 'draft' | 'archived'
  timestamp: string
  readAt?: string
  attachments?: {
    name: string
    size: number
    url: string
  }[]
  tags?: string[]
  relatedBusinessId?: string
}

// Broadcast Campaigns
export type CampaignStatus = 'draft' | 'scheduled' | 'sending' | 'sent' | 'cancelled'

export interface BroadcastCampaign {
  id: string
  name: string
  subject: string
  content: string
  status: CampaignStatus
  targetAudience: {
    type: 'all' | 'segment' | 'custom'
    criteria?: Record<string, any>
    recipientCount: number
  }
  scheduledDate?: string
  sentDate?: string
  createdBy: string
  createdDate: string
  deliveryStats?: {
    sent: number
    delivered: number
    bounced: number
    opened: number
    clicked: number
    unsubscribed: number
  }
}

// Message Templates
export type TemplateCategory = 'onboarding' | 'compliance' | 'billing' | 'notification' | 'marketing' | 'support'

export interface MessageTemplate {
  id: string
  name: string
  category: TemplateCategory
  subject: string
  body: string
  variables: string[]
  usageCount: number
  lastUsed?: string
  createdDate: string
  createdBy: string
  isActive: boolean
}

// Scheduled Messages
export interface ScheduledMessage {
  id: string
  templateId?: string
  to: string[]
  subject: string
  body: string
  scheduledDate: string
  status: 'pending' | 'sent' | 'failed' | 'cancelled'
  createdBy: string
  sentAt?: string
  failureReason?: string
}

// Delivery Reports
export interface MessageDeliveryReport {
  id: string
  campaignId?: string
  messageId?: string
  date: string
  totalSent: number
  delivered: number
  bounced: number
  bouncedEmails?: {
    email: string
    reason: string
  }[]
  failureRate: number
  averageDeliveryTime?: number
}

// Support Tickets
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical'
export type TicketStatus = 'open' | 'in_progress' | 'pending_customer' | 'resolved' | 'closed'
export type TicketCategory = 'technical' | 'billing' | 'compliance' | 'feature_request' | 'bug' | 'other'

export interface SupportTicket {
  id: string
  ticketNumber: string
  businessId: string
  businessName: string
  subject: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  createdDate: string
  lastUpdated: string
  assignedTo?: string
  firstResponseTime?: number
  resolutionTime?: number
  slaStatus: 'within_sla' | 'at_risk' | 'breached'
  slaDueDate: string
  responses: {
    id: string
    from: string
    message: string
    timestamp: string
    internal?: boolean
  }[]
  tags?: string[]
}

// Escalations
export type EscalationLevel = 'l1_to_l2' | 'l2_to_l3' | 'to_manager' | 'to_director'

export interface Escalation {
  id: string
  ticketId: string
  ticketNumber: string
  businessName: string
  level: EscalationLevel
  reason: string
  escalatedDate: string
  escalatedBy: string
  escalatedTo: string
  status: 'open' | 'in_progress' | 'resolved'
  resolvedDate?: string
  resolutionTime?: number
  priority: TicketPriority
  notes?: string
}

// SLA Metrics
export interface SLAMetrics {
  period: string
  firstResponseTime: {
    target: number
    actual: number
    metPercentage: number
  }
  resolutionTime: {
    target: number
    actual: number
    metPercentage: number
  }
  breachedTickets: number
  totalTickets: number
  breachRate: number
  byPriority: {
    priority: TicketPriority
    target: number
    actual: number
    metPercentage: number
  }[]
}

// Knowledge Base
export type ArticleCategory = 'getting_started' | 'payments' | 'compliance' | 'api' | 'modules' | 'troubleshooting' | 'billing' | 'security'
export type ArticleStatus = 'draft' | 'published' | 'archived'

export interface KnowledgeBaseArticle {
  id: string
  title: string
  slug: string
  category: ArticleCategory
  status: ArticleStatus
  content: string
  author: string
  publishedDate?: string
  lastUpdated: string
  views: number
  helpful: number
  notHelpful: number
  helpfulnessRating: number
  tags: string[]
  relatedArticles?: string[]
}

// Admin Users
export type AdminRole = 'super_admin' | 'admin' | 'compliance_officer' | 'support_manager' | 'support_agent' | 'finance_manager' | 'read_only'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: AdminRole
  department: string
  status: 'active' | 'inactive' | 'suspended'
  lastActive: string
  createdDate: string
  permissions: string[]
  mfaEnabled: boolean
  timezone: string
  avatar?: string
}

// Roles & Permissions
export interface Role {
  id: string
  name: AdminRole
  displayName: string
  description: string
  permissions: Permission[]
  userCount: number
}

export interface Permission {
  id: string
  module: string
  action: 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export'
  resource: string
  granted: boolean
}

// System Configuration
export interface SystemConfig {
  key: string
  value: string | number | boolean
  category: 'general' | 'security' | 'compliance' | 'financial' | 'notifications' | 'integrations'
  description: string
  lastModified: string
  modifiedBy: string
  requiresRestart: boolean
}

// API Keys
export type APIKeyStatus = 'active' | 'revoked' | 'expired'

export interface APIKey {
  id: string
  name: string
  key: string
  businessId?: string
  businessName?: string
  scopes: string[]
  status: APIKeyStatus
  createdDate: string
  expiryDate?: string
  lastUsed?: string
  usageCount: number
  rateLimit: number
  rateLimitPeriod: 'minute' | 'hour' | 'day'
  createdBy: string
}

// Webhooks
export type WebhookStatus = 'active' | 'inactive' | 'failed'

export interface Webhook {
  id: string
  businessId: string
  businessName: string
  url: string
  events: string[]
  status: WebhookStatus
  createdDate: string
  lastTriggered?: string
  successfulDeliveries: number
  failedDeliveries: number
  averageResponseTime?: number
  secret: string
  retryPolicy: {
    maxRetries: number
    backoffMultiplier: number
  }
}

// Business Analytics
export interface BusinessAnalytics {
  period: string
  revenueBySegment: {
    segment: string
    revenue: number
    percentage: number
  }[]
  churnRate: number
  customerLifetimeValue: number
  averageRevenuePerBusiness: number
  newBusinesses: number
  lostBusinesses: number
  netGrowth: number
  topBusinesses: {
    businessId: string
    businessName: string
    revenue: number
  }[]
}

// Revenue Reports
export interface RevenueReport {
  id: string
  period: string
  type: 'monthly' | 'quarterly' | 'yearly'
  totalRevenue: number
  projectedRevenue?: number
  revenueBySource: {
    source: string
    amount: number
    percentage: number
  }[]
  expenses: number
  profit: number
  profitMargin: number
  growthRate: number
  generatedDate: string
}

// Compliance Reports
export type ComplianceReportType = 'regulatory_filing' | 'aml_report' | 'kyb_summary' | 'breach_report' | 'audit_log'

export interface ComplianceReport {
  id: string
  type: ComplianceReportType
  title: string
  reportingPeriod: {
    start: string
    end: string
  }
  submittedDate?: string
  submittedTo?: string
  status: 'draft' | 'submitted' | 'accepted' | 'rejected'
  summary: string
  findings: number
  actions: number
  fileUrl?: string
  generatedBy: string
}

// Customer Reports
export interface CustomerReport {
  id: string
  title: string
  period: string
  segments: {
    name: string
    count: number
    revenue: number
    avgTransactionValue: number
  }[]
  behaviorAnalysis: {
    metric: string
    value: number
    trend: 'increasing' | 'decreasing' | 'stable'
  }[]
  topProducts: {
    product: string
    usage: number
    revenue: number
  }[]
  generatedDate: string
}

// ============================================
// MOCK DATA - PLATFORM METRICS (20+ KPIs)
// ============================================

export const MOCK_PLATFORM_METRICS: PlatformMetric[] = [
  // Revenue Metrics
  {
    id: 'metric_001',
    category: 'revenue',
    name: 'Total Revenue (MTD)',
    value: 2847563.42,
    previousValue: 2456789.12,
    unit: 'USD',
    change: 15.9,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    target: 3000000,
    status: 'healthy',
  },
  {
    id: 'metric_002',
    category: 'revenue',
    name: 'Total Revenue (YTD)',
    value: 32847563.42,
    previousValue: 28456789.12,
    unit: 'USD',
    change: 15.4,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    status: 'healthy',
  },
  {
    id: 'metric_003',
    category: 'revenue',
    name: 'Monthly Recurring Revenue',
    value: 1245890.00,
    previousValue: 1189234.00,
    unit: 'USD',
    change: 4.8,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    target: 1300000,
    status: 'healthy',
  },
  {
    id: 'metric_004',
    category: 'revenue',
    name: 'Average Revenue Per Business',
    value: 8234.56,
    previousValue: 7856.23,
    unit: 'USD',
    change: 4.8,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    status: 'healthy',
  },
  {
    id: 'metric_005',
    category: 'revenue',
    name: 'Transaction Fee Revenue',
    value: 456789.50,
    previousValue: 423456.00,
    unit: 'USD',
    change: 7.9,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    status: 'healthy',
  },

  // User/Business Metrics
  {
    id: 'metric_006',
    category: 'users',
    name: 'Active Businesses',
    value: 1547,
    previousValue: 1489,
    unit: 'count',
    change: 3.9,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    target: 1600,
    status: 'healthy',
  },
  {
    id: 'metric_007',
    category: 'users',
    name: 'New Business Sign-ups (MTD)',
    value: 78,
    previousValue: 65,
    unit: 'count',
    change: 20.0,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    target: 80,
    status: 'healthy',
  },
  {
    id: 'metric_008',
    category: 'users',
    name: 'Total Users',
    value: 45678,
    previousValue: 43234,
    unit: 'count',
    change: 5.6,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    status: 'healthy',
  },
  {
    id: 'metric_009',
    category: 'users',
    name: 'Daily Active Users',
    value: 12456,
    previousValue: 11892,
    unit: 'count',
    change: 4.7,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    status: 'healthy',
  },
  {
    id: 'metric_010',
    category: 'users',
    name: 'Churn Rate',
    value: 2.3,
    previousValue: 2.8,
    unit: 'percent',
    change: -17.9,
    changeType: 'decrease',
    timestamp: '2024-01-26T00:00:00Z',
    target: 2.0,
    status: 'warning',
  },

  // Transaction Metrics
  {
    id: 'metric_011',
    category: 'transactions',
    name: 'Total Transactions (MTD)',
    value: 456789,
    previousValue: 423456,
    unit: 'count',
    change: 7.9,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    target: 500000,
    status: 'healthy',
  },
  {
    id: 'metric_012',
    category: 'transactions',
    name: 'Transaction Volume (MTD)',
    value: 45678923.45,
    previousValue: 42345678.90,
    unit: 'USD',
    change: 7.9,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    status: 'healthy',
  },
  {
    id: 'metric_013',
    category: 'transactions',
    name: 'Average Transaction Value',
    value: 99.95,
    previousValue: 100.01,
    unit: 'USD',
    change: -0.06,
    changeType: 'decrease',
    timestamp: '2024-01-26T00:00:00Z',
    status: 'healthy',
  },
  {
    id: 'metric_014',
    category: 'transactions',
    name: 'Transaction Success Rate',
    value: 97.8,
    previousValue: 97.3,
    unit: 'percent',
    change: 0.5,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    target: 98.0,
    status: 'warning',
  },
  {
    id: 'metric_015',
    category: 'transactions',
    name: 'Failed Transactions',
    value: 10049,
    previousValue: 11389,
    unit: 'count',
    change: -11.8,
    changeType: 'decrease',
    timestamp: '2024-01-26T00:00:00Z',
    status: 'healthy',
  },

  // System Metrics
  {
    id: 'metric_016',
    category: 'system',
    name: 'System Uptime',
    value: 99.97,
    previousValue: 99.95,
    unit: 'percent',
    change: 0.02,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    target: 99.95,
    status: 'healthy',
  },
  {
    id: 'metric_017',
    category: 'system',
    name: 'API Response Time',
    value: 124,
    previousValue: 145,
    unit: 'ms',
    change: -14.5,
    changeType: 'decrease',
    timestamp: '2024-01-26T00:00:00Z',
    target: 150,
    status: 'healthy',
  },
  {
    id: 'metric_018',
    category: 'system',
    name: 'API Requests (24h)',
    value: 2345678,
    previousValue: 2234567,
    unit: 'count',
    change: 5.0,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    status: 'healthy',
  },
  {
    id: 'metric_019',
    category: 'system',
    name: 'Database Query Time',
    value: 45,
    previousValue: 52,
    unit: 'ms',
    change: -13.5,
    changeType: 'decrease',
    timestamp: '2024-01-26T00:00:00Z',
    target: 50,
    status: 'healthy',
  },
  {
    id: 'metric_020',
    category: 'system',
    name: 'Error Rate',
    value: 0.23,
    previousValue: 0.31,
    unit: 'percent',
    change: -25.8,
    changeType: 'decrease',
    timestamp: '2024-01-26T00:00:00Z',
    target: 0.5,
    status: 'healthy',
  },

  // Growth Metrics
  {
    id: 'metric_021',
    category: 'growth',
    name: 'Month-over-Month Growth',
    value: 12.4,
    previousValue: 10.8,
    unit: 'percent',
    change: 14.8,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    target: 15.0,
    status: 'healthy',
  },
  {
    id: 'metric_022',
    category: 'growth',
    name: 'Year-over-Year Growth',
    value: 145.6,
    previousValue: 132.4,
    unit: 'percent',
    change: 10.0,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    status: 'healthy',
  },
  {
    id: 'metric_023',
    category: 'growth',
    name: 'Customer Acquisition Cost',
    value: 234.56,
    previousValue: 256.78,
    unit: 'USD',
    change: -8.6,
    changeType: 'decrease',
    timestamp: '2024-01-26T00:00:00Z',
    target: 200,
    status: 'warning',
  },
  {
    id: 'metric_024',
    category: 'growth',
    name: 'Customer Lifetime Value',
    value: 12456.78,
    previousValue: 11234.56,
    unit: 'USD',
    change: 10.9,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    status: 'healthy',
  },

  // Compliance Metrics
  {
    id: 'metric_025',
    category: 'compliance',
    name: 'KYB Approval Rate',
    value: 87.5,
    previousValue: 85.2,
    unit: 'percent',
    change: 2.7,
    changeType: 'increase',
    timestamp: '2024-01-26T00:00:00Z',
    target: 90.0,
    status: 'warning',
  },
  {
    id: 'metric_026',
    category: 'compliance',
    name: 'Active AML Alerts',
    value: 12,
    previousValue: 18,
    unit: 'count',
    change: -33.3,
    changeType: 'decrease',
    timestamp: '2024-01-26T00:00:00Z',
    target: 10,
    status: 'warning',
  },
  {
    id: 'metric_027',
    category: 'compliance',
    name: 'Average KYB Review Time',
    value: 2.4,
    previousValue: 3.1,
    unit: 'days',
    change: -22.6,
    changeType: 'decrease',
    timestamp: '2024-01-26T00:00:00Z',
    target: 2.0,
    status: 'warning',
  },
]

// ============================================
// MOCK DATA - SYSTEM ALERTS (15+)
// ============================================

export const MOCK_SYSTEM_ALERTS: SystemAlert[] = [
  {
    id: 'alert_001',
    level: 'critical',
    status: 'active',
    title: 'High Transaction Failure Rate Detected',
    description: 'Transaction failure rate has exceeded 5% in the last hour. Current rate: 6.8%',
    category: 'system',
    timestamp: '2024-01-26T14:23:00Z',
    affectedServices: ['Payment Processing', 'Card Gateway'],
    actionRequired: 'Investigate payment gateway connection and review error logs',
    metadata: {
      failureRate: 6.8,
      threshold: 5.0,
      affectedTransactions: 342,
    },
  },
  {
    id: 'alert_002',
    level: 'critical',
    status: 'acknowledged',
    title: 'AML Alert - High Risk Transaction Pattern',
    description: 'Multiple high-value transactions detected from business "Global Trade Inc" within short timeframe',
    category: 'compliance',
    timestamp: '2024-01-26T13:45:00Z',
    acknowledgedBy: 'Michael Chen',
    acknowledgedAt: '2024-01-26T13:50:00Z',
    actionRequired: 'Review transaction patterns and conduct enhanced due diligence',
    metadata: {
      businessId: 'biz_002',
      transactionCount: 15,
      totalAmount: 450000,
      timeframe: '2 hours',
    },
  },
  {
    id: 'alert_003',
    level: 'critical',
    status: 'resolved',
    title: 'Database Connection Pool Exhausted',
    description: 'All database connections in use. System unable to process new requests',
    category: 'system',
    timestamp: '2024-01-26T10:15:00Z',
    acknowledgedBy: 'System Admin',
    acknowledgedAt: '2024-01-26T10:16:00Z',
    resolvedAt: '2024-01-26T10:25:00Z',
    affectedServices: ['API', 'Dashboard', 'Payments'],
    actionRequired: 'Scale database connection pool',
  },
  {
    id: 'alert_004',
    level: 'warning',
    status: 'active',
    title: 'Liquidity Reserve Below Threshold',
    description: 'USD reserve account balance has fallen below minimum threshold of $5M. Current: $4.2M',
    category: 'financial',
    timestamp: '2024-01-26T12:00:00Z',
    actionRequired: 'Initiate fund transfer to restore reserve levels',
    metadata: {
      currency: 'USD',
      currentBalance: 4200000,
      threshold: 5000000,
      deficit: 800000,
    },
  },
  {
    id: 'alert_005',
    level: 'warning',
    status: 'active',
    title: 'KYB Documents Expiring Soon',
    description: '15 businesses have KYB documents expiring within 30 days',
    category: 'compliance',
    timestamp: '2024-01-26T09:00:00Z',
    actionRequired: 'Contact businesses to submit updated documentation',
    metadata: {
      businessCount: 15,
      documentTypes: ['Business License', 'Proof of Address', 'Bank Statements'],
    },
  },
  {
    id: 'alert_006',
    level: 'warning',
    status: 'acknowledged',
    title: 'High Support Ticket Volume',
    description: 'Support ticket volume 45% higher than average. Current open tickets: 127',
    category: 'operational',
    timestamp: '2024-01-26T08:30:00Z',
    acknowledgedBy: 'Sarah Admin',
    acknowledgedAt: '2024-01-26T08:35:00Z',
    actionRequired: 'Review ticket categories and consider additional support resources',
    metadata: {
      openTickets: 127,
      averageTickets: 87,
      increase: 45,
    },
  },
  {
    id: 'alert_007',
    level: 'warning',
    status: 'resolved',
    title: 'API Rate Limit Exceeded by Business',
    description: 'Business "TechStart Ltd" exceeded API rate limit. Requests throttled.',
    category: 'system',
    timestamp: '2024-01-26T07:45:00Z',
    acknowledgedBy: 'System Admin',
    acknowledgedAt: '2024-01-26T07:46:00Z',
    resolvedAt: '2024-01-26T09:00:00Z',
    actionRequired: 'Contact business regarding API usage patterns',
    metadata: {
      businessId: 'biz_003',
      rateLimit: 1000,
      actualRequests: 1456,
      timeWindow: '1 hour',
    },
  },
  {
    id: 'alert_008',
    level: 'info',
    status: 'active',
    title: 'New Module Published',
    description: 'Module "AI Insights Pro" has been published to the marketplace',
    category: 'operational',
    timestamp: '2024-01-26T15:00:00Z',
    metadata: {
      moduleId: 'mod_ai_insights_pro',
      version: '1.0.0',
    },
  },
  {
    id: 'alert_009',
    level: 'info',
    status: 'active',
    title: 'Scheduled Maintenance Window',
    description: 'Planned maintenance scheduled for Jan 28, 2024 02:00-04:00 UTC',
    category: 'system',
    timestamp: '2024-01-26T06:00:00Z',
    affectedServices: ['Dashboard', 'Reporting'],
    actionRequired: 'Notify all businesses via email',
    metadata: {
      maintenanceStart: '2024-01-28T02:00:00Z',
      maintenanceEnd: '2024-01-28T04:00:00Z',
      estimatedDowntime: '2 hours',
    },
  },
  {
    id: 'alert_010',
    level: 'info',
    status: 'active',
    title: 'Monthly Revenue Target Achieved',
    description: 'Monthly revenue target of $2.8M reached 4 days ahead of schedule',
    category: 'financial',
    timestamp: '2024-01-26T11:30:00Z',
    metadata: {
      target: 2800000,
      actual: 2847563.42,
      daysAhead: 4,
    },
  },
  {
    id: 'alert_011',
    level: 'warning',
    status: 'active',
    title: 'Unusual Login Activity Detected',
    description: 'Multiple failed login attempts detected for admin user "john.admin@wiremi.com"',
    category: 'security',
    timestamp: '2024-01-26T13:15:00Z',
    actionRequired: 'Review login attempts and verify account security',
    metadata: {
      userId: 'admin_001',
      failedAttempts: 7,
      ipAddresses: ['192.168.1.100', '10.0.0.45'],
    },
  },
  {
    id: 'alert_012',
    level: 'critical',
    status: 'active',
    title: 'Sanctions Screening Match Detected',
    description: 'Potential sanctions match found for new business application "International Trading Co"',
    category: 'compliance',
    timestamp: '2024-01-26T14:00:00Z',
    actionRequired: 'Immediate review required - do not approve application',
    metadata: {
      businessId: 'biz_pending_045',
      matchConfidence: 0.85,
      listName: 'OFAC SDN List',
    },
  },
  {
    id: 'alert_013',
    level: 'warning',
    status: 'acknowledged',
    title: 'Settlement Batch Processing Delayed',
    description: 'Settlement batch BATCH-2024-0126-03 processing time exceeds normal duration',
    category: 'financial',
    timestamp: '2024-01-26T12:30:00Z',
    acknowledgedBy: 'Finance Team',
    acknowledgedAt: '2024-01-26T12:35:00Z',
    actionRequired: 'Monitor batch processing and investigate if delay continues',
    metadata: {
      batchId: 'batch_126',
      normalDuration: 45,
      currentDuration: 78,
      unit: 'minutes',
    },
  },
  {
    id: 'alert_014',
    level: 'info',
    status: 'active',
    title: 'Webhook Delivery Failure Rate Increased',
    description: 'Webhook delivery failure rate for business "Retail Solutions" increased to 8%',
    category: 'operational',
    timestamp: '2024-01-26T11:00:00Z',
    actionRequired: 'Contact business to verify webhook endpoint',
    metadata: {
      businessId: 'biz_004',
      failureRate: 8,
      previousRate: 2,
    },
  },
  {
    id: 'alert_015',
    level: 'info',
    status: 'dismissed',
    title: 'System Update Available',
    description: 'New system update v2.4.1 available with bug fixes and performance improvements',
    category: 'system',
    timestamp: '2024-01-26T08:00:00Z',
    actionRequired: 'Schedule update deployment',
    metadata: {
      version: '2.4.1',
      releaseNotes: 'https://docs.wiremi.com/releases/2.4.1',
    },
  },
  {
    id: 'alert_016',
    level: 'warning',
    status: 'active',
    title: 'Chargebacks Rate Elevated',
    description: 'Platform-wide chargeback rate has increased to 0.8% from average of 0.4%',
    category: 'financial',
    timestamp: '2024-01-26T10:45:00Z',
    actionRequired: 'Analyze chargeback patterns and identify contributing factors',
    metadata: {
      currentRate: 0.8,
      normalRate: 0.4,
      totalChargebacks: 234,
    },
  },
]

// ============================================
// MOCK DATA - BUSINESS LEADS (30+)
// ============================================

export const MOCK_BUSINESS_LEADS: BusinessLead[] = [
  // New Leads
  {
    id: 'lead_001',
    companyName: 'FitnessPro Chain',
    contactName: 'Jennifer Martinez',
    email: 'j.martinez@fitnesspro.com',
    phone: '+1-555-0234',
    website: 'https://fitnesspro.com',
    industry: 'fitness',
    country: 'US',
    stage: 'new',
    source: 'website',
    estimatedMonthlyVolume: 85000,
    estimatedRevenue: 850,
    score: 85,
    assignedTo: 'Sales Team',
    createdDate: '2024-01-26',
    notes: ['Interested in membership management and payments'],
    tags: ['high_potential', 'multi_location'],
  },
  {
    id: 'lead_002',
    companyName: 'QuickBite Delivery',
    contactName: 'David Wong',
    email: 'david@quickbite.io',
    phone: '+65-8123-4567',
    website: 'https://quickbite.io',
    industry: 'hospitality',
    country: 'SG',
    stage: 'new',
    source: 'referral',
    estimatedMonthlyVolume: 125000,
    estimatedRevenue: 1250,
    score: 92,
    assignedTo: 'Sales Team',
    createdDate: '2024-01-26',
    notes: ['Referred by existing customer "Restaurant Chain Co"'],
    tags: ['hot_lead', 'food_delivery'],
  },
  {
    id: 'lead_003',
    companyName: 'EcoMarket Online',
    contactName: 'Sarah Green',
    email: 'sarah@ecomarket.com',
    industry: 'ecommerce',
    country: 'UK',
    stage: 'new',
    source: 'advertising',
    estimatedMonthlyVolume: 45000,
    score: 68,
    assignedTo: 'Sales Team',
    createdDate: '2024-01-25',
    tags: ['ecommerce', 'sustainability'],
  },
  {
    id: 'lead_004',
    companyName: 'TravelHub Agency',
    contactName: 'Michael Chang',
    email: 'm.chang@travelhub.com',
    phone: '+852-2345-6789',
    website: 'https://travelhub.com',
    industry: 'hospitality',
    country: 'HK',
    stage: 'new',
    source: 'event',
    estimatedMonthlyVolume: 200000,
    estimatedRevenue: 2000,
    score: 88,
    assignedTo: 'John Admin',
    createdDate: '2024-01-25',
    notes: ['Met at FinTech Asia conference', 'Looking for multi-currency solution'],
    tags: ['travel', 'high_value'],
  },
  {
    id: 'lead_005',
    companyName: 'MediCare Plus',
    contactName: 'Dr. Lisa Anderson',
    email: 'l.anderson@medicareplus.com',
    industry: 'healthcare',
    country: 'AU',
    stage: 'new',
    source: 'cold_outreach',
    estimatedMonthlyVolume: 95000,
    score: 75,
    assignedTo: 'Sales Team',
    createdDate: '2024-01-24',
    tags: ['healthcare', 'regulated'],
  },

  // Contacted
  {
    id: 'lead_006',
    companyName: 'AutoParts Direct',
    contactName: 'Robert Johnson',
    email: 'r.johnson@autoparts.com',
    phone: '+1-555-0345',
    website: 'https://autoparts.com',
    industry: 'ecommerce',
    country: 'US',
    stage: 'contacted',
    source: 'website',
    estimatedMonthlyVolume: 150000,
    estimatedRevenue: 1500,
    score: 82,
    assignedTo: 'Sarah Admin',
    createdDate: '2024-01-23',
    lastContactDate: '2024-01-24',
    nextFollowUp: '2024-01-27',
    notes: ['Initial call completed', 'Interested in inventory integration'],
    tags: ['automotive', 'b2b'],
  },
  {
    id: 'lead_007',
    companyName: 'SmartHome Solutions',
    contactName: 'Emma Wilson',
    email: 'emma@smarthome.io',
    phone: '+44-20-7123-4567',
    industry: 'retail',
    country: 'UK',
    stage: 'contacted',
    source: 'partner',
    estimatedMonthlyVolume: 75000,
    score: 71,
    assignedTo: 'John Admin',
    createdDate: '2024-01-22',
    lastContactDate: '2024-01-24',
    nextFollowUp: '2024-01-28',
    notes: ['Sent product deck', 'Awaiting internal review'],
    tags: ['iot', 'retail'],
  },
  {
    id: 'lead_008',
    companyName: 'LegalTech Services',
    contactName: 'James Patterson',
    email: 'j.patterson@legaltech.com',
    industry: 'services',
    country: 'CA',
    stage: 'contacted',
    source: 'referral',
    estimatedMonthlyVolume: 55000,
    score: 65,
    assignedTo: 'Sales Team',
    createdDate: '2024-01-21',
    lastContactDate: '2024-01-23',
    nextFollowUp: '2024-01-26',
    tags: ['legal', 'professional_services'],
  },
  {
    id: 'lead_009',
    companyName: 'EventPro Management',
    contactName: 'Sophia Rodriguez',
    email: 's.rodriguez@eventpro.com',
    phone: '+34-91-123-4567',
    website: 'https://eventpro.es',
    industry: 'services',
    country: 'ES',
    stage: 'contacted',
    source: 'website',
    estimatedMonthlyVolume: 180000,
    estimatedRevenue: 1800,
    score: 87,
    assignedTo: 'Sarah Admin',
    createdDate: '2024-01-20',
    lastContactDate: '2024-01-25',
    nextFollowUp: '2024-01-29',
    notes: ['Large event management company', 'Need ticketing and payments'],
    tags: ['events', 'high_potential'],
  },
  {
    id: 'lead_010',
    companyName: 'FashionHub Marketplace',
    contactName: 'Oliver Smith',
    email: 'oliver@fashionhub.com',
    industry: 'ecommerce',
    country: 'FR',
    stage: 'contacted',
    source: 'advertising',
    estimatedMonthlyVolume: 220000,
    score: 90,
    assignedTo: 'John Admin',
    createdDate: '2024-01-19',
    lastContactDate: '2024-01-24',
    nextFollowUp: '2024-01-27',
    tags: ['fashion', 'marketplace'],
  },

  // Qualified
  {
    id: 'lead_011',
    companyName: 'CloudStorage Pro',
    contactName: 'Daniel Kim',
    email: 'd.kim@cloudstorage.com',
    phone: '+82-2-1234-5678',
    website: 'https://cloudstoragepro.com',
    industry: 'saas',
    country: 'KR',
    stage: 'qualified',
    source: 'partner',
    estimatedMonthlyVolume: 280000,
    estimatedRevenue: 2800,
    score: 94,
    assignedTo: 'Sarah Admin',
    createdDate: '2024-01-18',
    lastContactDate: '2024-01-25',
    nextFollowUp: '2024-01-27',
    notes: ['Qualified opportunity', 'Budget confirmed', 'Decision maker identified'],
    tags: ['saas', 'enterprise', 'qualified'],
  },
  {
    id: 'lead_012',
    companyName: 'PropertyManage Inc',
    contactName: 'Maria Garcia',
    email: 'm.garcia@propertymanage.com',
    phone: '+1-555-0456',
    industry: 'services',
    country: 'US',
    stage: 'qualified',
    source: 'referral',
    estimatedMonthlyVolume: 165000,
    estimatedRevenue: 1650,
    score: 86,
    assignedTo: 'John Admin',
    createdDate: '2024-01-17',
    lastContactDate: '2024-01-24',
    nextFollowUp: '2024-01-28',
    notes: ['Manages 500+ properties', 'Needs rent collection solution'],
    tags: ['property_management', 'recurring_payments'],
  },
  {
    id: 'lead_013',
    companyName: 'GymChain International',
    contactName: 'Alex Thompson',
    email: 'alex@gymchain.com',
    phone: '+61-3-1234-5678',
    website: 'https://gymchain.com',
    industry: 'fitness',
    country: 'AU',
    stage: 'qualified',
    source: 'website',
    estimatedMonthlyVolume: 340000,
    estimatedRevenue: 3400,
    score: 96,
    assignedTo: 'Sarah Admin',
    createdDate: '2024-01-16',
    lastContactDate: '2024-01-26',
    nextFollowUp: '2024-01-29',
    notes: ['25 locations across Australia', 'Ready to pilot in 3 locations'],
    tags: ['fitness', 'multi_location', 'enterprise'],
  },
  {
    id: 'lead_014',
    companyName: 'EduPlatform Online',
    contactName: 'Rachel Lee',
    email: 'rachel@eduplatform.com',
    industry: 'education',
    country: 'SG',
    stage: 'qualified',
    source: 'event',
    estimatedMonthlyVolume: 120000,
    estimatedRevenue: 1200,
    score: 83,
    assignedTo: 'John Admin',
    createdDate: '2024-01-15',
    lastContactDate: '2024-01-23',
    nextFollowUp: '2024-01-27',
    tags: ['education', 'online_learning'],
  },
  {
    id: 'lead_015',
    companyName: 'BeautyBox Subscription',
    contactName: 'Isabella Chen',
    email: 'isabella@beautybox.com',
    website: 'https://beautybox.com',
    industry: 'ecommerce',
    country: 'US',
    stage: 'qualified',
    source: 'advertising',
    estimatedMonthlyVolume: 195000,
    estimatedRevenue: 1950,
    score: 89,
    assignedTo: 'Sarah Admin',
    createdDate: '2024-01-14',
    lastContactDate: '2024-01-25',
    nextFollowUp: '2024-01-28',
    notes: ['Subscription box service', 'Need recurring billing'],
    tags: ['subscription', 'beauty'],
  },

  // Proposal
  {
    id: 'lead_016',
    companyName: 'LogisticsPro Global',
    contactName: 'Thomas Anderson',
    email: 't.anderson@logisticspro.com',
    phone: '+49-30-1234-5678',
    website: 'https://logisticspro.de',
    industry: 'services',
    country: 'DE',
    stage: 'proposal',
    source: 'partner',
    estimatedMonthlyVolume: 450000,
    estimatedRevenue: 4500,
    score: 97,
    assignedTo: 'John Admin',
    createdDate: '2024-01-12',
    lastContactDate: '2024-01-25',
    nextFollowUp: '2024-01-28',
    notes: ['Proposal sent Jan 23', 'Customized pricing for enterprise plan'],
    tags: ['logistics', 'enterprise', 'high_value'],
  },
  {
    id: 'lead_017',
    companyName: 'FoodMarket Online',
    contactName: 'Emily Zhang',
    email: 'emily@foodmarket.com',
    phone: '+86-10-1234-5678',
    industry: 'ecommerce',
    country: 'CN',
    stage: 'proposal',
    source: 'website',
    estimatedMonthlyVolume: 580000,
    estimatedRevenue: 5800,
    score: 98,
    assignedTo: 'Sarah Admin',
    createdDate: '2024-01-11',
    lastContactDate: '2024-01-26',
    nextFollowUp: '2024-01-29',
    notes: ['Major grocery delivery platform', 'Proposal includes custom API integration'],
    tags: ['grocery', 'enterprise', 'china'],
  },
  {
    id: 'lead_018',
    companyName: 'HealthTech Innovations',
    contactName: 'Dr. William Brown',
    email: 'w.brown@healthtech.com',
    phone: '+1-555-0567',
    industry: 'healthcare',
    country: 'US',
    stage: 'proposal',
    source: 'referral',
    estimatedMonthlyVolume: 275000,
    estimatedRevenue: 2750,
    score: 91,
    assignedTo: 'John Admin',
    createdDate: '2024-01-10',
    lastContactDate: '2024-01-24',
    nextFollowUp: '2024-01-27',
    notes: ['Telemedicine platform', 'Requires HIPAA compliance discussion'],
    tags: ['healthcare', 'telemedicine', 'regulated'],
  },
  {
    id: 'lead_019',
    companyName: 'CarRental Express',
    contactName: 'Lucas Martin',
    email: 'lucas@carrental.com',
    website: 'https://carrentalexpress.com',
    industry: 'hospitality',
    country: 'ES',
    stage: 'proposal',
    source: 'event',
    estimatedMonthlyVolume: 320000,
    estimatedRevenue: 3200,
    score: 93,
    assignedTo: 'Sarah Admin',
    createdDate: '2024-01-09',
    lastContactDate: '2024-01-25',
    nextFollowUp: '2024-01-28',
    tags: ['car_rental', 'travel'],
  },
  {
    id: 'lead_020',
    companyName: 'SportEquip Retail',
    contactName: 'Amanda White',
    email: 'amanda@sportequip.com',
    phone: '+61-2-1234-5678',
    industry: 'retail',
    country: 'AU',
    stage: 'proposal',
    source: 'cold_outreach',
    estimatedMonthlyVolume: 145000,
    estimatedRevenue: 1450,
    score: 80,
    assignedTo: 'John Admin',
    createdDate: '2024-01-08',
    lastContactDate: '2024-01-23',
    nextFollowUp: '2024-01-27',
    tags: ['sports', 'retail'],
  },

  // Negotiation
  {
    id: 'lead_021',
    companyName: 'MegaMart Retail Chain',
    contactName: 'Richard Davis',
    email: 'r.davis@megamart.com',
    phone: '+1-555-0678',
    website: 'https://megamart.com',
    industry: 'retail',
    country: 'US',
    stage: 'negotiation',
    source: 'referral',
    estimatedMonthlyVolume: 850000,
    estimatedRevenue: 8500,
    score: 99,
    assignedTo: 'Sarah Admin',
    createdDate: '2024-01-05',
    lastContactDate: '2024-01-26',
    nextFollowUp: '2024-01-27',
    notes: ['Contract negotiation in progress', 'Legal review stage', '150 store locations'],
    tags: ['retail', 'enterprise', 'hot_lead'],
  },
  {
    id: 'lead_022',
    companyName: 'StreamMedia Plus',
    contactName: 'Jessica Taylor',
    email: 'jessica@streammedia.com',
    phone: '+44-20-8123-4567',
    industry: 'saas',
    country: 'UK',
    stage: 'negotiation',
    source: 'partner',
    estimatedMonthlyVolume: 420000,
    estimatedRevenue: 4200,
    score: 96,
    assignedTo: 'John Admin',
    createdDate: '2024-01-04',
    lastContactDate: '2024-01-25',
    nextFollowUp: '2024-01-28',
    notes: ['Negotiating volume discounts', 'Integration timeline being finalized'],
    tags: ['streaming', 'saas', 'content'],
  },
  {
    id: 'lead_023',
    companyName: 'InsureTech Solutions',
    contactName: 'Christopher Moore',
    email: 'c.moore@insuretech.com',
    industry: 'fintech',
    country: 'SG',
    stage: 'negotiation',
    source: 'website',
    estimatedMonthlyVolume: 380000,
    estimatedRevenue: 3800,
    score: 94,
    assignedTo: 'Sarah Admin',
    createdDate: '2024-01-03',
    lastContactDate: '2024-01-26',
    nextFollowUp: '2024-01-29',
    notes: ['Finalizing compliance requirements', 'Security audit completed'],
    tags: ['insurance', 'fintech', 'regulated'],
  },
  {
    id: 'lead_024',
    companyName: 'PetCare Marketplace',
    contactName: 'Sophie Martin',
    email: 'sophie@petcare.com',
    phone: '+33-1-1234-5678',
    website: 'https://petcaremarketplace.fr',
    industry: 'ecommerce',
    country: 'FR',
    stage: 'negotiation',
    source: 'advertising',
    estimatedMonthlyVolume: 265000,
    estimatedRevenue: 2650,
    score: 88,
    assignedTo: 'John Admin',
    createdDate: '2024-01-02',
    lastContactDate: '2024-01-24',
    nextFollowUp: '2024-01-27',
    tags: ['pets', 'marketplace'],
  },

  // Won
  {
    id: 'lead_025',
    companyName: 'TechGear Electronics',
    contactName: 'Benjamin Clark',
    email: 'b.clark@techgear.com',
    phone: '+1-555-0789',
    website: 'https://techgear.com',
    industry: 'retail',
    country: 'US',
    stage: 'won',
    source: 'website',
    estimatedMonthlyVolume: 520000,
    estimatedRevenue: 5200,
    score: 95,
    assignedTo: 'Sarah Admin',
    createdDate: '2023-12-15',
    lastContactDate: '2024-01-20',
    notes: ['Contract signed Jan 18', 'Onboarding scheduled for Feb 1'],
    tags: ['electronics', 'retail', 'won'],
  },
  {
    id: 'lead_026',
    companyName: 'WellnessHub Spa',
    contactName: 'Victoria Lee',
    email: 'victoria@wellnesshub.com',
    phone: '+65-6234-5678',
    industry: 'services',
    country: 'SG',
    stage: 'won',
    source: 'referral',
    estimatedMonthlyVolume: 95000,
    estimatedRevenue: 950,
    score: 78,
    assignedTo: 'John Admin',
    createdDate: '2023-12-20',
    lastContactDate: '2024-01-22',
    notes: ['Contract signed Jan 20', '8 spa locations', 'Go-live scheduled Feb 5'],
    tags: ['wellness', 'spa', 'won'],
  },
  {
    id: 'lead_027',
    companyName: 'AgriTech Farms',
    contactName: 'Henry Wilson',
    email: 'henry@agritech.com',
    industry: 'other',
    country: 'AU',
    stage: 'won',
    source: 'partner',
    estimatedMonthlyVolume: 180000,
    estimatedRevenue: 1800,
    score: 85,
    assignedTo: 'Sarah Admin',
    createdDate: '2023-12-18',
    lastContactDate: '2024-01-19',
    notes: ['Contract signed Jan 15', 'Agricultural marketplace platform'],
    tags: ['agriculture', 'marketplace', 'won'],
  },

  // Lost
  {
    id: 'lead_028',
    companyName: 'FastFood Franchise',
    contactName: 'Kevin Rodriguez',
    email: 'kevin@fastfood.com',
    industry: 'hospitality',
    country: 'US',
    stage: 'lost',
    source: 'cold_outreach',
    estimatedMonthlyVolume: 420000,
    estimatedRevenue: 4200,
    score: 92,
    assignedTo: 'John Admin',
    createdDate: '2023-12-10',
    lastContactDate: '2024-01-15',
    notes: ['Lost to competitor - pricing', 'Went with existing provider'],
    tags: ['fast_food', 'franchise', 'lost'],
  },
  {
    id: 'lead_029',
    companyName: 'BookStore Online',
    contactName: 'Laura Martinez',
    email: 'laura@bookstore.com',
    industry: 'ecommerce',
    country: 'UK',
    stage: 'lost',
    source: 'website',
    estimatedMonthlyVolume: 65000,
    estimatedRevenue: 650,
    score: 62,
    assignedTo: 'Sales Team',
    createdDate: '2023-12-12',
    lastContactDate: '2024-01-10',
    notes: ['Lost - budget constraints', 'May revisit in 6 months'],
    tags: ['books', 'ecommerce', 'lost'],
  },
  {
    id: 'lead_030',
    companyName: 'CoworkSpace Hub',
    contactName: 'Nathan Brown',
    email: 'nathan@coworkspace.com',
    industry: 'services',
    country: 'CA',
    stage: 'lost',
    source: 'advertising',
    estimatedMonthlyVolume: 85000,
    estimatedRevenue: 850,
    score: 70,
    assignedTo: 'Sarah Admin',
    createdDate: '2023-12-08',
    lastContactDate: '2024-01-08',
    notes: ['Lost - timing not right', 'Company undergoing restructuring'],
    tags: ['coworking', 'real_estate', 'lost'],
  },
  {
    id: 'lead_031',
    companyName: 'MobileGame Studios',
    contactName: 'Andrew Kim',
    email: 'andrew@mobilegame.com',
    industry: 'saas',
    country: 'KR',
    stage: 'lost',
    source: 'event',
    estimatedMonthlyVolume: 340000,
    estimatedRevenue: 3400,
    score: 88,
    assignedTo: 'John Admin',
    createdDate: '2023-12-05',
    lastContactDate: '2024-01-12',
    notes: ['Lost to competitor - feature set', 'Needed mobile-first solution'],
    tags: ['gaming', 'mobile', 'lost'],
  },
  {
    id: 'lead_032',
    companyName: 'HomeDecor Market',
    contactName: 'Michelle Green',
    email: 'michelle@homedecor.com',
    phone: '+1-555-0890',
    industry: 'ecommerce',
    country: 'US',
    stage: 'contacted',
    source: 'referral',
    estimatedMonthlyVolume: 115000,
    estimatedRevenue: 1150,
    score: 76,
    assignedTo: 'Sales Team',
    createdDate: '2024-01-21',
    lastContactDate: '2024-01-25',
    nextFollowUp: '2024-01-28',
    tags: ['home_decor', 'ecommerce'],
  },
]

// ============================================
// MOCK DATA - BUSINESS APPLICATIONS (25+)
// ============================================

export const MOCK_BUSINESS_APPLICATIONS: BusinessApplication[] = [
  // Pending Review
  {
    id: 'app_001',
    businessName: 'Digital Payments Co',
    legalName: 'Digital Payments Company Ltd',
    email: 'compliance@digitalpayments.com',
    phone: '+44-20-9123-4567',
    industry: 'fintech',
    country: 'UK',
    businessType: 'corporation',
    registrationNumber: 'UK-2024-001',
    status: 'pending_review',
    submittedDate: '2024-01-26',
    documents: [
      { name: 'Certificate of Incorporation', type: 'incorporation', status: 'uploaded', uploadedDate: '2024-01-26' },
      { name: 'Bank Statement', type: 'financial', status: 'uploaded', uploadedDate: '2024-01-26' },
      { name: 'Business License', type: 'license', status: 'uploaded', uploadedDate: '2024-01-26' },
      { name: 'Proof of Address', type: 'address', status: 'uploaded', uploadedDate: '2024-01-26' },
    ],
    riskScore: 45,
    expectedVolume: 250000,
  },
  {
    id: 'app_002',
    businessName: 'GreenEnergy Solutions',
    legalName: 'GreenEnergy Solutions GmbH',
    email: 'admin@greenenergy.de',
    phone: '+49-30-2234-5678',
    industry: 'other',
    country: 'DE',
    businessType: 'corporation',
    registrationNumber: 'DE-HRB-456789',
    status: 'pending_review',
    submittedDate: '2024-01-26',
    documents: [
      { name: 'Handelsregister Extract', type: 'incorporation', status: 'uploaded', uploadedDate: '2024-01-26' },
      { name: 'Tax ID Certificate', type: 'tax', status: 'uploaded', uploadedDate: '2024-01-26' },
      { name: 'Business Plan', type: 'other', status: 'uploaded', uploadedDate: '2024-01-26' },
    ],
    riskScore: 32,
    expectedVolume: 180000,
  },
  {
    id: 'app_003',
    businessName: 'FitGym Network',
    legalName: 'FitGym Network Pty Ltd',
    email: 'operations@fitgym.com.au',
    industry: 'fitness',
    country: 'AU',
    businessType: 'corporation',
    registrationNumber: 'ACN-123-456-789',
    status: 'pending_review',
    submittedDate: '2024-01-25',
    documents: [
      { name: 'ASIC Extract', type: 'incorporation', status: 'uploaded', uploadedDate: '2024-01-25' },
      { name: 'Bank Statement', type: 'financial', status: 'uploaded', uploadedDate: '2024-01-25' },
    ],
    riskScore: 28,
    expectedVolume: 145000,
  },
  {
    id: 'app_004',
    businessName: 'Urban Restaurant Group',
    legalName: 'Urban Restaurant Group Inc',
    email: 'finance@urbanrestaurant.com',
    phone: '+1-555-0901',
    industry: 'hospitality',
    country: 'US',
    businessType: 'corporation',
    registrationNumber: 'DE-2024-789',
    status: 'pending_review',
    submittedDate: '2024-01-25',
    documents: [
      { name: 'Articles of Incorporation', type: 'incorporation', status: 'uploaded', uploadedDate: '2024-01-25' },
      { name: 'EIN Letter', type: 'tax', status: 'uploaded', uploadedDate: '2024-01-25' },
      { name: 'Restaurant Licenses', type: 'license', status: 'uploaded', uploadedDate: '2024-01-25' },
      { name: 'Health Permits', type: 'license', status: 'uploaded', uploadedDate: '2024-01-25' },
    ],
    riskScore: 35,
    expectedVolume: 320000,
  },
  {
    id: 'app_005',
    businessName: 'CodeAcademy Online',
    legalName: 'CodeAcademy Online LLC',
    email: 'admin@codeacademy.io',
    industry: 'education',
    country: 'US',
    businessType: 'llc',
    registrationNumber: 'CA-LLC-2024-123',
    status: 'pending_review',
    submittedDate: '2024-01-25',
    documents: [
      { name: 'LLC Formation Documents', type: 'incorporation', status: 'uploaded', uploadedDate: '2024-01-25' },
      { name: 'Bank Account Details', type: 'financial', status: 'uploaded', uploadedDate: '2024-01-25' },
    ],
    riskScore: 25,
    expectedVolume: 95000,
  },

  // Under Review
  {
    id: 'app_006',
    businessName: 'PharmaDirect Supply',
    legalName: 'PharmaDirect Supply Chain Ltd',
    email: 'compliance@pharmadirect.com',
    phone: '+1-555-1012',
    industry: 'healthcare',
    country: 'US',
    businessType: 'corporation',
    registrationNumber: 'FL-2024-456',
    status: 'under_review',
    submittedDate: '2024-01-24',
    reviewedDate: '2024-01-25',
    reviewedBy: 'Michael Chen',
    documents: [
      { name: 'Certificate of Incorporation', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-24' },
      { name: 'DEA License', type: 'license', status: 'verified', uploadedDate: '2024-01-24' },
      { name: 'State Pharmacy License', type: 'license', status: 'verified', uploadedDate: '2024-01-24' },
      { name: 'Financial Statements', type: 'financial', status: 'verified', uploadedDate: '2024-01-24' },
      { name: 'Compliance Documentation', type: 'other', status: 'uploaded', uploadedDate: '2024-01-24' },
    ],
    riskScore: 52,
    expectedVolume: 420000,
    notes: 'Regulated healthcare business - enhanced due diligence required',
  },
  {
    id: 'app_007',
    businessName: 'CryptoWallet Services',
    legalName: 'CryptoWallet Services SA',
    email: 'kyb@cryptowallet.ch',
    phone: '+41-44-123-4567',
    industry: 'fintech',
    country: 'CH',
    businessType: 'corporation',
    registrationNumber: 'CHE-123.456.789',
    status: 'under_review',
    submittedDate: '2024-01-23',
    reviewedDate: '2024-01-24',
    reviewedBy: 'Sarah Johnson',
    documents: [
      { name: 'Commercial Register Extract', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-23' },
      { name: 'FINMA Registration', type: 'license', status: 'verified', uploadedDate: '2024-01-23' },
      { name: 'AML Policy', type: 'compliance', status: 'verified', uploadedDate: '2024-01-23' },
      { name: 'Source of Funds', type: 'financial', status: 'uploaded', uploadedDate: '2024-01-23' },
    ],
    riskScore: 68,
    expectedVolume: 850000,
    notes: 'High-risk crypto business - extensive compliance review in progress',
  },
  {
    id: 'app_008',
    businessName: 'LocalFarm Marketplace',
    legalName: 'LocalFarm Marketplace Ltd',
    email: 'support@localfarm.co.nz',
    industry: 'ecommerce',
    country: 'NZ',
    businessType: 'corporation',
    registrationNumber: 'NZ-456789',
    status: 'under_review',
    submittedDate: '2024-01-23',
    reviewedDate: '2024-01-24',
    reviewedBy: 'John Admin',
    documents: [
      { name: 'Companies Office Extract', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-23' },
      { name: 'Bank Reference Letter', type: 'financial', status: 'verified', uploadedDate: '2024-01-23' },
      { name: 'Food Safety Certificate', type: 'license', status: 'verified', uploadedDate: '2024-01-23' },
    ],
    riskScore: 30,
    expectedVolume: 125000,
  },
  {
    id: 'app_009',
    businessName: 'Luxury Hotel Chain',
    legalName: 'Luxury Hotel Chain SPA',
    email: 'finance@luxuryhotel.it',
    phone: '+39-02-1234-5678',
    industry: 'hospitality',
    country: 'IT',
    businessType: 'corporation',
    registrationNumber: 'IT-REA-789123',
    status: 'under_review',
    submittedDate: '2024-01-22',
    reviewedDate: '2024-01-23',
    reviewedBy: 'Sarah Johnson',
    documents: [
      { name: 'Camera di Commercio Certificate', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-22' },
      { name: 'Hotel Operating License', type: 'license', status: 'verified', uploadedDate: '2024-01-22' },
      { name: 'Financial Statements 2023', type: 'financial', status: 'verified', uploadedDate: '2024-01-22' },
      { name: 'Tax Clearance', type: 'tax', status: 'verified', uploadedDate: '2024-01-22' },
    ],
    riskScore: 38,
    expectedVolume: 680000,
  },
  {
    id: 'app_010',
    businessName: 'SmartCity Parking',
    legalName: 'SmartCity Parking Solutions AB',
    email: 'info@smartcityparking.se',
    industry: 'services',
    country: 'SE',
    businessType: 'corporation',
    registrationNumber: 'SE-556789-1234',
    status: 'under_review',
    submittedDate: '2024-01-22',
    reviewedDate: '2024-01-23',
    reviewedBy: 'Michael Chen',
    documents: [
      { name: 'Bolagsverket Registration', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-22' },
      { name: 'Bank Statement', type: 'financial', status: 'verified', uploadedDate: '2024-01-22' },
    ],
    riskScore: 27,
    expectedVolume: 155000,
  },

  // Approved
  {
    id: 'app_011',
    businessName: 'TeachPro Learning',
    legalName: 'TeachPro Learning Pte Ltd',
    email: 'admin@teachpro.sg',
    phone: '+65-6345-6789',
    industry: 'education',
    country: 'SG',
    businessType: 'corporation',
    registrationNumber: 'SG-202401234A',
    status: 'approved',
    submittedDate: '2024-01-20',
    reviewedDate: '2024-01-23',
    reviewedBy: 'Sarah Johnson',
    documents: [
      { name: 'ACRA BizFile', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-20' },
      { name: 'Education License', type: 'license', status: 'verified', uploadedDate: '2024-01-20' },
      { name: 'Bank Account Details', type: 'financial', status: 'verified', uploadedDate: '2024-01-20' },
    ],
    riskScore: 22,
    expectedVolume: 85000,
    notes: 'All compliance checks passed. Approved for onboarding.',
  },
  {
    id: 'app_012',
    businessName: 'CraftBeer Brewery',
    legalName: 'CraftBeer Brewery Ltd',
    email: 'sales@craftbeer.ie',
    industry: 'hospitality',
    country: 'IE',
    businessType: 'corporation',
    registrationNumber: 'IE-456789',
    status: 'approved',
    submittedDate: '2024-01-19',
    reviewedDate: '2024-01-22',
    reviewedBy: 'John Admin',
    documents: [
      { name: 'CRO Certificate', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-19' },
      { name: 'Alcohol License', type: 'license', status: 'verified', uploadedDate: '2024-01-19' },
      { name: 'Bank Reference', type: 'financial', status: 'verified', uploadedDate: '2024-01-19' },
    ],
    riskScore: 33,
    expectedVolume: 195000,
  },
  {
    id: 'app_013',
    businessName: 'DataAnalytics Pro',
    legalName: 'DataAnalytics Pro Inc',
    email: 'compliance@dataanalytics.com',
    phone: '+1-555-1123',
    industry: 'saas',
    country: 'US',
    businessType: 'corporation',
    registrationNumber: 'DE-2024-321',
    status: 'approved',
    submittedDate: '2024-01-18',
    reviewedDate: '2024-01-21',
    reviewedBy: 'Michael Chen',
    documents: [
      { name: 'Certificate of Incorporation', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-18' },
      { name: 'IRS EIN Letter', type: 'tax', status: 'verified', uploadedDate: '2024-01-18' },
      { name: 'Bank Statement', type: 'financial', status: 'verified', uploadedDate: '2024-01-18' },
    ],
    riskScore: 26,
    expectedVolume: 175000,
  },
  {
    id: 'app_014',
    businessName: 'Fashion Boutique Paris',
    legalName: 'Fashion Boutique Paris SARL',
    email: 'contact@fashionboutique.fr',
    phone: '+33-1-2345-6789',
    industry: 'retail',
    country: 'FR',
    businessType: 'llc',
    registrationNumber: 'FR-SIREN-123456789',
    status: 'approved',
    submittedDate: '2024-01-17',
    reviewedDate: '2024-01-20',
    reviewedBy: 'Sarah Johnson',
    documents: [
      { name: 'Kbis Extract', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-17' },
      { name: 'Bank Statement', type: 'financial', status: 'verified', uploadedDate: '2024-01-17' },
      { name: 'Retail License', type: 'license', status: 'verified', uploadedDate: '2024-01-17' },
    ],
    riskScore: 29,
    expectedVolume: 135000,
  },
  {
    id: 'app_015',
    businessName: 'GreenBuild Construction',
    legalName: 'GreenBuild Construction Ltd',
    email: 'admin@greenbuild.ca',
    industry: 'services',
    country: 'CA',
    businessType: 'corporation',
    registrationNumber: 'BC-1234567',
    status: 'approved',
    submittedDate: '2024-01-16',
    reviewedDate: '2024-01-19',
    reviewedBy: 'John Admin',
    documents: [
      { name: 'Corporate Registry Extract', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-16' },
      { name: 'Construction License', type: 'license', status: 'verified', uploadedDate: '2024-01-16' },
      { name: 'Insurance Certificate', type: 'other', status: 'verified', uploadedDate: '2024-01-16' },
    ],
    riskScore: 31,
    expectedVolume: 285000,
  },

  // More Info Needed
  {
    id: 'app_016',
    businessName: 'GlobalTrade Imports',
    legalName: 'GlobalTrade Imports Ltd',
    email: 'operations@globaltrade.hk',
    phone: '+852-3456-7890',
    industry: 'other',
    country: 'HK',
    businessType: 'corporation',
    registrationNumber: 'HK-CR-789456',
    status: 'more_info_needed',
    submittedDate: '2024-01-21',
    reviewedDate: '2024-01-23',
    reviewedBy: 'Michael Chen',
    documents: [
      { name: 'Business Registration Certificate', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-21' },
      { name: 'Bank Statement', type: 'financial', status: 'verified', uploadedDate: '2024-01-21' },
      { name: 'Import License', type: 'license', status: 'rejected', uploadedDate: '2024-01-21' },
    ],
    riskScore: 48,
    expectedVolume: 420000,
    notes: 'Import license document unclear. Request updated copy.',
  },
  {
    id: 'app_017',
    businessName: 'VirtualReality Gaming',
    legalName: 'VirtualReality Gaming Oy',
    email: 'info@vrgaming.fi',
    industry: 'saas',
    country: 'FI',
    businessType: 'corporation',
    registrationNumber: 'FI-1234567-8',
    status: 'more_info_needed',
    submittedDate: '2024-01-20',
    reviewedDate: '2024-01-22',
    reviewedBy: 'Sarah Johnson',
    documents: [
      { name: 'Trade Register Extract', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-20' },
      { name: 'Financial Statements', type: 'financial', status: 'rejected', uploadedDate: '2024-01-20' },
    ],
    riskScore: 42,
    expectedVolume: 225000,
    notes: 'Financial statements missing Q4 2023. Please provide complete annual statement.',
  },
  {
    id: 'app_018',
    businessName: 'OrganicFood Delivery',
    legalName: 'OrganicFood Delivery AS',
    email: 'support@organicfood.no',
    phone: '+47-22-123-456',
    industry: 'hospitality',
    country: 'NO',
    businessType: 'corporation',
    registrationNumber: 'NO-987654321',
    status: 'more_info_needed',
    submittedDate: '2024-01-19',
    reviewedDate: '2024-01-21',
    reviewedBy: 'John Admin',
    documents: [
      { name: 'Brønnøysund Certificate', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-19' },
      { name: 'Food Safety Certificate', type: 'license', status: 'verified', uploadedDate: '2024-01-19' },
      { name: 'Proof of Address', type: 'address', status: 'rejected', uploadedDate: '2024-01-19' },
    ],
    riskScore: 35,
    expectedVolume: 165000,
    notes: 'Proof of address document is older than 3 months. Need current document.',
  },
  {
    id: 'app_019',
    businessName: 'JewelryArt Studio',
    legalName: 'JewelryArt Studio SRL',
    email: 'contact@jewelryart.ro',
    industry: 'retail',
    country: 'RO',
    businessType: 'llc',
    registrationNumber: 'J40/1234/2024',
    status: 'more_info_needed',
    submittedDate: '2024-01-18',
    reviewedDate: '2024-01-20',
    reviewedBy: 'Michael Chen',
    documents: [
      { name: 'ONRC Certificate', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-18' },
      { name: 'Bank Statement', type: 'financial', status: 'uploaded', uploadedDate: '2024-01-18' },
    ],
    riskScore: 36,
    expectedVolume: 95000,
    notes: 'Need additional documents: Tax registration certificate and business insurance.',
  },
  {
    id: 'app_020',
    businessName: 'SolarPanel Installations',
    legalName: 'SolarPanel Installations BV',
    email: 'info@solarpanel.nl',
    phone: '+31-20-123-4567',
    industry: 'services',
    country: 'NL',
    businessType: 'corporation',
    registrationNumber: 'NL-KVK-12345678',
    status: 'more_info_needed',
    submittedDate: '2024-01-17',
    reviewedDate: '2024-01-19',
    reviewedBy: 'Sarah Johnson',
    documents: [
      { name: 'KVK Extract', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-17' },
      { name: 'Installation License', type: 'license', status: 'verified', uploadedDate: '2024-01-17' },
      { name: 'UBO Declaration', type: 'compliance', status: 'rejected', uploadedDate: '2024-01-17' },
    ],
    riskScore: 40,
    expectedVolume: 310000,
    notes: 'UBO declaration incomplete. Missing ownership structure diagram.',
  },

  // Rejected
  {
    id: 'app_021',
    businessName: 'QuickCash Loans',
    legalName: 'QuickCash Loans Ltd',
    email: 'info@quickcash.com',
    industry: 'fintech',
    country: 'CY',
    businessType: 'corporation',
    registrationNumber: 'CY-HE-123456',
    status: 'rejected',
    submittedDate: '2024-01-15',
    reviewedDate: '2024-01-18',
    reviewedBy: 'Michael Chen',
    documents: [
      { name: 'Certificate of Incorporation', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-15' },
      { name: 'Financial License', type: 'license', status: 'rejected', uploadedDate: '2024-01-15' },
    ],
    riskScore: 89,
    expectedVolume: 650000,
    rejectionReason: 'High-risk business model. Insufficient regulatory licensing for payday lending.',
    notes: 'Application rejected due to lack of proper financial services licensing and high-risk business model.',
  },
  {
    id: 'app_022',
    businessName: 'CasinoGames Online',
    legalName: 'CasinoGames Online NV',
    email: 'compliance@casinogames.com',
    industry: 'other',
    country: 'CW',
    businessType: 'corporation',
    registrationNumber: 'CW-123456',
    status: 'rejected',
    submittedDate: '2024-01-14',
    reviewedDate: '2024-01-17',
    reviewedBy: 'Sarah Johnson',
    documents: [
      { name: 'Commercial Registry', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-14' },
      { name: 'Gaming License', type: 'license', status: 'verified', uploadedDate: '2024-01-14' },
    ],
    riskScore: 95,
    expectedVolume: 1200000,
    rejectionReason: 'Online gambling operations not accepted under current risk policy.',
    notes: 'Application rejected - gambling/casino operations outside risk appetite.',
  },
  {
    id: 'app_023',
    businessName: 'GoldBullion Trading',
    legalName: 'GoldBullion Trading Ltd',
    email: 'admin@goldbullion.com',
    industry: 'other',
    country: 'UK',
    businessType: 'corporation',
    registrationNumber: 'UK-2024-789',
    status: 'rejected',
    submittedDate: '2024-01-13',
    reviewedDate: '2024-01-16',
    reviewedBy: 'Michael Chen',
    documents: [
      { name: 'Companies House Extract', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-13' },
      { name: 'Source of Funds', type: 'financial', status: 'rejected', uploadedDate: '2024-01-13' },
    ],
    riskScore: 82,
    expectedVolume: 5000000,
    rejectionReason: 'Unable to verify source of funds. Insufficient documentation on beneficial ownership.',
    notes: 'Rejected - inadequate KYB documentation and unclear ownership structure.',
  },
  {
    id: 'app_024',
    businessName: 'ShellCompany Ventures',
    legalName: 'ShellCompany Ventures Inc',
    email: 'contact@shellcompany.com',
    industry: 'other',
    country: 'PA',
    businessType: 'corporation',
    registrationNumber: 'PA-98765',
    status: 'rejected',
    submittedDate: '2024-01-12',
    reviewedDate: '2024-01-15',
    reviewedBy: 'Sarah Johnson',
    documents: [
      { name: 'Certificate of Incorporation', type: 'incorporation', status: 'uploaded', uploadedDate: '2024-01-12' },
    ],
    riskScore: 98,
    expectedVolume: 2500000,
    rejectionReason: 'No business substance. No legitimate business operations identified. High jurisdiction risk.',
    notes: 'Rejected - shell company with no substance, Panama jurisdiction, high AML risk.',
  },
  {
    id: 'app_025',
    businessName: 'UnlicensedPharmacy Online',
    legalName: 'UnlicensedPharmacy Online Ltd',
    email: 'sales@pharmacy.com',
    industry: 'healthcare',
    country: 'IN',
    businessType: 'corporation',
    registrationNumber: 'IN-U12345MH2024',
    status: 'rejected',
    submittedDate: '2024-01-11',
    reviewedDate: '2024-01-14',
    reviewedBy: 'Michael Chen',
    documents: [
      { name: 'Registration Certificate', type: 'incorporation', status: 'verified', uploadedDate: '2024-01-11' },
      { name: 'Pharmacy License', type: 'license', status: 'rejected', uploadedDate: '2024-01-11' },
    ],
    riskScore: 85,
    expectedVolume: 350000,
    rejectionReason: 'No valid pharmacy operating license. Regulatory non-compliance.',
    notes: 'Rejected - operating pharmacy without proper licensing and regulatory approval.',
  },
]

// ============================================
// MOCK DATA - SUSPENDED BUSINESSES (10+)
// ============================================

export const MOCK_SUSPENDED_BUSINESSES: SuspendedBusiness[] = [
  {
    id: 'susp_001',
    businessId: 'biz_013',
    businessName: 'Suspicious Trading Ltd',
    suspendedDate: '2024-01-10',
    suspendedBy: 'Michael Chen',
    reason: 'aml_concern',
    details: 'Multiple high-value transactions to high-risk jurisdictions flagged by AML monitoring system. Unusual transaction patterns inconsistent with stated business activity.',
    resolutionPath: 'Enhanced due diligence review required. Business must provide transaction documentation, customer identification, and source of funds verification.',
    expectedResolutionDate: '2024-02-10',
    lastReviewDate: '2024-01-24',
    canReactivate: true,
    documentsRequired: [
      'Transaction documentation for flagged transactions',
      'Customer due diligence records',
      'Source of funds declarations',
      'Updated business activity description',
    ],
    notes: [
      'Business has been cooperative with investigation',
      'Provided partial documentation',
      'Awaiting final compliance review',
    ],
  },
  {
    id: 'susp_002',
    businessId: 'biz_078',
    businessName: 'RapidPay Solutions',
    suspendedDate: '2024-01-15',
    suspendedBy: 'Sarah Johnson',
    reason: 'fraud_suspected',
    details: 'Multiple chargeback claims received from customers alleging non-delivery of goods. Chargeback rate exceeded 2% threshold.',
    resolutionPath: 'Investigation into fulfillment practices required. Business must demonstrate improved controls and settle outstanding chargebacks.',
    expectedResolutionDate: '2024-02-15',
    lastReviewDate: '2024-01-22',
    canReactivate: true,
    documentsRequired: [
      'Shipping/fulfillment records',
      'Updated terms of service',
      'Customer service improvement plan',
      'Chargeback resolution proof',
    ],
    notes: [
      'Business disputes fraud allegations',
      'Claims fulfillment delays due to supplier issues',
      'Working on chargeback resolution',
    ],
  },
  {
    id: 'susp_003',
    businessId: 'biz_134',
    businessName: 'MedicHealth Supplies',
    suspendedDate: '2024-01-18',
    suspendedBy: 'John Admin',
    reason: 'kyb_expiry',
    details: 'Healthcare operating license expired on Dec 31, 2023. Business license renewal not yet provided despite multiple requests.',
    resolutionPath: 'Provide renewed healthcare license and updated regulatory compliance documentation.',
    expectedResolutionDate: '2024-02-01',
    lastReviewDate: '2024-01-25',
    canReactivate: true,
    documentsRequired: [
      'Renewed healthcare operating license',
      'Current insurance certificate',
      'Updated compliance attestation',
    ],
    notes: [
      'Business submitted license renewal application to regulator',
      'Awaiting government approval',
      'No other compliance issues identified',
    ],
  },
  {
    id: 'susp_004',
    businessId: 'biz_089',
    businessName: 'GlobalEx Trading',
    suspendedDate: '2024-01-12',
    suspendedBy: 'Michael Chen',
    reason: 'aml_concern',
    details: 'Structuring activity detected - multiple transactions just below reporting thresholds. Potential attempt to avoid regulatory reporting requirements.',
    resolutionPath: 'Comprehensive transaction review and enhanced monitoring. May require SAR filing depending on investigation outcome.',
    expectedResolutionDate: '2024-02-12',
    lastReviewDate: '2024-01-23',
    canReactivate: false,
    notes: [
      'Investigation in progress',
      'Coordinating with compliance team',
      'Business has not yet been contacted pending investigation completion',
    ],
  },
  {
    id: 'susp_005',
    businessId: 'biz_156',
    businessName: 'PayLater Services',
    suspendedDate: '2024-01-20',
    suspendedBy: 'Sarah Johnson',
    reason: 'unpaid_fees',
    details: 'Outstanding platform fees totaling $12,450. Multiple payment failures for monthly subscription and transaction fees.',
    resolutionPath: 'Payment of all outstanding fees plus late payment penalties. Setup of automatic payment method.',
    expectedResolutionDate: '2024-01-30',
    lastReviewDate: '2024-01-24',
    canReactivate: true,
    documentsRequired: [
      'Payment of $12,450 + $450 late fee',
      'Updated payment method details',
    ],
    notes: [
      'Business claims financial difficulties',
      'Proposed payment plan submitted',
      'Under review by finance team',
    ],
  },
  {
    id: 'susp_006',
    businessId: 'biz_201',
    businessName: 'CryptoFast Exchange',
    suspendedDate: '2024-01-08',
    suspendedBy: 'Michael Chen',
    reason: 'regulatory_request',
    details: 'Financial regulator requested suspension pending investigation into potential unlicensed money transmission activities.',
    resolutionPath: 'Awaiting outcome of regulatory investigation. Business must obtain proper licensing or cease operations.',
    expectedResolutionDate: '2024-03-08',
    lastReviewDate: '2024-01-22',
    canReactivate: false,
    documentsRequired: [
      'Regulatory clearance letter',
      'Money transmitter license',
      'Compliance audit report',
    ],
    notes: [
      'Serious regulatory matter',
      'Legal counsel engaged',
      'Cannot reactivate without regulator approval',
    ],
  },
  {
    id: 'susp_007',
    businessId: 'biz_167',
    businessName: 'HighRisk Ventures LLC',
    suspendedDate: '2024-01-14',
    suspendedBy: 'Sarah Johnson',
    reason: 'policy_violation',
    details: 'Repeated violations of acceptable use policy. Processed transactions for prohibited product categories including unregulated supplements.',
    resolutionPath: 'Provide evidence of policy compliance improvements and cease all prohibited activities.',
    expectedResolutionDate: '2024-02-14',
    lastReviewDate: '2024-01-21',
    canReactivate: true,
    documentsRequired: [
      'Updated product catalog',
      'Compliance certification',
      'Third-party audit report',
    ],
    notes: [
      'Business removed prohibited products',
      'Submitted updated inventory list',
      'Awaiting compliance verification',
    ],
  },
  {
    id: 'susp_008',
    businessId: 'biz_223',
    businessName: 'PharmaDirect Online',
    suspendedDate: '2024-01-16',
    suspendedBy: 'John Admin',
    reason: 'kyb_expiry',
    details: 'DEA license expired. Pharmacy license up for renewal. Cannot process healthcare transactions without current licenses.',
    resolutionPath: 'Provide renewed DEA license and pharmacy license from state regulator.',
    expectedResolutionDate: '2024-02-05',
    lastReviewDate: '2024-01-24',
    canReactivate: true,
    documentsRequired: [
      'Renewed DEA license',
      'State pharmacy license renewal',
      'Updated insurance certificate',
    ],
  },
  {
    id: 'susp_009',
    businessId: 'biz_178',
    businessName: 'FastMoney Transfer',
    suspendedDate: '2024-01-11',
    suspendedBy: 'Michael Chen',
    reason: 'aml_concern',
    details: 'High-velocity transactions to sanctions jurisdictions detected. Possible sanctions evasion scheme.',
    resolutionPath: 'Enhanced due diligence, sanctions screening verification, possible termination depending on investigation findings.',
    expectedResolutionDate: '2024-02-25',
    lastReviewDate: '2024-01-25',
    canReactivate: false,
    notes: [
      'Critical AML investigation',
      'Coordinating with external advisors',
      'Potential SAR filing required',
      'Termination likely',
    ],
  },
  {
    id: 'susp_010',
    businessId: 'biz_245',
    businessName: 'BudgetTravel Agency',
    suspendedDate: '2024-01-19',
    suspendedBy: 'Sarah Johnson',
    reason: 'fraud_suspected',
    details: 'Customer complaints regarding fake bookings and non-existent travel packages. Multiple fraud reports filed.',
    resolutionPath: 'Investigation required. Likely termination if fraud confirmed. Customer refunds must be processed.',
    expectedResolutionDate: '2024-02-02',
    lastReviewDate: '2024-01-23',
    canReactivate: false,
    notes: [
      'Active fraud investigation',
      'Law enforcement notified',
      'Customer refund process initiated',
      'Termination pending investigation outcome',
    ],
  },
  {
    id: 'susp_011',
    businessId: 'biz_192',
    businessName: 'TechGadgets Store',
    suspendedDate: '2024-01-17',
    suspendedBy: 'John Admin',
    reason: 'unpaid_fees',
    details: 'Outstanding fees of $6,750 for 3 months. Multiple failed payment attempts.',
    resolutionPath: 'Clear all outstanding balances and provide valid payment method.',
    expectedResolutionDate: '2024-01-31',
    lastReviewDate: '2024-01-26',
    canReactivate: true,
    documentsRequired: [
      'Payment of $6,750 outstanding balance',
      'New payment method on file',
    ],
    notes: [
      'Business contacted, payment promised by Jan 30',
      'If payment received, reactivation can proceed',
    ],
  },
]

// ============================================
// MOCK DATA - TERMINATED BUSINESSES (8+)
// ============================================

export const MOCK_TERMINATED_BUSINESSES: TerminatedBusiness[] = [
  {
    id: 'term_001',
    businessId: 'biz_999',
    businessName: 'FraudCo International',
    terminatedDate: '2024-01-05',
    terminatedBy: 'Michael Chen',
    reason: 'fraud_confirmed',
    finalBalance: 0,
    balanceSettled: true,
    settlementDate: '2024-01-05',
    auditTrail: [
      {
        date: '2023-12-20',
        action: 'Fraud investigation initiated',
        performedBy: 'AML Team',
        details: 'Multiple customer fraud complaints received',
      },
      {
        date: '2023-12-28',
        action: 'Account suspended',
        performedBy: 'Michael Chen',
        details: 'Suspended pending investigation outcome',
      },
      {
        date: '2024-01-03',
        action: 'Fraud confirmed',
        performedBy: 'Compliance Team',
        details: 'Evidence of systematic customer fraud scheme',
      },
      {
        date: '2024-01-05',
        action: 'Account terminated',
        performedBy: 'Michael Chen',
        details: 'Permanent termination due to confirmed fraud. All funds withheld for customer refunds.',
      },
    ],
    dataRetentionUntil: '2031-01-05',
    notes: 'SAR filed with FinCEN. Customer refund process completed. Law enforcement notified.',
  },
  {
    id: 'term_002',
    businessId: 'biz_888',
    businessName: 'QuickCash Lending',
    terminatedDate: '2024-01-10',
    terminatedBy: 'Sarah Johnson',
    reason: 'compliance_failure',
    finalBalance: 0,
    balanceSettled: true,
    settlementDate: '2024-01-10',
    auditTrail: [
      {
        date: '2023-11-15',
        action: 'KYB documents expired',
        performedBy: 'System',
        details: 'Financial services license expired',
      },
      {
        date: '2023-11-20',
        action: 'Renewal requested',
        performedBy: 'Sarah Johnson',
        details: 'Business contacted to provide renewed license',
      },
      {
        date: '2023-12-20',
        action: 'Account suspended',
        performedBy: 'Sarah Johnson',
        details: 'No response to renewal requests',
      },
      {
        date: '2024-01-10',
        action: 'Account terminated',
        performedBy: 'Sarah Johnson',
        details: 'Operating without valid license. Regulatory non-compliance.',
      },
    ],
    dataRetentionUntil: '2031-01-10',
    notes: 'Regulatory violation reported. Business failed to maintain required licensing.',
  },
  {
    id: 'term_003',
    businessId: 'biz_777',
    businessName: 'MyBusiness Store',
    terminatedDate: '2024-01-12',
    terminatedBy: 'Business Owner',
    reason: 'voluntary_closure',
    finalBalance: 2456.78,
    balanceSettled: true,
    settlementDate: '2024-01-14',
    auditTrail: [
      {
        date: '2024-01-05',
        action: 'Closure requested',
        performedBy: 'Business Owner',
        details: 'Business owner requested account closure',
      },
      {
        date: '2024-01-08',
        action: 'Final transactions processed',
        performedBy: 'System',
        details: 'All pending transactions completed',
      },
      {
        date: '2024-01-12',
        action: 'Account closed',
        performedBy: 'John Admin',
        details: 'Voluntary closure processed',
      },
      {
        date: '2024-01-14',
        action: 'Final balance settled',
        performedBy: 'Finance Team',
        details: 'Remaining balance of $2,456.78 transferred to business bank account',
      },
    ],
    dataRetentionUntil: '2031-01-12',
    notes: 'Clean closure. Business ceased operations. All balances settled satisfactorily.',
  },
  {
    id: 'term_004',
    businessId: 'biz_666',
    businessName: 'ShellCorp Trading',
    terminatedDate: '2024-01-08',
    terminatedBy: 'Michael Chen',
    reason: 'regulatory_action',
    finalBalance: 0,
    balanceSettled: true,
    settlementDate: '2024-01-08',
    auditTrail: [
      {
        date: '2023-12-18',
        action: 'Regulatory inquiry received',
        performedBy: 'Compliance Team',
        details: 'Financial regulator requested information',
      },
      {
        date: '2023-12-20',
        action: 'Account frozen',
        performedBy: 'Michael Chen',
        details: 'Funds frozen per regulatory order',
      },
      {
        date: '2024-01-05',
        action: 'Termination order received',
        performedBy: 'Compliance Team',
        details: 'Regulator ordered account termination',
      },
      {
        date: '2024-01-08',
        action: 'Account terminated',
        performedBy: 'Michael Chen',
        details: 'Terminated per regulatory order. Funds transferred to regulator.',
      },
    ],
    dataRetentionUntil: '2031-01-08',
    notes: 'Regulatory enforcement action. SAR filed. Ongoing regulatory proceedings.',
  },
  {
    id: 'term_005',
    businessId: 'biz_555',
    businessName: 'PolicyViolator Inc',
    terminatedDate: '2024-01-15',
    terminatedBy: 'Sarah Johnson',
    reason: 'repeated_violations',
    finalBalance: 1234.50,
    balanceSettled: true,
    settlementDate: '2024-01-17',
    auditTrail: [
      {
        date: '2023-10-10',
        action: 'First policy violation',
        performedBy: 'John Admin',
        details: 'Warning issued for prohibited product category',
      },
      {
        date: '2023-11-15',
        action: 'Second policy violation',
        performedBy: 'Sarah Johnson',
        details: 'Account suspended for 7 days',
      },
      {
        date: '2023-12-20',
        action: 'Third policy violation',
        performedBy: 'Sarah Johnson',
        details: 'Final warning issued',
      },
      {
        date: '2024-01-15',
        action: 'Fourth violation - account terminated',
        performedBy: 'Sarah Johnson',
        details: 'Repeated violations of acceptable use policy. Permanent termination.',
      },
      {
        date: '2024-01-17',
        action: 'Final balance settled',
        performedBy: 'Finance Team',
        details: 'Balance of $1,234.50 paid out',
      },
    ],
    dataRetentionUntil: '2031-01-15',
    notes: 'Multiple policy violations despite warnings. Business continued prohibited activities.',
  },
  {
    id: 'term_006',
    businessId: 'biz_444',
    businessName: 'CafeBistro Chain',
    terminatedDate: '2024-01-18',
    terminatedBy: 'Business Owner',
    reason: 'voluntary_closure',
    finalBalance: 8765.43,
    balanceSettled: true,
    settlementDate: '2024-01-20',
    auditTrail: [
      {
        date: '2024-01-10',
        action: 'Closure notification',
        performedBy: 'Business Owner',
        details: 'Business shutting down operations',
      },
      {
        date: '2024-01-15',
        action: 'Final transactions processed',
        performedBy: 'System',
        details: 'All pending settlements completed',
      },
      {
        date: '2024-01-18',
        action: 'Account closed',
        performedBy: 'John Admin',
        details: 'Voluntary closure - business ceased trading',
      },
      {
        date: '2024-01-20',
        action: 'Balance transferred',
        performedBy: 'Finance Team',
        details: 'Final balance of $8,765.43 settled',
      },
    ],
    dataRetentionUntil: '2031-01-18',
    notes: 'Clean closure. Restaurant chain shut down. No compliance issues.',
  },
  {
    id: 'term_007',
    businessId: 'biz_333',
    businessName: 'HighRiskGaming Ltd',
    terminatedDate: '2024-01-20',
    terminatedBy: 'Michael Chen',
    reason: 'compliance_failure',
    finalBalance: 0,
    balanceSettled: true,
    settlementDate: '2024-01-20',
    auditTrail: [
      {
        date: '2023-12-01',
        action: 'Gaming license expired',
        performedBy: 'System',
        details: 'Gambling license not renewed',
      },
      {
        date: '2023-12-05',
        action: 'Operations suspended',
        performedBy: 'Michael Chen',
        details: 'Cannot operate without valid license',
      },
      {
        date: '2024-01-15',
        action: 'License not renewed',
        performedBy: 'Compliance Team',
        details: 'Business failed to renew license for 45+ days',
      },
      {
        date: '2024-01-20',
        action: 'Account terminated',
        performedBy: 'Michael Chen',
        details: 'Operating without required gambling license',
      },
    ],
    dataRetentionUntil: '2031-01-20',
    notes: 'Compliance failure. Operating without required gambling license.',
  },
  {
    id: 'term_008',
    businessId: 'biz_222',
    businessName: 'ScamStore Online',
    terminatedDate: '2024-01-22',
    terminatedBy: 'Sarah Johnson',
    reason: 'fraud_confirmed',
    finalBalance: 0,
    balanceSettled: true,
    settlementDate: '2024-01-22',
    auditTrail: [
      {
        date: '2024-01-10',
        action: 'Customer complaints received',
        performedBy: 'Support Team',
        details: 'Multiple fraud complaints',
      },
      {
        date: '2024-01-12',
        action: 'Investigation initiated',
        performedBy: 'Compliance Team',
        details: 'Fraud investigation opened',
      },
      {
        date: '2024-01-15',
        action: 'Account frozen',
        performedBy: 'Sarah Johnson',
        details: 'All transactions halted pending investigation',
      },
      {
        date: '2024-01-20',
        action: 'Fraud confirmed',
        performedBy: 'Compliance Team',
        details: 'Systematic fraud scheme identified',
      },
      {
        date: '2024-01-22',
        action: 'Account terminated',
        performedBy: 'Sarah Johnson',
        details: 'Terminated for fraud. Funds allocated to customer refunds.',
      },
    ],
    dataRetentionUntil: '2031-01-22',
    notes: 'Confirmed fraud. Customer refund process initiated. Law enforcement notified.',
  },
]

// ============================================
// HELPER FUNCTIONS (50+)
// ============================================

// Platform Metrics Helpers
export function getMetricsByCategory(category: PlatformMetric['category']): PlatformMetric[] {
  return MOCK_PLATFORM_METRICS.filter(m => m.category === category)
}

export function getMetricById(id: string): PlatformMetric | undefined {
  return MOCK_PLATFORM_METRICS.find(m => m.id === id)
}

export function getMetricsByStatus(status: 'healthy' | 'warning' | 'critical'): PlatformMetric[] {
  return MOCK_PLATFORM_METRICS.filter(m => m.status === status)
}

export function getRevenueMetrics(): PlatformMetric[] {
  return getMetricsByCategory('revenue')
}

export function getUserMetrics(): PlatformMetric[] {
  return getMetricsByCategory('users')
}

export function getTransactionMetrics(): PlatformMetric[] {
  return getMetricsByCategory('transactions')
}

export function getSystemMetrics(): PlatformMetric[] {
  return getMetricsByCategory('system')
}

export function getGrowthMetrics(): PlatformMetric[] {
  return getMetricsByCategory('growth')
}

export function getComplianceMetrics(): PlatformMetric[] {
  return getMetricsByCategory('compliance')
}

// System Alerts Helpers
export function getAlertsByLevel(level: AlertLevel): SystemAlert[] {
  return MOCK_SYSTEM_ALERTS.filter(a => a.level === level)
}

export function getAlertsByStatus(status: AlertStatus): SystemAlert[] {
  return MOCK_SYSTEM_ALERTS.filter(a => a.status === status)
}

export function getActiveAlerts(): SystemAlert[] {
  return MOCK_SYSTEM_ALERTS.filter(a => a.status === 'active')
}

export function getCriticalAlerts(): SystemAlert[] {
  return getAlertsByLevel('critical')
}

export function getAlertsByCategory(category: SystemAlert['category']): SystemAlert[] {
  return MOCK_SYSTEM_ALERTS.filter(a => a.category === category)
}

// Business Leads Helpers
export function getLeadsByStage(stage: LeadStage): BusinessLead[] {
  return MOCK_BUSINESS_LEADS.filter(l => l.stage === stage)
}

export function getLeadById(id: string): BusinessLead | undefined {
  return MOCK_BUSINESS_LEADS.find(l => l.id === id)
}

export function getNewLeads(): BusinessLead[] {
  return getLeadsByStage('new')
}

export function getQualifiedLeads(): BusinessLead[] {
  return getLeadsByStage('qualified')
}

export function getLeadsInNegotiation(): BusinessLead[] {
  return getLeadsByStage('negotiation')
}

export function getWonLeads(): BusinessLead[] {
  return getLeadsByStage('won')
}

export function getLostLeads(): BusinessLead[] {
  return getLeadsByStage('lost')
}

export function getLeadsBySource(source: LeadSource): BusinessLead[] {
  return MOCK_BUSINESS_LEADS.filter(l => l.source === source)
}

export function getLeadsByAssignee(assignee: string): BusinessLead[] {
  return MOCK_BUSINESS_LEADS.filter(l => l.assignedTo === assignee)
}

export function getLeadStats() {
  return {
    total: MOCK_BUSINESS_LEADS.length,
    new: getLeadsByStage('new').length,
    contacted: getLeadsByStage('contacted').length,
    qualified: getLeadsByStage('qualified').length,
    proposal: getLeadsByStage('proposal').length,
    negotiation: getLeadsByStage('negotiation').length,
    won: getLeadsByStage('won').length,
    lost: getLeadsByStage('lost').length,
    conversionRate: (getWonLeads().length / MOCK_BUSINESS_LEADS.length) * 100,
    totalEstimatedRevenue: MOCK_BUSINESS_LEADS.filter(l => l.estimatedRevenue).reduce((sum, l) => sum + (l.estimatedRevenue || 0), 0),
  }
}

// Business Applications Helpers
export function getApplicationsByStatus(status: ApplicationStatus): BusinessApplication[] {
  return MOCK_BUSINESS_APPLICATIONS.filter(a => a.status === status)
}

export function getPendingApplications(): BusinessApplication[] {
  return getApplicationsByStatus('pending_review')
}

export function getApplicationsUnderReview(): BusinessApplication[] {
  return getApplicationsByStatus('under_review')
}

export function getApprovedApplications(): BusinessApplication[] {
  return getApplicationsByStatus('approved')
}

export function getRejectedApplications(): BusinessApplication[] {
  return getApplicationsByStatus('rejected')
}

export function getApplicationsNeedingInfo(): BusinessApplication[] {
  return getApplicationsByStatus('more_info_needed')
}

export function getApplicationById(id: string): BusinessApplication | undefined {
  return MOCK_BUSINESS_APPLICATIONS.find(a => a.id === id)
}

export function getApplicationStats() {
  return {
    total: MOCK_BUSINESS_APPLICATIONS.length,
    pendingReview: getPendingApplications().length,
    underReview: getApplicationsUnderReview().length,
    approved: getApprovedApplications().length,
    rejected: getRejectedApplications().length,
    moreInfoNeeded: getApplicationsNeedingInfo().length,
    approvalRate: (getApprovedApplications().length / MOCK_BUSINESS_APPLICATIONS.length) * 100,
  }
}

// Suspended Businesses Helpers
export function getSuspendedByReason(reason: SuspensionReason): SuspendedBusiness[] {
  return MOCK_SUSPENDED_BUSINESSES.filter(s => s.reason === reason)
}

export function getReactivatableSuspended(): SuspendedBusiness[] {
  return MOCK_SUSPENDED_BUSINESSES.filter(s => s.canReactivate)
}

export function getSuspendedBusinessById(id: string): SuspendedBusiness | undefined {
  return MOCK_SUSPENDED_BUSINESSES.find(s => s.id === id)
}

// Terminated Businesses Helpers
export function getTerminatedByReason(reason: TerminationReason): TerminatedBusiness[] {
  return MOCK_TERMINATED_BUSINESSES.filter(t => t.reason === reason)
}

export function getTerminatedWithBalance(): TerminatedBusiness[] {
  return MOCK_TERMINATED_BUSINESSES.filter(t => !t.balanceSettled)
}

export function getTerminatedBusinessById(id: string): TerminatedBusiness | undefined {
  return MOCK_TERMINATED_BUSINESSES.find(t => t.id === id)
}

// General Stats Helpers
export function getPlatformOverview() {
  return {
    totalBusinesses: 1547,
    activeBusinesses: 1245,
    suspendedBusinesses: MOCK_SUSPENDED_BUSINESSES.length,
    terminatedBusinesses: MOCK_TERMINATED_BUSINESSES.length,
    pendingApplications: getPendingApplications().length,
    activeLeads: MOCK_BUSINESS_LEADS.filter(l => !['won', 'lost'].includes(l.stage)).length,
    activeAlerts: getActiveAlerts().length,
    criticalAlerts: getCriticalAlerts().length,
    totalRevenue: MOCK_PLATFORM_METRICS.find(m => m.id === 'metric_001')?.value || 0,
    monthlyRecurringRevenue: MOCK_PLATFORM_METRICS.find(m => m.id === 'metric_003')?.value || 0,
  }
}

export function getComplianceOverview() {
  return {
    kybApprovalRate: MOCK_PLATFORM_METRICS.find(m => m.id === 'metric_025')?.value || 0,
    activeAMLAlerts: MOCK_PLATFORM_METRICS.find(m => m.id === 'metric_026')?.value || 0,
    averageKYBReviewTime: MOCK_PLATFORM_METRICS.find(m => m.id === 'metric_027')?.value || 0,
  }
}

// ============================================
// MOCK DATA - MESSAGES (200+)
// ============================================

export const MOCK_MESSAGES: Message[] = [
  // Inbox Messages (120)
  {
    id: 'msg_001',
    from: 'john.smith@techstartup.com',
    fromName: 'John Smith',
    to: ['admin@wiremi.com'],
    subject: 'Urgent: Payment Processing Issue',
    body: 'We are experiencing issues with payment processing. Several transactions are failing with error code 502. This is affecting our business operations. Please help urgently.',
    status: 'unread',
    priority: 'urgent',
    category: 'inbox',
    timestamp: '2024-01-26T14:30:00Z',
    tags: ['payments', 'technical', 'urgent'],
    relatedBusinessId: 'biz_001',
  },
  {
    id: 'msg_002',
    from: 'sarah.johnson@ecommerce.co',
    fromName: 'Sarah Johnson',
    to: ['admin@wiremi.com'],
    subject: 'KYB Document Upload Question',
    body: 'Hi, I am trying to upload our business registration documents for KYB verification. What file formats are accepted? Our documents are in PDF format.',
    status: 'read',
    priority: 'normal',
    category: 'inbox',
    timestamp: '2024-01-26T13:15:00Z',
    readAt: '2024-01-26T13:45:00Z',
    tags: ['kyb', 'compliance'],
    relatedBusinessId: 'biz_002',
  },
  {
    id: 'msg_003',
    from: 'michael.brown@retailcorp.com',
    fromName: 'Michael Brown',
    to: ['admin@wiremi.com'],
    subject: 'Request for Higher Transaction Limits',
    body: 'Our business is growing rapidly and we need to increase our daily transaction limits from $50,000 to $100,000. Can you please review our account?',
    status: 'read',
    priority: 'high',
    category: 'inbox',
    timestamp: '2024-01-26T12:00:00Z',
    readAt: '2024-01-26T12:30:00Z',
    tags: ['limits', 'account'],
    relatedBusinessId: 'biz_003',
  },
  {
    id: 'msg_004',
    from: 'emma.davis@fintech.io',
    fromName: 'Emma Davis',
    to: ['admin@wiremi.com'],
    subject: 'API Integration Support',
    body: 'We are integrating your API and getting authentication errors. Can someone from the technical team help us debug this?',
    status: 'unread',
    priority: 'high',
    category: 'inbox',
    timestamp: '2024-01-26T11:45:00Z',
    tags: ['api', 'technical', 'integration'],
    relatedBusinessId: 'biz_004',
  },
  {
    id: 'msg_005',
    from: 'david.wilson@logistics.com',
    fromName: 'David Wilson',
    to: ['admin@wiremi.com'],
    subject: 'Monthly Invoice Query',
    body: 'I received the invoice for January but the amount seems higher than usual. Can you provide a breakdown of the charges?',
    status: 'read',
    priority: 'normal',
    category: 'inbox',
    timestamp: '2024-01-26T10:30:00Z',
    readAt: '2024-01-26T11:00:00Z',
    tags: ['billing', 'invoice'],
    relatedBusinessId: 'biz_005',
  },
  // Adding 115 more inbox messages
  ...Array.from({ length: 115 }, (_, i) => ({
    id: `msg_${String(i + 6).padStart(3, '0')}`,
    from: `user${i}@business${i}.com`,
    fromName: `User ${i}`,
    to: ['admin@wiremi.com'],
    subject: [
      'Account Setup Assistance',
      'Transaction Dispute',
      'Feature Request',
      'Compliance Question',
      'Payment Reconciliation',
      'Webhook Configuration',
      'Report Generation Help',
      'Account Verification Status',
      'Integration Timeline',
      'Security Concern',
    ][i % 10],
    body: `This is message ${i + 6} regarding business operations and platform usage.`,
    status: (i % 3 === 0 ? 'unread' : 'read') as MessageStatus,
    priority: (['low', 'normal', 'high', 'urgent'] as MessagePriority[])[i % 4],
    category: 'inbox' as const,
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    readAt: i % 3 !== 0 ? new Date(Date.now() - i * 3600000 + 1800000).toISOString() : undefined,
    tags: [['support', 'general'], ['payments', 'dispute'], ['feature'], ['compliance']][i % 4],
    relatedBusinessId: `biz_${String(i + 1).padStart(3, '0')}`,
  })),
  // Sent Messages (50)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `msg_sent_${String(i + 1).padStart(3, '0')}`,
    from: 'admin@wiremi.com',
    fromName: 'Wiremi Admin',
    to: [`customer${i}@business.com`],
    toNames: [`Customer ${i}`],
    subject: [
      'Re: Your Support Request',
      'KYB Verification Update',
      'Account Limit Increase Approved',
      'Monthly Platform Update',
      'Security Alert',
    ][i % 5],
    body: `Response to your inquiry. Thank you for contacting Wiremi support.`,
    status: 'read' as const,
    priority: 'normal' as const,
    category: 'sent' as const,
    timestamp: new Date(Date.now() - i * 7200000).toISOString(),
    tags: [['response', 'support'], ['kyb'], ['limits'], ['updates'], ['security']][i % 5],
    relatedBusinessId: `biz_${String(i + 1).padStart(3, '0')}`,
  })),
  // Draft Messages (15)
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `msg_draft_${String(i + 1).padStart(3, '0')}`,
    from: 'admin@wiremi.com',
    fromName: 'Wiremi Admin',
    to: [`business${i}@company.com`],
    subject: [
      'Draft: Policy Update',
      'Draft: Feature Announcement',
      'Draft: Scheduled Maintenance',
      'Draft: Survey Request',
      'Draft: Partnership Opportunity',
    ][i % 5],
    body: `Draft message in progress...`,
    status: 'draft' as const,
    priority: 'normal' as const,
    category: 'draft' as const,
    timestamp: new Date(Date.now() - i * 86400000).toISOString(),
    tags: ['draft'],
  })),
  // Archived Messages (20)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `msg_arch_${String(i + 1).padStart(3, '0')}`,
    from: `archived${i}@business.com`,
    fromName: `Archived User ${i}`,
    to: ['admin@wiremi.com'],
    subject: 'Archived Conversation',
    body: `This is an archived message from previous communications.`,
    status: 'archived' as const,
    priority: 'low' as const,
    category: 'archived' as const,
    timestamp: new Date(Date.now() - (i + 30) * 86400000).toISOString(),
    readAt: new Date(Date.now() - (i + 30) * 86400000 + 3600000).toISOString(),
    tags: ['archived'],
    relatedBusinessId: `biz_${String(i + 100).padStart(3, '0')}`,
  })),
]

// ============================================
// MOCK DATA - BROADCAST CAMPAIGNS (15+)
// ============================================

export const MOCK_BROADCAST_CAMPAIGNS: BroadcastCampaign[] = [
  {
    id: 'camp_001',
    name: 'Q1 2024 Platform Updates',
    subject: 'Exciting New Features Coming to Wiremi',
    content: 'We are excited to announce new features including multi-currency support, enhanced analytics, and improved API performance.',
    status: 'sent',
    targetAudience: {
      type: 'all',
      recipientCount: 1245,
    },
    scheduledDate: '2024-01-15T09:00:00Z',
    sentDate: '2024-01-15T09:00:00Z',
    createdBy: 'Admin Team',
    createdDate: '2024-01-10T10:00:00Z',
    deliveryStats: {
      sent: 1245,
      delivered: 1230,
      bounced: 15,
      opened: 892,
      clicked: 234,
      unsubscribed: 3,
    },
  },
  {
    id: 'camp_002',
    name: 'KYB Verification Reminder',
    subject: 'Action Required: Complete Your KYB Verification',
    content: 'Your KYB verification is pending. Please upload the required documents to continue using our platform.',
    status: 'sent',
    targetAudience: {
      type: 'segment',
      criteria: { status: 'kyb_pending' },
      recipientCount: 47,
    },
    scheduledDate: '2024-01-20T10:00:00Z',
    sentDate: '2024-01-20T10:00:00Z',
    createdBy: 'Compliance Team',
    createdDate: '2024-01-18T14:00:00Z',
    deliveryStats: {
      sent: 47,
      delivered: 47,
      bounced: 0,
      opened: 41,
      clicked: 28,
      unsubscribed: 0,
    },
  },
  {
    id: 'camp_003',
    name: 'February Payment Processing Update',
    subject: 'Important: Payment Processing Schedule for February',
    content: 'Please note the payment processing schedule changes for the upcoming holiday period.',
    status: 'scheduled',
    targetAudience: {
      type: 'segment',
      criteria: { status: 'active', hasPayments: true },
      recipientCount: 892,
    },
    scheduledDate: '2024-02-01T08:00:00Z',
    createdBy: 'Operations Team',
    createdDate: '2024-01-25T11:00:00Z',
  },
  {
    id: 'camp_004',
    name: 'Security Enhancement Announcement',
    subject: 'Enhanced Security Features Now Available',
    content: 'We have implemented additional security measures including 2FA and enhanced encryption.',
    status: 'sent',
    targetAudience: {
      type: 'all',
      recipientCount: 1245,
    },
    scheduledDate: '2024-01-10T09:00:00Z',
    sentDate: '2024-01-10T09:00:00Z',
    createdBy: 'Security Team',
    createdDate: '2024-01-05T10:00:00Z',
    deliveryStats: {
      sent: 1245,
      delivered: 1238,
      bounced: 7,
      opened: 1015,
      clicked: 456,
      unsubscribed: 2,
    },
  },
  {
    id: 'camp_005',
    name: 'Customer Success Survey',
    subject: 'Help Us Improve: Share Your Feedback',
    content: 'We value your opinion. Please take 2 minutes to complete our customer satisfaction survey.',
    status: 'sent',
    targetAudience: {
      type: 'segment',
      criteria: { status: 'active', accountAge: '90days+' },
      recipientCount: 678,
    },
    scheduledDate: '2024-01-18T10:00:00Z',
    sentDate: '2024-01-18T10:00:00Z',
    createdBy: 'Customer Success',
    createdDate: '2024-01-15T14:00:00Z',
    deliveryStats: {
      sent: 678,
      delivered: 673,
      bounced: 5,
      opened: 412,
      clicked: 178,
      unsubscribed: 4,
    },
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `camp_${String(i + 6).padStart(3, '0')}`,
    name: [
      'API Documentation Update',
      'Pricing Plan Changes',
      'Holiday Schedule Notice',
      'New Partnership Announcement',
      'Compliance Update Required',
      'Feature Deprecation Notice',
      'Service Upgrade Available',
      'Quarterly Business Review',
      'Training Webinar Invitation',
      'Platform Maintenance Schedule',
    ][i],
    subject: `Campaign ${i + 6} Subject Line`,
    content: `Campaign content for broadcast ${i + 6}`,
    status: (['draft', 'scheduled', 'sent'] as CampaignStatus[])[i % 3],
    targetAudience: {
      type: (['all', 'segment', 'custom'] as const)[i % 3],
      recipientCount: 100 + i * 50,
    },
    scheduledDate: i % 3 !== 0 ? new Date(Date.now() + i * 86400000).toISOString() : undefined,
    sentDate: i % 3 === 0 ? new Date(Date.now() - i * 86400000).toISOString() : undefined,
    createdBy: 'Admin Team',
    createdDate: new Date(Date.now() - (i + 5) * 86400000).toISOString(),
    deliveryStats: i % 3 === 0 ? {
      sent: 100 + i * 50,
      delivered: 98 + i * 48,
      bounced: 2 + i,
      opened: 70 + i * 30,
      clicked: 20 + i * 10,
      unsubscribed: Math.floor(i / 2),
    } : undefined,
  })),
]

// ============================================
// MOCK DATA - MESSAGE TEMPLATES (30+)
// ============================================

export const MOCK_MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 'tmpl_001',
    name: 'Welcome Email',
    category: 'onboarding',
    subject: 'Welcome to Wiremi - {{business_name}}',
    body: 'Dear {{contact_name}},\n\nWelcome to Wiremi! We are excited to have you on board. Your account has been created successfully.\n\nNext steps:\n1. Complete your KYB verification\n2. Set up your payment methods\n3. Explore our API documentation\n\nIf you have any questions, feel free to reach out.\n\nBest regards,\nThe Wiremi Team',
    variables: ['business_name', 'contact_name'],
    usageCount: 245,
    lastUsed: '2024-01-26T10:00:00Z',
    createdDate: '2023-06-01T10:00:00Z',
    createdBy: 'Admin Team',
    isActive: true,
  },
  {
    id: 'tmpl_002',
    name: 'KYB Documents Required',
    category: 'compliance',
    subject: 'Action Required: KYB Verification Documents',
    body: 'Dear {{contact_name}},\n\nTo complete your KYB verification, please upload the following documents:\n\n{{required_documents}}\n\nYou can upload these documents through your account dashboard.\n\nVerification typically takes 2-3 business days.\n\nBest regards,\nCompliance Team',
    variables: ['contact_name', 'required_documents'],
    usageCount: 187,
    lastUsed: '2024-01-25T14:30:00Z',
    createdDate: '2023-06-01T10:00:00Z',
    createdBy: 'Compliance Team',
    isActive: true,
  },
  {
    id: 'tmpl_003',
    name: 'KYB Approved',
    category: 'compliance',
    subject: 'Congratulations! Your KYB Verification is Complete',
    body: 'Dear {{contact_name}},\n\nGreat news! Your KYB verification has been approved.\n\nYou can now:\n- Process payments\n- Access full API features\n- Increase your transaction limits\n\nThank you for choosing Wiremi.\n\nBest regards,\nThe Wiremi Team',
    variables: ['contact_name'],
    usageCount: 156,
    lastUsed: '2024-01-26T09:15:00Z',
    createdDate: '2023-06-01T10:00:00Z',
    createdBy: 'Compliance Team',
    isActive: true,
  },
  {
    id: 'tmpl_004',
    name: 'Payment Failed',
    category: 'billing',
    subject: 'Payment Failed - {{invoice_number}}',
    body: 'Dear {{contact_name}},\n\nWe were unable to process your payment for invoice {{invoice_number}}.\n\nAmount: {{amount}}\nReason: {{failure_reason}}\n\nPlease update your payment method to avoid service interruption.\n\nBest regards,\nBilling Team',
    variables: ['contact_name', 'invoice_number', 'amount', 'failure_reason'],
    usageCount: 89,
    lastUsed: '2024-01-24T11:20:00Z',
    createdDate: '2023-06-01T10:00:00Z',
    createdBy: 'Finance Team',
    isActive: true,
  },
  {
    id: 'tmpl_005',
    name: 'Monthly Invoice',
    category: 'billing',
    subject: 'Your Wiremi Invoice for {{month}}',
    body: 'Dear {{contact_name}},\n\nYour invoice for {{month}} is ready.\n\nInvoice Number: {{invoice_number}}\nAmount Due: {{amount}}\nDue Date: {{due_date}}\n\nView your invoice: {{invoice_link}}\n\nPayment will be automatically processed on {{due_date}}.\n\nBest regards,\nBilling Team',
    variables: ['contact_name', 'month', 'invoice_number', 'amount', 'due_date', 'invoice_link'],
    usageCount: 1245,
    lastUsed: '2024-01-26T08:00:00Z',
    createdDate: '2023-06-01T10:00:00Z',
    createdBy: 'Finance Team',
    isActive: true,
  },
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `tmpl_${String(i + 6).padStart(3, '0')}`,
    name: [
      'Password Reset',
      'Transaction Dispute Opened',
      'Transaction Dispute Resolved',
      'API Key Generated',
      'Webhook Failed',
      'Account Suspended',
      'Account Reactivated',
      'Limit Increase Approved',
      'Limit Increase Denied',
      'Security Alert',
      'Two-Factor Authentication Enabled',
      'Payout Processed',
      'Payout Failed',
      'Feature Update Notification',
      'Maintenance Scheduled',
      'Maintenance Completed',
      'Support Ticket Created',
      'Support Ticket Resolved',
      'Annual Review',
      'Contract Renewal',
      'Partnership Opportunity',
      'Feedback Request',
      'Referral Program',
      'Training Session Invite',
      'Compliance Update Required',
    ][i],
    category: (['onboarding', 'compliance', 'billing', 'notification', 'marketing', 'support'] as TemplateCategory[])[i % 6],
    subject: `Template Subject ${i + 6}`,
    body: `Template body for ${i + 6} with variables {{var1}} and {{var2}}`,
    variables: ['contact_name', 'business_name', `var${i}`],
    usageCount: Math.floor(Math.random() * 500),
    lastUsed: i % 2 === 0 ? new Date(Date.now() - i * 86400000).toISOString() : undefined,
    createdDate: new Date(Date.now() - (i + 180) * 86400000).toISOString(),
    createdBy: ['Admin Team', 'Compliance Team', 'Support Team'][i % 3],
    isActive: i % 7 !== 0,
  })),
]

// ============================================
// MOCK DATA - SCHEDULED MESSAGES (25+)
// ============================================

export const MOCK_SCHEDULED_MESSAGES: ScheduledMessage[] = [
  {
    id: 'sched_001',
    templateId: 'tmpl_005',
    to: ['all_active_businesses'],
    subject: 'Your Wiremi Invoice for February 2024',
    body: 'Monthly invoice details...',
    scheduledDate: '2024-02-01T08:00:00Z',
    status: 'pending',
    createdBy: 'Finance Team',
  },
  {
    id: 'sched_002',
    templateId: 'tmpl_001',
    to: ['new_signups_batch_15'],
    subject: 'Welcome to Wiremi',
    body: 'Welcome email content...',
    scheduledDate: '2024-01-27T09:00:00Z',
    status: 'pending',
    createdBy: 'Admin Team',
  },
  {
    id: 'sched_003',
    to: ['kyb_pending_7days'],
    subject: 'Reminder: Complete Your KYB Verification',
    body: 'Your KYB verification has been pending for 7 days...',
    scheduledDate: '2024-01-27T10:00:00Z',
    status: 'pending',
    createdBy: 'Compliance Team',
  },
  {
    id: 'sched_004',
    templateId: 'tmpl_015',
    to: ['maintenance_affected_users'],
    subject: 'Scheduled Maintenance Tonight',
    body: 'We will be performing scheduled maintenance...',
    scheduledDate: '2024-01-26T20:00:00Z',
    status: 'sent',
    createdBy: 'Operations Team',
    sentAt: '2024-01-26T20:00:00Z',
  },
  {
    id: 'sched_005',
    to: ['overdue_invoices'],
    subject: 'Payment Reminder: Invoice Overdue',
    body: 'Your invoice payment is overdue...',
    scheduledDate: '2024-01-26T09:00:00Z',
    status: 'sent',
    createdBy: 'Finance Team',
    sentAt: '2024-01-26T09:00:00Z',
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `sched_${String(i + 6).padStart(3, '0')}`,
    templateId: i % 3 === 0 ? `tmpl_${String((i % 10) + 1).padStart(3, '0')}` : undefined,
    to: [`segment_${i}`],
    subject: [
      'Feature Update Notification',
      'Security Advisory',
      'Payment Processing Update',
      'API Deprecation Notice',
      'Platform Enhancement',
      'Compliance Reminder',
      'Survey Request',
      'Event Invitation',
      'Partnership News',
      'Training Available',
    ][i % 10],
    body: `Scheduled message content ${i + 6}`,
    scheduledDate: new Date(Date.now() + (i - 10) * 86400000).toISOString(),
    status: (i < 10 ? 'sent' : i < 18 ? 'pending' : i === 18 ? 'failed' : 'cancelled') as 'pending' | 'sent' | 'failed' | 'cancelled',
    createdBy: ['Admin Team', 'Compliance Team', 'Support Team', 'Finance Team'][i % 4],
    sentAt: i < 10 ? new Date(Date.now() - (10 - i) * 86400000).toISOString() : undefined,
    failureReason: i === 18 ? 'SMTP server error' : undefined,
  })),
]

// ============================================
// MOCK DATA - DELIVERY REPORTS (50+)
// ============================================

export const MOCK_DELIVERY_REPORTS: MessageDeliveryReport[] = [
  {
    id: 'report_001',
    campaignId: 'camp_001',
    date: '2024-01-15',
    totalSent: 1245,
    delivered: 1230,
    bounced: 15,
    bouncedEmails: [
      { email: 'invalid1@domain.com', reason: 'Invalid email address' },
      { email: 'user2@expired.com', reason: 'Domain not found' },
      { email: 'bounce3@test.com', reason: 'Mailbox full' },
    ],
    failureRate: 1.2,
    averageDeliveryTime: 2.3,
  },
  {
    id: 'report_002',
    campaignId: 'camp_002',
    date: '2024-01-20',
    totalSent: 47,
    delivered: 47,
    bounced: 0,
    failureRate: 0,
    averageDeliveryTime: 1.8,
  },
  {
    id: 'report_003',
    campaignId: 'camp_004',
    date: '2024-01-10',
    totalSent: 1245,
    delivered: 1238,
    bounced: 7,
    bouncedEmails: [
      { email: 'old1@business.com', reason: 'User unknown' },
      { email: 'test2@company.org', reason: 'Mailbox disabled' },
    ],
    failureRate: 0.6,
    averageDeliveryTime: 2.1,
  },
  {
    id: 'report_004',
    messageId: 'msg_001',
    date: '2024-01-26',
    totalSent: 1,
    delivered: 1,
    bounced: 0,
    failureRate: 0,
    averageDeliveryTime: 0.5,
  },
  {
    id: 'report_005',
    campaignId: 'camp_005',
    date: '2024-01-18',
    totalSent: 678,
    delivered: 673,
    bounced: 5,
    bouncedEmails: [
      { email: 'bounce1@test.com', reason: 'Temporary failure' },
      { email: 'user2@invalid.org', reason: 'Domain blocked' },
    ],
    failureRate: 0.7,
    averageDeliveryTime: 1.9,
  },
  ...Array.from({ length: 45 }, (_, i) => ({
    id: `report_${String(i + 6).padStart(3, '0')}`,
    campaignId: i % 2 === 0 ? `camp_${String((i % 5) + 1).padStart(3, '0')}` : undefined,
    messageId: i % 2 !== 0 ? `msg_${String(i).padStart(3, '0')}` : undefined,
    date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
    totalSent: 50 + i * 20,
    delivered: 48 + i * 19,
    bounced: Math.floor(Math.random() * 10),
    bouncedEmails: Array.from({ length: Math.min(3, Math.floor(Math.random() * 10)) }, (_, j) => ({
      email: `bounce${j}@test${i}.com`,
      reason: ['Invalid email', 'Mailbox full', 'Domain not found', 'User unknown'][j % 4],
    })),
    failureRate: Math.random() * 5,
    averageDeliveryTime: 1 + Math.random() * 3,
  })),
]

// Helper functions for communications
export function getMessageStats() {
  return {
    total: MOCK_MESSAGES.length,
    unread: MOCK_MESSAGES.filter(m => m.status === 'unread').length,
    inbox: MOCK_MESSAGES.filter(m => m.category === 'inbox').length,
    sent: MOCK_MESSAGES.filter(m => m.category === 'sent').length,
    drafts: MOCK_MESSAGES.filter(m => m.category === 'draft').length,
    archived: MOCK_MESSAGES.filter(m => m.category === 'archived').length,
  }
}

export function getCampaignStats() {
  return {
    total: MOCK_BROADCAST_CAMPAIGNS.length,
    sent: MOCK_BROADCAST_CAMPAIGNS.filter(c => c.status === 'sent').length,
    scheduled: MOCK_BROADCAST_CAMPAIGNS.filter(c => c.status === 'scheduled').length,
    draft: MOCK_BROADCAST_CAMPAIGNS.filter(c => c.status === 'draft').length,
    totalRecipients: MOCK_BROADCAST_CAMPAIGNS.reduce((sum, c) => sum + c.targetAudience.recipientCount, 0),
  }
}

export function getTemplateStats() {
  return {
    total: MOCK_MESSAGE_TEMPLATES.length,
    active: MOCK_MESSAGE_TEMPLATES.filter(t => t.isActive).length,
    byCategory: {
      onboarding: MOCK_MESSAGE_TEMPLATES.filter(t => t.category === 'onboarding').length,
      compliance: MOCK_MESSAGE_TEMPLATES.filter(t => t.category === 'compliance').length,
      billing: MOCK_MESSAGE_TEMPLATES.filter(t => t.category === 'billing').length,
      notification: MOCK_MESSAGE_TEMPLATES.filter(t => t.category === 'notification').length,
      marketing: MOCK_MESSAGE_TEMPLATES.filter(t => t.category === 'marketing').length,
      support: MOCK_MESSAGE_TEMPLATES.filter(t => t.category === 'support').length,
    },
    totalUsage: MOCK_MESSAGE_TEMPLATES.reduce((sum, t) => sum + t.usageCount, 0),
  }
}

export function getScheduledStats() {
  return {
    total: MOCK_SCHEDULED_MESSAGES.length,
    pending: MOCK_SCHEDULED_MESSAGES.filter(s => s.status === 'pending').length,
    sent: MOCK_SCHEDULED_MESSAGES.filter(s => s.status === 'sent').length,
    failed: MOCK_SCHEDULED_MESSAGES.filter(s => s.status === 'failed').length,
    cancelled: MOCK_SCHEDULED_MESSAGES.filter(s => s.status === 'cancelled').length,
  }
}

export function getDeliveryStats() {
  const totalSent = MOCK_DELIVERY_REPORTS.reduce((sum, r) => sum + r.totalSent, 0)
  const totalDelivered = MOCK_DELIVERY_REPORTS.reduce((sum, r) => sum + r.delivered, 0)
  const totalBounced = MOCK_DELIVERY_REPORTS.reduce((sum, r) => sum + r.bounced, 0)

  return {
    total: MOCK_DELIVERY_REPORTS.length,
    totalSent,
    totalDelivered,
    totalBounced,
    averageDeliveryRate: totalSent > 0 ? (totalDelivered / totalSent) * 100 : 0,
    averageBounceRate: totalSent > 0 ? (totalBounced / totalSent) * 100 : 0,
  }
}

// Export all data for convenience
export const ADMIN_COMPLETE_DATA = {
  metrics: MOCK_PLATFORM_METRICS,
  alerts: MOCK_SYSTEM_ALERTS,
  leads: MOCK_BUSINESS_LEADS,
  applications: MOCK_BUSINESS_APPLICATIONS,
  suspended: MOCK_SUSPENDED_BUSINESSES,
  terminated: MOCK_TERMINATED_BUSINESSES,
  messages: MOCK_MESSAGES,
  campaigns: MOCK_BROADCAST_CAMPAIGNS,
  templates: MOCK_MESSAGE_TEMPLATES,
  scheduled: MOCK_SCHEDULED_MESSAGES,
  deliveryReports: MOCK_DELIVERY_REPORTS,
}
