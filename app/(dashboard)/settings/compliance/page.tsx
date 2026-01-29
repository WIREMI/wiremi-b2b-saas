'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, FileCheck, Download, Shield, Clock } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Select from '@/components/ui/select'

export default function CompliancePage() {
  const router = useRouter()
  const [retentionPeriod, setRetentionPeriod] = useState('90')

  const reports = [
    { id: '1', name: 'SOC 2 Compliance Report', date: '2026-Q1', status: 'ready' as const },
    { id: '2', name: 'GDPR Data Processing Report', date: '2026-01', status: 'ready' as const },
    { id: '3', name: 'Financial Audit Trail', date: '2025', status: 'ready' as const },
  ]

  const retentionOptions = [
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
    { value: '180', label: '180 days' },
    { value: '365', label: '1 year' },
  ]

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />} iconPosition="left" onClick={() => router.back()} className="mb-4">Back to Settings</Button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center">
            <FileCheck className="w-8 h-8 text-indigo-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Compliance & Audit</h1>
            <p className="text-gray-600 dark:text-gray-400">Regulatory compliance and audit settings</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compliance Reports</h2>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{report.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success" size="sm">Ready</Badge>
                  <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />} iconPosition="left">Download</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Retention Policy</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Configure how long data is retained before automatic deletion</p>
          <Select label="Retention Period" options={retentionOptions} value={retentionPeriod} onChange={(e) => setRetentionPeriod(e.target.value)} />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-success" />
                <Badge variant="success" size="sm">Certified</Badge>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">SOC 2 Type II</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Security & availability</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-success" />
                <Badge variant="success" size="sm">Compliant</Badge>
              </div>
              <p className="font-semibold text-gray-900 dark:text-white">GDPR</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Data protection</p>
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
