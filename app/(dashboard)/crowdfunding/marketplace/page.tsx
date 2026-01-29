'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Filter,
  TrendingUp,
  Heart,
  Briefcase,
  Users,
  Clock,
  Target,
  Star,
  ArrowUpRight,
  DollarSign,
  Percent,
  Calendar,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { formatNumber } from '@/lib/utils'

interface Campaign {
  id: string
  title: string
  type: 'capital' | 'donation'
  capitalType?: 'equity' | 'debt' | 'hybrid'
  description: string
  owner: string
  ownerLogo?: string
  targetAmount: number
  raisedAmount: number
  currency: string
  backers: number
  daysLeft: number
  category: string
  featured: boolean
  status: 'active' | 'funded' | 'ended'
  interestRate?: number // for debt
  equityOffered?: number // for equity
  minInvestment?: number
  image: string
}

export default function MarketplacePage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [capitalTypeFilter, setCapitalTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Mock campaigns
  const campaigns: Campaign[] = [
    {
      id: '1',
      title: 'EcoTech Solar Solutions - Series A Equity',
      type: 'capital',
      capitalType: 'equity',
      description: 'Revolutionary solar panel technology with 40% higher efficiency. We\'re raising $500K for manufacturing scale-up and market expansion.',
      owner: 'EcoTech Industries',
      targetAmount: 500000,
      raisedAmount: 385000,
      currency: 'USD',
      backers: 47,
      daysLeft: 12,
      category: 'Clean Energy',
      featured: true,
      status: 'active',
      equityOffered: 15,
      minInvestment: 1000,
      image: 'solar',
    },
    {
      id: '2',
      title: 'Local Food Bank Expansion Program',
      type: 'donation',
      description: 'Help us expand our food distribution network to reach 10,000 more families in need. Every dollar feeds a family for a week.',
      owner: 'Community Food Bank',
      targetAmount: 75000,
      raisedAmount: 58200,
      currency: 'USD',
      backers: 156,
      daysLeft: 8,
      category: 'Community',
      featured: true,
      status: 'active',
      image: 'food',
    },
    {
      id: '3',
      title: 'HealthTech AI Diagnostics - Debt Financing',
      type: 'capital',
      capitalType: 'debt',
      description: 'AI-powered medical imaging analysis platform. Seeking $1M debt financing with 12% annual return for hospital deployment.',
      owner: 'MedAI Corporation',
      targetAmount: 1000000,
      raisedAmount: 725000,
      currency: 'USD',
      backers: 89,
      daysLeft: 18,
      category: 'Healthcare',
      featured: false,
      status: 'active',
      interestRate: 12,
      minInvestment: 5000,
      image: 'health',
    },
    {
      id: '4',
      title: 'Urban Farming Startup - Hybrid Funding',
      type: 'capital',
      capitalType: 'hybrid',
      description: 'Vertical farming technology for urban areas. Hybrid funding: 10% equity + 8% interest debt component.',
      owner: 'GreenCity Farms',
      targetAmount: 350000,
      raisedAmount: 180000,
      currency: 'USD',
      backers: 32,
      daysLeft: 25,
      category: 'Agriculture',
      featured: false,
      status: 'active',
      equityOffered: 10,
      interestRate: 8,
      minInvestment: 2500,
      image: 'farm',
    },
    {
      id: '5',
      title: 'Children\'s Education Fund',
      type: 'donation',
      description: 'Provide school supplies, uniforms, and tuition support for 500 underprivileged children this academic year.',
      owner: 'Education For All NGO',
      targetAmount: 120000,
      raisedAmount: 95000,
      currency: 'USD',
      backers: 203,
      daysLeft: 15,
      category: 'Education',
      featured: false,
      status: 'active',
      image: 'education',
    },
    {
      id: '6',
      title: 'FinTech Payment Platform - Equity Round',
      type: 'capital',
      capitalType: 'equity',
      description: 'Next-gen payment processing platform for SMEs. Pre-Series A equity round offering 20% stake.',
      owner: 'PayFlow Technologies',
      targetAmount: 750000,
      raisedAmount: 620000,
      currency: 'USD',
      backers: 56,
      daysLeft: 10,
      category: 'FinTech',
      featured: true,
      status: 'active',
      equityOffered: 20,
      minInvestment: 10000,
      image: 'fintech',
    },
  ]

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'capital', label: 'Capital Raise' },
    { value: 'donation', label: 'Donation' },
  ]

  const capitalTypeOptions = [
    { value: 'all', label: 'All Funding Types' },
    { value: 'equity', label: 'Equity' },
    { value: 'debt', label: 'Debt' },
    { value: 'hybrid', label: 'Hybrid' },
  ]

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Clean Energy', label: 'Clean Energy' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'FinTech', label: 'FinTech' },
    { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Education', label: 'Education' },
    { value: 'Community', label: 'Community' },
  ]

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.owner.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === 'all' || campaign.type === typeFilter
    const matchesCapitalType = capitalTypeFilter === 'all' || campaign.capitalType === capitalTypeFilter
    const matchesCategory = categoryFilter === 'all' || campaign.category === categoryFilter

    return matchesSearch && matchesType && matchesCapitalType && matchesCategory
  })

  const getProgressPercentage = (raised: number, target: number) => {
    return Math.min((raised / target) * 100, 100)
  }

  const getCapitalTypeBadge = (capitalType?: string) => {
    switch (capitalType) {
      case 'equity':
        return <Badge variant="info" size="sm">Equity</Badge>
      case 'debt':
        return <Badge variant="success" size="sm">Debt</Badge>
      case 'hybrid':
        return <Badge variant="warning" size="sm">Hybrid</Badge>
      default:
        return null
    }
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-4"
        >
          ← Back
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Campaign Marketplace
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover investment opportunities and causes to support
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{campaigns.length}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Active Campaigns</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {campaigns.filter(c => c.type === 'capital').length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Capital Raises</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 dark:bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {campaigns.filter(c => c.type === 'donation').length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Donations</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {campaigns.reduce((sum, c) => sum + c.backers, 0)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Backers</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search campaigns by title, description, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                iconPosition="left"
              />
            </div>
            <Button
              variant="outline"
              size="md"
              icon={<Filter className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-dark-border">
              <Select
                label="Campaign Type"
                options={typeOptions}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              />
              <Select
                label="Funding Structure"
                options={capitalTypeOptions}
                value={capitalTypeFilter}
                onChange={(e) => setCapitalTypeFilter(e.target.value)}
              />
              <Select
                label="Category"
                options={categoryOptions}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              />
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredCampaigns.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{campaigns.length}</span> campaigns
            </p>
          </div>
        </Card>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="overflow-hidden hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 cursor-pointer group"
            onClick={() => router.push(`/crowdfunding/campaigns/${campaign.id}`)}
          >
            {/* Campaign Header */}
            <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

              {/* Badges */}
              <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
                {campaign.featured && (
                  <Badge variant="warning" size="sm">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {campaign.type === 'capital' ? (
                  <Badge variant="info" size="sm">
                    <Briefcase className="w-3 h-3 mr-1" />
                    Capital Raise
                  </Badge>
                ) : (
                  <Badge variant="error" size="sm">
                    <Heart className="w-3 h-3 mr-1" />
                    Donation
                  </Badge>
                )}
                {campaign.capitalType && getCapitalTypeBadge(campaign.capitalType)}
              </div>

              <div className="absolute bottom-3 left-3 z-20">
                <Badge variant="default" size="sm">
                  {campaign.category}
                </Badge>
              </div>
            </div>

            {/* Campaign Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {campaign.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {campaign.description}
              </p>

              {/* Owner */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {campaign.owner}
                </span>
              </div>

              {/* Capital Type Details */}
              {campaign.type === 'capital' && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    {campaign.capitalType === 'equity' && campaign.equityOffered && (
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {campaign.equityOffered}% equity offered
                        </span>
                      </div>
                    )}
                    {campaign.capitalType === 'debt' && campaign.interestRate && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {campaign.interestRate}% annual return
                        </span>
                      </div>
                    )}
                    {campaign.capitalType === 'hybrid' && (
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs text-gray-700 dark:text-gray-300">
                            {campaign.equityOffered}% equity
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-xs text-gray-700 dark:text-gray-300">
                            {campaign.interestRate}% interest
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  {campaign.minInvestment && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      Min. investment: ${formatNumber(campaign.minInvestment)}
                    </p>
                  )}
                </div>
              )}

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {campaign.currency} {formatNumber(campaign.raisedAmount)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {getProgressPercentage(campaign.raisedAmount, campaign.targetAmount).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      campaign.type === 'capital' ? 'bg-blue-600' : 'bg-pink-600'
                    }`}
                    style={{
                      width: `${getProgressPercentage(campaign.raisedAmount, campaign.targetAmount)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  of {campaign.currency} {formatNumber(campaign.targetAmount)} goal
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-border">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{campaign.backers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{campaign.daysLeft}d</span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No campaigns found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search or filters
          </p>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              setSearchQuery('')
              setTypeFilter('all')
              setCapitalTypeFilter('all')
              setCategoryFilter('all')
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}
    </PageLayout>
  )
}
