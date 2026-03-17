'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Callout } from '@/components/ui/callout'
import { Bank, Eye, EyeSlash } from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { useRouter } from 'next/navigation'

const gt = {
  en: {
    bankName: 'Gulf Digital Bank',
    tagline: 'Your Digital-First Bank',
    loginTitle: 'Sign in to your account',
    emiratesId: 'Emirates ID',
    emiratesIdPlaceholder: '784-1988-1234567-2',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign In',
    demoCredentials: 'Demo Credentials',
    demoDesc: 'Use these to explore:',
    demoIdLabel: 'ID',
    demoPasswordLabel: 'Password',
    demoId: '784-1988-1234567-2',
    demoPassword: 'demo2026',
    footer: 'Gulf Digital Bank — UI Demo · Fictional banking experience',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    required: 'This field is required',
    invalidId: 'Emirates ID must start with 784',
    invalidIdFormat: 'Invalid format. Expected: 784-XXXX-XXXXXXX-X',
  },
  ar: {
    bankName: 'بنك الخليج الرقمي',
    tagline: 'مصرفك الرقمي الأول',
    loginTitle: 'تسجيل الدخول إلى حسابك',
    emiratesId: 'الهوية الإماراتية',
    emiratesIdPlaceholder: '784-1988-1234567-2',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    signIn: 'تسجيل الدخول',
    demoCredentials: 'بيانات تجريبية',
    demoDesc: 'استخدم هذه البيانات للاستكشاف:',
    demoIdLabel: 'الهوية',
    demoPasswordLabel: 'كلمة المرور',
    demoId: '784-1988-1234567-2',
    demoPassword: 'demo2026',
    footer: 'بنك الخليج الرقمي — عرض توضيحي · تجربة مصرفية خيالية',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور',
    required: 'هذا الحقل مطلوب',
    invalidId: 'يجب أن تبدأ الهوية الإماراتية بـ 784',
    invalidIdFormat: 'صيغة غير صحيحة. المتوقع: 784-XXXX-XXXXXXX-X',
  },
}

export default function BankingLoginPage() {
  const { locale } = useDirection()
  const h = gt[locale]
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const validate = (id: string, password: string) => {
    const e: Record<string, string> = {}
    if (!id.trim()) {
      e.id = h.required
    } else if (!id.startsWith('784')) {
      e.id = h.invalidId
    } else if (!/^784-\d{4}-\d{7}-\d$/.test(id.trim())) {
      e.id = h.invalidIdFormat
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
    const id = (form.elements.namedItem('emirates-id') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    if (!validate(id, password)) return
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    router.push('/examples/banking/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30 relative">
      {/* Geometric pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M40 0L20 20h40L40 0zM0 40l20-20v40L0 40zm80 0L60 20v40l20-20zM40 80l20-20H20l20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Direction toggle */}
      <div className="absolute top-4 end-4 z-10">
        <DirectionToggle />
      </div>

      {/* Main content */}
      <main id="main-content" className="flex-1 flex items-center justify-center p-4 relative z-[1]">
        <div className="w-full max-w-sm space-y-6">
          {/* Bank branding */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 bg-primary rounded-2xl">
              <Bank className="h-10 w-10 text-primary-foreground" weight="duotone" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{h.bankName}</h1>
              <p className="text-sm text-muted-foreground">{h.tagline}</p>
            </div>
          </div>

          {/* Login card */}
          <Card>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg">{h.loginTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="emirates-id">{h.emiratesId}</Label>
                  <Input
                    id="emirates-id"
                    name="emirates-id"
                    dir="ltr"
                    placeholder={h.emiratesIdPlaceholder}
                    defaultValue="784-1988-1234567-2"
                    className={errors.id ? 'border-destructive' : ''}
                    aria-invalid={!!errors.id}
                    aria-describedby={errors.id ? 'id-error' : undefined}
                  />
                  {errors.id && (
                    <p id="id-error" className="text-sm text-destructive">{errors.id}</p>
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
                <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
                  {h.signIn}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo credentials — compact */}
          <Callout type="info" title={h.demoCredentials}>
            <p className="text-sm">{h.demoDesc} <span dir="ltr" className="font-mono text-xs">{h.demoId}</span> / <span className="font-mono text-xs">{h.demoPassword}</span></p>
          </Callout>
        </div>
      </main>

      {/* Footer — single line */}
      <footer className="py-4 relative z-[1]">
        <p className="text-center text-xs text-muted-foreground">{h.footer}</p>
      </footer>
    </div>
  )
}
