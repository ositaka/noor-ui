# Phase 3: Self-Correcting Loop Workflow

## Overview

Phase 3 brings everything together into an automated workflow where Claude:
1. Creates component → generates stories → captures screenshots
2. Analyzes screenshots for visual issues
3. Automatically fixes detected issues
4. Re-captures and re-analyzes
5. Presents final result with screenshot evidence for human review

**Goal**: 80%+ of visual validation happens automatically. You review final screenshots, not every iteration.

---

## The Self-Correcting Loop

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTOMATED LOOP                            │
│                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐              │
│  │ Create/  │───▶│ Generate │───▶│ Capture  │              │
│  │ Modify   │    │ Stories  │    │ Screenshots│             │
│  │ Component│    │          │    │           │              │
│  └──────────┘    └──────────┘    └──────────┘              │
│        ▲                               │                     │
│        │                               ▼                     │
│        │                        ┌──────────┐                │
│        │         Issues         │ Analyze  │                │
│        │◀────────Found──────────│ Visually │                │
│        │                        │          │                │
│        │                        └──────────┘                │
│        │                               │                     │
│        │                          No Issues                  │
│        │                               │                     │
└────────│───────────────────────────────│─────────────────────┘
         │                               │
         │                               ▼
         │                      ┌──────────────┐
         │                      │ HUMAN REVIEW │
         └──────────────────────│ Final Result │
                                └──────────────┘
```

---

## Master Workflow Agent

### Configuration

Add to `.claude/settings.json`:

```json
{
  "agents": {
    "visual-qa-loop": {
      "description": "Self-correcting visual QA loop for component development",
      "instructions": "See .claude/prompts/visual-qa-loop.md"
    }
  }
}
```

### Agent Instructions (`.claude/prompts/visual-qa-loop.md`)

```markdown
# Visual QA Loop Agent

## Your Role
Orchestrate the full component development cycle with automated visual validation.
You coordinate between creating, testing, capturing, analyzing, and fixing.

## Workflow Steps

### Step 1: Component Creation/Modification
- Use Component Creator patterns from Phase 1
- Ensure RTL-first design with logical properties
- Export from /components/index.ts

### Step 2: Story Generation
- Generate comprehensive stories (Phase 2)
- Include all variants: LTR/RTL, light/dark, states
- Ensure edge cases (long text, empty, loading)

### Step 3: Screenshot Capture
- Start Storybook if not running
- Capture all story variants
- Save to .claude/screenshots/captured/{component}/

### Step 4: Visual Analysis
- Analyze each screenshot
- Compare LTR vs RTL for mirroring issues
- Check dark mode contrast
- Document all issues found

### Step 5: Decision Point
IF issues found:
  - Categorize issues by severity
  - Fix issues in component code
  - Increment iteration counter
  - IF iterations < MAX_ITERATIONS (3):
    - Go to Step 3 (re-capture)
  - ELSE:
    - Report remaining issues for human review

IF no issues:
  - Proceed to Step 6

### Step 6: Human Review Package
- Generate summary report
- Include before/after screenshots (if fixes made)
- List what was validated
- Present for human approval

## Issue Categories & Auto-Fix Patterns

### RTL Issues (Auto-fixable)

**1. Icon Direction**
Issue: Chevron/arrow icons not mirrored
Fix: Add `rtl:rotate-180` or `rtl:scale-x-[-1]` class

```tsx
// Before
<ChevronRight className="h-4 w-4" />

// After
<ChevronRight className="h-4 w-4 rtl:rotate-180" />
```

**2. Margin/Padding Direction**
Issue: Using ml/mr instead of ms/me
Fix: Replace with logical properties

```tsx
// Before
className="ml-2 mr-4"

// After
className="ms-2 me-4"
```

**3. Position Direction**
Issue: Using left/right instead of start/end
Fix: Replace with logical properties

```tsx
// Before
className="left-0 right-4"

// After
className="start-0 end-4"
```

**4. Text Alignment**
Issue: Using text-left/text-right
Fix: Replace with logical properties

```tsx
// Before
className="text-left"

// After
className="text-start"
```

### Spacing Issues (Auto-fixable)

**5. Inconsistent Gap**
Issue: Different gaps between similar elements
Fix: Normalize to consistent value

**6. Missing Padding**
Issue: Content touching container edge
Fix: Add appropriate padding

### Overflow Issues (Auto-fixable)

**7. Text Overflow**
Issue: Text exceeding container
Fix: Add truncate or text-wrap classes

```tsx
// Fix truncation
className="truncate"

// Or word break
className="break-words"
```

### Dark Mode Issues (Auto-fixable)

**8. Low Contrast**
Issue: Text hard to read in dark mode
Fix: Use foreground color variables

```tsx
// Before
className="text-gray-600"

// After
className="text-muted-foreground"
```

### Issues Requiring Human Review

- Layout redesign needed
- Missing functionality
- Ambiguous design intent
- Breaking changes to API
- Complex animation issues

## Iteration Tracking

Maintain state during loop:

```typescript
interface IterationState {
  iteration: number
  maxIterations: number
  component: string
  issuesFound: Issue[]
  issuesFixed: Issue[]
  issuesRemaining: Issue[]
  screenshots: {
    path: string
    variant: string
    iteration: number
  }[]
}
```

## Output Format

After each iteration:

```markdown
## Iteration {N} Summary

### Component: {name}
### Status: {ISSUES_FOUND | FIXES_APPLIED | COMPLETE}

### Issues Detected:
| # | Severity | Description | Status |
|---|----------|-------------|--------|
| 1 | CRITICAL | Icon not mirrored | FIXED |
| 2 | WARNING  | Spacing inconsistent | FIXED |
| 3 | INFO     | Could add hover state | DEFERRED |

### Fixes Applied:
1. Added rtl:rotate-180 to chevron icon
2. Changed ml-2 to ms-2 in button component

### Screenshots:
- Before: .claude/screenshots/captured/{component}/iter-{N-1}/
- After: .claude/screenshots/captured/{component}/iter-{N}/

### Next Action:
{Re-capturing for validation | Ready for human review}
```

## Final Report Format

```markdown
# Visual QA Complete: {Component Name}

## Summary
- Iterations: {N}
- Issues Found: {total}
- Auto-Fixed: {count}
- Needs Review: {count}

## Validation Coverage
- [x] LTR Light Mode
- [x] LTR Dark Mode
- [x] RTL Light Mode
- [x] RTL Dark Mode
- [x] All Variants
- [x] Interactive States
- [x] Edge Cases

## Screenshots for Review

### LTR Light
![Default](.claude/screenshots/captured/{component}/ltr-light/Default.png)

### RTL Light
![Default RTL](.claude/screenshots/captured/{component}/rtl-light/Default.png)

### Dark Mode
![Dark](.claude/screenshots/captured/{component}/ltr-dark/Default.png)

## Remaining Issues (Need Human Decision)
{list any issues that couldn't be auto-fixed}

## Changes Made
{diff or summary of all code changes}

---
**Ready for your review. Approve or request changes.**
```
```

---

## Orchestration Script

Create `/.claude/scripts/visual-qa-loop.ts`:

```typescript
#!/usr/bin/env npx vite-node

/**
 * Visual QA Loop Orchestrator
 *
 * Usage: npx vite-node .claude/scripts/visual-qa-loop.ts <component-name>
 *
 * This script coordinates the visual QA loop:
 * 1. Ensure Storybook is running
 * 2. Capture screenshots
 * 3. Output paths for Claude to analyze
 * 4. Support iteration tracking
 */

import { execSync, spawn } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

const STORYBOOK_URL = 'http://localhost:6006'
const SCREENSHOT_DIR = '.claude/screenshots/captured'
const MAX_ITERATIONS = 3

interface LoopState {
  component: string
  iteration: number
  screenshots: string[]
  startTime: Date
}

async function checkStorybookRunning(): Promise<boolean> {
  try {
    const response = await fetch(`${STORYBOOK_URL}/index.json`)
    return response.ok
  } catch {
    return false
  }
}

async function startStorybook(): Promise<void> {
  console.log('Starting Storybook...')
  const storybook = spawn('npm', ['run', 'storybook', '--', '--ci'], {
    detached: true,
    stdio: 'ignore',
  })
  storybook.unref()

  // Wait for Storybook to be ready
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 2000))
    if (await checkStorybookRunning()) {
      console.log('Storybook is ready')
      return
    }
  }
  throw new Error('Storybook failed to start')
}

async function captureScreenshots(
  componentId: string,
  iteration: number
): Promise<string[]> {
  const iterDir = path.join(SCREENSHOT_DIR, componentId, `iter-${iteration}`)
  fs.mkdirSync(iterDir, { recursive: true })

  // Get stories for component
  const response = await fetch(`${STORYBOOK_URL}/index.json`)
  const data = await response.json()
  const stories = Object.values(data.entries as Record<string, any>).filter(
    (s: any) => s.id.startsWith(componentId) && !s.id.includes('--docs')
  )

  const captured: string[] = []
  const { chromium } = await import('@playwright/test')
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  })
  const page = await context.newPage()

  const variants = [
    { direction: 'ltr', mode: 'light' },
    { direction: 'ltr', mode: 'dark' },
    { direction: 'rtl', mode: 'light' },
    { direction: 'rtl', mode: 'dark' },
  ]

  for (const story of stories) {
    for (const variant of variants) {
      const variantDir = path.join(iterDir, `${variant.direction}-${variant.mode}`)
      fs.mkdirSync(variantDir, { recursive: true })

      const url = `${STORYBOOK_URL}/iframe.html?id=${(story as any).id}&globals=direction:${variant.direction};mode:${variant.mode}&viewMode=story`

      await page.goto(url)
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(300)

      const filepath = path.join(variantDir, `${(story as any).name}.png`)
      await page.screenshot({ path: filepath, fullPage: true })
      captured.push(filepath)
    }
  }

  await browser.close()
  return captured
}

function generateAnalysisPrompt(screenshots: string[], iteration: number): string {
  return `
## Visual Analysis Required - Iteration ${iteration}

Please analyze the following screenshots for visual issues:

### Screenshots to Analyze:
${screenshots.map(s => `- ${s}`).join('\n')}

### Analysis Checklist:
1. Compare LTR vs RTL variants for proper mirroring
2. Check dark mode variants for contrast issues
3. Look for text overflow or clipping
4. Verify icon directions
5. Check spacing consistency

### Output Required:
- List all issues found with severity (CRITICAL/WARNING/INFO)
- For each issue, provide the fix if auto-fixable
- Indicate if human review is needed

After analysis, either:
- Apply fixes and request re-capture (iteration ${iteration + 1})
- Report ready for human review if no issues or max iterations reached
`
}

async function main() {
  const componentId = process.argv[2]

  if (!componentId) {
    console.error('Usage: npx vite-node .claude/scripts/visual-qa-loop.ts <component-id>')
    console.error('Example: npx vite-node .claude/scripts/visual-qa-loop.ts forms-switch')
    process.exit(1)
  }

  // Ensure Storybook is running
  if (!(await checkStorybookRunning())) {
    await startStorybook()
  }

  // Initialize state
  const state: LoopState = {
    component: componentId,
    iteration: 1,
    screenshots: [],
    startTime: new Date(),
  }

  // Capture initial screenshots
  console.log(`\nCapturing screenshots for ${componentId} (iteration ${state.iteration})...`)
  state.screenshots = await captureScreenshots(componentId, state.iteration)

  console.log(`\nCaptured ${state.screenshots.length} screenshots`)
  console.log('\n' + '='.repeat(60))
  console.log(generateAnalysisPrompt(state.screenshots, state.iteration))
  console.log('='.repeat(60))

  // Save state for continuation
  const stateFile = path.join(SCREENSHOT_DIR, componentId, 'loop-state.json')
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2))
  console.log(`\nState saved to: ${stateFile}`)
}

main().catch(console.error)
```

---

## Visual Validation Checklist

### What Agents Should Validate

```markdown
# Visual Validation Checklist

## RTL Layout (Critical)
- [ ] Overall layout mirrors correctly
- [ ] Navigation items in correct order
- [ ] Form labels on correct side of inputs
- [ ] Button groups order reversed
- [ ] Icon positions mirror (start/end swap)

## Icon Direction (Critical)
- [ ] Chevrons point correct direction (right in LTR, left in RTL)
- [ ] Arrow icons mirror appropriately
- [ ] Back/forward navigation icons correct
- [ ] Sort indicator icons correct
- [ ] Expand/collapse icons work both directions

## Text & Content (High)
- [ ] Text aligns to start (right in RTL)
- [ ] No text overflow or clipping
- [ ] Ellipsis appears on correct end
- [ ] Long words wrap properly
- [ ] Number alignment correct
- [ ] Currency/date formats appropriate

## Spacing (Medium)
- [ ] Margins mirror correctly (ms/me not ml/mr)
- [ ] Padding mirrors correctly (ps/pe not pl/pr)
- [ ] Gap spacing consistent
- [ ] No content touching edges

## Interactive States (Medium)
- [ ] Hover states visible
- [ ] Focus rings visible and correct
- [ ] Active/pressed states work
- [ ] Disabled states clear
- [ ] Loading states display correctly

## Dark Mode (Medium)
- [ ] Text has sufficient contrast
- [ ] Borders visible when needed
- [ ] Icons visible (not lost)
- [ ] Interactive states distinguishable
- [ ] No color banding or artifacts

## Animations (Low)
- [ ] Slide animations direction correct
- [ ] Progress fill direction correct
- [ ] Transitions smooth
- [ ] No layout shift during animation

## Edge Cases (Low)
- [ ] Empty state displays correctly
- [ ] Error state visible
- [ ] Very long content handled
- [ ] Single character content aligned
- [ ] Many items don't break layout
```

---

## Human Review Interface

When the loop completes, Claude presents:

```markdown
# Visual QA Complete: Button Component

## Quick Summary
✅ 3 iterations completed
✅ 5 issues auto-fixed
⚠️ 1 item needs your decision

## Before/After Comparison

### RTL Layout Fix
| Before | After |
|--------|-------|
| ![Before](iter-1/rtl-light/Default.png) | ![After](iter-3/rtl-light/Default.png) |

Icon was pointing wrong direction → Now correctly mirrored

### Dark Mode Contrast Fix
| Before | After |
|--------|-------|
| ![Before](iter-1/ltr-dark/Ghost.png) | ![After](iter-3/ltr-dark/Ghost.png) |

Text was too light → Now uses muted-foreground

## All Validated Screenshots

<details>
<summary>LTR Light Mode (12 screenshots)</summary>

- Default: ✅
- Secondary: ✅
- Outline: ✅
...
</details>

<details>
<summary>RTL Light Mode (12 screenshots)</summary>

- Default: ✅
- Secondary: ✅
...
</details>

## Needs Your Decision

### Loading State Animation
The loading spinner rotates clockwise in both LTR and RTL.
Should it rotate counter-clockwise in RTL?

Options:
1. Keep as-is (clockwise in both)
2. Mirror rotation in RTL
3. Use different spinner for RTL

---

**[Approve]** **[Request Changes]** **[View All Screenshots]**
```

---

## Usage Example

### Full Session

```
User: Create a new ProgressBar component with percentage display

Claude: I'll create the ProgressBar component with full visual QA.

[Component Creator]
Creating /components/ui/progress-bar.tsx...
- Size variants (sm, default, lg)
- Color variants (default, success, warning, error)
- Percentage display option
- RTL support with logical properties
- Animated fill

[Story Generator]
Creating /storybook/stories/feedback/ProgressBar.stories.tsx...
- 8 LTR stories (variants, sizes, states)
- 8 RTL stories
- Dark mode variants
- Edge cases (0%, 50%, 100%, overflow)

[Screenshot Capture - Iteration 1]
Capturing 32 screenshots...

[Visual Analysis - Iteration 1]
Issues found:
1. CRITICAL: Progress fill goes left-to-right in RTL (should be right-to-left)
2. WARNING: Percentage text slightly misaligned at 100%

[Auto-Fix Applied]
1. Added `rtl:scale-x-[-1]` to progress container with `rtl:text-right` to percentage
2. Adjusted percentage positioning

[Screenshot Capture - Iteration 2]
Re-capturing 32 screenshots...

[Visual Analysis - Iteration 2]
✅ No issues found

[Final Report]
# Visual QA Complete: ProgressBar

## Summary
- Iterations: 2
- Issues Found: 2
- Auto-Fixed: 2
- Needs Review: 0

## Screenshots for Review
[Grid of final screenshots]

## Changes Made
```diff
- <div className="h-full bg-primary transition-all" style={{ width: `${value}%` }} />
+ <div className="h-full bg-primary transition-all rtl:scale-x-[-1]" style={{ width: `${value}%` }} />
```

Ready for your review!
```

---

## Configuration Summary

### Files to Create

```
.claude/
├── settings.json           # Agent configurations
├── agents/
│   ├── 01-phase1-foundation.md
│   ├── 02-phase2-visual-validation.md
│   └── 03-phase3-self-correcting-loop.md
├── prompts/
│   ├── component-creator.md
│   ├── unit-test.md
│   ├── story-generator.md
│   ├── screenshot-capture.md
│   ├── visual-analysis.md
│   └── visual-qa-loop.md
├── scripts/
│   ├── screenshots/
│   │   ├── capture-stories.ts
│   │   └── capture-component.ts
│   └── visual-qa-loop.ts
└── screenshots/
    └── captured/
        └── {component}/
            └── iter-{n}/
                ├── ltr-light/
                ├── ltr-dark/
                ├── rtl-light/
                └── rtl-dark/
```

### Package.json Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "visual-qa": "npx vite-node .claude/scripts/visual-qa-loop.ts",
    "capture:all": "npx playwright test .claude/scripts/screenshots/capture-stories.ts",
    "capture:component": "npx vite-node .claude/scripts/screenshots/capture-component.ts"
  }
}
```

---

## Next Steps

1. Copy the configuration files from this guide
2. Install Playwright: `npm install -D @playwright/test && npx playwright install chromium`
3. Test with an existing component: `npm run visual-qa forms-switch`
4. Review the output and iterate on the prompts
5. Expand to new component creation
