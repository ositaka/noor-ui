'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { ArabicNumber } from '@/components/ui/arabic-number'
import { useDirection } from '@/components/providers/direction-provider'

export interface StatsCardProps {
  label: string
  value: number | string
  trend?: number
  trendLabel?: string
  icon?: React.ReactNode
  isLoading?: boolean
  format?: 'number' | 'currency' | 'percentage'
  className?: string
  valueClassName?: string
}

export function StatsCard({
  label,
  value,
  trend,
  trendLabel,
  icon,
  isLoading = false,
  format = 'number',
  className,
  valueClassName,
}: StatsCardProps) {
  const { locale } = useDirection()

  // Determine trend direction
  const trendDirection = trend
    ? trend > 0
      ? 'up'
      : trend < 0
        ? 'down'
        : 'neutral'
    : null

  // Format the value based on type
  const formattedValue = React.useMemo(() => {
    if (typeof value === 'string') return value

    if (format === 'percentage') {
      return (
        <span className="inline-flex items-center gap-1">
          <ArabicNumber value={value} />%
        </span>
      )
    }

    if (format === 'currency') {
      return <ArabicNumber value={value} format="currency" />
    }

    return <ArabicNumber value={value} />
  }, [value, format])

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          {icon && <Skeleton className="h-4 w-4 rounded-full" />}
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-3 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
        {icon && (
          <div className="text-muted-foreground">
            {React.cloneElement(icon as React.ReactElement, {
              className: cn('h-4 w-4', (icon as React.ReactElement).props.className),
            })}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className={cn('text-2xl font-bold', valueClassName)}>
          {formattedValue}
        </div>

        {(trend !== undefined || trendLabel) && (
          <div className="flex items-center gap-1 mt-1">
            {trend !== undefined && trendDirection && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 text-xs font-medium',
                  trendDirection === 'up' && 'text-green-600 dark:text-green-400',
                  trendDirection === 'down' && 'text-red-600 dark:text-red-400',
                  trendDirection === 'neutral' && 'text-muted-foreground'
                )}
              >
                {trendDirection === 'up' && <TrendingUp className="h-3 w-3" />}
                {trendDirection === 'down' && <TrendingDown className="h-3 w-3" />}
                {trendDirection === 'neutral' && <Minus className="h-3 w-3" />}
                <ArabicNumber
                  value={Math.abs(trend)}
                  format={format === 'currency' ? 'number' : format}
                />
                {format === 'percentage' ? '' : '%'}
              </span>
            )}

            {trendLabel && (
              <span className="text-xs text-muted-foreground">{trendLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

StatsCard.displayName = 'StatsCard'
