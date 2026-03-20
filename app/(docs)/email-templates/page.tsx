'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'
import {
  EnvelopeSimple,
  Bank,
  Bed,
  FirstAid,
  GraduationCap,
  Handshake,
  Receipt,
  Bell,
  Newspaper,
  Key,
  ShieldCheck,
  ShoppingCart,
  CalendarCheck,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  Desktop,
  DeviceMobile,
  Copy,
  Check,
  DownloadSimple,
  Sun,
  Moon,
  House,
  Storefront,
  Buildings,
  GameController,
  HandCoins,
  Truck,
  ChatTeardropDots,
  Headset,
  type Icon as PhosphorIcon,
} from '@phosphor-icons/react'

// ─── Template metadata ────────────────────────────────────────────────────────

interface TemplateInfo {
  id: string
  category: 'transactional' | 'auth' | 'notifications' | 'marketing' | 'industry'
  icon: PhosphorIcon
}

const TEMPLATES: TemplateInfo[] = [
  // Transactional
  { id: 'order-confirmation', category: 'transactional', icon: ShoppingCart },
  { id: 'shipping-update', category: 'transactional', icon: Truck },
  { id: 'invoice-receipt', category: 'transactional', icon: Receipt },
  { id: 'banking-transfer-receipt', category: 'transactional', icon: Bank },
  { id: 'hotel-booking-confirmation', category: 'transactional', icon: Bed },
  { id: 'payment-reminder', category: 'transactional', icon: CreditCard },
  // Auth
  { id: 'welcome-onboarding', category: 'auth', icon: Handshake },
  { id: 'password-reset', category: 'auth', icon: Key },
  { id: 'otp-verification', category: 'auth', icon: ShieldCheck },
  // Notifications
  { id: 'notification-alert', category: 'notifications', icon: Bell },
  { id: 'healthcare-appointment-reminder', category: 'notifications', icon: FirstAid },
  { id: 'education-assignment-notification', category: 'notifications', icon: GraduationCap },
  { id: 'support-ticket', category: 'notifications', icon: Headset },
  // Marketing
  { id: 'newsletter', category: 'marketing', icon: Newspaper },
  { id: 'event-invitation', category: 'marketing', icon: CalendarCheck },
  { id: 'feedback-request', category: 'marketing', icon: ChatTeardropDots },
  // Industry
  { id: 'real-estate-viewing-confirmation', category: 'industry', icon: House },
  { id: 'marketplace-order-notification', category: 'industry', icon: Storefront },
  { id: 'government-service-confirmation', category: 'industry', icon: Buildings },
  { id: 'esports-tournament-registration', category: 'industry', icon: GameController },
  { id: 'islamic-finance-zakat-receipt', category: 'industry', icon: HandCoins },
]

const THEMES = ['cozy', 'minimal', 'futuristic', 'artistic']
type ColorMode = 'light' | 'dark'
type Variant = 'ltr' | 'rtl' | 'bilingual'
type Device = 'desktop' | 'mobile'
type Filter = 'all' | 'transactional' | 'auth' | 'notifications' | 'marketing' | 'industry'

// ─── Page Component ───────────────────────────────────────────────────────────

export default function EmailTemplatesPage() {
  const { locale, direction } = useDirection()
  const t = content[locale]
  const et = t.emailTemplates

  const searchParams = useSearchParams()

  // Initialize state from URL params
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(() => {
    const t = searchParams.get('template')
    return t && TEMPLATES.some(tmpl => tmpl.id === t) ? t : null
  })
  const [variant, setVariant] = React.useState<Variant>(() => {
    const v = searchParams.get('variant') as Variant
    return ['ltr', 'rtl', 'bilingual'].includes(v) ? v : 'ltr'
  })
  const [device, setDevice] = React.useState<Device>(() => {
    const d = searchParams.get('device') as Device
    return ['desktop', 'mobile'].includes(d) ? d : 'desktop'
  })
  const [filter, setFilter] = React.useState<Filter>('all')
  const [theme, setTheme] = React.useState(() => {
    const th = searchParams.get('email_theme')
    return th && THEMES.includes(th) ? th : 'cozy'
  })
  const [colorMode, setColorMode] = React.useState<ColorMode>(() => {
    const m = searchParams.get('mode') as ColorMode
    return m === 'dark' ? 'dark' : 'light'
  })
  const [copied, setCopied] = React.useState(false)

  const previewHeadingRef = React.useRef<HTMLHeadingElement>(null)
  const gridHeadingRef = React.useRef<HTMLHeadingElement>(null)
  const isInitialMount = React.useRef(true)

  // Sync state to URL params
  React.useEffect(() => {
    // Skip the initial mount to avoid pushing on page load
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    const params = new URLSearchParams()
    if (selectedTemplate) {
      params.set('template', selectedTemplate)
      params.set('variant', variant)
      params.set('email_theme', theme)
      if (colorMode !== 'light') params.set('mode', colorMode)
      if (device !== 'desktop') params.set('device', device)
    }
    const qs = params.toString()
    const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    window.history.pushState(null, '', newUrl)
  }, [selectedTemplate, variant, theme, colorMode, device])

  // Handle browser back/forward
  React.useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const t = params.get('template')
      setSelectedTemplate(t && TEMPLATES.some(tmpl => tmpl.id === t) ? t : null)
      const v = params.get('variant') as Variant
      setVariant(['ltr', 'rtl', 'bilingual'].includes(v) ? v : 'ltr')
      const th = params.get('email_theme')
      setTheme(th && THEMES.includes(th) ? th : 'cozy')
      const d = params.get('device') as Device
      setDevice(['desktop', 'mobile'].includes(d) ? d : 'desktop')
      const m = params.get('mode') as ColorMode
      setColorMode(m === 'dark' ? 'dark' : 'light')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Focus management on view transitions
  React.useEffect(() => {
    if (selectedTemplate) {
      previewHeadingRef.current?.focus()
    }
  }, [selectedTemplate])

  const filteredTemplates = TEMPLATES.filter(t => {
    if (filter === 'all') return true
    return t.category === filter
  })

  // Theme directory: "cozy" for light, "cozy-dark" for dark
  const themeDir = colorMode === 'dark' ? `${theme}-dark` : theme

  const handleCopyHtml = async () => {
    if (!selectedTemplate) return
    try {
      const res = await fetch(`/emails/preview/${themeDir}/${selectedTemplate}-${variant}.html`)
      const html = await res.text()
      await navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API may not be available
    }
  }

  const handleDownloadHtml = async () => {
    if (!selectedTemplate) return
    try {
      const res = await fetch(`/emails/preview/${themeDir}/${selectedTemplate}-${variant}.html`)
      const html = await res.text()
      const blob = new Blob([html], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${selectedTemplate}-${variant}-${themeDir}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      // Download failed
    }
  }

  const handleBack = () => {
    setSelectedTemplate(null)
    window.history.pushState(null, '', window.location.pathname)
    // Focus grid heading after React re-render
    requestAnimationFrame(() => gridHeadingRef.current?.focus())
  }

  const BackArrow = direction === 'rtl' ? ArrowRight : ArrowLeft

  // ─── Preview Mode ─────────────────────────────────────────────────────────

  if (selectedTemplate) {
    const templateInfo = TEMPLATES.find(t => t.id === selectedTemplate)
    const templateI18n = et.templates[selectedTemplate as keyof typeof et.templates]

    return (
      <div className="min-h-screen">
        <main id="main-content" className="container py-12">
          {/* Back button + title */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2"
            >
              <BackArrow className="h-4 w-4" aria-hidden="true" />
              {et.actions.back}
            </Button>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              {templateInfo && <templateInfo.icon className="h-6 w-6 text-primary" aria-hidden="true" />}
              <h1 ref={previewHeadingRef} tabIndex={-1} className="text-2xl font-bold outline-none">{templateI18n?.name}</h1>
              <Badge variant="outline" className="text-xs capitalize">
                {et.filters[templateInfo?.category as keyof typeof et.filters] || templateInfo?.category}
              </Badge>
            </div>
            <p className="text-muted-foreground">{templateI18n?.description}</p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Variant toggle */}
            <Tabs value={variant} onValueChange={(v) => setVariant(v as Variant)}>
              <TabsList aria-label={locale === 'ar' ? 'متغير اللغة' : 'Language variant'}>
                <TabsTrigger value="ltr">{et.variants.ltr}</TabsTrigger>
                <TabsTrigger value="rtl">{et.variants.rtl}</TabsTrigger>
                <TabsTrigger value="bilingual">{et.variants.bilingual}</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Device toggle */}
            <div className="flex items-center gap-1 border rounded-lg p-1" role="group" aria-label={locale === 'ar' ? 'حجم المعاينة' : 'Preview size'}>
              <Button
                variant={device === 'desktop' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setDevice('desktop')}
                className="gap-1.5 h-8"
                aria-label={et.device.desktop}
                aria-pressed={device === 'desktop'}
              >
                <Desktop className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline" aria-hidden="true">{et.device.desktop}</span>
              </Button>
              <Button
                variant={device === 'mobile' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setDevice('mobile')}
                className="gap-1.5 h-8"
                aria-label={et.device.mobile}
                aria-pressed={device === 'mobile'}
              >
                <DeviceMobile className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline" aria-hidden="true">{et.device.mobile}</span>
              </Button>
            </div>

            {/* Theme selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{et.theme.label}:</span>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-[140px] h-8 text-sm" aria-label={et.theme.label}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map(t => (
                    <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
                aria-label={colorMode === 'light' ? 'Dark' : 'Light'}
                aria-pressed={colorMode === 'dark'}
              >
                {colorMode === 'light'
                  ? <Moon className="h-4 w-4" aria-hidden="true" />
                  : <Sun className="h-4 w-4" aria-hidden="true" />}
              </Button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 ms-auto">
              <Button variant="outline" size="sm" onClick={handleCopyHtml} className="gap-1.5">
                {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copied ? et.actions.copied : et.actions.copyHtml}
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadHtml} className="gap-1.5">
                <DownloadSimple className="h-4 w-4" aria-hidden="true" />
                {et.actions.downloadHtml}
              </Button>
              {/* Live region for copy state */}
              <span role="status" aria-live="polite" className="sr-only">
                {copied ? et.actions.copied : ''}
              </span>
            </div>
          </div>

          {/* iframe preview */}
          <div className="flex justify-center">
            <div
              className="border rounded-lg overflow-hidden bg-white transition-all duration-300"
              style={{
                width: device === 'desktop' ? '620px' : '395px',
                maxWidth: '100%',
              }}
            >
              <iframe
                key={`${selectedTemplate}-${variant}-${theme}-${device}`}
                src={`/emails/preview/${themeDir}/${selectedTemplate}-${variant}.html`}
                style={{
                  width: device === 'desktop' ? '600px' : '375px',
                  height: '800px',
                  border: 'none',
                  display: 'block',
                  margin: '0 auto',
                }}
                title={templateI18n?.name
                  ? `${templateI18n.name} - ${variant} preview`
                  : 'Email template preview'}
              />
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ─── Grid Mode ────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                {t.common.home}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">
              {et.title}
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-4 bg-primary/10 rounded-xl">
              <EnvelopeSimple className="h-10 w-10 text-primary" aria-hidden="true" />
            </div>
          </div>
          <h1 ref={gridHeadingRef} tabIndex={-1} className="text-4xl font-bold tracking-tight mb-4 outline-none">
            {et.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-3">
            {et.subtitle}
          </p>
          <a
            href="https://mjml.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {locale === 'ar' ? 'مبنية بـ' : 'Built with'} <strong>MJML</strong>
            <ArrowSquareOut className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Filter tabs */}
        <div className="mb-8">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList aria-label={locale === 'ar' ? 'تصفية القوالب' : 'Filter templates'}>
              <TabsTrigger value="all">{et.filters.all}</TabsTrigger>
              <TabsTrigger value="transactional">{et.filters.transactional}</TabsTrigger>
              <TabsTrigger value="auth">{et.filters.auth}</TabsTrigger>
              <TabsTrigger value="notifications">{et.filters.notifications}</TabsTrigger>
              <TabsTrigger value="marketing">{et.filters.marketing}</TabsTrigger>
              <TabsTrigger value="industry">{et.filters.industry}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Template Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.map((template) => {
            const templateI18n = et.templates[template.id as keyof typeof et.templates]
            const Icon = template.icon

            return (
              <Link
                key={template.id}
                href={`/email-templates?template=${template.id}&variant=ltr&email_theme=${theme}`}
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedTemplate(template.id)
                }}
                className="text-start block"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <Badge className="text-xs capitalize">
                        {et.filters[template.category as keyof typeof et.filters] || template.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{templateI18n?.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {templateI18n?.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">LTR</Badge>
                      <Badge variant="outline" className="text-xs">RTL</Badge>
                      <Badge variant="outline" className="text-xs">{et.variants.bilingual}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
