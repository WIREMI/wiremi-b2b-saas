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
  Target,
  TrendingUp,
  Calendar,
  Award,
  CheckCircle,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  AlertCircle,
  Info,
  ArrowRight,
  Weight,
  Activity,
} from 'lucide-react'
import {
  getUserAssessment,
  getProgressHistory,
  getLatestEvaluation,
  getAllEvaluations,
} from '@/lib/mock-data/ai-fitness'
import type { FitnessGoal } from '@/types/ai-fitness'

export default function AIGoalsPage() {
  const router = useRouter()
  const currentUserId = 'user-1' // Mock

  const assessment = getUserAssessment(currentUserId)
  const progressHistory = getProgressHistory(currentUserId)
  const latestEvaluation = getLatestEvaluation(currentUserId)
  const allEvaluations = getAllEvaluations(currentUserId)

  const [isEditing, setIsEditing] = useState(false)
  const [editedGoals, setEditedGoals] = useState({
    primaryGoal: assessment?.goals.primaryGoal || ('' as FitnessGoal | ''),
    targetWeight: assessment?.goals.targetWeight?.toString() || '',
    targetTimeline: assessment?.goals.targetTimeline?.toString() || '',
    motivations: assessment?.goals.motivations || [],
    challenges: assessment?.goals.challenges || [],
    newMotivation: '',
    newChallenge: '',
  })

  if (!assessment) {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Goals & Evaluation
          </h1>
        </div>
        <EmptyState
          icon={<Target className="w-12 h-12" />}
          title="No goals set"
          description="Complete your fitness assessment to set your goals and track evaluations"
          action={{
            label: 'Start Assessment',
            onClick: () => router.push('/fitness/ai-assessment'),
            icon: <Sparkles className="w-4 h-4" />
          }}
        />
      </PageLayout>
    )
  }

  const latestProgress = progressHistory.length > 0 ? progressHistory[progressHistory.length - 1] : null
  const firstProgress = progressHistory.length > 0 ? progressHistory[0] : null

  const handleSaveGoals = () => {
    setIsEditing(false)
  }

  const addMotivation = () => {
    if (editedGoals.newMotivation.trim()) {
      setEditedGoals({
        ...editedGoals,
        motivations: [...editedGoals.motivations, editedGoals.newMotivation.trim()],
        newMotivation: '',
      })
    }
  }

  const removeMotivation = (index: number) => {
    setEditedGoals({
      ...editedGoals,
      motivations: editedGoals.motivations.filter((_, i) => i !== index),
    })
  }

  const addChallenge = () => {
    if (editedGoals.newChallenge.trim()) {
      setEditedGoals({
        ...editedGoals,
        challenges: [...editedGoals.challenges, editedGoals.newChallenge.trim()],
        newChallenge: '',
      })
    }
  }

  const removeChallenge = (index: number) => {
    setEditedGoals({
      ...editedGoals,
      challenges: editedGoals.challenges.filter((_, i) => i !== index),
    })
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Goals & Evaluation
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your fitness goals and AI evaluations
        </p>
      </div>

      {/* Current Goal Summary */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Your Fitness Goal
              </h2>
              <div className="flex items-center gap-2">
                <Badge variant="primary" className="text-lg px-4 py-1">
                  {assessment.goals.primaryGoal.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                </Badge>
                {assessment.goals.targetTimeline && (
                  <Badge variant="info">
                    {assessment.goals.targetTimeline} weeks
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Goals
            </Button>
          )}
        </div>

        {latestProgress && latestEvaluation && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Progress</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {latestEvaluation.progress.percentageToGoal.toFixed(0)}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                {latestEvaluation.progress.onTrack ? 'On track' : 'Needs adjustment'}
              </p>
            </div>

            {assessment.goals.targetWeight && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Weight Goal</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {assessment.goals.targetWeight}kg
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                  Current: {latestProgress.weight}kg
                </p>
              </div>
            )}

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Days Remaining</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {latestEvaluation.progress.daysRemaining}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                To reach goal
              </p>
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit Goals Form */}
          {isEditing && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Edit Your Goals</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Goal *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(
                      [
                        'WEIGHT_LOSS',
                        'MUSCLE_GAIN',
                        'ENDURANCE',
                        'FLEXIBILITY',
                        'REHAB',
                        'WELLNESS',
                        'GENERAL_FITNESS',
                      ] as FitnessGoal[]
                    ).map((goal) => (
                      <label
                        key={goal}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          editedGoals.primaryGoal === goal
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          checked={editedGoals.primaryGoal === goal}
                          onChange={() => setEditedGoals({ ...editedGoals, primaryGoal: goal })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {goal.split('_').map((w) => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {(editedGoals.primaryGoal === 'WEIGHT_LOSS' || editedGoals.primaryGoal === 'MUSCLE_GAIN') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Target Weight (kg)
                    </label>
                    <Input
                      type="number"
                      value={editedGoals.targetWeight}
                      onChange={(e) => setEditedGoals({ ...editedGoals, targetWeight: e.target.value })}
                      placeholder="65"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Timeline (weeks) *
                  </label>
                  <Input
                    type="number"
                    value={editedGoals.targetTimeline}
                    onChange={(e) => setEditedGoals({ ...editedGoals, targetTimeline: e.target.value })}
                    placeholder="12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Motivations
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={editedGoals.newMotivation}
                      onChange={(e) => setEditedGoals({ ...editedGoals, newMotivation: e.target.value })}
                      placeholder="Add a motivation..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addMotivation()
                        }
                      }}
                    />
                    <Button variant="outline" onClick={addMotivation}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {editedGoals.motivations.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {editedGoals.motivations.map((motivation, index) => (
                        <Badge
                          key={index}
                          variant="success"
                          className="cursor-pointer"
                          onClick={() => removeMotivation(index)}
                        >
                          {motivation} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Challenges
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={editedGoals.newChallenge}
                      onChange={(e) => setEditedGoals({ ...editedGoals, newChallenge: e.target.value })}
                      placeholder="Add a challenge..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addChallenge()
                        }
                      }}
                    />
                    <Button variant="outline" onClick={addChallenge}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {editedGoals.challenges.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {editedGoals.challenges.map((challenge, index) => (
                        <Badge
                          key={index}
                          variant="warning"
                          className="cursor-pointer"
                          onClick={() => removeChallenge(index)}
                        >
                          {challenge} <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSaveGoals} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save Goals
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* AI Evaluations History */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              AI Evaluation History
            </h3>
            <div className="space-y-4">
              {allEvaluations.length === 0 ? (
                <div className="text-center py-8">
                  <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    No evaluations yet. Keep tracking your progress!
                  </p>
                </div>
              ) : (
                allEvaluations.map((evaluation) => (
                  <Card
                    key={evaluation.id}
                    className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {new Date(evaluation.evaluatedAt).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <Badge variant="info">{evaluation.period} Evaluation</Badge>
                      </div>
                      <Badge variant={evaluation.progress.onTrack ? 'success' : 'warning'}>
                        {evaluation.progress.percentageToGoal.toFixed(0)}% Complete
                      </Badge>
                    </div>

                    {/* Progress Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          <Weight className="w-3 h-3 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Weight</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {evaluation.progress.weightChange > 0 ? '+' : ''}
                          {evaluation.progress.weightChange.toFixed(1)}kg
                        </p>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          <Activity className="w-3 h-3 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Body Fat</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {(evaluation.progress.bodyFatChange ?? 0) > 0 ? '+' : ''}
                          {(evaluation.progress.bodyFatChange ?? 0).toFixed(1)}%
                        </p>
                      </div>

                      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingUp className="w-3 h-3 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Status</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {evaluation.progress.onTrack ? 'On Track' : 'Behind'}
                        </p>
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        AI Insights
                      </h4>
                      <ul className="space-y-1">
                        {evaluation.insights.map((insight, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendations */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Recommendations
                      </h4>
                      <ul className="space-y-1">
                        {evaluation.recommendations.map((rec, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                          >
                            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Milestones */}
                    {evaluation.milestonesAchieved.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Milestones Achieved
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {evaluation.milestonesAchieved.map((milestone, index) => (
                            <Badge key={index} variant="success">
                              <Award className="w-3 h-3 mr-1" />
                              {milestone}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Motivations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Your Motivations
            </h3>
            {(assessment.goals.motivations?.length ?? 0) === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 text-center py-4">
                No motivations added yet
              </p>
            ) : (
              <ul className="space-y-2">
                {assessment.goals.motivations?.map((motivation, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{motivation}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Challenges */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Your Challenges
            </h3>
            {(assessment.goals.challenges?.length ?? 0) === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 text-center py-4">
                No challenges identified
              </p>
            ) : (
              <ul className="space-y-2">
                {assessment.goals.challenges?.map((challenge, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                  >
                    <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{challenge}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full" onClick={() => router.push('/fitness/ai-workout')}>
                <Target className="w-4 h-4 mr-2" />
                View Workout Plan
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push('/fitness/ai-progress')}>
                <Activity className="w-4 h-4 mr-2" />
                Track Progress
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push('/fitness/ai-assessment')}>
                <Sparkles className="w-4 h-4 mr-2" />
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
                  AI Goal Tip
                </h4>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Review your goals regularly and adjust them based on your progress. Our AI will provide weekly
                  evaluations to help you stay on track and achieve your{' '}
                  {assessment.goals.primaryGoal.toLowerCase().replace('_', ' ')} goal.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
