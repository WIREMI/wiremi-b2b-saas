export type VendorType = 'individual' | 'company' | 'contractor'
export type VendorStatus = 'active' | 'inactive' | 'suspended'
export type PayoutStatus = 'draft' | 'pending-approval' | 'approved' | 'processing' | 'completed' | 'failed' | 'cancelled'
export type PayoutCategory = 'salary' | 'commission' | 'invoice' | 'refund' | 'contractor-payment' | 'vendor-payment' | 'bonus' | 'reimbursement' | 'other'
export type PaymentMethod = 'bank-transfer' | 'wire-transfer' | 'check' | 'mobile-money' | 'paypal' | 'stripe'
export type ApprovalAction = 'submitted' | 'approved' | 'rejected' | 'cancelled'

export interface BankingDetails {
  bankName: string
  accountNumber: string
  accountName: string
  swiftCode?: string
  routingNumber?: string
  iban?: string
  branchCode?: string
  bankAddress?: string
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Vendor {
  id: string
  vendorId: string
  name: string
  type: VendorType
  email: string
  phone: string
  taxId?: string
  address: Address
  bankingDetails: BankingDetails
  status: VendorStatus
  category?: string
  website?: string
  contactPerson?: string
  totalPayouts: number
  totalPaid: number
  pendingAmount: number
  lastPaymentDate?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface ApprovalStep {
  id: string
  approverName: string
  approverRole: string
  action: ApprovalAction
  comments?: string
  timestamp: string
}

export interface Payout {
  id: string
  referenceNumber: string
  vendorId: string
  vendorName: string
  amount: number
  currency: string
  category: PayoutCategory
  description: string
  paymentMethod: PaymentMethod
  status: PayoutStatus
  scheduledDate: string
  processedDate?: string
  completedDate?: string
  batchId?: string
  attachments?: string[]
  notes?: string
  approvalWorkflow: ApprovalStep[]
  createdBy: string
  createdAt: string
  updatedAt: string
  failureReason?: string
  transactionId?: string
}

export interface BatchPayout {
  id: string
  batchNumber: string
  name: string
  description?: string
  totalPayouts: number
  totalAmount: number
  currency: string
  status: PayoutStatus
  payoutIds: string[]
  scheduledDate: string
  processedDate?: string
  completedDate?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  successCount?: number
  failedCount?: number
}

export interface PayoutStats {
  totalPayouts: number
  pendingApproval: number
  completedThisMonth: number
  totalAmount: number
  processingAmount: number
  completedAmount: number
  failedCount: number
}

export interface VendorWithPayouts extends Vendor {
  payouts?: Payout[]
  recentPayouts?: Payout[]
}

export interface PayoutWithVendor extends Payout {
  vendor?: Vendor
}

export interface BatchPayoutWithDetails extends BatchPayout {
  payouts?: Payout[]
}
