# Noor UI

> نور — "Light" in Arabic

[![npm version](https://badge.fury.io/js/noorui-rtl.svg)](https://www.npmjs.com/package/noorui-rtl)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/Tests-690%20passing-brightgreen)](https://github.com/ositaka/noor-ui)
[![Storybook](https://img.shields.io/badge/Storybook-Interactive-FF4785?logo=storybook&logoColor=white)](https://storybook.noorui.com)

![Noor UI - Beautiful RTL-first React components for bilingual applications](https://raw.githubusercontent.com/ositaka/noor-ui/main/public/noorui--og-image--bilingual.png)

Beautiful RTL-first React components for bilingual applications. Built with Radix UI, Tailwind CSS, and full Arabic/English support.

**[Documentation](https://noorui.com)** · **[Storybook](https://storybook.noorui.com)** · **[Examples](https://noorui.com/examples)** · **[npm](https://www.npmjs.com/package/noorui-rtl)**

## Features

- **RTL-First** — Perfect Arabic/Persian support with logical CSS properties
- **77+ Components** — Complete UI toolkit from buttons to dashboards
- **Well-Tested** — 690+ unit tests covering props, variants, RTL behavior, a11y, and keyboard navigation
- **Accessible** — WCAG AA compliant with full keyboard navigation
- **TypeScript** — Full type safety and IntelliSense
- **Themeable** — 4 built-in themes, light/dark mode, customizable design tokens
- **GCC-Specific** — Prayer Times, Hijri Calendar, Arabic Numbers, Zakat Calculator
- **AI/LLM Components** — Chat, Streaming Text, Model Selector, Token Counter
- **Tree-shakeable** — Only bundle what you use

## Quick Start

```bash
npm install noorui-rtl
```

```tsx
import 'noorui-rtl/dist/styles.css'
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

For RTL support, Tailwind setup, theming, and provider configuration, see the **[Getting Started guide](https://noorui.com/getting-started)**.

## Components

**Forms** — Button, Input, Textarea, Checkbox, Radio, Select, Switch, Slider, DatePicker, TimePicker, FileUpload, NumberInput, Calendar, Form

**Layout** — Card, Separator, Tabs, Accordion, Collapsible, DashboardShell, Stepper

**Navigation** — Breadcrumb, Pagination, Command

**Feedback** — Alert, Callout, Toast, Progress, Skeleton, Badge, Avatar, LoadingSpinner, Kbd

**Overlays** — Dialog, Sheet, Popover, Tooltip, DropdownMenu, ContextMenu

**Data** — Table, DataTable, Chart, StatsCard, ListingCard, FeatureCard, EmptyState, Timeline, Blockquote

**GCC** — PrayerTimes, HijriDate, ArabicNumber, ZakatCalculator

**AI/LLM** — ChatMessage, PromptInput, StreamingText, ThinkingIndicator, ModelSelector, TokenCounter, ParameterSlider, ConversationHistory, MessageActions

**Composite** — Carousel, NotificationCenter, UserMenu, ReactionPicker, UserBadge

Browse all components at **[noorui.com/components](https://noorui.com/components)** or in **[Storybook](https://storybook.noorui.com)**.

## Documentation

- [Getting Started](https://noorui.com/getting-started) — Installation, CSS setup, providers
- [Components](https://noorui.com/components) — All 77+ components with live examples
- [RTL Guide](https://noorui.com/rtl-guide) — Logical properties, bidirectional patterns
- [Themes](https://noorui.com/themes) — Built-in themes and custom theme creation
- [Design Tokens](https://noorui.com/tokens) — CSS variables reference
- [Examples](https://noorui.com/examples) — Full application demos (Healthcare, Banking, Hotel, Esports, MyMantras)
- [Email Templates](https://noorui.com/email-templates) — 21 bilingual MJML templates
- [Storybook](https://storybook.noorui.com) — Interactive component playground
- [llms.txt](https://noorui.com/llms.txt) — AI assistant integration

## Contributing

Contributions are welcome! See the [Contributing Guide](CONTRIBUTING.md).

This project includes [Claude Code agents](.claude/) for component creation, story generation, visual QA, and i18n validation.

## Support

- [Discord](https://discord.gg/gvrqU2WG)
- [GitHub Discussions](https://github.com/ositaka/noor-ui/discussions)
- [GitHub Issues](https://github.com/ositaka/noor-ui/issues)

## Credits

Built with [Radix UI](https://www.radix-ui.com/), [Tailwind CSS](https://tailwindcss.com/), [Phosphor Icons](https://phosphoricons.com/), and [Next.js](https://nextjs.org/).

## License

[MIT](LICENSE)

---

**Built with love by [Nuno Marques](https://ositaka.com)**
