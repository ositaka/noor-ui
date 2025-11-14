# i18n Structure

This directory contains all internationalization (i18n) content for the application, organized into a split file structure for better maintainability.

## Structure

```
lib/i18n/
├── index.ts              # Main entry point - combines all sections
├── types.ts              # TypeScript type definitions (Locale)
├── en/                   # English translations
│   ├── index.ts          # Auto-generated - combines all EN sections
│   ├── common.ts         # Nav, UI, common elements
│   ├── home.ts           # Homepage content
│   ├── documentation.ts  # Documentation pages (11 pages)
│   ├── themes.ts         # Theme-related content
│   ├── gcc.ts            # GCC-specific content
│   ├── examples.ts       # Examples listing
│   ├── getting-started.ts
│   ├── components-meta.ts
│   ├── components-basic.ts      # Basic components (button, card, input, etc.)
│   ├── components-forms.ts      # Form components (checkbox, switch, radio, etc.)
│   ├── components-data.ts       # Data components (table, pagination, tabs, etc.)
│   ├── components-overlay.ts    # Overlay components (dialog, popover, sheet, etc.)
│   ├── components-advanced.ts   # Advanced components (calendar, file upload, etc.)
│   └── components-misc.ts       # Miscellaneous (avatar, alert)
└── ar/                   # Arabic translations (mirrors en/ structure)
    └── (same file structure as en/)
```

## Rules and Guidelines

### 1. **NEVER merge back into a single file**
   - The split structure is intentional for maintainability
   - Each file should remain under 600 lines
   - Old monolithic file is backed up as `lib/i18n.ts.monolithic.backup`

### 2. **Maintain parallel structure**
   - English (`en/`) and Arabic (`ar/`) must have identical file structures
   - Every section in `en/` must have a matching section in `ar/`
   - Same keys, same nesting structure

### 3. **Adding new translations**
   - Add to BOTH `en/[section].ts` AND `ar/[section].ts`
   - Keep the same object structure and key names
   - Update both language index files if needed

### 4. **File organization**
   - `common.ts`: Navigation, UI elements, shared strings
   - `home.ts`: Homepage-specific content
   - `documentation.ts`: All documentation pages (RTL guide, WCAG, etc.)
   - `components-*.ts`: Component documentation grouped by category
   - `examples.ts`: Example listings and metadata
   - `themes.ts`, `gcc.ts`, etc.: Feature-specific content

### 5. **Regenerating from monolithic file**
   - Use `scripts/split-i18n-smart.js` to regenerate the split structure
   - Only run when major restructuring is needed
   - The script extracts sections using brace-matching logic

### 6. **Translation quality**
   - Arabic translations should be meaningful, not just English text in Arabic section
   - Maintain RTL-appropriate phrasing and sentence structure
   - Keep technical terms (like "Next.js", "WCAG") in English when appropriate

### 7. **Type safety**
   - The main `index.ts` re-exports everything
   - Types are inferred from the English structure
   - No need to duplicate type definitions

## Usage

Import from the main entry point:

```typescript
import { content, type Locale } from '@/lib/i18n'

// Access translations
const { locale } = useDirection()
const t = content[locale].nav
```

## Maintenance

- Each language file is auto-generated from the original structure
- The `en/index.ts` and `ar/index.ts` files combine their respective sections
- Main `index.ts` combines both languages into the `content` export

## File Sizes

Total: ~8,400 lines split across 32 files
- Largest files: ~600 lines (components-advanced)
- Smallest files: ~15 lines (getting-started)
- Average: ~250 lines per file

This structure significantly improves:
- Code navigation
- Git merge conflicts reduction
- Editor performance
- Maintainability
