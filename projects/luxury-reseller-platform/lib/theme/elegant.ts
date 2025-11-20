// Elegant Theme Configuration
// Luxury theme for Dubai-Iran reseller platform

export const elegantTheme = {
  name: 'elegant',
  colors: {
    primary: {
      50: 'hsl(345, 60%, 95%)',
      100: 'hsl(345, 60%, 90%)',
      200: 'hsl(345, 60%, 80%)',
      300: 'hsl(345, 60%, 70%)',
      400: 'hsl(345, 60%, 60%)',
      500: 'hsl(345, 60%, 45%)', // Main burgundy
      600: 'hsl(345, 60%, 40%)',
      700: 'hsl(345, 60%, 30%)',
      800: 'hsl(345, 60%, 20%)',
      900: 'hsl(345, 60%, 10%)',
    },
    secondary: {
      50: 'hsl(48, 65%, 95%)',
      100: 'hsl(48, 65%, 90%)',
      200: 'hsl(48, 65%, 80%)',
      300: 'hsl(48, 65%, 70%)',
      400: 'hsl(48, 65%, 60%)',
      500: 'hsl(48, 65%, 48%)', // Main gold
      600: 'hsl(48, 65%, 40%)',
      700: 'hsl(48, 65%, 30%)',
      800: 'hsl(48, 65%, 20%)',
      900: 'hsl(48, 65%, 10%)',
    },
    accent: {
      50: 'hsl(355, 30%, 95%)',
      100: 'hsl(355, 30%, 90%)',
      200: 'hsl(355, 30%, 80%)',
      300: 'hsl(355, 30%, 70%)',
      400: 'hsl(355, 30%, 60%)',
      500: 'hsl(355, 30%, 60%)', // Main rose gold
      600: 'hsl(355, 30%, 50%)',
      700: 'hsl(355, 30%, 40%)',
      800: 'hsl(355, 30%, 30%)',
      900: 'hsl(355, 30%, 20%)',
    },
  },
  typography: {
    fontFamily: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Inter', system-ui, sans-serif",
      persian: "'Vazirmatn', system-ui, sans-serif",
      arabic: "'IBM Plex Sans Arabic', system-ui, sans-serif",
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '1.75',
    },
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
    primary: '0 10px 30px rgba(139, 21, 56, 0.15)',
    gold: '0 10px 30px rgba(212, 175, 55, 0.2)',
  },
  transitions: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
    },
    easing: {
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
    },
  },
} as const

export type ElegantTheme = typeof elegantTheme
