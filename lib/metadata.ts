import type { Metadata } from 'next'

interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  path?: string
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  path = '',
}: PageMetadata): Metadata {
  const baseUrl = 'https://wiremi.com'
  const url = `${baseUrl}${path}`

  return {
    title,
    description,
    keywords: [...keywords, 'wiremi', 'b2b', 'saas', 'fintech'],
    openGraph: {
      title,
      description,
      url,
      siteName: 'Wiremi B2B',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@wiremi',
    },
    alternates: {
      canonical: url,
    },
  }
}

// Pre-defined metadata for common pages
export const pageMetadata = {
  dashboard: generateMetadata({
    title: 'Dashboard',
    description: 'Overview of your financial operations, recent transactions, and key business metrics.',
    keywords: ['dashboard', 'business overview', 'financial metrics'],
    path: '/dashboard',
  }),
  wallets: generateMetadata({
    title: 'Wallets & Accounts',
    description: 'Manage your multi-currency wallets and account balances across different currencies.',
    keywords: ['wallets', 'multi-currency', 'account balances', 'currency management'],
    path: '/wallets',
  }),
  transactions: generateMetadata({
    title: 'Transactions',
    description: 'View and manage all your financial transactions in one place.',
    keywords: ['transactions', 'payment history', 'financial records'],
    path: '/transactions',
  }),
  payments: generateMetadata({
    title: 'Payments',
    description: 'Send and manage payments to vendors, suppliers, and partners.',
    keywords: ['payments', 'send money', 'vendor payments'],
    path: '/payments',
  }),
  exchange: generateMetadata({
    title: 'Currency Exchange',
    description: 'Exchange currencies with real-time rates and low fees.',
    keywords: ['currency exchange', 'forex', 'currency conversion'],
    path: '/exchange',
  }),
  hr: generateMetadata({
    title: 'HR & Payroll',
    description: 'Manage your team, process payroll, and handle employee benefits.',
    keywords: ['hr', 'payroll', 'employee management', 'benefits'],
    path: '/hr',
  }),
  team: generateMetadata({
    title: 'Team Members',
    description: 'Manage team members, roles, and permissions.',
    keywords: ['team', 'members', 'permissions', 'access control'],
    path: '/team',
  }),
  reports: generateMetadata({
    title: 'Reports & Analytics',
    description: 'Generate comprehensive financial reports and business analytics.',
    keywords: ['reports', 'analytics', 'financial reporting', 'business intelligence'],
    path: '/reports',
  }),
  settings: generateMetadata({
    title: 'Settings',
    description: 'Configure your account, company information, security, and preferences.',
    keywords: ['settings', 'configuration', 'preferences', 'account settings'],
    path: '/settings',
  }),
  notifications: generateMetadata({
    title: 'Notifications',
    description: 'Stay updated with your latest activity and important alerts.',
    keywords: ['notifications', 'alerts', 'activity feed'],
    path: '/notifications',
  }),
  profile: generateMetadata({
    title: 'User Profile',
    description: 'View and manage your profile, activity, and permissions.',
    keywords: ['profile', 'user account', 'activity'],
    path: '/profile',
  }),
}
