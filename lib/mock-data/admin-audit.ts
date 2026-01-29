export type AuditReportType =
  | 'kyb_review'
  | 'aml_investigation'
  | 'transaction_monitoring'
  | 'sanctions_screening'
  | 'compliance_review'
  | 'regulatory_filing'
  | 'risk_assessment'
  | 'user_activity'

export type AuditReportStatus = 'draft' | 'pending_review' | 'approved' | 'filed' | 'archived'

export interface AuditReport {
  id: string
  reportType: AuditReportType
  title: string
  description: string
  status: AuditReportStatus
  createdDate: string
  createdBy: string
  reviewedDate?: string
  reviewedBy?: string
  filedDate?: string
  period: {
    startDate: string
    endDate: string
  }

  // Report Metrics
  metrics: {
    totalReviews?: number
    approved?: number
    rejected?: number
    pending?: number
    flaggedItems?: number
    escalations?: number
    averageProcessingTime?: string
  }

  // Compliance Findings
  findings?: {
    id: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    category: string
    description: string
    recommendation: string
    status: 'open' | 'resolved'
  }[]

  // Referenced Entities
  businessesReviewed?: number
  transactionsReviewed?: number
  alertsGenerated?: number

  // Files
  attachments?: {
    name: string
    type: string
    size: number
    uploadedDate: string
  }[]

  // Regulatory Info
  regulatoryBody?: string
  filingReference?: string

  // Tags
  tags: string[]
}

export const MOCK_AUDIT_REPORTS: AuditReport[] = [
  {
    id: 'audit_001',
    reportType: 'kyb_review',
    title: 'Q1 2024 KYB Review Compliance Report',
    description: 'Quarterly review of all Know Your Business verification processes and outcomes',
    status: 'approved',
    createdDate: '2024-01-28',
    createdBy: 'Sarah Johnson',
    reviewedDate: '2024-01-30',
    reviewedBy: 'Michael Chen',
    period: {
      startDate: '2024-01-01',
      endDate: '2024-01-31',
    },

    metrics: {
      totalReviews: 56,
      approved: 48,
      rejected: 3,
      pending: 5,
      flaggedItems: 8,
      averageProcessingTime: '2.5 days',
    },

    findings: [
      {
        id: 'finding_001',
        severity: 'medium',
        category: 'Documentation',
        description: '12% of applications missing secondary proof of address',
        recommendation: 'Implement automated reminder system for incomplete applications',
        status: 'open',
      },
      {
        id: 'finding_002',
        severity: 'low',
        category: 'Processing Time',
        description: 'Average review time exceeded SLA by 0.5 days for high-risk jurisdictions',
        recommendation: 'Allocate additional resources for enhanced due diligence cases',
        status: 'resolved',
      },
    ],

    businessesReviewed: 56,
    tags: ['quarterly', 'kyb', 'compliance', 'q1-2024'],
  },

  {
    id: 'audit_002',
    reportType: 'aml_investigation',
    title: 'AML Suspicious Activity Review - January 2024',
    description: 'Analysis of AML alerts and investigations conducted in January',
    status: 'filed',
    createdDate: '2024-02-01',
    createdBy: 'Michael Chen',
    reviewedDate: '2024-02-03',
    reviewedBy: 'Sarah Johnson',
    filedDate: '2024-02-05',
    period: {
      startDate: '2024-01-01',
      endDate: '2024-01-31',
    },

    metrics: {
      totalReviews: 25,
      escalations: 3,
      flaggedItems: 25,
      averageProcessingTime: '4.2 days',
    },

    findings: [
      {
        id: 'finding_003',
        severity: 'high',
        category: 'Sanctions Screening',
        description: '2 confirmed sanctions matches requiring immediate action',
        recommendation: 'Accounts frozen and cases escalated to law enforcement',
        status: 'resolved',
      },
      {
        id: 'finding_004',
        severity: 'medium',
        category: 'Transaction Patterns',
        description: 'Increased structuring patterns detected in cash-intensive businesses',
        recommendation: 'Enhance monitoring rules for transactions near reporting thresholds',
        status: 'open',
      },
    ],

    alertsGenerated: 25,
    transactionsReviewed: 1247,
    regulatoryBody: 'FinCEN',
    filingReference: 'AML-2024-001',
    tags: ['aml', 'monthly', 'suspicious-activity', 'jan-2024'],
  },

  {
    id: 'audit_003',
    reportType: 'transaction_monitoring',
    title: 'High-Value Transaction Monitoring Report',
    description: 'Review of all transactions exceeding $100,000 threshold',
    status: 'pending_review',
    createdDate: '2024-01-26',
    createdBy: 'Sarah Johnson',
    period: {
      startDate: '2024-01-15',
      endDate: '2024-01-26',
    },

    metrics: {
      totalReviews: 148,
      flaggedItems: 12,
      escalations: 2,
      averageProcessingTime: '1.8 days',
    },

    transactionsReviewed: 148,
    businessesReviewed: 45,
    tags: ['transaction-monitoring', 'high-value', 'threshold-review'],
  },

  {
    id: 'audit_004',
    reportType: 'sanctions_screening',
    title: 'Quarterly Sanctions Screening Audit',
    description: 'Comprehensive review of sanctions screening processes and hits',
    status: 'draft',
    createdDate: '2024-01-28',
    createdBy: 'Michael Chen',
    period: {
      startDate: '2024-01-01',
      endDate: '2024-01-31',
    },

    metrics: {
      totalReviews: 108,
      flaggedItems: 15,
      escalations: 4,
    },

    findings: [
      {
        id: 'finding_005',
        severity: 'critical',
        category: 'Sanctions Compliance',
        description: '4 confirmed matches on OFAC SDN list',
        recommendation: 'Immediate account freeze and regulatory reporting required',
        status: 'open',
      },
      {
        id: 'finding_006',
        severity: 'medium',
        category: 'Screening Coverage',
        description: 'Weekly screening frequency may be insufficient for high-risk clients',
        recommendation: 'Implement real-time screening for flagged entities',
        status: 'open',
      },
    ],

    businessesReviewed: 108,
    tags: ['sanctions', 'screening', 'quarterly', 'ofac'],
  },

  {
    id: 'audit_005',
    reportType: 'regulatory_filing',
    title: 'SAR Filing Summary - Q1 2024',
    description: 'Summary of all Suspicious Activity Reports filed with FinCEN',
    status: 'filed',
    createdDate: '2024-02-05',
    createdBy: 'Sarah Johnson',
    reviewedDate: '2024-02-06',
    reviewedBy: 'Michael Chen',
    filedDate: '2024-02-07',
    period: {
      startDate: '2024-01-01',
      endDate: '2024-01-31',
    },

    metrics: {
      totalReviews: 3,
      escalations: 3,
    },

    findings: [
      {
        id: 'finding_007',
        severity: 'high',
        category: 'SAR Filing',
        description: '3 SARs filed for structuring and layering activities',
        recommendation: 'Continue enhanced monitoring of related entities',
        status: 'open',
      },
    ],

    regulatoryBody: 'FinCEN',
    filingReference: 'SAR-Q1-2024-SUMMARY',
    attachments: [
      {
        name: 'SAR_Summary_Q1_2024.pdf',
        type: 'application/pdf',
        size: 2458000,
        uploadedDate: '2024-02-05',
      },
    ],
    tags: ['sar', 'regulatory', 'fincen', 'q1-2024'],
  },
]

// Generate additional reports
function generateAdditionalReports(): AuditReport[] {
  const types: AuditReportType[] = ['kyb_review', 'aml_investigation', 'transaction_monitoring', 'risk_assessment', 'compliance_review']
  const statuses: AuditReportStatus[] = ['draft', 'pending_review', 'approved', 'filed', 'archived']

  const reports: AuditReport[] = []

  for (let i = 6; i <= 20; i++) {
    const reportType = types[i % types.length]
    const status = statuses[i % statuses.length]
    const createdDate = new Date(2024, 0, i)
    const isComplete = status === 'approved' || status === 'filed' || status === 'archived'

    reports.push({
      id: `audit_${String(i).padStart(3, '0')}`,
      reportType,
      title: `${reportType.replace('_', ' ')} Report ${i}`,
      description: `Automated audit report for ${reportType.replace('_', ' ')}`,
      status,
      createdDate: createdDate.toISOString().split('T')[0],
      createdBy: ['Sarah Johnson', 'Michael Chen'][i % 2],
      reviewedDate: isComplete ? new Date(2024, 0, i + 2).toISOString().split('T')[0] : undefined,
      reviewedBy: isComplete ? ['Michael Chen', 'Sarah Johnson'][i % 2] : undefined,
      period: {
        startDate: new Date(2024, 0, i - 7).toISOString().split('T')[0],
        endDate: new Date(2024, 0, i).toISOString().split('T')[0],
      },

      metrics: {
        totalReviews: 20 + (i * 5),
        flaggedItems: 2 + (i % 10),
        averageProcessingTime: `${1 + (i % 4)}.${i % 10} days`,
      },

      businessesReviewed: 10 + (i * 3),
      tags: [reportType, 'automated'],
    })
  }

  return reports
}

export const ALL_AUDIT_REPORTS = [...MOCK_AUDIT_REPORTS, ...generateAdditionalReports()]

// Helper Functions
export function getAuditReportById(id: string): AuditReport | undefined {
  return ALL_AUDIT_REPORTS.find(r => r.id === id)
}

export function getAuditReportStats() {
  const total = ALL_AUDIT_REPORTS.length
  const draft = ALL_AUDIT_REPORTS.filter(r => r.status === 'draft').length
  const pendingReview = ALL_AUDIT_REPORTS.filter(r => r.status === 'pending_review').length
  const approved = ALL_AUDIT_REPORTS.filter(r => r.status === 'approved').length
  const filed = ALL_AUDIT_REPORTS.filter(r => r.status === 'filed').length
  const archived = ALL_AUDIT_REPORTS.filter(r => r.status === 'archived').length

  const thisMonth = ALL_AUDIT_REPORTS.filter(r => {
    const created = new Date(r.createdDate)
    const now = new Date()
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
  }).length

  return { total, draft, pendingReview, approved, filed, archived, thisMonth }
}

export function getReportTypeLabel(type: AuditReportType): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

export function getStatusColor(status: AuditReportStatus): 'default' | 'info' | 'success' | 'warning' | 'error' {
  switch (status) {
    case 'draft': return 'default'
    case 'pending_review': return 'info'
    case 'approved': return 'success'
    case 'filed': return 'success'
    case 'archived': return 'warning'
  }
}
