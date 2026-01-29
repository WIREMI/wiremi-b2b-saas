'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BusinessRootPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to signin page
    router.push('/signin')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Wiremi Business Platform...</p>
      </div>
    </div>
  )
}
