// Institution Management Types
export type InstitutionStatus = 'draft' | 'submitted' | 'verified' | 'suspended'
export type InstitutionType = 'university' | 'college' | 'school' | 'training-center' | 'polytechnic'

// Hierarchical Structure Types
export type DepartmentLevel = 'undergraduate' | 'postgraduate' | 'diploma' | 'certificate' | 'professional'
export type ProgramType = 'full-time' | 'part-time' | 'online' | 'hybrid' | 'evening' | 'weekend'

// Fee Management Types
export type FeeType = 'tuition' | 'acceptance' | 'lab' | 'exam' | 'accommodation' | 'misc' | 'custom' | 'registration' | 'library' | 'technology' | 'sports' | 'medical'
export type PaymentType = 'one-time' | 'installment' | 'flexible'
export type LateFeeType = 'flat' | 'percentage'

// Team & Permissions Types
export type InstitutionRole = 'super_admin' | 'finance_admin' | 'faculty_admin' | 'department_admin' | 'viewer'
export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'declined'

// Existing Student Types
export type StudentStatus = 'active' | 'graduated' | 'withdrawn' | 'suspended'
export type AcademicLevel = 'undergraduate' | 'graduate' | 'doctorate' | 'diploma' | 'certificate'
export type EnrollmentType = 'full-time' | 'part-time' | 'online' | 'hybrid'
export type PaymentStatus = 'paid' | 'partial' | 'overdue' | 'pending'
export type PaymentMethod = 'cash' | 'card' | 'bank-transfer' | 'mobile-money' | 'check' | 'wallet'
export type ScholarshipType = 'full' | 'partial' | 'merit' | 'need-based' | 'athletic' | 'academic'
export type SessionStatus = 'upcoming' | 'current' | 'completed'

export interface Student {
  id: string
  studentId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  guardianInfo?: {
    name: string
    relationship: string
    phone: string
    email: string
  }
  program: string
  department: string
  level: AcademicLevel
  enrollmentType: EnrollmentType
  status: StudentStatus
  sessionId: string
  enrollmentDate: string
  expectedGraduation: string
  currentSemester?: number
  gpa?: number
  photoUrl?: string
  balance: number
  totalFees: number
  totalPaid: number
  scholarshipId?: string
  createdAt: string
}

export interface FeeStructure {
  id: string
  name: string
  description: string
  level: AcademicLevel
  enrollmentType: EnrollmentType
  sessionId: string
  fees: {
    tuition: number
    registration: number
    library: number
    laboratory: number
    technology: number
    sports: number
    medical: number
    examination: number
    other?: number
  }
  totalAmount: number
  installmentsAllowed: boolean
  numberOfInstallments?: number
  currency: string
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  receiptNumber: string
  studentId: string
  sessionId: string
  amount: number
  currency: string
  paymentDate: string
  dueDate?: string
  status: PaymentStatus
  paymentMethod: PaymentMethod
  reference?: string
  description: string
  feeType: string
  isInstallment: boolean
  installmentNumber?: number
  totalInstallments?: number
  processedBy?: string
  notes?: string
  createdAt: string
}

export interface Scholarship {
  id: string
  name: string
  description: string
  type: ScholarshipType
  amount: number
  percentage?: number
  currency: string
  eligibilityCriteria: string[]
  maxRecipients: number
  currentRecipients: number
  academicYear: string
  isActive: boolean
  sponsor?: string
  startDate: string
  endDate: string
  createdAt: string
}

export interface AcademicSession {
  id: string
  name: string
  code: string
  startDate: string
  endDate: string
  registrationStart: string
  registrationEnd: string
  status: SessionStatus
  totalStudents: number
  totalRevenue: number
  currency: string
  semesters: number
  isCurrent: boolean
  createdAt: string
}

export interface Installment {
  installmentNumber: number
  amount: number
  dueDate: string
  status: PaymentStatus
  paidDate?: string
  paidAmount?: number
}

export interface StudentWithDetails extends Student {
  session?: AcademicSession
  scholarship?: Scholarship
  feeStructure?: FeeStructure
  payments?: Payment[]
  installments?: Installment[]
}

// ============================================
// INSTITUTION MANAGEMENT
// ============================================

export interface Institution {
  id: string
  legalName: string
  displayName: string
  registrationNumber: string
  accreditationId?: string
  type: InstitutionType
  country: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  contactEmail: string
  contactPhone: string
  website?: string
  logo?: string
  brandColor?: string
  defaultCurrency: string
  settlementBankAccount?: {
    bankName: string
    accountNumber: string
    accountName: string
  }
  settlementWalletId?: string
  status: InstitutionStatus
  verifiedAt?: string
  verifiedBy?: string
  totalFaculties: number
  totalDepartments: number
  totalStudents: number
  totalRevenue: number
  outstandingBalance: number
  createdAt: string
  updatedAt: string
}

export interface Faculty {
  id: string
  institutionId: string
  name: string
  code: string
  description?: string
  defaultCurrency: string
  isActive: boolean
  totalDepartments: number
  totalStudents: number
  totalRevenue: number
  outstandingBalance: number
  createdAt: string
  updatedAt: string
}

export interface Department {
  id: string
  facultyId: string
  institutionId: string
  name: string
  code: string
  level: DepartmentLevel
  programType: ProgramType
  description?: string
  isActive: boolean
  totalStudents: number
  totalFeeItems: number
  totalRevenue: number
  outstandingBalance: number
  headOfDepartment?: string
  createdAt: string
  updatedAt: string
}

// ============================================
// FEE MANAGEMENT
// ============================================

export interface FeeItem {
  id: string
  departmentId: string
  facultyId: string
  institutionId: string
  name: string
  description?: string
  feeType: FeeType
  amount: number
  currency: string
  isMandatory: boolean
  paymentType: PaymentType
  installmentConfig?: InstallmentConfig
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface InstallmentConfig {
  numberOfInstallments: number
  minimumPayableAmount: number
  installmentSchedule: {
    installmentNumber: number
    amount: number
    dueDate?: string
  }[]
  lateFeeEnabled: boolean
  gracePeriodDays?: number
  lateFeeType?: LateFeeType
  lateFeeAmount?: number
}

export interface FeeTemplate {
  id: string
  name: string
  description: string
  category: string
  feeItems: {
    name: string
    feeType: FeeType
    amount: number
    isMandatory: boolean
    paymentType: PaymentType
  }[]
  createdAt: string
}

// ============================================
// PAYMENT TRACKING
// ============================================

export interface PaymentRecord extends Payment {
  facultyId?: string
  departmentId?: string
  institutionId: string
  feeItemId?: string
  installmentDetails?: InstallmentPayment[]
  breakdown?: PaymentBreakdown[]
}

export interface InstallmentPayment {
  id: string
  paymentRecordId: string
  installmentNumber: number
  totalInstallments: number
  amount: number
  dueDate: string
  status: PaymentStatus
  paidDate?: string
  paidAmount?: number
  lateFee?: number
  notes?: string
}

export interface PaymentBreakdown {
  feeItemId: string
  feeType: FeeType
  amount: number
  description: string
}

// ============================================
// TEAM & PERMISSIONS
// ============================================

export interface TeamMember {
  id: string
  institutionId: string
  userId?: string
  email: string
  firstName?: string
  lastName?: string
  role: InstitutionRole
  scope: {
    type: 'institution' | 'faculty' | 'department'
    facultyIds?: string[]
    departmentIds?: string[]
  }
  permissions: RolePermissions
  invitationStatus: InvitationStatus
  invitedBy: string
  invitedAt: string
  acceptedAt?: string
  lastActiveAt?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface RolePermissions {
  canCreateFees: boolean
  canEditFees: boolean
  canDeleteFees: boolean
  canViewPayments: boolean
  canProcessPayments: boolean
  canRefundPayments: boolean
  canReconcileBalances: boolean
  canExportReports: boolean
  canInviteMembers: boolean
  canManageTeam: boolean
  canEditInstitution: boolean
  canViewAnalytics: boolean
}

export interface TeamInvitation {
  id: string
  institutionId: string
  email: string
  role: InstitutionRole
  scope: {
    type: 'institution' | 'faculty' | 'department'
    facultyIds?: string[]
    departmentIds?: string[]
  }
  permissions: RolePermissions
  status: InvitationStatus
  invitedBy: string
  invitedAt: string
  expiresAt: string
  acceptedAt?: string
  declinedAt?: string
  token: string
}

// ============================================
// COMPOSITE TYPES WITH RELATIONSHIPS
// ============================================

export interface InstitutionWithDetails extends Institution {
  faculties?: Faculty[]
  departments?: Department[]
  teamMembers?: TeamMember[]
  recentPayments?: PaymentRecord[]
}

export interface FacultyWithDetails extends Faculty {
  institution?: Institution
  departments?: Department[]
  feeItems?: FeeItem[]
  teamMembers?: TeamMember[]
}

export interface DepartmentWithDetails extends Department {
  faculty?: Faculty
  institution?: Institution
  feeItems?: FeeItem[]
  students?: Student[]
  payments?: PaymentRecord[]
  teamMembers?: TeamMember[]
}

export interface FeeItemWithDetails extends FeeItem {
  department?: Department
  faculty?: Faculty
  institution?: Institution
  payments?: PaymentRecord[]
  totalCollected?: number
  totalOutstanding?: number
}

// ============================================
// ACADEMIC RECORDS
// ============================================

export type GradeValue = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F' | 'I' | 'W' | 'P' | 'NP'
export type CourseStatus = 'in-progress' | 'completed' | 'failed' | 'withdrawn' | 'incomplete'
export type SemesterType = 'fall' | 'spring' | 'summer' | 'winter'

export interface Course {
  id: string
  courseCode: string
  courseName: string
  creditHours: number
  description?: string
  department: string
  level: number
  prerequisites?: string[]
  isElective: boolean
  createdAt: string
}

export interface CourseEnrollment {
  id: string
  studentId: string
  courseId: string
  semesterId: string
  instructorName?: string
  enrollmentDate: string
  grade?: GradeValue
  gradePoints?: number
  status: CourseStatus
  attendance?: number
  midtermScore?: number
  finalScore?: number
  assignmentScore?: number
  totalScore?: number
  remarks?: string
  completedAt?: string
  createdAt: string
  updatedAt: string
}

export interface Semester {
  id: string
  academicSessionId: string
  name: string
  type: SemesterType
  semesterNumber: number
  startDate: string
  endDate: string
  registrationStart: string
  registrationEnd: string
  isActive: boolean
  createdAt: string
}

export interface AcademicRecord {
  id: string
  studentId: string
  semesterId: string
  academicSessionId: string
  courses: CourseEnrollment[]
  totalCreditHours: number
  earnedCreditHours: number
  semesterGPA: number
  cumulativeGPA: number
  totalCourses: number
  passedCourses: number
  failedCourses: number
  withdrawnCourses: number
  academicStanding: 'good-standing' | 'probation' | 'suspension' | 'honors' | 'deans-list'
  remarks?: string
  createdAt: string
  updatedAt: string
}

export interface Transcript {
  id: string
  studentId: string
  student: Student
  academicRecords: AcademicRecord[]
  overallGPA: number
  totalCreditHours: number
  totalEarnedCreditHours: number
  academicStanding: string
  degreeAwarded?: {
    degree: string
    major: string
    honors?: string
    dateAwarded: string
  }
  generatedAt: string
  generatedBy: string
}

export interface GradeScale {
  grade: GradeValue
  minPercentage: number
  maxPercentage: number
  gradePoints: number
  description: string
}

export interface AcademicRecordWithDetails extends AcademicRecord {
  semester?: Semester
  session?: AcademicSession
  courseDetails?: (CourseEnrollment & { course?: Course })[]
}
