import { HTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <Loader2
      className={cn(
        'animate-spin text-primary-500',
        sizeStyles[size],
        className
      )}
    />
  )
}

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string
  height?: string
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-dark-border',
        variantStyles[variant],
        className
      )}
      style={{
        width,
        height,
        ...style,
      }}
      {...props}
    />
  )
}

interface PageLoadingProps {
  message?: string
}

export function PageLoading({ message = 'Loading...' }: PageLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Spinner size="lg" />
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  )
}

interface LoadingOverlayProps {
  message?: string
}

export function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gray-50 dark:bg-dark-surface rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
        <Spinner size="lg" />
        {message && (
          <p className="text-gray-900 dark:text-white font-medium">{message}</p>
        )}
      </div>
    </div>
  )
}
