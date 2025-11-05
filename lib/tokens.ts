/**
 * Design Tokens
 *
 * Central source of truth for all design decisions.
 * These tokens power all 4 themes (Minimal, Futuristic, Cozy, Artistic).
 */

export const tokens = {
  colors: {
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
      950: '#1e1b4b',
    },
    secondary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
      950: '#042f2e',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
  },

  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
  },

  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      arabic: ['IBM Plex Sans Arabic', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
      serif: ['Georgia', 'serif'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000',
  },

  radius: {
    none: '0',
    sm: '0.125rem',   // 2px
    DEFAULT: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },

  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const

export type Theme = 'minimal' | 'futuristic' | 'cozy' | 'artistic'
export type Direction = 'ltr' | 'rtl'

/**
 * Theme-specific configurations
 */
export const themeConfig: Record<Theme, {
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  radius: string
  features: string[]
  featuresAr: string[]
}> = {
  minimal: {
    name: 'Minimal',
    nameAr: 'بسيط',
    description: 'Clean design with lots of white space and subtle borders',
    descriptionAr: 'تصميم نظيف مع مساحات بيضاء كبيرة وحدود دقيقة',
    radius: '0.25rem',
    features: [
      'Maximum readability',
      'Subtle borders',
      'Generous spacing',
      'Focused content'
    ],
    featuresAr: [
      'أقصى قابلية للقراءة',
      'حدود دقيقة',
      'مسافات سخية',
      'محتوى مركّز'
    ]
  },
  futuristic: {
    name: 'Futuristic',
    nameAr: 'مستقبلي',
    description: 'Dark theme with gradients and glassmorphism effects',
    descriptionAr: 'ثيم داكن مع تدرجات وتأثيرات زجاجية',
    radius: '0.75rem',
    features: [
      'Dark mode optimized',
      'Gradient accents',
      'Glassmorphism',
      'Enterprise feel'
    ],
    featuresAr: [
      'محسّن للوضع الداكن',
      'لهجات متدرجة',
      'تأثير زجاجي',
      'طابع مؤسسي'
    ]
  },
  cozy: {
    name: 'Cozy',
    nameAr: 'دافئ',
    description: 'Warm tones with softer corners and gentle shadows',
    descriptionAr: 'ألوان دافئة مع زوايا ناعمة وظلال لطيفة',
    radius: '1rem',
    features: [
      'Warm color palette',
      'Rounded corners',
      'Soft shadows',
      'Personal touch'
    ],
    featuresAr: [
      'لوحة ألوان دافئة',
      'زوايا مدورة',
      'ظلال ناعمة',
      'لمسة شخصية'
    ]
  },
  artistic: {
    name: 'Artistic',
    nameAr: 'فني',
    description: 'Typography-focused with elegant serif accents',
    descriptionAr: 'تركيز على الطباعة مع لهجات أنيقة',
    radius: '0.125rem',
    features: [
      'Typography emphasis',
      'Serif accents',
      'Creative layouts',
      'Poetry-friendly'
    ],
    featuresAr: [
      'تأكيد على الطباعة',
      'لهجات خطية',
      'تخطيطات إبداعية',
      'مناسب للشعر'
    ]
  }
}

/**
 * Apply theme tokens to CSS custom properties
 */
export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement) {
  root.classList.remove('theme-minimal', 'theme-futuristic', 'theme-cozy', 'theme-artistic')
  root.classList.add(`theme-${theme}`)
}

/**
 * Get current direction
 */
export function getDirection(): Direction {
  if (typeof document === 'undefined') return 'ltr'
  return document.documentElement.dir as Direction || 'ltr'
}

/**
 * Set direction
 */
export function setDirection(direction: Direction) {
  if (typeof document === 'undefined') return
  document.documentElement.dir = direction
  document.documentElement.lang = direction === 'rtl' ? 'ar' : 'en'
}
