'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Edit, Settings as SettingsIcon, Activity, TrendingUp, Camera } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function UserProfilePage() {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const user = {
    name: 'Sarah Johnson',
    role: 'Owner',
    email: 'sarah.johnson@wiremi.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinedDate: '2023-01-15',
    department: 'Engineering',
    status: 'active' as const,
  }

  const stats = [
    { label: 'Transactions Created', value: '245', icon: <Activity className="w-5 h-5" />, iconBg: 'bg-primary-100 dark:bg-primary-500/20 text-primary-500' },
    { label: 'Payrolls Processed', value: '12', icon: <TrendingUp className="w-5 h-5" />, iconBg: 'bg-success/10 text-success' },
    { label: 'Team Members Invited', value: '8', icon: <User className="w-5 h-5" />, iconBg: 'bg-info/10 text-info' },
  ]

  const recentActivity = [
    { id: '1', action: 'Created payment', details: '$5,000 to Acme Corp', time: '2 hours ago' },
    { id: '2', action: 'Invited team member', details: 'robert.anderson@wiremi.com', time: '1 day ago' },
    { id: '3', action: 'Updated company settings', details: 'Changed company address', time: '3 days ago' },
    { id: '4', action: 'Generated report', details: 'Q4 Financial Summary', time: '5 days ago' },
  ]

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-primary-500">SJ</span>
                )}
              </div>
              <label htmlFor="profile-upload" className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <Badge variant="default" size="md" className="bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">{user.role}</Badge>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{user.department}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="md" icon={<Edit className="w-5 h-5" />} iconPosition="left" onClick={() => router.push('/settings/account')}>
              Edit Profile
            </Button>
            <Button variant="outline" size="md" icon={<SettingsIcon className="w-5 h-5" />} onClick={() => router.push('/settings')} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{user.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-dark-bg rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.details}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Stats</h2>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Permissions</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Manage Team</span>
                <Badge variant="success" size="sm">Yes</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Approve Payments</span>
                <Badge variant="success" size="sm">Yes</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Manage Settings</span>
                <Badge variant="success" size="sm">Yes</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Access Reports</span>
                <Badge variant="success" size="sm">Yes</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
