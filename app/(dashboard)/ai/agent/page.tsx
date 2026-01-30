'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Sparkles,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Target,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  Zap,
  FileText,
  Palette,
  MessageSquare,
  Settings,
  RefreshCw,
  Download,
  ChevronRight,
  ChevronDown,
  Send,
  Loader2,
  Megaphone,
  Receipt,
  Scale,
  Cpu,
  Building2,
  CreditCard,
  TrendingUp as Revenue,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  LightbulbIcon,
  Activity,
  Wallet,
  Percent,
  Package,
  Mail,
  Phone,
  Globe,
  Image,
  Type,
  Copy,
  Eye,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

// ============================================================================
// COMPREHENSIVE MOCK DATA - Full Business Simulation
// ============================================================================

// Time series data for charts (12 months)
const generateMonthlyData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map((month, index) => {
    const baseRevenue = 180000 + Math.random() * 60000
    const seasonalFactor = 1 + Math.sin((index / 12) * Math.PI * 2) * 0.15
    const growth = 1 + (index * 0.02)
    const revenue = Math.round(baseRevenue * seasonalFactor * growth)
    const expenses = Math.round(revenue * (0.55 + Math.random() * 0.1))
    const profit = revenue - expenses
    const transactions = Math.round(450 + Math.random() * 200)
    const customers = Math.round(180 + index * 8 + Math.random() * 30)
    const churn = Math.round(Math.max(2, 8 - index * 0.3 + Math.random() * 2) * 10) / 10

    return {
      month,
      revenue,
      expenses,
      profit,
      transactions,
      customers,
      churn,
      avgOrderValue: Math.round(revenue / transactions),
      conversionRate: Math.round((35 + Math.random() * 15) * 10) / 10,
    }
  })
}

// Daily data for detailed analysis (last 30 days)
const generateDailyData = () => {
  const data = []
  const baseDate = new Date()
  baseDate.setDate(baseDate.getDate() - 30)

  for (let i = 0; i < 30; i++) {
    const date = new Date(baseDate)
    date.setDate(date.getDate() + i)
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    const baseRevenue = isWeekend ? 4500 : 8200
    const variance = Math.random() * 2000 - 1000
    const revenue = Math.round(baseRevenue + variance)
    const transactions = Math.round(revenue / (180 + Math.random() * 40))

    data.push({
      date: date.toISOString().split('T')[0],
      dayName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek],
      revenue,
      transactions,
      visitors: Math.round(transactions * (4 + Math.random() * 2)),
      conversionRate: Math.round(transactions / (transactions * (4 + Math.random() * 2)) * 100 * 10) / 10,
      avgOrderValue: Math.round(revenue / transactions),
      refunds: Math.round(Math.random() * 3),
      failedPayments: Math.round(Math.random() * 5),
    })
  }
  return data
}

// Hourly patterns
const generateHourlyPatterns = () => {
  return Array.from({ length: 24 }, (_, hour) => {
    let activity = 0
    if (hour >= 8 && hour <= 11) activity = 70 + Math.random() * 30
    else if (hour >= 12 && hour <= 14) activity = 50 + Math.random() * 20
    else if (hour >= 15 && hour <= 18) activity = 80 + Math.random() * 20
    else if (hour >= 19 && hour <= 21) activity = 60 + Math.random() * 25
    else activity = 10 + Math.random() * 20

    return {
      hour: `${hour.toString().padStart(2, '0')}:00`,
      activity: Math.round(activity),
      transactions: Math.round(activity * 0.4),
      revenue: Math.round(activity * 85),
    }
  })
}

// Customer segments
const customerSegments = [
  { name: 'Enterprise', value: 35, count: 47, avgValue: 12500, growth: 23, color: '#6366f1' },
  { name: 'SMB', value: 40, count: 234, avgValue: 2800, growth: 15, color: '#22c55e' },
  { name: 'Startup', value: 15, count: 156, avgValue: 890, growth: 45, color: '#f59e0b' },
  { name: 'Individual', value: 10, count: 412, avgValue: 320, growth: 8, color: '#ec4899' },
]

// Revenue by product/service
const revenueByProduct = [
  { name: 'Payment Processing', revenue: 145000, growth: 18, percentage: 45 },
  { name: 'Subscription Billing', revenue: 89000, growth: 32, percentage: 28 },
  { name: 'Invoice Services', revenue: 52000, growth: 12, percentage: 16 },
  { name: 'Corporate Cards', revenue: 35000, growth: 67, percentage: 11 },
]

// Geographic distribution
const geographicData = [
  { region: 'North America', revenue: 142000, customers: 312, growth: 15 },
  { region: 'Europe', revenue: 98000, customers: 187, growth: 22 },
  { region: 'Asia Pacific', revenue: 56000, customers: 234, growth: 45 },
  { region: 'Latin America', revenue: 18000, customers: 89, growth: 28 },
  { region: 'Africa', revenue: 8000, customers: 67, growth: 52 },
]

// AI-generated insights
const businessInsights = [
  {
    id: 'insight-1',
    type: 'opportunity',
    priority: 'high',
    title: 'Revenue Growth Opportunity in APAC',
    summary: 'Asia Pacific showing 45% YoY growth with lowest customer acquisition cost.',
    detail: 'Our AI analysis indicates that the Asia Pacific region has the highest growth rate (45% YoY) combined with the lowest customer acquisition cost ($42 vs $78 global average). Expanding marketing efforts here could yield 2.3x ROI.',
    impact: '+$34,000/month potential',
    confidence: 94,
    action: 'Increase APAC marketing budget by 40%',
    category: 'growth',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'insight-2',
    type: 'warning',
    priority: 'high',
    title: 'Enterprise Churn Risk Detected',
    summary: '3 enterprise accounts showing reduced engagement patterns.',
    detail: 'Machine learning models have identified 3 enterprise accounts (combined MRR: $8,400) showing engagement patterns consistent with pre-churn behavior: 40% drop in API calls, reduced login frequency, and increased support tickets.',
    impact: '$8,400 MRR at risk',
    confidence: 87,
    action: 'Schedule executive check-in calls this week',
    category: 'retention',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'insight-3',
    type: 'trend',
    priority: 'medium',
    title: 'Subscription Plan Optimization',
    summary: '67% of Professional users hit usage limits regularly.',
    detail: 'Analysis shows 67% of Professional plan users consistently hit their transaction limits. These users process 2.3x the average transaction volume, indicating they may be willing to upgrade to Enterprise tier with proper incentives.',
    impact: '+$12,000 MRR potential',
    confidence: 91,
    action: 'Launch targeted upgrade campaign',
    category: 'revenue',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'insight-4',
    type: 'anomaly',
    priority: 'medium',
    title: 'Weekend Revenue Surge Pattern',
    summary: 'Unusual 34% revenue increase on weekends detected.',
    detail: 'Contrary to historical patterns, weekend revenue has increased 34% over the past 6 weeks. This correlates with increased e-commerce platform integrations. Consider adjusting support staffing for weekends.',
    impact: '+$6,200/week captured',
    confidence: 82,
    action: 'Expand weekend support coverage',
    category: 'operations',
    createdAt: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: 'insight-5',
    type: 'opportunity',
    priority: 'high',
    title: 'Cross-sell Opportunity: Corporate Cards',
    summary: '234 accounts qualify for Corporate Cards but haven\'t enrolled.',
    detail: 'Based on transaction patterns and business profiles, 234 existing accounts meet our Corporate Cards eligibility criteria but haven\'t enrolled. Historical data shows 65% conversion rate for targeted outreach to qualified leads.',
    impact: '+$23,400 in activation fees',
    confidence: 89,
    action: 'Launch email campaign to qualified accounts',
    category: 'sales',
    createdAt: new Date(Date.now() - 28800000).toISOString(),
  },
]

// Alerts and notifications
const activeAlerts = [
  { id: 1, type: 'critical', message: 'Payment processor latency increased by 200ms', time: '5 min ago' },
  { id: 2, type: 'warning', message: 'Unusual login attempt blocked for admin account', time: '23 min ago' },
  { id: 3, type: 'info', message: 'Monthly compliance report ready for review', time: '1 hour ago' },
  { id: 4, type: 'success', message: 'New enterprise client onboarded successfully', time: '2 hours ago' },
]

// Cash flow data
const cashFlowData = {
  openingBalance: 245000,
  closingBalance: 312000,
  inflows: [
    { category: 'Customer Payments', amount: 287000, count: 1247 },
    { category: 'Subscription Revenue', amount: 89000, count: 412 },
    { category: 'Interest Income', amount: 1200, count: 1 },
  ],
  outflows: [
    { category: 'Vendor Payments', amount: 145000, count: 89 },
    { category: 'Payroll', amount: 52000, count: 1 },
    { category: 'Operating Expenses', amount: 23000, count: 156 },
    { category: 'Tax Payments', amount: 18000, count: 4 },
    { category: 'Loan Repayments', amount: 12000, count: 1 },
  ],
}

// Tax compliance data
const taxComplianceData = {
  filingStatus: 'current',
  nextDeadline: '2026-04-15',
  estimatedTax: 42500,
  deductions: [
    { category: 'Business Expenses', amount: 89000 },
    { category: 'Depreciation', amount: 23000 },
    { category: 'Professional Services', amount: 18000 },
    { category: 'Employee Benefits', amount: 34000 },
  ],
  missingDocuments: [
    { document: 'Q4 Sales Tax Return', dueDate: '2026-01-31' },
    { document: '1099 Forms for Contractors', dueDate: '2026-01-31' },
  ],
}

// Campaign templates for Sales & Marketing
const campaignTemplates = [
  { id: 1, name: 'Re-engagement Campaign', type: 'email', audience: 'Inactive Users', expectedROI: '3.2x' },
  { id: 2, name: 'Upgrade Promotion', type: 'email', audience: 'Power Users', expectedROI: '4.5x' },
  { id: 3, name: 'Referral Program', type: 'multi-channel', audience: 'Loyal Customers', expectedROI: '5.1x' },
  { id: 4, name: 'Win-back Campaign', type: 'email', audience: 'Churned Users', expectedROI: '2.8x' },
]

// Content generation samples
const contentSuggestions = [
  { type: 'Social Post', platform: 'LinkedIn', topic: 'Q4 Growth Announcement', tone: 'Professional' },
  { type: 'Email', platform: 'Newsletter', topic: 'New Feature Launch', tone: 'Exciting' },
  { type: 'Ad Copy', platform: 'Google Ads', topic: 'Payment Processing', tone: 'Direct' },
  { type: 'Blog Post', platform: 'Website', topic: 'Industry Trends 2026', tone: 'Thought Leadership' },
]

// Initialize data
const monthlyData = generateMonthlyData()
const dailyData = generateDailyData()
const hourlyPatterns = generateHourlyPatterns()

// ============================================================================
// CHART COMPONENTS
// ============================================================================

// Simple Bar Chart Component
function BarChart({
  data,
  dataKey,
  color = '#6366f1',
  height = 200,
  showLabels = true
}: {
  data: Array<{ [key: string]: number | string }>
  dataKey: string
  color?: string
  height?: number
  showLabels?: boolean
}) {
  const values = data.map(d => Number(d[dataKey]))
  const max = Math.max(...values)

  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-between h-full gap-1">
        {data.map((item, index) => {
          const value = Number(item[dataKey])
          const barHeight = (value / max) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col justify-end" style={{ height: height - 24 }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${barHeight}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="w-full rounded-t-sm min-h-[2px]"
                  style={{ backgroundColor: color }}
                  title={`${item.month || item.dayName || ''}: ${formatNumber(value)}`}
                />
              </div>
              {showLabels && (
                <span className="text-[10px] text-gray-500 truncate w-full text-center">
                  {String(item.month || item.dayName || index)}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Area Chart Component
function AreaChart({
  data,
  dataKey,
  color = '#6366f1',
  height = 200
}: {
  data: Array<{ [key: string]: number | string }>
  dataKey: string
  color?: string
  height?: number
}) {
  const values = data.map(d => Number(d[dataKey]))
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100
    const y = 100 - ((v - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  const areaPoints = `0,100 ${points} 100,100`

  return (
    <div className="w-full relative" style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <motion.polygon
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          points={areaPoints}
          fill={`url(#gradient-${dataKey})`}
        />
        <motion.polyline
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

// Donut Chart Component
function DonutChart({
  data,
  size = 180
}: {
  data: Array<{ name: string; value: number; color: string }>
  size?: number
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  let currentAngle = -90

  const segments = data.map(item => {
    const angle = (item.value / total) * 360
    const startAngle = currentAngle
    currentAngle += angle
    return { ...item, startAngle, angle }
  })

  const polarToCartesian = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180
    return {
      x: 50 + radius * Math.cos(rad),
      y: 50 + radius * Math.sin(rad)
    }
  }

  const describeArc = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
    const start = polarToCartesian(endAngle, outerRadius)
    const end = polarToCartesian(startAngle, outerRadius)
    const innerStart = polarToCartesian(endAngle, innerRadius)
    const innerEnd = polarToCartesian(startAngle, innerRadius)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0

    return [
      `M ${start.x} ${start.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${innerStart.x} ${innerStart.y}`,
      'Z'
    ].join(' ')
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="transform -rotate-90">
        {segments.map((segment, i) => (
          <motion.path
            key={i}
            d={describeArc(segment.startAngle, segment.startAngle + segment.angle - 1, 30, 45)}
            fill={segment.color}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="hover:opacity-80 cursor-pointer transition-opacity"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{total}%</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>
    </div>
  )
}

// Mini Sparkline
function Sparkline({
  data,
  color = '#22c55e',
  width = 80,
  height = 24
}: {
  data: number[]
  color?: string
  width?: number
  height?: number
}) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((v - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

// System Signals Drawer - Subtle, collapsible alert system
function SystemSignalsDrawer({ alerts }: { alerts: typeof activeAlerts }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const criticalCount = alerts.filter(a => a.type === 'critical').length
  const warningCount = alerts.filter(a => a.type === 'warning').length

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <span className="w-2 h-2 bg-red-500 rounded-full" />
      case 'warning': return <span className="w-2 h-2 bg-amber-500 rounded-full" />
      case 'info': return <span className="w-2 h-2 bg-gray-400 rounded-full" />
      case 'success': return <span className="w-2 h-2 bg-green-500 rounded-full" />
      default: return <span className="w-2 h-2 bg-gray-400 rounded-full" />
    }
  }

  return (
    <Card className="overflow-hidden">
      {/* Collapsed Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-white">System Signals</p>
            <p className="text-xs text-gray-500">
              {criticalCount > 0 && <span className="text-red-500 mr-2">{criticalCount} critical</span>}
              {warningCount > 0 && <span className="text-amber-500 mr-2">{warningCount} warning</span>}
              {criticalCount === 0 && warningCount === 0 && 'All systems normal'}
            </p>
          </div>
        </div>
        <ChevronDown className={cn(
          "w-5 h-5 text-gray-400 transition-transform",
          isExpanded && "rotate-180"
        )} />
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-gray-100 dark:border-gray-800 pt-3">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="mt-1.5">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

// ============================================================================
// TAB COMPONENTS
// ============================================================================

// Overview Tab
function OverviewTab() {
  const currentMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]
  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100

  return (
    <div className="space-y-6">
      {/* Executive Summary - Clean, minimal design */}
      <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              What's Happening This Week
            </h3>
            <div className="prose prose-sm dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Your business is performing <span className="font-semibold text-primary-600 dark:text-primary-400">above average</span> this week.
                Revenue is up {revenueChange.toFixed(1)}% compared to last month, driven primarily by
                strong performance in the Enterprise segment (+23%). However, I've detected some patterns
                that need attention:
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 flex-shrink-0" />
                  <span>3 enterprise accounts showing pre-churn behavior patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Weekend revenue increased 34% - unusual but positive trend</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 flex-shrink-0" />
                  <span>234 accounts qualify for Corporate Cards upsell</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <Badge variant="success" size="sm">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              {revenueChange.toFixed(1)}%
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(currentMonth.revenue, 'USD')}
          </p>
          <div className="mt-2">
            <Sparkline
              data={monthlyData.slice(-6).map(d => d.revenue)}
              color="#22c55e"
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <Badge variant="success" size="sm">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              8.5%
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Customers</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(currentMonth.customers)}
          </p>
          <div className="mt-2">
            <Sparkline
              data={monthlyData.slice(-6).map(d => d.customers)}
              color="#3b82f6"
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
            </div>
            <Badge variant="success" size="sm">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              12.3%
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Order Value</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(currentMonth.avgOrderValue, 'USD')}
          </p>
          <div className="mt-2">
            <Sparkline
              data={monthlyData.slice(-6).map(d => d.avgOrderValue)}
              color="#9333ea"
            />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-amber-600" />
            </div>
            <Badge variant="error" size="sm">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              0.8%
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Churn Rate</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {currentMonth.churn}%
          </p>
          <div className="mt-2">
            <Sparkline
              data={monthlyData.slice(-6).map(d => d.churn)}
              color="#f59e0b"
            />
          </div>
        </Card>
      </div>

      {/* System Signals - Subtle, collapsible drawer */}
      <SystemSignalsDrawer alerts={activeAlerts} />

      {/* Priority Insights */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Priority Insights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {businessInsights.slice(0, 4).map(insight => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Insight Card Component - Using consistent, subtle colors
function InsightCard({ insight }: { insight: typeof businessInsights[0] }) {
  const [expanded, setExpanded] = useState(false)

  // Unified styling - all cards use the same neutral background with a subtle left border for priority
  const priorityBorder = insight.priority === 'high' ? 'border-l-primary-500' : 'border-l-gray-300 dark:border-l-gray-600'

  return (
    <Card className={cn("p-4 hover:shadow-md transition-shadow border-l-4", priorityBorder)}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
          <Brain className="w-5 h-5 text-primary-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
              {insight.title}
            </h4>
            {insight.priority === 'high' && (
              <Badge variant="default" size="sm" className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                Priority
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {insight.summary}
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {insight.detail}
                </p>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-4 h-4 text-primary-500" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      Recommendation
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 dark:text-gray-200">{insight.action}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">{insight.impact}</span>
              <span className="text-xs text-gray-500">{insight.confidence}% confidence</span>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              {expanded ? 'Less' : 'More'}
              <ChevronDown className={cn("w-3 h-3 transition-transform", expanded && "rotate-180")} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  )
}

// Business Analytics Tab
function BusinessAnalyticsTab() {
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'transactions' | 'customers'>('revenue')

  return (
    <div className="space-y-6">
      {/* Revenue Overview Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
            <p className="text-sm text-gray-500">Monthly performance over 12 months</p>
          </div>
          <div className="flex gap-2">
            {(['revenue', 'transactions', 'customers'] as const).map(metric => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                  selectedMetric === metric
                    ? "bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <BarChart
            data={monthlyData}
            dataKey={selectedMetric}
            color={selectedMetric === 'revenue' ? '#22c55e' : selectedMetric === 'transactions' ? '#3b82f6' : '#9333ea'}
            height={240}
          />
        </div>
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-2">
            <Brain className="w-4 h-4 text-primary-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">AI Analysis</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedMetric === 'revenue' && "Revenue shows consistent growth with seasonal peaks in Q4. The 15% YoY growth rate exceeds industry average of 8%."}
                {selectedMetric === 'transactions' && "Transaction volume correlates strongly with marketing spend. Peak hours are shifting 1.5 hours later, suggesting changing customer behavior."}
                {selectedMetric === 'customers' && "Customer acquisition is accelerating. Net new customers increased 23% this quarter, primarily from organic channels."}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Segments</h3>
          <div className="flex items-center gap-6">
            <DonutChart data={customerSegments} size={160} />
            <div className="flex-1 space-y-3">
              {customerSegments.map(segment => (
                <div key={segment.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{segment.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{segment.value}%</span>
                    <span className="text-xs text-green-500 ml-2">+{segment.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Revenue by Product */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue by Product</h3>
          <div className="space-y-4">
            {revenueByProduct.map(product => (
              <div key={product.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{product.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(product.revenue, 'USD')}
                    </span>
                    <Badge variant="success" size="sm">+{product.growth}%</Badge>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${product.percentage}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-2 rounded-full bg-primary-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Daily Patterns */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Revenue Pattern</h3>
            <p className="text-sm text-gray-500">Last 30 days performance</p>
          </div>
        </div>
        <div className="h-48">
          <AreaChart
            data={dailyData}
            dataKey="revenue"
            color="#6366f1"
            height={180}
          />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].slice(0, 4).map((day, i) => {
            const dayData = dailyData.filter(d => d.dayName === day)
            const avgRevenue = dayData.reduce((sum, d) => sum + d.revenue, 0) / dayData.length
            return (
              <div key={day} className="text-center">
                <p className="text-xs text-gray-500 mb-1">{day}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(avgRevenue, 'USD')}
                </p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Hourly Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hourly Activity Pattern</h3>
        <div className="h-40">
          <BarChart
            data={hourlyPatterns}
            dataKey="activity"
            color="#f59e0b"
            height={140}
            showLabels={false}
          />
        </div>
        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>12am</span>
          <span>6am</span>
          <span>12pm</span>
          <span>6pm</span>
          <span>12am</span>
        </div>
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-2">
            <Brain className="w-4 h-4 text-primary-500 mt-0.5" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Peak activity hours: 3-6 PM. Consider scheduling promotions during 8-11 AM to capture morning traffic.
            </p>
          </div>
        </div>
      </Card>

      {/* Geographic Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Geographic Distribution</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 text-sm font-medium text-gray-500">Region</th>
                <th className="text-right py-3 text-sm font-medium text-gray-500">Revenue</th>
                <th className="text-right py-3 text-sm font-medium text-gray-500">Customers</th>
                <th className="text-right py-3 text-sm font-medium text-gray-500">Growth</th>
              </tr>
            </thead>
            <tbody>
              {geographicData.map(region => (
                <tr key={region.region} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 text-sm text-gray-900 dark:text-white">{region.region}</td>
                  <td className="py-3 text-sm text-right font-medium text-gray-900 dark:text-white">
                    {formatCurrency(region.revenue, 'USD')}
                  </td>
                  <td className="py-3 text-sm text-right text-gray-600 dark:text-gray-400">
                    {formatNumber(region.customers)}
                  </td>
                  <td className="py-3 text-right">
                    <Badge variant="success" size="sm">+{region.growth}%</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// Sales & Marketing Tab
function SalesMarketingTab() {
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaignTemplates[0] | null>(null)

  return (
    <div className="space-y-6">
      {/* Sales Projections */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Forecast</h3>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">This Month (Actual)</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(287000, 'USD')}</p>
          </div>
          <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Next Month (Forecast)</p>
            <p className="text-2xl font-bold text-primary-600">{formatCurrency(312000, 'USD')}</p>
            <Badge variant="success" size="sm" className="mt-1">+8.7% projected</Badge>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Q1 Target</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(920000, 'USD')}</p>
            <p className="text-xs text-green-500 mt-1">78% on track</p>
          </div>
        </div>
        <div className="h-48">
          <AreaChart
            data={monthlyData}
            dataKey="revenue"
            color="#22c55e"
            height={180}
          />
        </div>
      </Card>

      {/* Campaign Ideas */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI-Recommended Campaigns</h3>
          <Button variant="primary" size="sm" icon={<Sparkles className="w-4 h-4" />}>
            Generate New Ideas
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaignTemplates.map(campaign => (
            <div
              key={campaign.id}
              onClick={() => setSelectedCampaign(campaign)}
              className={cn(
                "p-4 rounded-xl border-2 cursor-pointer transition-all",
                selectedCampaign?.id === campaign.id
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">{campaign.name}</h4>
                <Badge variant="success" size="sm">{campaign.expectedROI} ROI</Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {campaign.type}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {campaign.audience}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedCampaign && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Campaign: {selectedCampaign.name}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              AI-generated campaign targeting {selectedCampaign.audience.toLowerCase()} with expected {selectedCampaign.expectedROI} return on investment.
            </p>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" icon={<Play className="w-4 h-4" />}>
                Launch Campaign
              </Button>
              <Button variant="outline" size="sm" icon={<Eye className="w-4 h-4" />}>
                Preview
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Customer Segments for Targeting */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Target Segments</h3>
        <div className="space-y-4">
          {customerSegments.map(segment => (
            <div key={segment.name} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                  <span className="font-medium text-gray-900 dark:text-white">{segment.name}</span>
                </div>
                <span className="text-sm text-gray-500">{segment.count} customers</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Avg. Value: {formatCurrency(segment.avgValue, 'USD')}</span>
                <Badge variant="success" size="sm">+{segment.growth}% growth</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// Finance & Accounting Tab
function FinanceAccountingTab() {
  return (
    <div className="space-y-6">
      {/* Cash Flow Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Cash Flow Statement</h3>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Opening Balance</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(cashFlowData.openingBalance, 'USD')}
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Net Change</p>
            <p className="text-2xl font-bold text-green-600">
              +{formatCurrency(cashFlowData.closingBalance - cashFlowData.openingBalance, 'USD')}
            </p>
          </div>
          <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Closing Balance</p>
            <p className="text-2xl font-bold text-primary-600">
              {formatCurrency(cashFlowData.closingBalance, 'USD')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inflows */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <ArrowDownRight className="w-4 h-4 text-green-500" />
              Cash Inflows
            </h4>
            <div className="space-y-2">
              {cashFlowData.inflows.map(item => (
                <div key={item.category} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.category}</p>
                    <p className="text-xs text-gray-500">{item.count} transactions</p>
                  </div>
                  <p className="text-sm font-semibold text-green-600">
                    +{formatCurrency(item.amount, 'USD')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Outflows */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-red-500" />
              Cash Outflows
            </h4>
            <div className="space-y-2">
              {cashFlowData.outflows.map(item => (
                <div key={item.category} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.category}</p>
                    <p className="text-xs text-gray-500">{item.count} transactions</p>
                  </div>
                  <p className="text-sm font-semibold text-red-600">
                    -{formatCurrency(item.amount, 'USD')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Income Statement */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Income Statement (MTD)</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">Total Revenue</span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatCurrency(monthlyData[monthlyData.length - 1].revenue, 'USD')}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">Total Expenses</span>
            <span className="text-lg font-bold text-red-600">
              -{formatCurrency(monthlyData[monthlyData.length - 1].expenses, 'USD')}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
            <span className="font-semibold text-gray-900 dark:text-white">Net Profit</span>
            <span className="text-xl font-bold text-green-600">
              {formatCurrency(monthlyData[monthlyData.length - 1].profit, 'USD')}
            </span>
          </div>
        </div>
      </Card>

      {/* Expense Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expense Analysis</h3>
        <div className="h-48 mb-4">
          <BarChart
            data={monthlyData}
            dataKey="expenses"
            color="#ef4444"
            height={180}
          />
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-2">
            <Brain className="w-4 h-4 text-primary-500 mt-0.5" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Operating expenses increased 12% this month, primarily due to increased logistics costs.
              Consider renegotiating vendor contracts to achieve 8-10% savings.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

// Tax & Compliance Tab
function TaxComplianceTab() {
  return (
    <div className="space-y-6">
      {/* Compliance Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Compliance Status</h3>
          <Badge variant="success" size="sm">
            <CheckCircle className="w-3 h-3 mr-1" />
            Current
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Next Filing Deadline</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{taxComplianceData.nextDeadline}</p>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Estimated Tax Due</p>
            <p className="text-lg font-bold text-amber-600">
              {formatCurrency(taxComplianceData.estimatedTax, 'USD')}
            </p>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <p className="text-sm text-gray-500 mb-1">Missing Documents</p>
            <p className="text-lg font-bold text-red-600">{taxComplianceData.missingDocuments.length}</p>
          </div>
        </div>
      </Card>

      {/* Missing Documents */}
      {taxComplianceData.missingDocuments.length > 0 && (
        <Card className="p-6 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Missing Documents</h4>
              <div className="space-y-2">
                {taxComplianceData.missingDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{doc.document}</span>
                    <Badge variant="warning" size="sm">Due: {doc.dueDate}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Deductions Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Deductions Summary</h3>
        <div className="space-y-3">
          {taxComplianceData.deductions.map((deduction, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm text-gray-700 dark:text-gray-300">{deduction.category}</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatCurrency(deduction.amount, 'USD')}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
            <span className="font-semibold text-gray-900 dark:text-white">Total Deductions</span>
            <span className="text-lg font-bold text-green-600">
              {formatCurrency(taxComplianceData.deductions.reduce((sum, d) => sum + d.amount, 0), 'USD')}
            </span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>AI Note:</strong> This summary is for informational purposes only.
            Please consult with a qualified tax professional for official tax advice.
          </p>
        </div>
      </Card>
    </div>
  )
}

// Operations Advisor Tab
function OperationsAdvisorTab() {
  return (
    <div className="space-y-6">
      {/* Operational Health Score */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Operational Health Score</h3>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-600">87</p>
            <p className="text-xs text-gray-500">out of 100</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
          <div className="h-4 rounded-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '87%' }} />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Payment Success</p>
            <p className="text-lg font-bold text-green-600">98.2%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Avg Response Time</p>
            <p className="text-lg font-bold text-blue-600">1.2s</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Uptime</p>
            <p className="text-lg font-bold text-green-600">99.9%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Error Rate</p>
            <p className="text-lg font-bold text-amber-600">0.3%</p>
          </div>
        </div>
      </Card>

      {/* Correlation Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Why Are Sales Low?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          AI analyzed correlations between sales performance and various operational factors:
        </p>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 dark:text-white">Weekend Performance</span>
              <Badge variant="warning">34% lower</Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Weekend sales are significantly lower than weekdays. This appears to be seasonal.
            </p>
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                <Brain className="w-3 h-3 inline mr-1 text-primary-500" />
                Recommendation: Launch weekend-specific promotions to boost engagement.
              </p>
            </div>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 dark:text-white">Failed Payments Impact</span>
              <Badge variant="error">$2,340 lost</Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              1.8% of transactions failed due to expired cards. Automated retry recovered 45%.
            </p>
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                <Brain className="w-3 h-3 inline mr-1 text-primary-500" />
                Recommendation: Enable card updater service to reduce failures by estimated 60%.
              </p>
            </div>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 dark:text-white">Time Zone Mismatch</span>
              <Badge variant="info">Opportunity</Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              45% of APAC customers transact during US night hours. Support availability is limited.
            </p>
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                <Brain className="w-3 h-3 inline mr-1 text-primary-500" />
                Recommendation: Add APAC-hours support coverage to capture $8K+ potential revenue.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Service Quality Metrics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Service Quality Trends</h3>
        <div className="h-48">
          <AreaChart
            data={dailyData}
            dataKey="conversionRate"
            color="#22c55e"
            height={180}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">Conversion Rate (%) over last 30 days</p>
      </Card>
    </div>
  )
}

// Digital Marketing Hub Tab - Complete redesign with 4 subsections
function DigitalMarketingHubTab() {
  const [activeSubSection, setActiveSubSection] = useState<'accounts' | 'planning' | 'creation' | 'tracking'>('accounts')
  const [generating, setGenerating] = useState(false)
  const [selectedAdType, setSelectedAdType] = useState<string | null>(null)

  // Connected social accounts state
  const [connectedAccounts, setConnectedAccounts] = useState<Record<string, boolean>>({
    facebook: true,
    instagram: true,
    linkedin: false,
    twitter: false,
    google: false,
  })

  const socialPlatforms = [
    { id: 'facebook', name: 'Facebook', icon: '📘', color: 'bg-blue-500' },
    { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
    { id: 'twitter', name: 'X (Twitter)', icon: '𝕏', color: 'bg-gray-900 dark:bg-white dark:text-gray-900' },
    { id: 'google', name: 'Google Business', icon: '🔵', color: 'bg-blue-600' },
  ]

  const adTypes = [
    { id: 'google-search', name: 'Google Search Ads', desc: 'Text ads for search results', platform: 'Google Ads' },
    { id: 'google-display', name: 'Google Display Ads', desc: 'Visual banner ads across the web', platform: 'Google Ads' },
    { id: 'meta-feed', name: 'Meta Feed Ads', desc: 'Photo & video ads for Facebook/Instagram', platform: 'Meta Ads' },
    { id: 'meta-stories', name: 'Meta Stories Ads', desc: 'Full-screen vertical ads', platform: 'Meta Ads' },
    { id: 'linkedin-sponsored', name: 'LinkedIn Sponsored', desc: 'B2B professional ads', platform: 'LinkedIn' },
  ]

  // Calendar data for content planning
  const scheduledPosts = [
    { date: '2026-02-03', platform: 'linkedin', title: 'Industry Report Launch', time: '09:00' },
    { date: '2026-02-05', platform: 'instagram', title: 'Customer Spotlight', time: '12:00' },
    { date: '2026-02-07', platform: 'facebook', title: 'Weekend Sale Announcement', time: '10:00' },
    { date: '2026-02-10', platform: 'twitter', title: 'Product Update Thread', time: '14:00' },
  ]

  // Performance metrics
  const performanceData = {
    totalReach: 124500,
    reachChange: 18.5,
    engagement: 8420,
    engagementChange: 12.3,
    clicks: 3240,
    clicksChange: 25.1,
    conversions: 186,
    conversionChange: 8.7,
  }

  const subSections = [
    { id: 'accounts' as const, label: 'Social Accounts', icon: Globe },
    { id: 'planning' as const, label: 'Content Planning', icon: Calendar },
    { id: 'creation' as const, label: 'Content Creation', icon: Sparkles },
    { id: 'tracking' as const, label: 'Performance', icon: BarChart3 },
  ]

  return (
    <div className="space-y-6">
      {/* Subsection Navigation */}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        {subSections.map(section => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => setActiveSubSection(section.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                activeSubSection === section.id
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          )
        })}
      </div>

      {/* Social Accounts Setup */}
      {activeSubSection === 'accounts' && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connected Accounts</h3>
              <p className="text-sm text-gray-500">Connect your social media accounts to enable AI-powered posting</p>
            </div>
          </div>
          <div className="space-y-4">
            {socialPlatforms.map(platform => (
              <div
                key={platform.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl", platform.color)}>
                    {platform.icon}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{platform.name}</p>
                    <p className="text-sm text-gray-500">
                      {connectedAccounts[platform.id] ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                </div>
                <Button
                  variant={connectedAccounts[platform.id] ? "outline" : "primary"}
                  size="sm"
                  onClick={() => setConnectedAccounts(prev => ({
                    ...prev,
                    [platform.id]: !prev[platform.id]
                  }))}
                >
                  {connectedAccounts[platform.id] ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-primary-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">AI Recommendation</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Connect LinkedIn to reach 45% more B2B decision makers. Based on your customer profile,
                  LinkedIn could generate 2.3x higher quality leads.
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Content Planning Calendar */}
      {activeSubSection === 'planning' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Content Calendar</h3>
                <p className="text-sm text-gray-500">Schedule and plan your content across platforms</p>
              </div>
              <Button variant="primary" size="sm" icon={<Calendar className="w-4 h-4" />}>
                Schedule Post
              </Button>
            </div>

            {/* Calendar View - Simplified Week View */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-center">
                  <p className="text-xs font-medium text-gray-500 mb-2">{day}</p>
                  <div className="h-24 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                    {/* Show posts for this day */}
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Posts */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Upcoming Posts</h4>
              <div className="space-y-3">
                {scheduledPosts.map((post, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        {socialPlatforms.find(p => p.id === post.platform)?.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{post.title}</p>
                        <p className="text-xs text-gray-500">{post.date} at {post.time}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />} />
                      <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-primary-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">AI-Suggested Posting Times</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Based on your audience engagement patterns, the best times to post are:
                </p>
                <div className="flex gap-4 mt-3">
                  <div className="px-3 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">LinkedIn</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Tue-Thu, 9-11 AM</p>
                  </div>
                  <div className="px-3 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Instagram</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Wed-Fri, 12-2 PM</p>
                  </div>
                  <div className="px-3 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <p className="text-xs text-gray-500">Facebook</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Sat-Sun, 10 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Content Creation */}
      {activeSubSection === 'creation' && (
        <div className="space-y-6">
          {/* Ad Copy Types */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create Ad Copy</h3>
            <p className="text-sm text-gray-500 mb-4">Select the ad type you want to create</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {adTypes.map(adType => (
                <button
                  key={adType.id}
                  onClick={() => setSelectedAdType(adType.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all",
                    selectedAdType === adType.id
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  <p className="font-medium text-gray-900 dark:text-white">{adType.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{adType.desc}</p>
                  <Badge variant="default" size="sm" className="mt-2">{adType.platform}</Badge>
                </button>
              ))}
            </div>
          </Card>

          {/* Content Generation Form */}
          {selectedAdType && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Generate {adTypes.find(a => a.id === selectedAdType)?.name}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Product / Service
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Payment processing for SMBs"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Key Benefits (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Fast setup, Low fees, 24/7 support"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Audience
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none">
                    <option>Small Business Owners</option>
                    <option>Enterprise Decision Makers</option>
                    <option>E-commerce Merchants</option>
                    <option>Freelancers & Contractors</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tone
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Professional', 'Friendly', 'Urgent', 'Confident', 'Innovative'].map(tone => (
                      <button
                        key={tone}
                        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    icon={generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    onClick={() => {
                      setGenerating(true)
                      setTimeout(() => setGenerating(false), 2000)
                    }}
                    loading={generating}
                  >
                    Generate Ad Copy
                  </Button>
                  <Button variant="outline" size="md">
                    View Examples
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Social Post Creation */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Social Post</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  What do you want to share?
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your post idea and let AI help you craft it..."
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Post to:</span>
                <div className="flex gap-2">
                  {socialPlatforms.filter(p => connectedAccounts[p.id]).map(platform => (
                    <button
                      key={platform.id}
                      className="w-10 h-10 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 flex items-center justify-center text-lg transition-colors"
                    >
                      {platform.icon}
                    </button>
                  ))}
                </div>
              </div>
              <Button variant="primary" size="md" icon={<Sparkles className="w-4 h-4" />}>
                Generate Post
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Performance Tracking */}
      {activeSubSection === 'tracking' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-sm text-gray-500 mb-1">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(performanceData.totalReach)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+{performanceData.reachChange}%</span>
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-500 mb-1">Engagement</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(performanceData.engagement)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+{performanceData.engagementChange}%</span>
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-500 mb-1">Link Clicks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(performanceData.clicks)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+{performanceData.clicksChange}%</span>
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-500 mb-1">Conversions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {performanceData.conversions}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+{performanceData.conversionChange}%</span>
              </div>
            </Card>
          </div>

          {/* Platform Performance */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance by Platform</h3>
            <div className="space-y-4">
              {socialPlatforms.filter(p => connectedAccounts[p.id]).map(platform => (
                <div key={platform.id} className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white", platform.color)}>
                    {platform.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{platform.name}</span>
                      <span className="text-sm text-gray-500">
                        {Math.round(Math.random() * 30 + 20)}k reach
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-primary-500"
                        style={{ width: `${Math.round(Math.random() * 40 + 40)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-primary-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">AI Performance Insights</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Video content is driving 2.4x more engagement than static images. Consider increasing video production.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Posts with customer testimonials have 68% higher conversion rates.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Your LinkedIn audience engages most with thought leadership content. Consider weekly industry insights.</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

// Ask Anything Tab
// ============================================================================
// MAIN COMPONENT
// ============================================================================

type TabType = 'overview' | 'analytics' | 'sales' | 'finance' | 'tax' | 'operations' | 'content'

export default function AIBusinessAgentPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
    { id: 'analytics' as const, label: 'Business Analytics', icon: LineChart },
    { id: 'sales' as const, label: 'Sales & Marketing', icon: Megaphone },
    { id: 'finance' as const, label: 'Finance & Accounting', icon: Wallet },
    { id: 'tax' as const, label: 'Tax & Compliance', icon: Scale },
    { id: 'operations' as const, label: 'Operations Advisor', icon: Cpu },
    { id: 'content' as const, label: 'Digital Marketing Hub', icon: Palette },
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  AI Business Agent
                </h1>
                <p className="text-sm text-gray-500">Your intelligent business co-pilot</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="md"
              icon={<RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />}
              onClick={handleRefresh}
              loading={isRefreshing}
            >
              Refresh Data
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<Download className="w-4 h-4" />}
            >
              Export Report
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl min-w-max">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'analytics' && <BusinessAnalyticsTab />}
            {activeTab === 'sales' && <SalesMarketingTab />}
            {activeTab === 'finance' && <FinanceAccountingTab />}
            {activeTab === 'tax' && <TaxComplianceTab />}
            {activeTab === 'operations' && <OperationsAdvisorTab />}
            {activeTab === 'content' && <DigitalMarketingHubTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageLayout>
  )
}
