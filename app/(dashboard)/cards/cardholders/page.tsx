'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Plus,
  Search,
  Mail,
  Phone,
  CreditCard,
  DollarSign,
  Eye,
  Edit,
  MoreVertical,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { mockCorporateCards } from '@/lib/mock-data/corporate-cards'
import { formatCurrency, getCardStatusColor } from '@/types/corporate-cards'

export default function CardholdersPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  // Extract unique cardholders
  const cardholders = mockCorporateCards.reduce((acc, card) => {
    const existing = acc.find((h) => h.cardholderName === card.cardholderName)
    if (existing) {
      existing.cards.push(card)
      existing.totalSpent += card.totalSpent
    } else {
      acc.push({
        cardholderName: card.cardholderName,
        email: card.cardholderEmail,
        department: card.department,
        cards: [card],
        totalSpent: card.totalSpent,
      })
    }
    return acc
  }, [] as Array<{ cardholderName: string; email: string; department?: string; cards: typeof mockCorporateCards; totalSpent: number }>)

  // Filter cardholders
  const filteredCardholders = cardholders.filter(
    (holder) =>
      holder.cardholderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holder.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      holder.department?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                icon={<ArrowLeft className="w-4 h-4" />}
                iconPosition="left"
                onClick={() => router.push('/cards')}
              >
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Cardholders
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Manage cardholders and their assigned cards
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                icon={<Download className="w-4 h-4" />}
                iconPosition="left"
              >
                Export
              </Button>
              <Button
                icon={<Plus className="w-4 h-4" />}
                iconPosition="left"
              >
                Add Cardholder
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Cardholders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cardholders.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Cards</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockCorporateCards.filter((c) => c.status === 'ACTIVE').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-info" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Spend</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(cardholders.reduce((sum, h) => sum + h.totalSpent, 0))}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg per Holder</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(
                    cardholders.reduce((sum, h) => sum + h.totalSpent, 0) / cardholders.length
                  )}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-6 mb-6">
          <Input
            placeholder="Search cardholders by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            iconPosition="left"
          />
        </Card>

        {/* Cardholders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCardholders.length === 0 ? (
            <div className="col-span-full">
              <Card className="p-12 text-center">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No cardholders found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchTerm
                    ? 'Try adjusting your search terms'
                    : 'Get started by adding your first cardholder'}
                </p>
                {!searchTerm && (
                  <Button
                    icon={<Plus className="w-4 h-4" />}
                    iconPosition="left"
                  >
                    Add Cardholder
                  </Button>
                )}
              </Card>
            </div>
          ) : (
            filteredCardholders.map((holder) => (
              <Card
                key={holder.cardholderName}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                {/* Cardholder Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {holder.cardholderName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {holder.cardholderName}
                      </h3>
                      {holder.department && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {holder.department}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{holder.email}</span>
                  </div>
                </div>

                {/* Cards */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    Assigned Cards ({holder.cards.length})
                  </p>
                  <div className="space-y-2">
                    {holder.cards.map((card) => (
                      <div
                        key={card.id}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-dark-surface rounded-lg cursor-pointer hover:shadow transition-shadow"
                        onClick={() => router.push(`/cards/${card.id}`)}
                      >
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-mono text-gray-900 dark:text-white">
                            •••• {card.lastFourDigits}
                          </span>
                        </div>
                        <Badge
                          variant={getCardStatusColor(card.status)}
                          size="sm"
                        >
                          {card.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Total Spend
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(holder.totalSpent)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Active Cards
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {holder.cards.filter((c) => c.status === 'ACTIVE').length}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-dark-border">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    icon={<Eye className="w-3 h-3" />}
                    iconPosition="left"
                    onClick={() => {
                      if (holder.cards.length > 0) {
                        router.push(`/cards/${holder.cards[0].id}`)
                      }
                    }}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<Edit className="w-3 h-3" />}
                    iconPosition="left"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<Plus className="w-3 h-3" />}
                    iconPosition="left"
                  >
                    Add Card
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
