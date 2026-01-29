'use client'

import Link from 'next/link'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-12 text-center">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-12 h-12 text-gray-400" />
        </div>

        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or never existed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/dashboard">
            <Button
              variant="primary"
              size="md"
              icon={<Home className="w-5 h-5" />}
              iconPosition="left"
            >
              Go to Dashboard
            </Button>
          </Link>
          <Button
            variant="outline"
            size="md"
            icon={<ArrowLeft className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-border">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Need help? Here are some useful links:
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/dashboard" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              Dashboard
            </Link>
            <Link href="/wallets" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              Wallets
            </Link>
            <Link href="/transactions" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              Transactions
            </Link>
            <Link href="/team" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              Team
            </Link>
            <Link href="/settings" className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
              Settings
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
