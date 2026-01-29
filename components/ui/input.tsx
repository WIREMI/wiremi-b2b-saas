import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {label}
            {props.required && <span className="text-error ml-1" aria-label="required">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border rounded-xl transition-all',
              'text-gray-900 dark:text-white placeholder-gray-400',
              'focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-error focus:ring-error'
                : 'border-gray-300 dark:border-dark-border',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(
              error && errorId,
              helperText && !error && helperId
            )}
            aria-required={props.required}
            {...props}
          />

          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
              {icon}
            </div>
          )}
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

Input.displayName = 'Input'

export default Input
