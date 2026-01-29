'use client'

import { AlertTriangle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-gray-50 dark:bg-dark-surface rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-red-100 dark:bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-12 h-12 text-red-500 dark:text-red-400" />
            </div>

            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">Error</h1>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Critical Application Error
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              A critical error occurred. Please refresh the page or contact support if the problem persists.
            </p>

            {process.env.NODE_ENV === 'development' && error.message && (
              <div className="mb-8 p-4 bg-gray-100 dark:bg-dark-hover rounded-lg text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Error Details (Development Mode):
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Error ID: {error.digest}</p>
                )}
              </div>
            )}

            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
