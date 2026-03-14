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
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { useDirection } from '@/components/providers/direction-provider'
import {
  FirstAid,
  House,
  Users,
  CalendarCheck,
  Pill,
  MagnifyingGlass,
} from '@phosphor-icons/react'

const hc = {
  en: {
    clinicName: 'Al Noor',
    search: 'Search...',
    noResults: 'No results found.',
    navigation: 'Navigation',
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    prescriptions: 'Prescriptions',
    labReady: 'Lab Result Ready',
    labReadyDesc: 'Blood test results for Fatima Al Hashimi are ready.',
    upcomingApt: 'Upcoming Appointment',
    upcomingAptDesc: 'Dr. Ahmad has 3 appointments in the next hour.',
    lowStock: 'Low Medication Stock',
    lowStockDesc: 'Amoxicillin 500mg is running low.',
  },
  ar: {
    clinicName: 'النور',
    search: 'ابحث...',
    noResults: 'لا توجد نتائج.',
    navigation: 'التنقل',
    dashboard: 'لوحة التحكم',
    patients: 'المرضى',
    appointments: 'المواعيد',
    prescriptions: 'الوصفات الطبية',
    labReady: 'نتائج المختبر جاهزة',
    labReadyDesc: 'نتائج فحص الدم لفاطمة الهاشمي جاهزة.',
    upcomingApt: 'موعد قادم',
    upcomingAptDesc: 'لدى د. أحمد ٣ مواعيد في الساعة القادمة.',
    lowStock: 'نقص في المخزون الدوائي',
    lowStockDesc: 'أموكسيسيلين ٥٠٠ ملغ ينفد.',
  },
}

const navItems = [
  { title: 'Dashboard', titleAr: 'لوحة التحكم', href: '/examples/healthcare', icon: <House className="h-5 w-5" /> },
  { title: 'Patients', titleAr: 'المرضى', href: '/examples/healthcare/patients', icon: <Users className="h-5 w-5" /> },
  { title: 'Appointments', titleAr: 'المواعيد', href: '/examples/healthcare/appointments', icon: <CalendarCheck className="h-5 w-5" /> },
  { title: 'Prescriptions', titleAr: 'الوصفات الطبية', href: '/examples/healthcare/prescriptions', icon: <Pill className="h-5 w-5" /> },
]

export default function HealthcareLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useDirection()
  const router = useRouter()
  const [commandOpen, setCommandOpen] = React.useState(false)
  const t = hc[locale]

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
      title: t.labReady,
      description: t.labReadyDesc,
      type: 'success' as const,
      time: new Date(Date.now() - 1800000).toISOString(),
      read: false,
    },
    {
      id: '2',
      title: t.upcomingApt,
      description: t.upcomingAptDesc,
      type: 'info' as const,
      time: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: '3',
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
            <FirstAid className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold">{t.clinicName}</span>
        </div>
      }
      logoHref="/examples/healthcare"
      user={{
        name: locale === 'ar' ? 'د. ليلى حسن' : 'Dr. Layla Hassan',
        email: 'layla.hassan@alnoor.ae',
        initials: 'LH',
      }}
      notifications={notifications}
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
    </DashboardShell>
  )
}
