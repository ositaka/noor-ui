# i18n - Scalable Translation System

## 🎯 Structure (Option B Implementation)

Split by **language + section** for maximum scalability and editability.

```
lib/i18n/
├── index.ts              # Main export (backward compatible)
├── en/
│   ├── index.ts          # English merger
│   ├── common.ts         # Nav, UI, common (2.4 KB, ~800 tokens)
│   ├── home.ts           # Homepage (1.7 KB, ~600 tokens)
│   ├── themes.ts         # Themes (2.7 KB, ~900 tokens)
│   ├── documentation.ts  # Documentation pages (25.6 KB, ~8.5K tokens)
│   ├── getting-started.ts
│   ├── gcc.ts
│   ├── examples.ts
│   ├── components-meta.ts
│   ├── components-basic.ts      # Button, Card, Input, etc.
│   ├── components-forms.ts      # Form, Checkbox, Radio, etc.
│   ├── components-data.ts       # Table, Pagination, etc.
│   ├── components-overlay.ts    # Dialog, Popover, etc.
│   ├── components-advanced.ts   # Calendar, DatePicker, etc.
│   └── components-misc.ts
└── ar/
    ├── index.ts          # Arabic merger
    ├── common.ts         # (2.5 KB, ~850 tokens)
    ├── home.ts
    ├── themes.ts
    ├── documentation.ts  # ⚠️ Incomplete - missing 12 sections
    ├── getting-started.ts
    ├── gcc.ts
    ├── examples.ts
    ├── components-meta.ts
    ├── components-basic.ts
    ├── components-forms.ts
    ├── components-data.ts
    ├── components-overlay.ts
    ├── components-advanced.ts
    └── components-misc.ts
```

## ✅ Benefits

### 1. **All Files Editable** ✓
- **Largest file**: `en/documentation.ts` (25.6 KB, ~8.5K tokens)
- **Well under** the 25K token limit
- Can edit any file completely in Claude Code

### 2. **Scalable** ✓
- Add new components? Just edit the relevant components-*.ts file
- Add new docs? Edit documentation.ts
- Easy to find what you need

### 3. **Backward Compatible** ✓
- All existing code works without changes
- `import { content } from '@/lib/i18n'` still works
- No migration needed

### 4. **Easy to Maintain** ✓
- Clear file organization
- Related translations grouped together
- Auto-generated from script (can re-run if needed)

## 📊 File Size Stats

**English**: 14 files, 3,221 lines total
**Arabic**: 14 files, 2,905 lines total

All files are **well under the 25K token limit**:
- Smallest: `gcc.ts` (~300 bytes)
- Largest: `documentation.ts` (~25 KB)
- Average: ~1,800 bytes per file

## 🚀 Usage

### For Developers
No changes needed! Import works the same:

```typescript
import { content } from '@/lib/i18n'
import { useDirection } from '@/components/providers/direction-provider'

function MyComponent() {
  const { locale } = useDirection()
  const t = content[locale]

  return <h1>{t.home.hero.title}</h1>
}
```

### For Translators
Edit individual files based on what you're translating:

- **Adding button labels?** → Edit `en/components-basic.ts` and `ar/components-basic.ts`
- **Updating homepage?** → Edit `en/home.ts` and `ar/home.ts`
- **Adding documentation?** → Edit `en/documentation.ts` and `ar/documentation.ts`

## ⚠️ Missing Arabic Translations

The following sections need Arabic translation in `ar/documentation.ts`:

- `documentationPages` (main docs navigation)
- `installation` guide
- `quickStart` guide
- `configuration` guide
- `bidi` (bidirectional text docs)
- `arabic` (Arabic typography docs)
- `keyboard` (keyboard navigation)
- `screenReaders`
- `wcag` (accessibility compliance)
- `designTokens`
- `accessibilitySection`
- `main`

## 🔧 Re-generating Files

If you edit the original `i18n.ts.archive`, re-run:

```bash
node scripts/split-i18n-smart.js
```

This will regenerate all split files.

## 📝 Adding New Translations

### Option 1: Edit Split Files Directly (Recommended)
1. Open the relevant file (e.g., `en/home.ts`)
2. Add your translation
3. Repeat for other language (e.g., `ar/home.ts`)
4. Done! Build will pick it up automatically

### Option 2: Add to Archive & Re-split
1. Edit `lib/i18n.ts.archive`
2. Run `node scripts/split-i18n-smart.js`
3. Commit the generated files

## 🎉 Result

**Before**: 1 file, 6,173 lines, 81K tokens ❌ (too large to edit)
**After**: 28 files, ~6K lines total, max 8.5K tokens per file ✅ (all editable!)

This is now **truly scalable** and ready for growth!
