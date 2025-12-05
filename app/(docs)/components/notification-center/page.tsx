'use client'

import { BestPractices } from '@/components/docs/best-practices'
import { CodeBlock } from '@/components/docs/code-block'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable, type PropDefinition } from '@/components/docs/props-table'
import { useDirection } from '@/components/providers/direction-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { NotificationCenter, type Notification } from '@/components/ui/notification-center'
import { useToast } from '@/hooks/use-toast'
import { content } from '@/lib/i18n'
import { Heart, MessageSquare, Star, UserPlus } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

const getProps = (componentT: any): PropDefinition[] => [
  {
    name: 'notifications',
    type: 'Notification[]',
    defaultValue: '[]',
    description: componentT.props.notifications,
  },
  {
    name: 'onNotificationClick',
    type: '(notification: Notification) => void',
    description: componentT.props.onNotificationClick,
  },
  {
    name: 'onMarkAsRead',
    type: '(id: string) => void',
    description: componentT.props.onMarkAsRead,
  },
  {
    name: 'onMarkAllAsRead',
    type: '() => void',
    description: componentT.props.onMarkAllAsRead,
  },
  {
    name: 'onClearAll',
    type: '() => void',
    description: componentT.props.onClearAll,
  },
  {
    name: 'onRemove',
    type: '(id: string) => void',
    description: componentT.props.onRemove,
  },
  {
    name: 'className',
    type: 'string',
    description: componentT.props.className,
  },
  {
    name: 'maxHeight',
    type: 'string',
    defaultValue: '"400px"',
    description: componentT.props.maxHeight,
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
  const [mounted, setMounted] = React.useState(false)

  const t = content[locale] || content.en
  const notificationCenterT = (content[locale]?.notificationCenterComponent || content.en.notificationCenterComponent) as any
  const propDefinitions = getProps(notificationCenterT)

  const [notifications1, setNotifications1] = React.useState<Notification[]>([
    {
      id: '1',
      title: notificationCenterT.demoNotifications.newComment,
      description: notificationCenterT.demoNotifications.sarahComment,
      time: new Date(Date.now() - 5 * 60000).toISOString(),
      read: false,
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: '2',
      title: notificationCenterT.demoNotifications.newFollower,
      description: notificationCenterT.demoNotifications.ahmedFollowing,
      time: new Date(Date.now() - 120 * 60000).toISOString(),
      read: false,
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      id: '3',
      title: notificationCenterT.demoNotifications.someoneLiked,
      description: notificationCenterT.demoNotifications.peopleLikedReact,
      time: new Date(Date.now() - 1440 * 60000).toISOString(),
      read: true,
      icon: <Heart className="h-5 w-5" />,
    },
  ])

  const [notifications2, setNotifications2] = React.useState<Notification[]>([
    {
      id: '1',
      title: notificationCenterT.demoNotifications.newReview,
      description: notificationCenterT.demoNotifications.excellentService,
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
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {t.nav.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{notificationCenterT.title}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{notificationCenterT.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {notificationCenterT.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{notificationCenterT.preview}</h2>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.features}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{notificationCenterT.features.unreadBadge}</h3>
                <p className="text-sm text-muted-foreground">
                  {notificationCenterT.features.unreadBadgeDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{notificationCenterT.features.relativeTime}</h3>
                <p className="text-sm text-muted-foreground">
                  {notificationCenterT.features.relativeTimeDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{notificationCenterT.features.iconsAvatars}</h3>
                <p className="text-sm text-muted-foreground">
                  {notificationCenterT.features.iconsAvatarsDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{notificationCenterT.features.markAsRead}</h3>
                <p className="text-sm text-muted-foreground">
                  {notificationCenterT.features.markAsReadDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{notificationCenterT.features.removeNotifications}</h3>
                <p className="text-sm text-muted-foreground">
                  {notificationCenterT.features.removeNotificationsDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{notificationCenterT.features.bilingual}</h3>
                <p className="text-sm text-muted-foreground">
                  {notificationCenterT.features.bilingualDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{notificationCenterT.examples.title}</h2>

          <div className="space-y-8">
            {/* With Avatars */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{notificationCenterT.examples.withAvatars}</h3>
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
              <h3 className="text-lg font-semibold mb-4">{notificationCenterT.examples.emptyState}</h3>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{notificationCenterT.notificationType.title}</h2>
          <p className="text-muted-foreground mb-4">
            {notificationCenterT.notificationType.interfaceDesc}
          </p>
          <CodeBlock code={notificationTypeDefinition} language="typescript" />
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.props}</h2>
          <PropsTable props={propDefinitions} />
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.bestPractices}</h2>
          <BestPractices
            dos={notificationCenterT.bestPractices.doList}
            donts={notificationCenterT.bestPractices.dontList}
          />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.accessibility}</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{notificationCenterT.accessibility.bellIconLabel}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{notificationCenterT.accessibility.unreadCountVisible}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{notificationCenterT.accessibility.keyboardNavigation}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{notificationCenterT.accessibility.visualDistinction}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{notificationCenterT.accessibility.escapeCloses}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
