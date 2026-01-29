'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Shield, Key, Smartphone, Monitor, Trash2, CheckCircle2, AlertCircle } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'

export default function SecuritySettingsPage() {
  const router = useRouter()
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const activeSessions = [
    { id: '1', device: 'Chrome on MacOS', location: 'San Francisco, CA', lastActive: '2 minutes ago', current: true, ip: '192.168.1.1' },
    { id: '2', device: 'Safari on iPhone', location: 'San Francisco, CA', lastActive: '1 hour ago', current: false, ip: '192.168.1.2' },
    { id: '3', device: 'Firefox on Windows', location: 'New York, NY', lastActive: '2 days ago', current: false, ip: '192.168.1.3' },
  ]

  const loginHistory = [
    { id: '1', date: '2026-01-19 10:30 AM', location: 'San Francisco, CA', device: 'Chrome on MacOS', status: 'success' as const, ip: '192.168.1.1' },
    { id: '2', date: '2026-01-18 03:15 PM', location: 'San Francisco, CA', device: 'Safari on iPhone', status: 'success' as const, ip: '192.168.1.2' },
    { id: '3', date: '2026-01-17 09:20 AM', location: 'Unknown', device: 'Firefox on Windows', status: 'failed' as const, ip: '192.168.1.4' },
  ]

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left" onClick={() => router.back()} className="mb-4">Back to Settings</Button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-error/10 rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-error" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Security Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Protect your account with advanced security features</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Password</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last changed 45 days ago</p>
            </div>
            <Button variant="outline" size="md" icon={<Key className="w-4 h-4" />} iconPosition="left" onClick={() => setShowPasswordForm(!showPasswordForm)}>
              Change Password
            </Button>
          </div>
          {showPasswordForm && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border space-y-4">
              <Input label="Current Password" type="password" placeholder="Enter current password" />
              <Input label="New Password" type="password" placeholder="Enter new password" />
              <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
              <div className="flex gap-3">
                <Button type="button" variant="outline" size="md" onClick={() => setShowPasswordForm(false)}>Cancel</Button>
                <Button type="button" variant="primary" size="md">Update Password</Button>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-warning" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
              </div>
            </div>
            <Badge variant="warning" size="md">Disabled</Badge>
          </div>
          <div className="bg-warning/5 border border-warning/20 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">Protect your account with 2FA. You'll need to enter a code from your phone in addition to your password.</p>
          </div>
          <Button variant="primary" size="md">Enable Two-Factor Authentication</Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Sessions</h2>
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white">{session.device}</p>
                      {session.current && <Badge variant="success" size="sm">Current</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{session.location} • {session.ip}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">Last active: {session.lastActive}</p>
                  </div>
                </div>
                {!session.current && (
                  <Button variant="ghost" size="sm" icon={<Trash2 className="w-4 h-4" />}>Revoke</Button>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Login History</h2>
          <div className="space-y-3">
            {loginHistory.map((login) => (
              <div key={login.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <div className="flex items-center gap-3">
                  {login.status === 'success' ? <CheckCircle2 className="w-5 h-5 text-success" /> : <AlertCircle className="w-5 h-5 text-error" />}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{login.device}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{login.location} • {login.ip}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{login.date}</p>
                  </div>
                </div>
                <Badge variant={login.status === 'success' ? 'success' : 'error'} size="sm">
                  {login.status === 'success' ? 'Success' : 'Failed'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
