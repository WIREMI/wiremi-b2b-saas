'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bell, Mail, Smartphone, Save } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface NotificationSetting {
  id: string
  label: string
  description: string
  email: boolean
  push: boolean
  sms: boolean
}

export default function NotificationSettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [settings, setSettings] = useState<NotificationSetting[]>([
    { id: '1', label: 'Transaction Alerts', description: 'Receive alerts for all transactions', email: true, push: true, sms: false },
    { id: '2', label: 'Payment Confirmations', description: 'Get notified when payments are completed', email: true, push: true, sms: true },
    { id: '3', label: 'Payroll Updates', description: 'Updates on payroll processing', email: true, push: false, sms: false },
    { id: '4', label: 'Team Activity', description: 'When team members perform actions', email: false, push: true, sms: false },
    { id: '5', label: 'Security Alerts', description: 'Suspicious login attempts and security issues', email: true, push: true, sms: true },
    { id: '6', label: 'Account Updates', description: 'Changes to your account or subscription', email: true, push: false, sms: false },
    { id: '7', label: 'Marketing & Tips', description: 'Product updates and helpful tips', email: true, push: false, sms: false },
  ])

  const toggleSetting = (id: string, type: 'email' | 'push' | 'sms') => {
    setSettings(settings.map(s => s.id === id ? { ...s, [type]: !s[type] } : s))
  }

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left" onClick={() => router.back()} className="mb-4">Back to Settings</Button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center">
            <Bell className="w-8 h-8 text-warning" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notification Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Control how and when you receive notifications</p>
          </div>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="pb-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Notification Type</th>
                <th className="pb-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </div>
                </th>
                <th className="pb-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                  <div className="flex items-center justify-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Push
                  </div>
                </th>
                <th className="pb-4 text-center text-sm font-semibold text-gray-900 dark:text-white">
                  <div className="flex items-center justify-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    SMS
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {settings.map((setting) => (
                <tr key={setting.id}>
                  <td className="py-4">
                    <p className="font-medium text-gray-900 dark:text-white">{setting.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                  </td>
                  <td className="py-4 text-center">
                    <input type="checkbox" checked={setting.email} onChange={() => toggleSetting(setting.id, 'email')} className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500" />
                  </td>
                  <td className="py-4 text-center">
                    <input type="checkbox" checked={setting.push} onChange={() => toggleSetting(setting.id, 'push')} className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500" />
                  </td>
                  <td className="py-4 text-center">
                    <input type="checkbox" checked={setting.sms} onChange={() => toggleSetting(setting.id, 'sms')} className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" size="lg" loading={isLoading} onClick={handleSave} icon={<Save className="w-5 h-5" />} iconPosition="left">Save Preferences</Button>
      </div>
    </PageLayout>
  )
}
