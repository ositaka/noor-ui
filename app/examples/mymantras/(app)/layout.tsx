'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { DashboardShell } from '@/components/ui/dashboard-shell'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { Kbd } from '@/components/ui/kbd'
import { Toaster } from '@/components/ui/toaster'
import { toast } from '@/hooks/use-toast'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { useDirection } from '@/components/providers/direction-provider'
import {
  FlowerLotus,
  House,
  ChartPie,
  Sparkle,
  Books,
  Heart,
  GearSix,
  MagnifyingGlass,
  Lightning,
  Star,
  UserCircle,
} from '@phosphor-icons/react'

const gt = {
  en: {
    brand: 'MyMantras',
    search: 'Search...',
    noResults: 'No results found.',
    navigation: 'Navigation',
    quickActions: 'Quick Actions',
    home: 'Home',
    dashboard: 'Dashboard',
    mantras: 'Mantra Generator',
    collections: 'Collections',
    favorites: 'Favorites',
    settings: 'Settings',
    generateMantras: 'Generate Mantras',
    viewFavorites: 'View Favorites',
    updateProfile: 'Update HD Profile',
    newQuote: 'New Daily Quote Available',
    newQuoteDesc: 'A fresh quote is waiting for you to start your day.',
    mantrasReady: 'Mantras Generated',
    mantrasReadyDesc: 'Your personalized mantra set on Self-Worth is ready to view.',
    profileIncomplete: 'HD Profile Incomplete',
    profileIncompleteDesc: 'Complete your Human Design profile to unlock personalized mantras.',
    profileSoon: 'Profile page coming soon',
    supportSoon: 'Support page coming soon',
    badgeNew: 'New',
  },
  ar: {
    brand: 'تأملاتي',
    search: 'ابحث...',
    noResults: 'لا توجد نتائج.',
    navigation: 'التنقل',
    quickActions: 'إجراءات سريعة',
    home: 'الرئيسية',
    dashboard: 'لوحة التحكم',
    mantras: 'مولّد التأملات',
    collections: 'المجموعات',
    favorites: 'المفضلة',
    settings: 'الإعدادات',
    generateMantras: 'إنشاء تأملات',
    viewFavorites: 'عرض المفضلة',
    updateProfile: 'تحديث ملف التصميم البشري',
    newQuote: 'اقتباس يومي جديد متاح',
    newQuoteDesc: 'اقتباس جديد ينتظرك لبدء يومك.',
    mantrasReady: 'تم إنشاء التأملات',
    mantrasReadyDesc: 'مجموعة التأملات المخصصة عن تقدير الذات جاهزة للعرض.',
    profileIncomplete: 'ملف التصميم البشري غير مكتمل',
    profileIncompleteDesc: 'أكمل ملف التصميم البشري لفتح التأملات المخصصة.',
    profileSoon: 'صفحة الملف الشخصي قريباً',
    supportSoon: 'صفحة الدعم قريباً',
    badgeNew: 'جديد',
  },
}

const navItems = [
  { title: 'Home', titleAr: 'الرئيسية', href: '/examples/mymantras/home', icon: <House className="h-5 w-5" /> },
  { title: 'Dashboard', titleAr: 'لوحة التحكم', href: '/examples/mymantras/dashboard', icon: <ChartPie className="h-5 w-5" /> },
  { title: 'Mantra Generator', titleAr: 'مولّد التأملات', href: '/examples/mymantras/mantras', icon: <Sparkle className="h-5 w-5" />, badge: 'New' },
  { title: 'Collections', titleAr: 'المجموعات', href: '/examples/mymantras/collections', icon: <Books className="h-5 w-5" /> },
  { title: 'Favorites', titleAr: 'المفضلة', href: '/examples/mymantras/favorites', icon: <Heart className="h-5 w-5" /> },
  { title: 'Settings', titleAr: 'الإعدادات', href: '/examples/mymantras/settings', icon: <GearSix className="h-5 w-5" /> },
]

export default function MyMantrasLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useDirection()
  const router = useRouter()
  const [commandOpen, setCommandOpen] = React.useState(false)
  const t = gt[locale]

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const notifications = [
    {
      id: '1',
      title: t.newQuote,
      description: t.newQuoteDesc,
      type: 'info' as const,
      time: new Date(Date.now() - 1800000).toISOString(),
      read: false,
    },
    {
      id: '2',
      title: t.mantrasReady,
      description: t.mantrasReadyDesc,
      type: 'success' as const,
      time: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: '3',
      title: t.profileIncomplete,
      description: t.profileIncompleteDesc,
      type: 'warning' as const,
      time: new Date(Date.now() - 7200000).toISOString(),
      read: true,
    },
  ]

  return (
    <DashboardShell
      navItems={navItems}
      logo={
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <FlowerLotus className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold font-display">{t.brand}</span>
        </div>
      }
      logoHref="/examples/mymantras/home"
      user={{
        name: locale === 'ar' ? 'ليلى الشمسي' : 'Layla Al Shamsi',
        email: 'layla@mymantras.demo',
        image: '/examples/mymantras/avatar.jpg',
        initials: 'LS',
      }}
      notifications={notifications}
      onNotificationClick={(n) => toast({ title: n.title, description: n.description })}
      onProfileClick={() => toast({ title: t.profileSoon })}
      onSettingsClick={() => router.push('/examples/mymantras/settings')}
      onSupportClick={() => toast({ title: t.supportSoon })}
      onLogout={() => router.push('/examples/mymantras')}
      headerActions={
        <>
          <button
            onClick={() => setCommandOpen(true)}
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground border rounded-md px-3 py-1.5 hover:bg-accent transition-colors"
          >
            <MagnifyingGlass className="h-4 w-4" />
            <span>{t.search}</span>
            <Kbd keys={['mod', 'k']} />
          </button>
          <DirectionToggle />
        </>
      }
    >
      {children}

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder={t.search} />
        <CommandList>
          <CommandEmpty>{t.noResults}</CommandEmpty>
          <CommandGroup heading={t.navigation}>
            {navItems.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => {
                  router.push(item.href)
                  setCommandOpen(false)
                }}
              >
                {item.icon}
                <span className="ms-2">{locale === 'ar' ? item.titleAr : item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading={t.quickActions}>
            <CommandItem
              onSelect={() => {
                router.push('/examples/mymantras/mantras')
                setCommandOpen(false)
              }}
            >
              <Lightning className="h-5 w-5" />
              <span className="ms-2">{t.generateMantras}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/examples/mymantras/favorites')
                setCommandOpen(false)
              }}
            >
              <Star className="h-5 w-5" />
              <span className="ms-2">{t.viewFavorites}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/examples/mymantras/settings')
                setCommandOpen(false)
              }}
            >
              <UserCircle className="h-5 w-5" />
              <span className="ms-2">{t.updateProfile}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <Toaster />
    </DashboardShell>
  )
}
