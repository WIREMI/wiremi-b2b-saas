'use client'

import { ReactNode, useState } from 'react'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Column<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (item: T) => ReactNode
  className?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void
  emptyMessage?: string
  className?: string
}

export default function Table<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  emptyMessage = 'No data available',
  className,
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div
      className={cn(
        'bg-gray-50 dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden',
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-dark-elevated border-b border-gray-200 dark:border-dark-border">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    'px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider',
                    column.sortable && 'cursor-pointer select-none hover:text-gray-900 dark:hover:text-white',
                    column.className
                  )}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && (
                      <span className="text-gray-400">
                        {sortColumn === column.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    'hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={cn(
                        'px-6 py-4 text-sm text-gray-900 dark:text-white',
                        column.className
                      )}
                    >
                      {column.render
                        ? column.render(item)
                        : item[column.key as keyof T]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
