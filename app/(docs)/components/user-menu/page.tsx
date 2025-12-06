'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { BestPractices } from '@/components/docs/best-practices'
import { UserMenu } from '@/components/ui/user-menu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'


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
        name: 'Nuno Marques',
        email: 'ositaka@example.com',
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
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const { toast } = useToast()

  const t = content[locale] || content.en
  const userMenuT = t.userMenuComponent as any

  const propDefinitions = [
    {
      name: 'user',
      type: '{ name?: string; email?: string; image?: string; initials?: string }',
      description: userMenuT.props.user,
    },
    {
      name: 'onProfileClick',
      type: '() => void',
      description: userMenuT.props.onProfileClick,
    },
    {
      name: 'onSettingsClick',
      type: '() => void',
      description: userMenuT.props.onSettingsClick,
    },
    {
      name: 'onBillingClick',
      type: '() => void',
      description: userMenuT.props.onBillingClick,
    },
    {
      name: 'onTeamClick',
      type: '() => void',
      description: userMenuT.props.onTeamClick,
    },
    {
      name: 'onSupportClick',
      type: '() => void',
      description: userMenuT.props.onSupportClick,
    },
    {
      name: 'onLogout',
      type: '() => void',
      description: userMenuT.props.onLogout,
    },
    {
      name: 'className',
      type: 'string',
      description: userMenuT.props.className,
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end'",
      defaultValue: "'end'",
      description: userMenuT.props.align,
    },
    {
      name: 'side',
      type: "'top' | 'right' | 'bottom' | 'left'",
      defaultValue: "'bottom'",
      description: userMenuT.props.side,
    },
  ]

  const handleAction = (action: string) => {
    toast({
      title: `${action}`,
      description: `${action}`,
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
                {userMenuT.breadcrumb.home}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                {userMenuT.breadcrumb.components}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{userMenuT.breadcrumb.userMenu}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">{userMenuT.title}</h1>
            <Badge variant="default">{userMenuT.badge}</Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {userMenuT.description}
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{userMenuT.sections.preview}</h2>
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
                  name: userMenuT.demoNames.ahmedAlRashid,
                  email: 'ahmed@example.com',
                }}
                onProfileClick={() => handleAction(userMenuT.actions.profile)}
                onSettingsClick={() => handleAction(userMenuT.actions.settings)}
                onLogout={() => handleAction(userMenuT.actions.logout)}
              />
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{userMenuT.sections.features}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{userMenuT.features.avatarDisplay}</h3>
                <p className="text-sm text-muted-foreground">
                  {userMenuT.features.avatarDisplayDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{userMenuT.features.userInfo}</h3>
                <p className="text-sm text-muted-foreground">
                  {userMenuT.features.userInfoDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{userMenuT.features.flexibleActions}</h3>
                <p className="text-sm text-muted-foreground">
                  {userMenuT.features.flexibleActionsDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{userMenuT.features.rtlSupport}</h3>
                <p className="text-sm text-muted-foreground">
                  {userMenuT.features.rtlSupportDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{userMenuT.features.keyboardNavigation}</h3>
                <p className="text-sm text-muted-foreground">
                  {userMenuT.features.keyboardNavigationDesc}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{userMenuT.features.accessible}</h3>
                <p className="text-sm text-muted-foreground">
                  {userMenuT.features.accessibleDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{userMenuT.examples.title}</h2>

          <div className="space-y-8">
            {/* With Avatar */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{userMenuT.examples.withAvatar}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <UserMenu
                      user={{
                        name: userMenuT.demoNames.sarahJohnson,
                        email: 'sarah@example.com',
                        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                      }}
                      onProfileClick={() => handleAction(userMenuT.actions.profile)}
                      onSettingsClick={() => handleAction(userMenuT.actions.settings)}
                      onLogout={() => handleAction(userMenuT.actions.logout)}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={withAvatarCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Minimal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{userMenuT.examples.minimal}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <UserMenu
                      user={{
                        name: userMenuT.demoNames.johnDoe,
                        email: 'ositaka@example.com',
                      }}
                      onLogout={() => handleAction(userMenuT.actions.logout)}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={minimalCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Full Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{userMenuT.examples.allOptions}</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <UserMenu
                      user={{
                        name: userMenuT.demoNames.fatimaAlZahra,
                        email: 'fatima@example.com',
                        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
                      }}
                      onProfileClick={() => handleAction(userMenuT.actions.profile)}
                      onSettingsClick={() => handleAction(userMenuT.actions.settings)}
                      onBillingClick={() => handleAction(userMenuT.actions.billing)}
                      onTeamClick={() => handleAction(userMenuT.actions.team)}
                      onSupportClick={() => handleAction(userMenuT.actions.support)}
                      onLogout={() => handleAction(userMenuT.actions.logout)}
                    />
                  </div>
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{userMenuT.sections.integration}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{userMenuT.integration.title}</CardTitle>
              <CardDescription>
                {userMenuT.integration.description}
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
          <h2 className="text-2xl font-bold tracking-tight mb-6">{userMenuT.sections.props}</h2>
          <PropsTable props={propDefinitions} />
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.componentPage.sections.bestPractices}</h2>
          <BestPractices
            dos={userMenuT.bestPractices.doList}
            donts={userMenuT.bestPractices.dontList}
          />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{userMenuT.sections.accessibility}</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{userMenuT.accessibility.keyboardNav}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{userMenuT.accessibility.ariaLabels}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{userMenuT.accessibility.focusManagement}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{userMenuT.accessibility.escapeKey}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{userMenuT.accessibility.visualFocus}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
