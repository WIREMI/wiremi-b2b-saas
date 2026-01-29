'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  UserCheck,
  Search,
  Clock,
  Activity,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import { useToast } from '@/hooks/useToast'
import { MOCK_MEMBERS, MOCK_CHECKINS } from '@/lib/mock-data/fitness'

export default function CheckInPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMember, setSelectedMember] = useState<typeof MOCK_MEMBERS[0] | null>(null)
  const [isCheckingIn, setIsCheckingIn] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Search members
  const searchResults = searchQuery
    ? MOCK_MEMBERS.filter(
        (member) =>
          (member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.memberCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.phone.includes(searchQuery)) &&
          member.membershipStatus === 'active'
      ).slice(0, 5)
    : []

  // Get today's check-ins
  const todayCheckIns = MOCK_CHECKINS.filter((c) => {
    const checkInDate = new Date(c.checkInTime).toDateString()
    const today = new Date().toDateString()
    return checkInDate === today
  })
    .sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())
    .slice(0, 10)
    .map((checkIn) => {
      const member = MOCK_MEMBERS.find((m) => m.id === checkIn.memberId)
      return { ...checkIn, member }
    })

  const activeCheckIns = todayCheckIns.filter((c) => !c.checkOutTime).length
  const completedCheckIns = todayCheckIns.filter((c) => c.checkOutTime).length

  const handleCheckIn = async () => {
    if (!selectedMember) return

    setIsCheckingIn(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    showToast({
      type: 'success',
      title: 'Check-in Complete',
      message: `${selectedMember.firstName} ${selectedMember.lastName} checked in successfully!`
    })
    setSelectedMember(null)
    setSearchQuery('')
    setIsCheckingIn(false)
  }

  const handleCheckOut = async (memberId: string, memberName: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    showToast({
      type: 'success',
      title: 'Check-out Complete',
      message: `${memberName} checked out successfully!`
    })
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'expired':
        return 'error'
      case 'suspended':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getTierVariant = (tier: string) => {
    switch (tier) {
      case 'vip':
        return 'primary'
      case 'premium':
        return 'info'
      case 'basic':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Member Check-in</h1>
            <p className="text-gray-600 dark:text-gray-400">Quick check-in and activity tracking</p>
          </div>
        </div>
      </div>
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
            <Badge variant="success" size="sm">
              Live
            </Badge>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{activeCheckIns}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Currently Active</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {completedCheckIns}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed Today</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {todayCheckIns.length}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Check-ins Today</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Check-in Interface */}
        <div className="space-y-6">
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Quick Check-in
              </h2>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>

            <div className="relative mb-6">
              <Input
                type="text"
                placeholder="Search by name, member code, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl max-h-80 overflow-y-auto">
                  {searchResults.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => {
                        setSelectedMember(member)
                        setSearchQuery('')
                      }}
                      className="p-4 bg-gray-100 dark:bg-dark-surface hover:bg-gray-100 dark:hover:bg-dark-hover cursor-pointer transition-colors border-b border-gray-200 dark:border-dark-border last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-semibold">
                          {member.firstName[0]}
                          {member.lastName[0]}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {member.firstName} {member.lastName}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {member.memberCode} - {member.phone}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getTierVariant(member.membershipTier) as any} size="sm">
                            {member.membershipTier}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Member Card */}
            {selectedMember ? (
              <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl border-2 border-primary/30 mb-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    {selectedMember.firstName[0]}
                    {selectedMember.lastName[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedMember.firstName} {selectedMember.lastName}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={getTierVariant(selectedMember.membershipTier) as any}>
                        {selectedMember.membershipTier.toUpperCase()}
                      </Badge>
                      <Badge variant={getStatusVariant(selectedMember.membershipStatus)}>
                        {selectedMember.membershipStatus}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Member Code
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {selectedMember.memberCode}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Total Check-ins
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {selectedMember.totalCheckIns}
                    </div>
                  </div>
                </div>

                {selectedMember.medicalNotes && (
                  <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-200 dark:border-red-500/20 mb-6">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-red-900 dark:text-red-400 mb-1">
                          Medical Note
                        </div>
                        <div className="text-sm text-red-800 dark:text-red-300">
                          {selectedMember.medicalNotes}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={<UserCheck className="w-5 h-5" />}
                    iconPosition="left"
                    onClick={handleCheckIn}
                    loading={isCheckingIn}
                    className="flex-1"
                  >
                    Check In
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setSelectedMember(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-dark-card rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Search for a member to check in
                </p>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-card rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Peak Hour</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">6:00 PM</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-card rounded-xl">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Duration</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">68 min</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Check-ins */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Check-ins
            </h2>
            <Badge variant="default" size="sm">
              Today
            </Badge>
          </div>

          <div className="space-y-3">
            {todayCheckIns.length > 0 ? (
              todayCheckIns.map((checkIn) => (
                <div
                  key={checkIn.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-card rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {checkIn.member?.firstName?.[0]}
                      {checkIn.member?.lastName?.[0]}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {checkIn.member?.firstName} {checkIn.member?.lastName}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(checkIn.checkInTime).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                        {checkIn.duration && ` - ${checkIn.duration} min`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {checkIn.checkOutTime ? (
                      <Badge variant="default" size="sm">
                        Completed
                      </Badge>
                    ) : (
                      <>
                        <Badge variant="success" size="sm">
                          Active
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleCheckOut(
                              checkIn.memberId,
                              `${checkIn.member?.firstName} ${checkIn.member?.lastName}`
                            )
                          }
                        >
                          Check Out
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 dark:text-gray-400">
                No check-ins today
              </div>
            )}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
