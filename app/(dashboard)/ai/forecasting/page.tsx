'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Sparkles,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Brain,
  LineChart,
  AlertCircle,
  CheckCircle,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  Clock,
  Activity,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Forecast {
  month: string
  predicted: number
  confidence: { low: number; high: number }
  actual?: number
}

interface ForecastMetric {
  label: string
  current: string
  predicted: string
  change: number
  accuracy: number
  icon: React.ReactNode
  color: string
  bgColor: string
}

interface RiskFactor {
  risk: string
  level: 'high' | 'medium' | 'low'
  impact: string
  mitigation: string
}

export default function AIFinancialForecastingPage() {
  const router = useRouter()
  const [isForecasting, setIsForecasting] = useState(false)
  const [forecastHorizon, setForecastHorizon] = useState('3m')

  // Mock revenue forecast data
  const revenueForecasts: Forecast[] = [
    { month: 'Jan 2026', predicted: 284500, confidence: { low: 270000, high: 299000 }, actual: 282100 },
    { month: 'Feb 2026', predicted: 312800, confidence: { low: 295000, high: 330600 } },
    { month: 'Mar 2026', predicted: 341200, confidence: { low: 318000, high: 364400 } },
    { month: 'Apr 2026', predicted: 368900, confidence: { low: 340000, high: 397800 } },
    { month: 'May 2026', predicted: 395100, confidence: { low: 360000, high: 430200 } },
    { month: 'Jun 2026', predicted: 419800, confidence: { low: 378000, high: 461780 } },
  ]

  const forecastMetrics: ForecastMetric[] = [
    {
      label: 'Q1 Revenue',
      current: '$284.5K',
      predicted: '$341.2K',
      change: 19.9,
      accuracy: 94,
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-500/20'
    },
    {
      label: 'MRR Growth',
      current: '$95.2K',
      predicted: '$118.7K',
      change: 24.7,
      accuracy: 91,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-500/20'
    },
    {
      label: 'Cash Runway',
      current: '18 months',
      predicted: '22 months',
      change: 22.2,
      accuracy: 88,
      icon: <Clock className="w-5 h-5" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-500/20'
    },
    {
      label: 'Burn Rate',
      current: '$45.2K/mo',
      predicted: '$38.1K/mo',
      change: -15.7,
      accuracy: 92,
      icon: <Activity className="w-5 h-5" />,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-500/20'
    },
  ]

  const scenarioAnalysis = [
    {
      name: 'Optimistic',
      probability: 25,
      revenue: '$425.8K',
      change: 49.7,
      description: 'Strong market conditions, high customer acquisition',
      factors: ['Market expansion', 'Product-market fit', 'Low churn']
    },
    {
      name: 'Base Case',
      probability: 50,
      revenue: '$341.2K',
      change: 19.9,
      description: 'Expected growth trajectory based on historical trends',
      factors: ['Steady growth', 'Normal retention', 'Planned marketing']
    },
    {
      name: 'Conservative',
      probability: 25,
      revenue: '$295.6K',
      change: 3.9,
      description: 'Economic headwinds, increased competition',
      factors: ['Market slowdown', 'Higher CAC', 'Pricing pressure']
    },
  ]

  const riskFactors: RiskFactor[] = [
    {
      risk: 'Customer Concentration',
      level: 'high',
      impact: 'Top 3 customers represent 42% of revenue',
      mitigation: 'Diversify customer base across segments'
    },
    {
      risk: 'Seasonal Variation',
      level: 'low',
      impact: 'Q4 historically 18% below average',
      mitigation: 'Plan marketing campaigns for Q3-Q4'
    },
    {
      risk: 'Churn Risk',
      level: 'low',
      impact: 'AI detected 12 accounts at risk ($87K ARR)',
      mitigation: 'Proactive customer success outreach'
    },
  ]

  const handleRunForecast = () => {
    setIsForecasting(true)
    setTimeout(() => setIsForecasting(false), 3000)
  }

  const formatCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(1)}K`
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
                AI Financial Forecasting
              </h1>
              <Badge variant="default" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                <Brain className="w-3 h-3 mr-1" />
                Predictive AI
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              ML-powered revenue predictions and scenario planning
            </p>
          </div>
          <div className="flex gap-2">
            <select
              value={forecastHorizon}
              onChange={(e) => setForecastHorizon(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-surface text-gray-900 dark:text-white"
            >
              <option value="1m">1 Month</option>
              <option value="3m">3 Months</option>
              <option value="6m">6 Months</option>
              <option value="12m">12 Months</option>
            </select>
            <Button
              variant="outline"
              size="md"
              icon={<RefreshCw className={`w-4 h-4 ${isForecasting ? 'animate-spin' : ''}`} />}
              onClick={handleRunForecast}
              loading={isForecasting}
            >
              Refresh Forecast
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<Download className="w-4 h-4" />}
            >
              Export Forecast
            </Button>
          </div>
        </div>

        {/* AI Status Banner */}
        <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <LineChart className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-emerald-900 dark:text-emerald-300 mb-1">
                Forecast Updated • 94% Historical Accuracy
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-400">
                AI analyzed {forecastHorizon === '3m' ? '24 months' : forecastHorizon === '6m' ? '36 months' : '12 months'} of historical data using ARIMA, Prophet, and LSTM neural networks to generate predictions with confidence intervals.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-dark-surface px-3 py-2 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">94% Accurate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {forecastMetrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center ${metric.color}`}>
                {metric.icon}
              </div>
              <div className="text-right">
                <Badge variant={metric.change >= 0 ? 'success' : 'error'} size="sm">
                  {metric.change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {Math.abs(metric.change)}%
                </Badge>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.label}</p>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl font-bold text-gray-900 dark:text-white">{metric.current}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">→</span>
              <span className="text-xl font-bold text-green-500">{metric.predicted}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 dark:bg-green-600 rounded-full" style={{ width: `${metric.accuracy}%` }} />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">{metric.accuracy}%</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Forecast Chart */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Revenue Forecast Timeline</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-blue-500 dark:bg-blue-600 rounded" />
              <span className="text-gray-600 dark:text-gray-400">Predicted</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-blue-200 dark:bg-blue-500/30 rounded" />
              <span className="text-gray-600 dark:text-gray-400">Confidence Range</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-green-500 dark:bg-green-600 rounded" />
              <span className="text-gray-600 dark:text-gray-400">Actual</span>
            </div>
          </div>
        </div>

        {/* Simplified Chart Visualization */}
        <div className="space-y-4">
          {revenueForecasts.map((forecast, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white w-24">{forecast.month}</span>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1 relative h-10 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    {/* Confidence Range */}
                    <div
                      className="absolute h-full bg-blue-200 dark:bg-blue-500/20"
                      style={{
                        left: `${(forecast.confidence.low / 500000) * 100}%`,
                        width: `${((forecast.confidence.high - forecast.confidence.low) / 500000) * 100}%`
                      }}
                    />
                    {/* Predicted Value */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 dark:bg-blue-600"
                      style={{ left: `${(forecast.predicted / 500000) * 100}%` }}
                    />
                    {/* Actual Value (if available) */}
                    {forecast.actual && (
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 dark:bg-green-600 rounded-full"
                        style={{ left: `${(forecast.actual / 500000) * 100}%` }}
                      />
                    )}
                  </div>
                  <div className="w-32 text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(forecast.predicted)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                      {formatCurrency(forecast.confidence.low)} - {formatCurrency(forecast.confidence.high)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Scenario Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Scenario Analysis</h3>
          <div className="space-y-4">
            {scenarioAnalysis.map((scenario, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{scenario.name}</h4>
                      <Badge variant="default" size="sm">{scenario.probability}% likely</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{scenario.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{scenario.revenue}</p>
                    <Badge variant={scenario.change >= 20 ? 'success' : scenario.change >= 10 ? 'warning' : 'default'} size="sm">
                      {scenario.change >= 0 ? '+' : ''}{scenario.change}%
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {scenario.factors.map((factor, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-white dark:bg-dark-surface rounded-md text-gray-600 dark:text-gray-400">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Risk Factors */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Risk Factors</h3>
          <div className="space-y-4">
            {riskFactors.map((risk, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    risk.level === 'high' ? 'text-red-500' :
                    risk.level === 'medium' ? 'text-amber-500' :
                    'text-green-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{risk.risk}</h4>
                      <Badge
                        variant={risk.level === 'high' ? 'error' : risk.level === 'medium' ? 'warning' : 'success'}
                        size="sm"
                      >
                        {risk.level} risk
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {risk.impact}
                    </p>
                    <div className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-500/10 rounded-md">
                      <Target className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-700 dark:text-blue-400">
                        {risk.mitigation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Model Info */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-violet-100 dark:bg-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-violet-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              How Our AI Forecasting Works
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our forecasting engine combines multiple machine learning models to provide accurate, reliable predictions:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-dark-card rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">ARIMA Models</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Time series analysis for trend detection and seasonal patterns
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-dark-card rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Prophet Algorithm</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Facebook's forecasting tool for handling multiple seasonality
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-dark-card rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">LSTM Neural Networks</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Deep learning for complex pattern recognition and predictions
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </PageLayout>
  )
}
