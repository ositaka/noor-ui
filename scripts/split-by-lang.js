#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '../lib/i18n.ts');
const content = fs.readFileSync(i18nPath, 'utf8');

// Find the start and end of each language section
const enMatch = content.match(/  en: \{/);
const arMatch = content.match(/  ar: \{/);

if (!enMatch || !arMatch) {
  console.error('Could not find en: or ar: sections');
  process.exit(1);
}

const enStart = enMatch.index + enMatch[0].length;
const arStart = arMatch.index + arMatch[0].length;

// Find end of en section (start of ar minus some chars)
let enEnd = arStart - 20; // Back up a bit from ar start
while (enEnd > enStart && content[enEnd] !== '}') {
  enEnd--;
}

// Find end of ar section (end of content object)
let arEnd = content.length - 1;
while (arEnd > arStart && content[arEnd] !== '}') {
  arEnd--;
}

const enContent = content.substring(enStart, enEnd).trim();
const arContent = content.substring(arStart, arEnd).trim();

// Create content-en.ts
const enFile = `/**
 * English translations
 */

export const en = {
${enContent}
}
`;

// Create content-ar.ts
const arFile = `/**
 * Arabic translations
 */

export const ar = {
${arContent}
}
`;

// Write files
fs.writeFileSync('lib/i18n/content-en.ts', enFile);
fs.writeFileSync('lib/i18n/content-ar.ts', arFile);

console.log('✅ Split complete!');
console.log(`EN file: ${enFile.length} chars, ${enFile.split('\n').length} lines`);
console.log(`AR file: ${arFile.length} chars, ${arFile.split('\n').length} lines`);
