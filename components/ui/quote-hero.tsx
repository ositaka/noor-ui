'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { Sparkle } from '@phosphor-icons/react'

export interface QuoteHeroProps {
  /** The quote text */
  text: string
  /** Author attribution */
  author?: string
  /** Responsive scale */
  size?: 'md' | 'lg' | 'xl'
  /** Show faint decorative quotation marks */
  showMarks?: boolean
  /** Show accent gradient divider between quote and author */
  showDivider?: boolean
  /** Custom icon for the divider center (defaults to Sparkle) */
  dividerIcon?: React.ReactNode
  /** Action buttons rendered below the author */
  actions?: React.ReactNode
  /** Set true during fade-out transition between quotes */
  isTransitioning?: boolean
  /** Additional CSS classes on the outer wrapper */
  className?: string
}

/**
 * QuoteHero — Viewport-scale quote display for content-first interfaces.
 *
 * Renders a centered quote at heroic typography scale with optional
 * decorative quotation marks, an accent divider, author attribution,
 * and an actions slot. Supports smooth fade transitions between quotes.
 *
 * Designed for immersive reading pages, meditation apps, and
 * inspiration displays.
 */
export function QuoteHero({
  text,
  author,
  size = 'lg',
  showMarks = true,
  showDivider = true,
  dividerIcon,
  actions,
  isTransitioning = false,
  className,
}: QuoteHeroProps) {
  const sizeClasses = {
    md: 'py-8 md:py-12',
    lg: 'py-12 md:py-20',
    xl: 'py-16 md:py-28',
  }

  const markSizes = {
    md: 'text-[4rem] md:text-[6rem]',
    lg: 'text-[5rem] md:text-[8rem]',
    xl: 'text-[6rem] md:text-[10rem]',
  }

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center text-center px-6 md:px-12',
        sizeClasses[size],
        className,
      )}
    >
      {/* Transition wrapper */}
      <div
        className={cn(
          'transition-all duration-300 ease-out',
          isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0',
        )}
      >
        {/* Decorative opening mark — Unicode character, not SVG */}
        {showMarks && (
          <span
            aria-hidden="true"
            className={cn(
              'absolute text-primary/[0.06] pointer-events-none select-none font-display leading-none',
              'top-0 start-[5%] md:start-[10%]',
              markSizes[size],
            )}
          >
            {'\u201C'}
          </span>
        )}

        {/* Quote text */}
        <blockquote
          className="relative z-[1] font-display italic text-foreground leading-[1.3] text-balance max-w-4xl mx-auto"
          style={{
            fontSize:
              size === 'xl'
                ? 'clamp(1.75rem, 5vw, 4.5rem)'
                : size === 'lg'
                  ? 'clamp(1.5rem, 4vw, 3.5rem)'
                  : 'clamp(1.25rem, 3vw, 2.5rem)',
          }}
        >
          <span className="text-primary">&ldquo;</span>
          {text}
          <span className="text-primary">&rdquo;</span>
        </blockquote>

        {/* Accent divider */}
        {showDivider && (
          <div className="flex items-center justify-center gap-3 my-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/25" />
            <div className="text-accent">
              {dividerIcon || <Sparkle className="h-4 w-4" weight="fill" />}
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/25" />
          </div>
        )}

        {/* Author */}
        {author && (
          <p className="text-sm text-muted-foreground font-body-serif">
            — {author}
          </p>
        )}

        {/* Actions slot */}
        {actions && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {actions}
          </div>
        )}

        {/* Decorative closing mark — Unicode character, not SVG */}
        {showMarks && (
          <span
            aria-hidden="true"
            className={cn(
              'absolute text-primary/[0.06] pointer-events-none select-none font-display leading-none',
              'bottom-0 end-[5%] md:end-[10%]',
              markSizes[size],
            )}
          >
            {'\u201D'}
          </span>
        )}
      </div>
    </div>
  )
}

QuoteHero.displayName = 'QuoteHero'
