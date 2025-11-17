#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Common translations that appear across multiple files
const commonReplacements = {
  // Navigation
  "{isRTL ? 'الرئيسية' : 'Home'}": "t.breadcrumb.home",
  "{isRTL ? 'الأمثلة' : 'Examples'}": "t.breadcrumb.examples",

  // Common buttons
  "{isRTL ? 'تعديل' : 'Edit'}": "t.profile.edit",
  "{isRTL ? 'إلغاء' : 'Cancel'}": "t.profile.cancel",
  "{isRTL ? 'حفظ التغييرات' : 'Save Changes'}": "t.profile.saveChanges",
  "{isRTL ? 'حفظ' : 'Save'}": "content[locale].ui.button.save",

  // Common labels
  "{isRTL ? 'البريد الإلكتروني' : 'Email'}": "content[locale].ui.form.email",
  "{isRTL ? 'رقم الهاتف' : 'Phone Number'}": "content[locale].ui.form.phone",
};

// Files to process
const filesToFix = [
  'app/examples/registration/page.tsx',
  'app/(docs)/examples/marketplace/checkout/page.tsx',
  'app/examples/cms/page.tsx',
  'app/(docs)/examples/marketplace/orders/page.tsx',
  // Add more as needed
];

function fixFile(filePath) {
  const fullPath = path.join('/Users/nunomarques/Desktop/claude-code-bidirectional', filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let changeCount = 0;

  // Apply common replacements
  for (const [pattern, replacement] of Object.entries(commonReplacements)) {
    const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = (content.match(regex) || []).length;
    if (matches > 0) {
      content = content.replace(regex, replacement);
      changeCount += matches;
    }
  }

  if (changeCount > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed ${changeCount} replacements in ${filePath}`);
  } else {
    console.log(`No changes needed in ${filePath}`);
  }
}

// Process all files
filesToFix.forEach(fixFile);

console.log('Done!');
