'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import EmptyState from '@/components/ui/empty-state'
import {
  Sparkles,
  Users,
  User,
  TrendingUp,
  AlertCircle,
  MessageCircle,
  Target,
  Activity,
  Heart,
  Search,
  ChevronRight,
  CheckCircle,
  XCircle,
  Info,
  Dumbbell,
  Utensils,
} from 'lucide-react'
import {
  getAllMembers,
  getCoachTalkingPoints,
  getMembersNeedingAttention,
  getUserAssessment,
  getWorkoutPlan,
  getNutritionPlan,
  getProgressHistory,
} from '@/lib/mock-data/ai-fitness'

export default function AICoachAssistantPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const allMembers = getAllMembers()
  const membersNeedingAttention = getMembersNeedingAttention()

  const filteredMembers = allMembers.filter(
    (member) =>
      member.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.userId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedMemberData = selectedMember ? getCoachTalkingPoints(selectedMember) : null
  const selectedAssessment = selectedMember ? getUserAssessment(selectedMember) : null
  const selectedWorkoutPlan = selectedMember ? getWorkoutPlan(selectedMember) : null
  const selectedNutritionPlan = selectedMember ? getNutritionPlan(selectedMember) : null
  const selectedProgress = selectedMember ? getProgressHistory(selectedMember) : null

  const getStatusColor = (status?: string): 'success' | 'info' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'AHEAD':
        return 'success'
      case 'ON_TRACK':
        return 'info'
      case 'BEHIND':
        return 'warning'
      case 'PLATEAU':
        return 'error'
      default:
        return 'default'
    }
  }

  const getSafetyFlagColor = (level: string) => {
    switch (level) {
      case 'INFO':
        return 'info'
      case 'WARNING':
        return 'warning'
      case 'CRITICAL':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Coach Assistant</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          AI-powered insights to help you coach members effectively
        </p>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total Members</span>
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{allMembers.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">With AI plans</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Need Attention</span>
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {membersNeedingAttention.length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">Behind schedule</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">On Track</span>
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {allMembers.filter((m) => m.progressStatus === 'ON_TRACK' || m.progressStatus === 'AHEAD').length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">Meeting goals</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Avg Adherence</span>
            <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {Math.round(allMembers.reduce((sum, m) => sum + m.adherenceRate, 0) / allMembers.length)}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">Workout completion</p>
        </Card>
      </div>

      {/* Members Needing Attention */}
      {membersNeedingAttention.length > 0 && (
        <Card className="p-6 mb-6 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Members Needing Attention
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {membersNeedingAttention.map((member) => (
              <div
                key={member.userId}
                onClick={() => setSelectedMember(member.userId)}
                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-orange-200 dark:border-orange-800 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{member.userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">{member.goal}</p>
                  </div>
                  <Badge variant={getStatusColor(member.progressStatus)}>
                    {member.progressStatus?.replace('_', ' ') || 'N/A'}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Adherence: {member.adherenceRate}% • Last workout: {member.lastWorkout || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Member List */}
        <div className="space-y-6">
          {/* Search */}
          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search members..."
                className="pl-10"
              />
            </div>
          </Card>

          {/* Member List */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">All Members</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredMembers.map((member) => (
                <div
                  key={member.userId}
                  onClick={() => setSelectedMember(member.userId)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedMember === member.userId
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-600'
                      : 'bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {member.userName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                          {member.userName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                          {member.goal}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(member.progressStatus)} size="sm">
                      {member.adherenceRate}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Member Details */}
        <div className="lg:col-span-2 space-y-6">
          {!selectedMemberData ? (
            <EmptyState
              icon={<User className="w-12 h-12" />}
              title="Select a member"
              description="Choose a member from the list to view AI coaching insights and talking points"
            />
          ) : (
            <>
              {/* Member Header */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {selectedMemberData.userName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {selectedMemberData.userName}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {selectedMemberData.currentGoal}
                      </p>
                      <Badge variant={getStatusColor(selectedMemberData.progressStatus)}>
                        {selectedMemberData.progressStatus.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(`/fitness/members/${selectedMember}`)
                    }
                  >
                    View Full Profile
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{selectedMemberData.summary}</p>
                </div>
              </Card>

              {/* Safety Flags */}
              {selectedMemberData.safetyFlags.length > 0 && (
                <Card className="p-6 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    Safety Flags
                  </h3>
                  <div className="space-y-2">
                    {selectedMemberData.safetyFlags.map((flag, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-4 border-orange-600"
                      >
                        <div className="flex items-start gap-2">
                          <Badge variant={getSafetyFlagColor(flag.level)} size="sm">
                            {flag.level}
                          </Badge>
                          <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">{flag.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Today's Workout */}
              {selectedMemberData.todaysWorkout && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-blue-600" />
                    Today's Workout
                  </h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {selectedMemberData.todaysWorkout}
                    </p>
                  </div>
                </Card>
              )}

              {/* Focus Areas */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Focus Areas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedMemberData.focusAreas.map((area, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{area}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Encouragement Points */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  Encouragement Points
                </h3>
                <ul className="space-y-2">
                  {selectedMemberData.encouragementPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Conversation Starters */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  Conversation Starters
                </h3>
                <div className="space-y-3">
                  {selectedMemberData.conversationStarters.map((starter, index) => (
                    <div
                      key={index}
                      className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-600"
                    >
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic">{starter}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* AI Recommendations */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  AI Recommendations
                </h3>
                <ul className="space-y-2">
                  {selectedMemberData.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Quick Stats */}
              {selectedAssessment && selectedProgress && selectedProgress.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Member Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Current Weight</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {selectedProgress[selectedProgress.length - 1].weight}kg
                      </p>
                    </div>

                    {selectedAssessment.goals.targetWeight && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Target Weight</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {selectedAssessment.goals.targetWeight}kg
                        </p>
                      </div>
                    )}

                    {selectedProgress[selectedProgress.length - 1].bodyFatPercentage && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Body Fat</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {selectedProgress[selectedProgress.length - 1].bodyFatPercentage?.toFixed(1)}%
                        </p>
                      </div>
                    )}

                    <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Timeline</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {selectedAssessment.goals.targetTimeline} weeks
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* AI Coach Tip */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-2">
                      AI Coaching Tip
                    </h4>
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      Use the conversation starters above to build rapport with {selectedMemberData.userName.split(' ')[0]}.
                      Acknowledge their progress in {selectedMemberData.encouragementPoints[0]?.toLowerCase() || 'their journey'} to
                      boost motivation and adherence.
                    </p>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
