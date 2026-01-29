'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Heart,
  Eye,
  Calendar,
  TrendingUp,
  Users,
  Award,
  Download,
  Share2,
  Filter,
  Search
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'

interface Donation {
  id: string
  campaignId: string
  campaignTitle: string
  organizationName: string
  category: string
  amount: number
  donationDate: string
  paymentMethod: string
  receiptNumber: string
  taxDeductible: boolean
  impactReceived: boolean
  campaignStatus: 'active' | 'completed' | 'ongoing'
}

const mockDonations: Donation[] = [
  {
    id: '1',
    campaignId: '2',
    campaignTitle: 'Save the Ocean - Coral Reef Restoration',
    organizationName: 'Ocean Conservation Alliance',
    category: 'Environment',
    amount: 5000,
    donationDate: '2026-01-15',
    paymentMethod: 'Credit Card',
    receiptNumber: 'RCT-2026-001',
    taxDeductible: true,
    impactReceived: false,
    campaignStatus: 'active'
  },
  {
    id: '2',
    campaignId: '6',
    campaignTitle: 'Build Schools in Rural Africa',
    organizationName: 'Education for All Foundation',
    category: 'Education',
    amount: 2500,
    donationDate: '2025-12-20',
    paymentMethod: 'Bank Transfer',
    receiptNumber: 'RCT-2025-452',
    taxDeductible: true,
    impactReceived: true,
    campaignStatus: 'ongoing'
  },
  {
    id: '3',
    campaignId: '7',
    campaignTitle: 'Emergency Relief for Disaster Victims',
    organizationName: 'Global Relief Network',
    category: 'Humanitarian',
    amount: 1000,
    donationDate: '2025-11-10',
    paymentMethod: 'Credit Card',
    receiptNumber: 'RCT-2025-389',
    taxDeductible: true,
    impactReceived: true,
    campaignStatus: 'completed'
  },
  {
    id: '4',
    campaignId: '8',
    campaignTitle: 'Animal Shelter Expansion',
    organizationName: 'Happy Paws Rescue',
    category: 'Animal Welfare',
    amount: 500,
    donationDate: '2025-10-05',
    paymentMethod: 'Mobile Money',
    receiptNumber: 'RCT-2025-267',
    taxDeductible: true,
    impactReceived: true,
    campaignStatus: 'completed'
  },
  {
    id: '5',
    campaignId: '9',
    campaignTitle: 'Clean Water Wells in Bangladesh',
    organizationName: 'Water4Life Initiative',
    category: 'Water & Sanitation',
    amount: 3000,
    donationDate: '2025-09-18',
    paymentMethod: 'Credit Card',
    receiptNumber: 'RCT-2025-198',
    taxDeductible: true,
    impactReceived: true,
    campaignStatus: 'completed'
  },
  {
    id: '6',
    campaignId: '10',
    campaignTitle: 'Youth Sports Program',
    organizationName: 'Community Sports League',
    category: 'Sports & Recreation',
    amount: 750,
    donationDate: '2025-08-22',
    paymentMethod: 'Credit Card',
    receiptNumber: 'RCT-2025-145',
    taxDeductible: true,
    impactReceived: true,
    campaignStatus: 'completed'
  },
  {
    id: '7',
    campaignId: '11',
    campaignTitle: 'Medical Supplies for Clinics',
    organizationName: 'Healthcare Heroes',
    category: 'Healthcare',
    amount: 2000,
    donationDate: '2026-01-05',
    paymentMethod: 'Bank Transfer',
    receiptNumber: 'RCT-2026-012',
    taxDeductible: true,
    impactReceived: false,
    campaignStatus: 'active'
  }
]

export default function MyDonationsPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterYear, setFilterYear] = useState('all')

  const totalDonated = mockDonations.reduce((sum, don) => sum + don.amount, 0)
  const totalCampaigns = new Set(mockDonations.map(d => d.campaignId)).size
  const impactReports = mockDonations.filter(d => d.impactReceived).length
  const taxDeductibleTotal = mockDonations
    .filter(d => d.taxDeductible)
    .reduce((sum, d) => sum + d.amount, 0)

  const currentYear = new Date().getFullYear()
  const yearOptions = [
    { value: 'all', label: 'All Time' },
    { value: currentYear.toString(), label: currentYear.toString() },
    { value: (currentYear - 1).toString(), label: (currentYear - 1).toString() }
  ]

  const categories = [
    'all',
    'Environment',
    'Education',
    'Humanitarian',
    'Animal Welfare',
    'Water & Sanitation',
    'Healthcare',
    'Sports & Recreation',
    'Community',
    'Arts & Culture'
  ]

  const filteredDonations = mockDonations.filter(donation => {
    const matchesSearch =
      donation.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.organizationName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || donation.category === filterCategory
    const matchesStatus = filterStatus === 'all' || donation.campaignStatus === filterStatus
    const matchesYear =
      filterYear === 'all' || new Date(donation.donationDate).getFullYear().toString() === filterYear
    return matchesSearch && matchesCategory && matchesStatus && matchesYear
  })

  const handleDownloadReceipt = (receiptNumber: string) => {
    showToast({
      type: 'success',
      title: 'Receipt Downloaded',
      message: `Receipt ${receiptNumber} has been downloaded`
    })
  }

  const handleDownloadTaxReport = () => {
    showToast({
      type: 'success',
      title: 'Tax Report Generated',
      message: 'Your annual donation tax report has been downloaded'
    })
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Donations
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your charitable contributions and impact
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={<Heart className="w-5 h-5" />}
          iconPosition="left"
          onClick={() => router.push('/crowdfunding/marketplace?type=donation')}
          className="mt-4 md:mt-0"
        >
          Donate to Campaigns
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Donated
            </span>
            <div className="w-10 h-10 bg-success/10 dark:bg-success/20 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-success" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            ${totalDonated.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
            Lifetime donations
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Campaigns Supported
            </span>
            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalCampaigns}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
            Different causes
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Impact Reports
            </span>
            <div className="w-10 h-10 bg-info/10 dark:bg-info/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-info" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {impactReports}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
            Received so far
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Tax Deductible
            </span>
            <div className="w-10 h-10 bg-warning/10 dark:bg-warning/20 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-warning" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            ${taxDeductibleTotal.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
            For tax purposes
          </div>
        </Card>
      </div>

      {/* Giving by Category */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Giving by Category
          </h3>
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-4 h-4" />}
            onClick={handleDownloadTaxReport}
          >
            Download Tax Report
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...new Set(mockDonations.map(d => d.category))].map(category => {
            const categoryTotal = mockDonations
              .filter(d => d.category === category)
              .reduce((sum, d) => sum + d.amount, 0)
            const percentage = ((categoryTotal / totalDonated) * 100).toFixed(0)

            return (
              <div key={category} className="p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">{category}</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  ${categoryTotal.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{percentage}% of total</div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            iconPosition="left"
          />

          <Select
            options={categories.map(cat => ({
              value: cat,
              label: cat === 'all' ? 'All Categories' : cat
            }))}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />

          <Select
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'ongoing', label: 'Ongoing' },
              { value: 'completed', label: 'Completed' }
            ]}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          />

          <Select
            options={yearOptions}
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          />
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredDonations.length} of {mockDonations.length} donations
        </div>
      </Card>

      {/* Donations List */}
      {filteredDonations.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-dark-card rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No donations found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' || filterYear !== 'all'
              ? 'Try adjusting your filters'
              : 'Start making a difference by donating to campaigns'}
          </p>
          <Button
            variant="primary"
            size="md"
            icon={<Heart className="w-5 h-5" />}
            onClick={() => router.push('/crowdfunding/marketplace?type=donation')}
          >
            Browse Donation Campaigns
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredDonations.map((donation) => (
            <Card key={donation.id} className="p-5 hover:border-primary-500 dark:hover:border-primary-500 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-success/10 dark:bg-success/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-8 h-8 text-success" />
                  </div>
                </div>

                {/* Donation Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
                        {donation.campaignTitle}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {donation.organizationName}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="success" size="sm">
                          {donation.category}
                        </Badge>
                        <Badge
                          variant={
                            donation.campaignStatus === 'active'
                              ? 'success'
                              : donation.campaignStatus === 'ongoing'
                              ? 'warning'
                              : 'default'
                          }
                          size="sm"
                          className="capitalize"
                        >
                          {donation.campaignStatus}
                        </Badge>
                        {donation.taxDeductible && (
                          <Badge variant="info" size="sm">Tax Deductible</Badge>
                        )}
                        {donation.impactReceived && (
                          <Badge variant="default" size="sm">
                            Impact Report Received
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 block mb-1">
                        Donation Amount
                      </span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${donation.amount.toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 block mb-1">
                        Date
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Date(donation.donationDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 block mb-1">
                        Payment Method
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {donation.paymentMethod}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 block mb-1">
                        Receipt #
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {donation.receiptNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Eye className="w-4 h-4" />}
                    onClick={() => router.push(`/crowdfunding/campaigns/${donation.campaignId}`)}
                    className="flex-1 lg:flex-none lg:w-full"
                  >
                    View Campaign
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Download className="w-4 h-4" />}
                    onClick={() => handleDownloadReceipt(donation.receiptNumber)}
                    className="flex-1 lg:flex-none lg:w-full"
                  >
                    Receipt
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Share2 className="w-4 h-4" />}
                    onClick={() => {
                      showToast({
                        type: 'success',
                        title: 'Link Copied',
                        message: 'Campaign link copied to clipboard'
                      })
                    }}
                    className="flex-1 lg:flex-none lg:w-full"
                  >
                    Share
                  </Button>
                </div>
              </div>

              {/* Impact Notice */}
              {!donation.impactReceived && donation.campaignStatus === 'active' && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                  <div className="flex items-center gap-2 text-sm text-info">
                    <Award className="w-4 h-4" />
                    <span>You'll receive an impact report once the campaign concludes</span>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Monthly Giving Banner */}
      <Card className="p-8 mt-8 bg-gradient-to-r from-success/10 to-success/5 dark:from-success/20 dark:to-success/10 border border-success/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-success/20 dark:bg-success/30 rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="w-8 h-8 text-success" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Make Your Impact Recurring
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Set up monthly donations to support causes you care about consistently. Many campaigns offer special perks for recurring donors.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<Heart className="w-5 h-5" />}
            className="bg-success hover:bg-success-dark flex-shrink-0"
          >
            Set Up Monthly Giving
          </Button>
        </div>
      </Card>
    </PageLayout>
  )
}
