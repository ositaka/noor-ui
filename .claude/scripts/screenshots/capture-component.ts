#!/usr/bin/env npx vite-node

/**
 * Screenshot Capture Script for Single Component
 *
 * Smart capture that:
 * - Detects RTL stories by name (contains "RTL") → rtl folders
 * - LTR stories → ltr folders
 * - Captures light + dark modes
 * - Base stories (Default, Example) get all themes
 * - Other stories get minimal theme only
 *
 * Usage:
 *   npx vite-node .claude/scripts/screenshots/capture-component.ts <component-id>
 *   npx vite-node .claude/scripts/screenshots/capture-component.ts forms-switch
 *   npx vite-node .claude/scripts/screenshots/capture-component.ts forms-switch --all-themes
 *
 * Options:
 *   --all-themes    Capture all themes for all stories (not just base stories)
 */

import { chromium, type Page } from 'playwright'
import * as fs from 'fs'
import * as path from 'path'

// Configuration
const STORYBOOK_URL = process.env.STORYBOOK_URL || 'http://localhost:6006'
const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR || '.claude/screenshots/captured'
const ITERATION = parseInt(process.env.ITERATION || '1', 10)

const MODES = ['light', 'dark'] as const
const THEMES = ['minimal', 'futuristic', 'cozy', 'artistic'] as const
const DEFAULT_THEME = 'minimal'

// Stories matching these patterns get all themes captured
const BASE_STORY_PATTERNS = [
  /^default$/i,
  /^rtl\s*example$/i,
  /^rtl\s*default$/i,
  /^example$/i,
]

interface StoryEntry {
  id: string
  title: string
  name: string
  type: string
}

interface CaptureResult {
  path: string
  storyId: string
  storyName: string
  direction: 'ltr' | 'rtl'
  mode: string
  theme: string
  success: boolean
  error?: string
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
 * Get all stories for a component
 */
async function getComponentStories(componentId: string): Promise<StoryEntry[]> {
  const response = await fetch(`${STORYBOOK_URL}/index.json`)
  if (!response.ok) {
    throw new Error(`Failed to fetch stories: ${response.statusText}`)
  }

  const data = await response.json()
  const entries = Object.values(data.entries) as StoryEntry[]

  return entries.filter(
    entry =>
      entry.type === 'story' &&
      entry.id.startsWith(`${componentId}--`) &&
      !entry.id.includes('--docs')
  )
}

/**
 * Determine if a story is RTL based on its name
 */
function isRTLStory(storyName: string): boolean {
  return /rtl/i.test(storyName)
}

/**
 * Determine if a story is a "base" story that should get all themes
 */
function isBaseStory(storyName: string): boolean {
  return BASE_STORY_PATTERNS.some(pattern => pattern.test(storyName.trim()))
}

/**
 * Build Storybook iframe URL
 * Note: We don't rely on direction globals since they may not work
 * RTL stories already have direction baked in via their story definition
 */
function buildStoryUrl(storyId: string, mode: string, theme: string): string {
  const locale = 'en' // Stories handle their own locale
  const globals = `mode:${mode};theme:${theme};locale:${locale}`
  return `${STORYBOOK_URL}/iframe.html?id=${storyId}&globals=${globals}&viewMode=story`
}

/**
 * Generate filename with optional theme suffix
 */
function getFilename(storyName: string, theme: string, isMultiTheme: boolean): string {
  if (!isMultiTheme || theme === DEFAULT_THEME) {
    return `${storyName}.png`
  }
  return `${storyName}.${theme}.png`
}

/**
 * Capture a single screenshot
 */
async function captureScreenshot(
  page: Page,
  storyId: string,
  storyName: string,
  direction: 'ltr' | 'rtl',
  mode: string,
  theme: string,
  outputDir: string,
  isMultiTheme: boolean
): Promise<CaptureResult> {
  const variantDir = `${direction}-${mode}`
  const fullOutputDir = path.join(outputDir, variantDir)
  const filename = getFilename(storyName, theme, isMultiTheme)
  const filepath = path.join(fullOutputDir, filename)

  try {
    fs.mkdirSync(fullOutputDir, { recursive: true })

    const url = buildStoryUrl(storyId, mode, theme)
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })

    // Wait for animations to settle
    await page.waitForTimeout(300)

    // Apply dark mode class if needed
    await page.evaluate((isDark) => {
      document.documentElement.classList.toggle('dark', isDark)
    }, mode === 'dark')

    await page.waitForTimeout(100)

    await page.screenshot({
      path: filepath,
      fullPage: true,
    })

    return {
      path: filepath,
      storyId,
      storyName,
      direction,
      mode,
      theme,
      success: true,
    }
  } catch (error) {
    return {
      path: filepath,
      storyId,
      storyName,
      direction,
      mode,
      theme,
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

/**
 * Main capture function
 */
async function captureComponent(componentId: string, allThemes: boolean): Promise<void> {
  console.log(`\n📸 Screenshot Capture for: ${componentId}`)
  console.log(`   Iteration: ${ITERATION}`)
  console.log(`   Modes: ${MODES.join(', ')}`)
  console.log(`   Themes: ${allThemes ? 'ALL' : `${DEFAULT_THEME} (base stories get all)`}`)
  console.log('')

  // Check Storybook
  if (!(await checkStorybookRunning())) {
    console.error('❌ Storybook is not running at', STORYBOOK_URL)
    console.error('   Start Storybook with: npm run storybook')
    process.exit(1)
  }

  // Get stories
  const stories = await getComponentStories(componentId)
  if (stories.length === 0) {
    console.error(`❌ No stories found for component: ${componentId}`)
    console.error('   Check that the component ID matches the story title')
    process.exit(1)
  }

  // Categorize stories
  const ltrStories = stories.filter(s => !isRTLStory(s.name))
  const rtlStories = stories.filter(s => isRTLStory(s.name))

  console.log(`📚 Found ${stories.length} stories:`)
  console.log(`   LTR: ${ltrStories.map(s => s.name).join(', ') || '(none)'}`)
  console.log(`   RTL: ${rtlStories.map(s => s.name).join(', ') || '(none)'}`)
  console.log('')

  // Setup output directory
  const outputDir = path.join(SCREENSHOT_DIR, componentId, `iter-${ITERATION}`)
  fs.mkdirSync(outputDir, { recursive: true })

  // Launch browser
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
  })
  const page = await context.newPage()

  const results: CaptureResult[] = []

  // Calculate total captures
  let totalCaptures = 0
  for (const story of stories) {
    const shouldCaptureAllThemes = allThemes || isBaseStory(story.name)
    const themesToCapture = shouldCaptureAllThemes ? THEMES : [DEFAULT_THEME]
    totalCaptures += MODES.length * themesToCapture.length
  }

  console.log(`🎯 Capturing ${totalCaptures} screenshots...`)
  console.log('')

  let completed = 0

  // Capture LTR stories
  for (const story of ltrStories) {
    const shouldCaptureAllThemes = allThemes || isBaseStory(story.name)
    const themesToCapture = shouldCaptureAllThemes ? THEMES : [DEFAULT_THEME]

    for (const mode of MODES) {
      for (const theme of themesToCapture) {
        const result = await captureScreenshot(
          page,
          story.id,
          story.name,
          'ltr',
          mode,
          theme,
          outputDir,
          themesToCapture.length > 1
        )
        results.push(result)
        completed++

        const status = result.success ? '✓' : '✗'
        const themeLabel = themesToCapture.length > 1 ? ` [${theme}]` : ''
        console.log(`[${completed}/${totalCaptures}] ${status} ${story.name} (ltr-${mode}${themeLabel})`)

        if (!result.success) {
          console.log(`      Error: ${result.error}`)
        }
      }
    }
  }

  // Capture RTL stories
  for (const story of rtlStories) {
    const shouldCaptureAllThemes = allThemes || isBaseStory(story.name)
    const themesToCapture = shouldCaptureAllThemes ? THEMES : [DEFAULT_THEME]

    for (const mode of MODES) {
      for (const theme of themesToCapture) {
        const result = await captureScreenshot(
          page,
          story.id,
          story.name,
          'rtl',
          mode,
          theme,
          outputDir,
          themesToCapture.length > 1
        )
        results.push(result)
        completed++

        const status = result.success ? '✓'  : '✗'
        const themeLabel = themesToCapture.length > 1 ? ` [${theme}]` : ''
        console.log(`[${completed}/${totalCaptures}] ${status} ${story.name} (rtl-${mode}${themeLabel})`)

        if (!result.success) {
          console.log(`      Error: ${result.error}`)
        }
      }
    }
  }

  await browser.close()

  // Summary
  const successful = results.filter(r => r.success)
  const failed = results.filter(r => !r.success)

  console.log('')
  console.log('═'.repeat(60))
  console.log('📊 Summary')
  console.log('═'.repeat(60))
  console.log(`   Component: ${componentId}`)
  console.log(`   Total: ${results.length}`)
  console.log(`   Success: ${successful.length}`)
  console.log(`   Failed: ${failed.length}`)
  console.log('')
  console.log(`📁 Output: ${outputDir}`)
  console.log('')

  // Show folder structure
  console.log('📂 Structure:')
  const folders = new Set(successful.map(r => `${r.direction}-${r.mode}`))
  for (const folder of Array.from(folders).sort()) {
    const folderResults = successful.filter(r => `${r.direction}-${r.mode}` === folder)
    console.log(`   ${folder}/`)
    folderResults.slice(0, 4).forEach(r => {
      const filename = getFilename(r.storyName, r.theme, THEMES.includes(r.theme as any) && isBaseStory(r.storyName))
      console.log(`      - ${filename}`)
    })
    if (folderResults.length > 4) {
      console.log(`      ... and ${folderResults.length - 4} more`)
    }
  }

  console.log('')
  console.log('═'.repeat(60))
  console.log('✅ Ready for visual analysis')
  console.log('═'.repeat(60))

  // Write manifest
  const manifest = {
    componentId,
    iteration: ITERATION,
    timestamp: new Date().toISOString(),
    outputDir,
    config: {
      modes: MODES,
      themes: allThemes ? THEMES : [DEFAULT_THEME],
      allThemes,
    },
    stories: {
      ltr: ltrStories.map(s => s.name),
      rtl: rtlStories.map(s => s.name),
    },
    results: results.map(r => ({
      storyName: r.storyName,
      direction: r.direction,
      mode: r.mode,
      theme: r.theme,
      path: r.path,
      success: r.success,
    })),
  }

  fs.writeFileSync(
    path.join(outputDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  )

  if (failed.length > 0) {
    process.exit(1)
  }
}

// CLI entry point
const args = process.argv.slice(2)
const componentId = args.find(a => !a.startsWith('--'))
const allThemes = args.includes('--all-themes')

if (!componentId) {
  console.log(`
Screenshot Capture for Noor UI Components

Usage:
  npx vite-node .claude/scripts/screenshots/capture-component.ts <component-id>
  npx vite-node .claude/scripts/screenshots/capture-component.ts <component-id> --all-themes

Examples:
  npx vite-node .claude/scripts/screenshots/capture-component.ts forms-switch
  npx vite-node .claude/scripts/screenshots/capture-component.ts basic-button --all-themes

Options:
  --all-themes    Capture all 4 themes for ALL stories (not just base stories)

Default behavior:
  - Stories with "RTL" in name → rtl-light/, rtl-dark/
  - Other stories → ltr-light/, ltr-dark/
  - Base stories (Default, Example) → all 4 themes (filename.theme.png)
  - Other stories → minimal theme only

Environment variables:
  STORYBOOK_URL   Storybook URL (default: http://localhost:6006)
  SCREENSHOT_DIR  Output directory (default: .claude/screenshots/captured)
  ITERATION       Iteration number (default: 1)
`)
  process.exit(1)
}

captureComponent(componentId, allThemes).catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})
