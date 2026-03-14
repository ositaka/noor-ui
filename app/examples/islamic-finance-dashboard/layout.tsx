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
  Wallet,
  House,
  CurrencyDollar,
  ChartLineUp,
  Calculator,
  MagnifyingGlass,
  Gear,
  User,
} from '@phosphor-icons/react'

const fi = {
  en: {
    appName: 'Noor Finance',
    search: 'Search...',
    noResults: 'No results found.',
    navigation: 'Navigation',
    overview: 'Overview',
    transactions: 'Transactions',
    investments: 'Investments',
    zakatCalc: 'Zakat Calculator',
    zakatDue: 'Zakat Due',
    zakatDueDesc: 'Your annual Zakat payment is due this month.',
    profitShare: 'Profit Share',
    profitShareDesc: 'Mudarabah profit share of SAR 1,250 received.',
    profile: 'Profile',
    settings: 'Settings',
    supportComingSoon: 'Support page coming soon',
  },
  ar: {
    appName: 'نور المالية',
    search: 'ابحث...',
    noResults: 'لا توجد نتائج.',
    navigation: 'التنقل',
    overview: 'نظرة عامة',
    transactions: 'المعاملات',
    investments: 'الاستثمارات',
    zakatCalc: 'حاسبة الزكاة',
    zakatDue: 'الزكاة مستحقة',
    zakatDueDesc: 'دفع الزكاة السنوية مستحق هذا الشهر.',
    profitShare: 'حصة الأرباح',
    profitShareDesc: 'تم استلام حصة أرباح المضاربة ١,٢٥٠ ريال.',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    supportComingSoon: 'صفحة الدعم قريباً',
  },
}

const navItems = [
  { title: 'Overview', titleAr: 'نظرة عامة', href: '/examples/islamic-finance-dashboard', icon: <House className="h-5 w-5" /> },
  { title: 'Profile', titleAr: 'الملف الشخصي', href: '/examples/islamic-finance-dashboard/profile', icon: <User className="h-5 w-5" /> },
  { title: 'Settings', titleAr: 'الإعدادات', href: '/examples/islamic-finance-dashboard/settings', icon: <Gear className="h-5 w-5" /> },
]

export default function IslamicFinanceLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useDirection()
  const router = useRouter()
  const [commandOpen, setCommandOpen] = React.useState(false)
  const t = fi[locale]

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
      title: t.zakatDue,
      description: t.zakatDueDesc,
      type: 'warning' as const,
      time: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: '2',
      title: t.profitShare,
      description: t.profitShareDesc,
      type: 'success' as const,
      time: new Date(Date.now() - 86400000).toISOString(),
      read: true,
    },
  ]

  return (
    <DashboardShell
      navItems={navItems}
      logo={
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold">{t.appName}</span>
        </div>
      }
      logoHref="/examples/islamic-finance-dashboard"
      user={{
        name: locale === 'ar' ? 'عبدالرحمن الشمري' : 'Abdulrahman Al Shammari',
        email: 'abdulrahman@email.com',
        initials: 'AS',
      }}
      notifications={notifications}
      onNotificationClick={(n) => toast({ title: n.title, description: n.description })}
      onProfileClick={() => router.push('/examples/islamic-finance-dashboard/profile')}
      onSettingsClick={() => router.push('/examples/islamic-finance-dashboard/settings')}
      onSupportClick={() => toast({ title: t.supportComingSoon })}
      onLogout={() => router.push('/examples')}
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
        </CommandList>
      </CommandDialog>
      <Toaster />
    </DashboardShell>
  )
}
