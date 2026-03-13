'use client'

import * as React from 'react'
import { useSwipeable } from 'react-swipeable'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useSwipeDirection, getCarouselDirection } from '../../hooks/use-swipe-direction'
import { useRTLAnimation } from '../../hooks/use-rtl-animation'
import { useDirection } from '../providers/direction-provider'
import { cn } from '../../lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CarouselProps<T = unknown> {
  /** Array of items to display */
  items: T[]
  /** Render function for each item */
  renderItem: (item: T, index: number) => React.ReactNode
  /** Auto-advance slides (milliseconds between slides, or false to disable) */
  autoPlay?: number | false
  /** Show dot indicators below the carousel */
  showDots?: boolean
  /** Show left/right arrow buttons */
  showArrows?: boolean
  /** Loop back to first item after last */
  loop?: boolean
  /** Accessible label for the carousel region */
  'aria-label'?: string
  /** Additional class name for the outer container */
  className?: string
  /** Additional class name for the slide area */
  slideClassName?: string
  /** Dot indicator size — 'sm' (default) for subtle dots, 'lg' for touch-friendly 24px targets */
  dotSize?: 'sm' | 'lg'
}

// ---------------------------------------------------------------------------
// Number formatter for Eastern Arabic numerals
// ---------------------------------------------------------------------------

const arFormatter = new Intl.NumberFormat('ar', { numberingSystem: 'arab' })

function formatNum(n: number, isRTL: boolean): string {
  return isRTL ? arFormatter.format(n) : String(n)
}

// ---------------------------------------------------------------------------
// Carousel component
// ---------------------------------------------------------------------------

export function Carousel<T>({
  items,
  renderItem,
  autoPlay = false,
  showDots = true,
  showArrows = true,
  loop = true,
  'aria-label': ariaLabel,
  className,
  slideClassName,
  dotSize = 'sm',
}: CarouselProps<T>) {
  const { direction } = useDirection()
  const isRTL = direction === 'rtl'
  const { next, previous, forward } = useSwipeDirection()
  const { fadeSlideVariants } = useRTLAnimation({ distance: 60, duration: 0.3 })
  const shouldReduceMotion = useReducedMotion()

  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [swipeDirection, setSwipeDirection] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  const total = items.length
  const defaultLabel = isRTL ? 'عرض دوّار' : 'Carousel'

  // Navigation helpers
  const canGoNext = loop || currentIndex < total - 1
  const canGoPrev = loop || currentIndex > 0

  const goToIndex = React.useCallback(
    (targetIndex: number) => {
      const dir = getCarouselDirection(targetIndex, currentIndex, isRTL)
      setSwipeDirection(dir)
      setCurrentIndex(targetIndex)
    },
    [currentIndex, isRTL],
  )

  const goNext = React.useCallback(() => {
    if (!canGoNext) return
    const nextIndex = currentIndex >= total - 1 ? 0 : currentIndex + 1
    setSwipeDirection(forward)
    setCurrentIndex(nextIndex)
  }, [canGoNext, currentIndex, total, forward])

  const goPrev = React.useCallback(() => {
    if (!canGoPrev) return
    const prevIndex = currentIndex <= 0 ? total - 1 : currentIndex - 1
    setSwipeDirection(-forward)
    setCurrentIndex(prevIndex)
  }, [canGoPrev, currentIndex, total, forward])

  // Auto-play
  React.useEffect(() => {
    if (!autoPlay || isPaused || total <= 1) return
    const timer = setInterval(goNext, autoPlay)
    return () => clearInterval(timer)
  }, [autoPlay, isPaused, goNext, total])

  // Keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        isRTL ? goNext() : goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        isRTL ? goPrev() : goNext()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goToIndex(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        goToIndex(total - 1)
      }
    },
    [isRTL, goNext, goPrev, goToIndex, total],
  )

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (next === 'left') goNext()
      else goPrev()
    },
    onSwipedRight: () => {
      if (previous === 'right') goPrev()
      else goNext()
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  // Slide position label
  const slideLabel = isRTL
    ? `${formatNum(currentIndex + 1, true)} من ${formatNum(total, true)}`
    : `${currentIndex + 1} of ${total}`

  if (total === 0) return null

  return (
    <div
      className={cn('relative', className)}
      role="region"
      aria-roledescription={isRTL ? 'عرض دوّار' : 'carousel'}
      aria-label={ariaLabel ?? defaultLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Slide viewport */}
      {/* eslint-disable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        {...swipeHandlers}
        className={cn(
          'relative overflow-hidden rounded-lg',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none',
          slideClassName,
        )}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="group"
        aria-label={isRTL ? 'منطقة الشرائح' : 'Slide viewport'}
      >
      {/* eslint-enable jsx-a11y/no-noninteractive-tabindex, jsx-a11y/no-noninteractive-element-interactions */}
        <AnimatePresence initial={false} custom={swipeDirection} mode="wait">
          <motion.div
            key={currentIndex}
            custom={swipeDirection}
            variants={shouldReduceMotion ? undefined : fadeSlideVariants}
            initial={shouldReduceMotion ? false : 'enter'}
            animate={shouldReduceMotion ? { x: 0, opacity: 1 } : 'center'}
            exit={shouldReduceMotion ? undefined : 'exit'}
            role="group"
            aria-roledescription={isRTL ? 'شريحة' : 'slide'}
            aria-label={slideLabel}
          >
            {renderItem(items[currentIndex], currentIndex)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Live region — announces slide changes to screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isRTL
          ? `الشريحة ${formatNum(currentIndex + 1, true)} من ${formatNum(total, true)}`
          : `Slide ${currentIndex + 1} of ${total}`}
      </div>

      {/* Arrow buttons */}
      {showArrows && total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 start-2 z-10',
              'flex h-9 w-9 items-center justify-center rounded-full',
              'bg-background/80 border border-border shadow-sm',
              'hover:bg-accent transition-colors',
              'disabled:opacity-40 disabled:pointer-events-none',
            )}
            aria-label={isRTL ? 'الشريحة السابقة' : 'Previous slide'}
          >
            {isRTL ? (
              <CaretRight className="h-4 w-4" weight="bold" />
            ) : (
              <CaretLeft className="h-4 w-4" weight="bold" />
            )}
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canGoNext}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 end-2 z-10',
              'flex h-9 w-9 items-center justify-center rounded-full',
              'bg-background/80 border border-border shadow-sm',
              'hover:bg-accent transition-colors',
              'disabled:opacity-40 disabled:pointer-events-none',
            )}
            aria-label={isRTL ? 'الشريحة التالية' : 'Next slide'}
          >
            {isRTL ? (
              <CaretLeft className="h-4 w-4" weight="bold" />
            ) : (
              <CaretRight className="h-4 w-4" weight="bold" />
            )}
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && total > 1 && (
        <div
          className="flex justify-center gap-1.5 mt-3"
          role="tablist"
          aria-label={isRTL ? 'شرائح العرض' : 'Slides'}
        >
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={
                isRTL
                  ? `الشريحة ${formatNum(index + 1, true)} من ${formatNum(total, true)}`
                  : `Slide ${index + 1} of ${total}`
              }
              onClick={() => goToIndex(index)}
              className={cn(
                'rounded-full transition-all cursor-pointer',
                dotSize === 'lg'
                  ? index === currentIndex
                    ? 'h-3 w-8 bg-primary'
                    : 'h-3 w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  : index === currentIndex
                    ? 'h-1.5 w-6 bg-primary'
                    : 'h-1.5 w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
