'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import EmptyState from '@/components/ui/empty-state'
import {
  Shield,
  ArrowLeft,
  Settings as SettingsIcon,
  AlertCircle,
  Save,
  Trash2
} from 'lucide-react'
import { getEscrowById } from '@/lib/mock-data/escrow'

interface Props {
  params: Promise<{ id: string }>
}

export default function EscrowSettingsPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const escrow = getEscrowById(id)

  const [settings, setSettings] = useState(escrow?.settings || {
    allowPartialReleases: false,
    requireUnanimousApproval: true,
    minimumStakeholders: 0,
    automaticNotifications: true,
    disputeResolutionProcess: 'MEDIATION' as const
  })

  const [isSaving, setIsSaving] = useState(false)

  if (!escrow) {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Escrow Not Found
          </h1>
        </div>
        <EmptyState
          icon={<Shield className="w-12 h-12" />}
          title="Escrow not found"
          description="The escrow you're looking for doesn't exist or you don't have access to it."
          action={{
            label: 'Back to Escrows',
            onClick: () => router.push('/escrow')
          }}
        />
      </PageLayout>
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    router.push(`/escrow/${id}`)
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Escrow Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure settings for {escrow.name}
        </p>
      </div>

      <Button variant="outline" onClick={() => router.push(`/escrow/${id}`)} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Escrow
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Release Settings */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Release Settings
            </h3>
            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowPartialReleases}
                  onChange={(e) => setSettings({ ...settings, allowPartialReleases: e.target.checked })}
                  className="w-5 h-5 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Allow Partial Releases
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Enable milestone-based or incremental fund releases instead of full amount only
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.requireUnanimousApproval}
                  onChange={(e) => setSettings({ ...settings, requireUnanimousApproval: e.target.checked })}
                  className="w-5 h-5 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Require Unanimous Approval
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    All stakeholders must approve fund release requests. If disabled, majority vote applies
                  </p>
                </div>
              </label>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Minimum Stakeholders
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings.minimumStakeholders}
                  onChange={(e) => setSettings({ ...settings, minimumStakeholders: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Minimum number of stakeholders required for this escrow
                </p>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Notifications
            </h3>
            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.automaticNotifications}
                  onChange={(e) => setSettings({ ...settings, automaticNotifications: e.target.checked })}
                  className="w-5 h-5 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Automatic Email Notifications
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Send email notifications for important escrow events (invitations, approvals, releases)
                  </p>
                </div>
              </label>
            </div>
          </Card>

          {/* Dispute Resolution */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Dispute Resolution
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Resolution Process
              </label>
              <select
                value={settings.disputeResolutionProcess}
                onChange={(e) => setSettings({ ...settings, disputeResolutionProcess: e.target.value as any })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="MEDIATION">Mediation (Recommended)</option>
                <option value="ARBITRATION">Arbitration</option>
                <option value="LEGAL">Legal Process</option>
              </select>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                The process to follow if a dispute is raised on this escrow
              </p>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => router.push(`/escrow/${id}`)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <Card className="border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-4">
              Danger Zone
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-sm font-medium text-red-900 dark:text-red-200 mb-2">
                  Cancel Escrow
                </p>
                <p className="text-xs text-red-700 dark:text-red-300 mb-3">
                  This will permanently cancel the escrow and return funds to the custodian. This action cannot be undone.
                </p>
                <Button variant="danger" size="sm" disabled={escrow.state !== 'FUNDED'}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Cancel Escrow
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
