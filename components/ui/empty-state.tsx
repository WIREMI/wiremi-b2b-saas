import { ReactNode } from 'react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    icon?: ReactNode
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-6 text-center',
        className
      )}
    >
      <div className="w-16 h-16 bg-gray-100 dark:bg-dark-elevated rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action && (
            <Button
              variant="primary"
              onClick={action.onClick}
              icon={action.icon}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
