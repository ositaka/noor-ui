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
  Bank,
  House,
  ArrowsLeftRight,
  PaperPlaneTilt,
  Receipt,
  CreditCard,
  MagnifyingGlass,
  CurrencyDollar,
  Lightning,
  Snowflake,
} from '@phosphor-icons/react'

const gt = {
  en: {
    bankName: 'Gulf Digital',
    search: 'Search...',
    noResults: 'No results found.',
    navigation: 'Navigation',
    quickActions: 'Quick Actions',
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    transfer: 'Transfer',
    bills: 'Bills',
    cards: 'Cards',
    transferMoney: 'Transfer Money',
    payBill: 'Pay a Bill',
    freezeCard: 'Freeze Card',
    paymentDue: 'Credit Card Payment Due',
    paymentDueDesc: 'Your Visa ****4532 payment of AED 2,150 is due in 3 days.',
    transferReceived: 'Transfer Received',
    transferReceivedDesc: 'You received AED 5,000 from Mohammed Hassan.',
    securityUpdate: 'Security Update',
    securityUpdateDesc: 'New biometric login option is now available for your account.',
    profileSoon: 'Profile page coming soon',
    supportSoon: 'Support page coming soon',
  },
  ar: {
    bankName: 'الخليج الرقمي',
    search: 'ابحث...',
    noResults: 'لا توجد نتائج.',
    navigation: 'التنقل',
    quickActions: 'إجراءات سريعة',
    dashboard: 'لوحة التحكم',
    transactions: 'المعاملات',
    transfer: 'التحويلات',
    bills: 'الفواتير',
    cards: 'البطاقات',
    transferMoney: 'تحويل أموال',
    payBill: 'دفع فاتورة',
    freezeCard: 'تجميد البطاقة',
    paymentDue: 'دفعة بطاقة الائتمان مستحقة',
    paymentDueDesc: 'دفعة بطاقة فيزا ****٤٥٣٢ بقيمة ٢٬١٥٠ د.إ مستحقة خلال ٣ أيام.',
    transferReceived: 'تحويل مستلم',
    transferReceivedDesc: 'استلمت ٥٬٠٠٠ د.إ من محمد حسن.',
    securityUpdate: 'تحديث أمني',
    securityUpdateDesc: 'خيار تسجيل الدخول بالبصمة متاح الآن لحسابك.',
    profileSoon: 'صفحة الملف الشخصي قريباً',
    supportSoon: 'صفحة الدعم قريباً',
  },
}

const navItems = [
  { title: 'Dashboard', titleAr: 'لوحة التحكم', href: '/examples/banking/dashboard', icon: <House className="h-5 w-5" /> },
  { title: 'Transactions', titleAr: 'المعاملات', href: '/examples/banking/transactions', icon: <ArrowsLeftRight className="h-5 w-5" /> },
  { title: 'Transfer', titleAr: 'التحويلات', href: '/examples/banking/transfer', icon: <PaperPlaneTilt className="h-5 w-5" /> },
  { title: 'Bills', titleAr: 'الفواتير', href: '/examples/banking/bills', icon: <Receipt className="h-5 w-5" />, badge: '3' },
  { title: 'Cards', titleAr: 'البطاقات', href: '/examples/banking/cards', icon: <CreditCard className="h-5 w-5" /> },
]

export default function BankingLayout({ children }: { children: React.ReactNode }) {
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
      title: t.paymentDue,
      description: t.paymentDueDesc,
      type: 'warning' as const,
      time: new Date(Date.now() - 1800000).toISOString(),
      read: false,
    },
    {
      id: '2',
      title: t.transferReceived,
      description: t.transferReceivedDesc,
      type: 'success' as const,
      time: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: '3',
      title: t.securityUpdate,
      description: t.securityUpdateDesc,
      type: 'info' as const,
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
            <Bank className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold">{t.bankName}</span>
        </div>
      }
      logoHref="/examples/banking/dashboard"
      user={{
        name: locale === 'ar' ? 'خالد سعيد المهيري' : 'Khaled Saeed Al Muhairi',
        email: 'khaled@gulfdigi.demo',
        initials: 'KM',
      }}
      notifications={notifications}
      onNotificationClick={(n) => toast({ title: n.title, description: n.description })}
      onProfileClick={() => toast({ title: t.profileSoon })}
      onSettingsClick={() => router.push('/examples/banking/settings')}
      onSupportClick={() => toast({ title: t.supportSoon })}
      onLogout={() => router.push('/examples/banking')}
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
                router.push('/examples/banking/transfer')
                setCommandOpen(false)
              }}
            >
              <CurrencyDollar className="h-5 w-5" />
              <span className="ms-2">{t.transferMoney}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/examples/banking/bills')
                setCommandOpen(false)
              }}
            >
              <Lightning className="h-5 w-5" />
              <span className="ms-2">{t.payBill}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/examples/banking/cards')
                setCommandOpen(false)
              }}
            >
              <Snowflake className="h-5 w-5" />
              <span className="ms-2">{t.freezeCard}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <Toaster />
    </DashboardShell>
  )
}
