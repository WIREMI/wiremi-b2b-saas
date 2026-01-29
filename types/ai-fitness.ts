// AI Gym & Fitness Coaching Module - TypeScript Type Definitions
// Embedded Intelligence for Gyms & Coaches

// ============================================================================
// ENUMS & BASIC TYPES
// ============================================================================

/**
 * User's primary fitness goal
 */
export type FitnessGoal =
  | 'WEIGHT_LOSS'
  | 'MUSCLE_GAIN'
  | 'ENDURANCE'
  | 'FLEXIBILITY'
  | 'REHAB'
  | 'WELLNESS'
  | 'GENERAL_FITNESS'

/**
 * Activity level for lifestyle assessment
 */
export type ActivityLevel =
  | 'SEDENTARY'        // Little to no exercise
  | 'LIGHTLY_ACTIVE'   // Light exercise 1-3 days/week
  | 'MODERATELY_ACTIVE' // Moderate exercise 3-5 days/week
  | 'VERY_ACTIVE'      // Hard exercise 6-7 days/week
  | 'EXTREMELY_ACTIVE' // Very hard exercise & physical job

/**
 * Exercise types
 */
export type ExerciseType =
  | 'CARDIO'
  | 'STRENGTH'
  | 'FLEXIBILITY'
  | 'HIIT'
  | 'YOGA'
  | 'PILATES'
  | 'FUNCTIONAL'
  | 'SPORTS'

/**
 * Workout intensity levels
 */
export type WorkoutIntensity =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'EXPERT'

/**
 * Meal timing preferences
 */
export type MealTiming =
  | 'BREAKFAST_LUNCH_DINNER'
  | 'INTERMITTENT_FASTING'
  | 'FREQUENT_SMALL_MEALS'
  | 'TWO_MEALS_DAILY'

/**
 * Dietary preferences
 */
export type DietaryPreference =
  | 'NONE'
  | 'VEGETARIAN'
  | 'VEGAN'
  | 'PESCATARIAN'
  | 'KETO'
  | 'PALEO'
  | 'MEDITERRANEAN'
  | 'LOW_CARB'
  | 'HIGH_PROTEIN'

/**
 * Progress evaluation period
 */
export type EvaluationPeriod =
  | 'WEEKLY'
  | 'BI_WEEKLY'
  | 'MONTHLY'
  | 'QUARTERLY'

/**
 * Recommendation status
 */
export type RecommendationStatus =
  | 'ACTIVE'
  | 'COMPLETED'
  | 'SKIPPED'
  | 'ADJUSTED'

/**
 * Gender for fitness calculations
 */
export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY'

/**
 * Work type for lifestyle assessment
 */
export type WorkType = 'DESK_JOB' | 'STANDING' | 'PHYSICAL' | 'MIXED'

/**
 * Alcohol consumption level
 */
export type AlcoholConsumption = 'NONE' | 'OCCASIONAL' | 'MODERATE' | 'FREQUENT'

// ============================================================================
// INTERFACES - USER PROFILE & ASSESSMENT
// ============================================================================

/**
 * Basic user metrics
 */
export interface UserMetrics {
  weight: number          // in kg
  height: number          // in cm
  age: number
  gender: Gender
  bodyFatPercentage?: number
  muscleMass?: number     // in kg
  bmi?: number           // calculated
}

/**
 * Medical considerations and constraints
 */
export interface MedicalProfile {
  hasInjuries: boolean
  injuries?: string[]
  hasChronicConditions: boolean
  chronicConditions?: string[]
  medications?: string[]
  restrictions?: string[]
  notes?: string
  disclaimerAccepted: boolean
  disclaimerAcceptedAt: string // ISO datetime
}

/**
 * Lifestyle factors
 */
export interface LifestyleProfile {
  activityLevel: ActivityLevel
  sleepHoursPerNight: number
  sleepQuality: 1 | 2 | 3 | 4 | 5 // 1 = poor, 5 = excellent
  workType: WorkType
  stressLevel: 1 | 2 | 3 | 4 | 5 // 1 = low, 5 = high
  smoker: boolean
  alcoholConsumption: AlcoholConsumption
}

/**
 * Dietary habits
 */
export interface DietaryProfile {
  mealFrequency: number
  mealTiming: MealTiming
  dietaryPreferences: DietaryPreference[]
  waterIntakeLiters: number
  calorieIntakeDaily?: number
  proteinIntakeGrams?: number
  favoriteFoods?: string[]
  dislikedFoods?: string[]
  allergies?: string[]
}

/**
 * User's fitness goals
 */
export interface FitnessGoalProfile {
  primaryGoal: FitnessGoal
  secondaryGoals?: FitnessGoal[]
  targetWeight?: number // in kg
  targetBodyFat?: number // percentage
  targetMuscleGain?: number // in kg
  targetTimeline: number // in weeks
  motivations?: string[]
  challenges?: string[]
}

/**
 * Complete user fitness assessment
 */
export interface UserFitnessAssessment {
  id: string
  userId: string
  userName: string
  createdAt: string // ISO datetime
  updatedAt: string // ISO datetime

  // Profile sections
  metrics: UserMetrics
  medical: MedicalProfile
  lifestyle: LifestyleProfile
  dietary: DietaryProfile
  goals: FitnessGoalProfile

  // Current fitness level
  currentFitnessLevel: WorkoutIntensity
  experienceYears?: number

  // Gym membership
  gymId?: string
  gymName?: string
  assignedCoachId?: string
  assignedCoachName?: string
}

// ============================================================================
// INTERFACES - AI RECOMMENDATIONS
// ============================================================================

/**
 * Individual exercise in a workout
 */
export interface Exercise {
  id: string
  name: string
  type: ExerciseType
  description: string
  sets: number
  reps: number | string // can be "10-12" or "30 seconds"
  restSeconds: number
  equipment?: string[]
  muscleGroups: string[]
  calories: number
  videoUrl?: string
  imageUrl?: string
  notes?: string
  safetyTips?: string[]
}

/**
 * Workout session
 */
export interface WorkoutSession {
  id: string
  name: string
  description: string
  type: ExerciseType[]
  intensity: WorkoutIntensity
  durationMinutes: number
  caloriesBurn: number
  exercises: Exercise[]
  warmUp?: Exercise[]
  coolDown?: Exercise[]
  notes?: string
}

/**
 * AI-generated workout plan
 */
export interface AIWorkoutPlan {
  id: string
  userId: string
  generatedAt: string
  validFrom: string
  validUntil: string

  goal: FitnessGoal
  intensity: WorkoutIntensity
  weeklyFrequency: number // sessions per week

  sessions: WorkoutSession[]

  progressionPlan: {
    week: number
    changes: string[]
  }[]

  safetyGuidelines: string[]
  status: RecommendationStatus
}

/**
 * Nutrition meal suggestion
 */
export interface MealSuggestion {
  id: string
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK'
  name: string
  description: string
  calories: number
  protein: number
  carbs: number
  fats: number
  ingredients: string[]
  preparation?: string[]
  timing?: string
  alternatives?: string[]
}

/**
 * AI-generated nutrition plan
 */
export interface AINutritionPlan {
  id: string
  userId: string
  generatedAt: string
  validFrom: string
  validUntil: string

  goal: FitnessGoal
  dailyCalorieTarget: number
  macroTargets: {
    proteinGrams: number
    carbsGrams: number
    fatsGrams: number
  }

  mealSuggestions: MealSuggestion[]
  hydrationGoalLiters: number
  hydrationTarget?: number

  guidelines: string[]
  foodsToEmphasize: string[]
  foodsToReduce: string[]

  status: RecommendationStatus

  disclaimer: string
}

/**
 * Lifestyle recommendation
 */
export interface LifestyleRecommendation {
  id: string
  category: 'SLEEP' | 'RECOVERY' | 'STRESS' | 'HABITS'
  title: string
  description: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  actionItems: string[]
  expectedBenefits: string[]
}

/**
 * AI-generated lifestyle coaching
 */
export interface AILifestyleCoaching {
  id: string
  userId: string
  generatedAt: string

  recommendations: LifestyleRecommendation[]
  restDaysSuggested: number
  sleepTargetHours: number
  recoveryRoutines: string[]
  stressManagementTips: string[]
  sleepRecommendations?: string[]
  stressManagement?: string[]

  status: RecommendationStatus
}

// ============================================================================
// INTERFACES - PROGRESS TRACKING
// ============================================================================

/**
 * Progress measurement
 */
export interface ProgressMeasurement {
  id: string
  userId: string
  recordedAt: string

  // Physical metrics
  weight: number
  bodyFatPercentage?: number
  muscleMass?: number
  measurements?: {
    chest?: number
    waist?: number
    hips?: number
    arms?: number
    thighs?: number
  }

  // Performance metrics
  stamina?: number // 1-10 scale
  strength?: number // 1-10 scale
  flexibility?: number // 1-10 scale

  // Subjective assessments
  energyLevel: 1 | 2 | 3 | 4 | 5
  mood: 1 | 2 | 3 | 4 | 5
  sleepQuality: 1 | 2 | 3 | 4 | 5

  photos?: string[]
  notes?: string
}

/**
 * Goal progress evaluation
 */
export interface GoalEvaluation {
  id: string
  userId: string
  evaluatedAt: string
  period: EvaluationPeriod

  // Baseline (starting point)
  baseline: ProgressMeasurement

  // Current state
  current: ProgressMeasurement

  // Target
  target: {
    weight?: number
    bodyFat?: number
    muscleMass?: number
    timeline: string // ISO date
  }

  // Analysis
  progress: {
    weightChange: number
    bodyFatChange?: number
    muscleMassChange?: number
    percentageToGoal: number
    onTrack: boolean
    daysRemaining: number
  }

  // AI insights
  insights: string[]
  recommendations: string[]
  adjustments: string[]

  // Milestones
  milestonesAchieved: string[]
  nextMilestone?: string
}

/**
 * Workout completion log
 */
export interface WorkoutLog {
  id: string
  userId: string
  workoutId: string
  workoutName: string
  completedAt: string
  durationMinutes: number
  caloriesBurned: number
  intensity: 1 | 2 | 3 | 4 | 5
  mood: 1 | 2 | 3 | 4 | 5
  notes?: string
  exercisesCompleted: {
    exerciseId: string
    exerciseName: string
    setsCompleted: number
    actualReps: number[]
    weight?: number[]
  }[]
}

// ============================================================================
// INTERFACES - COACH ASSISTANT
// ============================================================================

/**
 * Coach talking points for a member
 */
export interface CoachTalkingPoints {
  userId: string
  userName: string
  generatedAt: string

  // Quick summary
  summary: string
  currentGoal: string
  progressStatus: 'ON_TRACK' | 'BEHIND' | 'AHEAD' | 'PLATEAU'

  // Today's guidance
  todaysWorkout?: string
  focusAreas: string[]
  encouragementPoints: string[]

  // Safety flags
  safetyFlags: {
    level: 'INFO' | 'WARNING' | 'CRITICAL'
    message: string
  }[]

  // Conversation starters
  conversationStarters: string[]

  // Recommendations to share
  recommendations: string[]
}

/**
 * Member summary for coaches
 */
export interface MemberSummary {
  userId: string
  userName: string
  userPhoto?: string

  // Basic info
  age: number
  goal: FitnessGoal
  memberSince: string

  // Current status
  currentWeight: number
  targetWeight?: number
  progress: number // percentage
  progressStatus?: 'ON_TRACK' | 'BEHIND' | 'AHEAD' | 'PLATEAU'

  // Recent activity
  lastWorkout?: string
  workoutsThisWeek: number
  adherenceRate: number // percentage

  // AI recommendations active
  activeWorkoutPlan: boolean
  activeNutritionPlan: boolean

  // Flags for coach attention
  needsAttention: boolean
  attentionReasons?: string[]
}

// ============================================================================
// INTERFACES - SYSTEM & CONFIGURATION
// ============================================================================

/**
 * Gym-specific AI configuration
 */
export interface GymAIConfiguration {
  gymId: string
  gymName: string

  // Features enabled
  enableWorkoutRecommendations: boolean
  enableNutritionGuidance: boolean
  enableLifestyleCoaching: boolean
  enableProgressTracking: boolean
  enableCoachAssistant: boolean

  // Default settings
  defaultEvaluationPeriod: EvaluationPeriod
  defaultWorkoutIntensity: WorkoutIntensity

  // Available equipment
  availableEquipment: string[]

  // Custom programs
  customPrograms?: {
    id: string
    name: string
    description: string
    targetGoal: FitnessGoal
  }[]

  // Branding
  brandedProgramName?: string
  logo?: string
}

/**
 * AI recommendation history
 */
export interface RecommendationHistory {
  id: string
  userId: string
  type: 'WORKOUT' | 'NUTRITION' | 'LIFESTYLE'
  generatedAt: string
  status: RecommendationStatus
  content: any // the actual recommendation
  adjustedFromId?: string
  adjustmentReason?: string
}

// ============================================================================
// FORM INPUT TYPES
// ============================================================================

/**
 * Initial assessment form input
 */
export interface AssessmentFormInput {
  // Metrics
  weight: number
  height: number
  age: number
  gender: Gender

  // Goals
  primaryGoal: FitnessGoal
  targetWeight?: number
  targetTimeline: number

  // Lifestyle
  activityLevel: ActivityLevel
  sleepHoursPerNight: number
  workType: string

  // Dietary
  mealFrequency: number
  dietaryPreferences: DietaryPreference[]
  waterIntakeLiters: number

  // Medical
  hasInjuries: boolean
  injuries?: string[]
  hasChronicConditions: boolean
  chronicConditions?: string[]
  restrictions?: string[]
  disclaimerAccepted: boolean
}

/**
 * Progress update input
 */
export interface ProgressUpdateInput {
  weight: number
  bodyFatPercentage?: number
  energyLevel: 1 | 2 | 3 | 4 | 5
  mood: 1 | 2 | 3 | 4 | 5
  sleepQuality: 1 | 2 | 3 | 4 | 5
  notes?: string
  photos?: File[]
}

// ============================================================================
// CONSTANTS & LABELS
// ============================================================================

export const FITNESS_GOAL_LABELS: Record<FitnessGoal, string> = {
  WEIGHT_LOSS: 'Weight Loss',
  MUSCLE_GAIN: 'Muscle Gain',
  ENDURANCE: 'Endurance & Stamina',
  FLEXIBILITY: 'Flexibility & Mobility',
  REHAB: 'Rehabilitation',
  WELLNESS: 'General Wellness',
  GENERAL_FITNESS: 'General Fitness'
}

export const ACTIVITY_LEVEL_LABELS: Record<ActivityLevel, string> = {
  SEDENTARY: 'Sedentary (Little to no exercise)',
  LIGHTLY_ACTIVE: 'Lightly Active (1-3 days/week)',
  MODERATELY_ACTIVE: 'Moderately Active (3-5 days/week)',
  VERY_ACTIVE: 'Very Active (6-7 days/week)',
  EXTREMELY_ACTIVE: 'Extremely Active (Daily + Physical job)'
}

export const WORKOUT_INTENSITY_LABELS: Record<WorkoutIntensity, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert'
}

export const EXERCISE_TYPE_LABELS: Record<ExerciseType, string> = {
  CARDIO: 'Cardiovascular',
  STRENGTH: 'Strength Training',
  FLEXIBILITY: 'Flexibility',
  HIIT: 'High-Intensity Interval Training',
  YOGA: 'Yoga',
  PILATES: 'Pilates',
  FUNCTIONAL: 'Functional Training',
  SPORTS: 'Sports & Recreation'
}

/**
 * BMI calculation
 */
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100
  return Number((weightKg / (heightM * heightM)).toFixed(1))
}

/**
 * BMI category
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

/**
 * Calorie needs estimation (Harris-Benedict Equation)
 */
export function estimateCalorieNeeds(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel
): number {
  // BMR calculation
  let bmr: number
  if (gender === 'MALE') {
    bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age)
  } else {
    bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age)
  }

  // Activity multiplier
  const multipliers: Record<ActivityLevel, number> = {
    SEDENTARY: 1.2,
    LIGHTLY_ACTIVE: 1.375,
    MODERATELY_ACTIVE: 1.55,
    VERY_ACTIVE: 1.725,
    EXTREMELY_ACTIVE: 1.9
  }

  return Math.round(bmr * multipliers[activityLevel])
}
