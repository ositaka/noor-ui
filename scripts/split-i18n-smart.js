#!/usr/bin/env node

/**
 * Smart i18n Splitter
 * Splits translations by section with proper object extraction
 */

const fs = require('fs');
const path = require('path');

// Read the file
const content = fs.readFileSync('lib/i18n.ts', 'utf8');

// Find language sections
const enMatch = content.match(/  en: \{/);
const arMatch = content.match(/  ar: \{/);

if (!enMatch || !arMatch) {
  console.error('Could not find language sections');
  process.exit(1);
}

const enStart = enMatch.index + enMatch[0].length;
const arStart = arMatch.index;

// Extract each language section
let enEnd = arStart - 10;
while (enEnd > enStart && content[enEnd] !== '}') enEnd--;

const enContent = content.substring(enStart, enEnd).trim();

const arContentStart = arStart + arMatch[0].length;
let arEnd = content.length - 10;
while (arEnd > arContentStart && content[arEnd] !== '}') arEnd--;

const arContent = content.substring(arContentStart, arEnd).trim();

console.log(`EN content: ${enContent.length} chars`);
console.log(`AR content: ${arContent.length} chars\n`);

/**
 * Extract a top-level section from content
 */
function extractSection(content, sectionName) {
  // Match: sectionName: {
  const regex = new RegExp(`\\s*${sectionName}:\\s*\\{`, 'g');
  const match = regex.exec(content);

  if (!match) return null;

  const startPos = match.index;
  let pos = match.index + match[0].length - 1; // Start at the opening {
  let braceCount = 0;
  let inString = false;
  let stringChar = null;
  let escaped = false;

  // Parse to find matching closing brace
  while (pos < content.length) {
    const char = content[pos];

    if (escaped) {
      escaped = false;
      pos++;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      pos++;
      continue;
    }

    if ((char === '"' || char === "'" || char === '`') && !inString) {
      inString = true;
      stringChar = char;
    } else if (char === stringChar && inString) {
      inString = false;
      stringChar = null;
    }

    if (!inString) {
      if (char === '{') braceCount++;
      if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          // Found matching brace
          return content.substring(startPos, pos + 1).trim();
        }
      }
    }

    pos++;
  }

  return null;
}

// Define section groupings (optimize for file size and coherence)
const sectionGroups = {
  'common': ['nav', 'ui', 'common', 'notFound'],
  'home': ['home'],
  'themes': ['themes', 'themesPage'],
  'documentation': ['docs', 'documentationPages'],
  'getting-started': ['gettingStarted'],
  'gcc': ['gcc', 'gccDashboard'],
  'examples': ['examples'],
  'components-meta': ['components', 'componentDocs'],
  'components-basic': [
    'buttonComponent', 'cardComponent', 'inputComponent', 'selectComponent',
    'labelComponent', 'separatorComponent', 'badgeComponent'
  ],
  'components-forms': [
    'formComponent', 'checkboxComponent', 'switchComponent', 'radioGroupComponent',
    'sliderComponent', 'textareaComponent'
  ],
  'components-data': [
    'tableComponent', 'paginationComponent', 'accordionComponent',
    'collapsibleComponent', 'tabsComponent', 'breadcrumbComponent'
  ],
  'components-overlay': [
    'dialogComponent', 'popoverComponent', 'dropdownMenuComponent',
    'contextMenuComponent', 'sheetComponent', 'tooltipComponent', 'toastComponent'
  ],
  'components-advanced': [
    'calendarComponent', 'datePickerComponent', 'timePickerComponent',
    'fileUploadComponent', 'numberInputComponent', 'richTextEditorComponent',
    'progressComponent', 'skeletonComponent'
  ],
  'components-misc': ['avatarComponent', 'alertComponent'],
};

/**
 * Create a TypeScript file for a section group
 */
function createSectionFile(lang, groupName, sections, content) {
  const extracted = [];
  const missing = [];

  for (const section of sections) {
    const sectionContent = extractSection(content, section);
    if (sectionContent) {
      extracted.push(sectionContent);
    } else {
      missing.push(section);
    }
  }

  if (extracted.length === 0) {
    console.log(`  ⚠️  ${lang}/${groupName}.ts - No content found`);
    return null;
  }

  const fileContent = `/**
 * ${lang.toUpperCase()} translations - ${groupName}
 * Auto-generated from lib/i18n.ts
 */

export const ${groupName.replace(/-/g, '_')} = {
${extracted.join(',\n\n')}
}
`;

  const filepath = `lib/i18n/${lang}/${groupName}.ts`;
  fs.writeFileSync(filepath, fileContent);

  const lines = fileContent.split('\n').length;
  const chars = fileContent.length;
  console.log(`  ✓ ${filepath} (${lines} lines, ${chars} chars)`);

  if (missing.length > 0) {
    console.log(`    Missing: ${missing.join(', ')}`);
  }

  return groupName.replace(/-/g, '_');
}

// Process English
console.log('Creating English files...');
const enExports = [];
for (const [groupName, sections] of Object.entries(sectionGroups)) {
  const exportName = createSectionFile('en', groupName, sections, enContent);
  if (exportName) enExports.push({ groupName, exportName });
}

console.log('\nCreating Arabic files...');
const arExports = [];
for (const [groupName, sections] of Object.entries(sectionGroups)) {
  const exportName = createSectionFile('ar', groupName, sections, arContent);
  if (exportName) arExports.push({ groupName, exportName });
}

console.log('\n✅ Split complete!');
console.log(`Created ${enExports.length} English files`);
console.log(`Created ${arExports.length} Arabic files`);

// Generate index files
const enImports = enExports.map(({ groupName, exportName }) =>
  `import { ${exportName} } from './${groupName}'`
).join('\n');

const enMerge = enExports.map(({ exportName }) =>
  `  ...${exportName},`
).join('\n');

const enIndexContent = `/**
 * English translations index
 * Auto-generated - merges all section files
 */

${enImports}

export const en = {
${enMerge}
}
`;

fs.writeFileSync('lib/i18n/en/index.ts', enIndexContent);
console.log('\n✓ Created lib/i18n/en/index.ts');

const arImports = arExports.map(({ groupName, exportName }) =>
  `import { ${exportName} } from './${groupName}'`
).join('\n');

const arMerge = arExports.map(({ exportName }) =>
  `  ...${exportName},`
).join('\n');

const arIndexContent = `/**
 * Arabic translations index
 * Auto-generated - merges all section files
 */

${arImports}

export const ar = {
${arMerge}
}
`;

fs.writeFileSync('lib/i18n/ar/index.ts', arIndexContent);
console.log('✓ Created lib/i18n/ar/index.ts');
