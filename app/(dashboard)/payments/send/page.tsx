'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Redirect to the correct Send Money page under Wallets
export default function SendPaymentRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/wallets/send-money')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Redirecting...</p>
      </div>
    </div>
  )
}
