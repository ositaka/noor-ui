<!-- CASE STUDY DOCUMENT - DO NOT DELETE -->
<!-- This is source material for blog posts and educational content -->

# 📦 NPM Package Strategy & Implementation Guide

## ⚠️ IMPORTANT: When to Use This Guide

**DO NOT package yet!** Use this guide when you've completed:
- ✅ Built 2+ demo projects using the components
- ✅ Refined component APIs based on real usage
- ✅ Stabilized component structure (no major breaking changes expected)
- ✅ Have comprehensive documentation

**Why wait?** Packaging too early = painful refactors and version management hell.

**Expected timeline:** Phase 3 (after 3-4 months of building demos)

---

## 🎯 Package Goals

Create an NPM package that developers can:
- Install easily: `npm install @[name]/components`
- Import components: `import { Button, Card } from '@[name]/components'`
- Use with TypeScript (full type safety)
- Customize with Tailwind (no CSS conflicts)
- Use in any React 18+ project

---

## 🏗️ Architecture Decision: Monorepo vs Separate Repos

### **Recommended: Monorepo with Turborepo**

**Structure:**
```
[name]/
├── apps/
│   ├── docs/              # Documentation site (current project)
│   ├── demo-blog/         # Blog demo
│   └── demo-real-estate/  # Real estate demo
├── packages/
│   ├── components/        # Main component library
│   ├── icons/             # Icon components (optional)
│   ├── hooks/             # Shared React hooks
│   └── utils/             # Utility functions
├── package.json           # Root package.json
├── turbo.json            # Turborepo config
└── pnpm-workspace.yaml   # pnpm workspaces
```

**Why monorepo:**
- ✅ Share components between demos and docs
- ✅ Single source of truth
- ✅ Easy to test changes across all demos
- ✅ Better developer experience
- ❌ More complex initial setup

**Alternative: Separate Repos** (simpler but less flexible)
- `[name]-components` repo → NPM package
- `[name]-docs` repo → Documentation site
- `demo-blog` repo → Blog demo
- Etc.

---

## 📦 Package Setup (Step-by-Step)

### Step 1: Create Package Directory

```bash
# If starting fresh (monorepo):
mkdir packages
mkdir packages/components
cd packages/components
npm init -y

# Or if converting current project:
# Keep current structure, we'll adjust package.json
```

### Step 2: Configure package.json

```json
{
  "name": "@[name]/components",
  "version": "0.1.0",
  "description": "RTL-first React component library for bilingual applications",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/index.css"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.344.0",
    "tailwind-merge": "^2.2.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.19",
    "@types/react": "^18.2.56",
    "@types/react-dom": "^18.2.19",
    "tsup": "^8.0.2",
    "typescript": "^5.3.3",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35"
  },
  "keywords": [
    "react",
    "components",
    "ui",
    "rtl",
    "arabic",
    "bilingual",
    "design-system",
    "tailwindcss"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/[username]/[name]"
  },
  "bugs": {
    "url": "https://github.com/[username]/[name]/issues"
  },
  "homepage": "https://[name].com"
}
```

---

### Step 3: Configure Build Tool (tsup)

Create `tsup.config.ts`:

```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  inject: ['./react-shim.js'], // For automatic React import
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
})
```

Create `react-shim.js`:

```javascript
import * as React from 'react'
export { React }
```

---

### Step 4: Create Entry Point

Create `src/index.tsx`:

```typescript
// Core UI Components
export { Button } from './components/ui/button'
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
export { Input } from './components/ui/input'
export { Label } from './components/ui/label'
export { Badge } from './components/ui/badge'
export { Alert, AlertDescription, AlertTitle } from './components/ui/alert'
export { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
export { Checkbox } from './components/ui/checkbox'
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
export { Switch } from './components/ui/switch'
export { Textarea } from './components/ui/textarea'
export { Slider } from './components/ui/slider'
export { Progress } from './components/ui/progress'
export { Separator } from './components/ui/separator'
export { Skeleton } from './components/ui/skeleton'
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion'
export { Collapsible, CollapsibleContent, CollapsibleTrigger } from './components/ui/collapsible'

// Advanced Components
export { DataTable, type ColumnDef, type SortDirection } from './components/ui/data-table'
export { Calendar } from './components/ui/calendar'
export { HijriDate } from './components/ui/hijri-date'
export { PrayerTimes } from './components/ui/prayer-times'
export { ZakatCalculator } from './components/ui/zakat-calculator'
export { ArabicNumber } from './components/ui/arabic-number'

// Overlays
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
export { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from './components/ui/drawer'
export { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover'
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip'
export { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet'

// Feedback
export { toast, useToast } from './components/ui/use-toast'
export { Toaster } from './components/ui/toaster'

// Navigation
export { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './components/ui/pagination'

// Command
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './components/ui/command'

// Context & Dropdown Menus
export { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from './components/ui/context-menu'
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu'

// Dashboard Components (Phase 1+)
export { DashboardShell } from './components/dashboard/dashboard-shell'
export { UserMenu } from './components/dashboard/user-menu'
export { NotificationCenter } from './components/dashboard/notification-center'
export { StatsCard } from './components/dashboard/stats-card'

// New Components (Phase 1)
export { FileUpload } from './components/ui/file-upload'
export { RichTextEditor } from './components/ui/rich-text-editor'
export { EmptyState } from './components/ui/empty-state'
export { SearchInput } from './components/ui/search-input'

// Utilities
export { cn } from './lib/utils'
export { DirectionProvider, useDirection } from './components/providers/direction-provider'
export { ThemeProvider } from './components/providers/theme-provider'

// Types
export type { ButtonProps } from './components/ui/button'
export type { CardProps } from './components/ui/card'
export type { InputProps } from './components/ui/input'
// ... export more types as needed
```

---

### Step 5: Build the Package

```bash
# Build once
npm run build

# Watch mode during development
npm run dev
```

**Output structure:**
```
dist/
├── index.js        # CommonJS
├── index.mjs       # ES Modules
├── index.d.ts      # TypeScript types
└── index.css       # Compiled Tailwind (optional)
```

---

### Step 6: Test Locally Before Publishing

```bash
# In your package directory
npm link

# In your demo project
cd ../apps/demo-blog
npm link @[name]/components

# Test the import
import { Button } from '@[name]/components'
```

---

### Step 7: Publish to NPM

```bash
# First time: Login to NPM
npm login

# Publish
npm publish --access public

# For scoped packages, ensure public access
```

---

## 📝 Package Documentation

### Create README.md

```markdown
# @[name]/components

Beautiful, accessible, RTL-first React components for bilingual applications.

## Installation

```bash
npm install @[name]/components
```

## Usage

```tsx
import { Button, Card } from '@[name]/components'
import '@[name]/components/styles.css'

function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}
```

## Setup

1. Install Tailwind CSS in your project
2. Add to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    './node_modules/@[name]/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of config
}
```

3. Wrap your app with providers:

```tsx
import { DirectionProvider, ThemeProvider } from '@[name]/components'

function App() {
  return (
    <ThemeProvider>
      <DirectionProvider>
        {/* Your app */}
      </DirectionProvider>
    </ThemeProvider>
  )
}
```

## Documentation

Full documentation at [https://[name].com](https://[name].com)

## License

MIT
```

---

## 🔄 Versioning Strategy

### Semantic Versioning (semver)

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes

### Release Schedule

**Phase 3 (Initial Release):**
- Start at `0.1.0` (pre-1.0 = experimental)
- Increment minor for new components: `0.2.0`, `0.3.0`
- Don't worry too much about breaking changes pre-1.0

**Phase 4 (Stable):**
- Release `1.0.0` when APIs are stable
- Be careful with breaking changes
- Document migration guides for major versions

### Changelogs

Use conventional commits and auto-generate changelogs:

```bash
npm install -D @changesets/cli
npx changeset init
```

---

## 🚀 Publishing Workflow

### Manual Publishing

```bash
# 1. Update version
npm version patch  # or minor, or major

# 2. Build
npm run build

# 3. Publish
npm publish

# 4. Tag in git
git push --tags
```

### Automated Publishing (GitHub Actions)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 🧪 Testing Strategy

### Before Each Release

1. **Build test:** `npm run build` succeeds
2. **Type check:** `npm run type-check` passes
3. **Lint:** `npm run lint` passes
4. **Integration test:** Install in a fresh project and import components
5. **Demo projects:** Ensure all demo projects still work with new version

---

## 📊 Package Metrics to Track

Monitor these via npm:
- Weekly downloads
- GitHub stars
- Open issues
- Pull requests
- Package size (keep under 500KB)

---

## 🎯 Maintenance Plan

### Regular Tasks
- **Weekly:** Respond to issues
- **Bi-weekly:** Review PRs
- **Monthly:** Dependency updates
- **Quarterly:** Major feature releases

### Deprecation Policy
- Announce deprecations 3 months in advance
- Provide migration guides
- Keep deprecated features for 2 major versions

---

## 🚨 Common Pitfalls to Avoid

### ❌ DON'T:
- Publish too early (wait until APIs are stable)
- Include node_modules in package (use .npmignore)
- Forget to build before publishing
- Make breaking changes in minor versions (after 1.0)
- Include demo/example code in package

### ✅ DO:
- Test in real projects before publishing
- Write clear migration guides
- Keep package size small
- Document all breaking changes
- Use semantic versioning properly

---

## 📦 Alternative: GitHub Packages

If you want to keep it semi-private initially:

```json
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
}
```

Users install with:
```bash
npm install @[username]/[name]
```

---

## 🎓 Learning Resources

- [Creating and Publishing NPM Packages](https://docs.npmjs.com/packages-and-modules)
- [tsup Documentation](https://tsup.egoist.dev)
- [Turborepo Guide](https://turbo.build/repo/docs)
- [Changesets for Version Management](https://github.com/changesets/changesets)

---

*Last Updated: 2025-11-10*
*Use this guide when ready for Phase 3 (after building 2+ demo projects)*
