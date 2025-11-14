// #!/usr/bin/env node

// /**
//  * Translation Validation Script
//  *
//  * Ensures ALL page.tsx files import and use translation utilities.
//  * This prevents untranslated pages from being committed.
//  *
//  * Usage:
//  *   npm run check:translations
//  *
//  * Exit codes:
//  *   0 - All pages have translations
//  *   1 - Some pages are missing translations
//  */

// const fs = require('fs');
// const path = require('path');
// const { execSync } = require('child_process');

// const colors = {
//   reset: '\x1b[0m',
//   green: '\x1b[32m',
//   red: '\x1b[31m',
//   yellow: '\x1b[33m',
//   blue: '\x1b[34m',
//   cyan: '\x1b[36m',
// };

// function findPageFiles(dir, fileList = []) {
//   const files = fs.readdirSync(dir);

//   files.forEach(file => {
//     const filePath = path.join(dir, file);
//     const stat = fs.statSync(filePath);

//     // Skip node_modules, .next, and other build directories
//     if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'dist' || file === 'build') {
//       return;
//     }

//     if (stat.isDirectory()) {
//       findPageFiles(filePath, fileList);
//     } else if (file === 'page.tsx') {
//       fileList.push(filePath);
//     }
//   });

//   return fileList;
// }

// function checkFileHasTranslations(filePath) {
//   const content = fs.readFileSync(filePath, 'utf8');

//   // Check for required imports
//   const hasUseDirection = content.includes('useDirection');
//   const hasContentImport = /import\s+{[^}]*content[^}]*}\s+from\s+['"]@\/lib\/i18n['"]/g.test(content);

//   return hasUseDirection && hasContentImport;
// }

// function main() {
//   console.log(`${colors.cyan}🔍 Checking all pages for translation imports...${colors.reset}\n`);

//   const appDir = path.join(__dirname, '..', 'app');
//   const allPages = findPageFiles(appDir);

//   const translated = [];
//   const missing = [];

//   allPages.forEach(filePath => {
//     const relativePath = path.relative(path.join(__dirname, '..'), filePath);

//     if (checkFileHasTranslations(filePath)) {
//       translated.push(relativePath);
//     } else {
//       missing.push(relativePath);
//     }
//   });

//   // Display results
//   console.log(`${colors.green}✅ TRANSLATED PAGES (${translated.length}):${colors.reset}`);
//   translated.forEach(file => {
//     console.log(`  ${colors.green}✓${colors.reset} ${file}`);
//   });

//   console.log();

//   if (missing.length > 0) {
//     console.log(`${colors.red}❌ MISSING TRANSLATIONS (${missing.length}):${colors.reset}`);
//     missing.forEach(file => {
//       console.log(`  ${colors.red}✗${colors.reset} ${file}`);
//     });

//     console.log();
//     console.log(`${colors.yellow}⚠️  Warning: ${missing.length} pages are missing translation imports!${colors.reset}`);
//     console.log(`${colors.yellow}   All pages must import 'useDirection' and 'content' from '@/lib/i18n'${colors.reset}`);
//     console.log();
//   }

//   // Summary
//   const total = translated.length + missing.length;
//   const percentage = Math.round((translated.length / total) * 100);

//   console.log(`${colors.cyan}📊 Summary:${colors.reset}`);
//   console.log(`   Total pages: ${total}`);
//   console.log(`   ${colors.green}Translated: ${translated.length} (${percentage}%)${colors.reset}`);
//   console.log(`   ${colors.red}Missing: ${missing.length} (${100 - percentage}%)${colors.reset}`);
//   console.log();

//   // Exit with error if any pages are missing translations
//   if (missing.length > 0) {
//     console.log(`${colors.red}❌ Translation check failed!${colors.reset}`);
//     console.log(`${colors.yellow}   Run this script to see which pages need translation.${colors.reset}`);
//     process.exit(1);
//   } else {
//     console.log(`${colors.green}✅ All pages have translations!${colors.reset}`);
//     process.exit(0);
//   }
// }

// main();
