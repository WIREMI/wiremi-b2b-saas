'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  User,
  Activity,
  Utensils,
  Heart,
  Target,
  AlertCircle,
  Info,
} from 'lucide-react'
import type {
  UserFitnessAssessment,
  FitnessGoal,
  ActivityLevel,
  Gender,
  WorkType,
  AlcoholConsumption,
  DietaryPreference,
  MealTiming,
} from '@/types/ai-fitness'
import { calculateBMI, getBMICategory } from '@/types/ai-fitness'

type AssessmentStep = 'metrics' | 'medical' | 'lifestyle' | 'dietary' | 'goals' | 'review'

export default function AIFitnessAssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('metrics')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [metrics, setMetrics] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '' as Gender | '',
    bodyFatPercentage: '',
  })

  const [medical, setMedical] = useState({
    hasInjuries: false,
    injuries: [] as string[],
    injuryInput: '',
    hasChronicConditions: false,
    conditions: [] as string[],
    conditionInput: '',
    medications: [] as string[],
    medicationInput: '',
    restrictions: [] as string[],
    restrictionInput: '',
    disclaimerAccepted: false,
  })

  const [lifestyle, setLifestyle] = useState({
    activityLevel: '' as ActivityLevel | '',
    sleepHoursPerNight: '',
    sleepQuality: 3,
    workType: '' as WorkType | '',
    stressLevel: 3,
    smoker: false,
    alcoholConsumption: '' as AlcoholConsumption | '',
  })

  const [dietary, setDietary] = useState({
    mealFrequency: '',
    mealTiming: '' as MealTiming | '',
    dietaryPreferences: [] as DietaryPreference[],
    allergies: [] as string[],
    allergyInput: '',
    waterIntakeLiters: '',
    calorieIntakeDaily: '',
  })

  const [goals, setGoals] = useState({
    primaryGoal: '' as FitnessGoal | '',
    targetWeight: '',
    targetTimeline: '',
    motivations: [] as string[],
    motivationInput: '',
    challenges: [] as string[],
    challengeInput: '',
  })

  const steps: { id: AssessmentStep; title: string; icon: React.ReactNode }[] = [
    { id: 'metrics', title: 'Body Metrics', icon: <User className="w-5 h-5" /> },
    { id: 'medical', title: 'Medical History', icon: <Heart className="w-5 h-5" /> },
    { id: 'lifestyle', title: 'Lifestyle', icon: <Activity className="w-5 h-5" /> },
    { id: 'dietary', title: 'Dietary Habits', icon: <Utensils className="w-5 h-5" /> },
    { id: 'goals', title: 'Goals', icon: <Target className="w-5 h-5" /> },
    { id: 'review', title: 'Review', icon: <CheckCircle className="w-5 h-5" /> },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id)
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push('/fitness/ai-workout')
  }

  const addToList = (list: string[], input: string, setList: (list: string[]) => void, clearInput: () => void) => {
    if (input.trim()) {
      setList([...list, input.trim()])
      clearInput()
    }
  }

  const removeFromList = (list: string[], index: number, setList: (list: string[]) => void) => {
    setList(list.filter((_, i) => i !== index))
  }

  const toggleDietaryPreference = (pref: DietaryPreference) => {
    if (dietary.dietaryPreferences.includes(pref)) {
      setDietary({ ...dietary, dietaryPreferences: dietary.dietaryPreferences.filter((p) => p !== pref) })
    } else {
      setDietary({ ...dietary, dietaryPreferences: [...dietary.dietaryPreferences, pref] })
    }
  }

  const bmi = metrics.weight && metrics.height ? calculateBMI(Number(metrics.weight), Number(metrics.height)) : null
  const bmiCategory = bmi ? getBMICategory(bmi) : null

  const canProceed = () => {
    switch (currentStep) {
      case 'metrics':
        return metrics.weight && metrics.height && metrics.age && metrics.gender
      case 'medical':
        return medical.disclaimerAccepted
      case 'lifestyle':
        return lifestyle.activityLevel && lifestyle.sleepHoursPerNight && lifestyle.workType && lifestyle.alcoholConsumption
      case 'dietary':
        return dietary.mealFrequency && dietary.mealTiming && dietary.waterIntakeLiters
      case 'goals':
        return goals.primaryGoal && goals.targetTimeline
      case 'review':
        return true
      default:
        return false
    }
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Fitness Assessment
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Let AI create your personalized fitness plan
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="grid grid-cols-6 gap-2 mb-8">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              disabled={index > currentStepIndex}
              className={`p-3 rounded-xl border-2 transition-all ${
                step.id === currentStep
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : index < currentStepIndex
                  ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card opacity-50'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`${
                    step.id === currentStep
                      ? 'text-blue-600 dark:text-blue-400'
                      : index < currentStepIndex
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400'
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-xs font-medium hidden md:block ${
                    step.id === currentStep
                      ? 'text-blue-900 dark:text-blue-200'
                      : index < currentStepIndex
                      ? 'text-green-900 dark:text-green-200'
                      : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        <Card className="p-8">
          {/* Step: Metrics */}
          {currentStep === 'metrics' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Body Metrics</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Basic physical measurements</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Weight (kg) *
                  </label>
                  <Input
                    type="number"
                    value={metrics.weight}
                    onChange={(e) => setMetrics({ ...metrics, weight: e.target.value })}
                    placeholder="70"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Height (cm) *
                  </label>
                  <Input
                    type="number"
                    value={metrics.height}
                    onChange={(e) => setMetrics({ ...metrics, height: e.target.value })}
                    placeholder="170"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age *</label>
                  <Input
                    type="number"
                    value={metrics.age}
                    onChange={(e) => setMetrics({ ...metrics, age: e.target.value })}
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender *</label>
                  <select
                    value={metrics.gender}
                    onChange={(e) => setMetrics({ ...metrics, gender: e.target.value as Gender })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Body Fat % (optional)
                  </label>
                  <Input
                    type="number"
                    value={metrics.bodyFatPercentage}
                    onChange={(e) => setMetrics({ ...metrics, bodyFatPercentage: e.target.value })}
                    placeholder="25"
                  />
                </div>
              </div>

              {bmi && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                        Your BMI: {bmi.toFixed(1)} ({bmiCategory})
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                        This will help us create a personalized fitness plan for you
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step: Medical */}
          {currentStep === 'medical' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                  <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Medical History</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Help us keep you safe</p>
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-900 dark:text-orange-200">Medical Disclaimer</p>
                    <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                      This AI fitness assessment is for guidance only and does not replace professional medical advice.
                      Consult your doctor before starting any exercise program.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={medical.hasInjuries}
                    onChange={(e) => setMedical({ ...medical, hasInjuries: e.target.checked })}
                    className="w-5 h-5 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">I have injuries or pain</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Check this if you have any current injuries or chronic pain
                    </p>
                  </div>
                </label>
              </div>

              {medical.hasInjuries && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Describe your injuries
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={medical.injuryInput}
                      onChange={(e) => setMedical({ ...medical, injuryInput: e.target.value })}
                      placeholder="e.g., Lower back pain, Knee injury"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addToList(
                            medical.injuries,
                            medical.injuryInput,
                            (list) => setMedical({ ...medical, injuries: list }),
                            () => setMedical({ ...medical, injuryInput: '' })
                          )
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        addToList(
                          medical.injuries,
                          medical.injuryInput,
                          (list) => setMedical({ ...medical, injuries: list }),
                          () => setMedical({ ...medical, injuryInput: '' })
                        )
                      }
                    >
                      Add
                    </Button>
                  </div>
                  {medical.injuries.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {medical.injuries.map((injury, index) => (
                        <Badge
                          key={index}
                          variant="error"
                          className="cursor-pointer"
                          onClick={() => removeFromList(medical.injuries, index, (list) => setMedical({ ...medical, injuries: list }))}
                        >
                          {injury} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={medical.hasChronicConditions}
                    onChange={(e) => setMedical({ ...medical, hasChronicConditions: e.target.checked })}
                    className="w-5 h-5 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      I have chronic health conditions
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      e.g., Diabetes, heart disease, asthma
                    </p>
                  </div>
                </label>
              </div>

              {medical.hasChronicConditions && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Describe your conditions
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={medical.conditionInput}
                      onChange={(e) => setMedical({ ...medical, conditionInput: e.target.value })}
                      placeholder="e.g., Type 2 Diabetes, Asthma"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addToList(
                            medical.conditions,
                            medical.conditionInput,
                            (list) => setMedical({ ...medical, conditions: list }),
                            () => setMedical({ ...medical, conditionInput: '' })
                          )
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        addToList(
                          medical.conditions,
                          medical.conditionInput,
                          (list) => setMedical({ ...medical, conditions: list }),
                          () => setMedical({ ...medical, conditionInput: '' })
                        )
                      }
                    >
                      Add
                    </Button>
                  </div>
                  {medical.conditions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {medical.conditions.map((condition, index) => (
                        <Badge
                          key={index}
                          variant="warning"
                          className="cursor-pointer"
                          onClick={() =>
                            removeFromList(medical.conditions, index, (list) => setMedical({ ...medical, conditions: list }))
                          }
                        >
                          {condition} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={medical.disclaimerAccepted}
                    onChange={(e) => setMedical({ ...medical, disclaimerAccepted: e.target.checked })}
                    className="w-5 h-5 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      I understand and accept the medical disclaimer *
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      I acknowledge that this AI guidance does not replace professional medical advice
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step: Lifestyle */}
          {currentStep === 'lifestyle' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Lifestyle</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your daily activity and habits</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Activity Level *
                </label>
                <select
                  value={lifestyle.activityLevel}
                  onChange={(e) => setLifestyle({ ...lifestyle, activityLevel: e.target.value as ActivityLevel })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select activity level</option>
                  <option value="SEDENTARY">Sedentary (little to no exercise)</option>
                  <option value="LIGHTLY_ACTIVE">Lightly Active (1-3 days/week)</option>
                  <option value="MODERATELY_ACTIVE">Moderately Active (3-5 days/week)</option>
                  <option value="VERY_ACTIVE">Very Active (6-7 days/week)</option>
                  <option value="EXTREMELY_ACTIVE">Extremely Active (athlete/physical job)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sleep Hours Per Night *
                  </label>
                  <Input
                    type="number"
                    step="0.5"
                    value={lifestyle.sleepHoursPerNight}
                    onChange={(e) => setLifestyle({ ...lifestyle, sleepHoursPerNight: e.target.value })}
                    placeholder="7"
                  />
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
                      value={lifestyle.sleepQuality}
                      onChange={(e) => setLifestyle({ ...lifestyle, sleepQuality: Number(e.target.value) })}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-8">
                      {lifestyle.sleepQuality}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">1 = Poor, 5 = Excellent</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Work Type *</label>
                <select
                  value={lifestyle.workType}
                  onChange={(e) => setLifestyle({ ...lifestyle, workType: e.target.value as WorkType })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Select work type</option>
                  <option value="DESK_JOB">Desk Job (sitting most of day)</option>
                  <option value="STANDING">Standing (retail, teaching)</option>
                  <option value="PHYSICAL">Physical (construction, delivery)</option>
                  <option value="MIXED">Mixed (combination)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stress Level (1-5)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={lifestyle.stressLevel}
                    onChange={(e) => setLifestyle({ ...lifestyle, stressLevel: Number(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-8">{lifestyle.stressLevel}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">1 = Low, 5 = Very High</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lifestyle.smoker}
                      onChange={(e) => setLifestyle({ ...lifestyle, smoker: e.target.checked })}
                      className="w-5 h-5 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">I smoke</p>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Alcohol Consumption *
                  </label>
                  <select
                    value={lifestyle.alcoholConsumption}
                    onChange={(e) => setLifestyle({ ...lifestyle, alcoholConsumption: e.target.value as AlcoholConsumption })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select frequency</option>
                    <option value="NONE">None</option>
                    <option value="OCCASIONAL">Occasional (1-2 times/month)</option>
                    <option value="MODERATE">Moderate (1-2 times/week)</option>
                    <option value="FREQUENT">Frequent (3+ times/week)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step: Dietary */}
          {currentStep === 'dietary' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Utensils className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dietary Habits</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your eating patterns and preferences</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meals Per Day *
                  </label>
                  <Input
                    type="number"
                    value={dietary.mealFrequency}
                    onChange={(e) => setDietary({ ...dietary, mealFrequency: e.target.value })}
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meal Timing *
                  </label>
                  <select
                    value={dietary.mealTiming}
                    onChange={(e) => setDietary({ ...dietary, mealTiming: e.target.value as MealTiming })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select timing</option>
                    <option value="BREAKFAST_LUNCH_DINNER">Breakfast, Lunch, Dinner</option>
                    <option value="SKIP_BREAKFAST">Skip Breakfast</option>
                    <option value="INTERMITTENT_FASTING">Intermittent Fasting</option>
                    <option value="FREQUENT_SMALL_MEALS">Frequent Small Meals</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dietary Preferences
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(['NONE', 'VEGETARIAN', 'VEGAN', 'PESCATARIAN', 'KETO', 'PALEO', 'HALAL', 'KOSHER'] as DietaryPreference[]).map(
                    (pref) => (
                      <label
                        key={pref}
                        className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          dietary.dietaryPreferences.includes(pref)
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={dietary.dietaryPreferences.includes(pref)}
                          onChange={() => toggleDietaryPreference(pref)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                          {pref.charAt(0) + pref.slice(1).toLowerCase().replace('_', ' ')}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Food Allergies</label>
                <div className="flex gap-2">
                  <Input
                    value={dietary.allergyInput}
                    onChange={(e) => setDietary({ ...dietary, allergyInput: e.target.value })}
                    placeholder="e.g., Peanuts, Dairy, Shellfish"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToList(
                          dietary.allergies,
                          dietary.allergyInput,
                          (list) => setDietary({ ...dietary, allergies: list }),
                          () => setDietary({ ...dietary, allergyInput: '' })
                        )
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      addToList(
                        dietary.allergies,
                        dietary.allergyInput,
                        (list) => setDietary({ ...dietary, allergies: list }),
                        () => setDietary({ ...dietary, allergyInput: '' })
                      )
                    }
                  >
                    Add
                  </Button>
                </div>
                {dietary.allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {dietary.allergies.map((allergy, index) => (
                      <Badge
                        key={index}
                        variant="error"
                        className="cursor-pointer"
                        onClick={() => removeFromList(dietary.allergies, index, (list) => setDietary({ ...dietary, allergies: list }))}
                      >
                        {allergy} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Water Intake (liters/day) *
                  </label>
                  <Input
                    type="number"
                    step="0.5"
                    value={dietary.waterIntakeLiters}
                    onChange={(e) => setDietary({ ...dietary, waterIntakeLiters: e.target.value })}
                    placeholder="2.0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Daily Calorie Intake (optional)
                  </label>
                  <Input
                    type="number"
                    value={dietary.calorieIntakeDaily}
                    onChange={(e) => setDietary({ ...dietary, calorieIntakeDaily: e.target.value })}
                    placeholder="2000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step: Goals */}
          {currentStep === 'goals' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Fitness Goals</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">What do you want to achieve?</p>
                </div>
              </div>

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
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        goals.primaryGoal === goal
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={goals.primaryGoal === goal}
                        onChange={() => setGoals({ ...goals, primaryGoal: goal })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {goal.split('_').map((w) => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {(goals.primaryGoal === 'WEIGHT_LOSS' || goals.primaryGoal === 'MUSCLE_GAIN') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Weight (kg)
                  </label>
                  <Input
                    type="number"
                    value={goals.targetWeight}
                    onChange={(e) => setGoals({ ...goals, targetWeight: e.target.value })}
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
                  value={goals.targetTimeline}
                  onChange={(e) => setGoals({ ...goals, targetTimeline: e.target.value })}
                  placeholder="12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What motivates you?
                </label>
                <div className="flex gap-2">
                  <Input
                    value={goals.motivationInput}
                    onChange={(e) => setGoals({ ...goals, motivationInput: e.target.value })}
                    placeholder="e.g., Upcoming event, Health, Confidence"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToList(
                          goals.motivations,
                          goals.motivationInput,
                          (list) => setGoals({ ...goals, motivations: list }),
                          () => setGoals({ ...goals, motivationInput: '' })
                        )
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      addToList(
                        goals.motivations,
                        goals.motivationInput,
                        (list) => setGoals({ ...goals, motivations: list }),
                        () => setGoals({ ...goals, motivationInput: '' })
                      )
                    }
                  >
                    Add
                  </Button>
                </div>
                {goals.motivations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {goals.motivations.map((motivation, index) => (
                      <Badge
                        key={index}
                        variant="success"
                        className="cursor-pointer"
                        onClick={() =>
                          removeFromList(goals.motivations, index, (list) => setGoals({ ...goals, motivations: list }))
                        }
                      >
                        {motivation} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What are your biggest challenges?
                </label>
                <div className="flex gap-2">
                  <Input
                    value={goals.challengeInput}
                    onChange={(e) => setGoals({ ...goals, challengeInput: e.target.value })}
                    placeholder="e.g., Time, Motivation, Knowledge"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToList(
                          goals.challenges,
                          goals.challengeInput,
                          (list) => setGoals({ ...goals, challenges: list }),
                          () => setGoals({ ...goals, challengeInput: '' })
                        )
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      addToList(
                        goals.challenges,
                        goals.challengeInput,
                        (list) => setGoals({ ...goals, challenges: list }),
                        () => setGoals({ ...goals, challengeInput: '' })
                      )
                    }
                  >
                    Add
                  </Button>
                </div>
                {goals.challenges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {goals.challenges.map((challenge, index) => (
                      <Badge
                        key={index}
                        variant="warning"
                        className="cursor-pointer"
                        onClick={() =>
                          removeFromList(goals.challenges, index, (list) => setGoals({ ...goals, challenges: list }))
                        }
                      >
                        {challenge} ×
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step: Review */}
          {currentStep === 'review' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Review & Submit</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Review your information before generating your AI fitness plan
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Body Metrics</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Weight:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">{metrics.weight} kg</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Height:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">{metrics.height} cm</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Age:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">{metrics.age}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Gender:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">{metrics.gender}</span>
                    </div>
                    {bmi && (
                      <div className="col-span-2">
                        <span className="text-gray-600 dark:text-gray-400">BMI:</span>{' '}
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {bmi.toFixed(1)} ({bmiCategory})
                        </span>
                      </div>
                    )}
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Medical History</h3>
                  <div className="space-y-2 text-sm">
                    {medical.hasInjuries && medical.injuries.length > 0 && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Injuries:</span>{' '}
                        <span className="font-medium text-gray-900 dark:text-gray-100">{medical.injuries.join(', ')}</span>
                      </div>
                    )}
                    {medical.hasChronicConditions && medical.conditions.length > 0 && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Conditions:</span>{' '}
                        <span className="font-medium text-gray-900 dark:text-gray-100">{medical.conditions.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Medical disclaimer accepted</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Lifestyle</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Activity:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {lifestyle.activityLevel?.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Sleep:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {lifestyle.sleepHoursPerNight}h (quality: {lifestyle.sleepQuality}/5)
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Work:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">{lifestyle.workType?.replace('_', ' ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Stress:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">{lifestyle.stressLevel}/5</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Dietary Habits</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Meals/Day:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">{dietary.mealFrequency}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Timing:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {dietary.mealTiming?.replace(/_/g, ' ')}
                      </span>
                    </div>
                    {dietary.dietaryPreferences.length > 0 && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Preferences:</span>{' '}
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {dietary.dietaryPreferences.join(', ')}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Water:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">{dietary.waterIntakeLiters}L/day</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Fitness Goals</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Primary Goal:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {goals.primaryGoal?.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ')}
                      </span>
                    </div>
                    {goals.targetWeight && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Target Weight:</span>{' '}
                        <span className="font-medium text-gray-900 dark:text-gray-100">{goals.targetWeight} kg</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Timeline:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-gray-100">{goals.targetTimeline} weeks</span>
                    </div>
                    {goals.motivations.length > 0 && (
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Motivations:</span>{' '}
                        <span className="font-medium text-gray-900 dark:text-gray-100">{goals.motivations.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-200">Ready to Generate Your AI Plan</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      Our AI will create a personalized workout plan, nutrition guide, and lifestyle recommendations based on
                      your profile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={handleBack} disabled={currentStepIndex === 0}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep !== 'review' ? (
              <Button variant="primary" onClick={handleNext} disabled={!canProceed()}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Generating AI Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate My AI Fitness Plan
                  </>
                )}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
