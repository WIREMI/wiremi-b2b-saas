import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CustomButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  ariaLabel?: string
  fullWidth?: boolean
}

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CustomButtonProps>, CustomButtonProps {}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ariaLabel,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary:
      'bg-primary-500 text-white hover:bg-primary-600 active:scale-95 shadow-md hover:shadow-lg focus:ring-primary-500',
    secondary:
      'bg-gray-100 dark:bg-dark-surface text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 focus:ring-gray-500',
    outline:
      'border-2 border-primary-500 text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 active:scale-95 focus:ring-primary-500',
    danger:
      'bg-error text-white hover:bg-red-600 active:scale-95 shadow-md hover:shadow-lg focus:ring-error',
    ghost:
      'text-primary-500 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 active:scale-95 focus:ring-primary-500',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      )}
      {!loading && icon && iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
      {children}
      {!loading && icon && iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
    </button>
  )
}

export default Button
