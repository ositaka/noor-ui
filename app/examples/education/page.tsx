'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Callout } from '@/components/ui/callout'
import { GraduationCap, Eye, EyeSlash } from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { useRouter } from 'next/navigation'

const t = {
  en: {
    portalName: 'Noor Education Portal',
    portalNameAr: 'بوابة نور التعليمية',
    schoolName: 'Al Noor International School',
    schoolNameAr: 'مدرسة النور الدولية',
    location: 'Riyadh, Saudi Arabia',
    loginTitle: 'Sign in to your account',
    email: 'Email address',
    emailPlaceholder: 'student@alnoor.edu.sa',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign In',
    demoCredentials: 'Demo Credentials',
    demoDesc: 'Use these credentials to explore the portal:',
    demoEmailLabel: 'Email',
    demoPasswordLabel: 'Password',
    demoEmail: 'student@alnoor.edu.sa',
    demoPassword: 'demo2026',
    poweredBy: 'Powered by',
    noorSystem: 'Noor System',
    address: 'Al Olaya District, Riyadh 12251, Kingdom of Saudi Arabia',
    academicYear: 'Academic Year 2025-2026 / 1447-1448 AH',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
  },
  ar: {
    portalName: 'بوابة نور التعليمية',
    portalNameAr: 'Noor Education Portal',
    schoolName: 'مدرسة النور الدولية',
    schoolNameAr: 'Al Noor International School',
    location: 'الرياض، المملكة العربية السعودية',
    loginTitle: 'تسجيل الدخول إلى حسابك',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'student@alnoor.edu.sa',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    signIn: 'تسجيل الدخول',
    demoCredentials: 'بيانات تجريبية',
    demoDesc: 'استخدم هذه البيانات لاستكشاف البوابة:',
    demoEmailLabel: 'البريد',
    demoPasswordLabel: 'كلمة المرور',
    demoEmail: 'student@alnoor.edu.sa',
    demoPassword: 'demo2026',
    poweredBy: 'مدعوم من',
    noorSystem: 'نظام نور',
    address: 'حي العليا، الرياض ١٢٢٥١، المملكة العربية السعودية',
    academicYear: 'العام الدراسي ١٤٤٧-١٤٤٨ هـ / 2025-2026 م',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور',
  },
}

export default function EducationLoginPage() {
  const { locale } = useDirection()
  const h = t[locale]
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Direction toggle - top right */}
      <div className="absolute top-4 end-4 z-10">
        <DirectionToggle />
      </div>

      {/* Main content */}
      <main id="main-content" className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* School branding */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-4 bg-primary rounded-2xl">
              <GraduationCap className="h-12 w-12 text-primary-foreground" weight="duotone" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{h.schoolName}</h1>
              <p className="text-sm text-muted-foreground">{h.location}</p>
            </div>
          </div>

          {/* Login card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle>{h.loginTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); router.push('/examples/education/dashboard') }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{h.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    dir="ltr"
                    placeholder={h.emailPlaceholder}
                    defaultValue="student@alnoor.edu.sa"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{h.password}</Label>
                    <button
                      type="button"
                      className="text-xs text-primary hover:underline"
                      aria-disabled="true"
                      tabIndex={-1}
                    >
                      {h.forgotPassword}
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={h.passwordPlaceholder}
                      defaultValue="demo2026"
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
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" defaultChecked />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    {h.rememberMe}
                  </Label>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  {h.signIn}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo credentials callout */}
          <Callout type="info" title={h.demoCredentials}>
            <p>{h.demoDesc}</p>
            <div className="mt-2 space-y-1 font-mono text-xs">
              <p>{h.demoEmailLabel}: <span dir="ltr">{h.demoEmail}</span></p>
              <p>{h.demoPasswordLabel}: {h.demoPassword}</p>
            </div>
          </Callout>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-6">
        <div className="container text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {h.poweredBy}{' '}
            <span className="font-medium text-foreground">{h.noorSystem}</span>
          </p>
          <p className="text-xs text-muted-foreground">{h.address}</p>
          <p className="text-xs text-muted-foreground">{h.academicYear}</p>
        </div>
      </footer>
    </div>
  )
}
