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

export default function LoginPage() {
  const { signIn } = useAuth()
  const { locale } = useDirection()
  const router = useRouter()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const text = {
    en: {
      title: 'Welcome back',
      description: 'Sign in to your account to continue',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In',
      signingIn: 'Signing in...',
      noAccount: "Don't have an account?",
      signUp: 'Sign up',
    },
    ar: {
      title: 'مرحباً بعودتك',
      description: 'سجّل الدخول إلى حسابك للمتابعة',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      signIn: 'تسجيل الدخول',
      signingIn: 'جاري تسجيل الدخول...',
      noAccount: 'ليس لديك حساب؟',
      signUp: 'إنشاء حساب',
    },
  }
  const t = text[locale]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: signInError } = await signIn(email, password)

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
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
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 me-2 animate-spin" />
                {t.signingIn}
              </>
            ) : (
              t.signIn
            )}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            {t.noAccount}{' '}
            <Link href="/auth/signup" className="text-primary hover:underline">
              {t.signUp}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
