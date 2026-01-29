'use client'

import { useState } from 'react'
import { Plus, BookOpen, Award, TrendingUp, Calendar, Edit, Save, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import type { AcademicRecord, CourseEnrollment, Course, Semester, GradeValue, CourseStatus } from '@/types/education'

interface AcademicRecordsTabProps {
  studentId: string
  academicRecords: AcademicRecord[]
  onAddGrade?: (data: any) => void
  onUpdateGrade?: (enrollmentId: string, data: any) => void
}

export default function AcademicRecordsTab({
  studentId,
  academicRecords,
  onAddGrade,
  onUpdateGrade,
}: AcademicRecordsTabProps) {
  const [selectedSemester, setSelectedSemester] = useState<string>('all')
  const [isAddingGrade, setIsAddingGrade] = useState(false)
  const [editingEnrollmentId, setEditingEnrollmentId] = useState<string | null>(null)
  const [gradeFormData, setGradeFormData] = useState({
    courseCode: '',
    courseName: '',
    creditHours: 3,
    instructorName: '',
    grade: '' as GradeValue | '',
    midtermScore: '',
    finalScore: '',
    assignmentScore: '',
    attendance: '',
  })

  // Calculate overall statistics
  const overallStats = {
    cumulativeGPA: academicRecords.length > 0
      ? academicRecords[academicRecords.length - 1].cumulativeGPA
      : 0,
    totalCreditHours: academicRecords.reduce((sum, record) => sum + record.totalCreditHours, 0),
    earnedCreditHours: academicRecords.reduce((sum, record) => sum + record.earnedCreditHours, 0),
    totalCourses: academicRecords.reduce((sum, record) => sum + record.totalCourses, 0),
    passedCourses: academicRecords.reduce((sum, record) => sum + record.passedCourses, 0),
  }

  const getGradeColor = (grade?: GradeValue) => {
    if (!grade) return 'default'
    if (['A+', 'A', 'A-'].includes(grade)) return 'success'
    if (['B+', 'B', 'B-'].includes(grade)) return 'primary'
    if (['C+', 'C', 'C-'].includes(grade)) return 'warning'
    return 'error'
  }

  const getStatusColor = (status: CourseStatus) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'in-progress':
        return 'info'
      case 'failed':
        return 'error'
      case 'withdrawn':
        return 'default'
      default:
        return 'default'
    }
  }

  const handleSaveGrade = () => {
    if (onAddGrade) {
      onAddGrade({
        ...gradeFormData,
        studentId,
        semesterId: selectedSemester !== 'all' ? selectedSemester : academicRecords[0]?.semesterId,
      })
    }
    setIsAddingGrade(false)
    setGradeFormData({
      courseCode: '',
      courseName: '',
      creditHours: 3,
      instructorName: '',
      grade: '',
      midtermScore: '',
      finalScore: '',
      assignmentScore: '',
      attendance: '',
    })
  }

  const handleUpdateGrade = (enrollmentId: string, enrollment: CourseEnrollment) => {
    if (onUpdateGrade) {
      onUpdateGrade(enrollmentId, {
        grade: gradeFormData.grade,
        midtermScore: gradeFormData.midtermScore ? parseFloat(gradeFormData.midtermScore) : enrollment.midtermScore,
        finalScore: gradeFormData.finalScore ? parseFloat(gradeFormData.finalScore) : enrollment.finalScore,
        assignmentScore: gradeFormData.assignmentScore ? parseFloat(gradeFormData.assignmentScore) : enrollment.assignmentScore,
        attendance: gradeFormData.attendance ? parseFloat(gradeFormData.attendance) : enrollment.attendance,
      })
    }
    setEditingEnrollmentId(null)
    setGradeFormData({
      courseCode: '',
      courseName: '',
      creditHours: 3,
      instructorName: '',
      grade: '',
      midtermScore: '',
      finalScore: '',
      assignmentScore: '',
      attendance: '',
    })
  }

  // Get unique semesters for filter
  const semesters = academicRecords.map((record) => ({
    id: record.semesterId,
    name: `Semester ${academicRecords.indexOf(record) + 1}`,
  }))

  // Filter records by selected semester
  const filteredRecords = selectedSemester === 'all'
    ? academicRecords
    : academicRecords.filter((record) => record.semesterId === selectedSemester)

  return (
    <div className="space-y-6">
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">Cumulative GPA</h3>
            <Award className="w-5 h-5 text-primary-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {overallStats.cumulativeGPA.toFixed(2)}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Credits</h3>
            <BookOpen className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {overallStats.totalCreditHours}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">Earned Credits</h3>
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {overallStats.earnedCreditHours}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Courses</h3>
            <BookOpen className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {overallStats.totalCourses}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-600 dark:text-gray-400">Passed</h3>
            <Award className="w-5 h-5 text-success" />
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {overallStats.passedCourses}
          </div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by Semester:
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Semesters</option>
              {semesters.map((semester, index) => (
                <option key={semester.id} value={semester.id}>
                  Semester {index + 1}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => setIsAddingGrade(true)}
          >
            Add Grade
          </Button>
        </div>
      </Card>

      {/* Add Grade Form */}
      {isAddingGrade && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Grade</h3>
            <Button
              variant="ghost"
              size="sm"
              icon={<X className="w-4 h-4" />}
              onClick={() => setIsAddingGrade(false)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Course Code"
              placeholder="e.g., CS101"
              value={gradeFormData.courseCode}
              onChange={(e) => setGradeFormData({ ...gradeFormData, courseCode: e.target.value })}
            />
            <Input
              label="Course Name"
              placeholder="e.g., Introduction to Computer Science"
              value={gradeFormData.courseName}
              onChange={(e) => setGradeFormData({ ...gradeFormData, courseName: e.target.value })}
            />
            <Input
              label="Credit Hours"
              type="number"
              value={gradeFormData.creditHours}
              onChange={(e) => setGradeFormData({ ...gradeFormData, creditHours: parseInt(e.target.value) })}
            />
            <Input
              label="Instructor Name"
              placeholder="Dr. John Doe"
              value={gradeFormData.instructorName}
              onChange={(e) => setGradeFormData({ ...gradeFormData, instructorName: e.target.value })}
            />
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Grade
              </label>
              <select
                value={gradeFormData.grade}
                onChange={(e) => setGradeFormData({ ...gradeFormData, grade: e.target.value as GradeValue })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select Grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
            </div>
            <Input
              label="Midterm Score (%)"
              type="number"
              placeholder="0-100"
              value={gradeFormData.midtermScore}
              onChange={(e) => setGradeFormData({ ...gradeFormData, midtermScore: e.target.value })}
            />
            <Input
              label="Final Score (%)"
              type="number"
              placeholder="0-100"
              value={gradeFormData.finalScore}
              onChange={(e) => setGradeFormData({ ...gradeFormData, finalScore: e.target.value })}
            />
            <Input
              label="Assignment Score (%)"
              type="number"
              placeholder="0-100"
              value={gradeFormData.assignmentScore}
              onChange={(e) => setGradeFormData({ ...gradeFormData, assignmentScore: e.target.value })}
            />
            <Input
              label="Attendance (%)"
              type="number"
              placeholder="0-100"
              value={gradeFormData.attendance}
              onChange={(e) => setGradeFormData({ ...gradeFormData, attendance: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsAddingGrade(false)}>
              Cancel
            </Button>
            <Button variant="primary" icon={<Save className="w-4 h-4" />} onClick={handleSaveGrade}>
              Save Grade
            </Button>
          </div>
        </Card>
      )}

      {/* Academic Records by Semester */}
      {filteredRecords.length > 0 ? (
        <div className="space-y-6">
          {filteredRecords.map((record, index) => (
            <Card key={record.id}>
              <div className="p-6">
                {/* Semester Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Semester {filteredRecords.length - index}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {record.totalCourses} Courses • {record.totalCreditHours} Credit Hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Semester GPA</div>
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {record.semesterGPA.toFixed(2)}
                      </div>
                    </div>
                    <Badge variant={record.academicStanding === 'good-standing' ? 'success' : 'warning'}>
                      {record.academicStanding.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>

                {/* Courses Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          Course
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          Instructor
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          Credits
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          Midterm
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          Final
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          Total
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          Grade
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          Status
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {record.courses.map((enrollment) => (
                        <tr key={enrollment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900 dark:text-white">
                              Course {enrollment.courseId.split('-')[1]}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {enrollment.courseId}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                            {enrollment.instructorName || 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-900 dark:text-white">3</td>
                          <td className="py-3 px-4 text-center text-gray-900 dark:text-white">
                            {enrollment.midtermScore !== undefined ? `${enrollment.midtermScore}%` : '-'}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-900 dark:text-white">
                            {enrollment.finalScore !== undefined ? `${enrollment.finalScore}%` : '-'}
                          </td>
                          <td className="py-3 px-4 text-center text-gray-900 dark:text-white">
                            {enrollment.totalScore !== undefined ? `${enrollment.totalScore}%` : '-'}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {enrollment.grade ? (
                              <Badge variant={getGradeColor(enrollment.grade)} size="sm">
                                {enrollment.grade}
                              </Badge>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Badge variant={getStatusColor(enrollment.status)} size="sm">
                              {enrollment.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            {enrollment.status === 'in-progress' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={<Edit className="w-3 h-3" />}
                                onClick={() => setEditingEnrollmentId(enrollment.id)}
                              >
                                Edit
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {record.remarks && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      <strong>Remarks:</strong> {record.remarks}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <BookOpen className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No academic records found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start by adding grades for this student
          </p>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => setIsAddingGrade(true)}
          >
            Add First Grade
          </Button>
        </Card>
      )}
    </div>
  )
}
