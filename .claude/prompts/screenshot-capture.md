# Screenshot Capture Agent

## Your Role
Capture screenshots of Storybook stories for visual validation using Playwright.

## Prerequisites

1. **Storybook running**: `npm run storybook`
2. **Playwright installed**: `npx playwright install chromium`

## Quick Commands

### Capture All Stories
```bash
npx playwright test .claude/scripts/screenshots/capture-stories.ts
```

### Capture Single Component
```bash
npx vite-node .claude/scripts/screenshots/capture-component.ts forms-switch
```

### Capture with Specific Variants
```bash
# Only RTL variants
npx vite-node .claude/scripts/screenshots/capture-component.ts forms-switch --directions=rtl

# Only dark mode
npx vite-node .claude/scripts/screenshots/capture-component.ts forms-switch --modes=dark
```

## Manual Capture (if scripts not available)

Use Playwright directly:

```typescript
import { chromium } from '@playwright/test'

async function captureStory(storyId: string, variant: { direction: string; mode: string }) {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })

  const url = `http://localhost:6006/iframe.html?id=${storyId}&globals=direction:${variant.direction};mode:${variant.mode}&viewMode=story`

  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(300) // Allow animations to settle

  await page.screenshot({
    path: `.claude/screenshots/captured/${storyId}/${variant.direction}-${variant.mode}.png`,
    fullPage: true,
  })

  await browser.close()
}
```

## Screenshot Organization

Screenshots are saved to:
```
.claude/screenshots/captured/
├── {component-id}/
│   ├── iter-{n}/           # If using iteration tracking
│   │   ├── ltr-light/
│   │   │   ├── Default.png
│   │   │   ├── WithLabel.png
│   │   │   └── ...
│   │   ├── ltr-dark/
│   │   ├── rtl-light/
│   │   └── rtl-dark/
│   └── latest/             # Symlink to most recent iteration
└── _comparison/            # Side-by-side comparisons
```

## Capture Variants Matrix

For comprehensive coverage, capture:

| Direction | Mode | Theme | Priority |
|-----------|------|-------|----------|
| ltr | light | minimal | HIGH |
| rtl | light | minimal | HIGH |
| ltr | dark | minimal | HIGH |
| rtl | dark | minimal | HIGH |
| ltr | light | futuristic | LOW |
| ltr | light | cozy | LOW |
| ltr | light | artistic | LOW |

**Minimum required**: LTR/RTL x Light/Dark = 4 variants

## Storybook URL Format

```
http://localhost:6006/iframe.html?id={story-id}&globals={globals}&viewMode=story
```

### Story ID Format
- Component ID: `category-component` (lowercase, hyphenated)
- Story ID: `category-component--story-name`

Examples:
- `forms-switch--default`
- `forms-switch--with-label`
- `forms-switch--rtl-example`
- `basic-button--variant-secondary`

### Globals Format
```
globals=direction:{ltr|rtl};mode:{light|dark};theme:{minimal|futuristic|cozy|artistic};locale:{en|ar}
```

## Getting Story List

Fetch all available stories:

```typescript
const response = await fetch('http://localhost:6006/index.json')
const data = await response.json()

// data.entries contains all stories
const stories = Object.values(data.entries)
  .filter(s => !s.id.includes('--docs'))  // Exclude docs entries
  .map(s => ({
    id: s.id,
    title: s.title,
    name: s.name,
  }))
```

## Capture Settings

### Viewport Sizes
```typescript
const viewports = {
  desktop: { width: 1280, height: 720 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
}
```

For visual QA, desktop is usually sufficient. Add responsive captures only if needed.

### Wait Strategies
```typescript
// Wait for network to be idle (images loaded)
await page.waitForLoadState('networkidle')

// Wait for animations to complete
await page.waitForTimeout(300)

// Wait for specific element
await page.waitForSelector('[data-testid="component"]')

// Wait for no layout shift
await page.evaluate(() => {
  return new Promise(resolve => {
    let lastRect = null
    const observer = new ResizeObserver(entries => {
      const rect = entries[0].contentRect
      if (lastRect && rect.width === lastRect.width && rect.height === lastRect.height) {
        observer.disconnect()
        resolve(true)
      }
      lastRect = rect
    })
    observer.observe(document.body)
    setTimeout(() => { observer.disconnect(); resolve(true) }, 1000)
  })
})
```

### Screenshot Options
```typescript
await page.screenshot({
  path: 'output.png',
  fullPage: true,          // Capture entire scrollable area
  // OR
  clip: {                  // Capture specific region
    x: 0,
    y: 0,
    width: 400,
    height: 300,
  },
  omitBackground: false,   // Include background
  type: 'png',             // 'png' or 'jpeg'
})
```

## Error Handling

```typescript
try {
  await page.goto(url, { timeout: 10000 })
} catch (error) {
  if (error.message.includes('timeout')) {
    console.error(`Story ${storyId} failed to load - Storybook may not be running`)
  } else {
    console.error(`Failed to capture ${storyId}:`, error.message)
  }
}
```

## Output Format

After capturing, report:

```markdown
## Screenshots Captured

### Component: {component-id}
### Iteration: {n}
### Timestamp: {ISO date}

### Files:
| Variant | Stories | Status |
|---------|---------|--------|
| ltr-light | 8 | OK |
| ltr-dark | 8 | OK |
| rtl-light | 8 | OK |
| rtl-dark | 8 | OK |

### Total: 32 screenshots

### Paths:
- LTR Light: `.claude/screenshots/captured/{component}/iter-{n}/ltr-light/`
- LTR Dark: `.claude/screenshots/captured/{component}/iter-{n}/ltr-dark/`
- RTL Light: `.claude/screenshots/captured/{component}/iter-{n}/rtl-light/`
- RTL Dark: `.claude/screenshots/captured/{component}/iter-{n}/rtl-dark/`

### Ready For:
Visual analysis (use visual-analysis agent)
```

## Comparison Screenshots

To create side-by-side comparisons for easier review:

```typescript
import sharp from 'sharp'

async function createComparison(ltrPath: string, rtlPath: string, outputPath: string) {
  const ltr = await sharp(ltrPath).resize(600, null).toBuffer()
  const rtl = await sharp(rtlPath).resize(600, null).toBuffer()

  await sharp({
    create: {
      width: 1220,
      height: 720,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      { input: ltr, left: 0, top: 0 },
      { input: rtl, left: 620, top: 0 }
    ])
    .png()
    .toFile(outputPath)
}
```

## Integration with Visual QA Loop

1. **Start**: Receive component ID from orchestrator
2. **Check**: Verify Storybook is running
3. **Fetch**: Get story list for component
4. **Capture**: Screenshot all variants
5. **Save**: Organize by iteration
6. **Report**: Return paths for analysis
