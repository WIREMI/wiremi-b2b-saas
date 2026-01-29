'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import EmptyState from '@/components/ui/empty-state'
import {
  Sparkles,
  Dumbbell,
  Play,
  Calendar,
  TrendingUp,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  ChevronRight,
  Flame,
  Activity,
  ArrowRight,
} from 'lucide-react'
import { getWorkoutPlan, getUserAssessment, mockWorkoutPlans } from '@/lib/mock-data/ai-fitness'
import type { WorkoutSession, Exercise } from '@/types/ai-fitness'

export default function AIWorkoutPage() {
  const router = useRouter()
  const currentUserId = 'user-1' // Mock

  const workoutPlan = getWorkoutPlan(currentUserId)
  const assessment = getUserAssessment(currentUserId)
  const [selectedSession, setSelectedSession] = useState<WorkoutSession | null>(null)
  const [currentWeek, setCurrentWeek] = useState(1)

  if (!workoutPlan) {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Workout Plan
          </h1>
        </div>
        <EmptyState
          icon={<Dumbbell className="w-12 h-12" />}
          title="No workout plan found"
          description="Complete your fitness assessment to get your personalized AI workout plan"
          action={{
            label: 'Start Assessment',
            onClick: () => router.push('/fitness/ai-assessment'),
            icon: <Sparkles className="w-4 h-4" />
          }}
        />
      </PageLayout>
    )
  }

  const totalCaloriesPerWeek = workoutPlan.sessions.reduce((sum, session) => sum + session.caloriesBurn, 0)
  const progressionForCurrentWeek = workoutPlan.progressionPlan.find((p) => p.week === currentWeek)

  const getExerciseTypeColor = (type: string) => {
    switch (type) {
      case 'CARDIO':
        return 'red'
      case 'STRENGTH':
        return 'blue'
      case 'FLEXIBILITY':
        return 'green'
      case 'CORE':
        return 'orange'
      case 'PLYOMETRIC':
        return 'purple'
      default:
        return 'gray'
    }
  }

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'BEGINNER':
        return 'success'
      case 'INTERMEDIATE':
        return 'info'
      case 'ADVANCED':
        return 'warning'
      case 'EXPERT':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Workout Plan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personalized {workoutPlan.goal.toLowerCase().replace('_', ' ')} program
        </p>
      </div>

      {/* Header Banner */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Your AI-Powered Workout Plan
                </h2>
                <Badge variant={getIntensityColor(workoutPlan.intensity)}>
                  {workoutPlan.intensity}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Generated on {new Date(workoutPlan.generatedAt).toLocaleDateString()} • Valid until{' '}
                {new Date(workoutPlan.validUntil).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Goal: {workoutPlan.goal.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {workoutPlan.weeklyFrequency}x per week
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    ~{totalCaloriesPerWeek} cal/week
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={() => router.push('/fitness/ai-nutrition')}>
            View Nutrition Plan
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Week Selector */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Progression Plan</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                  disabled={currentWeek === 1}
                >
                  Previous
                </Button>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-3">
                  Week {currentWeek}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(Math.min(workoutPlan.progressionPlan.length, currentWeek + 1))}
                  disabled={currentWeek === workoutPlan.progressionPlan.length}
                >
                  Next
                </Button>
              </div>
            </div>
            {progressionForCurrentWeek && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
                  Changes for Week {currentWeek}:
                </h4>
                <ul className="space-y-1">
                  {progressionForCurrentWeek.changes.map((change, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-blue-700 dark:text-blue-300">
                      <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          {/* Workout Sessions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Weekly Workout Sessions</h3>
            {workoutPlan.sessions.map((session) => (
              <Card
                key={session.id}
                variant="interactive"
                className={`p-6 cursor-pointer transition-all ${
                  selectedSession?.id === session.id ? 'ring-2 ring-blue-600' : ''
                }`}
                onClick={() => setSelectedSession(selectedSession?.id === session.id ? null : session)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {session.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {session.type.map((type) => (
                          <Badge key={type} variant={getExerciseTypeColor(type) as any}>
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.durationMinutes} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-600" />
                          <span>{session.caloriesBurn} cal</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Dumbbell className="w-4 h-4" />
                          <span>{session.exercises.length} exercises</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="primary" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                </div>

                {/* Exercise List */}
                {selectedSession?.id === session.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Exercise Breakdown
                    </h5>
                    <div className="space-y-3">
                      {session.exercises.map((exercise, index) => (
                        <div
                          key={exercise.id}
                          className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                        >
                          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h6 className="font-medium text-gray-900 dark:text-gray-100">
                                {exercise.name}
                              </h6>
                              <Badge variant={getExerciseTypeColor(exercise.type) as any} size="sm">
                                {exercise.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {exercise.description}
                            </p>
                            <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400">
                              <span className="font-medium">
                                {exercise.sets} sets × {exercise.reps} reps
                              </span>
                              <span>Rest: {exercise.restSeconds}s</span>
                              <span className="flex items-center gap-1">
                                <Flame className="w-3 h-3 text-orange-600" />
                                {exercise.calories} cal
                              </span>
                            </div>
                            {exercise.equipment && exercise.equipment.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                                  Equipment: {exercise.equipment.join(', ')}
                                </span>
                              </div>
                            )}
                            {exercise.muscleGroups && exercise.muscleGroups.length > 0 && (
                              <div className="mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                                  Targets: {exercise.muscleGroups.join(', ')}
                                </span>
                              </div>
                            )}
                            {exercise.safetyTips && exercise.safetyTips.length > 0 && (
                              <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
                                <div className="flex items-start gap-2">
                                  <AlertCircle className="w-3 h-3 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                                  <ul className="space-y-0.5">
                                    {exercise.safetyTips.map((tip, tipIndex) => (
                                      <li key={tipIndex} className="text-xs text-orange-700 dark:text-orange-300">
                                        {tip}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Safety Guidelines */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Safety Guidelines
            </h3>
            <ul className="space-y-2">
              {workoutPlan.safetyGuidelines.map((guideline, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Plan Overview</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Weekly Sessions</span>
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {workoutPlan.weeklyFrequency}
                </p>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Calories/Week</span>
                  <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {totalCaloriesPerWeek}
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Exercises</span>
                  <Dumbbell className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {workoutPlan.sessions.reduce((sum, s) => sum + s.exercises.length, 0)}
                </p>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Progression Weeks</span>
                  <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {workoutPlan.progressionPlan.length}
                </p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full" onClick={() => router.push('/fitness/ai-progress')}>
                <Activity className="w-4 h-4 mr-2" />
                Track Progress
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push('/fitness/ai-nutrition')}>
                <Target className="w-4 h-4 mr-2" />
                View Nutrition Plan
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push('/fitness/ai-assessment')}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Update Assessment
              </Button>
            </div>
          </Card>

          {/* AI Insight */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-2">
                  AI Coach Tip
                </h4>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Consistency is key! Aim to complete at least {Math.floor(workoutPlan.weeklyFrequency * 0.8)} out of{' '}
                  {workoutPlan.weeklyFrequency} weekly sessions to see optimal results. Track your progress regularly to stay
                  motivated!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
