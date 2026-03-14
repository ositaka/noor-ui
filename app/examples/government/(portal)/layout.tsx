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
  Shield,
  House,
  GridFour,
  ClipboardText,
  FolderOpen,
  MagnifyingGlass,
} from '@phosphor-icons/react'

const gt = {
  en: {
    portalName: 'Gov Portal',
    search: 'Search services...',
    noResults: 'No results found.',
    navigation: 'Navigation',
    dashboard: 'Dashboard',
    services: 'Services',
    applications: 'My Applications',
    documents: 'Documents',
    appApproved: 'Application Approved',
    appApprovedDesc: 'Your trade license renewal (GOV-2026-00142) has been approved.',
    docRequired: 'Document Required',
    docRequiredDesc: 'Please upload an updated salary certificate for request GOV-2026-00198.',
    ramadanHours: 'Ramadan Working Hours',
    ramadanHoursDesc: 'Service centers open 9 AM – 2 PM during Ramadan.',
    profileComingSoon: 'Profile page coming soon',
    settingsComingSoon: 'Settings page coming soon',
    supportComingSoon: 'Support page coming soon',
  },
  ar: {
    portalName: 'البوابة',
    search: 'ابحث عن الخدمات...',
    noResults: 'لا توجد نتائج.',
    navigation: 'التنقل',
    dashboard: 'لوحة التحكم',
    services: 'الخدمات',
    applications: 'طلباتي',
    documents: 'المستندات',
    appApproved: 'تمت الموافقة على الطلب',
    appApprovedDesc: 'تمت الموافقة على تجديد الرخصة التجارية (GOV-2026-00142).',
    docRequired: 'مستند مطلوب',
    docRequiredDesc: 'يرجى تحميل شهادة راتب محدثة للطلب GOV-2026-00198.',
    ramadanHours: 'ساعات العمل في رمضان',
    ramadanHoursDesc: 'مراكز الخدمة مفتوحة من ٩ صباحاً حتى ٢ ظهراً خلال رمضان.',
    profileComingSoon: 'صفحة الملف الشخصي قريباً',
    settingsComingSoon: 'صفحة الإعدادات قريباً',
    supportComingSoon: 'صفحة الدعم قريباً',
  },
}

const navItems = [
  { title: 'Dashboard', titleAr: 'لوحة التحكم', href: '/examples/government/dashboard', icon: <House className="h-5 w-5" /> },
  { title: 'Services', titleAr: 'الخدمات', href: '/examples/government/services/visa-residency', icon: <GridFour className="h-5 w-5" /> },
  { title: 'My Applications', titleAr: 'طلباتي', href: '/examples/government/applications', icon: <ClipboardText className="h-5 w-5" />, badge: '3' },
  { title: 'Documents', titleAr: 'المستندات', href: '/examples/government/documents', icon: <FolderOpen className="h-5 w-5" /> },
]

export default function GovernmentPortalLayout({ children }: { children: React.ReactNode }) {
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
      title: t.appApproved,
      description: t.appApprovedDesc,
      type: 'success' as const,
      time: new Date(Date.now() - 1800000).toISOString(),
      read: false,
    },
    {
      id: '2',
      title: t.docRequired,
      description: t.docRequiredDesc,
      type: 'warning' as const,
      time: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: '3',
      title: t.ramadanHours,
      description: t.ramadanHoursDesc,
      type: 'info' as const,
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
            <Shield className="h-5 w-5 text-primary-foreground" weight="bold" />
          </div>
          <span className="font-bold">{t.portalName}</span>
        </div>
      }
      logoHref="/examples/government/dashboard"
      user={{
        name: locale === 'ar' ? 'أحمد محمد الفلاسي' : 'Ahmed Mohammed Al Falasi',
        email: 'ahmed.falasi@noorgov.demo',
        initials: 'AF',
      }}
      notifications={notifications}
      onNotificationClick={(n) => toast({ title: n.title, description: n.description })}
      onProfileClick={() => router.push('/examples/government/profile')}
      onSettingsClick={() => router.push('/examples/government/settings')}
      onSupportClick={() => toast({ title: t.supportComingSoon })}
      onLogout={() => router.push('/examples/government')}
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
