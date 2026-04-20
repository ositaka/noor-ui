'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Callout } from '@/components/ui/callout'
import { StatsCard } from '@/components/ui/stats-card'
import { DataTable } from '@/components/ui/data-table'
import { Chart } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CountdownTimer } from '@/components/ui/countdown-timer'
import { LiveIndicator } from '@/components/ui/live-indicator'
import { useDirection } from '@/components/providers/direction-provider'
import {
  Palette,
  Trophy,
  Users,
  Lightning,
  Target,
  GameController,
} from '@phosphor-icons/react'

const t = {
  en: {
    title: 'Theme Preview',
    subtitle: 'Living styleguide — how NoorUI components look under the custom gaming theme',
    buttons: 'Buttons',
    badges: 'Badges',
    statsCards: 'Stats Cards',
    formInputs: 'Form Inputs',
    tabs: 'Tabs',
    progressBars: 'Progress Bars',
    switchSlider: 'Switch & Slider',
    callouts: 'Callouts',
    dialog: 'Dialog',
    dataTable: 'Data Table',
    charts: 'Charts',
    newComponents: 'New Components',
    countdownTimer: 'CountdownTimer',
    liveIndicator: 'LiveIndicator',
    arabicNumbers: 'ArabicNumber Formatting',
    openDialog: 'Open Dialog',
    dialogTitle: 'Confirm Action',
    dialogDesc: 'Are you sure you want to proceed? This action demonstrates a dialog on the gaming theme.',
    cancel: 'Cancel',
    confirm: 'Confirm',
    gamertag: 'Gamertag',
    gamertackPlaceholder: 'Enter your gamertag',
    teamName: 'Team Name',
    teamPlaceholder: 'Team name',
    enableNotifications: 'Enable notifications',
    soundVolume: 'Sound Volume',
    bracket: 'Bracket',
    schedule: 'Schedule',
    teams: 'Teams',
    rules: 'Rules',
    prizes: 'Prizes',
    tabContent: 'Tab content placeholder for',
    tournamentUpdate: 'Tournament Update',
    tournamentUpdateDesc: 'Gulf Esports Cup registration closes in 3 days.',
    matchComplete: 'Match Complete',
    matchCompleteDesc: 'Gulf Wolves defeated Riyadh Falcons 2-1.',
    maintenance: 'Server Maintenance',
    maintenanceDesc: 'Scheduled maintenance Apr 12, 2:00-4:00 AM AST.',
    prizePool: 'Prize Pool',
    winRate: 'Win Rate',
    players: 'Players',
    activeTournaments: 'Active Tournaments',
    onlinePlayers: 'Online Players',
    matchesToday: 'Matches Today',
    totalPrize: 'Total Prize Pool',
    fromLastMonth: 'from last month',
    fromYesterday: 'from yesterday',
    thisSeason: 'this season',
    pointsDist: 'Points Distribution (Bar)',
    winRateChart: 'Win Rate (Donut)',
    countdownLabel: 'Gulf Esports Cup Starts',
    liveSmall: 'Small',
    liveMedium: 'Medium',
    liveNoPulse: 'No Pulse',
  },
  ar: {
    title: 'معاينة السمة',
    subtitle: 'دليل أنماط حي — كيف تبدو مكونات NoorUI تحت سمة الألعاب المخصصة',
    buttons: 'الأزرار',
    badges: 'الشارات',
    statsCards: 'بطاقات الإحصائيات',
    formInputs: 'حقول الإدخال',
    tabs: 'علامات التبويب',
    progressBars: 'أشرطة التقدم',
    switchSlider: 'المفتاح والمنزلق',
    callouts: 'التنبيهات',
    dialog: 'مربع الحوار',
    dataTable: 'جدول البيانات',
    charts: 'الرسوم البيانية',
    newComponents: 'المكونات الجديدة',
    countdownTimer: 'عداد تنازلي',
    liveIndicator: 'مؤشر البث المباشر',
    arabicNumbers: 'تنسيق الأرقام العربية',
    openDialog: 'فتح مربع الحوار',
    dialogTitle: 'تأكيد الإجراء',
    dialogDesc: 'هل أنت متأكد أنك تريد المتابعة؟ هذا الإجراء يوضح مربع حوار على سمة الألعاب.',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    gamertag: 'اسم اللاعب',
    gamertackPlaceholder: 'أدخل اسم اللاعب',
    teamName: 'اسم الفريق',
    teamPlaceholder: 'اسم الفريق',
    enableNotifications: 'تفعيل الإشعارات',
    soundVolume: 'مستوى الصوت',
    bracket: 'القوس',
    schedule: 'الجدول',
    teams: 'الفرق',
    rules: 'القواعد',
    prizes: 'الجوائز',
    tabContent: 'محتوى مؤقت لعلامة',
    tournamentUpdate: 'تحديث البطولة',
    tournamentUpdateDesc: 'ينتهي تسجيل كأس الخليج خلال ٣ أيام.',
    matchComplete: 'انتهت المباراة',
    matchCompleteDesc: 'هزم ذئاب الخليج صقور الرياض ٢-١.',
    maintenance: 'صيانة الخوادم',
    maintenanceDesc: 'صيانة مجدولة ١٢ أبريل، ٢:٠٠-٤:٠٠ صباحاً.',
    prizePool: 'مجموع الجوائز',
    winRate: 'نسبة الفوز',
    players: 'اللاعبون',
    activeTournaments: 'البطولات النشطة',
    onlinePlayers: 'اللاعبون المتصلون',
    matchesToday: 'مباريات اليوم',
    totalPrize: 'مجموع الجوائز',
    fromLastMonth: 'من الشهر الماضي',
    fromYesterday: 'من أمس',
    thisSeason: 'هذا الموسم',
    pointsDist: 'توزيع النقاط (أعمدة)',
    winRateChart: 'نسبة الفوز (دائري)',
    countdownLabel: 'بداية كأس الخليج',
    liveSmall: 'صغير',
    liveMedium: 'متوسط',
    liveNoPulse: 'بدون نبض',
  },
}

const sampleTableData = [
  { rank: 1, player: 'FalconX', team: 'Gulf Wolves', points: 2450, wins: 28, losses: 8 },
  { rank: 2, player: 'ShadowBlade', team: 'Riyadh Falcons', points: 2280, wins: 25, losses: 11 },
  { rank: 3, player: 'NeonStrike', team: 'Doha Stars', points: 2150, wins: 23, losses: 13 },
  { rank: 4, player: 'IcePhoenix', team: 'Jeddah Champions', points: 1980, wins: 20, losses: 16 },
  { rank: 5, player: 'VoidWalker', team: 'Abu Dhabi Knights', points: 1820, wins: 18, losses: 18 },
]

const barData = [
  { name: 'FalconX', points: 2450 },
  { name: 'Shadow', points: 2280 },
  { name: 'Neon', points: 2150 },
  { name: 'Ice', points: 1980 },
  { name: 'Void', points: 1820 },
]

const donutData = [
  { category: 'Wins', value: 28 },
  { category: 'Losses', value: 8 },
]

export default function ThemePreviewPage() {
  const { locale } = useDirection()
  const h = t[locale]
  const [sliderValue, setSliderValue] = React.useState([70])

  return (
    <div className="container py-8 space-y-8">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="p-4 bg-primary/10 rounded-xl">
          <Palette className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{h.title}</h1>
          <p className="text-muted-foreground">{h.subtitle}</p>
        </div>
      </div>

      <Separator />

      {/* ── New Components ── */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{h.newComponents}</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{h.countdownTimer}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-3">{h.countdownLabel}</p>
                <CountdownTimer
                  targetDate="2026-04-14T09:00:00+03:00"
                  locale={locale}
                  size="lg"
                />
              </div>
              <Separator />
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Size: sm</p>
                  <CountdownTimer
                    targetDate="2026-04-14T09:00:00+03:00"
                    locale={locale}
                    size="sm"
                  />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Size: md</p>
                  <CountdownTimer
                    targetDate="2026-04-14T09:00:00+03:00"
                    locale={locale}
                    size="md"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{h.liveIndicator}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap items-center gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{h.liveSmall}</p>
                  <LiveIndicator locale={locale} size="sm" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{h.liveMedium}</p>
                  <LiveIndicator locale={locale} size="md" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{h.liveNoPulse}</p>
                  <LiveIndicator locale={locale} size="sm" pulse={false} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* ── Buttons ── */}
      <Card>
        <CardHeader>
          <CardTitle>{h.buttons}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="xl">XL</Button>
            <Button variant="primary" size="icon"><GameController className="h-4 w-4" /></Button>
            <Button variant="primary" loading>Loading</Button>
          </div>
        </CardContent>
      </Card>

      {/* ── Badges ── */}
      <Card>
        <CardHeader>
          <CardTitle>{h.badges}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge className="bg-success text-success-foreground border-transparent">Success</Badge>
          <Badge className="bg-warning text-warning-foreground border-transparent">Warning</Badge>
          <Badge className="bg-info text-info-foreground border-transparent">Info</Badge>
        </CardContent>
      </Card>

      {/* ── Stats Cards ── */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">{h.statsCards}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={<Trophy className="h-4 w-4" />}
            label={h.activeTournaments}
            value="3"
            trend={12}
            trendLabel={h.fromLastMonth}
          />
          <StatsCard
            icon={<Users className="h-4 w-4" />}
            label={h.onlinePlayers}
            value="1,247"
            trend={8.5}
            trendLabel={h.fromYesterday}
          />
          <StatsCard
            icon={<Lightning className="h-4 w-4" />}
            label={h.matchesToday}
            value="8"
            trend={-2}
            trendLabel={h.fromYesterday}
          />
          <StatsCard
            icon={<Target className="h-4 w-4" />}
            label={h.totalPrize}
            value="1.5M SAR"
            trend={25}
            trendLabel={h.thisSeason}
          />
        </div>
      </div>

      {/* ── Form Inputs ── */}
      <Card>
        <CardHeader>
          <CardTitle>{h.formInputs}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 max-w-2xl">
          <div className="space-y-2">
            <Label htmlFor="gamertag">{h.gamertag}</Label>
            <Input id="gamertag" placeholder={h.gamertackPlaceholder} defaultValue="FalconX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="team">{h.teamName}</Label>
            <Input id="team" placeholder={h.teamPlaceholder} defaultValue="Gulf Wolves" />
          </div>
          <div className="space-y-2">
            <Label>Disabled</Label>
            <Input disabled defaultValue="Disabled input" />
          </div>
          <div className="space-y-2">
            <Label>Error state</Label>
            <Input className="border-destructive" defaultValue="Invalid" aria-invalid />
            <p className="text-sm text-destructive">This field has an error</p>
          </div>
        </CardContent>
      </Card>

      {/* ── Tabs ── */}
      <Card>
        <CardHeader>
          <CardTitle>{h.tabs}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bracket">
            <TabsList>
              <TabsTrigger value="bracket">{h.bracket}</TabsTrigger>
              <TabsTrigger value="schedule">{h.schedule}</TabsTrigger>
              <TabsTrigger value="teams">{h.teams}</TabsTrigger>
              <TabsTrigger value="prizes">{h.prizes}</TabsTrigger>
              <TabsTrigger value="rules">{h.rules}</TabsTrigger>
            </TabsList>
            {['bracket', 'schedule', 'teams', 'prizes', 'rules'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-4">
                <p className="text-muted-foreground">{h.tabContent} {tab}</p>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* ── Progress Bars ── */}
      <Card>
        <CardHeader>
          <CardTitle>{h.progressBars}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Primary (72%)</p>
            <Progress value={72} />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Secondary (45%)</p>
            <Progress value={45} indicatorClassName="bg-secondary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Success (90%)</p>
            <Progress value={90} indicatorClassName="bg-success" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Destructive (25%)</p>
            <Progress value={25} indicatorClassName="bg-destructive" />
          </div>
        </CardContent>
      </Card>

      {/* ── Switch & Slider ── */}
      <Card>
        <CardHeader>
          <CardTitle>{h.switchSlider}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 max-w-md">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">{h.enableNotifications}</Label>
            <Switch id="notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label>Disabled</Label>
            <Switch disabled />
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{h.soundVolume}</Label>
              <span className="text-sm text-muted-foreground">{sliderValue[0]}%</span>
            </div>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Callouts ── */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">{h.callouts}</h2>
        <Callout type="info" title={h.tournamentUpdate}>
          {h.tournamentUpdateDesc}
        </Callout>
        <Callout type="success" title={h.matchComplete}>
          {h.matchCompleteDesc}
        </Callout>
        <Callout type="warning" title={h.maintenance}>
          {h.maintenanceDesc}
        </Callout>
        <Callout type="error" title="Error">
          Connection lost. Please check your internet.
        </Callout>
      </div>

      {/* ── Dialog ── */}
      <Card>
        <CardHeader>
          <CardTitle>{h.dialog}</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">{h.openDialog}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{h.dialogTitle}</DialogTitle>
                <DialogDescription>{h.dialogDesc}</DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline">{h.cancel}</Button>
                <Button>{h.confirm}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* ── Data Table ── */}
      <Card>
        <CardHeader>
          <CardTitle>{h.dataTable}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={sampleTableData}
            columns={[
              {
                id: 'rank',
                header: '#',
                accessorKey: 'rank',
                align: 'center' as const,
                width: '60px',
                cell: (row: typeof sampleTableData[0]) => {
                  const colors: Record<number, string> = {
                    1: 'bg-warning/20 text-warning-foreground',
                    2: 'bg-muted text-muted-foreground',
                    3: 'bg-warning/10 text-warning-foreground',
                  }
                  return (
                    <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${colors[row.rank] || ''}`}>
                      {row.rank}
                    </span>
                  )
                },
              },
              { id: 'player', header: 'Player', accessorKey: 'player' },
              { id: 'team', header: 'Team', accessorKey: 'team' },
              { id: 'points', header: 'Points', accessorKey: 'points', align: 'end' as const },
              { id: 'wins', header: 'W', accessorKey: 'wins', align: 'center' as const },
              { id: 'losses', header: 'L', accessorKey: 'losses', align: 'center' as const },
            ]}
            searchable
            searchPlaceholder={locale === 'ar' ? 'بحث...' : 'Search...'}
            striped
            hoverable
          />
        </CardContent>
      </Card>

      {/* ── Charts ── */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{h.pointsDist}</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              type="bar"
              data={barData}
              categoryKey="name"
              valueKey="points"
              colors={['hsl(270 100% 60%)']}
              locale={locale}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{h.winRateChart}</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart
              type="donut"
              data={donutData}
              categoryKey="category"
              valueKey="value"
              colors={['hsl(120 100% 40%)', 'hsl(0 90% 55%)']}
              innerLabel="77.8%"
              innerSubLabel={h.winRate}
              locale={locale}
            />
          </CardContent>
        </Card>
      </div>

      {/* ── ArabicNumber ── */}
      <Card>
        <CardHeader>
          <CardTitle>{h.arabicNumbers}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{h.prizePool}</p>
            <p className="text-2xl font-bold">
              <ArabicNumber value={500000} format="number" locale={locale} /> SAR
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">{h.winRate}</p>
            <p className="text-2xl font-bold">
              <ArabicNumber value={64.3} format="percentage" locale={locale} decimals={1} />
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">{h.players}</p>
            <p className="text-2xl font-bold">
              <ArabicNumber value={1247} format="number" locale={locale} />
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Compact</p>
            <p className="text-2xl font-bold">
              <ArabicNumber value={1500000} format="compact" locale={locale} />
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
