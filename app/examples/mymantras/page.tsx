'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Callout } from '@/components/ui/callout'
import { FlowerLotus, Eye, EyeSlash } from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { useRouter } from 'next/navigation'

const gt = {
  en: {
    brand: 'MyMantras',
    tagline: 'Your Daily Wisdom Companion',
    loginTitle: 'Sign in to your account',
    email: 'Email',
    emailPlaceholder: 'layla@mymantras.demo',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign In',
    demoCredentials: 'Demo Credentials',
    demoDesc: 'Use these to explore:',
    demoEmail: 'layla@mymantras.demo',
    demoPassword: 'demo2026',
    footer: 'MyMantras — UI Demo · Fictional spiritual wellness experience',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
  },
  ar: {
    brand: 'تأملاتي',
    tagline: 'رفيقك اليومي للحكمة',
    loginTitle: 'تسجيل الدخول إلى حسابك',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'layla@mymantras.demo',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    signIn: 'تسجيل الدخول',
    demoCredentials: 'بيانات تجريبية',
    demoDesc: 'استخدم هذه البيانات للاستكشاف:',
    demoEmail: 'layla@mymantras.demo',
    demoPassword: 'demo2026',
    footer: 'تأملاتي — عرض توضيحي · تجربة عافية روحية خيالية',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور',
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
  },
}

export default function MyMantrasLoginPage() {
  const { locale } = useDirection()
  const h = gt[locale]
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validate = (email: string, password: string) => {
    const e: Record<string, string> = {}
    if (!email.trim()) {
      e.email = h.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = h.invalidEmail
    }
    if (!password.trim()) {
      e.password = h.required
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    if (!validate(email, password)) return
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    router.push('/examples/mymantras/home')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background bg-sanctuary relative">
      {/* Sacred geometry — 8-pointed star arabesque pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='currentColor' stroke-width='0.5' opacity='0.8'%3E%3Cpolygon points='40,8 47,20 60,13 53,27 67,27 53,33 60,47 47,40 40,53 33,40 20,47 27,33 13,33 27,27 20,13 33,20' transform='translate(0,0)'/%3E%3Ccircle cx='40' cy='40' r='18'/%3E%3Ccircle cx='40' cy='40' r='6'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Direction toggle */}
      <div className="absolute top-4 end-4 z-10">
        <DirectionToggle />
      </div>

      {/* Main content */}
      <main id="main-content" className="flex-1 flex items-center justify-center p-4 relative z-[1]">
        <div className="w-full max-w-sm space-y-6">
          {/* Branding */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-4 bg-primary rounded-2xl glow-primary">
              <FlowerLotus className="h-12 w-12 text-primary-foreground" weight="duotone" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold">{h.brand}</h1>
              <p className="text-sm text-muted-foreground font-body-serif italic">{h.tagline}</p>
            </div>
          </div>

          {/* Login card — subtle glassmorphism */}
          <Card className="backdrop-blur-sm bg-card/80 border-border/50">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg font-body-serif">{h.loginTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="email">{h.email}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    dir="ltr"
                    placeholder={h.emailPlaceholder}
                    defaultValue="layla@mymantras.demo"
                    className={errors.email ? 'border-destructive' : ''}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{h.password}</Label>
                    <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {h.forgotPassword}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={h.passwordPlaceholder}
                      defaultValue="demo2026"
                      className={errors.password ? 'border-destructive' : ''}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'pw-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 min-h-6 min-w-6 flex items-center justify-center"
                      aria-label={showPassword ? h.hidePassword : h.showPassword}
                    >
                      {showPassword
                        ? <EyeSlash className="h-4 w-4" />
                        : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="pw-error" className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>
                <Button type="submit" className="w-full glow-primary" size="lg" loading={isSubmitting}>
                  {h.signIn}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo credentials */}
          <Callout type="info" title={h.demoCredentials}>
            <p className="text-sm">{h.demoDesc} <span dir="ltr" className="font-mono text-xs">{h.demoEmail}</span> / <span className="font-mono text-xs">{h.demoPassword}</span></p>
          </Callout>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 relative z-[1]">
        <p className="text-center text-xs text-muted-foreground">{h.footer}</p>
      </footer>
    </div>
  )
}
