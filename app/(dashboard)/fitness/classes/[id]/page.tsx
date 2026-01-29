'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Activity,
  Edit,
  Trash2,
  UserCheck,
  X,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MOCK_FITNESS_CLASSES, MOCK_MEMBERS, MOCK_CHECKINS } from '@/lib/mock-data/fitness'

export default function ClassDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const classId = params.id as string

  const [attendanceMarking, setAttendanceMarking] = useState<Record<string, boolean>>({})

  const fitnessClass = MOCK_FITNESS_CLASSES.find((c) => c.id === classId)

  if (!fitnessClass) {
    return (
      <PageLayout maxWidth="normal">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Class Not Found</h1>
            </div>
          </div>
        </div>
        <Card className="p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">Class not found</p>
          <Button
            variant="primary"
            onClick={() => router.push('/fitness/classes')}
            className="mt-4"
          >
            Back to Classes
          </Button>
        </Card>
      </PageLayout>
    )
  }

  // Get enrolled members (for demo, get random members)
  const enrolledMembers = MOCK_MEMBERS.slice(0, fitnessClass.enrolled).filter(
    (m) => m.membershipStatus === 'active'
  )

  // Calculate attendance stats
  const classCheckIns = MOCK_CHECKINS.filter((c) => c.classId === classId)
  const averageAttendance = classCheckIns.length > 0 ? Math.round((classCheckIns.length / fitnessClass.enrolled) * 100) : 0

  const getDayName = (dayOfWeek: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[dayOfWeek]
  }

  const getCategoryColor = (category: string) => {
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

  const toggleAttendance = (memberId: string) => {
    setAttendanceMarking((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }))
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{fitnessClass.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{fitnessClass.instructor}</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push('/fitness/classes')}
            >
              Back
            </Button>
            <Button
              variant="outline"
              icon={<Edit className="w-4 h-4" />}
              iconPosition="left"
              onClick={() => router.push(`/fitness/classes/${classId}/edit`)}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
      {/* Class Info Header */}
      <Card className="p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center flex-shrink-0">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {fitnessClass.name}
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={getCategoryColor(fitnessClass.category) as any}>
                    {fitnessClass.category}
                  </Badge>
                  <Badge variant={getDifficultyColor(fitnessClass.difficulty)}>
                    {fitnessClass.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{fitnessClass.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{getDayName(fitnessClass.schedule.dayOfWeek)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {fitnessClass.schedule.startTime} ({fitnessClass.schedule.duration} min)
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{fitnessClass.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">
                  {fitnessClass.enrolled}/{fitnessClass.capacity} enrolled
                </span>
              </div>
            </div>
          </div>
        </div>

        {fitnessClass.equipment && fitnessClass.equipment.length > 0 && (
          <div className="pt-6 border-t border-gray-200 dark:border-dark-border">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Equipment Needed
            </h3>
            <div className="flex flex-wrap gap-2">
              {fitnessClass.equipment.map((item, index) => (
                <Badge key={index} variant="default" size="sm">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Class Stats
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Enrolled</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {fitnessClass.enrolled}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-2">
                  <div
                    className="bg-primary rounded-full h-2"
                    style={{ width: `${(fitnessClass.enrolled / fitnessClass.capacity) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Average Attendance
                  </span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {averageAttendance}%
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Waitlist</span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {Math.max(0, fitnessClass.enrolled - fitnessClass.capacity)}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Available Spots
                  </span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {Math.max(0, fitnessClass.capacity - fitnessClass.enrolled)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Instructor
            </h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                {fitnessClass.instructor.split(' ')[0][0]}
                {fitnessClass.instructor.split(' ')[1]?.[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {fitnessClass.instructor}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Certified Instructor</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/fitness/trainers')}
              className="w-full"
            >
              View Profile
            </Button>
          </Card>
        </div>

        {/* Enrolled Members & Attendance */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Enrolled Members
              </h3>
              <Button variant="primary" size="sm" icon={<UserCheck className="w-4 h-4" />}>
                Mark Attendance
              </Button>
            </div>

            <div className="space-y-3">
              {enrolledMembers.length > 0 ? (
                enrolledMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-card rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-semibold">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {member.firstName} {member.lastName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.memberCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={attendanceMarking[member.id] ? 'primary' : 'outline'}
                        size="sm"
                        icon={
                          attendanceMarking[member.id] ? (
                            <UserCheck className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )
                        }
                        onClick={() => toggleAttendance(member.id)}
                      >
                        {attendanceMarking[member.id] ? 'Present' : 'Absent'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/fitness/members/${member.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 dark:text-gray-400">
                  No members enrolled yet
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
