'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarPlus, ArrowLeft, Save } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { useToast } from '@/hooks/useToast'
import { MOCK_TRAINERS } from '@/lib/mock-data/fitness'

export default function AddClassPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<string>('yoga')
  const [instructorId, setInstructorId] = useState('')
  const [dayOfWeek, setDayOfWeek] = useState('1')
  const [startTime, setStartTime] = useState('09:00')
  const [duration, setDuration] = useState('60')
  const [capacity, setCapacity] = useState('25')
  const [location, setLocation] = useState('')
  const [equipment, setEquipment] = useState('')
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !category || !instructorId || !location) {
      showToast({
        type: 'error',
        title: 'Required Fields',
        message: 'Please fill in all required fields'
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    showToast({
      type: 'success',
      title: 'Class Created',
      message: 'Class created successfully!'
    })
    router.push('/fitness/classes')
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add New Class</h1>
            <p className="text-gray-600 dark:text-gray-400">Create a new fitness class schedule</p>
          </div>
          <Button
            variant="outline"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/fitness/classes')}
          >
            Back to Classes
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Card className="p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Class Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Morning Yoga Flow"
                required
              />

              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { value: 'yoga', label: 'Yoga' },
                  { value: 'spinning', label: 'Spinning' },
                  { value: 'zumba', label: 'Zumba' },
                  { value: 'strength', label: 'Strength Training' },
                  { value: 'cardio', label: 'Cardio' },
                  { value: 'pilates', label: 'Pilates' },
                  { value: 'boxing', label: 'Boxing' }
                ]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the class, what to expect, and who it's for..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-card border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Instructor"
                value={instructorId}
                onChange={(e) => setInstructorId(e.target.value)}
                options={[
                  { value: '', label: 'Select Instructor' },
                  ...MOCK_TRAINERS.map((trainer) => ({
                    value: trainer.id,
                    label: `${trainer.firstName} ${trainer.lastName} - ${trainer.specializations.join(', ')}`
                  }))
                ]}
                required
              />

              <Select
                label="Difficulty Level"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                options={[
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' }
                ]}
                required
              />
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Schedule Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Select
                  label="Day of Week"
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  options={[
                    { value: '0', label: 'Sunday' },
                    { value: '1', label: 'Monday' },
                    { value: '2', label: 'Tuesday' },
                    { value: '3', label: 'Wednesday' },
                    { value: '4', label: 'Thursday' },
                    { value: '5', label: 'Friday' },
                    { value: '6', label: 'Saturday' }
                  ]}
                  required
                />

                <Input
                  label="Start Time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />

                <Input
                  label="Duration (minutes)"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="15"
                  max="180"
                  step="15"
                  required
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Location & Equipment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Studio A, Main Gym Floor, etc."
                  required
                />

                <Input
                  label="Capacity"
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  min="1"
                  max="100"
                  required
                />
              </div>

              <div className="mt-6">
                <Input
                  label="Equipment (Optional)"
                  type="text"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  placeholder="Yoga mat, dumbbells, resistance bands (comma separated)"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mt-1">
                  List equipment needed for this class, separated by commas
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3 mt-8">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push('/fitness/classes')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            icon={<Save className="w-4 h-4" />}
            iconPosition="left"
            loading={isSubmitting}
          >
            Create Class
          </Button>
        </div>
      </form>
    </PageLayout>
  )
}
