/**
 * EN translations - themes
 * Auto-generated from lib/i18n.ts
 */

export const themes = {
themes: {
      title: 'Themes',
      description: 'Choose from 4 beautiful themes, all powered by the same design tokens',
      switch: 'Switch Theme',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
    },

themesPage: {
      title: 'Themes',
      subtitle: 'Four distinct visual themes, all powered by the same design tokens. Each theme has unique typography, spacing, and personality while maintaining accessibility and consistency.',
      switcherNotice: 'Try the floating theme switcher in the bottom-right corner to see changes instantly across the entire site!',
      availableThemes: 'Available Themes',
      themeSpecs: 'Theme Specifications',
      livePreview: 'Live Preview',
      implementation: 'Implementation',

      minimal: {
        name: 'Minimal Theme',
        description: 'Clean, professional, and focused',
        typography: 'Typography',
        visualStyle: 'Visual Style',
        bestFor: 'Best For',
        bestForText: 'Enterprise applications, dashboards, data-heavy interfaces, professional tools',
        typographyDetails: [
          'Font: Inter (sans-serif)',
          'Line-height: 1.6',
          'Letter-spacing: -0.02em (headings)',
          'Font-weight: 600 (headings)',
        ],
        visualStyleDetails: [
          'Border-radius: 0.25rem',
          'Colors: Neutral grays',
          'Spacing: Balanced',
          'Borders: Subtle',
        ],
      },

      futuristic: {
        name: 'Futuristic Theme',
        description: 'Dark, modern, and compact',
        bestForText: 'Tech products, developer tools, gaming interfaces, dark-mode-first applications',
        typographyDetails: [
          'Font: Inter (sans-serif)',
          'Line-height: 1.5 (compact)',
          'Letter-spacing: -0.025em',
          'Font-weight: 600 (strong)',
        ],
        visualStyleDetails: [
          'Border-radius: 0.75rem',
          'Colors: Purples, cyans',
          'Spacing: Tighter',
          'Style: Glassmorphism',
        ],
      },

      cozy: {
        name: 'Cozy Theme',
        description: 'Warm, spacious, and comfortable',
        bestForText: 'Personal blogs, community platforms, lifestyle apps, content-focused sites',
        typographyDetails: [
          'Font: Inter (sans-serif)',
          'Line-height: 1.7 (relaxed)',
          'Letter-spacing: 0.015em',
          'Headings: 1.5rem margin',
        ],
        visualStyleDetails: [
          'Border-radius: 1.25rem (very rounded)',
          'Colors: Warm oranges, ambers',
          'Spacing: Very generous',
          'Padding: 2rem cards, 0.75rem buttons',
        ],
      },

      artistic: {
        name: 'Artistic Theme',
        description: 'Elegant, typography-focused, serif fonts',
        bestForText: 'Poetry, literature, magazines, portfolios, creative writing platforms',
        typographyDetails: [
          'Font: Georgia (serif)',
          'Arabic: Noto Naskh Arabic (serif)',
          'Line-height: 1.8-1.9',
          'Letter-spacing: 0.01-0.02em',
          'Font-weight: 400 (elegant)',
        ],
        visualStyleDetails: [
          'Border-radius: 0.125rem (minimal)',
          'Colors: Violets, golds',
          'Spacing: Generous paragraphs',
          'Style: Editorial',
        ],
      },

      preview: {
        title: 'Sample Content',
        description: 'See how the current theme affects real content',
        headingExample: 'Heading Example',
        inputLabel: 'Input Field',
        inputPlaceholder: 'Type something...',
        primaryAction: 'Primary Action',
        secondary: 'Secondary',
        outline: 'Outline',
        ghost: 'Ghost',
        status: 'Status',
        label: 'Label',
        tag: 'Tag',
      },

      impl: {
        title: 'Using Themes',
        description: 'Themes can be changed via URL, UI, or programmatically',
        viaUrl: 'Via URL Parameter',
        viaSwitcher: 'Via Theme Switcher',
        switcherText: 'Use the floating button in the bottom-right corner (palette icon) to switch themes. The URL will update automatically and the theme persists across pages.',
        programmatically: 'Programmatically',
      },
    },

  tokens: {
      // Breadcrumb & Header
      breadcrumb: {
        home: 'Home',
        tokens: 'Design Tokens',
      },
      header: {
        title: 'Design Tokens',
        description: 'The foundation of our design system. All visual decisions are defined through tokens, enabling consistent theming and easy customization.',
      },

      // Colors Section
      colors: {
        sectionTitle: 'Colors',
        primary: {
          title: 'Primary',
          description: 'Brand color - Indigo shades',
        },
        secondary: {
          title: 'Secondary',
          description: 'Accent color - Teal shades',
        },
        neutral: {
          title: 'Neutral',
          description: 'Gray scale for backgrounds and text',
        },
        semantic: {
          title: 'Semantic Colors',
          description: 'Status and feedback colors',
          success: 'Success',
          error: 'Error',
          warning: 'Warning',
          info: 'Info',
        },
      },

      // Spacing Section
      spacing: {
        sectionTitle: 'Spacing',
        title: 'Spacing Scale',
        description: 'Consistent spacing values for margins, padding, and gaps',
      },

      // Typography Section
      typography: {
        sectionTitle: 'Typography',
        fontFamilies: {
          title: 'Font Families',
          description: 'Typefaces used across the system',
          sansLabel: 'Sans (Default)',
          arabicLabel: 'Arabic',
          monoLabel: 'Mono',
          sampleText: 'The quick brown fox jumps over the lazy dog',
          arabicSampleText: 'الحمد لله رب العالمين',
          monoSampleText: 'const hello = "world";',
        },
        fontSizes: {
          title: 'Font Sizes',
          description: 'Type scale with line heights',
          exampleText: 'The quick brown fox jumps over the lazy dog',
        },
      },

      // Shadows Section
      shadows: {
        sectionTitle: 'Shadows',
        title: 'Shadow Scale',
        description: 'Elevation levels for depth perception',
        elevationLabel: 'Elevation',
      },

      // Border Radius Section
      radius: {
        sectionTitle: 'Border Radius',
        title: 'Radius Scale',
        description: 'Corner rounding for components',
      },

      // Usage Section
      usage: {
        sectionTitle: 'Usage in Code',
        title: 'Tailwind CSS Integration',
        description: 'All tokens are available as Tailwind utilities',
        colorsLabel: 'Colors',
        colorsCode: `<div className="bg-primary-500 text-primary-50">
  Primary color with shades
</div>

<div className="text-success-600">
  Success text
</div>`,
        spacingLabel: 'Spacing',
        spacingCode: `<div className="p-lg m-xl gap-md">
  Semantic spacing names
</div>

<div className="space-y-md">
  Vertical spacing
</div>`,
        typographyLabel: 'Typography',
        typographyCode: `<h1 className="text-4xl font-bold">
  Heading with scale
</h1>

<div className="font-arabic" dir="rtl">
  Arabic text
</div>`,
      },
    },
}
