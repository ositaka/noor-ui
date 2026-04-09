# Task: Generate Unit Tests for noorui-rtl Component Library

## Context

This is **noorui-rtl**, an RTL-first bidirectional React component library published on npm. It has **74 components** in `components/ui/` and **zero unit tests**. We need comprehensive tests before v1 launch.

## Test Infrastructure (already set up)

- **Runner**: Vitest with jsdom environment
- **Libraries**: `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`
- **Config**: `vitest.config.ts` (unit tests use the `unit` project with jsdom)
- **Setup**: `vitest.setup.ts` (cleanup, Next.js router mock, matchMedia mock)
- **Run**: `pnpm test --run` (or `pnpm test:watch`)
- **Coverage**: `pnpm test:coverage`

## Where to put tests

Create test files as `components/ui/__tests__/{component-name}.test.tsx`

## What to test for EVERY component

### 1. Renders without crashing
```tsx
it('renders without crashing', () => {
  render(<Component />);
});
```

### 2. Props behavior
- Default props render correctly
- Each variant/size renders the correct classes
- Disabled state
- Custom className merging

### 3. RTL/LTR behavior (THIS IS THE KEY DIFFERENTIATOR)
Many components use logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`, `start`, `end`) and respond to `dir="rtl"`. Test both directions:
```tsx
it('renders correctly in RTL', () => {
  render(
    <div dir="rtl">
      <Component />
    </div>
  );
  // Assert layout/structure is correct
});
```

### 4. Accessibility
- Correct ARIA attributes
- Keyboard navigation where applicable
- Role attributes
- Label associations

### 5. Event handlers
- onClick, onChange, onSelect, etc. fire correctly
- Controlled vs uncontrolled behavior

### 6. Bilingual text props
Many components accept both English and Arabic props (e.g., `title` + `titleAr`, `name` + `nameAr`). Test that Arabic props are used when available.

## Component Priority Order

### Tier 1 — Core (test first)
These are the most used components. Test thoroughly.

| Component | File | Key things to test |
|-----------|------|-------------------|
| Button | `button.tsx` | variants (primary/secondary/destructive/outline/ghost/link), sizes (sm/md/lg/xl/icon), loading state, disabled, icon placement |
| Input | `input.tsx` | types (text/email/password/number), disabled, placeholder, RTL text alignment |
| Card | `card.tsx` | Card + CardHeader + CardTitle + CardDescription + CardContent + CardFooter composition |
| Badge | `badge.tsx` | variants (default/secondary/destructive/outline/success/warning/info) |
| Label | `label.tsx` | htmlFor association, required indicator |
| Separator | `separator.tsx` | horizontal/vertical orientation |
| Avatar | `avatar.tsx` | image loading, fallback text, sizes |

### Tier 2 — Forms
| Component | File | Key things to test |
|-----------|------|-------------------|
| Checkbox | `checkbox.tsx` | checked/unchecked/indeterminate, onCheckedChange |
| RadioGroup | `radio-group.tsx` | selection, value change, disabled items |
| Select | `select.tsx` | open/close, selection, placeholder, disabled |
| Switch | `switch.tsx` | toggle on/off, controlled/uncontrolled |
| Slider | `slider.tsx` | value changes, min/max/step, RTL direction |
| Textarea | `textarea.tsx` | value, placeholder, disabled, resize |
| Form | `form.tsx` | validation, error messages, submission |
| NumberInput | `number-input.tsx` | increment/decrement, min/max bounds, step |
| DatePicker | `date-picker.tsx` | date selection, format, locale |
| TimePicker | `time-picker.tsx` | time selection, 12h/24h format |
| FileUpload | `file-upload.tsx` | file selection, max size, accept types |
| RangeSlider | `range-slider.tsx` | dual handles, value range |
| Calendar | `calendar.tsx` | date navigation, selection, Hijri mode |

### Tier 3 — Navigation & Overlay
| Component | File | Key things to test |
|-----------|------|-------------------|
| Tabs | `tabs.tsx` | tab switching, controlled/uncontrolled, RTL order |
| Accordion | `accordion.tsx` | expand/collapse, single/multiple mode |
| DropdownMenu | `dropdown-menu.tsx` | open/close, item selection, keyboard nav |
| Dialog | `dialog.tsx` | open/close, focus trap, escape key |
| Sheet | `sheet.tsx` | open/close, side (start/end), RTL side flipping |
| Popover | `popover.tsx` | open/close, positioning |
| ContextMenu | `context-menu.tsx` | right-click trigger, item selection |
| Breadcrumb | `breadcrumb.tsx` | separator rendering, RTL separator direction |
| Pagination | `pagination.tsx` | page navigation, previous/next, RTL arrow flip |
| Collapsible | `collapsible.tsx` | open/close, animation |
| Command | `command.tsx` | search filtering, keyboard navigation |
| ScrollArea | `scroll-area.tsx` | scrollbar rendering |

### Tier 4 — Data Display
| Component | File | Key things to test |
|-----------|------|-------------------|
| Table | `table.tsx` | renders rows/columns, RTL text alignment |
| DataTable | `data-table.tsx` | sorting, pagination, search, column rendering |
| StatsCard | `stats-card.tsx` | value display, trend indicator |
| ListingCard | `listing-card.tsx` | image, title, price, badges |
| FeatureCard | `feature-card.tsx` | icon, title, description |
| EmptyState | `empty-state.tsx` | icon, title, description, action |
| Blockquote | `blockquote.tsx` | variants (default/accent/subtle), author, source |
| Timeline | `timeline.tsx` | items rendering, status (complete/current/upcoming), RTL line position |
| Chart | `chart.tsx` | renders without crashing (canvas-based, limited DOM testing) |

### Tier 5 — Feedback & Utility
| Component | File | Key things to test |
|-----------|------|-------------------|
| Alert | `alert.tsx` | variants (default/destructive/success/warning/info), icon |
| Callout | `callout.tsx` | types (info/success/warning/error/tip), title |
| Toast | `toast.tsx` | variants, title, description, action |
| Tooltip | `tooltip.tsx` | hover trigger, content display |
| Progress | `progress.tsx` | value rendering, max |
| Skeleton | `skeleton.tsx` | renders placeholder |
| LoadingSpinner | `loading-spinner.tsx` | sizes, label |
| Kbd | `kbd.tsx` | key rendering, combos |

### Tier 6 — GCC-Specific
| Component | File | Key things to test |
|-----------|------|-------------------|
| ArabicNumber | `arabic-number.tsx` | formats (number/currency/percent/ordinal), Eastern Arabic numerals |
| HijriDate | `hijri-date.tsx` | Hijri date display, format options |
| PrayerTimes | `prayer-times.tsx` | prayer list, next prayer highlight, countdown |
| ZakatCalculator | `zakat-calculator.tsx` | calculation logic, nisab threshold |

### Tier 7 — AI/LLM Components
| Component | File | Key things to test |
|-----------|------|-------------------|
| ChatMessage | `chat-message.tsx` | role (user/assistant), content, actions |
| PromptInput | `prompt-input.tsx` | value, send, multiline |
| ModelSelector | `model-selector.tsx` | model selection, groups |
| TokenCounter | `token-counter.tsx` | token display, warning/danger thresholds |
| StreamingText | `streaming-text.tsx` | text streaming simulation |
| ThinkingIndicator | `thinking-indicator.tsx` | animation rendering |
| MessageActions | `message-actions.tsx` | button visibility, click handlers |
| ConversationHistory | `conversation-history.tsx` | list rendering, search, selection |
| ParameterSlider | `parameter-slider.tsx` | value changes, presets |

### Tier 8 — Composite/Layout
| Component | File | Key things to test |
|-----------|------|-------------------|
| DashboardShell | `dashboard-shell.tsx` | nav items, user info, responsive |
| Carousel | `carousel.tsx` | slide navigation, dots, autoplay |
| Stepper | `stepper.tsx` | step navigation, current step, variants |
| NotificationCenter | `notification-center.tsx` | notification list, mark read, clear |
| UserMenu | `user-menu.tsx` | dropdown trigger, profile/settings/logout actions |
| ReactionPicker | `reaction-picker.tsx` | emoji selection, counts |
| UserBadge | `user-badge.tsx` | avatar + name display |

## Example test file

Here's a complete example for Button to set the pattern:

```tsx
// components/ui/__tests__/button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders all variants', () => {
    const variants = ['primary', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;
    for (const variant of variants) {
      const { unmount } = render(<Button variant={variant}>Test</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      unmount();
    }
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'icon'] as const;
    for (const size of sizes) {
      const { unmount } = render(<Button size={size}>Test</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
      unmount();
    }
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders as child element with asChild', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    expect(screen.getByRole('link', { name: 'Link Button' })).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Button>زر</Button>
      </div>
    );
    expect(screen.getByRole('button', { name: 'زر' })).toBeInTheDocument();
  });
});
```

## Important patterns for this codebase

### Direction Provider
Components that use `useDirection()` need to be wrapped:
```tsx
import { DirectionProvider } from '../../providers/direction-provider';

render(
  <DirectionProvider controlledDirection="rtl" controlledLocale="ar">
    <Component />
  </DirectionProvider>
);
```

### Radix portaled components
Dialog, DropdownMenu, Popover, Sheet, ContextMenu, Select, Command render in portals. Use `within(document.body)` or `screen` to find portal content:
```tsx
await user.click(screen.getByRole('button', { name: /open/i }));
expect(screen.getByRole('dialog')).toBeInTheDocument();
```

### Components with `titleAr` / `nameAr` bilingual props
```tsx
it('uses Arabic title when titleAr is provided and direction is RTL', () => {
  render(
    <DirectionProvider controlledDirection="rtl" controlledLocale="ar">
      <Component title="English" titleAr="عربي" />
    </DirectionProvider>
  );
  expect(screen.getByText('عربي')).toBeInTheDocument();
});
```

### ArabicNumber formatting
```tsx
it('formats with Eastern Arabic numerals', () => {
  render(<ArabicNumber value={1234} />);
  expect(screen.getByText('١٬٢٣٤')).toBeInTheDocument();
});
```

## Execution plan

1. Start with Tier 1 (Core) — get the pattern right
2. Move through tiers in order
3. Run `pnpm test --run` after each tier to verify
4. Run `pnpm test:coverage` at the end to check coverage
5. Target: 80%+ line coverage for all components

## Rules

- One test file per component
- Use `describe` blocks to group related tests
- Use `it` (not `test`) for consistency
- Prefer `screen.getByRole` over `getByText` for accessibility
- Don't test implementation details (CSS classes) unless testing variants
- Don't mock components — test real rendering
- Keep tests fast — no unnecessary `waitFor` unless testing async behavior
- Use `userEvent` (not `fireEvent`) for user interactions
