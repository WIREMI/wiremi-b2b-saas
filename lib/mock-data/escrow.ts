// Wiremi B2B Escrow Module - Mock Data
// This file contains comprehensive dummy data demonstrating all escrow states and workflows

import type {
  Escrow,
  EscrowStats,
  EscrowState,
  EscrowRole,
  EscrowParticipant,
  ParticipantPermissions,
  FundRequest,
  EscrowDocument,
  EscrowActivity,
  EscrowNotification
} from '@/types/escrow'

// ============================================================================
// HELPER FUNCTIONS FOR PERMISSIONS
// ============================================================================

const custodianPermissions: ParticipantPermissions = {
  canViewDetails: true,
  canRequestFunds: false,
  canApproveFunds: true,
  canSignDocuments: true,
  canAddStakeholders: true
}

const beneficiaryPermissions: ParticipantPermissions = {
  canViewDetails: true,
  canRequestFunds: true,
  canApproveFunds: false,
  canSignDocuments: true,
  canAddStakeholders: false
}

const stakeholderPermissions: ParticipantPermissions = {
  canViewDetails: true,
  canRequestFunds: false,
  canApproveFunds: true,
  canSignDocuments: true,
  canAddStakeholders: false
}

// ============================================================================
// MOCK ESCROWS - ALL STATES DEMONSTRATED
// ============================================================================

export const mockEscrows: Escrow[] = [
  // ========================================================================
  // 1. CREATED STATE - Just created, not yet funded
  // ========================================================================
  {
    id: 'escrow-1',
    escrowId: 'ESC-2026-001',
    name: 'Acme Corp Software License',
    description: 'Escrow for annual enterprise software license agreement',
    purpose: 'Secure payment for $100K software license with performance guarantees',
    type: 'BUSINESS_TRANSACTION',
    state: 'CREATED',
    currency: 'USD',
    totalAmount: 100000,
    fundedAmount: 0,
    releasedAmount: 0,
    remainingAmount: 0,
    custodian: {
      id: 'part-1-1',
      userId: 'user-custodian-acme',
      businessName: 'Acme Corporation',
      email: 'finance@acmecorp.com',
      role: 'CUSTODIAN',
      invitedAt: '2026-01-20T09:00:00Z',
      acceptedAt: '2026-01-20T09:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions,
      metadata: {
        businessId: 'BIZ-ACME-001',
        contactPerson: 'Robert Johnson',
        phone: '+1-555-0101'
      }
    },
    beneficiary: {
      id: 'part-1-2',
      userId: 'user-beneficiary-techsoft',
      businessName: 'TechSoft Solutions Ltd',
      email: 'contracts@techsoft.com',
      role: 'BENEFICIARY',
      invitedAt: '2026-01-20T09:15:00Z',
      status: 'INVITED',
      permissions: beneficiaryPermissions,
      metadata: {
        businessId: 'BIZ-TECH-045',
        contactPerson: 'Lisa Chen'
      }
    },
    stakeholders: [],
    conditions: [
      {
        id: 'cond-1-1',
        type: 'SIGNATURE_REQUIRED',
        description: 'Both parties must sign the software license agreement',
        required: true,
        status: 'PENDING'
      }
    ],
    requiresAllConditions: true,
    fundRequests: [],
    documents: [],
    createdAt: '2026-01-20T09:00:00Z',
    lastActivityAt: '2026-01-20T09:15:00Z',
    activities: [
      {
        id: 'act-1-1',
        escrowId: 'escrow-1',
        timestamp: '2026-01-20T09:00:00Z',
        actorId: 'user-custodian-acme',
        actorName: 'Robert Johnson',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for Acme Corp Software License',
        newState: 'CREATED'
      }
    ],
    notifications: [],
    settings: {
      allowPartialReleases: false,
      requireUnanimousApproval: true,
      minimumStakeholders: 0,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['software', 'license', 'saas'],
    updatedAt: '2026-01-20T09:15:00Z'
  },

  // ========================================================================
  // 2. INVITED STATE - Invitation sent, not accepted
  // ========================================================================
  {
    id: 'escrow-2',
    escrowId: 'ESC-2026-002',
    name: 'BuildRight Construction Project',
    description: 'Milestone-based escrow for commercial building renovation',
    purpose: 'Secure $500K payment for Phase 1 construction work',
    type: 'PROJECT_MILESTONE',
    state: 'INVITED',
    currency: 'USD',
    totalAmount: 500000,
    fundedAmount: 0,
    releasedAmount: 0,
    remainingAmount: 0,
    custodian: {
      id: 'part-2-1',
      userId: 'user-custodian-property',
      businessName: 'MetroProperty Investments',
      email: 'escrow@metroproperty.com',
      role: 'CUSTODIAN',
      invitedAt: '2026-01-15T10:00:00Z',
      acceptedAt: '2026-01-15T10:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions,
      metadata: {
        businessId: 'BIZ-METRO-012',
        contactPerson: 'Michael Torres',
        phone: '+1-555-0202'
      }
    },
    beneficiary: {
      id: 'part-2-2',
      userId: 'user-beneficiary-buildright',
      businessName: 'BuildRight Construction Inc.',
      email: 'partners@buildright.com',
      role: 'BENEFICIARY',
      invitedAt: '2026-01-15T10:30:00Z',
      status: 'INVITED',
      permissions: beneficiaryPermissions,
      metadata: {
        businessId: 'BIZ-BUILD-098',
        contactPerson: 'James Martinez'
      }
    },
    stakeholders: [
      {
        id: 'part-2-3',
        userId: 'user-stakeholder-architect',
        businessName: 'ArchVision Design Studio',
        email: 'oversight@archvision.com',
        role: 'STAKEHOLDER',
        invitedAt: '2026-01-15T11:00:00Z',
        status: 'INVITED',
        permissions: stakeholderPermissions,
        metadata: {
          contactPerson: 'Emma Wilson'
        }
      }
    ],
    conditions: [
      {
        id: 'cond-2-1',
        type: 'MILESTONE_MET',
        description: 'Phase 1 foundation work completed and inspected',
        required: true,
        status: 'PENDING'
      },
      {
        id: 'cond-2-2',
        type: 'DOCUMENT_UPLOAD',
        description: 'Upload city building inspection approval',
        required: true,
        status: 'PENDING'
      }
    ],
    requiresAllConditions: true,
    fundRequests: [],
    documents: [
      {
        id: 'doc-2-1',
        type: 'CONTRACT',
        name: 'Construction Master Agreement.pdf',
        url: '/mock/docs/construction-agreement.pdf',
        uploadedBy: 'user-custodian-property',
        uploadedByName: 'Michael Torres',
        uploadedAt: '2026-01-15T10:15:00Z',
        fileSize: 3245000,
        mimeType: 'application/pdf',
        requiresSignature: true,
        signatures: [],
        status: 'PENDING'
      }
    ],
    createdAt: '2026-01-15T10:00:00Z',
    lastActivityAt: '2026-01-15T11:00:00Z',
    activities: [
      {
        id: 'act-2-1',
        escrowId: 'escrow-2',
        timestamp: '2026-01-15T10:00:00Z',
        actorId: 'user-custodian-property',
        actorName: 'Michael Torres',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for BuildRight Construction Project',
        newState: 'CREATED'
      },
      {
        id: 'act-2-2',
        escrowId: 'escrow-2',
        timestamp: '2026-01-15T10:30:00Z',
        actorId: 'user-custodian-property',
        actorName: 'Michael Torres',
        actorRole: 'CUSTODIAN',
        action: 'INVITED_PARTICIPANT',
        description: 'Invited BuildRight Construction Inc. as beneficiary',
        previousState: 'CREATED',
        newState: 'INVITED'
      },
      {
        id: 'act-2-3',
        escrowId: 'escrow-2',
        timestamp: '2026-01-15T11:00:00Z',
        actorId: 'user-custodian-property',
        actorName: 'Michael Torres',
        actorRole: 'CUSTODIAN',
        action: 'STAKEHOLDER_ADDED',
        description: 'Added ArchVision Design Studio as stakeholder'
      }
    ],
    notifications: [
      {
        id: 'notif-2-1',
        escrowId: 'escrow-2',
        recipientId: 'user-beneficiary-buildright',
        recipientEmail: 'partners@buildright.com',
        type: 'INVITATION',
        subject: "You've been invited to join an escrow",
        message: 'MetroProperty Investments has invited you to join "BuildRight Construction Project" escrow as the beneficiary. The escrow amount is $500,000.00 USD.',
        sentAt: '2026-01-15T10:30:00Z',
        actionUrl: '/escrow/invitations',
        priority: 'HIGH'
      }
    ],
    settings: {
      allowPartialReleases: true,
      requireUnanimousApproval: true,
      minimumStakeholders: 1,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['construction', 'commercial', 'milestone'],
    updatedAt: '2026-01-15T11:00:00Z'
  },

  // ========================================================================
  // 3. ACCEPTED STATE - Beneficiary accepted, awaiting funding
  // ========================================================================
  {
    id: 'escrow-3',
    escrowId: 'ESC-2026-003',
    name: 'TechStart SaaS Partnership',
    description: 'Strategic partnership escrow for SaaS platform integration',
    purpose: 'Secure $150K payment for 12-month integration project',
    type: 'BUSINESS_TRANSACTION',
    state: 'ACCEPTED',
    currency: 'USD',
    totalAmount: 150000,
    fundedAmount: 0,
    releasedAmount: 0,
    remainingAmount: 0,
    custodian: {
      id: 'part-3-1',
      userId: 'user-custodian-techstart',
      businessName: 'TechStart Ventures LLC',
      email: 'finance@techstart.com',
      role: 'CUSTODIAN',
      invitedAt: '2026-01-18T08:00:00Z',
      acceptedAt: '2026-01-18T08:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-3-2',
      userId: 'user-beneficiary-designpro',
      businessName: 'DesignPro Solutions',
      email: 'billing@designpro.com',
      role: 'BENEFICIARY',
      invitedAt: '2026-01-18T08:30:00Z',
      acceptedAt: '2026-01-18T15:45:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [],
    conditions: [
      {
        id: 'cond-3-1',
        type: 'MILESTONE_MET',
        description: 'Complete API integration testing',
        required: true,
        status: 'PENDING'
      }
    ],
    requiresAllConditions: false,
    fundRequests: [],
    documents: [],
    createdAt: '2026-01-18T08:00:00Z',
    lastActivityAt: '2026-01-18T15:45:00Z',
    activities: [
      {
        id: 'act-3-1',
        escrowId: 'escrow-3',
        timestamp: '2026-01-18T08:00:00Z',
        actorId: 'user-custodian-techstart',
        actorName: 'Sarah Kim',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for TechStart SaaS Partnership',
        newState: 'CREATED'
      },
      {
        id: 'act-3-2',
        escrowId: 'escrow-3',
        timestamp: '2026-01-18T08:30:00Z',
        actorId: 'user-custodian-techstart',
        actorName: 'Sarah Kim',
        actorRole: 'CUSTODIAN',
        action: 'INVITED_PARTICIPANT',
        description: 'Invited DesignPro Solutions as beneficiary',
        previousState: 'CREATED',
        newState: 'INVITED'
      },
      {
        id: 'act-3-3',
        escrowId: 'escrow-3',
        timestamp: '2026-01-18T15:45:00Z',
        actorId: 'user-beneficiary-designpro',
        actorName: 'David Lee',
        actorRole: 'BENEFICIARY',
        action: 'ACCEPTED_INVITATION',
        description: 'Accepted escrow invitation',
        previousState: 'INVITED',
        newState: 'ACCEPTED'
      }
    ],
    notifications: [],
    settings: {
      allowPartialReleases: true,
      requireUnanimousApproval: false,
      minimumStakeholders: 0,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['saas', 'integration', 'partnership'],
    updatedAt: '2026-01-18T15:45:00Z'
  },

  // ========================================================================
  // 4. FUNDED STATE - Fully funded, no requests yet
  // ========================================================================
  {
    id: 'escrow-4',
    escrowId: 'ESC-2026-004',
    name: 'GreenEnergy Solar Installation',
    description: 'Escrow for commercial solar panel installation project',
    purpose: 'Payment protection for $250K solar installation contract',
    type: 'PROJECT_MILESTONE',
    state: 'FUNDED',
    currency: 'USD',
    totalAmount: 250000,
    fundedAmount: 250000,
    releasedAmount: 0,
    remainingAmount: 250000,
    custodian: {
      id: 'part-4-1',
      userId: 'user-custodian-buildcorp',
      businessName: 'BuildCorp Commercial Properties',
      email: 'finance@buildcorp.com',
      role: 'CUSTODIAN',
      invitedAt: '2026-01-10T09:00:00Z',
      acceptedAt: '2026-01-10T09:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-4-2',
      userId: 'user-beneficiary-greenenergy',
      businessName: 'GreenEnergy Solutions Inc.',
      email: 'contracts@greenenergy.com',
      role: 'BENEFICIARY',
      invitedAt: '2026-01-10T09:15:00Z',
      acceptedAt: '2026-01-10T14:30:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [
      {
        id: 'part-4-3',
        userId: 'user-stakeholder-projectwatch',
        businessName: 'ProjectWatch Oversight LLC',
        email: 'monitor@projectwatch.com',
        role: 'STAKEHOLDER',
        invitedAt: '2026-01-11T10:00:00Z',
        acceptedAt: '2026-01-11T15:20:00Z',
        status: 'ACCEPTED',
        permissions: stakeholderPermissions
      }
    ],
    conditions: [
      {
        id: 'cond-4-1',
        type: 'MILESTONE_MET',
        description: 'Site survey and engineering assessment completed',
        required: true,
        status: 'PENDING'
      },
      {
        id: 'cond-4-2',
        type: 'DOCUMENT_UPLOAD',
        description: 'Upload building permits and safety certifications',
        required: true,
        status: 'PENDING'
      }
    ],
    requiresAllConditions: true,
    fundRequests: [],
    documents: [
      {
        id: 'doc-4-1',
        type: 'CONTRACT',
        name: 'Solar Installation Master Agreement.pdf',
        url: '/mock/docs/solar-contract.pdf',
        uploadedBy: 'user-custodian-buildcorp',
        uploadedByName: 'John Smith',
        uploadedAt: '2026-01-10T09:30:00Z',
        fileSize: 2458000,
        mimeType: 'application/pdf',
        requiresSignature: true,
        signatures: [
          {
            id: 'sig-4-1',
            documentId: 'doc-4-1',
            signedBy: 'user-custodian-buildcorp',
            signedByName: 'John Smith',
            signedByRole: 'CUSTODIAN',
            signedAt: '2026-01-10T09:35:00Z',
            ipAddress: '192.168.1.100',
            signatureType: 'ELECTRONIC',
            signatureData: 'mock-signature-custodian'
          },
          {
            id: 'sig-4-2',
            documentId: 'doc-4-1',
            signedBy: 'user-beneficiary-greenenergy',
            signedByName: 'Sarah Green',
            signedByRole: 'BENEFICIARY',
            signedAt: '2026-01-10T14:45:00Z',
            ipAddress: '192.168.1.101',
            signatureType: 'ELECTRONIC',
            signatureData: 'mock-signature-beneficiary'
          }
        ],
        status: 'SIGNED'
      }
    ],
    createdAt: '2026-01-10T09:00:00Z',
    fundedAt: '2026-01-12T08:30:00Z',
    lastActivityAt: '2026-01-12T08:30:00Z',
    activities: [
      {
        id: 'act-4-1',
        escrowId: 'escrow-4',
        timestamp: '2026-01-10T09:00:00Z',
        actorId: 'user-custodian-buildcorp',
        actorName: 'John Smith',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for GreenEnergy Solar Installation',
        newState: 'CREATED'
      },
      {
        id: 'act-4-2',
        escrowId: 'escrow-4',
        timestamp: '2026-01-12T08:30:00Z',
        actorId: 'user-custodian-buildcorp',
        actorName: 'John Smith',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $250,000.00 from Main Operating Account',
        metadata: {
          amount: 250000,
          currency: 'USD',
          walletId: 'wallet-main-001',
          transactionId: 'txn-escrow-funding-001'
        },
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      }
    ],
    notifications: [],
    settings: {
      allowPartialReleases: true,
      requireUnanimousApproval: true,
      minimumStakeholders: 1,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['solar', 'construction', 'commercial'],
    updatedAt: '2026-01-12T08:30:00Z'
  },

  // ========================================================================
  // 5. REQUESTED STATE - Beneficiary requested funds
  // ========================================================================
  {
    id: 'escrow-5',
    escrowId: 'ESC-2026-005',
    name: 'DesignPro Website Development',
    description: 'Escrow for enterprise website redesign project',
    purpose: 'Secure $75K payment for Q1 2026 website development',
    type: 'PROJECT_MILESTONE',
    state: 'REQUESTED',
    currency: 'USD',
    totalAmount: 75000,
    fundedAmount: 75000,
    releasedAmount: 0,
    remainingAmount: 75000,
    custodian: {
      id: 'part-5-1',
      userId: 'user-custodian-retailco',
      businessName: 'RetailCo International',
      email: 'payments@retailco.com',
      role: 'CUSTODIAN',
      invitedAt: '2026-01-05T10:00:00Z',
      acceptedAt: '2026-01-05T10:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-5-2',
      userId: 'user-beneficiary-designpro',
      businessName: 'DesignPro Digital Agency',
      email: 'invoices@designpro.digital',
      role: 'BENEFICIARY',
      invitedAt: '2026-01-05T10:30:00Z',
      acceptedAt: '2026-01-05T16:00:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [],
    conditions: [
      {
        id: 'cond-5-1',
        type: 'MILESTONE_MET',
        description: 'Homepage and key landing pages completed',
        required: true,
        status: 'MET',
        metAt: '2026-01-18T10:00:00Z',
        verifiedBy: 'user-beneficiary-designpro'
      }
    ],
    requiresAllConditions: true,
    fundRequests: [
      {
        id: 'req-5-1',
        escrowId: 'escrow-5',
        requestedBy: 'user-beneficiary-designpro',
        requestedByName: 'David Lee',
        requestedByRole: 'BENEFICIARY',
        amount: 37500,
        currency: 'USD',
        reason: 'Milestone 1: Design Phase Completion',
        description: 'Completed all homepage designs, 5 landing pages, and component library. All deliverables have been reviewed and approved by RetailCo marketing team.',
        documents: [
          {
            id: 'doc-5-1',
            type: 'PROOF_OF_WORK',
            name: 'Milestone_1_Deliverables.zip',
            url: '/mock/docs/milestone-1-deliverables.zip',
            uploadedBy: 'user-beneficiary-designpro',
            uploadedByName: 'David Lee',
            uploadedAt: '2026-01-18T09:30:00Z',
            fileSize: 45678000,
            mimeType: 'application/zip',
            requiresSignature: false,
            signatures: [],
            status: 'PENDING'
          },
          {
            id: 'doc-5-2',
            type: 'MILESTONE_EVIDENCE',
            name: 'Client_Approval_Email.pdf',
            url: '/mock/docs/client-approval.pdf',
            uploadedBy: 'user-beneficiary-designpro',
            uploadedByName: 'David Lee',
            uploadedAt: '2026-01-18T09:35:00Z',
            fileSize: 234000,
            mimeType: 'application/pdf',
            requiresSignature: false,
            signatures: [],
            status: 'PENDING'
          }
        ],
        requestedAt: '2026-01-18T10:00:00Z',
        status: 'PENDING',
        reviewers: []
      }
    ],
    documents: [],
    createdAt: '2026-01-05T10:00:00Z',
    fundedAt: '2026-01-08T14:00:00Z',
    firstRequestAt: '2026-01-18T10:00:00Z',
    lastActivityAt: '2026-01-18T10:00:00Z',
    activities: [
      {
        id: 'act-5-1',
        escrowId: 'escrow-5',
        timestamp: '2026-01-05T10:00:00Z',
        actorId: 'user-custodian-retailco',
        actorName: 'Michelle Parker',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for DesignPro Website Development',
        newState: 'CREATED'
      },
      {
        id: 'act-5-2',
        escrowId: 'escrow-5',
        timestamp: '2026-01-08T14:00:00Z',
        actorId: 'user-custodian-retailco',
        actorName: 'Michelle Parker',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $75,000.00',
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      },
      {
        id: 'act-5-3',
        escrowId: 'escrow-5',
        timestamp: '2026-01-18T10:00:00Z',
        actorId: 'user-beneficiary-designpro',
        actorName: 'David Lee',
        actorRole: 'BENEFICIARY',
        action: 'REQUESTED_FUNDS',
        description: 'Requested $37,500.00 for Milestone 1: Design Phase Completion',
        previousState: 'FUNDED',
        newState: 'REQUESTED'
      }
    ],
    notifications: [
      {
        id: 'notif-5-1',
        escrowId: 'escrow-5',
        recipientId: 'user-custodian-retailco',
        recipientEmail: 'payments@retailco.com',
        type: 'FUND_REQUEST',
        subject: 'New fund request requires your review',
        message: 'DesignPro Digital Agency has requested $37,500.00 from "DesignPro Website Development" escrow for Milestone 1 completion.',
        sentAt: '2026-01-18T10:00:00Z',
        actionUrl: '/escrow/escrow-5',
        priority: 'HIGH'
      }
    ],
    settings: {
      allowPartialReleases: true,
      requireUnanimousApproval: false,
      minimumStakeholders: 0,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['web-development', 'design', 'milestone'],
    updatedAt: '2026-01-18T10:00:00Z'
  },

  // ========================================================================
  // 6. UNDER_REVIEW STATE - Stakeholders reviewing fund request
  // ========================================================================
  {
    id: 'escrow-6',
    escrowId: 'ESC-2026-006',
    name: 'DataCore Cloud Migration',
    description: 'Escrow for enterprise cloud infrastructure migration',
    purpose: 'Secure $400K payment for AWS migration project',
    type: 'PROJECT_MILESTONE',
    state: 'UNDER_REVIEW',
    currency: 'USD',
    totalAmount: 400000,
    fundedAmount: 400000,
    releasedAmount: 0,
    remainingAmount: 400000,
    custodian: {
      id: 'part-6-1',
      userId: 'user-custodian-fintech',
      businessName: 'FinTech Global Inc.',
      email: 'treasury@fintechglobal.com',
      role: 'CUSTODIAN',
      invitedAt: '2025-12-01T08:00:00Z',
      acceptedAt: '2025-12-01T08:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-6-2',
      userId: 'user-beneficiary-datacore',
      businessName: 'DataCore Systems LLC',
      email: 'billing@datacore.io',
      role: 'BENEFICIARY',
      invitedAt: '2025-12-01T09:00:00Z',
      acceptedAt: '2025-12-01T15:00:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [
      {
        id: 'part-6-3',
        userId: 'user-stakeholder-cto',
        businessName: 'FinTech CTO Office',
        email: 'cto@fintechglobal.com',
        role: 'STAKEHOLDER',
        invitedAt: '2025-12-02T10:00:00Z',
        acceptedAt: '2025-12-02T11:00:00Z',
        status: 'ACCEPTED',
        permissions: stakeholderPermissions
      },
      {
        id: 'part-6-4',
        userId: 'user-stakeholder-security',
        businessName: 'FinTech Security Team',
        email: 'security@fintechglobal.com',
        role: 'STAKEHOLDER',
        invitedAt: '2025-12-02T10:00:00Z',
        acceptedAt: '2025-12-02T14:00:00Z',
        status: 'ACCEPTED',
        permissions: stakeholderPermissions
      }
    ],
    conditions: [
      {
        id: 'cond-6-1',
        type: 'MILESTONE_MET',
        description: 'Phase 1: Database migration completed',
        required: true,
        status: 'MET',
        metAt: '2026-01-15T18:00:00Z',
        verifiedBy: 'user-beneficiary-datacore'
      },
      {
        id: 'cond-6-2',
        type: 'DOCUMENT_UPLOAD',
        description: 'Security audit report and compliance certificates',
        required: true,
        status: 'MET',
        metAt: '2026-01-16T10:00:00Z',
        verifiedBy: 'user-stakeholder-security'
      }
    ],
    requiresAllConditions: true,
    fundRequests: [
      {
        id: 'req-6-1',
        escrowId: 'escrow-6',
        requestedBy: 'user-beneficiary-datacore',
        requestedByName: 'Alex Thompson',
        requestedByRole: 'BENEFICIARY',
        amount: 200000,
        currency: 'USD',
        reason: 'Phase 1: Database Migration Completion',
        description: 'Successfully migrated all production databases to AWS RDS. Completed load testing, security audits, and failover drills. All systems are operational with 99.99% uptime.',
        documents: [
          {
            id: 'doc-6-1',
            type: 'MILESTONE_EVIDENCE',
            name: 'Phase_1_Completion_Report.pdf',
            url: '/mock/docs/phase1-report.pdf',
            uploadedBy: 'user-beneficiary-datacore',
            uploadedByName: 'Alex Thompson',
            uploadedAt: '2026-01-16T09:00:00Z',
            fileSize: 8765000,
            mimeType: 'application/pdf',
            requiresSignature: false,
            signatures: [],
            status: 'PENDING'
          },
          {
            id: 'doc-6-2',
            type: 'PROOF_OF_WORK',
            name: 'Security_Audit_Report.pdf',
            url: '/mock/docs/security-audit.pdf',
            uploadedBy: 'user-stakeholder-security',
            uploadedByName: 'Marcus Rivera',
            uploadedAt: '2026-01-16T10:00:00Z',
            fileSize: 2345000,
            mimeType: 'application/pdf',
            requiresSignature: false,
            signatures: [],
            status: 'PENDING'
          }
        ],
        requestedAt: '2026-01-16T11:00:00Z',
        status: 'UNDER_REVIEW',
        reviewers: [
          {
            userId: 'user-stakeholder-cto',
            name: 'Dr. Emily Watson',
            role: 'STAKEHOLDER',
            reviewedAt: '2026-01-17T09:00:00Z',
            decision: 'APPROVED',
            comments: 'Migration looks solid. All technical requirements met.'
          },
          {
            userId: 'user-stakeholder-security',
            name: 'Marcus Rivera',
            role: 'STAKEHOLDER',
            decision: undefined,
            comments: undefined
          }
        ]
      }
    ],
    documents: [],
    createdAt: '2025-12-01T08:00:00Z',
    fundedAt: '2025-12-05T10:00:00Z',
    firstRequestAt: '2026-01-16T11:00:00Z',
    lastActivityAt: '2026-01-17T09:00:00Z',
    activities: [
      {
        id: 'act-6-1',
        escrowId: 'escrow-6',
        timestamp: '2025-12-01T08:00:00Z',
        actorId: 'user-custodian-fintech',
        actorName: 'Patricia Morgan',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for DataCore Cloud Migration',
        newState: 'CREATED'
      },
      {
        id: 'act-6-2',
        escrowId: 'escrow-6',
        timestamp: '2025-12-05T10:00:00Z',
        actorId: 'user-custodian-fintech',
        actorName: 'Patricia Morgan',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $400,000.00',
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      },
      {
        id: 'act-6-3',
        escrowId: 'escrow-6',
        timestamp: '2026-01-16T11:00:00Z',
        actorId: 'user-beneficiary-datacore',
        actorName: 'Alex Thompson',
        actorRole: 'BENEFICIARY',
        action: 'REQUESTED_FUNDS',
        description: 'Requested $200,000.00 for Phase 1 completion',
        previousState: 'FUNDED',
        newState: 'REQUESTED'
      },
      {
        id: 'act-6-4',
        escrowId: 'escrow-6',
        timestamp: '2026-01-16T12:00:00Z',
        actorId: 'user-custodian-fintech',
        actorName: 'Patricia Morgan',
        actorRole: 'CUSTODIAN',
        action: 'STATE_CHANGED',
        description: 'Moved request to review by stakeholders',
        previousState: 'REQUESTED',
        newState: 'UNDER_REVIEW'
      },
      {
        id: 'act-6-5',
        escrowId: 'escrow-6',
        timestamp: '2026-01-17T09:00:00Z',
        actorId: 'user-stakeholder-cto',
        actorName: 'Dr. Emily Watson',
        actorRole: 'STAKEHOLDER',
        action: 'REVIEWED_REQUEST',
        description: 'Approved fund request (1 of 2 reviewers)'
      }
    ],
    notifications: [
      {
        id: 'notif-6-1',
        escrowId: 'escrow-6',
        recipientId: 'user-stakeholder-security',
        recipientEmail: 'security@fintechglobal.com',
        type: 'FUND_REQUEST',
        subject: 'Fund request requires your review',
        message: 'A $200,000 fund request from DataCore Systems is awaiting your review and approval.',
        sentAt: '2026-01-16T12:00:00Z',
        actionUrl: '/escrow/escrow-6/review-request',
        priority: 'URGENT'
      }
    ],
    settings: {
      allowPartialReleases: true,
      requireUnanimousApproval: true,
      minimumStakeholders: 2,
      automaticNotifications: true,
      disputeResolutionProcess: 'ARBITRATION'
    },
    tags: ['cloud-migration', 'aws', 'enterprise'],
    updatedAt: '2026-01-17T09:00:00Z'
  },

  // ========================================================================
  // 7. APPROVED_FOR_RELEASE STATE - Approved, awaiting document prep
  // ========================================================================
  {
    id: 'escrow-7',
    escrowId: 'ESC-2026-007',
    name: 'MedSupply Equipment Purchase',
    description: 'Escrow for medical equipment procurement',
    purpose: 'Secure $180K payment for surgical equipment order',
    type: 'CONDITIONAL_PAYMENT',
    state: 'APPROVED_FOR_RELEASE',
    currency: 'USD',
    totalAmount: 180000,
    fundedAmount: 180000,
    releasedAmount: 0,
    remainingAmount: 180000,
    custodian: {
      id: 'part-7-1',
      userId: 'user-custodian-hospital',
      businessName: 'Central City Hospital',
      email: 'procurement@centralcityhospital.org',
      role: 'CUSTODIAN',
      invitedAt: '2025-12-20T09:00:00Z',
      acceptedAt: '2025-12-20T09:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-7-2',
      userId: 'user-beneficiary-medsupply',
      businessName: 'MedSupply International',
      email: 'sales@medsupply.com',
      role: 'BENEFICIARY',
      invitedAt: '2025-12-20T10:00:00Z',
      acceptedAt: '2025-12-20T16:00:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [
      {
        id: 'part-7-3',
        userId: 'user-stakeholder-medical-director',
        businessName: 'Hospital Medical Director',
        email: 'medical.director@centralcityhospital.org',
        role: 'STAKEHOLDER',
        invitedAt: '2025-12-21T08:00:00Z',
        acceptedAt: '2025-12-21T09:00:00Z',
        status: 'ACCEPTED',
        permissions: stakeholderPermissions
      }
    ],
    conditions: [
      {
        id: 'cond-7-1',
        type: 'DOCUMENT_UPLOAD',
        description: 'Upload FDA certification and equipment inspection report',
        required: true,
        status: 'MET',
        metAt: '2026-01-19T14:00:00Z',
        verifiedBy: 'user-beneficiary-medsupply'
      },
      {
        id: 'cond-7-2',
        type: 'MILESTONE_MET',
        description: 'Equipment delivered and installed',
        required: true,
        status: 'MET',
        metAt: '2026-01-19T16:00:00Z',
        verifiedBy: 'user-stakeholder-medical-director'
      }
    ],
    requiresAllConditions: true,
    fundRequests: [
      {
        id: 'req-7-1',
        escrowId: 'escrow-7',
        requestedBy: 'user-beneficiary-medsupply',
        requestedByName: 'Katherine Hayes',
        requestedByRole: 'BENEFICIARY',
        amount: 180000,
        currency: 'USD',
        reason: 'Equipment Delivered and Installed',
        description: 'All surgical equipment has been delivered, installed, and tested. FDA certifications provided. Hospital staff training completed.',
        documents: [
          {
            id: 'doc-7-1',
            type: 'MILESTONE_EVIDENCE',
            name: 'Delivery_and_Installation_Certificate.pdf',
            url: '/mock/docs/delivery-cert.pdf',
            uploadedBy: 'user-beneficiary-medsupply',
            uploadedByName: 'Katherine Hayes',
            uploadedAt: '2026-01-19T14:00:00Z',
            fileSize: 1234000,
            mimeType: 'application/pdf',
            requiresSignature: false,
            signatures: [],
            status: 'PENDING'
          }
        ],
        requestedAt: '2026-01-19T15:00:00Z',
        status: 'APPROVED',
        reviewers: [
          {
            userId: 'user-stakeholder-medical-director',
            name: 'Dr. James Patterson',
            role: 'STAKEHOLDER',
            reviewedAt: '2026-01-20T10:00:00Z',
            decision: 'APPROVED',
            comments: 'All equipment verified and operational. Excellent work.'
          }
        ],
        approvedAt: '2026-01-20T10:00:00Z',
        approvedBy: ['user-stakeholder-medical-director', 'user-custodian-hospital']
      }
    ],
    documents: [],
    createdAt: '2025-12-20T09:00:00Z',
    fundedAt: '2025-12-22T11:00:00Z',
    firstRequestAt: '2026-01-19T15:00:00Z',
    lastActivityAt: '2026-01-20T10:00:00Z',
    activities: [
      {
        id: 'act-7-1',
        escrowId: 'escrow-7',
        timestamp: '2025-12-20T09:00:00Z',
        actorId: 'user-custodian-hospital',
        actorName: 'Richard Clark',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for MedSupply Equipment Purchase',
        newState: 'CREATED'
      },
      {
        id: 'act-7-2',
        escrowId: 'escrow-7',
        timestamp: '2025-12-22T11:00:00Z',
        actorId: 'user-custodian-hospital',
        actorName: 'Richard Clark',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $180,000.00',
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      },
      {
        id: 'act-7-3',
        escrowId: 'escrow-7',
        timestamp: '2026-01-19T15:00:00Z',
        actorId: 'user-beneficiary-medsupply',
        actorName: 'Katherine Hayes',
        actorRole: 'BENEFICIARY',
        action: 'REQUESTED_FUNDS',
        description: 'Requested $180,000.00 for equipment delivery',
        previousState: 'FUNDED',
        newState: 'REQUESTED'
      },
      {
        id: 'act-7-4',
        escrowId: 'escrow-7',
        timestamp: '2026-01-20T10:00:00Z',
        actorId: 'user-stakeholder-medical-director',
        actorName: 'Dr. James Patterson',
        actorRole: 'STAKEHOLDER',
        action: 'APPROVED_REQUEST',
        description: 'Approved fund request - all conditions met',
        previousState: 'UNDER_REVIEW',
        newState: 'APPROVED_FOR_RELEASE'
      }
    ],
    notifications: [
      {
        id: 'notif-7-1',
        escrowId: 'escrow-7',
        recipientId: 'user-custodian-hospital',
        recipientEmail: 'procurement@centralcityhospital.org',
        type: 'REQUEST_APPROVED',
        subject: 'Fund request approved - prepare documents',
        message: 'The $180,000 fund request has been approved. Please prepare release documents for signatures.',
        sentAt: '2026-01-20T10:05:00Z',
        actionUrl: '/escrow/escrow-7',
        priority: 'HIGH'
      }
    ],
    settings: {
      allowPartialReleases: false,
      requireUnanimousApproval: true,
      minimumStakeholders: 1,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['medical', 'equipment', 'healthcare'],
    updatedAt: '2026-01-20T10:00:00Z'
  },

  // ========================================================================
  // 8. AWAITING_SIGNATURES STATE - Documents sent for signing
  // ========================================================================
  {
    id: 'escrow-8',
    escrowId: 'ESC-2026-008',
    name: 'LogiTrans Fleet Expansion',
    description: 'Escrow for commercial vehicle purchase agreement',
    purpose: 'Secure $320K for 10 delivery vehicle purchase',
    type: 'BUSINESS_TRANSACTION',
    state: 'AWAITING_SIGNATURES',
    currency: 'USD',
    totalAmount: 320000,
    fundedAmount: 320000,
    releasedAmount: 0,
    remainingAmount: 320000,
    custodian: {
      id: 'part-8-1',
      userId: 'user-custodian-logitrans',
      businessName: 'LogiTrans Logistics Corp',
      email: 'finance@logitrans.com',
      role: 'CUSTODIAN',
      invitedAt: '2026-01-01T08:00:00Z',
      acceptedAt: '2026-01-01T08:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-8-2',
      userId: 'user-beneficiary-autogroup',
      businessName: 'Commercial Auto Group',
      email: 'fleet@autogroup.com',
      role: 'BENEFICIARY',
      invitedAt: '2026-01-01T09:00:00Z',
      acceptedAt: '2026-01-01T14:00:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [
      {
        id: 'part-8-3',
        userId: 'user-stakeholder-fleet-manager',
        businessName: 'LogiTrans Fleet Operations',
        email: 'fleet.ops@logitrans.com',
        role: 'STAKEHOLDER',
        invitedAt: '2026-01-02T08:00:00Z',
        acceptedAt: '2026-01-02T09:00:00Z',
        status: 'ACCEPTED',
        permissions: stakeholderPermissions
      }
    ],
    conditions: [
      {
        id: 'cond-8-1',
        type: 'DOCUMENT_UPLOAD',
        description: 'Vehicle inspection and registration documents',
        required: true,
        status: 'MET',
        metAt: '2026-01-18T12:00:00Z',
        verifiedBy: 'user-beneficiary-autogroup'
      }
    ],
    requiresAllConditions: true,
    fundRequests: [
      {
        id: 'req-8-1',
        escrowId: 'escrow-8',
        requestedBy: 'user-beneficiary-autogroup',
        requestedByName: 'Thomas Briggs',
        requestedByRole: 'BENEFICIARY',
        amount: 320000,
        currency: 'USD',
        reason: 'Vehicle Delivery Complete',
        description: 'All 10 commercial delivery vehicles have been delivered, inspected, and registered. Ready for transfer to LogiTrans.',
        documents: [
          {
            id: 'doc-8-1',
            type: 'PROOF_OF_WORK',
            name: 'Vehicle_Inspection_Reports.pdf',
            url: '/mock/docs/vehicle-inspections.pdf',
            uploadedBy: 'user-beneficiary-autogroup',
            uploadedByName: 'Thomas Briggs',
            uploadedAt: '2026-01-18T12:00:00Z',
            fileSize: 5678000,
            mimeType: 'application/pdf',
            requiresSignature: false,
            signatures: [],
            status: 'PENDING'
          },
          {
            id: 'doc-8-2',
            type: 'CONTRACT',
            name: 'Fleet_Purchase_Agreement.pdf',
            description: 'Final purchase agreement requiring signatures from all parties',
            url: '/mock/docs/fleet-purchase.pdf',
            uploadedBy: 'user-custodian-logitrans',
            uploadedByName: 'Amanda Foster',
            uploadedAt: '2026-01-20T11:00:00Z',
            fileSize: 1890000,
            mimeType: 'application/pdf',
            requiresSignature: true,
            signatures: [
              {
                id: 'sig-8-1',
                documentId: 'doc-8-2',
                signedBy: 'user-custodian-logitrans',
                signedByName: 'Amanda Foster',
                signedByRole: 'CUSTODIAN',
                signedAt: '2026-01-20T11:30:00Z',
                ipAddress: '192.168.10.50',
                signatureType: 'ELECTRONIC',
                signatureData: 'mock-signature-custodian-logitrans'
              }
            ],
            status: 'PENDING'
          }
        ],
        requestedAt: '2026-01-18T13:00:00Z',
        status: 'APPROVED',
        reviewers: [
          {
            userId: 'user-stakeholder-fleet-manager',
            name: 'Carlos Rodriguez',
            role: 'STAKEHOLDER',
            reviewedAt: '2026-01-19T10:00:00Z',
            decision: 'APPROVED',
            comments: 'All vehicles inspected and meet specifications.'
          }
        ],
        approvedAt: '2026-01-19T10:00:00Z',
        approvedBy: ['user-stakeholder-fleet-manager', 'user-custodian-logitrans']
      }
    ],
    documents: [],
    createdAt: '2026-01-01T08:00:00Z',
    fundedAt: '2026-01-03T10:00:00Z',
    firstRequestAt: '2026-01-18T13:00:00Z',
    lastActivityAt: '2026-01-20T11:30:00Z',
    activities: [
      {
        id: 'act-8-1',
        escrowId: 'escrow-8',
        timestamp: '2026-01-01T08:00:00Z',
        actorId: 'user-custodian-logitrans',
        actorName: 'Amanda Foster',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for LogiTrans Fleet Expansion',
        newState: 'CREATED'
      },
      {
        id: 'act-8-2',
        escrowId: 'escrow-8',
        timestamp: '2026-01-03T10:00:00Z',
        actorId: 'user-custodian-logitrans',
        actorName: 'Amanda Foster',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $320,000.00',
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      },
      {
        id: 'act-8-3',
        escrowId: 'escrow-8',
        timestamp: '2026-01-18T13:00:00Z',
        actorId: 'user-beneficiary-autogroup',
        actorName: 'Thomas Briggs',
        actorRole: 'BENEFICIARY',
        action: 'REQUESTED_FUNDS',
        description: 'Requested $320,000.00 for vehicle delivery',
        previousState: 'FUNDED',
        newState: 'REQUESTED'
      },
      {
        id: 'act-8-4',
        escrowId: 'escrow-8',
        timestamp: '2026-01-19T10:00:00Z',
        actorId: 'user-stakeholder-fleet-manager',
        actorName: 'Carlos Rodriguez',
        actorRole: 'STAKEHOLDER',
        action: 'APPROVED_REQUEST',
        description: 'Approved fund request',
        previousState: 'UNDER_REVIEW',
        newState: 'APPROVED_FOR_RELEASE'
      },
      {
        id: 'act-8-5',
        escrowId: 'escrow-8',
        timestamp: '2026-01-20T11:00:00Z',
        actorId: 'user-custodian-logitrans',
        actorName: 'Amanda Foster',
        actorRole: 'CUSTODIAN',
        action: 'UPLOADED_DOCUMENT',
        description: 'Uploaded Fleet Purchase Agreement for signatures',
        previousState: 'APPROVED_FOR_RELEASE',
        newState: 'AWAITING_SIGNATURES'
      },
      {
        id: 'act-8-6',
        escrowId: 'escrow-8',
        timestamp: '2026-01-20T11:30:00Z',
        actorId: 'user-custodian-logitrans',
        actorName: 'Amanda Foster',
        actorRole: 'CUSTODIAN',
        action: 'SIGNED_DOCUMENT',
        description: 'Signed Fleet Purchase Agreement (1 of 2 signatures)'
      }
    ],
    notifications: [
      {
        id: 'notif-8-1',
        escrowId: 'escrow-8',
        recipientId: 'user-beneficiary-autogroup',
        recipientEmail: 'fleet@autogroup.com',
        type: 'SIGNATURE_REQUIRED',
        subject: 'Your signature is required to release funds',
        message: 'Please sign the Fleet Purchase Agreement to authorize the release of $320,000.00.',
        sentAt: '2026-01-20T11:00:00Z',
        actionUrl: '/escrow/escrow-8/sign-documents',
        priority: 'URGENT'
      }
    ],
    settings: {
      allowPartialReleases: false,
      requireUnanimousApproval: true,
      minimumStakeholders: 1,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['fleet', 'vehicles', 'logistics'],
    updatedAt: '2026-01-20T11:30:00Z'
  },

  // ========================================================================
  // 9. AUTHORIZED STATE - All signatures collected, ready for release
  // ========================================================================
  {
    id: 'escrow-9',
    escrowId: 'ESC-2026-009',
    name: 'MarketWave Ad Campaign',
    description: 'Escrow for Q1 2026 digital marketing campaign',
    purpose: 'Secure $90K for performance-based advertising campaign',
    type: 'CONDITIONAL_PAYMENT',
    state: 'AUTHORIZED',
    currency: 'USD',
    totalAmount: 90000,
    fundedAmount: 90000,
    releasedAmount: 0,
    remainingAmount: 90000,
    custodian: {
      id: 'part-9-1',
      userId: 'user-custodian-ecommerce',
      businessName: 'ShopNow E-commerce',
      email: 'marketing@shopnow.com',
      role: 'CUSTODIAN',
      invitedAt: '2026-01-08T09:00:00Z',
      acceptedAt: '2026-01-08T09:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-9-2',
      userId: 'user-beneficiary-marketwave',
      businessName: 'MarketWave Digital',
      email: 'accounts@marketwave.digital',
      role: 'BENEFICIARY',
      invitedAt: '2026-01-08T10:00:00Z',
      acceptedAt: '2026-01-08T14:00:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [],
    conditions: [
      {
        id: 'cond-9-1',
        type: 'MILESTONE_MET',
        description: 'Campaign achieves minimum 500K impressions',
        required: true,
        status: 'MET',
        metAt: '2026-01-21T16:00:00Z',
        verifiedBy: 'user-beneficiary-marketwave'
      },
      {
        id: 'cond-9-2',
        type: 'DOCUMENT_UPLOAD',
        description: 'Submit campaign performance analytics report',
        required: true,
        status: 'MET',
        metAt: '2026-01-21T16:30:00Z',
        verifiedBy: 'user-beneficiary-marketwave'
      }
    ],
    requiresAllConditions: true,
    fundRequests: [
      {
        id: 'req-9-1',
        escrowId: 'escrow-9',
        requestedBy: 'user-beneficiary-marketwave',
        requestedByName: 'Nicole Turner',
        requestedByRole: 'BENEFICIARY',
        amount: 90000,
        currency: 'USD',
        reason: 'Campaign Performance Targets Met',
        description: 'Q1 campaign exceeded targets: 750K impressions, 2.4% CTR, $0.12 CPC. All KPIs achieved.',
        documents: [
          {
            id: 'doc-9-1',
            type: 'MILESTONE_EVIDENCE',
            name: 'Q1_Campaign_Analytics.pdf',
            url: '/mock/docs/campaign-analytics.pdf',
            uploadedBy: 'user-beneficiary-marketwave',
            uploadedByName: 'Nicole Turner',
            uploadedAt: '2026-01-21T16:30:00Z',
            fileSize: 3456000,
            mimeType: 'application/pdf',
            requiresSignature: false,
            signatures: [],
            status: 'PENDING'
          },
          {
            id: 'doc-9-2',
            type: 'CONTRACT',
            name: 'Payment_Authorization_Form.pdf',
            description: 'Final authorization for campaign payment',
            url: '/mock/docs/payment-auth.pdf',
            uploadedBy: 'user-custodian-ecommerce',
            uploadedByName: 'Brandon Wells',
            uploadedAt: '2026-01-21T18:00:00Z',
            fileSize: 456000,
            mimeType: 'application/pdf',
            requiresSignature: true,
            signatures: [
              {
                id: 'sig-9-1',
                documentId: 'doc-9-2',
                signedBy: 'user-custodian-ecommerce',
                signedByName: 'Brandon Wells',
                signedByRole: 'CUSTODIAN',
                signedAt: '2026-01-21T18:15:00Z',
                ipAddress: '192.168.20.100',
                signatureType: 'ELECTRONIC',
                signatureData: 'mock-signature-shopnow'
              },
              {
                id: 'sig-9-2',
                documentId: 'doc-9-2',
                signedBy: 'user-beneficiary-marketwave',
                signedByName: 'Nicole Turner',
                signedByRole: 'BENEFICIARY',
                signedAt: '2026-01-21T18:45:00Z',
                ipAddress: '192.168.30.50',
                signatureType: 'ELECTRONIC',
                signatureData: 'mock-signature-marketwave'
              }
            ],
            status: 'SIGNED'
          }
        ],
        requestedAt: '2026-01-21T17:00:00Z',
        status: 'APPROVED',
        reviewers: [],
        approvedAt: '2026-01-21T17:30:00Z',
        approvedBy: ['user-custodian-ecommerce']
      }
    ],
    documents: [],
    createdAt: '2026-01-08T09:00:00Z',
    fundedAt: '2026-01-10T11:00:00Z',
    firstRequestAt: '2026-01-21T17:00:00Z',
    lastActivityAt: '2026-01-21T18:45:00Z',
    activities: [
      {
        id: 'act-9-1',
        escrowId: 'escrow-9',
        timestamp: '2026-01-08T09:00:00Z',
        actorId: 'user-custodian-ecommerce',
        actorName: 'Brandon Wells',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for MarketWave Ad Campaign',
        newState: 'CREATED'
      },
      {
        id: 'act-9-2',
        escrowId: 'escrow-9',
        timestamp: '2026-01-10T11:00:00Z',
        actorId: 'user-custodian-ecommerce',
        actorName: 'Brandon Wells',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $90,000.00',
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      },
      {
        id: 'act-9-3',
        escrowId: 'escrow-9',
        timestamp: '2026-01-21T17:00:00Z',
        actorId: 'user-beneficiary-marketwave',
        actorName: 'Nicole Turner',
        actorRole: 'BENEFICIARY',
        action: 'REQUESTED_FUNDS',
        description: 'Requested $90,000.00 for campaign completion',
        previousState: 'FUNDED',
        newState: 'REQUESTED'
      },
      {
        id: 'act-9-4',
        escrowId: 'escrow-9',
        timestamp: '2026-01-21T17:30:00Z',
        actorId: 'user-custodian-ecommerce',
        actorName: 'Brandon Wells',
        actorRole: 'CUSTODIAN',
        action: 'APPROVED_REQUEST',
        description: 'Approved fund request',
        previousState: 'REQUESTED',
        newState: 'APPROVED_FOR_RELEASE'
      },
      {
        id: 'act-9-5',
        escrowId: 'escrow-9',
        timestamp: '2026-01-21T18:45:00Z',
        actorId: 'user-beneficiary-marketwave',
        actorName: 'Nicole Turner',
        actorRole: 'BENEFICIARY',
        action: 'SIGNED_DOCUMENT',
        description: 'All parties signed authorization - ready for release',
        previousState: 'AWAITING_SIGNATURES',
        newState: 'AUTHORIZED'
      }
    ],
    notifications: [
      {
        id: 'notif-9-1',
        escrowId: 'escrow-9',
        recipientId: 'user-custodian-ecommerce',
        recipientEmail: 'marketing@shopnow.com',
        type: 'REQUEST_APPROVED',
        subject: 'All signatures collected - ready to release funds',
        message: 'The $90,000 payment is authorized and ready for release to MarketWave Digital.',
        sentAt: '2026-01-21T18:45:00Z',
        actionUrl: '/escrow/escrow-9/release',
        priority: 'URGENT'
      }
    ],
    settings: {
      allowPartialReleases: false,
      requireUnanimousApproval: false,
      minimumStakeholders: 0,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['marketing', 'advertising', 'digital'],
    updatedAt: '2026-01-21T18:45:00Z'
  },

  // ========================================================================
  // 10. RELEASED STATE - Funds released, can still do partial releases
  // ========================================================================
  {
    id: 'escrow-10',
    escrowId: 'ESC-2025-045',
    name: 'EduTech Platform Development',
    description: 'Multi-milestone escrow for educational platform build',
    purpose: 'Secure $300K for custom LMS development (3 milestones)',
    type: 'PROJECT_MILESTONE',
    state: 'RELEASED',
    currency: 'USD',
    totalAmount: 300000,
    fundedAmount: 300000,
    releasedAmount: 100000,
    remainingAmount: 200000,
    custodian: {
      id: 'part-10-1',
      userId: 'user-custodian-university',
      businessName: 'State University System',
      email: 'procurement@stateuniv.edu',
      role: 'CUSTODIAN',
      invitedAt: '2025-11-01T08:00:00Z',
      acceptedAt: '2025-11-01T08:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-10-2',
      userId: 'user-beneficiary-edutech',
      businessName: 'EduTech Innovations Inc.',
      email: 'billing@edutech.io',
      role: 'BENEFICIARY',
      invitedAt: '2025-11-01T09:00:00Z',
      acceptedAt: '2025-11-01T15:00:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [
      {
        id: 'part-10-3',
        userId: 'user-stakeholder-it-director',
        businessName: 'University IT Department',
        email: 'it.director@stateuniv.edu',
        role: 'STAKEHOLDER',
        invitedAt: '2025-11-02T08:00:00Z',
        acceptedAt: '2025-11-02T10:00:00Z',
        status: 'ACCEPTED',
        permissions: stakeholderPermissions
      }
    ],
    conditions: [
      {
        id: 'cond-10-1',
        type: 'MILESTONE_MET',
        description: 'Milestone 1: Core platform architecture',
        required: true,
        status: 'MET',
        metAt: '2026-01-10T12:00:00Z',
        verifiedBy: 'user-stakeholder-it-director'
      }
    ],
    requiresAllConditions: false,
    fundRequests: [
      {
        id: 'req-10-1',
        escrowId: 'escrow-10',
        requestedBy: 'user-beneficiary-edutech',
        requestedByName: 'Jennifer Adams',
        requestedByRole: 'BENEFICIARY',
        amount: 100000,
        currency: 'USD',
        reason: 'Milestone 1 Complete: Platform Architecture',
        description: 'Core LMS platform architecture completed: authentication, course management, student portal, and admin dashboard.',
        documents: [
          {
            id: 'doc-10-1',
            type: 'MILESTONE_EVIDENCE',
            name: 'Milestone_1_Delivery_Report.pdf',
            url: '/mock/docs/milestone1-edutech.pdf',
            uploadedBy: 'user-beneficiary-edutech',
            uploadedByName: 'Jennifer Adams',
            uploadedAt: '2026-01-10T12:00:00Z',
            fileSize: 6789000,
            mimeType: 'application/pdf',
            requiresSignature: false,
            signatures: [],
            status: 'PENDING'
          }
        ],
        requestedAt: '2026-01-10T13:00:00Z',
        status: 'RELEASED',
        reviewers: [
          {
            userId: 'user-stakeholder-it-director',
            name: 'Dr. Raymond Cooper',
            role: 'STAKEHOLDER',
            reviewedAt: '2026-01-12T10:00:00Z',
            decision: 'APPROVED',
            comments: 'Platform meets all technical requirements. Excellent work.'
          }
        ],
        approvedAt: '2026-01-12T10:00:00Z',
        approvedBy: ['user-stakeholder-it-director', 'user-custodian-university'],
        releasedAt: '2026-01-13T14:30:00Z',
        transactionId: 'txn-release-edutech-001'
      }
    ],
    documents: [],
    createdAt: '2025-11-01T08:00:00Z',
    fundedAt: '2025-11-05T10:00:00Z',
    firstRequestAt: '2026-01-10T13:00:00Z',
    lastActivityAt: '2026-01-13T14:30:00Z',
    activities: [
      {
        id: 'act-10-1',
        escrowId: 'escrow-10',
        timestamp: '2025-11-01T08:00:00Z',
        actorId: 'user-custodian-university',
        actorName: 'Dr. Helen Mitchell',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for EduTech Platform Development',
        newState: 'CREATED'
      },
      {
        id: 'act-10-2',
        escrowId: 'escrow-10',
        timestamp: '2025-11-05T10:00:00Z',
        actorId: 'user-custodian-university',
        actorName: 'Dr. Helen Mitchell',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $300,000.00',
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      },
      {
        id: 'act-10-3',
        escrowId: 'escrow-10',
        timestamp: '2026-01-10T13:00:00Z',
        actorId: 'user-beneficiary-edutech',
        actorName: 'Jennifer Adams',
        actorRole: 'BENEFICIARY',
        action: 'REQUESTED_FUNDS',
        description: 'Requested $100,000.00 for Milestone 1',
        previousState: 'FUNDED',
        newState: 'REQUESTED'
      },
      {
        id: 'act-10-4',
        escrowId: 'escrow-10',
        timestamp: '2026-01-12T10:00:00Z',
        actorId: 'user-stakeholder-it-director',
        actorName: 'Dr. Raymond Cooper',
        actorRole: 'STAKEHOLDER',
        action: 'APPROVED_REQUEST',
        description: 'Approved Milestone 1 payment',
        previousState: 'UNDER_REVIEW',
        newState: 'APPROVED_FOR_RELEASE'
      },
      {
        id: 'act-10-5',
        escrowId: 'escrow-10',
        timestamp: '2026-01-13T14:30:00Z',
        actorId: 'user-custodian-university',
        actorName: 'Dr. Helen Mitchell',
        actorRole: 'CUSTODIAN',
        action: 'RELEASED_FUNDS',
        description: 'Released $100,000.00 to EduTech Innovations (1 of 3 milestones)',
        metadata: {
          amount: 100000,
          transactionId: 'txn-release-edutech-001',
          milestone: 1,
          remainingAmount: 200000
        },
        previousState: 'AUTHORIZED',
        newState: 'RELEASED'
      },
      {
        id: 'act-10-6',
        escrowId: 'escrow-10',
        timestamp: '2026-01-13T14:35:00Z',
        actorId: 'user-custodian-university',
        actorName: 'Dr. Helen Mitchell',
        actorRole: 'CUSTODIAN',
        action: 'STATE_CHANGED',
        description: 'Returned to FUNDED state for remaining milestones',
        previousState: 'RELEASED',
        newState: 'FUNDED'
      }
    ],
    notifications: [],
    settings: {
      allowPartialReleases: true,
      requireUnanimousApproval: true,
      minimumStakeholders: 1,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['education', 'platform', 'milestone', 'lms'],
    updatedAt: '2026-01-13T14:35:00Z'
  },

  // ========================================================================
  // 11. CLOSED STATE - Successfully completed escrow
  // ========================================================================
  {
    id: 'escrow-11',
    escrowId: 'ESC-2025-032',
    name: 'GlobalTrade Import Agreement',
    description: 'Escrow for international equipment import',
    purpose: 'Secure $125K payment for manufacturing equipment import',
    type: 'BUSINESS_TRANSACTION',
    state: 'CLOSED',
    currency: 'USD',
    totalAmount: 125000,
    fundedAmount: 125000,
    releasedAmount: 125000,
    remainingAmount: 0,
    custodian: {
      id: 'part-11-1',
      userId: 'user-custodian-manufacturing',
      businessName: 'PrecisionMFG Industries',
      email: 'finance@precisionmfg.com',
      role: 'CUSTODIAN',
      invitedAt: '2025-10-15T08:00:00Z',
      acceptedAt: '2025-10-15T08:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-11-2',
      userId: 'user-beneficiary-globaltrade',
      businessName: 'GlobalTrade Equipment Co.',
      email: 'exports@globaltrade.com',
      role: 'BENEFICIARY',
      invitedAt: '2025-10-15T09:00:00Z',
      acceptedAt: '2025-10-15T16:00:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [
      {
        id: 'part-11-3',
        userId: 'user-stakeholder-customs',
        businessName: 'Import Compliance Advisors',
        email: 'compliance@importadvisors.com',
        role: 'STAKEHOLDER',
        invitedAt: '2025-10-16T08:00:00Z',
        acceptedAt: '2025-10-16T10:00:00Z',
        status: 'ACCEPTED',
        permissions: stakeholderPermissions
      }
    ],
    conditions: [
      {
        id: 'cond-11-1',
        type: 'DOCUMENT_UPLOAD',
        description: 'Customs clearance and import permits',
        required: true,
        status: 'MET',
        metAt: '2025-12-20T14:00:00Z',
        verifiedBy: 'user-stakeholder-customs'
      },
      {
        id: 'cond-11-2',
        type: 'MILESTONE_MET',
        description: 'Equipment delivered and installed',
        required: true,
        status: 'MET',
        metAt: '2025-12-22T16:00:00Z',
        verifiedBy: 'user-custodian-manufacturing'
      }
    ],
    requiresAllConditions: true,
    fundRequests: [
      {
        id: 'req-11-1',
        escrowId: 'escrow-11',
        requestedBy: 'user-beneficiary-globaltrade',
        requestedByName: 'Yuki Tanaka',
        requestedByRole: 'BENEFICIARY',
        amount: 125000,
        currency: 'USD',
        reason: 'Equipment Delivered and Operational',
        description: 'All manufacturing equipment successfully imported, installed, and tested. All customs documentation complete.',
        documents: [
          {
            id: 'doc-11-1',
            type: 'MILESTONE_EVIDENCE',
            name: 'Installation_Completion_Certificate.pdf',
            url: '/mock/docs/installation-cert.pdf',
            uploadedBy: 'user-beneficiary-globaltrade',
            uploadedByName: 'Yuki Tanaka',
            uploadedAt: '2025-12-22T16:00:00Z',
            fileSize: 2345000,
            mimeType: 'application/pdf',
            requiresSignature: false,
            signatures: [],
            status: 'SIGNED'
          }
        ],
        requestedAt: '2025-12-23T09:00:00Z',
        status: 'RELEASED',
        reviewers: [
          {
            userId: 'user-stakeholder-customs',
            name: 'Sandra Ramirez',
            role: 'STAKEHOLDER',
            reviewedAt: '2025-12-24T10:00:00Z',
            decision: 'APPROVED',
            comments: 'All import documentation verified and compliant.'
          }
        ],
        approvedAt: '2025-12-24T10:00:00Z',
        approvedBy: ['user-stakeholder-customs', 'user-custodian-manufacturing'],
        releasedAt: '2025-12-26T11:00:00Z',
        transactionId: 'txn-release-globaltrade-001'
      }
    ],
    documents: [],
    createdAt: '2025-10-15T08:00:00Z',
    fundedAt: '2025-10-20T10:00:00Z',
    firstRequestAt: '2025-12-23T09:00:00Z',
    completedAt: '2025-12-26T11:30:00Z',
    lastActivityAt: '2025-12-26T11:30:00Z',
    activities: [
      {
        id: 'act-11-1',
        escrowId: 'escrow-11',
        timestamp: '2025-10-15T08:00:00Z',
        actorId: 'user-custodian-manufacturing',
        actorName: 'Gerald Brooks',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for GlobalTrade Import Agreement',
        newState: 'CREATED'
      },
      {
        id: 'act-11-2',
        escrowId: 'escrow-11',
        timestamp: '2025-10-20T10:00:00Z',
        actorId: 'user-custodian-manufacturing',
        actorName: 'Gerald Brooks',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $125,000.00',
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      },
      {
        id: 'act-11-3',
        escrowId: 'escrow-11',
        timestamp: '2025-12-23T09:00:00Z',
        actorId: 'user-beneficiary-globaltrade',
        actorName: 'Yuki Tanaka',
        actorRole: 'BENEFICIARY',
        action: 'REQUESTED_FUNDS',
        description: 'Requested $125,000.00 for equipment delivery',
        previousState: 'FUNDED',
        newState: 'REQUESTED'
      },
      {
        id: 'act-11-4',
        escrowId: 'escrow-11',
        timestamp: '2025-12-24T10:00:00Z',
        actorId: 'user-stakeholder-customs',
        actorName: 'Sandra Ramirez',
        actorRole: 'STAKEHOLDER',
        action: 'APPROVED_REQUEST',
        description: 'Approved fund request - all conditions verified',
        previousState: 'UNDER_REVIEW',
        newState: 'APPROVED_FOR_RELEASE'
      },
      {
        id: 'act-11-5',
        escrowId: 'escrow-11',
        timestamp: '2025-12-26T11:00:00Z',
        actorId: 'user-custodian-manufacturing',
        actorName: 'Gerald Brooks',
        actorRole: 'CUSTODIAN',
        action: 'RELEASED_FUNDS',
        description: 'Released $125,000.00 to GlobalTrade Equipment Co.',
        metadata: {
          amount: 125000,
          transactionId: 'txn-release-globaltrade-001'
        },
        previousState: 'AUTHORIZED',
        newState: 'RELEASED'
      },
      {
        id: 'act-11-6',
        escrowId: 'escrow-11',
        timestamp: '2025-12-26T11:30:00Z',
        actorId: 'user-custodian-manufacturing',
        actorName: 'Gerald Brooks',
        actorRole: 'CUSTODIAN',
        action: 'CLOSED',
        description: 'Escrow successfully completed - all funds released',
        previousState: 'RELEASED',
        newState: 'CLOSED'
      }
    ],
    notifications: [],
    settings: {
      allowPartialReleases: false,
      requireUnanimousApproval: true,
      minimumStakeholders: 1,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['import', 'manufacturing', 'equipment', 'completed'],
    updatedAt: '2025-12-26T11:30:00Z'
  },

  // ========================================================================
  // 12. DISPUTED STATE - Dispute raised during process
  // ========================================================================
  {
    id: 'escrow-12',
    escrowId: 'ESC-2026-010',
    name: 'WebDev Pro Custom Portal',
    description: 'Escrow for custom client portal development',
    purpose: 'Secure $65K for enterprise portal build',
    type: 'PROJECT_MILESTONE',
    state: 'DISPUTED',
    currency: 'USD',
    totalAmount: 65000,
    fundedAmount: 65000,
    releasedAmount: 0,
    remainingAmount: 65000,
    custodian: {
      id: 'part-12-1',
      userId: 'user-custodian-consulting',
      businessName: 'Enterprise Consulting Group',
      email: 'payments@ecg.com',
      role: 'CUSTODIAN',
      invitedAt: '2026-01-12T08:00:00Z',
      acceptedAt: '2026-01-12T08:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-12-2',
      userId: 'user-beneficiary-webdevpro',
      businessName: 'WebDev Pro Studios',
      email: 'contracts@webdevpro.com',
      role: 'BENEFICIARY',
      invitedAt: '2026-01-12T09:00:00Z',
      acceptedAt: '2026-01-12T14:00:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [
      {
        id: 'part-12-3',
        userId: 'user-stakeholder-technical-lead',
        businessName: 'ECG Technical Team',
        email: 'tech.lead@ecg.com',
        role: 'STAKEHOLDER',
        invitedAt: '2026-01-13T08:00:00Z',
        acceptedAt: '2026-01-13T09:00:00Z',
        status: 'ACCEPTED',
        permissions: stakeholderPermissions
      }
    ],
    conditions: [
      {
        id: 'cond-12-1',
        type: 'MILESTONE_MET',
        description: 'Portal functional with all specified features',
        required: true,
        status: 'FAILED'
      },
      {
        id: 'cond-12-2',
        type: 'DOCUMENT_UPLOAD',
        description: 'User acceptance testing sign-off',
        required: true,
        status: 'PENDING'
      }
    ],
    requiresAllConditions: true,
    fundRequests: [
      {
        id: 'req-12-1',
        escrowId: 'escrow-12',
        requestedBy: 'user-beneficiary-webdevpro',
        requestedByName: 'Derek Hansen',
        requestedByRole: 'BENEFICIARY',
        amount: 65000,
        currency: 'USD',
        reason: 'Portal Development Complete',
        description: 'Custom portal delivered with all requested features implemented.',
        documents: [
          {
            id: 'doc-12-1',
            type: 'PROOF_OF_WORK',
            name: 'Portal_Demo_Video.mp4',
            url: '/mock/docs/portal-demo.mp4',
            uploadedBy: 'user-beneficiary-webdevpro',
            uploadedByName: 'Derek Hansen',
            uploadedAt: '2026-01-20T10:00:00Z',
            fileSize: 25678000,
            mimeType: 'video/mp4',
            requiresSignature: false,
            signatures: [],
            status: 'PENDING'
          }
        ],
        requestedAt: '2026-01-20T11:00:00Z',
        status: 'REJECTED',
        reviewers: [
          {
            userId: 'user-stakeholder-technical-lead',
            name: 'Samuel Park',
            role: 'STAKEHOLDER',
            reviewedAt: '2026-01-21T14:00:00Z',
            decision: 'REJECTED',
            comments: 'Portal is missing critical features: SSO integration, advanced search, and real-time notifications. Does not meet acceptance criteria.'
          }
        ],
        rejectedAt: '2026-01-21T14:00:00Z',
        rejectedBy: 'user-stakeholder-technical-lead',
        rejectionReason: 'Deliverable does not meet contract specifications. Missing 3 of 8 required features.'
      }
    ],
    documents: [],
    createdAt: '2026-01-12T08:00:00Z',
    fundedAt: '2026-01-14T10:00:00Z',
    firstRequestAt: '2026-01-20T11:00:00Z',
    lastActivityAt: '2026-01-21T16:00:00Z',
    activities: [
      {
        id: 'act-12-1',
        escrowId: 'escrow-12',
        timestamp: '2026-01-12T08:00:00Z',
        actorId: 'user-custodian-consulting',
        actorName: 'Victoria Chen',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for WebDev Pro Custom Portal',
        newState: 'CREATED'
      },
      {
        id: 'act-12-2',
        escrowId: 'escrow-12',
        timestamp: '2026-01-14T10:00:00Z',
        actorId: 'user-custodian-consulting',
        actorName: 'Victoria Chen',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $65,000.00',
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      },
      {
        id: 'act-12-3',
        escrowId: 'escrow-12',
        timestamp: '2026-01-20T11:00:00Z',
        actorId: 'user-beneficiary-webdevpro',
        actorName: 'Derek Hansen',
        actorRole: 'BENEFICIARY',
        action: 'REQUESTED_FUNDS',
        description: 'Requested $65,000.00 for portal completion',
        previousState: 'FUNDED',
        newState: 'REQUESTED'
      },
      {
        id: 'act-12-4',
        escrowId: 'escrow-12',
        timestamp: '2026-01-21T14:00:00Z',
        actorId: 'user-stakeholder-technical-lead',
        actorName: 'Samuel Park',
        actorRole: 'STAKEHOLDER',
        action: 'REJECTED_REQUEST',
        description: 'Rejected fund request - deliverable incomplete',
        previousState: 'UNDER_REVIEW',
        newState: 'FUNDED'
      },
      {
        id: 'act-12-5',
        escrowId: 'escrow-12',
        timestamp: '2026-01-21T16:00:00Z',
        actorId: 'user-beneficiary-webdevpro',
        actorName: 'Derek Hansen',
        actorRole: 'BENEFICIARY',
        action: 'DISPUTED',
        description: 'Dispute raised: Beneficiary contests rejection, claims all features were implemented as per original spec',
        metadata: {
          disputeReason: 'Disagreement on feature completeness - scope interpretation differs'
        },
        previousState: 'FUNDED',
        newState: 'DISPUTED'
      }
    ],
    notifications: [
      {
        id: 'notif-12-1',
        escrowId: 'escrow-12',
        recipientId: 'user-custodian-consulting',
        recipientEmail: 'payments@ecg.com',
        type: 'DISPUTE_RAISED',
        subject: 'URGENT: Dispute raised on escrow',
        message: 'WebDev Pro Studios has raised a dispute regarding the rejected fund request. Mediation may be required.',
        sentAt: '2026-01-21T16:00:00Z',
        actionUrl: '/escrow/escrow-12',
        priority: 'URGENT'
      }
    ],
    settings: {
      allowPartialReleases: false,
      requireUnanimousApproval: true,
      minimumStakeholders: 1,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['web-development', 'portal', 'disputed'],
    internalNotes: 'Dispute in mediation. Mediator assigned: Jane Morrison (Dispute ID: DIS-2026-001). Next mediation session: Jan 25, 2026.',
    updatedAt: '2026-01-21T16:00:00Z'
  },

  // ========================================================================
  // 13. CANCELLED STATE - Escrow cancelled before completion
  // ========================================================================
  {
    id: 'escrow-13',
    escrowId: 'ESC-2026-011',
    name: 'CloudSync Integration Project',
    description: 'Escrow for third-party API integration',
    purpose: 'Secure $45K for CloudSync API integration',
    type: 'BUSINESS_TRANSACTION',
    state: 'CANCELLED',
    currency: 'USD',
    totalAmount: 45000,
    fundedAmount: 45000,
    releasedAmount: 0,
    remainingAmount: 0,
    custodian: {
      id: 'part-13-1',
      userId: 'user-custodian-saascompany',
      businessName: 'SaaS Innovators Inc.',
      email: 'dev@saasinnov.com',
      role: 'CUSTODIAN',
      invitedAt: '2026-01-16T08:00:00Z',
      acceptedAt: '2026-01-16T08:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-13-2',
      userId: 'user-beneficiary-apidev',
      businessName: 'API Development Partners',
      email: 'projects@apidevpartners.com',
      role: 'BENEFICIARY',
      invitedAt: '2026-01-16T09:00:00Z',
      acceptedAt: '2026-01-16T15:00:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [],
    conditions: [
      {
        id: 'cond-13-1',
        type: 'MILESTONE_MET',
        description: 'API integration functional in staging',
        required: true,
        status: 'PENDING'
      }
    ],
    requiresAllConditions: true,
    fundRequests: [],
    documents: [],
    createdAt: '2026-01-16T08:00:00Z',
    fundedAt: '2026-01-17T10:00:00Z',
    lastActivityAt: '2026-01-22T09:00:00Z',
    activities: [
      {
        id: 'act-13-1',
        escrowId: 'escrow-13',
        timestamp: '2026-01-16T08:00:00Z',
        actorId: 'user-custodian-saascompany',
        actorName: 'Laura Bennett',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for CloudSync Integration Project',
        newState: 'CREATED'
      },
      {
        id: 'act-13-2',
        escrowId: 'escrow-13',
        timestamp: '2026-01-17T10:00:00Z',
        actorId: 'user-custodian-saascompany',
        actorName: 'Laura Bennett',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $45,000.00',
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      },
      {
        id: 'act-13-3',
        escrowId: 'escrow-13',
        timestamp: '2026-01-22T09:00:00Z',
        actorId: 'user-custodian-saascompany',
        actorName: 'Laura Bennett',
        actorRole: 'CUSTODIAN',
        action: 'CANCELLED',
        description: 'Escrow cancelled by mutual agreement - CloudSync deprecated their API. Funds returned to custodian.',
        metadata: {
          cancellationReason: 'Third-party API discontinued, project no longer viable',
          fundsReturned: 45000,
          refundTransactionId: 'txn-refund-cloudsync-001'
        },
        previousState: 'FUNDED',
        newState: 'CANCELLED'
      }
    ],
    notifications: [
      {
        id: 'notif-13-1',
        escrowId: 'escrow-13',
        recipientId: 'user-beneficiary-apidev',
        recipientEmail: 'projects@apidevpartners.com',
        type: 'ESCROW_CLOSED',
        subject: 'Escrow cancelled - project terminated',
        message: 'The CloudSync Integration Project escrow has been cancelled due to API deprecation. No payment will be processed.',
        sentAt: '2026-01-22T09:05:00Z',
        actionUrl: '/escrow/escrow-13',
        priority: 'HIGH'
      }
    ],
    settings: {
      allowPartialReleases: false,
      requireUnanimousApproval: false,
      minimumStakeholders: 0,
      automaticNotifications: true,
      disputeResolutionProcess: 'MEDIATION'
    },
    tags: ['api', 'integration', 'cancelled'],
    internalNotes: 'Cancelled by mutual agreement. CloudSync deprecated their v2 API on Jan 20, 2026, making project impossible to complete.',
    updatedAt: '2026-01-22T09:00:00Z'
  },

  // ========================================================================
  // 14. MULTI_PARTY STATE - Complex escrow with multiple beneficiaries
  // ========================================================================
  {
    id: 'escrow-14',
    escrowId: 'ESC-2025-089',
    name: 'Joint Venture Office Renovation',
    description: 'Multi-party escrow for shared office space buildout',
    purpose: 'Secure $280K for joint office renovation (3 contractors)',
    type: 'MULTI_PARTY',
    state: 'FUNDED',
    currency: 'USD',
    totalAmount: 280000,
    fundedAmount: 280000,
    releasedAmount: 0,
    remainingAmount: 280000,
    custodian: {
      id: 'part-14-1',
      userId: 'user-custodian-realestate',
      businessName: 'Prime Real Estate Holdings',
      email: 'escrow@primerealestate.com',
      role: 'CUSTODIAN',
      invitedAt: '2025-12-01T08:00:00Z',
      acceptedAt: '2025-12-01T08:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-14-2',
      userId: 'user-beneficiary-contractor1',
      businessName: 'BuildMasters General Contracting',
      email: 'billing@buildmasters.com',
      role: 'BENEFICIARY',
      invitedAt: '2025-12-01T09:00:00Z',
      acceptedAt: '2025-12-01T15:00:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions,
      metadata: {
        contactPerson: 'Tony Russo',
        phone: '+1-555-0301'
      }
    },
    stakeholders: [
      {
        id: 'part-14-3',
        userId: 'user-stakeholder-contractor2',
        businessName: 'ElectroTech Systems',
        email: 'projects@electrotech.com',
        role: 'STAKEHOLDER',
        invitedAt: '2025-12-01T09:15:00Z',
        acceptedAt: '2025-12-01T16:00:00Z',
        status: 'ACCEPTED',
        permissions: {
          ...stakeholderPermissions,
          canRequestFunds: true
        },
        metadata: {
          contactPerson: 'Linda Zhang'
        }
      },
      {
        id: 'part-14-4',
        userId: 'user-stakeholder-contractor3',
        businessName: 'InteriorPro Design & Build',
        email: 'contracts@interiorpro.com',
        role: 'STAKEHOLDER',
        invitedAt: '2025-12-01T09:30:00Z',
        acceptedAt: '2025-12-02T10:00:00Z',
        status: 'ACCEPTED',
        permissions: {
          ...stakeholderPermissions,
          canRequestFunds: true
        },
        metadata: {
          contactPerson: 'Marcus Williams'
        }
      },
      {
        id: 'part-14-5',
        userId: 'user-stakeholder-architect',
        businessName: 'Urban Design Architects',
        email: 'oversight@urbandesignarch.com',
        role: 'STAKEHOLDER',
        invitedAt: '2025-12-02T08:00:00Z',
        acceptedAt: '2025-12-02T11:00:00Z',
        status: 'ACCEPTED',
        permissions: stakeholderPermissions,
        metadata: {
          contactPerson: 'Dr. Rachel Kim'
        }
      }
    ],
    conditions: [
      {
        id: 'cond-14-1',
        type: 'MILESTONE_MET',
        description: 'Phase 1: Structural work complete',
        required: true,
        status: 'PENDING'
      },
      {
        id: 'cond-14-2',
        type: 'MILESTONE_MET',
        description: 'Phase 2: Electrical and HVAC installation',
        required: true,
        status: 'PENDING'
      },
      {
        id: 'cond-14-3',
        type: 'MILESTONE_MET',
        description: 'Phase 3: Interior finishing',
        required: true,
        status: 'PENDING'
      }
    ],
    requiresAllConditions: false,
    fundRequests: [],
    documents: [
      {
        id: 'doc-14-1',
        type: 'CONTRACT',
        name: 'Master_Renovation_Agreement.pdf',
        url: '/mock/docs/renovation-master.pdf',
        uploadedBy: 'user-custodian-realestate',
        uploadedByName: 'Douglas Harper',
        uploadedAt: '2025-12-01T10:00:00Z',
        fileSize: 4567000,
        mimeType: 'application/pdf',
        requiresSignature: true,
        signatures: [
          {
            id: 'sig-14-1',
            documentId: 'doc-14-1',
            signedBy: 'user-custodian-realestate',
            signedByName: 'Douglas Harper',
            signedByRole: 'CUSTODIAN',
            signedAt: '2025-12-01T10:30:00Z',
            ipAddress: '192.168.40.10',
            signatureType: 'ELECTRONIC',
            signatureData: 'mock-signature-prime'
          },
          {
            id: 'sig-14-2',
            documentId: 'doc-14-1',
            signedBy: 'user-beneficiary-contractor1',
            signedByName: 'Tony Russo',
            signedByRole: 'BENEFICIARY',
            signedAt: '2025-12-01T15:30:00Z',
            ipAddress: '192.168.40.11',
            signatureType: 'ELECTRONIC',
            signatureData: 'mock-signature-buildmasters'
          }
        ],
        status: 'SIGNED'
      }
    ],
    createdAt: '2025-12-01T08:00:00Z',
    fundedAt: '2025-12-05T14:00:00Z',
    lastActivityAt: '2025-12-05T14:00:00Z',
    activities: [
      {
        id: 'act-14-1',
        escrowId: 'escrow-14',
        timestamp: '2025-12-01T08:00:00Z',
        actorId: 'user-custodian-realestate',
        actorName: 'Douglas Harper',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for Joint Venture Office Renovation',
        newState: 'CREATED'
      },
      {
        id: 'act-14-2',
        escrowId: 'escrow-14',
        timestamp: '2025-12-01T09:15:00Z',
        actorId: 'user-custodian-realestate',
        actorName: 'Douglas Harper',
        actorRole: 'CUSTODIAN',
        action: 'STAKEHOLDER_ADDED',
        description: 'Added ElectroTech Systems as stakeholder contractor'
      },
      {
        id: 'act-14-3',
        escrowId: 'escrow-14',
        timestamp: '2025-12-01T09:30:00Z',
        actorId: 'user-custodian-realestate',
        actorName: 'Douglas Harper',
        actorRole: 'CUSTODIAN',
        action: 'STAKEHOLDER_ADDED',
        description: 'Added InteriorPro Design & Build as stakeholder contractor'
      },
      {
        id: 'act-14-4',
        escrowId: 'escrow-14',
        timestamp: '2025-12-02T08:00:00Z',
        actorId: 'user-custodian-realestate',
        actorName: 'Douglas Harper',
        actorRole: 'CUSTODIAN',
        action: 'STAKEHOLDER_ADDED',
        description: 'Added Urban Design Architects as oversight stakeholder'
      },
      {
        id: 'act-14-5',
        escrowId: 'escrow-14',
        timestamp: '2025-12-05T14:00:00Z',
        actorId: 'user-custodian-realestate',
        actorName: 'Douglas Harper',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $280,000.00 for multi-phase renovation',
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      }
    ],
    notifications: [],
    settings: {
      allowPartialReleases: true,
      requireUnanimousApproval: true,
      minimumStakeholders: 3,
      automaticNotifications: true,
      disputeResolutionProcess: 'ARBITRATION'
    },
    tags: ['renovation', 'multi-party', 'construction', 'office'],
    internalNotes: 'Three-phase project with staggered releases: $120K (BuildMasters), $85K (ElectroTech), $75K (InteriorPro)',
    updatedAt: '2025-12-05T14:00:00Z'
  },

  // ========================================================================
  // 15. COMPLEX PARTIAL RELEASE - Showing ongoing milestone releases
  // ========================================================================
  {
    id: 'escrow-15',
    escrowId: 'ESC-2025-078',
    name: 'DataMigration Enterprise Project',
    description: 'Large-scale data migration with 5 milestones',
    purpose: 'Secure $500K for enterprise data migration (5 phases)',
    type: 'PROJECT_MILESTONE',
    state: 'FUNDED',
    currency: 'USD',
    totalAmount: 500000,
    fundedAmount: 500000,
    releasedAmount: 300000,
    remainingAmount: 200000,
    custodian: {
      id: 'part-15-1',
      userId: 'user-custodian-banking',
      businessName: 'National Banking Corp',
      email: 'it.finance@nationalbank.com',
      role: 'CUSTODIAN',
      invitedAt: '2025-09-01T08:00:00Z',
      acceptedAt: '2025-09-01T08:00:00Z',
      status: 'ACCEPTED',
      permissions: custodianPermissions
    },
    beneficiary: {
      id: 'part-15-2',
      userId: 'user-beneficiary-datasys',
      businessName: 'DataSystems Migration Experts',
      email: 'enterprise@datasystems.io',
      role: 'BENEFICIARY',
      invitedAt: '2025-09-01T09:00:00Z',
      acceptedAt: '2025-09-01T16:00:00Z',
      status: 'ACCEPTED',
      permissions: beneficiaryPermissions
    },
    stakeholders: [
      {
        id: 'part-15-3',
        userId: 'user-stakeholder-bank-cio',
        businessName: 'National Bank CIO Office',
        email: 'cio@nationalbank.com',
        role: 'STAKEHOLDER',
        invitedAt: '2025-09-02T08:00:00Z',
        acceptedAt: '2025-09-02T10:00:00Z',
        status: 'ACCEPTED',
        permissions: stakeholderPermissions
      },
      {
        id: 'part-15-4',
        userId: 'user-stakeholder-bank-security',
        businessName: 'National Bank Security',
        email: 'infosec@nationalbank.com',
        role: 'STAKEHOLDER',
        invitedAt: '2025-09-02T08:15:00Z',
        acceptedAt: '2025-09-02T11:00:00Z',
        status: 'ACCEPTED',
        permissions: stakeholderPermissions
      }
    ],
    conditions: [
      {
        id: 'cond-15-1',
        type: 'MILESTONE_MET',
        description: 'Phase 1: Customer data migration (20%)',
        required: true,
        status: 'MET',
        metAt: '2025-10-15T12:00:00Z',
        verifiedBy: 'user-stakeholder-bank-cio'
      },
      {
        id: 'cond-15-2',
        type: 'MILESTONE_MET',
        description: 'Phase 2: Transaction history migration (40%)',
        required: true,
        status: 'MET',
        metAt: '2025-11-20T14:00:00Z',
        verifiedBy: 'user-stakeholder-bank-cio'
      },
      {
        id: 'cond-15-3',
        type: 'MILESTONE_MET',
        description: 'Phase 3: Account reconciliation (60%)',
        required: true,
        status: 'MET',
        metAt: '2025-12-18T16:00:00Z',
        verifiedBy: 'user-stakeholder-bank-security'
      },
      {
        id: 'cond-15-4',
        type: 'MILESTONE_MET',
        description: 'Phase 4: Compliance data validation (80%)',
        required: true,
        status: 'PENDING'
      },
      {
        id: 'cond-15-5',
        type: 'MILESTONE_MET',
        description: 'Phase 5: Final cutover and verification (100%)',
        required: true,
        status: 'PENDING'
      }
    ],
    requiresAllConditions: false,
    fundRequests: [
      {
        id: 'req-15-1',
        escrowId: 'escrow-15',
        requestedBy: 'user-beneficiary-datasys',
        requestedByName: 'Dr. Samantha Lee',
        requestedByRole: 'BENEFICIARY',
        amount: 100000,
        currency: 'USD',
        reason: 'Phase 1 Complete: Customer Data Migration',
        description: 'Successfully migrated 2.5M customer records with 99.97% accuracy.',
        documents: [],
        requestedAt: '2025-10-16T09:00:00Z',
        status: 'RELEASED',
        reviewers: [],
        approvedAt: '2025-10-17T10:00:00Z',
        approvedBy: ['user-stakeholder-bank-cio'],
        releasedAt: '2025-10-18T11:00:00Z',
        transactionId: 'txn-datamigration-phase1'
      },
      {
        id: 'req-15-2',
        escrowId: 'escrow-15',
        requestedBy: 'user-beneficiary-datasys',
        requestedByName: 'Dr. Samantha Lee',
        requestedByRole: 'BENEFICIARY',
        amount: 100000,
        currency: 'USD',
        reason: 'Phase 2 Complete: Transaction History Migration',
        description: 'Migrated 500M transaction records spanning 10 years.',
        documents: [],
        requestedAt: '2025-11-21T09:00:00Z',
        status: 'RELEASED',
        reviewers: [],
        approvedAt: '2025-11-22T10:00:00Z',
        approvedBy: ['user-stakeholder-bank-cio', 'user-stakeholder-bank-security'],
        releasedAt: '2025-11-23T11:00:00Z',
        transactionId: 'txn-datamigration-phase2'
      },
      {
        id: 'req-15-3',
        escrowId: 'escrow-15',
        requestedBy: 'user-beneficiary-datasys',
        requestedByName: 'Dr. Samantha Lee',
        requestedByRole: 'BENEFICIARY',
        amount: 100000,
        currency: 'USD',
        reason: 'Phase 3 Complete: Account Reconciliation',
        description: 'All accounts balanced and verified. Zero discrepancies.',
        documents: [],
        requestedAt: '2025-12-19T09:00:00Z',
        status: 'RELEASED',
        reviewers: [],
        approvedAt: '2025-12-20T10:00:00Z',
        approvedBy: ['user-stakeholder-bank-security'],
        releasedAt: '2025-12-21T11:00:00Z',
        transactionId: 'txn-datamigration-phase3'
      }
    ],
    documents: [],
    createdAt: '2025-09-01T08:00:00Z',
    fundedAt: '2025-09-10T10:00:00Z',
    firstRequestAt: '2025-10-16T09:00:00Z',
    lastActivityAt: '2025-12-21T11:00:00Z',
    activities: [
      {
        id: 'act-15-1',
        escrowId: 'escrow-15',
        timestamp: '2025-09-01T08:00:00Z',
        actorId: 'user-custodian-banking',
        actorName: 'Elizabeth Morgan',
        actorRole: 'CUSTODIAN',
        action: 'CREATED',
        description: 'Created escrow for DataMigration Enterprise Project',
        newState: 'CREATED'
      },
      {
        id: 'act-15-2',
        escrowId: 'escrow-15',
        timestamp: '2025-09-10T10:00:00Z',
        actorId: 'user-custodian-banking',
        actorName: 'Elizabeth Morgan',
        actorRole: 'CUSTODIAN',
        action: 'FUNDED',
        description: 'Funded escrow with $500,000.00 for 5-phase migration',
        previousState: 'ACCEPTED',
        newState: 'FUNDED'
      },
      {
        id: 'act-15-3',
        escrowId: 'escrow-15',
        timestamp: '2025-10-18T11:00:00Z',
        actorId: 'user-custodian-banking',
        actorName: 'Elizabeth Morgan',
        actorRole: 'CUSTODIAN',
        action: 'RELEASED_FUNDS',
        description: 'Released $100,000.00 for Phase 1 (1 of 5)',
        metadata: {
          amount: 100000,
          phase: 1,
          transactionId: 'txn-datamigration-phase1'
        },
        newState: 'FUNDED'
      },
      {
        id: 'act-15-4',
        escrowId: 'escrow-15',
        timestamp: '2025-11-23T11:00:00Z',
        actorId: 'user-custodian-banking',
        actorName: 'Elizabeth Morgan',
        actorRole: 'CUSTODIAN',
        action: 'RELEASED_FUNDS',
        description: 'Released $100,000.00 for Phase 2 (2 of 5)',
        metadata: {
          amount: 100000,
          phase: 2,
          transactionId: 'txn-datamigration-phase2'
        },
        newState: 'FUNDED'
      },
      {
        id: 'act-15-5',
        escrowId: 'escrow-15',
        timestamp: '2025-12-21T11:00:00Z',
        actorId: 'user-custodian-banking',
        actorName: 'Elizabeth Morgan',
        actorRole: 'CUSTODIAN',
        action: 'RELEASED_FUNDS',
        description: 'Released $100,000.00 for Phase 3 (3 of 5) - $200K remaining',
        metadata: {
          amount: 100000,
          phase: 3,
          transactionId: 'txn-datamigration-phase3',
          remainingAmount: 200000
        },
        newState: 'FUNDED'
      }
    ],
    notifications: [],
    settings: {
      allowPartialReleases: true,
      requireUnanimousApproval: true,
      minimumStakeholders: 2,
      automaticNotifications: true,
      disputeResolutionProcess: 'ARBITRATION'
    },
    tags: ['data-migration', 'banking', 'enterprise', 'milestone', 'multi-phase'],
    internalNotes: '5-phase project: $100K per milestone. 3 of 5 phases complete. Phases 4 and 5 in progress.',
    updatedAt: '2025-12-21T11:00:00Z'
  }
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get escrow by ID
 */
export function getEscrowById(id: string): Escrow | undefined {
  return mockEscrows.find(e => e.id === id || e.escrowId === id)
}

/**
 * Get all escrows
 */
export function getAllEscrows(): Escrow[] {
  return mockEscrows
}

/**
 * Get escrows by state
 */
export function getEscrowsByState(state: EscrowState): Escrow[] {
  return mockEscrows.filter(e => e.state === state)
}

/**
 * Get escrows where user has specific role
 */
export function getEscrowsByRole(userId: string, role: EscrowRole): Escrow[] {
  return mockEscrows.filter(escrow => {
    if (role === 'CUSTODIAN' && escrow.custodian.userId === userId) return true
    if (role === 'BENEFICIARY' && escrow.beneficiary.userId === userId) return true
    if (role === 'STAKEHOLDER' && escrow.stakeholders.some(s => s.userId === userId)) return true
    return false
  })
}

/**
 * Get all escrows for a user (any role)
 */
export function getUserEscrows(userId: string): Escrow[] {
  return mockEscrows.filter(escrow =>
    escrow.custodian.userId === userId ||
    escrow.beneficiary.userId === userId ||
    escrow.stakeholders.some(s => s.userId === userId)
  )
}

/**
 * Get user's role in escrow
 */
export function getUserRole(escrow: Escrow, userId: string): EscrowRole | null {
  if (escrow.custodian.userId === userId) return 'CUSTODIAN'
  if (escrow.beneficiary.userId === userId) return 'BENEFICIARY'
  if (escrow.stakeholders.some(s => s.userId === userId)) return 'STAKEHOLDER'
  return null
}

/**
 * Get pending invitations for user
 */
export function getPendingInvitations(userEmail: string): Escrow[] {
  return mockEscrows.filter(escrow =>
    (escrow.beneficiary.email === userEmail && escrow.beneficiary.status === 'INVITED') ||
    escrow.stakeholders.some(s => s.email === userEmail && s.status === 'INVITED')
  )
}

/**
 * Get escrows requiring action from user
 */
export function getEscrowsRequiringAction(userId: string): Escrow[] {
  return mockEscrows.filter(escrow => {
    const role = getUserRole(escrow, userId)
    if (!role) return false

    // Custodian actions
    if (role === 'CUSTODIAN') {
      if (escrow.state === 'ACCEPTED') return true // Need to fund
      if (escrow.state === 'REQUESTED') return true // Need to review request
      if (escrow.state === 'AUTHORIZED') return true // Need to release funds
    }

    // Beneficiary actions
    if (role === 'BENEFICIARY') {
      if (escrow.state === 'INVITED') return true // Need to accept
      if (escrow.state === 'FUNDED') return true // Can request funds
      if (escrow.state === 'AWAITING_SIGNATURES') return true // Need to sign
    }

    // Stakeholder actions
    if (role === 'STAKEHOLDER') {
      if (escrow.state === 'INVITED') return true // Need to accept
      if (escrow.state === 'UNDER_REVIEW') return true // Need to review
      if (escrow.state === 'AWAITING_SIGNATURES') return true // Need to sign
    }

    return false
  })
}

/**
 * Get escrow statistics
 */
export function getEscrowStats(): EscrowStats {
  const totalValue = mockEscrows.reduce((sum, e) => sum + e.totalAmount, 0)
  const totalFunded = mockEscrows.reduce((sum, e) => sum + e.fundedAmount, 0)
  const totalReleased = mockEscrows.reduce((sum, e) => sum + e.releasedAmount, 0)

  const byState: Record<EscrowState, number> = {
    CREATED: 0,
    INVITED: 0,
    ACCEPTED: 0,
    FUNDED: 0,
    REQUESTED: 0,
    UNDER_REVIEW: 0,
    APPROVED_FOR_RELEASE: 0,
    AWAITING_SIGNATURES: 0,
    AUTHORIZED: 0,
    RELEASED: 0,
    CLOSED: 0,
    DISPUTED: 0,
    CANCELLED: 0
  }

  mockEscrows.forEach(e => {
    byState[e.state] = (byState[e.state] || 0) + 1
  })

  const byType: Record<string, number> = {}
  mockEscrows.forEach(e => {
    byType[e.type] = (byType[e.type] || 0) + 1
  })

  return {
    totalEscrows: mockEscrows.length,
    activeEscrows: mockEscrows.filter(e =>
      !['CLOSED', 'CANCELLED'].includes(e.state)
    ).length,
    completedEscrows: mockEscrows.filter(e => e.state === 'CLOSED').length,
    totalValue,
    totalFunded,
    totalReleased,
    averageValue: totalValue / mockEscrows.length,
    byState,
    byType: byType as Record<string, number>
  }
}

/**
 * Check if state transition is valid
 */
export function canTransitionState(escrow: Escrow, newState: EscrowState): boolean {
  const validTransitions: Record<EscrowState, EscrowState[]> = {
    CREATED: ['INVITED', 'CANCELLED'],
    INVITED: ['ACCEPTED', 'CREATED', 'CANCELLED'],
    ACCEPTED: ['FUNDED', 'CANCELLED'],
    FUNDED: ['REQUESTED', 'CANCELLED', 'DISPUTED', 'CLOSED'],
    REQUESTED: ['UNDER_REVIEW', 'FUNDED', 'CANCELLED', 'DISPUTED'],
    UNDER_REVIEW: ['APPROVED_FOR_RELEASE', 'FUNDED', 'DISPUTED'],
    APPROVED_FOR_RELEASE: ['AWAITING_SIGNATURES', 'DISPUTED'],
    AWAITING_SIGNATURES: ['AUTHORIZED', 'APPROVED_FOR_RELEASE', 'DISPUTED'],
    AUTHORIZED: ['RELEASED', 'DISPUTED'],
    RELEASED: ['CLOSED', 'FUNDED'],
    DISPUTED: ['FUNDED', 'CANCELLED'],
    CLOSED: [],
    CANCELLED: []
  }

  return validTransitions[escrow.state]?.includes(newState) || false
}

/**
 * Get next possible states for escrow
 */
export function getNextPossibleStates(escrow: Escrow): EscrowState[] {
  const transitions: Record<EscrowState, EscrowState[]> = {
    CREATED: ['INVITED', 'CANCELLED'],
    INVITED: ['ACCEPTED', 'CREATED', 'CANCELLED'],
    ACCEPTED: ['FUNDED', 'CANCELLED'],
    FUNDED: ['REQUESTED', 'CANCELLED', 'DISPUTED', 'CLOSED'],
    REQUESTED: ['UNDER_REVIEW', 'FUNDED', 'CANCELLED', 'DISPUTED'],
    UNDER_REVIEW: ['APPROVED_FOR_RELEASE', 'FUNDED', 'DISPUTED'],
    APPROVED_FOR_RELEASE: ['AWAITING_SIGNATURES', 'DISPUTED'],
    AWAITING_SIGNATURES: ['AUTHORIZED', 'APPROVED_FOR_RELEASE', 'DISPUTED'],
    AUTHORIZED: ['RELEASED', 'DISPUTED'],
    RELEASED: ['CLOSED', 'FUNDED'],
    DISPUTED: ['FUNDED', 'CANCELLED'],
    CLOSED: [],
    CANCELLED: []
  }

  return transitions[escrow.state] || []
}

/**
 * Get user permissions for escrow
 */
export function getUserPermissionsForEscrow(
  userId: string,
  escrow: Escrow
): ParticipantPermissions | null {
  if (escrow.custodian.userId === userId) return escrow.custodian.permissions
  if (escrow.beneficiary.userId === userId) return escrow.beneficiary.permissions

  const stakeholder = escrow.stakeholders.find(s => s.userId === userId)
  return stakeholder?.permissions || null
}

/**
 * Check if user can perform action
 */
export function canUserPerformAction(
  userId: string,
  escrow: Escrow,
  action: string
): boolean {
  const role = getUserRole(escrow, userId)
  if (!role) return false

  const permissions = getUserPermissionsForEscrow(userId, escrow)
  if (!permissions) return false

  switch (action) {
    case 'viewDetails':
      return permissions.canViewDetails
    case 'requestFunds':
      return permissions.canRequestFunds && escrow.state === 'FUNDED'
    case 'approveFunds':
      return permissions.canApproveFunds && escrow.state === 'UNDER_REVIEW'
    case 'signDocuments':
      return permissions.canSignDocuments && escrow.state === 'AWAITING_SIGNATURES'
    case 'addStakeholders':
      return permissions.canAddStakeholders
    default:
      return false
  }
}
