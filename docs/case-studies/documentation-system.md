<!-- CASE STUDY DOCUMENT - DO NOT DELETE -->
<!-- This is source material for blog posts and educational content -->

# Component Documentation Standards

This document outlines the standards for creating component documentation pages in the Noor UI design system.

## Required Sections

Every component documentation page must include the following sections in this order:

1. **Breadcrumb navigation**
2. **Page Header** (title, badge if new, description)
3. **Preview** (basic usage example with ComponentShowcase)
4. **Usage** (basic code example with CodeBlock)
5. **Features** (grid of feature cards - optional but recommended)
6. **Examples** (multiple variations using the standard pattern)
7. **Props** (props table)
8. **Best Practices** (Alert component with bulleted list - optional)
9. **Accessibility** (Card with checkmarks)

## Code Block Theme Standard

**IMPORTANT: All code blocks ALWAYS use dark theme regardless of the app's light/dark mode.**

### Why Dark Theme for Code Blocks?

- Better syntax highlighting visibility
- Reduced eye strain when reading code
- Industry standard for documentation (GitHub, MDN, etc.)
- Consistent experience across all themes

### Implementation

The `CodeBlock` component automatically uses the VS Code Dark Plus theme for all code examples. You don't need to do anything special - just use the component as normal:

```tsx
<CodeBlock code={exampleCode} language="tsx" collapsible />
```

The dark theme is applied automatically regardless of whether the user has light mode or dark mode enabled for the rest of the app.

## Theme and System Preference

The app respects the user's system preference by default:
- `defaultTheme` is set to `"system"`
- `enableSystem` is set to `true`
- If the user's OS is in dark mode, the app will be dark
- If the user's OS is in light mode, the app will be light
- Users can override this preference using the theme toggle

**Code blocks remain dark in both themes.**

## Page Structure Pattern

**IMPORTANT: DO NOT use Tabs component for examples!** Use the pattern below.

### Correct Structure

```tsx
'use client'

import * as React from 'react'
import Link from 'next/link'
import { ComponentShowcase } from '@/components/docs/component-showcase'
import { PropsTable } from '@/components/docs/props-table'
import { CodeBlock } from '@/components/docs/code-block'
import { YourComponent } from '@/components/ui/your-component'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

// 1. Define prop definitions
const propDefinitions = [
  {
    name: 'propName',
    type: 'string',
    defaultValue: '"default"',
    description: 'Description here',
  },
]

// 2. Define all code examples as constants
const basicUsageCode = `'use client'

import * as React from 'react'
import { YourComponent } from '@/components/ui/your-component'

export default function Example() {
  return <YourComponent />
}`

const exampleVariationCode = `'use client'

import * as React from 'react'
import { YourComponent } from '@/components/ui/your-component'

export default function Example() {
  return <YourComponent variant="secondary" />
}`

// 3. Component function
export default function YourComponentPage() {
  return (
    <div className="min-h-screen">
      <main id="main-content" className="container py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/components" className="hover:text-foreground transition-colors">
                Components
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">Your Component</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold tracking-tight">Your Component</h1>
            <Badge variant="default">New</Badge>
          </div>
          <p className="text-xl text-muted-foreground">
            Component description here.
          </p>
        </div>

        {/* Preview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Preview</h2>
          <ComponentShowcase>
            <ComponentShowcase.Demo>
              <YourComponent />
            </ComponentShowcase.Demo>
          </ComponentShowcase>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
          <CodeBlock code={basicUsageCode} language="tsx" title="React" />
        </section>

        {/* Features (Optional) */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Feature Name</h3>
                <p className="text-sm text-muted-foreground">
                  Feature description
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Examples - CRITICAL: Use this pattern, NOT Tabs! */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

          <div className="space-y-8">
            {/* Example 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Example Title</h3>
              <Card>
                <CardContent className="p-6">
                  <YourComponent variant="secondary" />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={exampleVariationCode} language="tsx" collapsible />
              </div>
            </div>

            {/* Example 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Another Example</h3>
              <Card>
                <CardContent className="p-6">
                  <YourComponent size="large" />
                </CardContent>
              </Card>
              <div className="mt-4">
                <CodeBlock code={anotherExampleCode} language="tsx" collapsible />
              </div>
            </div>
          </div>
        </section>

        {/* Props */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Props</h2>
          <PropsTable props={propDefinitions} />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Accessibility</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Keyboard navigation support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
```

## Code Examples Standard

### Required Structure for All Code Examples

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

### Define Code as Constants

All code examples should be defined as string constants at the top of the file, after prop definitions:

```typescript
const basicUsageCode = `'use client'

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
}`
```

## Examples Section Pattern

### ❌ WRONG: Using Tabs (DO NOT DO THIS)

```tsx
<Tabs defaultValue="example1">
  <TabsList>
    <TabsTrigger value="example1">Example 1</TabsTrigger>
  </TabsList>
  <TabsContent value="example1">
    <ComponentShowcase code={`...`}>
      <ComponentShowcase.Demo>
        {/* Demo */}
      </ComponentShowcase.Demo>
    </ComponentShowcase>
  </TabsContent>
</Tabs>
```

### ✅ CORRECT: Using space-y-8 div with individual examples

```tsx
<section className="mb-16">
  <h2 className="text-2xl font-bold tracking-tight mb-6">Examples</h2>

  <div className="space-y-8">
    {/* Example 1 */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Example Title</h3>
      <Card>
        <CardContent className="p-6">
          {/* Live demo component here */}
        </CardContent>
      </Card>
      <div className="mt-4">
        <CodeBlock code={exampleCode} language="tsx" collapsible />
      </div>
    </div>

    {/* Example 2 */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Another Example</h3>
      <Card>
        <CardContent className="p-6">
          {/* Live demo component here */}
        </CardContent>
      </Card>
      <div className="mt-4">
        <CodeBlock code={anotherCode} language="tsx" collapsible />
      </div>
    </div>
  </div>
</section>
```

### Key Points:

1. **Container**: `<div className="space-y-8">` creates vertical spacing between examples
2. **Each example wrapped in a div**: Individual wrapper for each example
3. **h3 title**: `className="text-lg font-semibold mb-4"`
4. **Card wrapper**: `<Card>` with `<CardContent className="p-6">`
5. **CodeBlock below**: In a `<div className="mt-4">` with `collapsible` prop
6. **No Tabs**: Don't use Tabs component in the Examples section

## Usage Section

Immediately after the Preview section, add a Usage section with basic code:

```tsx
<section className="mb-16">
  <h2 className="text-2xl font-bold tracking-tight mb-6">Usage</h2>
  <CodeBlock code={basicUsageCode} language="tsx" title="React" />
</section>
```

Note: Usage section CodeBlock does NOT use `collapsible` prop (examples do).

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
    <CardContent className="p-6">
      <h3 className="font-semibold mb-2">Feature Name</h3>
      <p className="text-sm text-muted-foreground">
        Feature description
      </p>
    </CardContent>
  </Card>
  {/* ... more cards */}
</div>
```

Note: Use `<h3>` for feature titles (not `<CardTitle>`).

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

## Best Practices Section (Optional)

Use Alert component with Info icon:

```typescript
import { Info } from 'lucide-react'

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
- [ ] Code examples defined as constants at top of file
- [ ] **Examples section uses `<div className="space-y-8">` pattern, NOT Tabs**
- [ ] CodeBlock in Examples has `collapsible` prop
- [ ] CodeBlock in Usage section does NOT have `collapsible` prop
- [ ] Component implements bilingual text support
- [ ] Props table is complete and accurate
- [ ] Features section uses Cards with `<h3>` titles (not CardTitle)
- [ ] 2-4 example variations with live demos
- [ ] Accessibility section with checkmarks
- [ ] Best practices section with bullet points (optional)
- [ ] Component status updated in `/app/(docs)/components/page.tsx`
- [ ] Component added to search data in `/lib/search-data.ts`

## Common Pitfalls to Avoid

1. ❌ Using Tabs component for examples section
2. ❌ Using ComponentShowcase.Code instead of CodeBlock
3. ❌ Forgetting `collapsible` prop on CodeBlock in Examples
4. ❌ Forgetting `'use client'` in code examples
5. ❌ Using `React.useState` without importing React
6. ❌ Only mirroring layout without providing bilingual text
7. ❌ Not updating component status from 'coming-soon' to 'ready'
8. ❌ Missing accessibility considerations
9. ❌ Code examples that won't run if copy-pasted
10. ❌ Using CardTitle in Features section (use `<h3>` instead)

## Example References

For perfect examples of the correct pattern, see:
- `/app/(docs)/components/button/page.tsx`
- `/app/(docs)/components/card/page.tsx`
- `/app/(docs)/components/rich-text-editor/page.tsx` (newly updated)
- `/app/(docs)/components/file-upload/page.tsx` (newly updated)

## Testing Your Documentation

Before considering documentation complete:

1. Copy a code example and paste it into a new file - does it work without modifications?
2. Switch to RTL mode - does the text change to Arabic?
3. Check the Examples section - does the CodeBlock appear immediately below each demo?
4. Click "show code" - does syntax highlighting work properly?
5. Check keyboard navigation - can you use the component without a mouse?
6. Verify all props are documented in the props table
7. Ensure the component appears in the main components list with correct status
8. Test that the component appears in search results

---

Following these standards ensures consistency across all component documentation and provides users with working, copy-paste ready examples.
