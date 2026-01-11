'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import {
  MousePointer2,
  Square,
  Type,
  Tag,
  Layers,
  CheckSquare,
  Menu,
  Home,
  AlertCircle,
  MessageSquare,
  Info,
  Loader2,
  ChevronRight,
  User,
  PanelLeft,
  ChevronsUpDown,
  Clock,
  Hash,
  Calculator,
  TableIcon,
  CalendarIcon,
  Inbox,
  BarChart3,
  Upload,
  FileEdit,
  Layout,
  UserCircle,
  Bell,
  GitBranch,
  Palette,
  Binary,
  Sidebar,
  LayoutGrid,
  Sparkles,
  Send,
  Settings,
  History,
  Sliders,
  Workflow,
  Box,
  Quote,
  ThumbsUp,
  Command,
  FileText,
  Lightbulb,
  Shield,
} from 'lucide-react'

const componentCategories = (t: typeof content.en | typeof content.ar) => [
  {
    name: t.components.categories.gcc,
    description: t.components.categories.gccDesc,
    components: [
      { name: 'Prayer Times', icon: Clock, href: '/components/prayer-times', status: 'ready' },
      { name: 'Hijri Date', icon: Clock, href: '/components/hijri-date', status: 'ready' },
      { name: 'Arabic Number', icon: Hash, href: '/components/arabic-number', status: 'ready' },
      { name: 'Zakat Calculator', icon: Calculator, href: '/components/zakat-calculator', status: 'ready' },
      { name: 'Calendar', icon: CalendarIcon, href: '/components/calendar', status: 'ready' },
    ],
  },
  {
    name: t.components.categories.core,
    description: t.components.categories.coreDesc,
    components: [
      { name: 'Button', icon: MousePointer2, href: '/components/button', status: 'ready' },
      { name: 'ButtonArrow', icon: ChevronRight, href: '/components/button-arrow', status: 'ready' },
      { name: 'Card', icon: Square, href: '/components/card', status: 'ready' },
      { name: 'FeatureCard', icon: Square, href: '/components/feature-card', status: 'ready' },
      { name: 'Input', icon: Type, href: '/components/input', status: 'ready' },
      { name: 'Label', icon: Tag, href: '/components/label', status: 'ready' },
      { name: 'Badge', icon: Tag, href: '/components/badge', status: 'ready' },
      { name: 'Separator', icon: Layers, href: '/components/separator', status: 'ready' },
      { name: 'Avatar', icon: User, href: '/components/avatar', status: 'ready' },
    ],
  },
  {
    name: t.components.categories.forms,
    description: t.components.categories.formsDesc,
    components: [
      { name: 'Form', icon: CheckSquare, href: '/components/form', status: 'ready' },
      { name: 'Checkbox', icon: CheckSquare, href: '/components/checkbox', status: 'ready' },
      { name: 'Radio Group', icon: CheckSquare, href: '/components/radio-group', status: 'ready' },
      { name: 'Select', icon: Menu, href: '/components/select', status: 'ready' },
      { name: 'Switch', icon: CheckSquare, href: '/components/switch', status: 'ready' },
      { name: 'Slider', icon: Sliders, href: '/components/slider', status: 'ready' },
      { name: 'Range Slider', icon: Sliders, href: '/components/range-slider', status: 'ready' },
      { name: 'Textarea', icon: Type, href: '/components/textarea', status: 'ready' },
    ],
  },
  {
    name: t.components.categories.dataDisplay,
    description: t.components.categories.dataDisplayDesc,
    components: [
      { name: 'Table', icon: Layers, href: '/components/table', status: 'ready' },
      { name: 'DataTable', icon: TableIcon, href: '/components/data-table', status: 'ready' },
      { name: 'Stats Card', icon: BarChart3, href: '/components/stats-card', status: 'ready' },
      { name: 'Listing Card', icon: LayoutGrid, href: '/components/listing-card', status: 'ready' },
      { name: 'Command', icon: Menu, href: '/components/command', status: 'ready' },
      { name: 'User Badge', icon: Shield, href: '/components/user-badge', status: 'ready' },
      { name: 'Content Renderer', icon: FileText, href: '/components/content-renderer', status: 'ready' },
      { name: 'Blockquote', icon: Quote, href: '/components/blockquote', status: 'ready' },
      { name: 'Pull Quote', icon: Quote, href: '/components/pull-quote', status: 'ready' },
    ],
  },
  {
    name: t.components.categories.feedback,
    description: t.components.categories.feedbackDesc,
    components: [
      { name: 'Alert', icon: AlertCircle, href: '/components/alert', status: 'ready' },
      { name: 'Callout', icon: Lightbulb, href: '/components/callout', status: 'ready' },
      { name: 'Toast', icon: MessageSquare, href: '/components/toast', status: 'ready' },
      { name: 'Dialog', icon: MessageSquare, href: '/components/dialog', status: 'ready' },
      { name: 'Tooltip', icon: Info, href: '/components/tooltip', status: 'ready' },
      { name: 'Progress', icon: Loader2, href: '/components/progress', status: 'ready' },
      { name: 'Skeleton', icon: Loader2, href: '/components/skeleton', status: 'ready' },
      { name: 'Empty State', icon: Inbox, href: '/components/empty-state', status: 'ready' },
    ],
  },
  {
    name: t.components.categories.navigation,
    description: t.components.categories.navigationDesc,
    components: [
      { name: 'Tabs', icon: Menu, href: '/components/tabs', status: 'ready' },
      { name: 'Breadcrumb', icon: Home, href: '/components/breadcrumb', status: 'ready' },
      { name: 'Pagination', icon: ChevronRight, href: '/components/pagination', status: 'ready' },
      { name: 'Dropdown Menu', icon: Menu, href: '/components/dropdown-menu', status: 'ready' },
      { name: 'Context Menu', icon: Menu, href: '/components/context-menu', status: 'ready' },
    ],
  },
  {
    name: t.components.categories.overlays,
    description: t.components.categories.overlaysDesc,
    components: [
      { name: 'Sheet', icon: PanelLeft, href: '/components/sheet', status: 'ready' },
      { name: 'Accordion', icon: ChevronsUpDown, href: '/components/accordion', status: 'ready' },
      { name: 'Collapsible', icon: ChevronsUpDown, href: '/components/collapsible', status: 'ready' },
      { name: 'Popover', icon: MessageSquare, href: '/components/popover', status: 'ready' },
    ],
  },
  {
    name: t.components.categories.advancedForms,
    description: t.components.categories.advancedFormsDesc,
    components: [
      { name: 'File Upload', icon: Upload, href: '/components/file-upload', status: 'ready' },
      { name: 'Rich Text Editor', icon: FileEdit, href: '/components/rich-text-editor', status: 'ready' },
      { name: 'Date Picker', icon: CalendarIcon, href: '/components/date-picker', status: 'ready' },
      { name: 'Time Picker', icon: Clock, href: '/components/time-picker', status: 'ready' },
      { name: 'Number Input', icon: Binary, href: '/components/number-input', status: 'ready' },
      { name: 'Color Picker', icon: Palette, href: '/components/color-picker', status: 'coming-soon' },
    ],
  },
  {
    name: t.components.categories.layout,
    description: t.components.categories.layoutDesc,
    components: [
      { name: 'Dashboard Shell', icon: Layout, href: '/components/dashboard-shell', status: 'ready' },
      { name: 'Sidebar', icon: Sidebar, href: '/components/sidebar', status: 'coming-soon' },
      { name: 'App Shell', icon: Layout, href: '/components/app-shell', status: 'coming-soon' },
    ],
  },
  {
    name: t.components.categories.userInterface,
    description: t.components.categories.userInterfaceDesc,
    components: [
      { name: 'User Menu', icon: UserCircle, href: '/components/user-menu', status: 'ready' },
      { name: 'Notification Center', icon: Bell, href: '/components/notification-center', status: 'ready' },
      { name: 'Stepper', icon: GitBranch, href: '/components/stepper', status: 'ready' },
      { name: 'Reaction Picker', icon: ThumbsUp, href: '/components/reaction-picker', status: 'ready' },
      { name: 'Kbd', icon: Command, href: '/components/kbd', status: 'ready' },
    ],
  },
  {
    name: t.components.categories.ai,
    description: t.components.categories.aiDesc,
    components: [
      { name: 'Chat Message', icon: MessageSquare, href: '/components/chat-message', status: 'ready' },
      { name: 'Prompt Input', icon: Send, href: '/components/prompt-input', status: 'ready' },
      { name: 'Thinking Indicator', icon: Loader2, href: '/components/thinking-indicator', status: 'ready' },
      { name: 'Message Actions', icon: Settings, href: '/components/message-actions', status: 'ready' },
      { name: 'Model Selector', icon: Sparkles, href: '/components/model-selector', status: 'ready' },
      { name: 'Parameter Slider', icon: Sliders, href: '/components/parameter-slider', status: 'ready' },
      { name: 'Token Counter', icon: Hash, href: '/components/token-counter', status: 'ready' },
      { name: 'Conversation History', icon: History, href: '/components/conversation-history', status: 'ready' },
    ],
  },
  {
    name: t.components.categories.workflow,
    description: t.components.categories.workflowDesc,
    components: [
      { name: 'Workflow Canvas', icon: Workflow, href: '/components/workflow-canvas', status: 'ready' },
      { name: 'Workflow Node', icon: Box, href: '/components/workflow-node', status: 'ready' },
    ],
  },
]

export default function ComponentsPage() {
  const { locale } = useDirection()
  const t = content[locale]
  const categories = componentCategories(t)

  // Helper to get bilingual component name from href
  const getComponentName = (href: string) => {
    const slug = href.replace('/components/', '')
    return t.componentNames[slug as keyof typeof t.componentNames] || href.split('/').pop()?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || ''
  }

  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.components.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t.components.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">
            {t.components.description}
          </p>

          <div className="mb-6">
            <Button asChild>
              <a href="https://storybook.noorui.com" target="_blank" rel="noopener noreferrer">
                {t.storybook.exploreStorybook} ↗
              </a>
            </Button>
          </div>

          {/* Live Preview */}
          <Card>
            <CardHeader>
              <CardTitle>{t.components.quickPreview}</CardTitle>
              <CardDescription>
                {t.components.previewDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>{t.buttonComponent.primary}</Button>
                <Button variant="secondary">{t.buttonComponent.secondary}</Button>
                <Button variant="outline">{t.buttonComponent.outline}</Button>
                <Badge>{t.badgeComponent.labels.new}</Badge>
                <Badge variant="secondary">{t.badgeComponent.labels.beta}</Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <Input placeholder={t.formComponent.placeholders.enterName} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Component Categories */}
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.name}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.components.map((component) => {
                  const Icon = component.icon

                  return (
                    <Link key={component.name} href={component.href}>
                      <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="rounded-lg bg-primary/10 p-2">
                                <Icon className="h-5 w-5 text-primary rtl:rotate-180" />
                              </div>
                              <CardTitle className="text-lg">{getComponentName(component.href)}</CardTitle>
                            </div>
                            {component.status === 'ready' ? (
                              <Badge variant="default" className="text-xs">
                                {t.components.ready}
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                {t.components.comingSoon}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Getting Help */}
        <Card className="mt-12 border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>{t.components.needHelp}</CardTitle>
            <CardDescription>
              {t.components.helpDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/documentation">{t.components.viewDocs}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/examples">{t.components.browseExamples}</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
