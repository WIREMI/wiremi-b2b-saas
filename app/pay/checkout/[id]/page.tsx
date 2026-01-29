'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  ChevronRight,
  Lock,
  Shield,
  CheckCircle2,
  ArrowLeft,
  Zap,
  Loader2,
  Minus,
  Plus,
  Trash2,
  Tag,
  Truck,
  Info,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatCurrency } from '@/lib/utils'

type PaymentMethod = 'card' | 'mobile-money' | 'bank-transfer' | 'wallet'
type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'processing' | 'success'

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image: string
}

export default function EcommerceCheckoutPage() {
  const params = useParams()
  const checkoutId = params.id as string

  const [step, setStep] = useState<CheckoutStep>('cart')
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      description: 'Noise-cancelling, 40hr battery',
      price: 299.99,
      quantity: 1,
      image: '/images/product-1.jpg',
    },
    {
      id: '2',
      name: 'USB-C Fast Charging Cable',
      description: '2m braided cable',
      price: 24.99,
      quantity: 2,
      image: '/images/product-2.jpg',
    },
  ])

  // Shipping info
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  })

  // Card form
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardName, setCardName] = useState('')

  // Merchant info
  const merchant = {
    name: 'TechStore Pro',
    logo: '/images/wiremi-icon.png',
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shipping + tax

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true)
    }
  }

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
      {/* Header */}
      <header className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{merchant.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      {step !== 'success' && step !== 'processing' && (
        <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-center gap-4">
              {['cart', 'shipping', 'payment'].map((s, index) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                      step === s
                        ? 'bg-primary-500 text-white'
                        : ['cart', 'shipping', 'payment'].indexOf(step) > index
                        ? 'bg-success text-white'
                        : 'bg-gray-200 dark:bg-dark-border text-gray-500'
                    )}
                  >
                    {['cart', 'shipping', 'payment'].indexOf(step) > index ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      'ml-2 text-sm font-medium capitalize hidden sm:inline',
                      step === s ? 'text-gray-900 dark:text-white' : 'text-gray-500'
                    )}
                  >
                    {s}
                  </span>
                  {index < 2 && (
                    <ChevronRight className="w-5 h-5 text-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cart Step */}
        {step === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h2>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-4 flex gap-4"
                >
                  <div className="w-24 h-24 bg-gray-100 dark:bg-dark-elevated rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-gray-400 hover:text-error transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg border border-gray-200 dark:border-dark-border flex items-center justify-center hover:bg-gray-50 dark:hover:bg-dark-elevated"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg border border-gray-200 dark:border-dark-border flex items-center justify-center hover:bg-gray-50 dark:hover:bg-dark-elevated"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatCurrency(item.price * item.quantity, 'USD')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code */}
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-4">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      disabled={promoApplied}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <Button
                    variant={promoApplied ? 'secondary' : 'primary'}
                    onClick={applyPromo}
                    disabled={promoApplied || !promoCode}
                  >
                    {promoApplied ? 'Applied!' : 'Apply'}
                  </Button>
                </div>
                {promoApplied && (
                  <p className="mt-2 text-sm text-success flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    10% discount applied!
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900 dark:text-white">{formatCurrency(subtotal, 'USD')}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount (10%)</span>
                      <span>-{formatCurrency(discount, 'USD')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-gray-900 dark:text-white">
                      {shipping === 0 ? 'FREE' : formatCurrency(shipping, 'USD')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span className="text-gray-900 dark:text-white">{formatCurrency(tax, 'USD')}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-dark-border pt-3 flex justify-between">
                    <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(total, 'USD')}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full mt-6"
                  onClick={() => setStep('shipping')}
                >
                  Continue to Shipping
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  <span>Secure checkout powered by Wiremi</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shipping Step */}
        {step === 'shipping' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setStep('cart')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-elevated rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shipping Information</h2>
              </div>

              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Shipping Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-primary-500 rounded-xl cursor-pointer bg-primary-50 dark:bg-primary-900/20">
                      <input type="radio" name="shipping" defaultChecked className="sr-only" />
                      <Truck className="w-5 h-5 text-primary-600 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">Standard Shipping</p>
                        <p className="text-sm text-gray-500">5-7 business days</p>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {shipping === 0 ? 'FREE' : formatCurrency(shipping, 'USD')}
                      </span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-200 dark:border-dark-border rounded-xl cursor-pointer hover:border-gray-300">
                      <input type="radio" name="shipping" className="sr-only" />
                      <Truck className="w-5 h-5 text-gray-400 mr-3" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">Express Shipping</p>
                        <p className="text-sm text-gray-500">2-3 business days</p>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">$19.99</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-gray-500">{item.name} x{item.quantity}</span>
                      <span className="text-gray-900 dark:text-white">
                        {formatCurrency(item.price * item.quantity, 'USD')}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 dark:border-dark-border pt-3 flex justify-between">
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

        {/* Payment Step */}
        {step === 'payment' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setStep('shipping')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-dark-elevated rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 mb-6">
                {[
                  { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard className="w-5 h-5" /> },
                  { id: 'mobile-money', name: 'Mobile Money', icon: <Smartphone className="w-5 h-5" /> },
                  { id: 'wallet', name: 'Wiremi Wallet', icon: <Wallet className="w-5 h-5" /> },
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{formatCurrency(subtotal, 'USD')}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-{formatCurrency(discount, 'USD')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping, 'USD')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>{formatCurrency(tax, 'USD')}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-dark-border pt-3 flex justify-between">
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
                  onClick={handlePayment}
                  disabled={!selectedMethod}
                >
                  Pay {formatCurrency(total, 'USD')}
                </Button>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Shield className="w-3 h-3" />
                  <span>Your payment is secure and encrypted</span>
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
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for your purchase. A confirmation email has been sent.
            </p>
            <div className="bg-gray-50 dark:bg-dark-surface rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="text-xl font-bold font-mono text-gray-900 dark:text-white">ORD-2026012845</p>
            </div>
            <Button variant="primary" size="lg">
              Track Order
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
