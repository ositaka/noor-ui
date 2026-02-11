# Storybook Unit Testing Guide

## Overview

Noor UI uses Storybook play functions for portable unit tests that run in:
1. **Storybook UI** - Interactive testing via the Interactions panel
2. **CLI** - Headless testing via `npm run test-storybook`
3. **Vitest** - Traditional test runner integration

## Import Pattern (Storybook 8.5+)

```tsx
// Storybook 8.5+ uses 'storybook/test' NOT '@storybook/test'
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
// Don't test CSS class names — that's implementation detail
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
```

## Running Tests

### In Storybook UI
```bash
npm run storybook
# Open http://localhost:6006
# Navigate to any story
# Click "Interactions" tab at bottom
```

### Via CLI (Vitest + Playwright)

Tests are configured to run via Vitest with browser-based Playwright execution:

```bash
# Run all Storybook play-function tests
npx vitest run --project=storybook

# Run specific story file
npx vitest run --project=storybook storybook/stories/ai/ChatMessage.stories.tsx

# Run with verbose output to see failures
npx vitest run --project=storybook --reporter=verbose

# Run in watch mode (interactive)
npx vitest --project=storybook
```

### Configuration

The Vitest configuration in `vitest.config.ts` includes a `storybook` project that uses:
- `@storybook/addon-vitest/vitest-plugin` for story discovery
- Playwright browser provider (`chromium`, headless)
- Custom setup file at `storybook/.storybook/vitest.setup.ts`

### Legacy Test Runner
```bash
# Alternative: Requires Storybook running in another terminal
npm run storybook &
npm run test-storybook
```

## Component Test Coverage

### Basic Components

| Component | Unit Tests | RTL Tests | Status |
|-----------|------------|-----------|--------|
| Button | ✅ | ✅ | Complete |
| ButtonArrow | ✅ | ✅ | Complete |
| Alert | ✅ | ✅ | Complete |
| Avatar | ✅ | ✅ | Complete |
| Badge | ✅ | ✅ | Complete |
| Blockquote | ✅ | ✅ | Complete |
| Callout | ✅ | ✅ | Complete |
| Card | ✅ | ✅ | Complete |
| Checkbox | ✅ | ✅ | Complete |
| Dialog | ✅ | ✅ | Complete |
| Dropdown Menu | ✅ | ✅ | Complete |
| Input | ✅ | ✅ | Complete |
| Label | ✅ | ✅ | Complete |
| Progress | ✅ | ✅ | Complete |
| Radio Group | ✅ | ✅ | Complete |
| Select | ✅ | ✅ | Complete |
| Slider | ✅ | ✅ | Complete |
| Switch | ✅ | ✅ | Complete |
| Tabs | ✅ | ✅ | Complete |
| Textarea | ✅ | ✅ | Complete |
| Toast | ✅ | ✅ | Complete |
| Tooltip | ✅ | ✅ | Complete |
| Popover | ✅ | ✅ | Complete |
| Sheet | ✅ | ✅ | Complete |

### AI Components

| Component | Unit Tests | RTL Tests | Status |
|-----------|------------|-----------|--------|
| ChatMessage | ✅ | ✅ | Complete |
| ConversationHistory | ✅ | ✅ | Complete |
| MessageActions | ✅ | ✅ | Complete |
| ModelSelector | ✅ | ✅ | Complete |
| ParameterSlider | ✅ | ✅ | Complete |
| PromptInput | ✅ | ✅ | Complete |
| StreamingText | ✅ | ✅ | Complete |
| ThinkingIndicator | ✅ | ✅ | Complete |
| TokenCounter | ✅ | ✅ | Complete |
| WorkflowCanvas | ⏭️ | ⏭️ | Skipped (ReactFlow) |
| WorkflowNode | ⏭️ | ⏭️ | Skipped (ReactFlow) |
| WorkflowNodes | ⏭️ | ⏭️ | Skipped (ReactFlow) |

### GCC Components

| Component | Unit Tests | RTL Tests | Status |
|-----------|------------|-----------|--------|
| ArabicNumber | ✅ | ✅ | Complete |
| HijriDate | ✅ | ✅ | Complete |
| PrayerTimes | ✅ | ✅ | Complete |
| ZakatCalculator | ✅ | ✅ | Complete |

### Skipped Components

Some components are tagged with `!test` and skipped from Vitest:

- **WorkflowCanvas/Node/Nodes** - Require ReactFlow's zustand provider context which isn't available outside ReactFlow wrapper

## Using the unit-test Agent

After restarting Claude Code, use the unit-test agent to generate tests:

```
Use the unit-test agent to create tests for the Input component
```

The agent will:
1. Read the component implementation
2. Read existing stories
3. Add play functions to **every story EXCEPT `All*` stories** (AllVariants, AllSizes, etc.)
4. Test depth varies: Default = thorough, variants/RTL = basic, keyboard = full

## WCAG 2.2 AA Accessibility Testing

Use the a11y-auditor agent for accessibility audits:

```
Use the a11y-auditor agent to audit the Button component
```

Or check via Storybook's Accessibility tab (uses axe-core).

---

*Last updated: February 2026*
