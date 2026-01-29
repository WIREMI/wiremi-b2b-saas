'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import EmptyState from '@/components/ui/empty-state'
import {
  Shield,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  Users,
  ArrowRight,
  ArrowLeft,
  Mail
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import {
  getAllEscrows,
  getEscrowStats,
  getPendingInvitations
} from '@/lib/mock-data/escrow'
import type { Escrow, EscrowState } from '@/types/escrow'
import { STATE_LABELS, STATE_COLORS } from '@/types/escrow'

type TabType = 'all' | 'custodian' | 'beneficiary' | 'stakeholder' | 'invitations'

export default function EscrowDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [stateFilter, setStateFilter] = useState<EscrowState | 'ALL'>('ALL')

  // Mock user - in real app, this would come from auth context
  const currentUserId = 'user-custodian-acme'
  const currentUserEmail = 'finance@acmecorp.com'

  // Get all data
  const allEscrows = getAllEscrows()
  const stats = getEscrowStats()
  const invitations = getPendingInvitations(currentUserEmail)

  // Filter escrows based on active tab
  const filteredEscrows = useMemo(() => {
    let escrows = allEscrows

    // Filter by tab
    if (activeTab === 'custodian') {
      escrows = escrows.filter(e => e.custodian.userId === currentUserId)
    } else if (activeTab === 'beneficiary') {
      escrows = escrows.filter(e => e.beneficiary.userId === currentUserId)
    } else if (activeTab === 'stakeholder') {
      escrows = escrows.filter(e =>
        e.stakeholders.some(s => s.userId === currentUserId)
      )
    } else if (activeTab === 'invitations') {
      return invitations
    }

    // Filter by state
    if (stateFilter !== 'ALL') {
      escrows = escrows.filter(e => e.state === stateFilter)
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      escrows = escrows.filter(e =>
        e.name.toLowerCase().includes(term) ||
        e.escrowId.toLowerCase().includes(term) ||
        e.description.toLowerCase().includes(term)
      )
    }

    return escrows
  }, [allEscrows, activeTab, stateFilter, searchTerm, currentUserId, invitations])

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Get state badge color
  const getStateBadgeColor = (state: EscrowState): 'success' | 'warning' | 'error' | 'info' => {
    const colorMap: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
      green: 'success',
      emerald: 'success',
      teal: 'success',
      yellow: 'warning',
      orange: 'warning',
      red: 'error',
      blue: 'info',
      cyan: 'info',
      indigo: 'info',
      purple: 'info',
      gray: 'info',
      slate: 'info'
    }
    return colorMap[STATE_COLORS[state]] || 'info'
  }

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Back Navigation */}
      <div className="mb-2">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Escrow Management
          </h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            Manage business escrows, fund requests, and conditional releases
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              ${(stats.totalValue / 1000).toFixed(0)}K
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Total Value
          </div>
          <div className="text-[12px] text-gray-500">
            Across {stats.totalEscrows} escrows
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {stats.activeEscrows}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Active Escrows
          </div>
          <div className="text-[12px] text-green-600 dark:text-green-400">
            ${(stats.totalFunded / 1000).toFixed(0)}K funded
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {stats.byState.REQUESTED + stats.byState.UNDER_REVIEW + stats.byState.AWAITING_SIGNATURES}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Pending Actions
          </div>
          <div className="text-[12px] text-gray-500">
            Require your attention
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {stats.completedEscrows}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Completed
          </div>
          <div className="text-[12px] text-gray-500">
            ${(stats.totalReleased / 1000).toFixed(0)}K released
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/escrow/create')}
            className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Escrow</span>
          </button>
          {invitations.length > 0 && (
            <button
              onClick={() => router.push('/escrow/invitations')}
              className="px-4 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Invitations ({invitations.length})</span>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="w-full sm:w-80 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search escrows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-[13px] bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60'
          }`}
        >
          All Escrows
          <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-white/20 dark:bg-black/20 text-[11px]">
            {allEscrows.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('custodian')}
          className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap ${
            activeTab === 'custodian'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60'
          }`}
        >
          As Custodian
        </button>
        <button
          onClick={() => setActiveTab('beneficiary')}
          className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap ${
            activeTab === 'beneficiary'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60'
          }`}
        >
          As Beneficiary
        </button>
        <button
          onClick={() => setActiveTab('stakeholder')}
          className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap ${
            activeTab === 'stakeholder'
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60'
          }`}
        >
          As Stakeholder
        </button>
        {invitations.length > 0 && (
          <button
            onClick={() => setActiveTab('invitations')}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap ${
              activeTab === 'invitations'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60'
            }`}
          >
            Invitations
            <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-red-500 dark:bg-red-600 text-white text-[11px]">
              {invitations.length}
            </span>
          </button>
        )}
      </div>

      {/* State Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <button
          onClick={() => setStateFilter('ALL')}
          className={`px-2.5 py-1 rounded-lg text-[12px] font-medium transition-colors whitespace-nowrap ${
            stateFilter === 'ALL'
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60'
          }`}
        >
          All States
        </button>
        {Object.entries(stats.byState)
          .filter(([_, count]) => count > 0)
          .map(([state, count]) => (
            <button
              key={state}
              onClick={() => setStateFilter(state as EscrowState)}
              className={`px-2.5 py-1 rounded-lg text-[12px] font-medium transition-colors whitespace-nowrap ${
                stateFilter === state
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/60'
              }`}
            >
              {STATE_LABELS[state as EscrowState]}
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 dark:bg-black/20 text-[11px]">
                {count}
              </span>
            </button>
          ))}
      </div>

      {/* Escrow List */}
      {filteredEscrows.length === 0 ? (
        <EmptyState
          icon={<Shield className="w-12 h-12" />}
          title={searchTerm ? 'No escrows found' : 'No escrows yet'}
          description={
            searchTerm
              ? 'Try adjusting your search or filters'
              : 'Create your first escrow to get started with secure business transactions'
          }
          action={
            !searchTerm
              ? {
                  label: 'Create Escrow',
                  onClick: () => router.push('/escrow/create'),
                  icon: <Plus className="w-4 h-4" />
                }
              : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredEscrows.map((escrow) => (
            <EscrowCard
              key={escrow.id}
              escrow={escrow}
              currentUserId={currentUserId}
              onClick={() => router.push(`/escrow/${escrow.id}`)}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              getStateBadgeColor={getStateBadgeColor}
            />
          ))}
        </div>
      )}
    </div>
    </PageLayout>
  )
}

// Escrow Card Component
interface EscrowCardProps {
  escrow: Escrow
  currentUserId: string
  onClick: () => void
  formatCurrency: (amount: number, currency: string) => string
  formatDate: (date: string) => string
  getStateBadgeColor: (state: EscrowState) => 'success' | 'warning' | 'error' | 'info'
}

function EscrowCard({
  escrow,
  currentUserId,
  onClick,
  formatCurrency,
  formatDate,
  getStateBadgeColor
}: EscrowCardProps) {
  // Determine user's role in this escrow
  const userRole =
    escrow.custodian.userId === currentUserId
      ? 'Custodian'
      : escrow.beneficiary.userId === currentUserId
      ? 'Beneficiary'
      : escrow.stakeholders.some(s => s.userId === currentUserId)
      ? 'Stakeholder'
      : null

  // Calculate progress
  const progress = escrow.totalAmount > 0
    ? (escrow.fundedAmount / escrow.totalAmount) * 100
    : 0

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">
                  {escrow.name}
                </h3>
                <Badge variant={getStateBadgeColor(escrow.state)}>
                  {STATE_LABELS[escrow.state]}
                </Badge>
                {userRole && (
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 rounded text-[11px] font-medium">
                    {userRole}
                  </span>
                )}
              </div>
              <p className="text-[12px] text-gray-500 mt-0.5">
                {escrow.escrowId} • {escrow.description}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-500">
                <span>{escrow.custodian.businessName} → {escrow.beneficiary.businessName}</span>
                <span>•</span>
                <span>{formatDate(escrow.lastActivityAt)}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-gray-600 dark:text-gray-400">
                Funded: {formatCurrency(escrow.fundedAmount, escrow.currency)} of {formatCurrency(escrow.totalAmount, escrow.currency)}
              </span>
              <span className="text-gray-500 tabular-nums">
                {progress.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-teal-600 dark:bg-teal-500 h-1.5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            {escrow.releasedAmount > 0 && (
              <p className="text-[11px] text-green-600 dark:text-green-400 mt-1">
                Released: {formatCurrency(escrow.releasedAmount, escrow.currency)}
              </p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Stats */}
          <div className="hidden sm:flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="text-xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {formatCurrency(escrow.remainingAmount, escrow.currency)}
              </p>
              <p className="text-[11px] text-gray-500">
                Remaining
              </p>
            </div>
            {escrow.stakeholders.length > 0 && (
              <div className="flex items-center gap-1 text-[11px] text-gray-600 dark:text-gray-400">
                <Users className="w-3 h-3" />
                <span>{escrow.stakeholders.length} stakeholder{escrow.stakeholders.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Arrow */}
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
