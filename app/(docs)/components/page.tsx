'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
} from 'lucide-react'

const componentCategories = [
  {
    name: 'Core',
    description: 'Essential building blocks for your UI',
    components: [
      { name: 'Button', icon: MousePointer2, href: '/components/button', status: 'ready' },
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
    name: 'Forms',
    description: 'Form elements with validation support',
    components: [
      { name: 'Form', icon: CheckSquare, href: '/components/form', status: 'ready' },
      { name: 'Checkbox', icon: CheckSquare, href: '/components/checkbox', status: 'ready' },
      { name: 'Radio Group', icon: CheckSquare, href: '/components/radio-group', status: 'ready' },
      { name: 'Select', icon: Menu, href: '/components/select', status: 'ready' },
      { name: 'Switch', icon: CheckSquare, href: '/components/switch', status: 'ready' },
      { name: 'Slider', icon: CheckSquare, href: '/components/slider', status: 'ready' },
      { name: 'Textarea', icon: Type, href: '/components/textarea', status: 'ready' },
    ],
  },
  {
    name: 'Data Display',
    description: 'Components for displaying data and information',
    components: [
      { name: 'Table', icon: Layers, href: '/components/table', status: 'ready' },
      { name: 'DataTable', icon: TableIcon, href: '/components/data-table', status: 'ready' },
      { name: 'Stats Card', icon: BarChart3, href: '/components/stats-card', status: 'ready' },
      { name: 'Command', icon: Menu, href: '/components/command', status: 'ready' },
    ],
  },
  {
    name: 'Feedback',
    description: 'Components for user notifications and feedback',
    components: [
      { name: 'Alert', icon: AlertCircle, href: '/components/alert', status: 'ready' },
      { name: 'Toast', icon: MessageSquare, href: '/components/toast', status: 'ready' },
      { name: 'Dialog', icon: MessageSquare, href: '/components/dialog', status: 'ready' },
      { name: 'Tooltip', icon: Info, href: '/components/tooltip', status: 'ready' },
      { name: 'Progress', icon: Loader2, href: '/components/progress', status: 'ready' },
      { name: 'Skeleton', icon: Loader2, href: '/components/skeleton', status: 'ready' },
      { name: 'Empty State', icon: Inbox, href: '/components/empty-state', status: 'ready' },
    ],
  },
  {
    name: 'Navigation',
    description: 'Components for site navigation and menus',
    components: [
      { name: 'Tabs', icon: Menu, href: '/components/tabs', status: 'ready' },
      { name: 'Breadcrumb', icon: Home, href: '/components/breadcrumb', status: 'ready' },
      { name: 'Pagination', icon: ChevronRight, href: '/components/pagination', status: 'ready' },
      { name: 'Dropdown Menu', icon: Menu, href: '/components/dropdown-menu', status: 'ready' },
      { name: 'Context Menu', icon: Menu, href: '/components/context-menu', status: 'ready' },
    ],
  },
  {
    name: 'Overlays & Layout',
    description: 'Components for overlays and content organization',
    components: [
      { name: 'Sheet', icon: PanelLeft, href: '/components/sheet', status: 'ready' },
      { name: 'Accordion', icon: ChevronsUpDown, href: '/components/accordion', status: 'ready' },
      { name: 'Collapsible', icon: ChevronsUpDown, href: '/components/collapsible', status: 'ready' },
      { name: 'Popover', icon: MessageSquare, href: '/components/popover', status: 'ready' },
    ],
  },
  {
    name: 'GCC-Specific',
    description: 'Components tailored for the GCC market and Islamic applications',
    components: [
      { name: 'Prayer Times', icon: Clock, href: '/components/prayer-times', status: 'ready' },
      { name: 'Hijri Date', icon: Clock, href: '/components/hijri-date', status: 'ready' },
      { name: 'Arabic Number', icon: Hash, href: '/components/arabic-number', status: 'ready' },
      { name: 'Zakat Calculator', icon: Calculator, href: '/components/zakat-calculator', status: 'ready' },
      { name: 'Calendar', icon: CalendarIcon, href: '/components/calendar', status: 'ready' },
    ],
  },
  {
    name: 'Advanced Forms & Inputs',
    description: 'Advanced form components for complex input scenarios',
    components: [
      { name: 'File Upload', icon: Upload, href: '/components/file-upload', status: 'ready' },
      { name: 'Rich Text Editor', icon: FileEdit, href: '/components/rich-text-editor', status: 'ready' },
      { name: 'Date Picker', icon: CalendarIcon, href: '/components/date-picker', status: 'coming-soon' },
      { name: 'Time Picker', icon: Clock, href: '/components/time-picker', status: 'coming-soon' },
      { name: 'Color Picker', icon: Palette, href: '/components/color-picker', status: 'coming-soon' },
      { name: 'Number Input', icon: Binary, href: '/components/number-input', status: 'coming-soon' },
    ],
  },
  {
    name: 'Layout & Shell',
    description: 'Application layout and shell components for building dashboards',
    components: [
      { name: 'Dashboard Shell', icon: Layout, href: '/components/dashboard-shell', status: 'coming-soon' },
      { name: 'Sidebar', icon: Sidebar, href: '/components/sidebar', status: 'coming-soon' },
      { name: 'App Shell', icon: Layout, href: '/components/app-shell', status: 'coming-soon' },
    ],
  },
  {
    name: 'User Interface',
    description: 'User-facing interactive components for common UX patterns',
    components: [
      { name: 'User Menu', icon: UserCircle, href: '/components/user-menu', status: 'ready' },
      { name: 'Notification Center', icon: Bell, href: '/components/notification-center', status: 'coming-soon' },
      { name: 'Stepper', icon: GitBranch, href: '/components/stepper', status: 'coming-soon' },
      { name: 'Command Bar', icon: Menu, href: '/components/command-bar', status: 'coming-soon' },
    ],
  },
]

export default function ComponentsPage() {
  return (
    <div className="min-h-screen">

      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Components</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Components</h1>
          <p className="text-xl text-muted-foreground mb-6">
            54 beautifully designed components built with Radix UI and Tailwind CSS.
            44 production-ready, 10 coming soon. Full RTL support, accessible, and customizable.
          </p>

          {/* Live Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Preview</CardTitle>
              <CardDescription>
                See how components adapt to different directions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Badge>New</Badge>
                <Badge variant="secondary">Beta</Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <Input placeholder="Try typing here..." />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Component Categories */}
        <div className="space-y-12">
          {componentCategories.map((category) => (
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
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <CardTitle className="text-lg">{component.name}</CardTitle>
                            </div>
                            {component.status === 'ready' ? (
                              <Badge variant="default" className="text-xs">
                                Ready
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                Coming Soon
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
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Check out our documentation or join our community
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/documentation">View Documentation</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/examples">Browse Examples</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
