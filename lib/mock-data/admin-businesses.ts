export type BusinessStatus =
  | 'lead'
  | 'application_submitted'
  | 'kyb_pending'
  | 'kyb_approved'
  | 'kyb_rejected'
  | 'kyb_conditional'
  | 'provisioning'
  | 'financial_core_active'
  | 'module_setup'
  | 'active'
  | 'suspended'
  | 'terminated'

export type BusinessType =
  | 'sole_proprietorship'
  | 'partnership'
  | 'llc'
  | 'corporation'
  | 'non_profit'

export type IndustryType =
  | 'fintech'
  | 'ecommerce'
  | 'saas'
  | 'hospitality'
  | 'education'
  | 'healthcare'
  | 'retail'
  | 'services'
  | 'manufacturing'
  | 'other'

export interface Business {
  id: string
  name: string
  legalName: string
  registrationNumber?: string
  businessType?: BusinessType
  industry?: IndustryType
  country: string
  email: string
  phone?: string
  website?: string
  status: BusinessStatus
  riskScore?: number
  monthlyRevenue?: number
  transactionCount?: number
  kybApprovedDate?: string
  kybReviewedBy?: string
  createdDate: string
  lastActive?: string
  assignedTo?: string
  modules?: string[]
  flags?: string[]
  notes?: string
}

export const MOCK_BUSINESSES: Business[] = [
  // Active Businesses
  {
    id: 'biz_001',
    name: 'Acme Corporation',
    legalName: 'Acme Corporation Ltd',
    registrationNumber: 'REG-2023-001',
    businessType: 'corporation',
    industry: 'fintech',
    country: 'US',
    email: 'finance@acme.com',
    phone: '+1-555-0100',
    website: 'https://acme.com',
    status: 'active',
    riskScore: 35,
    monthlyRevenue: 45600.00,
    transactionCount: 1245,
    kybApprovedDate: '2023-12-15',
    kybReviewedBy: 'Sarah Johnson',
    createdDate: '2023-11-20',
    lastActive: '2024-01-25 14:32',
    assignedTo: 'John Admin',
    modules: ['Payments', 'Payouts', 'Cards', 'FX', 'Escrow'],
    flags: [],
  },
  {
    id: 'biz_002',
    name: 'Global Trade Inc',
    legalName: 'Global Trade Incorporated',
    registrationNumber: 'REG-2023-002',
    businessType: 'corporation',
    industry: 'ecommerce',
    country: 'UK',
    email: 'ops@globaltrade.co.uk',
    phone: '+44-20-1234-5678',
    website: 'https://globaltrade.co.uk',
    status: 'active',
    riskScore: 42,
    monthlyRevenue: 34200.50,
    transactionCount: 892,
    kybApprovedDate: '2024-01-05',
    kybReviewedBy: 'Michael Chen',
    createdDate: '2023-12-10',
    lastActive: '2024-01-25 12:15',
    assignedTo: 'Sarah Admin',
    modules: ['Payments', 'Payouts', 'FX'],
    flags: [],
  },
  {
    id: 'biz_003',
    name: 'TechStart Ltd',
    legalName: 'TechStart Limited',
    registrationNumber: 'REG-2024-001',
    businessType: 'llc',
    industry: 'saas',
    country: 'SG',
    email: 'admin@techstart.io',
    phone: '+65-6123-4567',
    website: 'https://techstart.io',
    status: 'active',
    riskScore: 28,
    monthlyRevenue: 28900.00,
    transactionCount: 567,
    kybApprovedDate: '2024-01-18',
    kybReviewedBy: 'Sarah Johnson',
    createdDate: '2024-01-05',
    lastActive: '2024-01-25 11:20',
    assignedTo: 'John Admin',
    modules: ['Payments', 'Payouts', 'Cards'],
    flags: [],
  },
  {
    id: 'biz_004',
    name: 'Retail Solutions',
    legalName: 'Retail Solutions Pty Ltd',
    registrationNumber: 'AU-2023-456',
    businessType: 'corporation',
    industry: 'retail',
    country: 'AU',
    email: 'contact@retailsolutions.com.au',
    phone: '+61-2-9876-5432',
    website: 'https://retailsolutions.com.au',
    status: 'active',
    riskScore: 31,
    monthlyRevenue: 23450.75,
    transactionCount: 1034,
    kybApprovedDate: '2024-01-12',
    kybReviewedBy: 'Michael Chen',
    createdDate: '2023-12-28',
    lastActive: '2024-01-25 10:05',
    assignedTo: 'Sarah Admin',
    modules: ['Payments', 'Cards', 'Loyalty'],
    flags: [],
  },
  {
    id: 'biz_005',
    name: 'Finance Hub',
    legalName: 'Finance Hub Corporation',
    registrationNumber: 'CA-2023-789',
    businessType: 'corporation',
    industry: 'fintech',
    country: 'CA',
    email: 'operations@financehub.ca',
    phone: '+1-416-555-0200',
    website: 'https://financehub.ca',
    status: 'active',
    riskScore: 45,
    monthlyRevenue: 19800.00,
    transactionCount: 678,
    kybApprovedDate: '2024-01-08',
    kybReviewedBy: 'Sarah Johnson',
    createdDate: '2023-12-20',
    lastActive: '2024-01-25 09:30',
    assignedTo: 'John Admin',
    modules: ['Payments', 'Payouts', 'FX', 'Escrow'],
    flags: [],
  },

  // KYB Pending
  {
    id: 'biz_006',
    name: 'EduTech Solutions',
    legalName: 'EduTech Solutions LLC',
    registrationNumber: 'REG-2024-010',
    businessType: 'llc',
    industry: 'education',
    country: 'US',
    email: 'admin@edutech.com',
    status: 'kyb_pending',
    riskScore: 25,
    createdDate: '2024-01-20',
    assignedTo: 'Michael Chen',
    flags: [],
  },
  {
    id: 'biz_007',
    name: 'HealthCare Plus',
    legalName: 'HealthCare Plus Inc',
    registrationNumber: 'REG-2024-011',
    businessType: 'corporation',
    industry: 'healthcare',
    country: 'UK',
    email: 'compliance@healthcareplus.co.uk',
    status: 'kyb_pending',
    riskScore: 38,
    createdDate: '2024-01-22',
    assignedTo: 'Sarah Johnson',
    flags: ['high_volume'],
  },
  {
    id: 'biz_008',
    name: 'Crypto Exchange Ltd',
    legalName: 'Crypto Exchange Limited',
    registrationNumber: 'MT-2024-001',
    businessType: 'corporation',
    industry: 'fintech',
    country: 'MT',
    email: 'kyb@cryptoexchange.io',
    status: 'kyb_pending',
    riskScore: 72,
    createdDate: '2024-01-23',
    assignedTo: 'Michael Chen',
    flags: ['high_risk_industry', 'crypto'],
    notes: 'Requires enhanced due diligence',
  },

  // Applications
  {
    id: 'biz_009',
    name: 'Restaurant Chain Co',
    legalName: 'Restaurant Chain Company Ltd',
    businessType: 'corporation',
    industry: 'hospitality',
    country: 'FR',
    email: 'finance@restaurantchain.fr',
    status: 'application_submitted',
    createdDate: '2024-01-24',
    assignedTo: 'John Admin',
    flags: [],
  },
  {
    id: 'biz_010',
    name: 'Fashion Boutique',
    legalName: 'Fashion Boutique SAS',
    businessType: 'partnership',
    industry: 'retail',
    country: 'FR',
    email: 'contact@fashionboutique.fr',
    status: 'application_submitted',
    createdDate: '2024-01-24',
    assignedTo: 'Sarah Admin',
    flags: [],
  },

  // Leads
  {
    id: 'biz_011',
    name: 'StartupCo',
    legalName: 'StartupCo Ltd',
    industry: 'saas',
    country: 'US',
    email: 'founder@startupco.com',
    status: 'lead',
    createdDate: '2024-01-25',
    assignedTo: 'John Admin',
    flags: [],
  },
  {
    id: 'biz_012',
    name: 'Manufacturing Inc',
    legalName: 'Manufacturing Incorporated',
    industry: 'manufacturing',
    country: 'DE',
    email: 'info@manufacturing.de',
    status: 'lead',
    createdDate: '2024-01-25',
    assignedTo: 'Sarah Admin',
    flags: [],
  },

  // Suspended
  {
    id: 'biz_013',
    name: 'Suspicious Trading Ltd',
    legalName: 'Suspicious Trading Limited',
    registrationNumber: 'REG-2023-099',
    businessType: 'corporation',
    industry: 'other',
    country: 'CY',
    email: 'contact@suspicioustrading.com',
    status: 'suspended',
    riskScore: 85,
    monthlyRevenue: 0,
    transactionCount: 0,
    kybApprovedDate: '2023-11-10',
    kybReviewedBy: 'Michael Chen',
    createdDate: '2023-10-15',
    lastActive: '2024-01-10',
    assignedTo: 'Michael Chen',
    modules: ['Payments'],
    flags: ['aml_alert', 'suspicious_activity', 'suspended'],
    notes: 'Suspended due to AML concerns - under investigation',
  },

  // Rejected
  {
    id: 'biz_014',
    name: 'High Risk Ventures',
    legalName: 'High Risk Ventures LLC',
    businessType: 'llc',
    industry: 'other',
    country: 'US',
    email: 'admin@highrisk.com',
    status: 'kyb_rejected',
    riskScore: 95,
    createdDate: '2024-01-15',
    assignedTo: 'Sarah Johnson',
    flags: ['kyb_rejected', 'high_risk'],
    notes: 'Rejected: Insufficient documentation, high-risk industry',
  },

  // Provisioning
  {
    id: 'biz_015',
    name: 'New Business LLC',
    legalName: 'New Business Limited Liability Company',
    registrationNumber: 'REG-2024-020',
    businessType: 'llc',
    industry: 'services',
    country: 'US',
    email: 'ops@newbusiness.com',
    status: 'provisioning',
    riskScore: 30,
    kybApprovedDate: '2024-01-24',
    kybReviewedBy: 'John Admin',
    createdDate: '2024-01-10',
    assignedTo: 'John Admin',
    flags: [],
    notes: 'Wallet provisioning in progress',
  },
]

// Helper functions
export function getBusinessById(id: string): Business | undefined {
  // First try to find in active businesses
  const business = MOCK_BUSINESSES.find(b => b.id === id)
  if (business) return business

  // If not found, check terminated businesses
  // Import is lazy to avoid circular dependencies
  try {
    const { MOCK_TERMINATED_BUSINESSES } = require('./admin-complete')
    const terminated = MOCK_TERMINATED_BUSINESSES.find((t: any) => t.businessId === id)

    if (terminated) {
      // Convert terminated business to Business format
      return {
        id: terminated.businessId,
        name: terminated.businessName,
        legalName: terminated.businessName,
        country: 'N/A',
        email: 'terminated@business.com',
        status: 'terminated' as BusinessStatus,
        createdDate: 'N/A',
        flags: ['terminated'],
        notes: terminated.notes,
      }
    }
  } catch (e) {
    // If admin-complete isn't available, just return undefined
  }

  return undefined
}

export function getBusinessesByStatus(status: BusinessStatus): Business[] {
  return MOCK_BUSINESSES.filter(b => b.status === status)
}

export function getActiveBusinesses(): Business[] {
  return MOCK_BUSINESSES.filter(b => b.status === 'active')
}

export function getPendingKYB(): Business[] {
  return MOCK_BUSINESSES.filter(b => b.status === 'kyb_pending')
}

export function getBusinessStats() {
  const total = MOCK_BUSINESSES.length
  const active = MOCK_BUSINESSES.filter(b => b.status === 'active').length
  const pendingKYB = MOCK_BUSINESSES.filter(b => b.status === 'kyb_pending').length
  const leads = MOCK_BUSINESSES.filter(b => b.status === 'lead').length
  const suspended = MOCK_BUSINESSES.filter(b => b.status === 'suspended').length

  const totalRevenue = MOCK_BUSINESSES
    .filter(b => b.monthlyRevenue)
    .reduce((sum, b) => sum + (b.monthlyRevenue || 0), 0)

  const totalTransactions = MOCK_BUSINESSES
    .filter(b => b.transactionCount)
    .reduce((sum, b) => sum + (b.transactionCount || 0), 0)

  return {
    total,
    active,
    pendingKYB,
    leads,
    suspended,
    totalRevenue,
    totalTransactions,
  }
}

export function getStatusLabel(status: BusinessStatus): string {
  const labels: Record<BusinessStatus, string> = {
    lead: 'Lead',
    application_submitted: 'Application Submitted',
    kyb_pending: 'KYB Pending',
    kyb_approved: 'KYB Approved',
    kyb_rejected: 'KYB Rejected',
    kyb_conditional: 'KYB Conditional',
    provisioning: 'Provisioning',
    financial_core_active: 'Financial Core Active',
    module_setup: 'Module Setup',
    active: 'Active',
    suspended: 'Suspended',
    terminated: 'Terminated',
  }
  return labels[status] || status
}

export function getStatusColor(status: BusinessStatus): 'success' | 'warning' | 'error' | 'info' | 'default' {
  switch (status) {
    case 'active':
    case 'kyb_approved':
    case 'financial_core_active':
      return 'success'
    case 'kyb_pending':
    case 'application_submitted':
    case 'provisioning':
    case 'module_setup':
      return 'info'
    case 'lead':
    case 'kyb_conditional':
      return 'warning'
    case 'suspended':
    case 'kyb_rejected':
    case 'terminated':
      return 'error'
    default:
      return 'default'
  }
}

export function getRiskLevel(score: number): { level: string; color: string } {
  if (score >= 70) return { level: 'High', color: 'text-red-600 dark:text-red-400' }
  if (score >= 40) return { level: 'Medium', color: 'text-yellow-600 dark:text-yellow-400' }
  return { level: 'Low', color: 'text-green-600 dark:text-green-400' }
}
