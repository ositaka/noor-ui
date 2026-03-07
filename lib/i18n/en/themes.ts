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

themeSwitcher: {
      title: 'Design Theme',
      persistsNote: 'Theme persists across pages via URL parameter',
      ariaLabel: 'Theme Switcher',
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
          'Base font-size: 16px',
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
          'Base font-size: 16px',
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
          'Base font-size: 18px',
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
          'Base font-size: 18px',
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

      features: 'Features',

      preview: {
        title: 'Sample Content',
        description: 'See how the current theme affects real content',
        headingExample: 'Heading Example',
        sampleParagraph1: 'This is a sample paragraph to demonstrate how text looks with the current theme. Notice how the typography, line height, and spacing create a unique reading experience that matches the theme\'s personality.',
        sampleParagraph2: 'A second paragraph shows how content flows with the chosen theme settings. Each theme brings its own character through carefully tuned design tokens.',
        inputLabel: 'Input Field',
        inputPlaceholder: 'Type something...',
        primaryAction: 'Primary Action',
        secondary: 'Secondary',
        outline: 'Outline',
        ghost: 'Ghost',
        destructive: 'Destructive',
        status: 'Status',
        label: 'Label',
        tag: 'Tag',
      },

      themePreview: {
        preview: 'Preview',
        primary: 'Primary',
        secondary: 'Secondary',
        outline: 'Outline',
        new: 'New',
        beta: 'Beta',
        soon: 'Soon',
      },

      impl: {
        title: 'Using Themes',
        description: 'Themes can be changed via URL, UI, or programmatically',
        viaUrl: 'Via URL Parameter',
        viaSwitcher: 'Via Theme Switcher',
        switcherText: 'Use the floating button in the bottom-right corner (palette icon) to switch themes. The URL will update automatically and the theme persists across pages.',
        programmatically: 'Programmatically',
      },

      usingThemes: {
        title: 'Using Themes in Your App',
        setupTitle: 'Setup with npm package',
        setupDescription: 'The noorui-rtl package includes DesignSystemProvider for easy theme switching',
        step1Label: '1. Setup providers (complete example)',
        step2Label: '2. Control all theme layers programmatically',
        successCallout: 'All 4 themes with light/dark mode work out of the box! The pre-compiled CSS includes all theme variants.',
      },

      customThemes: {
        title: 'Creating Custom Themes',
        description: 'Create your own theme by defining a CSS class that overrides the design token variables.',
        step1Title: 'Step 1: Define Your Theme CSS',
        step1Description: 'Add a new theme class to your globals.css. Override the color variables for both light and dark modes.',
        step2Title: 'Step 2: Use Your Theme',
        step2Description: 'Pass your custom theme name to the DesignSystemProvider.',
        variablesTitle: 'CSS Variables Reference',
        variablesDescription: 'These are the variables you can override in your custom theme.',
        required: 'Required',
        optional: 'Optional',
        tip: 'Tip: Visit the Design Tokens page to see the live values of all variables for the current theme — great for using as a starting point.',
        variableHeader: 'Variable',
        descriptionHeader: 'Description',
        descBackground: 'Page background and text',
        descPrimary: 'Brand/accent color',
        descSecondary: 'Secondary accent',
        descMuted: 'Muted backgrounds and subdued text',
        descAccent: 'Hover/active states',
        descCard: 'Card surfaces',
        descPopover: 'Popover/dropdown surfaces',
        descBorder: 'Borders, inputs, focus rings',
        descDestructive: 'Destructive actions',
        descRadius: 'Base border radius',
        descSuccess: 'Success status color',
        descWarning: 'Warning status color',
        descInfo: 'Info status color',
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
        alertText: 'These values reflect the currently selected theme and update in real-time when you switch themes or toggle dark mode.',
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
        brand: {
          title: 'Brand Colors',
          description: 'Primary and secondary brand colors',
        },
        ui: {
          title: 'UI Colors',
          description: 'Interface background and text colors',
        },
        accent: {
          title: 'Accent Colors',
          description: 'Muted and accent colors for subtle UI elements',
        },
        semanticStatus: {
          title: 'Semantic Status Colors',
          description: 'Success, warning, and info feedback colors',
        },
        stateBorder: {
          title: 'State & Border Colors',
          description: 'Destructive state, borders, and focus rings',
        },
        cssSetup: {
          title: 'CSS Setup',
          description: 'Copy and paste this CSS into your',
          descriptionFile: 'globals.css',
          descriptionSuffix: 'file to use this theme',
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
        currentTheme: {
          title: 'Current Theme Radius',
          description: 'The border radius for the currently selected theme',
        },
      },

      // Usage Section
      usage: {
        sectionTitle: 'Usage in Code',
        title: 'Tailwind CSS Integration',
        description: 'All tokens are available as Tailwind utilities',
        colorsLabel: 'Colors',
        colorsCode: `<div className="bg-primary text-primary-foreground">
  Primary color
</div>

<div className="text-success">
  Success text
</div>`,
        spacingLabel: 'Spacing',
        spacingCode: `<div className="p-6 m-8 gap-4">
  Standard spacing scale
</div>

<div className="space-y-4">
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
