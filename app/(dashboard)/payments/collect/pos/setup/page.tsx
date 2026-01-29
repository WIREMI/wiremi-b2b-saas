'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Smartphone,
  ArrowLeft,
  CheckCircle2,
  QrCode,
  Wifi,
  MapPin,
  Type,
  AlignLeft,
  Zap,
  Download,
  Bluetooth,
  Settings,
  Shield,
  CreditCard,
  Wallet,
  Scan,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function SetupPOSTerminalPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  // Form state
  const [deviceType, setDeviceType] = useState<'physical' | 'mobile-app'>('physical')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [connectionMethod, setConnectionMethod] = useState<'wifi' | 'bluetooth' | 'cellular'>('wifi')
  const [selectedMethods, setSelectedMethods] = useState<string[]>(['card', 'mobile-money'])
  const [pairingCode, setPairingCode] = useState('')

  // Generate random pairing code
  const generatePairingCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const [generatedCode] = useState(generatePairingCode())

  const paymentMethods = [
    { id: 'card', label: 'Card Payments', icon: CreditCard, description: 'Accept credit & debit cards' },
    { id: 'mobile-money', label: 'Mobile Money', icon: Smartphone, description: 'MTN, Orange, Airtel, etc.' },
    { id: 'qr', label: 'QR Code Scan', icon: QrCode, description: 'Scan customer QR codes' },
    { id: 'wallet', label: 'Wallet Payments', icon: Wallet, description: 'Wiremi wallet payments' },
  ]

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleComplete = () => {
    // Mock terminal setup completion
    const newTerminalId = 'pos-' + Math.random().toString(36).substr(2, 9)
    console.log('Setting up POS terminal:', {
      deviceType,
      name,
      location,
      connectionMethod,
      paymentMethods: selectedMethods,
      pairingCode,
    })
    router.push(`/payments/collect/pos/${newTerminalId}`)
  }

  const togglePaymentMethod = (methodId: string) => {
    setSelectedMethods((prev) =>
      prev.includes(methodId)
        ? prev.filter((id) => id !== methodId)
        : [...prev, methodId]
    )
  }

  const canProceed = () => {
    if (step === 1) return true // Device type selection
    if (step === 2) return name.trim() !== '' && location.trim() !== ''
    if (step === 3) return selectedMethods.length > 0
    if (step === 4) return pairingCode.toUpperCase() === generatedCode
    return false
  }

  return (
    <PageLayout maxWidth="normal">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            iconPosition="left"
            onClick={() => router.push('/payments/collect/pos')}
            className="mb-4"
          >
            Back to POS Terminals
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Setup POS Terminal
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Set up your point-of-sale terminal in 4 simple steps
          </p>
        </div>

        {/* Progress Steps */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= stepNum
                        ? 'bg-blue-500 text-white shadow-lg scale-110'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step > stepNum ? <CheckCircle2 className="w-6 h-6" /> : stepNum}
                  </div>
                  <p
                    className={`text-xs mt-2 font-medium ${
                      step >= stepNum
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {stepNum === 1 && 'Device'}
                    {stepNum === 2 && 'Details'}
                    {stepNum === 3 && 'Methods'}
                    {stepNum === 4 && 'Pair'}
                  </p>
                </div>
                {stepNum < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                      step > stepNum ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Step 1: Device Type Selection */}
        {step === 1 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Device Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setDeviceType('physical')}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  deviceType === 'physical'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  {deviceType === 'physical' && (
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Physical Terminal
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Wiremi POS device with built-in card reader and receipt printer
                </p>
                <Badge variant="info" size="sm">Recommended</Badge>
              </button>

              <button
                onClick={() => setDeviceType('mobile-app')}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  deviceType === 'mobile-app'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  {deviceType === 'mobile-app' && (
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Mobile App
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Turn your smartphone or tablet into a payment terminal
                </p>
                <Badge variant="success" size="sm">No Hardware</Badge>
              </button>
            </div>
          </Card>
        )}

        {/* Step 2: Terminal Details */}
        {step === 2 && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Terminal Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Type className="w-4 h-4" />
                    Terminal Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Main Store Counter"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MapPin className="w-4 h-4" />
                    Location
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Downtown Store - Register 1"
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </Card>

            {/* Connection Method */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connection Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setConnectionMethod('wifi')}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    connectionMethod === 'wifi'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                >
                  <Wifi className={`w-6 h-6 mx-auto mb-2 ${
                    connectionMethod === 'wifi' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Wi-Fi</p>
                </button>

                <button
                  onClick={() => setConnectionMethod('bluetooth')}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    connectionMethod === 'bluetooth'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                >
                  <Bluetooth className={`w-6 h-6 mx-auto mb-2 ${
                    connectionMethod === 'bluetooth' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Bluetooth</p>
                </button>

                <button
                  onClick={() => setConnectionMethod('cellular')}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    connectionMethod === 'cellular'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                  }`}
                >
                  <Zap className={`w-6 h-6 mx-auto mb-2 ${
                    connectionMethod === 'cellular' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Cellular</p>
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Payment Methods */}
        {step === 3 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Payment Methods
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Select which payment methods this terminal will accept
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => {
                const Icon = method.icon
                const isSelected = selectedMethods.includes(method.id)
                return (
                  <button
                    key={method.id}
                    onClick={() => togglePaymentMethod(method.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-6 h-6 ${
                        isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                      }`} />
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {method.label}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {method.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </Card>
        )}

        {/* Step 4: Pairing */}
        {step === 4 && (
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scan className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Pair Your Terminal
                </h2>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-6">
                  {deviceType === 'physical'
                    ? 'Enter the pairing code shown on your POS terminal screen'
                    : 'Open the Wiremi POS app and enter this code'}
                </p>

                {/* Display Code */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border-2 border-blue-300 dark:border-blue-700 mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Pairing Code</p>
                  <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 font-mono tracking-wider">
                    {generatedCode}
                  </p>
                </div>

                {/* QR Code Alternative */}
                <div className="mb-6">
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    Or scan this QR code with your device
                  </p>
                  <div className="inline-block p-6 bg-white dark:bg-gray-900 rounded-xl">
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Code Input */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Enter Pairing Code
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Code from Terminal
                  </label>
                  <input
                    type="text"
                    value={pairingCode}
                    onChange={(e) => setPairingCode(e.target.value.toUpperCase())}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xl text-center tracking-wider"
                  />
                </div>
                {pairingCode && pairingCode.toUpperCase() !== generatedCode && (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <Shield className="w-4 h-4" />
                    <span>Code doesn't match. Please try again.</span>
                  </div>
                )}
                {pairingCode.toUpperCase() === generatedCode && (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Code verified! Ready to complete setup.</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="md"
              onClick={step === 1 ? () => router.push('/payments/collect/pos') : handleBack}
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Step {step} of 4
              </span>
              {step < 4 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  disabled={!canProceed()}
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  icon={<CheckCircle2 className="w-5 h-5" />}
                  iconPosition="left"
                  onClick={handleComplete}
                  disabled={!canProceed()}
                >
                  Complete Setup
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
