'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function NewClientPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    taxId: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
    },
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to backend
    console.log('Creating client:', formData)
    router.push('/invoicing/clients')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                icon={<ArrowLeft className="w-4 h-4" />}
                onClick={() => router.push('/invoicing/clients')}
              >
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Add New Client
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter client details and billing information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
              />
              <Input
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+1 (555) 123-4567"
              />
              <Input
                label="Company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                placeholder="Acme Corporation"
              />
              <Input
                label="Website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://example.com"
              />
              <Input
                label="Tax ID / VAT"
                value={formData.taxId}
                onChange={(e) =>
                  setFormData({ ...formData, taxId: e.target.value })
                }
                placeholder="123-45-6789"
              />
            </div>
          </Card>

          {/* Address */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Address
            </h2>
            <div className="space-y-6">
              <Input
                label="Street Address"
                value={formData.address.street}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value },
                  })
                }
                placeholder="123 Main Street"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input
                  label="City"
                  value={formData.address.city}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value },
                    })
                  }
                  placeholder="San Francisco"
                />
                <Input
                  label="State / Province"
                  value={formData.address.state}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value },
                    })
                  }
                  placeholder="CA"
                />
                <Input
                  label="Postal Code"
                  value={formData.address.postalCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: {
                        ...formData.address,
                        postalCode: e.target.value,
                      },
                    })
                  }
                  placeholder="94102"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Country
                </label>
                <select
                  value={formData.address.country}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, country: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Australia</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Additional Notes
            </h2>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Any additional notes about this client..."
            />
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/invoicing/clients')}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" icon={<Save className="w-4 h-4" />} className="flex-1">
              Save Client
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
