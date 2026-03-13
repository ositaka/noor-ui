/**
 * EN translations - utilities
 * Translations for the Utilities & Helpers documentation page
 */

export const utilities_page = {
utilitiesPage: {
    title: 'Utilities & Helpers',
    breadcrumb: 'Utilities',
    description: 'Helper functions and hooks for building RTL-first applications. These utilities handle common patterns like date formatting, text direction, and multilingual number display.',

    // Tabs
    hooksTab: 'Hooks',
    utilsTab: 'Utilities',

    // Status badges
    statusReady: 'Ready',
    statusComingSoon: 'Coming Soon',

    // Category badge
    hookBadge: 'Hook',

    // Shared section labels
    overview: 'Overview',
    usage: 'Usage',
    apiReference: 'API Reference',
    apiReferenceReturnValues: 'API Reference \u2014 Return Values',
    apiReferenceConfig: 'API Reference \u2014 Config',
    features: 'Features',
    comingSoon: 'Coming Soon',

    // Table headers
    tableHeaders: {
      parameter: 'Parameter',
      property: 'Property',
      type: 'Type',
      default: 'Default',
      description: 'Description',
      ltr: 'LTR',
      rtl: 'RTL',
    },

    // Hook card descriptions
    hooks: {
      useRelativeTime: {
        description: 'Format dates as relative time strings ("2 hours ago") with auto-updates and multilingual support',
      },
      useSwipeDirection: {
        description: 'RTL-aware swipe directions and animation values for gesture-based interactions',
      },
      useRTLAnimation: {
        description: 'Framer Motion animation variants that automatically adjust for RTL layouts',
      },
    },

    // Categories
    categories: {
      hooks: 'Hooks',
      dateTime: 'Date & Time',
      numbers: 'Numbers',
      textDirection: 'Text & Direction',
    },

    // Coming soon utility descriptions
    utils: {
      formatDate: {
        description: 'Locale-aware date formatting with Arabic numerals',
      },
      formatNumber: {
        description: 'Locale-aware number formatting',
      },
      toArabicNumerals: {
        description: 'Convert numbers to Eastern Arabic numerals (\u0660\u0661\u0662\u0663)',
      },
      getTextDirection: {
        description: 'Auto-detect text direction from content',
      },
      isRTL: {
        description: 'Check if a locale is RTL',
      },
    },

    // useRelativeTime section
    useRelativeTime: {
      subtitle: 'Format dates as relative time strings with auto-updates and multilingual support',
      overviewP1: 'formats dates as relative time strings (e.g., "2 hours ago", "\u0645\u0646\u0630 \u0633\u0627\u0639\u062a\u064a\u0646") and automatically updates them at a specified interval.',
      overviewP2: 'It supports 4 locales (English, Arabic, French, Urdu) and handles all time ranges from seconds to years with proper pluralization.',
      params: {
        date: 'The date to format (Date object or ISO string)',
        locale: 'Locale for translations',
        updateInterval: 'Update interval in milliseconds (default: 1 minute)',
        format: 'Format style (not yet implemented)',
      },
      features: [
        'Automatic updates at customizable intervals',
        'Full localization for 4 locales (en, ar, fr, ur)',
        'Handles all time ranges (seconds, minutes, hours, days, weeks, months, years)',
        'Proper pluralization for each locale',
        'Automatic cleanup on unmount',
        'TypeScript support with full type safety',
      ],
    },

    // useSwipeDirection section
    useSwipeDirection: {
      subtitle: 'RTL-aware swipe directions and animation values for gesture-based interactions',
      overviewP1: 'provides directional values that automatically adjust based on text direction. In LTR, swiping left goes "next" \u2014 in RTL, swiping right goes "next". Works with any gesture library (react-swipeable, Framer Motion, etc.).',
      overviewP2: 'for carousel/pagination animation direction.',
      overviewP2Prefix: 'Also exports a standalone',
      overviewP2Suffix: 'utility',
      returnValues: {
        next: 'Forward in content flow',
        previous: 'Backward in content flow',
        forward: 'Numeric direction multiplier',
        slideIn: 'Slide-in animation value',
        slideOut: 'Slide-out animation value',
        isRTL: 'Current direction state',
        mirror: 'Mirror any number or direction string',
      },
      mirrorLTR: 'identity',
      mirrorRTL: 'flipped',
      features: [
        'All directional values flip automatically in RTL',
        'Works with react-swipeable, Framer Motion, or any gesture library',
        'Provides both string directions and numeric multipliers',
      ],
      featureMirror: 'helper for custom values',
      featureGenericPrefix: 'Generic',
      featureCarousel: 'for pagination logic',
      featureCarouselPrefix: 'Standalone',
      featureTypescript: 'TypeScript support with full type safety',
    },

    // useRTLAnimation section
    useRTLAnimation: {
      subtitle: 'Framer Motion animation variants that automatically adjust for RTL layouts',
      overviewP1: 'provides pre-built Framer Motion variants for slides, fades, and dismissals that automatically flip direction in RTL. Configurable distance, duration, and easing.',
      overviewP2: 'for flipping horizontal drag bounds in RTL.',
      overviewP2Prefix: 'Also exports',
      configParams: {
        distance: 'Animation distance in pixels',
        duration: 'Animation duration in seconds',
        ease: 'Framer Motion easing function',
      },
      returnValues: {
        slideVariants: 'Full slide animation (enter/center/exit) \u2014 ideal for carousels',
        fadeSlideVariants: 'Fade + half-distance slide \u2014 smoother for content transitions',
        swipeVariants: 'Swipe-to-dismiss (initial/dismissed) \u2014 for cards and modals',
        isRTL: 'Current direction state',
        getDirection: 'Flip a direction value for RTL',
      },
      features: [
        'Three variant sets covering common animation patterns',
      ],
      featureCustomDirection: 'direction prop for bidirectional navigation',
      featureCustomDirectionPrefix: 'All variants accept a',
      featureConfigurable: 'Configurable distance, duration, and easing',
      featureBuiltOn: '\u2014 no duplicate RTL logic',
      featureBuiltOnPrefix: 'Built on',
      featureCompanion: 'for drag interactions',
      featureCompanionPrefix: 'Companion',
      featureTypescript: 'TypeScript support with full type safety',
    },
  },
}
