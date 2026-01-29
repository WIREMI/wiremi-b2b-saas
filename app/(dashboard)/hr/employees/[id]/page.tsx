'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Edit,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Clock,
  TrendingUp,
  FileText,
  Download,
  Award,
  Users,
  AlertCircle,
  CheckCircle2,
  User,
  Building2,
  Hash,
  UserX,
  Ban,
  UserCheck,
  Upload,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatNumber } from '@/lib/utils'

interface Employee {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  position: string
  salary: number
  startDate: string
  location: string
  status: 'active' | 'on-leave' | 'probation' | 'terminated'
  manager: string
  employmentType: string
  dateOfBirth: string
  address: string
  taxId: string
  bankAccount: string
}

interface TimeOffRequest {
  id: string
  type: string
  startDate: string
  endDate: string
  days: number
  status: 'approved' | 'pending' | 'rejected'
  reason: string
}

interface Document {
  id: string
  name: string
  type: string
  uploadDate: string
  size: string
}

interface PerformanceReview {
  id: string
  reviewDate: string
  reviewer: string
  rating: number
  period: string
  status: 'completed' | 'scheduled'
}

export default function EmployeeDetailsPage() {
  const params = useParams()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<'overview' | 'compensation' | 'time-off' | 'documents' | 'performance'>('overview')
  const [showActionMenu, setShowActionMenu] = useState(false)

  // Mock employee data
  const employee: Employee = {
    id: params.id as string,
    employeeId: 'EMP-001',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@wiremi.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    salary: 125000,
    startDate: '2023-01-15',
    location: 'New York, NY',
    status: 'active',
    manager: 'Michael Chen',
    employmentType: 'Full-time',
    dateOfBirth: '1990-05-15',
    address: '123 Main Street, Apt 4B, New York, NY 10001',
    taxId: 'XXX-XX-4567',
    bankAccount: '****6789',
  }

  // Mock time-off requests
  const timeOffRequests: TimeOffRequest[] = [
    {
      id: '1',
      type: 'Annual Leave',
      startDate: '2026-02-10',
      endDate: '2026-02-14',
      days: 5,
      status: 'approved',
      reason: 'Family vacation',
    },
    {
      id: '2',
      type: 'Sick Leave',
      startDate: '2025-12-20',
      endDate: '2025-12-20',
      days: 1,
      status: 'approved',
      reason: 'Medical appointment',
    },
  ]

  // Mock documents
  const documents: Document[] = [
    {
      id: '1',
      name: 'Employment Contract.pdf',
      type: 'Contract',
      uploadDate: '2023-01-10',
      size: '2.5 MB',
    },
    {
      id: '2',
      name: 'Resume_Sarah_Johnson.pdf',
      type: 'Resume',
      uploadDate: '2022-12-15',
      size: '1.2 MB',
    },
    {
      id: '3',
      name: 'Tax_W4_Form.pdf',
      type: 'Tax Document',
      uploadDate: '2023-01-12',
      size: '850 KB',
    },
  ]

  // Mock performance reviews
  const performanceReviews: PerformanceReview[] = [
    {
      id: '1',
      reviewDate: '2025-12-15',
      reviewer: 'Michael Chen',
      rating: 4.5,
      period: 'H2 2025',
      status: 'completed',
    },
    {
      id: '2',
      reviewDate: '2025-06-10',
      reviewer: 'Michael Chen',
      rating: 4.2,
      period: 'H1 2025',
      status: 'completed',
    },
  ]

  const getStatusBadge = (status: Employee['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="md">Active</Badge>
      case 'on-leave':
        return <Badge variant="warning" size="md">On Leave</Badge>
      case 'probation':
        return <Badge variant="info" size="md">Probation</Badge>
      case 'terminated':
        return <Badge variant="error" size="md">Terminated</Badge>
    }
  }

  const getTimeOffStatusBadge = (status: TimeOffRequest['status']) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success" size="sm">Approved</Badge>
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>
      case 'rejected':
        return <Badge variant="error" size="sm">Rejected</Badge>
    }
  }

  const calculateTenure = () => {
    const start = new Date(employee.startDate)
    const now = new Date()
    const months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth()
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years === 0) {
      return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`
    } else {
      return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
    }
  }

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'compensation' as const, label: 'Compensation' },
    { id: 'time-off' as const, label: 'Time Off' },
    { id: 'documents' as const, label: 'Documents' },
    { id: 'performance' as const, label: 'Performance' },
  ]

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.back()}
          className="mb-4"
        >
          Back to Employees
        </Button>

        {/* Employee Header Card */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-primary-500">
                  {employee.firstName[0]}{employee.lastName[0]}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {employee.firstName} {employee.lastName}
                  </h1>
                  {getStatusBadge(employee.status)}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                  {employee.position}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    {employee.employeeId}
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {employee.department}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {employee.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {calculateTenure()}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                icon={<Edit className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => router.push(`/hr/employees/${employee.id}/edit`)}
              >
                Edit
              </Button>
              <div className="relative">
                <Button
                  variant="outline"
                  size="md"
                  icon={<MoreVertical className="w-5 h-5" />}
                  onClick={() => setShowActionMenu(!showActionMenu)}
                >
                  {/* Empty content - icon only button */}
                </Button>
                {showActionMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-50 dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border py-1 z-10">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg flex items-center gap-2">
                      <Ban className="w-4 h-4" />
                      Suspend
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-error hover:bg-gray-50 dark:hover:bg-dark-bg flex items-center gap-2">
                      <UserX className="w-4 h-4" />
                      Terminate
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-dark-border mb-6">
        <nav className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-500'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {employee.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {employee.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Address</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {employee.address}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Employment Details */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Employment Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Employee ID</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {employee.employeeId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Department</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {employee.department}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Position</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {employee.position}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Employment Type</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {employee.employmentType}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(employee.startDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tenure</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {calculateTenure()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reports To</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {employee.manager}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {employee.location}
                  </p>
                </div>
              </div>
            </Card>

            {/* Personal Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Date of Birth</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(employee.dateOfBirth).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tax ID</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {employee.taxId}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Annual Salary</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${formatNumber(employee.salary)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Time Off Used</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    6 / 20 days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Performance</span>
                  <span className="text-sm font-semibold text-success">
                    4.5 / 5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Documents</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {documents.length}
                  </span>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h2>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Time off approved
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">2 days ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-info" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Performance review completed
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">1 week ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Contract renewed
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">2 weeks ago</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Alerts */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Alerts
              </h2>
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-success/5 border border-success/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-success mb-1">
                      All documents up to date
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      No action required
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'compensation' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Salary Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Annual Salary</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${formatNumber(employee.salary)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${formatNumber(employee.salary / 12)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Bi-weekly</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${formatNumber(employee.salary / 26)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Banking Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Account Number</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {employee.bankAccount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Payment Method</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  Direct Deposit
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'time-off' && (
        <div>
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Time Off Balance
              </h2>
              <Button variant="outline" size="sm">
                Request Time Off
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Annual Leave</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">14 days</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">6 used, 14 remaining</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sick Leave</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5 days</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">1 used, 5 remaining</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Personal Days</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3 days</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">0 used, 3 remaining</p>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Time Off History
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-dark-bg">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                  {timeOffRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg">
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {request.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {new Date(request.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {new Date(request.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {request.days}
                      </td>
                      <td className="px-6 py-4">
                        {getTimeOffStatusBadge(request.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'documents' && (
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Documents
            </h2>
            <Button variant="outline" size="sm" icon={<Upload className="w-4 h-4" />} iconPosition="left">
              Upload Document
            </Button>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-dark-border">
            {documents.map((doc) => (
              <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-bg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {doc.type} • {doc.size} • {new Date(doc.uploadDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'performance' && (
        <div>
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Performance Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overall Rating</p>
                <p className="text-3xl font-bold text-success">4.5</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Out of 5.0</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reviews Completed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">2</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">This year</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Next Review</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">Jun 2026</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Scheduled</p>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-dark-border">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Review History
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-dark-border">
              {performanceReviews.map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        {review.period} Performance Review
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Reviewed by {review.reviewer} on{' '}
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-success">{review.rating}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">/ 5.0</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">{review.status === 'completed' ? 'Completed' : 'Scheduled'}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </PageLayout>
  )
}
