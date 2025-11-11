'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/starters/blog-dashboard/hooks/use-auth'
import { useDirection } from '@/components/providers/direction-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function SignUpPage() {
  const { signUp } = useAuth()
  const { locale } = useDirection()
  const router = useRouter()

  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const text = {
    en: {
      title: 'Create an account',
      description: 'Enter your details to get started with Noor UI Blog',
      fullName: 'Full Name',
      email: 'Email',
      password: 'Password',
      signUp: 'Sign Up',
      signingUp: 'Signing up...',
      haveAccount: 'Already have an account?',
      signIn: 'Sign in',
      success: 'Account created successfully! Check your email to confirm your account.',
      goToDashboard: 'Go to Dashboard',
    },
    ar: {
      title: 'إنشاء حساب',
      description: 'أدخل بياناتك للبدء مع مدونة نور',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      signUp: 'إنشاء حساب',
      signingUp: 'جاري إنشاء الحساب...',
      haveAccount: 'هل لديك حساب بالفعل؟',
      signIn: 'تسجيل الدخول',
      success: 'تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني لتأكيد حسابك.',
      goToDashboard: 'الذهاب إلى لوحة التحكم',
    },
  }
  const t = text[locale]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: signUpError } = await signUp(email, password, fullName)

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    }
  }

  if (success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>{t.success}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={() => router.push('/dashboard')} className="w-full">
            {t.goToDashboard}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">{t.fullName}</Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t.password}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 me-2 animate-spin" />
                {t.signingUp}
              </>
            ) : (
              t.signUp
            )}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            {t.haveAccount}{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              {t.signIn}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
