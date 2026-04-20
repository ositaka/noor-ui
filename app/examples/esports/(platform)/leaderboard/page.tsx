'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable, type ColumnDef } from '@/components/ui/data-table'
import { Chart } from '@/components/ui/chart'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useDirection } from '@/components/providers/direction-provider'
import { Trophy } from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const t = {
  en: {
    pageTitle: 'Global Leaderboard',
    pageSubtitle: 'Rankings across all tournaments and seasons',
    playersTab: 'Players',
    teamsTab: 'Teams',
    rank: '#',
    player: 'Player',
    team: 'Team',
    points: 'Points',
    wins: 'Wins',
    losses: 'Losses',
    winRate: 'Win Rate',
    streak: 'Streak',
    teamName: 'Team Name',
    searchPlayers: 'Search players...',
    searchTeams: 'Search teams...',
    emptyMessage: 'No results found',
    clearSearch: 'Clear search',
    next: 'Next',
    previous: 'Previous',
    topPlayersByPoints: 'Top 10 Players by Points',
    winStreak: 'W',
    lossStreak: 'L',
  },
  ar: {
    pageTitle: 'لوحة المتصدرين',
    pageSubtitle: 'التصنيفات عبر جميع البطولات والمواسم',
    playersTab: 'اللاعبون',
    teamsTab: 'الفرق',
    rank: '#',
    player: 'اللاعب',
    team: 'الفريق',
    points: 'النقاط',
    wins: 'انتصارات',
    losses: 'هزائم',
    winRate: 'نسبة الفوز',
    streak: 'السلسلة',
    teamName: 'اسم الفريق',
    searchPlayers: 'ابحث عن لاعب...',
    searchTeams: 'ابحث عن فريق...',
    emptyMessage: 'لا توجد نتائج',
    clearSearch: 'مسح البحث',
    next: 'التالي',
    previous: 'السابق',
    topPlayersByPoints: 'أفضل ١٠ لاعبين حسب النقاط',
    winStreak: 'ف',
    lossStreak: 'خ',
  },
}

// ---------------------------------------------------------------------------
// Team data (shared with home page pattern)
// ---------------------------------------------------------------------------

const teams = {
  gulfWolves: { en: 'Gulf Wolves', ar: 'ذئاب الخليج' },
  riyadhFalcons: { en: 'Riyadh Falcons', ar: 'صقور الرياض' },
  dohaStars: { en: 'Doha Stars', ar: 'نجوم الدوحة' },
  jeddahChampions: { en: 'Jeddah Champions', ar: 'أبطال جدة' },
  abuDhabiKnights: { en: 'Abu Dhabi Knights', ar: 'فرسان أبوظبي' },
  manamaTigers: { en: 'Manama Tigers', ar: 'نمور المنامة' },
  muscatEagles: { en: 'Muscat Eagles', ar: 'عقبان مسقط' },
  kuwaitThunder: { en: 'Kuwait Thunder', ar: 'رعود الكويت' },
}

// ---------------------------------------------------------------------------
// Player data
// ---------------------------------------------------------------------------

interface PlayerRow {
  rank: number
  gamertag: string
  teamKey: keyof typeof teams
  points: number
  wins: number
  losses: number
  winRate: number
  streakCount: number
  streakType: 'W' | 'L'
}

const players: PlayerRow[] = [
  { rank: 1, gamertag: 'FalconX', teamKey: 'gulfWolves', points: 2450, wins: 28, losses: 8, winRate: 77.8, streakCount: 5, streakType: 'W' },
  { rank: 2, gamertag: 'ShadowBlade', teamKey: 'riyadhFalcons', points: 2280, wins: 25, losses: 11, winRate: 69.4, streakCount: 3, streakType: 'W' },
  { rank: 3, gamertag: 'NeonStrike', teamKey: 'dohaStars', points: 2150, wins: 23, losses: 13, winRate: 63.9, streakCount: 2, streakType: 'W' },
  { rank: 4, gamertag: 'IcePhoenix', teamKey: 'jeddahChampions', points: 1980, wins: 20, losses: 16, winRate: 55.6, streakCount: 1, streakType: 'L' },
  { rank: 5, gamertag: 'VoidWalker', teamKey: 'abuDhabiKnights', points: 1820, wins: 18, losses: 18, winRate: 50.0, streakCount: 2, streakType: 'L' },
  { rank: 6, gamertag: 'StormRider', teamKey: 'riyadhFalcons', points: 1750, wins: 17, losses: 19, winRate: 47.2, streakCount: 1, streakType: 'W' },
  { rank: 7, gamertag: 'TigerClaw', teamKey: 'manamaTigers', points: 1700, wins: 16, losses: 20, winRate: 44.4, streakCount: 3, streakType: 'L' },
  { rank: 8, gamertag: 'ThunderGod', teamKey: 'kuwaitThunder', points: 1650, wins: 15, losses: 21, winRate: 41.7, streakCount: 1, streakType: 'W' },
  { rank: 9, gamertag: 'EagleSoar', teamKey: 'muscatEagles', points: 1580, wins: 14, losses: 22, winRate: 38.9, streakCount: 2, streakType: 'L' },
  { rank: 10, gamertag: 'StarDust', teamKey: 'dohaStars', points: 1520, wins: 13, losses: 23, winRate: 36.1, streakCount: 1, streakType: 'L' },
  { rank: 11, gamertag: 'KnightRise', teamKey: 'abuDhabiKnights', points: 1480, wins: 12, losses: 24, winRate: 33.3, streakCount: 4, streakType: 'L' },
  { rank: 12, gamertag: 'DarkMatter', teamKey: 'riyadhFalcons', points: 1420, wins: 11, losses: 25, winRate: 30.6, streakCount: 1, streakType: 'W' },
  { rank: 13, gamertag: 'IronWill', teamKey: 'jeddahChampions', points: 1380, wins: 10, losses: 26, winRate: 27.8, streakCount: 2, streakType: 'L' },
  { rank: 14, gamertag: 'BlazeFury', teamKey: 'riyadhFalcons', points: 1340, wins: 9, losses: 27, winRate: 25.0, streakCount: 3, streakType: 'L' },
  { rank: 15, gamertag: 'SandStorm', teamKey: 'manamaTigers', points: 1300, wins: 8, losses: 28, winRate: 22.2, streakCount: 5, streakType: 'L' },
]

// ---------------------------------------------------------------------------
// Team leaderboard data (aggregated)
// ---------------------------------------------------------------------------

interface TeamRow {
  rank: number
  teamKey: keyof typeof teams
  points: number
  wins: number
  losses: number
  winRate: number
}

const teamLeaderboard: TeamRow[] = [
  { rank: 1, teamKey: 'gulfWolves', points: 4820, wins: 52, losses: 18, winRate: 74.3 },
  { rank: 2, teamKey: 'riyadhFalcons', points: 4350, wins: 46, losses: 24, winRate: 65.7 },
  { rank: 3, teamKey: 'dohaStars', points: 3670, wins: 36, losses: 34, winRate: 51.4 },
  { rank: 4, teamKey: 'jeddahChampions', points: 3360, wins: 30, losses: 40, winRate: 42.9 },
  { rank: 5, teamKey: 'abuDhabiKnights', points: 3300, wins: 30, losses: 40, winRate: 42.9 },
  { rank: 6, teamKey: 'manamaTigers', points: 3000, wins: 24, losses: 46, winRate: 34.3 },
  { rank: 7, teamKey: 'kuwaitThunder', points: 2890, wins: 22, losses: 48, winRate: 31.4 },
  { rank: 8, teamKey: 'muscatEagles', points: 2610, wins: 18, losses: 52, winRate: 25.7 },
]

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function LeaderboardPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]

  const teamName = (key: keyof typeof teams) => teams[key][locale]

  // Player pagination state
  const [playerPage, setPlayerPage] = React.useState(1)
  const [playerSearch, setPlayerSearch] = React.useState('')
  const playerPageSize = 10

  // Team pagination state
  const [teamPage, setTeamPage] = React.useState(1)
  const [teamSearch, setTeamSearch] = React.useState('')
  const teamPageSize = 10

  // Filter and paginate players
  const filteredPlayers = React.useMemo(() => {
    if (!playerSearch) return players
    const q = playerSearch.toLowerCase()
    return players.filter(
      (p) =>
        p.gamertag.toLowerCase().includes(q) ||
        teams[p.teamKey].en.toLowerCase().includes(q) ||
        teams[p.teamKey].ar.includes(q)
    )
  }, [playerSearch])

  const playerTotalPages = Math.max(1, Math.ceil(filteredPlayers.length / playerPageSize))
  const paginatedPlayers = filteredPlayers.slice(
    (playerPage - 1) * playerPageSize,
    playerPage * playerPageSize
  )

  // Filter and paginate teams
  const filteredTeams = React.useMemo(() => {
    if (!teamSearch) return teamLeaderboard
    const q = teamSearch.toLowerCase()
    return teamLeaderboard.filter(
      (t) =>
        teams[t.teamKey].en.toLowerCase().includes(q) ||
        teams[t.teamKey].ar.includes(q)
    )
  }, [teamSearch])

  const teamTotalPages = Math.max(1, Math.ceil(filteredTeams.length / teamPageSize))
  const paginatedTeams = filteredTeams.slice(
    (teamPage - 1) * teamPageSize,
    teamPage * teamPageSize
  )

  // Rank cell renderer with medal tints for top 3
  const rankCell = (row: PlayerRow | TeamRow) => {
    if (row.rank === 1) {
      return (
        <Badge variant="outline" className="bg-warning/20 border-warning/30 text-warning-foreground font-bold">
          <ArabicNumber value={1} locale={locale} variant="inline" />
        </Badge>
      )
    }
    if (row.rank === 2) {
      return (
        <Badge variant="outline" className="bg-muted border-muted-foreground/20 font-bold">
          <ArabicNumber value={2} locale={locale} variant="inline" />
        </Badge>
      )
    }
    if (row.rank === 3) {
      return (
        <Badge variant="outline" className="bg-warning/10 border-warning/20 text-warning-foreground font-bold">
          <ArabicNumber value={3} locale={locale} variant="inline" />
        </Badge>
      )
    }
    return <ArabicNumber value={row.rank} locale={locale} variant="inline" />
  }

  // Player columns
  const playerColumns: ColumnDef<PlayerRow>[] = [
    {
      id: 'rank',
      header: h.rank,
      accessorKey: 'rank',
      sortable: true,
      cell: rankCell,
      width: '60px',
    },
    {
      id: 'gamertag',
      header: h.player,
      accessorKey: 'gamertag',
      sortable: true,
      cell: (row) => <span className="font-semibold">{row.gamertag}</span>,
    },
    {
      id: 'team',
      header: h.team,
      accessorKey: 'teamKey',
      cell: (row) => (
        <span className="text-muted-foreground">{teamName(row.teamKey)}</span>
      ),
    },
    {
      id: 'points',
      header: h.points,
      accessorKey: 'points',
      sortable: true,
      align: 'end',
      cell: (row) => (
        <span className="font-semibold tabular-nums">
          <ArabicNumber value={row.points} locale={locale} format="number" />
        </span>
      ),
    },
    {
      id: 'wins',
      header: h.wins,
      accessorKey: 'wins',
      sortable: true,
      align: 'end',
      cell: (row) => (
        <span className="text-success tabular-nums">
          <ArabicNumber value={row.wins} locale={locale} variant="inline" />
        </span>
      ),
    },
    {
      id: 'losses',
      header: h.losses,
      accessorKey: 'losses',
      sortable: true,
      align: 'end',
      cell: (row) => (
        <span className="text-destructive tabular-nums">
          <ArabicNumber value={row.losses} locale={locale} variant="inline" />
        </span>
      ),
    },
    {
      id: 'winRate',
      header: h.winRate,
      accessorKey: 'winRate',
      sortable: true,
      align: 'end',
      cell: (row) => (
        <span className="tabular-nums">
          <ArabicNumber value={row.winRate} locale={locale} variant="inline" />%
        </span>
      ),
    },
    {
      id: 'streak',
      header: h.streak,
      accessorKey: 'streakCount',
      align: 'end',
      cell: (row) => {
        const isWin = row.streakType === 'W'
        const label = isWin ? h.winStreak : h.lossStreak
        return (
          <Badge variant={isWin ? 'default' : 'destructive'} className="text-xs">
            <ArabicNumber value={row.streakCount} locale={locale} variant="inline" />{label}
          </Badge>
        )
      },
    },
  ]

  // Team columns
  const teamColumns: ColumnDef<TeamRow>[] = [
    {
      id: 'rank',
      header: h.rank,
      accessorKey: 'rank',
      sortable: true,
      cell: rankCell,
      width: '60px',
    },
    {
      id: 'teamName',
      header: h.teamName,
      accessorKey: 'teamKey',
      cell: (row) => <span className="font-semibold">{teamName(row.teamKey)}</span>,
    },
    {
      id: 'points',
      header: h.points,
      accessorKey: 'points',
      sortable: true,
      align: 'end',
      cell: (row) => (
        <span className="font-semibold tabular-nums">
          <ArabicNumber value={row.points} locale={locale} format="number" />
        </span>
      ),
    },
    {
      id: 'wins',
      header: h.wins,
      accessorKey: 'wins',
      sortable: true,
      align: 'end',
      cell: (row) => (
        <span className="text-success tabular-nums">
          <ArabicNumber value={row.wins} locale={locale} variant="inline" />
        </span>
      ),
    },
    {
      id: 'losses',
      header: h.losses,
      accessorKey: 'losses',
      sortable: true,
      align: 'end',
      cell: (row) => (
        <span className="text-destructive tabular-nums">
          <ArabicNumber value={row.losses} locale={locale} variant="inline" />
        </span>
      ),
    },
    {
      id: 'winRate',
      header: h.winRate,
      accessorKey: 'winRate',
      sortable: true,
      align: 'end',
      cell: (row) => (
        <span className="tabular-nums">
          <ArabicNumber value={row.winRate} locale={locale} variant="inline" />%
        </span>
      ),
    },
  ]

  // Chart data — top 10 players by points
  const chartData = players.slice(0, 10).map((p) => ({
    player: p.gamertag,
    points: p.points,
  }))

  // Page label helper
  const pageLabel = (current: number, total: number) =>
    locale === 'ar'
      ? `${new Intl.NumberFormat('ar-SA', { numberingSystem: 'arab' }).format(current)} / ${new Intl.NumberFormat('ar-SA', { numberingSystem: 'arab' }).format(total)}`
      : `${current} / ${total}`

  return (
    <div className="container py-8">
      {/* ----------------------------------------------------------------- */}
      {/* Page Header                                                       */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl">
          <Trophy className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div>
          <h1 className="text-3xl font-bold ltr:tracking-tight">{h.pageTitle}</h1>
          <p className="text-muted-foreground text-sm">{h.pageSubtitle}</p>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Tabs: Players | Teams                                             */}
      {/* ----------------------------------------------------------------- */}
      <Tabs defaultValue="players" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="players">{h.playersTab}</TabsTrigger>
          <TabsTrigger value="teams">{h.teamsTab}</TabsTrigger>
        </TabsList>

        {/* Players Tab */}
        <TabsContent value="players">
          <DataTable<PlayerRow>
            data={paginatedPlayers}
            columns={playerColumns}
            searchable
            searchPlaceholder={h.searchPlayers}
            searchValue={playerSearch}
            onSearchChange={(v) => {
              setPlayerSearch(v)
              setPlayerPage(1)
            }}
            clearSearchLabel={h.clearSearch}
            emptyMessage={h.emptyMessage}
            striped
            hoverable
            pagination
            currentPage={playerPage}
            totalPages={playerTotalPages}
            pageSize={playerPageSize}
            onPageChange={setPlayerPage}
            nextLabel={h.next}
            previousLabel={h.previous}
            pageLabel={pageLabel(playerPage, playerTotalPages)}
            enableSorting
            defaultSortBy="rank"
            defaultSortDirection="asc"
          />
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams">
          <DataTable<TeamRow>
            data={paginatedTeams}
            columns={teamColumns}
            searchable
            searchPlaceholder={h.searchTeams}
            searchValue={teamSearch}
            onSearchChange={(v) => {
              setTeamSearch(v)
              setTeamPage(1)
            }}
            clearSearchLabel={h.clearSearch}
            emptyMessage={h.emptyMessage}
            striped
            hoverable
            pagination
            currentPage={teamPage}
            totalPages={teamTotalPages}
            pageSize={teamPageSize}
            onPageChange={setTeamPage}
            nextLabel={h.next}
            previousLabel={h.previous}
            pageLabel={pageLabel(teamPage, teamTotalPages)}
            enableSorting
            defaultSortBy="rank"
            defaultSortDirection="asc"
          />
        </TabsContent>
      </Tabs>

      {/* ----------------------------------------------------------------- */}
      {/* Bar Chart: Top 10 Players by Points                               */}
      {/* ----------------------------------------------------------------- */}
      <Card>
        <CardHeader>
          <CardTitle>{h.topPlayersByPoints}</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart
            type="bar"
            data={chartData}
            categoryKey="player"
            valueKey="points"
            colors={['hsl(270 100% 60%)']}
            size="md"
            showXAxis
            showYAxis
            aria-label={h.topPlayersByPoints}
          />
        </CardContent>
      </Card>
    </div>
  )
}
