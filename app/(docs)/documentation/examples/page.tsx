'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Code, Layout, FormInput, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const loginFormCode = `import { Button } from '@rtl-design-system/core/components'
import { Input } from '@rtl-design-system/core/components'
import { Label } from '@rtl-design-system/core/components'
import { Card, CardContent, CardHeader, CardTitle } from '@rtl-design-system/core/components'

export default function LoginForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>تسجيل الدخول / Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني / Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور / Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full">دخول / Sign In</Button>
        </form>
      </CardContent>
    </Card>
  )
}`

const dashboardCode = `import { Card, CardContent, CardHeader, CardTitle } from '@rtl-design-system/core/components'

export default function Dashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>إجمالي المستخدمين</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">1,234</p>
          <p className="text-sm text-muted-foreground">+12% من الشهر الماضي</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>الإيرادات</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">$45,678</p>
          <p className="text-sm text-muted-foreground">+8% من الشهر الماضي</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>المشاريع النشطة</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">23</p>
          <p className="text-sm text-muted-foreground">3 مكتملة هذا الأسبوع</p>
        </CardContent>
      </Card>
    </div>
  )
}`

export default function ExamplesPage() {
  return (

      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">Documentation</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Examples</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Examples</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Real-world examples and patterns for common UI scenarios using RTL Design System components.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <FormInput className="h-7 w-7" />
            Login Form
          </h2>
          <p className="text-muted-foreground mb-4">
            A bilingual login form that works perfectly in both LTR and RTL modes:
          </p>
          <CodeBlock code={loginFormCode} language="tsx" />

          <div className="mt-6 p-6 border rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-4">Live Preview:</p>
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>تسجيل الدخول / Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني / Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">كلمة المرور / Password</Label>
                    <Input id="password" type="password" />
                  </div>
                  <Button className="w-full">دخول / Sign In</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <Layout className="h-7 w-7" />
            Dashboard Cards
          </h2>
          <p className="text-muted-foreground mb-4">
            Dashboard statistics with Arabic content:
          </p>
          <CodeBlock code={dashboardCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">More Examples</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/components">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Component Examples</h3>
                  <p className="text-sm text-muted-foreground">
                    Each component page includes multiple usage examples
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/rtl-guide">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">RTL Patterns</h3>
                  <p className="text-sm text-muted-foreground">
                    Common RTL patterns and best practices
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
