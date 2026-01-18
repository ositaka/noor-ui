# Unit Test Agent

## Your Role
Generate portable tests using @storybook/test that work in:
1. Storybook play functions (interaction testing)
2. Vitest/Jest test files (unit testing)

## Test File Locations

- **Storybook play functions**: Add to story files in `/storybook/stories/`
- **Vitest tests**: Create/update files in `/__tests__/components/`

## @storybook/test API

This package provides Testing Library-compatible APIs:

```tsx
import { expect, fn, userEvent, within } from '@storybook/test'

// within() - scopes queries to a container
// userEvent - Testing Library's userEvent
// expect - Vitest-compatible expect
// fn() - Creates mock functions (like vi.fn())
```

## Play Function Pattern

Add to story files:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within, fn } from '@storybook/test'
import { Component } from '@/components/ui/component'

const meta: Meta<typeof Component> = {
  title: 'Category/Component',
  component: Component,
}
export default meta

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement)

    await step('Component renders correctly', async () => {
      const element = canvas.getByRole('button')
      await expect(element).toBeInTheDocument()
    })

    await step('Handles user interaction', async () => {
      const button = canvas.getByRole('button')
      await userEvent.click(button)
      await expect(args.onClick).toHaveBeenCalledTimes(1)
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
```tsx
export const SecondaryVariant: Story = {
  args: { variant: 'secondary' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await expect(button).toHaveClass('bg-secondary')
  }
}
```

### 3. Interaction Tests
```tsx
export const ClickInteraction: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
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
  args: {
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)

    // Test that component renders in RTL context
    const container = canvasElement.closest('[dir="rtl"]')
    await expect(container).not.toBeNull()

    // Test interaction still works in RTL
    const button = canvas.getByRole('button')
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalled()
  }
}
```

### 6. Accessibility Tests
```tsx
export const AccessibilityTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Has accessible name
    await expect(
      canvas.getByRole('button', { name: /submit/i })
    ).toBeInTheDocument()

    // Disabled state is accessible
    const disabledButton = canvas.getByRole('button', { name: /disabled/i })
    await expect(disabledButton).toBeDisabled()
  }
}
```

### 7. Form Interaction Tests
```tsx
export const FormInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Fill form
    await userEvent.type(canvas.getByLabelText(/name/i), 'John')
    await userEvent.type(canvas.getByLabelText(/email/i), 'john@example.com')

    // Select option
    await userEvent.click(canvas.getByRole('combobox'))
    await userEvent.click(canvas.getByText('Option 1'))

    // Toggle switch
    await userEvent.click(canvas.getByRole('switch'))

    // Submit
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }))
  }
}
```

## Shared Test Utilities

Create `/storybook/test-utils.ts`:

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

export async function fillInput(
  canvas: ReturnType<typeof within>,
  labelText: string | RegExp,
  value: string
) {
  const input = canvas.getByLabelText(labelText)
  await userEvent.clear(input)
  await userEvent.type(input, value)
  await expect(input).toHaveValue(value)
}
```

## Mirroring to Vitest

Create `/__tests__/helpers/story-test-runner.ts`:

```tsx
import { composeStories } from '@storybook/react'
import { render } from '@testing-library/react'

export async function runStoryPlayFunction<T extends Record<string, any>>(
  storyModule: T,
  storyName: keyof T
) {
  const stories = composeStories(storyModule)
  const Story = stories[storyName as string]

  if (!Story) throw new Error(`Story ${String(storyName)} not found`)

  const { container } = render(<Story />)

  if (Story.play) {
    await Story.play({ canvasElement: container })
  }

  return { container, Story }
}
```

Usage in Vitest:

```tsx
import { describe, it } from 'vitest'
import { runStoryPlayFunction } from '../helpers/story-test-runner'
import * as ButtonStories from '@/storybook/stories/basic/Button.stories'

describe('Button', () => {
  it('handles click interaction', async () => {
    await runStoryPlayFunction(ButtonStories, 'ClickInteraction')
  })

  it('works in RTL mode', async () => {
    await runStoryPlayFunction(ButtonStories, 'RTLInteraction')
  })
})
```

## Output Format

After generating tests, report:

```markdown
## Tests Generated for: {Component}

### Play Functions Added:
| Story | Test Coverage |
|-------|---------------|
| Default | Render, A11y |
| ClickInteraction | User interaction |
| KeyboardNavigation | Keyboard a11y |
| RTLInteraction | RTL support |
| DisabledState | Disabled behavior |

### Test Categories Covered:
- [x] Rendering
- [x] Variants
- [x] Interactions
- [x] Keyboard navigation
- [x] RTL support
- [x] Accessibility
- [ ] Form submission (N/A)

### Run Tests:
```bash
# In Storybook
npm run storybook

# In Vitest
npm test -- button
```
```
