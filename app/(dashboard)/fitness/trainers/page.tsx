'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  Search,
  UserPlus,
  Mail,
  Phone,
  Star,
  Calendar,
  Award,
  Eye,
  Edit,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { MOCK_TRAINERS, MOCK_FITNESS_CLASSES } from '@/lib/mock-data/fitness'

export default function TrainersPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState('all')

  // Get all unique specializations
  const allSpecializations = Array.from(
    new Set(MOCK_TRAINERS.flatMap((t) => t.specializations))
  ).sort()

  // Filter trainers
  const filteredTrainers = MOCK_TRAINERS.filter((trainer) => {
    const matchesSearch =
      trainer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSpecialization =
      specializationFilter === 'all' || trainer.specializations.includes(specializationFilter)

    return matchesSearch && matchesSpecialization
  })

  // Calculate stats for each trainer
  const trainersWithStats = filteredTrainers.map((trainer) => {
    const trainerClasses = MOCK_FITNESS_CLASSES.filter((c) => c.instructorId === trainer.id)
    const totalEnrolled = trainerClasses.reduce((sum, c) => sum + c.enrolled, 0)

    return {
      ...trainer,
      totalClasses: trainerClasses.length,
      membersTrained: totalEnrolled,
    }
  })

  return (
    <PageLayout maxWidth="normal">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Trainers
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage fitness trainers and instructors
            </p>
          </div>
          <Button
            variant="primary"
            icon={<UserPlus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/fitness/trainers/add')}
          >
            Add Trainer
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Search trainers by name or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
          <Select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Specializations' },
              ...allSpecializations.map((spec) => ({ value: spec, label: spec }))
            ]}
          />
        </div>
      </Card>

      {/* Trainers Grid */}
      {trainersWithStats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainersWithStats.map((trainer) => (
            <Card key={trainer.id} className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {trainer.firstName[0]}
                  {trainer.lastName[0]}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {trainer.firstName} {trainer.lastName}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {trainer.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{trainer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{trainer.phone}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trainer.specializations.map((spec, index) => (
                    <Badge key={index} variant="primary" size="sm">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trainer.certifications.map((cert, index) => (
                    <Badge key={index} variant="success" size="sm">
                      <Award className="w-3 h-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {trainer.bio && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                  {trainer.bio}
                </p>
              )}

              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-dark-card rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {trainer.totalClasses}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Classes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {trainer.membersTrained}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {trainer.rating}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Eye className="w-4 h-4" />}
                  onClick={() => router.push(`/fitness/trainers/${trainer.id}`)}
                  className="flex-1"
                >
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Edit className="w-4 h-4" />}
                  onClick={() => router.push(`/fitness/trainers/${trainer.id}/edit`)}
                  className="flex-1"
                >
                  Edit
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Calendar className="w-4 h-4" />}
                  onClick={() => router.push('/fitness/classes/add')}
                  className="flex-1"
                >
                  Assign
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No trainers found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="primary"
            icon={<UserPlus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/fitness/trainers/add')}
          >
            Add First Trainer
          </Button>
        </Card>
      )}
    </PageLayout>
  )
}
