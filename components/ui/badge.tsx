import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default'
  size?: 'sm' | 'md'
  children: ReactNode
  ariaLabel?: string
}

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className,
  ariaLabel,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-full font-medium'

  const variantStyles = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
  }

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      role="status"
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
