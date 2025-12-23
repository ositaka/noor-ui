# Storybook Story Guidelines

> Essential rules for creating Noor UI component stories

---

## 📖 Locale Toolbar Behavior

The **Locale toolbar** shows which language is currently active for a story:
- 🇬🇧 **English** - For LTR/English stories
- 🇸🇦 **العربية** - For RTL/Arabic stories

**Important**: The locale toolbar is **display-only** and shows the current story's language. It doesn't switch between languages.

### How It Works

When you click an RTL story, the toolbar automatically updates to show the correct locale:

```typescript
// English story - toolbar shows "English"
export const Default: Story = {
  args: { children: 'Click Me' },
};

// Arabic story - toolbar shows "العربية"
export const RTLExample: Story = {
  args: { children: 'اضغط هنا' },
  globals: {
    direction: 'rtl',  // Updates Direction toolbar to RTL
    locale: 'ar',      // Updates Locale toolbar to العربية
  },
};
```

**Result**: When you click the RTL story, both Direction and Locale toolbars automatically update. No manual switching needed!

### Why This Approach?

For 70+ components with hundreds of stories:
- ✅ **Simple**: No complex bilingual logic in every story
- ✅ **Maintainable**: Easy to add new components
- ✅ **Clear**: Separate stories clearly show each language variant
- ✅ **Fast**: Quick to browse between examples

**Note**: To see Arabic examples, simply click the RTL story variants (e.g., "RTL With Icon", "RTL Card"). The toolbar will show you which language is active.

---

## 🚨 Critical Rules

### 1. **All Stories Must Explicitly Set Direction and Locale**

**CRITICAL:** All stories **MUST** explicitly include the `globals` property to set direction and locale. This prevents state synchronization issues in Storybook.

**LTR Stories (English):**
```typescript
export const Default: Story = {
  render: () => (
    <div>English content here</div>
  ),
  globals: {
    direction: 'ltr',  // ✅ Required for LTR stories
    locale: 'en',      // ✅ Required for English
  },
};
```

**RTL Stories (Arabic):**
```typescript
export const RTLExample: Story = {
  render: () => (
    <div>محتوى عربي</div>
  ),
  globals: {
    direction: 'rtl',  // ✅ Required for RTL stories
    locale: 'ar',      // ✅ Required for Arabic
  },
  parameters: {
    docs: {
      description: {
        story: 'Description here. Automatically switches to RTL mode.',
      },
    },
  },
};
```

**Why?** Without explicit `globals`, switching between RTL and LTR stories causes state synchronization issues where the toolbar shows one direction but the content displays in another. Always explicitly set both `direction` and `locale` on every story.

---

### 2. **Never Use Directional Icons**

**❌ DO NOT use directional icons** that would break in RTL:
- ArrowRight / ArrowLeft
- ChevronRight / ChevronLeft
- ArrowForward / ArrowBack
- Any other directional arrows

**✅ USE non-directional icons instead:**
- Plus, Minus
- X, Check
- Heart, Star
- Download, Upload
- Save, Trash
- Search, Settings
- etc.

**Bad Example:**
```typescript
// ❌ BAD - Arrow will point wrong direction in RTL
<Button>
  Continue
  <ArrowRight className="h-4 w-4" />
</Button>
```

**Good Example:**
```typescript
// ✅ GOOD - Save icon works in any direction
<Button>
  Save Changes
  <Save className="h-4 w-4" />
</Button>
```

**Note:** Noor UI has a dedicated `ButtonArrow` component for directional navigation that handles RTL automatically. Use that instead!

---

### 3. **Use Existing Component Documentation Examples**

**CRITICAL RULE**: Always use examples from the component's documentation page at `/app/(docs)/components/[name]/page.tsx`

**DO NOT invent new examples!** Use what's already tested:
- ✅ Copy exact text/data from component pages
- ✅ Use the same variants shown in docs
- ✅ Replicate the same usage patterns
- ✅ Keep the same Arabic translations
- ✅ Use identical prop combinations

**Why?**
- Component pages have tested RTL behavior
- Text has been carefully chosen
- Arabic translations are validated
- Accessibility has been verified
- Examples are real-world proven

**Process:**
1. Open `/app/(docs)/components/[name]/page.tsx`
2. Find the examples/demos
3. Copy the exact pattern to Storybook
4. Extract into individual stories
5. Keep all text, props, and data identical

**Example:**
```typescript
// ❌ BAD - Invented example
export const WithIcon: Story = {
  args: { children: 'Click Here' }, // New text
};

// ✅ GOOD - From component docs
export const WithIcon: Story = {
  args: { children: 'Download' }, // Same as docs
};
```

---

### 4. **Focus on Meaningful Stories, Not Every Variant**

**CRITICAL RULE**: Don't create a separate story for every single variant permutation.

**DO:**
- ✅ Create stories for meaningful use cases
- ✅ Use "All Variants" showcase stories to show all options at once
- ✅ Let users explore variants via the Controls panel
- ✅ Focus on demonstrating component purpose and patterns

**DON'T:**
- ❌ Create separate stories for Default, Secondary, Destructive, Outline individually
- ❌ Create separate stories for every icon combination
- ❌ Create separate stories for every size or color
- ❌ Make users scroll through 30+ similar stories

**Why?**
- Keeps sidebar clean and navigable
- Users can explore variants interactively via Controls
- Showcase stories demonstrate all options comprehensively
- Easier to maintain with 70+ components

**Example - Badge Stories:**

```typescript
// ✅ GOOD - Meaningful story with Controls for variants
export const Default: Story = {
  args: {
    children: 'New',
    variant: 'default', // Users can change via Controls
  },
};

// ✅ GOOD - Showcase all variants at once (controls disabled)
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true }, // Disable since render doesn't use args
  },
};

// ❌ BAD - Separate story for each variant (unnecessary)
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' }
};
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' }
};
export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' }
};
```

**Guideline:** Aim for 8-15 stories per component:
- 1-3 individual stories with Controls (Default, WithIcon, etc.)
- 1-2 real-world usage examples (NotificationCount, FormExample, etc.)
- 1 RTL example with Controls
- 3-6 "All..." showcase stories (AllVariants, AllSizes, etc.)

---

## 📋 Story Template

Use this template for all component stories:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '../../../components/ui/your-component';
import { Plus, Heart, Save } from 'lucide-react'; // ✅ Non-directional icons only

const meta = {
  title: 'Category/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for props
  },
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - ALWAYS set globals explicitly
export const Default: Story = {
  args: {
    children: 'Example',
  },
  globals: {
    direction: 'ltr',  // ✅ Required for ALL stories!
    locale: 'en',      // ✅ Required for ALL stories!
  },
};

// More variants...

// RTL Examples (ALWAYS include these!)
export const RTLExample: Story = {
  args: {
    children: 'مثال عربي',
  },
  globals: {
    direction: 'rtl',  // ✅ Required!
    locale: 'ar',      // ✅ Required!
  },
  parameters: {
    docs: {
      description: {
        story: 'Arabic example. Automatically switches to RTL mode.',
      },
    },
  },
};
```

---

## ✅ Story Checklist

Before creating a PR with new stories, verify:

- [ ] **Reviewed `/app/(docs)/components/[name]/page.tsx` first**
- [ ] Examples use **exact same text/data** as component docs
- [ ] Arabic translations **copied from** component page
- [ ] **ALL LTR stories include `globals: { direction: 'ltr', locale: 'en' }`**
- [ ] **ALL RTL stories include `globals: { direction: 'rtl', locale: 'ar' }`**
- [ ] No directional icons (arrows, chevrons) are used
- [ ] At least one RTL example is included
- [ ] **Stories are focused on meaningful use cases** (not every variant)
- [ ] **8-15 stories total** (not 30+)
- [ ] **Includes "All..." showcase stories** for comprehensive variant display
- [ ] **Controls disabled on showcase stories** with `parameters: { controls: { disable: true } }`
- [ ] Props are accurately typed and documented
- [ ] Interactive controls work correctly on individual stories
- [ ] Accessibility checks pass (no violations in a11y panel)

---

## 📚 Categories

Organize stories into these categories:

- **Basic**: Button, Input, Card, Badge, Avatar, etc.
- **Forms**: Checkbox, Select, Radio, Switch, Slider, etc.
- **Navigation**: Tabs, Accordion, Breadcrumb, Pagination, etc.
- **Overlay**: Dialog, Sheet, Popover, Dropdown Menu, etc.
- **Data**: Table, Data Table, Stats Card, etc.
- **Feedback**: Toast, Progress, Skeleton, Loading, etc.
- **GCC**: Prayer Times, Hijri Date, Arabic Number, Zakat Calculator
- **AI**: Chat Message, Streaming Text, Prompt Input, etc.

---

## 🎨 Best Practices

### 1. **Use Showcase Stories to Display All Variants**

Instead of creating individual stories for every variant, use showcase stories:

```typescript
// ✅ GOOD - Shows all variants in one story
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

// Then create focused stories for specific use cases
export const Default: Story = {
  args: { variant: 'primary' }, // Users can change variant via Controls
};
```

### 2. **Include Comprehensive Showcase Stories**

Create "All..." stories that demonstrate component capabilities at once.

**IMPORTANT:** Disable controls on showcase stories since they use `render` functions and don't respond to args:

```typescript
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true }, // ✅ Disable controls for showcase stories
  },
};
```

**Why disable controls?** Showcase stories use custom `render` functions that don't use `args`, so the Controls panel would show options that don't actually do anything. Disabling them prevents user confusion.

### 3. **Use Logical Properties**

When positioning elements, use logical properties for RTL support:

```typescript
// ✅ GOOD - Works in RTL
className="ps-3"  // padding-inline-start
className="me-2"  // margin-inline-end

// ❌ BAD - Breaks in RTL
className="pl-3"  // padding-left (hardcoded)
className="mr-2"  // margin-right (hardcoded)
```

### 4. **Test in All Themes**

Ensure your examples look good in:
- All 4 design themes (Minimal, Futuristic, Cozy, Artistic)
- Light and dark modes
- RTL and LTR directions

### 5. **Write Clear Descriptions**

Add helpful descriptions to story parameters:

```typescript
parameters: {
  docs: {
    description: {
      story: 'Clear explanation of what this story demonstrates and any important notes.',
    },
  },
},
```

---

## 🐛 Common Mistakes

### ❌ Mistake 1: Forgetting to Set Globals on LTR Stories
```typescript
// ❌ BAD - No globals set, causes state sync issues
export const Default: Story = {
  args: { children: 'English content' },
  // Missing globals!
};
```

```typescript
// ✅ GOOD - Explicit globals prevent state issues
export const Default: Story = {
  args: { children: 'English content' },
  globals: {
    direction: 'ltr',  // Always set explicitly
    locale: 'en',      // Always set explicitly
  },
};
```

### ❌ Mistake 2: Forgetting RTL Globals
```typescript
// ❌ BAD - Toolbar stays on LTR
export const RTLExample: Story = {
  args: { children: 'محتوى عربي' },
};
```

```typescript
// ✅ GOOD - Toolbar automatically switches
export const RTLExample: Story = {
  args: { children: 'محتوى عربي' },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
};
```

### ❌ Mistake 2: Using Directional Icons
```typescript
// ❌ BAD
<Button>
  Next <ArrowRight />
</Button>
```

```typescript
// ✅ GOOD
<Button>
  Save <Save />
</Button>
```

### ❌ Mistake 3: Hardcoded Directions
```typescript
// ❌ BAD
className="ml-4 text-left"
```

```typescript
// ✅ GOOD
className="ms-4 text-start"
```

### ❌ Mistake 4: Over-Documenting Variants
```typescript
// ❌ BAD - 30+ separate stories for every permutation
export const Default: Story = { args: { variant: 'default' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Destructive: Story = { args: { variant: 'destructive' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const DefaultSmall: Story = { args: { variant: 'default', size: 'sm' } };
export const DefaultMedium: Story = { args: { variant: 'default', size: 'md' } };
// ... 24 more stories...
```

```typescript
// ✅ GOOD - Focused stories + showcase (with controls disabled)
export const Default: Story = {
  args: { variant: 'default' }, // Users explore variants via Controls
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true }, // ✅ Disable controls on showcase stories
  },
};
```

### ❌ Mistake 5: Not Disabling Controls on Showcase Stories
```typescript
// ❌ BAD - Controls shown but don't work
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
    </div>
  ),
  // Missing: parameters: { controls: { disable: true } }
};
// User sees "variant" control but changing it does nothing!
```

```typescript
// ✅ GOOD - Controls disabled for clarity
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
    </div>
  ),
  parameters: {
    controls: { disable: true }, // ✅ Clear that this is a static showcase
  },
};
```

---

## 📖 Further Reading

- **Logical Properties**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
- **RTL Best Practices**: `/docs/development/rtl-best-practices.md`
- **Component Guidelines**: `/docs/development/component-checklist.md`
- **Storybook Roadmap**: `/storybook/STORYBOOK_ROADMAP.md`

---

**Remember:** These guidelines ensure Noor UI's Storybook accurately represents the library's RTL-first, bilingual capabilities. Follow them strictly for all component stories!
