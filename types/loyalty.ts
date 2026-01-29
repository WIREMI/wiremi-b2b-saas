// Wiremi Loyalty Program Type Definitions
// Network-Wide, Cross-Merchant Loyalty & Cashback Module

// Core constant: 1 Wiremi Loyalty Point (WLP) = $0.01 USD
export const WLP_TO_USD = 0.01
export const USD_TO_WLP = 100

export type LoyaltyEventType = 'EARN' | 'REDEEM' | 'EXPIRE' | 'TRANSFER' | 'ADJUSTMENT'
export type SettlementStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
export type LoyaltyConfigStatus = 'ACTIVE' | 'PAUSED' | 'INACTIVE'

// Loyalty Points Ledger Entry
export interface LoyaltyPointsLedger {
  id: string
  userId: string
  merchantId: string
  transactionId: string
  pointsDelta: number // Positive for earn, negative for redeem
  usdValue: number // Actual USD value of points
  eventType: LoyaltyEventType
  description: string
  metadata?: {
    originalAmount?: number
    earnRate?: number
    redemptionAmount?: number
    expiryDate?: string
  }
  timestamp: string
  expiresAt?: string // When these points expire
}

// Merchant Loyalty Configuration
export interface MerchantLoyaltyConfig {
  merchantId: string
  merchantName: string
  businessType: 'HOSPITALITY' | 'RETAIL' | 'RESTAURANT' | 'FITNESS' | 'EVENTS' | 'TRANSPORT' | 'OTHER'

  // Earning Settings
  earnRatePercent: number // e.g., 5 = 5% cashback
  minPurchaseAmount: number // Minimum transaction to earn points
  maxPointsPerTransaction?: number // Cap on points earned per transaction

  // Redemption Settings
  allowRedemption: boolean
  minRedemptionPoints: number // Minimum points to redeem
  maxRedemptionPercent: number // Max % of bill that can be paid with points

  // Expiry Settings
  pointsExpiryDays: number // e.g., 365 = points expire after 1 year

  // Eligibility
  eligibleServices: string[] // Which services/products eligible for loyalty
  blackoutDates?: string[] // Dates when loyalty is paused

  // Status
  status: LoyaltyConfigStatus
  enrolledAt: string
  updatedAt: string
}

// User Loyalty Wallet
export interface LoyaltyWallet {
  userId: string
  totalPoints: number
  availablePoints: number // Total - expired - redeemed
  lifetimeEarned: number
  lifetimeRedeemed: number
  lifetimeExpired: number
  usdValueAvailable: number // availablePoints * WLP_TO_USD
  lastEarnedAt?: string
  lastRedeemedAt?: string
  createdAt: string
  updatedAt: string
}

// Cross-Merchant Settlement Record
export interface LoyaltySettlement {
  id: string
  settlementDate: string

  // Earning merchant (where points were earned)
  fromMerchantId: string
  fromMerchantName: string

  // Redeeming merchant (where points were used)
  toMerchantId: string
  toMerchantName: string

  // Settlement amounts
  pointsValue: number // Total WLP transferred
  usdValue: number // USD equivalent
  wiremiFeePercent: number // e.g., 1.0 = 1%
  wiremiFeeAmount: number // USD fee charged by Wiremi
  netSettlementAmount: number // Amount paid to redeeming merchant

  // Related transactions
  transactionIds: string[]
  userCount: number // Number of unique users in this settlement

  status: SettlementStatus
  processedAt?: string
  completedAt?: string
  failureReason?: string
}

// Loyalty Transaction (for user history)
export interface LoyaltyTransaction {
  id: string
  userId: string
  ledgerEntryId: string
  merchantId: string
  merchantName: string
  businessType: string
  eventType: LoyaltyEventType
  pointsDelta: number
  usdValue: number
  balanceAfter: number
  description: string
  relatedTransactionId?: string
  timestamp: string
  expiresAt?: string
}

// Loyalty Analytics (for merchants)
export interface MerchantLoyaltyAnalytics {
  merchantId: string
  period: {
    start: string
    end: string
  }

  // Points Activity
  totalPointsEarned: number
  totalPointsRedeemed: number
  netPointsIssued: number // earned - redeemed

  // Financial Impact
  totalEarnCostUsd: number // Cost of points issued
  totalRedeemRevenueUsd: number // Value received from redemptions
  netLoyaltyCostUsd: number // earn cost - redeem revenue

  // User Engagement
  activeUsers: number // Users who earned or redeemed
  newLoyaltyUsers: number // First-time earners
  repeatCustomers: number // Users with 2+ transactions
  averagePointsPerUser: number

  // Redemption Metrics
  redemptionRate: number // % of earned points redeemed
  averageBasketWithPoints: number
  averageBasketWithoutPoints: number

  // Settlement
  settlementOwed: number // Amount owed to other merchants
  settlementReceivable: number // Amount to receive from other merchants
  netSettlementPosition: number // receivable - owed
}

// Loyalty Points Summary by Merchant
export interface PointsByMerchant {
  merchantId: string
  merchantName: string
  businessType: string
  earnedPoints: number
  earnedUsdValue: number
  lastEarnedAt: string
  transactionCount: number
}

// Loyalty Program Settings (Global)
export interface LoyaltyProgramSettings {
  programName: string
  pointsName: string // e.g., "Wiremi Points"
  pointsSymbol: string // e.g., "WLP"
  conversionRate: number // Points per USD (default: 100)
  defaultExpiryDays: number // Default expiry (365)
  defaultWiremiFeePercent: number // Default clearing fee (1.0%)
  minMerchantEarnRate: number // Min cashback % (1%)
  maxMerchantEarnRate: number // Max cashback % (10%)
  minRedemptionPoints: number // Global min (100 points)
  programActive: boolean
  programDescription: string
}

// Loyalty Redemption Request (at checkout)
export interface RedemptionRequest {
  userId: string
  merchantId: string
  pointsToRedeem: number
  usdValueToRedeem: number
  totalBillAmount: number
  remainingAmount: number // Bill - redeemed value
}

// Loyalty Earning Event (at purchase)
export interface EarningEvent {
  userId: string
  merchantId: string
  transactionId: string
  purchaseAmount: number
  earnRatePercent: number
  pointsEarned: number
  usdValue: number
  expiresAt: string
}

// Breakage Analytics (unused/expired points)
export interface BreakageAnalytics {
  period: {
    start: string
    end: string
  }
  totalPointsIssued: number
  totalPointsRedeemed: number
  totalPointsExpired: number
  totalPointsOutstanding: number
  breakageRate: number // % of issued points that expired unused
  breakageRevenueUsd: number // USD value of expired points
}

// User Loyalty Stats
export interface UserLoyaltyStats {
  userId: string
  memberSince: string
  totalEarned: number
  totalRedeemed: number
  currentBalance: number
  usdValueAvailable: number
  lifetimeSavings: number // Total USD value redeemed
  favoriteMerchant?: {
    merchantId: string
    merchantName: string
    pointsEarned: number
  }
  expiringPoints: {
    amount: number
    expiryDate: string
  }
  tier?: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' // Optional tier system
}

// API Request Types
export interface CreateLoyaltyConfigRequest {
  merchantId: string
  earnRatePercent: number
  minPurchaseAmount: number
  maxRedemptionPercent: number
  pointsExpiryDays: number
  eligibleServices: string[]
}

export interface UpdateLoyaltyConfigRequest extends Partial<CreateLoyaltyConfigRequest> {
  status?: LoyaltyConfigStatus
}

export interface ProcessEarningRequest {
  userId: string
  merchantId: string
  transactionId: string
  purchaseAmount: number
}

export interface ProcessRedemptionRequest {
  userId: string
  merchantId: string
  transactionId: string
  pointsToRedeem: number
  totalBillAmount: number
}

export interface SettlementRequest {
  periodStart: string
  periodEnd: string
  merchantIds?: string[] // Specific merchants, or all if not provided
}

// Loyalty tier thresholds (optional gamification)
export interface LoyaltyTier {
  name: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM'
  minLifetimePoints: number
  benefits: string[]
  earnRateBonus: number // % bonus on earning rate
  color: string
  icon: string
}
