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
  TrendingUp,
  TrendingDown,
  Activity,
  Weight,
  Heart,
  Smile,
  Moon,
  Target,
  Calendar,
  Plus,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle,
  AlertCircle,
  Award,
} from 'lucide-react'
import { getProgressHistory, getLatestEvaluation, getUserAssessment } from '@/lib/mock-data/ai-fitness'

export default function AIProgressPage() {
  const router = useRouter()
  const currentUserId = 'user-1' // Mock

  const progressHistory = getProgressHistory(currentUserId)
  const latestEvaluation = getLatestEvaluation(currentUserId)
  const assessment = getUserAssessment(currentUserId)

  const [showAddMeasurement, setShowAddMeasurement] = useState(false)
  const [newMeasurement, setNewMeasurement] = useState({
    weight: '',
    bodyFatPercentage: '',
    energyLevel: 3,
    mood: 3,
    sleepQuality: 3,
    notes: '',
  })

  if (!assessment || progressHistory.length === 0) {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Progress Tracking
          </h1>
        </div>
        <EmptyState
          icon={<Activity className="w-12 h-12" />}
          title="No progress data found"
          description="Complete your fitness assessment to start tracking your progress"
          action={{
            label: 'Start Assessment',
            onClick: () => router.push('/fitness/ai-assessment'),
            icon: <Sparkles className="w-4 h-4" />
          }}
        />
      </PageLayout>
    )
  }

  const latestProgress = progressHistory[progressHistory.length - 1]
  const firstProgress = progressHistory[0]

  const totalWeightChange = latestProgress.weight - firstProgress.weight
  const totalBodyFatChange = (latestProgress.bodyFatPercentage || 0) - (firstProgress.bodyFatPercentage || 0)
  const daysTracking = Math.floor(
    (new Date(latestProgress.recordedAt).getTime() - new Date(firstProgress.recordedAt).getTime()) /
      (1000 * 60 * 60 * 24)
  )

  const handleAddMeasurement = () => {
    setShowAddMeasurement(false)
    setNewMeasurement({
      weight: '',
      bodyFatPercentage: '',
      energyLevel: 3,
      mood: 3,
      sleepQuality: 3,
      notes: '',
    })
  }

  const getChangeIcon = (value?: number) => {
    if (!value) return <Minus className="w-4 h-4" />
    if (value > 0) return <ArrowUp className="w-4 h-4" />
    if (value < 0) return <ArrowDown className="w-4 h-4" />
    return <Minus className="w-4 h-4" />
  }

  const getChangeColor = (value?: number) => {
    if (value === undefined || value === null) return 'text-gray-600 dark:text-gray-400'
    // For weight loss goal, negative is good
    if (assessment?.goals.primaryGoal === 'WEIGHT_LOSS') {
      if (value < 0) return 'text-green-600 dark:text-green-400'
      if (value > 0) return 'text-red-600 dark:text-red-400'
    }
    // For muscle gain goal, positive is good
    if (assessment?.goals.primaryGoal === 'MUSCLE_GAIN') {
      if (value > 0) return 'text-green-600 dark:text-green-400'
      if (value < 0) return 'text-red-600 dark:text-red-400'
    }
    return 'text-gray-600 dark:text-gray-400'
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Progress Tracking
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your fitness journey with AI insights
        </p>
      </div>

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Days Tracking</span>
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{daysTracking}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
            {progressHistory.length} measurements
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Weight Change</span>
            <Weight className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-center gap-2">
            <p className={`text-3xl font-bold ${getChangeColor(totalWeightChange)}`}>
              {totalWeightChange > 0 ? '+' : ''}
              {totalWeightChange.toFixed(1)}kg
            </p>
            {getChangeIcon(totalWeightChange)}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
            From {firstProgress.weight}kg to {latestProgress.weight}kg
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Body Fat %</span>
            <Activity className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="flex items-center gap-2">
            <p className={`text-3xl font-bold ${getChangeColor(totalBodyFatChange)}`}>
              {totalBodyFatChange > 0 ? '+' : ''}
              {totalBodyFatChange.toFixed(1)}%
            </p>
            {getChangeIcon(totalBodyFatChange)}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
            Current: {latestProgress.bodyFatPercentage?.toFixed(1)}%
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Progress Status</span>
            <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          {latestEvaluation && (
            <>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {latestEvaluation.progress.percentageToGoal.toFixed(0)}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                {latestEvaluation.progress.onTrack ? 'On track' : 'Needs adjustment'}
              </p>
            </>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Latest AI Evaluation */}
          {latestEvaluation && (
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    Latest AI Evaluation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(latestEvaluation.evaluatedAt).toLocaleDateString()} •{' '}
                    {latestEvaluation.period} evaluation
                  </p>
                </div>
              </div>

              {/* Progress Highlights */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Weight Change</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-xl font-bold ${getChangeColor(latestEvaluation.progress.weightChange)}`}>
                      {latestEvaluation.progress.weightChange > 0 ? '+' : ''}
                      {latestEvaluation.progress.weightChange.toFixed(1)}kg
                    </p>
                    {getChangeIcon(latestEvaluation.progress.weightChange)}
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Body Fat Change</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-xl font-bold ${getChangeColor(latestEvaluation.progress.bodyFatChange)}`}>
                      {(latestEvaluation.progress.bodyFatChange ?? 0) > 0 ? '+' : ''}
                      {(latestEvaluation.progress.bodyFatChange ?? 0).toFixed(1)}%
                    </p>
                    {getChangeIcon(latestEvaluation.progress.bodyFatChange)}
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">AI Insights</h4>
                <ul className="space-y-2">
                  {latestEvaluation.insights.map((insight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Recommendations</h4>
                <ul className="space-y-2">
                  {latestEvaluation.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Milestones */}
              {latestEvaluation.milestonesAchieved.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Milestones Achieved
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {latestEvaluation.milestonesAchieved.map((milestone, index) => (
                      <Badge key={index} variant="success">
                        <Award className="w-3 h-3 mr-1" />
                        {milestone}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Add Measurement Button/Form */}
          {!showAddMeasurement ? (
            <Button variant="primary" onClick={() => setShowAddMeasurement(true)} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add New Measurement
            </Button>
          ) : (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Record New Measurement
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Weight (kg) *
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={newMeasurement.weight}
                      onChange={(e) => setNewMeasurement({ ...newMeasurement, weight: e.target.value })}
                      placeholder="70.0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Body Fat % (optional)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      value={newMeasurement.bodyFatPercentage}
                      onChange={(e) =>
                        setNewMeasurement({ ...newMeasurement, bodyFatPercentage: e.target.value })
                      }
                      placeholder="25.0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Energy Level (1-5)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={newMeasurement.energyLevel}
                      onChange={(e) =>
                        setNewMeasurement({ ...newMeasurement, energyLevel: Number(e.target.value) })
                      }
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-8">
                      {newMeasurement.energyLevel}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mood (1-5)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={newMeasurement.mood}
                      onChange={(e) =>
                        setNewMeasurement({ ...newMeasurement, mood: Number(e.target.value) })
                      }
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-8">
                      {newMeasurement.mood}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sleep Quality (1-5)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={newMeasurement.sleepQuality}
                      onChange={(e) =>
                        setNewMeasurement({ ...newMeasurement, sleepQuality: Number(e.target.value) })
                      }
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-8">
                      {newMeasurement.sleepQuality}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    value={newMeasurement.notes}
                    onChange={(e) => setNewMeasurement({ ...newMeasurement, notes: e.target.value })}
                    placeholder="How are you feeling? Any observations?"
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowAddMeasurement(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleAddMeasurement}
                    disabled={!newMeasurement.weight}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save Measurement
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Progress History */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Progress History</h3>
            <div className="space-y-3">
              {progressHistory
                .slice()
                .reverse()
                .map((progress, index) => {
                  const prevProgress = progressHistory[progressHistory.length - index - 2]
                  const weightChange = prevProgress ? progress.weight - prevProgress.weight : 0
                  const bodyFatChange = prevProgress
                    ? (progress.bodyFatPercentage || 0) - (prevProgress.bodyFatPercentage || 0)
                    : 0

                  return (
                    <div
                      key={progress.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {new Date(progress.recordedAt).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                            {Math.floor(
                              (new Date().getTime() - new Date(progress.recordedAt).getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}{' '}
                            days ago
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                          <div className="flex items-center gap-1 mb-1">
                            <Weight className="w-3 h-3 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">Weight</span>
                          </div>
                          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            {progress.weight}kg
                          </p>
                          {prevProgress && (
                            <p className={`text-xs ${getChangeColor(weightChange)}`}>
                              {weightChange > 0 ? '+' : ''}
                              {weightChange.toFixed(1)}kg
                            </p>
                          )}
                        </div>

                        {progress.bodyFatPercentage && (
                          <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                            <div className="flex items-center gap-1 mb-1">
                              <Activity className="w-3 h-3 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">Body Fat</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                              {progress.bodyFatPercentage.toFixed(1)}%
                            </p>
                            {prevProgress && (
                              <p className={`text-xs ${getChangeColor(bodyFatChange)}`}>
                                {bodyFatChange > 0 ? '+' : ''}
                                {bodyFatChange.toFixed(1)}%
                              </p>
                            )}
                          </div>
                        )}

                        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                          <div className="flex items-center gap-1 mb-1">
                            <Heart className="w-3 h-3 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">Energy</span>
                          </div>
                          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            {progress.energyLevel}/5
                          </p>
                        </div>

                        <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                          <div className="flex items-center gap-1 mb-1">
                            <Smile className="w-3 h-3 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">Mood</span>
                          </div>
                          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                            {progress.mood}/5
                          </p>
                        </div>
                      </div>

                      {progress.notes && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">"{progress.notes}"</p>
                      )}
                    </div>
                  )
                })}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Goal Progress */}
          {assessment && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Goal Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current Weight</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {latestProgress.weight}kg
                    </span>
                  </div>
                  {assessment.goals.targetWeight && (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Target Weight</span>
                        <span className="font-bold text-gray-900 dark:text-gray-100">
                          {assessment.goals.targetWeight}kg
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.abs(
                                ((firstProgress.weight - latestProgress.weight) /
                                  (firstProgress.weight - Number(assessment.goals.targetWeight))) *
                                  100
                              )
                            )}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">
                        {Math.abs(latestProgress.weight - Number(assessment.goals.targetWeight)).toFixed(1)}kg to
                        go
                      </p>
                    </>
                  )}
                </div>

                {latestEvaluation && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Days Remaining</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">
                        {latestEvaluation.progress.daysRemaining}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                      <Badge variant={latestEvaluation.progress.onTrack ? 'success' : 'warning'}>
                        {latestEvaluation.progress.onTrack ? 'On Track' : 'Needs Adjustment'}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Wellness Metrics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Wellness Metrics
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-600 dark:text-red-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Energy</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    {latestProgress.energyLevel}/5
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(latestProgress.energyLevel / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Smile className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Mood</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    {latestProgress.mood}/5
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(latestProgress.mood / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Sleep</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    {latestProgress.sleepQuality}/5
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(latestProgress.sleepQuality / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* AI Insight */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-2">
                  AI Progress Tip
                </h4>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Track your progress weekly for best results! You've logged {progressHistory.length} measurements over{' '}
                  {daysTracking} days. Consistent tracking helps our AI provide better recommendations and keeps you
                  motivated.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
