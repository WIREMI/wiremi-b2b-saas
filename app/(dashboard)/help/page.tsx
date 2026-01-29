'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  Video,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  CheckCircle,
  Zap,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function HelpSupportPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const supportOptions = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      iconBg: 'bg-blue-100 dark:bg-blue-500/20',
      iconColor: 'text-blue-500',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      availability: 'Available 24/7',
      action: () => {
        // Open live chat widget
        alert('Live chat would open here')
      },
      cta: 'Start Chat',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      iconBg: 'bg-purple-100 dark:bg-purple-500/20',
      iconColor: 'text-purple-500',
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: () => router.push('/help/contact'),
      cta: 'Send Email',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      iconBg: 'bg-green-100 dark:bg-green-500/20',
      iconColor: 'text-green-500',
      title: 'Phone Support',
      description: 'Speak with a support specialist',
      availability: 'Mon-Fri, 9AM-6PM EST',
      action: () => {
        window.location.href = 'tel:+1-800-WIREMI'
      },
      cta: 'Call Now',
    },
    {
      icon: <Video className="w-6 h-6" />,
      iconBg: 'bg-orange-100 dark:bg-orange-500/20',
      iconColor: 'text-orange-500',
      title: 'Video Call',
      description: 'Schedule a screen-sharing session',
      availability: 'Book 30-min session',
      action: () => router.push('/help/schedule'),
      cta: 'Schedule',
    },
  ]

  const popularArticles = [
    {
      id: '1',
      title: 'Getting Started with Wiremi B2B',
      category: 'Onboarding',
      readTime: '5 min',
      views: '12.4K',
    },
    {
      id: '2',
      title: 'How to Send International Payments',
      category: 'Payments',
      readTime: '8 min',
      views: '8.2K',
    },
    {
      id: '3',
      title: 'Setting Up Multi-Currency Accounts',
      category: 'Accounts',
      readTime: '6 min',
      views: '6.7K',
    },
    {
      id: '4',
      title: 'Understanding Transaction Fees',
      category: 'Billing',
      readTime: '4 min',
      views: '5.9K',
    },
    {
      id: '5',
      title: 'API Integration Guide',
      category: 'Development',
      readTime: '12 min',
      views: '4.1K',
    },
  ]

  const categories = [
    { icon: <Book className="w-5 h-5" />, name: 'Getting Started', count: 24 },
    { icon: <Zap className="w-5 h-5" />, name: 'Features', count: 67 },
    { icon: <FileText className="w-5 h-5" />, name: 'Billing & Plans', count: 18 },
    { icon: <HelpCircle className="w-5 h-5" />, name: 'FAQs', count: 42 },
    { icon: <Book className="w-5 h-5" />, name: 'API Documentation', count: 156 },
    { icon: <CheckCircle className="w-5 h-5" />, name: 'Best Practices', count: 31 },
  ]

  const systemStatus = [
    { service: 'Payment Processing', status: 'Operational', color: 'success' },
    { service: 'API Services', status: 'Operational', color: 'success' },
    { service: 'Currency Exchange', status: 'Operational', color: 'success' },
    { service: 'Authentication', status: 'Operational', color: 'success' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Help & Support
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                We're here to help you succeed
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search help articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Support Options */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportOptions.map((option, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={option.action}>
                <div className={`w-12 h-12 ${option.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <div className={option.iconColor}>{option.icon}</div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{option.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-4">
                  <Clock className="w-3 h-3" />
                  {option.availability}
                </div>
                <Button variant="outline" size="sm" fullWidth>
                  {option.cta}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Popular Articles */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Popular Articles</h2>
                <Button variant="ghost" size="sm" onClick={() => router.push('/help/articles')}>
                  View All
                </Button>
              </div>
              <div className="space-y-3">
                {popularArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => router.push(`/help/articles/${article.id}`)}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText className="w-4 h-4 text-primary-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{article.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                        <Badge variant="default" size="sm">{article.category}</Badge>
                        <span>{article.readTime} read</span>
                        <span>{article.views} views</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Browse by Category */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Browse by Category</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => router.push(`/help/category/${category.name.toLowerCase().replace(/ /g, '-')}`)}
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400">{category.count} articles</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Status */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">System Status</h3>
                <Badge variant="success" size="sm">All Systems Operational</Badge>
              </div>
              <div className="space-y-3">
                {systemStatus.map((system, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-600" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{system.service}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{system.status}</span>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                className="mt-4"
                icon={<ExternalLink className="w-4 h-4" />}
                iconPosition="right"
                onClick={() => window.open('https://status.wiremi.com', '_blank')}
              >
                View Full Status
              </Button>
            </Card>

            {/* Quick Links */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => router.push('/help/api-docs')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  API Documentation
                </button>
                <button
                  onClick={() => router.push('/help/video-tutorials')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Video Tutorials
                </button>
                <button
                  onClick={() => router.push('/help/developer-guides')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Developer Guides
                </button>
                <button
                  onClick={() => router.push('/help/security')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Security Best Practices
                </button>
                <button
                  onClick={() => router.push('/help/feature-request')}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-card transition-colors text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Request a Feature
                </button>
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="p-6 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Need More Help?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Our team is available 24/7 to assist you with any questions or issues.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>support@wiremi.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>+1 (800) WIREMI-1</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
