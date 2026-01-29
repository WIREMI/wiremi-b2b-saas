import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastProvider } from '@/components/ui/toast'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Wiremi B2B | Financial Operating System for Business',
    template: '%s | Wiremi B2B',
  },
  description: 'Comprehensive financial platform combining payments, multi-currency wallets, HR & payroll, and modular business tools for modern enterprises.',
  keywords: ['wiremi', 'b2b', 'saas', 'fintech', 'payments', 'business finance', 'multi-currency', 'payroll', 'HR management', 'financial operating system'],
  authors: [{ name: 'Wiremi' }],
  creator: 'Wiremi',
  publisher: 'Wiremi',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wiremi.com',
    title: 'Wiremi B2B | Financial Operating System for Business',
    description: 'Comprehensive financial platform combining payments, multi-currency wallets, HR & payroll, and modular business tools for modern enterprises.',
    siteName: 'Wiremi B2B',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wiremi B2B | Financial Operating System for Business',
    description: 'Comprehensive financial platform combining payments, multi-currency wallets, HR & payroll, and modular business tools for modern enterprises.',
    creator: '@wiremi',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (prefersDark) {
                    document.documentElement.classList.add('dark');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
