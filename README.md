# Noor UI ✨

> نور - "Light" in Arabic

[![npm version](https://badge.fury.io/js/noorui-rtl.svg)](https://www.npmjs.com/package/noorui-rtl)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Beautiful RTL-first React components for bilingual applications. Built with Radix UI, Tailwind CSS, and full Arabic/English support.

**[Documentation](https://noorui.com)** · **[Examples](https://noorui.com/examples)** · **[npm](https://www.npmjs.com/package/noorui-rtl)**

## ✨ Features

- 🌍 **RTL-First**: Perfect Arabic/Persian support with logical properties
- 🎨 **64 Components**: Complete UI toolkit for modern applications
- ♿ **Accessible**: WCAG AA compliant with full keyboard navigation
- 🎯 **TypeScript**: Full type safety and IntelliSense support
- 🎭 **Themeable**: Light/dark mode with customizable design tokens
- 🕌 **GCC-Specific**: Prayer times, Hijri calendar, Arabic numbers, Zakat calculator
- ⚡ **Modern Stack**: Next.js 15, React 19, Tailwind CSS, Radix UI
- 📦 **Tree-shakeable**: Only bundle what you use

## 📦 Installation

```bash
npm install noorui-rtl
# or
yarn add noorui-rtl
# or
pnpm add noorui-rtl
```

## 🚀 Quick Start

### 1. Install the package

```bash
npm install noorui-rtl
```

### 2. Update your `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add noorui-rtl components
    './node_modules/noorui-rtl/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
```

### 3. Add CSS variables to `globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... rest of dark mode variables */
  }
}
```

### 4. Start using components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from 'noorui-rtl'

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Noor UI</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  )
}
```

## 📚 Components

### Core UI (54 components)

**Forms**: Button, Input, Label, Textarea, Checkbox, Radio, Select, Switch, Slider, Form

**Layout**: Card, Separator, Tabs, Accordion, Collapsible

**Navigation**: Breadcrumb, Pagination, Command

**Feedback**: Alert, Toast, Progress, Skeleton, Badge, Avatar, Loading Spinner

**Overlays**: Dialog, Sheet, Popover, Tooltip, Dropdown Menu, Context Menu

**Data**: Table, DataTable, Stats Card, Feature Card, Empty State, Listing Card

**Advanced**: File Upload, Rich Text Editor, Date Picker, Time Picker, Number Input, Dashboard Shell, User Menu, Notification Center, Stepper

### GCC-Specific (5 components)

- **Prayer Times**: Display Islamic prayer times with countdown and Adhan notifications
- **Hijri Date**: Dual Gregorian/Hijri calendar display
- **Arabic Number**: Arabic-Indic numeral utilities and SAR currency formatting
- **Zakat Calculator**: Calculate Islamic Zakat with export/sharing
- **Calendar**: Date picker with Hijri support and event markers

### AI/LLM Components (10 experimental) 🧪

Chat Message, Streaming Text, Prompt Input, Thinking Indicator, Message Actions, Model Selector, Parameter Slider, Token Counter, Conversation History, Workflow Canvas

> Note: AI/LLM components are functional but APIs may evolve based on feedback.

## 🎨 RTL Support

All components support RTL out of the box:

```tsx
'use client'

import { useState } from 'react'
import { Button, Tabs, TabsList, TabsTrigger } from 'noorui-rtl'

export default function App() {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')

  return (
    <div dir={direction}>
      <Button onClick={() => setDirection(d => d === 'ltr' ? 'rtl' : 'ltr')}>
        Toggle Direction
      </Button>

      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
```

Components automatically adapt to text direction using logical properties.

## 🔧 Usage with Providers

For advanced features like direction context:

```tsx
import { DirectionProvider, useDirection } from 'noorui-rtl'

function App() {
  return (
    <DirectionProvider>
      <YourApp />
    </DirectionProvider>
  )
}

function YourComponent() {
  const { direction, setDirection, locale } = useDirection()

  return (
    <button onClick={() => setDirection(direction === 'ltr' ? 'rtl' : 'ltr')}>
      Current: {direction}
    </button>
  )
}
```

## 📖 Documentation

Full documentation, examples, and guides available at **[noorui.com](https://noorui.com)**

- [Getting Started](https://noorui.com/getting-started)
- [Components](https://noorui.com/components)
- [RTL Guide](https://noorui.com/rtl-guide)
- [Examples](https://noorui.com/examples)
- [Design Tokens](https://noorui.com/tokens)

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](https://github.com/ositaka/noor-ui/blob/main/CONTRIBUTING.md).

## 📄 License

MIT License - see [LICENSE](https://github.com/ositaka/noor-ui/blob/main/LICENSE)

## 🙏 Credits

Built with:
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [Next.js](https://nextjs.org/) - React framework

## 💬 Support

- 📧 Email: info@ositaka.com
- 🐛 Issues: [GitHub Issues](https://github.com/ositaka/noor-ui/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/ositaka/noor-ui/discussions)
- 🌐 Website: [noorui.com](https://noorui.com)

## 🌟 Show Your Support

If you find Noor UI helpful, please give it a ⭐️ on [GitHub](https://github.com/ositaka/noor-ui)!

---

**Built with ❤️ for the GCC market by [Nuno Marques](https://ositaka.com)**
