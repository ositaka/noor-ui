import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { DirectionProvider } from '../../components/providers/direction-provider';
import { Toaster } from '../../components/ui/toaster';
import '../../styles/globals.css';

// Apply theme to document
function applyThemeToDocument(theme: string) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('theme-minimal', 'theme-futuristic', 'theme-cozy', 'theme-artistic');
  root.classList.add(`theme-${theme}`);
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0a0a0a',
        },
      ],
    },
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },

  globalTypes: {
    direction: {
      description: 'Text direction',
      defaultValue: 'ltr',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: [
          { value: 'ltr', title: 'LTR', icon: 'arrowleft' },
          { value: 'rtl', title: 'RTL', icon: 'arrowright' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Design theme',
      defaultValue: 'minimal',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'minimal', title: 'Minimal' },
          { value: 'futuristic', title: 'Futuristic' },
          { value: 'cozy', title: 'Cozy' },
          { value: 'artistic', title: 'Artistic' },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Color mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Locale',
      defaultValue: 'en',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English', icon: 'globe' },
          { value: 'ar', title: 'العربية', icon: 'globe' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const direction = context.globals.direction || 'ltr';
      const theme = context.globals.theme || 'minimal';
      const mode = context.globals.mode || 'light';
      const locale = context.globals.locale || 'en';

      // Update document attributes (direction, theme, mode, locale)
      React.useEffect(() => {
        document.documentElement.setAttribute('dir', direction);
        document.documentElement.setAttribute('lang', locale);
        document.documentElement.classList.toggle('dark', mode === 'dark');
        applyThemeToDocument(theme);
      }, [direction, locale, mode, theme]);

      return (
        <DirectionProvider>
          <ThemeProvider attribute="class" defaultTheme={mode} forcedTheme={mode} enableSystem={false}>
            <div dir={direction} style={{ minHeight: '100%' }}>
              <Story />
              <Toaster />
            </div>
          </ThemeProvider>
        </DirectionProvider>
      );
    },
  ],
};

export default preview;
