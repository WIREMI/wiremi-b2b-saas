// Hospitality Management Module Type Definitions

export type RoomStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'blocked'
export type RoomType = 'standard' | 'deluxe' | 'suite' | 'penthouse'
export type BookingStatus = 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled'
export type GuestType = 'regular' | 'vip' | 'corporate'
export type PaymentMethod = 'cash' | 'card' | 'bank-transfer' | 'mobile-money'
export type ServiceType = 'room-service' | 'mini-bar' | 'laundry' | 'spa' | 'restaurant' | 'transport' | 'other'
export type HousekeepingStatus = 'pending' | 'in-progress' | 'completed'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskType = 'cleaning' | 'maintenance' | 'inspection'
export type IDType = 'passport' | 'national-id' | 'drivers-license'
export type FloorPreference = 'low' | 'high' | 'any'

export interface Room {
  id: string
  roomNumber: string
  type: RoomType
  floor: number
  status: RoomStatus
  capacity: {
    adults: number
    children: number
  }
  amenities: string[] // ['wifi', 'tv', 'mini-bar', 'ac', 'balcony', 'ocean-view']
  basePrice: number
  currency: string
  sizeSqm: number
  bedConfiguration: string // '1 King' | '2 Queen' | '1 King + 1 Single'
  images?: string[]
  description?: string
  lastCleaned?: string // ISO datetime
  nextMaintenance?: string // ISO datetime
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  bookingReference: string // 'BK-2026-001234'
  roomId: string
  room?: Room // Populated relationship
  guestId: string
  guest?: Guest // Populated relationship
  checkInDate: string // ISO date
  checkOutDate: string // ISO date
  actualCheckIn?: string // ISO datetime
  actualCheckOut?: string // ISO datetime
  status: BookingStatus
  numberOfGuests: {
    adults: number
    children: number
  }
  specialRequests?: string
  source: 'walk-in' | 'phone' | 'online' | 'app' | 'agent'
  roomRate: number // per night
  totalNights: number
  subtotal: number
  taxRate: number // percentage
  taxAmount: number
  discountAmount: number
  totalAmount: number
  currency: string
  depositAmount: number
  balanceDue: number
  paymentStatus: 'unpaid' | 'partial' | 'paid'
  additionalCharges: ServiceCharge[]
  notes?: string
  cancelledAt?: string
  cancellationReason?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Guest {
  id: string
  guestCode: string // 'GST-00123'
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  idType: IDType
  idNumber: string
  dateOfBirth?: string // ISO date
  address?: string
  city?: string
  country?: string
  guestType: GuestType
  loyaltyPoints?: number
  preferences?: {
    roomType?: RoomType
    floorPreference?: FloorPreference
    beddingPreference?: string
    smokingRoom?: boolean
    specialNotes?: string
  }
  bookingHistory: string[] // Booking IDs
  totalBookings: number
  totalSpent: number
  totalNights: number
  currency: string
  lastVisit?: string // ISO datetime
  blacklisted: boolean
  blacklistReason?: string
  createdAt: string
  updatedAt: string
}

export interface ServiceCharge {
  id: string
  bookingId: string
  serviceType: ServiceType
  description: string
  quantity: number
  unitPrice: number
  totalAmount: number
  currency: string
  chargedAt: string // ISO datetime
  chargedBy: string // User ID or name
  paid: boolean
}

export interface HousekeepingTask {
  id: string
  roomId: string
  room?: Room // Populated relationship
  taskType: TaskType
  priority: TaskPriority
  status: HousekeepingStatus
  assignedTo?: string // Staff name or ID
  description?: string
  notes?: string
  scheduledFor?: string // ISO datetime
  startedAt?: string // ISO datetime
  completedAt?: string // ISO datetime
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Invoice {
  id: string
  invoiceNumber: string // 'INV-2026-001234'
  bookingId: string
  booking?: Booking
  guestId: string
  guest?: Guest
  lineItems: {
    description: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  subtotal: number
  taxRate: number
  taxAmount: number
  discountAmount: number
  totalAmount: number
  currency: string
  paymentMethod?: PaymentMethod
  paymentReference?: string
  paidAt?: string
  issuedAt: string
  dueDate: string
  notes?: string
  createdAt: string
}

export interface OccupancyStats {
  date: string
  totalRooms: number
  occupiedRooms: number
  availableRooms: number
  cleaningRooms: number
  maintenanceRooms: number
  blockedRooms: number
  occupancyRate: number // Percentage
  revenue: number
  averageDailyRate: number // ADR
  revenuePerAvailableRoom: number // RevPAR
}

// Helper types for forms
export interface CreateRoomInput {
  roomNumber: string
  type: RoomType
  floor: number
  capacity: {
    adults: number
    children: number
  }
  amenities: string[]
  basePrice: number
  currency: string
  sizeSqm: number
  bedConfiguration: string
  description?: string
}

export interface CreateBookingInput {
  roomId: string
  guestId: string
  checkInDate: string
  checkOutDate: string
  numberOfGuests: {
    adults: number
    children: number
  }
  specialRequests?: string
  source: Booking['source']
  depositAmount: number
}

export interface CreateGuestInput {
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  idType: IDType
  idNumber: string
  dateOfBirth?: string
  address?: string
  city?: string
  country?: string
  guestType: GuestType
  preferences?: Guest['preferences']
}

// ============================================
// Property & Listing System Types (Marketplace)
// ============================================

export type PropertyType = 'HOTEL' | 'RESORT' | 'GUEST_HOUSE'
export type PropertyStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'LIVE' | 'SUSPENDED'
export type CancellationPolicy = 'FLEXIBLE' | 'MODERATE' | 'STRICT'
export type BedType = 'KING' | 'QUEEN' | 'TWIN' | 'DOUBLE' | 'SINGLE'
export type MediaCategory = 'EXTERIOR' | 'LOBBY' | 'POOL' | 'COMMON_AREAS' | 'RESTAURANT' | 'GYM' | 'ROOM'

export interface PropertyAddress {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  latitude: number
  longitude: number
}

export interface PropertyMedia {
  id: string
  url: string
  thumbnailUrl: string
  category: MediaCategory
  orderIndex: number
  caption?: string
}

export interface Amenity {
  id: string
  name: string
  icon: string
  category: 'PROPERTY' | 'ROOM'
  description?: string
}

export interface RoomTypeDefinition {
  id: string
  propertyId: string
  name: string
  description: string
  bedType: BedType
  bedCount: number
  maxOccupancy: {
    adults: number
    children: number
  }
  roomSize: {
    value: number
    unit: 'SQM' | 'SQFT'
  }
  basePrice: number
  currency: string
  inventoryCount: number
  amenityIds: string[]
  media: PropertyMedia[]
  features: string[]
}

export interface SeasonalPricing {
  id: string
  roomTypeId: string
  seasonName: string
  startDate: string
  endDate: string
  priceMultiplier: number
  fixedPrice?: number
}

export interface Property {
  id: string
  businessId: string
  name: string
  type: PropertyType
  status: PropertyStatus
  shortDescription: string
  longDescription: string
  address: PropertyAddress
  checkInTime: string
  checkOutTime: string
  cancellationPolicy: CancellationPolicy
  houseRules: string[]
  contactEmail: string
  contactPhone: string
  media: PropertyMedia[]
  amenityIds: string[]
  roomTypes: RoomTypeDefinition[]
  starRating?: number
  createdAt: string
  updatedAt: string
  submittedAt?: string
  approvedAt?: string
  listedAt?: string
}

export interface PropertyAnalytics {
  propertyId: string
  period: {
    start: string
    end: string
  }
  occupancyRate: number
  averageDailyRate: number
  revenuePerAvailableRoom: number
  totalRooms: number
  occupiedRooms: number
  availableRooms: number
  totalRevenue: number
  totalBookings: number
  averageStayLength: number
  cancellationRate: number
  bookingLeadTime: number
  repeatGuestRate: number
}

export interface RevenueByMonth {
  month: string
  revenue: number
  bookings: number
  occupancyRate: number
}

export interface BookingSource {
  source: 'DIRECT' | 'MOBILE_APP' | 'OTA' | 'PHONE' | 'WALK_IN'
  count: number
  revenue: number
  percentage: number
}

export interface RoomTypePerformance {
  roomTypeId: string
  roomTypeName: string
  totalBookings: number
  revenue: number
  occupancyRate: number
  averageDailyRate: number
}

// API Request types
export interface CreatePropertyRequest {
  name: string
  type: PropertyType
  shortDescription: string
  longDescription: string
  address: PropertyAddress
  checkInTime: string
  checkOutTime: string
  cancellationPolicy: CancellationPolicy
  houseRules: string[]
  contactEmail: string
  contactPhone: string
  amenityIds: string[]
}

export interface PropertySearchFilters {
  location?: string
  checkIn?: string
  checkOut?: string
  guests?: number
  propertyType?: PropertyType[]
  minPrice?: number
  maxPrice?: number
  amenities?: string[]
  starRating?: number
}
