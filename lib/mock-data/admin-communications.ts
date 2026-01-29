// Message Templates
export type TemplateType = 'email' | 'sms' | 'push' | 'in_app'
export type TemplateCategory =
  | 'transactional'
  | 'marketing'
  | 'system'
  | 'compliance'
  | 'support'
  | 'onboarding'

export interface MessageTemplate {
  id: string
  name: string
  type: TemplateType
  category: TemplateCategory
  subject?: string
  body: string
  variables: string[]
  status: 'active' | 'draft' | 'archived'
  createdDate: string
  updatedDate: string
  createdBy: string
  usageCount: number
  language: string
  tags: string[]
}

// Scheduled Messages
export type ScheduledMessageStatus = 'scheduled' | 'sending' | 'sent' | 'failed' | 'cancelled'

export interface ScheduledMessage {
  id: string
  campaignName: string
  templateId: string
  templateName: string
  type: TemplateType
  audience: {
    type: 'all' | 'segment' | 'custom'
    count: number
    segmentName?: string
  }
  scheduledDate: string
  status: ScheduledMessageStatus
  createdBy: string
  sentCount?: number
  failedCount?: number
  openRate?: number
  clickRate?: number
}

// Delivery Reports
export type DeliveryStatus = 'delivered' | 'failed' | 'pending' | 'bounced' | 'opened' | 'clicked'

export interface DeliveryReport {
  id: string
  messageId: string
  campaignName: string
  type: TemplateType
  recipient: string
  businessName: string
  sentDate: string
  deliveryDate?: string
  status: DeliveryStatus
  failureReason?: string
  openedDate?: string
  clickedDate?: string
  deviceType?: string
  location?: string
}

// Mock Templates
export const MOCK_TEMPLATES: MessageTemplate[] = [
  {
    id: 'tpl_001',
    name: 'Welcome Email - New Business',
    type: 'email',
    category: 'onboarding',
    subject: 'Welcome to {{platform_name}}!',
    body: 'Hi {{business_name}},\n\nWelcome to our platform! We\'re excited to have you on board.\n\n{{custom_message}}\n\nBest regards,\nThe Team',
    variables: ['platform_name', 'business_name', 'custom_message'],
    status: 'active',
    createdDate: '2024-01-10',
    updatedDate: '2024-01-15',
    createdBy: 'Sarah Johnson',
    usageCount: 156,
    language: 'en',
    tags: ['welcome', 'onboarding', 'email'],
  },
  {
    id: 'tpl_002',
    name: 'Payment Received Notification',
    type: 'email',
    category: 'transactional',
    subject: 'Payment Received - {{amount}} {{currency}}',
    body: 'Payment confirmation:\nAmount: {{amount}} {{currency}}\nTransaction ID: {{transaction_id}}\nDate: {{date}}',
    variables: ['amount', 'currency', 'transaction_id', 'date', 'business_name'],
    status: 'active',
    createdDate: '2024-01-05',
    updatedDate: '2024-01-20',
    createdBy: 'Michael Chen',
    usageCount: 2847,
    language: 'en',
    tags: ['payment', 'transactional', 'notification'],
  },
  {
    id: 'tpl_003',
    name: 'KYB Review Required',
    type: 'email',
    category: 'compliance',
    subject: 'Action Required: KYB Review',
    body: 'Dear {{business_name}},\n\nYour KYB review requires additional documentation.\n\nRequired documents:\n{{document_list}}\n\nPlease upload by {{deadline}}.',
    variables: ['business_name', 'document_list', 'deadline'],
    status: 'active',
    createdDate: '2024-01-12',
    updatedDate: '2024-01-12',
    createdBy: 'Sarah Johnson',
    usageCount: 23,
    language: 'en',
    tags: ['kyb', 'compliance', 'action-required'],
  },
  {
    id: 'tpl_004',
    name: 'SMS: Payment Alert',
    type: 'sms',
    category: 'transactional',
    body: '{{platform_name}}: Payment {{amount}} {{currency}} received. Ref: {{ref}}',
    variables: ['platform_name', 'amount', 'currency', 'ref'],
    status: 'active',
    createdDate: '2024-01-08',
    updatedDate: '2024-01-18',
    createdBy: 'Michael Chen',
    usageCount: 5234,
    language: 'en',
    tags: ['sms', 'payment', 'alert'],
  },
  {
    id: 'tpl_005',
    name: 'Monthly Newsletter',
    type: 'email',
    category: 'marketing',
    subject: '{{month}} Newsletter - Platform Updates',
    body: 'Hi {{business_name}},\n\nHere\'s what\'s new this month:\n{{updates}}\n\nBest regards,\nThe Team',
    variables: ['month', 'business_name', 'updates'],
    status: 'active',
    createdDate: '2024-01-01',
    updatedDate: '2024-01-25',
    createdBy: 'Sarah Johnson',
    usageCount: 89,
    language: 'en',
    tags: ['newsletter', 'marketing', 'monthly'],
  },
]

// Generate more templates
function generateAdditionalTemplates(): MessageTemplate[] {
  const types: TemplateType[] = ['email', 'sms', 'push', 'in_app']
  const categories: TemplateCategory[] = ['transactional', 'marketing', 'system', 'compliance', 'support']
  const statuses: ('active' | 'draft' | 'archived')[] = ['active', 'active', 'active', 'draft', 'archived']

  const templates: MessageTemplate[] = []

  for (let i = 6; i <= 25; i++) {
    const type = types[i % types.length]
    const category = categories[i % categories.length]

    templates.push({
      id: `tpl_${String(i).padStart(3, '0')}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} Template ${i}`,
      type,
      category,
      subject: type === 'email' ? `Subject for Template ${i}` : undefined,
      body: `Template body content for ${category} ${type} message ${i}`,
      variables: ['business_name', 'date', 'custom_field'],
      status: statuses[i % statuses.length],
      createdDate: new Date(2024, 0, i).toISOString().split('T')[0],
      updatedDate: new Date(2024, 0, i + 5).toISOString().split('T')[0],
      createdBy: ['Sarah Johnson', 'Michael Chen'][i % 2],
      usageCount: i * 10,
      language: 'en',
      tags: [category, type],
    })
  }

  return templates
}

export const ALL_TEMPLATES = [...MOCK_TEMPLATES, ...generateAdditionalTemplates()]

// Mock Scheduled Messages
export const MOCK_SCHEDULED_MESSAGES: ScheduledMessage[] = [
  {
    id: 'sched_001',
    campaignName: 'January Newsletter 2024',
    templateId: 'tpl_005',
    templateName: 'Monthly Newsletter',
    type: 'email',
    audience: {
      type: 'all',
      count: 1245,
    },
    scheduledDate: '2024-02-01T09:00:00Z',
    status: 'scheduled',
    createdBy: 'Sarah Johnson',
  },
  {
    id: 'sched_002',
    campaignName: 'KYB Renewal Reminders',
    templateId: 'tpl_003',
    templateName: 'KYB Review Required',
    type: 'email',
    audience: {
      type: 'segment',
      count: 45,
      segmentName: 'Expiring KYB',
    },
    scheduledDate: '2024-01-30T10:00:00Z',
    status: 'sent',
    createdBy: 'Michael Chen',
    sentCount: 45,
    failedCount: 0,
    openRate: 78.5,
  },
  {
    id: 'sched_003',
    campaignName: 'Feature Announcement - Multi-Currency',
    templateId: 'tpl_015',
    templateName: 'Feature Announcement',
    type: 'push',
    audience: {
      type: 'segment',
      count: 892,
      segmentName: 'Active Businesses',
    },
    scheduledDate: '2024-01-28T14:00:00Z',
    status: 'sending',
    createdBy: 'Sarah Johnson',
    sentCount: 654,
    failedCount: 12,
  },
]

// Generate more scheduled messages
function generateScheduledMessages(): ScheduledMessage[] {
  const messages: ScheduledMessage[] = []
  const statuses: ScheduledMessageStatus[] = ['scheduled', 'sent', 'sending', 'failed', 'cancelled']

  for (let i = 4; i <= 20; i++) {
    const status = statuses[i % statuses.length]
    const isSent = status === 'sent'

    messages.push({
      id: `sched_${String(i).padStart(3, '0')}`,
      campaignName: `Campaign ${i}`,
      templateId: `tpl_${String(i).padStart(3, '0')}`,
      templateName: `Template ${i}`,
      type: ['email', 'sms', 'push'][i % 3] as TemplateType,
      audience: {
        type: ['all', 'segment', 'custom'][i % 3] as any,
        count: 100 + (i * 50),
      },
      scheduledDate: new Date(2024, 0, i + 15, 10, 0).toISOString(),
      status,
      createdBy: ['Sarah Johnson', 'Michael Chen'][i % 2],
      sentCount: isSent ? 100 + (i * 50) : undefined,
      failedCount: isSent ? i % 5 : undefined,
      openRate: isSent ? 60 + (i % 30) : undefined,
    })
  }

  return messages
}

export const ALL_SCHEDULED_MESSAGES = [...MOCK_SCHEDULED_MESSAGES, ...generateScheduledMessages()]

// Mock Delivery Reports
export const MOCK_DELIVERY_REPORTS: DeliveryReport[] = [
  {
    id: 'del_001',
    messageId: 'msg_12345',
    campaignName: 'January Newsletter 2024',
    type: 'email',
    recipient: 'john@techflow.com',
    businessName: 'TechFlow Solutions',
    sentDate: '2024-01-27T09:00:00Z',
    deliveryDate: '2024-01-27T09:00:15Z',
    status: 'opened',
    openedDate: '2024-01-27T10:30:00Z',
    deviceType: 'Desktop',
    location: 'San Francisco, US',
  },
  {
    id: 'del_002',
    messageId: 'msg_12346',
    campaignName: 'KYB Renewal Reminders',
    type: 'email',
    recipient: 'admin@globaltrade.com',
    businessName: 'GlobalTrade Partners',
    sentDate: '2024-01-27T10:00:00Z',
    deliveryDate: '2024-01-27T10:00:12Z',
    status: 'clicked',
    openedDate: '2024-01-27T11:15:00Z',
    clickedDate: '2024-01-27T11:16:30Z',
    deviceType: 'Mobile',
    location: 'New York, US',
  },
  {
    id: 'del_003',
    messageId: 'msg_12347',
    campaignName: 'Payment Notifications',
    type: 'sms',
    recipient: '+1234567890',
    businessName: 'EduTech Solutions',
    sentDate: '2024-01-27T14:30:00Z',
    deliveryDate: '2024-01-27T14:30:03Z',
    status: 'delivered',
  },
  {
    id: 'del_004',
    messageId: 'msg_12348',
    campaignName: 'System Maintenance Alert',
    type: 'email',
    recipient: 'invalid@nonexistent.com',
    businessName: 'Unknown Business',
    sentDate: '2024-01-27T08:00:00Z',
    status: 'bounced',
    failureReason: 'Invalid email address',
  },
]

// Generate more delivery reports
function generateDeliveryReports(): DeliveryReport[] {
  const reports: DeliveryReport[] = []
  const statuses: DeliveryStatus[] = ['delivered', 'delivered', 'delivered', 'opened', 'opened', 'clicked', 'failed', 'bounced']

  for (let i = 5; i <= 50; i++) {
    const status = statuses[i % statuses.length]
    const isDelivered = !['failed', 'bounced'].includes(status)

    reports.push({
      id: `del_${String(i).padStart(3, '0')}`,
      messageId: `msg_${12340 + i}`,
      campaignName: `Campaign ${i % 10}`,
      type: ['email', 'sms', 'push'][i % 3] as TemplateType,
      recipient: `user${i}@business${i}.com`,
      businessName: `Business ${i}`,
      sentDate: new Date(2024, 0, 27, 8 + (i % 12), i % 60).toISOString(),
      deliveryDate: isDelivered ? new Date(2024, 0, 27, 8 + (i % 12), (i % 60) + 1).toISOString() : undefined,
      status,
      failureReason: !isDelivered ? ['Network error', 'Invalid recipient', 'Bounced'][i % 3] : undefined,
      openedDate: ['opened', 'clicked'].includes(status) ? new Date(2024, 0, 27, 9 + (i % 12), i % 60).toISOString() : undefined,
      clickedDate: status === 'clicked' ? new Date(2024, 0, 27, 9 + (i % 12), (i % 60) + 5).toISOString() : undefined,
      deviceType: isDelivered ? ['Desktop', 'Mobile', 'Tablet'][i % 3] : undefined,
      location: isDelivered ? ['San Francisco, US', 'New York, US', 'London, UK'][i % 3] : undefined,
    })
  }

  return reports
}

export const ALL_DELIVERY_REPORTS = [...MOCK_DELIVERY_REPORTS, ...generateDeliveryReports()]

// Helper Functions
export function getTemplateStats() {
  const total = ALL_TEMPLATES.length
  const active = ALL_TEMPLATES.filter(t => t.status === 'active').length
  const draft = ALL_TEMPLATES.filter(t => t.status === 'draft').length
  const archived = ALL_TEMPLATES.filter(t => t.status === 'archived').length

  return { total, active, draft, archived }
}

export function getScheduledMessageStats() {
  const total = ALL_SCHEDULED_MESSAGES.length
  const scheduled = ALL_SCHEDULED_MESSAGES.filter(m => m.status === 'scheduled').length
  const sent = ALL_SCHEDULED_MESSAGES.filter(m => m.status === 'sent').length
  const sending = ALL_SCHEDULED_MESSAGES.filter(m => m.status === 'sending').length
  const failed = ALL_SCHEDULED_MESSAGES.filter(m => m.status === 'failed').length

  return { total, scheduled, sent, sending, failed }
}

export function getDeliveryStats() {
  const total = ALL_DELIVERY_REPORTS.length
  const delivered = ALL_DELIVERY_REPORTS.filter(r => r.status === 'delivered').length
  const opened = ALL_DELIVERY_REPORTS.filter(r => r.status === 'opened').length
  const clicked = ALL_DELIVERY_REPORTS.filter(r => r.status === 'clicked').length
  const failed = ALL_DELIVERY_REPORTS.filter(r => r.status === 'failed').length
  const bounced = ALL_DELIVERY_REPORTS.filter(r => r.status === 'bounced').length

  const openRate = total > 0 ? ((opened + clicked) / total) * 100 : 0
  const clickRate = total > 0 ? (clicked / total) * 100 : 0

  return { total, delivered, opened, clicked, failed, bounced, openRate, clickRate }
}

export function getTemplateById(id: string): MessageTemplate | undefined {
  return ALL_TEMPLATES.find(t => t.id === id)
}

export function getCategoryColor(category: TemplateCategory): 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default' {
  switch (category) {
    case 'transactional': return 'success'
    case 'marketing': return 'primary'
    case 'system': return 'info'
    case 'compliance': return 'warning'
    case 'support': return 'info'
    case 'onboarding': return 'primary'
  }
}

export function getStatusColor(status: 'active' | 'draft' | 'archived' | ScheduledMessageStatus | DeliveryStatus): 'success' | 'warning' | 'error' | 'info' | 'default' {
  switch (status) {
    case 'active':
    case 'delivered':
    case 'sent':
      return 'success'
    case 'draft':
    case 'scheduled':
    case 'pending':
      return 'info'
    case 'sending':
    case 'opened':
      return 'primary' as any
    case 'clicked':
      return 'success'
    case 'archived':
      return 'warning'
    case 'failed':
    case 'bounced':
    case 'cancelled':
      return 'error'
    default:
      return 'default'
  }
}
