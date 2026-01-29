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
  Utensils,
  Coffee,
  Sun,
  Sunset,
  Moon,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Info,
  Apple,
  Droplet,
  Target,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { getNutritionPlan, getUserAssessment, getLifestyleCoaching } from '@/lib/mock-data/ai-fitness'

export default function AINutritionPage() {
  const router = useRouter()
  const currentUserId = 'user-1' // Mock

  const nutritionPlan = getNutritionPlan(currentUserId)
  const assessment = getUserAssessment(currentUserId)
  const lifestylePlan = getLifestyleCoaching(currentUserId)

  if (!nutritionPlan) {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Nutrition Plan
          </h1>
        </div>
        <EmptyState
          icon={<Utensils className="w-12 h-12" />}
          title="No nutrition plan found"
          description="Complete your fitness assessment to get your personalized AI nutrition plan"
          action={{
            label: 'Start Assessment',
            onClick: () => router.push('/fitness/ai-assessment'),
            icon: <Sparkles className="w-4 h-4" />
          }}
        />
      </PageLayout>
    )
  }

  const totalDailyMacros = nutritionPlan.mealSuggestions.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  )

  const getMealIcon = (type: string) => {
    switch (type) {
      case 'BREAKFAST':
        return <Coffee className="w-5 h-5" />
      case 'LUNCH':
        return <Sun className="w-5 h-5" />
      case 'SNACK':
        return <Apple className="w-5 h-5" />
      case 'DINNER':
        return <Moon className="w-5 h-5" />
      default:
        return <Utensils className="w-5 h-5" />
    }
  }

  const getMealColor = (type: string) => {
    switch (type) {
      case 'BREAKFAST':
        return 'orange'
      case 'LUNCH':
        return 'yellow'
      case 'SNACK':
        return 'green'
      case 'DINNER':
        return 'blue'
      default:
        return 'gray'
    }
  }

  const calculateMacroPercentage = (macro: number, total: number) => {
    return Math.round((macro / total) * 100)
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Nutrition Plan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personalized diet and nutrition guidance
        </p>
      </div>

      {/* Header Banner */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Your AI-Powered Nutrition Plan
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Generated on {new Date(nutritionPlan.generatedAt).toLocaleDateString()} • Valid until{' '}
                {new Date(nutritionPlan.validUntil).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Goal: {nutritionPlan.goal.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {nutritionPlan.dailyCalorieTarget} cal/day
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={() => router.push('/fitness/ai-workout')}>
            View Workout Plan
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Macro Targets */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Daily Macro Targets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Calories</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {nutritionPlan.dailyCalorieTarget}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">kcal/day</p>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Protein</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {nutritionPlan.macroTargets.proteinGrams}g
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                  {calculateMacroPercentage(
                    nutritionPlan.macroTargets.proteinGrams * 4,
                    nutritionPlan.dailyCalorieTarget
                  )}
                  % of calories
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Carbs</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {nutritionPlan.macroTargets.carbsGrams}g
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                  {calculateMacroPercentage(
                    nutritionPlan.macroTargets.carbsGrams * 4,
                    nutritionPlan.dailyCalorieTarget
                  )}
                  % of calories
                </p>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fats</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {nutritionPlan.macroTargets.fatsGrams}g
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                  {calculateMacroPercentage(
                    nutritionPlan.macroTargets.fatsGrams * 9,
                    nutritionPlan.dailyCalorieTarget
                  )}
                  % of calories
                </p>
              </div>
            </div>
          </Card>

          {/* Meal Suggestions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Daily Meal Plan</h3>
            {nutritionPlan.mealSuggestions.map((meal) => (
              <Card key={meal.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-${getMealColor(meal.type)}-100 dark:bg-${getMealColor(meal.type)}-900/30 rounded-xl`}>
                    {getMealIcon(meal.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {meal.name}
                          </h4>
                          <Badge variant={getMealColor(meal.type) as any}>
                            {meal.type}
                          </Badge>
                        </div>
                        {meal.timing && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Suggested time: {meal.timing}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {meal.calories}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-400">calories</p>
                      </div>
                    </div>

                    {/* Macros */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Protein</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{meal.protein}g</p>
                      </div>
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Carbs</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{meal.carbs}g</p>
                      </div>
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Fats</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{meal.fats}g</p>
                      </div>
                    </div>

                    {/* Ingredients */}
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ingredients:</p>
                      <div className="flex flex-wrap gap-2">
                        {meal.ingredients.map((ingredient, index) => (
                          <Badge key={index} variant="default">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Preparation */}
                    {meal.preparation && meal.preparation.length > 0 && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preparation:</p>
                        <ol className="space-y-1 list-decimal list-inside">
                          {meal.preparation.map((step, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Alternatives */}
                    {meal.alternatives && meal.alternatives.length > 0 && (
                      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-blue-900 dark:text-blue-200 mb-1">
                              Alternative options:
                            </p>
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                              {meal.alternatives.join(' • ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Food Guidelines */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Nutritional Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Emphasize These Foods</h4>
                </div>
                <ul className="space-y-2">
                  {nutritionPlan.foodsToEmphasize.map((food, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">Reduce These Foods</h4>
                </div>
                <ul className="space-y-2">
                  {nutritionPlan.foodsToReduce.map((food, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Hydration */}
          {nutritionPlan.hydrationTarget && (
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Daily Hydration Target
                  </h3>
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {nutritionPlan.hydrationTarget}L
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Aim to drink at least {nutritionPlan.hydrationTarget} liters of water throughout the day. Increase
                    intake on workout days and in hot weather.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Disclaimer */}
          <Card className="p-6 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-200 mb-2">
                  Important Disclaimer
                </h4>
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  {nutritionPlan.disclaimer}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Today's Summary</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Meals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {nutritionPlan.mealSuggestions.length}
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Planned Calories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {totalDailyMacros.calories}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 mt-1">
                  Target: {nutritionPlan.dailyCalorieTarget} cal
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Macro Distribution</p>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Protein</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {totalDailyMacros.protein}g
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{
                          width: `${(totalDailyMacros.protein / nutritionPlan.macroTargets.proteinGrams) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Carbs</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {totalDailyMacros.carbs}g
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{
                          width: `${(totalDailyMacros.carbs / nutritionPlan.macroTargets.carbsGrams) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Fats</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {totalDailyMacros.fats}g
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{
                          width: `${(totalDailyMacros.fats / nutritionPlan.macroTargets.fatsGrams) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Lifestyle Coaching */}
          {lifestylePlan && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Lifestyle Coaching
              </h3>
              <div className="space-y-3">
                {lifestylePlan.sleepRecommendations && lifestylePlan.sleepRecommendations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Sleep Tips</h4>
                    <ul className="space-y-1">
                      {lifestylePlan.sleepRecommendations.slice(0, 2).map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-3 h-3 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {lifestylePlan.stressManagement && lifestylePlan.stressManagement.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Stress Management</h4>
                    <ul className="space-y-1">
                      {lifestylePlan.stressManagement.slice(0, 2).map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-3 h-3 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* AI Insight */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-200 mb-2">
                  AI Nutrition Tip
                </h4>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Meal prep on weekends to stay on track! Preparing {nutritionPlan.mealSuggestions.length} meals in advance
                  ensures you meet your {nutritionPlan.dailyCalorieTarget} calorie target consistently. Track your meals
                  daily for best results.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
