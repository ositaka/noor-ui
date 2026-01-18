# Getting Started with Agent-Driven Development

A practical, step-by-step guide to using Claude Code agents for Noor UI development.

---

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Tutorial 1: Create a Timeline Component (Phase 1)](#tutorial-1-create-a-timeline-component-phase-1)
3. [Tutorial 2: Add Visual Validation (Phase 2)](#tutorial-2-add-visual-validation-phase-2)
4. [Tutorial 3: Full Self-Correcting Loop (Phase 3)](#tutorial-3-full-self-correcting-loop-phase-3)
5. [Quick Reference](#quick-reference)
6. [Troubleshooting](#troubleshooting)

---

## Initial Setup

### One-Time Setup (5 minutes)

```bash
# 1. Install Playwright for screenshot capture
npm install -D @playwright/test
npx playwright install chromium

# 2. Make scripts executable
chmod +x .claude/scripts/*.ts

# 3. Verify Storybook works
npm run storybook
# Wait for "Storybook started" message, then Ctrl+C

# 4. Verify Playwright works
npx playwright --version
# Should show version number
```

### Verify Setup

```bash
# Quick test: capture screenshots of an existing component
npm run storybook &
sleep 10
npx vite-node .claude/scripts/visual-qa-loop.ts forms-switch
```

You should see screenshots captured in `.claude/screenshots/captured/forms-switch/`.

---

## Tutorial 1: Create a Timeline Component (Phase 1)

**Goal**: Create a new Timeline component using the component-creator and unit-test agents.

### Step 1.1: Start Claude Code

Open your terminal in the project directory and start Claude Code:

```bash
claude
```

### Step 1.2: Request Component Creation

**Copy and paste this prompt to Claude:**

```
Create a Timeline component for Noor UI.

Requirements:
- Vertical timeline with connected dots/nodes
- Each item has: title, description, timestamp, optional icon
- Support for "completed", "current", "upcoming" states
- RTL support (timeline should flip sides)
- Size variants: sm, default, lg

Follow the patterns in .claude/prompts/component-creator.md
```

**What Claude will do:**
1. Read the component-creator.md prompt
2. Search for similar components in the codebase
3. Create `/components/ui/timeline.tsx`
4. Add export to `/components/index.ts`

**Expected output:**
```
Created: /components/ui/timeline.tsx

Exports:
- Timeline (container)
- TimelineItem (individual item)
- timelineVariants

Features:
- Size variants: sm, default, lg
- Item states: completed, current, upcoming
- RTL support with logical properties
- Icons support with correct RTL rotation

Added to /components/index.ts
```

### Step 1.3: Generate Unit Tests

**Copy and paste this prompt to Claude:**

```
Now add unit tests for the Timeline component.

Create play functions in the Storybook stories using @storybook/test.
Follow the patterns in .claude/prompts/unit-test.md

Tests should cover:
1. Rendering all states (completed, current, upcoming)
2. RTL layout verification
3. Keyboard navigation between items
4. Size variants render correctly
```

**What Claude will do:**
1. Read the unit-test.md prompt
2. Create `/storybook/stories/data-display/Timeline.stories.tsx`
3. Add play functions for interaction testing

**Expected output:**
```
Created: /storybook/stories/data-display/Timeline.stories.tsx

Stories with play functions:
- Default (render test)
- AllStates (completed, current, upcoming)
- WithIcons (icon rendering)
- RTLLayout (RTL verification)
- KeyboardNavigation (tab through items)
- SizeVariants (sm, default, lg)

Run tests:
- Storybook: npm run storybook (view Interactions panel)
- Vitest: npm test -- timeline
```

### Step 1.4: Verify Everything Works

```bash
# Start Storybook and check your component
npm run storybook
```

Open http://localhost:6006 and navigate to "Data Display / Timeline".

You should see:
- All your stories in the sidebar
- Interaction tests in the "Interactions" panel
- Component renders correctly

### Phase 1 Complete!

You now have:
- ✅ Timeline component with RTL support
- ✅ Storybook stories
- ✅ Interactive tests via play functions

---

## Tutorial 2: Add Visual Validation (Phase 2)

**Goal**: Generate comprehensive stories and capture screenshots for visual validation.

### Step 2.1: Generate Comprehensive Stories

**Copy and paste this prompt to Claude:**

```
Expand the Timeline stories to cover all visual variants for screenshot testing.

Follow .claude/prompts/story-generator.md

I need stories for:
- All states in LTR (light + dark)
- All states in RTL (light + dark)
- Edge cases: empty timeline, single item, many items (10+)
- Long text overflow test
- With and without icons
```

**What Claude will do:**
1. Read the story-generator.md prompt
2. Add more stories to Timeline.stories.tsx
3. Include proper globals for direction/mode

**Expected output:**
```
Updated: /storybook/stories/data-display/Timeline.stories.tsx

New stories added:
| Story | Direction | Mode |
|-------|-----------|------|
| Default | ltr | light |
| DefaultRTL | rtl | light |
| DarkMode | ltr | dark |
| DarkModeRTL | rtl | dark |
| AllStates | ltr | light |
| AllStatesRTL | rtl | light |
| WithIcons | ltr | light |
| WithIconsRTL | rtl | light |
| LongContent | ltr | light |
| LongContentRTL | rtl | light |
| ManyItems | ltr | light |
| SingleItem | ltr | light |
| Empty | ltr | light |

Total: 13 stories × 4 variants = 52 screenshot combinations
```

### Step 2.2: Capture Screenshots

**In a separate terminal, ensure Storybook is running:**

```bash
npm run storybook
```

**Then run the screenshot capture:**

```bash
npx vite-node .claude/scripts/visual-qa-loop.ts data-display-timeline
```

**Expected output:**
```
📸 Screenshot Capture for: data-display-timeline
   Iteration: 1
   Directions: ltr, rtl
   Modes: light, dark

📚 Found 13 stories:
   - Default
   - DefaultRTL
   - DarkMode
   ...

🎯 Capturing 52 screenshots...

[1/52] ✓ Default (ltr-light)
[2/52] ✓ Default (ltr-dark)
[3/52] ✓ Default (rtl-light)
[4/52] ✓ Default (rtl-dark)
...

📊 Summary
   Total: 52
   Success: 52
   Failed: 0

📁 Output: .claude/screenshots/captured/data-display-timeline/iter-1/
```

### Step 2.3: Visual Analysis

**Copy and paste this prompt to Claude:**

```
Analyze the Timeline component screenshots I just captured.

Screenshots are in: .claude/screenshots/captured/data-display-timeline/iter-1/

Please:
1. Compare LTR vs RTL variants for proper mirroring
2. Check dark mode contrast
3. Look for text overflow issues
4. Verify icon directions

Follow .claude/prompts/visual-analysis.md
```

**What Claude will do:**
1. Read screenshots using the Read tool (vision)
2. Compare LTR vs RTL side by side
3. Check for issues
4. Report findings

**Example Claude response:**
```markdown
## Visual Analysis: Timeline Component

### Screenshots Analyzed: 52

### Issues Found:

**1. [CRITICAL] Timeline connector line on wrong side in RTL**
- Location: Between timeline items
- Expected: Connector line on right side in RTL
- Actual: Connector line stays on left side
- File: /components/ui/timeline.tsx line 45
- Fix: Change `left-4` to `start-4`

**2. [WARNING] Icon slightly misaligned in RTL**
- Location: Timeline item icons
- Expected: Icon centered on connector
- Actual: 2px offset to the left
- Fix: Change `ml-0.5` to `ms-0.5`

### Passed Checks:
- [x] Text alignment (starts from correct side)
- [x] Dark mode contrast
- [x] Long content handling
- [x] Timestamps visible

### Recommendation:
Apply fixes and re-capture screenshots.
```

### Step 2.4: Apply Fixes

**Copy and paste this prompt to Claude:**

```
Apply the fixes you identified for the Timeline component:
1. Change left-4 to start-4 for connector line
2. Change ml-0.5 to ms-0.5 for icon alignment

Then let me know when ready for re-capture.
```

**What Claude will do:**
1. Edit `/components/ui/timeline.tsx`
2. Apply the RTL fixes
3. Confirm changes

### Step 2.5: Re-capture and Verify

```bash
# Capture iteration 2
ITERATION=2 npx vite-node .claude/scripts/visual-qa-loop.ts data-display-timeline
```

**Then ask Claude:**

```
Re-analyze the Timeline screenshots from iteration 2.
Compare with iteration 1 to verify the fixes worked.

Screenshots: .claude/screenshots/captured/data-display-timeline/iter-2/
```

**Expected response:**
```markdown
## Visual Analysis: Timeline (Iteration 2)

### Comparison with Iteration 1:

| Issue | Iteration 1 | Iteration 2 |
|-------|-------------|-------------|
| Connector line position | FAIL | PASS ✓ |
| Icon alignment | FAIL | PASS ✓ |

### Result:
All issues resolved. Timeline component passes visual QA.

### Screenshots showing fix:
- Before: iter-1/rtl-light/Default.png
- After: iter-2/rtl-light/Default.png
```

### Phase 2 Complete!

You now have:
- ✅ Comprehensive stories for all variants
- ✅ Screenshot capture working
- ✅ Visual issues identified and fixed
- ✅ Before/after comparison

---

## Tutorial 3: Full Self-Correcting Loop (Phase 3)

**Goal**: Run the complete automated workflow from component creation to final approval.

### Step 3.1: Request Full Workflow

**Copy and paste this prompt to Claude:**

```
Create a new Stepper component with full visual QA.

Requirements:
- Horizontal step indicator (Step 1 → Step 2 → Step 3)
- States: completed (checkmark), current (highlighted), upcoming (dimmed)
- Clickable steps to navigate
- RTL support (steps go right-to-left)
- Connector lines between steps

Run the complete visual QA loop:
1. Create the component (follow .claude/prompts/component-creator.md)
2. Generate comprehensive stories (follow .claude/prompts/story-generator.md)
3. I'll capture screenshots, you analyze them
4. Fix any issues and request re-capture
5. Present final report for my approval

Let's start with step 1.
```

### Step 3.2: Claude Creates Component

Claude will create the component and stories, then say:

```
Component and stories created. Ready for screenshot capture.

Run this command:
npx vite-node .claude/scripts/visual-qa-loop.ts navigation-stepper
```

### Step 3.3: Capture Screenshots

```bash
npx vite-node .claude/scripts/visual-qa-loop.ts navigation-stepper
```

### Step 3.4: Tell Claude to Analyze

**Copy and paste:**

```
Screenshots captured. Please analyze them.

Location: .claude/screenshots/captured/navigation-stepper/iter-1/

Look for:
- Step order reversal in RTL
- Connector lines mirror correctly
- Checkmark icons visible
- Current step highlighted
```

### Step 3.5: Claude Reports and Fixes

Claude will analyze and either:

**A) Find issues → Apply fixes → Ask for re-capture:**
```
Found 2 issues:
1. [CRITICAL] Steps don't reverse in RTL - need flex-row-reverse rtl:flex-row
2. [WARNING] Connector uses left/right - need start/end

Fixes applied. Please re-capture:
ITERATION=2 npx vite-node .claude/scripts/visual-qa-loop.ts navigation-stepper
```

**B) No issues → Present final report:**
```
## Visual QA Complete: Stepper Component

### Summary
- Iterations: 1
- Issues Found: 0
- Status: PASSED

### Validation Coverage
- [x] LTR Light (6 stories)
- [x] LTR Dark (6 stories)
- [x] RTL Light (6 stories)
- [x] RTL Dark (6 stories)

### Final Screenshots
.claude/screenshots/captured/navigation-stepper/iter-1/

### Ready for your review.
Would you like to:
- [View screenshots] - I'll show specific ones
- [Approve] - Component is production-ready
- [Request changes] - Tell me what to modify
```

### Step 3.6: Your Review

Open the screenshots and review:

```bash
# On macOS
open .claude/screenshots/captured/navigation-stepper/iter-1/

# Or view specific screenshots
open .claude/screenshots/captured/navigation-stepper/iter-1/rtl-light/Default.png
```

**Then tell Claude:**

```
Looks good! The RTL layout is correct and all states are visible.
Approved for production.
```

### Phase 3 Complete!

You've completed the full self-correcting loop:
- ✅ Component created with RTL support
- ✅ Comprehensive stories generated
- ✅ Screenshots captured automatically
- ✅ Visual issues detected and fixed
- ✅ Final review with screenshot evidence

---

## Quick Reference

### Commands Cheat Sheet

```bash
# Start Storybook
npm run storybook

# Capture single component (default iteration)
npx vite-node .claude/scripts/visual-qa-loop.ts <component-id>

# Capture specific iteration
ITERATION=2 npx vite-node .claude/scripts/visual-qa-loop.ts <component-id>

# Capture all stories (slower)
npx playwright test .claude/scripts/screenshots/capture-stories.spec.ts

# View screenshots (macOS)
open .claude/screenshots/captured/<component-id>/

# Run unit tests
npm test -- <component-name>

# Check Storybook is running
curl -s http://localhost:6006/index.json | head -c 100
```

### Component ID Format

The component ID is derived from the story title:
- Story title: `Forms/Switch` → Component ID: `forms-switch`
- Story title: `Data Display/Timeline` → Component ID: `data-display-timeline`
- Story title: `Navigation/Stepper` → Component ID: `navigation-stepper`

### Common Prompts

**Create new component:**
```
Create a [ComponentName] component for Noor UI.

Requirements:
- [List requirements]
- RTL support
- Size variants: sm, default, lg

Follow .claude/prompts/component-creator.md
```

**Generate stories:**
```
Generate comprehensive Storybook stories for [ComponentName].
Include LTR/RTL, light/dark, all states and edge cases.
Follow .claude/prompts/story-generator.md
```

**Analyze screenshots:**
```
Analyze screenshots for [ComponentName].
Location: .claude/screenshots/captured/[component-id]/iter-[N]/
Follow .claude/prompts/visual-analysis.md
```

**Full workflow:**
```
Create [ComponentName] with full visual QA loop.
Follow the agents in .claude/prompts/visual-qa-loop.md
```

---

## Troubleshooting

### "Storybook is not running"

```bash
# Start Storybook
npm run storybook

# Wait for it to be ready (check this URL works)
curl http://localhost:6006/index.json
```

### "No stories found for component"

Check the component ID matches your story title:
```bash
# List all available stories
curl -s http://localhost:6006/index.json | npx json entries | head -20
```

### "Screenshots not capturing"

```bash
# Verify Playwright is installed
npx playwright --version

# Install browser if needed
npx playwright install chromium

# Try manual capture
npx playwright open http://localhost:6006
```

### "Claude can't read screenshots"

Make sure you give the full path:
```
Read: .claude/screenshots/captured/forms-switch/iter-1/ltr-light/Default.png
```

### "RTL issues not detected"

Ask Claude to compare side-by-side:
```
Compare these two screenshots:
1. .claude/screenshots/captured/X/iter-1/ltr-light/Default.png
2. .claude/screenshots/captured/X/iter-1/rtl-light/Default.png

The RTL version should be a mirror of LTR. What differences do you see?
```

---

## What's Next?

After completing these tutorials, you can:

1. **Create new components** using the agents for any UI need
2. **Run visual QA** on existing components to catch RTL issues
3. **Automate testing** by integrating screenshot comparison in CI
4. **Customize prompts** in `.claude/prompts/` for your specific needs

The goal is to have **80%+ of visual validation happen automatically**, so you only review final screenshots rather than checking every iteration manually.
