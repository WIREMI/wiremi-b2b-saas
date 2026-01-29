'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  Brain,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AIInsight {
  id: string
  type: 'opportunity' | 'warning' | 'trend' | 'anomaly'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  confidence: number
  recommendation: string
  metric?: {
    value: string
    change: number
  }
}

export default function AIBusinessAnalyticsPage() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [timeRange, setTimeRange] = useState('30d')

  // Mock AI-generated insights
  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'Revenue Growth Opportunity Detected',
      description: 'AI analysis shows a 34% increase in customer acquisition during weekday mornings. Optimizing marketing spend during these hours could yield 2.3x ROI.',
      impact: 'high',
      confidence: 92,
      recommendation: 'Shift 40% of marketing budget to weekday 8-11 AM time slots',
      metric: { value: '$12.4K', change: 23.5 }
    },
    {
      id: '2',
      type: 'warning',
      title: 'Cash Flow Pattern Anomaly',
      description: 'Unusual spending pattern detected in vendor payments. Average payment size increased 47% in the last 14 days compared to 90-day baseline.',
      impact: 'high',
      confidence: 88,
      recommendation: 'Review recent vendor contracts and payment terms for discrepancies',
      metric: { value: '$45.2K', change: 47.3 }
    },
    {
      id: '3',
      type: 'trend',
      title: 'Customer Retention Improving',
      description: 'Machine learning models predict 18% improvement in customer retention based on recent engagement patterns and payment behavior.',
      impact: 'medium',
      confidence: 85,
      recommendation: 'Double down on current customer success initiatives',
      metric: { value: '87.2%', change: 5.8 }
    },
    {
      id: '4',
      type: 'anomaly',
      title: 'Transaction Volume Spike',
      description: 'AI detected 3.2x normal transaction volume in the Enterprise segment. This pattern typically precedes major account expansion.',
      impact: 'medium',
      confidence: 79,
      recommendation: 'Prepare sales team for upsell conversations with Enterprise clients',
      metric: { value: '1,247', change: 218.5 }
    },
  ]

  const kpiMetrics = [
    {
      label: 'Revenue Forecast',
      value: '$284.5K',
      change: 12.5,
      trend: 'up' as const,
      aiPrediction: 'AI predicts 15-18% growth next month',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-500/20'
    },
    {
      label: 'Customer LTV',
      value: '$45,230',
      change: 8.3,
      trend: 'up' as const,
      aiPrediction: 'Retention improvements driving value',
      icon: <Users className="w-5 h-5" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-500/20'
    },
    {
      label: 'Churn Risk',
      value: '3.2%',
      change: -1.8,
      trend: 'down' as const,
      aiPrediction: 'Below industry average (4.5%)',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-500/20'
    },
    {
      label: 'Avg Deal Size',
      value: '$12.8K',
      change: 15.7,
      trend: 'up' as const,
      aiPrediction: 'Enterprise segment driving growth',
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-500/20'
    },
  ]

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'opportunity':
        return { icon: <Target className="w-5 h-5" />, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-500/20' }
      case 'warning':
        return { icon: <AlertTriangle className="w-5 h-5" />, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-500/20' }
      case 'trend':
        return { icon: <TrendingUp className="w-5 h-5" />, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/20' }
      case 'anomaly':
        return { icon: <Zap className="w-5 h-5" />, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/20' }
    }
  }

  const handleRunAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 3000)
  }

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI Business Analytics
              </h1>
              <Badge variant="default" className="bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Advanced insights powered by machine learning and predictive analytics
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-surface text-gray-900 dark:text-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <Button
              variant="outline"
              size="md"
              icon={<RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />}
              onClick={handleRunAnalysis}
              loading={isAnalyzing}
            >
              Run Analysis
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

        {/* AI Status Banner */}
        <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-500/10 dark:to-purple-500/10 border border-violet-200 dark:border-violet-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-violet-900 dark:text-violet-300 mb-1">
                AI Analysis Complete • {aiInsights.length} Insights Generated
              </p>
              <p className="text-sm text-violet-700 dark:text-violet-400">
                Our AI analyzed {timeRange === '7d' ? '847' : timeRange === '30d' ? '3,421' : '12,385'} data points across revenue, customer behavior, and operational metrics to surface actionable insights.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-dark-surface px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-600 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center ${metric.color}`}>
                {metric.icon}
              </div>
              <Badge variant={metric.trend === 'up' ? 'success' : 'error'} size="sm">
                {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {Math.abs(metric.change)}%
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{metric.value}</p>
            <div className="flex items-center gap-2 text-xs text-violet-600 dark:text-violet-400">
              <Sparkles className="w-3 h-3" />
              <span>{metric.aiPrediction}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI-Generated Insights</h2>
          <Badge variant="default" size="sm">
            Updated 5 minutes ago
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {aiInsights.map((insight) => {
            const iconConfig = getInsightIcon(insight.type)
            return (
              <Card key={insight.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 ${iconConfig.bg} rounded-xl flex items-center justify-center flex-shrink-0 ${iconConfig.color}`}>
                    {iconConfig.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {insight.title}
                      </h3>
                      <Badge
                        variant={insight.impact === 'high' ? 'error' : insight.impact === 'medium' ? 'warning' : 'default'}
                        size="sm"
                      >
                        {insight.impact} impact
                      </Badge>
                    </div>
                    {insight.metric && (
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {insight.metric.value}
                        </span>
                        <Badge variant={insight.metric.change >= 0 ? 'success' : 'error'} size="sm">
                          {insight.metric.change >= 0 ? '+' : ''}{insight.metric.change}%
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {insight.description}
                </p>

                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg mb-4">
                  <div className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">
                        AI Recommendation
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        {insight.recommendation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Prediction Model
            </h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-500/5 dark:to-purple-500/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Brain className="w-12 h-12 text-violet-500 mx-auto mb-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered revenue forecasting chart
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                Interactive visualization coming soon
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Customer Segmentation
            </h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-500/5 dark:to-cyan-500/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ML-based customer clustering
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                Interactive visualization coming soon
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
