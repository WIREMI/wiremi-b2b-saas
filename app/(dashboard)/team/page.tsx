'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Shield,
  Eye,
  Edit,
  MoreVertical,
  Mail,
  Calendar,
  Activity,
  CheckCircle2,
  AlertCircle,
  Ban,
  UserX,
  Key,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'manager' | 'member' | 'viewer'
  department: string
  status: 'active' | 'invited' | 'suspended'
  lastActive: string
  joinedDate: string
  permissions: string[]
}

type SortField = 'name' | 'role' | 'department' | 'lastActive' | 'status'
type SortOrder = 'asc' | 'desc'

export default function TeamManagementPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null)

  // Mock team members data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@wiremi.com',
      role: 'owner',
      department: 'Engineering',
      status: 'active',
      lastActive: '2026-01-19T10:30:00',
      joinedDate: '2023-01-15',
      permissions: ['all'],
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@wiremi.com',
      role: 'admin',
      department: 'Engineering',
      status: 'active',
      lastActive: '2026-01-19T09:15:00',
      joinedDate: '2022-06-20',
      permissions: ['manage_team', 'manage_payroll', 'manage_transactions'],
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@wiremi.com',
      role: 'manager',
      department: 'Sales & Marketing',
      status: 'active',
      lastActive: '2026-01-19T08:45:00',
      joinedDate: '2022-03-10',
      permissions: ['manage_transactions', 'view_reports'],
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@wiremi.com',
      role: 'member',
      department: 'Operations',
      status: 'active',
      lastActive: '2026-01-18T16:20:00',
      joinedDate: '2023-08-01',
      permissions: ['create_transactions', 'view_reports'],
    },
    {
      id: '5',
      name: 'Jessica Taylor',
      email: 'jessica.taylor@wiremi.com',
      role: 'member',
      department: 'Finance',
      status: 'active',
      lastActive: '2026-01-19T07:30:00',
      joinedDate: '2023-02-14',
      permissions: ['view_transactions', 'view_reports'],
    },
    {
      id: '6',
      name: 'Robert Anderson',
      email: 'robert.anderson@wiremi.com',
      role: 'viewer',
      department: 'Engineering',
      status: 'invited',
      lastActive: 'Never',
      joinedDate: '2026-01-15',
      permissions: ['view_reports'],
    },
  ]

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'owner', label: 'Owner' },
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'member', label: 'Member' },
    { value: 'viewer', label: 'Viewer' },
  ]

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'invited', label: 'Invited' },
    { value: 'suspended', label: 'Suspended' },
  ]

  // Filter and sort team members
  const filteredMembers = teamMembers
    .filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.department.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRole = roleFilter === 'all' || member.role === roleFilter
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
    .sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'role':
          comparison = a.role.localeCompare(b.role)
          break
        case 'department':
          comparison = a.department.localeCompare(b.department)
          break
        case 'lastActive':
          if (a.lastActive === 'Never') return 1
          if (b.lastActive === 'Never') return -1
          comparison =
            new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()
          break
        case 'status':
          comparison = a.status.localeCompare(b.status)
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 opacity-30" />
    }
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    )
  }

  const getRoleBadge = (role: TeamMember['role']) => {
    switch (role) {
      case 'owner':
        return <Badge variant="default" size="sm" className="bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">Owner</Badge>
      case 'admin':
        return <Badge variant="error" size="sm">Admin</Badge>
      case 'manager':
        return <Badge variant="warning" size="sm">Manager</Badge>
      case 'member':
        return <Badge variant="info" size="sm">Member</Badge>
      case 'viewer':
        return <Badge variant="default" size="sm">Viewer</Badge>
    }
  }

  const getStatusBadge = (status: TeamMember['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Active</Badge>
      case 'invited':
        return <Badge variant="warning" size="sm">Invited</Badge>
      case 'suspended':
        return <Badge variant="error" size="sm">Suspended</Badge>
    }
  }

  const formatLastActive = (lastActive: string) => {
    if (lastActive === 'Never') return 'Never'

    const date = new Date(lastActive)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(filteredMembers.map((m) => m.id))
    }
  }

  const handleSelectMember = (id: string) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((mid) => mid !== id))
    } else {
      setSelectedMembers([...selectedMembers, id])
    }
  }

  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter((m) => m.status === 'active').length,
    invited: teamMembers.filter((m) => m.status === 'invited').length,
    admins: teamMembers.filter((m) => m.role === 'admin' || m.role === 'owner').length,
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Team Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage team members and their access permissions
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Shield className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push('/team/roles')}
            >
              Roles & Permissions
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<UserPlus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push('/team/invite')}
            >
              Invite Member
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Members</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.active}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.invited}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Invited</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-error" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.admins}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                iconPosition="left"
              />
            </div>
            <div className="flex gap-3">
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
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
              <Select
                label="Role"
                options={roles}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              />
              <Select
                label="Status"
                options={statuses}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredMembers.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{teamMembers.length}</span> team members
              {selectedMembers.length > 0 && (
                <span>
                  {' • '}
                  <span className="font-semibold text-primary-500">
                    {selectedMembers.length} selected
                  </span>
                </span>
              )}
            </p>
          </div>
        </Card>
      </div>

      {/* Team Members Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedMembers.length === filteredMembers.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Member
                    {getSortIcon('name')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center gap-2">
                    Role
                    {getSortIcon('role')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('department')}
                >
                  <div className="flex items-center gap-2">
                    Department
                    {getSortIcon('department')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('lastActive')}
                >
                  <div className="flex items-center gap-2">
                    Last Active
                    {getSortIcon('lastActive')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {getSortIcon('status')}
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleSelectMember(member.id)}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary-500">
                          {member.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {member.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(member.role)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {member.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {formatLastActive(member.lastActive)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => router.push(`/team/${member.id}`)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit className="w-4 h-4" />}
                        onClick={() => router.push(`/team/${member.id}/edit`)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No team members found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSearchQuery('')
                setRoleFilter('all')
                setStatusFilter('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Card>
    </PageLayout>
  )
}
