// AI Gym & Fitness Coaching Module - Mock Data
// Comprehensive dummy data demonstrating all AI features

import type {
  UserFitnessAssessment,
  AIWorkoutPlan,
  AINutritionPlan,
  AILifestyleCoaching,
  GoalEvaluation,
  ProgressMeasurement,
  WorkoutLog,
  CoachTalkingPoints,
  MemberSummary,
  FitnessGoal,
  WorkoutIntensity,
  Exercise,
  WorkoutSession
} from '@/types/ai-fitness'

// ============================================================================
// MOCK USER ASSESSMENTS
// ============================================================================

export const mockUserAssessments: UserFitnessAssessment[] = [
  // User 1: Weight Loss Journey
  {
    id: 'assessment-1',
    userId: 'user-1',
    userName: 'Sarah Mitchell',
    createdAt: '2026-01-01T08:00:00Z',
    updatedAt: '2026-01-22T10:30:00Z',
    metrics: {
      weight: 78,
      height: 165,
      age: 32,
      gender: 'FEMALE',
      bodyFatPercentage: 32,
      bmi: 28.7
    },
    medical: {
      hasInjuries: false,
      hasChronicConditions: false,
      disclaimerAccepted: true,
      disclaimerAcceptedAt: '2026-01-01T08:00:00Z'
    },
    lifestyle: {
      activityLevel: 'SEDENTARY',
      sleepHoursPerNight: 6.5,
      sleepQuality: 3,
      workType: 'DESK_JOB',
      stressLevel: 4,
      smoker: false,
      alcoholConsumption: 'OCCASIONAL'
    },
    dietary: {
      mealFrequency: 3,
      mealTiming: 'BREAKFAST_LUNCH_DINNER',
      dietaryPreferences: ['NONE'],
      waterIntakeLiters: 1.5,
      calorieIntakeDaily: 2200,
      favoriteFoods: ['Pasta', 'Pizza', 'Ice cream'],
      dislikedFoods: ['Brussel sprouts'],
      allergies: []
    },
    goals: {
      primaryGoal: 'WEIGHT_LOSS',
      targetWeight: 65,
      targetTimeline: 16, // weeks
      motivations: ['Upcoming wedding', 'Health concerns', 'Energy boost'],
      challenges: ['Late night snacking', 'Desk job', 'Stress eating']
    },
    currentFitnessLevel: 'BEGINNER',
    gymId: 'gym-001',
    gymName: 'FitLife Wellness Center',
    assignedCoachId: 'coach-1',
    assignedCoachName: 'Mark Johnson'
  },

  // User 2: Muscle Gain Focus
  {
    id: 'assessment-2',
    userId: 'user-2',
    userName: 'James Rodriguez',
    createdAt: '2025-12-15T09:00:00Z',
    updatedAt: '2026-01-22T11:00:00Z',
    metrics: {
      weight: 68,
      height: 178,
      age: 28,
      gender: 'MALE',
      bodyFatPercentage: 15,
      muscleMass: 52,
      bmi: 21.5
    },
    medical: {
      hasInjuries: true,
      injuries: ['Previous shoulder injury (recovered)'],
      hasChronicConditions: false,
      notes: 'Avoid overhead press until cleared',
      disclaimerAccepted: true,
      disclaimerAcceptedAt: '2025-12-15T09:00:00Z'
    },
    lifestyle: {
      activityLevel: 'MODERATELY_ACTIVE',
      sleepHoursPerNight: 7.5,
      sleepQuality: 4,
      workType: 'STANDING',
      stressLevel: 2,
      smoker: false,
      alcoholConsumption: 'OCCASIONAL'
    },
    dietary: {
      mealFrequency: 5,
      mealTiming: 'FREQUENT_SMALL_MEALS',
      dietaryPreferences: ['HIGH_PROTEIN'],
      waterIntakeLiters: 3,
      calorieIntakeDaily: 2800,
      proteinIntakeGrams: 150,
      favoriteFoods: ['Chicken', 'Rice', 'Eggs', 'Protein shakes'],
      dislikedFoods: [],
      allergies: []
    },
    goals: {
      primaryGoal: 'MUSCLE_GAIN',
      targetMuscleGain: 8,
      targetTimeline: 20,
      motivations: ['Bodybuilding competition', 'Strength goals'],
      challenges: ['Gaining weight', 'Eating enough calories']
    },
    currentFitnessLevel: 'INTERMEDIATE',
    experienceYears: 3,
    gymId: 'gym-001',
    gymName: 'FitLife Wellness Center',
    assignedCoachId: 'coach-1',
    assignedCoachName: 'Mark Johnson'
  },

  // User 3: General Wellness
  {
    id: 'assessment-3',
    userId: 'user-3',
    userName: 'Linda Chen',
    createdAt: '2026-01-10T14:00:00Z',
    updatedAt: '2026-01-22T09:00:00Z',
    metrics: {
      weight: 62,
      height: 160,
      age: 45,
      gender: 'FEMALE',
      bodyFatPercentage: 28,
      bmi: 24.2
    },
    medical: {
      hasInjuries: false,
      hasChronicConditions: true,
      chronicConditions: ['Type 2 Diabetes (managed)'],
      medications: ['Metformin'],
      restrictions: ['No high-impact exercises'],
      disclaimerAccepted: true,
      disclaimerAcceptedAt: '2026-01-10T14:00:00Z'
    },
    lifestyle: {
      activityLevel: 'LIGHTLY_ACTIVE',
      sleepHoursPerNight: 7,
      sleepQuality: 3,
      workType: 'MIXED',
      stressLevel: 3,
      smoker: false,
      alcoholConsumption: 'NONE'
    },
    dietary: {
      mealFrequency: 4,
      mealTiming: 'FREQUENT_SMALL_MEALS',
      dietaryPreferences: ['MEDITERRANEAN'],
      waterIntakeLiters: 2,
      calorieIntakeDaily: 1800,
      favoriteFoods: ['Fish', 'Vegetables', 'Olive oil', 'Nuts'],
      dislikedFoods: ['Red meat'],
      allergies: []
    },
    goals: {
      primaryGoal: 'WELLNESS',
      secondaryGoals: ['FLEXIBILITY'],
      targetWeight: 60,
      targetTimeline: 24,
      motivations: ['Diabetes management', 'Overall health', 'Energy'],
      challenges: ['Joint pain', 'Energy levels', 'Consistency']
    },
    currentFitnessLevel: 'BEGINNER',
    gymId: 'gym-001',
    gymName: 'FitLife Wellness Center'
  }
]

// ============================================================================
// MOCK AI WORKOUT PLANS
// ============================================================================

// Sample exercises library
const createExercise = (
  name: string,
  type: any,
  sets: number,
  reps: number | string,
  muscleGroups: string[]
): Exercise => ({
  id: `ex-${name.toLowerCase().replace(/\s/g, '-')}`,
  name,
  type,
  description: `${name} exercise`,
  sets,
  reps,
  restSeconds: 60,
  muscleGroups,
  calories: 50,
  safetyTips: ['Maintain proper form', 'Start with lighter weight']
})

export const mockWorkoutPlans: AIWorkoutPlan[] = [
  // Plan 1: Beginner Weight Loss
  {
    id: 'plan-1',
    userId: 'user-1',
    generatedAt: '2026-01-01T10:00:00Z',
    validFrom: '2026-01-01',
    validUntil: '2026-02-01',
    goal: 'WEIGHT_LOSS',
    intensity: 'BEGINNER',
    weeklyFrequency: 3,
    sessions: [
      {
        id: 'session-1-1',
        name: 'Full Body Cardio & Light Strength',
        description: 'Gentle introduction to cardio and basic strength movements',
        type: ['CARDIO', 'STRENGTH'],
        intensity: 'BEGINNER',
        durationMinutes: 45,
        caloriesBurn: 300,
        warmUp: [
          createExercise('Walking', 'CARDIO', 1, '5 minutes', ['Full body'])
        ],
        exercises: [
          createExercise('Treadmill Walk/Jog', 'CARDIO', 1, '15 minutes', ['Legs', 'Cardio']),
          createExercise('Bodyweight Squats', 'STRENGTH', 3, 12, ['Legs', 'Glutes']),
          createExercise('Wall Push-ups', 'STRENGTH', 3, 10, ['Chest', 'Arms']),
          createExercise('Seated Row Machine', 'STRENGTH', 3, 12, ['Back']),
          createExercise('Plank', 'STRENGTH', 3, '20 seconds', ['Core'])
        ],
        coolDown: [
          createExercise('Static Stretching', 'FLEXIBILITY', 1, '10 minutes', ['Full body'])
        ],
        notes: 'Focus on form over speed. Take breaks as needed.'
      }
    ],
    progressionPlan: [
      {
        week: 1,
        changes: ['Baseline - establish comfortable intensity']
      },
      {
        week: 2,
        changes: ['Increase cardio to 20 minutes', 'Add 2 more reps per set']
      },
      {
        week: 3,
        changes: ['Introduce light weights for squats', 'Plank to 30 seconds']
      },
      {
        week: 4,
        changes: ['Add 4th weekly session', 'Increase weights by 10%']
      }
    ],
    safetyGuidelines: [
      'Stop if you feel dizzy or nauseous',
      'Stay hydrated throughout',
      'Listen to your body - rest when needed',
      'Maintain proper form to avoid injury'
    ],
    status: 'ACTIVE'
  },

  // Plan 2: Intermediate Muscle Gain
  {
    id: 'plan-2',
    userId: 'user-2',
    generatedAt: '2025-12-15T11:00:00Z',
    validFrom: '2025-12-15',
    validUntil: '2026-01-15',
    goal: 'MUSCLE_GAIN',
    intensity: 'INTERMEDIATE',
    weeklyFrequency: 5,
    sessions: [
      {
        id: 'session-2-1',
        name: 'Chest & Triceps',
        description: 'Push day - chest and triceps focus',
        type: ['STRENGTH'],
        intensity: 'INTERMEDIATE',
        durationMinutes: 60,
        caloriesBurn: 250,
        exercises: [
          createExercise('Bench Press', 'STRENGTH', 4, 10, ['Chest']),
          createExercise('Incline Dumbbell Press', 'STRENGTH', 4, 10, ['Chest']),
          createExercise('Cable Flyes', 'STRENGTH', 3, 12, ['Chest']),
          createExercise('Tricep Dips', 'STRENGTH', 4, 12, ['Triceps']),
          createExercise('Cable Tricep Pushdown', 'STRENGTH', 3, 15, ['Triceps'])
        ],
        notes: 'Avoid overhead press due to previous shoulder injury'
      },
      {
        id: 'session-2-2',
        name: 'Back & Biceps',
        description: 'Pull day - back and biceps focus',
        type: ['STRENGTH'],
        intensity: 'INTERMEDIATE',
        durationMinutes: 60,
        caloriesBurn: 250,
        exercises: [
          createExercise('Deadlifts', 'STRENGTH', 4, 8, ['Back', 'Legs']),
          createExercise('Pull-ups', 'STRENGTH', 4, 10, ['Back', 'Biceps']),
          createExercise('Barbell Rows', 'STRENGTH', 4, 10, ['Back']),
          createExercise('Barbell Curls', 'STRENGTH', 4, 12, ['Biceps']),
          createExercise('Hammer Curls', 'STRENGTH', 3, 12, ['Biceps'])
        ]
      }
    ],
    progressionPlan: [
      {
        week: 1,
        changes: ['Establish 1RM for main lifts']
      },
      {
        week: 2,
        changes: ['Increase weight by 5% on main lifts']
      },
      {
        week: 4,
        changes: ['Add drop sets to final set', 'Increase volume by 10%']
      }
    ],
    safetyGuidelines: [
      'Maintain controlled movements',
      'Use spotter for heavy bench press',
      'Avoid overhead movements until shoulder fully healed'
    ],
    status: 'ACTIVE'
  }
]

// ============================================================================
// MOCK AI NUTRITION PLANS
// ============================================================================

export const mockNutritionPlans: AINutritionPlan[] = [
  {
    id: 'nutrition-1',
    userId: 'user-1',
    generatedAt: '2026-01-01T10:00:00Z',
    validFrom: '2026-01-01',
    validUntil: '2026-02-01',
    goal: 'WEIGHT_LOSS',
    dailyCalorieTarget: 1600,
    macroTargets: {
      proteinGrams: 120,
      carbsGrams: 150,
      fatsGrams: 53
    },
    mealSuggestions: [
      {
        id: 'meal-1-1',
        type: 'BREAKFAST',
        name: 'Protein-Packed Breakfast',
        description: 'High-protein start to control hunger',
        calories: 400,
        protein: 30,
        carbs: 35,
        fats: 15,
        ingredients: ['3 egg whites', '1 whole egg', 'Spinach', 'Whole grain toast', 'Avocado (1/4)'],
        timing: '7:00-8:00 AM'
      },
      {
        id: 'meal-1-2',
        type: 'LUNCH',
        name: 'Lean Protein & Vegetables',
        description: 'Filling, nutrient-dense midday meal',
        calories: 500,
        protein: 40,
        carbs: 45,
        fats: 18,
        ingredients: ['Grilled chicken breast (150g)', 'Quinoa (1/2 cup)', 'Mixed vegetables', 'Olive oil dressing'],
        timing: '12:00-1:00 PM'
      },
      {
        id: 'meal-1-3',
        type: 'SNACK',
        name: 'Protein Snack',
        description: 'Keep metabolism active',
        calories: 200,
        protein: 20,
        carbs: 15,
        fats: 8,
        ingredients: ['Greek yogurt (150g)', 'Berries', 'Almonds (10)']
      },
      {
        id: 'meal-1-4',
        type: 'DINNER',
        name: 'Light Evening Meal',
        description: 'Protein-focused, lower carb',
        calories: 500,
        protein: 30,
        carbs: 55,
        fats: 12,
        ingredients: ['Baked salmon (120g)', 'Sweet potato', 'Steamed broccoli', 'Lemon'],
        timing: '6:00-7:00 PM'
      }
    ],
    hydrationGoalLiters: 2.5,
    guidelines: [
      'Eat every 3-4 hours to maintain metabolism',
      'Prioritize protein at every meal',
      'Drink water before meals to aid satiety',
      'Limit carbs in evening meals',
      'Prepare meals in advance to avoid impulsive choices'
    ],
    foodsToEmphasize: [
      'Lean proteins (chicken, fish, turkey)',
      'Leafy greens and vegetables',
      'Complex carbs (quinoa, sweet potato, brown rice)',
      'Healthy fats (avocado, nuts, olive oil)',
      'Berries and low-sugar fruits'
    ],
    foodsToReduce: [
      'Processed foods and fast food',
      'Sugary snacks and desserts',
      'White bread and pasta',
      'Alcohol',
      'Late-night eating'
    ],
    status: 'ACTIVE',
    disclaimer: 'This is nutritional guidance, not medical advice. Consult a registered dietitian for personalized nutrition plans.'
  }
]

// ============================================================================
// MOCK LIFESTYLE COACHING
// ============================================================================

export const mockLifestyleCoaching: AILifestyleCoaching[] = [
  {
    id: 'lifestyle-1',
    userId: 'user-1',
    generatedAt: '2026-01-01T10:00:00Z',
    recommendations: [
      {
        id: 'rec-1-1',
        category: 'SLEEP',
        title: 'Improve Sleep Quality',
        description: 'Better sleep supports weight loss and recovery',
        priority: 'HIGH',
        actionItems: [
          'Aim for 7-8 hours per night',
          'Set consistent sleep/wake times',
          'Avoid screens 1 hour before bed',
          'Create a cool, dark sleeping environment'
        ],
        expectedBenefits: [
          'Better hormone regulation',
          'Reduced stress eating',
          'More energy for workouts',
          'Improved recovery'
        ]
      },
      {
        id: 'rec-1-2',
        category: 'STRESS',
        title: 'Manage Stress Eating',
        description: 'Address stress without food',
        priority: 'HIGH',
        actionItems: [
          'Practice 10-minute meditation daily',
          'Take short walks during work breaks',
          'Journal stressful moments',
          'Replace snacking with herbal tea'
        ],
        expectedBenefits: [
          'Reduced calorie intake',
          'Better emotional regulation',
          'Improved work productivity'
        ]
      },
      {
        id: 'rec-1-3',
        category: 'RECOVERY',
        title: 'Active Recovery Days',
        description: "Rest doesn't mean inactive",
        priority: 'MEDIUM',
        actionItems: [
          'Light yoga or stretching',
          '20-minute walks',
          'Foam rolling',
          'Swimming (low intensity)'
        ],
        expectedBenefits: [
          'Faster muscle recovery',
          'Maintained calorie burn',
          'Reduced soreness'
        ]
      }
    ],
    restDaysSuggested: 2,
    sleepTargetHours: 7.5,
    recoveryRoutines: [
      'Foam rolling - 15 minutes',
      'Static stretching - 20 minutes',
      'Light yoga - 30 minutes'
    ],
    stressManagementTips: [
      'Deep breathing exercises',
      'Progressive muscle relaxation',
      'Mindful eating practices',
      'Regular breaks from work'
    ],
    status: 'ACTIVE'
  }
]

// ============================================================================
// MOCK PROGRESS TRACKING
// ============================================================================

export const mockProgressMeasurements: ProgressMeasurement[] = [
  // User 1 - Week 0 (Baseline)
  {
    id: 'progress-1-0',
    userId: 'user-1',
    recordedAt: '2026-01-01T08:00:00Z',
    weight: 78,
    bodyFatPercentage: 32,
    energyLevel: 2,
    mood: 3,
    sleepQuality: 3,
    notes: 'Starting point - motivated but nervous'
  },
  // User 1 - Week 1
  {
    id: 'progress-1-1',
    userId: 'user-1',
    recordedAt: '2026-01-08T08:00:00Z',
    weight: 77.2,
    bodyFatPercentage: 31.5,
    energyLevel: 3,
    mood: 4,
    sleepQuality: 3,
    notes: 'First week complete! Feeling good'
  },
  // User 1 - Week 2
  {
    id: 'progress-1-2',
    userId: 'user-1',
    recordedAt: '2026-01-15T08:00:00Z',
    weight: 76.5,
    bodyFatPercentage: 31,
    energyLevel: 4,
    mood: 4,
    sleepQuality: 4,
    notes: 'Energy improving, workouts getting easier'
  },
  // User 1 - Week 3
  {
    id: 'progress-1-3',
    userId: 'user-1',
    recordedAt: '2026-01-22T08:00:00Z',
    weight: 75.8,
    bodyFatPercentage: 30.5,
    energyLevel: 4,
    mood: 5,
    sleepQuality: 4,
    notes: 'Clothes fitting better! Friends noticed'
  }
]

export const mockGoalEvaluations: GoalEvaluation[] = [
  {
    id: 'eval-1-1',
    userId: 'user-1',
    evaluatedAt: '2026-01-22T10:00:00Z',
    period: 'WEEKLY',
    baseline: mockProgressMeasurements[0],
    current: mockProgressMeasurements[3],
    target: {
      weight: 65,
      bodyFat: 25,
      timeline: '2026-04-30'
    },
    progress: {
      weightChange: -2.2,
      bodyFatChange: -1.5,
      percentageToGoal: 16.9,
      onTrack: true,
      daysRemaining: 98
    },
    insights: [
      'Excellent progress! Lost 2.2kg in 3 weeks',
      'Body fat reduction ahead of schedule',
      'Energy and sleep quality improving',
      'Consistent workout adherence'
    ],
    recommendations: [
      'Continue current workout intensity',
      'Maintain calorie deficit at 1600 kcal',
      'Focus on protein intake to preserve muscle',
      'Consider adding 4th weekly workout session'
    ],
    adjustments: [
      'Increase cardio duration by 5 minutes',
      'Add resistance training variety'
    ],
    milestonesAchieved: [
      'Lost first 2kg',
      'Completed 3 consecutive weeks',
      'Improved sleep quality'
    ],
    nextMilestone: 'Reach 75kg milestone'
  }
]

// ============================================================================
// MOCK WORKOUT LOGS
// ============================================================================

export const mockWorkoutLogs: WorkoutLog[] = [
  {
    id: 'log-1-1',
    userId: 'user-1',
    workoutId: 'session-1-1',
    workoutName: 'Full Body Cardio & Light Strength',
    completedAt: '2026-01-22T18:00:00Z',
    durationMinutes: 50,
    caloriesBurned: 320,
    intensity: 4,
    mood: 5,
    notes: 'Great workout! Feeling stronger',
    exercisesCompleted: [
      {
        exerciseId: 'ex-treadmill-walk-jog',
        exerciseName: 'Treadmill Walk/Jog',
        setsCompleted: 1,
        actualReps: [15]
      },
      {
        exerciseId: 'ex-bodyweight-squats',
        exerciseName: 'Bodyweight Squats',
        setsCompleted: 3,
        actualReps: [12, 12, 10]
      }
    ]
  }
]

// ============================================================================
// MOCK COACH ASSISTANT DATA
// ============================================================================

export const mockCoachTalkingPoints: CoachTalkingPoints[] = [
  {
    userId: 'user-1',
    userName: 'Sarah Mitchell',
    generatedAt: '2026-01-22T07:00:00Z',
    summary: 'Sarah is 3 weeks into weight loss journey, making excellent progress',
    currentGoal: 'Lose 13kg in 16 weeks',
    progressStatus: 'AHEAD',
    todaysWorkout: 'Full Body Cardio & Light Strength - 45 minutes',
    focusAreas: [
      'Maintaining proper form on squats',
      'Gradually increasing cardio intensity',
      'Staying consistent with nutrition plan'
    ],
    encouragementPoints: [
      'Lost 2.2kg in 3 weeks - ahead of schedule!',
      'Energy levels significantly improved',
      'Perfect workout attendance',
      'Sleep quality getting better'
    ],
    safetyFlags: [],
    conversationStarters: [
      '"How are you finding the treadmill workouts?"',
      '"Have you noticed any changes in your energy throughout the day?"',
      "\"What's been your biggest challenge this week?\""
    ],
    recommendations: [
      'Suggest trying the elliptical for cardio variety',
      'Encourage adding light weights to squats next week',
      'Remind about hydration - aim for 2.5L daily'
    ]
  },
  {
    userId: 'user-2',
    userName: 'James Rodriguez',
    generatedAt: '2026-01-22T07:00:00Z',
    summary: 'James is focused on muscle gain, recovering from shoulder injury',
    currentGoal: 'Gain 8kg muscle in 20 weeks',
    progressStatus: 'ON_TRACK',
    todaysWorkout: 'Back & Biceps - 60 minutes',
    focusAreas: [
      'Progressive overload on main lifts',
      'Shoulder stability and safety',
      'Hitting protein targets'
    ],
    encouragementPoints: [
      'Great form on deadlifts',
      'Consistent 5-day training split',
      'Shoulder showing good recovery'
    ],
    safetyFlags: [
      {
        level: 'WARNING',
        message: 'Avoid overhead press until shoulder fully cleared'
      }
    ],
    conversationStarters: [
      "\"How's the shoulder feeling during pull-ups?\"",
      '"Are you hitting your 2800 calorie target?"',
      '"Ready to increase weight on bench press?"'
    ],
    recommendations: [
      'Monitor shoulder during lat pulldowns',
      'Consider adding wrist wraps for heavy lifts',
      'Suggest foam rolling before workouts'
    ]
  }
]

export const mockMemberSummaries: MemberSummary[] = [
  {
    userId: 'user-1',
    userName: 'Sarah Mitchell',
    age: 32,
    goal: 'WEIGHT_LOSS',
    memberSince: '2026-01-01',
    currentWeight: 75.8,
    targetWeight: 65,
    progress: 17,
    lastWorkout: '2026-01-22',
    workoutsThisWeek: 3,
    adherenceRate: 100,
    activeWorkoutPlan: true,
    activeNutritionPlan: true,
    needsAttention: false
  },
  {
    userId: 'user-2',
    userName: 'James Rodriguez',
    age: 28,
    goal: 'MUSCLE_GAIN',
    memberSince: '2025-12-15',
    currentWeight: 70,
    progress: 25,
    lastWorkout: '2026-01-21',
    workoutsThisWeek: 5,
    adherenceRate: 95,
    activeWorkoutPlan: true,
    activeNutritionPlan: true,
    needsAttention: false
  },
  {
    userId: 'user-3',
    userName: 'Linda Chen',
    age: 45,
    goal: 'WELLNESS',
    memberSince: '2026-01-10',
    currentWeight: 62,
    targetWeight: 60,
    progress: 10,
    lastWorkout: '2026-01-18',
    workoutsThisWeek: 1,
    adherenceRate: 50,
    activeWorkoutPlan: true,
    activeNutritionPlan: false,
    needsAttention: true,
    attentionReasons: ['Low workout adherence this week', 'Missed last 2 scheduled sessions']
  }
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getUserAssessment(userId: string): UserFitnessAssessment | undefined {
  return mockUserAssessments.find(a => a.userId === userId)
}

export function getWorkoutPlan(userId: string): AIWorkoutPlan | undefined {
  return mockWorkoutPlans.find(p => p.userId === userId && p.status === 'ACTIVE')
}

export function getNutritionPlan(userId: string): AINutritionPlan | undefined {
  return mockNutritionPlans.find(p => p.userId === userId && p.status === 'ACTIVE')
}

export function getLifestyleCoaching(userId: string): AILifestyleCoaching | undefined {
  return mockLifestyleCoaching.find(l => l.userId === userId && l.status === 'ACTIVE')
}

export function getProgressHistory(userId: string): ProgressMeasurement[] {
  return mockProgressMeasurements.filter(p => p.userId === userId).sort(
    (a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime()
  )
}

export function getLatestEvaluation(userId: string): GoalEvaluation | undefined {
  return mockGoalEvaluations.find(e => e.userId === userId)
}

export function getAllEvaluations(userId: string): GoalEvaluation[] {
  return mockGoalEvaluations.filter(e => e.userId === userId).sort(
    (a, b) => new Date(b.evaluatedAt).getTime() - new Date(a.evaluatedAt).getTime()
  )
}

export function getWorkoutHistory(userId: string): WorkoutLog[] {
  return mockWorkoutLogs.filter(l => l.userId === userId).sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )
}

export function getCoachTalkingPoints(userId: string): CoachTalkingPoints | undefined {
  return mockCoachTalkingPoints.find(c => c.userId === userId)
}

export function getAllMembers(): MemberSummary[] {
  return mockMemberSummaries
}

export function getMembersNeedingAttention(): MemberSummary[] {
  return mockMemberSummaries.filter(m => m.needsAttention)
}
