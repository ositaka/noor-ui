import * as React from 'react'
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button, buttonVariants, type ButtonProps } from './button'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Arrow direction semantics:
 * - 'forward': Arrow points in the direction of progression (right in LTR, left in RTL)
 * - 'back': Arrow points in the opposite direction (left in LTR, right in RTL)
 */
type ArrowDirection = 'forward' | 'back'

/**
 * Arrow icon style:
 * - 'chevron': Uses chevron icons (< or >)
 * - 'arrow': Uses arrow icons (← or →)
 */
type ArrowIcon = 'chevron' | 'arrow'

export interface ButtonArrowProps extends ButtonProps {
  /** Direction of the arrow - 'forward' progresses, 'back' returns */
  direction?: ArrowDirection
  /** Icon style - chevron or arrow */
  icon?: ArrowIcon
  /** Position of the arrow relative to children */
  iconPosition?: 'start' | 'end' | 'auto'
  /** Size of the arrow icon */
  iconSize?: 'sm' | 'md' | 'lg'
  /** Hide the arrow icon (useful for conditional rendering) */
  hideIcon?: boolean
}

const iconSizeClasses = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

/**
 * ButtonArrow - A button component with directional arrows that automatically
 * handles RTL/LTR layouts using semantic directions.
 *
 * Uses Tailwind's `rtl:rotate-180` for automatic arrow mirroring in RTL contexts.
 * The arrow direction is semantic (forward/back) rather than physical (left/right),
 * making it work correctly in both LTR and RTL layouts.
 *
 * @example
 * ```tsx
 * // Forward button (arrow on the right in LTR, left in RTL)
 * <ButtonArrow direction="forward">
 *   Continue
 * </ButtonArrow>
 *
 * // Back button (arrow on the left in LTR, right in RTL)
 * <ButtonArrow direction="back">
 *   Back to Blog
 * </ButtonArrow>
 *
 * // With arrow style
 * <ButtonArrow direction="forward" icon="arrow">
 *   Next Step
 * </ButtonArrow>
 * ```
 */
const ButtonArrow = React.forwardRef<HTMLButtonElement, ButtonArrowProps>(
  (
    {
      className,
      children,
      direction = 'forward',
      icon = 'chevron',
      iconPosition = 'auto',
      iconSize = 'md',
      hideIcon = false,
      ...props
    },
    ref
  ) => {
    // Determine icon position based on direction if set to 'auto'
    // Forward: icon at end, Back: icon at start
    const resolvedPosition = iconPosition === 'auto'
      ? (direction === 'forward' ? 'end' : 'start')
      : iconPosition

    // Select the appropriate icon based on direction and style
    // For 'forward': right chevron/arrow that rotates in RTL
    // For 'back': left chevron/arrow that rotates in RTL
    const IconComponent = React.useMemo(() => {
      if (icon === 'chevron') {
        return direction === 'forward' ? ChevronRight : ChevronLeft
      }
      return direction === 'forward' ? ArrowRight : ArrowLeft
    }, [direction, icon])

    const iconClasses = cn(
      iconSizeClasses[iconSize],
      'rtl:rotate-180',
      'shrink-0',
      'transition-transform duration-200'
    )

    const ArrowIcon = hideIcon ? null : (
      <IconComponent className={iconClasses} aria-hidden="true" />
    )

    return (
      <Button
        ref={ref}
        className={cn(
          'gap-2',
          // Add padding adjustment based on icon position
          resolvedPosition === 'start' && 'ps-3',
          resolvedPosition === 'end' && 'pe-3',
          className
        )}
        {...props}
      >
        {resolvedPosition === 'start' && ArrowIcon}
        {children}
        {resolvedPosition === 'end' && ArrowIcon}
      </Button>
    )
  }
)

ButtonArrow.displayName = 'ButtonArrow'

export { ButtonArrow }
