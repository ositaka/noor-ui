'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatsCard } from '@/components/ui/stats-card'
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
import { Chart } from '@/components/ui/chart'
import { Progress } from '@/components/ui/progress'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useDirection } from '@/components/providers/direction-provider'
import {
  GameController,
  Target,
  Crosshair,
  Medal,
  Trophy,
  Lock,
  Star,
  Sword,
  Lightning,
  Crown,
} from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const t = {
  en: {
    gamertag: 'FalconX',
    realName: 'Sultan Al Harbi',
    teamName: 'Gulf Wolves',
    rankLabel: 'Diamond II',
    level: 'Level 42',
    xpLabel: '7,200 / 10,000 XP',
    overviewTab: 'Overview',
    matchHistoryTab: 'Match History',
    achievementsTab: 'Achievements',
    totalMatches: 'Total Matches',
    winRate: 'Win Rate',
    avgKd: 'Avg K/D',
    globalRank: 'Global Rank',
    fromLastMonth: 'from last month',
    winsVsLosses: 'Wins vs Losses',
    wins: 'Wins',
    losses: 'Losses',
    recentMatches: 'Recent Matches',
    opponent: 'Opponent',
    result: 'Result',
    score: 'Score',
    tournament: 'Tournament',
    date: 'Date',
    win: 'Win',
    loss: 'Loss',
    kda: 'K/D/A',
    searchMatches: 'Search matches...',
    emptyMessage: 'No matches found',
    clearSearch: 'Clear search',
    next: 'Next',
    previous: 'Previous',
    unlocked: 'Unlocked',
    locked: 'Locked',
    // Achievement titles
    firstBlood: 'First Blood',
    firstBloodDesc: 'Get the first elimination in a competitive match',
    tournamentWinner: 'Tournament Winner',
    tournamentWinnerDesc: 'Win a major tournament championship',
    hundredMatches: '100 Matches',
    hundredMatchesDesc: 'Complete 100 competitive matches',
    diamondRank: 'Diamond Rank',
    diamondRankDesc: 'Reach Diamond rank in competitive play',
    legendary: 'Legendary',
    legendaryDesc: 'Reach Legendary rank (top 0.1%)',
    perfectGame: 'Perfect Game',
    perfectGameDesc: 'Win a match without a single death',
    // Achievement dates
    firstBloodDate: 'Jan 15, 2026',
    tournamentWinnerDate: 'Feb 28, 2026',
    hundredMatchesDate: 'Mar 5, 2026',
    diamondRankDate: 'Mar 10, 2026',
    // Tournaments
    gulfCup: 'Gulf Esports Cup',
    proLeague: 'Pro League S3',
    ramadanChamp: 'Ramadan Championship',
  },
  ar: {
    gamertag: 'فالكون إكس',
    realName: 'سلطان الحربي',
    teamName: 'ذئاب الخليج',
    rankLabel: 'الماس II',
    level: 'المستوى ٤٢',
    xpLabel: '٧٬٢٠٠ / ١٠٬٠٠٠ نقطة خبرة',
    overviewTab: 'نظرة عامة',
    matchHistoryTab: 'سجل المباريات',
    achievementsTab: 'الإنجازات',
    totalMatches: 'إجمالي المباريات',
    winRate: 'نسبة الفوز',
    avgKd: 'معدل القتل/الوفاة',
    globalRank: 'التصنيف العالمي',
    fromLastMonth: 'عن الشهر الماضي',
    winsVsLosses: 'الانتصارات والهزائم',
    wins: 'انتصارات',
    losses: 'هزائم',
    recentMatches: 'أحدث المباريات',
    opponent: 'الخصم',
    result: 'النتيجة',
    score: 'النتيجة',
    tournament: 'البطولة',
    date: 'التاريخ',
    win: 'فوز',
    loss: 'خسارة',
    kda: 'قتل/وفاة/مساعدة',
    searchMatches: 'ابحث في المباريات...',
    emptyMessage: 'لا توجد مباريات',
    clearSearch: 'مسح البحث',
    next: 'التالي',
    previous: 'السابق',
    unlocked: 'مفتوح',
    locked: 'مقفل',
    // Achievement titles
    firstBlood: 'الضربة الأولى',
    firstBloodDesc: 'احصل على أول إقصاء في مباراة تنافسية',
    tournamentWinner: 'بطل البطولة',
    tournamentWinnerDesc: 'فز ببطولة كبرى',
    hundredMatches: '١٠٠ مباراة',
    hundredMatchesDesc: 'أكمل ١٠٠ مباراة تنافسية',
    diamondRank: 'رتبة الماس',
    diamondRankDesc: 'وصول إلى رتبة الماس في اللعب التنافسي',
    legendary: 'أسطوري',
    legendaryDesc: 'وصول إلى الرتبة الأسطورية (أفضل ٠٫١٪)',
    perfectGame: 'لعبة مثالية',
    perfectGameDesc: 'فز بمباراة دون أي وفاة',
    // Achievement dates
    firstBloodDate: '١٥ يناير ٢٠٢٦',
    tournamentWinnerDate: '٢٨ فبراير ٢٠٢٦',
    hundredMatchesDate: '٥ مارس ٢٠٢٦',
    diamondRankDate: '١٠ مارس ٢٠٢٦',
    // Tournaments
    gulfCup: 'كأس الخليج',
    proLeague: 'دوري المحترفين',
    ramadanChamp: 'بطولة رمضان',
  },
}

// ---------------------------------------------------------------------------
// Teams (for opponent display)
// ---------------------------------------------------------------------------

const teamNames: Record<string, { en: string; ar: string }> = {
  riyadhFalcons: { en: 'Riyadh Falcons', ar: 'صقور الرياض' },
  dohaStars: { en: 'Doha Stars', ar: 'نجوم الدوحة' },
  jeddahChampions: { en: 'Jeddah Champions', ar: 'أبطال جدة' },
  abuDhabiKnights: { en: 'Abu Dhabi Knights', ar: 'فرسان أبوظبي' },
  manamaTigers: { en: 'Manama Tigers', ar: 'نمور المنامة' },
  muscatEagles: { en: 'Muscat Eagles', ar: 'عقبان مسقط' },
  kuwaitThunder: { en: 'Kuwait Thunder', ar: 'رعود الكويت' },
}

// ---------------------------------------------------------------------------
// Recent matches (5 for overview)
// ---------------------------------------------------------------------------

interface RecentMatch {
  id: string
  opponentKey: string
  result: 'win' | 'loss'
  score: string
  tournamentEn: string
  tournamentAr: string
  dateEn: string
  dateAr: string
}

const recentMatches: RecentMatch[] = [
  { id: 'rm1', opponentKey: 'riyadhFalcons', result: 'win', score: '3-1', tournamentEn: 'Gulf Esports Cup', tournamentAr: 'كأس الخليج', dateEn: 'Mar 16', dateAr: '١٦ مارس' },
  { id: 'rm2', opponentKey: 'dohaStars', result: 'win', score: '2-0', tournamentEn: 'Pro League S3', tournamentAr: 'دوري المحترفين', dateEn: 'Mar 14', dateAr: '١٤ مارس' },
  { id: 'rm3', opponentKey: 'jeddahChampions', result: 'loss', score: '1-2', tournamentEn: 'Gulf Esports Cup', tournamentAr: 'كأس الخليج', dateEn: 'Mar 12', dateAr: '١٢ مارس' },
  { id: 'rm4', opponentKey: 'abuDhabiKnights', result: 'win', score: '3-0', tournamentEn: 'Ramadan Championship', tournamentAr: 'بطولة رمضان', dateEn: 'Mar 10', dateAr: '١٠ مارس' },
  { id: 'rm5', opponentKey: 'manamaTigers', result: 'win', score: '2-1', tournamentEn: 'Pro League S3', tournamentAr: 'دوري المحترفين', dateEn: 'Mar 8', dateAr: '٨ مارس' },
]

// ---------------------------------------------------------------------------
// Full match history (15 rows for DataTable)
// ---------------------------------------------------------------------------

interface MatchHistoryRow {
  id: string
  dateEn: string
  dateAr: string
  tournamentEn: string
  tournamentAr: string
  opponentKey: string
  result: 'win' | 'loss'
  score: string
  kda: string
}

const matchHistory: MatchHistoryRow[] = [
  { id: 'mh1', dateEn: 'Mar 16', dateAr: '١٦ مارس', tournamentEn: 'Gulf Esports Cup', tournamentAr: 'كأس الخليج', opponentKey: 'riyadhFalcons', result: 'win', score: '3-1', kda: '18/5/12' },
  { id: 'mh2', dateEn: 'Mar 14', dateAr: '١٤ مارس', tournamentEn: 'Pro League S3', tournamentAr: 'دوري المحترفين', opponentKey: 'dohaStars', result: 'win', score: '2-0', kda: '14/3/8' },
  { id: 'mh3', dateEn: 'Mar 12', dateAr: '١٢ مارس', tournamentEn: 'Gulf Esports Cup', tournamentAr: 'كأس الخليج', opponentKey: 'jeddahChampions', result: 'loss', score: '1-2', kda: '9/11/6' },
  { id: 'mh4', dateEn: 'Mar 10', dateAr: '١٠ مارس', tournamentEn: 'Ramadan Championship', tournamentAr: 'بطولة رمضان', opponentKey: 'abuDhabiKnights', result: 'win', score: '3-0', kda: '22/4/15' },
  { id: 'mh5', dateEn: 'Mar 8', dateAr: '٨ مارس', tournamentEn: 'Pro League S3', tournamentAr: 'دوري المحترفين', opponentKey: 'manamaTigers', result: 'win', score: '2-1', kda: '16/8/10' },
  { id: 'mh6', dateEn: 'Mar 6', dateAr: '٦ مارس', tournamentEn: 'Gulf Esports Cup', tournamentAr: 'كأس الخليج', opponentKey: 'muscatEagles', result: 'win', score: '3-0', kda: '20/2/13' },
  { id: 'mh7', dateEn: 'Mar 4', dateAr: '٤ مارس', tournamentEn: 'Pro League S3', tournamentAr: 'دوري المحترفين', opponentKey: 'kuwaitThunder', result: 'win', score: '2-0', kda: '15/6/9' },
  { id: 'mh8', dateEn: 'Mar 2', dateAr: '٢ مارس', tournamentEn: 'Ramadan Championship', tournamentAr: 'بطولة رمضان', opponentKey: 'riyadhFalcons', result: 'loss', score: '1-3', kda: '10/14/7' },
  { id: 'mh9', dateEn: 'Feb 28', dateAr: '٢٨ فبراير', tournamentEn: 'Gulf Esports Cup', tournamentAr: 'كأس الخليج', opponentKey: 'dohaStars', result: 'win', score: '2-1', kda: '17/9/11' },
  { id: 'mh10', dateEn: 'Feb 26', dateAr: '٢٦ فبراير', tournamentEn: 'Pro League S3', tournamentAr: 'دوري المحترفين', opponentKey: 'abuDhabiKnights', result: 'win', score: '3-1', kda: '19/7/14' },
  { id: 'mh11', dateEn: 'Feb 24', dateAr: '٢٤ فبراير', tournamentEn: 'Ramadan Championship', tournamentAr: 'بطولة رمضان', opponentKey: 'manamaTigers', result: 'loss', score: '0-2', kda: '5/12/3' },
  { id: 'mh12', dateEn: 'Feb 22', dateAr: '٢٢ فبراير', tournamentEn: 'Gulf Esports Cup', tournamentAr: 'كأس الخليج', opponentKey: 'jeddahChampions', result: 'win', score: '2-0', kda: '13/4/10' },
  { id: 'mh13', dateEn: 'Feb 20', dateAr: '٢٠ فبراير', tournamentEn: 'Pro League S3', tournamentAr: 'دوري المحترفين', opponentKey: 'muscatEagles', result: 'win', score: '3-0', kda: '21/3/16' },
  { id: 'mh14', dateEn: 'Feb 18', dateAr: '١٨ فبراير', tournamentEn: 'Ramadan Championship', tournamentAr: 'بطولة رمضان', opponentKey: 'kuwaitThunder', result: 'win', score: '2-1', kda: '16/7/12' },
  { id: 'mh15', dateEn: 'Feb 16', dateAr: '١٦ فبراير', tournamentEn: 'Gulf Esports Cup', tournamentAr: 'كأس الخليج', opponentKey: 'riyadhFalcons', result: 'loss', score: '1-2', kda: '8/10/5' },
]

// ---------------------------------------------------------------------------
// Achievements
// ---------------------------------------------------------------------------

interface Achievement {
  id: string
  titleKey: keyof typeof t.en
  descKey: keyof typeof t.en
  dateKey?: keyof typeof t.en
  unlocked: boolean
  icon: React.ReactNode
}

const achievements: Achievement[] = [
  { id: 'a1', titleKey: 'firstBlood', descKey: 'firstBloodDesc', dateKey: 'firstBloodDate', unlocked: true, icon: <Sword className="h-8 w-8" weight="duotone" /> },
  { id: 'a2', titleKey: 'tournamentWinner', descKey: 'tournamentWinnerDesc', dateKey: 'tournamentWinnerDate', unlocked: true, icon: <Trophy className="h-8 w-8" weight="duotone" /> },
  { id: 'a3', titleKey: 'hundredMatches', descKey: 'hundredMatchesDesc', dateKey: 'hundredMatchesDate', unlocked: true, icon: <GameController className="h-8 w-8" weight="duotone" /> },
  { id: 'a4', titleKey: 'diamondRank', descKey: 'diamondRankDesc', dateKey: 'diamondRankDate', unlocked: true, icon: <Crown className="h-8 w-8" weight="duotone" /> },
  { id: 'a5', titleKey: 'legendary', descKey: 'legendaryDesc', unlocked: false, icon: <Star className="h-8 w-8" weight="duotone" /> },
  { id: 'a6', titleKey: 'perfectGame', descKey: 'perfectGameDesc', unlocked: false, icon: <Lightning className="h-8 w-8" weight="duotone" /> },
]

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function PlayerProfilePage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]

  const opponentName = (key: string) => teamNames[key]?.[locale] ?? key

  // Match history pagination
  const [matchPage, setMatchPage] = React.useState(1)
  const [matchSearch, setMatchSearch] = React.useState('')
  const matchPageSize = 10

  const filteredMatches = React.useMemo(() => {
    if (!matchSearch) return matchHistory
    const q = matchSearch.toLowerCase()
    return matchHistory.filter(
      (m) =>
        (teamNames[m.opponentKey]?.en ?? '').toLowerCase().includes(q) ||
        (teamNames[m.opponentKey]?.ar ?? '').includes(q) ||
        m.tournamentEn.toLowerCase().includes(q) ||
        m.tournamentAr.includes(q) ||
        m.kda.includes(q)
    )
  }, [matchSearch])

  const matchTotalPages = Math.max(1, Math.ceil(filteredMatches.length / matchPageSize))
  const paginatedMatches = filteredMatches.slice(
    (matchPage - 1) * matchPageSize,
    matchPage * matchPageSize
  )

  // Match history columns
  const matchColumns: ColumnDef<MatchHistoryRow>[] = [
    {
      id: 'date',
      header: h.date,
      accessorKey: 'dateEn',
      cell: (row) => (
        <span className="text-muted-foreground text-sm">
          {locale === 'ar' ? row.dateAr : row.dateEn}
        </span>
      ),
    },
    {
      id: 'tournament',
      header: h.tournament,
      accessorKey: 'tournamentEn',
      cell: (row) => (
        <span className="text-sm">{locale === 'ar' ? row.tournamentAr : row.tournamentEn}</span>
      ),
    },
    {
      id: 'opponent',
      header: h.opponent,
      accessorKey: 'opponentKey',
      cell: (row) => <span className="font-medium">{opponentName(row.opponentKey)}</span>,
    },
    {
      id: 'result',
      header: h.result,
      accessorKey: 'result',
      cell: (row) => (
        <Badge variant={row.result === 'win' ? 'default' : 'destructive'} className="text-xs">
          {row.result === 'win' ? h.win : h.loss}
        </Badge>
      ),
    },
    {
      id: 'score',
      header: h.score,
      accessorKey: 'score',
      align: 'center',
      cell: (row) => <span className="font-semibold tabular-nums">{row.score}</span>,
    },
    {
      id: 'kda',
      header: h.kda,
      accessorKey: 'kda',
      align: 'end',
      cell: (row) => <span className="tabular-nums text-muted-foreground">{row.kda}</span>,
    },
  ]

  // Donut chart data for wins vs losses
  const winsLossesData = [
    { category: h.wins, value: 159 },
    { category: h.losses, value: 88 },
  ]

  // Formatted win rate for donut inner label
  const fmt = React.useMemo(
    () =>
      new Intl.NumberFormat(
        locale === 'ar' ? 'ar-SA' : 'en-US',
        locale === 'ar' ? { numberingSystem: 'arab' } : undefined
      ),
    [locale]
  )
  const winRateLabel = `${fmt.format(64.3)}%`
  const winRateSubLabel = h.winRate

  // Page label helper
  const pageLabel = (current: number, total: number) =>
    locale === 'ar'
      ? `${new Intl.NumberFormat('ar-SA', { numberingSystem: 'arab' }).format(current)} / ${new Intl.NumberFormat('ar-SA', { numberingSystem: 'arab' }).format(total)}`
      : `${current} / ${total}`

  return (
    <div className="container py-8">
      {/* ----------------------------------------------------------------- */}
      {/* Profile Header                                                    */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
        {/* Avatar */}
        <div className="h-20 w-20 overflow-hidden rounded-xl shrink-0">
          <img
            src="/examples/esports/avatar.jpg"
            alt={h.gamertag}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-3">
          <div>
            <h1 className="text-3xl font-bold ltr:tracking-tight">{h.gamertag}</h1>
            <p className="text-muted-foreground">{h.realName}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{h.teamName}</Badge>
            <Badge variant="default">{h.rankLabel}</Badge>
          </div>

          {/* Level + XP */}
          <div className="max-w-xs space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{h.level}</span>
              <span className="text-muted-foreground">{h.xpLabel}</span>
            </div>
            <Progress value={72} />
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* ----------------------------------------------------------------- */}
      {/* Tabs: Overview | Match History | Achievements                     */}
      {/* ----------------------------------------------------------------- */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">{h.overviewTab}</TabsTrigger>
          <TabsTrigger value="history">{h.matchHistoryTab}</TabsTrigger>
          <TabsTrigger value="achievements">{h.achievementsTab}</TabsTrigger>
        </TabsList>

        {/* ------------------------------------------------------------- */}
        {/* Overview Tab                                                   */}
        {/* ------------------------------------------------------------- */}
        <TabsContent value="overview">
          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              icon={<GameController className="h-4 w-4" />}
              label={h.totalMatches}
              value="247"
              trend={12}
              trendLabel={h.fromLastMonth}
            />
            <StatsCard
              icon={<Target className="h-4 w-4" />}
              label={h.winRate}
              value="64.3%"
              trend={3.2}
              trendLabel={h.fromLastMonth}
            />
            <StatsCard
              icon={<Crosshair className="h-4 w-4" />}
              label={h.avgKd}
              value="1.85"
              trend={0.15}
              trendLabel={h.fromLastMonth}
            />
            <StatsCard
              icon={<Medal className="h-4 w-4" />}
              label={h.globalRank}
              value="#12"
              trend={3}
              trendLabel={h.fromLastMonth}
            />
          </div>

          {/* Donut Chart + Recent Matches */}
          <div className="grid gap-6 lg:grid-cols-2 mb-8">
            {/* Wins vs Losses Donut */}
            <Card>
              <CardHeader>
                <CardTitle>{h.winsVsLosses}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <Chart
                    type="donut"
                    data={winsLossesData}
                    categoryKey="category"
                    valueKey="value"
                    innerLabel={winRateLabel}
                    innerSubLabel={winRateSubLabel}
                    colors={['var(--color-success)', 'var(--color-destructive)']}
                    thickness="thick"
                    size="md"
                    aria-label={h.winsVsLosses}
                  />
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success" />
                      <span className="text-muted-foreground">{h.wins}</span>
                      <span className="font-semibold">
                        <ArabicNumber value={159} locale={locale} variant="inline" />
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">{h.losses}</span>
                      <span className="font-semibold">
                        <ArabicNumber value={88} locale={locale} variant="inline" />
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent 5 Matches */}
            <Card>
              <CardHeader>
                <CardTitle>{h.recentMatches}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {recentMatches.map((match, idx) => (
                  <div key={match.id}>
                    <div className="flex items-center justify-between py-3 gap-3">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="font-medium truncate">
                          {opponentName(match.opponentKey)}
                        </span>
                        <Badge
                          variant={match.result === 'win' ? 'default' : 'destructive'}
                          className="text-xs shrink-0"
                        >
                          {match.result === 'win' ? h.win : h.loss}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="font-semibold tabular-nums">{match.score}</span>
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          {locale === 'ar' ? match.tournamentAr : match.tournamentEn}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {locale === 'ar' ? match.dateAr : match.dateEn}
                        </span>
                      </div>
                    </div>
                    {idx < recentMatches.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ------------------------------------------------------------- */}
        {/* Match History Tab                                              */}
        {/* ------------------------------------------------------------- */}
        <TabsContent value="history">
          <DataTable<MatchHistoryRow>
            data={paginatedMatches}
            columns={matchColumns}
            searchable
            searchPlaceholder={h.searchMatches}
            searchValue={matchSearch}
            onSearchChange={(v) => {
              setMatchSearch(v)
              setMatchPage(1)
            }}
            clearSearchLabel={h.clearSearch}
            emptyMessage={h.emptyMessage}
            striped
            hoverable
            pagination
            currentPage={matchPage}
            totalPages={matchTotalPages}
            pageSize={matchPageSize}
            onPageChange={setMatchPage}
            nextLabel={h.next}
            previousLabel={h.previous}
            pageLabel={pageLabel(matchPage, matchTotalPages)}
            enableSorting
          />
        </TabsContent>

        {/* ------------------------------------------------------------- */}
        {/* Achievements Tab                                               */}
        {/* ------------------------------------------------------------- */}
        <TabsContent value="achievements">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((ach) => (
              <Card key={ach.id} className={!ach.unlocked ? 'opacity-50' : ''}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        {ach.icon}
                      </div>
                      {!ach.unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-xl">
                          <Lock className="h-5 w-5 text-muted-foreground" weight="bold" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="font-semibold">{h[ach.titleKey]}</h3>
                      <p className="text-sm text-muted-foreground">
                        {h[ach.descKey]}
                      </p>
                      {ach.unlocked && ach.dateKey && (
                        <p className="text-xs text-muted-foreground">
                          {h[ach.dateKey]}
                        </p>
                      )}
                      {!ach.unlocked && (
                        <Badge variant="outline" className="text-xs">
                          {h.locked}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
