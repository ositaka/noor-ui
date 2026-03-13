'use client'

import { useDirection } from '@/components/providers/direction-provider'

export type SwipeDirection = 'left' | 'right' | 'up' | 'down'

export interface SwipeDirectionValues {
  /** Forward in content flow (LTR: left, RTL: right) */
  next: SwipeDirection
  /** Backward in content flow (LTR: right, RTL: left) */
  previous: SwipeDirection
  /** Swipe direction to reveal delete action */
  deleteSwipe: SwipeDirection
  /** Navigation back gesture (like iOS edge swipe) */
  backGesture: SwipeDirection

  /** Numeric forward direction: +1 (LTR) or -1 (RTL) */
  forward: number
  /** Numeric backward direction: -1 (LTR) or +1 (RTL) */
  backward: number

  /** Slide-in animation value: 100 (LTR) or -100 (RTL) */
  slideIn: number
  /** Slide-out animation value: -100 (LTR) or 100 (RTL) */
  slideOut: number

  /** Whether current direction is RTL */
  isRTL: boolean

  /** Mirror a numeric or direction value based on text direction */
  mirror: <T extends number | SwipeDirection>(value: T) => T
}

/**
 * RTL-aware swipe direction hook.
 *
 * Provides directional values and utilities for gesture-based interactions
 * that automatically adjust based on text direction (LTR/RTL).
 *
 * @example
 * ```tsx
 * const { next, previous, slideIn, mirror } = useSwipeDirection()
 * // LTR: next = 'left', slideIn = 100
 * // RTL: next = 'right', slideIn = -100
 * ```
 */
export function useSwipeDirection(): SwipeDirectionValues {
  const { direction } = useDirection()
  const isRTL = direction === 'rtl'

  const mirror = <T extends number | SwipeDirection>(value: T): T => {
    if (typeof value === 'number') {
      return (isRTL ? -value : value) as T
    }
    if (value === 'left') return (isRTL ? 'right' : 'left') as T
    if (value === 'right') return (isRTL ? 'left' : 'right') as T
    return value
  }

  return {
    next: isRTL ? 'right' : 'left',
    previous: isRTL ? 'left' : 'right',
    deleteSwipe: isRTL ? 'right' : 'left',
    backGesture: isRTL ? 'left' : 'right',
    forward: isRTL ? -1 : 1,
    backward: isRTL ? 1 : -1,
    slideIn: isRTL ? -100 : 100,
    slideOut: isRTL ? 100 : -100,
    isRTL,
    mirror,
  }
}

/**
 * Get carousel/pagination animation direction adjusted for RTL.
 *
 * @param targetIndex - Index to navigate to
 * @param currentIndex - Current index
 * @param isRTL - Whether layout is RTL
 * @returns 1 for forward, -1 for backward (flipped in RTL)
 */
export function getCarouselDirection(
  targetIndex: number,
  currentIndex: number,
  isRTL: boolean
): number {
  const rawDirection = targetIndex > currentIndex ? 1 : -1
  return isRTL ? -rawDirection : rawDirection
}
