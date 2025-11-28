'use client'

import { Card, CardContent, CardHeader, CardTitle } from './card'

export interface StatsCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  trend?: number
  trendLabel?: string
  className?: string
}

/**
 * StatsCard - Dashboard statistics display card
 * Candidate for migration to noorui-rtl (Phase 7)
 */
export function StatsCard({
  icon,
  label,
  value,
  trend,
  trendLabel,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend !== undefined && trendLabel && (
          <p className="text-xs text-muted-foreground">
            <span className={trend >= 0 ? 'text-green-600' : 'text-red-600'}>
              {trend >= 0 ? '+' : ''}{trend}%
            </span>{' '}
            {trendLabel}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
