'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  TrendingUp,
  TrendingDown,
  Eye,
  DollarSign,
  Percent,
  Calendar,
  Building2,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Download
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'

interface Investment {
  id: string
  campaignId: string
  campaignTitle: string
  companyName: string
  investmentType: 'equity' | 'debt' | 'hybrid'
  investmentDate: string
  amount: number
  // Equity specific
  equityPercentage?: number
  currentValuation?: number
  initialValuation?: number
  // Debt specific
  interestRate?: number
  term?: number
  paymentsReceived?: number
  nextPaymentDate?: string
  // General
  status: 'active' | 'completed' | 'defaulted'
  returnsToDate: number
  projectedReturns: number
  category: string
}

const mockInvestments: Investment[] = [
  {
    id: '1',
    campaignId: '1',
    campaignTitle: 'EcoTech Solar Solutions - Series A',
    companyName: 'EcoTech Solar Solutions Inc.',
    investmentType: 'equity',
    investmentDate: '2025-12-20',
    amount: 25000,
    equityPercentage: 0.75,
    currentValuation: 3500000,
    initialValuation: 3333333,
    status: 'active',
    returnsToDate: 1250,
    projectedReturns: 12500,
    category: 'Clean Energy'
  },
  {
    id: '2',
    campaignId: '3',
    campaignTitle: 'HealthTech AI Diagnostics',
    companyName: 'HealthTech AI Corp',
    investmentType: 'debt',
    investmentDate: '2025-11-10',
    amount: 50000,
    interestRate: 12,
    term: 36,
    paymentsReceived: 1200,
    nextPaymentDate: '2026-02-10',
    status: 'active',
    returnsToDate: 1200,
    projectedReturns: 18000,
    category: 'Healthcare'
  },
  {
    id: '3',
    campaignId: '4',
    campaignTitle: 'Urban Farming Startup',
    companyName: 'GreenStack Farms',
    investmentType: 'hybrid',
    investmentDate: '2025-10-05',
    amount: 10000,
    equityPercentage: 0.5,
    currentValuation: 10200000,
    initialValuation: 10000000,
    interestRate: 8,
    term: 48,
    paymentsReceived: 320,
    nextPaymentDate: '2026-02-05',
    status: 'active',
    returnsToDate: 420,
    projectedReturns: 4800,
    category: 'Agriculture'
  },
  {
    id: '4',
    campaignId: '5',
    campaignTitle: 'FinTech Payment Gateway',
    companyName: 'PayFlow Technologies',
    investmentType: 'equity',
    investmentDate: '2024-08-15',
    amount: 15000,
    equityPercentage: 1.2,
    currentValuation: 2000000,
    initialValuation: 1250000,
    status: 'completed',
    returnsToDate: 24000,
    projectedReturns: 24000,
    category: 'FinTech'
  },
  {
    id: '5',
    campaignId: '6',
    campaignTitle: 'Organic Food Distribution',
    companyName: 'FreshDirect Organic',
    investmentType: 'debt',
    investmentDate: '2025-09-20',
    amount: 20000,
    interestRate: 10,
    term: 24,
    paymentsReceived: 800,
    nextPaymentDate: '2026-02-20',
    status: 'active',
    returnsToDate: 800,
    projectedReturns: 4000,
    category: 'Consumer Goods'
  }
]

export default function MyInvestmentsPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalReturns = mockInvestments.reduce((sum, inv) => sum + inv.returnsToDate, 0)
  const portfolioValue = totalInvested + totalReturns
  const overallReturn = ((totalReturns / totalInvested) * 100).toFixed(1)
  const projectedTotalReturns = mockInvestments.reduce((sum, inv) => sum + inv.projectedReturns, 0)
  const projectedReturn = ((projectedTotalReturns / totalInvested) * 100).toFixed(1)

  const activeInvestments = mockInvestments.filter(inv => inv.status === 'active').length

  const filteredInvestments = mockInvestments.filter(investment => {
    const matchesType = filterType === 'all' || investment.investmentType === filterType
    const matchesStatus = filterStatus === 'all' || investment.status === filterStatus
    return matchesType && matchesStatus
  })

  const calculateReturn = (investment: Investment) => {
    const returnAmount = investment.returnsToDate
    const returnPercentage = ((returnAmount / investment.amount) * 100).toFixed(1)
    return { amount: returnAmount, percentage: returnPercentage }
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Investments
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your capital investments and returns
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Portfolio Value
            </span>
            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
              <PieChart className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            ${portfolioValue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-success font-medium">+{overallReturn}%</span>
            <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">overall</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Invested
            </span>
            <div className="w-10 h-10 bg-info/10 dark:bg-info/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-info" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            ${totalInvested.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
            Across {mockInvestments.length} investments
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Returns to Date
            </span>
            <div className="w-10 h-10 bg-success/10 dark:bg-success/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            ${totalReturns.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-sm mt-1">
            <span className="text-success font-medium">+{overallReturn}%</span>
            <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">return</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Projected Returns
            </span>
            <div className="w-10 h-10 bg-warning/10 dark:bg-warning/20 rounded-lg flex items-center justify-center">
              <Percent className="w-5 h-5 text-warning" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            ${projectedTotalReturns.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-sm mt-1">
            <span className="text-warning font-medium">+{projectedReturn}%</span>
            <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">projected</span>
          </div>
        </Card>
      </div>

      {/* Portfolio Allocation */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Portfolio Allocation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Equity Investments
              </span>
              <Badge variant="primary" size="sm">
                {mockInvestments.filter(inv => inv.investmentType === 'equity' || inv.investmentType === 'hybrid').length}
              </Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${mockInvestments
                .filter(inv => inv.investmentType === 'equity' || inv.investmentType === 'hybrid')
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
              {(
                (mockInvestments
                  .filter(inv => inv.investmentType === 'equity' || inv.investmentType === 'hybrid')
                  .reduce((sum, inv) => sum + inv.amount, 0) /
                  totalInvested) *
                100
              ).toFixed(0)}% of portfolio
            </div>
          </div>

          <div className="p-4 bg-success/5 dark:bg-success/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Debt Investments
              </span>
              <Badge variant="success" size="sm">
                {mockInvestments.filter(inv => inv.investmentType === 'debt' || inv.investmentType === 'hybrid').length}
              </Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${mockInvestments
                .filter(inv => inv.investmentType === 'debt' || inv.investmentType === 'hybrid')
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
              {(
                (mockInvestments
                  .filter(inv => inv.investmentType === 'debt' || inv.investmentType === 'hybrid')
                  .reduce((sum, inv) => sum + inv.amount, 0) /
                  totalInvested) *
                100
              ).toFixed(0)}% of portfolio
            </div>
          </div>

          <div className="p-4 bg-warning/5 dark:bg-warning/10 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Active Investments
              </span>
              <Badge variant="warning" size="sm">{activeInvestments}</Badge>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${mockInvestments
                .filter(inv => inv.status === 'active')
                .reduce((sum, inv) => sum + inv.amount, 0)
                .toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
              {(
                (mockInvestments
                  .filter(inv => inv.status === 'active')
                  .reduce((sum, inv) => sum + inv.amount, 0) /
                  totalInvested) *
                100
              ).toFixed(0)}% of portfolio
            </div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Investment Type"
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'equity', label: 'Equity Only' },
              { value: 'debt', label: 'Debt Only' },
              { value: 'hybrid', label: 'Hybrid' }
            ]}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          />

          <Select
            label="Status"
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Completed' },
              { value: 'defaulted', label: 'Defaulted' }
            ]}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          />

          <div className="flex items-end">
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-4 h-4" />}
              onClick={() => {
                showToast({
                  type: 'success',
                  title: 'Export Started',
                  message: 'Your portfolio report will be downloaded shortly'
                })
              }}
              className="w-full"
            >
              Export Portfolio
            </Button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredInvestments.length} of {mockInvestments.length} investments
        </div>
      </Card>

      {/* Investments List */}
      {filteredInvestments.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-dark-card rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PieChart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No investments found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start investing in campaigns to build your portfolio
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push('/crowdfunding/marketplace')}
          >
            Browse Campaigns
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredInvestments.map((investment) => {
            const returns = calculateReturn(investment)
            const isPositive = parseFloat(returns.percentage) > 0

            return (
              <Card key={investment.id} className="p-5 hover:border-primary-500 dark:hover:border-primary-500 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Company Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      investment.investmentType === 'equity'
                        ? 'bg-primary/10 dark:bg-primary/20'
                        : investment.investmentType === 'debt'
                        ? 'bg-success/10 dark:bg-success/20'
                        : 'bg-info/10 dark:bg-info/20'
                    }`}>
                      <Building2 className={`w-8 h-8 ${
                        investment.investmentType === 'equity'
                          ? 'text-primary'
                          : investment.investmentType === 'debt'
                          ? 'text-success'
                          : 'text-info'
                      }`} />
                    </div>
                  </div>

                  {/* Investment Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
                          {investment.companyName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {investment.campaignTitle}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant={
                              investment.investmentType === 'equity'
                                ? 'primary'
                                : investment.investmentType === 'debt'
                                ? 'success'
                                : 'info'
                            }
                            size="sm"
                            className="capitalize"
                          >
                            {investment.investmentType}
                          </Badge>
                          <Badge
                            variant={
                              investment.status === 'active'
                                ? 'success'
                                : investment.status === 'completed'
                                ? 'default'
                                : 'error'
                            }
                            size="sm"
                            className="capitalize"
                          >
                            {investment.status}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            {investment.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Investment Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 block mb-1">
                          Investment
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          ${investment.amount.toLocaleString()}
                        </span>
                      </div>

                      {investment.investmentType === 'equity' && investment.equityPercentage && (
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 block mb-1">
                            Equity Stake
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {investment.equityPercentage}%
                          </span>
                        </div>
                      )}

                      {(investment.investmentType === 'debt' || investment.investmentType === 'hybrid') && investment.interestRate && (
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 block mb-1">
                            Interest Rate
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {investment.interestRate}% APR
                          </span>
                        </div>
                      )}

                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 block mb-1">
                          Returns to Date
                        </span>
                        <div className="flex items-center gap-1">
                          <span className={`font-bold ${isPositive ? 'text-success' : 'text-error'}`}>
                            ${returns.amount.toLocaleString()}
                          </span>
                          {isPositive ? (
                            <ArrowUpRight className="w-4 h-4 text-success" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-error" />
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 block mb-1">
                          Return %
                        </span>
                        <span className={`font-bold ${isPositive ? 'text-success' : 'text-error'}`}>
                          {isPositive ? '+' : ''}{returns.percentage}%
                        </span>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Invested {new Date(investment.investmentDate).toLocaleDateString()}</span>
                      </div>
                      {investment.nextPaymentDate && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>Next payment: {new Date(investment.nextPaymentDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      {investment.currentValuation && investment.initialValuation && (
                        <div className="flex items-center gap-1">
                          {investment.currentValuation > investment.initialValuation ? (
                            <>
                              <TrendingUp className="w-4 h-4 text-success" />
                              <span className="text-success">
                                Valuation up {(((investment.currentValuation - investment.initialValuation) / investment.initialValuation) * 100).toFixed(1)}%
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-4 h-4 text-error" />
                              <span className="text-error">
                                Valuation down {(((investment.initialValuation - investment.currentValuation) / investment.initialValuation) * 100).toFixed(1)}%
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Eye className="w-4 h-4" />}
                      onClick={() => router.push(`/crowdfunding/campaigns/${investment.campaignId}`)}
                      className="flex-1 lg:flex-none lg:w-full"
                    >
                      View Campaign
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<FileText className="w-4 h-4" />}
                      onClick={() => {
                        showToast({
                          type: 'success',
                          title: 'Report Generated',
                          message: 'Investment report downloaded'
                        })
                      }}
                      className="flex-1 lg:flex-none lg:w-full"
                    >
                      Report
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </PageLayout>
  )
}
