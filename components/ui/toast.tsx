'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    const newToast: Toast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    // Auto-dismiss after duration (default 5s)
    setTimeout(() => {
      hideToast(id)
    }, toast.duration || 5000)
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />
      case 'error':
        return <XCircle className="w-5 h-5" />
      case 'warning':
        return <AlertCircle className="w-5 h-5" />
      case 'info':
        return <Info className="w-5 h-5" />
    }
  }

  const getColors = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-success-light dark:bg-success/20 text-success border-success'
      case 'error':
        return 'bg-error-light dark:bg-error/20 text-error border-error'
      case 'warning':
        return 'bg-warning-light dark:bg-warning/20 text-warning border-warning'
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-500'
    }
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto"
            >
              <div
                className={cn(
                  'flex items-start gap-3 p-4 rounded-xl shadow-lg border-2 min-w-[320px] max-w-md',
                  'bg-gray-50 dark:bg-dark-surface',
                  getColors(toast.type)
                )}
              >
                <span className="shrink-0">{getIcon(toast.type)}</span>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    {toast.title}
                  </p>
                  {toast.message && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {toast.message}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => hideToast(toast.id)}
                  className="shrink-0 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-black/10 dark:hover:bg-gray-100/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
