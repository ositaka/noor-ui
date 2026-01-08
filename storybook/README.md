# Noor UI Storybook

> Interactive component showcase for the Noor UI component library

[![Storybook](https://img.shields.io/badge/Storybook-10.1.10-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)

## 🎯 Overview

This Storybook showcases **73 components** from the Noor UI library (38 completed) with full support for:
- ✅ **RTL/LTR** direction switching
- ✅ **4 Theme Variants** (Minimal, Futuristic, Cozy, Artistic)
- ✅ **Light/Dark Mode** across all themes
- ✅ **Bilingual Support** (English/Arabic)
- ✅ **Accessibility Testing** (built-in a11y checks)
- ✅ **Interactive Controls** for all component props

---

## 🚀 Quick Start

### Run Storybook Locally

```bash
npm run storybook
```

Visit **http://localhost:6006** or https://storybook.noorui.com to view the component library.

### Build Static Storybook

```bash
npm run storybook:build
```

Outputs to `/storybook-static` directory.

### Test with Published Package

```bash
npm run storybook:package
```

This will:
1. Pack the local `noorui-rtl` package
2. Install the `.tgz` file
3. Run Storybook using the package (validates package experience)

---

## 🎨 Features

### Toolbar Controls

Storybook includes 4 custom toolbar controls:

| Control | Options | Description | Interactive? |
|---------|---------|-------------|--------------|
| **Direction** | LTR / RTL | Switch text direction | ✅ Yes |
| **Theme** | Minimal, Futuristic, Cozy, Artistic | Change design theme | ✅ Yes |
| **Mode** | Light / Dark | Toggle color mode | ✅ Yes |
| **Locale** | English / العربية | Shows current story's language | 📍 Display only |

**Note**: The Locale toolbar shows which language the current story is in. To see Arabic examples, click the RTL story variants (e.g., "RTL With Icon"). The toolbar will automatically update to show "العربية".

### Component Stories

Each component includes 8-15 focused stories:
- ✅ Default examples (with interactive Controls)
- ✅ Meaningful use case examples (1-3 stories)
- ✅ "All Variants" showcase stories
- ✅ "All Sizes" and other comprehensive displays
- ✅ RTL-specific examples
- ✅ Arabic text demonstrations
- ✅ Real-world usage patterns
- ✅ Interactive controls for variant exploration
- ✅ Accessibility checks
- ✅ Auto-generated documentation
- ✅ Examples from component documentation pages

---

## 📁 Project Structure

```
storybook/
├── .storybook/              # Storybook configuration
│   ├── main.ts              # Main config (addons, framework)
│   ├── preview.tsx          # Global decorators & providers
│   └── preview-head.html    # Custom fonts & styles
├── stories/                 # Component stories
│   ├── basic/              # Button, Input, Card, etc.
│   ├── forms/              # Checkbox, Select, Radio, etc.
│   ├── navigation/         # Tabs, Accordion, etc.
│   ├── overlay/            # Dialog, Sheet, Popover, etc.
│   ├── data/               # Table, Data Table, etc.
│   ├── feedback/           # Toast, Progress, etc.
│   ├── gcc/                # Prayer Times, Hijri Date, etc.
│   └── ai/                 # Chat, Streaming Text, etc.
├── STORYBOOK_ROADMAP.md    # Implementation roadmap
└── README.md               # This file
```

---

## 🧩 Component Coverage

### Current Status: 45/73 Components (62%)

**🎉 Forms Category Complete!** All 11 form components now have comprehensive stories.
**🔥 Navigation & Layout 75% Complete!** 6/8 navigation components completed.
**🚀 Data Display 75% Complete!** 6/8 data display components completed.
**✨ Overlay Category 100% Complete!** All 6/6 overlay components completed! 🎊
**⚡ Feedback Category 60% Complete!** 3/5 feedback components completed.

#### ✅ Completed Stories
- **Button** - All variants, sizes, states, RTL support, icons, loading (17 stories)
- **Input** - All types, with labels, icons, forms, RTL examples (13 stories)
- **Card** - All layouts, notification, stats, product, article cards (9 stories)
- **Badge** - All variants, sizes, with icons, status, notification, RTL, custom colors (10 stories)
- **Avatar** - Image, fallback, sizes, groups, with profile, RTL examples (9 stories)
- **Label** - With input, required, helper text, disabled, horizontal, forms, RTL (11 stories)
- **Textarea** - All height options, character count, validation, auto-expand, forms, RTL (11 stories)
- **Separator** - Horizontal, vertical, in cards, navigation, lists, custom styling, RTL (10 stories)
- **Alert** - All variants (default, destructive, success, warning), with/without icons, RTL (11 stories)
- **Tooltip** - All positions (top, bottom, left, right), with icon buttons, text buttons, RTL (8 stories)
- **Kbd** - Single keys, combinations, all variants/sizes, in buttons, shortcuts panel, RTL (9 stories)
- **Blockquote** - All variants (default, accent, subtle), with/without attribution, with citation, RTL (10 stories)
- **Callout** - All 5 types (info, warning, error, success, note), with/without title, custom icon, RTL (13 stories)
- **Checkbox** - Single, group, indeterminate, disabled, controlled, in forms, RTL (10 stories)
- **Radio Group** - Vertical, horizontal, with description, disabled, controlled, in forms, RTL (11 stories)
- **Select** - With label, grouped options, disabled, controlled, in forms, RTL (11 stories)
- **Switch** - With label, settings panel, disabled, controlled, in forms, RTL (11 stories)
- **Slider** - With label, different ranges, steps, disabled, volume control, price range, RTL (13 stories)
- **Form** - Basic, with validation, with select, disabled, controlled, RTL (9 stories)
- **Date Picker** - Single date, date range, with constraints, disabled dates, real-world example, RTL (11 stories)
- **Time Picker** - 12/24h format, time ranges, minute intervals, medical appointment, work schedule, RTL (11 stories)
- **Number Input** - Min/max, decimal precision, currency formatting, product order, RTL (11 stories)
- **File Upload** - Drag-and-drop, single/multiple files, image previews, size validation, documents, RTL (11 stories)
- **Calendar** - Single/range selection, Hijri calendar, Islamic holidays, event markers, disabled dates, RTL (11 stories)
- **Tabs** - Basic, with icons, controlled, two tabs, RTL examples (8 stories)
- **Accordion** - Single, multiple, with icons, controlled, in card, RTL examples (9 stories)
- **Breadcrumb** - Basic, custom separator, with icons, longer path, in card, RTL examples (10 stories)
- **Pagination** - Basic, with ellipsis, controlled, few pages, in card, RTL examples (10 stories)
- **Collapsible** - Basic FAQ, controlled with icon, sidebar style, FAQ style, uncontrolled, RTL examples (10 stories)
- **Stepper** - Basic, simple variant, circles variant, vertical orientation, allow skip, in card, RTL examples (11 stories)
- **Table** - Basic, with caption, interactive with checkboxes, mobile responsive, striped rows, compact, RTL examples (11 stories)
- **Data Table** - Basic, internal sorting, external sorting, searchable, paginated, custom cells, loading state, complete example, RTL examples (11 stories)
- **Stats Card** - Dashboard grid, positive trend, negative trend, without trend, all metrics, in card container, RTL examples (11 stories)
- **Feature Card** - Static card, clickable card, grid layout, all icons, in card container, RTL examples (11 stories)
- **Listing Card** - Basic, real estate, e-commerce, job listing, with all features, grid layout, RTL examples (11 stories)
- **Empty State** - Basic usage, without action, search results, multiple actions, all use cases, minimal layout, RTL examples (11 stories)
- **Dialog** - Basic, with form, confirmation, settings, controlled, multiple dialogs, RTL examples (11 stories)
- **Sheet** - From end, from start, from top, from bottom, all sides, with form, navigation menu, RTL examples (11 stories)
- **Popover** - Basic usage, position top/right/bottom/left, all positions, with form, RTL examples (11 stories)
- **Dropdown Menu** - Basic usage, with icons, with checkboxes, with radio group, with sub-menus, all variants, RTL examples (11 stories)
- **Context Menu** - Basic usage, with icons, with checkboxes, file explorer pattern, all variants, RTL examples (10 stories)
- **Command** - Basic command, with shortcuts, command dialog, multiple groups, RTL examples (10 stories)
- **Toast** - Simple, with title, destructive, success, all variants, RTL examples (10 stories)
- **Progress** - Basic, with label, with shimmer, different sizes, different colors, upload progress, all sizes, RTL examples (11 stories)
- **Skeleton** - Card skeleton, profile skeleton, list skeleton, text lines, avatar sizes, button skeleton, all patterns, RTL examples (11 stories)

#### 🚧 In Progress
Working on remaining **28 components** across all categories.

**✅ Completed Categories:**
- **Forms** - 11/11 components (100%)
- **Overlay** - 6/6 components (100%)

**Story Philosophy**: Each component includes 8-15 focused stories combining meaningful use cases, comprehensive showcase stories, and interactive Controls for variant exploration.

See **[STORYBOOK_ROADMAP.md](./STORYBOOK_ROADMAP.md)** for detailed progress tracking.

---

## ⚙️ Technical Details

### Stack
- **Storybook**: 10.1.10 (latest)
- **Framework**: @storybook/nextjs-vite
- **Builder**: Vite 7.3.0
- **Next.js**: 14.x
- **React**: 18.x
- **TypeScript**: 5.3.x
- **Tailwind CSS**: 3.4.x

### Addons
- `@storybook/addon-a11y` - Accessibility testing
- `@storybook/addon-docs` - Auto documentation
- `@chromatic-com/storybook` - Visual testing
- `@storybook/addon-vitest` - Test integration

### Providers
All stories are wrapped with:
1. **DirectionProvider** - Manages RTL/LTR state
2. **DesignSystemProvider** - Manages theme variants
3. **ThemeProvider** (next-themes) - Manages light/dark mode

### Configuration
- Custom Vite config for path aliases (`@/components`, `@/lib`, etc.)
- PostCSS with Tailwind and logical properties plugin
- Font loading (Inter, IBM Plex Sans Arabic, JetBrains Mono)
- CSS custom properties for theming

---

## 🎯 Development Workflow

### Adding a New Story

1. Create a new `.stories.tsx` file in the appropriate category folder:

```typescript
// storybook/stories/basic/YourComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from '../../../components/ui/your-component';

const meta = {
  title: 'Basic/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // component props
  },
};

// Add RTL example
export const RTL: Story = {
  args: {
    children: 'محتوى عربي',
  },
};
```

2. Run Storybook to see your story:
```bash
npm run storybook
```

3. Test with different toolbar controls:
   - Switch to RTL
   - Try all 4 themes
   - Toggle dark mode
   - Check accessibility

---

## 🧪 Testing

### Accessibility Testing
All stories automatically run a11y checks. View results in the **Accessibility** panel.

### Visual Testing
Use Chromatic for visual regression testing:
```bash
npx chromatic --project-token=<your-token>
```

### Interaction Testing
Stories can include interaction tests using @storybook/addon-interactions.

---

## 📦 Deployment

### Build for Production
```bash
npm run storybook:build
```

### Deploy Options

#### Option 1: Vercel
```bash
vercel storybook-static
```

#### Option 2: Netlify
```bash
netlify deploy --dir=storybook-static --prod
```

#### Option 3: GitHub Pages
```bash
# Add to .github/workflows/storybook.yml
```

---

## 📚 Resources

- **Storybook Documentation**: https://storybook.js.org/docs
- **Noor UI Documentation**: https://noorui.com
- **Component Roadmap**: [STORYBOOK_ROADMAP.md](./STORYBOOK_ROADMAP.md)
- **Contributing Guide**: ../CONTRIBUTING.md

---

## 🤝 Contributing

We welcome contributions! To add new stories:

1. **Read [STORY_GUIDELINES.md](./STORY_GUIDELINES.md)** - 4 critical rules documented
2. Follow the story template in the "Development Workflow" section
3. **Use examples from `/app/(docs)/components/[name]/page.tsx`**
4. **Aim for 8-15 stories per component** (not 30+)
5. Include meaningful use cases + "All..." showcase stories
6. Ensure RTL examples are included with `globals: { direction: 'rtl', locale: 'ar' }`
7. Add Arabic text examples where applicable
8. Never use directional icons (arrows, chevrons)
9. Test accessibility with the a11y addon
10. Submit a PR with your stories

---

## 📝 Todo

See **[STORYBOOK_ROADMAP.md](./STORYBOOK_ROADMAP.md)** for:
- Component story status
- Implementation phases
- Known issues
- Future enhancements

---

## 🎉 Achievements

✅ Storybook 10 setup complete
✅ Full RTL/LTR support working
✅ 4 theme variants integrated
✅ Light/dark mode functional
✅ Custom toolbar controls active
✅ Accessibility testing enabled
✅ 45 comprehensive component stories (62%)
✅ 486+ individual story variants
✅ Forms category 100% complete (11/11)
✅ Navigation & Layout 75% complete (6/8)
✅ Data Display 75% complete (6/8)
✅ Overlay category 100% complete (6/6) 🎊
✅ Feedback category 60% complete (3/5)
✅ Story guidelines documented (4 critical rules)
✅ Streamlined story approach (8-15 stories per component)

---

## 📧 Support

For issues or questions:
- Open an issue: https://github.com/ositaka/noor-ui/issues
- Email: info@ositaka.com

---

**Built with ❤️ for the Noor UI community**
