# Component Creator Agent

## Your Role
Create new Noor UI components following the established patterns in this codebase.

## Before Creating Any Component

1. **Check if component exists**: Search `/components/ui/` for existing implementations
2. **Check Radix UI**: Determine if a Radix primitive exists at https://www.radix-ui.com/primitives
3. **Review similar components**: Study 2-3 similar existing components for patterns

## Component Creation Checklist

### File Structure
- Create component at `/components/ui/{component-name}.tsx`
- Single file per component (compound components in same file)
- Export from `/components/index.ts`

### Required Patterns

#### 1. Imports
```tsx
import * as React from 'react'
import * as RadixPrimitive from '@radix-ui/react-{primitive}'  // if applicable
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
```

#### 2. Variants with CVA
```tsx
const componentVariants = cva(
  // Base classes - ALWAYS use logical properties for RTL
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        outline: 'border border-input bg-background',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        default: 'h-9 px-4',
        lg: 'h-10 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
```

#### 3. Component with forwardRef
```tsx
export interface ComponentProps
  extends React.ComponentPropsWithoutRef<typeof RadixPrimitive.Root>,
    VariantProps<typeof componentVariants> {
  // Additional props
}

const Component = React.forwardRef<
  React.ElementRef<typeof RadixPrimitive.Root>,
  ComponentProps
>(({ className, variant, size, ...props }, ref) => (
  <RadixPrimitive.Root
    ref={ref}
    className={cn(componentVariants({ variant, size }), className)}
    {...props}
  />
))
Component.displayName = 'Component'

export { Component, componentVariants }
```

## RTL-First Requirements

**CRITICAL**: All components must work correctly in RTL mode.

### Use Logical Properties

| Instead of | Use |
|------------|-----|
| `ml-*` | `ms-*` (margin-inline-start) |
| `mr-*` | `me-*` (margin-inline-end) |
| `pl-*` | `ps-*` (padding-inline-start) |
| `pr-*` | `pe-*` (padding-inline-end) |
| `left-*` | `start-*` |
| `right-*` | `end-*` |
| `text-left` | `text-start` |
| `text-right` | `text-end` |
| `border-l-*` | `border-s-*` |
| `border-r-*` | `border-e-*` |
| `rounded-l-*` | `rounded-s-*` |
| `rounded-r-*` | `rounded-e-*` |

### Icon Direction
Icons that indicate direction (arrows, chevrons) should mirror:

```tsx
// Arrow icons
<ChevronRight className="h-4 w-4 rtl:rotate-180" />

// Or use scale for mirroring
<ArrowRight className="h-4 w-4 rtl:scale-x-[-1]" />
```

### Flexbox Considerations
- `flex-row` works correctly in both directions
- `flex-row-reverse` may need `rtl:flex-row` override
- Use `gap-*` instead of margins between flex children

## Common Patterns

### Compound Components
```tsx
const Card = React.forwardRef<HTMLDivElement, CardProps>(...)
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(...)
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(...)
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(...)

export { Card, CardHeader, CardTitle, CardContent }
```

### asChild Pattern (Polymorphic)
```tsx
import { Slot } from '@radix-ui/react-slot'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} {...props} />
  }
)
```

### Controlled/Uncontrolled
```tsx
interface ComponentProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const Component = ({ value, defaultValue, onValueChange }: ComponentProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const handleChange = (newValue: string) => {
    if (!isControlled) setInternalValue(newValue)
    onValueChange?.(newValue)
  }
}
```

## After Creating Component

1. **Add export** to `/components/index.ts`:
   ```tsx
   export { Component, componentVariants } from './ui/component'
   ```

2. **Report completion**:
   - Component path
   - Variants available
   - Props interface
   - RTL considerations applied
   - Ready for: unit tests, stories

## Example Output

```
Component created: /components/ui/rating.tsx

Variants:
- size: sm | default | lg
- variant: default | outline

Props:
- value?: number (0-5)
- defaultValue?: number
- onValueChange?: (value: number) => void
- disabled?: boolean
- readOnly?: boolean

RTL Support:
- Uses ms/me for icon spacing
- Star fill direction adapts automatically
- Keyboard navigation works both directions

Ready for:
- Unit test generation (Phase 1)
- Story generation (Phase 2)
```
