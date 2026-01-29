'use client'

import { useRef, useState, KeyboardEvent, ClipboardEvent } from 'react'
import { cn } from '@/lib/utils'

interface OTPInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  error?: string
  label?: string
  disabled?: boolean
}

export default function OTPInput({
  length = 6,
  value,
  onChange,
  error,
  label,
  disabled = false,
}: OTPInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const handleChange = (index: number, digit: string) => {
    // Only allow digits
    if (!/^\d*$/.test(digit)) return

    const newValue = value.split('')
    newValue[index] = digit.slice(-1) // Take only the last digit
    const updatedValue = newValue.join('')

    onChange(updatedValue)

    // Move to next input if digit entered
    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newValue = value.split('')

      if (newValue[index]) {
        // Clear current digit
        newValue[index] = ''
        onChange(newValue.join(''))
      } else if (index > 0) {
        // Move to previous input and clear it
        inputsRef.current[index - 1]?.focus()
        newValue[index - 1] = ''
        onChange(newValue.join(''))
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').trim()

    // Only allow digits
    if (!/^\d+$/.test(pastedData)) return

    // Take only the required length
    const digits = pastedData.slice(0, length)
    onChange(digits)

    // Focus the last filled input or the last input
    const nextIndex = Math.min(digits.length, length - 1)
    inputsRef.current[nextIndex]?.focus()
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <div className="flex gap-3 justify-center">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            disabled={disabled}
            className={cn(
              'w-12 h-14 text-center text-2xl font-semibold rounded-xl transition-all',
              'bg-gray-50 dark:bg-dark-surface border-2',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              error
                ? 'border-error focus:ring-error'
                : focusedIndex === index
                ? 'border-primary-500'
                : 'border-gray-300 dark:border-dark-border',
              value[index] && !error && 'border-primary-500'
            )}
          />
        ))}
      </div>

      {error && (
        <p className="mt-2 text-sm text-error text-center">{error}</p>
      )}
    </div>
  )
}
