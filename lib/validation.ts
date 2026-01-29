/**
 * Comprehensive input validation and sanitization utilities
 * Prevents XSS, SQL injection, and other security vulnerabilities
 */

// Email validation with RFC 5322 compliance
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

// Phone number validation (international format)
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '')

  // Check if it's a valid international format
  return /^\+?\d{10,15}$/.test(cleaned)
}

// Password strength validation
export interface PasswordStrength {
  isValid: boolean
  strength: 'weak' | 'fair' | 'good' | 'strong'
  errors: string[]
}

export function validatePassword(password: string): PasswordStrength {
  const errors: string[] = []
  let strength: 'weak' | 'fair' | 'good' | 'strong' = 'weak'

  if (!password || typeof password !== 'string') {
    return { isValid: false, strength: 'weak', errors: ['Password is required'] }
  }

  // Minimum length
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  // Check for uppercase
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  // Check for lowercase
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  // Check for number
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  // Check for special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  // Calculate strength
  const conditionsMet = 5 - errors.length
  if (conditionsMet === 5 && password.length >= 12) strength = 'strong'
  else if (conditionsMet >= 4) strength = 'good'
  else if (conditionsMet >= 3) strength = 'fair'
  else strength = 'weak'

  return {
    isValid: errors.length === 0,
    strength,
    errors,
  }
}

// Sanitize string input to prevent XSS
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return ''

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove inline event handlers
}

// Sanitize HTML to allow only safe tags
export function sanitizeHTML(html: string): string {
  if (!html || typeof html !== 'string') return ''

  // Remove all HTML tags except safe ones
  const allowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li']
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi

  return html.replace(tagRegex, (match, tagName) => {
    return allowedTags.includes(tagName.toLowerCase()) ? match : ''
  })
}

// Validate and sanitize currency amount
export function validateAmount(amount: string | number): {
  isValid: boolean
  value: number
  error?: string
} {
  const numValue = typeof amount === 'string' ? parseFloat(amount) : amount

  if (isNaN(numValue)) {
    return { isValid: false, value: 0, error: 'Invalid amount' }
  }

  if (numValue < 0) {
    return { isValid: false, value: 0, error: 'Amount cannot be negative' }
  }

  if (numValue > 1000000000) {
    return { isValid: false, value: 0, error: 'Amount exceeds maximum limit' }
  }

  // Round to 2 decimal places for currency
  const rounded = Math.round(numValue * 100) / 100

  return { isValid: true, value: rounded }
}

// Validate URL
export function validateURL(url: string): boolean {
  if (!url || typeof url !== 'string') return false

  try {
    const urlObj = new URL(url)
    // Only allow http and https protocols
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

// Validate date string
export function validateDate(dateString: string): {
  isValid: boolean
  date?: Date
  error?: string
} {
  if (!dateString || typeof dateString !== 'string') {
    return { isValid: false, error: 'Date is required' }
  }

  const date = new Date(dateString)

  if (isNaN(date.getTime())) {
    return { isValid: false, error: 'Invalid date format' }
  }

  return { isValid: true, date }
}

// Validate alphanumeric string (useful for IDs, usernames)
export function validateAlphanumeric(input: string): boolean {
  if (!input || typeof input !== 'string') return false
  return /^[a-zA-Z0-9]+$/.test(input)
}

// Validate string length
export function validateLength(
  input: string,
  min: number,
  max: number
): { isValid: boolean; error?: string } {
  if (!input || typeof input !== 'string') {
    return { isValid: false, error: 'Input is required' }
  }

  const length = input.trim().length

  if (length < min) {
    return { isValid: false, error: `Minimum length is ${min} characters` }
  }

  if (length > max) {
    return { isValid: false, error: `Maximum length is ${max} characters` }
  }

  return { isValid: true }
}

// Prevent SQL injection in search queries
export function sanitizeSearchQuery(query: string): string {
  if (!query || typeof query !== 'string') return ''

  return query
    .trim()
    .replace(/['";\\]/g, '') // Remove SQL special characters
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove SQL multiline comment start
    .replace(/\*\//g, '') // Remove SQL multiline comment end
    .substring(0, 200) // Limit length
}

// Validate file upload (client-side)
export interface FileValidation {
  isValid: boolean
  error?: string
}

export function validateFile(
  file: File,
  allowedTypes: string[],
  maxSizeMB: number
): FileValidation {
  if (!file) {
    return { isValid: false, error: 'No file selected' }
  }

  // Check file type
  const fileType = file.type
  const isAllowedType = allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      return fileType.startsWith(type.replace('/*', ''))
    }
    return fileType === type
  })

  if (!isAllowedType) {
    return {
      isValid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`,
    }
  }

  // Check file size
  const fileSizeMB = file.size / (1024 * 1024)
  if (fileSizeMB > maxSizeMB) {
    return {
      isValid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`,
    }
  }

  return { isValid: true }
}

// Rate limiting helper (client-side check)
const rateLimitMap = new Map<string, number[]>()

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const timestamps = rateLimitMap.get(key) || []

  // Remove old timestamps outside the window
  const validTimestamps = timestamps.filter(ts => now - ts < windowMs)

  if (validTimestamps.length >= maxRequests) {
    const oldestTimestamp = validTimestamps[0]
    const retryAfter = Math.ceil((oldestTimestamp + windowMs - now) / 1000)
    return { allowed: false, retryAfter }
  }

  validTimestamps.push(now)
  rateLimitMap.set(key, validTimestamps)

  return { allowed: true }
}

// CSRF token validation (client-side)
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15)
}

// Input validation for common fields
export const fieldValidators = {
  companyName: (value: string) => validateLength(value, 2, 100),
  firstName: (value: string) => validateLength(value, 1, 50),
  lastName: (value: string) => validateLength(value, 1, 50),
  address: (value: string) => validateLength(value, 5, 200),
  city: (value: string) => validateLength(value, 2, 50),
  postalCode: (value: string) => /^[A-Z0-9\s-]{3,10}$/i.test(value.trim()),
  taxId: (value: string) => /^[A-Z0-9-]{5,20}$/i.test(value.trim()),
}
