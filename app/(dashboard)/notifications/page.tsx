'use client'

import { useState } from 'react'
import { Bell, DollarSign, Users, Shield, FileText, CheckCircle2, Trash2, Settings as SettingsIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Notification {
  id: string
  type: 'transaction' | 'team' | 'security' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
}

export default function NotificationsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'transaction', title: 'Payment Received', message: '$5,000 received from Acme Corp', timestamp: '2026-01-19T10:30:00', read: false },
    { id: '2', type: 'team', title: 'New Team Member', message: 'Robert Anderson joined your team', timestamp: '2026-01-19T09:15:00', read: false },
    { id: '3', type: 'security', title: 'New Login Detected', message: 'Login from new device in New York', timestamp: '2026-01-18T15:20:00', read: true },
    { id: '4', type: 'system', title: 'Payroll Processed', message: 'Monthly payroll completed successfully', timestamp: '2026-01-18T09:00:00', read: true },
    { id: '5', type: 'transaction', title: 'Payment Sent', message: '$2,500 sent to Vendor Inc', timestamp: '2026-01-17T14:45:00', read: true },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case 'transaction': return <DollarSign className="w-5 h-5 text-success" />
      case 'team': return <Users className="w-5 h-5 text-info" />
      case 'security': return <Shield className="w-5 h-5 text-error" />
      case 'system': return <FileText className="w-5 h-5 text-warning" />
      default: return <Bell className="w-5 h-5" />
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Notifications</h1>
            <p className="text-gray-600 dark:text-gray-400">Stay updated with your latest activity</p>
          </div>
          <Button variant="outline" size="md" icon={<SettingsIcon className="w-5 h-5" />} iconPosition="left" onClick={() => router.push('/settings/notifications')}>
            Settings
          </Button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button variant={filter === 'all' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('all')}>
              All ({notifications.length})
            </Button>
            <Button variant={filter === 'unread' ? 'primary' : 'outline'} size="sm" onClick={() => setFilter('unread')}>
              Unread ({unreadCount})
            </Button>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>Mark all as read</Button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((notification) => (
          <Card key={notification.id} className={`p-4 ${!notification.read ? 'bg-primary-50 dark:bg-primary-500/10 border-l-4 border-l-primary-500' : ''}`}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gray-50 dark:bg-dark-surface rounded-lg flex items-center justify-center flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                  {!notification.read && <Badge variant="primary" size="sm">New</Badge>}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notification.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{formatTime(notification.timestamp)}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!notification.read && (
                  <Button variant="ghost" size="sm" icon={<CheckCircle2 className="w-4 h-4" />} onClick={() => markAsRead(notification.id)} />
                )}
                <Button variant="ghost" size="sm" icon={<Trash2 className="w-4 h-4" />} onClick={() => deleteNotification(notification.id)} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card className="p-12 text-center">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notifications</h3>
          <p className="text-gray-600 dark:text-gray-400">You're all caught up!</p>
        </Card>
      )}
    </PageLayout>
  )
}
