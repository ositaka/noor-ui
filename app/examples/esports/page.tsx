'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Callout } from '@/components/ui/callout'
import { CountdownTimer } from '@/components/ui/countdown-timer'
import { DirectionToggle } from '@/components/docs/direction-toggle'
import { useDirection } from '@/components/providers/direction-provider'
import {
  GameController,
  Trophy,
  Users,
  Sword,
  CurrencyDollar,
} from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'

const t = {
  en: {
    brand: 'Gulf Stars Esports',
    tagline: 'Where legends are forged in the heart of the Gulf',
    featuredTitle: 'Featured Tournament',
    tournamentName: 'Gulf Esports Cup',
    registrationOpen: 'Registration Open',
    countdown: 'Starts in',
    statPlayers: 'Players',
    statPlayersValue: '500+',
    statTeams: 'Teams',
    statTeamsValue: '48',
    statTournaments: 'Tournaments',
    statTournamentsValue: '12',
    statPrize: 'Prize Pool',
    statPrizeValue: '1M SAR',
    enterHub: 'Enter Hub',
    demoNotice: 'This is a UI demo for NoorUI component library',
    footer: 'Gulf Stars Esports — UI Demo',
  },
  ar: {
    brand: 'نجوم الخليج للرياضات الإلكترونية',
    tagline: 'حيث تُصنع الأساطير في قلب الخليج',
    featuredTitle: 'البطولة المميزة',
    tournamentName: 'كأس الخليج للرياضات الإلكترونية',
    registrationOpen: 'التسجيل مفتوح',
    countdown: 'تبدأ خلال',
    statPlayers: 'لاعب',
    statPlayersValue: '+٥٠٠',
    statTeams: 'فريق',
    statTeamsValue: '٤٨',
    statTournaments: 'بطولة',
    statTournamentsValue: '١٢',
    statPrize: 'جوائز',
    statPrizeValue: '١ مليون ر.س',
    enterHub: 'الدخول إلى المنصة',
    demoNotice: 'هذا عرض توضيحي لمكتبة مكونات NoorUI',
    footer: 'نجوم الخليج للرياضات الإلكترونية — عرض توضيحي',
  },
}

const gradientKeyframes = `
@keyframes heroGradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 50%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
}
@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.15;
  }
  50% {
    opacity: 0.3;
  }
}
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .neon-btn { animation: none !important; }
}
`

const stats = [
  { icon: Users, enValue: '500+', arValue: '+٥٠٠', enLabel: 'Players', arLabel: 'لاعب' },
  { icon: Sword, enValue: '48', arValue: '٤٨', enLabel: 'Teams', arLabel: 'فريق' },
  { icon: Trophy, enValue: '12', arValue: '١٢', enLabel: 'Tournaments', arLabel: 'بطولة' },
  {
    icon: CurrencyDollar,
    enValue: '1M SAR',
    arValue: '١ مليون ر.س',
    enLabel: 'Prize Pool',
    arLabel: 'جوائز',
  },
]

export default function EsportsLandingPage() {
  const { locale } = useDirection()
  const h = t[locale]
  const router = useRouter()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gradientKeyframes }} />

      <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              'linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, hsl(var(--secondary) / 0.05) 25%, transparent 50%, hsl(var(--primary) / 0.06) 75%, hsl(var(--secondary) / 0.08) 100%)',
            backgroundSize: '400% 400%',
            animation: 'heroGradient 15s ease infinite',
          }}
        />

        {/* Large radial glow — ambient purple/cyan light behind brand area */}
        <div
          className="absolute top-[5%] start-1/2 -translate-x-1/2 w-[1000px] h-[1000px] z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(270 100% 60% / 0.18) 0%, hsl(180 100% 50% / 0.08) 35%, transparent 65%)',
            filter: 'blur(80px)',
            animation: 'pulseGlow 6s ease-in-out infinite',
          }}
        />

        {/* Smaller secondary glow — ambient cyan/magenta light near CTA area */}
        <div
          className="absolute bottom-[12%] start-1/2 -translate-x-1/2 w-[600px] h-[500px] z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(180 100% 50% / 0.14) 0%, hsl(300 100% 55% / 0.06) 45%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'pulseGlow 5s ease-in-out infinite 1.5s',
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23888' stroke-width='0.5'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Direction toggle */}
        <div className="absolute top-4 end-4 z-20">
          <DirectionToggle />
        </div>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
          <div className="w-full max-w-lg space-y-8">
            {/* Brand */}
            <div className="text-center space-y-4">
              <div
                className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-xl"
                style={{ animation: 'float 3s ease-in-out infinite' }}
              >
                <GameController className="h-10 w-10 text-primary" weight="duotone" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  {h.brand}
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg">{h.tagline}</p>
              </div>
            </div>

            {/* Featured tournament card */}
            <Card className="border-primary/20 shadow-lg shadow-primary/5 overflow-hidden">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-foreground">{h.tournamentName}</h2>
                  <Badge className="bg-success text-success-foreground shrink-0">
                    {h.registrationOpen}
                  </Badge>
                </div>

                {/* Countdown */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground text-center">{h.countdown}</p>
                  <div className="flex justify-center">
                    <CountdownTimer
                      targetDate={new Date('2026-04-14T09:00:00+03:00')}
                      locale={locale}
                      size="md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.enLabel}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-border bg-muted/30 p-3 text-center"
                  >
                    <Icon className="h-5 w-5 text-primary" weight="duotone" />
                    <span className="text-xl font-bold text-foreground tabular-nums">
                      {locale === 'ar' ? stat.arValue : stat.enValue}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {locale === 'ar' ? stat.arLabel : stat.enLabel}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Enter hub button — animated neon gradient */}
            <Button
              size="lg"
              className="neon-btn w-full text-base text-white font-bold border-0"
              style={{
                background: 'linear-gradient(90deg, hsl(270 100% 60%), hsl(180 100% 50%), hsl(300 100% 55%), hsl(270 100% 60%))',
                backgroundSize: '200% 100%',
                animation: 'gradientShift 3.5s ease infinite',
              }}
              onClick={() => router.push('/examples/esports/home')}
            >
              {h.enterHub}
            </Button>

            {/* Demo callout */}
            <Callout type="info">
              <p className="text-sm">{h.demoNotice}</p>
            </Callout>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-4 relative z-10">
          <p className="text-center text-xs text-muted-foreground">{h.footer}</p>
        </footer>
      </div>
    </>
  )
}
