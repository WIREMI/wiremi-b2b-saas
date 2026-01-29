'use client'

import { useRouter } from 'next/navigation'
import {
  TrendingUp,
  DollarSign,
  Heart,
  Users,
  Target,
  Briefcase,
  PieChart,
  Plus,
  Eye,
  Star,
  Clock,
  ArrowLeft,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Badge } from '@/components/ui/badge'
import { formatNumber } from '@/lib/utils'

interface Campaign {
  id: string
  title: string
  type: 'capital' | 'donation'
  description: string
  owner: string
  ownerAvatar?: string
  targetAmount: number
  raisedAmount: number
  currency: string
  backers: number
  daysLeft: number
  category: string
  image: string
  featured: boolean
  status: 'active' | 'funded' | 'ended'
}

export default function CrowdfundingPage() {
  const router = useRouter()

  // Mock stats
  const stats = {
    activeCampaigns: 3,
    totalInvested: 45000,
    totalDonated: 12500,
    portfolioValue: 52300,
    returns: 8.5,
  }

  // Mock featured campaigns
  const featuredCampaigns: Campaign[] = [
    {
      id: '1',
      title: 'EcoTech Solar Solutions - Series A',
      type: 'capital',
      description: 'Revolutionary solar panel technology for residential homes',
      owner: 'EcoTech Industries',
      targetAmount: 500000,
      raisedAmount: 385000,
      currency: 'USD',
      backers: 47,
      daysLeft: 12,
      category: 'Clean Energy',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
      featured: true,
      status: 'active',
    },
    {
      id: '2',
      title: 'Local Food Bank Expansion Program',
      type: 'donation',
      description: 'Help us expand our food distribution network to reach 10,000 more families',
      owner: 'Community Food Bank',
      targetAmount: 75000,
      raisedAmount: 58200,
      currency: 'USD',
      backers: 156,
      daysLeft: 8,
      category: 'Community',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
      featured: true,
      status: 'active',
    },
    {
      id: '3',
      title: 'HealthTech AI Diagnostics Platform',
      type: 'capital',
      description: 'AI-powered medical imaging analysis for early disease detection',
      owner: 'MedAI Corporation',
      targetAmount: 1000000,
      raisedAmount: 725000,
      currency: 'USD',
      backers: 89,
      daysLeft: 18,
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
      featured: true,
      status: 'active',
    },
  ]

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100)
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Crowdfunding (Seedli)
          </h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            Raise capital or donations, invest in businesses, support causes
          </p>
        </div>
        <button
          onClick={() => router.push('/crowdfunding/create')}
          className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                {stats.activeCampaigns}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              My Campaigns
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                ${formatNumber(stats.totalInvested)}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Total Invested
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                ${formatNumber(stats.totalDonated)}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Total Donated
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-center justify-between mb-2">
              <PieChart className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                ${formatNumber(stats.portfolioValue)}
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Portfolio Value
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
                +{stats.returns}%
              </span>
            </div>
            <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Average Returns
            </div>
          </div>
        </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
        <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <button
            onClick={() => router.push('/crowdfunding/marketplace')}
            className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700/40 hover:border-teal-500 dark:hover:border-teal-500 transition-all text-left group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white">
                  Browse Campaigns
                </h3>
                <p className="text-[11px] text-gray-500">
                  Discover investment opportunities
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push('/crowdfunding/my-campaigns')}
            className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700/40 hover:border-teal-500 dark:hover:border-teal-500 transition-all text-left group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white">
                  My Campaigns
                </h3>
                <p className="text-[11px] text-gray-500">
                  Manage your fundraising campaigns
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push('/crowdfunding/my-investments')}
            className="p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700/40 hover:border-teal-500 dark:hover:border-teal-500 transition-all text-left group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <PieChart className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white">
                  My Portfolio
                </h3>
                <p className="text-[11px] text-gray-500">
                  Track your investments & donations
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => router.push('/crowdfunding/create')}
            className="p-3 bg-teal-50 dark:bg-teal-900/10 rounded-lg border-2 border-teal-200 dark:border-teal-500/20 hover:border-teal-500 dark:hover:border-teal-500 transition-all text-left group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white">
                  Start Campaign
                </h3>
                <p className="text-[11px] text-gray-500">
                  Raise capital or donations ($50 fee)
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Featured Campaigns */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-semibold text-gray-900 dark:text-white">
            Featured Campaigns
          </h2>
          <button
            onClick={() => router.push('/crowdfunding/marketplace')}
            className="text-[13px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {featuredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700/40 hover:border-teal-500 dark:hover:border-teal-500 transition-all cursor-pointer group"
              onClick={() => router.push(`/crowdfunding/campaigns/${campaign.id}`)}
            >
              {/* Campaign Image */}
              <div className="relative h-40 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute top-2 right-2 z-20 flex gap-1.5">
                  {campaign.featured && (
                    <Badge variant="warning" size="sm">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge
                    variant={campaign.type === 'capital' ? 'info' : 'error'}
                    size="sm"
                  >
                    {campaign.type === 'capital' ? (
                      <>
                        <Briefcase className="w-3 h-3 mr-1" />
                        Capital Raise
                      </>
                    ) : (
                      <>
                        <Heart className="w-3 h-3 mr-1" />
                        Donation
                      </>
                    )}
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-2 z-20">
                  <Badge variant="default" size="sm">
                    {campaign.category}
                  </Badge>
                </div>
              </div>

              {/* Campaign Content */}
              <div className="p-4">
                <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {campaign.title}
                </h3>
                <p className="text-[12px] text-gray-500 mb-3 line-clamp-2">
                  {campaign.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <Briefcase className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                  </div>
                  <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300">
                    {campaign.owner}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white tabular-nums">
                      {campaign.currency} {formatNumber(campaign.raisedAmount)}
                    </span>
                    <span className="text-[12px] text-gray-500 tabular-nums">
                      {getProgressPercentage(campaign.raisedAmount, campaign.targetAmount).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        campaign.type === 'capital'
                          ? 'bg-blue-600'
                          : 'bg-pink-600'
                      }`}
                      style={{
                        width: `${getProgressPercentage(campaign.raisedAmount, campaign.targetAmount)}%`,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    of {campaign.currency} {formatNumber(campaign.targetAmount)} goal
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700/40">
                  <div className="flex items-center gap-3 text-[12px] text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{campaign.backers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{campaign.daysLeft}d left</span>
                    </div>
                  </div>
                  <button className="text-[12px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-purple-50 dark:from-teal-900/10 dark:to-purple-900/10 rounded-xl p-4 border-2 border-teal-200 dark:border-teal-500/20">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white mb-1">
              Campaign Creation Fee
            </h3>
            <p className="text-[12px] text-gray-700 dark:text-gray-300 mb-3">
              Creating a campaign (capital raise or donation) requires a one-time, non-refundable fee of <span className="font-semibold">$50 USD</span>. This helps maintain platform quality and reduces spam.
            </p>
            <button
              onClick={() => router.push('/crowdfunding/create')}
              className="px-4 py-2 text-[13px] font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Start Your Campaign Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </PageLayout>
  )
}
