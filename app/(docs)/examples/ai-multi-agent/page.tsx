'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import { ChatMessage } from '@/components/ui/chat-message'
import { PromptInput } from '@/components/ui/prompt-input'
import { ThinkingIndicator } from '@/components/ui/thinking-indicator'
import { MessageActions } from '@/components/ui/message-actions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import {
  Users,
  Sparkles,
  Code2,
  Pencil,
  BarChart3,
  Trash2,
  Bot,
  MessageSquare,
} from 'lucide-react'

interface Agent {
  id: string
  name: string
  nameAr: string
  role: string
  roleAr: string
  specialty: string
  specialtyAr: string
  icon: 'code' | 'pencil' | 'chart' | 'sparkles'
  color: string
  personality: string
  personalityAr: string
}

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  agentId?: string
}

// Agent definitions
const agents: Agent[] = [
  {
    id: 'code-expert',
    name: 'Code Expert',
    nameAr: 'خبير الأكواد',
    role: 'Technical Specialist',
    roleAr: 'متخصص تقني',
    specialty: 'Programming, Architecture, Best Practices',
    specialtyAr: 'البرمجة، الهندسة المعمارية، أفضل الممارسات',
    icon: 'code',
    color: 'text-blue-500 bg-blue-500/10',
    personality: 'Technical and precise, focuses on code quality',
    personalityAr: 'تقني ودقيق، يركز على جودة الكود',
  },
  {
    id: 'creative-writer',
    name: 'Creative Writer',
    nameAr: 'الكاتب المبدع',
    role: 'Content Creator',
    roleAr: 'منشئ المحتوى',
    specialty: 'Writing, Storytelling, Communication',
    specialtyAr: 'الكتابة، سرد القصص، التواصل',
    icon: 'pencil',
    color: 'text-purple-500 bg-purple-500/10',
    personality: 'Creative and expressive, uses vivid language',
    personalityAr: 'مبدع ومعبر، يستخدم لغة حية',
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    nameAr: 'محلل البيانات',
    role: 'Analytics Expert',
    roleAr: 'خبير التحليلات',
    specialty: 'Data Analysis, Statistics, Insights',
    specialtyAr: 'تحليل البيانات، الإحصائيات، الرؤى',
    icon: 'chart',
    color: 'text-green-500 bg-green-500/10',
    personality: 'Analytical and data-driven, provides metrics',
    personalityAr: 'تحليلي ومعتمد على البيانات، يقدم المقاييس',
  },
  {
    id: 'general-assistant',
    name: 'General Assistant',
    nameAr: 'المساعد العام',
    role: 'Coordinator',
    roleAr: 'المنسق',
    specialty: 'General Knowledge, Coordination',
    specialtyAr: 'المعرفة العامة، التنسيق',
    icon: 'sparkles',
    color: 'text-amber-500 bg-amber-500/10',
    personality: 'Helpful and balanced, coordinates between agents',
    personalityAr: 'مفيد ومتوازن، ينسق بين الوكلاء',
  },
]

// Mock agent responses
const agentResponses = {
  'code-expert': {
    en: "From a technical perspective, I recommend using TypeScript for type safety and implementing proper error boundaries. Here's what you should focus on:\n\n1. **Type System**: Define clear interfaces\n2. **Error Handling**: Implement try-catch blocks\n3. **Performance**: Use React.memo for optimization\n4. **Testing**: Write unit tests with Jest\n\nLet me know if you need specific code examples!",
    ar: "من منظور تقني، أوصي باستخدام TypeScript لسلامة الأنواع وتنفيذ حدود الأخطاء المناسبة. إليك ما يجب التركيز عليه:\n\n1. **نظام الأنواع**: حدد واجهات واضحة\n2. **معالجة الأخطاء**: نفذ كتل try-catch\n3. **الأداء**: استخدم React.memo للتحسين\n4. **الاختبار**: اكتب اختبارات الوحدة مع Jest\n\nأخبرني إذا كنت بحاجة إلى أمثلة كود محددة!",
  },
  'creative-writer': {
    en: "What a fascinating topic! Let me paint a picture for you...\n\nImagine your application as a living, breathing entity. Each component is like a character in a story, with its own purpose and personality. The user's journey through your app should feel like an adventure - intuitive, engaging, and memorable.\n\nConsider crafting error messages that are friendly and helpful, like a guide showing you the way. Your UI should tell a story that users want to be part of!",
    ar: "يا له من موضوع رائع! دعني أرسم لك صورة...\n\nتخيل تطبيقك ككيان حي يتنفس. كل مكون يشبه شخصية في قصة، مع غرضه وشخصيته الخاصة. يجب أن تشعر رحلة المستخدم عبر تطبيقك كمغامرة - بديهية، جذابة، ولا تُنسى.\n\nفكر في صياغة رسائل خطأ ودية ومفيدة، مثل دليل يوضح لك الطريق. يجب أن تحكي واجهة المستخدم الخاصة بك قصة يريد المستخدمون أن يكونوا جزءاً منها!",
  },
  'data-analyst': {
    en: "Let's look at this from a data perspective:\n\n**Key Metrics to Track:**\n- User engagement rate: 68% average\n- Performance score: 85/100\n- Error rate: < 2% acceptable\n- Load time: Target < 3 seconds\n\nBased on the data, I recommend focusing on:\n1. Reducing bundle size by 30%\n2. Implementing lazy loading\n3. Optimizing database queries\n\nThese changes could improve user retention by 15-20%.",
    ar: "دعنا ننظر إلى هذا من منظور البيانات:\n\n**المقاييس الرئيسية للتتبع:**\n- معدل مشاركة المستخدم: 68٪ متوسط\n- نقاط الأداء: 85/100\n- معدل الخطأ: < 2٪ مقبول\n- وقت التحميل: الهدف < 3 ثوان\n\nبناءً على البيانات، أوصي بالتركيز على:\n1. تقليل حجم الحزمة بنسبة 30٪\n2. تنفيذ التحميل الكسول\n3. تحسين استعلامات قاعدة البيانات\n\nيمكن أن تؤدي هذه التغييرات إلى تحسين الاحتفاظ بالمستخدمين بنسبة 15-20٪.",
  },
  'general-assistant': {
    en: "Great question! Let me bring together insights from our team:\n\n**Code Expert** suggests focusing on TypeScript and testing.\n**Creative Writer** emphasizes user experience and storytelling.\n**Data Analyst** provides metrics showing performance opportunities.\n\nMy recommendation: Start with the technical foundation (TypeScript, error handling), then enhance the UX based on data insights. Would you like any of our specialists to dive deeper into a specific area?",
    ar: "سؤال رائع! دعني أجمع الرؤى من فريقنا:\n\n**خبير الكود** يقترح التركيز على TypeScript والاختبار.\n**الكاتب المبدع** يؤكد على تجربة المستخدم وسرد القصص.\n**محلل البيانات** يقدم مقاييس تظهر فرص الأداء.\n\nتوصيتي: ابدأ بالأساس التقني (TypeScript، معالجة الأخطاء)، ثم حسّن تجربة المستخدم بناءً على رؤى البيانات. هل تريد من أي من المتخصصين لدينا التعمق في مجال معين؟",
  },
}

export default function MultiAgentChatPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: isRTL
        ? 'مرحباً! أنا منسق فريقنا من وكلاء الذكاء الاصطناعي المتخصصين. يمكنك التحدث مع أي وكيل أو السماح لنا بالتعاون في الإجابة. كل وكيل لديه خبرة فريدة!'
        : "Hello! I'm the coordinator for our team of specialized AI agents. You can talk to any agent or let us collaborate on answers. Each agent has unique expertise!",
      timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      agentId: 'general-assistant',
    },
  ])
  const [isThinking, setIsThinking] = React.useState(false)
  const [activeAgents, setActiveAgents] = React.useState<string[]>(['general-assistant'])
  const [thinkingAgentId, setThinkingAgentId] = React.useState<string | null>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  const getAgentIcon = (iconType: string) => {
    switch (iconType) {
      case 'code':
        return <Code2 className="h-4 w-4" />
      case 'pencil':
        return <Pencil className="h-4 w-4" />
      case 'chart':
        return <BarChart3 className="h-4 w-4" />
      case 'sparkles':
        return <Sparkles className="h-4 w-4" />
      default:
        return <Bot className="h-4 w-4" />
    }
  }

  const getAgentById = (id: string) => agents.find((a) => a.id === id)

  const handleSend = async (content: string) => {
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

    // Simulate multiple agents responding
    const respondingAgents = activeAgents.length > 0 ? activeAgents : ['general-assistant']

    for (const agentId of respondingAgents) {
      setIsThinking(true)
      setThinkingAgentId(agentId)

      await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

      setIsThinking(false)
      setThinkingAgentId(null)

      const agent = getAgentById(agentId)
      if (!agent) continue

      const responses = agentResponses[agentId as keyof typeof agentResponses]
      const response = isRTL ? responses.ar : responses.en

      const assistantMessage: Message = {
        id: `${Date.now()}-${agentId}`,
        role: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        agentId,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Small delay between agents
      if (respondingAgents.length > 1 && agentId !== respondingAgents[respondingAgents.length - 1]) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }
  }

  const toggleAgent = (agentId: string) => {
    setActiveAgents((prev) =>
      prev.includes(agentId)
        ? prev.filter((id) => id !== agentId)
        : [...prev, agentId]
    )
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'system',
        content: isRTL
          ? 'محادثة جديدة بدأت. اختر الوكلاء الذين تريد التحدث معهم!'
          : 'New conversation started. Choose which agents you want to talk to!',
        timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        agentId: 'general-assistant',
      },
    ])
  }

  return (
    <div className="min-h-screen bg-background">
      <main id="main-content" className="h-screen flex">
        {/* Agents Sidebar */}
        <aside className="w-80 border-e bg-background p-4 space-y-4 overflow-y-auto hidden lg:block">
          <div>
            <h2 className="font-semibold text-lg mb-1">
              {isRTL ? 'الوكلاء المتاحون' : 'Available Agents'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isRTL
                ? 'اختر الوكلاء الذين تريد التحدث معهم'
                : 'Select which agents to include in the conversation'}
            </p>
          </div>

          <div className="space-y-2">
            {agents.map((agent) => {
              const isActive = activeAgents.includes(agent.id)
              return (
                <Card
                  key={agent.id}
                  className={cn(
                    'p-4 cursor-pointer transition-all hover:shadow-md',
                    isActive && 'border-primary shadow-sm'
                  )}
                  onClick={() => toggleAgent(agent.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn('p-2 rounded shrink-0', agent.color)}>
                      {getAgentIcon(agent.icon)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-sm">
                          {isRTL ? agent.nameAr : agent.name}
                        </h3>
                        <Badge
                          variant={isActive ? 'default' : 'secondary'}
                          className="text-xs shrink-0"
                        >
                          {isActive
                            ? isRTL
                              ? 'نشط'
                              : 'Active'
                            : isRTL
                            ? 'غير نشط'
                            : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isRTL ? agent.roleAr : agent.role}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isRTL ? agent.specialtyAr : agent.specialty}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <Card className="p-4 bg-muted/50">
            <h3 className="font-medium text-sm mb-2">
              {isRTL ? 'كيفية الاستخدام' : 'How to Use'}
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>{isRTL ? '• انقر على الوكيل لتفعيله/إلغاء تفعيله' : '• Click agents to activate/deactivate'}</li>
              <li>{isRTL ? '• يمكن أن يكون عدة وكلاء نشطين' : '• Multiple agents can be active'}</li>
              <li>{isRTL ? '• الوكلاء النشطون سيردون على رسائلك' : '• Active agents will respond to your messages'}</li>
              <li>{isRTL ? '• كل وكيل لديه خبرة فريدة' : '• Each agent has unique expertise'}</li>
            </ul>
          </Card>
        </aside>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">
                    {isRTL ? 'محادثة متعددة الوكلاء' : 'Multi-Agent Chat'}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {activeAgents.length}{' '}
                    {isRTL
                      ? activeAgents.length === 1
                        ? 'وكيل نشط'
                        : 'وكلاء نشطين'
                      : activeAgents.length === 1
                      ? 'active agent'
                      : 'active agents'}
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
                    {isRTL ? 'وكلاء متعددون' : 'Multi-Agent'}
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="container max-w-4xl py-6">
              <div className="space-y-4">
                {messages.map((message) => {
                  const agent = message.agentId ? getAgentById(message.agentId) : null

                  return (
                    <div key={message.id} className="space-y-2">
                      {agent && message.role === 'assistant' && (
                        <div className="flex items-center gap-2 ms-14">
                          <div className={cn('p-1 rounded', agent.color)}>
                            {getAgentIcon(agent.icon)}
                          </div>
                          <span className="text-sm font-medium">
                            {isRTL ? agent.nameAr : agent.name}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {isRTL ? agent.roleAr : agent.role}
                          </Badge>
                        </div>
                      )}

                      <ChatMessage
                        role={message.role}
                        content={message.content}
                        timestamp={message.timestamp}
                        isRTL={isRTL}
                        showCopy={false}
                        showRegenerate={false}
                      />

                      {message.role === 'assistant' && (
                        <div className="ms-14">
                          <MessageActions
                            compact
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
                  )
                })}

                {isThinking && thinkingAgentId && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 ms-14">
                      {(() => {
                        const agent = getAgentById(thinkingAgentId)
                        if (!agent) return null
                        return (
                          <>
                            <div className={cn('p-1 rounded', agent.color)}>
                              {getAgentIcon(agent.icon)}
                            </div>
                            <span className="text-sm font-medium">
                              {isRTL ? agent.nameAr : agent.name}
                            </span>
                          </>
                        )
                      })()}
                    </div>
                    <div className="flex items-center gap-3 p-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <ThinkingIndicator
                        variant="typing"
                        message={isRTL ? 'جاري التفكير' : 'Thinking'}
                        messageAr="جاري التفكير"
                        isRTL={isRTL}
                      />
                    </div>
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
                placeholder={isRTL ? undefined : 'Ask your question to the active agents...'}
                placeholderAr="اطرح سؤالك على الوكلاء النشطين..."
                isRTL={isRTL}
                onSend={handleSend}
                isLoading={isThinking}
                showAttachment={false}
                showVoice={false}
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {isRTL
                  ? 'هذا مثال توضيحي. الوكلاء النشطون سيردون على رسائلك.'
                  : 'This is a demo. Active agents will respond to your messages.'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
