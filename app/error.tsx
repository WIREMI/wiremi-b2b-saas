'use client'

import { useEffect } from 'react'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-12 text-center">
        <div className="w-24 h-24 bg-error/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-12 h-12 text-error" />
        </div>

        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">Oops!</h1>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Something Went Wrong
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          We encountered an unexpected error. Don't worry, our team has been notified and we're working on it.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Error Details (Development Mode):
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            size="md"
            icon={<RefreshCw className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => reset()}
          >
            Try Again
          </Button>
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="md"
              icon={<Home className="w-5 h-5" />}
              iconPosition="left"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-border">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            If this problem persists, please contact our support team.
          </p>
        </div>
      </Card>
    </div>
  )
}
