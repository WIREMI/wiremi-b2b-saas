'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Calendar,
  CalendarPlus,
  Filter,
  Users,
  Clock,
  MapPin,
  Activity,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Select from '@/components/ui/select'
import { MOCK_FITNESS_CLASSES, MOCK_TRAINERS } from '@/lib/mock-data/fitness'
import type { ClassCategory } from '@/types/fitness'

export default function ClassesSchedulePage() {
  const router = useRouter()

  const [categoryFilter, setCategoryFilter] = useState<ClassCategory | 'all'>('all')
  const [difficultyFilter, setDifficultyFilter] = useState<'beginner' | 'intermediate' | 'advanced' | 'all'>('all')
  const [instructorFilter, setInstructorFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Filter classes
  const filteredClasses = MOCK_FITNESS_CLASSES.filter((fitnessClass) => {
    const matchesCategory = categoryFilter === 'all' || fitnessClass.category === categoryFilter
    const matchesDifficulty = difficultyFilter === 'all' || fitnessClass.difficulty === difficultyFilter
    const matchesInstructor = instructorFilter === 'all' || fitnessClass.instructorId === instructorFilter

    return matchesCategory && matchesDifficulty && matchesInstructor
  })

  // Group classes by day of week
  const classesByDay = filteredClasses.reduce((acc, fitnessClass) => {
    const day = fitnessClass.schedule.dayOfWeek
    if (!acc[day]) {
      acc[day] = []
    }
    acc[day].push(fitnessClass)
    return acc
  }, {} as Record<number, typeof filteredClasses>)

  // Sort classes within each day by start time
  Object.keys(classesByDay).forEach((day) => {
    classesByDay[parseInt(day)].sort((a, b) => {
      return a.schedule.startTime.localeCompare(b.schedule.startTime)
    })
  })

  const getDayName = (dayOfWeek: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[dayOfWeek]
  }

  const getCategoryColor = (category: ClassCategory) => {
    switch (category) {
      case 'yoga':
        return 'primary'
      case 'spinning':
        return 'info'
      case 'zumba':
        return 'pink'
      case 'strength':
        return 'orange'
      case 'cardio':
        return 'red'
      case 'pilates':
        return 'green'
      case 'boxing':
        return 'gray'
      default:
        return 'gray'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'success'
      case 'intermediate':
        return 'warning'
      case 'advanced':
        return 'error'
      default:
        return 'default'
    }
  }

  const getCapacityStatus = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100
    if (percentage >= 90) return { color: 'danger', text: 'Almost Full' }
    if (percentage >= 75) return { color: 'warning', text: 'Filling Up' }
    return { color: 'success', text: 'Available' }
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Classes Schedule</h1>
            <p className="text-gray-600 dark:text-gray-400">View and manage fitness class schedules</p>
          </div>
          <Button
            variant="primary"
            icon={<CalendarPlus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/fitness/classes/add')}
          >
            Add Class
          </Button>
        </div>
      </div>
      {/* Filters */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Classes</h2>
          <Button
            variant="ghost"
            size="sm"
            icon={<Filter className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as ClassCategory | 'all')}
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'yoga', label: 'Yoga' },
                { value: 'spinning', label: 'Spinning' },
                { value: 'zumba', label: 'Zumba' },
                { value: 'strength', label: 'Strength' },
                { value: 'cardio', label: 'Cardio' },
                { value: 'pilates', label: 'Pilates' },
                { value: 'boxing', label: 'Boxing' }
              ]}
            />

            <Select
              label="Difficulty"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value as any)}
              options={[
                { value: 'all', label: 'All Levels' },
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' }
              ]}
            />

            <Select
              label="Instructor"
              value={instructorFilter}
              onChange={(e) => setInstructorFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Instructors' },
                ...MOCK_TRAINERS.map((trainer) => ({
                  value: trainer.id,
                  label: `${trainer.firstName} ${trainer.lastName}`
                }))
              ]}
            />
          </div>
        )}
      </Card>

      {/* Weekly Schedule */}
      <div className="space-y-6">
        {[0, 1, 2, 3, 4, 5, 6].map((day) => {
          const dayClasses = classesByDay[day] || []
          if (dayClasses.length === 0 && (categoryFilter !== 'all' || difficultyFilter !== 'all' || instructorFilter !== 'all')) {
            return null
          }

          return (
            <Card key={day}>
              <div className="p-6 border-b border-gray-200 dark:border-dark-border">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getDayName(day)}
                  </h3>
                  <Badge variant="default" size="sm">
                    {dayClasses.length} {dayClasses.length === 1 ? 'class' : 'classes'}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                {dayClasses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dayClasses.map((fitnessClass) => {
                      const capacityStatus = getCapacityStatus(
                        fitnessClass.enrolled,
                        fitnessClass.capacity
                      )

                      return (
                        <div
                          key={fitnessClass.id}
                          onClick={() => router.push(`/fitness/classes/${fitnessClass.id}`)}
                          className="p-4 bg-gray-50 dark:bg-dark-card rounded-xl border border-gray-200 dark:border-dark-border hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-200 cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {fitnessClass.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {fitnessClass.instructor}
                              </p>
                            </div>
                            <Badge
                              variant={getCategoryColor(fitnessClass.category) as any}
                              size="sm"
                            >
                              {fitnessClass.category}
                            </Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="w-4 h-4" />
                              <span>
                                {fitnessClass.schedule.startTime} ({fitnessClass.schedule.duration} min)
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <MapPin className="w-4 h-4" />
                              <span>{fitnessClass.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <Users className="w-4 h-4" />
                              <span>
                                {fitnessClass.enrolled}/{fitnessClass.capacity} enrolled
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <Badge
                              variant={getDifficultyColor(fitnessClass.difficulty)}
                              size="sm"
                            >
                              {fitnessClass.difficulty}
                            </Badge>
                            <Badge variant={capacityStatus.color as any} size="sm">
                              {capacityStatus.text}
                            </Badge>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400 dark:text-gray-400">
                    No classes scheduled for {getDayName(day)}
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </PageLayout>
  )
}
