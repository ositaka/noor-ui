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

---

## Link Validation System

### Overview

The link validation system checks all internal links in the codebase to ensure they point to existing pages. This prevents broken links from being deployed to production.

### Link Check Script

**Location**: `scripts/check-links.js`

**Purpose**: Validates that all internal links (href="/...") in the codebase point to actual page files.

#### Usage

```bash
# Run the link validation check manually
npm run check:links

# Run all validation checks (translations + links)
npm run check:all

# Build with validation checks (recommended)
npm run build

# Skip validation and build directly (not recommended)
npm run build:skip-checks
```

#### What it checks

The script:

1. **Finds all pages** in the `app/` directory by locating `page.tsx` files
2. **Extracts internal links** from all `.tsx` and `.jsx` files (looking for `href="/..."` patterns)
3. **Validates each link** by checking if it maps to an existing page
4. **Handles dynamic routes** like `/examples/[id]` automatically
5. **Reports broken links** with the files that contain them

#### Exit Codes

- **0**: All links are valid ✅
- **1**: Some links are broken ❌

#### Output Examples

**All links valid:**
```
🔗 Checking all internal links...

📄 Found 227 valid pages
🔗 Found 90 unique internal links

✅ All links are valid!

📊 Summary:
   Total links: 90
   Valid: 90 (100%)
   Broken: 0 (0%)
```

**Broken links found:**
```
🔗 Checking all internal links...

📄 Found 227 valid pages
🔗 Found 90 unique internal links

❌ Found 17 broken link(s):

  ✗ /about
    → app/(docs)/documentation/wcag/page.tsx
    → app/(docs)/components/separator/page.tsx

  ✗ /starters/blog-dashboard
    → app/(docs)/examples/blog-dashboard/page.tsx

📊 Summary:
   Total links: 90
   Valid: 73 (81%)
   Broken: 17 (19%)
```

### Build Integration

The link checker is integrated into the build process by default:

```json
{
  "scripts": {
    "build": "npm run check:all && next build",
    "build:skip-checks": "next build"
  }
}
```

This means:
- ✅ `npm run build` runs translation + link checks before building
- ✅ Build fails if any checks fail
- ✅ Catches broken links early in development
- ⚠️ Use `npm run build:skip-checks` only when necessary

### Common Broken Link Patterns

#### 1. Example/Placeholder Links

Often found in component documentation:

```tsx
// ❌ Broken link
<Link href="/about">About</Link>

// ✅ Fix: Use real page
<Link href="/documentation">Documentation</Link>

// ✅ Or use hash for examples
<a href="#">About (example)</a>
```

#### 2. Social Media Links

Should be external, not internal:

```tsx
// ❌ Wrong (treated as internal page)
<Link href="/github">GitHub</Link>

// ✅ Correct (external link)
<a
  href="https://github.com/username/repo"
  target="_blank"
  rel="noopener noreferrer"
>
  GitHub
</a>
```

#### 3. Dynamic Routes

Dynamic routes are handled automatically:

```tsx
// ✅ Valid if /examples/marketplace/[id]/page.tsx exists
<Link href="/examples/marketplace/123">Product 123</Link>
<Link href="/examples/marketplace/456">Product 456</Link>
```

#### 4. Missing Pages

```tsx
// ❌ Broken if page doesn't exist
<Link href="/starters/blog-dashboard">Blog Starter</Link>

// ✅ Fix: Create the page
// app/starters/blog-dashboard/page.tsx

// ✅ Or remove/update the link
<Link href="/examples/blog-dashboard">Blog Example</Link>
```

### Fixing Broken Links

1. **Run the check to identify broken links:**
   ```bash
   npm run check:links
   ```

2. **Review the output** to see which links are broken and where they're used

3. **Fix each broken link** by either:
   - Creating the missing page
   - Updating the link to point to an existing page
   - Changing internal links to external links (for social media, etc.)
   - Removing the link if no longer needed

4. **Verify the fixes:**
   ```bash
   npm run check:links
   # Should show: ✅ All links are valid!
   ```

5. **Run a full build:**
   ```bash
   npm run build
   # Should pass both translation and link checks
   ```

### Advanced Configuration

#### Ignoring Certain Links

If you have intentional placeholder links (e.g., in documentation examples), you can modify the script to skip them:

```javascript
// In scripts/check-links.js
const IGNORED_LINKS = [
  '/placeholder-example',
  '/demo-link',
]

function isValidLink(link, validPages) {
  // Skip ignored links
  if (IGNORED_LINKS.includes(link)) return true

  // ... rest of validation
}
```

#### Checking External Links

The current script only checks internal links. To add external link checking, you could:

1. Extract external links (starting with `http://` or `https://`)
2. Make HTTP HEAD requests to verify they exist
3. Report broken external links

This is more complex and slower, so it's kept separate from the fast internal link check.

### CI/CD Integration

Add to your CI/CD pipeline to catch broken links before deployment:

#### GitHub Actions

```yaml
jobs:
  link-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run check:links
```

#### Combined Checks

Run all checks together:

```yaml
- run: npm run check:all  # Runs translations + links
```

### Troubleshooting

**False positives for dynamic routes**

If a dynamic route is incorrectly flagged as broken:
- Verify the `[id]`, `[slug]`, or `[...slug]` page exists
- The script should handle these automatically
- Check the console output for the valid pages list

**Links in markdown/MDX files not detected**

The current script only checks `.tsx` and `.jsx` files. To add markdown support:
- Modify the `find` command to include `.md` and `.mdx` files
- Adjust the regex patterns to match markdown link syntax: `[text](/path)`

**Performance issues**

For very large codebases:
- The script uses `execSync` for simplicity
- Consider caching valid pages list
- Run incrementally during development

### Related Files

- `scripts/check-links.js` - Link validation script
- `LINK-CHECK-RESULTS.md` - Latest validation results with recommendations
- `package.json` - Scripts configuration
