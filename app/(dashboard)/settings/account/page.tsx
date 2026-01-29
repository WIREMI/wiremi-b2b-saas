'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, User, Mail, Phone, Globe, Save, Upload } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'

export default function AccountSettingsPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [firstName, setFirstName] = useState('Sarah')
  const [lastName, setLastName] = useState('Johnson')
  const [email, setEmail] = useState('sarah.johnson@wiremi.com')
  const [phone, setPhone] = useState('+1 (555) 123-4567')
  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('America/Los_Angeles')
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY')
  const [currency, setCurrency] = useState('USD')

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
  ]

  const timezones = [
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
  ]

  const dateFormats = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  ]

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    showToast({ type: 'success', title: 'Settings Saved', message: 'Account settings updated successfully' })
    setIsLoading(false)
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left" onClick={() => router.back()} className="mb-4">
          Back to Settings
        </Button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-info/10 rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-info" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your personal account preferences</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-500">SJ</span>
            </div>
            <div>
              <Button type="button" variant="outline" size="md" icon={<Upload className="w-4 h-4" />} iconPosition="left">
                Upload Photo
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-2">Recommended: Square image, at least 200x200px</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} icon={<User className="w-5 h-5" />} iconPosition="left" required />
              <Input label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon={<Mail className="w-5 h-5" />} iconPosition="left" required />
              <Input label="Phone Number" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} icon={<Phone className="w-5 h-5" />} iconPosition="left" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Language & Region</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Language" options={languages} value={language} onChange={(e) => setLanguage(e.target.value)} />
              <Select label="Timezone" options={timezones} value={timezone} onChange={(e) => setTimezone(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select label="Date Format" options={dateFormats} value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} />
              <Select label="Currency" options={currencies} value={currency} onChange={(e) => setCurrency(e.target.value)} />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" size="lg" onClick={() => router.back()} disabled={isLoading}>Cancel</Button>
          <Button type="submit" variant="primary" size="lg" loading={isLoading} icon={<Save className="w-5 h-5" />} iconPosition="left">Save Changes</Button>
        </div>
      </form>
    </PageLayout>
  )
}
