'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Building2,
  Plus,
  Search,
  Filter,
  MapPin,
  Star,
  Eye,
  Edit,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  TrendingUp,
  Bed,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import EmptyState from '@/components/ui/empty-state'
import { MOCK_PROPERTIES, PROPERTY_AMENITIES, MOCK_ROOM_TYPES } from '@/lib/mock-data/hospitality'
import type { Property, PropertyStatus, PropertyType } from '@/types/hospitality'

const STATUS_COLORS: Record<PropertyStatus, { bg: string; text: string; icon: any }> = {
  DRAFT: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300', icon: Edit },
  SUBMITTED: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', icon: Clock },
  APPROVED: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', icon: CheckCircle },
  LIVE: { bg: 'bg-primary-100 dark:bg-primary-900/30', text: 'text-primary-700 dark:text-primary-300', icon: TrendingUp },
  SUSPENDED: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', icon: XCircle },
}

const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  HOTEL: 'Hotel',
  RESORT: 'Resort',
  GUEST_HOUSE: 'Guest House',
}

export default function PropertiesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | 'ALL'>('ALL')
  const [typeFilter, setTypeFilter] = useState<PropertyType | 'ALL'>('ALL')

  // Filter properties
  const filteredProperties = MOCK_PROPERTIES.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.city.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || property.status === statusFilter
    const matchesType = typeFilter === 'ALL' || property.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Calculate stats
  const stats = {
    total: MOCK_PROPERTIES.length,
    live: MOCK_PROPERTIES.filter(p => p.status === 'LIVE').length,
    approved: MOCK_PROPERTIES.filter(p => p.status === 'APPROVED').length,
    pending: MOCK_PROPERTIES.filter(p => p.status === 'SUBMITTED').length,
    draft: MOCK_PROPERTIES.filter(p => p.status === 'DRAFT').length,
  }

  const getRoomCount = (propertyId: string) => {
    const roomTypes = MOCK_ROOM_TYPES.filter(rt => rt.propertyId === propertyId)
    return roomTypes.reduce((sum, rt) => sum + rt.inventoryCount, 0)
  }

  const getAmenityCount = (property: Property) => {
    return property.amenityIds.length
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Property Listings</h1>
          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-5 h-5" />}
            iconPosition="left"
            onClick={() => router.push('/hospitality/properties/create')}
          >
            Add Property
          </Button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your property listings, room types, and marketplace visibility
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Properties</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.live}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Live on Marketplace</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.approved}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Review</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Edit className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.draft}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5" />}
            iconPosition="left"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="ALL">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="APPROVED">Approved</option>
              <option value="LIVE">Live</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-300 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="ALL">All Types</option>
              <option value="HOTEL">Hotel</option>
              <option value="RESORT">Resort</option>
              <option value="GUEST_HOUSE">Guest House</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Properties List */}
      {filteredProperties.length === 0 ? (
        <Card className="p-12">
          <EmptyState
            icon={<Building2 className="w-12 h-12" />}
            title="No properties found"
            description={searchQuery ? "Try adjusting your search filters" : "Get started by creating your first property listing"}
            action={!searchQuery ? {
              label: 'Create Property',
              onClick: () => router.push('/hospitality/properties/create'),
              icon: <Plus className="w-4 h-4" />
            } : undefined}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProperties.map((property) => {
            const StatusIcon = STATUS_COLORS[property.status].icon
            const roomCount = getRoomCount(property.id)
            const amenityCount = getAmenityCount(property)

            return (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Property Image */}
                {property.media[0] && (
                  <div className="h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                    <img
                      src={property.media[0].url}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <div className={`px-3 py-1 rounded-full ${STATUS_COLORS[property.status].bg} ${STATUS_COLORS[property.status].text} text-xs font-medium flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {property.status.charAt(0) + property.status.slice(1).toLowerCase().replace('_', ' ')}
                      </div>
                    </div>
                    {property.starRating && (
                      <div className="absolute top-3 left-3 bg-white dark:bg-dark-surface px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{property.starRating}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {property.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{property.address.city}, {property.address.state}</span>
                        </div>
                      </div>
                      <Badge variant="default" size="sm">{PROPERTY_TYPE_LABELS[property.type]}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {property.shortDescription}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
                    <div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 dark:text-gray-400 text-xs mb-1">
                        <Bed className="w-3 h-3" />
                        <span>Rooms</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {roomCount || '—'}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 dark:text-gray-400 text-xs mb-1">
                        <Star className="w-3 h-3" />
                        <span>Amenities</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {amenityCount}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 dark:text-gray-400 text-xs mb-1">
                        <Eye className="w-3 h-3" />
                        <span>Photos</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {property.media.length}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => router.push(`/hospitality/properties/${property.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Edit className="w-4 h-4" />}
                      onClick={() => router.push(`/hospitality/properties/${property.id}/edit`)}
                    />
                  </div>

                  {/* Status Message */}
                  {property.status === 'SUBMITTED' && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Submitted for review on {new Date(property.submittedAt!).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {property.status === 'APPROVED' && (
                    <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <p className="text-xs text-green-700 dark:text-green-300">
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                        Ready to go live on marketplace
                      </p>
                    </div>
                  )}
                  {property.status === 'LIVE' && (
                    <div className="mt-3 p-3 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg">
                      <p className="text-xs text-primary-700 dark:text-primary-300">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        Listed since {new Date(property.listedAt!).toLocaleDateString()}
                      </p>
                    </div>
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
