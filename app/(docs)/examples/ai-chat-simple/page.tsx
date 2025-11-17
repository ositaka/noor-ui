'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { ChatMessage } from '@/components/ui/chat-message'
import { PromptInput } from '@/components/ui/prompt-input'
import { ThinkingIndicator } from '@/components/ui/thinking-indicator'
import { StreamingText } from '@/components/ui/streaming-text'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Trash2, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  isStreaming?: boolean
}

// Mock AI responses for demo
const mockResponses = {
  en: [
    "I'm here to help! What would you like to know?",
    "That's a great question. Let me provide you with a detailed answer.",
    "I understand your concern. Here's what I can tell you about that.",
    "Absolutely! I'd be happy to explain that in more detail.",
    "Thank you for asking. Let me break that down for you.",
  ],
  ar: [
    'أنا هنا للمساعدة! ماذا تريد أن تعرف؟',
    'هذا سؤال رائع. دعني أقدم لك إجابة تفصيلية.',
    'أفهم قلقك. إليك ما يمكنني إخبارك به حول ذلك.',
    'بالتأكيد! يسعدني أن أشرح ذلك بمزيد من التفاصيل.',
    'شكراً لسؤالك. دعني أوضح ذلك لك.',
  ],
}

export default function SimpleChatPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: isRTL
        ? 'مرحباً! أنا مساعد ذكي جاهز للإجابة على أسئلتك. كيف يمكنني مساعدتك اليوم؟'
        : 'Hello! I\'m an AI assistant ready to answer your questions. How can I help you today?',
      timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ])
  const [isThinking, setIsThinking] = React.useState(false)
  const [streamingMessageId, setStreamingMessageId] = React.useState<string | null>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  const handleSend = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsThinking(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    setIsThinking(false)

    // Generate mock response
    const responses = isRTL ? mockResponses.ar : mockResponses.en
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `${randomResponse} ${content.length > 50 ? (isRTL ? '\n\nبناءً على رسالتك الطويلة، دعني أقدم لك إجابة شاملة.' : '\n\nBased on your detailed message, let me provide you with a comprehensive answer.') : ''}`,
      timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isStreaming: true,
    }

    setStreamingMessageId(assistantMessage.id)
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'system',
        content: isRTL
          ? 'محادثة جديدة بدأت. كيف يمكنني مساعدتك؟'
          : 'New conversation started. How can I help you?',
        timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])
    setStreamingMessageId(null)
  }

  const handleRegenerate = (messageId: string) => {
    // Find the message index
    const index = messages.findIndex((m) => m.id === messageId)
    if (index === -1) return

    // Remove the assistant message and simulate regeneration
    setMessages((prev) => prev.filter((m) => m.id !== messageId))
    setIsThinking(true)

    setTimeout(() => {
      setIsThinking(false)
      const responses = isRTL ? mockResponses.ar : mockResponses.en
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isStreaming: true,
      }

      setStreamingMessageId(newMessage.id)
      setMessages((prev) => [...prev.slice(0, index), newMessage, ...prev.slice(index)])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <main id="main-content" className="h-screen flex flex-col">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">
                  {isRTL ? 'محادثة بسيطة مع الذكاء الاصطناعي' : 'Simple AI Chat'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {isRTL ? 'مساعد ذكي للإجابة على أسئلتك' : 'AI assistant for your questions'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleClearChat}>
                <Trash2 className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                {isRTL ? 'مسح' : 'Clear'}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/examples">{isRTL ? 'الأمثلة' : 'Examples'}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="border-b bg-background">
          <div className="container py-3">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    {isRTL ? 'الرئيسية' : 'Home'}
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/examples" className="hover:text-foreground transition-colors">
                    {isRTL ? 'الأمثلة' : 'Examples'}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground font-medium">
                  {isRTL ? 'محادثة بسيطة' : 'Simple Chat'}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="container max-w-4xl py-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={
                    message.isStreaming && message.id === streamingMessageId ? (
                      message.content
                    ) : (
                      message.content
                    )
                  }
                  timestamp={message.timestamp}
                  isRTL={isRTL}
                  showRegenerate={message.role === 'assistant'}
                  onRegenerate={() => handleRegenerate(message.id)}
                  state={message.isStreaming ? 'streaming' : 'complete'}
                />
              ))}

              {isThinking && (
                <div className="flex items-center gap-3 p-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <ThinkingIndicator variant="typing" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t bg-background">
          <div className="container max-w-4xl py-4">
            <PromptInput
              placeholder="Ask me anything..."
              placeholderAr="اسألني أي شيء..."
              isRTL={isRTL}
              onSend={handleSend}
              isLoading={isThinking}
              showAttachment={false}
              showVoice={false}
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {isRTL
                ? 'هذا مثال توضيحي. الردود مولدة تلقائياً ولا تستخدم ذكاء اصطناعي حقيقي.'
                : 'This is a demo. Responses are generated automatically and do not use real AI.'}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
