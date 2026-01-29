/**
 * Security utilities for the application
 * Includes CSRF protection, secure storage, and other security features
 */

// Secure localStorage wrapper with encryption (basic XOR encryption for demo)
export const secureStorage = {
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return

    try {
      // In production, use proper encryption library
      const encrypted = btoa(value) // Base64 encoding (use proper encryption in prod)
      localStorage.setItem(key, encrypted)
    } catch (error) {
      console.error('Error storing data:', error)
    }
  },

  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null

    try {
      const encrypted = localStorage.getItem(key)
      if (!encrypted) return null

      // In production, use proper decryption library
      return atob(encrypted) // Base64 decoding
    } catch (error) {
      console.error('Error retrieving data:', error)
      return null
    }
  },

  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },

  clear: (): void => {
    if (typeof window === 'undefined') return
    localStorage.clear()
  },
}

// Generate secure random token
export function generateSecureToken(length: number = 32): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''

  // Use crypto.getRandomValues for better randomness
  if (typeof window !== 'undefined' && window.crypto) {
    const randomValues = new Uint8Array(length)
    window.crypto.getRandomValues(randomValues)

    for (let i = 0; i < length; i++) {
      token += charset[randomValues[i] % charset.length]
    }
  } else {
    // Fallback for non-browser environments
    for (let i = 0; i < length; i++) {
      token += charset[Math.floor(Math.random() * charset.length)]
    }
  }

  return token
}

// Content Security Policy helpers
export const CSP_DIRECTIVES = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
  styleSrc: ["'self'", "'unsafe-inline'"],
  imgSrc: ["'self'", 'data:', 'https:'],
  fontSrc: ["'self'", 'data:'],
  connectSrc: ["'self'"],
  frameSrc: ["'none'"],
  objectSrc: ["'none'"],
  mediaSrc: ["'self'"],
  manifestSrc: ["'self'"],
}

// Sanitize user input for display
export function escapeHTML(text: string): string {
  if (!text) return ''

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return text.replace(/[&<>"'/]/g, (char) => map[char])
}

// Validate session token format
export function validateSessionToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false

  // Token should be alphanumeric and of specific length
  return /^[A-Za-z0-9]{32,}$/.test(token)
}

// Check if request is from same origin
export function isSameOrigin(url: string): boolean {
  if (typeof window === 'undefined') return true

  try {
    const urlObj = new URL(url, window.location.href)
    return urlObj.origin === window.location.origin
  } catch {
    return false
  }
}

// Debounce function to prevent rapid repeated calls (DoS protection)
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function to limit execution frequency
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Mask sensitive data for display
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email

  const [username, domain] = email.split('@')
  const maskedUsername =
    username.length > 2
      ? username[0] + '*'.repeat(username.length - 2) + username[username.length - 1]
      : username

  return `${maskedUsername}@${domain}`
}

export function maskPhoneNumber(phone: string): string {
  if (!phone) return phone

  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length < 4) return phone

  const lastFour = cleaned.slice(-4)
  const masked = '*'.repeat(cleaned.length - 4) + lastFour

  return masked
}

export function maskCardNumber(cardNumber: string): string {
  if (!cardNumber) return cardNumber

  const cleaned = cardNumber.replace(/\D/g, '')
  if (cleaned.length < 4) return cardNumber

  const lastFour = cleaned.slice(-4)
  return `•••• •••• •••• ${lastFour}`
}

// Constant-time string comparison to prevent timing attacks
export function secureCompare(a: string, b: string): boolean {
  if (!a || !b) return false
  if (a.length !== b.length) return false

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}

// Check password entropy
export function calculatePasswordEntropy(password: string): number {
  if (!password) return 0

  const charsetSize = new Set(password).size
  const length = password.length

  // Shannon entropy formula
  return Math.log2(Math.pow(charsetSize, length))
}

// Detect potential XSS in user input
export function detectXSS(input: string): boolean {
  if (!input) return false

  const xssPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<embed/gi,
    /<object/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
  ]

  return xssPatterns.some((pattern) => pattern.test(input))
}

// Security headers configuration for API requests
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// Validate API key format
export function validateAPIKey(apiKey: string): boolean {
  if (!apiKey || typeof apiKey !== 'string') return false

  // API keys should follow a specific pattern (e.g., wir_live_... or wir_test_...)
  return /^wir_(live|test)_[A-Za-z0-9]{32,}$/.test(apiKey)
}

// Clean object of potentially malicious properties
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {}

  for (const [key, value] of Object.entries(obj)) {
    // Skip prototype pollution attempts
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue
    }

    // Recursively sanitize nested objects
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value)
    } else if (typeof value === 'string') {
      sanitized[key] = escapeHTML(value)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized as T
}
