import type { Preview } from '@storybook/nextjs-vite';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { IconContext } from '@phosphor-icons/react';
import { DirectionProvider } from '../../components/providers/direction-provider';
import { Toaster } from '../../components/ui/toaster';
import { CustomDocsPage } from '../stories/docs/components/CustomDocsPage';
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
    // Enable docs for all stories
    docs: {
      codePanel: true,
      source: {
        type: 'dynamic',
      },
      page: CustomDocsPage,
    },
    // Default to Docs view and configure sidebar
    viewMode: 'story',
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Docs',
          ['Getting Started'],
          'GCC-Specific',
          'Core',
          'Forms',
          'Advanced Forms & Inputs',
          'Data Display',
          'Feedback',
          'Navigation',
          'Overlays & Layout',
          'Layout & Shell',
          'User Interface',
          'AI-LLM Shell',
        ],
      },
    },
  },

  // Hide non-interactive props from controls table globally
  argTypes: {
    children: { table: { disable: true } },
    asChild: { table: { disable: true } },
    className: { table: { disable: true } },
    ref: { table: { disable: true } },
    style: { table: { disable: true } },
  },

  globalTypes: {
    direction: {
      description: 'Text direction and language',
      defaultValue: 'ltr',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: [
          { value: 'ltr', title: 'English (LTR)', icon: 'transfer' },
          { value: 'rtl', title: 'العربية (RTL)', icon: 'transfer' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Design theme',
      defaultValue: 'cozy',
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
      description: 'Locale (derived from direction)',
      defaultValue: 'en',
    },
  },

  decorators: [
    (Story, context) => {
      const direction = context.globals.direction || 'ltr';
      const theme = context.globals.theme || 'minimal';
      const mode = context.globals.mode || 'light';
      const locale = direction === 'rtl' ? 'ar' : 'en';

      // Apply Arabic arg overrides when direction is RTL
      const arOverrides = context.parameters?.ar?.args ?? context.parameters?.ar;
      if (direction === 'rtl' && arOverrides) {
        context.args = { ...context.args, ...arOverrides };
      }

      // Update document attributes (theme, mode) — NOT dir, which stays scoped to the story wrapper
      React.useEffect(() => {
        document.documentElement.classList.toggle('dark', mode === 'dark');
        applyThemeToDocument(theme);
      }, [mode, theme]);

      // Auto-set dir on Radix portaled components (they render outside the story wrapper)
      React.useEffect(() => {
        const setDirOnPortals = () => {
          document.querySelectorAll('[data-radix-popper-content-wrapper], [data-radix-portal], [role="dialog"]').forEach(el => {
            if (el.getAttribute('dir') !== direction) {
              el.setAttribute('dir', direction);
            }
          });
        };
        setDirOnPortals();
        const observer = new MutationObserver(setDirOnPortals);
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
      }, [direction]);

      return (
        <DirectionProvider controlledDirection={direction as 'ltr' | 'rtl'} controlledLocale={locale as 'en' | 'ar'}>
          <IconContext.Provider value={{ weight: 'duotone', color: 'currentColor' }}>
            <ThemeProvider attribute="class" defaultTheme={mode} forcedTheme={mode} enableSystem={false}>
              <div dir={direction} lang={locale} style={{ minHeight: '100%' }}>
                <Story />
                <Toaster />
              </div>
            </ThemeProvider>
          </IconContext.Provider>
        </DirectionProvider>
      );
    },
  ],
};

export default preview;
