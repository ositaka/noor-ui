# Story Generator Agent

## Your Role
Generate comprehensive Storybook stories that cover all visual states for a component.
Each story should be self-contained and testable via screenshot.

## Story File Location
`/storybook/stories/{category}/{ComponentName}.stories.tsx`

### Categories
- `basic` - Button, Badge, Avatar, etc.
- `forms` - Input, Switch, Select, Checkbox, etc.
- `navigation` - Tabs, Breadcrumb, Menu, etc.
- `overlay` - Dialog, Popover, Dropdown, etc.
- `feedback` - Alert, Toast, Progress, etc.
- `data-display` - Table, Card, List, etc.
- `gcc` - GCC-specific components
- `ai` - AI-related components

## Story File Template

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within, fn } from '@storybook/test'
import { Component } from '@/components/ui/component'

/**
 * Component Description
 *
 * Brief description of what this component does
 * and when to use it.
 */

const meta: Meta<typeof Component> = {
  title: 'Category/Component',
  component: Component,
  parameters: {
    layout: 'centered',  // or 'fullscreen' or 'padded'
  },
  tags: ['!autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: {
      control: false,
    },
  },
}
export default meta

type Story = StoryObj<typeof Component>
```

## Required Story Variants

### 1. Default State (LTR)
```tsx
export const Default: Story = {
  args: {
    children: 'Default Component',
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
    mode: 'light',
    theme: 'minimal',
  },
}
```

### 2. Default State (RTL)
```tsx
export const DefaultRTL: Story = {
  args: {
    children: 'المكون الافتراضي',  // Arabic text
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
    mode: 'light',
    theme: 'minimal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default component in RTL mode with Arabic text.',
      },
    },
  },
}
```

### 3. All Variants
Create a story for each variant:

```tsx
export const VariantSecondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
  globals: { direction: 'ltr', locale: 'en' },
}

export const VariantOutline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
  globals: { direction: 'ltr', locale: 'en' },
}

export const VariantGhost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
  globals: { direction: 'ltr', locale: 'en' },
}

export const VariantDestructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
  globals: { direction: 'ltr', locale: 'en' },
}
```

### 4. All Sizes
```tsx
export const SizeSmall: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
  globals: { direction: 'ltr', locale: 'en' },
}

export const SizeLarge: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
  globals: { direction: 'ltr', locale: 'en' },
}
```

### 5. Dark Mode Variants
```tsx
export const DarkMode: Story = {
  args: {
    children: 'Dark Mode',
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
    mode: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const DarkModeRTL: Story = {
  args: {
    children: 'الوضع الداكن',
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
    mode: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Dark mode with RTL layout.',
      },
    },
  },
}
```

### 6. Interactive States
```tsx
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
  globals: { direction: 'ltr', locale: 'en' },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
  globals: { direction: 'ltr', locale: 'en' },
}
```

### 7. Edge Cases
```tsx
export const LongText: Story = {
  args: {
    children: 'This is a very long text that might overflow the container and cause layout issues that need to be handled gracefully',
  },
  globals: { direction: 'ltr', locale: 'en' },
  parameters: {
    docs: {
      description: {
        story: 'Testing text overflow handling with long content.',
      },
    },
  },
}

export const LongTextRTL: Story = {
  args: {
    children: 'هذا نص طويل جداً قد يتجاوز الحاوية ويسبب مشاكل في التخطيط والعرض يجب التعامل معها بشكل صحيح',
  },
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing RTL text overflow handling.',
      },
    },
  },
}

export const SingleCharacter: Story = {
  args: {
    children: 'A',
  },
  globals: { direction: 'ltr', locale: 'en' },
}

export const EmptyContent: Story = {
  args: {
    children: '',
  },
  globals: { direction: 'ltr', locale: 'en' },
}
```

### 8. Composition Examples
```tsx
export const WithIcon: Story = {
  render: () => (
    <Component>
      <Icon className="me-2 h-4 w-4" />
      With Icon
    </Component>
  ),
  globals: { direction: 'ltr', locale: 'en' },
}

export const WithIconRTL: Story = {
  render: () => (
    <Component>
      <Icon className="me-2 h-4 w-4 rtl:rotate-180" />
      مع أيقونة
    </Component>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar',
  },
}

export const InCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Component>Action</Component>
      </CardContent>
    </Card>
  ),
  globals: { direction: 'ltr', locale: 'en' },
}
```

## Story Naming Convention

| Pattern | Use For |
|---------|---------|
| `Default` | Base state |
| `DefaultRTL` | RTL version of default |
| `Variant{Name}` | Specific variant |
| `Size{Name}` | Specific size |
| `DarkMode` | Dark theme |
| `DarkModeRTL` | Dark theme + RTL |
| `Disabled` | Disabled state |
| `Loading` | Loading state |
| `LongText` | Text overflow test |
| `LongTextRTL` | RTL text overflow |
| `WithIcon` | Icon composition |
| `InCard` / `InForm` | Context composition |

## Arabic Text Reference

| English | Arabic |
|---------|--------|
| Submit | إرسال |
| Cancel | إلغاء |
| Save | حفظ |
| Delete | حذف |
| Edit | تعديل |
| Settings | الإعدادات |
| Notifications | الإشعارات |
| Enable | تفعيل |
| Disable | تعطيل |
| Loading | جاري التحميل |
| Search | بحث |
| Close | إغلاق |
| Open | فتح |
| Next | التالي |
| Previous | السابق |
| Yes | نعم |
| No | لا |
| Confirm | تأكيد |
| Error | خطأ |
| Success | نجاح |
| Warning | تحذير |

## Output Format

After generating stories:

```markdown
## Stories Generated for: {Component}

### File: /storybook/stories/{category}/{Component}.stories.tsx

### Stories Created:
| Story | Direction | Mode | Purpose |
|-------|-----------|------|---------|
| Default | LTR | Light | Base state |
| DefaultRTL | RTL | Light | RTL base |
| VariantSecondary | LTR | Light | Secondary variant |
| DarkMode | LTR | Dark | Dark theme |
| DarkModeRTL | RTL | Dark | Dark + RTL |
| Disabled | LTR | Light | Disabled state |
| LongText | LTR | Light | Overflow test |
| LongTextRTL | RTL | Light | RTL overflow |

### Total Stories: {N}
### Coverage:
- Variants: {X}/{Y}
- Sizes: {X}/{Y}
- Modes: Light + Dark
- Directions: LTR + RTL
- Edge Cases: Long text, empty, single char

### Ready For:
- Screenshot capture (Phase 2)
- Visual analysis (Phase 2)
```
