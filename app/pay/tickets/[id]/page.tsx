'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import {
  CreditCard,
  Smartphone,
  Lock,
  Shield,
  CheckCircle2,
  Loader2,
  Calendar,
  MapPin,
  Clock,
  Minus,
  Plus,
  Ticket,
  Users,
  ArrowRight,
  Info,
  Download,
  Mail,
  QrCode,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency } from '@/lib/utils'

type PaymentMethod = 'card' | 'mobile-money' | 'wallet'
type CheckoutStep = 'tickets' | 'details' | 'payment' | 'processing' | 'success'

interface TicketType {
  id: string
  name: string
  description: string
  price: number
  available: number
  maxPerOrder: number
}

export default function TicketCheckoutPage() {
  const params = useParams()
  const eventId = params.id as string

  const [step, setStep] = useState<CheckoutStep>('tickets')
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Ticket selection
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({
    'general': 0,
    'vip': 0,
    'vvip': 0,
  })

  // Attendee info
  const [attendeeInfo, setAttendeeInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  // Card form
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardName, setCardName] = useState('')

  // Event details
  const event = {
    id: eventId,
    name: 'Afrobeats Music Festival 2026',
    date: 'Saturday, March 15, 2026',
    time: '4:00 PM - 11:00 PM',
    venue: 'National Stadium, Lagos',
    image: '/images/event-banner.jpg',
    organizer: 'LiveEvents Africa',
  }

  const ticketTypes: TicketType[] = [
    {
      id: 'general',
      name: 'General Admission',
      description: 'Standing area access',
      price: 50,
      available: 500,
      maxPerOrder: 10,
    },
    {
      id: 'vip',
      name: 'VIP',
      description: 'Reserved seating + Meet & Greet',
      price: 150,
      available: 100,
      maxPerOrder: 6,
    },
    {
      id: 'vvip',
      name: 'VVIP',
      description: 'Front row + Backstage access + Gift bag',
      price: 350,
      available: 20,
      maxPerOrder: 4,
    },
  ]

  const updateTicketQuantity = (ticketId: string, delta: number) => {
    const ticket = ticketTypes.find(t => t.id === ticketId)
    if (!ticket) return

    setTicketQuantities(prev => ({
      ...prev,
      [ticketId]: Math.max(0, Math.min(ticket.maxPerOrder, prev[ticketId] + delta)),
    }))
  }

  const totalTickets = Object.values(ticketQuantities).reduce((sum, qty) => sum + qty, 0)
  const subtotal = ticketTypes.reduce((sum, ticket) => {
    return sum + ticket.price * ticketQuantities[ticket.id]
  }, 0)
  const serviceFee = subtotal * 0.05
  const total = subtotal + serviceFee

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const parts = []
    for (let i = 0; i < v.length && i < 16; i += 4) {
      parts.push(v.substring(i, i + 4))
    }
    return parts.join(' ')
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handlePayment = async () => {
    setStep('processing')
    await new Promise(resolve => setTimeout(resolve, 3000))
    setStep('success')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Event Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary-500 to-primary-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-6">
          <div className="text-white">
            <p className="text-sm font-medium mb-1 opacity-80">{event.organizer}</p>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{event.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {event.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {event.venue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {step !== 'success' && step !== 'processing' && (
        <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-center gap-8">
              {[
                { key: 'tickets', label: 'Select Tickets' },
                { key: 'details', label: 'Your Details' },
                { key: 'payment', label: 'Payment' },
              ].map((s, index) => (
                <div key={s.key} className="flex items-center">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                      step === s.key
                        ? 'bg-primary-500 text-white'
                        : ['tickets', 'details', 'payment'].indexOf(step) > index
                        ? 'bg-success text-white'
                        : 'bg-gray-200 dark:bg-dark-border text-gray-500'
                    )}
                  >
                    {['tickets', 'details', 'payment'].indexOf(step) > index ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      'ml-2 text-sm font-medium hidden sm:inline',
                      step === s.key ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                    )}
                  >
                    {s.label}
                  </span>
                  {index < 2 && (
                    <div className="w-12 h-0.5 bg-gray-200 dark:bg-dark-border mx-4 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ticket Selection */}
        {step === 'tickets' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Select Tickets</h2>

              {ticketTypes.map((ticket) => (
                <div
                  key={ticket.id}
                  className={cn(
                    'bg-white dark:bg-dark-surface rounded-2xl border p-5 transition-all',
                    ticketQuantities[ticket.id] > 0
                      ? 'border-primary-500 ring-1 ring-primary-500'
                      : 'border-gray-200 dark:border-dark-border'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Ticket className="w-5 h-5 text-primary-500" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">{ticket.name}</h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{ticket.description}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(ticket.price, 'USD')}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {ticket.available} available • Max {ticket.maxPerOrder} per order
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateTicketQuantity(ticket.id, -1)}
                        disabled={ticketQuantities[ticket.id] === 0}
                        className="w-10 h-10 rounded-xl border border-gray-200 dark:border-dark-border flex items-center justify-center hover:bg-gray-50 dark:hover:bg-dark-elevated disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-lg font-semibold">{ticketQuantities[ticket.id]}</span>
                      <button
                        onClick={() => updateTicketQuantity(ticket.id, 1)}
                        disabled={ticketQuantities[ticket.id] >= ticket.maxPerOrder}
                        className="w-10 h-10 rounded-xl border border-gray-200 dark:border-dark-border flex items-center justify-center hover:bg-gray-50 dark:hover:bg-dark-elevated disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>

                {totalTickets > 0 ? (
                  <>
                    <div className="space-y-3 mb-4">
                      {ticketTypes.map((ticket) => {
                        if (ticketQuantities[ticket.id] === 0) return null
                        return (
                          <div key={ticket.id} className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              {ticket.name} x {ticketQuantities[ticket.id]}
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {formatCurrency(ticket.price * ticketQuantities[ticket.id], 'USD')}
                            </span>
                          </div>
                        )
                      })}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Service Fee</span>
                        <span className="text-gray-900 dark:text-white">{formatCurrency(serviceFee, 'USD')}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-dark-border pt-4 mb-6">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {formatCurrency(total, 'USD')}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full"
                      onClick={() => setStep('details')}
                    >
                      Continue
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Select tickets to continue</p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  <span>Secure checkout by Wiremi</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attendee Details */}
        {step === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Details</h2>

              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={attendeeInfo.firstName}
                      onChange={(e) => setAttendeeInfo({ ...attendeeInfo, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={attendeeInfo.lastName}
                      onChange={(e) => setAttendeeInfo({ ...attendeeInfo, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={attendeeInfo.email}
                      onChange={(e) => setAttendeeInfo({ ...attendeeInfo, email: e.target.value })}
                      placeholder="Tickets will be sent here"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={attendeeInfo.phone}
                      onChange={(e) => setAttendeeInfo({ ...attendeeInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                  <div className="flex gap-2">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Your tickets will be sent to this email address. Make sure it's correct!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{event.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.venue}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {totalTickets} ticket{totalTickets !== 1 && 's'}
                  </p>
                </div>

                <div className="border-t border-gray-200 dark:border-dark-border pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(total, 'USD')}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setStep('payment')}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Payment */}
        {step === 'payment' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment</h2>

              {/* Payment Methods */}
              <div className="space-y-3 mb-6">
                {[
                  { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5" /> },
                  { id: 'mobile-money', name: 'Mobile Money', icon: <Smartphone className="w-5 h-5" /> },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                    className={cn(
                      'w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4',
                      selectedMethod === method.id
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface hover:border-gray-300'
                    )}
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center',
                      selectedMethod === method.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                        : 'bg-gray-100 dark:bg-dark-elevated text-gray-500'
                    )}>
                      {method.icon}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{method.name}</span>
                  </button>
                ))}
              </div>

              {/* Card Form */}
              {selectedMethod === 'card' && (
                <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expiry
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        maxLength={5}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        maxLength={4}
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 sticky top-24">
                <div className="border-b border-gray-200 dark:border-dark-border pb-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{formatCurrency(subtotal, 'USD')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Service Fee</span>
                    <span>{formatCurrency(serviceFee, 'USD')}</span>
                  </div>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(total, 'USD')}
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handlePayment}
                  disabled={!selectedMethod}
                >
                  Pay {formatCurrency(total, 'USD')}
                </Button>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Shield className="w-3 h-3" />
                  <span>Secure payment by Wiremi</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing */}
        {step === 'processing' && (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-primary-600 dark:text-primary-400 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Processing Payment</h2>
            <p className="text-gray-600 dark:text-gray-400">Please wait...</p>
          </div>
        )}

        {/* Success */}
        {step === 'success' && (
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You're all set!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your tickets have been confirmed. Check your email for details.
            </p>

            {/* Ticket Card */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white text-left mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm opacity-80 mb-1">{event.organizer}</p>
                  <h3 className="text-xl font-bold">{event.name}</h3>
                </div>
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-gray-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <p className="opacity-70">Date</p>
                  <p className="font-medium">{event.date}</p>
                </div>
                <div>
                  <p className="opacity-70">Time</p>
                  <p className="font-medium">{event.time}</p>
                </div>
                <div>
                  <p className="opacity-70">Venue</p>
                  <p className="font-medium">{event.venue}</p>
                </div>
                <div>
                  <p className="opacity-70">Tickets</p>
                  <p className="font-medium">{totalTickets} ticket{totalTickets !== 1 && 's'}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-sm opacity-70">Order #TKT-2026031545</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="primary" size="lg" className="flex-1" icon={<Download className="w-5 h-5" />} iconPosition="left">
                Download Tickets
              </Button>
              <Button variant="outline" size="lg" className="flex-1" icon={<Mail className="w-5 h-5" />} iconPosition="left">
                Send to Email
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
