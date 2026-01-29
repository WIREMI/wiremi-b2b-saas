'use client'

import { motion } from 'framer-motion'
import { Badge } from './badge'

interface Tab {
  id: string
  label: string
  badge?: number | string
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export default function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div className={`border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <nav className="flex gap-2 overflow-x-auto scrollbar-hide" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const isDisabled = tab.disabled

          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && onChange(tab.id)}
              disabled={isDisabled}
              className={`
                relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
                ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : isDisabled
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                {tab.badge !== undefined && (
                  <Badge variant={isActive ? 'primary' : 'default'} size="sm">
                    {tab.badge}
                  </Badge>
                )}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
