'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Bed,
  Search,
  Filter,
  Plus,
  Eye,
  Grid3x3,
  List,
  Building2,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import StatsCard from '@/components/shared/StatsCard'
import { formatCurrency } from '@/lib/utils'
import { MOCK_ROOMS } from '@/lib/mock-data/hospitality'
import type { Room, RoomStatus, RoomType } from '@/types/hospitality'

export default function RoomsPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [floorFilter, setFloorFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  // Calculate stats
  const totalRooms = MOCK_ROOMS.length
  const availableRooms = MOCK_ROOMS.filter((r) => r.status === 'available').length
  const occupiedRooms = MOCK_ROOMS.filter((r) => r.status === 'occupied').length
  const maintenanceRooms = MOCK_ROOMS.filter((r) => r.status === 'maintenance').length

  // Filter options
  const floors = [
    { value: 'all', label: 'All Floors' },
    { value: '1', label: 'Floor 1' },
    { value: '2', label: 'Floor 2' },
    { value: '3', label: 'Floor 3' },
  ]

  const roomTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'standard', label: 'Standard' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'suite', label: 'Suite' },
    { value: 'penthouse', label: 'Penthouse' },
  ]

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'occupied', label: 'Occupied' },
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'blocked', label: 'Blocked' },
  ]

  // Filter rooms
  const filteredRooms = MOCK_ROOMS.filter((room) => {
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.bedConfiguration.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFloor = floorFilter === 'all' || room.floor.toString() === floorFilter
    const matchesType = typeFilter === 'all' || room.type === typeFilter
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter

    return matchesSearch && matchesFloor && matchesType && matchesStatus
  })

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case 'available':
        return <Badge variant="success" size="sm">Available</Badge>
      case 'occupied':
        return <Badge variant="error" size="sm">Occupied</Badge>
      case 'cleaning':
        return <Badge variant="warning" size="sm">Cleaning</Badge>
      case 'maintenance':
        return <Badge variant="info" size="sm">Maintenance</Badge>
      case 'blocked':
        return <Badge variant="default" size="sm">Blocked</Badge>
    }
  }

  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case 'available':
        return 'border-success bg-success/5'
      case 'occupied':
        return 'border-error bg-error/5'
      case 'cleaning':
        return 'border-warning bg-warning/5'
      case 'maintenance':
        return 'border-info bg-info/5'
      case 'blocked':
        return 'border-gray-400 bg-gray-100 dark:bg-gray-800'
    }
  }

  const getRoomTypeLabel = (type: RoomType) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Rooms Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage all hotel rooms
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}
            >
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push('/hospitality/rooms/add')}
            >
              Add Room
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            label="Total Rooms"
            value={totalRooms}
            icon={<Building2 className="w-5 h-5" />}
            iconBg="bg-primary-100 dark:bg-primary-500/20 text-primary-500"
          />
          <StatsCard
            label="Available"
            value={availableRooms}
            icon={<Bed className="w-5 h-5" />}
            iconBg="bg-success/10 text-success"
          />
          <StatsCard
            label="Occupied"
            value={occupiedRooms}
            icon={<Bed className="w-5 h-5" />}
            iconBg="bg-error/10 text-error"
          />
          <StatsCard
            label="Under Maintenance"
            value={maintenanceRooms}
            icon={<Bed className="w-5 h-5" />}
            iconBg="bg-info/10 text-info"
          />
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by room number, type, or bed configuration..."
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
              <Select
                label="Floor"
                options={floors}
                value={floorFilter}
                onChange={(e) => setFloorFilter(e.target.value)}
              />
              <Select
                label="Room Type"
                options={roomTypes}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
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
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredRooms.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{MOCK_ROOMS.length}</span> rooms
            </p>
          </div>
        </Card>
      </div>

      {/* Rooms Display */}
      {viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRooms.map((room) => (
            <Card
              key={room.id}
              className={`p-0 overflow-hidden border-2 cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-all ${getStatusColor(room.status)}`}
              onClick={() => router.push(`/hospitality/rooms/${room.id}`)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {room.roomNumber}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Floor {room.floor}
                    </p>
                  </div>
                  {getStatusBadge(room.status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {getRoomTypeLabel(room.type)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Capacity</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {room.capacity.adults} Adults, {room.capacity.children} Children
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Bed</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {room.bedConfiguration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Rate</span>
                    <span className="text-sm font-semibold text-primary-500">
                      {formatCurrency(room.basePrice)}/night
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  icon={<Eye className="w-4 h-4" />}
                  iconPosition="left"
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/hospitality/rooms/${room.id}`)
                  }}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // Table View
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Floor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Rate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
                {filteredRooms.map((room) => (
                  <tr
                    key={room.id}
                    className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors cursor-pointer"
                    onClick={() => router.push(`/hospitality/rooms/${room.id}`)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Room {room.roomNumber}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {room.bedConfiguration}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {getRoomTypeLabel(room.type)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">
                        Floor {room.floor}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {room.capacity.adults}A, {room.capacity.children}C
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(room.basePrice)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(room.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/hospitality/rooms/${room.id}`)
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <Bed className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No rooms found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSearchQuery('')
                  setFloorFilter('all')
                  setTypeFilter('all')
                  setStatusFilter('all')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Card>
      )}
    </PageLayout>
  )
}
