'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Phone, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'
import { useToast } from '@/components/ui/toast'
import { isValidEmail } from '@/lib/utils'

export default function SignInPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate email or phone based on login method
    if (loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email address is required'
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    } else {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required'
      } else if (!/^[+]?[\d\s()-]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Skip validation - direct access to demo
    setIsLoading(true)

    // Show welcome message
    showToast({
      type: 'success',
      title: 'Welcome to Wiremi Demo!',
      message: 'Accessing demo dashboard...',
    })

    // Redirect to dashboard immediately
    setTimeout(() => {
      router.push('/dashboard')
    }, 800)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">W</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to your Wiremi account
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-gray-100 dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-200 dark:border-dark-border p-8">
          {/* Login Method Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 dark:bg-dark-bg rounded-xl">
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                loginMethod === 'email'
                  ? 'bg-gray-50 dark:bg-dark-surface text-primary-500 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                loginMethod === 'phone'
                  ? 'bg-gray-50 dark:bg-dark-surface text-primary-500 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              Phone
            </button>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email or Phone Input */}
            {loginMethod === 'email' ? (
              <Input
                label="Email Address"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                icon={<Mail className="w-5 h-5" />}
                iconPosition="left"
                required
                disabled={isLoading}
              />
            ) : (
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                icon={<Phone className="w-5 h-5" />}
                iconPosition="left"
                required
                disabled={isLoading}
              />
            )}

            {/* Password Input */}
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              required
              disabled={isLoading}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 transition-all cursor-pointer"
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  Remember me
                </span>
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isLoading}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Sign In
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-100 dark:border-primary-500/20">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary-900 dark:text-primary-300 mb-1">
                  Security First
                </p>
                <p className="text-xs text-primary-700 dark:text-primary-400">
                  Your connection is encrypted and secure. We'll never share your credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-dark-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 dark:bg-dark-surface text-gray-500 dark:text-gray-400">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link href="/signup">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
            >
              Create New Account
            </Button>
          </Link>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-primary-500 hover:text-primary-600 font-medium">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary-500 hover:text-primary-600 font-medium">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
