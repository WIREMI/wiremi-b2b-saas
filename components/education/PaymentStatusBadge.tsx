'use client'

import { CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { PaymentStatus } from '@/types/education'

interface PaymentStatusBadgeProps {
  status: PaymentStatus
  className?: string
}

const statusConfig = {
  paid: {
    icon: CheckCircle,
    variant: 'success' as const,
    label: 'Paid',
  },
  partial: {
    icon: Clock,
    variant: 'warning' as const,
    label: 'Partial Payment',
  },
  overdue: {
    icon: AlertTriangle,
    variant: 'error' as const,
    label: 'Overdue',
  },
  pending: {
    icon: XCircle,
    variant: 'info' as const,
    label: 'Pending',
  },
}

export default function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  )
}
