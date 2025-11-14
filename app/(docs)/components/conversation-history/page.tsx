'use client'

import * as React from 'react'
import Link from 'next/link'
import { ConversationHistory, type Conversation } from '@/components/ui/conversation-history'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const conversationHistoryProps: PropDefinition[] = [
  {
    name: 'conversations',
    type: 'Conversation[]',
    required: true,
    description: 'List of conversations',
  },
  {
    name: 'activeId',
    type: 'string',
    required: false,
    description: 'Currently active conversation ID',
  },
  {
    name: 'onSelect',
    type: '(id: string) => void',
    required: false,
    description: 'Callback when conversation is selected',
  },
  {
    name: 'onCreate',
    type: '() => void',
    required: false,
    description: 'Callback when new conversation is created',
  },
  {
    name: 'onRename',
    type: '(id: string, newTitle: string) => void',
    required: false,
    description: 'Callback when conversation is renamed',
  },
  {
    name: 'onDelete',
    type: '(id: string) => void',
    required: false,
    description: 'Callback when conversation is deleted',
  },
  {
    name: 'onShare',
    type: '(id: string) => void',
    required: false,
    description: 'Callback when conversation is shared',
  },
  {
    name: 'showSearch',
    type: 'boolean',
    default: 'true',
    required: false,
    description: 'Show search input',
  },
  {
    name: 'variant',
    type: "'default' | 'floating'",
    default: "'default'",
    required: false,
    description: 'Visual style variant',
  },
  {
    name: 'size',
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    required: false,
    description: 'Width size of the sidebar',
  },
  {
    name: 'isRTL',
    type: 'boolean',
    default: 'false',
    required: false,
    description: 'Whether text direction is RTL',
  },
  {
    name: 'title',
    type: 'string',
    required: false,
    description: 'Header title',
  },
  {
    name: 'titleAr',
    type: 'string',
    required: false,
    description: 'Header title in Arabic',
  },
]

const conversationInterface = `interface Conversation {
  id: string
  title: string
  titleAr?: string
  preview?: string
  previewAr?: string
  timestamp: Date
  messageCount?: number
  isActive?: boolean
}`

const installCode = `npm install @noorui/components`

const basicUsageCode = `import { ConversationHistory, type Conversation } from '@/components/ui/conversation-history'

const conversations: Conversation[] = [
  {
    id: '1',
    title: 'Project Planning',
    preview: "Let's discuss the roadmap...",
    timestamp: new Date(),
    messageCount: 15,
  },
  // ... more conversations
]

<ConversationHistory
  conversations={conversations}
  activeId="1"
  onSelect={(id) => console.log('Selected:', id)}
  onCreate={() => console.log('Create new')}
/>`

const fullFeaturedCode = `<ConversationHistory
  conversations={conversations}
  activeId={activeId}
  onSelect={handleSelect}
  onCreate={handleCreate}
  onRename={handleRename}
  onDelete={handleDelete}
  onShare={handleShare}
  showSearch={true}
  title="My Chats"
/>`

const sizesCode = `// Small sidebar
<ConversationHistory
  conversations={conversations}
  size="sm"
/>

// Large sidebar
<ConversationHistory
  conversations={conversations}
  size="lg"
/>`

const floatingCode = `<ConversationHistory
  conversations={conversations}
  variant="floating"
  size="sm"
/>`

const rtlCode = `<ConversationHistory
  conversations={conversations}
  activeId="1"
  isRTL={true}
  title="Conversations"
  titleAr="المحادثات"
  onSelect={(id) => console.log('Selected:', id)}
  onCreate={() => console.log('Create new')}
/>`

const sampleConversations: Conversation[] = [
  {
    id: '1',
    title: 'Project Planning Discussion',
    titleAr: 'مناقشة تخطيط المشروع',
    preview: "Let's discuss the roadmap for Q4...",
    previewAr: 'لنناقش خارطة الطريق للربع الرابع...',
    timestamp: new Date(),
    messageCount: 24,
  },
  {
    id: '2',
    title: 'Code Review Feedback',
    titleAr: 'ملاحظات مراجعة الكود',
    preview: 'The PR looks good, just a few comments...',
    previewAr: 'طلب السحب يبدو جيداً، بضع ملاحظات فقط...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messageCount: 12,
  },
  {
    id: '3',
    title: 'Design System Updates',
    titleAr: 'تحديثات نظام التصميم',
    preview: 'We should update the color palette...',
    previewAr: 'يجب تحديث لوحة الألوان...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messageCount: 8,
  },
  {
    id: '4',
    title: 'API Documentation',
    titleAr: 'توثيق واجهة برمجة التطبيقات',
    preview: 'Help me write docs for the new endpoints...',
    previewAr: 'ساعدني في كتابة الوثائق للنقاط الجديدة...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    messageCount: 15,
  },
  {
    id: '5',
    title: 'Bug Investigation',
    titleAr: 'التحقيق في خلل',
    preview: "There's an issue with the authentication flow...",
    previewAr: 'هناك مشكلة في تدفق المصادقة...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    messageCount: 32,
  },
]

export default function ConversationHistoryPage() {
  const [activeId, setActiveId] = React.useState('1')
  const [conversations, setConversations] = React.useState(sampleConversations)

  const handleCreate = () => {
    const newConv: Conversation = {
      id: String(conversations.length + 1),
      title: 'New Conversation',
      titleAr: 'محادثة جديدة',
      preview: '',
      previewAr: '',
      timestamp: new Date(),
      messageCount: 0,
    }
    setConversations([newConv, ...conversations])
    setActiveId(newConv.id)
  }

  const handleDelete = (id: string) => {
    setConversations(conversations.filter((c) => c.id !== id))
    if (activeId === id && conversations.length > 0) {
      setActiveId(conversations[0].id)
    }
  }

  const handleRename = (id: string, newTitle: string) => {
    setConversations(
      conversations.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    )
  }

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                Components
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Conversation History</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Conversation History</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Sidebar component for managing multiple conversation threads with search and delete.
            Organizes conversations by time period (today, yesterday, last 7 days, etc.) with
            full CRUD operations support.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <div className="flex h-[600px] border rounded-lg overflow-hidden">
                <ConversationHistory
                  conversations={conversations}
                  activeId={activeId}
                  onSelect={setActiveId}
                  onCreate={handleCreate}
                  onRename={handleRename}
                  onDelete={handleDelete}
                  onShare={(id) => alert(`Share conversation ${id}`)}
                  title="Conversations"
                />
                <div className="flex-1 flex items-center justify-center bg-muted/10">
                  <div className="text-center space-y-2">
                    <p className="text-lg font-medium">
                      Active Conversation: {conversations.find((c) => c.id === activeId)?.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Chat interface would go here
                    </p>
                  </div>
                </div>
              </div>
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Installation</h2>
          <CodeBlock code={installCode} language="bash" title="Terminal" />
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* Full Featured */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Full Featured</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="h-[500px] border rounded-lg overflow-hidden">
                    <div className="flex h-full">
                      <ConversationHistory
                        conversations={conversations}
                        activeId={activeId}
                        onSelect={setActiveId}
                        onCreate={handleCreate}
                        onRename={handleRename}
                        onDelete={handleDelete}
                        onShare={(id) => alert(`Share: ${id}`)}
                        showSearch
                        title="My Conversations"
                      />
                      <div className="flex-1 flex items-center justify-center bg-muted/10">
                        <p className="text-sm text-muted-foreground">Chat content</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={fullFeaturedCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Time-based Grouping */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Time-based Grouping</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Conversations are automatically grouped by time:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Today</li>
                      <li>Yesterday</li>
                      <li>Last 7 days</li>
                      <li>Last 30 days</li>
                      <li>Older</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Different Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Small (256px)</p>
                      <div className="h-[300px] border rounded-lg overflow-hidden">
                        <ConversationHistory
                          conversations={conversations.slice(0, 3)}
                          size="sm"
                          activeId="1"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Large (384px)</p>
                      <div className="h-[300px] border rounded-lg overflow-hidden">
                        <ConversationHistory
                          conversations={conversations.slice(0, 3)}
                          size="lg"
                          activeId="1"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={sizesCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Floating Variant */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Floating Variant</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Use floating variant for overlays or modals:
                    </p>
                    <div className="h-[400px] bg-muted/10 rounded-lg p-4 relative">
                      <div className="absolute top-4 left-4">
                        <ConversationHistory
                          conversations={conversations.slice(0, 3)}
                          variant="floating"
                          size="sm"
                          activeId="1"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={floatingCode} language="tsx" collapsible />
              </div>
            </div>

            {/* With Search */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Search</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Search filters conversations by title and preview text:
                    </p>
                    <div className="h-[400px] border rounded-lg overflow-hidden">
                      <ConversationHistory
                        conversations={conversations}
                        activeId={activeId}
                        showSearch
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Conversation Interface */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Conversation Interface</h2>
          <CodeBlock code={conversationInterface} language="typescript" title="TypeScript" />
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={conversationHistoryProps} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  All interactive elements have proper labels. Action menu items include icon
                  descriptions. Empty states provide helpful context.
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Tab</kbd>: Navigate through conversations and buttons</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>: Select conversation or activate button</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">↑</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-muted">↓</kbd>: Navigate list (in scroll area)</li>
                  <li><kbd className="px-1.5 py-0.5 rounded bg-muted">/</kbd>: Focus search (when available)</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Visual Feedback</h3>
                <p className="text-muted-foreground">
                  Active conversation is highlighted. Hover states on conversations. Action menu
                  appears on hover for better discoverability.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RTL Considerations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">RTL Considerations</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground">
                The sidebar fully supports RTL layouts. Icons, timestamps, and menu positions
                all adapt correctly. All text supports Arabic via <code className="bg-muted px-1 rounded">*Ar</code> props.
              </p>
              <CodeBlock code={rtlCode} language="tsx" />
              <div className="grid gap-4 md:grid-cols-2 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">LTR (English)</h4>
                  <div dir="ltr" className="h-[300px] border rounded-lg overflow-hidden">
                    <ConversationHistory
                      conversations={conversations.slice(0, 3)}
                      size="sm"
                      activeId="1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">RTL (العربية)</h4>
                  <div dir="rtl" className="h-[300px] border rounded-lg overflow-hidden">
                    <ConversationHistory
                      conversations={conversations.slice(0, 3)}
                      size="sm"
                      activeId="1"
                      isRTL
                      titleAr="المحادثات"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Related */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Related Components</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <Link href="/components/chat-message" className="font-medium hover:underline">
                  Chat Message
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Display messages within conversations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/prompt-input" className="font-medium hover:underline">
                  Prompt Input
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Input for sending messages in conversations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Link href="/components/model-selector" className="font-medium hover:underline">
                  Model Selector
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  Select AI model per conversation
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
