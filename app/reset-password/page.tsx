'use client'

import { useState, FormEvent, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PasswordInput from '@/components/ui/password-input'
import { useToast } from '@/components/ui/toast'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [resetComplete, setResetComplete] = useState(false)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)

  // Get token from URL (e.g., /reset-password?token=abc123)
  const token = searchParams.get('token')

  useEffect(() => {
    // Validate token on mount
    const validateToken = async () => {
      if (!token) {
        setTokenValid(false)
        return
      }

      // Simulate API call to validate token
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Mock validation (in real app, validate with backend)
        setTokenValid(true)
      } catch (error) {
        setTokenValid(false)
      }
    }

    validateToken()
  }, [token])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter'
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Password must contain at least one lowercase letter'
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number'
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one special character'
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please check the form and try again',
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setResetComplete(true)
      showToast({
        type: 'success',
        title: 'Password Reset Successful',
        message: 'Your password has been updated',
      })
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Reset Failed',
        message: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state while validating token
  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Validating reset link...</p>
        </div>
      </div>
    )
  }

  // Invalid or expired token
  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
              <span className="text-2xl font-bold text-white">W</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Invalid Reset Link
            </h1>
          </div>

          <div className="bg-gray-100 dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-200 dark:border-dark-border p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-error/10 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-error" />
              </div>
              <p className="text-gray-900 dark:text-white font-medium mb-2">
                This password reset link is invalid or has expired
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Password reset links expire after 1 hour for security reasons.
              </p>
            </div>

            <Link href="/forgot-password">
              <Button variant="primary" size="lg" className="w-full">
                Request New Reset Link
              </Button>
            </Link>

            <div className="mt-4 text-center">
              <Link
                href="/signin"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">W</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {resetComplete ? 'Password Reset Complete' : 'Reset Your Password'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {resetComplete
              ? 'You can now sign in with your new password'
              : 'Choose a strong password for your account'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-100 dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-200 dark:border-dark-border p-8">
          {!resetComplete ? (
            <>
              {/* Password Reset Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <PasswordInput
                  label="New Password"
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors((prev) => ({ ...prev, password: '' }))
                  }}
                  error={errors.password}
                  showStrength
                  required
                  disabled={isLoading}
                  autoFocus
                />

                <PasswordInput
                  label="Confirm New Password"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setErrors((prev) => ({ ...prev, confirmPassword: '' }))
                  }}
                  error={errors.confirmPassword}
                  required
                  disabled={isLoading}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  loading={isLoading}
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Reset Password
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Your password has been reset successfully!
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You can now sign in to your account with your new password.
                </p>
              </div>

              <Link href="/signin">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Continue to Sign In
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Back to Sign In */}
        {!resetComplete && (
          <div className="mt-8 text-center">
            <Link
              href="/signin"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-primary-50 to-purple-50 dark:from-dark-bg dark:to-dark-surface flex items-center justify-center p-4"><div className="text-gray-600 dark:text-gray-400">Loading...</div></div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
