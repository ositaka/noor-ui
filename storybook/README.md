# Noor UI Storybook

> Interactive component showcase for the Noor UI component library

[![Storybook](https://img.shields.io/badge/Storybook-10.1.10-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://www.typescriptlang.org/)

## 🎯 Overview

This Storybook showcases all **74 components** from the Noor UI library with full support for:
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

Visit **http://localhost:6006** to view the component library.

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

### Current Status: 6/74 Components (8%)

#### ✅ Completed Stories
- **Button** - All variants, sizes, states, RTL support, icons, loading (17 stories)
- **Input** - All types, with labels, icons, forms, RTL examples (13 stories)
- **Card** - All layouts, notification, stats, product, article cards (9 stories)
- **Badge** - All variants, sizes, with icons, status, notification, RTL, custom colors (10 stories)
- **Avatar** - Image, fallback, sizes, groups, with profile, RTL examples (9 stories)
- **Label** - With input, required, helper text, disabled, horizontal, forms, RTL (11 stories)

#### 🚧 In Progress
Working on remaining **68 components** across all categories.

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
✅ 6 comprehensive component stories
✅ 75+ individual story variants
✅ Story guidelines documented (4 critical rules)
✅ Streamlined story approach (8-15 stories per component)

---

## 📧 Support

For issues or questions:
- Open an issue: https://github.com/ositaka/noor-ui/issues
- Email: info@ositaka.com

---

**Built with ❤️ for the Noor UI community**
