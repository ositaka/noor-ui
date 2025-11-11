'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { UserMenu } from '@/components/ui/user-menu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const propDefinitions = [
  {
    name: 'user',
    type: '{ name?: string; email?: string; image?: string; initials?: string }',
    description: 'User information to display',
  },
  {
    name: 'onProfileClick',
    type: '() => void',
    description: 'Callback when Profile menu item is clicked',
  },
  {
    name: 'onSettingsClick',
    type: '() => void',
    description: 'Callback when Settings menu item is clicked',
  },
  {
    name: 'onBillingClick',
    type: '() => void',
    description: 'Callback when Billing menu item is clicked',
  },
  {
    name: 'onTeamClick',
    type: '() => void',
    description: 'Callback when Team menu item is clicked',
  },
  {
    name: 'onSupportClick',
    type: '() => void',
    description: 'Callback when Support menu item is clicked',
  },
  {
    name: 'onLogout',
    type: '() => void',
    description: 'Callback when Log out menu item is clicked',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes for the trigger button',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    defaultValue: "'end'",
    description: 'Alignment of the dropdown menu',
  },
  {
    name: 'side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    defaultValue: "'bottom'",
    description: 'Side where the dropdown menu appears',
  },
]

const withAvatarCode = `'use client'

import { UserMenu } from '@/components/ui/user-menu'

export default function Example() {
  return (
    <UserMenu
      user={{
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      }}
      onProfileClick={() => console.log('Profile')}
      onSettingsClick={() => console.log('Settings')}
      onLogout={() => console.log('Logout')}
    />
  )
}`

const minimalCode = `'use client'

import { UserMenu } from '@/components/ui/user-menu'

export default function Example() {
  return (
    <UserMenu
      user={{
        name: 'John Doe',
        email: 'john@example.com',
      }}
      onLogout={() => console.log('Logout')}
    />
  )
}`

const fullOptionsCode = `'use client'

import { UserMenu } from '@/components/ui/user-menu'

export default function Example() {
  return (
    <UserMenu
      user={{
        name: 'Fatima Al-Zahra',
        email: 'fatima@example.com',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
      }}
      onProfileClick={() => console.log('Profile')}
      onSettingsClick={() => console.log('Settings')}
      onBillingClick={() => console.log('Billing')}
      onTeamClick={() => console.log('Team')}
      onSupportClick={() => console.log('Support')}
      onLogout={() => console.log('Logout')}
    />
  )
}`

export default function UserMenuPage() {
  const { toast } = useToast()

  const handleAction = (action: string) => {
    toast({
      title: `${action} clicked`,
      description: `You clicked on ${action}`,
    })
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
            <li className="text-foreground font-medium">User Menu</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">User Menu</h1>
            <Badge variant="default">New</Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A dropdown menu triggered by a user avatar, displaying profile information and action
            items. Perfect for application headers and navigation bars.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase
            code={`'use client'

import { UserMenu } from '@/components/ui/user-menu'

export default function Example() {
  return (
    <UserMenu
      user={{
        name: 'Ahmed Al-Rashid',
        email: 'ahmed@example.com',
      }}
      onProfileClick={() => console.log('Profile')}
      onSettingsClick={() => console.log('Settings')}
      onLogout={() => console.log('Logout')}
    />
  )
}`}
          >
            <ComponentShowcase.Demo>
              <UserMenu
                user={{
                  name: 'Ahmed Al-Rashid',
                  email: 'ahmed@example.com',
                }}
                onProfileClick={() => handleAction('Profile')}
                onSettingsClick={() => handleAction('Settings')}
                onLogout={() => handleAction('Logout')}
              />
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Avatar Display</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Shows user avatar with automatic fallback to initials
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Info</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Displays user name and email in the dropdown
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Flexible Actions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Customizable menu items with callback handlers
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">RTL Support</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Automatically adapts icons and layout for RTL
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Keyboard Navigation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Full keyboard support with arrow keys
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accessible</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                ARIA labels and screen reader support
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* With Avatar */}
            <div>
              <h3 className="text-lg font-semibold mb-4">With Avatar</h3>
              <Card>
                <CardContent className="p-6">
                  <UserMenu
                    user={{
                      name: 'Sarah Johnson',
                      email: 'sarah@example.com',
                      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                    }}
                    onProfileClick={() => handleAction('Profile')}
                    onSettingsClick={() => handleAction('Settings')}
                    onLogout={() => handleAction('Logout')}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withAvatarCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Minimal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Minimal</h3>
              <Card>
                <CardContent className="p-6">
                  <UserMenu
                    user={{
                      name: 'John Doe',
                      email: 'john@example.com',
                    }}
                    onLogout={() => handleAction('Logout')}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={minimalCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Full Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">All Options</h3>
              <Card>
                <CardContent className="p-6">
                  <UserMenu
                    user={{
                      name: 'Fatima Al-Zahra',
                      email: 'fatima@example.com',
                      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
                    }}
                    onProfileClick={() => handleAction('Profile')}
                    onSettingsClick={() => handleAction('Settings')}
                    onBillingClick={() => handleAction('Billing')}
                    onTeamClick={() => handleAction('Team')}
                    onSupportClick={() => handleAction('Support')}
                    onLogout={() => handleAction('Logout')}
                  />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={fullOptionsCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Integration Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Integration Example</h2>
          <Card>
            <CardHeader>
              <CardTitle>Using with Authentication</CardTitle>
              <CardDescription>
                Example integration with authentication system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                code={`'use client'

import { UserMenu } from '@/components/ui/user-menu'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <h1>My App</h1>

        <UserMenu
          user={{
            name: user.name,
            email: user.email,
            image: user.avatar,
          }}
          onProfileClick={() => router.push('/profile')}
          onSettingsClick={() => router.push('/settings')}
          onLogout={handleLogout}
        />
      </div>
    </header>
  )
}`}
                language="tsx"
                collapsible
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">Best Practices</h2>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <ul className="space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Place the user menu in the top-right corner (top-left for RTL) for consistency
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Keep menu items relevant and frequently used - avoid cluttering with too many options
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Always place "Log out" as the last item with visual separation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Provide user feedback after actions (use toast notifications)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    Use high-quality avatar images or clear fallback initials
                  </span>
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Keyboard navigation with Tab, Enter, and Arrow keys</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>ARIA labels for screen readers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Focus management within the dropdown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Escape key closes the dropdown</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Visual focus indicators for all interactive elements</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
