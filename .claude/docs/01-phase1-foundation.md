# Phase 1: Foundation Agents

## Overview

Phase 1 establishes two core agents that form the foundation of the automated workflow:
1. **Component Creation Agent** - Creates new components following Noor UI patterns
2. **Unit Test Agent** - Generates portable tests using Storybook's play functions + @storybook/test

These agents work together: the component agent creates, the test agent validates.

---

## Agent 1: Component Creation Agent

### Purpose
Automate the creation of new Noor UI components following established patterns:
- Radix UI primitives as base
- CVA (class-variance-authority) for variants
- Tailwind CSS with logical properties for RTL
- forwardRef pattern for all interactive components

### Configuration

Create `.claude/settings.json` and add this agent configuration:

```json
{
  "agents": {
    "component-creator": {
      "description": "Creates new Noor UI components following established patterns",
      "instructions": "See .claude/agents/component-creator.md for detailed instructions"
    }
  }
}
```

### Agent Instructions (`.claude/prompts/component-creator.md`)

```markdown
# Component Creator Agent

## Your Role
You create new Noor UI components following the established patterns in this codebase.

## Before Creating Any Component

1. **Check if component exists**: Search `/components/ui/` for existing implementations
2. **Check Radix UI**: Determine if a Radix primitive exists for this component
3. **Review similar components**: Study 2-3 similar existing components for patterns

## Component Creation Checklist

### File Structure
- Create component at `/components/ui/{component-name}.tsx`
- Single file per component (compound components in same file)
- Export from `/components/index.ts`

### Required Patterns

1. **Imports**:
```tsx
import * as React from 'react'
import * as RadixPrimitive from '@radix-ui/react-{primitive}'  // if applicable
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
```

2. **Variants with CVA**:
```tsx
const componentVariants = cva(
  // Base classes - ALWAYS use logical properties for RTL
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        // ... other variants
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

3. **Component with forwardRef**:
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

### RTL-First Requirements

**CRITICAL**: All components must work correctly in RTL mode.

1. **Use logical properties** (Tailwind CSS with tailwindcss-logical plugin):
   - `ms-*` instead of `ml-*` (margin-inline-start)
   - `me-*` instead of `mr-*` (margin-inline-end)
   - `ps-*` instead of `pl-*` (padding-inline-start)
   - `pe-*` instead of `pr-*` (padding-inline-end)
   - `start-*` instead of `left-*`
   - `end-*` instead of `right-*`

2. **Icon direction**: Icons that indicate direction (arrows, chevrons) should:
   - Use `rtl:rotate-180` for horizontal arrows
   - Or use `rtl:scale-x-[-1]` for mirroring

3. **Text alignment**: Use `text-start` / `text-end` instead of `text-left` / `text-right`

4. **Flexbox**: `flex-row` works correctly, but explicit `flex-row-reverse` may need `rtl:flex-row`

### After Creating Component

1. Add export to `/components/index.ts`
2. Notify that component is ready for:
   - Unit test generation (Phase 1)
   - Story generation (Phase 2)
```

### Usage Example

When user requests a new component:

```
User: Create a new Rating component with star icons

Claude (using component-creator agent):
1. Searches for existing rating/star components
2. Checks Radix UI for primitives (none for rating)
3. Reviews similar components (Switch, Slider for patterns)
4. Creates /components/ui/rating.tsx with:
   - CVA variants for sizes
   - forwardRef pattern
   - RTL-compatible spacing (ms/me)
   - Keyboard navigation
5. Exports from /components/index.ts
6. Reports: "Component created. Ready for unit tests and stories."
```

---

## Agent 2: Unit Test Agent

### Purpose
Generate portable tests that work in both:
- Storybook interaction tests (via play functions)
- Vitest/Jest unit tests (via @storybook/test)

This is achieved using `@storybook/test` which provides Testing Library-compatible APIs.

### Configuration

Add to `.claude/settings.json`:

```json
{
  "agents": {
    "unit-test": {
      "description": "Generates portable unit tests using @storybook/test for Storybook play functions",
      "instructions": "See .claude/agents/unit-test.md for detailed instructions"
    }
  }
}
```

### Required Dependencies

Your project already has these, but verify:

```bash
npm list @storybook/test @storybook/addon-interactions
```

If missing:
```bash
npm install -D @storybook/test @storybook/addon-interactions
```

### Agent Instructions (`.claude/prompts/unit-test.md`)

```markdown
# Unit Test Agent

## Your Role
Generate portable tests using @storybook/test that work in:
1. Storybook play functions (interaction testing)
2. Vitest/Jest test files (unit testing)

## Test File Locations

- **Storybook play functions**: Add to existing story files in `/storybook/stories/`
- **Vitest tests**: Create/update files in `/__tests__/components/`

## @storybook/test API

This package provides Testing Library-compatible APIs:

```tsx
import { expect, fn, userEvent, within } from '@storybook/test'

// within() - scopes queries to a container (like screen but scoped)
// userEvent - Testing Library's userEvent
// expect - Vitest-compatible expect
// fn() - Creates mock functions (like vi.fn())
```

## Play Function Pattern

Add to story files:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Component } from '@/components/ui/component'

const meta: Meta<typeof Component> = {
  title: 'Category/Component',
  component: Component,
}
export default meta

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    // props
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Component renders correctly', async () => {
      const element = canvas.getByRole('button')
      await expect(element).toBeInTheDocument()
    })

    await step('Handles user interaction', async () => {
      const button = canvas.getByRole('button')
      await userEvent.click(button)
      await expect(button).toHaveAttribute('aria-pressed', 'true')
    })
  }
}
```

## Test Categories to Cover

### 1. Rendering Tests
```tsx
play: async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // Element exists
  await expect(canvas.getByRole('button')).toBeInTheDocument()

  // Has correct text
  await expect(canvas.getByText('Submit')).toBeVisible()

  // Has correct attributes
  await expect(canvas.getByRole('button')).toHaveAttribute('type', 'submit')
}
```

### 2. Variant Tests
Create separate stories for each variant with play functions:

```tsx
export const SecondaryVariant: Story = {
  args: { variant: 'secondary' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    // Check variant-specific classes
    await expect(button).toHaveClass('bg-secondary')
  }
}
```

### 3. Interaction Tests
```tsx
export const ClickInteraction: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    await userEvent.click(button)

    // If onClick is a mock (fn())
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
  args: {
    onClick: fn()  // Mock function
  }
}
```

### 4. Keyboard Navigation Tests
```tsx
export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    // Tab to element
    await userEvent.tab()
    await expect(input).toHaveFocus()

    // Type text
    await userEvent.type(input, 'Hello')
    await expect(input).toHaveValue('Hello')

    // Press Enter
    await userEvent.keyboard('{Enter}')
  }
}
```

### 5. RTL-Specific Tests

**CRITICAL**: Always create RTL test variants.

```tsx
export const RTLInteraction: Story = {
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Test that component renders in RTL
    const container = canvasElement.closest('[dir="rtl"]')
    await expect(container).not.toBeNull()

    // Test interaction still works
    const button = canvas.getByRole('button')
    await userEvent.click(button)
  }
}
```

### 6. Accessibility Tests
```tsx
export const AccessibilityTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Has accessible name
    await expect(canvas.getByRole('button', { name: /submit/i })).toBeInTheDocument()

    // Disabled state is accessible
    const disabledButton = canvas.getByRole('button', { name: /disabled/i })
    await expect(disabledButton).toBeDisabled()
    await expect(disabledButton).toHaveAttribute('aria-disabled', 'true')
  }
}
```

## Portable Test Helpers

Create shared test utilities in `/storybook/test-utils.ts`:

```tsx
import { expect, within } from '@storybook/test'

export async function expectRTLLayout(canvasElement: HTMLElement) {
  const container = canvasElement.closest('[dir="rtl"]')
  await expect(container).not.toBeNull()
}

export async function expectVisibleAndEnabled(
  canvas: ReturnType<typeof within>,
  role: string,
  name?: string | RegExp
) {
  const element = canvas.getByRole(role, name ? { name } : undefined)
  await expect(element).toBeVisible()
  await expect(element).toBeEnabled()
  return element
}

export async function expectFocusable(element: HTMLElement) {
  element.focus()
  await expect(element).toHaveFocus()
}
```

## Mirroring Tests to Vitest

The same test logic can run in Vitest. Create a helper:

`/__tests__/helpers/run-story-tests.ts`:

```tsx
import { composeStories } from '@storybook/react'
import { render } from '@testing-library/react'

export function testStoriesOf<T extends Record<string, any>>(
  storyModule: T,
  storyName: keyof T
) {
  const stories = composeStories(storyModule)
  const Story = stories[storyName as string]

  if (!Story) throw new Error(`Story ${String(storyName)} not found`)

  return {
    render: () => render(<Story />),
    play: Story.play,
  }
}
```

## After Generating Tests

Report to user:
1. Which stories have play functions added
2. Coverage of test categories (rendering, interaction, RTL, a11y)
3. Any components that need additional test scenarios
```

---

## Integration: How Agents Work Together

### Workflow

```
┌─────────────────────┐
│   User Request      │
│ "Create X component"│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Component Creator   │
│ Agent               │
│ - Creates component │
│ - Exports it        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Unit Test Agent     │
│ - Adds play funcs   │
│ - Tests all states  │
│ - Tests RTL/LTR     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Ready for         │
│   Phase 2: Visual   │
└─────────────────────┘
```

### Example Session

```
User: Create a StarRating component with 5 stars, hover preview, and click to select

Claude: I'll create the StarRating component following Noor UI patterns.

[Component Creator Agent]
1. Checking existing components... no rating component found
2. Reviewing similar interactive components (Switch, Slider)
3. Creating /components/ui/star-rating.tsx with:
   - Size variants (sm, default, lg)
   - Controlled/uncontrolled modes
   - Keyboard navigation (arrow keys)
   - RTL support with logical properties
   - forwardRef pattern

Component created. Adding to exports...

[Unit Test Agent]
Creating play functions for StarRating stories:

1. Default story - render test
2. Hover interaction - preview stars
3. Click interaction - select rating
4. Keyboard navigation - arrow keys
5. RTL variant - mirrored layout
6. Disabled state - no interaction
7. Controlled mode - external state

Tests added to /storybook/stories/forms/StarRating.stories.tsx

Ready for Phase 2: Story generation and visual validation.
```

---

## Verification Commands

After using these agents, verify with:

```bash
# Check component builds
npm run build

# Run Storybook tests
npm run storybook -- --test

# Run Vitest
npm test

# Start Storybook to see interactions
npm run storybook
```

---

## Next Steps

Once Phase 1 agents are working:
1. Proceed to Phase 2 for story generation and screenshot capture
2. The unit tests will catch functional regressions
3. Visual validation will catch styling/RTL issues
