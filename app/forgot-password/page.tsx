'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { isValidEmail } from '@/lib/utils'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!email) {
      setError('Email address is required')
      return
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setEmailSent(true)
      showToast({
        type: 'success',
        title: 'Email Sent',
        message: 'Check your inbox for password reset instructions',
      })
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Send Email',
        message: 'Please try again later',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      showToast({
        type: 'success',
        title: 'Email Resent',
        message: 'Check your inbox for the new reset link',
      })
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Failed to Resend Email',
        message: 'Please try again later',
      })
    } finally {
      setIsLoading(false)
    }
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
            {emailSent ? 'Check Your Email' : 'Forgot Password?'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {emailSent
              ? "We've sent you a password reset link"
              : "No worries, we'll send you reset instructions"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-gray-100 dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-200 dark:border-dark-border p-8">
          {!emailSent ? (
            <>
              {/* Email Input Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  error={error}
                  icon={<Mail className="w-5 h-5" />}
                  iconPosition="left"
                  required
                  disabled={isLoading}
                  autoFocus
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
                  Send Reset Link
                </Button>
              </form>

              {/* Info Notice */}
              <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-100 dark:border-primary-500/20">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-primary-700 dark:text-primary-400">
                    We'll send you an email with instructions to reset your password. The link will expire in 1 hour.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <p className="text-gray-900 dark:text-white font-medium mb-2">
                  Email sent to:
                </p>
                <p className="text-lg font-semibold text-primary-500 mb-4">{email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click the link in the email to reset your password. If you don't see it, check your spam folder.
                </p>
              </div>

              {/* Resend Email */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Didn't receive the email?
                </p>
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors disabled:opacity-50"
                >
                  Resend Email
                </button>
              </div>

              {/* Return to Email Input */}
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => {
                  setEmailSent(false)
                  setEmail('')
                }}
              >
                Try Different Email
              </Button>
            </>
          )}
        </div>

        {/* Back to Sign In */}
        <div className="mt-8 text-center">
          <Link
            href="/signin"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
