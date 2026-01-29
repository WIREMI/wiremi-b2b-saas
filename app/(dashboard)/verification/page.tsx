'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Shield,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Upload,
  FileText,
  Building2,
  User,
  CreditCard,
  Globe,
  ArrowRight,
  RefreshCw,
  Eye,
  Download,
  HelpCircle,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Loader2,
  Check,
  X,
  Info,
  ArrowLeft,
  Users,
  UserCheck,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type VerificationStatus = 'not_started' | 'in_progress' | 'pending_review' | 'approved' | 'rejected' | 'action_required'
type StepStatus = 'completed' | 'in_progress' | 'pending' | 'rejected' | 'action_required'

interface VerificationStep {
  id: string
  title: string
  description: string
  status: StepStatus
  icon: React.ReactNode
  documents?: DocumentItem[]
  completedAt?: string
  rejectionReason?: string
  actionRequired?: string
}

interface DocumentItem {
  id: string
  name: string
  type: string
  status: 'uploaded' | 'verified' | 'rejected' | 'pending'
  uploadedAt?: string
  rejectionReason?: string
}

interface TimelineEvent {
  id: string
  title: string
  description: string
  timestamp: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export default function VerificationPage() {
  const router = useRouter()
  const [expandedStep, setExpandedStep] = useState<string | null>('business-info')

  // Mock verification status - in production this would come from API
  const overallStatus: VerificationStatus = 'in_progress'
  const estimatedCompletion = '1-2 business days'
  const submissionDate = 'January 28, 2026'
  const lastUpdated = '2 hours ago'

  const verificationSteps: VerificationStep[] = [
    {
      id: 'email-verification',
      title: 'Email Verification',
      description: 'Verify your email address',
      status: 'completed',
      icon: <CheckCircle2 className="w-5 h-5" />,
      completedAt: 'January 27, 2026 at 10:30 AM',
    },
    {
      id: 'business-info',
      title: 'Business Information',
      description: 'Basic company details and registration',
      status: 'completed',
      icon: <Building2 className="w-5 h-5" />,
      completedAt: 'January 27, 2026 at 11:15 AM',
      documents: [
        { id: '1', name: 'Business Registration Certificate', type: 'PDF', status: 'verified', uploadedAt: 'Jan 27, 2026' },
        { id: '2', name: 'Articles of Incorporation', type: 'PDF', status: 'verified', uploadedAt: 'Jan 27, 2026' },
      ],
    },
    {
      id: 'business-address',
      title: 'Business Address Verification',
      description: 'Proof of registered business address',
      status: 'completed',
      icon: <Globe className="w-5 h-5" />,
      completedAt: 'January 27, 2026 at 11:20 AM',
      documents: [
        { id: '3', name: 'Utility Bill - December 2025', type: 'PDF', status: 'verified', uploadedAt: 'Jan 27, 2026' },
      ],
    },
    {
      id: 'directors-ubos',
      title: 'Directors & Shareholders',
      description: 'Verify company directors and Ultimate Beneficial Owners (UBOs)',
      status: 'completed',
      icon: <Users className="w-5 h-5" />,
      completedAt: 'January 27, 2026 at 11:45 AM',
      documents: [
        { id: '4', name: 'Director 1 - John Smith (CEO)', type: 'Info', status: 'verified', uploadedAt: 'Jan 27, 2026' },
        { id: '5', name: 'Director 2 - Jane Doe (CFO)', type: 'Info', status: 'verified', uploadedAt: 'Jan 27, 2026' },
        { id: '6', name: 'UBO - John Smith (60% ownership)', type: 'Info', status: 'verified', uploadedAt: 'Jan 27, 2026' },
      ],
    },
    {
      id: 'ubo-identity',
      title: 'UBO Identity Verification',
      description: 'Identity verification for Ultimate Beneficial Owners',
      status: 'in_progress',
      icon: <UserCheck className="w-5 h-5" />,
      documents: [
        { id: '7', name: 'Passport - John Smith (UBO)', type: 'JPG', status: 'pending', uploadedAt: 'Jan 28, 2026' },
        { id: '8', name: 'Proof of Address - John Smith', type: 'PDF', status: 'pending', uploadedAt: 'Jan 28, 2026' },
      ],
    },
    {
      id: 'owner-identity',
      title: 'Account Owner Identity',
      description: 'Verify the identity of the account administrator',
      status: 'completed',
      icon: <User className="w-5 h-5" />,
      completedAt: 'January 27, 2026 at 12:00 PM',
      documents: [
        { id: '9', name: 'Passport - Admin User', type: 'JPG', status: 'verified', uploadedAt: 'Jan 27, 2026' },
      ],
    },
    {
      id: 'bank-account',
      title: 'Bank Account Verification',
      description: 'Link and verify your business bank account',
      status: 'pending',
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: 'final-review',
      title: 'Final Review',
      description: 'Compliance team review and approval',
      status: 'pending',
      icon: <Shield className="w-5 h-5" />,
    },
  ]

  const timeline: TimelineEvent[] = [
    {
      id: '1',
      title: 'Application Submitted',
      description: 'Your KYB application has been received',
      timestamp: 'Jan 27, 2026 at 10:30 AM',
      type: 'success',
    },
    {
      id: '2',
      title: 'Email Verified',
      description: 'Your email address has been verified',
      timestamp: 'Jan 27, 2026 at 10:35 AM',
      type: 'success',
    },
    {
      id: '3',
      title: 'Business Documents Approved',
      description: 'Business registration documents have been verified',
      timestamp: 'Jan 27, 2026 at 2:15 PM',
      type: 'success',
    },
    {
      id: '4',
      title: 'Address Verification Complete',
      description: 'Business address has been verified',
      timestamp: 'Jan 27, 2026 at 3:00 PM',
      type: 'success',
    },
    {
      id: '5',
      title: 'Directors & UBOs Verified',
      description: 'Company directors and shareholders information confirmed',
      timestamp: 'Jan 27, 2026 at 3:45 PM',
      type: 'success',
    },
    {
      id: '6',
      title: 'Account Owner Verified',
      description: 'Account administrator identity has been verified',
      timestamp: 'Jan 27, 2026 at 4:00 PM',
      type: 'success',
    },
    {
      id: '7',
      title: 'UBO Identity Documents Submitted',
      description: 'UBO identity documents are being reviewed',
      timestamp: 'Jan 28, 2026 at 9:00 AM',
      type: 'info',
    },
  ]

  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
      case 'in_progress':
      case 'pending_review':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
      case 'rejected':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
      case 'action_required':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400'
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400'
    }
  }

  const getStatusLabel = (status: VerificationStatus) => {
    switch (status) {
      case 'approved':
        return 'Verified'
      case 'in_progress':
        return 'In Progress'
      case 'pending_review':
        return 'Under Review'
      case 'rejected':
        return 'Rejected'
      case 'action_required':
        return 'Action Required'
      default:
        return 'Not Started'
    }
  }

  const getStepStatusIcon = (status: StepStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'in_progress':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'action_required':
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getDocStatusBadge = (status: DocumentItem['status']) => {
    switch (status) {
      case 'verified':
        return <Badge variant="success" size="sm">Verified</Badge>
      case 'rejected':
        return <Badge variant="error" size="sm">Rejected</Badge>
      case 'pending':
        return <Badge variant="warning" size="sm">Under Review</Badge>
      default:
        return <Badge variant="default" size="sm">Uploaded</Badge>
    }
  }

  const completedSteps = verificationSteps.filter(s => s.status === 'completed').length
  const progressPercentage = Math.round((completedSteps / verificationSteps.length) * 100)

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                Business Verification (KYB)
              </h1>
              <p className="text-gray-500">
                Complete your verification to unlock all Wiremi features
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className={cn('px-4 py-2 rounded-xl flex items-center gap-2', getStatusColor(overallStatus))}>
            {overallStatus === 'in_progress' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : overallStatus === 'approved' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
            <span className="font-medium">{getStatusLabel(overallStatus)}</span>
          </div>
        </div>

        {/* Progress Overview Card */}
        <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Verification Progress
              </h2>
              <p className="text-sm text-gray-500">
                {completedSteps} of {verificationSteps.length} steps completed
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-gray-500">Submitted:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{submissionDate}</span>
              </div>
              <div>
                <span className="text-gray-500">Est. Completion:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">{estimatedCompletion}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
              <span className="font-semibold text-gray-900 dark:text-white">{progressPercentage}%</span>
            </div>
            <div className="h-3 bg-gray-100 dark:bg-dark-elevated rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">Completed</span>
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completedSteps}</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">In Progress</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {verificationSteps.filter(s => s.status === 'in_progress').length}
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</span>
              </div>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {verificationSteps.filter(s => s.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/10 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span className="text-sm font-medium text-orange-700 dark:text-orange-400">Action Required</span>
              </div>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {verificationSteps.filter(s => s.status === 'action_required' || s.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Verification Steps - Left Column */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Verification Steps</h3>

            {verificationSteps.map((step, index) => {
              const isExpanded = expandedStep === step.id
              const isClickable = step.documents && step.documents.length > 0

              return (
                <div
                  key={step.id}
                  className={cn(
                    'bg-white dark:bg-dark-surface rounded-xl border transition-all',
                    step.status === 'completed'
                      ? 'border-green-200 dark:border-green-900/50'
                      : step.status === 'in_progress'
                      ? 'border-blue-200 dark:border-blue-900/50'
                      : step.status === 'rejected' || step.status === 'action_required'
                      ? 'border-orange-200 dark:border-orange-900/50'
                      : 'border-gray-200 dark:border-dark-border'
                  )}
                >
                  <button
                    onClick={() => isClickable && setExpandedStep(isExpanded ? null : step.id)}
                    className={cn(
                      'w-full p-4 flex items-center gap-4 text-left',
                      isClickable && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-elevated'
                    )}
                  >
                    {/* Step Number / Status Icon */}
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                      step.status === 'completed' && 'bg-green-100 dark:bg-green-900/30',
                      step.status === 'in_progress' && 'bg-blue-100 dark:bg-blue-900/30',
                      step.status === 'rejected' && 'bg-red-100 dark:bg-red-900/30',
                      step.status === 'action_required' && 'bg-orange-100 dark:bg-orange-900/30',
                      step.status === 'pending' && 'bg-gray-100 dark:bg-dark-elevated'
                    )}>
                      {getStepStatusIcon(step.status)}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-medium text-gray-900 dark:text-white">{step.title}</h4>
                        {step.status === 'completed' && (
                          <Badge variant="success" size="sm">Complete</Badge>
                        )}
                        {step.status === 'in_progress' && (
                          <Badge variant="info" size="sm">Reviewing</Badge>
                        )}
                        {step.status === 'action_required' && (
                          <Badge variant="warning" size="sm">Action Needed</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{step.description}</p>
                      {step.completedAt && (
                        <p className="text-xs text-gray-400 mt-1">Completed: {step.completedAt}</p>
                      )}
                    </div>

                    {/* Expand Icon */}
                    {isClickable && (
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-gray-400 transition-transform',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    )}
                  </button>

                  {/* Expanded Content - Documents */}
                  {isExpanded && step.documents && (
                    <div className="px-4 pb-4 border-t border-gray-100 dark:border-dark-border">
                      <div className="pt-4 space-y-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Submitted Documents
                        </p>
                        {step.documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-elevated rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white dark:bg-dark-surface rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-gray-400" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {doc.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {doc.type} • Uploaded {doc.uploadedAt}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {getDocStatusBadge(doc.status)}
                              <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-dark-border rounded-lg transition-colors">
                                <Eye className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {step.status === 'action_required' && step.actionRequired && (
                          <div className="p-3 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/50 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
                                  Action Required
                                </p>
                                <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                                  {step.actionRequired}
                                </p>
                                <button className="mt-2 text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1">
                                  Upload New Document
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Pending Step - CTA */}
                  {step.status === 'pending' && !step.documents && (
                    <div className="px-4 pb-4">
                      <button className="w-full py-2.5 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4" />
                        Start This Step
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Activity Timeline */}
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Activity Timeline</h3>

              <div className="space-y-4">
                {timeline.slice(0, 5).map((event, index) => (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        'w-2.5 h-2.5 rounded-full',
                        event.type === 'success' && 'bg-green-500',
                        event.type === 'info' && 'bg-blue-500',
                        event.type === 'warning' && 'bg-orange-500',
                        event.type === 'error' && 'bg-red-500'
                      )} />
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 dark:bg-dark-border mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{event.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{event.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline">
                View Full History
              </button>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl p-5 border border-primary-100 dark:border-primary-900/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Need Help?</h4>
                  <p className="text-xs text-gray-500">Our team is here to assist</p>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-dark-surface rounded-lg hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors text-sm">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">Chat with Support</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-dark-surface rounded-lg hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">KYB Documentation Guide</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                    Why do we need this?
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Business verification (KYB) helps us ensure the security of all transactions and comply with financial regulations. This protects both you and your customers.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-5">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-elevated rounded-lg transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload Additional Documents
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-elevated rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Refresh Status
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-elevated rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Download Submitted Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
