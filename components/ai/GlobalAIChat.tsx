'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  X,
  Send,
  Minimize2,
  Maximize2,
  Users,
  MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function GlobalAIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI assistant. I can help you with business insights, data analysis, writing emails, and more. What can I help you with?"
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setMessages(prev => [...prev, { role: 'user', content: query }])
    setQuery('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(query)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (q: string): string => {
    const lowerQ = q.toLowerCase()

    if (lowerQ.includes('revenue') || lowerQ.includes('sales')) {
      return `Based on your current data:\n\n• **This Month's Revenue:** $287,000\n• **YoY Growth:** +15.2%\n• **Top Performing Segment:** Enterprise (+23%)\n\nWould you like me to dive deeper into any specific aspect?`
    }

    if (lowerQ.includes('customer') || lowerQ.includes('churn')) {
      return `Here's your customer health overview:\n\n• **Active Customers:** 412\n• **Churn Rate:** 4.2%\n• **At-Risk Accounts:** 3 enterprise customers\n\nWould you like me to prepare a retention strategy?`
    }

    if (lowerQ.includes('email') || lowerQ.includes('write')) {
      return `I'd be happy to help you write that! Please share:\n\n1. **Recipient:** Who is this for?\n2. **Purpose:** What's the goal?\n3. **Tone:** Formal, friendly, or urgent?\n\nOnce you provide these details, I'll draft it for you.`
    }

    return `I understand you're asking about "${q}". Let me analyze that for you.\n\nBased on my analysis, your business metrics are performing well. Would you like me to elaborate on any specific area?`
  }

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-500 hover:bg-primary-600 rounded-full shadow-lg flex items-center justify-center transition-colors"
          >
            <MessageSquare className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : 500
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed bottom-6 right-6 z-50 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col",
              isMinimized && "h-auto"
            )}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">AI Assistant</p>
                  <p className="text-xs text-gray-500">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Minimize2 className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 340 }}>
                  {messages.map((message, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex gap-2",
                        message.role === 'user' && "flex-row-reverse"
                      )}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
                        message.role === 'assistant'
                          ? "bg-primary-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      )}>
                        {message.role === 'assistant'
                          ? <Brain className="w-4 h-4 text-white" />
                          : <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        }
                      </div>
                      <div className={cn(
                        "max-w-[75%] p-3 rounded-2xl text-sm",
                        message.role === 'assistant'
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                          : "bg-primary-500 text-white"
                      )}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask anything..."
                      className="flex-1 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!query.trim() || isTyping}
                      className="w-10 h-10 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 rounded-xl flex items-center justify-center transition-colors"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
