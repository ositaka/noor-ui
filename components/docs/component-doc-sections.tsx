'use client'

import { usePathname } from 'next/navigation'
import { useDirection } from '@/components/providers/direction-provider'
import { componentDocContent } from '@/lib/component-doc-content'
import { BestPractices } from '@/components/docs/best-practices'
import { content } from '@/lib/i18n'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import {
  PencilSimple, Cursor, ChatCentered, ArrowsClockwise,
  ArrowRight, ArrowBendUpLeft, NavigationArrow,
  Package, ChartBar, FileText, Tag, Checks,
  CheckSquare, Sliders, CreditCard, ListBullets,
  Gear, Lock, Eye, MagnifyingGlass, Envelope,
  Bell, Users, UserCircle, ShoppingCart, CurrencyDollar,
  CalendarBlank, Clock, Image, Upload, Download,
  Star, Lightning, Sparkle, Warning, Info,
  Layout, GridFour, Columns, SidebarSimple,
  House, Palette, Keyboard, Globe, Database,
  Brain, PaperPlaneTilt, Robot, Gauge, Hash,
  HandCoins, Moon, Mosque, BookOpen, Quotes,
  Newspaper, Copy, Table, CaretRight, Tray,
  CircleNotch, Swap, ToggleLeft, WarningCircle,
  Question, Lightbulb, PushPin, Megaphone,
  Funnel, SortAscending, ClockCountdown,
  DeviceMobile, Percent, Target, Laptop,
  Buildings, ChartLine, Medal, Certificate,
} from '@phosphor-icons/react'
import type { IconProps } from '@phosphor-icons/react'
import type { ComponentType } from 'react'

const ICON_MAP: Record<string, ComponentType<IconProps>> = {
  PencilSimple, Cursor, ChatCentered, ArrowsClockwise,
  ArrowRight, ArrowBendUpLeft, NavigationArrow,
  Package, ChartBar, FileText, Tag, Checks,
  CheckSquare, Sliders, CreditCard, ListBullets,
  Gear, Lock, Eye, MagnifyingGlass, Envelope,
  Bell, Users, UserCircle, ShoppingCart, CurrencyDollar,
  CalendarBlank, Clock, Image, Upload, Download,
  Star, Lightning, Sparkle, Warning, Info,
  Layout, GridFour, Columns, SidebarSimple,
  House, Palette, Keyboard, Globe, Database,
  Brain, PaperPlaneTilt, Robot, Gauge, Hash,
  HandCoins, Moon, Mosque, BookOpen, Quotes,
  Newspaper, Copy, Table, CaretRight, Tray,
  CircleNotch, Swap, ToggleLeft, WarningCircle,
  Question, Lightbulb, PushPin, Megaphone,
  Funnel, SortAscending, ClockCountdown,
  DeviceMobile, Percent, Target, Laptop,
  Buildings, ChartLine, Medal, Certificate,
}

export function ComponentDocSections() {
  const pathname = usePathname()
  const { locale } = useDirection()
  const t = content[locale]

  const slug = pathname.split('/').pop() || ''
  const data = componentDocContent[locale]?.[slug]
  if (!data) return null

  const hasUseCases = data.useCases && data.useCases.length > 0
  const hasBestPractices = data.bestPractices
  const hasRelated = data.related && data.related.length > 0

  if (!hasUseCases && !hasBestPractices && !hasRelated) return null

  return (
    <div className="mt-8">
      {hasUseCases && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            {t.componentPage.sections.useCases}
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {data.useCases!.map((uc, idx) => {
              const IconComponent = ICON_MAP[uc.icon]
              return (
                <Card key={idx} className="p-4 flex items-center gap-3">
                  {IconComponent && (
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <IconComponent className="h-5 w-5 text-primary" weight="duotone" />
                    </div>
                  )}
                  <p className="font-medium text-sm">{uc.title}</p>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      {hasBestPractices && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            {t.componentPage.sections.bestPractices}
          </h2>
          <BestPractices
            dos={data.bestPractices!.dos}
            donts={data.bestPractices!.donts}
          />
        </section>
      )}

      {hasRelated && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            {t.componentPage.sections.relatedComponents}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.related!.map((item) => (
              <Link key={item.slug} href={`/components/${item.slug}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
