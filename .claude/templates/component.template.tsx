import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Component Name - Brief description
 *
 * @example
 * ```tsx
 * <ComponentName variant="default" size="md">
 *   Content
 * </ComponentName>
 * ```
 */

// ============================================================================
// Variants (using CVA)
// ============================================================================

const componentVariants = cva(
  // Base styles - always applied
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

// ============================================================================
// Component Interface
// ============================================================================

export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  /**
   * Additional description if needed
   */
  asChild?: boolean
}

// ============================================================================
// Component Implementation
// ============================================================================

const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ComponentName.displayName = 'ComponentName'

// ============================================================================
// Sub-Components (if needed for composition pattern)
// ============================================================================

const ComponentNameHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
ComponentNameHeader.displayName = 'ComponentNameHeader'

const ComponentNameTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
ComponentNameTitle.displayName = 'ComponentNameTitle'

const ComponentNameDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
ComponentNameDescription.displayName = 'ComponentNameDescription'

const ComponentNameContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
ComponentNameContent.displayName = 'ComponentNameContent'

const ComponentNameFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
ComponentNameFooter.displayName = 'ComponentNameFooter'

// ============================================================================
// Exports
// ============================================================================

export {
  ComponentName,
  ComponentNameHeader,
  ComponentNameTitle,
  ComponentNameDescription,
  ComponentNameContent,
  ComponentNameFooter,
}

// ============================================================================
// USAGE NOTES
// ============================================================================

/**
 * RTL COMPLIANCE CHECKLIST:
 * - ✅ Uses logical properties (ms-, me-, ps-, pe-)
 * - ✅ No directional classes (ml-, mr-, pl-, pr-)
 * - ✅ Uses text-start/text-end instead of text-left/text-right
 * - ✅ Flexbox with items-center (neutral direction)
 *
 * PATTERN CHECKLIST:
 * - ✅ React.forwardRef for ref forwarding
 * - ✅ displayName for debugging
 * - ✅ CVA for variant management
 * - ✅ cn() utility for className merging
 * - ✅ TypeScript interface extends HTML attributes
 * - ✅ VariantProps for type safety
 *
 * COMPOSITION PATTERN (if applicable):
 * - Export main component + sub-components
 * - Each sub-component uses forwardRef
 * - Each has displayName
 * - Sub-components work independently
 *
 * Example:
 * <ComponentName>
 *   <ComponentNameHeader>
 *     <ComponentNameTitle>Title</ComponentNameTitle>
 *     <ComponentNameDescription>Description</ComponentNameDescription>
 *   </ComponentNameHeader>
 *   <ComponentNameContent>
 *     Main content
 *   </ComponentNameContent>
 *   <ComponentNameFooter>
 *     Footer content
 *   </ComponentNameFooter>
 * </ComponentName>
 */
