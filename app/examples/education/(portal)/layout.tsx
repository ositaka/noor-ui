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
  GraduationCap,
  House,
  ChartBar,
  CalendarDots,
  ClipboardText,
  CalendarCheck,
  UsersFour,
  MagnifyingGlass,
} from '@phosphor-icons/react'

const ed = {
  en: {
    schoolName: 'Al Noor School',
    search: 'Search...',
    noResults: 'No results found.',
    navigation: 'Navigation',
    dashboard: 'Dashboard',
    grades: 'Grades',
    schedule: 'Schedule',
    assignments: 'Assignments',
    attendance: 'Attendance',
    teachers: 'Teachers',
    newAssignment: 'New Assignment Due',
    newAssignmentDesc: 'Chapter 5 Exercises due in 2 days.',
    midtermNotice: 'Mid-term Exams',
    midtermNoticeDesc: 'Exams start Shawwal 15. Prepare revision schedule.',
    profileComingSoon: 'Profile page coming soon',
    settingsComingSoon: 'Settings page coming soon',
    supportComingSoon: 'Support page coming soon',
  },
  ar: {
    schoolName: 'مدرسة النور',
    search: 'ابحث...',
    noResults: 'لا توجد نتائج.',
    navigation: 'التنقل',
    dashboard: 'لوحة التحكم',
    grades: 'الدرجات',
    schedule: 'الجدول',
    assignments: 'الواجبات',
    attendance: 'الحضور',
    teachers: 'المعلمون',
    newAssignment: 'واجب جديد مستحق',
    newAssignmentDesc: 'تمارين الفصل الخامس مستحقة خلال يومين.',
    midtermNotice: 'اختبارات منتصف الفصل',
    midtermNoticeDesc: 'تبدأ الاختبارات ١٥ شوال. أعد جدول المراجعة.',
    profileComingSoon: 'صفحة الملف الشخصي قريباً',
    settingsComingSoon: 'صفحة الإعدادات قريباً',
    supportComingSoon: 'صفحة الدعم قريباً',
  },
}

const navItems = [
  { title: 'Dashboard', titleAr: 'لوحة التحكم', href: '/examples/education/dashboard', icon: <House className="h-5 w-5" /> },
  { title: 'Grades', titleAr: 'الدرجات', href: '/examples/education/grades', icon: <ChartBar className="h-5 w-5" /> },
  { title: 'Schedule', titleAr: 'الجدول', href: '/examples/education/schedule', icon: <CalendarDots className="h-5 w-5" /> },
  { title: 'Assignments', titleAr: 'الواجبات', href: '/examples/education/assignments', icon: <ClipboardText className="h-5 w-5" /> },
  { title: 'Attendance', titleAr: 'الحضور', href: '/examples/education/attendance', icon: <CalendarCheck className="h-5 w-5" /> },
  { title: 'Teachers', titleAr: 'المعلمون', href: '/examples/education/teachers', icon: <UsersFour className="h-5 w-5" /> },
]

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useDirection()
  const router = useRouter()
  const [commandOpen, setCommandOpen] = React.useState(false)
  const t = ed[locale]

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
      title: t.newAssignment,
      description: t.newAssignmentDesc,
      type: 'warning' as const,
      time: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: '2',
      title: t.midtermNotice,
      description: t.midtermNoticeDesc,
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
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold">{t.schoolName}</span>
        </div>
      }
      logoHref="/examples/education/dashboard"
      user={{
        name: locale === 'ar' ? 'يوسف الدوسري' : 'Yousef Al Dosari',
        email: 'yousef.dosari@alnoor.edu.sa',
        initials: 'YD',
      }}
      notifications={notifications}
      onNotificationClick={(n) => toast({ title: n.title, description: n.description })}
      onProfileClick={() => router.push('/examples/education/profile')}
      onSettingsClick={() => router.push('/examples/education/settings')}
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
