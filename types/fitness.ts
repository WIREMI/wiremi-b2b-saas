export type MembershipStatus = 'active' | 'expired' | 'suspended' | 'cancelled'
export type MembershipTier = 'basic' | 'premium' | 'vip'
export type ClassCategory = 'yoga' | 'spinning' | 'zumba' | 'strength' | 'cardio' | 'pilates' | 'boxing'
export type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'failed'

export interface Member {
  id: string
  memberCode: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  membershipTier: MembershipTier
  membershipStatus: MembershipStatus
  joinDate: string
  expiryDate: string
  lastCheckIn?: string
  totalCheckIns: number
  photoUrl?: string
  medicalNotes?: string
}

export interface FitnessClass {
  id: string
  name: string
  description: string
  instructor: string
  instructorId: string
  category: ClassCategory
  schedule: {
    dayOfWeek: number // 0-6 (Sunday-Saturday)
    startTime: string // 'HH:mm'
    duration: number // minutes
  }
  capacity: number
  enrolled: number
  location: string
  equipment?: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface MembershipPlan {
  id: string
  name: string
  tier: MembershipTier
  description: string
  price: number
  billingCycle: 'monthly' | 'quarterly' | 'annual'
  benefits: string[]
  classesPerWeek?: number
  personalTrainingSessions?: number
  currency: string
}

export interface Trainer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  specializations: string[]
  certifications: string[]
  activeClasses: number
  rating: number
  photoUrl?: string
  bio?: string
}

export interface CheckIn {
  id: string
  memberId: string
  checkInTime: string
  checkOutTime?: string
  classId?: string
  duration?: number
}

export interface Payment {
  id: string
  memberId: string
  amount: number
  currency: string
  paymentDate: string
  dueDate: string
  status: PaymentStatus
  billingPeriod: string
  paymentMethod: 'card' | 'cash' | 'bank-transfer'
  reference?: string
}
