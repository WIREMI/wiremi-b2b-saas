'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Search,
  TrendingUp,
  Heart,
  Eye,
  Edit,
  MoreVertical,
  DollarSign,
  Users,
  Calendar,
  BarChart3,
  Pause,
  Play,
  Trash2,
  Share2
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'

interface Campaign {
  id: string
  title: string
  type: 'capital' | 'donation'
  capitalType?: 'equity' | 'debt' | 'hybrid'
  status: 'active' | 'paused' | 'completed' | 'under-review' | 'rejected'
  targetAmount: number
  raisedAmount: number
  backers: number
  daysLeft: number
  category: string
  createdDate: string
  views: number
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'EcoTech Solar Solutions - Series A Equity',
    type: 'capital',
    capitalType: 'equity',
    status: 'active',
    targetAmount: 500000,
    raisedAmount: 342500,
    backers: 89,
    daysLeft: 23,
    category: 'Clean Energy',
    createdDate: '2025-12-15',
    views: 3420
  },
  {
    id: '2',
    title: 'Save the Ocean - Coral Reef Restoration',
    type: 'donation',
    status: 'active',
    targetAmount: 150000,
    raisedAmount: 98750,
    backers: 1247,
    daysLeft: 45,
    category: 'Environment',
    createdDate: '2025-11-20',
    views: 8912
  },
  {
    id: '3',
    title: 'GreenStack Farms - Urban Farming Expansion',
    type: 'capital',
    capitalType: 'hybrid',
    status: 'completed',
    targetAmount: 1000000,
    raisedAmount: 1000000,
    backers: 67,
    daysLeft: 0,
    category: 'Agriculture',
    createdDate: '2025-09-01',
    views: 5234
  },
  {
    id: '4',
    title: 'Community Library Renovation',
    type: 'donation',
    status: 'paused',
    targetAmount: 50000,
    raisedAmount: 28300,
    backers: 342,
    daysLeft: 15,
    category: 'Community',
    createdDate: '2025-12-01',
    views: 1823
  },
  {
    id: '5',
    title: 'AI Healthcare Diagnostics Platform',
    type: 'capital',
    capitalType: 'debt',
    status: 'under-review',
    targetAmount: 750000,
    raisedAmount: 0,
    backers: 0,
    daysLeft: 30,
    category: 'Healthcare',
    createdDate: '2026-01-18',
    views: 0
  }
]

export default function MyCampaignsPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const stats = {
    totalCampaigns: mockCampaigns.length,
    activeCampaigns: mockCampaigns.filter(c => c.status === 'active').length,
    totalRaised: mockCampaigns.reduce((sum, c) => sum + c.raisedAmount, 0),
    totalBackers: mockCampaigns.reduce((sum, c) => sum + c.backers, 0)
  }

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || campaign.type === filterType
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handlePauseCampaign = (campaignId: string, currentStatus: string) => {
    const action = currentStatus === 'paused' ? 'resumed' : 'paused'
    showToast({
      type: 'success',
      title: 'Campaign Updated',
      message: `Campaign has been ${action} successfully`
    })
  }

  const handleDeleteCampaign = (campaignId: string) => {
    showToast({
      type: 'success',
      title: 'Campaign Deleted',
      message: 'Campaign has been removed'
    })
  }

  const getStatusColor = (status: string): 'success' | 'warning' | 'default' | 'error' | 'info' => {
    switch (status) {
      case 'active':
        return 'success'
      case 'paused':
        return 'warning'
      case 'completed':
        return 'default'
      case 'under-review':
        return 'info'
      case 'rejected':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'paused':
        return 'Paused'
      case 'completed':
        return 'Completed'
      case 'under-review':
        return 'Under Review'
      case 'rejected':
        return 'Rejected'
      default:
        return status
    }
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Campaigns
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your crowdfunding campaigns
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-5 h-5" />}
          iconPosition="left"
          onClick={() => router.push('/crowdfunding/create')}
          className="mt-4 md:mt-0"
        >
          Create Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Campaigns
            </span>
            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.totalCampaigns}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Campaigns
            </span>
            <div className="w-10 h-10 bg-success/10 dark:bg-success/20 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-success" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.activeCampaigns}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Raised
            </span>
            <div className="w-10 h-10 bg-warning/10 dark:bg-warning/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-warning" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            ${(stats.totalRaised / 1000).toFixed(0)}K
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Backers
            </span>
            <div className="w-10 h-10 bg-info/10 dark:bg-info/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-info" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.totalBackers.toLocaleString()}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            iconPosition="left"
          />

          <Select
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'capital', label: 'Capital Raise' },
              { value: 'donation', label: 'Donation' }
            ]}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          />

          <Select
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'paused', label: 'Paused' },
              { value: 'completed', label: 'Completed' },
              { value: 'under-review', label: 'Under Review' },
              { value: 'rejected', label: 'Rejected' }
            ]}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          />
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredCampaigns.length} of {mockCampaigns.length} campaigns
        </div>
      </Card>

      {/* Campaigns List */}
      {filteredCampaigns.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-dark-card rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No campaigns found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || filterType !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first campaign to get started'}
          </p>
          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-5 h-5" />}
            onClick={() => router.push('/crowdfunding/create')}
          >
            Create Campaign
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredCampaigns.map((campaign) => {
            const fundingPercentage = Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)

            return (
              <Card key={campaign.id} className="p-5 hover:border-primary-500 dark:hover:border-primary-500 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Campaign Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      campaign.type === 'capital'
                        ? 'bg-primary/10 dark:bg-primary/20'
                        : 'bg-success/10 dark:bg-success/20'
                    }`}>
                      {campaign.type === 'capital' ? (
                        <TrendingUp className={`w-8 h-8 ${
                          campaign.type === 'capital' ? 'text-primary' : 'text-success'
                        }`} />
                      ) : (
                        <Heart className="w-8 h-8 text-success" />
                      )}
                    </div>
                  </div>

                  {/* Campaign Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                            {campaign.title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant={campaign.type === 'capital' ? 'primary' : 'success'}
                            size="sm"
                          >
                            {campaign.type === 'capital' ? 'Capital' : 'Donation'}
                          </Badge>
                          {campaign.capitalType && (
                            <Badge variant="default" size="sm" className="capitalize">
                              {campaign.capitalType}
                            </Badge>
                          )}
                          <Badge variant={getStatusColor(campaign.status)} size="sm">
                            {getStatusLabel(campaign.status)}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            {campaign.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          ${campaign.raisedAmount.toLocaleString()} raised
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          of ${campaign.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            campaign.type === 'capital'
                              ? 'bg-gradient-to-r from-primary to-primary-dark'
                              : 'bg-gradient-to-r from-success to-success-dark'
                          }`}
                          style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{fundingPercentage}% funded</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{campaign.backers} {campaign.type === 'capital' ? 'investors' : 'donors'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : 'Ended'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{campaign.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row lg:flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Eye className="w-4 h-4" />}
                      onClick={() => router.push(`/crowdfunding/campaigns/${campaign.id}`)}
                      className="flex-1 lg:flex-none lg:w-full"
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<BarChart3 className="w-4 h-4" />}
                      onClick={() => {
                        showToast({
                          type: 'info',
                          title: 'Analytics',
                          message: 'Campaign analytics coming soon'
                        })
                      }}
                      className="flex-1 lg:flex-none lg:w-full"
                    >
                      Analytics
                    </Button>
                    {campaign.status === 'active' || campaign.status === 'paused' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Edit className="w-4 h-4" />}
                        onClick={() => {
                          showToast({
                            type: 'info',
                            title: 'Edit Campaign',
                            message: 'Campaign editing coming soon'
                          })
                        }}
                        className="flex-1 lg:flex-none lg:w-full"
                      >
                        Edit
                      </Button>
                    ) : null}
                  </div>
                </div>

                {/* Action Menu */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border flex flex-wrap gap-2">
                  {campaign.status === 'active' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Pause className="w-4 h-4" />}
                      onClick={() => handlePauseCampaign(campaign.id, campaign.status)}
                    >
                      Pause Campaign
                    </Button>
                  )}
                  {campaign.status === 'paused' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Play className="w-4 h-4" />}
                      onClick={() => handlePauseCampaign(campaign.id, campaign.status)}
                    >
                      Resume Campaign
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<Share2 className="w-4 h-4" />}
                    onClick={() => {
                      showToast({
                        type: 'success',
                        title: 'Link Copied',
                        message: 'Campaign link copied to clipboard'
                      })
                    }}
                  >
                    Share
                  </Button>
                  {(campaign.status === 'under-review' || campaign.status === 'rejected') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="text-error hover:bg-error/10"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </PageLayout>
  )
}
