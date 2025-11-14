#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '../lib/i18n.ts');
const content = fs.readFileSync(i18nPath, 'utf8');

// Find where 'ar:' section starts (Arabic translations)
const arSectionMatch = content.match(/  ar: \{/);
if (!arSectionMatch) {
  console.error('Could not find ar: section');
  process.exit(1);
}

const arStartIndex = arSectionMatch.index;

// Split into English and Arabic sections
const header = content.substring(0, content.indexOf('export const content = {'));
const enSection = content.substring(content.indexOf('en: {'), arStartIndex).trim();
const arSection = content.substring(arStartIndex, content.lastIndexOf('}')).trim();

console.log('File structure:');
console.log(`- Total lines: ${content.split('\n').length}`);
console.log(`- English section starts at char: ${content.indexOf('en: {')}`);
console.log(`- Arabic section starts at char: ${arStartIndex}`);
console.log(`- English section length: ${enSection.length} chars`);
console.log(`- Arabic section length: ${arSection.length} chars`);

// Extract top-level keys from English section
const enKeys = [];
let depth = 0;
let currentKey = '';
for (let i = 0; i < enSection.length; i++) {
  const char = enSection[i];
  if (char === '{') depth++;
  if (char === '}') depth--;

  // Find top-level keys (depth === 1)
  if (depth === 1 && enSection[i] === '\n') {
    const line = enSection.substring(i + 1, enSection.indexOf('\n', i + 1)).trim();
    const match = line.match(/^([a-zA-Z]+): \{$/);
    if (match) {
      enKeys.push(match[1]);
    }
  }
}

console.log('\nTop-level English keys found:');
console.log(enKeys.join(', '));

// Similarly for Arabic
const arKeys = [];
depth = 0;
for (let i = 0; i < arSection.length; i++) {
  const char = arSection[i];
  if (char === '{') depth++;
  if (char === '}') depth--;

  if (depth === 1 && arSection[i] === '\n') {
    const line = arSection.substring(i + 1, arSection.indexOf('\n', i + 1)).trim();
    const match = line.match(/^([a-zA-Z]+): \{$/);
    if (match) {
      arKeys.push(match[1]);
    }
  }
}

console.log('\nTop-level Arabic keys found:');
console.log(arKeys.join(', '));

console.log('\n=== Suggested file split ===');
console.log('1. lib/i18n/common.ts - nav, ui, docs, common');
console.log('2. lib/i18n/home.ts - home section');
console.log('3. lib/i18n/themes.ts - themes, themesPage');
console.log('4. lib/i18n/documentation.ts - documentationPages section');
console.log('5. lib/i18n/components/index.ts - components, componentDocs');
console.log('6. lib/i18n/components/*.ts - individual component docs');
console.log('7. lib/i18n/examples.ts - examples, gccDashboard, gcc');
console.log('8. lib/i18n/index.ts - Main loader with dynamic imports');
