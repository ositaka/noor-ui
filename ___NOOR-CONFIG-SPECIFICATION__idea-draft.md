# Noor UI Configuration Specification

A comprehensive configuration system for building truly localized Arabic-first interfaces.

---

## Overview

The `NoorConfig` object is the central configuration for all localization, typography, and behavioral settings in Noor UI. It can be set globally via a provider, overridden per-component, or selected from regional presets.

```tsx
import { NoorProvider } from 'noorui';

<NoorProvider config={noorConfig}>
  <App />
</NoorProvider>
```

---

## Complete Configuration Schema

```typescript
interface NoorConfig {
  // ─────────────────────────────────────────────
  // DIRECTION & LANGUAGE
  // ─────────────────────────────────────────────
  
  /**
   * Text and layout direction
   * @default 'auto'
   */
  direction: 'ltr' | 'rtl' | 'auto';
  
  /**
   * BCP 47 language tag (e.g., 'ar-SA', 'ar-MA', 'en-US')
   * Used for locale-aware formatting and auto-detection
   * @default 'ar-SA'
   */
  locale: string;

  // ─────────────────────────────────────────────
  // TYPOGRAPHY
  // ─────────────────────────────────────────────
  
  typography: {
    /**
     * Font size multiplier for RTL scripts
     * Applied automatically when direction is RTL
     * @default 1.125 (12.5% larger)
     */
    rtlFontSizeScale: number;
    
    /**
     * Line height multiplier for RTL scripts
     * Accounts for diacritics and dots
     * @default 1.15 (results in ~1.7 when base is 1.5)
     */
    rtlLineHeightScale: number;
    
    /**
     * Font weight adjustment for RTL (added to base weight)
     * Compensates for lighter appearance of Arabic scripts
     * @default 100 (e.g., 400 becomes 500)
     */
    rtlFontWeightOffset: number;
    
    /**
     * Font families by script
     */
    fontFamilies: {
      latin: string;
      arabic: string;
      hebrew?: string;
      urdu?: string;
      farsi?: string;
    };
    
    /**
     * Whether to enforce zero letter-spacing in RTL
     * Prevents breaking of connected scripts
     * @default true
     */
    enforceRtlLetterSpacing: boolean;
  };

  // ─────────────────────────────────────────────
  // NUMERAL SYSTEM
  // ─────────────────────────────────────────────
  
  numerals: {
    /**
     * Which numeral system to display
     * - 'western': 0123456789
     * - 'eastern': ٠١٢٣٤٥٦٧٨٩
     * - 'auto': Based on locale (ar-MA → western, ar-SA → eastern)
     * @default 'auto'
     */
    system: 'western' | 'eastern' | 'auto';
    
    /**
     * Contexts where Western numerals are always used
     * regardless of system setting (e.g., phone numbers, technical data)
     * @default ['phone', 'code', 'scientific']
     */
    westernContexts: Array<'phone' | 'code' | 'scientific' | 'financial' | 'none'>;
  };

  // ─────────────────────────────────────────────
  // NUMBER FORMATTING
  // ─────────────────────────────────────────────
  
  numberFormat: {
    /**
     * Decimal separator character
     * @default based on locale ('.' for en, '٫' for ar)
     */
    decimalSeparator: '.' | ',' | '٫';
    
    /**
     * Thousands grouping separator
     * @default based on locale (',' for en, '٬' for ar)
     */
    thousandsSeparator: ',' | '.' | '٬' | ' ' | '';
    
    /**
     * Number of decimal places for general display
     * @default 2
     */
    defaultDecimalPlaces: number;
    
    /**
     * Percentage symbol position
     * @default 'after'
     */
    percentPosition: 'before' | 'after';
    
    /**
     * Percentage symbol to use
     * @default '%' (could also be '٪')
     */
    percentSymbol: string;
  };

  // ─────────────────────────────────────────────
  // CURRENCY
  // ─────────────────────────────────────────────
  
  currency: {
    /**
     * Default currency code (ISO 4217)
     * @default 'SAR'
     */
    defaultCurrency: string;
    
    /**
     * How to display currency
     * - 'symbol': ر.س or $
     * - 'code': SAR, USD
     * - 'name': ريال سعودي, Saudi Riyal
     * @default 'symbol'
     */
    display: 'symbol' | 'code' | 'name';
    
    /**
     * Currency symbol/code position relative to amount
     * @default 'after' for Arabic, 'before' for English
     */
    position: 'before' | 'after' | 'auto';
    
    /**
     * Space between amount and currency symbol
     * @default true
     */
    spaceBetween: boolean;
    
    /**
     * Custom currency symbols (override defaults)
     */
    symbols?: Record<string, string>;
  };

  // ─────────────────────────────────────────────
  // CALENDAR & DATES
  // ─────────────────────────────────────────────
  
  calendar: {
    /**
     * Primary calendar system
     * @default 'gregorian'
     */
    system: 'gregorian' | 'hijri';
    
    /**
     * Show secondary calendar alongside primary
     * @default false
     */
    showSecondaryCalendar: boolean;
    
    /**
     * First day of the week
     * - 'saturday': Common in Gulf (SA, AE, etc.)
     * - 'sunday': Common in US, parts of Middle East
     * - 'monday': Common in Europe, Maghreb
     * @default 'saturday'
     */
    weekStartsOn: 'saturday' | 'sunday' | 'monday';
    
    /**
     * Weekend days (for styling in calendars)
     * @default ['friday', 'saturday'] for Gulf
     */
    weekendDays: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;
    
    /**
     * Date format pattern
     * @default 'DD/MM/YYYY'
     */
    dateFormat: string;
    
    /**
     * Time format
     * @default '12h'
     */
    timeFormat: '12h' | '24h';
    
    /**
     * Month names style in Arabic
     * - 'arabic': محرم، صفر، etc. (Hijri) / يناير، فبراير (Gregorian Arabic names)
     * - 'transliterated': يناير، فبراير (from English)
     * - 'numeric': 1, 2, 3
     * @default 'arabic'
     */
    monthNameStyle: 'arabic' | 'transliterated' | 'numeric';
  };

  // ─────────────────────────────────────────────
  // ICONS & VISUAL MIRRORING
  // ─────────────────────────────────────────────
  
  mirroring: {
    /**
     * Icon mirroring behavior
     * - 'auto': Mirror directional icons only (arrows, chevrons, etc.)
     * - 'all': Mirror all icons
     * - 'none': Never mirror icons
     * @default 'auto'
     */
    icons: 'auto' | 'all' | 'none';
    
    /**
     * List of icon names that should NOT be mirrored
     * even when mirroring is enabled
     * @default ['play', 'pause', 'check', 'search', 'home', 'settings', ...]
     */
    iconExceptions: string[];
    
    /**
     * Mirror illustrations and images
     * @default false
     */
    illustrations: boolean;
    
    /**
     * Shadow/light source direction
     * - 'fixed': Always top-left (don't flip)
     * - 'mirrored': Flip with direction
     * @default 'fixed'
     */
    shadowDirection: 'fixed' | 'mirrored';
  };

  // ─────────────────────────────────────────────
  // MOTION & ANIMATION
  // ─────────────────────────────────────────────
  
  motion: {
    /**
     * Animation direction for slides, reveals, etc.
     * - 'auto': Based on document direction
     * - 'ltr': Always left-to-right
     * - 'rtl': Always right-to-left
     * @default 'auto'
     */
    direction: 'auto' | 'ltr' | 'rtl';
    
    /**
     * Respect user's prefers-reduced-motion setting
     * @default true
     */
    respectReducedMotion: boolean;
    
    /**
     * Global animation duration multiplier
     * @default 1
     */
    durationScale: number;
  };

  // ─────────────────────────────────────────────
  // COMPONENT DEFAULTS
  // ─────────────────────────────────────────────
  
  components: {
    /**
     * Modal close button position
     * - 'auto': Based on direction (end side)
     * - 'start': Always inline-start
     * - 'end': Always inline-end
     * @default 'auto'
     */
    modalClosePosition: 'auto' | 'start' | 'end';
    
    /**
     * Default tooltip placement
     * @default 'top'
     */
    tooltipPlacement: 'top' | 'bottom' | 'start' | 'end' | 'auto';
    
    /**
     * Default popover alignment
     * @default 'start'
     */
    popoverAlignment: 'start' | 'center' | 'end';
    
    /**
     * Default sidebar position
     * - 'auto': Start side (left in LTR, right in RTL)
     * @default 'auto'
     */
    sidebarPosition: 'auto' | 'start' | 'end';
    
    /**
     * Toast/notification position
     * @default 'top-end'
     */
    toastPosition: 'top-start' | 'top-center' | 'top-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
    
    /**
     * Drawer default side
     * @default 'start'
     */
    drawerSide: 'start' | 'end' | 'top' | 'bottom';
    
    /**
     * Breadcrumb separator
     * @default '/' (auto-flips visually)
     */
    breadcrumbSeparator: string;
    
    /**
     * Pagination style
     * - 'arrows': < 1 2 3 >
     * - 'text': Previous / Next
     * @default 'arrows'
     */
    paginationStyle: 'arrows' | 'text';
  };

  // ─────────────────────────────────────────────
  // FORM BEHAVIOR
  // ─────────────────────────────────────────────
  
  forms: {
    /**
     * Input text direction when content language is unknown
     * @default 'auto'
     */
    inputDirection: 'ltr' | 'rtl' | 'auto';
    
    /**
     * Label position relative to input
     * @default 'top'
     */
    labelPosition: 'top' | 'start' | 'floating';
    
    /**
     * Validation message position
     * @default 'bottom'
     */
    validationPosition: 'bottom' | 'end';
    
    /**
     * Required field indicator
     * @default '*'
     */
    requiredIndicator: string;
    
    /**
     * Required indicator position
     * @default 'after'
     */
    requiredIndicatorPosition: 'before' | 'after';
    
    /**
     * Checkbox/radio position relative to label
     * - 'auto': Start side (flips with direction)
     * @default 'auto'
     */
    checkboxPosition: 'auto' | 'start' | 'end';
  };

  // ─────────────────────────────────────────────
  // DATA DISPLAY
  // ─────────────────────────────────────────────
  
  dataDisplay: {
    /**
     * Table column order in RTL
     * - 'reversed': Columns flip order
     * - 'preserved': Columns stay in defined order
     * @default 'reversed'
     */
    tableColumnOrder: 'reversed' | 'preserved';
    
    /**
     * Empty state text alignment
     * @default 'center'
     */
    emptyStateAlignment: 'start' | 'center';
    
    /**
     * Progress bar fill direction
     * - 'auto': Based on document direction
     * @default 'auto'
     */
    progressDirection: 'auto' | 'ltr' | 'rtl';
    
    /**
     * Timeline layout direction
     * @default 'auto'
     */
    timelineDirection: 'auto' | 'ltr' | 'rtl';
  };

  // ─────────────────────────────────────────────
  // ACCESSIBILITY
  // ─────────────────────────────────────────────
  
  accessibility: {
    /**
     * Announce direction changes to screen readers
     * @default true
     */
    announceDirectionChanges: boolean;
    
    /**
     * Focus visible style
     * @default 'ring'
     */
    focusStyle: 'ring' | 'outline' | 'both';
    
    /**
     * Minimum touch target size (in pixels)
     * @default 44
     */
    minTouchTarget: number;
  };

  // ─────────────────────────────────────────────
  // BIDIRECTIONAL TEXT
  // ─────────────────────────────────────────────
  
  bidi: {
    /**
     * Automatically isolate embedded opposite-direction text
     * @default true
     */
    autoIsolate: boolean;
    
    /**
     * Patterns to auto-isolate (regex strings)
     * @default [URLs, emails, @mentions, hashtags, phone numbers]
     */
    isolatePatterns: string[];
  };

  // ─────────────────────────────────────────────
  // KEYBOARD & GESTURES
  // ─────────────────────────────────────────────
  
  interaction: {
    /**
     * Arrow key navigation direction mapping
     * - 'logical': Left = backward in RTL, Right = forward in RTL
     * - 'physical': Keys always map to physical direction
     * @default 'logical'
     */
    arrowKeyMapping: 'logical' | 'physical';
    
    /**
     * Swipe gesture direction mapping
     * - 'logical': Swipe left = forward in RTL
     * - 'physical': Swipe direction is literal
     * @default 'logical'
     */
    swipeMapping: 'logical' | 'physical';
  };
}
```

---

## Regional Presets

Noor UI provides pre-configured presets for common regional requirements:

```typescript
import { presets } from 'noorui';

// Gulf Cooperation Council (Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman)
presets.gulf = {
  direction: 'rtl',
  locale: 'ar-SA',
  numerals: { system: 'eastern' },
  calendar: {
    weekStartsOn: 'saturday',
    weekendDays: ['friday', 'saturday'],
    system: 'gregorian',
    showSecondaryCalendar: true, // Show Hijri
  },
  currency: {
    defaultCurrency: 'SAR',
    position: 'after',
  },
  // ... other Gulf-specific defaults
};

// Maghreb (Morocco, Algeria, Tunisia, Libya)
presets.maghreb = {
  direction: 'rtl',
  locale: 'ar-MA',
  numerals: { system: 'western' },
  calendar: {
    weekStartsOn: 'monday',
    weekendDays: ['saturday', 'sunday'],
    system: 'gregorian',
  },
  currency: {
    defaultCurrency: 'MAD',
    position: 'after',
  },
  // ... other Maghreb-specific defaults
};

// Levant (Lebanon, Syria, Jordan, Palestine)
presets.levant = {
  direction: 'rtl',
  locale: 'ar-LB',
  numerals: { system: 'eastern' },
  calendar: {
    weekStartsOn: 'monday',
    weekendDays: ['saturday', 'sunday'],
  },
  // ... other Levant-specific defaults
};

// Egypt
presets.egypt = {
  direction: 'rtl',
  locale: 'ar-EG',
  numerals: { system: 'eastern' },
  calendar: {
    weekStartsOn: 'saturday',
    weekendDays: ['friday', 'saturday'],
  },
  currency: {
    defaultCurrency: 'EGP',
    position: 'after',
  },
};

// English (International)
presets.english = {
  direction: 'ltr',
  locale: 'en-US',
  numerals: { system: 'western' },
  calendar: {
    weekStartsOn: 'sunday',
    weekendDays: ['saturday', 'sunday'],
  },
  currency: {
    defaultCurrency: 'USD',
    position: 'before',
  },
};

// Hebrew (Israel)
presets.hebrew = {
  direction: 'rtl',
  locale: 'he-IL',
  numerals: { system: 'western' },
  typography: {
    rtlFontSizeScale: 1, // Hebrew doesn't need size adjustment
  },
  calendar: {
    weekStartsOn: 'sunday',
    weekendDays: ['friday', 'saturday'],
  },
  currency: {
    defaultCurrency: 'ILS',
    position: 'before',
  },
};
```

---

## Usage Examples

### Basic Setup with Preset

```tsx
import { NoorProvider, presets } from 'noorui';

function App() {
  return (
    <NoorProvider config={presets.gulf}>
      <MyApplication />
    </NoorProvider>
  );
}
```

### Custom Configuration

```tsx
import { NoorProvider, presets, mergeConfig } from 'noorui';

const customConfig = mergeConfig(presets.gulf, {
  numerals: { system: 'western' }, // Override just numerals
  currency: { defaultCurrency: 'AED' },
});

function App() {
  return (
    <NoorProvider config={customConfig}>
      <MyApplication />
    </NoorProvider>
  );
}
```

### Dynamic Locale Switching

```tsx
import { NoorProvider, presets } from 'noorui';
import { useState } from 'react';

function App() {
  const [locale, setLocale] = useState<'ar' | 'en'>('ar');
  
  const config = locale === 'ar' ? presets.gulf : presets.english;
  
  return (
    <NoorProvider config={config}>
      <LocaleSwitcher onChange={setLocale} />
      <MyApplication />
    </NoorProvider>
  );
}
```

### Component-Level Override

```tsx
import { NumberInput, useNoorConfig } from 'noorui';

// Force Western numerals for a specific input
<NumberInput
  value={phoneNumber}
  numeralSystem="western"  // Override global setting
/>

// Or use the hook for custom components
function PriceDisplay({ amount }) {
  const { formatNumber, formatCurrency } = useNoorConfig();
  
  return <span>{formatCurrency(amount)}</span>;
}
```

---

## Utility Functions

The config also exposes utility functions:

```typescript
const { 
  formatNumber,      // (1234.56) → "١٬٢٣٤٫٥٦"
  formatCurrency,    // (150, 'SAR') → "١٥٠ ر.س"
  formatDate,        // (date) → "١٥/٠٣/٢٠٢٥"
  formatTime,        // (date) → "٣:٤٥ م"
  formatPercent,     // (0.75) → "٧٥٪"
  toEasternNumerals, // "123" → "١٢٣"
  toWesternNumerals, // "١٢٣" → "123"
  isRTL,             // () → true/false
  getDirection,      // () → 'rtl' | 'ltr'
} = useNoorConfig();
```

---

## CSS Custom Properties

The config automatically sets CSS custom properties on the root element:

```css
:root {
  /* Direction */
  --noor-direction: rtl;
  
  /* Typography */
  --noor-font-size-scale: 1.125;
  --noor-line-height-scale: 1.15;
  --noor-font-weight-offset: 100;
  --noor-font-family: 'IBM Plex Arabic', sans-serif;
  
  /* Spacing (logical properties helpers) */
  --noor-space-start: var(--noor-space-right);
  --noor-space-end: var(--noor-space-left);
  
  /* Component positioning */
  --noor-modal-close-position: left;
  --noor-sidebar-position: right;
  --noor-toast-position: top-left;
}
```

---

## Migration & Defaults

All settings have sensible defaults. You can start with zero configuration:

```tsx
// This works! Uses Gulf preset as default
<NoorProvider>
  <App />
</NoorProvider>
```

Or specify only what you need to change:

```tsx
<NoorProvider config={{ numerals: { system: 'western' } }}>
  <App />
</NoorProvider>
```

---

## TypeScript Support

Full TypeScript support with autocompletion:

```typescript
import type { NoorConfig, NoorPreset, NumeralSystem } from 'noorui';

const myConfig: Partial<NoorConfig> = {
  numerals: {
    system: 'eastern', // ✓ Autocomplete works
  },
};
```

---

*This configuration system makes Noor UI the most comprehensive RTL-aware design system available, treating localization as a first-class architectural concern rather than an afterthought.*
