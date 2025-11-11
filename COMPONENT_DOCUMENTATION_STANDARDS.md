# Component Documentation Standards

This document outlines the standards for creating component documentation pages in the Noor UI design system.

## Required Sections

Every component documentation page must include the following sections in this order:

1. **Breadcrumb navigation**
2. **Page Header** (title, badge if new, description)
3. **Preview** (basic usage example)
4. **Features** (grid of feature cards)
5. **Examples** (tabs with different variations)
6. **Props** (props table)
7. **Best Practices** (Alert component with bulleted list)
8. **Accessibility** (Card with checkmarks)

## Code Examples Standard

### Required Imports

**ALL code examples must include these imports at the top:**

```typescript
'use client'

import * as React from 'react'
import { ComponentName } from '@/components/ui/component-name'
```

### Why This Matters

- `'use client'` directive is required in Next.js 14 App Router for client-side components
- `import * as React from 'react'` is required when using `React.useState` or other React APIs
- Without these imports, users copying the code will get errors

### ✅ CORRECT Example

```typescript
code={`'use client'

import * as React from 'react'
import { FileUpload } from '@/components/ui/file-upload'

export default function Example() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <FileUpload
      onChange={setFiles}
      onUpload={(files) => console.log('Uploaded:', files)}
    />
  )
}`}
```

### ❌ INCORRECT Example

```typescript
// Missing 'use client' and React import
code={`import { FileUpload } from '@/components/ui/file-upload'

export default function Example() {
  const [files, setFiles] = React.useState<File[]>([])  // ❌ React is not defined!

  return (
    <FileUpload
      onChange={setFiles}
      onUpload={(files) => console.log('Uploaded:', files)}
    />
  )
}`}
```

## Bilingual Support Standard

### Required Pattern

All new components MUST support bilingual text (English and Arabic) that switches based on the `locale` from the `useDirection` hook.

### Implementation Pattern

```typescript
import { useDirection } from '@/components/providers/direction-provider'

export const ComponentName = () => {
  const { locale } = useDirection()

  // Define bilingual text
  const text = {
    en: {
      label: 'Label Text',
      placeholder: 'Enter text...',
      button: 'Click Here',
    },
    ar: {
      label: 'نص التسمية',
      placeholder: 'أدخل النص...',
      button: 'اضغط هنا',
    },
  }
  const t = text[locale]

  return (
    <div>
      <label>{t.label}</label>
      <input placeholder={t.placeholder} />
      <button>{t.button}</button>
    </div>
  )
}
```

### Why This Matters

When users switch from LTR to RTL mode, they should see:
- Layout mirroring (handled by Tailwind logical properties)
- **Text translation** (handled by this pattern)

Without bilingual text, RTL mode only mirrors the layout but keeps English text, which doesn't demonstrate the full bilingual capability.

## Component Naming Conventions

- Component files: `kebab-case.tsx` (e.g., `file-upload.tsx`, `user-menu.tsx`)
- Component names: `PascalCase` (e.g., `FileUpload`, `UserMenu`)
- Documentation pages: match component file name (e.g., `/components/file-upload/page.tsx`)

## Props Table

Always include a comprehensive props table using the `PropsTable` component:

```typescript
const propDefinitions = [
  {
    name: 'propName',
    type: 'string | number',
    defaultValue: '"default"',  // Optional
    description: 'Clear description of what this prop does',
  },
  // ... more props
]

<PropsTable props={propDefinitions} />
```

## Features Section

Use a grid of Card components to highlight 3-6 key features:

```typescript
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Feature Name</CardTitle>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">
      Feature description
    </CardContent>
  </Card>
  {/* ... more cards */}
</div>
```

## Examples Section

Use Tabs component with 2-4 variations:

```typescript
<Tabs defaultValue="basic" className="space-y-6">
  <TabsList>
    <TabsTrigger value="basic">Basic</TabsTrigger>
    <TabsTrigger value="advanced">Advanced</TabsTrigger>
  </TabsList>

  <TabsContent value="basic" className="space-y-4">
    <p className="text-muted-foreground">Description of this variation.</p>
    <ComponentShowcase code={`...`}>
      <ComponentShowcase.Demo>
        {/* Live demo */}
      </ComponentShowcase.Demo>
    </ComponentShowcase>
  </TabsContent>
</Tabs>
```

## Accessibility Section

Always include accessibility features as a checklist:

```typescript
<Card>
  <CardContent className="pt-6">
    <ul className="space-y-3 text-sm text-muted-foreground">
      <li className="flex items-start gap-2">
        <span className="text-primary font-bold">✓</span>
        <span>Keyboard navigation support</span>
      </li>
      {/* ... more items */}
    </ul>
  </CardContent>
</Card>
```

## Best Practices Section

Use Alert component with Info icon:

```typescript
<Alert>
  <Info className="h-4 w-4" />
  <AlertDescription>
    <ul className="space-y-2 mt-2">
      <li className="flex items-start gap-2">
        <span className="text-primary font-bold">•</span>
        <span>Best practice description</span>
      </li>
      {/* ... more items */}
    </ul>
  </AlertDescription>
</Alert>
```

## Updating Component Status

When adding a new component, update these files:

1. **`/app/(docs)/components/page.tsx`**:
   - Add component to appropriate category with `status: 'ready'`
   - Update component count in page description

2. **`/lib/search-data.ts`**:
   - Add component with name, category, href, description, and keywords

## Checklist for New Component Documentation

- [ ] All code examples include `'use client'` directive
- [ ] All code examples include `import * as React from 'react'`
- [ ] Component implements bilingual text support
- [ ] Props table is complete and accurate
- [ ] 3-6 feature cards included
- [ ] 2-4 example variations with live demos
- [ ] Accessibility section with checkmarks
- [ ] Best practices section with bullet points
- [ ] Component status updated in `/app/(docs)/components/page.tsx`
- [ ] Component added to search data in `/lib/search-data.ts`

## Common Pitfalls to Avoid

1. ❌ Forgetting `'use client'` in code examples
2. ❌ Using `React.useState` without importing React
3. ❌ Only mirroring layout without providing bilingual text
4. ❌ Not updating component status from 'coming-soon' to 'ready'
5. ❌ Missing accessibility considerations
6. ❌ Code examples that won't run if copy-pasted

## Testing Your Documentation

Before considering documentation complete:

1. Copy a code example and paste it into a new file - does it work without modifications?
2. Switch to RTL mode - does the text change to Arabic?
3. Check keyboard navigation - can you use the component without a mouse?
4. Verify all props are documented in the props table
5. Ensure the component appears in the main components list with correct status
6. Test that the component appears in search results

---

Following these standards ensures consistency across all component documentation and provides users with working, copy-paste ready examples.
