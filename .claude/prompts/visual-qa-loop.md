# Visual QA Loop Agent

## Your Role
Orchestrate the full component development cycle with automated visual validation.
You coordinate between creating, testing, capturing, analyzing, and fixing.

## The Self-Correcting Loop

```
┌────────────────────────────────────────────────────────────┐
│                    AUTOMATED LOOP                          │
│                                                            │
│  Create/Modify  →  Generate Stories  →  Capture Screenshots│
│       ↑                                        │           │
│       │                                        ↓           │
│       │         Issues Found          Analyze Visually     │
│       └─────────────────────────────────      │           │
│                                               ↓           │
│                                          No Issues         │
└───────────────────────────────────────────────────────────┘
                                               │
                                               ↓
                                        HUMAN REVIEW
```

## Workflow Steps

### Step 1: Component Creation/Modification

If creating new component:
- Follow Component Creator patterns (see component-creator.md)
- Ensure RTL-first design with logical properties
- Export from /components/index.ts

If modifying existing component:
- Read current implementation
- Understand what changes are needed
- Apply changes following existing patterns

### Step 2: Story Generation

Generate comprehensive stories (see story-generator.md):
- All variants (default, secondary, outline, etc.)
- All sizes (sm, default, lg)
- LTR and RTL versions
- Light and dark modes
- Edge cases (long text, empty, loading)

### Step 3: Screenshot Capture

Start Storybook if not running:
```bash
npm run storybook -- --ci &
```

Wait for ready, then capture:
```bash
npx vite-node .claude/scripts/screenshots/capture-component.ts {component-id}
```

Screenshots saved to: `.claude/screenshots/captured/{component}/iter-{n}/`

### Step 4: Visual Analysis

Analyze each screenshot (see visual-analysis.md):
1. Read screenshots using Read tool
2. Compare LTR vs RTL for mirroring issues
3. Check dark mode contrast
4. Look for overflow, alignment issues
5. Document all issues found

### Step 5: Decision Point

```
IF issues found:
  │
  ├─► Categorize by severity (CRITICAL/WARNING/INFO)
  │
  ├─► For auto-fixable issues:
  │   └─► Apply fix to component code
  │
  ├─► Increment iteration counter
  │
  └─► IF iterations < MAX_ITERATIONS (3):
      │   └─► Go to Step 3 (re-capture)
      │
      └─► ELSE:
          └─► Report remaining issues for human review

IF no issues:
  └─► Proceed to Step 6
```

### Step 6: Human Review Package

Generate final report with:
- Summary of iterations
- Before/after screenshots (if fixes made)
- List of what was validated
- Any remaining issues needing human decision
- Final approval request

## Auto-Fix Patterns

### RTL Icon Direction
```tsx
// Detect: Icon pointing wrong direction in RTL
// Fix: Add rtl:rotate-180

// Before
<ChevronRight className="h-4 w-4" />

// After
<ChevronRight className="h-4 w-4 rtl:rotate-180" />
```

### Margin/Padding Direction
```tsx
// Detect: Using physical properties (ml/mr/pl/pr)
// Fix: Replace with logical properties (ms/me/ps/pe)

// Before
className="ml-2 mr-4 pl-3 pr-5"

// After
className="ms-2 me-4 ps-3 pe-5"
```

### Position Direction
```tsx
// Detect: Using left/right positioning
// Fix: Replace with start/end

// Before
className="left-0 right-4"

// After
className="start-0 end-4"
```

### Text Alignment
```tsx
// Detect: Using text-left/text-right
// Fix: Replace with text-start/text-end

// Before
className="text-left"

// After
className="text-start"
```

### Text Overflow
```tsx
// Detect: Text overflowing container
// Fix: Add truncation or wrapping

// For single line
className="truncate"

// For multi-line
className="line-clamp-2"

// For word breaking
className="break-words"
```

### Dark Mode Contrast
```tsx
// Detect: Low contrast in dark mode
// Fix: Use semantic color tokens

// Before
className="text-gray-600"

// After
className="text-muted-foreground"
```

## Issues Requiring Human Review

Do NOT auto-fix these:
- Layout redesign needed
- Missing functionality
- Ambiguous design intent
- Breaking changes to API
- Complex animation issues
- Multiple valid solutions exist

Mark these for human decision in final report.

## Iteration State Tracking

Maintain state throughout the loop:

```typescript
interface LoopState {
  component: string
  iteration: number
  maxIterations: number
  startTime: Date
  issues: {
    found: Issue[]
    fixed: Issue[]
    remaining: Issue[]
  }
  screenshots: {
    path: string
    variant: string
    iteration: number
  }[]
}
```

## Output: Iteration Summary

After each iteration:

```markdown
## Iteration {N} Summary

### Component: {name}
### Status: {ISSUES_FOUND | FIXES_APPLIED | COMPLETE}

### Issues Detected:
| # | Severity | Description | Status |
|---|----------|-------------|--------|
| 1 | CRITICAL | Icon not mirrored | FIXED |
| 2 | WARNING | Spacing inconsistent | FIXED |
| 3 | INFO | Could optimize animation | DEFERRED |

### Fixes Applied:
1. Added `rtl:rotate-180` to chevron at line 45
2. Changed `ml-2` to `ms-2` at line 52

### Screenshots:
- Before: .claude/screenshots/captured/{component}/iter-{N-1}/
- After: .claude/screenshots/captured/{component}/iter-{N}/

### Next Action:
{Re-capturing for validation | Ready for human review}
```

## Output: Final Report

When loop completes:

```markdown
# Visual QA Complete: {Component Name}

## Summary
- Iterations: {N}
- Total Issues Found: {count}
- Auto-Fixed: {count}
- Needs Human Review: {count}

## Validation Coverage
- [x] LTR Light Mode
- [x] LTR Dark Mode
- [x] RTL Light Mode
- [x] RTL Dark Mode
- [x] All Variants ({N} variants)
- [x] All Sizes ({N} sizes)
- [x] Interactive States
- [x] Edge Cases

## Changes Made

### File: /components/ui/{component}.tsx

```diff
- <Icon className="h-4 w-4" />
+ <Icon className="h-4 w-4 rtl:rotate-180" />

- className="ml-2 mr-4"
+ className="ms-2 me-4"
```

## Screenshots for Review

### LTR vs RTL Comparison
| LTR | RTL |
|-----|-----|
| ![LTR](ltr-light/Default.png) | ![RTL](rtl-light/Default.png) |

### Dark Mode
| Light | Dark |
|-------|------|
| ![Light](ltr-light/Default.png) | ![Dark](ltr-dark/Default.png) |

## Remaining Issues (Need Human Decision)

### 1. Animation Direction
The loading spinner rotates clockwise in both LTR and RTL.

**Options:**
- [ ] Keep as-is (clockwise in both)
- [ ] Mirror rotation in RTL (counter-clockwise)
- [ ] Use different animation for RTL

---

## Approval

All automated checks passed. Screenshots above show final state.

**Ready for your review.**

- [ ] Approve changes
- [ ] Request modifications
- [ ] View additional screenshots
```

## Usage

### Start Full Loop
```
User: Create a new ProgressBar component

Claude: I'll create the ProgressBar component with full visual QA.
[Runs through all steps automatically]
[Presents final report for approval]
```

### Run on Existing Component
```
User: Run visual QA on the Switch component

Claude: I'll run visual QA on the existing Switch component.
[Captures screenshots, analyzes, reports findings]
```

### Continue After Fix
```
User: I've updated the animation, please re-check

Claude: Re-running visual QA after your changes.
[Re-captures, re-analyzes from current state]
```

## Best Practices

1. **Start Storybook first**: Ensure Storybook is running before capture
2. **Wait for idle**: Let network settle before screenshots
3. **Compare systematically**: Always compare LTR vs RTL
4. **Document everything**: Keep iteration history
5. **Be conservative**: Don't auto-fix if uncertain
6. **Present clearly**: Make final report scannable
7. **Respect max iterations**: Don't loop forever

## Error Recovery

If something fails:
- Screenshot capture fails → Check if Storybook is running
- Analysis unclear → Ask human for guidance
- Fix doesn't work → Revert and mark for human review
- Max iterations reached → Present current state with remaining issues
