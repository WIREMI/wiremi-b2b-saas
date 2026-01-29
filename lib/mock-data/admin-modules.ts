// Admin Module Management Mock Data
// Full module lifecycle management with version control

export type ModuleLifecycleStatus =
  | 'draft'
  | 'review'
  | 'published'
  | 'active'
  | 'deprecated'
  | 'archived'

export type ModuleCategory =
  | 'payments'
  | 'financial_services'
  | 'commerce'
  | 'industry_specific'
  | 'analytics'
  | 'security'
  | 'integration'

export type PricingModel = 'free' | 'fixed' | 'usage_based' | 'tiered' | 'custom'

export type PlanTier = 'starter' | 'professional' | 'enterprise' | 'custom'

// Module Interface
export interface Module {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  category: ModuleCategory
  type: 'core' | 'addon'
  status: ModuleLifecycleStatus
  version: string
  previousVersions?: string[]

  // Visibility
  isPublic: boolean
  isFeatured: boolean

  // Pricing
  pricingModel: PricingModel
  plans: ModulePlan[]

  // Usage Stats
  activeInstallations: number
  totalRevenue: number
  averageRating?: number
  reviewCount?: number

  // Metadata
  createdDate: string
  publishedDate?: string
  updatedDate: string
  deprecatedDate?: string
  createdBy: string

  // Dependencies
  requiredModules?: string[]
  compatibleWith?: string[]

  // Tags
  tags: string[]

  // Media
  icon?: string
  screenshots?: string[]

  // Documentation
  documentationUrl?: string
  changelogUrl?: string
}

// Module Plan Interface
export interface ModulePlan {
  id: string
  tier: PlanTier
  name: string
  description: string
  monthlyPrice: number
  annualPrice?: number
  features: string[]
  limits?: {
    [key: string]: number | string
  }
  isPopular?: boolean
}

// Module Installation (Business-specific)
export interface ModuleInstallation {
  id: string
  moduleId: string
  businessId: string
  planId: string
  status: 'trial' | 'active' | 'suspended' | 'cancelled'
  installedDate: string
  activatedDate?: string
  trialEndsDate?: string
  cancelledDate?: string

  // Billing
  billingCycle: 'monthly' | 'annual'
  monthlyFee: number
  nextBillingDate?: string

  // Usage
  usage?: {
    current: number
    limit: number
    unit: string
  }

  // Metrics
  lastUsed?: string
  totalUsage?: number
}

// Module Version
export interface ModuleVersion {
  version: string
  releaseDate: string
  changelog: string
  breaking: boolean
  installationCount: number
}

// Module Review
export interface ModuleReview {
  id: string
  moduleId: string
  businessId: string
  businessName: string
  rating: number
  title: string
  review: string
  date: string
  helpful: number
}

// ============================================
// MOCK DATA
// ============================================

// All Modules
export const MOCK_MODULES: Module[] = [
  // Active Core Modules
  {
    id: 'mod_payments_core',
    name: 'Payments Core',
    slug: 'payments-core',
    description: 'Accept payments from customers via multiple methods',
    longDescription: 'Complete payment processing solution supporting cards, bank transfers, mobile money, and more. Built-in fraud detection, PCI compliance, and real-time settlement.',
    category: 'payments',
    type: 'core',
    status: 'active',
    version: '3.2.1',
    previousVersions: ['3.2.0', '3.1.5', '3.0.0'],
    isPublic: true,
    isFeatured: true,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_payments_starter',
        tier: 'starter',
        name: 'Starter',
        description: 'Perfect for small businesses',
        monthlyPrice: 99,
        annualPrice: 990,
        features: [
          'Up to 500 transactions/month',
          'Card payments',
          'Bank transfers',
          'Basic reporting',
          'Email support',
        ],
        limits: {
          transactions: 500,
          volume: 50000,
        },
      },
      {
        id: 'plan_payments_professional',
        tier: 'professional',
        name: 'Professional',
        description: 'For growing businesses',
        monthlyPrice: 299,
        annualPrice: 2990,
        features: [
          'Up to 5,000 transactions/month',
          'All payment methods',
          'Advanced fraud detection',
          'Advanced reporting',
          'Priority support',
          'API access',
        ],
        limits: {
          transactions: 5000,
          volume: 500000,
        },
        isPopular: true,
      },
      {
        id: 'plan_payments_enterprise',
        tier: 'enterprise',
        name: 'Enterprise',
        description: 'For high-volume businesses',
        monthlyPrice: 999,
        annualPrice: 9990,
        features: [
          'Unlimited transactions',
          'Custom payment methods',
          'White-label solution',
          'Dedicated account manager',
          '24/7 phone support',
          'SLA guarantee',
        ],
        limits: {
          transactions: 'unlimited',
          volume: 'unlimited',
        },
      },
    ],
    activeInstallations: 234,
    totalRevenue: 145600,
    averageRating: 4.8,
    reviewCount: 87,
    createdDate: '2023-01-15',
    publishedDate: '2023-02-01',
    updatedDate: '2024-01-20',
    createdBy: 'Platform Team',
    tags: ['payments', 'core', 'essential'],
    documentationUrl: 'https://docs.wiremi.com/payments-core',
    changelogUrl: 'https://docs.wiremi.com/payments-core/changelog',
  },
  {
    id: 'mod_payouts',
    name: 'Payouts',
    slug: 'payouts',
    description: 'Send money to vendors, employees, and partners',
    longDescription: 'Automate mass payouts to bank accounts, mobile wallets, and cards. Support for scheduled payments, recurring disbursements, and batch processing.',
    category: 'payments',
    type: 'addon',
    status: 'active',
    version: '2.1.0',
    previousVersions: ['2.0.3', '1.9.0'],
    isPublic: true,
    isFeatured: true,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_payouts_starter',
        tier: 'starter',
        name: 'Starter',
        description: 'Basic payout functionality',
        monthlyPrice: 49,
        features: [
          'Up to 100 payouts/month',
          'Bank transfers',
          'Basic scheduling',
          'CSV import',
        ],
        limits: {
          payouts: 100,
        },
      },
      {
        id: 'plan_payouts_professional',
        tier: 'professional',
        name: 'Professional',
        description: 'Advanced payout features',
        monthlyPrice: 149,
        features: [
          'Up to 1,000 payouts/month',
          'All payout methods',
          'Recurring payouts',
          'API access',
          'Batch processing',
        ],
        limits: {
          payouts: 1000,
        },
        isPopular: true,
      },
      {
        id: 'plan_payouts_enterprise',
        tier: 'enterprise',
        name: 'Enterprise',
        description: 'Unlimited payouts',
        monthlyPrice: 399,
        features: [
          'Unlimited payouts',
          'White-label',
          'Dedicated support',
          'Custom workflows',
        ],
        limits: {
          payouts: 'unlimited',
        },
      },
    ],
    activeInstallations: 156,
    totalRevenue: 45200,
    averageRating: 4.6,
    reviewCount: 42,
    createdDate: '2023-03-10',
    publishedDate: '2023-04-01',
    updatedDate: '2024-01-18',
    createdBy: 'Platform Team',
    requiredModules: ['mod_payments_core'],
    tags: ['payouts', 'disbursements', 'mass payments'],
    documentationUrl: 'https://docs.wiremi.com/payouts',
  },
  {
    id: 'mod_virtual_cards',
    name: 'Virtual Cards',
    slug: 'virtual-cards',
    description: 'Issue virtual cards for online purchases and subscriptions',
    longDescription: 'Create instant virtual cards for employees and teams. Set spending limits, track expenses, and freeze cards remotely. Integrated with major card networks.',
    category: 'financial_services',
    type: 'addon',
    status: 'active',
    version: '1.5.2',
    previousVersions: ['1.5.1', '1.4.0'],
    isPublic: true,
    isFeatured: true,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_vcards_starter',
        tier: 'starter',
        name: 'Starter',
        description: 'Up to 10 active cards',
        monthlyPrice: 199,
        features: [
          '10 active virtual cards',
          'Basic spending controls',
          'Transaction notifications',
          'Monthly reports',
        ],
        limits: {
          active_cards: 10,
          monthly_spend: 10000,
        },
      },
      {
        id: 'plan_vcards_professional',
        tier: 'professional',
        name: 'Professional',
        description: 'Up to 50 active cards',
        monthlyPrice: 499,
        features: [
          '50 active virtual cards',
          'Advanced spending controls',
          'Real-time alerts',
          'Expense categorization',
          'API access',
        ],
        limits: {
          active_cards: 50,
          monthly_spend: 50000,
        },
        isPopular: true,
      },
      {
        id: 'plan_vcards_enterprise',
        tier: 'enterprise',
        name: 'Enterprise',
        description: 'Unlimited cards',
        monthlyPrice: 999,
        features: [
          'Unlimited virtual cards',
          'Custom approval workflows',
          'Advanced analytics',
          'Dedicated support',
          'White-label',
        ],
        limits: {
          active_cards: 'unlimited',
          monthly_spend: 'unlimited',
        },
      },
    ],
    activeInstallations: 89,
    totalRevenue: 67800,
    averageRating: 4.7,
    reviewCount: 31,
    createdDate: '2023-06-20',
    publishedDate: '2023-07-15',
    updatedDate: '2024-01-22',
    createdBy: 'Cards Team',
    requiredModules: ['mod_payments_core'],
    tags: ['cards', 'expense management', 'virtual'],
    documentationUrl: 'https://docs.wiremi.com/virtual-cards',
  },
  {
    id: 'mod_fx_trading',
    name: 'FX Trading',
    slug: 'fx-trading',
    description: 'Multi-currency accounts and foreign exchange',
    longDescription: 'Hold balances in 30+ currencies and exchange at competitive rates. Real-time rates, forward contracts, and automated conversions.',
    category: 'financial_services',
    type: 'addon',
    status: 'active',
    version: '2.0.1',
    isPublic: true,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_fx_professional',
        tier: 'professional',
        name: 'Professional',
        description: 'Multi-currency for businesses',
        monthlyPrice: 199,
        features: [
          'Hold up to 10 currencies',
          'Competitive FX rates',
          'Real-time conversion',
          'Basic hedging tools',
        ],
        limits: {
          currencies: 10,
          monthly_volume: 100000,
        },
        isPopular: true,
      },
      {
        id: 'plan_fx_enterprise',
        tier: 'enterprise',
        name: 'Enterprise',
        description: 'Advanced FX solutions',
        monthlyPrice: 499,
        features: [
          'Hold unlimited currencies',
          'Preferential rates',
          'Forward contracts',
          'API access',
          'Dedicated FX specialist',
        ],
        limits: {
          currencies: 'unlimited',
          monthly_volume: 'unlimited',
        },
      },
    ],
    activeInstallations: 67,
    totalRevenue: 34500,
    averageRating: 4.5,
    reviewCount: 19,
    createdDate: '2023-05-10',
    publishedDate: '2023-06-01',
    updatedDate: '2024-01-15',
    createdBy: 'FX Team',
    tags: ['forex', 'multi-currency', 'international'],
    documentationUrl: 'https://docs.wiremi.com/fx-trading',
  },
  {
    id: 'mod_escrow',
    name: 'Escrow Services',
    slug: 'escrow',
    description: 'Secure escrow for marketplace and high-value transactions',
    longDescription: 'Hold funds securely until conditions are met. Perfect for marketplaces, freelance platforms, and B2B transactions. Automated release triggers.',
    category: 'financial_services',
    type: 'addon',
    status: 'active',
    version: '1.2.0',
    isPublic: true,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_escrow_professional',
        tier: 'professional',
        name: 'Professional',
        description: 'Escrow for platforms',
        monthlyPrice: 299,
        features: [
          'Up to 50 active escrows',
          'Automated releases',
          'Dispute management',
          'API integration',
        ],
        limits: {
          active_escrows: 50,
        },
        isPopular: true,
      },
      {
        id: 'plan_escrow_enterprise',
        tier: 'enterprise',
        name: 'Enterprise',
        description: 'Unlimited escrow',
        monthlyPrice: 699,
        features: [
          'Unlimited escrows',
          'Custom workflows',
          'Advanced dispute resolution',
          'White-label',
          'Dedicated support',
        ],
        limits: {
          active_escrows: 'unlimited',
        },
      },
    ],
    activeInstallations: 45,
    totalRevenue: 23400,
    averageRating: 4.8,
    reviewCount: 14,
    createdDate: '2023-08-15',
    publishedDate: '2023-09-01',
    updatedDate: '2024-01-10',
    createdBy: 'Escrow Team',
    requiredModules: ['mod_payments_core'],
    tags: ['escrow', 'marketplace', 'trust'],
    documentationUrl: 'https://docs.wiremi.com/escrow',
  },
  {
    id: 'mod_education_payments',
    name: 'Education Payments',
    slug: 'education-payments',
    description: 'Fee collection and payment plans for educational institutions',
    longDescription: 'Complete fee management for schools and universities. Installment plans, scholarship tracking, student portals, and automated reminders.',
    category: 'industry_specific',
    type: 'addon',
    status: 'active',
    version: '1.0.5',
    isPublic: true,
    isFeatured: true,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_edu_starter',
        tier: 'starter',
        name: 'Starter',
        description: 'Up to 500 students',
        monthlyPrice: 149,
        features: [
          'Up to 500 students',
          'Fee collection',
          'Basic installment plans',
          'Student portal',
          'Email notifications',
        ],
        limits: {
          students: 500,
        },
      },
      {
        id: 'plan_edu_professional',
        tier: 'professional',
        name: 'Professional',
        description: 'Up to 2,000 students',
        monthlyPrice: 399,
        features: [
          'Up to 2,000 students',
          'Advanced fee structures',
          'Scholarship management',
          'Automated reminders',
          'Reporting & analytics',
          'API access',
        ],
        limits: {
          students: 2000,
        },
        isPopular: true,
      },
      {
        id: 'plan_edu_enterprise',
        tier: 'enterprise',
        name: 'Enterprise',
        description: 'Unlimited students',
        monthlyPrice: 999,
        features: [
          'Unlimited students',
          'Multi-campus support',
          'Custom workflows',
          'White-label',
          'Dedicated support',
          'SIS integration',
        ],
        limits: {
          students: 'unlimited',
        },
      },
    ],
    activeInstallations: 78,
    totalRevenue: 56700,
    averageRating: 4.9,
    reviewCount: 28,
    createdDate: '2023-09-20',
    publishedDate: '2023-10-15',
    updatedDate: '2024-01-25',
    createdBy: 'Education Team',
    requiredModules: ['mod_payments_core'],
    tags: ['education', 'schools', 'tuition', 'fees'],
    documentationUrl: 'https://docs.wiremi.com/education',
  },

  // Published (Not Yet Active)
  {
    id: 'mod_hospitality',
    name: 'Hospitality Management',
    slug: 'hospitality',
    description: 'POS, reservations, and payments for hotels and restaurants',
    longDescription: 'All-in-one solution for hospitality businesses. Table management, room reservations, split bills, tips, and integrated payments.',
    category: 'industry_specific',
    type: 'addon',
    status: 'published',
    version: '1.0.0',
    isPublic: true,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_hosp_starter',
        tier: 'starter',
        name: 'Starter',
        description: 'Single location',
        monthlyPrice: 199,
        features: [
          'Single location',
          'POS system',
          'Table management',
          'Basic reporting',
        ],
        limits: {
          locations: 1,
          tables: 20,
        },
      },
      {
        id: 'plan_hosp_professional',
        tier: 'professional',
        name: 'Professional',
        description: 'Multiple locations',
        monthlyPrice: 499,
        features: [
          'Up to 5 locations',
          'Advanced POS',
          'Reservations',
          'Inventory management',
          'Staff management',
        ],
        limits: {
          locations: 5,
          tables: 100,
        },
        isPopular: true,
      },
    ],
    activeInstallations: 12,
    totalRevenue: 8900,
    averageRating: 4.3,
    reviewCount: 5,
    createdDate: '2023-11-10',
    publishedDate: '2024-01-05',
    updatedDate: '2024-01-20',
    createdBy: 'Hospitality Team',
    requiredModules: ['mod_payments_core'],
    tags: ['hospitality', 'pos', 'restaurants', 'hotels'],
    documentationUrl: 'https://docs.wiremi.com/hospitality',
  },

  // In Review
  {
    id: 'mod_subscription_billing',
    name: 'Subscription Billing',
    slug: 'subscription-billing',
    description: 'Recurring billing and subscription management',
    longDescription: 'Automate recurring payments for subscription businesses. Support for trials, prorations, dunning, and customer self-service portals.',
    category: 'commerce',
    type: 'addon',
    status: 'review',
    version: '0.9.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_sub_professional',
        tier: 'professional',
        name: 'Professional',
        description: 'Subscription management',
        monthlyPrice: 249,
        features: [
          'Up to 1,000 subscribers',
          'Automated billing',
          'Trial periods',
          'Customer portal',
          'Basic analytics',
        ],
        limits: {
          subscribers: 1000,
        },
      },
    ],
    activeInstallations: 0,
    totalRevenue: 0,
    createdDate: '2024-01-10',
    updatedDate: '2024-01-24',
    createdBy: 'Commerce Team',
    requiredModules: ['mod_payments_core'],
    tags: ['subscriptions', 'recurring', 'saas'],
  },

  // Draft
  {
    id: 'mod_crypto_payments',
    name: 'Crypto Payments',
    slug: 'crypto-payments',
    description: 'Accept cryptocurrency payments (Bitcoin, Ethereum, etc.)',
    longDescription: 'Accept payments in major cryptocurrencies with automatic conversion to fiat. Support for Bitcoin, Ethereum, USDC, and more.',
    category: 'payments',
    type: 'addon',
    status: 'draft',
    version: '0.1.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'custom',
    plans: [],
    activeInstallations: 0,
    totalRevenue: 0,
    createdDate: '2024-01-20',
    updatedDate: '2024-01-25',
    createdBy: 'Innovation Lab',
    tags: ['crypto', 'bitcoin', 'blockchain'],
  },

  // More Published Modules
  {
    id: 'mod_invoicing',
    name: 'Smart Invoicing',
    slug: 'invoicing',
    description: 'Professional invoicing with automated reminders',
    longDescription: 'Create and send professional invoices with automated payment reminders, recurring invoices, and multi-currency support.',
    category: 'commerce',
    type: 'addon',
    status: 'published',
    version: '2.3.0',
    isPublic: true,
    isFeatured: true,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_inv_starter',
        tier: 'starter',
        name: 'Starter',
        description: 'Basic invoicing',
        monthlyPrice: 29,
        features: ['Up to 50 invoices/month', 'Email delivery', 'Basic templates', 'Payment tracking'],
        limits: { invoices: 50 },
      },
      {
        id: 'plan_inv_pro',
        tier: 'professional',
        name: 'Professional',
        description: 'Advanced invoicing',
        monthlyPrice: 79,
        features: ['Unlimited invoices', 'Custom branding', 'Recurring invoices', 'Multi-currency', 'API access'],
        limits: { invoices: 'unlimited' },
        isPopular: true,
      },
    ],
    activeInstallations: 198,
    totalRevenue: 38700,
    averageRating: 4.7,
    reviewCount: 56,
    createdDate: '2023-04-20',
    publishedDate: '2023-05-10',
    updatedDate: '2024-01-23',
    createdBy: 'Commerce Team',
    requiredModules: ['mod_payments_core'],
    tags: ['invoicing', 'billing', 'payments'],
    documentationUrl: 'https://docs.wiremi.com/invoicing',
  },
  {
    id: 'mod_pos_retail',
    name: 'Retail POS',
    slug: 'pos-retail',
    description: 'Point of sale system for retail businesses',
    longDescription: 'Complete POS solution with inventory management, barcode scanning, and multi-location support.',
    category: 'commerce',
    type: 'addon',
    status: 'published',
    version: '1.8.2',
    isPublic: true,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_pos_single',
        tier: 'starter',
        name: 'Single Location',
        description: 'One store POS',
        monthlyPrice: 149,
        features: ['1 location', 'Inventory management', 'Employee management', 'Basic reporting'],
        limits: { locations: 1 },
        isPopular: true,
      },
    ],
    activeInstallations: 134,
    totalRevenue: 42300,
    averageRating: 4.5,
    reviewCount: 38,
    createdDate: '2023-05-15',
    publishedDate: '2023-06-20',
    updatedDate: '2024-01-19',
    createdBy: 'Commerce Team',
    requiredModules: ['mod_payments_core'],
    tags: ['pos', 'retail', 'inventory'],
    documentationUrl: 'https://docs.wiremi.com/pos-retail',
  },
  {
    id: 'mod_fraud_detection',
    name: 'Advanced Fraud Detection',
    slug: 'fraud-detection',
    description: 'AI-powered fraud prevention and risk scoring',
    longDescription: 'Machine learning-based fraud detection with real-time risk scoring, behavioral analysis, and automated blocking.',
    category: 'security',
    type: 'addon',
    status: 'published',
    version: '1.4.0',
    isPublic: true,
    isFeatured: true,
    pricingModel: 'usage_based',
    plans: [
      {
        id: 'plan_fraud_pro',
        tier: 'professional',
        name: 'Professional',
        description: 'AI fraud prevention',
        monthlyPrice: 299,
        features: ['Real-time scoring', 'Behavioral analysis', 'Custom rules', 'Automated blocking'],
        isPopular: true,
      },
    ],
    activeInstallations: 112,
    totalRevenue: 78400,
    averageRating: 4.9,
    reviewCount: 44,
    createdDate: '2023-07-10',
    publishedDate: '2023-08-15',
    updatedDate: '2024-01-21',
    createdBy: 'Security Team',
    requiredModules: ['mod_payments_core'],
    tags: ['security', 'fraud', 'ai', 'risk'],
    documentationUrl: 'https://docs.wiremi.com/fraud-detection',
  },
  {
    id: 'mod_analytics_pro',
    name: 'Business Analytics Pro',
    slug: 'analytics-pro',
    description: 'Advanced analytics and business intelligence',
    longDescription: 'Comprehensive analytics suite with custom dashboards, predictive insights, and data export capabilities.',
    category: 'analytics',
    type: 'addon',
    status: 'published',
    version: '2.1.5',
    isPublic: true,
    isFeatured: true,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_analytics_pro',
        tier: 'professional',
        name: 'Professional',
        description: 'Advanced analytics',
        monthlyPrice: 199,
        features: ['Custom dashboards', 'Predictive analytics', 'Data export', 'API access'],
        isPopular: true,
      },
    ],
    activeInstallations: 167,
    totalRevenue: 56200,
    averageRating: 4.6,
    reviewCount: 51,
    createdDate: '2023-06-01',
    publishedDate: '2023-07-01',
    updatedDate: '2024-01-24',
    createdBy: 'Analytics Team',
    tags: ['analytics', 'reporting', 'insights'],
    documentationUrl: 'https://docs.wiremi.com/analytics-pro',
  },
  {
    id: 'mod_accounting_sync',
    name: 'Accounting Integration',
    slug: 'accounting-sync',
    description: 'Sync with QuickBooks, Xero, and other accounting software',
    longDescription: 'Automated sync with popular accounting platforms. Real-time transaction syncing and reconciliation.',
    category: 'integration',
    type: 'addon',
    status: 'published',
    version: '1.6.0',
    isPublic: true,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_acct_pro',
        tier: 'professional',
        name: 'Professional',
        description: 'Accounting sync',
        monthlyPrice: 99,
        features: ['QuickBooks sync', 'Xero sync', 'Auto reconciliation', 'Real-time updates'],
        isPopular: true,
      },
    ],
    activeInstallations: 145,
    totalRevenue: 32400,
    averageRating: 4.4,
    reviewCount: 29,
    createdDate: '2023-07-20',
    publishedDate: '2023-08-25',
    updatedDate: '2024-01-18',
    createdBy: 'Integration Team',
    tags: ['accounting', 'integration', 'quickbooks', 'xero'],
    documentationUrl: 'https://docs.wiremi.com/accounting-sync',
  },
  {
    id: 'mod_loyalty_rewards',
    name: 'Loyalty & Rewards',
    slug: 'loyalty-rewards',
    description: 'Customer loyalty programs and rewards management',
    longDescription: 'Build customer loyalty with points, rewards, and tiered membership programs. Automated campaigns and gamification.',
    category: 'commerce',
    type: 'addon',
    status: 'published',
    version: '1.3.0',
    isPublic: true,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_loyalty_starter',
        tier: 'starter',
        name: 'Starter',
        description: 'Basic loyalty',
        monthlyPrice: 149,
        features: ['Up to 1,000 members', 'Points system', 'Basic rewards', 'Email campaigns'],
        limits: { members: 1000 },
        isPopular: true,
      },
    ],
    activeInstallations: 98,
    totalRevenue: 28600,
    averageRating: 4.5,
    reviewCount: 22,
    createdDate: '2023-08-10',
    publishedDate: '2023-09-15',
    updatedDate: '2024-01-20',
    createdBy: 'Commerce Team',
    tags: ['loyalty', 'rewards', 'retention', 'marketing'],
    documentationUrl: 'https://docs.wiremi.com/loyalty-rewards',
  },
  {
    id: 'mod_marketplace',
    name: 'Marketplace Platform',
    slug: 'marketplace',
    description: 'Multi-vendor marketplace with split payments',
    longDescription: 'Complete marketplace solution with vendor onboarding, commission management, and automated split payments.',
    category: 'commerce',
    type: 'addon',
    status: 'published',
    version: '1.1.2',
    isPublic: true,
    isFeatured: true,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_mkt_pro',
        tier: 'professional',
        name: 'Professional',
        description: 'Marketplace platform',
        monthlyPrice: 499,
        features: ['Unlimited vendors', 'Commission management', 'Split payments', 'Vendor dashboards'],
        isPopular: true,
      },
    ],
    activeInstallations: 76,
    totalRevenue: 54300,
    averageRating: 4.8,
    reviewCount: 18,
    createdDate: '2023-09-01',
    publishedDate: '2023-10-10',
    updatedDate: '2024-01-22',
    createdBy: 'Marketplace Team',
    requiredModules: ['mod_payments_core', 'mod_escrow'],
    tags: ['marketplace', 'multi-vendor', 'ecommerce'],
    documentationUrl: 'https://docs.wiremi.com/marketplace',
  },
  {
    id: 'mod_kyc_verification',
    name: 'KYC Verification',
    slug: 'kyc-verification',
    description: 'Automated identity verification and compliance',
    longDescription: 'Streamline KYC/KYB processes with automated document verification, facial recognition, and compliance checks.',
    category: 'security',
    type: 'addon',
    status: 'published',
    version: '1.5.1',
    isPublic: true,
    isFeatured: false,
    pricingModel: 'usage_based',
    plans: [
      {
        id: 'plan_kyc_pro',
        tier: 'professional',
        name: 'Professional',
        description: 'KYC verification',
        monthlyPrice: 249,
        features: ['Document verification', 'Facial recognition', 'AML screening', 'API access'],
        isPopular: true,
      },
    ],
    activeInstallations: 89,
    totalRevenue: 45700,
    averageRating: 4.7,
    reviewCount: 27,
    createdDate: '2023-06-15',
    publishedDate: '2023-07-20',
    updatedDate: '2024-01-19',
    createdBy: 'Compliance Team',
    tags: ['kyc', 'compliance', 'verification', 'aml'],
    documentationUrl: 'https://docs.wiremi.com/kyc-verification',
  },
  {
    id: 'mod_mobile_sdk',
    name: 'Mobile SDK',
    slug: 'mobile-sdk',
    description: 'Native mobile SDKs for iOS and Android',
    longDescription: 'Build mobile payment experiences with our native SDKs. Support for Apple Pay, Google Pay, and in-app purchases.',
    category: 'integration',
    type: 'addon',
    status: 'published',
    version: '2.0.3',
    isPublic: true,
    isFeatured: true,
    pricingModel: 'free',
    plans: [
      {
        id: 'plan_mobile_free',
        tier: 'starter',
        name: 'Free',
        description: 'Mobile SDKs',
        monthlyPrice: 0,
        features: ['iOS SDK', 'Android SDK', 'Documentation', 'Community support'],
      },
    ],
    activeInstallations: 234,
    totalRevenue: 0,
    averageRating: 4.8,
    reviewCount: 67,
    createdDate: '2023-03-01',
    publishedDate: '2023-04-05',
    updatedDate: '2024-01-25',
    createdBy: 'Mobile Team',
    tags: ['mobile', 'sdk', 'ios', 'android'],
    documentationUrl: 'https://docs.wiremi.com/mobile-sdk',
  },
  {
    id: 'mod_webhooks',
    name: 'Webhook Management',
    slug: 'webhooks',
    description: 'Real-time event notifications via webhooks',
    longDescription: 'Configure webhooks for real-time notifications. Retry logic, signature verification, and event filtering.',
    category: 'integration',
    type: 'core',
    status: 'active',
    version: '1.7.0',
    isPublic: true,
    isFeatured: false,
    pricingModel: 'free',
    plans: [
      {
        id: 'plan_webhook_free',
        tier: 'starter',
        name: 'Free',
        description: 'Webhook notifications',
        monthlyPrice: 0,
        features: ['Unlimited webhooks', 'Event filtering', 'Retry logic', 'Signature verification'],
      },
    ],
    activeInstallations: 287,
    totalRevenue: 0,
    averageRating: 4.6,
    reviewCount: 82,
    createdDate: '2023-02-10',
    publishedDate: '2023-03-01',
    updatedDate: '2024-01-20',
    createdBy: 'Platform Team',
    tags: ['webhooks', 'events', 'integration'],
    documentationUrl: 'https://docs.wiremi.com/webhooks',
  },
  {
    id: 'mod_tax_automation',
    name: 'Tax Automation',
    slug: 'tax-automation',
    description: 'Automated tax calculation and compliance',
    longDescription: 'Calculate and collect taxes automatically based on location. VAT, GST, and sales tax support with compliance reporting.',
    category: 'financial_services',
    type: 'addon',
    status: 'published',
    version: '1.2.1',
    isPublic: true,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_tax_pro',
        tier: 'professional',
        name: 'Professional',
        description: 'Tax automation',
        monthlyPrice: 179,
        features: ['Multi-jurisdiction', 'Auto calculations', 'Compliance reporting', 'Tax filing support'],
        isPopular: true,
      },
    ],
    activeInstallations: 121,
    totalRevenue: 39800,
    averageRating: 4.5,
    reviewCount: 34,
    createdDate: '2023-08-20',
    publishedDate: '2023-09-25',
    updatedDate: '2024-01-17',
    createdBy: 'Compliance Team',
    tags: ['tax', 'vat', 'gst', 'compliance'],
    documentationUrl: 'https://docs.wiremi.com/tax-automation',
  },
  {
    id: 'mod_ticketing',
    name: 'Event Ticketing',
    slug: 'event-ticketing',
    description: 'Event ticketing and admission management',
    longDescription: 'Sell tickets for events with QR codes, check-in management, and capacity controls. Perfect for venues and event organizers.',
    category: 'industry_specific',
    type: 'addon',
    status: 'published',
    version: '1.1.0',
    isPublic: true,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [
      {
        id: 'plan_ticket_starter',
        tier: 'starter',
        name: 'Starter',
        description: 'Small events',
        monthlyPrice: 99,
        features: ['Up to 500 tickets/month', 'QR codes', 'Check-in app', 'Basic analytics'],
        limits: { tickets: 500 },
        isPopular: true,
      },
    ],
    activeInstallations: 67,
    totalRevenue: 18900,
    averageRating: 4.6,
    reviewCount: 16,
    createdDate: '2023-10-01',
    publishedDate: '2023-11-05',
    updatedDate: '2024-01-23',
    createdBy: 'Events Team',
    requiredModules: ['mod_payments_core'],
    tags: ['events', 'ticketing', 'qr-codes'],
    documentationUrl: 'https://docs.wiremi.com/ticketing',
  },

  // Draft Modules
  {
    id: 'mod_crypto_payments',
    name: 'Crypto Payments',
    slug: 'crypto-payments',
    description: 'Accept cryptocurrency payments (Bitcoin, Ethereum, etc.)',
    longDescription: 'Accept payments in major cryptocurrencies with automatic conversion to fiat. Support for Bitcoin, Ethereum, USDC, and more.',
    category: 'payments',
    type: 'addon',
    status: 'draft',
    version: '0.1.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'custom',
    plans: [],
    activeInstallations: 0,
    totalRevenue: 0,
    createdDate: '2024-01-20',
    updatedDate: '2024-01-25',
    createdBy: 'Innovation Lab',
    tags: ['crypto', 'bitcoin', 'blockchain'],
  },
  {
    id: 'mod_ai_insights',
    name: 'AI Business Insights',
    slug: 'ai-insights',
    description: 'AI-powered business recommendations and forecasting',
    longDescription: 'Get AI-driven insights about your business. Revenue forecasting, customer behavior analysis, and automated recommendations.',
    category: 'analytics',
    type: 'addon',
    status: 'draft',
    version: '0.2.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [],
    activeInstallations: 0,
    totalRevenue: 0,
    createdDate: '2024-01-15',
    updatedDate: '2024-01-26',
    createdBy: 'AI Team',
    tags: ['ai', 'insights', 'forecasting'],
  },
  {
    id: 'mod_social_commerce',
    name: 'Social Commerce',
    slug: 'social-commerce',
    description: 'Sell directly on social media platforms',
    longDescription: 'Integrate with Instagram, Facebook, TikTok for direct selling. Manage inventory and orders from a single dashboard.',
    category: 'commerce',
    type: 'addon',
    status: 'draft',
    version: '0.3.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [],
    activeInstallations: 0,
    totalRevenue: 0,
    createdDate: '2024-01-12',
    updatedDate: '2024-01-24',
    createdBy: 'Commerce Team',
    tags: ['social', 'instagram', 'facebook', 'tiktok'],
  },
  {
    id: 'mod_lending',
    name: 'Business Lending',
    slug: 'business-lending',
    description: 'Offer loans and credit to businesses',
    longDescription: 'Provide working capital loans to businesses. Credit scoring, automated underwriting, and repayment tracking.',
    category: 'financial_services',
    type: 'addon',
    status: 'draft',
    version: '0.1.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'custom',
    plans: [],
    activeInstallations: 0,
    totalRevenue: 0,
    createdDate: '2024-01-18',
    updatedDate: '2024-01-25',
    createdBy: 'Lending Team',
    tags: ['lending', 'loans', 'credit'],
  },
  {
    id: 'mod_nft_marketplace',
    name: 'NFT Marketplace',
    slug: 'nft-marketplace',
    description: 'Create and sell NFTs with integrated payments',
    longDescription: 'Launch your NFT marketplace. Minting, listing, and trading with crypto and fiat payment support.',
    category: 'commerce',
    type: 'addon',
    status: 'draft',
    version: '0.1.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'custom',
    plans: [],
    activeInstallations: 0,
    totalRevenue: 0,
    createdDate: '2024-01-22',
    updatedDate: '2024-01-26',
    createdBy: 'Innovation Lab',
    tags: ['nft', 'web3', 'blockchain'],
  },
  {
    id: 'mod_insurance',
    name: 'Insurance Products',
    slug: 'insurance',
    description: 'Sell insurance products to customers',
    longDescription: 'Offer insurance products through your platform. Claims management, policy tracking, and automated underwriting.',
    category: 'financial_services',
    type: 'addon',
    status: 'draft',
    version: '0.2.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'custom',
    plans: [],
    activeInstallations: 0,
    totalRevenue: 0,
    createdDate: '2024-01-14',
    updatedDate: '2024-01-23',
    createdBy: 'Insurance Team',
    tags: ['insurance', 'claims', 'underwriting'],
  },
  {
    id: 'mod_crowdfunding',
    name: 'Crowdfunding Platform',
    slug: 'crowdfunding',
    description: 'Launch crowdfunding campaigns',
    longDescription: 'Create crowdfunding campaigns with goal tracking, backer management, and perk fulfillment.',
    category: 'commerce',
    type: 'addon',
    status: 'draft',
    version: '0.1.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [],
    activeInstallations: 0,
    totalRevenue: 0,
    createdDate: '2024-01-16',
    updatedDate: '2024-01-25',
    createdBy: 'Commerce Team',
    tags: ['crowdfunding', 'campaigns', 'backers'],
  },
  {
    id: 'mod_sustainability',
    name: 'Sustainability Tracking',
    slug: 'sustainability',
    description: 'Track and report on carbon footprint and ESG metrics',
    longDescription: 'Monitor environmental impact of transactions. Carbon offset integration and ESG reporting.',
    category: 'analytics',
    type: 'addon',
    status: 'draft',
    version: '0.1.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'tiered',
    plans: [],
    activeInstallations: 0,
    totalRevenue: 0,
    createdDate: '2024-01-19',
    updatedDate: '2024-01-26',
    createdBy: 'Sustainability Team',
    tags: ['sustainability', 'esg', 'carbon'],
  },

  // Deprecated Modules
  {
    id: 'mod_legacy_cards',
    name: 'Legacy Card Processing',
    slug: 'legacy-cards',
    description: 'DEPRECATED: Migrate to Payments Core',
    longDescription: 'This module is deprecated. Please migrate to Payments Core for continued support.',
    category: 'payments',
    type: 'addon',
    status: 'deprecated',
    version: '2.5.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'fixed',
    plans: [],
    activeInstallations: 23,
    totalRevenue: 5600,
    createdDate: '2022-01-15',
    publishedDate: '2022-02-01',
    updatedDate: '2023-12-01',
    deprecatedDate: '2023-12-01',
    createdBy: 'Platform Team',
    tags: ['deprecated', 'legacy'],
  },
  {
    id: 'mod_old_reports',
    name: 'Legacy Reporting',
    slug: 'old-reports',
    description: 'DEPRECATED: Upgrade to Business Analytics Pro',
    longDescription: 'Legacy reporting module. Migrate to Business Analytics Pro for enhanced features and continued support.',
    category: 'analytics',
    type: 'addon',
    status: 'deprecated',
    version: '1.9.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'fixed',
    plans: [],
    activeInstallations: 18,
    totalRevenue: 3200,
    createdDate: '2022-03-10',
    publishedDate: '2022-04-01',
    updatedDate: '2023-11-15',
    deprecatedDate: '2023-11-15',
    createdBy: 'Analytics Team',
    tags: ['deprecated', 'reporting'],
  },
  {
    id: 'mod_old_api',
    name: 'API v1',
    slug: 'api-v1',
    description: 'DEPRECATED: Migrate to API v2',
    longDescription: 'Original API version. Please upgrade to API v2 for improved performance and new features.',
    category: 'integration',
    type: 'core',
    status: 'deprecated',
    version: '1.0.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'free',
    plans: [],
    activeInstallations: 45,
    totalRevenue: 0,
    createdDate: '2021-06-01',
    publishedDate: '2021-07-01',
    updatedDate: '2023-10-01',
    deprecatedDate: '2023-10-01',
    createdBy: 'Platform Team',
    tags: ['deprecated', 'api', 'legacy'],
  },
  {
    id: 'mod_basic_sms',
    name: 'Basic SMS Notifications',
    slug: 'basic-sms',
    description: 'DEPRECATED: Use Advanced Notifications',
    longDescription: 'Basic SMS notification service. Replaced by Advanced Notifications with multi-channel support.',
    category: 'integration',
    type: 'addon',
    status: 'deprecated',
    version: '1.5.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'usage_based',
    plans: [],
    activeInstallations: 12,
    totalRevenue: 1800,
    createdDate: '2022-05-20',
    publishedDate: '2022-06-15',
    updatedDate: '2023-12-10',
    deprecatedDate: '2023-12-10',
    createdBy: 'Messaging Team',
    tags: ['deprecated', 'sms', 'notifications'],
  },
  {
    id: 'mod_simple_checkout',
    name: 'Simple Checkout',
    slug: 'simple-checkout',
    description: 'DEPRECATED: Integrated into Payments Core',
    longDescription: 'Basic checkout functionality now included in Payments Core. No migration needed.',
    category: 'payments',
    type: 'addon',
    status: 'deprecated',
    version: '2.1.0',
    isPublic: false,
    isFeatured: false,
    pricingModel: 'fixed',
    plans: [],
    activeInstallations: 34,
    totalRevenue: 4500,
    createdDate: '2022-02-15',
    publishedDate: '2022-03-20',
    updatedDate: '2023-11-20',
    deprecatedDate: '2023-11-20',
    createdBy: 'Payments Team',
    tags: ['deprecated', 'checkout'],
  },
]

// Module Versions
export const MOCK_MODULE_VERSIONS: Record<string, ModuleVersion[]> = {
  mod_payments_core: [
    {
      version: '3.2.1',
      releaseDate: '2024-01-20',
      changelog: 'Bug fixes and performance improvements',
      breaking: false,
      installationCount: 234,
    },
    {
      version: '3.2.0',
      releaseDate: '2024-01-10',
      changelog: 'Added support for Apple Pay and Google Pay',
      breaking: false,
      installationCount: 228,
    },
    {
      version: '3.1.5',
      releaseDate: '2023-12-15',
      changelog: 'Security updates and improved fraud detection',
      breaking: false,
      installationCount: 215,
    },
    {
      version: '3.0.0',
      releaseDate: '2023-11-01',
      changelog: 'Major version with new API design',
      breaking: true,
      installationCount: 180,
    },
  ],
}

// Module Reviews
export const MOCK_MODULE_REVIEWS: ModuleReview[] = [
  {
    id: 'rev_001',
    moduleId: 'mod_payments_core',
    businessId: 'biz_001',
    businessName: 'Acme Corporation',
    rating: 5,
    title: 'Best payment solution we\'ve used',
    review: 'Easy integration, excellent documentation, and great support. Our payment acceptance rate improved by 15%.',
    date: '2024-01-15',
    helpful: 12,
  },
  {
    id: 'rev_002',
    moduleId: 'mod_payments_core',
    businessId: 'biz_002',
    businessName: 'Global Trade Inc',
    rating: 4,
    title: 'Great features, some room for improvement',
    review: 'Love the fraud detection, but would like more customization options for the checkout flow.',
    date: '2024-01-10',
    helpful: 8,
  },
  {
    id: 'rev_003',
    moduleId: 'mod_education_payments',
    businessId: 'biz_006',
    businessName: 'EduTech Solutions',
    rating: 5,
    title: 'Perfect for our university',
    review: 'Installment plans work flawlessly. Parents love the automated reminders. Highly recommended!',
    date: '2024-01-22',
    helpful: 15,
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getModuleById(id: string): Module | undefined {
  return MOCK_MODULES.find(m => m.id === id)
}

export function getModulesByStatus(status: ModuleLifecycleStatus): Module[] {
  return MOCK_MODULES.filter(m => m.status === status)
}

export function getModulesByCategory(category: ModuleCategory): Module[] {
  return MOCK_MODULES.filter(m => m.category === category)
}

export function getPublicModules(): Module[] {
  return MOCK_MODULES.filter(m => m.isPublic)
}

export function getFeaturedModules(): Module[] {
  return MOCK_MODULES.filter(m => m.isFeatured && m.isPublic)
}

export function getModuleVersions(moduleId: string): ModuleVersion[] {
  return MOCK_MODULE_VERSIONS[moduleId] || []
}

export function getModuleReviews(moduleId: string): ModuleReview[] {
  return MOCK_MODULE_REVIEWS.filter(r => r.moduleId === moduleId)
}

export function getModuleStats() {
  const total = MOCK_MODULES.length
  const active = MOCK_MODULES.filter(m => m.status === 'active').length
  const published = MOCK_MODULES.filter(m => m.status === 'published').length
  const inReview = MOCK_MODULES.filter(m => m.status === 'review').length
  const draft = MOCK_MODULES.filter(m => m.status === 'draft').length
  const deprecated = MOCK_MODULES.filter(m => m.status === 'deprecated').length

  const totalInstallations = MOCK_MODULES.reduce((sum, m) => sum + m.activeInstallations, 0)
  const totalRevenue = MOCK_MODULES.reduce((sum, m) => sum + m.totalRevenue, 0)

  const averageRating =
    MOCK_MODULES.filter(m => m.averageRating).reduce((sum, m) => sum + (m.averageRating || 0), 0) /
    MOCK_MODULES.filter(m => m.averageRating).length

  return {
    total,
    active,
    published,
    inReview,
    draft,
    deprecated,
    totalInstallations,
    totalRevenue,
    averageRating,
  }
}

export function getModuleInstallationsByBusiness(moduleId: string) {
  // Would return actual installations, for now just use activeInstallations count
  const module = getModuleById(moduleId)
  return module?.activeInstallations || 0
}

export function getCategoryLabel(category: ModuleCategory): string {
  const labels: Record<ModuleCategory, string> = {
    payments: 'Payments',
    financial_services: 'Financial Services',
    commerce: 'Commerce',
    industry_specific: 'Industry-Specific',
    analytics: 'Analytics',
    security: 'Security',
    integration: 'Integration',
  }
  return labels[category] || category
}

export function getStatusColor(status: ModuleLifecycleStatus): 'success' | 'info' | 'warning' | 'error' | 'default' {
  switch (status) {
    case 'active':
      return 'success'
    case 'published':
    case 'review':
      return 'info'
    case 'draft':
      return 'warning'
    case 'deprecated':
    case 'archived':
      return 'error'
    default:
      return 'default'
  }
}
