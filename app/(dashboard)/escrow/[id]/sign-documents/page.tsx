'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import EmptyState from '@/components/ui/empty-state'
import {
  Shield,
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Edit3,
  Send
} from 'lucide-react'
import { getEscrowById } from '@/lib/mock-data/escrow'

interface Props {
  params: Promise<{ id: string }>
}

export default function SignDocumentsPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [signature, setSignature] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const escrow = getEscrowById(id)
  const currentUserId = 'user-beneficiary-autogroup' // Mock

  if (!escrow || escrow.state !== 'AWAITING_SIGNATURES') {
    return (
      <PageLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Signatures Not Required
          </h1>
        </div>
        <EmptyState
          icon={<AlertCircle className="w-12 h-12" />}
          title="Signatures not required"
          description="This escrow is not currently awaiting signatures."
          action={{
            label: 'Back to Escrow',
            onClick: () => router.push(`/escrow/${id}`)
          }}
        />
      </PageLayout>
    )
  }

  const currentRequest = escrow.fundRequests[escrow.fundRequests.length - 1]
  const documentsToSign = currentRequest?.documents.filter(d => d.requiresSignature && d.status !== 'SIGNED') || []

  const handleSign = async () => {
    if (!agreedToTerms || !signature) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push(`/escrow/${id}`)
  }

  return (
    <PageLayout maxWidth="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Sign Documents
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Electronic signature required for {escrow.name}
        </p>
      </div>

      <Button variant="outline" onClick={() => router.push(`/escrow/${id}`)} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Escrow
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Documents to Sign */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Documents Requiring Signature
            </h3>
            {documentsToSign.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All documents have been signed
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {documentsToSign.map((doc) => (
                  <div key={doc.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{doc.name}</h4>
                          {doc.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{doc.description}</p>
                          )}
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant="warning">Pending Signature</Badge>
                            <span className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">
                              {doc.signatures.length} of {escrow.stakeholders.length + 2} signed
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Signature Pad */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Electronic Signature
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type Your Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                  />
                  <Edit3 className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {signature && (
                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <p className="text-3xl font-signature text-gray-900 dark:text-gray-100 text-center" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                    {signature}
                  </p>
                </div>
              )}

              <label className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 mt-0.5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    I agree to sign electronically
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    By checking this box and typing my name above, I agree that this electronic signature has the same legal effect as a handwritten signature.
                  </p>
                </div>
              </label>

              <Button
                variant="primary"
                onClick={handleSign}
                disabled={!agreedToTerms || !signature || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing Documents...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Sign All Documents
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Signature Status
            </h3>
            <div className="space-y-3">
              {currentRequest?.documents
                .filter(d => d.requiresSignature)
                .map(doc => doc.signatures)
                .flat()
                .map((sig) => (
                  <div key={sig.id} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {sig.signedByName}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Signed on {new Date(sig.signedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
