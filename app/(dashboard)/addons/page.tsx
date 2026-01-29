'use client'

import { Package, ArrowLeft, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AddonsPage() {
  const router = useRouter()

  return (
    <div className="max-w-[1400px] mx-auto space-y-5">
      <div className="mb-2">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-12 border border-gray-200 dark:border-gray-700/40 text-center">
          <div className="w-20 h-20 bg-purple-100 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Add-ons Marketplace
          </h1>
          <p className="text-[15px] text-gray-600 dark:text-gray-400 mb-6">
            Discover and install powerful add-ons to extend your Wiremi platform with industry-specific features.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Coming Soon</span>
          </div>
          <p className="text-[13px] text-gray-500 mb-8">
            This feature is currently under development and will be available in a future update.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => router.push('/settings')}
              className="px-4 py-2 text-[13px] font-medium border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              View Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
