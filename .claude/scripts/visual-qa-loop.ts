#!/usr/bin/env npx vite-node

/**
 * Visual QA Loop Orchestrator
 *
 * Coordinates the visual QA workflow:
 * 1. Ensure Storybook is running
 * 2. Capture screenshots for a component
 * 3. Output analysis prompt for Claude
 * 4. Track iteration state
 *
 * Usage:
 *   npx vite-node .claude/scripts/visual-qa-loop.ts <component-id> [iteration]
 *
 * Examples:
 *   npx vite-node .claude/scripts/visual-qa-loop.ts forms-switch
 *   npx vite-node .claude/scripts/visual-qa-loop.ts forms-switch 2
 */

import { execSync, spawn } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

const STORYBOOK_URL = process.env.STORYBOOK_URL || 'http://localhost:6006'
const SCREENSHOT_DIR = '.claude/screenshots/captured'
const MAX_ITERATIONS = 3
const STORYBOOK_STARTUP_TIMEOUT = 120000 // 2 minutes

interface LoopState {
  componentId: string
  iteration: number
  maxIterations: number
  startTime: string
  lastUpdate: string
  status: 'capturing' | 'analyzing' | 'fixing' | 'complete' | 'needs_review'
  screenshots: string[]
  issues: {
    found: any[]
    fixed: any[]
    remaining: any[]
  }
}

/**
 * Check if Storybook is running
 */
async function checkStorybookRunning(): Promise<boolean> {
  try {
    const response = await fetch(`${STORYBOOK_URL}/index.json`)
    return response.ok
  } catch {
    return false
  }
}

/**
 * Start Storybook in background
 */
async function startStorybook(): Promise<void> {
  console.log('🚀 Starting Storybook...')

  const storybook = spawn('npm', ['run', 'storybook', '--', '--ci'], {
    detached: true,
    stdio: 'ignore',
    shell: true,
  })
  storybook.unref()

  // Wait for Storybook to be ready
  const startTime = Date.now()
  while (Date.now() - startTime < STORYBOOK_STARTUP_TIMEOUT) {
    await new Promise(r => setTimeout(r, 2000))
    if (await checkStorybookRunning()) {
      console.log('✅ Storybook is ready')
      return
    }
    process.stdout.write('.')
  }

  throw new Error('Storybook failed to start within timeout')
}

/**
 * Load or create state file
 */
function loadState(componentId: string, iteration: number): LoopState {
  const stateFile = path.join(SCREENSHOT_DIR, componentId, 'loop-state.json')

  if (fs.existsSync(stateFile)) {
    const existing = JSON.parse(fs.readFileSync(stateFile, 'utf-8'))
    if (existing.componentId === componentId) {
      return {
        ...existing,
        iteration,
        lastUpdate: new Date().toISOString(),
      }
    }
  }

  return {
    componentId,
    iteration,
    maxIterations: MAX_ITERATIONS,
    startTime: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
    status: 'capturing',
    screenshots: [],
    issues: {
      found: [],
      fixed: [],
      remaining: [],
    },
  }
}

/**
 * Save state file
 */
function saveState(state: LoopState): void {
  const stateFile = path.join(SCREENSHOT_DIR, state.componentId, 'loop-state.json')
  fs.mkdirSync(path.dirname(stateFile), { recursive: true })
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2))
}

/**
 * Capture screenshots using the capture script
 */
async function captureScreenshots(componentId: string, iteration: number): Promise<string[]> {
  console.log(`\n📸 Capturing screenshots (iteration ${iteration})...`)

  const outputDir = path.join(SCREENSHOT_DIR, componentId, `iter-${iteration}`)

  try {
    execSync(
      `ITERATION=${iteration} npx vite-node .claude/scripts/screenshots/capture-component.ts ${componentId}`,
      {
        stdio: 'inherit',
        env: {
          ...process.env,
          ITERATION: String(iteration),
        },
      }
    )

    // Read manifest to get screenshot paths
    const manifestPath = path.join(outputDir, 'manifest.json')
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
      return manifest.results
        .filter((r: any) => r.success)
        .map((r: any) => r.path)
    }

    // Fallback: find all PNG files
    const screenshots: string[] = []
    const findPngs = (dir: string) => {
      if (!fs.existsSync(dir)) return
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          findPngs(fullPath)
        } else if (entry.name.endsWith('.png')) {
          screenshots.push(fullPath)
        }
      }
    }
    findPngs(outputDir)
    return screenshots
  } catch (error) {
    console.error('Screenshot capture failed:', error)
    return []
  }
}

/**
 * Generate analysis prompt for Claude
 */
function generateAnalysisPrompt(state: LoopState): string {
  const screenshotList = state.screenshots.map(s => `- ${s}`).join('\n')

  return `
═══════════════════════════════════════════════════════════════
                    VISUAL ANALYSIS REQUIRED
═══════════════════════════════════════════════════════════════

Component: ${state.componentId}
Iteration: ${state.iteration} / ${state.maxIterations}
Screenshots: ${state.screenshots.length}

═══════════════════════════════════════════════════════════════
SCREENSHOTS TO ANALYZE
═══════════════════════════════════════════════════════════════

${screenshotList}

═══════════════════════════════════════════════════════════════
ANALYSIS INSTRUCTIONS
═══════════════════════════════════════════════════════════════

Please analyze each screenshot using the Read tool. Compare:

1. LTR vs RTL variants:
   - Is layout properly mirrored?
   - Are icons pointing correct direction?
   - Is text aligned to start?

2. Light vs Dark mode:
   - Is text readable (sufficient contrast)?
   - Are all elements visible?

3. Check for:
   - Text overflow or clipping
   - Alignment inconsistencies
   - Missing spacing

═══════════════════════════════════════════════════════════════
OUTPUT FORMAT
═══════════════════════════════════════════════════════════════

After analysis, provide:

## Issues Found
| # | Severity | Screenshot | Description | Fix |
|---|----------|------------|-------------|-----|
| 1 | CRITICAL | rtl-light/Default.png | Icon not mirrored | Add rtl:rotate-180 |

## Passed Checks
- [x] Layout mirroring
- [x] Text alignment
- [ ] Icon direction (see issue #1)

## Recommendation
{What action to take next}

═══════════════════════════════════════════════════════════════

${state.iteration >= state.maxIterations
    ? '⚠️  MAX ITERATIONS REACHED - Report all remaining issues for human review'
    : 'If issues found, apply fixes and request re-capture (iteration ' + (state.iteration + 1) + ')'}

═══════════════════════════════════════════════════════════════
`
}

/**
 * Main function
 */
async function main(): Promise<void> {
  const componentId = process.argv[2]
  const iteration = parseInt(process.argv[3] || '1', 10)

  if (!componentId) {
    console.log(`
Visual QA Loop Orchestrator

Usage:
  npx vite-node .claude/scripts/visual-qa-loop.ts <component-id> [iteration]

Examples:
  npx vite-node .claude/scripts/visual-qa-loop.ts forms-switch
  npx vite-node .claude/scripts/visual-qa-loop.ts forms-switch 2

This script:
1. Ensures Storybook is running
2. Captures screenshots for all story variants
3. Outputs an analysis prompt for Claude to review screenshots
4. Tracks iteration state for the self-correcting loop

Available components (run 'npm run storybook' to see all):
  basic-button, basic-badge, basic-avatar
  forms-switch, forms-input, forms-select
  navigation-tabs, navigation-breadcrumb
  overlay-dialog, overlay-popover
  feedback-alert, feedback-toast
  data-display-card, data-display-table
`)
    process.exit(1)
  }

  console.log('═'.repeat(60))
  console.log('      Visual QA Loop')
  console.log('═'.repeat(60))
  console.log(`Component: ${componentId}`)
  console.log(`Iteration: ${iteration}`)
  console.log('')

  // Ensure Storybook is running
  if (!(await checkStorybookRunning())) {
    await startStorybook()
  } else {
    console.log('✅ Storybook is already running')
  }

  // Load/create state
  const state = loadState(componentId, iteration)
  state.status = 'capturing'
  saveState(state)

  // Capture screenshots
  state.screenshots = await captureScreenshots(componentId, iteration)
  state.status = 'analyzing'
  state.lastUpdate = new Date().toISOString()
  saveState(state)

  if (state.screenshots.length === 0) {
    console.error('\n❌ No screenshots captured. Check component ID and Storybook stories.')
    process.exit(1)
  }

  // Output analysis prompt
  console.log(generateAnalysisPrompt(state))

  // Save state for reference
  console.log(`\nState saved to: ${path.join(SCREENSHOT_DIR, componentId, 'loop-state.json')}`)
  console.log('')
  console.log('Next steps:')
  console.log('1. Claude: Analyze screenshots using the Read tool')
  console.log('2. Claude: Report issues found')
  console.log('3. Claude: Apply fixes if needed')
  console.log(`4. Re-run: npx vite-node .claude/scripts/visual-qa-loop.ts ${componentId} ${iteration + 1}`)
}

main().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
