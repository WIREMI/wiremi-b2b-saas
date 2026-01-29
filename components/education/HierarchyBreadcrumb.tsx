'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface HierarchyBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function HierarchyBreadcrumb({ items, className = '' }: HierarchyBreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600 flex-shrink-0" />
            )}

            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`truncate ${
                  isLast
                    ? 'text-gray-900 dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {item.label}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}
