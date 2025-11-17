'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { BestPractices } from '@/components/docs/best-practices'
import { DashboardShell } from '@/components/ui/dashboard-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Home,
  FileText,
  Settings,
  Users,
  BarChart3,
  Info,
  Bell,
  MessageSquare,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const propDefinitions = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content to display in the main area',
  },
  {
    name: 'navItems',
    type: 'NavItem[]',
    defaultValue: '[]',
    description: 'Navigation menu items with bilingual titles',
  },
  {
    name: 'user',
    type: '{ name?: string; email?: string; image?: string; initials?: string }',
    description: 'User information for the user menu',
  },
  {
    name: 'notifications',
    type: 'Notification[]',
    defaultValue: '[]',
    description: 'Notifications for the notification center',
  },
  {
    name: 'logo',
    type: 'React.ReactNode',
    description: 'Custom logo component',
  },
  {
    name: 'logoHref',
    type: 'string',
    defaultValue: '"/"',
    description: 'URL for the logo link',
  },
  {
    name: 'sidebarWidth',
    type: 'string',
    defaultValue: '"16rem"',
    description: 'Width of the sidebar',
  },
  {
    name: 'onProfileClick',
    type: '() => void',
    description: 'Callback when profile is clicked',
  },
  {
    name: 'onSettingsClick',
    type: '() => void',
    description: 'Callback when settings is clicked',
  },
  {
    name: 'onLogout',
    type: '() => void',
    description: 'Callback when logout is clicked',
  },
]

const basicUsageCode = `'use client'

import { DashboardShell } from '@/components/ui/dashboard-shell'
import { Home, FileText, Settings } from 'lucide-react'

export default function Dashboard() {
  const navItems = [
    {
      title: 'Dashboard',
      titleAr: 'لوحة التحكم',
      href: '/dashboard',
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: 'Posts',
      titleAr: 'المقالات',
      href: '/dashboard/posts',
      icon: <FileText className="h-5 w-5" />,
      badge: 5,
    },
    {
      title: 'Settings',
      titleAr: 'الإعدادات',
      href: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <DashboardShell
      navItems={navItems}
      user={{
        name: 'Ahmed Al-Rashid',
        email: 'ahmed@example.com',
      }}
      onLogout={() => console.log('Logout')}
    >
      <div className="container py-6">
        <h1>Dashboard Content</h1>
      </div>
    </DashboardShell>
  )
}`

const withNotificationsCode = `'use client'

import * as React from 'react'
import { DashboardShell } from '@/components/ui/dashboard-shell'
import { Home, Bell } from 'lucide-react'

export default function Dashboard() {
  const [notifications, setNotifications] = React.useState([
    {
      id: '1',
      title: 'New comment',
      description: 'Sarah commented on your post',
      time: new Date().toISOString(),
      read: false,
    },
  ])

  return (
    <DashboardShell
      navItems={[/* ... */]}
      user={{ name: 'John Doe', email: 'john@example.com' }}
      notifications={notifications}
      onMarkAsRead={(id) => {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
      }}
      onLogout={() => console.log('Logout')}
    >
      <div className="container py-6">
        <h1>Dashboard Content</h1>
      </div>
    </DashboardShell>
  )
}`

const fullFeaturedCode = `'use client'

import * as React from 'react'
import { DashboardShell } from '@/components/ui/dashboard-shell'
import { Home, FileText, Users, BarChart3, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [notifications, setNotifications] = React.useState([])

  const navItems = [
    {
      title: 'Dashboard',
      titleAr: 'لوحة التحكم',
      href: '/dashboard',
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: 'Posts',
      titleAr: 'المقالات',
      href: '/dashboard/posts',
      icon: <FileText className="h-5 w-5" />,
      badge: 12,
    },
    {
      title: 'Team',
      titleAr: 'الفريق',
      href: '/dashboard/team',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Analytics',
      titleAr: 'التحليلات',
      href: '/dashboard/analytics',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      titleAr: 'الإعدادات',
      href: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const handleLogout = async () => {
    // Your logout logic
    router.push('/login')
  }

  return (
    <DashboardShell
      navItems={navItems}
      user={{
        name: 'Fatima Al-Zahra',
        email: 'fatima@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
      }}
      notifications={notifications}
      onProfileClick={() => router.push('/profile')}
      onSettingsClick={() => router.push('/settings')}
      onLogout={handleLogout}
      onMarkAsRead={(id) => {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
      }}
      onClearAll={() => setNotifications([])}
    >
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Welcome to Dashboard</h1>
        {/* Your dashboard content */}
      </div>
    </DashboardShell>
  )
}`

export default function DashboardShellPage() {
  const { toast } = useToast()

  const handleAction = (action: string) => {
    toast({
      title: `${action} clicked`,
      description: `You clicked on ${action}`,
    })
  }

  const navItems = [
    {
      title: 'Dashboard',
      titleAr: 'لوحة التحكم',
      href: '#',
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: 'Posts',
      titleAr: 'المقالات',
      href: '#',
      icon: <FileText className="h-5 w-5" />,
      badge: 5,
    },
    {
      title: 'Team',
      titleAr: 'الفريق',
      href: '#',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Analytics',
      titleAr: 'التحليلات',
      href: '#',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: 'Settings',
      titleAr: 'الإعدادات',
      href: '#',
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const notifications = [
    {
      id: '1',
      title: 'New comment',
      description: 'Sarah commented on your post',
      time: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      read: false,
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: '2',
      title: 'Post published',
      description: 'Your post "Getting Started" is now live',
      time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: true,
      icon: <Bell className="h-5 w-5" />,
    },
  ]

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
            <li className="text-foreground font-medium">Dashboard Shell</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">Dashboard Shell</h1>
            <Badge variant="default">New</Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A complete dashboard layout with sidebar navigation, header with user menu and
            notifications, and full RTL support. Perfect for admin panels and web applications.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <Card>
            <CardContent className="p-0">
              <div className="h-[600px] overflow-hidden rounded-lg border">
                <DashboardShell
                  navItems={navItems}
                  user={{
                    name: 'Ahmed Al-Rashid',
                    email: 'ahmed@example.com',
                  }}
                  notifications={notifications}
                  onProfileClick={() => handleAction('Profile')}
                  onSettingsClick={() => handleAction('Settings')}
                  onLogout={() => handleAction('Logout')}
                  onNotificationClick={(notif) => handleAction(`Notification: ${notif.title}`)}
                  onMarkAsRead={(id) => handleAction('Mark as read')}
                >
                  <div className="container py-6">
                    <h2 className="text-2xl font-bold mb-4">Dashboard Content</h2>
                    <p className="text-muted-foreground">
                      This is the main content area. Add your dashboard content here.
                    </p>
                  </div>
                </DashboardShell>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Responsive Sidebar</h3>
                <p className="text-sm text-muted-foreground">
                  Desktop sidebar and mobile sheet with smooth animations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Bilingual Navigation</h3>
                <p className="text-sm text-muted-foreground">
                  Support for English and Arabic navigation labels
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">User Menu Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Built-in user menu with profile and logout actions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Notification Center</h3>
                <p className="text-sm text-muted-foreground">
                  Integrated notification system with unread badges
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">RTL Support</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic layout flip for right-to-left languages
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Sticky Header</h3>
                <p className="text-sm text-muted-foreground">
                  Fixed header with backdrop blur for modern look
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* With Notifications */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Notifications</h3>
              <Card>
                <CardContent className="p-0">
                  <div className="h-[500px] overflow-hidden rounded-lg border">
                    <DashboardShell
                      navItems={navItems.slice(0, 3)}
                      user={{
                        name: 'Sarah Johnson',
                        email: 'sarah@example.com',
                        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                      }}
                      notifications={notifications}
                      onProfileClick={() => handleAction('Profile')}
                      onLogout={() => handleAction('Logout')}
                      onMarkAsRead={(id) => handleAction('Mark as read')}
                      onClearAll={() => handleAction('Clear all')}
                    >
                      <div className="container py-6">
                        <h2 className="text-2xl font-bold">Dashboard with Notifications</h2>
                      </div>
                    </DashboardShell>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withNotificationsCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Full Featured */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Full Featured</h3>
              <Card>
                <CardContent className="p-0">
                  <div className="h-[500px] overflow-hidden rounded-lg border">
                    <DashboardShell
                      navItems={navItems}
                      user={{
                        name: 'Fatima Al-Zahra',
                        email: 'fatima@example.com',
                        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
                      }}
                      notifications={notifications}
                      onProfileClick={() => handleAction('Profile')}
                      onSettingsClick={() => handleAction('Settings')}
                      onBillingClick={() => handleAction('Billing')}
                      onLogout={() => handleAction('Logout')}
                      onMarkAsRead={(id) => handleAction('Mark as read')}
                      onMarkAllAsRead={() => handleAction('Mark all as read')}
                      onClearAll={() => handleAction('Clear all')}
                    >
                      <div className="container py-6">
                        <h2 className="text-2xl font-bold mb-4">Full Featured Dashboard</h2>
                        <p className="text-muted-foreground">
                          Complete dashboard with all features enabled
                        </p>
                      </div>
                    </DashboardShell>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={fullFeaturedCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* NavItem Type */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">NavItem Type</h2>
          <Card>
            <CardContent className="p-6">
              <CodeBlock
                code={`interface NavItem {
  title: string           // English title
  titleAr: string         // Arabic title
  href: string            // Navigation URL
  icon?: React.ReactNode  // Optional icon
  badge?: string | number // Optional badge (e.g., count)
  disabled?: boolean      // Disable the link
}`}
                language="tsx"
                showLineNumbers={false}
              />
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
            dos={t.dashboardShellComponent.bestPractices.doList}
            donts={t.dashboardShellComponent.bestPractices.dontList}
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
                  <span>Keyboard navigation with Tab and Enter keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>ARIA current=&quot;page&quot; on active navigation items</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Proper semantic HTML with nav, main, and header elements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Focus management in mobile sheet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Screen reader friendly labels for all interactive elements</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
