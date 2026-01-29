'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  Search,
  Filter,
  Download,
  UserPlus,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Eye,
  Edit,
  UserX,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import { formatNumber } from '@/lib/utils'

interface Employee {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  position: string
  salary: number
  startDate: string
  location: string
  status: 'active' | 'on-leave' | 'probation' | 'terminated'
  avatar?: string
}

type SortField = 'name' | 'department' | 'position' | 'salary' | 'startDate'
type SortOrder = 'asc' | 'desc'

export default function EmployeeManagementPage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null)

  // Mock employees data
  const employees: Employee[] = [
    {
      id: '1',
      employeeId: 'EMP-001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@wiremi.com',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      salary: 125000,
      startDate: '2023-01-15',
      location: 'New York, NY',
      status: 'active',
    },
    {
      id: '2',
      employeeId: 'EMP-002',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@wiremi.com',
      phone: '+1 (555) 234-5678',
      department: 'Engineering',
      position: 'Engineering Manager',
      salary: 145000,
      startDate: '2022-06-20',
      location: 'San Francisco, CA',
      status: 'active',
    },
    {
      id: '3',
      employeeId: 'EMP-003',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@wiremi.com',
      phone: '+1 (555) 345-6789',
      department: 'Sales & Marketing',
      position: 'Sales Director',
      salary: 135000,
      startDate: '2022-03-10',
      location: 'Austin, TX',
      status: 'active',
    },
    {
      id: '4',
      employeeId: 'EMP-004',
      firstName: 'David',
      lastName: 'Kim',
      email: 'david.kim@wiremi.com',
      phone: '+1 (555) 456-7890',
      department: 'Operations',
      position: 'Operations Manager',
      salary: 110000,
      startDate: '2023-08-01',
      location: 'Seattle, WA',
      status: 'probation',
    },
    {
      id: '5',
      employeeId: 'EMP-005',
      firstName: 'Jessica',
      lastName: 'Taylor',
      email: 'jessica.taylor@wiremi.com',
      phone: '+1 (555) 567-8901',
      department: 'Finance',
      position: 'Financial Analyst',
      salary: 95000,
      startDate: '2023-02-14',
      location: 'Chicago, IL',
      status: 'active',
    },
    {
      id: '6',
      employeeId: 'EMP-006',
      firstName: 'Robert',
      lastName: 'Anderson',
      email: 'robert.anderson@wiremi.com',
      phone: '+1 (555) 678-9012',
      department: 'Engineering',
      position: 'Software Engineer',
      salary: 105000,
      startDate: '2023-09-15',
      location: 'Boston, MA',
      status: 'active',
    },
    {
      id: '7',
      employeeId: 'EMP-007',
      firstName: 'Amanda',
      lastName: 'White',
      email: 'amanda.white@wiremi.com',
      phone: '+1 (555) 789-0123',
      department: 'HR & Admin',
      position: 'HR Manager',
      salary: 98000,
      startDate: '2022-11-01',
      location: 'Denver, CO',
      status: 'active',
    },
    {
      id: '8',
      employeeId: 'EMP-008',
      firstName: 'James',
      lastName: 'Martinez',
      email: 'james.martinez@wiremi.com',
      phone: '+1 (555) 890-1234',
      department: 'Sales & Marketing',
      position: 'Marketing Specialist',
      salary: 78000,
      startDate: '2023-05-20',
      location: 'Miami, FL',
      status: 'on-leave',
    },
  ]

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales & Marketing' },
    { value: 'operations', label: 'Operations' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'HR & Admin' },
  ]

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'on-leave', label: 'On Leave' },
    { value: 'probation', label: 'Probation' },
    { value: 'terminated', label: 'Terminated' },
  ]

  // Filter and sort employees
  const filteredEmployees = employees
    .filter((employee) => {
      const matchesSearch =
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDepartment =
        departmentFilter === 'all' ||
        employee.department.toLowerCase().replace(' & ', '-').replace(' ', '-') ===
          departmentFilter

      const matchesStatus = statusFilter === 'all' || employee.status === statusFilter

      return matchesSearch && matchesDepartment && matchesStatus
    })
    .sort((a, b) => {
      let comparison = 0

      switch (sortField) {
        case 'name':
          comparison = `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`
          )
          break
        case 'department':
          comparison = a.department.localeCompare(b.department)
          break
        case 'position':
          comparison = a.position.localeCompare(b.position)
          break
        case 'salary':
          comparison = a.salary - b.salary
          break
        case 'startDate':
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          break
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getStatusBadge = (status: Employee['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm">Active</Badge>
      case 'on-leave':
        return <Badge variant="warning" size="sm">On Leave</Badge>
      case 'probation':
        return <Badge variant="info" size="sm">Probation</Badge>
      case 'terminated':
        return <Badge variant="error" size="sm">Terminated</Badge>
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 opacity-30" />
    }
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    )
  }

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(filteredEmployees.map((e) => e.id))
    }
  }

  const handleSelectEmployee = (id: string) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter((eid) => eid !== id))
    } else {
      setSelectedEmployees([...selectedEmployees, id])
    }
  }

  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.status === 'active').length,
    onLeave: employees.filter((e) => e.status === 'on-leave').length,
    probation: employees.filter((e) => e.status === 'probation').length,
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Employee Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your team members and their information
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-5 h-5" />}
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<UserPlus className="w-5 h-5" />}
              iconPosition="left"
              onClick={() => router.push('/hr/employees/add')}
            >
              Add Employee
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.total}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Employees</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.active}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.onLeave}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">On Leave</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.probation}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Probation</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, position, or employee ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                iconPosition="left"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                icon={<Filter className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
              <Select
                label="Department"
                options={departments}
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              />
              <Select
                label="Status"
                options={statuses}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredEmployees.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{employees.length}</span> employees
              {selectedEmployees.length > 0 && (
                <span>
                  {' • '}
                  <span className="font-semibold text-primary-500">
                    {selectedEmployees.length} selected
                  </span>
                </span>
              )}
            </p>
          </div>
        </Card>
      </div>

      {/* Employees Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.length === filteredEmployees.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Employee
                    {getSortIcon('name')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('department')}
                >
                  <div className="flex items-center gap-2">
                    Department
                    {getSortIcon('department')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('position')}
                >
                  <div className="flex items-center gap-2">
                    Position
                    {getSortIcon('position')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('salary')}
                >
                  <div className="flex items-center gap-2">
                    Salary
                    {getSortIcon('salary')}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('startDate')}
                >
                  <div className="flex items-center gap-2">
                    Start Date
                    {getSortIcon('startDate')}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={() => handleSelectEmployee(employee.id)}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary-500">
                          {employee.firstName[0]}{employee.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {employee.employeeId}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {employee.department}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {employee.position}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${formatNumber(employee.salary)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {new Date(employee.startDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(employee.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => router.push(`/hr/employees/${employee.id}`)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit className="w-4 h-4" />}
                        onClick={() => router.push(`/hr/employees/${employee.id}/edit`)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No employees found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSearchQuery('')
                setDepartmentFilter('all')
                setStatusFilter('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </Card>
    </PageLayout>
  )
}
