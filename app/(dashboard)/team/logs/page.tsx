'use client'

import { FileText, ArrowLeft, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function ActivityLogsPage() {
  const router = useRouter()

  return (
    <PageLayout maxWidth="normal">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          icon={<ArrowLeft className="w-4 h-4" />}
          iconPosition="left"
          onClick={() => router.push('/team')}
          className="mb-4"
        >
          Back to Team
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-2xl w-full p-12 text-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-slate-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Activity Logs
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Comprehensive audit trail of all team activities, user actions, and system events for compliance and security monitoring.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-warning" />
            <span className="text-warning font-semibold">Coming Soon</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-400 mb-8">
            This feature is currently under development and will be available in a future update.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="primary"
              size="md"
              onClick={() => router.push('/team')}
            >
              View Team
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => router.push('/settings/security')}
            >
              Security Settings
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
