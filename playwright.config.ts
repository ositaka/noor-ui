import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for Noor UI visual testing
 *
 * This config is used for:
 * 1. Screenshot capture of Storybook stories
 * 2. Visual regression testing
 * 3. Component interaction testing
 */

export default defineConfig({
  // Test directory for screenshot capture scripts
  testDir: './.claude/scripts/screenshots',

  // Output directories
  outputDir: './.claude/screenshots/test-results',
  snapshotDir: './.claude/screenshots/snapshots',

  // Run tests in parallel for faster execution
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI for stability
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html', { outputFolder: '.claude/screenshots/report' }],
    ['list']
  ],

  // Shared settings for all projects
  use: {
    // Base URL for Storybook
    baseURL: 'http://localhost:6006',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Capture screenshot on failure
    screenshot: 'only-on-failure',

    // Default viewport
    viewport: { width: 1280, height: 720 },

    // Timeout for actions
    actionTimeout: 10000,
  },

  // Configure projects for different viewports if needed
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'tablet',
      use: {
        ...devices['iPad'],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['iPhone 13'],
        viewport: { width: 390, height: 844 },
      },
    },
  ],

  // Run Storybook before starting tests
  webServer: {
    command: 'npm run storybook -- --ci',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  // Global timeout
  timeout: 30 * 1000,

  // Expect timeout
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      // Maximum allowed ratio of different pixels
      maxDiffPixelRatio: 0.01,
    },
  },
})
