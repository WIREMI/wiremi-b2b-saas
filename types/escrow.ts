// Wiremi B2B Escrow Module - TypeScript Type Definitions

// ============================================================================
// ENUMS & BASIC TYPES
// ============================================================================

/**
 * Escrow States - Finite State Machine
 * Represents all possible states an escrow can be in
 */
export type EscrowState =
  | 'CREATED'                  // Initial state after creation
  | 'INVITED'                  // Invitation sent to beneficiary
  | 'ACCEPTED'                 // Beneficiary accepted invitation
  | 'FUNDED'                   // Custodian funded the escrow
  | 'REQUESTED'                // Beneficiary requested funds
  | 'UNDER_REVIEW'             // Stakeholders reviewing request
  | 'APPROVED_FOR_RELEASE'     // Request approved, awaiting signatures
  | 'AWAITING_SIGNATURES'      // Documents sent for signing
  | 'AUTHORIZED'               // All parties signed, ready to release
  | 'RELEASED'                 // Funds released to beneficiary
  | 'CLOSED'                   // Escrow completed
  | 'DISPUTED'                 // Dispute raised
  | 'CANCELLED'                // Escrow cancelled

/**
 * User Roles in Escrow
 */
export type EscrowRole =
  | 'CUSTODIAN'                // Creator, funds escrow, approves releases
  | 'BENEFICIARY'              // Recipient, requests funds
  | 'STAKEHOLDER'              // Witness, signs documents, approves
  | 'OBSERVER'                 // View-only access

/**
 * Escrow Types
 */
export type EscrowType =
  | 'BUSINESS_TRANSACTION'     // B2B payment escrow
  | 'PROJECT_MILESTONE'        // Project-based releases
  | 'CONDITIONAL_PAYMENT'      // Payment with conditions
  | 'MULTI_PARTY'              // Multiple beneficiaries

/**
 * Participant Status
 */
export type ParticipantStatus =
  | 'INVITED'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'REMOVED'

/**
 * Condition Types
 */
export type ConditionType =
  | 'DOCUMENT_UPLOAD'
  | 'SIGNATURE_REQUIRED'
  | 'MILESTONE_MET'
  | 'DATE_PASSED'
  | 'CUSTOM'

/**
 * Condition Status
 */
export type ConditionStatus =
  | 'PENDING'
  | 'MET'
  | 'FAILED'

/**
 * Fund Request Status
 */
export type FundRequestStatus =
  | 'PENDING'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'RELEASED'

/**
 * Document Types
 */
export type DocumentType =
  | 'CONTRACT'
  | 'INVOICE'
  | 'RECEIPT'
  | 'PROOF_OF_WORK'
  | 'MILESTONE_EVIDENCE'
  | 'SIGNATURE'
  | 'OTHER'

/**
 * Document Status
 */
export type DocumentStatus =
  | 'PENDING'
  | 'SIGNED'
  | 'REJECTED'

/**
 * Signature Type
 */
export type SignatureType =
  | 'ELECTRONIC'
  | 'DIGITAL_CERTIFICATE'

/**
 * Notification Type
 */
export type NotificationType =
  | 'INVITATION'
  | 'ACCEPTANCE'
  | 'FUNDED'
  | 'FUND_REQUEST'
  | 'REQUEST_APPROVED'
  | 'REQUEST_REJECTED'
  | 'SIGNATURE_REQUIRED'
  | 'FUNDS_RELEASED'
  | 'DISPUTE_RAISED'
  | 'ESCROW_CLOSED'

/**
 * Notification Priority
 */
export type NotificationPriority =
  | 'LOW'
  | 'NORMAL'
  | 'HIGH'
  | 'URGENT'

/**
 * Escrow Action Types
 */
export type EscrowActionType =
  | 'CREATED'
  | 'INVITED_PARTICIPANT'
  | 'ACCEPTED_INVITATION'
  | 'DECLINED_INVITATION'
  | 'FUNDED'
  | 'REQUESTED_FUNDS'
  | 'REVIEWED_REQUEST'
  | 'APPROVED_REQUEST'
  | 'REJECTED_REQUEST'
  | 'UPLOADED_DOCUMENT'
  | 'SIGNED_DOCUMENT'
  | 'RELEASED_FUNDS'
  | 'DISPUTED'
  | 'RESOLVED_DISPUTE'
  | 'CANCELLED'
  | 'CLOSED'
  | 'STATE_CHANGED'
  | 'STAKEHOLDER_ADDED'
  | 'STAKEHOLDER_REMOVED'
  | 'CONDITION_MET'
  | 'NOTIFICATION_SENT'

/**
 * Dispute Resolution Process
 */
export type DisputeResolutionProcess =
  | 'MEDIATION'
  | 'ARBITRATION'
  | 'LEGAL'

// ============================================================================
// INTERFACES
// ============================================================================

/**
 * Participant Permissions
 */
export interface ParticipantPermissions {
  canViewDetails: boolean
  canRequestFunds: boolean
  canApproveFunds: boolean
  canSignDocuments: boolean
  canAddStakeholders: boolean
}

/**
 * Participant Metadata
 */
export interface ParticipantMetadata {
  businessId?: string
  taxId?: string
  address?: string
  contactPerson?: string
  phone?: string
}

/**
 * Escrow Participant
 */
export interface EscrowParticipant {
  id: string
  userId: string
  businessName: string
  email: string
  role: EscrowRole
  invitedAt: string            // ISO datetime
  acceptedAt?: string          // ISO datetime
  status: ParticipantStatus
  permissions: ParticipantPermissions
  metadata?: ParticipantMetadata
}

/**
 * Escrow Condition
 */
export interface EscrowCondition {
  id: string
  type: ConditionType
  description: string
  required: boolean
  status: ConditionStatus
  metAt?: string              // ISO datetime
  verifiedBy?: string         // User ID
}

/**
 * Fund Request Reviewer
 */
export interface FundRequestReviewer {
  userId: string
  name: string
  role: EscrowRole
  reviewedAt?: string
  decision?: 'APPROVED' | 'REJECTED'
  comments?: string
}

/**
 * Fund Request
 */
export interface FundRequest {
  id: string
  escrowId: string
  requestedBy: string          // User ID
  requestedByName: string
  requestedByRole: EscrowRole
  amount: number
  currency: string
  reason: string
  description: string
  documents: EscrowDocument[]
  requestedAt: string          // ISO datetime
  status: FundRequestStatus
  reviewers: FundRequestReviewer[]
  approvedAt?: string
  approvedBy?: string[]
  rejectedAt?: string
  rejectedBy?: string
  rejectionReason?: string
  releasedAt?: string
  transactionId?: string
}

/**
 * Document Signature
 */
export interface DocumentSignature {
  id: string
  documentId: string
  signedBy: string             // User ID
  signedByName: string
  signedByRole: EscrowRole
  signedAt: string             // ISO datetime
  ipAddress: string
  signatureType: SignatureType
  signatureData: string        // Mock signature data
}

/**
 * Escrow Document
 */
export interface EscrowDocument {
  id: string
  type: DocumentType
  name: string
  description?: string
  url: string                  // Mock URL
  uploadedBy: string           // User ID
  uploadedByName: string
  uploadedAt: string           // ISO datetime
  fileSize: number             // In bytes
  mimeType: string
  requiresSignature: boolean
  signatures: DocumentSignature[]
  status: DocumentStatus
}

/**
 * Escrow Activity Log Entry
 */
export interface EscrowActivity {
  id: string
  escrowId: string
  timestamp: string            // ISO datetime
  actorId: string              // User ID
  actorName: string
  actorRole: EscrowRole
  action: EscrowActionType
  description: string
  metadata?: Record<string, any>
  previousState?: EscrowState
  newState?: EscrowState
}

/**
 * Escrow Notification
 */
export interface EscrowNotification {
  id: string
  escrowId: string
  recipientId: string
  recipientEmail: string
  type: NotificationType
  subject: string
  message: string
  sentAt: string               // ISO datetime
  readAt?: string              // ISO datetime
  actionUrl?: string
  priority: NotificationPriority
}

/**
 * Escrow Settings
 */
export interface EscrowSettings {
  allowPartialReleases: boolean
  requireUnanimousApproval: boolean
  minimumStakeholders: number
  automaticNotifications: boolean
  disputeResolutionProcess: DisputeResolutionProcess
}

/**
 * Main Escrow Interface
 */
export interface Escrow {
  id: string
  escrowId: string             // e.g., ESC-2026-001
  name: string
  description: string
  purpose: string
  type: EscrowType
  state: EscrowState

  // Financial Details
  currency: string
  totalAmount: number
  fundedAmount: number
  releasedAmount: number
  remainingAmount: number

  // Participants
  custodian: EscrowParticipant
  beneficiary: EscrowParticipant
  stakeholders: EscrowParticipant[]

  // Conditions
  conditions: EscrowCondition[]
  requiresAllConditions: boolean  // true = AND, false = OR

  // Requests
  fundRequests: FundRequest[]

  // Documents
  documents: EscrowDocument[]

  // Timeline
  createdAt: string            // ISO datetime
  fundedAt?: string
  firstRequestAt?: string
  lastActivityAt: string
  completedAt?: string

  // Activity Log
  activities: EscrowActivity[]

  // Notifications
  notifications: EscrowNotification[]

  // Settings
  settings: EscrowSettings

  // Metadata
  tags: string[]
  internalNotes?: string
  externalNotes?: string

  // Timestamps
  updatedAt: string
}

/**
 * Escrow Statistics
 */
export interface EscrowStats {
  totalEscrows: number
  activeEscrows: number
  completedEscrows: number
  totalValue: number
  totalFunded: number
  totalReleased: number
  averageValue: number
  byState: Record<EscrowState, number>
  byType: Record<EscrowType, number>
}

// ============================================================================
// FORM INPUT TYPES
// ============================================================================

/**
 * Create Escrow Input
 */
export interface CreateEscrowInput {
  name: string
  description: string
  purpose: string
  type: EscrowType
  currency: string
  totalAmount: number
  beneficiary: {
    businessName: string
    email: string
    contactPerson?: string
    phone?: string
  }
  stakeholders?: {
    businessName: string
    email: string
    role: EscrowRole
    contactPerson?: string
  }[]
  conditions?: Omit<EscrowCondition, 'id' | 'status' | 'metAt' | 'verifiedBy'>[]
  settings?: Partial<EscrowSettings>
  tags?: string[]
}

/**
 * Create Fund Request Input
 */
export interface CreateFundRequestInput {
  escrowId: string
  amount: number
  reason: string
  description: string
  conditionsMet?: string[]     // IDs of conditions being met
}

/**
 * Review Fund Request Input
 */
export interface ReviewFundRequestInput {
  requestId: string
  decision: 'APPROVED' | 'REJECTED'
  comments?: string
}

/**
 * Sign Document Input
 */
export interface SignDocumentInput {
  documentId: string
  signedBy: string
  signedByName: string
  signedByRole: EscrowRole
  agreed: boolean
}

/**
 * Release Funds Input
 */
export interface ReleaseFundsInput {
  escrowId: string
  requestId: string
  amount: number
  sourceWalletId: string
  twoFactorCode?: string
}

/**
 * Add Stakeholder Input
 */
export interface AddStakeholderInput {
  escrowId: string
  businessName: string
  email: string
  role: EscrowRole
  contactPerson?: string
  permissions?: Partial<ParticipantPermissions>
}

/**
 * Upload Document Input
 */
export interface UploadDocumentInput {
  escrowId: string
  type: DocumentType
  name: string
  description?: string
  requiresSignature: boolean
  file: File
}

// ============================================================================
// STATE TRANSITION MAP
// ============================================================================

/**
 * Valid State Transitions
 * Maps current state to array of valid next states
 */
export const VALID_STATE_TRANSITIONS: Record<EscrowState, EscrowState[]> = {
  CREATED: ['INVITED', 'CANCELLED'],
  INVITED: ['ACCEPTED', 'CREATED', 'CANCELLED'],
  ACCEPTED: ['FUNDED', 'CANCELLED'],
  FUNDED: ['REQUESTED', 'CANCELLED', 'DISPUTED', 'CLOSED'],
  REQUESTED: ['UNDER_REVIEW', 'FUNDED', 'CANCELLED', 'DISPUTED'],
  UNDER_REVIEW: ['APPROVED_FOR_RELEASE', 'FUNDED', 'DISPUTED'],
  APPROVED_FOR_RELEASE: ['AWAITING_SIGNATURES', 'DISPUTED'],
  AWAITING_SIGNATURES: ['AUTHORIZED', 'APPROVED_FOR_RELEASE', 'DISPUTED'],
  AUTHORIZED: ['RELEASED', 'DISPUTED'],
  RELEASED: ['CLOSED', 'FUNDED'], // FUNDED if partial release
  DISPUTED: ['FUNDED', 'CANCELLED'], // Resolved or cancelled
  CLOSED: [], // Terminal state
  CANCELLED: [] // Terminal state
}

/**
 * State Colors for UI
 */
export const STATE_COLORS: Record<EscrowState, string> = {
  CREATED: 'gray',
  INVITED: 'blue',
  ACCEPTED: 'cyan',
  FUNDED: 'green',
  REQUESTED: 'yellow',
  UNDER_REVIEW: 'orange',
  APPROVED_FOR_RELEASE: 'purple',
  AWAITING_SIGNATURES: 'indigo',
  AUTHORIZED: 'teal',
  RELEASED: 'emerald',
  CLOSED: 'slate',
  DISPUTED: 'red',
  CANCELLED: 'gray'
}

/**
 * State Labels for UI
 */
export const STATE_LABELS: Record<EscrowState, string> = {
  CREATED: 'Created',
  INVITED: 'Invitation Sent',
  ACCEPTED: 'Accepted',
  FUNDED: 'Funded',
  REQUESTED: 'Funds Requested',
  UNDER_REVIEW: 'Under Review',
  APPROVED_FOR_RELEASE: 'Approved',
  AWAITING_SIGNATURES: 'Awaiting Signatures',
  AUTHORIZED: 'Authorized',
  RELEASED: 'Funds Released',
  CLOSED: 'Closed',
  DISPUTED: 'Disputed',
  CANCELLED: 'Cancelled'
}

/**
 * Role Labels for UI
 */
export const ROLE_LABELS: Record<EscrowRole, string> = {
  CUSTODIAN: 'Custodian',
  BENEFICIARY: 'Beneficiary',
  STAKEHOLDER: 'Stakeholder',
  OBSERVER: 'Observer'
}

/**
 * Escrow Type Labels for UI
 */
export const TYPE_LABELS: Record<EscrowType, string> = {
  BUSINESS_TRANSACTION: 'Business Transaction',
  PROJECT_MILESTONE: 'Project Milestone',
  CONDITIONAL_PAYMENT: 'Conditional Payment',
  MULTI_PARTY: 'Multi-Party'
}
