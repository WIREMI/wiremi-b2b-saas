import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  label: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: ReactNode
  iconBg?: string
  className?: string
  onClick?: () => void
}

export default function StatsCard({
  label,
  value,
  change,
  trend = 'neutral',
  icon,
  iconBg = 'bg-primary-100 dark:bg-primary-500/20 text-primary-500',
  className,
  onClick,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        'p-6',
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', iconBg)}>
            {icon}
          </div>
        )}
        {change && trend !== 'neutral' && (
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-medium',
              trend === 'up' ? 'text-success' : 'text-error'
            )}
          >
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {change}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </Card>
  )
}
