# Phase 2: Visual Validation Agents

## Overview

Phase 2 adds visual validation capabilities:
1. **Story Generator Agent** - Creates comprehensive stories with RTL/LTR, light/dark, all states
2. **Screenshot Capture Agent** - Playwright integration with Storybook
3. **Visual Analysis Agent** - Claude analyzes screenshots for RTL bugs, spacing, overflow

---

## Prerequisites

### Install Playwright Test for Storybook

```bash
npm install -D @playwright/test playwright
npx playwright install chromium
```

### Storybook Test Runner (Alternative)

Your project has `@storybook/addon-vitest`. For screenshot capture, we'll use Playwright directly against the Storybook server.

---

## Agent 3: Story Generator Agent

### Purpose
Generate comprehensive Storybook stories that cover all visual states needed for validation:
- Every variant
- LTR and RTL versions
- Light and dark modes
- Interactive states (hover, focus, active, disabled)
- Edge cases (long text, empty, loading)

### Agent Instructions (`.claude/prompts/story-generator.md`)

```markdown
# Story Generator Agent

## Your Role
Generate comprehensive Storybook stories that cover all visual states for a component.
Each story should be self-contained and testable via screenshot.

## Story File Location
`/storybook/stories/{category}/{ComponentName}.stories.tsx`

Categories:
- basic (Button, Badge, etc.)
- forms (Input, Switch, Select, etc.)
- navigation (Tabs, Breadcrumb, etc.)
- overlay (Dialog, Popover, etc.)
- feedback (Alert, Toast, etc.)
- data-display (Table, Card, etc.)
- gcc (GCC-specific components)
- ai (AI-related components)

## Story File Template

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import { Component } from '@/components/ui/component'

const meta: Meta<typeof Component> = {
  title: 'Category/Component',
  component: Component,
  parameters: {
    layout: 'centered',  // or 'fullscreen' or 'padded'
  },
  tags: ['!autodocs'],
  argTypes: {
    // Define controls
  },
}
export default meta

type Story = StoryObj<typeof Component>
```

## Required Story Variants

### 1. Default State (LTR)
```tsx
export const Default: Story = {
  args: { /* default props */ },
  globals: {
    direction: 'ltr',
    locale: 'en',
    mode: 'light',
    theme: 'minimal',
  },
}
```

### 2. Default State (RTL)
```tsx
export const DefaultRTL: Story = {
  args: { /* default props with Arabic text */ },
  globals: {
    direction: 'rtl',
    locale: 'ar',
    mode: 'light',
    theme: 'minimal',
  },
}
```

### 3. All Variants (LTR)
Create one story per variant:
```tsx
export const VariantSecondary: Story = {
  args: { variant: 'secondary' },
  globals: { direction: 'ltr', locale: 'en' },
}

export const VariantOutline: Story = {
  args: { variant: 'outline' },
  globals: { direction: 'ltr', locale: 'en' },
}
// etc.
```

### 4. All Sizes
```tsx
export const SizeSmall: Story = {
  args: { size: 'sm' },
}

export const SizeLarge: Story = {
  args: { size: 'lg' },
}
```

### 5. Dark Mode Variants
```tsx
export const DarkMode: Story = {
  args: { /* props */ },
  globals: {
    direction: 'ltr',
    locale: 'en',
    mode: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const DarkModeRTL: Story = {
  args: { /* Arabic props */ },
  globals: {
    direction: 'rtl',
    locale: 'ar',
    mode: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
```

### 6. Interactive States
```tsx
export const Hover: Story = {
  args: {},
  parameters: {
    pseudo: { hover: true },
  },
}

export const Focus: Story = {
  args: {},
  parameters: {
    pseudo: { focus: true },
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}
```

### 7. Edge Cases
```tsx
export const LongText: Story = {
  args: {
    children: 'This is a very long text that might overflow the container and cause layout issues',
  },
}

export const LongTextRTL: Story = {
  args: {
    children: 'هذا نص طويل جداً قد يتجاوز الحاوية ويسبب مشاكل في التخطيط والعرض',
  },
  globals: { direction: 'rtl', locale: 'ar' },
}

export const Empty: Story = {
  args: { children: '' },
}

export const Loading: Story = {
  args: { loading: true },
}
```

### 8. Composition Examples
For complex components, show real-world usage:
```tsx
export const WithinCard: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Component />
      </CardContent>
    </Card>
  ),
}
```

## Story Naming Convention

Use descriptive names that indicate what's being tested:
- `Default` - base state
- `DefaultRTL` - RTL version of default
- `Variant{Name}` - specific variant
- `Size{Name}` - specific size
- `DarkMode` - dark theme
- `DarkModeRTL` - dark theme + RTL
- `State{Name}` - interactive state (Hover, Focus, Disabled)
- `EdgeCase{Description}` - edge cases
- `WithinCard`, `InForm` - composition examples

## Arabic Text Guidelines

For RTL stories, use appropriate Arabic text:
- Short labels: Keep concise
- Button text: Action verbs (حفظ، إرسال، إلغاء)
- Descriptions: Use realistic content
- Numbers: Will auto-convert if using arabic-numbers utility

Common translations:
| English | Arabic |
|---------|--------|
| Submit | إرسال |
| Cancel | إلغاء |
| Save | حفظ |
| Delete | حذف |
| Edit | تعديل |
| Settings | الإعدادات |
| Notifications | الإشعارات |
| Enable | تفعيل |
| Disable | تعطيل |

## Output

Generate a complete story file with:
1. All variant stories
2. LTR and RTL versions
3. Light and dark modes
4. Interactive states
5. Edge cases

Report which stories were created for screenshot capture.
```

---

## Agent 4: Screenshot Capture Agent

### Purpose
Capture screenshots of all story variants using Playwright integrated with Storybook.

### Setup Files

#### 1. Playwright Configuration

Create `/playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './.claude/scripts/screenshots',
  outputDir: './.claude/screenshots/test-results',
  snapshotDir: './.claude/screenshots/snapshots',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run storybook -- --ci',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
```

#### 2. Screenshot Capture Script

Create `/.claude/scripts/screenshots/capture-stories.ts`:

```typescript
import { test } from '@playwright/test'
import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

// Configuration
const STORYBOOK_URL = 'http://localhost:6006'
const SCREENSHOT_DIR = '.claude/screenshots/captured'
const VIEWPORT_SIZES = {
  desktop: { width: 1280, height: 720 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
}

interface StoryInfo {
  id: string
  title: string
  name: string
  kind: string
}

// Get all stories from Storybook
async function getStories(): Promise<StoryInfo[]> {
  const response = await fetch(`${STORYBOOK_URL}/index.json`)
  const data = await response.json()
  return Object.values(data.entries) as StoryInfo[]
}

// Generate screenshot filename
function getScreenshotPath(story: StoryInfo, variant: string): string {
  const safeName = story.id.replace(/[^a-z0-9]/gi, '-')
  return path.join(SCREENSHOT_DIR, variant, `${safeName}.png`)
}

// Capture screenshots for all variants
test.describe('Screenshot Capture', () => {
  let stories: StoryInfo[] = []

  test.beforeAll(async () => {
    stories = await getStories()

    // Create directories
    for (const variant of ['ltr-light', 'ltr-dark', 'rtl-light', 'rtl-dark']) {
      fs.mkdirSync(path.join(SCREENSHOT_DIR, variant), { recursive: true })
    }
  })

  test('capture all story variants', async ({ page }) => {
    for (const story of stories) {
      // Skip non-component stories
      if (story.id.includes('--docs')) continue

      const variants = [
        { direction: 'ltr', mode: 'light', suffix: 'ltr-light' },
        { direction: 'ltr', mode: 'dark', suffix: 'ltr-dark' },
        { direction: 'rtl', mode: 'light', suffix: 'rtl-light' },
        { direction: 'rtl', mode: 'dark', suffix: 'rtl-dark' },
      ]

      for (const variant of variants) {
        const url = `${STORYBOOK_URL}/iframe.html?id=${story.id}&globals=direction:${variant.direction};mode:${variant.mode}&viewMode=story`

        await page.goto(url)
        await page.waitForLoadState('networkidle')

        // Wait for any animations
        await page.waitForTimeout(500)

        const screenshotPath = getScreenshotPath(story, variant.suffix)

        await page.screenshot({
          path: screenshotPath,
          fullPage: true,
        })

        console.log(`Captured: ${screenshotPath}`)
      }
    }
  })
})
```

#### 3. Single Component Capture Script

Create `/.claude/scripts/screenshots/capture-component.ts`:

```typescript
import { chromium, type Page } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

const STORYBOOK_URL = process.env.STORYBOOK_URL || 'http://localhost:6006'
const SCREENSHOT_DIR = '.claude/screenshots/captured'

interface CaptureOptions {
  componentId: string  // e.g., 'forms-switch'
  stories?: string[]   // specific stories, or all if empty
  variants?: {
    directions: ('ltr' | 'rtl')[]
    modes: ('light' | 'dark')[]
    themes: string[]
  }
}

async function captureComponent(options: CaptureOptions) {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  })
  const page = await context.newPage()

  // Get stories for this component
  const response = await fetch(`${STORYBOOK_URL}/index.json`)
  const data = await response.json()
  const allStories = Object.values(data.entries) as any[]

  const componentStories = allStories.filter(s =>
    s.id.startsWith(options.componentId) && !s.id.includes('--docs')
  )

  const directions = options.variants?.directions || ['ltr', 'rtl']
  const modes = options.variants?.modes || ['light', 'dark']
  const themes = options.variants?.themes || ['minimal']

  const captured: string[] = []

  for (const story of componentStories) {
    // Skip if specific stories requested and this isn't one
    if (options.stories?.length && !options.stories.includes(story.name)) {
      continue
    }

    for (const direction of directions) {
      for (const mode of modes) {
        for (const theme of themes) {
          const variantDir = `${direction}-${mode}${themes.length > 1 ? `-${theme}` : ''}`
          const outputDir = path.join(SCREENSHOT_DIR, options.componentId, variantDir)
          fs.mkdirSync(outputDir, { recursive: true })

          const url = `${STORYBOOK_URL}/iframe.html?id=${story.id}&globals=direction:${direction};mode:${mode};theme:${theme}&viewMode=story`

          await page.goto(url)
          await page.waitForLoadState('networkidle')
          await page.waitForTimeout(300)

          const filename = `${story.name}.png`
          const filepath = path.join(outputDir, filename)

          await page.screenshot({
            path: filepath,
            fullPage: true,
          })

          captured.push(filepath)
          console.log(`Captured: ${filepath}`)
        }
      }
    }
  }

  await browser.close()

  return captured
}

// CLI usage
const componentId = process.argv[2]
if (componentId) {
  captureComponent({ componentId })
    .then(files => console.log(`\nCaptured ${files.length} screenshots`))
    .catch(console.error)
}

export { captureComponent, type CaptureOptions }
```

### Agent Instructions (`.claude/prompts/screenshot-capture.md`)

```markdown
# Screenshot Capture Agent

## Your Role
Capture screenshots of Storybook stories for visual validation.

## Prerequisites
1. Storybook must be running: `npm run storybook`
2. Playwright must be installed: `npx playwright install chromium`

## Capture Commands

### Capture All Stories
```bash
npx playwright test .claude/scripts/screenshots/capture-stories.ts
```

### Capture Single Component
```bash
npx vite-node .claude/scripts/screenshots/capture-component.ts forms-switch
```

### Capture with Options
```typescript
import { captureComponent } from './.claude/scripts/screenshots/capture-component'

await captureComponent({
  componentId: 'forms-switch',
  stories: ['Default', 'RTLExample', 'SettingsPanel'],
  variants: {
    directions: ['ltr', 'rtl'],
    modes: ['light', 'dark'],
    themes: ['minimal'],
  },
})
```

## Screenshot Organization

Screenshots are saved to:
```
.claude/screenshots/captured/
├── {component-id}/
│   ├── ltr-light/
│   │   ├── Default.png
│   │   ├── WithLabel.png
│   │   └── ...
│   ├── ltr-dark/
│   ├── rtl-light/
│   └── rtl-dark/
```

## After Capturing

Report:
1. Number of screenshots captured
2. File paths for visual analysis
3. Any stories that failed to capture

Pass screenshot paths to Visual Analysis Agent.
```

---

## Agent 5: Visual Analysis Agent

### Purpose
Analyze screenshots using Claude's vision capabilities to detect:
- RTL layout issues
- Spacing and alignment problems
- Text overflow
- Icon direction errors
- Dark mode contrast issues

### Agent Instructions (`.claude/prompts/visual-analysis.md`)

```markdown
# Visual Analysis Agent

## Your Role
Analyze component screenshots to detect visual issues, especially RTL-related bugs.

## How to Analyze Screenshots

When given screenshot paths, use the Read tool to view them:

```
Read the screenshot at: .claude/screenshots/captured/forms-switch/ltr-light/Default.png
```

## Visual Validation Checklist

### 1. RTL Mirroring (Compare LTR vs RTL)

**Check for:**
- [ ] Layout is mirrored (start/end positions swapped)
- [ ] Icons point correct direction (arrows reversed)
- [ ] Text aligns to correct side (start)
- [ ] Spacing is mirrored (margins/paddings)
- [ ] Scroll direction is correct
- [ ] Progress indicators fill from correct side

**Common RTL Bugs:**
- Chevron icons not rotated (should point left in RTL)
- Close button still on right (should be on left in RTL)
- Text truncation ellipsis on wrong side
- Absolute positioned elements not mirrored
- Shadows on wrong side

### 2. Text Overflow

**Check for:**
- [ ] No horizontal scrollbar
- [ ] Text truncates with ellipsis if needed
- [ ] No text clipping mid-character
- [ ] Long words wrap or truncate properly
- [ ] Arabic text wraps at correct breakpoints

### 3. Alignment Issues

**Check for:**
- [ ] Vertical alignment of inline elements
- [ ] Consistent spacing between elements
- [ ] Icons vertically centered with text
- [ ] Form labels aligned with inputs
- [ ] Button text centered

### 4. Dark Mode

**Check for:**
- [ ] Sufficient contrast (text readable)
- [ ] No invisible elements (same as background)
- [ ] Hover/focus states visible
- [ ] Borders visible if needed
- [ ] Icons visible (not lost in dark)

### 5. Component-Specific Checks

**Buttons:**
- Icon position (start/end) mirrors in RTL
- Loading spinner centered
- Disabled state visually distinct

**Inputs:**
- Placeholder aligns with direction
- Prefix/suffix positions mirror
- Error message appears correctly
- Focus ring visible

**Dropdowns/Selects:**
- Dropdown opens to correct side
- Chevron points correct direction
- Selected item indicator on correct side

**Dialogs/Modals:**
- Close button position mirrors
- Content layout mirrors
- Buttons order mirrors (Cancel/Submit)

**Tables:**
- Columns mirror order in RTL
- Sort indicators mirror
- Alignment consistent

**Navigation:**
- Arrow/chevron icons mirror
- Breadcrumb separator direction
- Menu items align correctly

## Analysis Output Format

When analyzing, output:

```markdown
## Visual Analysis: {Component Name}

### Screenshot: {path}

#### Issues Found:
1. **[CRITICAL]** {issue description}
   - Location: {where in component}
   - Expected: {what should happen}
   - Actual: {what's wrong}

2. **[WARNING]** {issue description}
   ...

#### Passed Checks:
- RTL mirroring: ✓
- Text alignment: ✓
- Spacing: ✓
- ...

### Recommendation:
{What to fix and how}
```

## Severity Levels

- **CRITICAL**: Broken functionality or major visual bug (text unreadable, layout broken)
- **WARNING**: Minor visual issue (slight misalignment, inconsistent spacing)
- **INFO**: Suggestion for improvement (not a bug)

## Comparison Analysis

When comparing LTR vs RTL screenshots:

1. Open both images
2. Check each element's position is mirrored
3. Look for elements that stayed in same position (likely bug)
4. Verify icon directions
5. Check text alignment

## Example Analysis

```markdown
## Visual Analysis: Switch Component

### Screenshot: .claude/screenshots/captured/forms-switch/rtl-light/SettingsPanel.png

#### Issues Found:
1. **[CRITICAL]** Switch thumb animation direction incorrect
   - Location: Switch toggle
   - Expected: Thumb should move left-to-right when turning ON in RTL
   - Actual: Thumb moves right-to-left (same as LTR)

2. **[WARNING]** Description text slightly misaligned
   - Location: Below switch label
   - Expected: Text should start from right edge
   - Actual: Small gap on right side (~4px)

#### Passed Checks:
- Layout mirroring: ✓ (labels on right)
- Switch position: ✓ (on left side)
- Dark mode contrast: ✓
- Text overflow: ✓

### Recommendation:
1. Add `rtl:data-[state=checked]:translate-x-[-100%]` to switch thumb
2. Check padding on description text container
```

## Batch Analysis

For analyzing multiple screenshots:

1. Group by component
2. Compare LTR-light vs RTL-light first
3. Then check dark mode variants
4. Output summary of all issues

Pass findings to Phase 3 for automated fixes.
```

---

## Integration: Screenshot → Analysis Flow

```
┌─────────────────────┐
│ Story Generator     │
│ Creates stories     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Screenshot Capture  │
│ Captures variants   │
│ - LTR/RTL           │
│ - Light/Dark        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Visual Analysis     │
│ Analyzes images     │
│ - RTL issues        │
│ - Overflow          │
│ - Alignment         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Issues Report       │
│ Ready for Phase 3   │
└─────────────────────┘
```

---

## Quick Reference Commands

```bash
# Start Storybook
npm run storybook

# Capture all screenshots
npx playwright test .claude/scripts/screenshots/capture-stories.ts

# Capture single component
npx vite-node .claude/scripts/screenshots/capture-component.ts forms-switch

# View screenshots
open .claude/screenshots/captured/
```

---

## Next Steps

With screenshots captured and analyzed:
1. Phase 3 creates the self-correcting loop
2. Issues found → automatic fixes → re-capture → re-analyze
3. Loop until no issues or max iterations
