'use client'

import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  MapPin,
  Star,
  Bed,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  Building2,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  UtensilsCrossed,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MOCK_PROPERTIES, PROPERTY_AMENITIES } from '@/lib/mock-data/hospitality'
import type { PropertyStatus } from '@/types/hospitality'

const STATUS_COLORS: Record<PropertyStatus, { bg: string; text: string }> = {
  DRAFT: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300 dark:text-gray-300' },
  SUBMITTED: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
  APPROVED: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
  LIVE: { bg: 'bg-primary-100 dark:bg-primary-900/30', text: 'text-primary-700 dark:text-primary-300' },
  SUSPENDED: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300' },
}

const AMENITY_ICONS: Record<string, any> = {
  WiFi: Wifi,
  Parking: Car,
  Restaurant: UtensilsCrossed,
  Gym: Dumbbell,
  Breakfast: Coffee,
}

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const propertyId = params.id as string

  // Find the property
  const property = MOCK_PROPERTIES.find((p) => p.id === propertyId)

  if (!property) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Property Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The property you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/hospitality/properties')}>
            Back to Properties
          </Button>
        </div>
      </PageLayout>
    )
  }

  const statusConfig = STATUS_COLORS[property.status]

  return (
    <PageLayout maxWidth="wide">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <Button
              variant="ghost"
              className="mb-4 -ml-2 gap-2"
              onClick={() => router.push('/hospitality/properties')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Properties
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white dark:text-white">{property.name}</h1>
              <Badge className={`${statusConfig.bg} ${statusConfig.text}`}>
                {property.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{property.address.city}, {property.address.country}</span>
              </div>
              {property.starRating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-gray-900 dark:text-white dark:text-white">{property.starRating} stars</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Property
            </Button>
          </div>
        </div>

        {/* Main Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Bed className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{property.roomTypes.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Room Types</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{property.type}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Property Type</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">{property.starRating || 'N/A'}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-400">Star Rating</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* About */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Property</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{property.longDescription}</p>
            </Card>

            {/* Room Types */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Room Types & Rates</h2>
              {property.roomTypes.length > 0 ? (
                <div className="space-y-3">
                  {property.roomTypes.map((roomType) => (
                    <div
                      key={roomType.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white dark:text-white">{roomType.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {roomType.maxOccupancy.adults} adults, {roomType.maxOccupancy.children} children
                          </span>
                          <span className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            {roomType.inventoryCount} rooms
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white dark:text-white">
                          ${roomType.basePrice}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400">per night</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400 text-sm">No room types configured yet.</p>
              )}
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Location */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                <p>{property.address.street}</p>
                <p>
                  {property.address.city}, {property.address.state}
                </p>
                <p>
                  {property.address.country} {property.address.postalCode}
                </p>
              </div>
            </Card>

            {/* Amenities */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Amenities</h3>
              <div className="space-y-2">
                {property.amenityIds.map((amenityId) => {
                  const amenity = PROPERTY_AMENITIES.find((a) => a.id === amenityId)
                  if (!amenity) return null
                  const Icon = AMENITY_ICONS[amenity.name] || Building2
                  return (
                    <div
                      key={amenityId}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300"
                    >
                      <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400 dark:text-gray-400 dark:text-gray-400" />
                      {amenity.name}
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Property Type */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Property Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Type:</span>
                  <Badge variant="default" className="ml-2">
                    {property.type}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Room Types:</span>
                  <span className="ml-2 font-semibold text-gray-900 dark:text-white dark:text-white">
                    {property.roomTypes.length}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Check-in:</span>
                  <span className="ml-2 font-semibold text-gray-900 dark:text-white dark:text-white">
                    {property.checkInTime}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400 dark:text-gray-400">Check-out:</span>
                  <span className="ml-2 font-semibold text-gray-900 dark:text-white dark:text-white">
                    {property.checkOutTime}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Policies & House Rules */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Policies & House Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cancellation Policy</h3>
              <p className="text-gray-700 dark:text-gray-300 dark:text-gray-300">{property.cancellationPolicy}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">House Rules</h3>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300">
                {property.houseRules.slice(0, 3).map((rule, index) => (
                  <li key={index}>• {rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
