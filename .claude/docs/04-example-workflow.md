# Example Workflow: Visual QA on Switch Component

This document demonstrates the complete agent-driven workflow using the existing Switch component.

## Prerequisites

```bash
# Install Playwright
npm install -D @playwright/test
npx playwright install chromium

# Verify Storybook works
npm run storybook
```

## Step 1: Run Visual QA Loop

```bash
npx vite-node .claude/scripts/visual-qa-loop.ts forms-switch
```

This will:
1. Start Storybook (if not running)
2. Capture screenshots for all Switch stories
3. Output an analysis prompt

## Step 2: Claude Analyzes Screenshots

When Claude sees the analysis prompt, it will:

1. **Read screenshots** using the Read tool:
```
Read: .claude/screenshots/captured/forms-switch/iter-1/ltr-light/Default.png
Read: .claude/screenshots/captured/forms-switch/iter-1/rtl-light/Default.png
```

2. **Compare LTR vs RTL**:
   - Check if switch thumb animates in correct direction
   - Verify label appears on correct side
   - Ensure spacing mirrors properly

3. **Check dark mode**:
   - Text readable against dark background
   - Switch track visible
   - Focus states clear

4. **Report findings**:

```markdown
## Visual Analysis: Switch Component

### Issues Found:

**1. [INFO] Switch thumb animation**
- Location: Switch toggle
- Observation: Thumb animates left-to-right when ON in both LTR and RTL
- Note: This is actually correct for Switch components (state-based, not directional)
- Status: NOT A BUG

### Passed Checks:
- [x] RTL layout mirroring - Labels correctly on right
- [x] Text alignment - Labels align to start
- [x] Spacing - Gap between switch and label consistent
- [x] Dark mode contrast - All elements visible
- [x] Disabled states - Clearly distinguishable

### Recommendation:
No issues found. Switch component passes visual QA.
```

## Step 3: If Issues Found

If Claude found issues, it would:

1. **Apply fix**:
```tsx
// Example: If icon direction was wrong
// Before
<ChevronRight className="h-4 w-4" />

// After
<ChevronRight className="h-4 w-4 rtl:rotate-180" />
```

2. **Request re-capture**:
```bash
npx vite-node .claude/scripts/visual-qa-loop.ts forms-switch 2
```

3. **Re-analyze** the new screenshots

4. **Loop until**:
   - No issues found, OR
   - Max iterations (3) reached

## Step 4: Final Report

When complete, Claude provides:

```markdown
# Visual QA Complete: Switch Component

## Summary
- Iterations: 1
- Issues Found: 0
- Status: PASSED

## Validation Coverage
- [x] LTR Light Mode (8 stories)
- [x] LTR Dark Mode (8 stories)
- [x] RTL Light Mode (8 stories)
- [x] RTL Dark Mode (8 stories)

## Stories Validated
1. Default
2. WithLabel
3. SettingsPanel
4. DisabledState
5. Controlled
6. InForm
7. RTLExample
8. RTLSettingsPanel

## Screenshots Location
.claude/screenshots/captured/forms-switch/iter-1/

## Result
Switch component passes all visual checks.
Ready for production.
```

---

## Creating a New Component

Here's how the full workflow looks for a new component:

### Request
```
User: Create a StarRating component with 5 stars, hover preview, and click to select
```

### Claude's Response

```markdown
I'll create the StarRating component with full visual QA.

## Phase 1: Component Creation

Creating `/components/ui/star-rating.tsx`:

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

const starRatingVariants = cva(
  'inline-flex items-center',
  {
    variants: {
      size: {
        sm: 'gap-0.5',
        default: 'gap-1',
        lg: 'gap-1.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

const starVariants = cva(
  'transition-colors cursor-pointer',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      state: {
        empty: 'text-muted-foreground/30',
        filled: 'text-yellow-500 fill-yellow-500',
        hover: 'text-yellow-400',
      },
    },
    defaultVariants: {
      size: 'default',
      state: 'empty',
    },
  }
)

export interface StarRatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof starRatingVariants> {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  max?: number
  disabled?: boolean
  readOnly?: boolean
}

const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  (
    {
      className,
      size,
      value,
      defaultValue = 0,
      onValueChange,
      max = 5,
      disabled = false,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)

    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue
    const displayValue = hoverValue ?? currentValue

    const handleClick = (starValue: number) => {
      if (disabled || readOnly) return
      if (!isControlled) setInternalValue(starValue)
      onValueChange?.(starValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent, starValue: number) => {
      if (disabled || readOnly) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick(starValue)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(starRatingVariants({ size }), className)}
        role="radiogroup"
        aria-label="Rating"
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1
          const isFilled = starValue <= displayValue

          return (
            <Star
              key={i}
              className={cn(
                starVariants({
                  size,
                  state: isFilled ? 'filled' : hoverValue && starValue <= hoverValue ? 'hover' : 'empty',
                }),
                disabled && 'cursor-not-allowed opacity-50',
                readOnly && 'cursor-default'
              )}
              role="radio"
              aria-checked={starValue === currentValue}
              aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
              tabIndex={disabled ? -1 : 0}
              onClick={() => handleClick(starValue)}
              onKeyDown={(e) => handleKeyDown(e, starValue)}
              onMouseEnter={() => !disabled && !readOnly && setHoverValue(starValue)}
              onMouseLeave={() => setHoverValue(null)}
            />
          )
        })}
      </div>
    )
  }
)
StarRating.displayName = 'StarRating'

export { StarRating, starRatingVariants }
```

Added export to `/components/index.ts`.

## Phase 2: Story Generation

Creating `/storybook/stories/forms/StarRating.stories.tsx` with:
- Default, all sizes
- Controlled/uncontrolled
- Disabled, readOnly
- RTL variants
- Dark mode
- Long hover sequence

## Phase 3: Screenshot Capture

```bash
npx vite-node .claude/scripts/visual-qa-loop.ts forms-star-rating
```

Captured 40 screenshots across 4 variants.

## Phase 4: Visual Analysis

Reading screenshots...

### Iteration 1 Analysis

**Issues Found:**

1. **[WARNING] Star icons same in RTL**
   - Location: All RTL screenshots
   - Expected: Stars could fill from right in RTL
   - Actual: Stars fill from left in both directions
   - Decision: This is actually correct (rating is value-based, not directional)
   - Status: NOT A BUG

**Passed Checks:**
- [x] Layout renders correctly
- [x] Hover states work
- [x] Disabled state clear
- [x] Dark mode contrast good
- [x] Sizes consistent

### Result

No issues requiring fixes. Component passes visual QA.

## Final Report

# Visual QA Complete: StarRating

## Summary
- Iterations: 1
- Issues: 0
- Status: PASSED

## Component Location
`/components/ui/star-rating.tsx`

## Story Location
`/storybook/stories/forms/StarRating.stories.tsx`

## Screenshots
`.claude/screenshots/captured/forms-star-rating/iter-1/`

## Ready for Review

The StarRating component is complete and passes all visual checks.

[View Screenshots] [Approve] [Request Changes]
```

---

## Running the Example

Try it yourself:

```bash
# 1. Start Storybook
npm run storybook

# 2. In another terminal, run visual QA on Switch
npx vite-node .claude/scripts/visual-qa-loop.ts forms-switch

# 3. Ask Claude to analyze the screenshots
# Claude will read the screenshots and report findings
```

## What to Expect

When you run the visual QA loop, you'll see:

1. **Console output** showing capture progress
2. **Analysis prompt** for Claude to process
3. **Screenshots** saved to `.claude/screenshots/captured/`
4. **State file** tracking the loop progress

Claude will then:
1. Read each screenshot using vision
2. Compare LTR vs RTL variants
3. Check for issues
4. Report findings or apply fixes
5. Loop until complete

---

## Troubleshooting

### Storybook not starting
```bash
# Check if port 6006 is in use
lsof -i :6006

# Kill existing process
kill -9 <PID>

# Restart Storybook
npm run storybook
```

### No stories found
```bash
# Verify component ID format
# Should be: category-component (lowercase, hyphenated)
# Example: forms-switch, basic-button

# List all stories
curl http://localhost:6006/index.json | jq '.entries | keys'
```

### Screenshots not capturing
```bash
# Check Playwright is installed
npx playwright --version

# Install browsers
npx playwright install chromium
```
