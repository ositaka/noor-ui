import type { Meta, StoryObj } from '@storybook/react';
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
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    text: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    size: 'md',
  },
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
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
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};

// Full Page Loading
export const FullPageLoading: Story = {
  render: () => (
    <div className="flex min-h-[400px] items-center justify-center border rounded-lg bg-muted/20">
      <LoadingSpinner size="lg" text="Loading application..." />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
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
    locale: 'ar',
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
    },
  },
};
