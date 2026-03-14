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
  Storefront,
  House,
  ShoppingCart,
  Package,
  Receipt,
  ChartLineUp,
  MagnifyingGlass,
  Gear,
} from '@phosphor-icons/react'

const mk = {
  en: {
    storeName: 'Noor Market',
    search: 'Search...',
    noResults: 'No results found.',
    navigation: 'Navigation',
    browse: 'Browse',
    cart: 'Cart',
    orders: 'Orders',
    dashboard: 'Vendor Dashboard',
    checkout: 'Checkout',
    newOrder: 'New Order',
    newOrderDesc: 'You have a new order from Ahmed Al Mansouri.',
    lowStock: 'Low Stock Alert',
    lowStockDesc: 'Smart Watch has only 8 units remaining.',
    settings: 'Settings',
    profileComingSoon: 'Profile page coming soon',
    supportComingSoon: 'Support page coming soon',
  },
  ar: {
    storeName: 'سوق نور',
    search: 'ابحث...',
    noResults: 'لا توجد نتائج.',
    navigation: 'التنقل',
    browse: 'تصفح',
    cart: 'السلة',
    orders: 'الطلبات',
    dashboard: 'لوحة البائع',
    checkout: 'الدفع',
    newOrder: 'طلب جديد',
    newOrderDesc: 'لديك طلب جديد من أحمد المنصوري.',
    lowStock: 'تنبيه مخزون منخفض',
    lowStockDesc: 'الساعة الذكية متبقي ٨ وحدات فقط.',
    settings: 'الإعدادات',
    profileComingSoon: 'صفحة الملف الشخصي قريباً',
    supportComingSoon: 'صفحة الدعم قريباً',
  },
}

const navItems = [
  { title: 'Browse', titleAr: 'تصفح', href: '/examples/marketplace', icon: <House className="h-5 w-5" /> },
  { title: 'Cart', titleAr: 'السلة', href: '/examples/marketplace/cart', icon: <ShoppingCart className="h-5 w-5" />, badge: 3 },
  { title: 'Orders', titleAr: 'الطلبات', href: '/examples/marketplace/orders', icon: <Receipt className="h-5 w-5" /> },
  { title: 'Vendor Dashboard', titleAr: 'لوحة البائع', href: '/examples/marketplace/dashboard', icon: <ChartLineUp className="h-5 w-5" /> },
  { title: 'Settings', titleAr: 'الإعدادات', href: '/examples/marketplace/settings', icon: <Gear className="h-5 w-5" /> },
]

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useDirection()
  const router = useRouter()
  const [commandOpen, setCommandOpen] = React.useState(false)
  const t = mk[locale]

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
      title: t.newOrder,
      description: t.newOrderDesc,
      type: 'success' as const,
      time: new Date(Date.now() - 1800000).toISOString(),
      read: false,
    },
    {
      id: '2',
      title: t.lowStock,
      description: t.lowStockDesc,
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
            <Storefront className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold">{t.storeName}</span>
        </div>
      }
      logoHref="/examples/marketplace"
      user={{
        name: locale === 'ar' ? 'أحمد المنصوري' : 'Ahmed Al Mansouri',
        email: 'ahmed@techstore.sa',
        initials: 'AM',
      }}
      notifications={notifications}
      onNotificationClick={(n) => toast({ title: n.title, description: n.description })}
      onProfileClick={() => router.push('/examples/marketplace/profile')}
      onSettingsClick={() => router.push('/examples/marketplace/settings')}
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
