'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Zap,
  Brain,
  Sparkles,
  PlayCircle,
  PauseCircle,
  Settings,
  Plus,
  CheckCircle,
  Clock,
  ArrowRight,
  Filter,
  Mail,
  DollarSign,
  FileText,
  Users,
  Calendar,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Download,
  Edit,
  Trash2,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Workflow {
  id: string
  name: string
  description: string
  trigger: string
  status: 'active' | 'paused' | 'draft'
  executions: number
  successRate: number
  timeSaved: string
  lastRun?: Date
  actions: number
  category: string
}

interface WorkflowTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: React.ReactNode
  actions: string[]
  popularity: number
}

export default function AIWorkflowAutomationPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const workflows: Workflow[] = [
    {
      id: '1',
      name: 'Auto-categorize Transactions',
      description: 'AI automatically categorizes incoming transactions based on merchant, amount, and historical patterns',
      trigger: 'New transaction detected',
      status: 'active',
      executions: 1247,
      successRate: 98.2,
      timeSaved: '12.4 hrs/week',
      lastRun: new Date(Date.now() - 5 * 60 * 1000),
      actions: 3,
      category: 'Finance'
    },
    {
      id: '2',
      name: 'Invoice Payment Reminders',
      description: 'Sends smart reminders to customers with overdue invoices, adjusting tone based on customer relationship',
      trigger: 'Invoice overdue by 3 days',
      status: 'active',
      executions: 342,
      successRate: 94.5,
      timeSaved: '8.2 hrs/week',
      lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
      actions: 5,
      category: 'Finance'
    },
    {
      id: '3',
      name: 'Expense Approval Routing',
      description: 'Routes expense reports to appropriate approvers based on amount, department, and policy rules',
      trigger: 'New expense submitted',
      status: 'active',
      executions: 856,
      successRate: 99.1,
      timeSaved: '15.6 hrs/week',
      lastRun: new Date(Date.now() - 30 * 60 * 1000),
      actions: 4,
      category: 'Operations'
    },
    {
      id: '4',
      name: 'New Customer Onboarding',
      description: 'Automates welcome emails, account setup, and initial training materials for new customers',
      trigger: 'New customer signup',
      status: 'paused',
      executions: 124,
      successRate: 97.6,
      timeSaved: '6.8 hrs/week',
      lastRun: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      actions: 7,
      category: 'Sales'
    },
  ]

  const templates: WorkflowTemplate[] = [
    {
      id: 't1',
      name: 'Payroll Processing',
      description: 'Automate monthly payroll calculations, tax deductions, and payment distribution',
      category: 'Finance',
      icon: <DollarSign className="w-5 h-5" />,
      actions: ['Calculate salaries', 'Apply tax rules', 'Generate payslips', 'Send payments'],
      popularity: 95
    },
    {
      id: 't2',
      name: 'Lead Nurturing',
      description: 'Engage leads with personalized content based on their behavior and interests',
      category: 'Sales',
      icon: <Users className="w-5 h-5" />,
      actions: ['Track engagement', 'Score leads', 'Send content', 'Notify sales team'],
      popularity: 88
    },
    {
      id: 't3',
      name: 'Monthly Reports',
      description: 'Generate and distribute monthly financial and operational reports',
      category: 'Operations',
      icon: <FileText className="w-5 h-5" />,
      actions: ['Collect data', 'Generate reports', 'Format documents', 'Email stakeholders'],
      popularity: 82
    },
  ]

  const stats = [
    {
      label: 'Active Workflows',
      value: '12',
      change: '+3',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100 dark:bg-amber-500/20'
    },
    {
      label: 'Total Executions',
      value: '2,569',
      change: '+18%',
      icon: <PlayCircle className="w-5 h-5" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-500/20'
    },
    {
      label: 'Success Rate',
      value: '97.8%',
      change: '+1.2%',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-500/20'
    },
    {
      label: 'Time Saved',
      value: '42.5 hrs',
      change: '+8.2 hrs',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-500/20'
    },
  ]

  const getStatusBadge = (status: Workflow['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success" size="sm"><PlayCircle className="w-3 h-3 mr-1" />Active</Badge>
      case 'paused':
        return <Badge variant="warning" size="sm"><PauseCircle className="w-3 h-3 mr-1" />Paused</Badge>
      case 'draft':
        return <Badge variant="default" size="sm">Draft</Badge>
    }
  }

  const categories = ['all', 'Finance', 'Sales', 'Operations', 'Marketing']

  const filteredWorkflows = selectedCategory === 'all'
    ? workflows
    : workflows.filter(w => w.category === selectedCategory)

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI Workflow Automation
              </h1>
              <Badge variant="default" className="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
                <Zap className="w-3 h-3 mr-1" />
                Intelligent Automation
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Build AI-powered workflows to automate repetitive tasks
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="md"
              icon={<BarChart3 className="w-4 h-4" />}
            >
              Analytics
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
            >
              Create Workflow
            </Button>
          </div>
        </div>

        {/* AI Status Banner */}
        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
                AI Automation Engine Active • 12 Workflows Running
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                AI is monitoring triggers and executing workflows in real-time. Machine learning continuously optimizes execution paths for better performance.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-dark-surface px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 dark:bg-green-600 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Running</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <Badge variant="success" size="sm">{stat.change}</Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400 dark:text-gray-400" />
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Active Workflows */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Active Workflows</h2>
        <div className="grid grid-cols-1 gap-4">
          {filteredWorkflows.map(workflow => (
            <Card key={workflow.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {workflow.name}
                    </h3>
                    {getStatusBadge(workflow.status)}
                    <Badge variant="default" size="sm">{workflow.category}</Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {workflow.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-3">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">Trigger:</span>
                    <span>{workflow.trigger}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" icon={<Edit className="w-4 h-4" />} />
                  <Button variant="outline" size="sm" icon={<Settings className="w-4 h-4" />} />
                  <Button variant="outline" size="sm" icon={<Trash2 className="w-4 h-4" />} />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">Executions</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {workflow.executions.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">Success Rate</p>
                  <p className="text-lg font-semibold text-green-500">
                    {workflow.successRate}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">Time Saved</p>
                  <p className="text-lg font-semibold text-purple-500">
                    {workflow.timeSaved}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">Actions</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {workflow.actions}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-1">Last Run</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {workflow.lastRun ? `${Math.floor((Date.now() - workflow.lastRun.getTime()) / 60000)}m ago` : 'Never'}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Workflow Templates */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Popular Templates</h2>
          <Button variant="outline" size="sm">View All Templates</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map(template => (
            <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center text-primary-500">
                  {template.icon}
                </div>
                <Badge variant="default" size="sm">{template.popularity}% popular</Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {template.description}
              </p>
              <div className="space-y-2 mb-4">
                {template.actions.map((action, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full" icon={<Plus className="w-4 h-4" />}>
                Use Template
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
