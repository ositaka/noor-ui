/**
 * Playwright test for capturing all Storybook stories
 *
 * This test file is designed to be run with Playwright Test:
 *   npx playwright test .claude/scripts/screenshots/capture-stories.spec.ts
 *
 * It will:
 * 1. Start Storybook (via webServer config in playwright.config.ts)
 * 2. Fetch all stories from Storybook
 * 3. Capture screenshots for each variant (LTR/RTL, light/dark)
 * 4. Save to .claude/screenshots/captured/
 */

import { test, expect } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

const STORYBOOK_URL = 'http://localhost:6006'
const SCREENSHOT_DIR = '.claude/screenshots/captured'

interface StoryEntry {
  id: string
  title: string
  name: string
  type: string
  importPath: string
}

const VARIANTS = [
  { direction: 'ltr', mode: 'light', locale: 'en' },
  { direction: 'ltr', mode: 'dark', locale: 'en' },
  { direction: 'rtl', mode: 'light', locale: 'ar' },
  { direction: 'rtl', mode: 'dark', locale: 'ar' },
]

test.describe('Storybook Screenshot Capture', () => {
  let stories: StoryEntry[] = []

  test.beforeAll(async ({ request }) => {
    // Fetch all stories from Storybook
    const response = await request.get(`${STORYBOOK_URL}/index.json`)
    expect(response.ok()).toBeTruthy()

    const data = await response.json()
    stories = (Object.values(data.entries) as StoryEntry[]).filter(
      entry => entry.type === 'story' && !entry.id.includes('--docs')
    )

    console.log(`Found ${stories.length} stories to capture`)

    // Create base directory
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
  })

  test('capture all stories in all variants', async ({ page }) => {
    // Skip if no stories found
    test.skip(stories.length === 0, 'No stories found')

    const results: { story: string; variant: string; success: boolean }[] = []

    for (const story of stories) {
      // Extract component ID from story ID (e.g., "forms-switch" from "forms-switch--default")
      const componentId = story.id.split('--')[0]
      const componentDir = path.join(SCREENSHOT_DIR, componentId)

      for (const variant of VARIANTS) {
        const variantDir = path.join(componentDir, `${variant.direction}-${variant.mode}`)
        fs.mkdirSync(variantDir, { recursive: true })

        const globals = `direction:${variant.direction};mode:${variant.mode};locale:${variant.locale};theme:minimal`
        const url = `${STORYBOOK_URL}/iframe.html?id=${story.id}&globals=${globals}&viewMode=story`

        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })

          // Apply dark mode class if needed
          if (variant.mode === 'dark') {
            await page.evaluate(() => {
              document.documentElement.classList.add('dark')
            })
          }

          // Wait for animations
          await page.waitForTimeout(300)

          const screenshotPath = path.join(variantDir, `${story.name}.png`)
          await page.screenshot({
            path: screenshotPath,
            fullPage: true,
          })

          results.push({
            story: story.id,
            variant: `${variant.direction}-${variant.mode}`,
            success: true,
          })
        } catch (error) {
          console.error(`Failed to capture ${story.id} (${variant.direction}-${variant.mode}):`, error)
          results.push({
            story: story.id,
            variant: `${variant.direction}-${variant.mode}`,
            success: false,
          })
        }
      }
    }

    // Write results summary
    const summary = {
      timestamp: new Date().toISOString(),
      totalStories: stories.length,
      totalCaptures: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results,
    }

    fs.writeFileSync(
      path.join(SCREENSHOT_DIR, 'capture-summary.json'),
      JSON.stringify(summary, null, 2)
    )

    console.log(`\nCapture complete: ${summary.successful}/${summary.totalCaptures} successful`)

    // Fail test if any captures failed
    expect(summary.failed).toBe(0)
  })
})

test.describe('Single Component Capture', () => {
  // This test can be run with a specific component:
  // COMPONENT=forms-switch npx playwright test .claude/scripts/screenshots/capture-stories.spec.ts --grep "single component"

  const componentId = process.env.COMPONENT

  test.skip(!componentId, 'Set COMPONENT env var to run single component capture')

  test('capture single component', async ({ page, request }) => {
    if (!componentId) return

    // Fetch stories for this component
    const response = await request.get(`${STORYBOOK_URL}/index.json`)
    const data = await response.json()
    const stories = (Object.values(data.entries) as StoryEntry[]).filter(
      entry =>
        entry.type === 'story' &&
        entry.id.startsWith(`${componentId}--`) &&
        !entry.id.includes('--docs')
    )

    console.log(`Found ${stories.length} stories for ${componentId}`)

    const componentDir = path.join(SCREENSHOT_DIR, componentId)

    for (const story of stories) {
      for (const variant of VARIANTS) {
        const variantDir = path.join(componentDir, `${variant.direction}-${variant.mode}`)
        fs.mkdirSync(variantDir, { recursive: true })

        const globals = `direction:${variant.direction};mode:${variant.mode};locale:${variant.locale};theme:minimal`
        const url = `${STORYBOOK_URL}/iframe.html?id=${story.id}&globals=${globals}&viewMode=story`

        await page.goto(url, { waitUntil: 'networkidle' })

        if (variant.mode === 'dark') {
          await page.evaluate(() => document.documentElement.classList.add('dark'))
        }

        await page.waitForTimeout(300)

        await page.screenshot({
          path: path.join(variantDir, `${story.name}.png`),
          fullPage: true,
        })

        console.log(`✓ ${story.name} (${variant.direction}-${variant.mode})`)
      }
    }
  })
})
