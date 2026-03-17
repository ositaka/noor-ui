'use client'

import * as React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Callout } from '@/components/ui/callout'
import { Separator } from '@/components/ui/separator'
import { Bed, Eye, EyeSlash, EnvelopeSimple, GoogleLogo, AppleLogo } from '@phosphor-icons/react'
import { useDirection } from '@/components/providers/direction-provider'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { useRouter } from 'next/navigation'

const t = {
  en: {
    brand: 'Nuzul',
    tagline: 'Your Gateway to Gulf Hospitality',
    taglineAr: 'بوابتك للضيافة الخليجية',
    loginTitle: 'Welcome back',
    loginSubtitle: 'Sign in to manage your reservations',
    email: 'Email',
    emailPlaceholder: 'faysa@example.com',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign In',
    orContinueWith: 'or continue with',
    noAccount: "Don't have an account?",
    signUp: 'Create Account',
    demoCredentials: 'Demo Credentials',
    demoDesc: 'Use these credentials to explore the platform:',
    demoEmailLabel: 'Email',
    demoPasswordLabel: 'Password',
    demoEmail: 'faysa@nuzul.demo',
    demoPassword: 'demo2026',
    secureNote: 'Your data is encrypted and secure',
    copyright: 'Nuzul — Hotel Booking Platform Demo',
    hijriYear: '2026 AD / 1447 AH',
    disclaimer: 'This is a fictional demo, not a real booking platform',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    trustStat1: '200+ Hotels',
    trustStat2: '50K+ Reviews',
    trustStat3: '15 Cities',
  },
  ar: {
    brand: 'نزل',
    tagline: 'بوابتك للضيافة الخليجية',
    taglineAr: 'Your Gateway to Gulf Hospitality',
    loginTitle: 'أهلاً بعودتك',
    loginSubtitle: 'سجّل الدخول لإدارة حجوزاتك',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'faysa@example.com',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    signIn: 'تسجيل الدخول',
    orContinueWith: 'أو تابع باستخدام',
    noAccount: 'ليس لديك حساب؟',
    signUp: 'إنشاء حساب',
    demoCredentials: 'بيانات تجريبية',
    demoDesc: 'استخدم هذه البيانات لاستكشاف المنصة:',
    demoEmailLabel: 'البريد',
    demoPasswordLabel: 'كلمة المرور',
    demoEmail: 'faysa@nuzul.demo',
    demoPassword: 'demo2026',
    secureNote: 'بياناتك مشفرة وآمنة',
    copyright: 'نزل — عرض توضيحي لمنصة حجز فنادق',
    hijriYear: '٢٠٢٦ م / ١٤٤٧ هـ',
    disclaimer: 'هذا عرض توضيحي وليس منصة حجز حقيقية',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور',
    trustStat1: '+٢٠٠ فندق',
    trustStat2: '+٥٠ ألف تقييم',
    trustStat3: '١٥ مدينة',
  },
}

export default function HotelLoginPage() {
  const { locale } = useDirection()
  const h = t[locale]
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/examples/hotel/hero.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Direction toggle */}
      <div className="absolute top-4 end-4 z-10">
        <DirectionToggle />
      </div>

      {/* Main content */}
      <main id="main-content" className="flex-1 flex items-center justify-center p-4 relative z-[1]">
        <div className="w-full max-w-md space-y-6">
          {/* Brand */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-4 bg-primary rounded-2xl">
              <Bed className="h-12 w-12 text-primary-foreground" weight="duotone" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">{h.brand}</h1>
              <p className="text-sm text-white/70">{h.tagline}</p>
            </div>
          </div>

          {/* Trust stats */}
          <div className="flex justify-center gap-6 text-white/80 text-xs">
            <span>{h.trustStat1}</span>
            <span className="text-white/50">|</span>
            <span>{h.trustStat2}</span>
            <span className="text-white/50">|</span>
            <span>{h.trustStat3}</span>
          </div>

          {/* Login card */}
          <Card>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">{h.loginTitle}</CardTitle>
              <p className="text-sm text-muted-foreground">{h.loginSubtitle}</p>
            </CardHeader>
            <CardContent>
              {/* Social login buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/examples/hotel/home')}
                >
                  <GoogleLogo className="h-4 w-4 me-2" weight="bold" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/examples/hotel/home')}
                >
                  <AppleLogo className="h-4 w-4 me-2" weight="bold" />
                  Apple
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">{h.orContinueWith}</span>
                </div>
              </div>

              {/* Login form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  router.push('/examples/hotel/home')
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">{h.email}</Label>
                  <div className="relative">
                    <EnvelopeSimple className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      dir="ltr"
                      placeholder={h.emailPlaceholder}
                      defaultValue="faysa@nuzul.demo"
                      className="ps-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{h.password}</Label>
                    <button type="button" className="text-xs text-primary hover:underline">
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

              {/* Sign up link */}
              <p className="text-center text-sm text-muted-foreground mt-4">
                {h.noAccount}{' '}
                <button
                  type="button"
                  onClick={() => router.push('/examples/hotel/home')}
                  className="text-primary font-medium hover:underline"
                >
                  {h.signUp}
                </button>
              </p>
            </CardContent>
          </Card>

          {/* Demo credentials */}
          <Callout type="info" title={h.demoCredentials} className="bg-background/95 backdrop-blur">
            <p>{h.demoDesc}</p>
            <div className="mt-2 space-y-1 font-mono text-xs">
              <p>{h.demoEmailLabel}: <span dir="ltr">{h.demoEmail}</span></p>
              <p>{h.demoPasswordLabel}: {h.demoPassword}</p>
            </div>
          </Callout>

        </div>
      </main>

      {/* Footer — single line */}
      <footer className="py-4 relative z-[1]">
        <p className="text-center text-xs text-white/50">&copy; {h.copyright} &middot; {h.disclaimer}</p>
      </footer>
    </div>
  )
}
