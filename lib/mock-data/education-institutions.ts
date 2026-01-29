import type {
  Institution,
  Faculty,
  Department,
  FeeItem,
  PaymentRecord,
  TeamMember,
  FeeTemplate,
  RolePermissions,
  InstitutionWithDetails,
  FacultyWithDetails,
  DepartmentWithDetails,
} from '@/types/education'

// ============================================
// ROLE PERMISSIONS DEFAULTS
// ============================================

export const DEFAULT_SUPER_ADMIN_PERMISSIONS: RolePermissions = {
  canCreateFees: true,
  canEditFees: true,
  canDeleteFees: true,
  canViewPayments: true,
  canProcessPayments: true,
  canRefundPayments: true,
  canReconcileBalances: true,
  canExportReports: true,
  canInviteMembers: true,
  canManageTeam: true,
  canEditInstitution: true,
  canViewAnalytics: true,
}

export const DEFAULT_FINANCE_ADMIN_PERMISSIONS: RolePermissions = {
  canCreateFees: false,
  canEditFees: true,
  canDeleteFees: false,
  canViewPayments: true,
  canProcessPayments: true,
  canRefundPayments: true,
  canReconcileBalances: true,
  canExportReports: true,
  canInviteMembers: false,
  canManageTeam: false,
  canEditInstitution: false,
  canViewAnalytics: true,
}

export const DEFAULT_FACULTY_ADMIN_PERMISSIONS: RolePermissions = {
  canCreateFees: true,
  canEditFees: true,
  canDeleteFees: false,
  canViewPayments: true,
  canProcessPayments: false,
  canRefundPayments: false,
  canReconcileBalances: false,
  canExportReports: true,
  canInviteMembers: true,
  canManageTeam: true,
  canEditInstitution: false,
  canViewAnalytics: true,
}

export const DEFAULT_DEPARTMENT_ADMIN_PERMISSIONS: RolePermissions = {
  canCreateFees: true,
  canEditFees: true,
  canDeleteFees: false,
  canViewPayments: true,
  canProcessPayments: false,
  canRefundPayments: false,
  canReconcileBalances: false,
  canExportReports: false,
  canInviteMembers: false,
  canManageTeam: false,
  canEditInstitution: false,
  canViewAnalytics: false,
}

export const DEFAULT_VIEWER_PERMISSIONS: RolePermissions = {
  canCreateFees: false,
  canEditFees: false,
  canDeleteFees: false,
  canViewPayments: true,
  canProcessPayments: false,
  canRefundPayments: false,
  canReconcileBalances: false,
  canExportReports: false,
  canInviteMembers: false,
  canManageTeam: false,
  canEditInstitution: false,
  canViewAnalytics: true,
}

// ============================================
// MOCK INSTITUTIONS
// ============================================

export const MOCK_INSTITUTIONS: Institution[] = [
  {
    id: 'inst-001',
    legalName: 'University of Excellence, Yaoundé',
    displayName: 'UE Yaoundé',
    registrationNumber: 'UNI/YAO/2010/001',
    accreditationId: 'MINESUP-ACC-2010-045',
    type: 'university',
    country: 'CM',
    address: {
      street: '123 Independence Avenue',
      city: 'Yaoundé',
      state: 'Centre Region',
      zipCode: '00237',
      country: 'Cameroon',
    },
    contactEmail: 'info@ue-yaounde.cm',
    contactPhone: '+237 222 123 456',
    website: 'https://ue-yaounde.cm',
    brandColor: '#1E40AF',
    defaultCurrency: 'XAF',
    settlementBankAccount: {
      bankName: 'Afriland First Bank',
      accountNumber: '10033456789',
      accountName: 'University of Excellence',
    },
    settlementWalletId: 'WIRE-WALLET-UE001',
    status: 'verified',
    verifiedAt: '2024-01-15T10:30:00Z',
    verifiedBy: 'ADMIN-001',
    totalFaculties: 5,
    totalDepartments: 18,
    totalStudents: 2450,
    totalRevenue: 1250000000,
    outstandingBalance: 85000000,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-20T14:30:00Z',
  },
  {
    id: 'inst-002',
    legalName: 'International Business School Douala',
    displayName: 'IBS Douala',
    registrationNumber: 'BUS/DLA/2015/008',
    accreditationId: 'MINESUP-ACC-2015-132',
    type: 'college',
    country: 'CM',
    address: {
      street: '45 Rue de la République',
      city: 'Douala',
      state: 'Littoral Region',
      zipCode: '00237',
      country: 'Cameroon',
    },
    contactEmail: 'admissions@ibs-douala.cm',
    contactPhone: '+237 233 456 789',
    website: 'https://ibs-douala.cm',
    brandColor: '#059669',
    defaultCurrency: 'XAF',
    settlementWalletId: 'WIRE-WALLET-IBS002',
    status: 'verified',
    verifiedAt: '2024-03-20T09:15:00Z',
    verifiedBy: 'ADMIN-002',
    totalFaculties: 3,
    totalDepartments: 8,
    totalStudents: 980,
    totalRevenue: 560000000,
    outstandingBalance: 42000000,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z',
  },
  {
    id: 'inst-003',
    legalName: 'Bamenda Technical Institute',
    displayName: 'BTI',
    registrationNumber: 'TECH/BAM/2018/003',
    type: 'polytechnic',
    country: 'CM',
    address: {
      street: 'Commercial Avenue',
      city: 'Bamenda',
      state: 'North West Region',
      zipCode: '00237',
      country: 'Cameroon',
    },
    contactEmail: 'contact@bti.cm',
    contactPhone: '+237 233 789 012',
    website: 'https://bti.cm',
    brandColor: '#DC2626',
    defaultCurrency: 'XAF',
    status: 'submitted',
    totalFaculties: 4,
    totalDepartments: 12,
    totalStudents: 1560,
    totalRevenue: 450000000,
    outstandingBalance: 68000000,
    createdAt: '2024-11-05T00:00:00Z',
    updatedAt: '2026-01-18T16:45:00Z',
  },
  {
    id: 'inst-004',
    legalName: 'St. Mary International School',
    displayName: 'SMIS',
    registrationNumber: 'SCH/YAO/2012/156',
    type: 'school',
    country: 'CM',
    address: {
      street: 'Bastos Quarter',
      city: 'Yaoundé',
      state: 'Centre Region',
      zipCode: '00237',
      country: 'Cameroon',
    },
    contactEmail: 'info@smis.cm',
    contactPhone: '+237 222 345 678',
    brandColor: '#7C3AED',
    defaultCurrency: 'XAF',
    status: 'verified',
    verifiedAt: '2024-02-10T12:00:00Z',
    verifiedBy: 'ADMIN-003',
    totalFaculties: 2,
    totalDepartments: 6,
    totalStudents: 650,
    totalRevenue: 320000000,
    outstandingBalance: 28000000,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2026-01-21T09:30:00Z',
  },
]

// ============================================
// MOCK FACULTIES
// ============================================

export const MOCK_FACULTIES: Faculty[] = [
  // University of Excellence faculties
  {
    id: 'fac-001',
    institutionId: 'inst-001',
    name: 'Faculty of Medicine and Biomedical Sciences',
    code: 'FMBS',
    description: 'Training healthcare professionals and conducting medical research',
    defaultCurrency: 'XAF',
    isActive: true,
    totalDepartments: 5,
    totalStudents: 680,
    totalRevenue: 450000000,
    outstandingBalance: 32000000,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'fac-002',
    institutionId: 'inst-001',
    name: 'Faculty of Engineering and Technology',
    code: 'FET',
    description: 'Engineering programs covering civil, electrical, mechanical, and software engineering',
    defaultCurrency: 'XAF',
    isActive: true,
    totalDepartments: 6,
    totalStudents: 850,
    totalRevenue: 520000000,
    outstandingBalance: 38000000,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'fac-003',
    institutionId: 'inst-001',
    name: 'Faculty of Arts and Social Sciences',
    code: 'FASS',
    description: 'Humanities, languages, sociology, psychology, and communication studies',
    defaultCurrency: 'XAF',
    isActive: true,
    totalDepartments: 4,
    totalStudents: 520,
    totalRevenue: 180000000,
    outstandingBalance: 12000000,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'fac-004',
    institutionId: 'inst-001',
    name: 'Faculty of Science',
    code: 'FS',
    description: 'Pure sciences including mathematics, physics, chemistry, and biology',
    defaultCurrency: 'XAF',
    isActive: true,
    totalDepartments: 3,
    totalStudents: 400,
    totalRevenue: 100000000,
    outstandingBalance: 3000000,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  // IBS Douala faculties
  {
    id: 'fac-005',
    institutionId: 'inst-002',
    name: 'School of Business Administration',
    code: 'SBA',
    description: 'MBA, BBA, and executive business programs',
    defaultCurrency: 'XAF',
    isActive: true,
    totalDepartments: 4,
    totalStudents: 520,
    totalRevenue: 340000000,
    outstandingBalance: 25000000,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z',
  },
  {
    id: 'fac-006',
    institutionId: 'inst-002',
    name: 'School of Finance and Accounting',
    code: 'SFA',
    description: 'Financial management, accounting, taxation, and auditing programs',
    defaultCurrency: 'XAF',
    isActive: true,
    totalDepartments: 3,
    totalStudents: 340,
    totalRevenue: 170000000,
    outstandingBalance: 12000000,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z',
  },
  {
    id: 'fac-007',
    institutionId: 'inst-002',
    name: 'School of Digital Marketing',
    code: 'SDM',
    description: 'Modern marketing, e-commerce, and digital strategy programs',
    defaultCurrency: 'XAF',
    isActive: true,
    totalDepartments: 1,
    totalStudents: 120,
    totalRevenue: 50000000,
    outstandingBalance: 5000000,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z',
  },
  // BTI faculties
  {
    id: 'fac-008',
    institutionId: 'inst-003',
    name: 'Faculty of Applied Engineering',
    code: 'FAE',
    description: 'Hands-on engineering and technical training',
    defaultCurrency: 'XAF',
    isActive: true,
    totalDepartments: 5,
    totalStudents: 720,
    totalRevenue: 220000000,
    outstandingBalance: 35000000,
    createdAt: '2024-11-05T00:00:00Z',
    updatedAt: '2026-01-18T16:45:00Z',
  },
  // St. Mary's faculties
  {
    id: 'fac-009',
    institutionId: 'inst-004',
    name: 'Secondary School Division',
    code: 'SSD',
    description: 'Grades 7-12 with international curriculum',
    defaultCurrency: 'XAF',
    isActive: true,
    totalDepartments: 4,
    totalStudents: 420,
    totalRevenue: 210000000,
    outstandingBalance: 18000000,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2026-01-21T09:30:00Z',
  },
]

// ============================================
// MOCK DEPARTMENTS
// ============================================

export const MOCK_DEPARTMENTS: Department[] = [
  // FMBS Departments
  {
    id: 'dept-001',
    facultyId: 'fac-001',
    institutionId: 'inst-001',
    name: 'General Medicine',
    code: 'MED',
    level: 'undergraduate',
    programType: 'full-time',
    description: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
    isActive: true,
    totalStudents: 250,
    totalFeeItems: 8,
    totalRevenue: 180000000,
    outstandingBalance: 15000000,
    headOfDepartment: 'Dr. Emmanuel Kouassi',
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'dept-002',
    facultyId: 'fac-001',
    institutionId: 'inst-001',
    name: 'Nursing Science',
    code: 'NUR',
    level: 'undergraduate',
    programType: 'full-time',
    description: 'Bachelor of Science in Nursing',
    isActive: true,
    totalStudents: 180,
    totalFeeItems: 7,
    totalRevenue: 95000000,
    outstandingBalance: 7000000,
    headOfDepartment: 'Dr. Grace Nkwain',
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'dept-003',
    facultyId: 'fac-001',
    institutionId: 'inst-001',
    name: 'Pharmacy',
    code: 'PHAR',
    level: 'undergraduate',
    programType: 'full-time',
    description: 'Bachelor of Pharmacy',
    isActive: true,
    totalStudents: 120,
    totalFeeItems: 6,
    totalRevenue: 85000000,
    outstandingBalance: 5000000,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  // FET Departments
  {
    id: 'dept-004',
    facultyId: 'fac-002',
    institutionId: 'inst-001',
    name: 'Computer Engineering',
    code: 'CPE',
    level: 'undergraduate',
    programType: 'full-time',
    description: 'Bachelor of Engineering in Computer Engineering',
    isActive: true,
    totalStudents: 220,
    totalFeeItems: 7,
    totalRevenue: 140000000,
    outstandingBalance: 10000000,
    headOfDepartment: 'Eng. Patrick Mbarga',
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'dept-005',
    facultyId: 'fac-002',
    institutionId: 'inst-001',
    name: 'Civil Engineering',
    code: 'CIVIL',
    level: 'undergraduate',
    programType: 'full-time',
    description: 'Bachelor of Engineering in Civil Engineering',
    isActive: true,
    totalStudents: 180,
    totalFeeItems: 7,
    totalRevenue: 115000000,
    outstandingBalance: 8000000,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  // IBS Departments
  {
    id: 'dept-006',
    facultyId: 'fac-005',
    institutionId: 'inst-002',
    name: 'Business Administration (MBA)',
    code: 'MBA',
    level: 'postgraduate',
    programType: 'full-time',
    description: 'Master of Business Administration',
    isActive: true,
    totalStudents: 180,
    totalFeeItems: 6,
    totalRevenue: 140000000,
    outstandingBalance: 10000000,
    headOfDepartment: 'Prof. Jean-Paul Ndongo',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z',
  },
  {
    id: 'dept-007',
    facultyId: 'fac-005',
    institutionId: 'inst-002',
    name: 'Business Management (BBA)',
    code: 'BBA',
    level: 'undergraduate',
    programType: 'full-time',
    description: 'Bachelor of Business Administration',
    isActive: true,
    totalStudents: 220,
    totalFeeItems: 6,
    totalRevenue: 130000000,
    outstandingBalance: 9000000,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z',
  },
]

// ============================================
// MOCK FEE ITEMS
// ============================================

export const MOCK_FEE_ITEMS: FeeItem[] = [
  // General Medicine Department Fees
  {
    id: 'fee-001',
    departmentId: 'dept-001',
    facultyId: 'fac-001',
    institutionId: 'inst-001',
    name: 'Tuition Fee (Year 1)',
    description: 'Annual tuition for first year medical students',
    feeType: 'tuition',
    amount: 650000,
    currency: 'XAF',
    isMandatory: true,
    paymentType: 'installment',
    installmentConfig: {
      numberOfInstallments: 3,
      minimumPayableAmount: 200000,
      installmentSchedule: [
        { installmentNumber: 1, amount: 220000, dueDate: '2026-02-15' },
        { installmentNumber: 2, amount: 215000, dueDate: '2026-05-15' },
        { installmentNumber: 3, amount: 215000, dueDate: '2026-08-15' },
      ],
      lateFeeEnabled: true,
      gracePeriodDays: 7,
      lateFeeType: 'flat',
      lateFeeAmount: 10000,
    },
    isActive: true,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'fee-002',
    departmentId: 'dept-001',
    facultyId: 'fac-001',
    institutionId: 'inst-001',
    name: 'Acceptance Fee',
    description: 'One-time acceptance fee for admitted students',
    feeType: 'acceptance',
    amount: 75000,
    currency: 'XAF',
    isMandatory: true,
    paymentType: 'one-time',
    isActive: true,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'fee-003',
    departmentId: 'dept-001',
    facultyId: 'fac-001',
    institutionId: 'inst-001',
    name: 'Laboratory Fee',
    description: 'Access to medical laboratories and equipment',
    feeType: 'lab',
    amount: 85000,
    currency: 'XAF',
    isMandatory: true,
    paymentType: 'one-time',
    isActive: true,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-15T09:00:00Z',
  },
  // Computer Engineering Fees
  {
    id: 'fee-004',
    departmentId: 'dept-004',
    facultyId: 'fac-002',
    institutionId: 'inst-001',
    name: 'Tuition Fee',
    description: 'Annual tuition for Computer Engineering program',
    feeType: 'tuition',
    amount: 580000,
    currency: 'XAF',
    isMandatory: true,
    paymentType: 'installment',
    installmentConfig: {
      numberOfInstallments: 2,
      minimumPayableAmount: 250000,
      installmentSchedule: [
        { installmentNumber: 1, amount: 290000, dueDate: '2026-02-28' },
        { installmentNumber: 2, amount: 290000, dueDate: '2026-07-31' },
      ],
      lateFeeEnabled: true,
      gracePeriodDays: 10,
      lateFeeType: 'percentage',
      lateFeeAmount: 5,
    },
    isActive: true,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'fee-005',
    departmentId: 'dept-004',
    facultyId: 'fac-002',
    institutionId: 'inst-001',
    name: 'Computer Lab Access Fee',
    description: 'Access to computer labs and software licenses',
    feeType: 'technology',
    amount: 95000,
    currency: 'XAF',
    isMandatory: true,
    paymentType: 'one-time',
    isActive: true,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-15T09:00:00Z',
  },
  // MBA Fees
  {
    id: 'fee-006',
    departmentId: 'dept-006',
    facultyId: 'fac-005',
    institutionId: 'inst-002',
    name: 'MBA Tuition (Full Program)',
    description: 'Total tuition for 2-year MBA program',
    feeType: 'tuition',
    amount: 1200000,
    currency: 'XAF',
    isMandatory: true,
    paymentType: 'installment',
    installmentConfig: {
      numberOfInstallments: 4,
      minimumPayableAmount: 250000,
      installmentSchedule: [
        { installmentNumber: 1, amount: 300000, dueDate: '2026-02-01' },
        { installmentNumber: 2, amount: 300000, dueDate: '2026-05-01' },
        { installmentNumber: 3, amount: 300000, dueDate: '2026-09-01' },
        { installmentNumber: 4, amount: 300000, dueDate: '2026-12-01' },
      ],
      lateFeeEnabled: true,
      gracePeriodDays: 14,
      lateFeeType: 'flat',
      lateFeeAmount: 25000,
    },
    isActive: true,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z',
  },
]

// ============================================
// MOCK TEAM MEMBERS
// ============================================

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-001',
    institutionId: 'inst-001',
    userId: 'user-001',
    email: 'admin@ue-yaounde.cm',
    firstName: 'Marie',
    lastName: 'Fotso',
    role: 'super_admin',
    scope: {
      type: 'institution',
    },
    permissions: DEFAULT_SUPER_ADMIN_PERMISSIONS,
    invitationStatus: 'accepted',
    invitedBy: 'SYSTEM',
    invitedAt: '2023-12-01T00:00:00Z',
    acceptedAt: '2023-12-01T00:00:00Z',
    lastActiveAt: '2026-01-24T10:30:00Z',
    isActive: true,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2026-01-24T10:30:00Z',
  },
  {
    id: 'team-002',
    institutionId: 'inst-001',
    userId: 'user-002',
    email: 'finance@ue-yaounde.cm',
    firstName: 'Paul',
    lastName: 'Njoya',
    role: 'finance_admin',
    scope: {
      type: 'institution',
    },
    permissions: DEFAULT_FINANCE_ADMIN_PERMISSIONS,
    invitationStatus: 'accepted',
    invitedBy: 'team-001',
    invitedAt: '2023-12-10T00:00:00Z',
    acceptedAt: '2023-12-12T14:20:00Z',
    lastActiveAt: '2026-01-24T09:15:00Z',
    isActive: true,
    createdAt: '2023-12-10T00:00:00Z',
    updatedAt: '2026-01-24T09:15:00Z',
  },
  {
    id: 'team-003',
    institutionId: 'inst-001',
    userId: 'user-003',
    email: 'fmbs.admin@ue-yaounde.cm',
    firstName: 'Emmanuel',
    lastName: 'Kouassi',
    role: 'faculty_admin',
    scope: {
      type: 'faculty',
      facultyIds: ['fac-001'],
    },
    permissions: DEFAULT_FACULTY_ADMIN_PERMISSIONS,
    invitationStatus: 'accepted',
    invitedBy: 'team-001',
    invitedAt: '2024-01-05T00:00:00Z',
    acceptedAt: '2024-01-07T11:00:00Z',
    lastActiveAt: '2026-01-23T16:45:00Z',
    isActive: true,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2026-01-23T16:45:00Z',
  },
]

// ============================================
// FEE TEMPLATES
// ============================================

export const MOCK_FEE_TEMPLATES: FeeTemplate[] = [
  {
    id: 'template-001',
    name: 'Basic Tuition Package',
    description: 'Standard fees for undergraduate programs',
    category: 'Undergraduate',
    feeItems: [
      {
        name: 'Tuition Fee',
        feeType: 'tuition',
        amount: 500000,
        isMandatory: true,
        paymentType: 'installment',
      },
      {
        name: 'Registration Fee',
        feeType: 'registration',
        amount: 50000,
        isMandatory: true,
        paymentType: 'one-time',
      },
      {
        name: 'Library Fee',
        feeType: 'library',
        amount: 25000,
        isMandatory: true,
        paymentType: 'one-time',
      },
      {
        name: 'Examination Fee',
        feeType: 'exam',
        amount: 35000,
        isMandatory: true,
        paymentType: 'one-time',
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'template-002',
    name: 'Medical School Package',
    description: 'Comprehensive fees for medical programs',
    category: 'Medicine',
    feeItems: [
      {
        name: 'Tuition Fee',
        feeType: 'tuition',
        amount: 650000,
        isMandatory: true,
        paymentType: 'installment',
      },
      {
        name: 'Acceptance Fee',
        feeType: 'acceptance',
        amount: 75000,
        isMandatory: true,
        paymentType: 'one-time',
      },
      {
        name: 'Laboratory Fee',
        feeType: 'lab',
        amount: 85000,
        isMandatory: true,
        paymentType: 'one-time',
      },
      {
        name: 'Medical Insurance',
        feeType: 'medical',
        amount: 45000,
        isMandatory: true,
        paymentType: 'one-time',
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getInstitutionById(id: string): Institution | undefined {
  return MOCK_INSTITUTIONS.find((inst) => inst.id === id)
}

export function getFacultiesByInstitution(institutionId: string): Faculty[] {
  return MOCK_FACULTIES.filter((fac) => fac.institutionId === institutionId)
}

export function getDepartmentsByFaculty(facultyId: string): Department[] {
  return MOCK_DEPARTMENTS.filter((dept) => dept.facultyId === facultyId)
}

export function getDepartmentsByInstitution(institutionId: string): Department[] {
  return MOCK_DEPARTMENTS.filter((dept) => dept.institutionId === institutionId)
}

export function getFeeItemsByDepartment(departmentId: string): FeeItem[] {
  return MOCK_FEE_ITEMS.filter((fee) => fee.departmentId === departmentId)
}

export function getTeamMembersByInstitution(institutionId: string): TeamMember[] {
  return MOCK_TEAM_MEMBERS.filter((member) => member.institutionId === institutionId)
}

export function getInstitutionWithDetails(id: string): InstitutionWithDetails | undefined {
  const institution = getInstitutionById(id)
  if (!institution) return undefined

  return {
    ...institution,
    faculties: getFacultiesByInstitution(id),
    departments: getDepartmentsByInstitution(id),
    teamMembers: getTeamMembersByInstitution(id),
  }
}

export function getFacultyWithDetails(id: string): FacultyWithDetails | undefined {
  const faculty = MOCK_FACULTIES.find((f) => f.id === id)
  if (!faculty) return undefined

  return {
    ...faculty,
    institution: getInstitutionById(faculty.institutionId),
    departments: getDepartmentsByFaculty(id),
    feeItems: MOCK_FEE_ITEMS.filter((fee) => fee.facultyId === id),
    teamMembers: MOCK_TEAM_MEMBERS.filter(
      (m) => m.scope.type === 'faculty' && m.scope.facultyIds?.includes(id)
    ),
  }
}

export function getDepartmentWithDetails(id: string): DepartmentWithDetails | undefined {
  const department = MOCK_DEPARTMENTS.find((d) => d.id === id)
  if (!department) return undefined

  const faculty = MOCK_FACULTIES.find((f) => f.id === department.facultyId)

  return {
    ...department,
    faculty,
    institution: faculty ? getInstitutionById(faculty.institutionId) : undefined,
    feeItems: getFeeItemsByDepartment(id),
    teamMembers: MOCK_TEAM_MEMBERS.filter(
      (m) => m.scope.type === 'department' && m.scope.departmentIds?.includes(id)
    ),
  }
}

export function getFacultyById(id: string): Faculty | undefined {
  return MOCK_FACULTIES.find((fac) => fac.id === id)
}

export function getDepartmentById(id: string): Department | undefined {
  return MOCK_DEPARTMENTS.find((dept) => dept.id === id)
}

export function calculateInstitutionStats() {
  return {
    totalInstitutions: MOCK_INSTITUTIONS.length,
    verifiedInstitutions: MOCK_INSTITUTIONS.filter((i) => i.status === 'verified').length,
    totalStudents: MOCK_INSTITUTIONS.reduce((sum, i) => sum + i.totalStudents, 0),
    totalRevenue: MOCK_INSTITUTIONS.reduce((sum, i) => sum + i.totalRevenue, 0),
    totalOutstanding: MOCK_INSTITUTIONS.reduce((sum, i) => sum + i.outstandingBalance, 0),
  }
}
