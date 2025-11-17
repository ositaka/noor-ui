'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { BestPractices } from '@/components/docs/best-practices'
import { NotificationCenter, type Notification } from '@/components/ui/notification-center'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, UserPlus, Heart, Star } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const propDefinitions = [
  {
    name: 'notifications',
    type: 'Notification[]',
    defaultValue: '[]',
    description: 'Array of notification objects to display',
  },
  {
    name: 'onNotificationClick',
    type: '(notification: Notification) => void',
    description: 'Callback when a notification is clicked',
  },
  {
    name: 'onMarkAsRead',
    type: '(id: string) => void',
    description: 'Callback when a notification is marked as read',
  },
  {
    name: 'onMarkAllAsRead',
    type: '() => void',
    description: 'Callback when "Mark all as read" is clicked',
  },
  {
    name: 'onClearAll',
    type: '() => void',
    description: 'Callback when "Clear all" is clicked',
  },
  {
    name: 'onRemove',
    type: '(id: string) => void',
    description: 'Callback when a notification is removed',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes for the trigger button',
  },
  {
    name: 'maxHeight',
    type: 'string',
    defaultValue: '"400px"',
    description: 'Maximum height of the notifications list',
  },
]

const notificationTypeDefinition = `interface Notification {
  id: string
  title: string
  description?: string
  time: string          // ISO date string or Date
  read?: boolean
  icon?: React.ReactNode
  avatar?: string       // URL to avatar image
}`

const withAvatarsCode = `'use client'

import * as React from 'react'
import { NotificationCenter } from '@/components/ui/notification-center'
import { Star } from 'lucide-react'

export default function Example() {
  const [notifications, setNotifications] = React.useState([
    {
      id: '1',
      title: 'You have a new review',
      description: '"Excellent service!" - 5 stars',
      time: new Date(Date.now() - 10 * 60000).toISOString(),
      read: false,
      icon: <Star className="h-5 w-5" />,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
  ])

  return (
    <NotificationCenter
      notifications={notifications}
      onMarkAsRead={(id) => {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
      }}
      onMarkAllAsRead={() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      }}
      onRemove={(id) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
      }}
    />
  )
}`

const emptyStateCode = `'use client'

import { NotificationCenter } from '@/components/ui/notification-center'

export default function Example() {
  return <NotificationCenter notifications={[]} />
}`

export default function NotificationCenterPage() {
  const { toast } = useToast()
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const t = content[locale]

  const [notifications1, setNotifications1] = React.useState<Notification[]>([
    {
      id: '1',
      title: isRTL ? 'تعليق جديد على منشورك' : 'New comment on your post',
      description: isRTL ? 'علقت سارة: "مقال رائع! مفيد جداً."' : 'Sarah commented: "Great article! Very helpful."',
      time: new Date(Date.now() - 5 * 60000).toISOString(),
      read: false,
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: '2',
      title: isRTL ? 'متابع جديد' : 'New follower',
      description: isRTL ? 'أحمد بدأ متابعتك' : 'Ahmed started following you',
      time: new Date(Date.now() - 120 * 60000).toISOString(),
      read: false,
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      id: '3',
      title: isRTL ? 'شخص ما أعجب بمنشورك' : 'Someone liked your post',
      description: isRTL ? '5 أشخاص أعجبوا بـ "البدء مع React"' : '5 people liked "Getting Started with React"',
      time: new Date(Date.now() - 1440 * 60000).toISOString(),
      read: true,
      icon: <Heart className="h-5 w-5" />,
    },
  ])

  const [notifications2, setNotifications2] = React.useState<Notification[]>([
    {
      id: '1',
      title: isRTL ? 'لديك تقييم جديد' : 'You have a new review',
      description: isRTL ? '"خدمة ممتازة!" - 5 نجوم' : '"Excellent service!" - 5 stars',
      time: new Date(Date.now() - 10 * 60000).toISOString(),
      read: false,
      icon: <Star className="h-5 w-5" />,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
  ])

  const handleMarkAsRead = (id: string, setState: React.Dispatch<React.SetStateAction<Notification[]>>) => {
    setState((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleMarkAllAsRead = (setState: React.Dispatch<React.SetStateAction<Notification[]>>) => {
    setState((prev) => prev.map((n) => ({ ...n, read: true })))
    toast({
      title: 'All notifications marked as read',
    })
  }

  const handleClearAll = (setState: React.Dispatch<React.SetStateAction<Notification[]>>) => {
    setState([])
    toast({
      title: 'All notifications cleared',
    })
  }

  const handleRemove = (id: string, setState: React.Dispatch<React.SetStateAction<Notification[]>>) => {
    setState((prev) => prev.filter((n) => n.id !== id))
  }

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
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                Components
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Notification Center</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">Notification Center</h1>
            <Badge variant="default">New</Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A bell icon with dropdown displaying notifications, unread count badge, and actions
            to manage notifications. Fully bilingual with RTL support.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase
            code={`'use client'

import * as React from 'react'
import { NotificationCenter } from '@/components/ui/notification-center'

export default function Example() {
  const [notifications, setNotifications] = React.useState([
    {
      id: '1',
      title: 'New comment on your post',
      description: 'Sarah commented: "Great article!"',
      time: new Date().toISOString(),
      read: false,
    },
  ])

  return (
    <NotificationCenter
      notifications={notifications}
      onNotificationClick={(notif) => console.log('Clicked:', notif)}
      onMarkAsRead={(id) => {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
      }}
      onMarkAllAsRead={() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      }}
      onClearAll={() => setNotifications([])}
    />
  )
}`}
          >
            <ComponentShowcase.Demo>
              <NotificationCenter
                notifications={notifications1}
                onNotificationClick={(notif) => {
                  toast({
                    title: 'Notification clicked',
                    description: notif.title,
                  })
                }}
                onMarkAsRead={(id) => handleMarkAsRead(id, setNotifications1)}
                onMarkAllAsRead={() => handleMarkAllAsRead(setNotifications1)}
                onClearAll={() => handleClearAll(setNotifications1)}
                onRemove={(id) => handleRemove(id, setNotifications1)}
              />
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Unread Badge</h3>
                <p className="text-sm text-muted-foreground">
                  Badge showing unread count on the bell icon
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Relative Time</h3>
                <p className="text-sm text-muted-foreground">
                  Smart time display (5m ago, 2h ago, etc.) in both languages
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Icons & Avatars</h3>
                <p className="text-sm text-muted-foreground">
                  Support for custom icons or user avatars
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Mark as Read</h3>
                <p className="text-sm text-muted-foreground">
                  Individual or bulk mark as read functionality
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Remove Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Hover to reveal remove button on each notification
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Bilingual</h3>
                <p className="text-sm text-muted-foreground">
                  Full Arabic support with proper time formatting
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* With Avatars */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Avatars</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <NotificationCenter
                      notifications={notifications2}
                      onMarkAsRead={(id) => handleMarkAsRead(id, setNotifications2)}
                      onMarkAllAsRead={() => handleMarkAllAsRead(setNotifications2)}
                      onRemove={(id) => handleRemove(id, setNotifications2)}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withAvatarsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Empty State */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Empty State</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <NotificationCenter notifications={[]} />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={emptyStateCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Notification Type */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Notification Type</h2>
          <Card>
            <CardHeader>
              <CardTitle>Notification Interface</CardTitle>
              <CardDescription>
                Structure of a notification object
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm">{notificationTypeDefinition}</code>
              </pre>
            </CardContent>
          </Card>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={propDefinitions} />
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.bestPractices}</h2>
          <BestPractices
            dos={t.notificationCenterComponent.bestPractices.doList}
            donts={t.notificationCenterComponent.bestPractices.dontList}
          />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Bell icon button has proper aria-label</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Unread count badge is visible to screen readers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Keyboard navigation through notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Clear visual distinction between read/unread states</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Escape key closes the popover</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
