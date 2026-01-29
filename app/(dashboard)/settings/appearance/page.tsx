'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Monitor,
  Sun,
  Moon,
  Palette,
  Type,
  Layout,
  Sparkles,
  Check,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Theme = 'light' | 'dark' | 'system'
type AccentColor = 'blue' | 'purple' | 'green' | 'orange' | 'red'
type FontSize = 'small' | 'medium' | 'large'
type Density = 'comfortable' | 'compact' | 'spacious'

export default function AppearanceSettingsPage() {
  const router = useRouter()
  const [theme, setTheme] = useState<Theme>('system')
  const [accentColor, setAccentColor] = useState<AccentColor>('blue')
  const [fontSize, setFontSize] = useState<FontSize>('medium')
  const [density, setDensity] = useState<Density>('comfortable')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Load saved preferences
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'system'
    const savedAccent = (localStorage.getItem('accentColor') as AccentColor) || 'blue'
    const savedFontSize = (localStorage.getItem('fontSize') as FontSize) || 'medium'
    const savedDensity = (localStorage.getItem('density') as Density) || 'comfortable'

    setTheme(savedTheme)
    setAccentColor(savedAccent)
    setFontSize(savedFontSize)
    setDensity(savedDensity)

    // Apply theme
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', prefersDark)
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  const handleAccentColorChange = (color: AccentColor) => {
    setAccentColor(color)
    localStorage.setItem('accentColor', color)
    // In a real app, this would update CSS variables
  }

  const handleFontSizeChange = (size: FontSize) => {
    setFontSize(size)
    localStorage.setItem('fontSize', size)
    // In a real app, this would update root font size
  }

  const handleDensityChange = (newDensity: Density) => {
    setDensity(newDensity)
    localStorage.setItem('density', newDensity)
    // In a real app, this would update spacing variables
  }

  const themeOptions = [
    { value: 'light' as Theme, label: 'Light', icon: <Sun className="w-5 h-5" />, description: 'Clean and bright interface' },
    { value: 'dark' as Theme, label: 'Dark', icon: <Moon className="w-5 h-5" />, description: 'Easy on the eyes' },
    { value: 'system' as Theme, label: 'System', icon: <Monitor className="w-5 h-5" />, description: 'Follow system preference' },
  ]

  const accentColors = [
    { value: 'blue' as AccentColor, color: '#2D7EF7', name: 'Blue' },
    { value: 'purple' as AccentColor, color: '#8B5CF6', name: 'Purple' },
    { value: 'green' as AccentColor, color: '#10B981', name: 'Green' },
    { value: 'orange' as AccentColor, color: '#F59E0B', name: 'Orange' },
    { value: 'red' as AccentColor, color: '#EF4444', name: 'Red' },
  ]

  const fontSizes = [
    { value: 'small' as FontSize, label: 'Small', description: '14px base size' },
    { value: 'medium' as FontSize, label: 'Medium', description: '16px base size (Default)' },
    { value: 'large' as FontSize, label: 'Large', description: '18px base size' },
  ]

  const densityOptions = [
    { value: 'compact' as Density, label: 'Compact', description: 'More content, less spacing' },
    { value: 'comfortable' as Density, label: 'Comfortable', description: 'Balanced spacing (Default)' },
    { value: 'spacious' as Density, label: 'Spacious', description: 'More spacing, easier to read' },
  ]

  if (!isMounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/settings')}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Back to Settings"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Appearance Settings
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Customize the look and feel of your workspace
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Theme Selection */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Theme Mode</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Choose your interface theme</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                  theme === option.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {theme === option.value && (
                  <div className="absolute top-3 right-3">
                    <Check className="w-5 h-5 text-primary-500" />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-gray-600 dark:text-gray-400">{option.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{option.label}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Accent Color */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Accent Color</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Choose your primary accent color</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {accentColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleAccentColorChange(color.value)}
                className="relative group"
              >
                <div
                  className={`w-16 h-16 rounded-xl transition-all ${
                    accentColor === color.value ? 'ring-4 ring-offset-2 dark:ring-offset-dark-bg scale-110' : ''
                  }`}
                  style={{ backgroundColor: color.color }}
                >
                  {accentColor === color.value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-2">{color.name}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Font Size */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Type className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Font Size</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Adjust text size for better readability</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => handleFontSizeChange(size.value)}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  fontSize === size.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {fontSize === size.value && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-primary-500" />
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{size.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{size.description}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Layout Density */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
              <Layout className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Layout Density</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Control spacing and information density</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {densityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleDensityChange(option.value)}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  density === option.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {density === option.value && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-primary-500" />
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{option.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Preview Section */}
        <Card className="p-6 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 border-primary-200 dark:border-primary-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">White Label Ready</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                These appearance settings are part of our white-label solution. Customize the platform to match your brand identity.
              </p>
              <Badge variant="info" size="sm">Coming Soon: Custom Branding</Badge>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.push('/settings')}>
            Cancel
          </Button>
          <Button fullWidth>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
