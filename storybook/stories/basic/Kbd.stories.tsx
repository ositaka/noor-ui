import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from '../../../components/ui/kbd';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';

/**
 * Kbd Component Stories
 *
 * All examples are taken from /app/(docs)/components/kbd/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Kbd component always renders LTR (keyboard shortcuts don't change direction)
 */

const meta = {
  title: 'Basic/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs']
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    keys: ['mod', 'k'],
    variant: 'default',
    size: 'md'
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  }
};

// Single Keys
export const SingleKeys: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Kbd keys={['esc']} />
      <Kbd keys={['enter']} />
      <Kbd keys={['tab']} />
      <Kbd keys={['space']} />
      <Kbd keys={['delete']} />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Key Combinations - from component page lines 89-101
export const KeyCombinations: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Kbd keys={['mod', 'k']} />
      <Kbd keys={['mod', 'enter']} />
      <Kbd keys={['shift', 'k']} />
      <Kbd keys={['mod', 'shift', 'p']} />
      <Kbd keys={['ctrl', 'alt', 'delete']} />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="space-y-2">
        <p className="text-sm font-medium">Default</p>
        <Kbd keys={['mod', 'k']} variant="default" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Outline</p>
        <Kbd keys={['mod', 'k']} variant="outline" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Ghost</p>
        <Kbd keys={['mod', 'k']} variant="ghost" />
      </div>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <div className="space-y-2">
        <p className="text-sm font-medium">Small</p>
        <Kbd keys={['mod', 'k']} size="sm" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Medium</p>
        <Kbd keys={['mod', 'k']} size="md" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Large</p>
        <Kbd keys={['mod', 'k']} size="lg" />
      </div>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Keyboard Shortcuts Panel - from component page lines 80-113
export const KeyboardShortcutsPanel: Story = {
  render: () => (
    <div className="w-full max-w-64">
      <Card>
        <CardHeader>
          <CardTitle>Keyboard Shortcuts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Search</span>
              <Kbd keys={['mod', 'k']} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Submit</span>
              <Kbd keys={['mod', 'enter']} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Close</span>
              <Kbd keys={['esc']} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Previous</span>
              <Kbd keys={['shift', 'k']} />
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <p className="text-sm font-medium">In Buttons</p>
            <Button variant="secondary">
              Search <Kbd keys={['mod', 'k']} size="sm" className="ms-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// In Buttons
export const InButtons: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button variant="secondary">
        Search <Kbd keys={['mod', 'k']} size="sm" className="ms-2" />
      </Button>
      <Button variant="secondary">
        Submit <Kbd keys={['mod', 'enter']} size="sm" className="ms-2" />
      </Button>
      <Button variant="outline">
        Close <Kbd keys={['esc']} size="sm" className="ms-2" />
      </Button>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// Arrow Keys
export const ArrowKeys: Story = {
  render: () => (
    <div className="flex gap-2">
      <Kbd keys={['up']} />
      <Kbd keys={['down']} />
      <Kbd keys={['left']} />
      <Kbd keys={['right']} />
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true }
  }
};

// RTL Example (Arabic labels, but keys remain LTR)
export const RTLExample: Story = {
  render: () => (
    <div className="w-full max-w-64">
      <Card>
        <CardHeader>
          <CardTitle>اختصارات لوحة المفاتيح</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">بحث</span>
              <Kbd keys={['mod', 'k']} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">إرسال</span>
              <Kbd keys={['mod', 'enter']} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">إغلاق</span>
              <Kbd keys={['esc']} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">السابق</span>
              <Kbd keys={['shift', 'k']} />
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <p className="text-sm font-medium">في الأزرار</p>
            <Button variant="secondary">
              بحث <Kbd keys={['mod', 'k']} size="sm" className="ms-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Keyboard shortcuts panel with Arabic labels in RTL mode. Note that Kbd component always renders LTR (keyboard shortcuts don\'t change direction).'
      }
    }
  }
};

// RTL In Buttons
export const RTLInButtons: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Button variant="secondary">
        بحث <Kbd keys={['mod', 'k']} size="sm" className="ms-2" />
      </Button>
      <Button variant="secondary">
        إرسال <Kbd keys={['mod', 'enter']} size="sm" className="ms-2" />
      </Button>
      <Button variant="outline">
        إغلاق <Kbd keys={['esc']} size="sm" className="ms-2" />
      </Button>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Buttons with Arabic text and keyboard shortcuts in RTL mode.'
      }
    }
  }
};
