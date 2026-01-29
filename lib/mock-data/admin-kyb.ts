export type DocumentStatus = 'pending' | 'verified' | 'rejected' | 'expired' | 'missing'
export type ScreeningStatus = 'clear' | 'match' | 'potential_match' | 'pending'
export type KYBDecision = 'approved' | 'rejected' | 'conditional' | 'pending'

export interface Director {
  id: string
  name: string
  role: string
  ownershipPercentage?: number
  nationality: string
  dateOfBirth: string
  idVerified: boolean
  pepScreening: ScreeningStatus
  sanctionsScreening: ScreeningStatus
  addressVerified: boolean
}

export interface CompanyDocument {
  id: string
  type: string
  name: string
  status: DocumentStatus
  uploadedDate: string
  verifiedDate?: string
  expiryDate?: string
  verifiedBy?: string
  notes?: string
  extractedData?: Record<string, any>
}

export interface AMLScreening {
  id: string
  date: string
  type: 'company' | 'director' | 'ubo'
  targetName: string
  result: ScreeningStatus
  matches?: {
    name: string
    type: string
    confidence: number
    source: string
  }[]
  performedBy: string
}

export interface DecisionLogEntry {
  id: string
  date: string
  action: string
  decision: KYBDecision
  performedBy: string
  reason: string
  notes?: string
}

export interface KYBReview {
  businessId: string
  applicationId?: string // Link to business application if applicable
  businessName: string
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'conditional'
  submittedDate: string
  reviewStartedDate?: string
  completedDate?: string
  assignedTo?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'

  // Company Information
  legalName: string
  registrationNumber: string
  registrationDate: string
  businessType: string
  industry: string
  country: string
  address: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  taxId: string
  website?: string
  businessDescription: string
  projectedVolume: {
    monthly: number
    currency: string
  }

  // Directors & UBOs
  directors: Director[]

  // Documents
  documents: CompanyDocument[]

  // AML & Sanctions
  amlScreenings: AMLScreening[]
  riskScore: number
  riskFactors: string[]
  countryRisk: 'low' | 'medium' | 'high'
  industryRisk: 'low' | 'medium' | 'high'

  // Decision Log
  decisionLog: DecisionLogEntry[]

  // Internal Notes
  internalNotes: {
    id: string
    date: string
    author: string
    note: string
    pinned?: boolean
  }[]

  // Final Decision
  finalDecision?: KYBDecision
  finalDecisionReason?: string
  approvalConditions?: string[]
}

export const MOCK_KYB_REVIEWS: KYBReview[] = [
  // Pending Review - EduTech Solutions
  {
    businessId: 'biz_006',
    applicationId: 'app_001', // Linked to Digital Payments Co application
    businessName: 'EduTech Solutions',
    status: 'pending',
    submittedDate: '2024-01-20',
    assignedTo: 'Michael Chen',
    priority: 'medium',

    legalName: 'EduTech Solutions LLC',
    registrationNumber: 'REG-2024-010',
    registrationDate: '2023-12-01',
    businessType: 'llc',
    industry: 'education',
    country: 'US',
    address: {
      street: '123 Education Lane',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94102',
      country: 'US',
    },
    taxId: 'US-TAX-123456',
    website: 'https://edutech.com',
    businessDescription: 'Online education platform providing courses for K-12 students and teachers.',
    projectedVolume: {
      monthly: 50000,
      currency: 'USD',
    },

    directors: [
      {
        id: 'dir_001',
        name: 'Sarah Williams',
        role: 'CEO & Founder',
        ownershipPercentage: 60,
        nationality: 'US',
        dateOfBirth: '1985-03-15',
        idVerified: true,
        pepScreening: 'clear',
        sanctionsScreening: 'clear',
        addressVerified: true,
      },
      {
        id: 'dir_002',
        name: 'Michael Brown',
        role: 'CTO & Co-Founder',
        ownershipPercentage: 40,
        nationality: 'US',
        dateOfBirth: '1987-07-22',
        idVerified: true,
        pepScreening: 'clear',
        sanctionsScreening: 'clear',
        addressVerified: true,
      },
    ],

    documents: [
      {
        id: 'doc_001',
        type: 'Certificate of Incorporation',
        name: 'incorporation_cert.pdf',
        status: 'verified',
        uploadedDate: '2024-01-20',
        verifiedDate: '2024-01-21',
        verifiedBy: 'Sarah Johnson',
        extractedData: {
          companyName: 'EduTech Solutions LLC',
          registrationNumber: 'REG-2024-010',
          registrationDate: '2023-12-01',
        },
      },
      {
        id: 'doc_002',
        type: 'Proof of Address',
        name: 'utility_bill.pdf',
        status: 'verified',
        uploadedDate: '2024-01-20',
        verifiedDate: '2024-01-21',
        verifiedBy: 'Sarah Johnson',
      },
      {
        id: 'doc_003',
        type: 'Bank Statement',
        name: 'bank_statement_dec2023.pdf',
        status: 'verified',
        uploadedDate: '2024-01-20',
        verifiedDate: '2024-01-22',
        verifiedBy: 'Michael Chen',
      },
      {
        id: 'doc_004',
        type: 'Business License',
        name: 'education_license.pdf',
        status: 'pending',
        uploadedDate: '2024-01-20',
      },
    ],

    amlScreenings: [
      {
        id: 'aml_001',
        date: '2024-01-21',
        type: 'company',
        targetName: 'EduTech Solutions LLC',
        result: 'clear',
        performedBy: 'Automated System',
      },
      {
        id: 'aml_002',
        date: '2024-01-21',
        type: 'director',
        targetName: 'Sarah Williams',
        result: 'clear',
        performedBy: 'Automated System',
      },
      {
        id: 'aml_003',
        date: '2024-01-21',
        type: 'director',
        targetName: 'Michael Brown',
        result: 'clear',
        performedBy: 'Automated System',
      },
    ],

    riskScore: 25,
    riskFactors: ['new_business', 'us_jurisdiction'],
    countryRisk: 'low',
    industryRisk: 'low',

    decisionLog: [
      {
        id: 'log_001',
        date: '2024-01-20',
        action: 'Application Submitted',
        decision: 'pending',
        performedBy: 'System',
        reason: 'KYB application received from business',
      },
      {
        id: 'log_002',
        date: '2024-01-21',
        action: 'Assigned for Review',
        decision: 'pending',
        performedBy: 'John Admin',
        reason: 'Assigned to Michael Chen for compliance review',
      },
    ],

    internalNotes: [
      {
        id: 'note_001',
        date: '2024-01-21',
        author: 'Michael Chen',
        note: 'All documents look good. Waiting for business license verification.',
      },
    ],
  },

  // High Risk - Crypto Exchange
  {
    businessId: 'biz_008',
    applicationId: 'app_002', // Linked to GreenEnergy Solutions application
    businessName: 'Crypto Exchange Ltd',
    status: 'under_review',
    submittedDate: '2024-01-23',
    reviewStartedDate: '2024-01-24',
    assignedTo: 'Michael Chen',
    priority: 'urgent',

    legalName: 'Crypto Exchange Limited',
    registrationNumber: 'MT-2024-001',
    registrationDate: '2023-11-15',
    businessType: 'corporation',
    industry: 'fintech',
    country: 'MT',
    address: {
      street: '45 Blockchain Street',
      city: 'Valletta',
      state: 'VLT',
      postalCode: 'VLT 1000',
      country: 'MT',
    },
    taxId: 'MT-TAX-789012',
    website: 'https://cryptoexchange.io',
    businessDescription: 'Cryptocurrency exchange platform enabling trading of digital assets.',
    projectedVolume: {
      monthly: 5000000,
      currency: 'EUR',
    },

    directors: [
      {
        id: 'dir_003',
        name: 'Alexander Petrov',
        role: 'CEO',
        ownershipPercentage: 45,
        nationality: 'RU',
        dateOfBirth: '1980-05-10',
        idVerified: true,
        pepScreening: 'potential_match',
        sanctionsScreening: 'clear',
        addressVerified: true,
      },
      {
        id: 'dir_004',
        name: 'Maria Rodriguez',
        role: 'CFO',
        ownershipPercentage: 35,
        nationality: 'ES',
        dateOfBirth: '1982-09-18',
        idVerified: true,
        pepScreening: 'clear',
        sanctionsScreening: 'clear',
        addressVerified: true,
      },
      {
        id: 'dir_005',
        name: 'David Chen',
        role: 'CTO',
        ownershipPercentage: 20,
        nationality: 'SG',
        dateOfBirth: '1990-12-05',
        idVerified: true,
        pepScreening: 'clear',
        sanctionsScreening: 'clear',
        addressVerified: true,
      },
    ],

    documents: [
      {
        id: 'doc_005',
        type: 'Certificate of Incorporation',
        name: 'malta_incorporation.pdf',
        status: 'verified',
        uploadedDate: '2024-01-23',
        verifiedDate: '2024-01-24',
        verifiedBy: 'Sarah Johnson',
      },
      {
        id: 'doc_006',
        type: 'Crypto License',
        name: 'mfsa_license.pdf',
        status: 'verified',
        uploadedDate: '2024-01-23',
        verifiedDate: '2024-01-24',
        verifiedBy: 'Michael Chen',
        extractedData: {
          licenseNumber: 'MFSA-2023-456',
          issueDate: '2023-12-01',
          expiryDate: '2024-12-01',
        },
      },
      {
        id: 'doc_007',
        type: 'AML Policy',
        name: 'aml_compliance_policy.pdf',
        status: 'verified',
        uploadedDate: '2024-01-23',
        verifiedDate: '2024-01-24',
        verifiedBy: 'Michael Chen',
      },
      {
        id: 'doc_008',
        type: 'Bank Statement',
        name: 'bank_statement_jan2024.pdf',
        status: 'verified',
        uploadedDate: '2024-01-23',
        verifiedDate: '2024-01-24',
        verifiedBy: 'Sarah Johnson',
      },
      {
        id: 'doc_009',
        type: 'Source of Funds',
        name: 'funding_documentation.pdf',
        status: 'pending',
        uploadedDate: '2024-01-23',
        notes: 'Requires additional clarification on investor sources',
      },
    ],

    amlScreenings: [
      {
        id: 'aml_004',
        date: '2024-01-24',
        type: 'company',
        targetName: 'Crypto Exchange Limited',
        result: 'clear',
        performedBy: 'Automated System',
      },
      {
        id: 'aml_005',
        date: '2024-01-24',
        type: 'director',
        targetName: 'Alexander Petrov',
        result: 'potential_match',
        matches: [
          {
            name: 'Alexander Petrov',
            type: 'PEP - Former Government Official',
            confidence: 0.75,
            source: 'World-Check',
          },
        ],
        performedBy: 'Automated System',
      },
      {
        id: 'aml_006',
        date: '2024-01-24',
        type: 'director',
        targetName: 'Maria Rodriguez',
        result: 'clear',
        performedBy: 'Automated System',
      },
      {
        id: 'aml_007',
        date: '2024-01-24',
        type: 'director',
        targetName: 'David Chen',
        result: 'clear',
        performedBy: 'Automated System',
      },
    ],

    riskScore: 72,
    riskFactors: [
      'high_risk_industry',
      'crypto_business',
      'high_volume',
      'pep_match',
      'cross_border_operations',
      'malta_jurisdiction',
    ],
    countryRisk: 'medium',
    industryRisk: 'high',

    decisionLog: [
      {
        id: 'log_003',
        date: '2024-01-23',
        action: 'Application Submitted',
        decision: 'pending',
        performedBy: 'System',
        reason: 'KYB application received from business',
      },
      {
        id: 'log_004',
        date: '2024-01-24',
        action: 'Review Started',
        decision: 'pending',
        performedBy: 'Michael Chen',
        reason: 'High-risk application - requires enhanced due diligence',
      },
      {
        id: 'log_005',
        date: '2024-01-24',
        action: 'Additional Documents Requested',
        decision: 'pending',
        performedBy: 'Michael Chen',
        reason: 'Requested additional source of funds documentation',
      },
    ],

    internalNotes: [
      {
        id: 'note_002',
        date: '2024-01-24',
        author: 'Michael Chen',
        note: 'PEP match on CEO - Alexander Petrov. Researching connection to former Russian government position. May require enhanced due diligence.',
        pinned: true,
      },
      {
        id: 'note_003',
        date: '2024-01-24',
        author: 'Sarah Johnson',
        note: 'Malta MFSA license verified and valid. Company appears legitimate with proper regulatory approval.',
      },
      {
        id: 'note_004',
        date: '2024-01-24',
        author: 'Michael Chen',
        note: 'Awaiting clarification on source of initial funding. €5M investment requires documentation.',
      },
    ],
  },

  // Approved - Healthcare Plus
  {
    businessId: 'biz_007',
    applicationId: 'app_003', // Linked to FitGym Network application
    businessName: 'HealthCare Plus',
    status: 'approved',
    submittedDate: '2024-01-22',
    reviewStartedDate: '2024-01-22',
    completedDate: '2024-01-24',
    assignedTo: 'Sarah Johnson',
    priority: 'medium',

    legalName: 'HealthCare Plus Inc',
    registrationNumber: 'REG-2024-011',
    registrationDate: '2023-10-15',
    businessType: 'corporation',
    industry: 'healthcare',
    country: 'UK',
    address: {
      street: '78 Medical Drive',
      city: 'London',
      state: 'Greater London',
      postalCode: 'SW1A 1AA',
      country: 'UK',
    },
    taxId: 'GB-TAX-654321',
    website: 'https://healthcareplus.co.uk',
    businessDescription: 'Healthcare services platform connecting patients with medical professionals.',
    projectedVolume: {
      monthly: 200000,
      currency: 'GBP',
    },

    directors: [
      {
        id: 'dir_006',
        name: 'Dr. Emily Thompson',
        role: 'CEO',
        ownershipPercentage: 55,
        nationality: 'UK',
        dateOfBirth: '1978-04-12',
        idVerified: true,
        pepScreening: 'clear',
        sanctionsScreening: 'clear',
        addressVerified: true,
      },
      {
        id: 'dir_007',
        name: 'James Wilson',
        role: 'COO',
        ownershipPercentage: 45,
        nationality: 'UK',
        dateOfBirth: '1980-11-30',
        idVerified: true,
        pepScreening: 'clear',
        sanctionsScreening: 'clear',
        addressVerified: true,
      },
    ],

    documents: [
      {
        id: 'doc_010',
        type: 'Certificate of Incorporation',
        name: 'uk_companies_house.pdf',
        status: 'verified',
        uploadedDate: '2024-01-22',
        verifiedDate: '2024-01-22',
        verifiedBy: 'Sarah Johnson',
      },
      {
        id: 'doc_011',
        type: 'Healthcare License',
        name: 'cqc_registration.pdf',
        status: 'verified',
        uploadedDate: '2024-01-22',
        verifiedDate: '2024-01-23',
        verifiedBy: 'Sarah Johnson',
      },
      {
        id: 'doc_012',
        type: 'Bank Statement',
        name: 'hsbc_statement_jan2024.pdf',
        status: 'verified',
        uploadedDate: '2024-01-22',
        verifiedDate: '2024-01-23',
        verifiedBy: 'Sarah Johnson',
      },
      {
        id: 'doc_013',
        type: 'Proof of Address',
        name: 'office_lease.pdf',
        status: 'verified',
        uploadedDate: '2024-01-22',
        verifiedDate: '2024-01-23',
        verifiedBy: 'Michael Chen',
      },
    ],

    amlScreenings: [
      {
        id: 'aml_008',
        date: '2024-01-22',
        type: 'company',
        targetName: 'HealthCare Plus Inc',
        result: 'clear',
        performedBy: 'Automated System',
      },
      {
        id: 'aml_009',
        date: '2024-01-22',
        type: 'director',
        targetName: 'Dr. Emily Thompson',
        result: 'clear',
        performedBy: 'Automated System',
      },
      {
        id: 'aml_010',
        date: '2024-01-22',
        type: 'director',
        targetName: 'James Wilson',
        result: 'clear',
        performedBy: 'Automated System',
      },
    ],

    riskScore: 38,
    riskFactors: ['regulated_industry', 'high_volume', 'uk_jurisdiction'],
    countryRisk: 'low',
    industryRisk: 'medium',

    decisionLog: [
      {
        id: 'log_006',
        date: '2024-01-22',
        action: 'Application Submitted',
        decision: 'pending',
        performedBy: 'System',
        reason: 'KYB application received from business',
      },
      {
        id: 'log_007',
        date: '2024-01-22',
        action: 'Review Started',
        decision: 'pending',
        performedBy: 'Sarah Johnson',
        reason: 'Assigned for standard KYB review',
      },
      {
        id: 'log_008',
        date: '2024-01-24',
        action: 'KYB Approved',
        decision: 'approved',
        performedBy: 'Sarah Johnson',
        reason: 'All documents verified. Company registered with CQC. Low risk profile. Approved for onboarding.',
      },
    ],

    internalNotes: [
      {
        id: 'note_005',
        date: '2024-01-22',
        author: 'Sarah Johnson',
        note: 'Healthcare company with proper CQC registration. Clean compliance history.',
      },
      {
        id: 'note_006',
        date: '2024-01-23',
        author: 'Sarah Johnson',
        note: 'All directors verified. No AML flags. Recommend approval.',
      },
    ],

    finalDecision: 'approved',
    finalDecisionReason: 'All compliance checks passed. Proper healthcare licensing. Low risk profile.',
  },

  // Sample Approved Business - TechFlow Solutions
  {
    businessId: 'biz_100',
    businessName: 'TechFlow Solutions',
    status: 'approved',
    submittedDate: '2024-01-01',
    reviewStartedDate: '2024-01-02',
    completedDate: '2024-01-05',
    assignedTo: 'Sarah Johnson',
    priority: 'medium',

    legalName: 'TechFlow Solutions Inc',
    registrationNumber: 'REG-2024-100',
    registrationDate: '2023-09-15',
    businessType: 'corporation',
    industry: 'technology',
    country: 'US',
    address: {
      street: '100 Tech Boulevard',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'US',
    },
    taxId: 'US-TAX-100001',
    website: 'https://techflow.com',
    businessDescription: 'Technology solutions provider offering cloud infrastructure and SaaS products.',
    projectedVolume: {
      monthly: 150000,
      currency: 'USD',
    },

    directors: [
      {
        id: 'dir_100',
        name: 'John Smith',
        role: 'CEO',
        ownershipPercentage: 65,
        nationality: 'US',
        dateOfBirth: '1980-01-15',
        idVerified: true,
        pepScreening: 'clear',
        sanctionsScreening: 'clear',
        addressVerified: true,
      },
    ],

    documents: [
      {
        id: 'doc_100',
        type: 'Certificate of Incorporation',
        name: 'incorporation.pdf',
        status: 'verified',
        uploadedDate: '2024-01-01',
        verifiedDate: '2024-01-02',
        verifiedBy: 'Sarah Johnson',
      },
    ],

    amlScreenings: [
      {
        id: 'aml_100',
        date: '2024-01-02',
        type: 'company',
        targetName: 'TechFlow Solutions Inc',
        result: 'clear',
        performedBy: 'Automated System',
      },
    ],

    riskScore: 20,
    riskFactors: ['new_business'],
    countryRisk: 'low',
    industryRisk: 'low',

    decisionLog: [
      {
        id: 'log_100',
        date: '2024-01-01',
        action: 'Application Submitted',
        decision: 'pending',
        performedBy: 'System',
        reason: 'KYB application received',
      },
      {
        id: 'log_101',
        date: '2024-01-05',
        action: 'KYB Approved',
        decision: 'approved',
        performedBy: 'Sarah Johnson',
        reason: 'All checks passed. Low risk profile.',
      },
    ],

    internalNotes: [],
    finalDecision: 'approved',
    finalDecisionReason: 'All compliance checks passed. Low risk technology business.',
  },

  // Rejected Business - High Risk Crypto
  {
    businessId: 'biz_200',
    businessName: 'CryptoVenture Global',
    status: 'rejected',
    submittedDate: '2024-01-15',
    reviewStartedDate: '2024-01-16',
    completedDate: '2024-01-18',
    assignedTo: 'Michael Chen',
    priority: 'high',

    legalName: 'CryptoVenture Global Ltd',
    registrationNumber: 'OFF-2024-001',
    registrationDate: '2024-01-01',
    businessType: 'corporation',
    industry: 'fintech',
    country: 'KY',
    address: {
      street: '1 Offshore Plaza',
      city: 'George Town',
      state: 'Grand Cayman',
      postalCode: 'KY1-1234',
      country: 'KY',
    },
    taxId: 'KY-TAX-001',
    website: 'https://cryptoventure.com',
    businessDescription: 'Cryptocurrency trading platform',
    projectedVolume: {
      monthly: 10000000,
      currency: 'USD',
    },

    directors: [
      {
        id: 'dir_200',
        name: 'Anonymous Entity',
        role: 'Director',
        nationality: 'Unknown',
        dateOfBirth: '1990-01-01',
        idVerified: false,
        pepScreening: 'match',
        sanctionsScreening: 'potential_match',
        addressVerified: false,
      },
    ],

    documents: [
      {
        id: 'doc_200',
        type: 'Certificate of Incorporation',
        name: 'cert.pdf',
        status: 'rejected',
        uploadedDate: '2024-01-15',
        notes: 'Document appears altered',
      },
    ],

    amlScreenings: [
      {
        id: 'aml_200',
        date: '2024-01-16',
        type: 'company',
        targetName: 'CryptoVenture Global Ltd',
        result: 'match',
        matches: [
          {
            name: 'CryptoVenture',
            type: 'Sanctioned Entity',
            confidence: 0.95,
            source: 'OFAC',
          },
        ],
        performedBy: 'Automated System',
      },
    ],

    riskScore: 95,
    riskFactors: ['high_risk_jurisdiction', 'crypto_business', 'sanctions_match', 'unverified_directors', 'altered_documents'],
    countryRisk: 'high',
    industryRisk: 'high',

    decisionLog: [
      {
        id: 'log_200',
        date: '2024-01-15',
        action: 'Application Submitted',
        decision: 'pending',
        performedBy: 'System',
        reason: 'KYB application received',
      },
      {
        id: 'log_201',
        date: '2024-01-18',
        action: 'KYB Rejected',
        decision: 'rejected',
        performedBy: 'Michael Chen',
        reason: 'Sanctions match detected. Unverified directors. High risk profile.',
      },
    ],

    internalNotes: [
      {
        id: 'note_200',
        date: '2024-01-17',
        author: 'Michael Chen',
        note: 'Multiple red flags. Sanctions screening returned positive match. Recommend immediate rejection.',
        pinned: true,
      },
    ],

    finalDecision: 'rejected',
    finalDecisionReason: 'Sanctions match detected. Unable to verify beneficial owners. Too high risk for platform.',
  },

  // Monitoring Status - Ongoing Monitoring
  {
    businessId: 'biz_300',
    businessName: 'GlobalTrade Partners',
    status: 'approved',
    submittedDate: '2023-11-01',
    reviewStartedDate: '2023-11-02',
    completedDate: '2023-11-10',
    assignedTo: 'Sarah Johnson',
    priority: 'medium',

    legalName: 'GlobalTrade Partners LLC',
    registrationNumber: 'REG-2023-300',
    registrationDate: '2023-08-01',
    businessType: 'llc',
    industry: 'commerce',
    country: 'US',
    address: {
      street: '500 Trade Center',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
    },
    taxId: 'US-TAX-300001',
    website: 'https://globaltrade.com',
    businessDescription: 'International trade and import/export services',
    projectedVolume: {
      monthly: 500000,
      currency: 'USD',
    },

    directors: [
      {
        id: 'dir_300',
        name: 'Maria Garcia',
        role: 'CEO',
        ownershipPercentage: 100,
        nationality: 'US',
        dateOfBirth: '1975-06-20',
        idVerified: true,
        pepScreening: 'clear',
        sanctionsScreening: 'clear',
        addressVerified: true,
      },
    ],

    documents: [
      {
        id: 'doc_300',
        type: 'Certificate of Incorporation',
        name: 'incorporation.pdf',
        status: 'verified',
        uploadedDate: '2023-11-01',
        verifiedDate: '2023-11-02',
        verifiedBy: 'Sarah Johnson',
      },
      {
        id: 'doc_301',
        type: 'Import License',
        name: 'import_license.pdf',
        status: 'verified',
        uploadedDate: '2023-11-01',
        verifiedDate: '2023-11-03',
        verifiedBy: 'Michael Chen',
      },
    ],

    amlScreenings: [
      {
        id: 'aml_300',
        date: '2023-11-02',
        type: 'company',
        targetName: 'GlobalTrade Partners LLC',
        result: 'clear',
        performedBy: 'Automated System',
      },
      {
        id: 'aml_301',
        date: '2024-01-15',
        type: 'company',
        targetName: 'GlobalTrade Partners LLC',
        result: 'clear',
        performedBy: 'Scheduled Monitoring',
      },
    ],

    riskScore: 35,
    riskFactors: ['cross_border_operations', 'high_volume'],
    countryRisk: 'low',
    industryRisk: 'medium',

    decisionLog: [
      {
        id: 'log_300',
        date: '2023-11-01',
        action: 'Application Submitted',
        decision: 'pending',
        performedBy: 'System',
        reason: 'KYB application received',
      },
      {
        id: 'log_301',
        date: '2023-11-10',
        action: 'KYB Approved',
        decision: 'approved',
        performedBy: 'Sarah Johnson',
        reason: 'All checks passed. Approved for ongoing monitoring.',
      },
    ],

    internalNotes: [
      {
        id: 'note_300',
        date: '2024-01-15',
        author: 'System',
        note: 'Quarterly monitoring screening completed. No issues detected.',
      },
    ],

    finalDecision: 'approved',
    finalDecisionReason: 'Approved with ongoing monitoring due to cross-border operations.',
  },

  // Sanctions Screening Sample - GlobalTrade Corp
  {
    businessId: 'biz_400',
    businessName: 'GlobalTrade Corp',
    status: 'under_review',
    submittedDate: '2024-01-25',
    reviewStartedDate: '2024-01-26',
    assignedTo: 'Michael Chen',
    priority: 'urgent',

    legalName: 'GlobalTrade Corporation Ltd',
    registrationNumber: 'REG-2024-400',
    registrationDate: '2023-12-01',
    businessType: 'corporation',
    industry: 'trading',
    country: 'PA',
    address: {
      street: '45 Trading Avenue',
      city: 'Panama City',
      state: 'Panama',
      postalCode: 'PC-1000',
      country: 'PA',
    },
    taxId: 'PA-TAX-400',
    website: 'https://globaltrade-corp.com',
    businessDescription: 'International trading company specializing in commodity exports',
    projectedVolume: {
      monthly: 2000000,
      currency: 'USD',
    },

    directors: [
      {
        id: 'dir_400',
        name: 'Vladimir Petrov',
        role: 'CEO',
        ownershipPercentage: 80,
        nationality: 'RU',
        dateOfBirth: '1970-05-15',
        idVerified: true,
        pepScreening: 'potential_match',
        sanctionsScreening: 'potential_match',
        addressVerified: true,
      },
    ],

    documents: [
      {
        id: 'doc_400',
        type: 'Certificate of Incorporation',
        name: 'incorporation.pdf',
        status: 'verified',
        uploadedDate: '2024-01-25',
        verifiedDate: '2024-01-26',
        verifiedBy: 'Sarah Johnson',
      },
    ],

    amlScreenings: [
      {
        id: 'aml_400',
        date: '2024-01-26',
        type: 'company',
        targetName: 'GlobalTrade Corporation Ltd',
        result: 'potential_match',
        matches: [
          {
            name: 'GlobalTrade Corp',
            type: 'OFAC SDN',
            confidence: 0.72,
            source: 'OFAC',
          },
        ],
        performedBy: 'Automated System',
      },
    ],

    riskScore: 68,
    riskFactors: ['high_risk_jurisdiction', 'sanctions_potential_match', 'cross_border_operations', 'commodity_trading'],
    countryRisk: 'high',
    industryRisk: 'high',

    decisionLog: [
      {
        id: 'log_400',
        date: '2024-01-25',
        action: 'Application Submitted',
        decision: 'pending',
        performedBy: 'System',
        reason: 'KYB application received',
      },
      {
        id: 'log_401',
        date: '2024-01-26',
        action: 'Sanctions Screening Alert',
        decision: 'pending',
        performedBy: 'Automated System',
        reason: 'Potential match detected in OFAC SDN list. Requires manual review.',
      },
    ],

    internalNotes: [
      {
        id: 'note_400',
        date: '2024-01-26',
        author: 'Michael Chen',
        note: 'Potential sanctions match flagged. Conducting enhanced due diligence on company and beneficial owners.',
        pinned: true,
      },
    ],
  },
]

// Helper functions
export function getKYBReviewById(id: string): KYBReview | undefined {
  return MOCK_KYB_REVIEWS.find(k => k.businessId === id || k.applicationId === id)
}

export function getPendingKYBReviews(): KYBReview[] {
  return MOCK_KYB_REVIEWS.filter(k => k.status === 'pending' || k.status === 'under_review')
}

export function getKYBStats() {
  const total = MOCK_KYB_REVIEWS.length
  const pending = MOCK_KYB_REVIEWS.filter(k => k.status === 'pending').length
  const under_review = MOCK_KYB_REVIEWS.filter(k => k.status === 'under_review').length
  const approved = MOCK_KYB_REVIEWS.filter(k => k.status === 'approved').length
  const rejected = MOCK_KYB_REVIEWS.filter(k => k.status === 'rejected').length

  return { total, pending, under_review, approved, rejected }
}

export function getDocumentStatusColor(status: DocumentStatus): 'success' | 'warning' | 'error' | 'info' | 'default' {
  switch (status) {
    case 'verified': return 'success'
    case 'pending': return 'info'
    case 'rejected': return 'error'
    case 'expired': return 'warning'
    case 'missing': return 'error'
    default: return 'default'
  }
}

export function getScreeningStatusColor(status: ScreeningStatus): 'success' | 'warning' | 'error' | 'info' {
  switch (status) {
    case 'clear': return 'success'
    case 'pending': return 'info'
    case 'potential_match': return 'warning'
    case 'match': return 'error'
  }
}

export function getRiskScoreColor(score: number): string {
  if (score >= 70) return 'text-red-600 dark:text-red-400'
  if (score >= 40) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-green-600 dark:text-green-400'
}
