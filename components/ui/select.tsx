'use client'

import { SelectHTMLAttributes, forwardRef, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: Array<{ value: string; label: string }>
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className, id, ...props }, ref) => {
    const generatedId = useId()
    const selectId = id || generatedId
    const errorId = `${selectId}-error`
    const helperId = `${selectId}-helper`

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {label}
            {props.required && <span className="text-error ml-1" aria-label="required">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border rounded-xl transition-all appearance-none cursor-pointer',
              'text-gray-900 dark:text-white',
              'focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-error focus:ring-error'
                : 'border-gray-300 dark:border-dark-border',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(
              error && errorId,
              helperText && !error && helperId
            )}
            aria-required={props.required}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" aria-hidden="true" />
        </div>

        {error && (
          <p id={errorId} className="mt-2 text-sm text-error" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
