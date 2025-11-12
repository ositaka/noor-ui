'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { ChatMessage } from '@/components/ui/chat-message'
import { PromptInput } from '@/components/ui/prompt-input'
import { ThinkingIndicator } from '@/components/ui/thinking-indicator'
import { MessageActions } from '@/components/ui/message-actions'
import { ModelSelector, type AIModel, defaultModels } from '@/components/ui/model-selector'
import {
  ParameterSlider,
  temperaturePresets,
} from '@/components/ui/parameter-slider'
import { TokenCounter } from '@/components/ui/token-counter'
import {
  ConversationHistory,
  type Conversation,
} from '@/components/ui/conversation-history'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  Settings,
  Sparkles,
  Menu,
  X,
  MessageSquare,
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  inputTokens?: number
  outputTokens?: number
}

// Mock AI responses
const mockResponses = {
  en: [
    "I'm here to help! What would you like to explore today?",
    "That's an interesting question. Let me provide you with a comprehensive answer based on the latest information available.",
    "I understand what you're asking. Here's a detailed explanation that should help clarify things.",
    "Excellent question! Let me break this down into key points for better understanding.",
    "Based on my analysis, here are the most important aspects to consider.",
  ],
  ar: [
    'أنا هنا للمساعدة! ماذا تريد أن تستكشف اليوم؟',
    'هذا سؤال مثير للاهتمام. دعني أقدم لك إجابة شاملة بناءً على أحدث المعلومات المتاحة.',
    'أفهم ما تسأل عنه. إليك شرح تفصيلي يجب أن يساعد في توضيح الأمور.',
    'سؤال ممتاز! دعني أقسم هذا إلى نقاط رئيسية لفهم أفضل.',
    'بناءً على تحليلي، إليك أهم الجوانب التي يجب مراعاتها.',
  ],
}

export default function AdvancedPlaygroundPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'

  // Sidebar state
  const [showHistory, setShowHistory] = React.useState(true)
  const [showSettings, setShowSettings] = React.useState(true)

  // Conversations state
  const [conversations, setConversations] = React.useState<Conversation[]>([
    {
      id: '1',
      title: 'Getting Started with AI',
      titleAr: 'البدء مع الذكاء الاصطناعي',
      preview: 'How do I use this playground?',
      previewAr: 'كيف أستخدم هذا الملعب؟',
      timestamp: new Date(),
      messageCount: 5,
      isActive: true,
    },
    {
      id: '2',
      title: 'Code Generation',
      titleAr: 'توليد الأكواد',
      preview: 'Help me write a React component',
      previewAr: 'ساعدني في كتابة مكون React',
      timestamp: new Date(Date.now() - 86400000), // Yesterday
      messageCount: 12,
    },
  ])
  const [activeConversationId, setActiveConversationId] = React.useState('1')

  // Messages state
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: isRTL
        ? 'مرحباً بك في ملعب الذكاء الاصطناعي المتقدم! جرب إعدادات النموذج المختلفة ومعلمات التحكم لتخصيص تجربة المحادثة.'
        : 'Welcome to the Advanced AI Playground! Try different model settings and control parameters to customize your conversation experience.',
      timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ])
  const [isThinking, setIsThinking] = React.useState(false)

  // Model settings
  const [selectedModel, setSelectedModel] = React.useState<AIModel>(defaultModels[0])
  const [temperature, setTemperature] = React.useState(0.7)
  const [maxTokens, setMaxTokens] = React.useState(2048)
  const [topP, setTopP] = React.useState(1.0)

  // Token usage
  const [totalInputTokens, setTotalInputTokens] = React.useState(125)
  const [totalOutputTokens, setTotalOutputTokens] = React.useState(432)

  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  const handleSend = async (content: string) => {
    // Calculate approximate input tokens (rough estimate: 1 token ≈ 4 characters)
    const estimatedInputTokens = Math.ceil(content.length / 4)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      inputTokens: estimatedInputTokens,
    }

    setMessages((prev) => [...prev, userMessage])
    setTotalInputTokens((prev) => prev + estimatedInputTokens)
    setIsThinking(true)

    // Simulate API delay based on model speed
    const delay =
      selectedModel.specs.speed === 'fast'
        ? 800
        : selectedModel.specs.speed === 'medium'
        ? 1500
        : 2500
    await new Promise((resolve) => setTimeout(resolve, delay + Math.random() * 500))

    setIsThinking(false)

    // Generate mock response
    const responses = isRTL ? mockResponses.ar : mockResponses.en
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    const responseContent = `${randomResponse}${
      content.length > 100
        ? isRTL
          ? '\n\nبناءً على استفسارك التفصيلي، سأقدم لك إجابة شاملة تغطي جميع الجوانب المهمة.'
          : '\n\nBased on your detailed inquiry, I will provide you with a comprehensive answer covering all important aspects.'
        : ''
    }`

    const estimatedOutputTokens = Math.ceil(responseContent.length / 4)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseContent,
      timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      outputTokens: estimatedOutputTokens,
    }

    setMessages((prev) => [...prev, assistantMessage])
    setTotalOutputTokens((prev) => prev + estimatedOutputTokens)
  }

  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: isRTL ? 'محادثة جديدة' : 'New Conversation',
      timestamp: new Date(),
      messageCount: 0,
      isActive: true,
    }
    setConversations((prev) =>
      prev.map((c) => ({ ...c, isActive: false })).concat(newConv)
    )
    setActiveConversationId(newConv.id)
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
    setTotalInputTokens(0)
    setTotalOutputTokens(0)
  }

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id)
    setConversations((prev) =>
      prev.map((c) => ({ ...c, isActive: c.id === id }))
    )
  }

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id))
    if (activeConversationId === id && conversations.length > 1) {
      const remainingConvs = conversations.filter((c) => c.id !== id)
      setActiveConversationId(remainingConvs[0].id)
    }
  }

  return (
    <div className="min-h-screen bg-background flex" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Conversation History Sidebar */}
      {showHistory && (
        <aside className="hidden lg:block border-e">
          <ConversationHistory
            conversations={conversations}
            activeId={activeConversationId}
            onSelect={handleSelectConversation}
            onCreate={handleNewConversation}
            onDelete={handleDeleteConversation}
            isRTL={isRTL}
            className="h-screen"
          />
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowHistory(!showHistory)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">
                  {isRTL ? 'ملعب الذكاء الاصطناعي المتقدم' : 'Advanced AI Playground'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {isRTL
                    ? `${selectedModel.nameAr || selectedModel.name} • حرارة ${temperature}`
                    : `${selectedModel.name} • Temp ${temperature}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                {isRTL ? 'الإعدادات' : 'Settings'}
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/examples">{isRTL ? 'الأمثلة' : 'Examples'}</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="container max-w-4xl py-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="group">
                  <ChatMessage
                    role={message.role}
                    content={message.content}
                    timestamp={message.timestamp}
                    isRTL={isRTL}
                    showCopy={false}
                    showRegenerate={false}
                  />
                  {message.role === 'assistant' && (
                    <div className={cn('mt-2', message.role === 'user' ? 'text-end' : '')}>
                      <MessageActions
                        variant="compact"
                        showCopy
                        showRegenerate
                        showEdit={false}
                        showShare
                        showFeedback
                        isRTL={isRTL}
                        onCopy={() => navigator.clipboard.writeText(message.content)}
                      />
                    </div>
                  )}
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-3 p-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <ThinkingIndicator
                    variant="typing"
                    message={isRTL ? 'جاري التفكير' : 'Thinking'}
                    messageAr="جاري التفكير"
                    isRTL={isRTL}
                  />
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
              placeholder={isRTL ? undefined : 'Ask anything...'}
              placeholderAr="اسأل عن أي شيء..."
              isRTL={isRTL}
              onSend={handleSend}
              isLoading={isThinking}
              showAttachment={false}
              showVoice={false}
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {isRTL
                ? 'هذا مثال توضيحي. الردود مولدة تلقائياً.'
                : 'This is a demo. Responses are generated automatically.'}
            </p>
          </div>
        </div>
      </main>

      {/* Settings Sidebar */}
      {showSettings && (
        <aside className="w-80 border-s bg-background p-4 space-y-4 overflow-y-auto hidden md:block">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">
              {isRTL ? 'الإعدادات' : 'Settings'}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="model" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="model" className="flex-1">
                {isRTL ? 'النموذج' : 'Model'}
              </TabsTrigger>
              <TabsTrigger value="params" className="flex-1">
                {isRTL ? 'المعاملات' : 'Parameters'}
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex-1">
                {isRTL ? 'الاستخدام' : 'Usage'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="model" className="space-y-4">
              <ModelSelector
                models={defaultModels}
                value={selectedModel.id}
                onValueChange={(id) => {
                  const model = defaultModels.find((m) => m.id === id)
                  if (model) setSelectedModel(model)
                }}
                isRTL={isRTL}
              />

              <Card className="p-4 space-y-2">
                <h3 className="font-medium text-sm">
                  {isRTL ? 'مواصفات النموذج' : 'Model Specifications'}
                </h3>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {isRTL ? 'المزود:' : 'Provider:'}
                    </span>
                    <span className="font-medium">
                      {isRTL
                        ? selectedModel.providerAr || selectedModel.provider
                        : selectedModel.provider}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {isRTL ? 'طول السياق:' : 'Context Length:'}
                    </span>
                    <span className="font-medium">
                      {selectedModel.specs.contextLength.toLocaleString(
                        isRTL ? 'ar-SA' : 'en-US'
                      )}
                    </span>
                  </div>
                  {selectedModel.specs.pricing && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {isRTL ? 'التسعير:' : 'Pricing:'}
                      </span>
                      <span className="font-medium">{selectedModel.specs.pricing}</span>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="params" className="space-y-4">
              <ParameterSlider
                label="Temperature"
                labelAr="الحرارة"
                description="Controls randomness in responses"
                descriptionAr="يتحكم في العشوائية في الردود"
                value={temperature}
                onValueChange={setTemperature}
                min={0}
                max={2}
                step={0.1}
                decimals={1}
                presets={temperaturePresets}
                isRTL={isRTL}
              />

              <ParameterSlider
                label="Max Tokens"
                labelAr="الحد الأقصى للرموز"
                description="Maximum length of the response"
                descriptionAr="الطول الأقصى للرد"
                value={maxTokens}
                onValueChange={setMaxTokens}
                min={256}
                max={4096}
                step={256}
                decimals={0}
                isRTL={isRTL}
              />

              <ParameterSlider
                label="Top P"
                labelAr="Top P"
                description="Nucleus sampling threshold"
                descriptionAr="عتبة أخذ العينات النووية"
                value={topP}
                onValueChange={setTopP}
                min={0}
                max={1}
                step={0.05}
                decimals={2}
                isRTL={isRTL}
              />
            </TabsContent>

            <TabsContent value="usage" className="space-y-4">
              <TokenCounter
                inputTokens={totalInputTokens}
                outputTokens={totalOutputTokens}
                maxTokens={selectedModel.specs.contextLength}
                inputCostPer1K={0.03}
                outputCostPer1K={0.06}
                showCost
                showBreakdown
                isRTL={isRTL}
              />

              <Card className="p-4">
                <h3 className="font-medium text-sm mb-3">
                  {isRTL ? 'إحصائيات الجلسة' : 'Session Statistics'}
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {isRTL ? 'الرسائل:' : 'Messages:'}
                    </span>
                    <span className="font-medium">{messages.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {isRTL ? 'النموذج:' : 'Model:'}
                    </span>
                    <span className="font-medium">{selectedModel.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {isRTL ? 'المعاملات:' : 'Parameters:'}
                    </span>
                    <span className="font-medium">T={temperature}</span>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </aside>
      )}
    </div>
  )
}
