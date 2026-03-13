'use client'

import type { Variants, Easing } from 'framer-motion'
import { useSwipeDirection } from './use-swipe-direction'

export interface RTLAnimationConfig {
  /** Animation distance in pixels (default: 100) */
  distance?: number
  /** Animation duration in seconds (default: 0.3) */
  duration?: number
  /** Easing function (default: "easeInOut") */
  ease?: Easing
}

export interface RTLAnimationHook {
  /** Slide variants for carousels and page transitions */
  slideVariants: Variants
  /** Fade + slide variants (smoother, less movement) */
  fadeSlideVariants: Variants
  /** Swipe-to-dismiss variants for modals and cards */
  swipeVariants: Variants
  /** Whether current direction is RTL */
  isRTL: boolean
  /** Get animation direction value adjusted for RTL */
  getDirection: (direction: number) => number
}

/**
 * RTL-aware Framer Motion animation variants.
 *
 * Provides animation variants that automatically adjust for RTL layouts,
 * working with Framer Motion's variant system.
 *
 * @example
 * ```tsx
 * const { slideVariants } = useRTLAnimation()
 *
 * <motion.div
 *   variants={slideVariants}
 *   initial="enter"
 *   animate="center"
 *   exit="exit"
 *   custom={direction}
 * />
 * ```
 */
export function useRTLAnimation(
  config: RTLAnimationConfig = {}
): RTLAnimationHook {
  const { isRTL } = useSwipeDirection()

  const {
    distance = 100,
    duration = 0.3,
    ease = 'easeInOut',
  } = config

  const getDirection = (direction: number) => {
    return isRTL ? -direction : direction
  }

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: getDirection(direction) * distance,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration,
        ease,
      },
    },
    exit: (direction: number) => ({
      x: getDirection(direction) * -distance,
      opacity: 0,
      transition: {
        duration,
        ease,
      },
    }),
  }

  const fadeSlideVariants: Variants = {
    enter: (direction: number) => ({
      x: getDirection(direction) * distance * 0.5,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { duration, ease },
        opacity: { duration: duration * 0.8 },
      },
    },
    exit: (direction: number) => ({
      x: getDirection(direction) * -distance * 0.5,
      opacity: 0,
      transition: {
        x: { duration, ease },
        opacity: { duration: duration * 0.8 },
      },
    }),
  }

  const swipeVariants: Variants = {
    initial: {
      x: 0,
      opacity: 1,
    },
    dismissed: (direction: number) => ({
      x: getDirection(direction) * distance * 3,
      opacity: 0,
      transition: {
        duration: duration * 0.8,
        ease: 'easeIn',
      },
    }),
  }

  return {
    slideVariants,
    fadeSlideVariants,
    swipeVariants,
    isRTL,
    getDirection,
  }
}

/**
 * Get RTL-aware drag constraints for horizontal dragging.
 *
 * @example
 * ```tsx
 * const constraints = useRTLDragConstraints({ left: -100, right: 100 })
 * <motion.div drag="x" dragConstraints={constraints} />
 * ```
 */
export function useRTLDragConstraints(constraints: {
  left: number
  right: number
}) {
  const { isRTL } = useSwipeDirection()

  if (isRTL) {
    return {
      left: -constraints.right,
      right: -constraints.left,
    }
  }

  return constraints
}
