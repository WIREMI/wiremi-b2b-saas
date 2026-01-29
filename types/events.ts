export type EventStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled'
export type TicketStatus = 'available' | 'sold-out' | 'unavailable'
export type AttendeeStatus = 'registered' | 'checked-in' | 'no-show' | 'cancelled'
export type EventCategory = 'conference' | 'concert' | 'workshop' | 'sports' | 'networking' | 'other'

export interface Event {
  id: string
  eventCode: string
  name: string
  description: string
  category: EventCategory
  venue: string
  address: string
  startDateTime: string
  endDateTime: string
  status: EventStatus
  capacity: number
  ticketsSold: number
  ticketsAvailable: number
  totalRevenue: number
  currency: string
  bannerImage?: string
  organizerName: string
  organizerEmail: string
  createdAt: string
}

export interface TicketType {
  id: string
  eventId: string
  name: string
  description?: string
  price: number
  currency: string
  quantity: number
  quantitySold: number
  status: TicketStatus
  benefits?: string[]
  salesStart: string
  salesEnd: string
}

export interface Attendee {
  id: string
  ticketCode: string
  eventId: string
  ticketTypeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  ticketPrice: number
  purchaseDate: string
  status: AttendeeStatus
  checkedIn: boolean
  checkInTime?: string
  qrCode?: string
}
