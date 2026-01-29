'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Calendar,
  Users,
  DollarSign,
  Download,
  Edit,
  Play,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle,
  Eye,
  Mail,
  TrendingUp,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatNumber } from '@/lib/utils'
import { useToast } from '@/hooks/useToast'

interface EmployeePayment {
  id: string
  employeeId: string
  employeeName: string
  department: string
  baseSalary: number
  bonuses: number
  deductions: number
  taxes: number
  netPay: number
  status: 'pending' | 'approved' | 'paid'
}

export default function PayrollDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { showToast } = useToast()

  // Mock payroll data
  const payroll = {
    id: params.id as string,
    period: 'December 2025',
    payDate: '2026-01-05',
    employees: 247,
    grossPay: 485200,
    totalBonuses: 25000,
    totalDeductions: 48520,
    totalTaxes: 48520,
    netPay: 388160,
    status: 'scheduled' as const,
    createdAt: '2025-12-20',
    createdBy: 'Amanda White',
    processedBy: undefined,
    processedAt: undefined,
  }

  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])

  // Mock employee payments
  const employeePayments: EmployeePayment[] = [
    {
      id: '1',
      employeeId: 'EMP-001',
      employeeName: 'Sarah Johnson',
      department: 'Engineering',
      baseSalary: 10417,
      bonuses: 500,
      deductions: 1092,
      taxes: 2184,
      netPay: 7641,
      status: 'approved',
    },
    {
      id: '2',
      employeeId: 'EMP-002',
      employeeName: 'Michael Chen',
      department: 'Engineering',
      baseSalary: 12083,
      bonuses: 1000,
      deductions: 1308,
      taxes: 2617,
      netPay: 9158,
      status: 'approved',
    },
    {
      id: '3',
      employeeId: 'EMP-003',
      employeeName: 'Emily Rodriguez',
      department: 'Sales & Marketing',
      baseSalary: 11250,
      bonuses: 2000,
      deductions: 1325,
      taxes: 2650,
      netPay: 9275,
      status: 'approved',
    },
    {
      id: '4',
      employeeId: 'EMP-004',
      employeeName: 'David Kim',
      department: 'Operations',
      baseSalary: 9167,
      bonuses: 0,
      deductions: 917,
      taxes: 1833,
      netPay: 6417,
      status: 'pending',
    },
    {
      id: '5',
      employeeId: 'EMP-005',
      employeeName: 'Jessica Taylor',
      department: 'Finance',
      baseSalary: 7917,
      bonuses: 500,
      deductions: 842,
      taxes: 1683,
      netPay: 5892,
      status: 'approved',
    },
  ]

  const getStatusBadge = (status: typeof payroll.status) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="info" size="md">Scheduled</Badge>
      default:
        return <Badge variant="default" size="md">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: EmployeePayment['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning" size="sm">Pending</Badge>
      case 'approved':
        return <Badge variant="success" size="sm">Approved</Badge>
      case 'paid':
        return <Badge variant="default" size="sm">Paid</Badge>
    }
  }

  const handleProcessPayroll = () => {
    showToast({
      type: 'success',
      title: 'Payroll Processing Started',
      message: `Processing payroll for ${payroll.period}`,
    })
  }

  const handleSelectAll = () => {
    if (selectedEmployees.length === employeePayments.length) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees(employeePayments.map((e) => e.id))
    }
  }

  const handleSelectEmployee = (id: string) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter((eid) => eid !== id))
    } else {
      setSelectedEmployees([...selectedEmployees, id])
    }
  }

  return (
    <PageLayout maxWidth="wide">
      {/* Header */}
      <Button
        variant="ghost"
        size="sm"
        icon={<ArrowLeft className="w-4 h-4" />}
        iconPosition="left"
        onClick={() => router.push('/hr/payroll')}
        className="mb-6"
      >
        Back to Payroll
      </Button>

      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Payroll: {payroll.period}
              </h1>
              {getStatusBadge(payroll.status)}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Pay date: {new Date(payroll.payDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Download className="w-5 h-5" />}
              iconPosition="left"
            >
              Export Report
            </Button>
            {payroll.status === 'scheduled' && (
              <>
                <Button
                  variant="outline"
                  size="md"
                  icon={<Edit className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={() => router.push(`/hr/payroll/${payroll.id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  icon={<Play className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={handleProcessPayroll}
                >
                  Process Payroll
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {payroll.employees}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Employees
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-info" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              ${formatNumber(payroll.grossPay)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gross Pay
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              ${formatNumber(payroll.totalDeductions + payroll.totalTaxes)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Deductions
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              ${formatNumber(payroll.netPay)}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Net Pay
            </p>
          </Card>
        </div>

        {/* Payroll Summary */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Payroll Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Period</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {payroll.period}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Pay Date</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {new Date(payroll.payDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Created By</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {payroll.createdBy}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Created Date</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {new Date(payroll.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Base Salaries</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${formatNumber(payroll.grossPay - payroll.totalBonuses)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Bonuses</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${formatNumber(payroll.totalBonuses)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Deductions</span>
                <span className="font-medium text-error">
                  -${formatNumber(payroll.totalDeductions)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Taxes</span>
                <span className="font-medium text-error">
                  -${formatNumber(payroll.totalTaxes)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-border">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Net Pay
                </span>
                <span className="text-xl font-bold text-success">
                  ${formatNumber(payroll.netPay)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Employee Payments Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-dark-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Employee Payments
            </h2>
            {selectedEmployees.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                icon={<Mail className="w-4 h-4" />}
                iconPosition="left"
              >
                Send Payslips ({selectedEmployees.length})
              </Button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.length === employeePayments.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Base Salary
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Bonuses
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Taxes
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Net Pay
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
              {employeePayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(payment.id)}
                      onChange={() => handleSelectEmployee(payment.id)}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {payment.employeeName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {payment.employeeId}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {payment.department}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    ${formatNumber(payment.baseSalary)}
                  </td>
                  <td className="px-6 py-4 text-sm text-success">
                    +${formatNumber(payment.bonuses)}
                  </td>
                  <td className="px-6 py-4 text-sm text-error">
                    -${formatNumber(payment.deductions)}
                  </td>
                  <td className="px-6 py-4 text-sm text-error">
                    -${formatNumber(payment.taxes)}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-success">
                    ${formatNumber(payment.netPay)}
                  </td>
                  <td className="px-6 py-4">
                    {getPaymentStatusBadge(payment.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Eye className="w-4 h-4" />}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageLayout>
  )
}
