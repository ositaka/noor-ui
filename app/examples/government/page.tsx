'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Callout } from '@/components/ui/callout'
import { Shield, Eye, EyeSlash, Fingerprint } from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { useRouter } from 'next/navigation'

const t = {
  en: {
    portalName: 'Noor Gov Portal',
    portalNameAr: 'بوابة النور الحكومية',
    subtitle: 'Digital Government Services',
    subtitleAr: 'خدمات حكومية رقمية',
    loginTitle: 'Sign in to your account',
    nationalId: 'National ID',
    nationalIdPlaceholder: '784-1990-1234567-1',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    rememberDevice: 'Remember this device',
    forgotPassword: 'Forgot password?',
    signInDigitalId: 'Sign in with Digital ID',
    signInPassword: 'Sign in with Password',
    orDivider: 'or',
    demoCredentials: 'Demo Credentials',
    demoDesc: 'Use these credentials to explore the portal:',
    demoIdLabel: 'National ID',
    demoPasswordLabel: 'Password',
    demoId: '784-1990-1234567-1',
    demoPassword: 'demo2026',
    copyright: 'Noor Gov Portal — UI Demo',
    hijriYear: '2026 AD / 1447 AH',
    allRightsReserved: 'This is a fictional demo, not a real government service',
    securePortal: 'Secure portal protected by digital identity verification',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
  },
  ar: {
    portalName: 'بوابة النور الحكومية',
    portalNameAr: 'Noor Gov Portal',
    subtitle: 'خدمات حكومية رقمية',
    subtitleAr: 'Digital Government Services',
    loginTitle: 'تسجيل الدخول إلى حسابك',
    nationalId: 'الهوية الوطنية',
    nationalIdPlaceholder: '784-1990-1234567-1',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    rememberDevice: 'تذكر هذا الجهاز',
    forgotPassword: 'نسيت كلمة المرور؟',
    signInDigitalId: 'تسجيل الدخول بالهوية الرقمية',
    signInPassword: 'تسجيل الدخول بكلمة المرور',
    orDivider: 'أو',
    demoCredentials: 'بيانات تجريبية',
    demoDesc: 'استخدم هذه البيانات لاستكشاف البوابة:',
    demoIdLabel: 'الهوية',
    demoPasswordLabel: 'كلمة المرور',
    demoId: '784-1990-1234567-1',
    demoPassword: 'demo2026',
    copyright: 'بوابة النور الحكومية — عرض توضيحي',
    hijriYear: '٢٠٢٦ م / ١٤٤٧ هـ',
    allRightsReserved: 'هذا عرض توضيحي وليس خدمة حكومية حقيقية',
    securePortal: 'بوابة آمنة محمية بالتحقق من الهوية الرقمية',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور',
  },
}

export default function GovernmentLoginPage() {
  const { locale } = useDirection()
  const h = t[locale]
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-muted/30 relative">
      {/* Geometric pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Direction toggle */}
      <div className="absolute top-4 end-4 z-10">
        <DirectionToggle />
      </div>

      {/* Main content */}
      <main id="main-content" className="flex-1 flex items-center justify-center p-4 relative z-[1]">
        <div className="w-full max-w-md space-y-6">
          {/* Portal branding */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-4 bg-primary rounded-2xl">
              <Shield className="h-12 w-12 text-primary-foreground" weight="duotone" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{h.portalName}</h1>
              <p className="text-sm text-muted-foreground">{h.subtitle}</p>
            </div>
          </div>

          {/* Login card */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle>{h.loginTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Digital ID button */}
              <Button
                type="button"
                className="w-full mb-4"
                size="lg"
                onClick={() => router.push('/examples/government/dashboard')}
              >
                <Fingerprint className="h-5 w-5 me-2" weight="bold" aria-hidden="true" />
                {h.signInDigitalId}
              </Button>

              {/* Divider */}
              <div className="relative my-6" role="separator" aria-hidden="true">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">{h.orDivider}</span>
                </div>
              </div>

              {/* Password form */}
              <form onSubmit={(e) => { e.preventDefault(); router.push('/examples/government/dashboard') }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="national-id">{h.nationalId}</Label>
                  <Input
                    id="national-id"
                    dir="ltr"
                    placeholder={h.nationalIdPlaceholder}
                    defaultValue="784-1990-1234567-1"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{h.password}</Label>
                    <span className="text-xs text-muted-foreground">
                      {h.forgotPassword}
                    </span>
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
                    {h.rememberDevice}
                  </Label>
                </div>
                <Button type="submit" variant="outline" className="w-full" size="lg">
                  {h.signInPassword}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo credentials */}
          <Callout type="info" title={h.demoCredentials}>
            <p>{h.demoDesc}</p>
            <div className="mt-2 space-y-1 font-mono text-xs">
              <p>{h.demoIdLabel}: <span dir="ltr">{h.demoId}</span></p>
              <p>{h.demoPasswordLabel}: {h.demoPassword}</p>
            </div>
          </Callout>

        </div>
      </main>

      {/* Footer — single line */}
      <footer className="py-4 relative z-[1]">
        <p className="text-center text-xs text-muted-foreground">&copy; {h.copyright} &middot; {h.allRightsReserved}</p>
      </footer>
    </div>
  )
}
