'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeBlock } from '@/components/docs/code-block'
import { Code, Layout, FormInput } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const loginFormCode = `import { Button } from '@noorui/components/components'
import { Input } from '@noorui/components/components'
import { Label } from '@noorui/components/components'
import { Card, CardContent, CardHeader, CardTitle } from '@noorui/components/components'

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

const dashboardCode = `import { Card, CardContent, CardHeader, CardTitle } from '@noorui/components/components'

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
  const { locale } = useDirection()
  const t = content[locale].documentationPages.examples
  const common = content[locale].documentationPages.common

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">{common.home}</Link></li>
            <li>/</li>
            <li><Link href="/documentation" className="hover:text-foreground transition-colors">{common.documentation}</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">{t.title}</li>
          </ol>
        </nav>

        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Code className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6 flex items-center gap-3">
            <FormInput className="h-7 w-7" />
            {t.loginForm}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t.loginFormDesc}
          </p>
          <CodeBlock code={loginFormCode} language="tsx" />

          <div className="mt-6 p-6 border rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-4">{t.livePreview}</p>
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
            {t.dashboardCards}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t.dashboardDesc}
          </p>
          <CodeBlock code={dashboardCode} language="tsx" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">{t.moreExamples}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/components">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.componentExamples}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.componentExamplesDesc}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/rtl-guide">
              <Card className="hover:border-primary transition-colors h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{t.rtlPatterns}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.rtlPatternsDesc}
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
