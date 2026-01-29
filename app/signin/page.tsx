'use client'

import { useState, useEffect, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Mail,
  Phone,
  ArrowRight,
  Shield,
  Globe,
  CreditCard,
  Send,
  BarChart3,
  Users,
  Zap,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lock,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'
import { useToast } from '@/components/ui/toast'
import { isValidEmail, cn } from '@/lib/utils'

// Carousel slides showcasing Wiremi features - using consistent primary color scheme
const carouselSlides = [
  {
    id: 1,
    title: 'Global Accounts',
    subtitle: 'Receive payments in 20+ currencies',
    description: 'Open local currency accounts instantly. Receive payments like a local business in any market.',
    icon: <Globe className="w-8 h-8" />,
    gradient: 'from-primary-500 to-primary-600',
    features: ['Unique account details', 'No conversion fees', 'Same-day settlements'],
    stat: '150+',
    statLabel: 'Countries supported',
  },
  {
    id: 2,
    title: 'Corporate Cards',
    subtitle: 'Control spending in real-time',
    description: 'Issue virtual and physical cards for your team. Set limits, track expenses, and manage budgets effortlessly.',
    icon: <CreditCard className="w-8 h-8" />,
    gradient: 'from-primary-600 to-indigo-600',
    features: ['Instant virtual cards', 'Custom spend limits', 'Receipt capture'],
    stat: '0%',
    statLabel: 'International fees',
  },
  {
    id: 3,
    title: 'Global Payouts',
    subtitle: 'Pay anyone, anywhere',
    description: 'Send payments to 150+ countries in 60+ currencies. Batch payments, vendor management, and more.',
    icon: <Send className="w-8 h-8" />,
    gradient: 'from-indigo-500 to-primary-600',
    features: ['Same-day delivery', 'Batch transfers', 'Interbank rates'],
    stat: '60+',
    statLabel: 'Currencies',
  },
  {
    id: 4,
    title: 'Business Analytics',
    subtitle: 'AI-powered insights',
    description: 'Get real-time visibility into your finances. AI-powered forecasting and actionable insights.',
    icon: <BarChart3 className="w-8 h-8" />,
    gradient: 'from-primary-400 to-primary-600',
    features: ['Cash flow forecasting', 'Expense analytics', 'Custom reports'],
    stat: '99.9%',
    statLabel: 'Uptime SLA',
  },
]

export default function SignInPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Auto-rotate carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentSlide(index)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email address is required'
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    } else {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required'
      } else if (!/^[+]?[\d\s()-]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    showToast({
      type: 'success',
      title: 'Welcome to Wiremi!',
      message: 'Accessing your dashboard...',
    })

    setTimeout(() => {
      router.push('/dashboard')
    }, 800)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const currentSlideData = carouselSlides[currentSlide]

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Feature Showcase Carousel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-between p-8 xl:p-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">WIREMI</h2>
              <p className="text-xs text-gray-400">Business Finance Platform</p>
            </div>
          </div>

          {/* Carousel Content */}
          <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full py-12">
            {/* Slide Content */}
            <div className="relative">
              {carouselSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={cn(
                    'transition-all duration-700 ease-out',
                    index === currentSlide
                      ? 'opacity-100 translate-x-0'
                      : index < currentSlide
                      ? 'opacity-0 -translate-x-8 absolute inset-0'
                      : 'opacity-0 translate-x-8 absolute inset-0'
                  )}
                >
                  {/* Icon Badge */}
                  <div className={cn(
                    'inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br mb-6 shadow-lg',
                    slide.gradient
                  )}>
                    {slide.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl xl:text-5xl font-bold text-white mb-3 tracking-tight">
                    {slide.title}
                  </h3>
                  <p className="text-lg text-primary-400 font-medium mb-4">
                    {slide.subtitle}
                  </p>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {slide.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {slide.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stat Highlight */}
                  <div className="inline-flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                    <div className={cn('w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center', slide.gradient)}>
                      <span className="text-xl font-bold text-white">{slide.stat}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{slide.statLabel}</p>
                      <p className="text-sm text-gray-400">and growing</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-12">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      index === currentSlide
                        ? 'w-8 bg-primary-500'
                        : 'w-2 bg-gray-600 hover:bg-gray-500'
                    )}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div className="grid grid-cols-3 gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">$2B+</p>
              <p className="text-sm text-gray-400">Processed annually</p>
            </div>
            <div className="text-center border-x border-white/10">
              <p className="text-2xl font-bold text-white">50K+</p>
              <p className="text-sm text-gray-400">Active businesses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-sm text-gray-400">Platform uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex flex-col bg-white dark:bg-dark-bg">
        {/* Mobile Logo Header */}
        <div className="lg:hidden p-6 border-b border-gray-100 dark:border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">WIREMI</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to continue to your dashboard
              </p>
            </div>

            {/* Login Method Toggle */}
            <div className="flex gap-2 mb-6 p-1.5 bg-gray-100 dark:bg-dark-surface rounded-xl">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all',
                  loginMethod === 'email'
                    ? 'bg-white dark:bg-dark-elevated text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all',
                  loginMethod === 'phone'
                    ? 'bg-white dark:bg-dark-elevated text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Phone className="w-4 h-4" />
                Phone
              </button>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {loginMethod === 'email' ? (
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  icon={<Mail className="w-5 h-5" />}
                  iconPosition="left"
                  required
                  disabled={isLoading}
                />
              ) : (
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                  icon={<Phone className="w-5 h-5" />}
                  iconPosition="left"
                  required
                  disabled={isLoading}
                />
              )}

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
                required
                disabled={isLoading}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-500 hover:text-primary-600"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                loading={isLoading}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Sign In
              </Button>
            </form>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Lock className="w-4 h-4" />
              <span>256-bit SSL encrypted connection</span>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-dark-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-dark-bg text-gray-500">
                  New to Wiremi?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link href="/signup">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
              >
                Create Business Account
              </Button>
            </Link>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-primary-500 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary-500 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Powered By Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-dark-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Powered by</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">WIREMI</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                PCI DSS Compliant
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                GDPR Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
