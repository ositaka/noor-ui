'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/starters/blog-dashboard/hooks/use-auth'
import { useDirection } from '@/components/providers/direction-provider'
import { DashboardShell } from '@/components/ui/dashboard-shell'
import { FileText, Plus, Settings, Home } from 'lucide-react'
import type { Notification } from '@/components/ui/notification-center'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth()
  const { locale } = useDirection()
  const router = useRouter()

  const [notifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'Welcome to Noor UI Blog!',
      titleAr: 'مرحباً بك في مدونة نور!',
      message: 'Start creating your first blog post',
      messageAr: 'ابدأ بإنشاء أول مقالة لك',
      type: 'info',
      read: false,
      timestamp: new Date().toISOString(),
    },
  ])

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {locale === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const text = {
    en: {
      dashboard: 'Dashboard',
      posts: 'Posts',
      newPost: 'New Post',
      settings: 'Settings',
    },
    ar: {
      dashboard: 'لوحة التحكم',
      posts: 'المقالات',
      newPost: 'مقالة جديدة',
      settings: 'الإعدادات',
    },
  }
  const t = text[locale]

  const navItems = [
    {
      title: t.dashboard,
      titleAr: text.ar.dashboard,
      href: '/dashboard',
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: t.posts,
      titleAr: text.ar.posts,
      href: '/dashboard/posts',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: t.newPost,
      titleAr: text.ar.newPost,
      href: '/dashboard/posts/new',
      icon: <Plus className="h-5 w-5" />,
    },
    {
      title: t.settings,
      titleAr: text.ar.settings,
      href: '/dashboard/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <DashboardShell
      navItems={navItems}
      user={{
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email,
      }}
      notifications={notifications}
      onProfileClick={() => router.push('/dashboard/profile')}
      onSettingsClick={() => router.push('/dashboard/settings')}
      onLogout={signOut}
      logo={<span className="text-xl font-bold">{locale === 'ar' ? 'نور' : 'Noor UI'}</span>}
      logoHref="/dashboard"
    >
      {children}
    </DashboardShell>
  )
}
