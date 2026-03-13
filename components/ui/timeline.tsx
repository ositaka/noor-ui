'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { Check, Circle, DotsThree } from '@phosphor-icons/react'
import { useDirection } from '../providers/direction-provider'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TimelineItem {
  /** Custom icon to display in the timeline node */
  icon?: React.ReactNode
  /** Title of the timeline event */
  title: string
  /** Arabic title (shown when direction is RTL) */
  titleAr?: string
  /** Description / details for the event */
  description?: string
  /** Arabic description */
  descriptionAr?: string
  /** Date or time label */
  date?: string
  /** Arabic date label */
  dateAr?: string
  /** Status determines node styling */
  status: 'complete' | 'current' | 'upcoming'
}

export interface TimelineProps {
  /** Array of timeline events */
  items: TimelineItem[]
  /** Layout variant */
  variant?: 'default' | 'alternating'
  /** Compact mode for inline use — smaller nodes and tighter spacing */
  compact?: boolean
  /** Accessible label for the timeline — useful when multiple timelines appear on a page */
  'aria-label'?: string
  /** Additional class name */
  className?: string
}

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------

function getStatusClasses(status: TimelineItem['status'], compact: boolean) {
  const size = compact ? 'h-8 w-8' : 'h-11 w-11'
  const iconSize = compact ? 'h-4 w-4' : 'h-5 w-5'

  const base = `${size} shrink-0 flex items-center justify-center rounded-full transition-all`

  const variants: Record<TimelineItem['status'], string> = {
    complete:
      'border-2 border-success/40 bg-success/10 text-success',
    current:
      'border-2 border-primary bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/15',
    upcoming:
      'border-2 border-border bg-muted text-muted-foreground',
  }

  return { node: cn(base, variants[status]), iconSize }
}

function getDefaultIcon(status: TimelineItem['status'], iconSize: string) {
  switch (status) {
    case 'complete':
      return <Check className={iconSize} weight="bold" />
    case 'current':
      return <Circle className={iconSize} weight="fill" />
    case 'upcoming':
      return <DotsThree className={iconSize} weight="bold" />
  }
}

function getLineColor(status: TimelineItem['status']) {
  if (status === 'complete') return 'bg-success/30'
  return 'bg-border'
}

function getStatusLabel(status: TimelineItem['status'], isRTL: boolean) {
  const labels: Record<TimelineItem['status'], [string, string]> = {
    complete: ['Completed', 'مكتمل'],
    current: ['Current', 'حالي'],
    upcoming: ['Upcoming', 'قادم'],
  }
  return isRTL ? labels[status][1] : labels[status][0]
}

// ---------------------------------------------------------------------------
// Timeline component
// ---------------------------------------------------------------------------

export function Timeline({
  items,
  variant = 'default',
  compact = false,
  'aria-label': ariaLabel,
  className,
}: TimelineProps) {
  const { direction } = useDirection()
  const isRTL = direction === 'rtl'
  const defaultLabel = isRTL ? 'الجدول الزمني' : 'Timeline'

  if (variant === 'alternating') {
    return (
      <div
        className={cn('relative', className)}
        role="list"
        aria-label={ariaLabel ?? defaultLabel}
      >
        {/* Center line */}
        <div
          className="absolute start-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-border"
          aria-hidden="true"
        />

        {items.map((item, index) => {
          const isLeft = index % 2 === 0
          const { node, iconSize } = getStatusClasses(item.status, compact)
          const title = isRTL && item.titleAr ? item.titleAr : item.title
          const description = isRTL && item.descriptionAr ? item.descriptionAr : item.description
          const date = isRTL && item.dateAr ? item.dateAr : item.date

          return (
            <div
              key={index}
              className={cn(
                'relative flex items-start',
                compact ? 'mb-6' : 'mb-10',
                index === items.length - 1 && 'mb-0',
              )}
              role="listitem"
            >
              <span className="sr-only">{getStatusLabel(item.status, isRTL)}</span>
              {/* Left content */}
              <div
                className={cn(
                  'w-[calc(50%-1.5rem)] shrink-0',
                  isLeft ? 'text-end pe-6' : '',
                )}
              >
                {isLeft && (
                  <div className={cn(compact ? 'pt-0.5' : 'pt-1')}>
                    <h3
                      className={cn(
                        'font-semibold',
                        compact ? 'text-sm' : 'text-base',
                        item.status === 'upcoming' && 'text-muted-foreground',
                      )}
                    >
                      {title}
                    </h3>
                    {description && (
                      <p className={cn('text-muted-foreground mt-1', compact ? 'text-xs' : 'text-sm')}>
                        {description}
                      </p>
                    )}
                  </div>
                )}
                {!isLeft && date && (
                  <div className={cn(compact ? 'pt-1.5' : 'pt-2.5')}>
                    <p className={cn('text-muted-foreground', compact ? 'text-xs' : 'text-sm')}>
                      {date}
                    </p>
                  </div>
                )}
              </div>

              {/* Center node */}
              <div className="relative z-10 mx-1 shrink-0">
                <div className={node} aria-hidden="true">
                  {item.icon || getDefaultIcon(item.status, iconSize)}
                </div>
              </div>

              {/* Right content */}
              <div
                className={cn(
                  'w-[calc(50%-1.5rem)] shrink-0',
                  !isLeft ? 'ps-6' : '',
                )}
              >
                {!isLeft && (
                  <div className={cn(compact ? 'pt-0.5' : 'pt-1')}>
                    <h3
                      className={cn(
                        'font-semibold',
                        compact ? 'text-sm' : 'text-base',
                        item.status === 'upcoming' && 'text-muted-foreground',
                      )}
                    >
                      {title}
                    </h3>
                    {description && (
                      <p className={cn('text-muted-foreground mt-1', compact ? 'text-xs' : 'text-sm')}>
                        {description}
                      </p>
                    )}
                  </div>
                )}
                {isLeft && date && (
                  <div className={cn(compact ? 'pt-1.5' : 'pt-2.5')}>
                    <p className={cn('text-muted-foreground', compact ? 'text-xs' : 'text-sm')}>
                      {date}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Default variant — left-aligned (or right-aligned in RTL)
  // -------------------------------------------------------------------------

  return (
    <div
      className={cn('relative', className)}
      role="list"
      aria-label={ariaLabel ?? defaultLabel}
    >
      {items.map((item, index) => {
        const { node, iconSize } = getStatusClasses(item.status, compact)
        const title = isRTL && item.titleAr ? item.titleAr : item.title
        const description = isRTL && item.descriptionAr ? item.descriptionAr : item.description
        const date = isRTL && item.dateAr ? item.dateAr : item.date
        const isLast = index === items.length - 1

        return (
          <div
            key={index}
            className={cn('relative flex gap-4', compact ? 'gap-3' : 'gap-4')}
            role="listitem"
          >
            <span className="sr-only">{getStatusLabel(item.status, isRTL)}</span>
            {/* Node + line column */}
            <div className="flex flex-col items-center">
              <div className={node} aria-hidden="true">
                {item.icon || getDefaultIcon(item.status, iconSize)}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'w-0.5 flex-1 mt-2',
                    compact ? 'min-h-[1.5rem]' : 'min-h-[2rem]',
                    getLineColor(item.status),
                  )}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Content */}
            <div className={cn('flex-1', compact ? 'pb-5' : 'pb-8', isLast && 'pb-0')}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3
                  className={cn(
                    'font-semibold',
                    compact ? 'text-sm' : 'text-base',
                    item.status === 'upcoming' && 'text-muted-foreground',
                  )}
                >
                  {title}
                </h3>
                {date && (
                  <span className={cn('text-muted-foreground', compact ? 'text-xs' : 'text-sm')}>
                    {date}
                  </span>
                )}
              </div>
              {description && (
                <p
                  className={cn(
                    'text-muted-foreground mt-1',
                    compact ? 'text-xs' : 'text-sm',
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
