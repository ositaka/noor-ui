import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

/**
 * Loading Spinner Component Stories
 *
 * Note: LoadingSpinner provides a visual loading indicator.
 * Features: Three sizes (sm, md, lg), optional text label, accessible with ARIA attributes.
 */

const meta = {
  title: 'Feedback/Loading Spinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    text: { control: 'text' },
    className: { control: 'text' }
  }
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    size: 'md'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders correctly', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toBeInTheDocument();
      await expect(spinner).toBeVisible();
    });

    await step('Has correct accessibility attributes', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toHaveAttribute('aria-live', 'polite');
      await expect(spinner).toHaveAttribute('aria-label', 'Loading...');
    });

    await step('Has screen reader text', async () => {
      await expect(canvas.getByText('Loading...', { selector: '.sr-only' })).toBeInTheDocument();
    });
  }
};

// Small Size
export const SmallSize: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Small Spinner</CardTitle>
        <CardDescription>Compact loading indicator for inline use</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <LoadingSpinner size="sm" />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders small size spinner', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toBeInTheDocument();
      await expect(spinner).toBeVisible();
    });

    await step('Has accessibility attributes', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toHaveAttribute('role', 'status');
      await expect(spinner).toHaveAttribute('aria-live', 'polite');
    });
  }
};

// Medium Size
export const MediumSize: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Medium Spinner</CardTitle>
        <CardDescription>Default loading indicator size</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <LoadingSpinner size="md" />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders medium size spinner', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toBeInTheDocument();
      await expect(spinner).toBeVisible();
    });

    await step('Has accessibility attributes', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toHaveAttribute('role', 'status');
      await expect(spinner).toHaveAttribute('aria-live', 'polite');
    });
  }
};

// Large Size
export const LargeSize: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Large Spinner</CardTitle>
        <CardDescription>Large loading indicator for full-page loading</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <LoadingSpinner size="lg" />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders large size spinner', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toBeInTheDocument();
      await expect(spinner).toBeVisible();
    });

    await step('Has accessibility attributes', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toHaveAttribute('role', 'status');
      await expect(spinner).toHaveAttribute('aria-live', 'polite');
    });
  }
};

// With Text
export const WithText: Story = {
  render: () => (
    <Card>
      <CardContent className="flex justify-center p-12">
        <LoadingSpinner size="md" text="Loading content..." />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders spinner with text', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toBeInTheDocument();
      await expect(spinner).toBeVisible();
    });

    await step('Displays visible text label', async () => {
      await expect(canvas.getByText('Loading content...', { selector: 'p' })).toBeInTheDocument();
      await expect(canvas.getByText('Loading content...', { selector: 'p' })).toBeVisible();
    });

    await step('Has correct aria-label', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toHaveAttribute('aria-label', 'Loading content...');
    });

    await step('Has screen reader text', async () => {
      await expect(canvas.getByText('Loading content...', { selector: '.sr-only' })).toBeInTheDocument();
    });
  }
};

// All Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>All Sizes</CardTitle>
        <CardDescription>Comparison of all available spinner sizes</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-around gap-8 p-12">
        <div className="flex flex-col items-center gap-2">
          <LoadingSpinner size="sm" />
          <span className="text-xs text-muted-foreground">Small</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <LoadingSpinner size="md" />
          <span className="text-xs text-muted-foreground">Medium</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <LoadingSpinner size="lg" />
          <span className="text-xs text-muted-foreground">Large</span>
        </div>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// In Content
export const InContent: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Loading Content</CardTitle>
        <CardDescription>Your data is being fetched</CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-[200px] items-center justify-center">
        <LoadingSpinner size="md" text="Fetching data..." />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders spinner in content context', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toBeInTheDocument();
      await expect(spinner).toBeVisible();
    });

    await step('Displays custom loading text', async () => {
      await expect(canvas.getByText('Fetching data...', { selector: 'p' })).toBeInTheDocument();
    });

    await step('Has correct accessibility attributes', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toHaveAttribute('aria-label', 'Fetching data...');
      await expect(spinner).toHaveAttribute('aria-live', 'polite');
    });
  }
};

// Full Page Loading
export const FullPageLoading: Story = {
  render: () => (
    <div className="flex items-center justify-center">
      <LoadingSpinner size="lg" text="Loading application..." />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders full page loading spinner', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toBeInTheDocument();
      await expect(spinner).toBeVisible();
    });

    await step('Displays application loading text', async () => {
      await expect(canvas.getByText('Loading application...', { selector: 'p' })).toBeInTheDocument();
    });

    await step('Has correct accessibility attributes', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toHaveAttribute('aria-label', 'Loading application...');
      await expect(spinner).toHaveAttribute('aria-live', 'polite');
    });
  }
};

// RTL
export const RTL: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>جاري التحميل</CardTitle>
        <CardDescription>مؤشر التحميل مع نص عربي</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center p-12">
        <LoadingSpinner size="md" text="جاري تحميل البيانات..." />
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toBeInTheDocument();
      await expect(spinner).toBeVisible();
    });

    await step('Displays Arabic text', async () => {
      await expect(canvas.getByText('جاري تحميل البيانات...', { selector: 'p' })).toBeInTheDocument();
    });

    await step('Has correct accessibility in RTL', async () => {
      const spinner = canvas.getByRole('status');
      await expect(spinner).toHaveAttribute('aria-label', 'جاري تحميل البيانات...');
      await expect(spinner).toHaveAttribute('aria-live', 'polite');
    });
  }
};
