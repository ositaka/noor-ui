import type { StorybookConfig } from '@storybook/nextjs-vite';
import { createRequire } from 'module';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import remarkGfm from 'remark-gfm';

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-onboarding',
    '@storybook/addon-vitest'
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../../public'],

  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': resolve(__dirname, '../../'),
          '@/components': resolve(__dirname, '../../components'),
          '@/lib': resolve(__dirname, '../../lib'),
          '@/styles': resolve(__dirname, '../../styles'),
          '@/docs': resolve(__dirname, '../stories/docs/components'),
          '@storybook/blocks': require.resolve('@storybook/addon-docs/blocks'),
        },
      },
      // Skip TypeScript checking for faster builds
      esbuild: {
        ...config.esbuild,
        tsconfigRaw: {
          compilerOptions: {
            jsx: 'react-jsx',
          },
        },
      },
    };
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },

  core: {
    disableTelemetry: false,
  },
};

export default config;
