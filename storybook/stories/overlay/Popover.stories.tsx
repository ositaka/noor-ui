import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Settings } from 'lucide-react';
import * as React from 'react';

/**
 * Popover Component Stories
 *
 * All examples are taken from /app/(docs)/components/popover/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Popover displays rich content in a portal with flexible positioning.
 * Features: Four sides (top, right, bottom, left), alignment, RTL support, accessibility.
 */

const meta = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' }
    },
    defaultOpen: {
      control: { type: 'boolean' }
    },
    onOpenChange: {
      control: false
    }
  }
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    defaultOpen: false
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Popover Title</h4>
          <p className="text-sm text-muted-foreground">
            This is a popover with some example content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// Basic Usage - from component page lines 177-189
export const BasicUsage: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Popover Title</h4>
          <p className="text-sm text-muted-foreground">
            This is a popover with some example content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Basic popover with title and description. Click the button to open.'
      }
    }
  }
};

// Position Top - from component page lines 218-225
export const PositionTop: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Top</Button>
      </PopoverTrigger>
      <PopoverContent side="top">
        <p className="text-sm">Content positioned on top</p>
      </PopoverContent>
    </Popover>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Popover positioned above the trigger button.'
      }
    }
  }
};

// Position Right - from component page lines 227-234
export const PositionRight: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Right</Button>
      </PopoverTrigger>
      <PopoverContent side="right">
        <p className="text-sm">Content positioned on right</p>
      </PopoverContent>
    </Popover>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Popover positioned to the right of the trigger button.'
      }
    }
  }
};

// Position Bottom - from component page lines 236-243
export const PositionBottom: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Bottom</Button>
      </PopoverTrigger>
      <PopoverContent side="bottom">
        <p className="text-sm">Content positioned on bottom</p>
      </PopoverContent>
    </Popover>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Popover positioned below the trigger button (default).'
      }
    }
  }
};

// Position Left - from component page lines 245-252
export const PositionLeft: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Left</Button>
      </PopoverTrigger>
      <PopoverContent side="left">
        <p className="text-sm">Content positioned on left</p>
      </PopoverContent>
    </Popover>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Popover positioned to the left of the trigger button.'
      }
    }
  }
};

// All Positions - from component page lines 217-253
export const AllPositions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <p className="text-sm">Content positioned on top</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <p className="text-sm">Content positioned on right</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <p className="text-sm">Content positioned on bottom</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <p className="text-sm">Content positioned on left</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'All four positioning options: top, right, bottom, and left.'
      }
    }
  }
};

// With Form - from component page lines 263-289
export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Settings className="me-2 h-4 w-4" />
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="25px" />
          </div>
          <Button className="w-full">Save changes</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Popover with form inputs for settings. Shows width 320px and form controls.'
      }
    }
  }
};

// RTL Basic
export const RTLBasic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">فتح النافذة المنبثقة</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">عنوان النافذة المنبثقة</h4>
          <p className="text-sm text-muted-foreground">
            هذه نافذة منبثقة مع بعض المحتوى التوضيحي.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Basic popover in RTL with Arabic text. Content flows right-to-left.'
      }
    }
  }
};

// RTL All Positions
export const RTLAllPositions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">أعلى</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <p className="text-sm">المحتوى في الأعلى</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">يمين</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <p className="text-sm">المحتوى على اليمين</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">أسفل</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <p className="text-sm">المحتوى في الأسفل</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">يسار</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <p className="text-sm">المحتوى على اليسار</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'All four positioning options in RTL: top, right, bottom, left with automatic mirroring.'
      }
    }
  }
};

// RTL With Form
export const RTLWithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Settings className="me-2 h-4 w-4" />
          الإعدادات
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">الأبعاد</h4>
            <p className="text-sm text-muted-foreground">
              تعيين أبعاد الطبقة.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="width-rtl">العرض</Label>
            <Input id="width-rtl" defaultValue="100%" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height-rtl">الارتفاع</Label>
            <Input id="height-rtl" defaultValue="25px" />
          </div>
          <Button className="w-full">حفظ التغييرات</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      disable: true,
      description: {
        story: 'Popover with form in RTL. All content and inputs flow right-to-left correctly.'
      }
    }
  }
};
