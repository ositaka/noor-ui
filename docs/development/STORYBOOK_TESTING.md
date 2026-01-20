# Storybook Unit Testing Guide

## Overview

Noor UI uses Storybook play functions for portable unit tests that run in:
1. **Storybook UI** - Interactive testing via the Interactions panel
2. **CLI** - Headless testing via `npm run test-storybook`
3. **Vitest** - Traditional test runner integration

## Import Pattern (Storybook 10)

```tsx
// Storybook 10 uses 'storybook/test' NOT '@storybook/test'
import { expect, fn, userEvent, within } from 'storybook/test'
```

## Play Function Structure

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Component } from '@/components/ui/component'

const meta: Meta<typeof Component> = {
  title: 'Category/Component',
  component: Component,
}
export default meta

type Story = StoryObj<typeof Component>

export const InteractionTest: Story = {
  args: {
    onClick: fn(),  // Mock function to track calls
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement)

    await step('Component renders', async () => {
      await expect(canvas.getByRole('button')).toBeInTheDocument()
    })

    await step('Handles click', async () => {
      await userEvent.click(canvas.getByRole('button'))
      await expect(args.onClick).toHaveBeenCalledTimes(1)
    })
  }
}
```

## Test Categories

### 1. Rendering Tests
```tsx
await expect(canvas.getByRole('button')).toBeInTheDocument()
await expect(canvas.getByText('Submit')).toBeVisible()
await expect(button).toHaveClass('bg-primary')
```

### 2. Interaction Tests
```tsx
await userEvent.click(canvas.getByRole('button'))
await expect(args.onClick).toHaveBeenCalled()
```

### 3. Keyboard Navigation Tests
```tsx
await userEvent.tab()
await expect(button).toHaveFocus()
await userEvent.keyboard('{Enter}')
await expect(args.onClick).toHaveBeenCalled()
```

### 4. RTL Tests
```tsx
export const RTLTest: Story = {
  args: { children: 'زر عربي' },
  globals: { direction: 'rtl', locale: 'ar' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('button')).toHaveTextContent('زر عربي')
  }
}
```

### 5. Disabled State Tests

**Important:** Don't try to click disabled buttons with `pointer-events: none` - it throws an error.

```tsx
// WRONG - will throw error
await userEvent.click(disabledButton)  // Error: pointer-events: none

// CORRECT - verify disabled state without clicking
await expect(button).toBeDisabled()
await expect(button).toHaveClass('disabled:pointer-events-none')
await expect(args.onClick).not.toHaveBeenCalled()
```

## Running Tests

### In Storybook UI
```bash
npm run storybook
# Open http://localhost:6006
# Navigate to any story
# Click "Interactions" tab at bottom
```

### Via CLI (Headless)
```bash
# Requires Storybook running in another terminal
npm run storybook &
npm run test-storybook
```

## Component Test Coverage

| Component | Unit Tests | RTL Tests | Keyboard Tests | Status |
|-----------|------------|-----------|----------------|--------|
| Button | ✅ | ✅ | ✅ | Complete |
| ButtonArrow | ✅ | ✅ | ✅ | Complete |
| Alert | ❌ | ❌ | ❌ | Pending |
| Avatar | ❌ | ❌ | ❌ | Pending |
| Badge | ❌ | ❌ | ❌ | Pending |
| Blockquote | ❌ | ❌ | ❌ | Pending |
| Callout | ❌ | ❌ | ❌ | Pending |
| Card | ❌ | ❌ | ❌ | Pending |
| Checkbox | ❌ | ❌ | ❌ | Pending |
| Dialog | ❌ | ❌ | ❌ | Pending |
| Dropdown Menu | ❌ | ❌ | ❌ | Pending |
| Input | ❌ | ❌ | ❌ | Pending |
| Label | ❌ | ❌ | ❌ | Pending |
| Progress | ❌ | ❌ | ❌ | Pending |
| Radio Group | ❌ | ❌ | ❌ | Pending |
| Select | ❌ | ❌ | ❌ | Pending |
| Separator | ❌ | ❌ | ❌ | Pending |
| Slider | ❌ | ❌ | ❌ | Pending |
| Switch | ❌ | ❌ | ❌ | Pending |
| Tabs | ❌ | ❌ | ❌ | Pending |
| Textarea | ❌ | ❌ | ❌ | Pending |
| Toast | ❌ | ❌ | ❌ | Pending |
| Tooltip | ❌ | ❌ | ❌ | Pending |

## Using the unit-test Agent

After restarting Claude Code, use the unit-test agent to generate tests:

```
Use the unit-test agent to create tests for the Input component
```

The agent will:
1. Read the component implementation
2. Read existing stories
3. Add play functions covering variants, interactions, RTL, and keyboard navigation

## WCAG 2.2 AA Accessibility Testing

Use the a11y-auditor agent for accessibility audits:

```
Use the a11y-auditor agent to audit the Button component
```

Or check via Storybook's Accessibility tab (uses axe-core).

---

*Last updated: January 2026*
