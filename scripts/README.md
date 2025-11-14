# Visual Testing Scripts

This directory contains scripts for automated visual testing of the Noor UI components.

## Screenshot Script

The `screenshot.js` script captures screenshots of component showcase pages in both LTR (Left-to-Right) and RTL (Right-to-Left) modes.

### Prerequisites

Before running the screenshot script, ensure you have:

1. **Installed dependencies**:
   ```bash
   npm install
   ```

2. **Installed Playwright browsers** (first time only):
   ```bash
   npx playwright install chromium --with-deps
   ```

3. **Started the dev server** (in a separate terminal):
   ```bash
   npm run dev
   ```

### Usage

#### Screenshot All Components

To capture screenshots of all components:

```bash
npm run screenshot
```

This will:
- Screenshot all components listed in `scripts/screenshot.js`
- Capture both LTR and RTL versions
- Save to `public/screenshots/components/[component-name]/`

#### Screenshot Specific Component

To capture screenshots of a single component:

```bash
npm run screenshot:component button
npm run screenshot:component select
npm run screenshot:component slider
```

### Output

Screenshots are saved to:
```
public/screenshots/components/
├── button/
│   ├── button-ltr.png
│   └── button-rtl.png
├── select/
│   ├── select-ltr.png
│   └── select-rtl.png
└── ...
```

These screenshots:
- ✅ Are stored in version control
- ✅ Can be used in documentation
- ✅ Serve as visual regression tests
- ✅ Demonstrate RTL/LTR behavior for your portfolio

### Configuration

You can modify the following settings in `scripts/screenshot.js`:

- **Viewport size**: Default is 1280x800 (desktop)
- **Base URL**: Default is http://localhost:3000
- **Components list**: Add new components to the `ALL_COMPONENTS` array

### Workflow

When building new components:

1. Build the component and documentation page
2. Start the dev server: `npm run dev`
3. Run screenshots: `npm run screenshot:component [name]`
4. Review the generated images in `public/screenshots/components/[name]/`
5. If issues found, fix and re-run
6. Commit the screenshots along with your component code

### Troubleshooting

**Error: "Page crashed"**
- Make sure Playwright browsers are installed: `npx playwright install chromium --with-deps`
- On Linux, you may need additional system dependencies

**Error: "Failed to connect"**
- Ensure the dev server is running on port 3000
- Check that the component page exists at `/components/[name]`

**Screenshots are blank**
- The page might need more time to render
- Try increasing the wait timeout in the script

### Available Components

Current components that can be screenshot:
- button
- card
- input
- label
- badge
- separator
- checkbox
- radio-group
- textarea
- select
- switch
- slider

Add new components to the `ALL_COMPONENTS` array in `screenshot.js`.

---

## Translation Validation System

### Overview

The translation validation system ensures that ALL `page.tsx` files have bilingual (English/Arabic) translations. This prevents untranslated pages from being committed to the repository.

### Translation Check Script

**Location**: `scripts/check-translations.js`

**Purpose**: Validates that all `page.tsx` files import and use the translation utilities from `@/lib/i18n`.

#### Usage

```bash
# Run the validation check manually
npm run check:translations
```

#### What it checks

The script verifies that each `page.tsx` file contains:

1. **Import of `useDirection`**:
   ```typescript
   import { useDirection } from '@/components/providers/direction-provider'
   ```

2. **Import of `content`**:
   ```typescript
   import { content } from '@/lib/i18n'
   ```

#### Exit Codes

- **0**: All pages have translations ✅
- **1**: Some pages are missing translations ❌

#### Output

The script provides:
- List of translated pages (green ✓)
- List of pages missing translations (red ✗)
- Summary statistics with percentages
- Detailed error message when validation fails

### Pre-Commit Hook

**Location**: `.git/hooks/pre-commit`

**Purpose**: Automatically runs the translation check before each commit to prevent untranslated pages from being committed.

#### Behavior

- Runs automatically on `git commit`
- Blocks commit if any pages are missing translations
- Provides clear error messages and fix instructions
- Can be bypassed with `git commit --no-verify` (not recommended)

#### Example Output

```
🔍 Checking for translation imports in all pages...

✅ TRANSLATED PAGES (26):
  ✓ app/(docs)/components/button/page.tsx
  ...

❌ MISSING TRANSLATIONS (86):
  ✗ app/(docs)/components/calendar/page.tsx
  ...

❌ Commit blocked: Some pages are missing translation imports!
💡 To fix: Add 'useDirection' and 'content' imports to the files listed above.
```

### Adding Translations to a Page

To add translations to a new or existing page:

1. **Add translations to `lib/i18n.ts`**:
   ```typescript
   // In content.en
   myPage: {
     title: 'My Page',
     description: 'Page description',
     // ... other strings
   }

   // In content.ar (mirror the structure)
   myPage: {
     title: 'صفحتي',
     description: 'وصف الصفحة',
     // ... other strings
   }
   ```

2. **Import and use in your page component**:
   ```typescript
   import { useDirection } from '@/components/providers/direction-provider'
   import { content } from '@/lib/i18n'

   export default function MyPage() {
     const { locale } = useDirection()
     const t = content[locale]

     return (
       <div>
         <h1>{t.myPage.title}</h1>
         <p>{t.myPage.description}</p>
       </div>
     )
   }
   ```

3. **Verify translations work**:
   ```bash
   npm run check:translations
   npm run build
   ```

### CI/CD Integration

To add this check to your CI/CD pipeline:

#### GitHub Actions

Add to your workflow file (e.g., `.github/workflows/ci.yml`):

```yaml
jobs:
  translation-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run check:translations
```

#### Other CI Systems

Simply add `npm run check:translations` to your test/validation pipeline.

### Troubleshooting

**Hook not running**

If the pre-commit hook doesn't run:

```bash
# Make sure the hook is executable
chmod +x .git/hooks/pre-commit

# Verify it exists
ls -la .git/hooks/pre-commit
```

**False positives**

If a page is incorrectly flagged as missing translations:

1. Verify both `useDirection` and `content` are imported
2. Check import syntax matches exactly: `from '@/lib/i18n'`
3. Run script with verbose output for debugging

**Bypassing the check**

Only bypass the pre-commit hook if absolutely necessary:

```bash
git commit --no-verify -m "Your commit message"
```

**Note**: This is NOT recommended as it defeats the purpose of ensuring translations.
