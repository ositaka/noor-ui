# Noor UI

[![npm version](https://img.shields.io/npm/v/noorui-rtl.svg)](https://www.npmjs.com/package/noorui-rtl)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Storybook](https://img.shields.io/badge/Storybook-Interactive-FF4785?logo=storybook&logoColor=white)](https://storybook.noorui.com)

![Noor UI - Beautiful RTL-first React components for bilingual applications](https://raw.githubusercontent.com/ositaka/noor-ui/main/public/noorui--og-image--bilingual.png)

Beautiful RTL-first React components for bilingual applications. Built with Radix UI, Tailwind CSS, and full Arabic/English support.

## Features

✨ **RTL-First Design** - Built from the ground up with RTL languages in mind
🌍 **Bilingual Support** - Seamless English/Arabic language switching
♿ **Accessible** - WCAG 2.1 compliant components
🎨 **Themeable** - Multiple built-in themes with easy customization
📦 **Tree-shakeable** - Import only what you need
⚡ **TypeScript** - Full type safety out of the box
🕌 **GCC-Specific** - Components for Gulf region markets (Prayer Times, Hijri Calendar, Zakat Calculator)

## Installation

```bash
npm install noorui-rtl
```

## Quick Start

```tsx
import { NoorProvider } from 'noorui-rtl';
import 'noorui-rtl/styles.css';

function App() {
  return (
    <NoorProvider locale="ar" direction="rtl">
      <YourApp />
    </NoorProvider>
  );
}
```

## Documentation

- **[Documentation](https://noorui.com)** - Full documentation and guides
- **[Storybook](https://storybook.noorui.com)** - Interactive component playground with 749 stories
- **[Examples](https://noorui.com/examples)** - Real-world usage examples

## Components

### Core Components
- Button, Card, Badge, Avatar, Separator, Label, Input
- Alert, Toast, Dialog, Sheet, Popover, Tooltip
- Select, Checkbox, Radio Group, Switch, Slider
- Tabs, Accordion, Collapsible
- Table, Data Table, Pagination
- Command Menu, Dropdown Menu, Context Menu

### Advanced Components
- Dashboard Shell
- User Menu
- Notification Center
- Stepper
- File Upload
- Rich Text Editor
- Date Picker, Time Picker
- Number Input

### GCC-Specific Components
- Prayer Times
- Hijri Date
- Arabic Number
- Zakat Calculator

### AI/LLM Components
- Chat Message
- Prompt Input
- Thinking Indicator
- Message Actions
- Model Selector
- Parameter Slider
- Token Counter
- Conversation History
- Workflow Canvas
- Workflow Node

## Requirements

- React 18+
- Tailwind CSS 4.1+
- Node.js 18+

## License

MIT © [Nuno Marques](https://ositaka.com)

## Links

- 🌐 [Website](https://noorui.com)
- 📚 [Documentation](https://noorui.com/documentation)
- 📖 [Storybook](https://storybook.noorui.com) - Interactive component showcase
- 💬 [Discord Community](https://discord.gg/gvrqU2WG)
- 🐛 [Issues](https://github.com/ositaka/noor-ui/issues)
- 💬 [Discussions](https://github.com/ositaka/noor-ui/discussions)

---

Made with ❤️ for the bilingual web
