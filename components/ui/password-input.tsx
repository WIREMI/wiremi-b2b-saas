'use client'

import { useState, forwardRef, InputHTMLAttributes } from 'react'
import { Eye, EyeOff, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
  showStrength?: boolean
}

interface PasswordStrength {
  score: number // 0-4
  label: string
  color: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, helperText, showStrength = false, className, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const calculateStrength = (password: string): PasswordStrength => {
      if (!password) return { score: 0, label: '', color: '' }

      let score = 0

      // Length check
      if (password.length >= 8) score++
      if (password.length >= 12) score++

      // Character variety checks
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^a-zA-Z0-9]/.test(password)) score++

      // Cap at 4
      score = Math.min(score, 4)

      const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
      const colors = ['', 'bg-error', 'bg-warning', 'bg-primary-500', 'bg-success']

      return {
        score,
        label: labels[score],
        color: colors[score],
      }
    }

    const strength = showStrength && value ? calculateStrength(value as string) : null

    const requirements = [
      { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
      { label: 'Contains uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
      { label: 'Contains lowercase letter', test: (p: string) => /[a-z]/.test(p) },
      { label: 'Contains number', test: (p: string) => /[0-9]/.test(p) },
      { label: 'Contains special character', test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
    ]

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            value={value}
            className={cn(
              'w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-dark-surface border rounded-xl transition-all',
              'text-gray-900 dark:text-white placeholder-gray-400',
              'focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-error focus:ring-error'
                : 'border-gray-300 dark:border-dark-border',
              className
            )}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {showStrength && value && strength && strength.score > 0 && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-1 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
                <div
                  className={cn('h-full transition-all duration-300', strength.color)}
                  style={{ width: `${(strength.score / 4) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {strength.label}
              </span>
            </div>

            {/* Password Requirements */}
            <div className="mt-2 space-y-1">
              {requirements.map((req, index) => {
                const passed = req.test(value as string)
                return (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    {passed ? (
                      <Check className="w-3 h-3 text-success" />
                    ) : (
                      <X className="w-3 h-3 text-gray-300 dark:text-gray-600" />
                    )}
                    <span
                      className={
                        passed
                          ? 'text-success'
                          : 'text-gray-500 dark:text-gray-400'
                      }
                    >
                      {req.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {error && <p className="mt-2 text-sm text-error">{error}</p>}

        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
