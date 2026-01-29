'use client'

import { useRouter } from 'next/navigation'
import {
  Dumbbell,
  Users,
  Calendar,
  DollarSign,
  UserCheck,
  UserPlus,
  ClipboardList,
  TrendingUp,
  CalendarPlus,
  Activity,
  AlertCircle,
  Clock,
  Sparkles,
  Utensils,
  Target,
  UserCog,
  ArrowLeft,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Badge } from '@/components/ui/badge'
import { formatNumber, formatCurrency } from '@/lib/utils'
import { MOCK_MEMBERS, MOCK_FITNESS_CLASSES, MOCK_CHECKINS, MOCK_PAYMENTS } from '@/lib/mock-data/fitness'

export default function FitnessDashboardPage() {
  const router = useRouter()

  // Calculate stats
  const activeMembers = MOCK_MEMBERS.filter((m) => m.membershipStatus === 'active').length
  const todayClasses = MOCK_FITNESS_CLASSES.length
  const todayCheckIns = MOCK_CHECKINS.filter((c) => {
    const checkInDate = new Date(c.checkInTime).toDateString()
    const today = new Date().toDateString()
    return checkInDate === today
  }).length

  const thisMonthRevenue = MOCK_PAYMENTS.filter((p) => {
    const paymentDate = new Date(p.paymentDate)
    const now = new Date()
    return (
      paymentDate.getMonth() === now.getMonth() &&
      paymentDate.getFullYear() === now.getFullYear() &&
      p.status === 'paid'
    )
  }).reduce((sum, p) => sum + p.amount, 0)

  const upcomingClasses = MOCK_FITNESS_CLASSES.slice(0, 5)

  const recentCheckIns = MOCK_CHECKINS.slice(0, 10).map((checkIn) => {
    const member = MOCK_MEMBERS.find((m) => m.id === checkIn.memberId)
    return { ...checkIn, member }
  })

  const expiringMembers = MOCK_MEMBERS.filter((m) => {
    if (m.membershipStatus !== 'active') return false
    const expiryDate = new Date(m.expiryDate)
    const now = new Date()
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry > 0 && daysUntilExpiry <= 7
  })

  const getDayName = (dayOfWeek: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[dayOfWeek]
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'yoga':
        return 'primary'
      case 'spinning':
        return 'info'
      case 'zumba':
        return 'error'
      case 'strength':
        return 'warning'
      case 'cardio':
        return 'error'
      case 'pilates':
        return 'success'
      case 'boxing':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout>
      <div className="max-w-[1400px] mx-auto space-y-5">
        {/* Back Navigation */}
      <div className="mb-2">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-[13px] text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Gym & Fitness
          </h1>
          <p className="text-[13px] text-gray-500 mt-0.5">
            Manage memberships, classes, and member activity
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {activeMembers}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Active Members
          </div>
          <div className="text-[12px] text-green-600 dark:text-green-400">
            Active
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {todayClasses}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Classes Scheduled
          </div>
          <div className="text-[12px] text-blue-600 dark:text-blue-400">
            Today
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {formatCurrency(thisMonthRevenue, 'USD')}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Revenue This Month
          </div>
          <div className="text-[12px] text-gray-500">
            MTD
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3.5 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-2">
            <UserCheck className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-2xl font-semibold text-gray-900 dark:text-white tabular-nums">
              {todayCheckIns}
            </span>
          </div>
          <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">
            Check-ins Today
          </div>
          <div className="text-[12px] text-orange-600 dark:text-orange-400">
            Today
          </div>
        </div>
      </div>

      {/* AI Fitness Section */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-500/20">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 bg-purple-600 rounded-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-[13px] font-semibold text-gray-900 dark:text-white">AI-Powered Fitness Coaching</h2>
            <p className="text-[12px] text-gray-600 dark:text-gray-400">
              Personalized workouts, nutrition, and progress tracking powered by AI
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
          <button onClick={() => router.push('/fitness/ai-assessment')} className="px-3 py-2 text-[13px] font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-1.5 justify-center">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Assessment</span>
          </button>
          <button onClick={() => router.push('/fitness/ai-workout')} className="px-3 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 justify-center">
            <Dumbbell className="w-3.5 h-3.5" />
            <span>AI Workouts</span>
          </button>
          <button onClick={() => router.push('/fitness/ai-nutrition')} className="px-3 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 justify-center">
            <Utensils className="w-3.5 h-3.5" />
            <span>AI Nutrition</span>
          </button>
          <button onClick={() => router.push('/fitness/ai-progress')} className="px-3 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 justify-center">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Track Progress</span>
          </button>
          <button onClick={() => router.push('/fitness/ai-goals')} className="px-3 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 justify-center">
            <Target className="w-3.5 h-3.5" />
            <span>Goals & Evaluation</span>
          </button>
        </div>
      </div>

      {/* Coach Assistant */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-xl p-4 border-2 border-green-200 dark:border-green-500/20">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 bg-green-600 rounded-lg">
            <UserCog className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-[13px] font-semibold text-gray-900 dark:text-white">AI Coach Assistant</h2>
            <p className="text-[12px] text-gray-600 dark:text-gray-400">
              Get AI insights and talking points for every member
            </p>
          </div>
        </div>
        <button onClick={() => router.push('/fitness/ai-coach')} className="px-4 py-2 text-[13px] font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Open AI Coach Assistant</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-3 border border-gray-200 dark:border-gray-700/40">
        <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <button onClick={() => router.push('/fitness/members/add')} className="px-3 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 border border-gray-200 dark:border-gray-700/50 rounded-lg">
            <UserPlus className="w-3.5 h-3.5" />
            <span>New Member</span>
          </button>
          <button onClick={() => router.push('/fitness/classes/add')} className="px-3 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 border border-gray-200 dark:border-gray-700/50 rounded-lg">
            <CalendarPlus className="w-3.5 h-3.5" />
            <span>Schedule Class</span>
          </button>
          <button onClick={() => router.push('/fitness/check-in')} className="px-3 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 border border-gray-200 dark:border-gray-700/50 rounded-lg">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Check-in Member</span>
          </button>
          <button onClick={() => router.push('/fitness/members')} className="px-3 py-2 text-[13px] font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 border border-gray-200 dark:border-gray-700/50 rounded-lg">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>View Reports</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Upcoming Classes */}
        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">Upcoming Classes</h2>
            <button onClick={() => router.push('/fitness/classes')} className="text-[12px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
              View All →
            </button>
          </div>
          <div className="space-y-2.5">
            {upcomingClasses.length > 0 ? (
              upcomingClasses.map((fitnessClass) => (
                <div key={fitnessClass.id} onClick={() => router.push(`/fitness/classes/${fitnessClass.id}`)} className="flex items-start gap-2.5 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-700/40 hover:border-teal-500 dark:hover:border-teal-500 transition-all cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white truncate">
                        {fitnessClass.name}
                      </h3>
                      <Badge variant={getCategoryColor(fitnessClass.category) as any} size="sm">
                        {fitnessClass.category}
                      </Badge>
                    </div>
                    <p className="text-[12px] text-gray-500 mb-1">
                      {fitnessClass.instructor}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getDayName(fitnessClass.schedule.dayOfWeek)} {fitnessClass.schedule.startTime}
                      </span>
                      <span>
                        {fitnessClass.enrolled}/{fitnessClass.capacity} enrolled
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[13px] text-gray-500">
                No upcoming classes
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">Recent Check-ins</h2>
            <button onClick={() => router.push('/fitness/check-in')} className="text-[12px] font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
              View All →
            </button>
          </div>
          <div className="space-y-2">
            {recentCheckIns.length > 0 ? (
              recentCheckIns.map((checkIn) => (
                <div key={checkIn.id} className="flex items-center gap-2.5 p-2.5 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-[11px] font-semibold">
                    {checkIn.member?.firstName?.[0]}
                    {checkIn.member?.lastName?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-medium text-gray-900 dark:text-white truncate">
                      {checkIn.member?.firstName} {checkIn.member?.lastName}
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      {new Date(checkIn.checkInTime).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <Badge variant={checkIn.checkOutTime ? 'default' : 'success'} size="sm">
                    {checkIn.checkOutTime ? 'Completed' : 'Active'}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-[13px] text-gray-500">
                No recent check-ins
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Membership Expiry Alerts */}
      {expiringMembers.length > 0 && (
        <div className="bg-white dark:bg-gray-800/40 dark:backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700/40">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white">
                Membership Expiry Alerts
              </h2>
              <p className="text-[12px] text-gray-500">
                {expiringMembers.length} membership{expiringMembers.length !== 1 ? 's' : ''} expiring within 7 days
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {expiringMembers.slice(0, 6).map((member) => {
              const daysUntilExpiry = Math.ceil(
                (new Date(member.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              )
              return (
                <div key={member.id} className="flex items-center gap-2.5 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-500/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white text-[11px] font-semibold">
                    {member.firstName[0]}
                    {member.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-medium text-gray-900 dark:text-white truncate">
                      {member.firstName} {member.lastName}
                    </h3>
                    <p className="text-[11px] text-red-600 dark:text-red-400">
                      Expires in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <button onClick={() => router.push(`/fitness/members/${member.id}`)} className="text-[12px] font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors px-2 py-1 border border-red-200 dark:border-red-500/20 rounded-lg">
                    Renew
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
      </div>
    </PageLayout>
  )
}
