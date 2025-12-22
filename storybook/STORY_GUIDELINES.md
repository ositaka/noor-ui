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

### 1. **RTL Stories Must Auto-Switch Toolbar**

All stories with RTL/Arabic content **MUST** include the `globals` property to automatically switch the toolbar:

```typescript
export const RTLExample: Story = {
  args: {
    children: 'محتوى عربي',
  },
  globals: {
    direction: 'rtl',  // ✅ Automatically switches Direction toolbar to RTL
    locale: 'ar',      // ✅ Automatically switches Locale toolbar to Arabic
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

**Why?** Users shouldn't have to manually change the toolbar when viewing RTL examples. The story should demonstrate the component in the correct context automatically.

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

### 3. **Base Stories on Actual Component Examples**

Always reference the component's documentation page at `/app/(docs)/components/[name]/page.tsx` for:
- ✅ Accurate usage patterns
- ✅ Real-world examples
- ✅ Proper prop combinations
- ✅ RTL-safe implementations

Don't invent new examples that might violate RTL best practices.

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

// Default story
export const Default: Story = {
  args: {
    children: 'Example',
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

- [ ] All RTL stories include `globals: { direction: 'rtl', locale: 'ar' }`
- [ ] No directional icons (arrows, chevrons) are used
- [ ] Examples match the component documentation page
- [ ] At least one RTL example is included
- [ ] Props are accurately typed and documented
- [ ] Interactive controls work correctly
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

### 1. **Show All Variants**

Create stories for every variant, size, and state:

```typescript
export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Destructive: Story = { args: { variant: 'destructive' } };
// ... etc.
```

### 2. **Include Showcase Stories**

Create "All Variants" or "All Sizes" stories that show everything at once:

```typescript
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};
```

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

### ❌ Mistake 1: Forgetting RTL Globals
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

---

## 📖 Further Reading

- **Logical Properties**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
- **RTL Best Practices**: `/docs/development/rtl-best-practices.md`
- **Component Guidelines**: `/docs/development/component-checklist.md`
- **Storybook Roadmap**: `/storybook/STORYBOOK_ROADMAP.md`

---

**Remember:** These guidelines ensure Noor UI's Storybook accurately represents the library's RTL-first, bilingual capabilities. Follow them strictly for all component stories!
