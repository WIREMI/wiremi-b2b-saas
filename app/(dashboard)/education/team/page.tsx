'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Plus, Search, Mail, Shield, Clock, CheckCircle, XCircle } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import StatsCard from '@/components/shared/StatsCard'
import {
  MOCK_TEAM_MEMBERS,
  MOCK_INSTITUTIONS,
  getInstitutionById,
} from '@/lib/mock-data/education-institutions'
import { formatDate } from '@/lib/utils'
import type { InstitutionRole, InvitationStatus } from '@/types/education'

export default function TeamPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<InstitutionRole | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<InvitationStatus | 'all'>('all')
  const [institutionFilter, setInstitutionFilter] = useState<string>('all')

  // Calculate stats
  const totalMembers = MOCK_TEAM_MEMBERS.length
  const activeMembers = MOCK_TEAM_MEMBERS.filter((m) => m.isActive).length
  const pendingInvites = MOCK_TEAM_MEMBERS.filter((m) => m.invitationStatus === 'pending').length

  // Filter team members
  const filteredMembers = MOCK_TEAM_MEMBERS.filter((member) => {
    const fullName = `${member.firstName || ''} ${member.lastName || ''}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === 'all' || member.role === roleFilter
    const matchesStatus = statusFilter === 'all' || member.invitationStatus === statusFilter
    const matchesInstitution = institutionFilter === 'all' || member.institutionId === institutionFilter

    return matchesSearch && matchesRole && matchesStatus && matchesInstitution
  })

  const roleLabels: Record<InstitutionRole, string> = {
    super_admin: 'Super Admin',
    finance_admin: 'Finance Admin',
    faculty_admin: 'Faculty Admin',
    department_admin: 'Department Admin',
    viewer: 'Viewer',
  }

  const roleColors: Record<InstitutionRole, 'error' | 'warning' | 'primary' | 'info' | 'default'> = {
    super_admin: 'error',
    finance_admin: 'warning',
    faculty_admin: 'primary',
    department_admin: 'info',
    viewer: 'default',
  }

  const statusConfig: Record<InvitationStatus, { icon: any; variant: 'success' | 'warning' | 'error'; label: string }> = {
    accepted: { icon: CheckCircle, variant: 'success', label: 'Active' },
    pending: { icon: Clock, variant: 'warning', label: 'Pending' },
    expired: { icon: XCircle, variant: 'error', label: 'Expired' },
    declined: { icon: XCircle, variant: 'error', label: 'Declined' },
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Team Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage team members and their access permissions
            </p>
          </div>

          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/education/team/invite')}
          >
            Invite Member
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total Members"
            value={totalMembers}
            icon={<Users className="w-5 h-5" />}
          />
          <StatsCard
            label="Active Members"
            value={activeMembers}
            icon={<CheckCircle className="w-5 h-5" />}
            change="+3"
            trend="up"
          />
          <StatsCard
            label="Pending Invites"
            value={pendingInvites}
            icon={<Clock className="w-5 h-5" />}
          />
          <StatsCard
            label="Institutions"
            value={MOCK_INSTITUTIONS.length}
            icon={<Shield className="w-5 h-5" />}
          />
        </div>

        {/* Filters */}
        <Card>
          <div className="p-4 space-y-4">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                  iconPosition="left"
                />
              </div>
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Institution Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Institution
                </label>
                <select
                  value={institutionFilter}
                  onChange={(e) => setInstitutionFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">All Institutions</option>
                  {MOCK_INSTITUTIONS.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.displayName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Role Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Role
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as InstitutionRole | 'all')}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">All Roles</option>
                  {Object.entries(roleLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as InvitationStatus | 'all')}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="accepted">Active</option>
                  <option value="pending">Pending</option>
                  <option value="expired">Expired</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Team Members List */}
        {filteredMembers.length > 0 ? (
          <div className="space-y-4">
            {filteredMembers.map((member) => {
              const institution = getInstitutionById(member.institutionId)
              const StatusIcon = statusConfig[member.invitationStatus].icon

              return (
                <Card key={member.id}>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-700 dark:text-primary-300 font-semibold">
                            {member.firstName?.[0] || member.email[0].toUpperCase()}
                            {member.lastName?.[0] || ''}
                          </span>
                        </div>

                        {/* Member Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {member.firstName && member.lastName
                                ? `${member.firstName} ${member.lastName}`
                                : member.email}
                            </h3>
                            <Badge variant={roleColors[member.role]}>
                              {roleLabels[member.role]}
                            </Badge>
                            <Badge variant={statusConfig[member.invitationStatus].variant}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {statusConfig[member.invitationStatus].label}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              <span>{institution?.displayName}</span>
                            </div>
                          </div>

                          {/* Scope Information */}
                          {member.scope.type !== 'institution' && (
                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                              <span className="font-medium">Scope: </span>
                              <span className="capitalize">{member.scope.type}</span>
                              {member.scope.facultyIds && member.scope.facultyIds.length > 0 && (
                                <span> ({member.scope.facultyIds.length} faculties)</span>
                              )}
                              {member.scope.departmentIds && member.scope.departmentIds.length > 0 && (
                                <span> ({member.scope.departmentIds.length} departments)</span>
                              )}
                            </div>
                          )}

                          {/* Metadata */}
                          <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                            <span>Invited {formatDate(member.invitedAt)}</span>
                            {member.acceptedAt && (
                              <span>Joined {formatDate(member.acceptedAt)}</span>
                            )}
                            {member.lastActiveAt && (
                              <span>Last active {formatDate(member.lastActiveAt)}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/education/team/${member.id}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/education/team/${member.id}/edit`)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card>
            <div className="p-12 text-center">
              <Users className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No team members found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchTerm || roleFilter !== 'all' || statusFilter !== 'all' || institutionFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by inviting your first team member'}
              </p>
              {!searchTerm && roleFilter === 'all' && statusFilter === 'all' && institutionFilter === 'all' && (
                <Button
                  variant="primary"
                  icon={<Plus className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={() => router.push('/education/team/invite')}
                >
                  Invite Member
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
