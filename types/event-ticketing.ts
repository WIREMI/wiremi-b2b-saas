// Event Ticketing Module Types
// Comprehensive type system for event management, ticketing, and landing pages

// ==================== Core Types ====================

export type EventStatus =
  | 'DRAFT'           // Event created but not published
  | 'PUBLISHED'       // Live and accepting registrations
  | 'SOLD_OUT'        // All tickets sold
  | 'CANCELLED'       // Event cancelled
  | 'COMPLETED'       // Event has ended
  | 'POSTPONED'       // Event postponed to new date

export type EventCategory =
  | 'CONFERENCE'
  | 'WORKSHOP'
  | 'SEMINAR'
  | 'CONCERT'
  | 'FESTIVAL'
  | 'SPORTS'
  | 'EXHIBITION'
  | 'NETWORKING'
  | 'FUNDRAISER'
  | 'OTHER'

export type TicketType =
  | 'GENERAL_ADMISSION'
  | 'VIP'
  | 'EARLY_BIRD'
  | 'STUDENT'
  | 'GROUP'
  | 'BACKSTAGE'
  | 'PREMIUM'

export type TicketStatus =
  | 'AVAILABLE'
  | 'SOLD_OUT'
  | 'SALES_ENDED'
  | 'COMING_SOON'

export type OrderStatus =
  | 'PENDING'         // Awaiting payment
  | 'PAID'            // Payment successful
  | 'CONFIRMED'       // Tickets issued
  | 'CANCELLED'       // Order cancelled
  | 'REFUNDED'        // Payment refunded
  | 'FAILED'          // Payment failed

export type PaymentMethod =
  | 'CREDIT_CARD'
  | 'DEBIT_CARD'
  | 'PAYPAL'
  | 'STRIPE'
  | 'BANK_TRANSFER'
  | 'MOBILE_MONEY'
  | 'CRYPTO'
  | 'CASH'

export type AttendeeStatus =
  | 'REGISTERED'      // Ticket purchased
  | 'CHECKED_IN'      // Arrived at event
  | 'NO_SHOW'         // Didn't attend
  | 'CANCELLED'       // Registration cancelled

// ==================== Landing Page Types ====================

export interface EventMedia {
  id: string
  type: 'IMAGE' | 'VIDEO' | 'FLYER'
  url: string
  caption?: string
  isPrimary?: boolean
  order: number
}

export interface LandingPageSection {
  id: string
  type: 'HERO' | 'ABOUT' | 'SPEAKERS' | 'SCHEDULE' | 'VENUE' | 'FAQ' | 'SPONSORS' | 'CUSTOM'
  title: string
  content: string
  media?: EventMedia[]
  order: number
  visible: boolean
}

export interface Speaker {
  id: string
  name: string
  title: string
  company?: string
  bio: string
  photo?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export interface Schedule {
  id: string
  time: string
  title: string
  description: string
  speaker?: string
  duration: number // minutes
  location?: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
}

export interface Sponsor {
  id: string
  name: string
  logo: string
  website?: string
  tier: 'PLATINUM' | 'GOLD' | 'SILVER' | 'BRONZE'
}

// ==================== Event Types ====================

export interface Event {
  id: string
  organizerId: string
  organizerName: string

  // Basic Info
  title: string
  slug: string // URL-friendly identifier
  category: EventCategory
  description: string
  shortDescription: string

  // Date & Time
  startDate: string
  endDate: string
  timezone: string

  // Location
  venue: {
    name: string
    address: string
    city: string
    state: string
    country: string
    coordinates?: {
      lat: number
      lng: number
    }
    capacity?: number
  }
  isVirtual: boolean
  virtualEventUrl?: string

  // Landing Page
  landingPage: {
    heroImage: string
    heroVideo?: string
    theme: {
      primaryColor: string
      secondaryColor: string
      fontFamily: string
    }
    sections: LandingPageSection[]
    speakers: Speaker[]
    schedule: Schedule[]
    faqs: FAQ[]
    sponsors: Sponsor[]
  }

  // Status & Visibility
  status: EventStatus
  isPublished: boolean
  publishedAt?: string

  // Settings
  settings: {
    allowWaitlist: boolean
    requireApproval: boolean
    showAttendeesCount: boolean
    enableQuestions: boolean
    sendReminders: boolean
    allowTransfers: boolean
  }

  // Stats
  stats: {
    totalTickets: number
    soldTickets: number
    revenue: number
    views: number
    shares: number
  }

  createdAt: string
  updatedAt: string
}

export interface TicketTier {
  id: string
  eventId: string

  // Basic Info
  name: string
  type: TicketType
  description: string

  // Pricing
  price: number
  currency: string

  // Availability
  quantity: number
  sold: number
  status: TicketStatus

  // Sale Period
  salesStart: string
  salesEnd: string

  // Limits
  minPerOrder: number
  maxPerOrder: number

  // Benefits
  benefits: string[]

  // Settings
  isVisible: boolean
  requiresApproval: boolean

  createdAt: string
}

// ==================== Order & Purchase Types ====================

export interface TicketOrder {
  id: string
  eventId: string
  eventTitle: string
  buyerId: string
  buyerEmail: string
  buyerName: string

  // Order Details
  tickets: {
    tierId: string
    tierName: string
    quantity: number
    price: number
  }[]

  // Totals
  subtotal: number
  fees: number
  taxes: number
  total: number
  currency: string

  // Payment
  paymentMethod: PaymentMethod
  paymentStatus: OrderStatus
  paidAt?: string

  // Attendee Info
  attendees: Attendee[]

  // Order Status
  status: OrderStatus
  confirmationCode: string

  // Metadata
  orderNotes?: string
  createdAt: string
  updatedAt: string
}

export interface Attendee {
  id: string
  orderId: string
  ticketId: string

  // Personal Info
  firstName: string
  lastName: string
  email: string
  phone?: string

  // Ticket Info
  ticketTier: string
  ticketNumber: string
  qrCode: string

  // Status
  status: AttendeeStatus
  checkInTime?: string
  checkInLocation?: string

  // Custom Fields
  customFields?: Record<string, string>

  createdAt: string
}

// ==================== Analytics Types ====================

export interface EventAnalytics {
  eventId: string

  // Traffic
  pageViews: number
  uniqueVisitors: number
  averageTimeOnPage: number

  // Conversion
  ticketViews: number
  addToCartRate: number
  conversionRate: number
  abandonedCarts: number

  // Sales
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  revenueByTier: Record<string, number>

  // Timeline
  salesByDay: {
    date: string
    sales: number
    revenue: number
  }[]

  // Demographics
  attendeesByCountry: Record<string, number>
  attendeesByAgeGroup: Record<string, number>

  // Engagement
  socialShares: number
  emailOpens: number
  emailClicks: number
}

// ==================== Sharing & Promotion Types ====================

export interface ShareableLink {
  id: string
  eventId: string
  url: string
  shortUrl: string

  // Tracking
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string

  // Stats
  clicks: number
  conversions: number
  revenue: number

  createdAt: string
  createdBy: string
}

export interface EmailCampaign {
  id: string
  eventId: string

  // Campaign Details
  name: string
  subject: string
  preheader: string
  content: string

  // Recipients
  recipientList: 'ALL' | 'PURCHASED' | 'REGISTERED' | 'CUSTOM'
  recipientCount: number

  // Schedule
  scheduledFor?: string
  sentAt?: string

  // Stats
  sent: number
  delivered: number
  opened: number
  clicked: number
  bounced: number

  createdAt: string
}

// ==================== Check-in Types ====================

export interface CheckInStation {
  id: string
  eventId: string
  name: string
  location: string
  assignedStaff: string[]
  isActive: boolean
}

export interface CheckInLog {
  id: string
  attendeeId: string
  ticketNumber: string
  stationId: string
  staffId: string
  checkInTime: string
  method: 'QR_CODE' | 'MANUAL' | 'NFC'
}

// ==================== Helper Functions ====================

export function calculateTicketAvailability(tier: TicketTier): number {
  return tier.quantity - tier.sold
}

export function isTicketSaleActive(tier: TicketTier): boolean {
  const now = new Date()
  const start = new Date(tier.salesStart)
  const end = new Date(tier.salesEnd)

  return now >= start && now <= end && tier.status === 'AVAILABLE'
}

export function calculateOrderTotal(
  tickets: { price: number; quantity: number }[],
  feePercentage: number = 0.05,
  taxPercentage: number = 0
): { subtotal: number; fees: number; taxes: number; total: number } {
  const subtotal = tickets.reduce((sum, t) => sum + t.price * t.quantity, 0)
  const fees = subtotal * feePercentage
  const taxes = subtotal * taxPercentage
  const total = subtotal + fees + taxes

  return { subtotal, fees, taxes, total }
}

export function generateTicketNumber(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `TKT-${timestamp}-${random}`.toUpperCase()
}

export function generateQRCode(ticketNumber: string): string {
  // In production, this would generate an actual QR code
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${ticketNumber}`
}

export function getEventShareUrl(slug: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}/events/${slug}`
}

export function getEventStatus(event: Event): {
  status: string
  color: string
  message: string
} {
  const now = new Date()
  const start = new Date(event.startDate)
  const end = new Date(event.endDate)

  if (event.status === 'CANCELLED') {
    return { status: 'CANCELLED', color: 'red', message: 'This event has been cancelled' }
  }

  if (event.status === 'POSTPONED') {
    return { status: 'POSTPONED', color: 'orange', message: 'This event has been postponed' }
  }

  if (event.status === 'SOLD_OUT') {
    return { status: 'SOLD_OUT', color: 'yellow', message: 'All tickets are sold out' }
  }

  if (now > end) {
    return { status: 'COMPLETED', color: 'gray', message: 'This event has ended' }
  }

  if (now >= start && now <= end) {
    return { status: 'IN_PROGRESS', color: 'green', message: 'Event is happening now!' }
  }

  const daysUntilStart = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (daysUntilStart <= 7) {
    return { status: 'UPCOMING', color: 'blue', message: `Event starts in ${daysUntilStart} days` }
  }

  return { status: 'PUBLISHED', color: 'green', message: 'Tickets available' }
}
