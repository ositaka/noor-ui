'use client'

import * as React from 'react'
import Link from 'next/link'
import { useDirection } from '@/components/providers/direction-provider'
import { ChatMessage } from '@/components/ui/chat-message'
import { PromptInput } from '@/components/ui/prompt-input'
import { ThinkingIndicator } from '@/components/ui/thinking-indicator'
import { MessageActions } from '@/components/ui/message-actions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Code2, Sparkles, FileCode, Bug, Lightbulb, Trash2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  codeBlock?: {
    language: string
    code: string
  }
}

// Sample code snippets
const sampleCode = {
  react: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
  }, [userId])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  return (
    <div className="profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}`,
  python: `def calculate_fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]

    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])

    return fib`,
  typescript: `interface Product {
  id: string
  name: string
  price: number
  inStock: boolean
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products')
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}`,
}

// Mock responses for code assistance
const codeResponses = {
  en: {
    explain: "I'll analyze this code for you. This code shows a React component that fetches user data from an API. Here are the key points:\n\n1. **State Management**: Uses useState hooks for user data and loading state\n2. **Side Effects**: useEffect hook handles the API call when userId changes\n3. **Error Handling**: Shows appropriate messages for loading and missing user\n4. **Component Structure**: Clean separation of concerns with conditional rendering\n\nThe code follows React best practices and provides good user feedback during data fetching.",

    improve: "Here's an improved version of your code with better error handling, loading states, and TypeScript types:\n\nThe improvements include:\n- Added proper error state handling\n- Included loading and error UI components\n- Better separation of concerns\n- TypeScript types for type safety\n- Cleanup function in useEffect to prevent memory leaks",

    fix: "I found a potential issue in your code. The useEffect is missing error handling for the fetch call. Here's the corrected version:\n\nKey fixes:\n- Added try-catch block for error handling\n- Added error state to display error messages\n- Improved loading state management\n- Added cleanup to prevent state updates on unmounted components",

    generate: "Here's a complete implementation based on your requirements:\n\nThis code includes:\n- Full TypeScript typing\n- Comprehensive error handling\n- Loading states\n- Accessibility features\n- Responsive design\n- Clean component structure",
  },
  ar: {
    explain: "سأقوم بتحليل هذا الكود لك. يعرض هذا الكود مكون React الذي يجلب بيانات المستخدم من API. إليك النقاط الرئيسية:\n\n1. **إدارة الحالة**: يستخدم useState hooks لبيانات المستخدم وحالة التحميل\n2. **التأثيرات الجانبية**: يتعامل useEffect hook مع استدعاء API عند تغيير userId\n3. **معالجة الأخطاء**: يعرض رسائل مناسبة للتحميل والمستخدم المفقود\n4. **هيكل المكون**: فصل نظيف للمسؤوليات مع العرض الشرطي\n\nيتبع الكود أفضل ممارسات React ويوفر تعليقات جيدة للمستخدم أثناء جلب البيانات.",

    improve: "إليك نسخة محسنة من الكود الخاص بك مع معالجة أفضل للأخطاء وحالات التحميل وأنواع TypeScript:\n\nتشمل التحسينات:\n- إضافة معالجة صحيحة لحالة الخطأ\n- تضمين مكونات واجهة المستخدم للتحميل والخطأ\n- فصل أفضل للمسؤوليات\n- أنواع TypeScript لضمان سلامة الأنواع\n- وظيفة تنظيف في useEffect لمنع تسرب الذاكرة",

    fix: "وجدت مشكلة محتملة في الكود الخاص بك. يفتقد useEffect معالجة الأخطاء لاستدعاء fetch. إليك النسخة المصححة:\n\nالإصلاحات الرئيسية:\n- إضافة كتلة try-catch لمعالجة الأخطاء\n- إضافة حالة خطأ لعرض رسائل الخطأ\n- تحسين إدارة حالة التحميل\n- إضافة التنظيف لمنع تحديثات الحالة على المكونات غير المثبتة",

    generate: "إليك تطبيق كامل بناءً على متطلباتك:\n\nيتضمن هذا الكود:\n- كتابة TypeScript كاملة\n- معالجة شاملة للأخطاء\n- حالات التحميل\n- ميزات إمكانية الوصول\n- تصميم متجاوب\n- هيكل مكون نظيف",
  },
}

export default function CodeAssistantPage() {
  const { locale } = useDirection()
  const isRTL = locale === 'ar'

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: isRTL
        ? 'مرحباً! أنا مساعد الأكواد الذكي. يمكنني مساعدتك في شرح الأكواد، وإيجاد الأخطاء، وتحسين الأكواد، وتوليد أكواد جديدة. جرب أحد الأمثلة أدناه أو الصق الكود الخاص بك.'
        : "Hello! I'm your AI Code Assistant. I can help you explain code, find bugs, improve code, and generate new code. Try one of the examples below or paste your own code.",
      timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ])
  const [isThinking, setIsThinking] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'explain' | 'improve' | 'fix' | 'generate'>('explain')
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

    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

    setIsThinking(false)

    const responses = isRTL ? codeResponses.ar : codeResponses.en
    const response = responses[activeTab]

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      codeBlock: activeTab !== 'explain' ? {
        language: 'typescript',
        code: sampleCode.typescript,
      } : undefined,
    }

    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleLoadExample = (language: keyof typeof sampleCode, action: 'explain' | 'improve' | 'fix') => {
    setActiveTab(action)
    const code = sampleCode[language]
    const actionText = isRTL
      ? action === 'explain'
        ? 'اشرح هذا الكود'
        : action === 'improve'
        ? 'حسّن هذا الكود'
        : 'ابحث عن الأخطاء في هذا الكود'
      : action === 'explain'
      ? 'Explain this code'
      : action === 'improve'
      ? 'Improve this code'
      : 'Find bugs in this code'

    handleSend(`${actionText}:\n\n\`\`\`${language}\n${code}\n\`\`\``)
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'system',
        content: isRTL
          ? 'محادثة جديدة بدأت. كيف يمكنني مساعدتك في البرمجة اليوم؟'
          : 'New conversation started. How can I help you with coding today?',
        timestamp: new Date().toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ])
  }

  return (
    <div className="min-h-screen bg-background">
      <main id="main-content" className="h-screen flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">
                    {isRTL ? 'مساعد الأكواد الذكي' : 'AI Code Assistant'}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    {isRTL ? 'شرح • تحسين • إصلاح • توليد' : 'Explain • Improve • Fix • Generate'}
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
                    {isRTL ? 'مساعد الأكواد' : 'Code Assistant'}
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="container max-w-5xl py-6">
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

                    {message.codeBlock && (
                      <Card className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="font-mono text-xs">
                            {message.codeBlock.language}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <FileCode className={cn('h-4 w-4', isRTL ? 'ms-1' : 'me-1')} />
                            {isRTL ? 'نسخ' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{message.codeBlock.code}</code>
                        </pre>
                      </Card>
                    )}

                    {message.role === 'assistant' && (
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
                    )}
                  </div>
                ))}

                {isThinking && (
                  <div className="flex items-center gap-3 p-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Code2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <ThinkingIndicator
                      variant="typing"
                      message={isRTL ? 'جاري تحليل الكود' : 'Analyzing code'}
                      messageAr="جاري تحليل الكود"
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
            <div className="container max-w-5xl py-4 space-y-3">
              {/* Action Tabs */}
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="explain" className="text-xs">
                    <Sparkles className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                    {isRTL ? 'شرح' : 'Explain'}
                  </TabsTrigger>
                  <TabsTrigger value="improve" className="text-xs">
                    <Lightbulb className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                    {isRTL ? 'تحسين' : 'Improve'}
                  </TabsTrigger>
                  <TabsTrigger value="fix" className="text-xs">
                    <Bug className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                    {isRTL ? 'إصلاح' : 'Fix'}
                  </TabsTrigger>
                  <TabsTrigger value="generate" className="text-xs">
                    <Code2 className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                    {isRTL ? 'توليد' : 'Generate'}
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <PromptInput
                placeholder={isRTL ? undefined : 'Paste your code or describe what you need...'}
                placeholderAr="الصق الكود الخاص بك أو صف ما تحتاجه..."
                isRTL={isRTL}
                onSend={handleSend}
                isLoading={isThinking}
                showAttachment={false}
                showVoice={false}
              />

              <p className="text-xs text-muted-foreground text-center">
                {isRTL
                  ? 'هذا مثال توضيحي. الردود مولدة تلقائياً.'
                  : 'This is a demo. Responses are generated automatically.'}
              </p>
            </div>
          </div>
        </div>

        {/* Examples Sidebar */}
        <aside className="w-80 border-s bg-background p-4 space-y-4 overflow-y-auto hidden lg:block">
          <div>
            <h2 className="font-semibold text-lg mb-3">
              {isRTL ? 'أمثلة سريعة' : 'Quick Examples'}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {isRTL
                ? 'انقر على أي مثال لتحميله في المحادثة'
                : 'Click any example to load it into the chat'}
            </p>
          </div>

          <div className="space-y-3">
            <Card className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">React</Badge>
                <span className="text-sm font-medium">
                  {isRTL ? 'جلب المستخدم' : 'User Fetching'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLoadExample('react', 'explain')}
                  className="text-xs"
                >
                  <Sparkles className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                  {isRTL ? 'شرح' : 'Explain'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLoadExample('react', 'improve')}
                  className="text-xs"
                >
                  <Lightbulb className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                  {isRTL ? 'تحسين' : 'Improve'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLoadExample('react', 'fix')}
                  className="text-xs"
                >
                  <Bug className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                  {isRTL ? 'إصلاح' : 'Fix'}
                </Button>
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">Python</Badge>
                <span className="text-sm font-medium">
                  {isRTL ? 'فيبوناتشي' : 'Fibonacci'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLoadExample('python', 'explain')}
                  className="text-xs"
                >
                  <Sparkles className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                  {isRTL ? 'شرح' : 'Explain'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLoadExample('python', 'improve')}
                  className="text-xs"
                >
                  <Lightbulb className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                  {isRTL ? 'تحسين' : 'Improve'}
                </Button>
              </div>
            </Card>

            <Card className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-xs">TypeScript</Badge>
                <span className="text-sm font-medium">
                  {isRTL ? 'جلب المنتجات' : 'Product API'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLoadExample('typescript', 'explain')}
                  className="text-xs"
                >
                  <Sparkles className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                  {isRTL ? 'شرح' : 'Explain'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLoadExample('typescript', 'fix')}
                  className="text-xs"
                >
                  <Bug className={cn('h-3 w-3', isRTL ? 'ms-1' : 'me-1')} />
                  {isRTL ? 'إصلاح' : 'Fix'}
                </Button>
              </div>
            </Card>
          </div>

          <Card className="p-4 bg-muted/50">
            <h3 className="font-medium text-sm mb-2">
              {isRTL ? 'نصائح' : 'Tips'}
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>{isRTL ? '• الصق الكود الخاص بك مباشرة' : '• Paste your code directly'}</li>
              <li>{isRTL ? '• استخدم علامات الكود ```' : '• Use code blocks with ```'}</li>
              <li>{isRTL ? '• حدد اللغة للإبراز' : '• Specify language for highlighting'}</li>
              <li>{isRTL ? '• اسأل أسئلة محددة' : '• Ask specific questions'}</li>
            </ul>
          </Card>
        </aside>
      </main>
    </div>
  )
}
