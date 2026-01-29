import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'stat'
  children: ReactNode
  gradient?: 'primary' | 'success' | 'warning' | 'error' | 'premium'
}

export function Card({
  variant = 'default',
  children,
  className,
  gradient,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-xl p-5 transition-all duration-200'

  const variantStyles = {
    default:
      'bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-600',
    interactive:
      'bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border hover:border-primary-500 dark:hover:border-primary-500 hover:scale-[1.01] cursor-pointer',
    stat: 'bg-white dark:bg-dark-surface border-2 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-600',
  }

  const gradientStyles = {
    primary: 'bg-gradient-to-br from-primary-500 to-primary-600',
    success: 'bg-gradient-to-br from-green-500 to-green-600',
    warning: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    error: 'bg-gradient-to-br from-red-500 to-red-600',
    premium: 'bg-gradient-to-br from-purple-500 to-purple-600',
  }

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        variant === 'stat' && gradient && gradientStyles[gradient],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
