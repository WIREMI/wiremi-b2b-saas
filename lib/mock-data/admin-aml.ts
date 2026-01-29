export type AMLAlertType =
  | 'large_transaction'
  | 'rapid_movement'
  | 'structuring'
  | 'unusual_pattern'
  | 'high_risk_country'
  | 'sanctioned_entity'
  | 'suspicious_behavior'
  | 'velocity_breach'

export type AMLAlertSeverity = 'low' | 'medium' | 'high' | 'critical'
export type AMLAlertStatus = 'open' | 'under_investigation' | 'escalated' | 'resolved' | 'false_positive'

export interface AMLAlert {
  id: string
  alertType: AMLAlertType
  severity: AMLAlertSeverity
  status: AMLAlertStatus
  businessId: string
  businessName: string
  triggeredDate: string
  assignedTo?: string
  resolvedDate?: string
  resolvedBy?: string

  // Alert Details
  description: string
  triggerDetails: {
    metric: string
    threshold: number
    actual: number
    currency?: string
  }

  // Transaction Details
  transactionCount?: number
  totalAmount?: number
  currency?: string
  timeframe?: string
  involvedCountries?: string[]

  // Risk Factors
  riskScore: number
  riskFactors: string[]

  // Investigation
  investigationNotes: {
    id: string
    date: string
    author: string
    note: string
    action?: string
  }[]

  // Related Entities
  relatedAlerts?: string[]
  relatedTransactions?: string[]

  // Actions Taken
  actionsTaken?: {
    action: string
    date: string
    performedBy: string
  }[]

  // Resolution
  resolution?: string
  sarFiled?: boolean
  sarNumber?: string
  reportedToAuthorities?: boolean
}

export const MOCK_AML_ALERTS: AMLAlert[] = [
  {
    id: 'aml_alert_001',
    alertType: 'large_transaction',
    severity: 'high',
    status: 'under_investigation',
    businessId: 'biz_008',
    businessName: 'Crypto Exchange Ltd',
    triggeredDate: '2024-01-26T14:30:00Z',
    assignedTo: 'Michael Chen',

    description: 'Single transaction exceeds $500,000 threshold',
    triggerDetails: {
      metric: 'Single Transaction Amount',
      threshold: 500000,
      actual: 750000,
      currency: 'USD',
    },

    transactionCount: 1,
    totalAmount: 750000,
    currency: 'USD',
    timeframe: '1 hour',
    involvedCountries: ['MT', 'CY'],

    riskScore: 72,
    riskFactors: [
      'large_single_transaction',
      'crypto_business',
      'offshore_jurisdiction',
      'new_customer_relationship',
    ],

    investigationNotes: [
      {
        id: 'note_001',
        date: '2024-01-26T15:00:00Z',
        author: 'Michael Chen',
        note: 'Large crypto exchange transaction detected. Customer explanation requested.',
        action: 'Requested supporting documentation',
      },
      {
        id: 'note_002',
        date: '2024-01-26T16:30:00Z',
        author: 'Michael Chen',
        note: 'Customer provided invoice for legitimate institutional trade. Reviewing documentation.',
      },
    ],

    relatedAlerts: [],
    relatedTransactions: ['txn_12345', 'txn_12346'],
  },

  {
    id: 'aml_alert_002',
    alertType: 'rapid_movement',
    severity: 'critical',
    status: 'escalated',
    businessId: 'biz_009',
    businessName: 'Quick Transfer Services',
    triggeredDate: '2024-01-25T09:15:00Z',
    assignedTo: 'Sarah Johnson',

    description: 'Funds moved through multiple accounts in rapid succession',
    triggerDetails: {
      metric: 'Account Velocity',
      threshold: 5,
      actual: 12,
    },

    transactionCount: 12,
    totalAmount: 250000,
    currency: 'USD',
    timeframe: '2 hours',
    involvedCountries: ['US', 'PA', 'KY', 'BZ'],

    riskScore: 89,
    riskFactors: [
      'rapid_fund_movement',
      'multiple_jurisdictions',
      'layering_pattern',
      'high_risk_countries',
      'shell_company_indicators',
    ],

    investigationNotes: [
      {
        id: 'note_003',
        date: '2024-01-25T10:00:00Z',
        author: 'Sarah Johnson',
        note: 'Classic layering pattern detected. Funds moved through 12 accounts across 4 jurisdictions in 2 hours.',
        action: 'Escalated to compliance manager',
      },
      {
        id: 'note_004',
        date: '2024-01-25T11:30:00Z',
        author: 'Sarah Johnson',
        note: 'Account frozen pending investigation. Preparing SAR filing.',
        action: 'Froze account',
      },
      {
        id: 'note_005',
        date: '2024-01-25T14:00:00Z',
        author: 'Michael Chen',
        note: 'SAR filed with FinCEN. Case escalated to law enforcement.',
        action: 'Filed SAR',
      },
    ],

    relatedAlerts: ['aml_alert_015', 'aml_alert_018'],
    relatedTransactions: ['txn_20001', 'txn_20002', 'txn_20003', 'txn_20004', 'txn_20005'],

    actionsTaken: [
      {
        action: 'Account Frozen',
        date: '2024-01-25T11:30:00Z',
        performedBy: 'Sarah Johnson',
      },
      {
        action: 'SAR Filed',
        date: '2024-01-25T14:00:00Z',
        performedBy: 'Michael Chen',
      },
    ],

    sarFiled: true,
    sarNumber: 'SAR-2024-001234',
    reportedToAuthorities: true,
  },

  {
    id: 'aml_alert_003',
    alertType: 'structuring',
    severity: 'high',
    status: 'open',
    businessId: 'biz_010',
    businessName: 'Cash Services Inc',
    triggeredDate: '2024-01-27T08:00:00Z',

    description: 'Multiple transactions just below reporting threshold',
    triggerDetails: {
      metric: 'Transaction Structuring',
      threshold: 10000,
      actual: 9950,
      currency: 'USD',
    },

    transactionCount: 8,
    totalAmount: 79600,
    currency: 'USD',
    timeframe: '48 hours',
    involvedCountries: ['US'],

    riskScore: 78,
    riskFactors: [
      'structuring_pattern',
      'just_below_threshold',
      'frequent_transactions',
      'cash_intensive_business',
    ],

    investigationNotes: [],

    relatedAlerts: [],
    relatedTransactions: ['txn_30001', 'txn_30002', 'txn_30003', 'txn_30004'],
  },

  {
    id: 'aml_alert_004',
    alertType: 'unusual_pattern',
    severity: 'medium',
    status: 'false_positive',
    businessId: 'biz_006',
    businessName: 'EduTech Solutions',
    triggeredDate: '2024-01-20T10:00:00Z',
    assignedTo: 'Sarah Johnson',
    resolvedDate: '2024-01-22T16:00:00Z',
    resolvedBy: 'Sarah Johnson',

    description: 'Transaction pattern deviates from historical behavior',
    triggerDetails: {
      metric: 'Deviation from Baseline',
      threshold: 200,
      actual: 350,
    },

    transactionCount: 45,
    totalAmount: 125000,
    currency: 'USD',
    timeframe: '1 week',
    involvedCountries: ['US', 'CA'],

    riskScore: 42,
    riskFactors: [
      'pattern_deviation',
      'volume_increase',
      'new_transaction_types',
    ],

    investigationNotes: [
      {
        id: 'note_006',
        date: '2024-01-21T09:00:00Z',
        author: 'Sarah Johnson',
        note: 'Contacted customer regarding unusual activity spike.',
        action: 'Requested explanation',
      },
      {
        id: 'note_007',
        date: '2024-01-21T14:00:00Z',
        author: 'Sarah Johnson',
        note: 'Customer explained they launched new online course program with payment plans. Provided marketing materials and enrollment data.',
      },
      {
        id: 'note_008',
        date: '2024-01-22T16:00:00Z',
        author: 'Sarah Johnson',
        note: 'Reviewed documentation. Activity consistent with legitimate business expansion. Closing as false positive.',
        action: 'Closed alert',
      },
    ],

    relatedAlerts: [],
    relatedTransactions: [],

    resolution: 'False positive. Activity consistent with documented business expansion.',
  },

  {
    id: 'aml_alert_005',
    alertType: 'high_risk_country',
    severity: 'high',
    status: 'under_investigation',
    businessId: 'biz_011',
    businessName: 'International Remittance Co',
    triggeredDate: '2024-01-26T12:00:00Z',
    assignedTo: 'Michael Chen',

    description: 'Multiple transactions to/from high-risk jurisdictions',
    triggerDetails: {
      metric: 'High Risk Country Transactions',
      threshold: 5,
      actual: 15,
    },

    transactionCount: 15,
    totalAmount: 340000,
    currency: 'USD',
    timeframe: '1 week',
    involvedCountries: ['US', 'IR', 'SY', 'KP'],

    riskScore: 85,
    riskFactors: [
      'sanctioned_countries',
      'high_risk_jurisdictions',
      'potential_sanctions_violation',
      'complex_routing',
    ],

    investigationNotes: [
      {
        id: 'note_009',
        date: '2024-01-26T13:00:00Z',
        author: 'Michael Chen',
        note: 'Multiple transactions involving sanctioned countries detected. Conducting enhanced due diligence.',
        action: 'Initiated EDD',
      },
    ],

    relatedAlerts: [],
    relatedTransactions: ['txn_40001', 'txn_40002'],
  },
]

// Generate more alerts for pagination
function generateAdditionalAlerts(): AMLAlert[] {
  const types: AMLAlertType[] = ['large_transaction', 'rapid_movement', 'structuring', 'unusual_pattern', 'velocity_breach', 'suspicious_behavior']
  const severities: AMLAlertSeverity[] = ['low', 'medium', 'high', 'critical']
  const statuses: AMLAlertStatus[] = ['open', 'under_investigation', 'escalated', 'resolved', 'false_positive']

  const businessNames = [
    'Tech Startup Inc', 'Global Logistics', 'Finance Hub', 'Retail Chain Corp',
    'Healthcare Services', 'Manufacturing Ltd', 'Consulting Group', 'Trading Partners',
    'Software Solutions', 'Property Management', 'Education Platform', 'Food Services',
    'Transportation Co', 'Marketing Agency', 'Legal Services', 'Construction Inc',
  ]

  const alerts: AMLAlert[] = []

  for (let i = 6; i <= 25; i++) {
    const alertType = types[i % types.length]
    const severity = severities[i % severities.length]
    const status = statuses[i % statuses.length]
    const isResolved = status === 'resolved' || status === 'false_positive'

    alerts.push({
      id: `aml_alert_${String(i).padStart(3, '0')}`,
      alertType,
      severity,
      status,
      businessId: `biz_${String(i + 20).padStart(3, '0')}`,
      businessName: businessNames[i % businessNames.length],
      triggeredDate: new Date(2024, 0, i).toISOString(),
      assignedTo: isResolved || i % 3 === 0 ? ['Sarah Johnson', 'Michael Chen'][i % 2] : undefined,
      resolvedDate: isResolved ? new Date(2024, 0, i + 2).toISOString() : undefined,
      resolvedBy: isResolved ? ['Sarah Johnson', 'Michael Chen'][i % 2] : undefined,

      description: `AML alert triggered for ${alertType.replace('_', ' ')}`,
      triggerDetails: {
        metric: alertType,
        threshold: 100 + i * 10,
        actual: 150 + i * 15,
        currency: 'USD',
      },

      transactionCount: 1 + (i % 10),
      totalAmount: 50000 + (i * 10000),
      currency: 'USD',
      timeframe: i % 3 === 0 ? '1 hour' : i % 3 === 1 ? '24 hours' : '1 week',
      involvedCountries: ['US', 'GB', 'CA'][i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2] ? ['US'] : ['US', 'GB'],

      riskScore: 30 + (i % 60),
      riskFactors: [alertType],

      investigationNotes: isResolved ? [
        {
          id: `note_${i}_001`,
          date: new Date(2024, 0, i + 1).toISOString(),
          author: ['Sarah Johnson', 'Michael Chen'][i % 2],
          note: 'Investigation completed.',
          action: 'Closed alert',
        },
      ] : [],

      relatedAlerts: [],
      relatedTransactions: [],

      resolution: isResolved ? 'Alert resolved after investigation.' : undefined,
    })
  }

  return alerts
}

export const ALL_AML_ALERTS = [...MOCK_AML_ALERTS, ...generateAdditionalAlerts()]

// Helper Functions
export function getAMLAlertById(id: string): AMLAlert | undefined {
  return ALL_AML_ALERTS.find(a => a.id === id)
}

export function getAMLAlertStats() {
  const total = ALL_AML_ALERTS.length
  const open = ALL_AML_ALERTS.filter(a => a.status === 'open').length
  const underInvestigation = ALL_AML_ALERTS.filter(a => a.status === 'under_investigation').length
  const escalated = ALL_AML_ALERTS.filter(a => a.status === 'escalated').length
  const resolved = ALL_AML_ALERTS.filter(a => a.status === 'resolved').length
  const falsePositive = ALL_AML_ALERTS.filter(a => a.status === 'false_positive').length

  const critical = ALL_AML_ALERTS.filter(a => a.severity === 'critical').length
  const high = ALL_AML_ALERTS.filter(a => a.severity === 'high').length
  const medium = ALL_AML_ALERTS.filter(a => a.severity === 'medium').length
  const low = ALL_AML_ALERTS.filter(a => a.severity === 'low').length

  return {
    total,
    open,
    underInvestigation,
    escalated,
    resolved,
    falsePositive,
    critical,
    high,
    medium,
    low,
  }
}

export function getSeverityColor(severity: AMLAlertSeverity): 'error' | 'warning' | 'info' | 'default' {
  switch (severity) {
    case 'critical': return 'error'
    case 'high': return 'error'
    case 'medium': return 'warning'
    case 'low': return 'info'
  }
}

export function getStatusColor(status: AMLAlertStatus): 'error' | 'warning' | 'info' | 'success' | 'default' {
  switch (status) {
    case 'open': return 'warning'
    case 'under_investigation': return 'info'
    case 'escalated': return 'error'
    case 'resolved': return 'success'
    case 'false_positive': return 'default'
  }
}

export function getAlertTypeLabel(type: AMLAlertType): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}
