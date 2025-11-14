# Validation System Documentation

**Last Updated:** 2025-11-14

---

## Overview

The Noor UI codebase now includes a comprehensive validation system that runs automatically during the build process to ensure code quality and prevent common issues.

---

## Validation Checks

### 1. Translation Coverage Check ✅

**Status:** 100% Coverage (113/113 pages)

**Purpose:** Ensures all pages have bilingual (English/Arabic) translation support.

**Script:** `scripts/check-translations.js`

**Command:**
```bash
npm run check:translations
```

**What it validates:**
- All `page.tsx` files import `useDirection` from `@/components/providers/direction-provider`
- All `page.tsx` files import `content` from `@/lib/i18n`

**Result:**
```
✅ All pages have translations!
   Total pages: 113
   Translated: 113 (100%)
   Missing: 0 (0%)
```

---

### 2. Link Validation Check ⚠️

**Status:** 17 Broken Links Found (19%)

**Purpose:** Ensures all internal links point to existing pages.

**Script:** `scripts/check-links.js`

**Command:**
```bash
npm run check:links
```

**What it validates:**
- Extracts all internal links (`href="/..."`) from `.tsx` and `.jsx` files
- Verifies each link points to an actual `page.tsx` file
- Handles dynamic routes (`[id]`, `[slug]`) automatically
- Reports broken links with file locations

**Result:**
```
⚠️ Found 17 broken links
   Total links: 90
   Valid: 73 (81%)
   Broken: 17 (19%)
```

**Broken Link Summary:**
- 12 example/placeholder links (in documentation)
- 3 social media links (should be external)
- 2 missing starter pages

**See:** `LINK-CHECK-RESULTS.md` for detailed breakdown and fixes

---

## Build Integration

### Current Build Process

```json
{
  "scripts": {
    "build": "npm run check:all && next build",
    "build:skip-checks": "next build",
    "check:all": "npm run check:translations && npm run check:links",
    "check:translations": "node scripts/check-translations.js",
    "check:links": "node scripts/check-links.js"
  }
}
```

### Build Flow

```
npm run build
    ↓
npm run check:all
    ↓
├─→ check:translations (✅ PASS - 100%)
│       ↓
└─→ check:links (❌ FAIL - 81%)
        ↓
    [BUILD BLOCKED]
```

**Note:** Build is currently blocked by broken links. To build anyway, use:
```bash
npm run build:skip-checks
```

---

## Usage

### Run All Checks

```bash
npm run check:all
```

Runs both translation and link validation checks in sequence.

### Run Individual Checks

```bash
# Check translations only
npm run check:translations

# Check links only
npm run check:links
```

### Build with Checks (Default)

```bash
npm run build
```

Runs all validation checks before building. Build fails if any check fails.

### Build Without Checks (Not Recommended)

```bash
npm run build:skip-checks
```

Skips validation and builds directly. Only use when necessary.

---

## Pre-Commit Hook

### Translation Check Hook

**Location:** `.git/hooks/pre-commit`

**Status:** ✅ Active

**Behavior:**
- Automatically runs before each commit
- Blocks commit if any pages are missing translations
- Can be bypassed with `git commit --no-verify` (not recommended)

**Example:**
```bash
git commit -m "Add new feature"

# Hook runs automatically:
🔍 Checking for translation imports in all pages...
✅ All pages have translations!
[main abc1234] Add new feature
```

### Link Check Hook

**Status:** Not yet implemented

**Recommendation:** Could be added to pre-commit hook or kept as build-time check only.

---

## CI/CD Integration

### GitHub Actions Example

Add to `.github/workflows/ci.yml`:

```yaml
name: CI

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run validation checks
        run: npm run check:all

      - name: Build
        run: npm run build:skip-checks  # Already ran checks above
```

### Benefits

- ✅ Catches issues before they reach production
- ✅ Prevents broken links in deployed site
- ✅ Ensures consistent bilingual support
- ✅ Fails fast in CI/CD pipeline

---

## Next Steps

### To Pass All Checks

1. **Fix broken links** (see `LINK-CHECK-RESULTS.md` for details):
   - Update example links in documentation to use real pages
   - Convert social media links to external URLs
   - Create missing starter pages or update links

2. **Verify fixes:**
   ```bash
   npm run check:links
   ```

3. **Run full validation:**
   ```bash
   npm run check:all
   ```

4. **Build successfully:**
   ```bash
   npm run build
   ```

### Optional Improvements

1. **Add link check to pre-commit hook** (like translation check)
2. **Create ignore list** for intentional placeholder links
3. **Add external link checking** (validate external URLs exist)
4. **Add to CI/CD pipeline** (GitHub Actions, etc.)

---

## Troubleshooting

### Build Fails with "Broken Links"

**Solution:** Run `npm run check:links` to see which links are broken, then fix them.

**Temporary workaround:**
```bash
npm run build:skip-checks
```

### Pre-Commit Hook Not Running

```bash
# Make hook executable
chmod +x .git/hooks/pre-commit

# Verify it exists
ls -la .git/hooks/pre-commit
```

### False Positives

If a link is incorrectly flagged as broken:
- Verify the page file exists at the expected path
- Check for typos in the link
- Ensure dynamic route pages use correct pattern (`[id]`, `[slug]`)

---

## Benefits

### For Development

- ✅ Immediate feedback on broken links
- ✅ Catches issues locally before push
- ✅ Maintains translation coverage at 100%
- ✅ Prevents regression

### For Production

- ✅ No broken internal links deployed
- ✅ Consistent bilingual experience
- ✅ Better SEO (no 404s from internal links)
- ✅ Professional quality assurance

### For Team

- ✅ Automated enforcement of standards
- ✅ Clear error messages and fix instructions
- ✅ Documentation of validation results
- ✅ Consistent code quality across contributors

---

## Scripts Reference

| Script | Purpose | Exit Code |
|--------|---------|-----------|
| `npm run check:translations` | Validate translation coverage | 0 = pass, 1 = fail |
| `npm run check:links` | Validate internal links | 0 = pass, 1 = fail |
| `npm run check:all` | Run all validation checks | 0 = pass, 1 = fail |
| `npm run build` | Check + build (recommended) | 0 = pass, 1 = fail |
| `npm run build:skip-checks` | Build without checks | 0 = pass, 1 = fail |

---

## Documentation Files

- `scripts/README.md` - Detailed script documentation
- `LINK-CHECK-RESULTS.md` - Latest link validation results with fixes
- `TRANSLATION-IMPORTS-COMPLETE.md` - Translation coverage achievement
- `VALIDATION-SYSTEM.md` - This file (system overview)

---

## Achievements

- ✅ **Translation Coverage:** 100% (113/113 pages)
- ⚠️ **Link Validation:** 81% (73/90 links)
- ✅ **Pre-commit Hook:** Active and enforcing
- ✅ **Build Integration:** Automated validation
- ✅ **Documentation:** Complete and up-to-date

**Next Milestone:** Fix remaining 17 broken links to achieve 100% link validation ✨
