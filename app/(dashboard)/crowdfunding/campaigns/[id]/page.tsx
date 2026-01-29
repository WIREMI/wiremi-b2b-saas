'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft,
  TrendingUp,
  Users,
  Calendar,
  Target,
  Heart,
  Share2,
  Bookmark,
  CheckCircle2,
  Clock,
  DollarSign,
  Percent,
  Building2,
  Linkedin,
  Award,
  FileText,
  ChevronRight,
  AlertCircle
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import { useToast } from '@/hooks/useToast'

// Mock campaign data
const getCampaignById = (id: string) => {
  const campaigns = [
    {
      id: '1',
      title: 'EcoTech Solar Solutions - Series A Equity',
      slug: 'ecotech-solar-series-a',
      type: 'capital' as const,
      capitalType: 'equity' as const,
      category: 'Clean Energy',
      description: 'Revolutionary solar panel technology with 40% higher efficiency than traditional panels.',
      longDescription: 'EcoTech Solar Solutions is developing next-generation solar panels using breakthrough nanotechnology. Our panels achieve 40% higher energy conversion efficiency while reducing manufacturing costs by 25%. We have secured pilot projects with three major commercial real estate firms and are ready to scale production.',
      companyName: 'EcoTech Solar Solutions Inc.',
      location: 'San Francisco, CA',
      targetAmount: 500000,
      raisedAmount: 342500,
      backers: 89,
      daysLeft: 23,
      minInvestment: 1000,
      equityOffered: 15,
      valuation: 3333333,
      status: 'active' as const,
      imageUrl: '/campaigns/ecotech.jpg',
      bannerUrl: '/campaigns/ecotech-banner.jpg',
      team: [
        {
          name: 'Dr. Sarah Chen',
          role: 'CEO & Co-founder',
          bio: 'PhD in Materials Science from MIT. 10 years at Tesla Solar division.',
          linkedin: 'https://linkedin.com/in/sarahchen',
          imageUrl: '/team/sarah.jpg'
        },
        {
          name: 'Michael Rodriguez',
          role: 'CTO & Co-founder',
          bio: 'Former lead engineer at SunPower. 15+ patents in solar technology.',
          linkedin: 'https://linkedin.com/in/mrodriguez',
          imageUrl: '/team/michael.jpg'
        },
        {
          name: 'Jennifer Park',
          role: 'CFO',
          bio: 'Ex-Goldman Sachs. Scaled 3 cleantech startups to Series B.',
          linkedin: 'https://linkedin.com/in/jenniferpark',
          imageUrl: '/team/jennifer.jpg'
        }
      ],
      milestones: [
        {
          title: 'Prototype Development',
          status: 'completed' as const,
          completedDate: '2025-06-15',
          description: 'First working prototype with 38% efficiency'
        },
        {
          title: 'Pilot Production Run',
          status: 'completed' as const,
          completedDate: '2025-11-20',
          description: '100 panels manufactured and tested'
        },
        {
          title: 'Commercial Partnerships',
          status: 'in-progress' as const,
          targetDate: '2026-03-01',
          description: 'Secure 3 major commercial clients'
        },
        {
          title: 'Mass Production',
          status: 'upcoming' as const,
          targetDate: '2026-07-01',
          description: 'Scale to 10,000 panels/month capacity'
        }
      ],
      financials: {
        useOfFunds: [
          { category: 'Manufacturing Equipment', amount: 250000, percentage: 50 },
          { category: 'R&D and Testing', amount: 100000, percentage: 20 },
          { category: 'Marketing & Sales', amount: 75000, percentage: 15 },
          { category: 'Team Expansion', amount: 50000, percentage: 10 },
          { category: 'Working Capital', amount: 25000, percentage: 5 }
        ],
        projectedRevenue: [
          { year: 2026, amount: 1200000 },
          { year: 2027, amount: 3500000 },
          { year: 2028, amount: 8000000 }
        ]
      },
      updates: [
        {
          date: '2026-01-15',
          title: 'Exceeded 60% funding milestone!',
          content: 'Thank you to all our investors! We\'ve just crossed $300K and secured our first commercial contract with BuildCorp.'
        },
        {
          date: '2026-01-08',
          title: 'Featured in TechCrunch',
          content: 'Our technology was featured in TechCrunch\'s "10 Cleantech Startups to Watch in 2026"'
        }
      ],
      investors: [
        { name: 'John M.', amount: 25000, date: '2026-01-10', type: 'lead' },
        { name: 'Sarah K.', amount: 15000, date: '2026-01-12' },
        { name: 'Anonymous', amount: 10000, date: '2026-01-14' }
      ]
    },
    {
      id: '2',
      title: 'Save the Ocean - Coral Reef Restoration',
      slug: 'save-ocean-coral-restoration',
      type: 'donation' as const,
      category: 'Environment',
      description: 'Help us restore 5 hectares of damaged coral reefs in the Pacific Ocean.',
      longDescription: 'Coral reefs are dying at an alarming rate due to climate change and pollution. Our organization has pioneered a new coral restoration technique that increases survival rates to 85%. With your donations, we can restore 5 hectares of critically damaged reef, providing habitat for thousands of marine species and protecting coastal communities from erosion.',
      organizationName: 'Ocean Conservation Alliance',
      location: 'Pacific Islands',
      targetAmount: 150000,
      raisedAmount: 98750,
      backers: 1247,
      daysLeft: 45,
      status: 'active' as const,
      imageUrl: '/campaigns/coral.jpg',
      bannerUrl: '/campaigns/coral-banner.jpg',
      impact: {
        beneficiaries: '50,000+ marine species',
        reach: '3 coastal communities protected',
        duration: '10-year restoration program'
      },
      howDonationsUsed: [
        { category: 'Coral Nursery Setup', amount: 45000, percentage: 30 },
        { category: 'Marine Biologist Team', amount: 37500, percentage: 25 },
        { category: 'Transplantation Equipment', amount: 30000, percentage: 20 },
        { category: 'Community Education', amount: 22500, percentage: 15 },
        { category: 'Monitoring & Research', amount: 15000, percentage: 10 }
      ],
      photoGallery: [
        '/gallery/coral1.jpg',
        '/gallery/coral2.jpg',
        '/gallery/coral3.jpg',
        '/gallery/coral4.jpg'
      ],
      team: [
        {
          name: 'Dr. Maria Santos',
          role: 'Marine Biologist',
          bio: '20 years experience in coral reef restoration. Led 15+ successful projects.',
          imageUrl: '/team/maria.jpg'
        },
        {
          name: 'James Kalani',
          role: 'Project Manager',
          bio: 'Native Hawaiian. Former commercial diver, passionate about ocean conservation.',
          imageUrl: '/team/james.jpg'
        }
      ],
      updates: [
        {
          date: '2026-01-12',
          title: 'First coral fragments successfully transplanted!',
          content: 'We\'ve successfully transplanted the first 500 coral fragments. Early signs are very promising with 90% showing healthy growth.'
        },
        {
          date: '2025-12-28',
          title: 'Nursery construction completed',
          content: 'Our underwater coral nursery is now operational. We can now grow up to 10,000 coral fragments simultaneously.'
        }
      ],
      donors: [
        { name: 'Ocean Lover', amount: 5000, date: '2026-01-15' },
        { name: 'Sarah M.', amount: 2500, date: '2026-01-14' },
        { name: 'Anonymous', amount: 1000, date: '2026-01-13' }
      ]
    },
    {
      id: '3',
      title: 'HealthTech AI Diagnostics - Debt Financing',
      slug: 'healthtech-ai-debt',
      type: 'capital' as const,
      capitalType: 'debt' as const,
      category: 'Healthcare',
      description: 'AI-powered diagnostic platform that detects diseases 3x faster than traditional methods.',
      longDescription: 'Our AI diagnostic platform analyzes medical images with 98% accuracy, reducing diagnosis time from days to minutes. We\'re seeking debt financing to expand our hospital partnerships and accelerate FDA approval for additional use cases.',
      companyName: 'HealthTech AI Corp',
      location: 'Boston, MA',
      targetAmount: 750000,
      raisedAmount: 525000,
      backers: 42,
      daysLeft: 18,
      minInvestment: 5000,
      interestRate: 12,
      term: 36,
      repaymentSchedule: 'Monthly interest payments, principal at maturity',
      status: 'active' as const,
      imageUrl: '/campaigns/healthtech.jpg',
      bannerUrl: '/campaigns/healthtech-banner.jpg',
      team: [
        {
          name: 'Dr. Robert Kim',
          role: 'CEO & Founder',
          bio: 'MD from Johns Hopkins. Former radiologist with 15 years clinical experience.',
          linkedin: 'https://linkedin.com/in/robertkim',
          imageUrl: '/team/robert.jpg'
        }
      ],
      milestones: [
        {
          title: 'FDA Clearance',
          status: 'completed' as const,
          completedDate: '2025-09-30',
          description: 'FDA 510(k) clearance for chest X-ray analysis'
        },
        {
          title: 'Hospital Partnerships',
          status: 'in-progress' as const,
          targetDate: '2026-03-31',
          description: 'Partner with 20 major hospitals'
        }
      ],
      financials: {
        useOfFunds: [
          { category: 'Hospital Partnerships', amount: 300000, percentage: 40 },
          { category: 'FDA Approvals', amount: 225000, percentage: 30 },
          { category: 'Engineering Team', amount: 150000, percentage: 20 },
          { category: 'Marketing', amount: 75000, percentage: 10 }
        ],
        projectedRevenue: [
          { year: 2026, amount: 2000000 },
          { year: 2027, amount: 5500000 },
          { year: 2028, amount: 12000000 }
        ]
      },
      updates: [
        {
          date: '2026-01-10',
          title: '70% funded in just 2 weeks!',
          content: 'Incredible response from our investor community. We\'re on track to close this round early.'
        }
      ],
      investors: [
        { name: 'Medical Capital Fund', amount: 100000, date: '2026-01-09', type: 'lead' },
        { name: 'Dr. Susan Chen', amount: 50000, date: '2026-01-11' }
      ]
    },
    {
      id: '4',
      title: 'Urban Farming Startup - Hybrid Funding',
      slug: 'urban-farming-hybrid',
      type: 'capital' as const,
      capitalType: 'hybrid' as const,
      category: 'Agriculture',
      description: 'Vertical farming technology producing 10x more food per square foot than traditional farming.',
      longDescription: 'Our patented vertical farming system uses AI-controlled hydroponics to grow fresh produce year-round in urban warehouses. We\'re offering a hybrid funding model: investors can choose equity, debt, or a combination of both.',
      companyName: 'GreenStack Farms',
      location: 'Chicago, IL',
      targetAmount: 1000000,
      raisedAmount: 650000,
      backers: 67,
      daysLeft: 30,
      minInvestment: 2500,
      equityOffered: 10,
      interestRate: 8,
      valuation: 10000000,
      term: 48,
      repaymentSchedule: 'Quarterly interest payments, principal at maturity',
      status: 'active' as const,
      imageUrl: '/campaigns/urbanfarm.jpg',
      bannerUrl: '/campaigns/urbanfarm-banner.jpg',
      team: [
        {
          name: 'Lisa Anderson',
          role: 'CEO',
          bio: 'Former VP at Whole Foods. Built $50M organic produce division.',
          linkedin: 'https://linkedin.com/in/lisaanderson',
          imageUrl: '/team/lisa.jpg'
        },
        {
          name: 'Tom Zhang',
          role: 'Head of Technology',
          bio: 'PhD in Agricultural Engineering. Pioneer in hydroponic automation.',
          linkedin: 'https://linkedin.com/in/tomzhang',
          imageUrl: '/team/tom.jpg'
        }
      ],
      milestones: [
        {
          title: 'Pilot Facility Launch',
          status: 'completed' as const,
          completedDate: '2025-08-01',
          description: '5,000 sq ft facility producing 50 tons/year'
        },
        {
          title: 'Restaurant Partnerships',
          status: 'completed' as const,
          completedDate: '2025-12-15',
          description: 'Supplying 12 local restaurants'
        },
        {
          title: 'Second Facility',
          status: 'in-progress' as const,
          targetDate: '2026-06-01',
          description: 'Open 15,000 sq ft facility in downtown Chicago'
        }
      ],
      financials: {
        useOfFunds: [
          { category: 'New Facility Construction', amount: 500000, percentage: 50 },
          { category: 'Equipment & Automation', amount: 250000, percentage: 25 },
          { category: 'Sales & Distribution', amount: 150000, percentage: 15 },
          { category: 'Working Capital', amount: 100000, percentage: 10 }
        ],
        projectedRevenue: [
          { year: 2026, amount: 3000000 },
          { year: 2027, amount: 8000000 },
          { year: 2028, amount: 15000000 }
        ]
      },
      hybridOptions: {
        equity: {
          percentage: 10,
          minInvestment: 10000,
          description: 'Get ownership stake in GreenStack Farms'
        },
        debt: {
          interestRate: 8,
          term: 48,
          minInvestment: 2500,
          description: 'Fixed 8% annual return over 4 years'
        },
        hybrid: {
          equityPercentage: 5,
          interestRate: 6,
          minInvestment: 5000,
          description: 'Balanced approach: 5% equity + 6% annual interest'
        }
      },
      updates: [
        {
          date: '2026-01-14',
          title: 'First harvest from pilot facility!',
          content: 'Successfully harvested 2 tons of lettuce and herbs. Quality exceeded expectations with restaurants requesting more supply.'
        }
      ],
      investors: [
        { name: 'AgTech Ventures', amount: 100000, date: '2026-01-08', type: 'lead', investmentType: 'equity' },
        { name: 'Sarah J.', amount: 25000, date: '2026-01-10', investmentType: 'hybrid' },
        { name: 'Mike T.', amount: 10000, date: '2026-01-13', investmentType: 'debt' }
      ]
    }
  ]

  return campaigns.find(c => c.id === id)
}

export default function CampaignDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { showToast } = useToast()
  const [investAmount, setInvestAmount] = useState('')
  const [selectedOption, setSelectedOption] = useState<'equity' | 'debt' | 'hybrid'>('equity')
  const [isBookmarked, setIsBookmarked] = useState(false)

  const campaign = getCampaignById(params.id as string)

  if (!campaign) {
    return (
      <PageLayout maxWidth="normal">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md w-full p-8 text-center">
            <AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Campaign Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The campaign you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="primary" onClick={() => router.push('/crowdfunding/marketplace')}>
              Browse Campaigns
            </Button>
          </Card>
        </div>
      </PageLayout>
    )
  }

  const fundingPercentage = Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)

  const handleInvest = () => {
    if (!investAmount || parseFloat(investAmount) < (campaign.minInvestment || 0)) {
      showToast({
        type: 'error',
        title: 'Invalid Amount',
        message: `Minimum investment is $${campaign.minInvestment?.toLocaleString()}`
      })
      return
    }

    // Navigate to checkout
    const type = campaign.type === 'donation' ? 'donation' : 'investment'
    const params = new URLSearchParams({
      campaignId: campaign.id,
      amount: investAmount,
      ...(campaign.type === 'capital' && campaign.capitalType === 'hybrid' ? { option: selectedOption } : {})
    })

    router.push(`/crowdfunding/checkout?${params.toString()}`)
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    showToast({
      type: 'success',
      title: isBookmarked ? 'Removed from saved' : 'Saved to bookmarks',
      message: isBookmarked ? 'Campaign removed from your saved list' : 'Campaign saved to your bookmarks'
    })
  }

  // Capital Raise Layout (Equity/Debt/Hybrid)
  if (campaign.type === 'capital') {
    return (
      <PageLayout maxWidth="wide">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/crowdfunding/marketplace')}
          >
            Back to Marketplace
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Banner */}
            <Card className="p-0 overflow-hidden">
              <div className="h-80 bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/10 dark:to-primary/5 flex items-center justify-center">
                <Building2 className="w-32 h-32 text-primary/30" />
              </div>
            </Card>

            {/* Title & Status */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="primary" size="md">
                      {campaign.capitalType === 'equity' ? 'Equity' : campaign.capitalType === 'debt' ? 'Debt' : 'Hybrid'}
                    </Badge>
                    <Badge variant="default" size="md">{campaign.category}</Badge>
                    <Badge
                      variant={campaign.status === 'active' ? 'success' : 'default'}
                      size="md"
                    >
                      {campaign.status === 'active' ? 'Active' : 'Closed'}
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {campaign.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {campaign.description}
                  </p>
                </div>
              </div>

              {/* Company Info */}
              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{campaign.companyName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>{campaign.location}</span>
                </div>
              </div>
            </div>

            {/* Funding Progress */}
            <Card className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${campaign.raisedAmount.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    of ${campaign.targetAmount.toLocaleString()} goal
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-primary-dark h-full rounded-full transition-all"
                    style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {fundingPercentage}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Funded</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {campaign.backers}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Investors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {campaign.daysLeft}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Days Left</div>
                </div>
              </div>
            </Card>

            {/* Investment Details */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Investment Details
              </h2>

              {campaign.capitalType === 'equity' && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Equity Offered
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {campaign.equityOffered}%
                    </div>
                  </div>
                  <div className="p-4 bg-success/5 dark:bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-success" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Valuation
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${(campaign.valuation! / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div className="p-4 bg-info/5 dark:bg-info/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-info" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Min. Investment
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${campaign.minInvestment?.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}

              {campaign.capitalType === 'debt' && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Interest Rate
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {campaign.interestRate}% APR
                    </div>
                  </div>
                  <div className="p-4 bg-success/5 dark:bg-success/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-success" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Term Length
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {campaign.term} months
                    </div>
                  </div>
                  <div className="col-span-2 p-4 bg-info/5 dark:bg-info/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-info" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Repayment Schedule
                      </span>
                    </div>
                    <div className="text-sm text-gray-900 dark:text-white">
                      {campaign.repaymentSchedule}
                    </div>
                  </div>
                  <div className="col-span-2 p-4 bg-warning/5 dark:bg-warning/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-warning" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Min. Investment
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${campaign.minInvestment?.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}

              {campaign.capitalType === 'hybrid' && campaign.hybridOptions && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose your investment structure:
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Equity Option */}
                    <div className="p-4 border-2 border-primary/20 dark:border-primary/30 rounded-lg bg-primary/5 dark:bg-primary/10">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Equity Only
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {campaign.hybridOptions.equity.description}
                          </p>
                        </div>
                        <Badge variant="primary">Popular</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Equity</span>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {campaign.hybridOptions.equity.percentage}%
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Min. Investment</span>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            ${campaign.hybridOptions.equity.minInvestment.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Debt Option */}
                    <div className="p-4 border-2 border-success/20 dark:border-success/30 rounded-lg bg-success/5 dark:bg-success/10">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        Debt Only
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {campaign.hybridOptions.debt.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Interest</span>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {campaign.hybridOptions.debt.interestRate}% APR
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Term</span>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {campaign.hybridOptions.debt.term} mo
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Min.</span>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            ${(campaign.hybridOptions.debt.minInvestment / 1000).toFixed(0)}K
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hybrid Option */}
                    <div className="p-4 border-2 border-info/20 dark:border-info/30 rounded-lg bg-info/5 dark:bg-info/10">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Hybrid (Equity + Debt)
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {campaign.hybridOptions.hybrid.description}
                          </p>
                        </div>
                        <Badge variant="info">Balanced</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Equity</span>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {campaign.hybridOptions.hybrid.equityPercentage}%
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Interest</span>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {campaign.hybridOptions.hybrid.interestRate}% APR
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Min.</span>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            ${(campaign.hybridOptions.hybrid.minInvestment / 1000).toFixed(0)}K
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* About */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                About This Opportunity
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {campaign.longDescription}
              </p>
            </Card>

            {/* Milestones */}
            {campaign.milestones && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Milestones & Progress
                </h2>
                <div className="space-y-4">
                  {campaign.milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        {milestone.status === 'completed' ? (
                          <div className="w-10 h-10 rounded-full bg-success/20 dark:bg-success/30 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          </div>
                        ) : milestone.status === 'in-progress' ? (
                          <div className="w-10 h-10 rounded-full bg-warning/20 dark:bg-warning/30 flex items-center justify-center">
                            <Clock className="w-5 h-5 text-warning" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-border flex items-center justify-center">
                            <Clock className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {milestone.title}
                          </h3>
                          {milestone.status === 'completed' && (
                            <Badge variant="success" size="sm">Completed</Badge>
                          )}
                          {milestone.status === 'in-progress' && (
                            <Badge variant="warning" size="sm">In Progress</Badge>
                          )}
                          {milestone.status === 'upcoming' && (
                            <Badge variant="default" size="sm">Upcoming</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {milestone.description}
                        </p>
                        {milestone.completedDate && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            Completed: {new Date(milestone.completedDate).toLocaleDateString()}
                          </span>
                        )}
                        {milestone.targetDate && (milestone.status === 'upcoming' || milestone.status === 'in-progress') && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            Target: {new Date(milestone.targetDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Use of Funds */}
            {campaign.financials && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Use of Funds
                </h2>
                <div className="space-y-4">
                  {campaign.financials.useOfFunds.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {item.category}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            ${item.amount.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            ({item.percentage}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-primary-dark h-full rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Revenue Projections */}
            {campaign.financials?.projectedRevenue && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Revenue Projections
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {campaign.financials.projectedRevenue.map((proj, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {proj.year}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(proj.amount / 1000000).toFixed(1)}M
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Team */}
            {campaign.team && campaign.team.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Meet the Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {campaign.team.map((member, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/10 dark:to-primary/5 flex items-center justify-center">
                          <Users className="w-8 h-8 text-primary/50" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {member.name}
                            </h3>
                            <p className="text-sm text-primary font-medium">{member.role}</p>
                          </div>
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary-dark transition-colors"
                            >
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.bio}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Updates */}
            {campaign.updates && campaign.updates.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Campaign Updates
                </h2>
                <div className="space-y-6">
                  {campaign.updates.map((update, index) => (
                    <div key={index} className="pb-6 border-b border-gray-200 dark:border-dark-border last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(update.date).toLocaleDateString()}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {update.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {update.content}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Recent Investors */}
            {campaign.investors && campaign.investors.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Recent Investors
                </h2>
                <div className="space-y-4">
                  {campaign.investors.map((investor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success/20 to-success/5 dark:from-success/10 dark:to-success/5 flex items-center justify-center">
                          <Users className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {investor.name}
                            </span>
                            {investor.type === 'lead' && (
                              <Badge variant="warning" size="sm">Lead Investor</Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                            {new Date(investor.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 dark:text-white">
                          ${investor.amount.toLocaleString()}
                        </div>
                        {'investmentType' in investor && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 capitalize">
                            {investor.investmentType}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar - Investment Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Invest in This Campaign
                </h3>

                {campaign.capitalType === 'hybrid' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Investment Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setSelectedOption('equity')}
                        className={`px-3 py-2 text-xs font-medium rounded-lg border-2 transition-colors ${
                          selectedOption === 'equity'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-primary/50'
                        }`}
                      >
                        Equity
                      </button>
                      <button
                        onClick={() => setSelectedOption('debt')}
                        className={`px-3 py-2 text-xs font-medium rounded-lg border-2 transition-colors ${
                          selectedOption === 'debt'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-primary/50'
                        }`}
                      >
                        Debt
                      </button>
                      <button
                        onClick={() => setSelectedOption('hybrid')}
                        className={`px-3 py-2 text-xs font-medium rounded-lg border-2 transition-colors ${
                          selectedOption === 'hybrid'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-primary/50'
                        }`}
                      >
                        Both
                      </button>
                    </div>
                  </div>
                )}

                <Input
                  label="Investment Amount"
                  type="number"
                  placeholder={`Min. $${campaign.minInvestment?.toLocaleString()}`}
                  value={investAmount}
                  onChange={(e) => setInvestAmount(e.target.value)}
                  icon={<DollarSign className="w-4 h-4" />}
                  iconPosition="left"
                  helperText={`Minimum investment: $${campaign.minInvestment?.toLocaleString()}`}
                />

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full mt-4"
                  onClick={handleInvest}
                >
                  Proceed to Invest
                </Button>

                <div className="mt-4 p-4 bg-warning/5 dark:bg-warning/10 rounded-lg border border-warning/20">
                  <div className="flex gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        Investment Risk
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Investing in startups involves risk. You could lose all of your investment. Please invest responsibly.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="md"
                    className="flex-1"
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
                  <Button
                    variant={isBookmarked ? 'primary' : 'outline'}
                    size="md"
                    className="flex-1"
                    icon={<Bookmark className="w-4 h-4" />}
                    onClick={toggleBookmark}
                  >
                    {isBookmarked ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </Card>

              {/* Campaign Stats */}
              <Card className="p-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  Campaign Stats
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Average Investment</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${Math.round(campaign.raisedAmount / campaign.backers).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Days Remaining</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {campaign.daysLeft} days
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Campaign Start</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Dec 15, 2025
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </PageLayout>
    )
  }

  // Donation Layout
  return (
    <PageLayout maxWidth="wide">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.push('/crowdfunding/marketplace')}
        >
          Back to Marketplace
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Banner */}
          <Card className="p-0 overflow-hidden">
            <div className="h-80 bg-gradient-to-br from-success/20 to-success/5 dark:from-success/10 dark:to-success/5 flex items-center justify-center">
              <Heart className="w-32 h-32 text-success/30" />
            </div>
          </Card>

          {/* Title & Status */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="success" size="md">Donation</Badge>
                  <Badge variant="default" size="md">{campaign.category}</Badge>
                  <Badge
                    variant={campaign.status === 'active' ? 'success' : 'default'}
                    size="md"
                  >
                    {campaign.status === 'active' ? 'Active' : 'Closed'}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {campaign.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {campaign.description}
                </p>
              </div>
            </div>

            {/* Organization Info */}
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>{campaign.organizationName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>{campaign.location}</span>
              </div>
            </div>
          </div>

          {/* Funding Progress */}
          <Card className="p-6">
            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${campaign.raisedAmount.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  of ${campaign.targetAmount.toLocaleString()} goal
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-success to-success-dark h-full rounded-full transition-all"
                  style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-dark-border">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {fundingPercentage}%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Funded</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {campaign.backers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Donors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {campaign.daysLeft}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">Days Left</div>
              </div>
            </div>
          </Card>

          {/* Impact */}
          {campaign.impact && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Our Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-success/5 dark:bg-success/10 rounded-lg text-center">
                  <Users className="w-8 h-8 text-success mx-auto mb-2" />
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Beneficiaries</div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {campaign.impact.beneficiaries}
                  </div>
                </div>
                <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-lg text-center">
                  <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reach</div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {campaign.impact.reach}
                  </div>
                </div>
                <div className="p-4 bg-info/5 dark:bg-info/10 rounded-lg text-center">
                  <Calendar className="w-8 h-8 text-info mx-auto mb-2" />
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {campaign.impact.duration}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* About */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              About This Campaign
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {campaign.longDescription}
            </p>
          </Card>

          {/* How Donations Are Used */}
          {campaign.howDonationsUsed && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                How Your Donations Are Used
              </h2>
              <div className="space-y-4">
                {campaign.howDonationsUsed.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.category}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          ${item.amount.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          ({item.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-success to-success-dark h-full rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Team */}
          {campaign.team && campaign.team.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Meet the Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaign.team.map((member, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-success/20 to-success/5 dark:from-success/10 dark:to-success/5 flex items-center justify-center">
                        <Users className="w-8 h-8 text-success/50" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-sm text-success font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Updates */}
          {campaign.updates && campaign.updates.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Campaign Updates
              </h2>
              <div className="space-y-6">
                {campaign.updates.map((update, index) => (
                  <div key={index} className="pb-6 border-b border-gray-200 dark:border-dark-border last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(update.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {update.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {update.content}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Recent Donors */}
          {campaign.donors && campaign.donors.length > 0 && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Recent Donors
              </h2>
              <div className="space-y-4">
                {campaign.donors.map((donor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-card rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success/20 to-success/5 dark:from-success/10 dark:to-success/5 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-white block">
                          {donor.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          {new Date(donor.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      ${donor.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar - Donation Box */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Make a Donation
              </h3>

              {/* Suggested Amounts */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[25, 50, 100, 250].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setInvestAmount(amount.toString())}
                    className={`px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-colors ${
                      investAmount === amount.toString()
                        ? 'border-success bg-success/10 text-success'
                        : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:border-success/50'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <Input
                label="Custom Amount"
                type="number"
                placeholder="Enter amount"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                icon={<DollarSign className="w-4 h-4" />}
                iconPosition="left"
                helperText="Any amount helps make a difference"
              />

              <Button
                variant="primary"
                size="lg"
                className="w-full mt-4 bg-success hover:bg-success-dark"
                onClick={handleInvest}
                icon={<Heart className="w-5 h-5" />}
              >
                Donate Now
              </Button>

              <div className="mt-4 p-4 bg-success/5 dark:bg-success/10 rounded-lg border border-success/20">
                <div className="flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      100% Goes to the Cause
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      All donations go directly to the project. We cover the platform fees.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1"
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
                <Button
                  variant={isBookmarked ? 'primary' : 'outline'}
                  size="md"
                  className="flex-1"
                  icon={<Bookmark className="w-4 h-4" />}
                  onClick={toggleBookmark}
                >
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
              </div>
            </Card>

            {/* Campaign Stats */}
            <Card className="p-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Campaign Stats
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Average Donation</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${Math.round(campaign.raisedAmount / campaign.backers).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total Donors</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {campaign.backers.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Days Remaining</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {campaign.daysLeft} days
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
