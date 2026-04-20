'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CountdownTimer } from '@/components/ui/countdown-timer'
import { LiveIndicator } from '@/components/ui/live-indicator'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { useDirection } from '@/components/providers/direction-provider'
import { useRouter } from 'next/navigation'
import {
  Trophy,
  Users,
  Lightning,
  CurrencyDollar,
  GameController,
  Eye,
} from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Keyframes for gaming effects
// ---------------------------------------------------------------------------
const gamingKeyframes = `
@keyframes livePulse {
  0%, 100% { box-shadow: 0 0 15px -3px hsl(270 100% 60% / 0.2), inset 0 0 15px -8px hsl(270 100% 60% / 0.05); }
  50% { box-shadow: 0 0 25px -2px hsl(270 100% 60% / 0.35), inset 0 0 20px -6px hsl(270 100% 60% / 0.08); }
}
@keyframes featuredGlow {
  0%, 100% { box-shadow: 0 0 30px -10px hsl(270 100% 60% / 0.3); }
  50% { box-shadow: 0 0 45px -5px hsl(270 100% 60% / 0.45); }
}
@keyframes featuredShimmer {
  0% { transform: translateX(-100%) rotate(-15deg); }
  100% { transform: translateX(200%) rotate(-15deg); }
}
@keyframes neonLine {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
@keyframes ambientGlow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .gaming-animate { animation: none !important; }
  .gaming-shimmer::after { animation: none !important; display: none !important; }
}
`

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------
const t = {
  en: {
    pageTitle: 'Tournament Hub',
    pageSubtitle: 'Live matches, upcoming events, and results',
    activeTournaments: 'Active Tournaments',
    onlinePlayers: 'Online Players',
    matchesToday: 'Matches Today',
    totalPrizePool: 'Total Prize Pool',
    liveNow: 'Live Now',
    live: 'Live',
    map: 'Map',
    of: 'of',
    watch: 'Watch',
    featuredTournament: 'Featured Tournament',
    gulfEsportsCup: 'Gulf Esports Cup',
    prize: 'Prize',
    sar: 'SAR',
    teamsFormat: '8 Teams · 5v5 · Single Elimination',
    registrationOpen: 'Registration Open',
    viewTournament: 'View Tournament',
    upcomingTournaments: 'Upcoming Tournaments',
    teams: 'teams',
    comingSoon: 'Coming Soon',
    recentResults: 'Recent Results',
  },
  ar: {
    pageTitle: 'مركز البطولات',
    pageSubtitle: 'المباريات المباشرة والأحداث القادمة والنتائج',
    activeTournaments: 'البطولات النشطة',
    onlinePlayers: 'اللاعبون المتصلون',
    matchesToday: 'مباريات اليوم',
    totalPrizePool: 'إجمالي الجوائز',
    liveNow: 'مباشر الآن',
    live: 'مباشر',
    map: 'الخريطة',
    of: 'من',
    watch: 'مشاهدة',
    featuredTournament: 'البطولة المميزة',
    gulfEsportsCup: 'كأس الخليج للرياضات الإلكترونية',
    prize: 'الجائزة',
    sar: 'ر.س',
    teamsFormat: '٨ فرق · ٥ ضد ٥ · إقصاء فردي',
    registrationOpen: 'التسجيل مفتوح',
    viewTournament: 'عرض البطولة',
    upcomingTournaments: 'البطولات القادمة',
    teams: 'فرق',
    comingSoon: 'قريباً',
    recentResults: 'النتائج الأخيرة',
  },
}

// ---------------------------------------------------------------------------
// Data
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

const liveMatches = [
  { id: 'live-1', teamA: 'gulfWolves' as const, teamB: 'riyadhFalcons' as const, scoreA: 2, scoreB: 1, currentMap: 3, totalMaps: 5 },
  { id: 'live-2', teamA: 'dohaStars' as const, teamB: 'jeddahChampions' as const, scoreA: 1, scoreB: 1, currentMap: 2, totalMaps: 3 },
]

const upcomingTournaments = [
  { id: 'ramadan', nameEn: 'Ramadan Championship', nameAr: 'بطولة رمضان', prize: 200000, teamCount: 16, format: '5v5', formatAr: '٥ ضد ٥', datesEn: 'Apr 20–25', datesAr: '٢٠–٢٥ أبريل', badgeKey: 'comingSoon' as const },
  { id: 'pro-league', nameEn: 'Pro League Season 3', nameAr: 'دوري المحترفين', prize: 300000, teamCount: 12, format: '1v1', formatAr: '١ ضد ١', datesEn: 'May 1–15', datesAr: '١–١٥ مايو', badgeKey: 'registrationOpen' as const },
  { id: 'mobile-legends', nameEn: 'Mobile Legends Cup', nameAr: 'كأس موبايل ليجندز', prize: 150000, teamCount: 8, format: '5v5', formatAr: '٥ ضد ٥', datesEn: 'May 20', datesAr: '٢٠ مايو', badgeKey: 'comingSoon' as const },
]

const recentResults = [
  { id: 'r1', winner: 'gulfWolves' as const, loser: 'manamaTigers' as const, scoreWinner: 3, scoreLoser: 1, tournamentEn: 'Gulf Esports Cup', tournamentAr: 'كأس الخليج' },
  { id: 'r2', winner: 'riyadhFalcons' as const, loser: 'muscatEagles' as const, scoreWinner: 2, scoreLoser: 0, tournamentEn: 'Pro League', tournamentAr: 'دوري المحترفين' },
  { id: 'r3', winner: 'abuDhabiKnights' as const, loser: 'kuwaitThunder' as const, scoreWinner: 2, scoreLoser: 1, tournamentEn: 'Ramadan Championship', tournamentAr: 'بطولة رمضان' },
  { id: 'r4', winner: 'dohaStars' as const, loser: 'jeddahChampions' as const, scoreWinner: 3, scoreLoser: 2, tournamentEn: 'Gulf Esports Cup', tournamentAr: 'كأس الخليج' },
  { id: 'r5', winner: 'gulfWolves' as const, loser: 'abuDhabiKnights' as const, scoreWinner: 2, scoreLoser: 0, tournamentEn: 'Pro League', tournamentAr: 'دوري المحترفين' },
]

// Neon separator
function NeonSeparator() {
  return (
    <div
      className="h-px my-10 gaming-animate"
      style={{
        background: 'linear-gradient(to right, transparent, hsl(270 100% 60% / 0.4), hsl(180 100% 50% / 0.4), transparent)',
        backgroundSize: '200% 100%',
        animation: 'neonLine 4s linear infinite',
      }}
    />
  )
}

// Section header with neon start border
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-bold mb-6 ps-4"
      style={{ borderInlineStart: '3px solid hsl(270 100% 60%)' }}
    >
      {children}
    </h2>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function TournamentHubPage() {
  const { locale } = useDirection()
  const h = t[locale]
  const router = useRouter()
  const teamName = (key: keyof typeof teams) => teams[key][locale]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gamingKeyframes }} />

      <div className="container py-8">
        {/* ── Page Header ── */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-primary/10 rounded-xl">
            <Trophy className="h-10 w-10 text-primary" weight="duotone" />
          </div>
          <div>
            <h1 className="text-3xl font-bold ltr:tracking-tight">{h.pageTitle}</h1>
            <p className="text-muted-foreground">{h.pageSubtitle}</p>
          </div>
        </div>

        {/* ── Stats — gaming maximalist style ── */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-4">
          {[
            { icon: Trophy, label: h.activeTournaments, value: '3', color: 'text-primary' },
            { icon: Users, label: h.onlinePlayers, value: locale === 'ar' ? '١٬٢٤٧' : '1,247', color: 'text-secondary' },
            { icon: Lightning, label: h.matchesToday, value: '8', color: 'text-accent' },
            { icon: CurrencyDollar, label: h.totalPrizePool, value: locale === 'ar' ? '١.٥ مليون ر.س' : '1.5M SAR', color: 'text-success' },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="relative overflow-hidden">
                <CardContent className="p-5">
                  <Icon className={`h-8 w-8 ${stat.color} mb-3`} weight="duotone" />
                  <p className="text-2xl font-bold mb-0.5">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <NeonSeparator />

        {/* ── Live Now — urgent, ambient arena glow ── */}
        <div className="mb-4 relative">
          {/* Ambient radial glow behind live section — arena lights */}
          <div
            className="absolute -top-20 start-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0 gaming-animate"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(270 100% 60% / 0.05) 0%, transparent 65%)',
              filter: 'blur(40px)',
              animation: 'ambientGlow 4s ease-in-out infinite',
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <SectionHeading>
                <span className="flex items-center gap-3">
                  {h.liveNow}
                  <LiveIndicator locale={locale} size="md" />
                </span>
              </SectionHeading>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {liveMatches.map((match) => (
                <div
                  key={match.id}
                  className="gaming-animate rounded-xl border border-primary/20 bg-card p-6"
                  style={{ animation: 'livePulse 2s ease-in-out infinite' }}
                >
                  {/* Top bar: Live badge + map info */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="destructive" className="uppercase tracking-wider">
                      {h.live}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {h.map} {locale === 'ar'
                        ? `${new Intl.NumberFormat('ar-SA', { numberingSystem: 'arab' }).format(match.currentMap)} ${h.of} ${new Intl.NumberFormat('ar-SA', { numberingSystem: 'arab' }).format(match.totalMaps)}`
                        : `${match.currentMap} ${h.of} ${match.totalMaps}`}
                    </span>
                  </div>

                  {/* Score area — BIG and bold */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    {/* Team A */}
                    <div className="flex-1 text-center">
                      <p className="font-bold text-base mb-1 truncate">{teamName(match.teamA)}</p>
                      <p className="text-5xl font-black tabular-nums text-foreground">
                        <ArabicNumber value={match.scoreA} locale={locale} variant="inline" />
                      </p>
                    </div>

                    {/* VS — small, muted, doesn't compete with scores */}
                    <span className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-[0.2em]">vs</span>

                    {/* Team B */}
                    <div className="flex-1 text-center">
                      <p className="font-bold text-base mb-1 truncate">{teamName(match.teamB)}</p>
                      <p className="text-5xl font-black tabular-nums text-foreground">
                        <ArabicNumber value={match.scoreB} locale={locale} variant="inline" />
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
                      <Eye className="h-4 w-4 me-1.5" />
                      {h.watch}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <NeonSeparator />

        {/* ── Featured Tournament — gradient border + glow + shimmer ── */}
        <div className="mb-4">
          <div
            className="rounded-xl p-px"
            style={{
              background: 'linear-gradient(135deg, hsl(270 100% 60%), hsl(180 100% 50%), hsl(300 100% 55%))',
            }}
          >
            <div
              className="gaming-animate gaming-shimmer rounded-[calc(0.75rem-1px)] bg-card p-6 sm:p-8 relative overflow-hidden"
              style={{ animation: 'featuredGlow 3s ease-in-out infinite' }}
            >
              {/* Holographic shimmer sweep */}
              <div
                className="gaming-animate absolute inset-0 pointer-events-none z-0"
                style={{
                  background: 'linear-gradient(115deg, transparent 30%, hsl(270 100% 60% / 0.06) 45%, hsl(180 100% 50% / 0.04) 55%, transparent 70%)',
                  backgroundSize: '200% 100%',
                  animation: 'featuredShimmer 3s ease-in-out infinite',
                }}
              />
              {/* Content sits above shimmer */}
              <div className="relative z-10">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/15 rounded-xl">
                    <GameController className="h-8 w-8 text-primary" weight="duotone" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{h.featuredTournament}</p>
                    <h2 className="text-2xl font-bold">{h.gulfEsportsCup}</h2>
                  </div>
                </div>
                <Badge className="bg-success text-success-foreground text-sm px-3 py-1">
                  {h.registrationOpen}
                </Badge>
              </div>

              {/* Countdown — centered, prominent */}
              <div className="flex justify-center mb-6">
                <CountdownTimer
                  targetDate={new Date('2026-04-14T09:00:00+03:00')}
                  locale={locale}
                  size="lg"
                />
              </div>

              {/* Prize + format row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4" style={{ borderTop: '1px solid hsl(270 100% 60% / 0.2)' }}>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{h.prize}</p>
                  <p className="text-3xl font-black">
                    <ArabicNumber value={500000} locale={locale} format="number" />{' '}
                    <span className="text-lg font-normal text-muted-foreground">{h.sar}</span>
                  </p>
                </div>
                <p className="text-muted-foreground">{h.teamsFormat}</p>
                <Button size="lg" onClick={() => router.push('/examples/esports/tournament/gulf-cup')}>
                  <Trophy className="h-5 w-5 me-2" />
                  {h.viewTournament}
                </Button>
              </div>
              </div>{/* close relative z-10 */}
            </div>
          </div>
        </div>

        <NeonSeparator />

        {/* ── Upcoming Tournaments ── */}
        <div className="mb-4">
          <SectionHeading>{h.upcomingTournaments}</SectionHeading>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingTournaments.map((tourney) => (
              <Card key={tourney.id} className="hover:border-primary/30 transition-colors">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-lg truncate">
                      {locale === 'ar' ? tourney.nameAr : tourney.nameEn}
                    </h3>
                    <Badge
                      variant={tourney.badgeKey === 'registrationOpen' ? 'secondary' : 'outline'}
                      className="shrink-0"
                    >
                      {h[tourney.badgeKey]}
                    </Badge>
                  </div>

                  <p className="text-2xl font-black">
                    <ArabicNumber value={tourney.prize} locale={locale} format="number" />{' '}
                    <span className="text-sm font-normal text-muted-foreground">{h.sar}</span>
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{locale === 'ar' ? tourney.datesAr : tourney.datesEn}</span>
                    <span>
                      <ArabicNumber value={tourney.teamCount} locale={locale} variant="inline" />{' '}
                      {h.teams} · {locale === 'ar' ? tourney.formatAr : tourney.format}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <NeonSeparator />

        {/* ── Recent Results — bold scores ── */}
        <div>
          <SectionHeading>{h.recentResults}</SectionHeading>

          <Card>
            <CardContent className="p-0">
              {recentResults.map((result, idx) => (
                <div
                  key={result.id}
                  className={`flex items-center justify-between px-5 py-4 gap-4 ${
                    idx < recentResults.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  {/* Match result */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="font-bold text-success truncate">
                      {teamName(result.winner)}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-xl font-black tabular-nums">
                        <ArabicNumber value={result.scoreWinner} locale={locale} variant="inline" />
                      </span>
                      <span className="text-muted-foreground font-bold">-</span>
                      <span className="text-xl font-black tabular-nums text-muted-foreground">
                        <ArabicNumber value={result.scoreLoser} locale={locale} variant="inline" />
                      </span>
                    </div>
                    <span className="text-muted-foreground truncate">
                      {teamName(result.loser)}
                    </span>
                  </div>

                  <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
                    {locale === 'ar' ? result.tournamentAr : result.tournamentEn}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
