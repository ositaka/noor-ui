'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { LiveIndicator } from '@/components/ui/live-indicator'
import { Separator } from '@/components/ui/separator'
import { useDirection } from '@/components/providers/direction-provider'
import {
  Trophy,
  Clock,
  Shield,
  ListBullets,
  CurrencyDollar,
  GameController,
  Users,
  CalendarBlank,
  Crown,
  Medal,
} from '@phosphor-icons/react'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const t = {
  en: {
    tournamentName: 'Gulf Esports Cup',
    game: 'Tactical Shooter',
    format: 'Single Elimination \u00b7 5v5',
    dates: 'April 14\u201316, 2026',
    prize: 'Prize Pool',
    sar: 'SAR',
    status: 'In Progress',
    tabBracket: 'Bracket',
    tabSchedule: 'Schedule',
    tabTeams: 'Teams',
    tabPrizes: 'Prizes',
    tabRules: 'Rules',
    quarterFinals: 'Quarter-Finals',
    semiFinals: 'Semi-Finals',
    final: 'Final',
    upcoming: 'Upcoming',
    completed: 'Completed',
    live: 'Live',
    vs: 'vs',
    tbd: 'TBD',
    round: 'Round',
    time: 'Time',
    match: 'Match',
    status_: 'Status',
    seed: 'Seed',
    players: 'Players',
    totalPrizePool: 'Total Prize Pool',
    prizeBreakdown: 'Prize Breakdown',
    place1st: '1st Place',
    place2nd: '2nd Place',
    place3rd4th: '3rd\u20134th Place',
    place5th8th: '5th\u20138th Place',
    mvpAward: 'MVP Award',
    bestPlay: 'Best Play Award',
    rulesTitle: 'Tournament Rules & Regulations',
    formatTitle: 'Format',
    formatDesc: 'Single Elimination bracket. Quarter-Finals and Semi-Finals are Best of 3 (Bo3). Grand Final is Best of 5 (Bo5). Third-place match is Bo3.',
    eligibilityTitle: 'Eligibility',
    eligibilityDesc: 'Open to GCC residents aged 16 and above. Valid government-issued ID required. Each team must have 5 players and up to 2 substitutes.',
    scheduleTitle: 'Schedule',
    scheduleDesc: 'Matches are played daily from 4:00 PM to 10:00 PM AST (Arabia Standard Time). Teams must be ready 15 minutes before their scheduled match.',
    mapPoolTitle: 'Map Pool',
    mapPoolDesc: 'Haven, Bind, Ascent, Split, Icebox, Breeze, Lotus. Map veto: higher seed bans first.',
    restartTitle: 'Restart Policy',
    restartDesc: 'Restarts are allowed only in the first round if a technical issue occurs. After the first round, no restarts are permitted.',
    conductTitle: 'Player Conduct',
    conductDesc: 'Unsportsmanlike behavior, cheating, or use of exploits will result in immediate disqualification. All decisions by tournament admins are final.',
    qf: 'QF',
    sf: 'SF',
    gf: 'GF',
    thirdPlace: '3rd Place',
    each: 'each',
  },
  ar: {
    tournamentName: '\u0643\u0623\u0633 \u0627\u0644\u062e\u0644\u064a\u062c \u0644\u0644\u0631\u064a\u0627\u0636\u0627\u062a \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0629',
    game: '\u062a\u0643\u062a\u064a\u0643\u064a',
    format: '\u0625\u0642\u0635\u0627\u0621 \u0641\u0631\u062f\u064a \u00b7 \u0665 \u0636\u062f \u0665',
    dates: '\u0661\u0664\u2013\u0661\u0666 \u0623\u0628\u0631\u064a\u0644 \u0662\u0660\u0662\u0666',
    prize: '\u0627\u0644\u062c\u0648\u0627\u0626\u0632',
    sar: '\u0631.\u0633',
    status: '\u062c\u0627\u0631\u064a\u0629',
    tabBracket: '\u0627\u0644\u0634\u062c\u0631\u0629',
    tabSchedule: '\u0627\u0644\u062c\u062f\u0648\u0644',
    tabTeams: '\u0627\u0644\u0641\u0631\u0642',
    tabPrizes: '\u0627\u0644\u062c\u0648\u0627\u0626\u0632',
    tabRules: '\u0627\u0644\u0642\u0648\u0627\u0639\u062f',
    quarterFinals: '\u0631\u0628\u0639 \u0627\u0644\u0646\u0647\u0627\u0626\u064a',
    semiFinals: '\u0646\u0635\u0641 \u0627\u0644\u0646\u0647\u0627\u0626\u064a',
    final: '\u0627\u0644\u0646\u0647\u0627\u0626\u064a',
    upcoming: '\u0642\u0627\u062f\u0645\u0629',
    completed: '\u0645\u0643\u062a\u0645\u0644\u0629',
    live: '\u0645\u0628\u0627\u0634\u0631',
    vs: '\u0636\u062f',
    tbd: '\u064a\u062d\u062f\u062f \u0644\u0627\u062d\u0642\u0627\u064b',
    round: '\u0627\u0644\u062c\u0648\u0644\u0629',
    time: '\u0627\u0644\u0648\u0642\u062a',
    match: '\u0627\u0644\u0645\u0628\u0627\u0631\u0627\u0629',
    status_: '\u0627\u0644\u062d\u0627\u0644\u0629',
    seed: '\u0627\u0644\u062a\u0635\u0646\u064a\u0641',
    players: '\u0627\u0644\u0644\u0627\u0639\u0628\u0648\u0646',
    totalPrizePool: '\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u062c\u0648\u0627\u0626\u0632',
    prizeBreakdown: '\u062a\u0648\u0632\u064a\u0639 \u0627\u0644\u062c\u0648\u0627\u0626\u0632',
    place1st: '\u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u0623\u0648\u0644',
    place2nd: '\u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u062b\u0627\u0646\u064a',
    place3rd4th: '\u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u062b\u0627\u0644\u062b\u2013\u0627\u0644\u0631\u0627\u0628\u0639',
    place5th8th: '\u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u062e\u0627\u0645\u0633\u2013\u0627\u0644\u062b\u0627\u0645\u0646',
    mvpAward: '\u062c\u0627\u0626\u0632\u0629 \u0623\u0641\u0636\u0644 \u0644\u0627\u0639\u0628',
    bestPlay: '\u062c\u0627\u0626\u0632\u0629 \u0623\u0641\u0636\u0644 \u0644\u0639\u0628\u0629',
    rulesTitle: '\u0642\u0648\u0627\u0639\u062f \u0648\u0644\u0648\u0627\u0626\u062d \u0627\u0644\u0628\u0637\u0648\u0644\u0629',
    formatTitle: '\u0627\u0644\u0646\u0638\u0627\u0645',
    formatDesc: '\u0634\u062c\u0631\u0629 \u0625\u0642\u0635\u0627\u0621 \u0641\u0631\u062f\u064a. \u0631\u0628\u0639 \u0627\u0644\u0646\u0647\u0627\u0626\u064a \u0648\u0646\u0635\u0641 \u0627\u0644\u0646\u0647\u0627\u0626\u064a \u0623\u0641\u0636\u0644 \u0645\u0646 \u0663 (Bo3). \u0627\u0644\u0646\u0647\u0627\u0626\u064a \u0627\u0644\u0643\u0628\u064a\u0631 \u0623\u0641\u0636\u0644 \u0645\u0646 \u0665 (Bo5). \u0645\u0628\u0627\u0631\u0627\u0629 \u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u062b\u0627\u0644\u062b Bo3.',
    eligibilityTitle: '\u0627\u0644\u0623\u0647\u0644\u064a\u0629',
    eligibilityDesc: '\u0645\u0641\u062a\u0648\u062d\u0629 \u0644\u0645\u0642\u064a\u0645\u064a \u062f\u0648\u0644 \u0627\u0644\u062e\u0644\u064a\u062c \u0628\u0639\u0645\u0631 \u0661\u0666 \u0633\u0646\u0629 \u0641\u0645\u0627 \u0641\u0648\u0642. \u064a\u0644\u0632\u0645 \u062a\u0642\u062f\u064a\u0645 \u0647\u0648\u064a\u0629 \u062d\u0643\u0648\u0645\u064a\u0629 \u0633\u0627\u0631\u064a\u0629. \u064a\u062c\u0628 \u0623\u0646 \u064a\u062a\u0643\u0648\u0646 \u0643\u0644 \u0641\u0631\u064a\u0642 \u0645\u0646 \u0665 \u0644\u0627\u0639\u0628\u064a\u0646 \u0648\u0628\u062f\u064a\u0644\u064a\u0646 \u0643\u062d\u062f \u0623\u0642\u0635\u0649.',
    scheduleTitle: '\u0627\u0644\u062c\u062f\u0648\u0644 \u0627\u0644\u0632\u0645\u0646\u064a',
    scheduleDesc: '\u062a\u0642\u0627\u0645 \u0627\u0644\u0645\u0628\u0627\u0631\u064a\u0627\u062a \u064a\u0648\u0645\u064a\u0627\u064b \u0645\u0646 \u0627\u0644\u0633\u0627\u0639\u0629 \u0664:\u0660\u0660 \u0639\u0635\u0631\u0627\u064b \u062d\u062a\u0649 \u0661\u0660:\u0660\u0660 \u0645\u0633\u0627\u0621\u064b \u0628\u062a\u0648\u0642\u064a\u062a \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629. \u064a\u062c\u0628 \u0639\u0644\u0649 \u0627\u0644\u0641\u0631\u0642 \u0627\u0644\u0627\u0633\u062a\u0639\u062f\u0627\u062f \u0642\u0628\u0644 \u0661\u0665 \u062f\u0642\u064a\u0642\u0629 \u0645\u0646 \u0645\u0648\u0639\u062f \u0645\u0628\u0627\u0631\u0627\u062a\u0647\u0645.',
    mapPoolTitle: '\u062e\u0631\u0627\u0626\u0637 \u0627\u0644\u0644\u0639\u0628',
    mapPoolDesc: 'Haven\u060c Bind\u060c Ascent\u060c Split\u060c Icebox\u060c Breeze\u060c Lotus. \u0627\u0644\u0641\u0631\u064a\u0642 \u0627\u0644\u0623\u0639\u0644\u0649 \u062a\u0635\u0646\u064a\u0641\u0627\u064b \u064a\u062d\u0638\u0631 \u0623\u0648\u0644\u0627\u064b.',
    restartTitle: '\u0633\u064a\u0627\u0633\u0629 \u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0628\u062f\u0621',
    restartDesc: '\u064a\u064f\u0633\u0645\u062d \u0628\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u0628\u062f\u0621 \u0641\u0642\u0637 \u0641\u064a \u0627\u0644\u062c\u0648\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0641\u064a \u062d\u0627\u0644 \u062d\u062f\u0648\u062b \u0645\u0634\u0643\u0644\u0629 \u062a\u0642\u0646\u064a\u0629. \u0628\u0639\u062f \u0627\u0644\u062c\u0648\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0644\u0627 \u064a\u064f\u0633\u0645\u062d \u0628\u0623\u064a \u0625\u0639\u0627\u062f\u0629.',
    conductTitle: '\u0633\u0644\u0648\u0643 \u0627\u0644\u0644\u0627\u0639\u0628\u064a\u0646',
    conductDesc: '\u0623\u064a \u0633\u0644\u0648\u0643 \u063a\u064a\u0631 \u0631\u064a\u0627\u0636\u064a \u0623\u0648 \u063a\u0634 \u0623\u0648 \u0627\u0633\u062a\u063a\u0644\u0627\u0644 \u062b\u063a\u0631\u0627\u062a \u0633\u064a\u0624\u062f\u064a \u0625\u0644\u0649 \u0627\u0644\u0627\u0633\u062a\u0628\u0639\u0627\u062f \u0627\u0644\u0641\u0648\u0631\u064a. \u062c\u0645\u064a\u0639 \u0642\u0631\u0627\u0631\u0627\u062a \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0628\u0637\u0648\u0644\u0629 \u0646\u0647\u0627\u0626\u064a\u0629.',
    qf: '\u0631\u0628\u0639',
    sf: '\u0646\u0635\u0641',
    gf: '\u0646\u0647\u0627\u0626\u064a',
    thirdPlace: '\u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u062b\u0627\u0644\u062b',
    each: '\u0644\u0643\u0644 \u0641\u0631\u064a\u0642',
  },
}

// ---------------------------------------------------------------------------
// Teams data
// ---------------------------------------------------------------------------

const teams = [
  { id: 'gulf-wolves', en: 'Gulf Wolves', ar: '\u0630\u0626\u0627\u0628 \u0627\u0644\u062e\u0644\u064a\u062c', seed: 1, players: ['FalconX', 'ShadowBlade', 'NeonStrike', 'IcePhoenix', 'VoidWalker'] },
  { id: 'riyadh-falcons', en: 'Riyadh Falcons', ar: '\u0635\u0642\u0648\u0631 \u0627\u0644\u0631\u064a\u0627\u0636', seed: 2, players: ['StormRider', 'DarkMatter', 'BlazeFury', 'CyberGhost', 'TitanForce'] },
  { id: 'doha-stars', en: 'Doha Stars', ar: '\u0646\u062c\u0648\u0645 \u0627\u0644\u062f\u0648\u062d\u0629', seed: 3, players: ['StarDust', 'NightHawk', 'ThunderBolt', 'SilverFang', 'PhantomX'] },
  { id: 'jeddah-champions', en: 'Jeddah Champions', ar: '\u0623\u0628\u0637\u0627\u0644 \u062c\u062f\u0629', seed: 4, players: ['IronWill', 'SwiftEdge', 'CrimsonKing', 'SteelNerve', 'AceBlade'] },
  { id: 'abu-dhabi-knights', en: 'Abu Dhabi Knights', ar: '\u0641\u0631\u0633\u0627\u0646 \u0623\u0628\u0648\u0638\u0628\u064a', seed: 5, players: ['KnightRise', 'GoldStrike', 'RoyalFlush', 'SkyForge', 'EagleEye'] },
  { id: 'manama-tigers', en: 'Manama Tigers', ar: '\u0646\u0645\u0648\u0631 \u0627\u0644\u0645\u0646\u0627\u0645\u0629', seed: 6, players: ['TigerClaw', 'SandStorm', 'CobraStrike', 'LionHeart', 'HawkEye'] },
  { id: 'muscat-eagles', en: 'Muscat Eagles', ar: '\u0639\u0642\u0628\u0627\u0646 \u0645\u0633\u0642\u0637', seed: 7, players: ['EagleSoar', 'DesertWind', 'OceanWave', 'MountainPeak', 'SunRise'] },
  { id: 'kuwait-thunder', en: 'Kuwait Thunder', ar: '\u0631\u0639\u0648\u062f \u0627\u0644\u0643\u0648\u064a\u062a', seed: 8, players: ['ThunderGod', 'LightningBolt', 'StormBreaker', 'RainMaker', 'CloudBurst'] },
]

// ---------------------------------------------------------------------------
// Bracket data
// ---------------------------------------------------------------------------

interface BracketMatch {
  id: string
  teamA: string | null
  teamB: string | null
  scoreA: number | null
  scoreB: number | null
  winner: string | null
  status: 'completed' | 'live' | 'upcoming'
}

const quarterFinals: BracketMatch[] = [
  { id: 'qf1', teamA: 'gulf-wolves', teamB: 'manama-tigers', scoreA: 2, scoreB: 0, winner: 'gulf-wolves', status: 'completed' },
  { id: 'qf2', teamA: 'riyadh-falcons', teamB: 'abu-dhabi-knights', scoreA: 2, scoreB: 1, winner: 'riyadh-falcons', status: 'completed' },
  { id: 'qf3', teamA: 'doha-stars', teamB: 'muscat-eagles', scoreA: 2, scoreB: 0, winner: 'doha-stars', status: 'completed' },
  { id: 'qf4', teamA: 'jeddah-champions', teamB: 'kuwait-thunder', scoreA: 1, scoreB: 2, winner: 'kuwait-thunder', status: 'completed' },
]

const semiFinals: BracketMatch[] = [
  { id: 'sf1', teamA: 'gulf-wolves', teamB: 'riyadh-falcons', scoreA: 2, scoreB: 1, winner: 'gulf-wolves', status: 'completed' },
  { id: 'sf2', teamA: 'doha-stars', teamB: 'kuwait-thunder', scoreA: null, scoreB: null, winner: null, status: 'upcoming' },
]

const grandFinal: BracketMatch = {
  id: 'gf', teamA: 'gulf-wolves', teamB: null, scoreA: null, scoreB: null, winner: null, status: 'upcoming',
}

// ---------------------------------------------------------------------------
// Schedule data
// ---------------------------------------------------------------------------

interface ScheduleRow {
  id: string
  timeEn: string
  timeAr: string
  dateEn: string
  dateAr: string
  teamA: string
  teamB: string
  roundKey: 'qf' | 'sf' | 'gf' | 'thirdPlace'
  status: 'completed' | 'live' | 'upcoming'
}

const schedule: ScheduleRow[] = [
  { id: 's1', timeEn: '4:00 PM', timeAr: '\u0664:\u0660\u0660 \u0639\u0635\u0631\u0627\u064b', dateEn: 'Apr 14', dateAr: '\u0661\u0664 \u0623\u0628\u0631\u064a\u0644', teamA: 'gulf-wolves', teamB: 'manama-tigers', roundKey: 'qf', status: 'completed' },
  { id: 's2', timeEn: '5:30 PM', timeAr: '\u0665:\u0663\u0660 \u0639\u0635\u0631\u0627\u064b', dateEn: 'Apr 14', dateAr: '\u0661\u0664 \u0623\u0628\u0631\u064a\u0644', teamA: 'riyadh-falcons', teamB: 'abu-dhabi-knights', roundKey: 'qf', status: 'completed' },
  { id: 's3', timeEn: '7:00 PM', timeAr: '\u0667:\u0660\u0660 \u0645\u0633\u0627\u0621\u064b', dateEn: 'Apr 14', dateAr: '\u0661\u0664 \u0623\u0628\u0631\u064a\u0644', teamA: 'doha-stars', teamB: 'muscat-eagles', roundKey: 'qf', status: 'completed' },
  { id: 's4', timeEn: '8:30 PM', timeAr: '\u0668:\u0663\u0660 \u0645\u0633\u0627\u0621\u064b', dateEn: 'Apr 14', dateAr: '\u0661\u0664 \u0623\u0628\u0631\u064a\u0644', teamA: 'jeddah-champions', teamB: 'kuwait-thunder', roundKey: 'qf', status: 'completed' },
  { id: 's5', timeEn: '5:00 PM', timeAr: '\u0665:\u0660\u0660 \u0639\u0635\u0631\u0627\u064b', dateEn: 'Apr 15', dateAr: '\u0661\u0665 \u0623\u0628\u0631\u064a\u0644', teamA: 'gulf-wolves', teamB: 'riyadh-falcons', roundKey: 'sf', status: 'completed' },
  { id: 's6', timeEn: '7:30 PM', timeAr: '\u0667:\u0663\u0660 \u0645\u0633\u0627\u0621\u064b', dateEn: 'Apr 15', dateAr: '\u0661\u0665 \u0623\u0628\u0631\u064a\u0644', teamA: 'doha-stars', teamB: 'kuwait-thunder', roundKey: 'sf', status: 'upcoming' },
  { id: 's7', timeEn: '5:00 PM', timeAr: '\u0665:\u0660\u0660 \u0639\u0635\u0631\u0627\u064b', dateEn: 'Apr 16', dateAr: '\u0661\u0666 \u0623\u0628\u0631\u064a\u0644', teamA: 'gulf-wolves', teamB: 'kuwait-thunder', roundKey: 'thirdPlace', status: 'upcoming' },
  { id: 's8', timeEn: '8:00 PM', timeAr: '\u0668:\u0660\u0660 \u0645\u0633\u0627\u0621\u064b', dateEn: 'Apr 16', dateAr: '\u0661\u0666 \u0623\u0628\u0631\u064a\u0644', teamA: 'gulf-wolves', teamB: 'kuwait-thunder', roundKey: 'gf', status: 'upcoming' },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getTeam(id: string | null) {
  return teams.find((t) => t.id === id) ?? null
}

function teamName(id: string | null, locale: 'en' | 'ar'): string {
  const team = getTeam(id)
  if (!team) return locale === 'ar' ? '\u064a\u062d\u062f\u062f \u0644\u0627\u062d\u0642\u0627\u064b' : 'TBD'
  return team[locale]
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** A single match card inside the bracket */
function MatchCard({
  match,
  locale,
}: {
  match: BracketMatch
  locale: 'en' | 'ar'
}) {
  const h = t[locale]
  const isUpcoming = match.status === 'upcoming'

  const renderTeamRow = (teamId: string | null, score: number | null, isWinner: boolean) => {
    const name = teamName(teamId, locale)
    return (
      <div
        className={`flex items-center justify-between gap-2 px-3 py-2 ${
          isWinner ? 'text-success font-bold' : isUpcoming ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        <span className="truncate text-sm">{name}</span>
        {score !== null && (
          <span className={`text-sm font-bold tabular-nums shrink-0 ${isWinner ? 'text-success' : ''}`}>
            <ArabicNumber value={score} locale={locale} variant="inline" />
          </span>
        )}
      </div>
    )
  }

  return (
    <Card className="w-52 shrink-0">
      <CardContent className="p-0">
        {renderTeamRow(match.teamA, match.scoreA, match.winner === match.teamA && match.winner !== null)}
        <Separator />
        {renderTeamRow(match.teamB, match.scoreB, match.winner === match.teamB && match.winner !== null)}
        {isUpcoming && (
          <>
            <Separator />
            <div className="flex justify-center py-1.5">
              <Badge variant="outline" className="text-[10px]">{h.upcoming}</Badge>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function TournamentDetailPage() {
  const { direction, locale } = useDirection()
  const isRTL = direction === 'rtl'
  const h = t[locale]

  return (
    <div className="container py-8">
      {/* ================================================================= */}
      {/* 1. Header                                                         */}
      {/* ================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
        <div className="p-4 bg-primary/10 rounded-xl shrink-0">
          <Trophy className="h-10 w-10 text-primary" weight="duotone" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold ltr:tracking-tight">{h.tournamentName}</h1>
            <Badge variant="default">{h.status}</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <GameController className="h-4 w-4" weight="duotone" />
              {h.game}
            </span>
            <span className="hidden sm:inline">&middot;</span>
            <span>{h.format}</span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="flex items-center gap-1">
              <CalendarBlank className="h-4 w-4" weight="duotone" />
              {h.dates}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <CurrencyDollar className="h-5 w-5 text-warning" weight="duotone" />
            <span className="text-lg font-bold">
              <ArabicNumber value={500000} locale={locale} format="number" />
            </span>
            <span className="text-sm text-muted-foreground">{h.sar}</span>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. Tabs                                                           */}
      {/* ================================================================= */}
      <Tabs defaultValue="bracket">
        <TabsList className="mb-6">
          <TabsTrigger value="bracket">
            <Trophy className="h-4 w-4 me-1.5" weight="duotone" />
            {h.tabBracket}
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Clock className="h-4 w-4 me-1.5" weight="duotone" />
            {h.tabSchedule}
          </TabsTrigger>
          <TabsTrigger value="teams">
            <Users className="h-4 w-4 me-1.5" weight="duotone" />
            {h.tabTeams}
          </TabsTrigger>
          <TabsTrigger value="prizes">
            <CurrencyDollar className="h-4 w-4 me-1.5" weight="duotone" />
            {h.tabPrizes}
          </TabsTrigger>
          <TabsTrigger value="rules">
            <ListBullets className="h-4 w-4 me-1.5" weight="duotone" />
            {h.tabRules}
          </TabsTrigger>
        </TabsList>

        {/* =============================================================== */}
        {/* Bracket Tab                                                     */}
        {/* =============================================================== */}
        <TabsContent value="bracket">
          {/* Round labels */}
          <div className={`flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span className="w-52 text-center">{h.quarterFinals}</span>
            <span className="w-8" />
            <span className="w-52 text-center">{h.semiFinals}</span>
            <span className="w-8" />
            <span className="w-52 text-center">{h.final}</span>
          </div>

          {/* Bracket visualization */}
          <div className="overflow-x-auto pb-4">
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`} style={{ minWidth: '740px' }}>
              {/* QF Column */}
              <div className="flex flex-col gap-6">
                {quarterFinals.map((match) => (
                  <MatchCard key={match.id} match={match} locale={locale} />
                ))}
              </div>

              {/* QF -> SF Connectors */}
              <div className="flex flex-col justify-around self-stretch">
                {/* Top connector: QF1+QF2 -> SF1 */}
                <div className="flex flex-col flex-1 justify-center">
                  <div className="flex flex-col w-8" style={{ height: 'calc(100% - 1rem)' }}>
                    <div className="flex-1 border-e-2 border-b-2 border-border" />
                    <div className="flex-1 border-e-2 border-t-2 border-border" />
                  </div>
                </div>
                {/* Bottom connector: QF3+QF4 -> SF2 */}
                <div className="flex flex-col flex-1 justify-center">
                  <div className="flex flex-col w-8" style={{ height: 'calc(100% - 1rem)' }}>
                    <div className="flex-1 border-e-2 border-b-2 border-border" />
                    <div className="flex-1 border-e-2 border-t-2 border-border" />
                  </div>
                </div>
              </div>

              {/* QF -> SF horizontal lines */}
              <div className="flex flex-col justify-around self-stretch">
                <div className="flex-1 flex items-center">
                  <div className="w-8 border-t-2 border-border" />
                </div>
                <div className="flex-1 flex items-center">
                  <div className="w-8 border-t-2 border-border" />
                </div>
              </div>

              {/* SF Column */}
              <div className="flex flex-col justify-around self-stretch">
                {semiFinals.map((match) => (
                  <div key={match.id} className="flex-1 flex items-center">
                    <MatchCard match={match} locale={locale} />
                  </div>
                ))}
              </div>

              {/* SF -> Final Connector */}
              <div className="flex flex-col justify-center self-stretch">
                <div className="flex flex-col w-8" style={{ height: '50%' }}>
                  <div className="flex-1 border-e-2 border-b-2 border-border" />
                  <div className="flex-1 border-e-2 border-t-2 border-border" />
                </div>
              </div>

              {/* SF -> Final horizontal line */}
              <div className="flex items-center self-stretch">
                <div className="w-8 border-t-2 border-border" />
              </div>

              {/* Final Column */}
              <div className="flex items-center self-stretch">
                <MatchCard match={grandFinal} locale={locale} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* =============================================================== */}
        {/* Schedule Tab                                                    */}
        {/* =============================================================== */}
        <TabsContent value="schedule">
          <Card>
            <CardContent className="p-0">
              {/* Table header */}
              <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-muted/50 text-xs font-medium text-muted-foreground border-b">
                <div className="col-span-2">{h.time}</div>
                <div className="col-span-5">{h.match}</div>
                <div className="col-span-2 text-center">{h.round}</div>
                <div className="col-span-3 text-end">{h.status_}</div>
              </div>

              {schedule.map((row, idx) => {
                const roundLabels: Record<string, string> = {
                  qf: h.qf,
                  sf: h.sf,
                  gf: h.gf,
                  thirdPlace: h.thirdPlace,
                }
                const roundVariant: Record<string, 'outline' | 'secondary' | 'default' | 'destructive'> = {
                  qf: 'outline',
                  sf: 'secondary',
                  gf: 'default',
                  thirdPlace: 'outline',
                }

                return (
                  <div key={row.id}>
                    <div className="grid grid-cols-12 gap-2 px-4 py-3 items-center">
                      {/* Time & Date */}
                      <div className="col-span-2">
                        <p className="text-sm font-medium">{locale === 'ar' ? row.timeAr : row.timeEn}</p>
                        <p className="text-xs text-muted-foreground">{locale === 'ar' ? row.dateAr : row.dateEn}</p>
                      </div>

                      {/* Match */}
                      <div className="col-span-5">
                        <span className={`text-sm ${row.status === 'completed' ? 'font-medium' : ''}`}>
                          {teamName(row.teamA, locale)}
                        </span>
                        <span className="text-xs text-muted-foreground mx-1.5">{h.vs}</span>
                        <span className={`text-sm ${row.status === 'completed' ? 'font-medium' : ''}`}>
                          {teamName(row.teamB, locale)}
                        </span>
                      </div>

                      {/* Round badge */}
                      <div className="col-span-2 text-center">
                        <Badge variant={roundVariant[row.roundKey]} className="text-xs">
                          {roundLabels[row.roundKey]}
                        </Badge>
                      </div>

                      {/* Status */}
                      <div className="col-span-3 flex justify-end">
                        {row.status === 'completed' && (
                          <Badge variant="outline" className="text-xs text-success border-success/30">
                            {h.completed}
                          </Badge>
                        )}
                        {row.status === 'live' && (
                          <LiveIndicator locale={locale} size="sm" />
                        )}
                        {row.status === 'upcoming' && (
                          <Badge variant="outline" className="text-xs">
                            {h.upcoming}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {idx < schedule.length - 1 && <Separator />}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        {/* =============================================================== */}
        {/* Teams Tab                                                       */}
        {/* =============================================================== */}
        <TabsContent value="teams">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {teams.map((team) => (
              <Card key={team.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base">{team[locale]}</CardTitle>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {h.seed} #{locale === 'ar'
                        ? new Intl.NumberFormat('ar-SA', { numberingSystem: 'arab' }).format(team.seed)
                        : team.seed}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground mb-2">{h.players}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {team.players.map((player) => (
                      <Badge key={player} variant="secondary" className="text-xs font-mono">
                        {player}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* =============================================================== */}
        {/* Prizes Tab                                                      */}
        {/* =============================================================== */}
        <TabsContent value="prizes">
          {/* Total prize pool */}
          <Card className="border-primary/20 shadow-lg shadow-primary/5 mb-6">
            <CardContent className="py-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">{h.totalPrizePool}</p>
              <p className="text-4xl sm:text-5xl font-bold">
                <ArabicNumber value={500000} locale={locale} format="number" />
              </p>
              <p className="text-lg text-muted-foreground mt-1">{h.sar}</p>
            </CardContent>
          </Card>

          {/* Prize breakdown */}
          <h3 className="text-lg font-semibold mb-4">{h.prizeBreakdown}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {/* 1st Place */}
            <Card className="border-warning/30 bg-warning/5">
              <CardContent className="p-5 text-center">
                <Crown className="h-8 w-8 mx-auto text-warning mb-2" weight="duotone" />
                <p className="text-sm font-medium text-muted-foreground mb-1">{h.place1st}</p>
                <p className="text-2xl font-bold">
                  <ArabicNumber value={250000} locale={locale} format="number" />
                </p>
                <p className="text-xs text-muted-foreground">{h.sar}</p>
              </CardContent>
            </Card>

            {/* 2nd Place */}
            <Card className="border-muted-foreground/20 bg-muted/30">
              <CardContent className="p-5 text-center">
                <Medal className="h-8 w-8 mx-auto text-muted-foreground mb-2" weight="duotone" />
                <p className="text-sm font-medium text-muted-foreground mb-1">{h.place2nd}</p>
                <p className="text-2xl font-bold">
                  <ArabicNumber value={100000} locale={locale} format="number" />
                </p>
                <p className="text-xs text-muted-foreground">{h.sar}</p>
              </CardContent>
            </Card>

            {/* 3rd-4th Place */}
            <Card className="border-warning/15 bg-warning/3">
              <CardContent className="p-5 text-center">
                <Trophy className="h-8 w-8 mx-auto text-warning/60 mb-2" weight="duotone" />
                <p className="text-sm font-medium text-muted-foreground mb-1">{h.place3rd4th}</p>
                <p className="text-2xl font-bold">
                  <ArabicNumber value={50000} locale={locale} format="number" />
                </p>
                <p className="text-xs text-muted-foreground">{h.sar} {h.each}</p>
              </CardContent>
            </Card>

            {/* 5th-8th Place */}
            <Card>
              <CardContent className="p-5 text-center">
                <Shield className="h-8 w-8 mx-auto text-muted-foreground/60 mb-2" weight="duotone" />
                <p className="text-sm font-medium text-muted-foreground mb-1">{h.place5th8th}</p>
                <p className="text-2xl font-bold">
                  <ArabicNumber value={12500} locale={locale} format="number" />
                </p>
                <p className="text-xs text-muted-foreground">{h.sar} {h.each}</p>
              </CardContent>
            </Card>
          </div>

          {/* Special awards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-primary/20">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                  <Crown className="h-6 w-6 text-primary" weight="duotone" />
                </div>
                <div>
                  <p className="font-semibold">{h.mvpAward}</p>
                  <p className="text-lg font-bold mt-0.5">
                    <ArabicNumber value={25000} locale={locale} format="number" />{' '}
                    <span className="text-sm font-normal text-muted-foreground">{h.sar}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                  <GameController className="h-6 w-6 text-primary" weight="duotone" />
                </div>
                <div>
                  <p className="font-semibold">{h.bestPlay}</p>
                  <p className="text-lg font-bold mt-0.5">
                    <ArabicNumber value={25000} locale={locale} format="number" />{' '}
                    <span className="text-sm font-normal text-muted-foreground">{h.sar}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* =============================================================== */}
        {/* Rules Tab                                                       */}
        {/* =============================================================== */}
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ListBullets className="h-6 w-6 text-primary" weight="duotone" />
                </div>
                <CardTitle>{h.rulesTitle}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { icon: GameController, title: h.formatTitle, desc: h.formatDesc },
                { icon: Users, title: h.eligibilityTitle, desc: h.eligibilityDesc },
                { icon: Clock, title: h.scheduleTitle, desc: h.scheduleDesc },
                { icon: Shield, title: h.mapPoolTitle, desc: h.mapPoolDesc },
                { icon: ListBullets, title: h.restartTitle, desc: h.restartDesc },
                { icon: Shield, title: h.conductTitle, desc: h.conductDesc },
              ].map((section, idx) => (
                <div key={idx}>
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-muted rounded-lg shrink-0 mt-0.5">
                      <section.icon className="h-4 w-4 text-muted-foreground" weight="duotone" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{section.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{section.desc}</p>
                    </div>
                  </div>
                  {idx < 5 && <Separator className="mt-6" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
