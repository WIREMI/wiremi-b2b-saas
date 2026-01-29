import type {
  MerchantLoyaltyConfig,
  LoyaltyWallet,
  LoyaltyTransaction,
  LoyaltyPointsLedger,
  LoyaltySettlement,
  MerchantLoyaltyAnalytics,
  PointsByMerchant,
  LoyaltyProgramSettings,
  BreakageAnalytics,
  UserLoyaltyStats,
  LoyaltyTier,
} from '@/types/loyalty'

// Global Program Settings
export const LOYALTY_PROGRAM_SETTINGS: LoyaltyProgramSettings = {
  programName: 'Wiremi Rewards',
  pointsName: 'Wiremi Points',
  pointsSymbol: 'WLP',
  conversionRate: 100, // 100 points = $1 USD
  defaultExpiryDays: 365,
  defaultWiremiFeePercent: 1.0,
  minMerchantEarnRate: 1,
  maxMerchantEarnRate: 10,
  minRedemptionPoints: 100,
  programActive: true,
  programDescription: 'Earn points at any Wiremi merchant. Redeem anywhere on the network.',
}

// Loyalty Tiers
export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    name: 'BRONZE',
    minLifetimePoints: 0,
    benefits: ['Standard earn rate', 'Basic support'],
    earnRateBonus: 0,
    color: '#CD7F32',
    icon: 'Medal',
  },
  {
    name: 'SILVER',
    minLifetimePoints: 5000,
    benefits: ['1.25x earn rate', 'Priority support', 'Early access to promos'],
    earnRateBonus: 25,
    color: '#C0C0C0',
    icon: 'Award',
  },
  {
    name: 'GOLD',
    minLifetimePoints: 15000,
    benefits: ['1.5x earn rate', 'VIP support', 'Exclusive events', 'Birthday bonus'],
    earnRateBonus: 50,
    color: '#FFD700',
    icon: 'Crown',
  },
  {
    name: 'PLATINUM',
    minLifetimePoints: 50000,
    benefits: ['2x earn rate', '24/7 concierge', 'Lounge access', 'Partner perks'],
    earnRateBonus: 100,
    color: '#E5E4E2',
    icon: 'Gem',
  },
]

// Merchant Loyalty Configurations (8 merchants across different industries)
export const MOCK_MERCHANT_LOYALTY_CONFIGS: MerchantLoyaltyConfig[] = [
  // Hospitality
  {
    merchantId: 'merchant-hotel-1',
    merchantName: 'Azure Bay Resort & Spa',
    businessType: 'HOSPITALITY',
    earnRatePercent: 5,
    minPurchaseAmount: 50,
    maxPointsPerTransaction: 10000,
    allowRedemption: true,
    minRedemptionPoints: 500,
    maxRedemptionPercent: 50,
    pointsExpiryDays: 365,
    eligibleServices: ['room-bookings', 'spa-services', 'restaurant'],
    status: 'ACTIVE',
    enrolledAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z',
  },
  {
    merchantId: 'merchant-hotel-2',
    merchantName: 'Metropolitan Grand Hotel',
    businessType: 'HOSPITALITY',
    earnRatePercent: 4,
    minPurchaseAmount: 50,
    allowRedemption: true,
    minRedemptionPoints: 500,
    maxRedemptionPercent: 40,
    pointsExpiryDays: 365,
    eligibleServices: ['room-bookings', 'restaurant', 'bar'],
    status: 'ACTIVE',
    enrolledAt: '2025-10-01T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
  },

  // Restaurant
  {
    merchantId: 'merchant-rest-1',
    merchantName: 'The Golden Fork',
    businessType: 'RESTAURANT',
    earnRatePercent: 8,
    minPurchaseAmount: 20,
    maxPointsPerTransaction: 2000,
    allowRedemption: true,
    minRedemptionPoints: 200,
    maxRedemptionPercent: 30,
    pointsExpiryDays: 180,
    eligibleServices: ['dine-in', 'takeout', 'delivery'],
    blackoutDates: ['2026-12-24', '2026-12-25', '2026-12-31'],
    status: 'ACTIVE',
    enrolledAt: '2025-08-15T00:00:00Z',
    updatedAt: '2026-01-20T00:00:00Z',
  },

  // Fitness
  {
    merchantId: 'merchant-gym-1',
    merchantName: 'PowerFit Gym',
    businessType: 'FITNESS',
    earnRatePercent: 10,
    minPurchaseAmount: 30,
    allowRedemption: true,
    minRedemptionPoints: 300,
    maxRedemptionPercent: 25,
    pointsExpiryDays: 365,
    eligibleServices: ['memberships', 'personal-training', 'classes'],
    status: 'ACTIVE',
    enrolledAt: '2025-11-01T00:00:00Z',
    updatedAt: '2026-01-18T00:00:00Z',
  },

  // Retail
  {
    merchantId: 'merchant-retail-1',
    merchantName: 'TechGear Electronics',
    businessType: 'RETAIL',
    earnRatePercent: 3,
    minPurchaseAmount: 25,
    maxPointsPerTransaction: 5000,
    allowRedemption: true,
    minRedemptionPoints: 250,
    maxRedemptionPercent: 20,
    pointsExpiryDays: 365,
    eligibleServices: ['in-store', 'online'],
    status: 'ACTIVE',
    enrolledAt: '2025-07-01T00:00:00Z',
    updatedAt: '2026-01-12T00:00:00Z',
  },

  // Events
  {
    merchantId: 'merchant-event-1',
    merchantName: 'EventPro Ticketing',
    businessType: 'EVENTS',
    earnRatePercent: 6,
    minPurchaseAmount: 15,
    allowRedemption: true,
    minRedemptionPoints: 150,
    maxRedemptionPercent: 30,
    pointsExpiryDays: 180,
    eligibleServices: ['concert-tickets', 'sports-tickets', 'theater-tickets'],
    status: 'ACTIVE',
    enrolledAt: '2025-09-15T00:00:00Z',
    updatedAt: '2026-01-14T00:00:00Z',
  },

  // Transport
  {
    merchantId: 'merchant-transport-1',
    merchantName: 'QuickRide',
    businessType: 'TRANSPORT',
    earnRatePercent: 7,
    minPurchaseAmount: 10,
    maxPointsPerTransaction: 1000,
    allowRedemption: true,
    minRedemptionPoints: 100,
    maxRedemptionPercent: 50,
    pointsExpiryDays: 365,
    eligibleServices: ['rides', 'rentals'],
    status: 'ACTIVE',
    enrolledAt: '2025-10-20T00:00:00Z',
    updatedAt: '2026-01-16T00:00:00Z',
  },

  // Retail (Paused Example)
  {
    merchantId: 'merchant-retail-2',
    merchantName: 'Fashion Hub',
    businessType: 'RETAIL',
    earnRatePercent: 5,
    minPurchaseAmount: 30,
    allowRedemption: false,
    minRedemptionPoints: 300,
    maxRedemptionPercent: 15,
    pointsExpiryDays: 365,
    eligibleServices: ['in-store', 'online'],
    status: 'PAUSED',
    enrolledAt: '2025-06-01T00:00:00Z',
    updatedAt: '2026-01-05T00:00:00Z',
  },
]

// User Loyalty Wallet (Demo User)
export const MOCK_USER_LOYALTY_WALLET: LoyaltyWallet = {
  userId: 'user-demo-1',
  totalPoints: 12850,
  availablePoints: 11230,
  lifetimeEarned: 18650,
  lifetimeRedeemed: 6200,
  lifetimeExpired: 1220,
  usdValueAvailable: 112.30, // 11,230 points * 0.01
  lastEarnedAt: '2026-01-22T14:30:00Z',
  lastRedeemedAt: '2026-01-18T19:45:00Z',
  createdAt: '2025-08-01T00:00:00Z',
  updatedAt: '2026-01-22T14:30:00Z',
}

// User Loyalty Transactions (Last 20 transactions)
export const MOCK_LOYALTY_TRANSACTIONS: LoyaltyTransaction[] = [
  // Recent Earnings
  {
    id: 'lt-1',
    userId: 'user-demo-1',
    ledgerEntryId: 'led-1',
    merchantId: 'merchant-hotel-1',
    merchantName: 'Azure Bay Resort & Spa',
    businessType: 'HOSPITALITY',
    eventType: 'EARN',
    pointsDelta: 1495,
    usdValue: 14.95,
    balanceAfter: 11230,
    description: 'Room booking - 2 nights',
    relatedTransactionId: 'txn-hotel-2024',
    timestamp: '2026-01-22T14:30:00Z',
    expiresAt: '2027-01-22T14:30:00Z',
  },
  {
    id: 'lt-2',
    userId: 'user-demo-1',
    ledgerEntryId: 'led-2',
    merchantId: 'merchant-rest-1',
    merchantName: 'The Golden Fork',
    businessType: 'RESTAURANT',
    eventType: 'EARN',
    pointsDelta: 480,
    usdValue: 4.80,
    balanceAfter: 9735,
    description: 'Dinner for 2',
    relatedTransactionId: 'txn-rest-5643',
    timestamp: '2026-01-20T19:15:00Z',
    expiresAt: '2026-07-19T19:15:00Z',
  },

  // Recent Redemption
  {
    id: 'lt-3',
    userId: 'user-demo-1',
    ledgerEntryId: 'led-3',
    merchantId: 'merchant-gym-1',
    merchantName: 'PowerFit Gym',
    businessType: 'FITNESS',
    eventType: 'REDEEM',
    pointsDelta: -1500,
    usdValue: -15.00,
    balanceAfter: 9255,
    description: 'Redeemed for personal training session',
    relatedTransactionId: 'txn-gym-8821',
    timestamp: '2026-01-18T19:45:00Z',
  },

  // More earnings
  {
    id: 'lt-4',
    userId: 'user-demo-1',
    ledgerEntryId: 'led-4',
    merchantId: 'merchant-transport-1',
    merchantName: 'QuickRide',
    businessType: 'TRANSPORT',
    eventType: 'EARN',
    pointsDelta: 245,
    usdValue: 2.45,
    balanceAfter: 10755,
    description: 'Airport ride',
    relatedTransactionId: 'txn-ride-3421',
    timestamp: '2026-01-17T08:20:00Z',
    expiresAt: '2027-01-17T08:20:00Z',
  },
  {
    id: 'lt-5',
    userId: 'user-demo-1',
    ledgerEntryId: 'led-5',
    merchantId: 'merchant-retail-1',
    merchantName: 'TechGear Electronics',
    businessType: 'RETAIL',
    eventType: 'EARN',
    pointsDelta: 897,
    usdValue: 8.97,
    balanceAfter: 10510,
    description: 'Purchase: Wireless headphones',
    relatedTransactionId: 'txn-tech-9912',
    timestamp: '2026-01-15T16:30:00Z',
    expiresAt: '2027-01-15T16:30:00Z',
  },

  // More redemptions
  {
    id: 'lt-6',
    userId: 'user-demo-1',
    ledgerEntryId: 'led-6',
    merchantId: 'merchant-rest-1',
    merchantName: 'The Golden Fork',
    businessType: 'RESTAURANT',
    eventType: 'REDEEM',
    pointsDelta: -800,
    usdValue: -8.00,
    balanceAfter: 9613,
    description: 'Redeemed for lunch',
    relatedTransactionId: 'txn-rest-5598',
    timestamp: '2026-01-14T12:45:00Z',
  },
  {
    id: 'lt-7',
    userId: 'user-demo-1',
    ledgerEntryId: 'led-7',
    merchantId: 'merchant-event-1',
    merchantName: 'EventPro Ticketing',
    businessType: 'EVENTS',
    eventType: 'EARN',
    pointsDelta: 540,
    usdValue: 5.40,
    balanceAfter: 10413,
    description: 'Concert tickets x2',
    relatedTransactionId: 'txn-event-7732',
    timestamp: '2026-01-12T10:00:00Z',
    expiresAt: '2026-07-11T10:00:00Z',
  },

  // Expired points
  {
    id: 'lt-8',
    userId: 'user-demo-1',
    ledgerEntryId: 'led-8',
    merchantId: 'merchant-rest-1',
    merchantName: 'The Golden Fork',
    businessType: 'RESTAURANT',
    eventType: 'EXPIRE',
    pointsDelta: -320,
    usdValue: -3.20,
    balanceAfter: 9873,
    description: 'Points expired (180 days)',
    timestamp: '2026-01-10T00:00:00Z',
  },

  // More activity (abbreviated)
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `lt-${i + 9}`,
    userId: 'user-demo-1',
    ledgerEntryId: `led-${i + 9}`,
    merchantId: `merchant-${['hotel-1', 'rest-1', 'gym-1', 'retail-1', 'transport-1', 'event-1'][i % 6]}`,
    merchantName: ['Azure Bay Resort', 'The Golden Fork', 'PowerFit Gym', 'TechGear', 'QuickRide', 'EventPro'][i % 6],
    businessType: ['HOSPITALITY', 'RESTAURANT', 'FITNESS', 'RETAIL', 'TRANSPORT', 'EVENTS'][i % 6] as any,
    eventType: (i % 3 === 0 ? 'REDEEM' : 'EARN') as any,
    pointsDelta: i % 3 === 0 ? -(Math.floor(Math.random() * 1000) + 200) : Math.floor(Math.random() * 800) + 100,
    usdValue: (i % 3 === 0 ? -(Math.floor(Math.random() * 1000) + 200) : Math.floor(Math.random() * 800) + 100) * 0.01,
    balanceAfter: 10000 - i * 100,
    description: i % 3 === 0 ? 'Redeemed points' : 'Points earned',
    relatedTransactionId: `txn-${i + 100}`,
    timestamp: `2026-01-${String(10 - Math.floor(i / 2)).padStart(2, '0')}T${String(10 + i).padStart(2, '0')}:00:00Z`,
    expiresAt: i % 3 !== 0 ? `2026-12-${String(10 + i).padStart(2, '0')}T00:00:00Z` : undefined,
  })),
]

// Points by Merchant (User's earning breakdown)
export const MOCK_POINTS_BY_MERCHANT: PointsByMerchant[] = [
  {
    merchantId: 'merchant-hotel-1',
    merchantName: 'Azure Bay Resort & Spa',
    businessType: 'HOSPITALITY',
    earnedPoints: 4285,
    earnedUsdValue: 42.85,
    lastEarnedAt: '2026-01-22T14:30:00Z',
    transactionCount: 3,
  },
  {
    merchantId: 'merchant-rest-1',
    merchantName: 'The Golden Fork',
    businessType: 'RESTAURANT',
    earnedPoints: 2840,
    earnedUsdValue: 28.40,
    lastEarnedAt: '2026-01-20T19:15:00Z',
    transactionCount: 8,
  },
  {
    merchantId: 'merchant-gym-1',
    merchantName: 'PowerFit Gym',
    businessType: 'FITNESS',
    earnedPoints: 3200,
    earnedUsdValue: 32.00,
    lastEarnedAt: '2026-01-08T07:00:00Z',
    transactionCount: 4,
  },
  {
    merchantId: 'merchant-retail-1',
    merchantName: 'TechGear Electronics',
    businessType: 'RETAIL',
    earnedPoints: 2685,
    earnedUsdValue: 26.85,
    lastEarnedAt: '2026-01-15T16:30:00Z',
    transactionCount: 5,
  },
  {
    merchantId: 'merchant-transport-1',
    merchantName: 'QuickRide',
    businessType: 'TRANSPORT',
    earnedPoints: 1540,
    earnedUsdValue: 15.40,
    lastEarnedAt: '2026-01-17T08:20:00Z',
    transactionCount: 12,
  },
  {
    merchantId: 'merchant-event-1',
    merchantName: 'EventPro Ticketing',
    businessType: 'EVENTS',
    earnedPoints: 1200,
    earnedUsdValue: 12.00,
    lastEarnedAt: '2026-01-12T10:00:00Z',
    transactionCount: 2,
  },
]

// Merchant Loyalty Analytics (for merchant dashboard)
export const MOCK_MERCHANT_ANALYTICS: MerchantLoyaltyAnalytics = {
  merchantId: 'merchant-hotel-1',
  period: {
    start: '2026-01-01',
    end: '2026-01-31',
  },
  totalPointsEarned: 45820,
  totalPointsRedeemed: 12340,
  netPointsIssued: 33480,
  totalEarnCostUsd: 458.20,
  totalRedeemRevenueUsd: 123.40,
  netLoyaltyCostUsd: 334.80,
  activeUsers: 148,
  newLoyaltyUsers: 23,
  repeatCustomers: 89,
  averagePointsPerUser: 309.6,
  redemptionRate: 26.9,
  averageBasketWithPoints: 312.50,
  averageBasketWithoutPoints: 245.80,
  settlementOwed: 85.30,
  settlementReceivable: 142.60,
  netSettlementPosition: 57.30,
}

// Loyalty Settlements (Cross-merchant)
export const MOCK_LOYALTY_SETTLEMENTS: LoyaltySettlement[] = [
  {
    id: 'settle-1',
    settlementDate: '2026-01-20',
    fromMerchantId: 'merchant-hotel-1',
    fromMerchantName: 'Azure Bay Resort & Spa',
    toMerchantId: 'merchant-rest-1',
    toMerchantName: 'The Golden Fork',
    pointsValue: 3450,
    usdValue: 34.50,
    wiremiFeePercent: 1.0,
    wiremiFeeAmount: 0.35,
    netSettlementAmount: 34.15,
    transactionIds: ['txn-1', 'txn-2', 'txn-3'],
    userCount: 3,
    status: 'COMPLETED',
    processedAt: '2026-01-20T10:00:00Z',
    completedAt: '2026-01-20T14:30:00Z',
  },
  {
    id: 'settle-2',
    settlementDate: '2026-01-20',
    fromMerchantId: 'merchant-retail-1',
    fromMerchantName: 'TechGear Electronics',
    toMerchantId: 'merchant-hotel-1',
    toMerchantName: 'Azure Bay Resort & Spa',
    pointsValue: 2180,
    usdValue: 21.80,
    wiremiFeePercent: 1.0,
    wiremiFeeAmount: 0.22,
    netSettlementAmount: 21.58,
    transactionIds: ['txn-4', 'txn-5'],
    userCount: 2,
    status: 'COMPLETED',
    processedAt: '2026-01-20T10:00:00Z',
    completedAt: '2026-01-20T14:30:00Z',
  },
  {
    id: 'settle-3',
    settlementDate: '2026-01-22',
    fromMerchantId: 'merchant-gym-1',
    fromMerchantName: 'PowerFit Gym',
    toMerchantId: 'merchant-transport-1',
    toMerchantName: 'QuickRide',
    pointsValue: 1540,
    usdValue: 15.40,
    wiremiFeePercent: 1.0,
    wiremiFeeAmount: 0.15,
    netSettlementAmount: 15.25,
    transactionIds: ['txn-6'],
    userCount: 1,
    status: 'PROCESSING',
    processedAt: '2026-01-22T09:00:00Z',
  },
]

// Breakage Analytics (System-wide)
export const MOCK_BREAKAGE_ANALYTICS: BreakageAnalytics = {
  period: {
    start: '2025-01-01',
    end: '2025-12-31',
  },
  totalPointsIssued: 2450000,
  totalPointsRedeemed: 1820000,
  totalPointsExpired: 185000,
  totalPointsOutstanding: 445000,
  breakageRate: 7.55, // 7.55% expired unused
  breakageRevenueUsd: 1850.00,
}

// User Loyalty Stats (Complete profile)
export const MOCK_USER_LOYALTY_STATS: UserLoyaltyStats = {
  userId: 'user-demo-1',
  memberSince: '2025-08-01T00:00:00Z',
  totalEarned: 18650,
  totalRedeemed: 6200,
  currentBalance: 11230,
  usdValueAvailable: 112.30,
  lifetimeSavings: 62.00,
  favoriteMerchant: {
    merchantId: 'merchant-hotel-1',
    merchantName: 'Azure Bay Resort & Spa',
    pointsEarned: 4285,
  },
  expiringPoints: {
    amount: 850,
    expiryDate: '2026-02-15',
  },
  tier: 'SILVER', // 18,650 lifetime points
}

// Helper function to format points
export const formatPoints = (points: number): string => {
  return new Intl.NumberFormat('en-US').format(points)
}

// Helper function to convert points to USD
export const pointsToUsd = (points: number): number => {
  return points * 0.01
}

// Helper function to convert USD to points
export const usdToPoints = (usd: number): number => {
  return Math.floor(usd * 100)
}

// Helper function to format USD value
export const formatUsdValue = (points: number): string => {
  const usd = pointsToUsd(points)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(usd)
}
