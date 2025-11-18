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
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import {
  FileText,
  Sparkles,
  Upload,
  Trash2,
  BookOpen,
  Search,
  CheckCircle2,
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  sources?: DocumentSource[]
}

interface DocumentSource {
  documentId: string
  documentName: string
  section: string
  excerpt: string
  page?: number
}

interface Document {
  id: string
  name: string
  nameAr?: string
  size: string
  pages: number
  sections: string[]
  isActive: boolean
}

// Sample documents
const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'React Best Practices 2024',
    nameAr: 'أفضل ممارسات React 2024',
    size: '2.4 MB',
    pages: 45,
    sections: ['Introduction', 'Hooks', 'Performance', 'Testing'],
    isActive: true,
  },
  {
    id: '2',
    name: 'TypeScript Handbook',
    nameAr: 'دليل TypeScript',
    size: '1.8 MB',
    pages: 32,
    sections: ['Basics', 'Types', 'Interfaces', 'Generics'],
    isActive: false,
  },
  {
    id: '3',
    name: 'Web Accessibility Guide',
    nameAr: 'دليل إمكانية الوصول للويب',
    size: '3.1 MB',
    pages: 58,
    sections: ['ARIA', 'Keyboard Navigation', 'Screen Readers'],
    isActive: false,
  },
]

// Mock Q&A responses
const qaResponses = {
  en: [
    {
      content: "Based on the document, here's what I found:\n\nReact Hooks are functions that let you use state and other React features in functional components. The key hooks mentioned are:\n\n1. **useState**: For managing component state\n2. **useEffect**: For side effects and lifecycle events\n3. **useContext**: For consuming context values\n4. **useMemo**: For memoizing expensive calculations\n\nThe document emphasizes using hooks for cleaner, more maintainable code.",
      sources: [
        {
          documentId: '1',
          documentName: 'React Best Practices 2024',
          section: 'Hooks',
          excerpt: 'Hooks are functions that let you "hook into" React state and lifecycle features from function components...',
          page: 12,
        },
      ],
    },
    {
      content: "According to the documentation:\n\nTypeScript interfaces define the structure of objects. They provide type checking and autocomplete in your IDE. Key points:\n\n- Interfaces can extend other interfaces\n- They can describe function types\n- They support optional properties with ?\n- They can be implemented by classes\n\nInterfaces are a powerful way to ensure type safety in your applications.",
      sources: [
        {
          documentId: '2',
          documentName: 'TypeScript Handbook',
          section: 'Interfaces',
          excerpt: 'One of TypeScript\'s core principles is that type checking focuses on the shape that values have...',
          page: 18,
        },
      ],
    },
    {
      content: "The document provides comprehensive guidance:\n\nARIA (Accessible Rich Internet Applications) attributes help make web content accessible. Important ARIA roles include:\n\n- role=\"button\" for clickable elements\n- aria-label for descriptive labels\n- aria-hidden for decorative elements\n- aria-live for dynamic content updates\n\nProper ARIA usage significantly improves accessibility for screen reader users.",
      sources: [
        {
          documentId: '3',
          documentName: 'Web Accessibility Guide',
          section: 'ARIA',
          excerpt: 'ARIA is a set of attributes that define ways to make web content more accessible to people with disabilities...',
          page: 8,
        },
      ],
    },
  ],
  ar: [
    {
      content: "بناءً على المستند، إليك ما وجدته:\n\nReact Hooks هي وظائف تتيح لك استخدام الحالة وميزات React الأخرى في المكونات الوظيفية. الخطافات الرئيسية المذكورة هي:\n\n1. **useState**: لإدارة حالة المكون\n2. **useEffect**: للتأثيرات الجانبية وأحداث دورة الحياة\n3. **useContext**: لاستهلاك قيم السياق\n4. **useMemo**: لحفظ الحسابات المكلفة\n\nيؤكد المستند على استخدام الخطافات للحصول على كود أنظف وأكثر قابلية للصيانة.",
      sources: [
        {
          documentId: '1',
          documentName: 'أفضل ممارسات React 2024',
          section: 'الخطافات',
          excerpt: 'الخطافات هي وظائف تتيح لك "الارتباط" بحالة React وميزات دورة الحياة من مكونات الوظيفة...',
          page: 12,
        },
      ],
    },
    {
      content: "وفقاً للوثائق:\n\nواجهات TypeScript تحدد بنية الكائنات. توفر فحص النوع والإكمال التلقائي في IDE الخاص بك. النقاط الرئيسية:\n\n- يمكن للواجهات توسيع واجهات أخرى\n- يمكنها وصف أنواع الوظائف\n- تدعم الخصائص الاختيارية مع ?\n- يمكن تنفيذها بواسطة الفئات\n\nالواجهات هي طريقة قوية لضمان سلامة النوع في تطبيقاتك.",
      sources: [
        {
          documentId: '2',
          documentName: 'دليل TypeScript',
          section: 'الواجهات',
          excerpt: 'أحد المبادئ الأساسية لـ TypeScript هو أن فحص النوع يركز على الشكل الذي تحتوي عليه القيم...',
          page: 18,
        },
      ],
    },
    {
      content: "يوفر المستند إرشادات شاملة:\n\nسمات ARIA (تطبيقات الإنترنت الغنية التي يمكن الوصول إليها) تساعد في جعل محتوى الويب متاحاً. تشمل أدوار ARIA المهمة:\n\n- role=\"button\" للعناصر القابلة للنقر\n- aria-label للتسميات الوصفية\n- aria-hidden للعناصر الزخرفية\n- aria-live لتحديثات المحتوى الديناميكي\n\nيؤدي الاستخدام الصحيح لـ ARIA إلى تحسين إمكانية الوصول بشكل كبير لمستخدمي قارئ الشاشة.",
      sources: [
        {
          documentId: '3',
          documentName: 'دليل إمكانية الوصول للويب',
          section: 'ARIA',
          excerpt: 'ARIA هي مجموعة من السمات التي تحدد طرقاً لجعل محتوى الويب أكثر سهولة للأشخاص ذوي الإعاقة...',
          page: 8,
        },
      ],
    },
  ],
}

export default function DocumentQAPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const isRTL = locale === 'ar'

  const [documents, setDocuments] = React.useState<Document[]>(sampleDocuments)
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: isRTL
        ? 'مرحباً! أنا مساعد تحليل المستندات. يمكنني الإجابة على أسئلتك حول المستندات المحملة. اسألني عن أي شيء!'
        : "Hello! I'm your Document Analysis Assistant. I can answer questions about your uploaded documents. Ask me anything!",
      timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ])
  const [isThinking, setIsThinking] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

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
    setIsThinking(true)

    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000))

    setIsThinking(false)

    const responses = isRTL ? qaResponses.ar : qaResponses.en
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: randomResponse.content,
      timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      sources: randomResponse.sources,
    }

    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleSelectDocument = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) => ({ ...doc, isActive: doc.id === id }))
    )
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'system',
        content: isRTL
          ? 'محادثة جديدة بدأت. كيف يمكنني مساعدتك في تحليل المستندات؟'
          : 'New conversation started. How can I help you analyze documents?',
        timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])
  }

  const suggestedQuestions = isRTL
    ? [
        'ما هي أفضل ممارسات React Hooks؟',
        'كيف أستخدم واجهات TypeScript؟',
        'ما هي سمات ARIA الأساسية؟',
        'كيف أحسن أداء React؟',
      ]
    : [
        'What are React Hooks best practices?',
        'How do I use TypeScript interfaces?',
        'What are essential ARIA attributes?',
        'How can I optimize React performance?',
      ]

  return (
    <div className="min-h-screen bg-background">
      <main id="main-content" className="h-screen flex">
        {/* Documents Sidebar */}
        <aside className="w-80 border-e bg-background p-4 space-y-4 overflow-y-auto hidden lg:block">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">
              {isRTL ? 'المستندات' : 'Documents'}
            </h2>
            <Button variant="outline" size="sm">
              <Upload className={cn('h-4 w-4', isRTL ? 'ms-1' : 'me-1')} />
              {isRTL ? 'رفع' : 'Upload'}
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-2">
              {documents.map((doc) => (
                <Card
                  key={doc.id}
                  className={cn(
                    'p-4 cursor-pointer transition-colors hover:bg-muted',
                    doc.isActive && 'border-primary bg-primary/5'
                  )}
                  onClick={() => handleSelectDocument(doc.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded shrink-0">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium text-sm truncate">
                          {isRTL ? (doc.nameAr || doc.name) : doc.name}
                        </h3>
                        {doc.isActive && (
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>
                          {doc.pages} {isRTL ? 'صفحة' : 'pages'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {doc.sections.slice(0, 2).map((section, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                        {doc.sections.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{doc.sections.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <Card className="p-4 bg-muted/50">
            <h3 className="font-medium text-sm mb-2">
              {isRTL ? 'الصيغ المدعومة' : 'Supported Formats'}
            </h3>
            <div className="flex flex-wrap gap-1">
              {['PDF', 'DOCX', 'TXT', 'MD'].map((format) => (
                <Badge key={format} variant="outline" className="text-xs">
                  {format}
                </Badge>
              ))}
            </div>
          </Card>
        </aside>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">
                    {isRTL ? 'أسئلة وأجوبة المستندات' : 'Document Q&A'}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {documents.find((d) => d.isActive)
                      ? isRTL
                        ? `${documents.find((d) => d.isActive)?.nameAr || documents.find((d) => d.isActive)?.name}`
                        : documents.find((d) => d.isActive)?.name
                      : isRTL
                      ? 'لم يتم تحديد مستند'
                      : 'No document selected'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleClearChat}>
                  <Trash2 className={cn('h-4 w-4', isRTL ? 'ms-2' : 'me-2')} />
                  {isRTL ? 'مسح' : 'Clear'}
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/examples">{t.nav.examples}</Link>
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
                      {t.nav.home}
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href="/examples" className="hover:text-foreground transition-colors">
                      {t.nav.examples}
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-foreground font-medium">
                    {isRTL ? 'أسئلة المستندات' : 'Document Q&A'}
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="container max-w-4xl py-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    <ChatMessage
                      role={message.role}
                      content={message.content}
                      timestamp={message.timestamp}
                      isRTL={isRTL}
                      showCopy={false}
                      showRegenerate={false}
                    />

                    {message.sources && message.sources.length > 0 && (
                      <Card className="p-4 bg-muted/50">
                        <div className="flex items-center gap-2 mb-3">
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {isRTL ? 'المصادر' : 'Sources'}
                          </span>
                        </div>
                        <div className="space-y-3">
                          {message.sources.map((source, idx) => (
                            <Card key={idx} className="p-3 bg-background">
                              <div className="flex items-start gap-3">
                                <FileText className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">
                                      {source.documentName}
                                    </span>
                                    {source.page && (
                                      <>
                                        <span className="text-muted-foreground">•</span>
                                        <Badge variant="secondary" className="text-xs">
                                          {isRTL ? `صفحة ${source.page}` : `Page ${source.page}`}
                                        </Badge>
                                      </>
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {source.section}
                                  </div>
                                  <p className="text-sm text-muted-foreground italic">
                                    &quot;{source.excerpt}&quot;
                                  </p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </Card>
                    )}

                    {message.role === 'assistant' && (
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
                    )}
                  </div>
                ))}

                {isThinking && (
                  <div className="flex items-center gap-3 p-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
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
            <div className="container max-w-4xl py-4 space-y-3">
              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground shrink-0">
                    {isRTL ? 'أسئلة مقترحة:' : 'Suggested:'}
                  </span>
                  {suggestedQuestions.map((question, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => handleSend(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              )}

              <PromptInput
                placeholder={isRTL ? undefined : 'Ask a question about the document...'}
                placeholderAr="اسأل سؤالاً عن المستند..."
                isRTL={isRTL}
                onSend={handleSend}
                isLoading={isThinking}
                showAttachment={false}
                showVoice={false}
              />

              <p className="text-xs text-muted-foreground text-center">
                {isRTL
                  ? 'هذا مثال توضيحي. الإجابات مولدة تلقائياً والمصادر وهمية.'
                  : 'This is a demo. Answers are generated automatically and sources are mock data.'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
