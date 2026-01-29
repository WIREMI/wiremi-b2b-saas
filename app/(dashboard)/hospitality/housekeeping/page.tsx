'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sparkles,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Wrench,
  Eye,
  PlayCircle,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import StatsCard from '@/components/shared/StatsCard'
import { formatDate } from '@/lib/utils'
import { MOCK_HOUSEKEEPING_TASKS, MOCK_ROOMS } from '@/lib/mock-data/hospitality'
import type { HousekeepingTask } from '@/types/hospitality'

export default function HousekeepingPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Calculate stats
  const totalTasks = MOCK_HOUSEKEEPING_TASKS.length
  const pendingTasks = MOCK_HOUSEKEEPING_TASKS.filter((t) => t.status === 'pending').length
  const inProgressTasks = MOCK_HOUSEKEEPING_TASKS.filter((t) => t.status === 'in-progress').length
  const completedToday = MOCK_HOUSEKEEPING_TASKS.filter((t) => {
    if (t.status !== 'completed' || !t.completedAt) return false
    const today = new Date().toISOString().split('T')[0]
    const completedDate = t.completedAt.split('T')[0]
    return completedDate === today
  }).length

  // Get rooms that need cleaning (available or cleaning status)
  const roomsToClean = MOCK_ROOMS.filter((r) => r.status === 'cleaning' || r.status === 'available').length

  // Filter options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ]

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' },
  ]

  // Filter tasks
  const filteredTasks = MOCK_HOUSEKEEPING_TASKS.filter((task) => {
    const room = MOCK_ROOMS.find((r) => r.id === task.roomId)
    const matchesSearch = room?.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusBadge = (status: HousekeepingTask['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>
      case 'in-progress':
        return <Badge variant="info" size="sm">In Progress</Badge>
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>
    }
  }

  const getPriorityBadge = (priority: HousekeepingTask['priority']) => {
    switch (priority) {
      case 'low':
        return <Badge variant="default" size="sm">Low</Badge>
      case 'medium':
        return <Badge variant="info" size="sm">Medium</Badge>
      case 'high':
        return <Badge variant="warning" size="sm">High</Badge>
      case 'urgent':
        return <Badge variant="error" size="sm">Urgent</Badge>
    }
  }

  const getTaskTypeIcon = (type: HousekeepingTask['taskType']) => {
    switch (type) {
      case 'cleaning':
        return <Sparkles className="w-5 h-5 text-primary-500" />
      case 'maintenance':
        return <Wrench className="w-5 h-5 text-warning" />
      case 'inspection':
        return <Eye className="w-5 h-5 text-info" />
    }
  }

  // Quick room status update grid
  const availableRooms = MOCK_ROOMS.filter((r) => r.status === 'available' || r.status === 'cleaning').slice(0, 12)

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Housekeeping Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage cleaning tasks and room status
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
            >
              Create Task
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            label="Pending Tasks"
            value={pendingTasks}
            icon={<Clock className="w-5 h-5" />}
            iconBg="bg-warning/10 text-warning"
          />
          <StatsCard
            label="In Progress"
            value={inProgressTasks}
            icon={<PlayCircle className="w-5 h-5" />}
            iconBg="bg-info/10 text-info"
          />
          <StatsCard
            label="Completed Today"
            value={completedToday}
            icon={<CheckCircle2 className="w-5 h-5" />}
            iconBg="bg-success/10 text-success"
          />
          <StatsCard
            label="Rooms to Clean"
            value={roomsToClean}
            icon={<Sparkles className="w-5 h-5" />}
            iconBg="bg-primary-100 dark:bg-primary-500/20 text-primary-500"
          />
        </div>

        {/* Room Status Quick Update */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Room Status Quick Update
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {availableRooms.map((room) => (
              <button
                key={room.id}
                className={`aspect-square p-2 rounded-lg border-2 transition-all text-center ${
                  room.status === 'cleaning'
                    ? 'border-warning bg-warning/10'
                    : 'border-success bg-success/5'
                }`}
                onClick={() => router.push(`/hospitality/rooms/${room.id}`)}
              >
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {room.roomNumber}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                  {room.status === 'cleaning' ? 'Cleaning' : 'Ready'}
                </p>
              </button>
            ))}
          </div>
        </Card>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by room number..."
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
                label="Status"
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
              <Select
                label="Priority"
                options={priorityOptions}
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              />
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredTasks.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{MOCK_HOUSEKEEPING_TASKS.length}</span> tasks
            </p>
          </div>
        </Card>
      </div>

      {/* Tasks List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Task Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Scheduled
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredTasks.map((task) => {
                const room = MOCK_ROOMS.find((r) => r.id === task.roomId)
                return (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Room {room?.roomNumber}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getTaskTypeIcon(task.taskType)}
                        <span className="text-sm text-gray-900 dark:text-white capitalize">
                          {task.taskType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                        {task.description || 'Standard room cleaning'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {getPriorityBadge(task.priority)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(task.status)}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {task.assignedTo || 'Unassigned'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {task.scheduledFor ? formatDate(new Date(task.scheduledFor)) : 'ASAP'}
                      </p>
                      {task.completedAt && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          Done: {formatDate(new Date(task.completedAt))}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {task.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => console.log('Start task:', task.id)}
                        >
                          Start
                        </Button>
                      )}
                      {task.status === 'in-progress' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => console.log('Complete task:', task.id)}
                        >
                          Complete
                        </Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No tasks found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
                setPriorityFilter('all')
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
