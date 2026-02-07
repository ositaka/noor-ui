#!/usr/bin/env node

/**
 * Storybook Visual Baseline Script
 *
 * Captures screenshots of every Storybook story for before/after comparison
 * during migrations (e.g., Tailwind v3 -> v4).
 *
 * Usage:
 *   # Start Storybook first
 *   pnpm storybook &
 *
 *   # Capture baseline (default combo only - fast)
 *   node scripts/screenshot-stories.js
 *
 *   # Capture full matrix (all themes x directions x modes)
 *   node scripts/screenshot-stories.js --full
 *
 *   # Save to a specific folder (e.g., after migration)
 *   node scripts/screenshot-stories.js --output screenshots/after
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const STORYBOOK_URL = 'http://localhost:6006';
const VIEWPORT = { width: 1280, height: 800 };

const THEMES = ['default', 'minimal', 'futuristic', 'cozy', 'artistic'];
const MODES = ['light', 'dark'];

// Check if a story ID is an RTL-specific story (e.g., "basic-alert--rtl-example")
function isRtlStory(storyId) {
  // Match story variant part (after the last --) starting with "rtl"
  const parts = storyId.split('--');
  const variant = parts[parts.length - 1];
  return variant.startsWith('rtl');
}

// Get the matching direction for a story: RTL stories -> rtl, others -> ltr
function directionForStory(storyId) {
  return isRtlStory(storyId) ? 'rtl' : 'ltr';
}

// Build combos for default mode (fast): only default + cozy themes, light mode
function getDefaultCombos(storyId) {
  const dir = directionForStory(storyId);
  return [
    { theme: 'default', direction: dir, mode: 'light' },
    { theme: 'cozy', direction: dir, mode: 'light' },
  ];
}

// Build combos for full mode: all themes x light/dark, but direction matches the story
function getFullCombos(storyId) {
  const dir = directionForStory(storyId);
  const combos = [];
  for (const theme of THEMES) {
    for (const mode of MODES) {
      combos.push({ theme, direction: dir, mode });
    }
  }
  return combos;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const full = args.includes('--full');
  let output = 'screenshots/before';

  const outputIdx = args.indexOf('--output');
  if (outputIdx !== -1 && args[outputIdx + 1]) {
    output = args[outputIdx + 1];
  }

  return { full, output };
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function fetchStoryIndex() {
  const response = await fetch(`${STORYBOOK_URL}/index.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch story index: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

function getStoryIds(index) {
  const entries = index.entries || index.v || {};
  return Object.values(entries)
    .filter((entry) => entry.type === 'story')
    .map((entry) => entry.id);
}

async function captureStory(page, storyId, combo, outputDir) {
  const { theme, direction, mode } = combo;
  const globals = `direction:${direction};theme:${theme};mode:${mode}`;
  const url = `${STORYBOOK_URL}/iframe.html?id=${storyId}&globals=${encodeURIComponent(globals)}&viewMode=story`;

  const filename = `${storyId}--${theme}-${direction}-${mode}.png`;
  const filepath = path.join(outputDir, filename);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: filepath, fullPage: true });
    return true;
  } catch (error) {
    console.error(`  Failed: ${storyId} (${theme}/${direction}/${mode}): ${error.message}`);
    return false;
  }
}

async function main() {
  const { full, output } = parseArgs();
  const outputDir = path.resolve(process.cwd(), output);
  const getCombos = full ? getFullCombos : getDefaultCombos;

  console.log(`\nStorybook Screenshot Capture`);
  console.log(`Output: ${outputDir}`);
  console.log(`Mode: ${full ? 'full matrix (all themes x light/dark)' : 'default only'}`);
  console.log(`Direction: auto-detected per story (RTL stories -> rtl, others -> ltr)\n`);

  ensureDir(outputDir);

  // Fetch story index
  let storyIndex;
  try {
    storyIndex = await fetchStoryIndex();
  } catch (error) {
    console.error(`Failed to fetch Storybook index. Is Storybook running on ${STORYBOOK_URL}?`);
    console.error(error.message);
    process.exit(1);
  }

  const storyIds = getStoryIds(storyIndex);
  const sampleCombos = getCombos(storyIds[0] || 'example--default');
  console.log(`Found ${storyIds.length} stories`);
  console.log(`Combos per story: ${sampleCombos.length}`);
  console.log(`Estimated screenshots: ~${storyIds.length * sampleCombos.length}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  let success = 0;
  let fail = 0;

  for (let i = 0; i < storyIds.length; i++) {
    const storyId = storyIds[i];
    const combos = getCombos(storyId);
    const progress = `[${i + 1}/${storyIds.length}]`;

    for (const combo of combos) {
      const label = `${combo.theme}/${combo.direction}/${combo.mode}`;
      process.stdout.write(`${progress} ${storyId} (${label})...`);

      const ok = await captureStory(page, storyId, combo, outputDir);
      if (ok) {
        success++;
        process.stdout.write(` done\n`);
      } else {
        fail++;
      }
    }
  }

  await browser.close();

  console.log(`\nDone: ${success} captured, ${fail} failed`);
  console.log(`Screenshots saved to: ${outputDir}\n`);

  if (fail > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
