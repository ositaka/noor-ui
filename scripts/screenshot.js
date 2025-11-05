#!/usr/bin/env node

/**
 * Visual Testing Script
 *
 * Captures screenshots of component showcase pages in both LTR and RTL modes.
 * Screenshots are saved to /public/screenshots/components/[component-name]/
 *
 * Usage:
 *   npm run screenshot              # Screenshot all components
 *   npm run screenshot:component button  # Screenshot specific component
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:3000';
const VIEWPORT = { width: 1280, height: 800 };
const SCREENSHOTS_DIR = path.join(__dirname, '../public/screenshots/components');

// List of all components to screenshot
const ALL_COMPONENTS = [
  'button',
  'card',
  'input',
  'label',
  'badge',
  'separator',
  'checkbox',
  'radio-group',
  'textarea',
  'select',
  'switch',
  'slider',
];

/**
 * Ensure directory exists, create if not
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Wait for network to be idle
 */
async function waitForPageLoad(page) {
  await page.waitForLoadState('networkidle');
  // Additional wait for any animations or transitions
  await page.waitForTimeout(500);
}

/**
 * Screenshot a component in a specific direction
 */
async function screenshotComponent(page, componentName, direction = 'ltr') {
  const url = `${BASE_URL}/components/${componentName}`;

  console.log(`  📸 Capturing ${componentName} (${direction.toUpperCase()})...`);

  try {
    // Navigate to component page
    await page.goto(url, { waitUntil: 'networkidle' });
    await waitForPageLoad(page);

    // Set direction attribute on html element
    await page.evaluate((dir) => {
      document.documentElement.setAttribute('dir', dir);
    }, direction);

    // Wait a bit for layout to settle after dir change
    await page.waitForTimeout(300);

    // Take screenshot
    const componentDir = path.join(SCREENSHOTS_DIR, componentName);
    ensureDir(componentDir);

    const screenshotPath = path.join(componentDir, `${componentName}-${direction}.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    console.log(`  ✅ Saved: public/screenshots/components/${componentName}/${componentName}-${direction}.png`);

    return true;
  } catch (error) {
    console.error(`  ❌ Error capturing ${componentName} (${direction}):`, error.message);
    return false;
  }
}

/**
 * Screenshot a component in both LTR and RTL modes
 */
async function screenshotComponentBothDirections(page, componentName) {
  console.log(`\n📋 Processing: ${componentName}`);

  const ltrSuccess = await screenshotComponent(page, componentName, 'ltr');
  const rtlSuccess = await screenshotComponent(page, componentName, 'rtl');

  if (ltrSuccess && rtlSuccess) {
    console.log(`✨ ${componentName} completed successfully`);
    return true;
  } else {
    console.log(`⚠️  ${componentName} completed with errors`);
    return false;
  }
}

/**
 * Main screenshot function
 */
async function captureScreenshots(components) {
  console.log('\n🚀 Starting Visual Testing\n');
  console.log(`📁 Screenshots will be saved to: public/screenshots/components/`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`📐 Viewport: ${VIEWPORT.width}x${VIEWPORT.height}`);
  console.log(`📦 Components: ${components.join(', ')}\n`);

  let browser;
  let successCount = 0;
  let failCount = 0;

  try {
    // Launch browser
    console.log('🌐 Launching browser...\n');
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    const context = await browser.newContext({
      viewport: VIEWPORT,
    });

    const page = await context.newPage();

    // Process each component
    for (const component of components) {
      const success = await screenshotComponentBothDirections(page, component);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Summary');
    console.log('='.repeat(60));
    console.log(`✅ Successful: ${successCount}/${components.length}`);
    console.log(`❌ Failed: ${failCount}/${components.length}`);
    console.log(`📸 Total screenshots: ${successCount * 2} (${successCount} LTR + ${successCount} RTL)`);
    console.log('='.repeat(60) + '\n');

    if (failCount > 0) {
      console.log('⚠️  Some components failed. Make sure your dev server is running on port 3000.');
      process.exit(1);
    } else {
      console.log('🎉 All screenshots captured successfully!\n');
    }

  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error('\n💡 Make sure your Next.js dev server is running:');
    console.error('   npm run dev\n');
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Main entry point
 */
async function main() {
  // Get component name from command line args
  const componentArg = process.argv[2];

  let componentsToProcess;

  if (componentArg) {
    // Screenshot specific component
    if (!ALL_COMPONENTS.includes(componentArg)) {
      console.error(`\n❌ Unknown component: ${componentArg}`);
      console.error(`\n📋 Available components:\n   ${ALL_COMPONENTS.join(', ')}\n`);
      process.exit(1);
    }
    componentsToProcess = [componentArg];
  } else {
    // Screenshot all components
    componentsToProcess = ALL_COMPONENTS;
  }

  await captureScreenshots(componentsToProcess);
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('\n❌ Unexpected error:', error);
    process.exit(1);
  });
}

module.exports = { captureScreenshots, screenshotComponent };
