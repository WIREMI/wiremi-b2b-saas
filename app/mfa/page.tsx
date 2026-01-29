'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Smartphone, Mail, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import OTPInput from '@/components/ui/otp-input'
import { useToast } from '@/components/ui/toast'

type MFAMethod = 'sms' | 'email' | 'authenticator'

export default function MFAPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [mfaMethod, setMfaMethod] = useState<MFAMethod>('authenticator')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)

  // Mock user data (would come from context/session in real app)
  const userEmail = 'john@acme.com'
  const userPhone = '+1 (555) ***-**34'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit verification code')
      showToast({
        type: 'error',
        title: 'Invalid Code',
        message: 'Please enter a valid 6-digit code',
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock success (in real app, verify with backend)
      if (otp === '123456') {
        showToast({
          type: 'success',
          title: 'Verification Successful',
          message: 'Redirecting to your dashboard...',
        })

        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      } else {
        setError('Invalid verification code')
        showToast({
          type: 'error',
          title: 'Verification Failed',
          message: 'The code you entered is incorrect',
        })
        setIsLoading(false)
      }
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Verification Failed',
        message: 'Something went wrong. Please try again.',
      })
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (resendCountdown > 0) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const methodLabel =
        mfaMethod === 'sms'
          ? 'SMS'
          : mfaMethod === 'email'
          ? 'email'
          : 'authenticator app'

      showToast({
        type: 'success',
        title: 'Code Sent',
        message: `A new verification code has been sent via ${methodLabel}`,
      })

      // Start countdown
      setResendCountdown(60)
      const interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Send Code',
        message: 'Please try again later',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getMFADescription = () => {
    switch (mfaMethod) {
      case 'sms':
        return `We've sent a 6-digit code to ${userPhone}`
      case 'email':
        return `We've sent a 6-digit code to ${userEmail}`
      case 'authenticator':
        return 'Enter the 6-digit code from your authenticator app'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Two-Factor Authentication
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Verify your identity to continue
          </p>
        </div>

        {/* MFA Card */}
        <div className="bg-gray-100 dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-200 dark:border-dark-border p-8">
          {/* MFA Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Verification Method
            </label>
            <div className="space-y-2">
              {/* Authenticator App */}
              <button
                type="button"
                onClick={() => setMfaMethod('authenticator')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  mfaMethod === 'authenticator'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                    : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    mfaMethod === 'authenticator'
                      ? 'border-primary-500'
                      : 'border-gray-300 dark:border-dark-border'
                  }`}
                >
                  {mfaMethod === 'authenticator' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                  )}
                </div>
                <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Authenticator App
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Use Google Authenticator or similar app
                  </p>
                </div>
              </button>

              {/* SMS */}
              <button
                type="button"
                onClick={() => setMfaMethod('sms')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  mfaMethod === 'sms'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                    : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    mfaMethod === 'sms'
                      ? 'border-primary-500'
                      : 'border-gray-300 dark:border-dark-border'
                  }`}
                >
                  {mfaMethod === 'sms' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                  )}
                </div>
                <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900 dark:text-white">SMS Code</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userPhone}
                  </p>
                </div>
              </button>

              {/* Email */}
              <button
                type="button"
                onClick={() => setMfaMethod('email')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  mfaMethod === 'email'
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                    : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    mfaMethod === 'email'
                      ? 'border-primary-500'
                      : 'border-gray-300 dark:border-dark-border'
                  }`}
                >
                  {mfaMethod === 'email' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />
                  )}
                </div>
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900 dark:text-white">Email Code</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {userEmail}
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getMFADescription()}
            </p>
          </div>

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <OTPInput
              length={6}
              value={otp}
              onChange={(value) => {
                setOtp(value)
                setError('')
              }}
              error={error}
              label="Verification Code"
            />

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading || resendCountdown > 0}
                className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendCountdown > 0
                  ? `Resend in ${resendCountdown}s`
                  : 'Resend Code'}
              </button>
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isLoading}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Verify & Continue
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-100 dark:border-primary-500/20">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary-900 dark:text-primary-300 mb-1">
                  Enhanced Security
                </p>
                <p className="text-xs text-primary-700 dark:text-primary-400">
                  Two-factor authentication adds an extra layer of security to your account by requiring both your password and a verification code.
                </p>
              </div>
            </div>
          </div>

          {/* Help Link */}
          <div className="mt-6 text-center">
            <Link
              href="/help/mfa"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Having trouble? Get help
            </Link>
          </div>
        </div>

        {/* Back to Sign In */}
        <div className="mt-8 text-center">
          <Link
            href="/signin"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
