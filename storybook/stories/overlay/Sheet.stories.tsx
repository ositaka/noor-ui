import type { Meta, StoryObj } from '@storybook/react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '../../../components/ui/sheet';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import * as React from 'react';

/**
 * Sheet Component Stories
 *
 * All examples are taken from /app/(docs)/components/sheet/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Sheet displays content that slides in from the edge of the screen.
 * Features: Four sides (top, bottom, start, end), RTL-aware positioning, accessibility.
 */

const meta = {
  title: 'Overlay/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
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
} satisfies Meta<typeof Sheet>;

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
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a sheet component that slides in from the side.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Sheet content goes here. You can add forms, lists, or any other content.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// From End (Default) - from component page lines 182-199
export const FromEnd: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open End</Button>
      </SheetTrigger>
      <SheetContent side="end">
        <SheetHeader>
          <SheetTitle>End Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the end (right in LTR, left in RTL).
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">This sheet slides from the end side.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet sliding from the end (right in LTR, left in RTL). This is the default side.'
      }
    }
  }
};

// From Start - from component page lines 228-240
export const FromStart: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Start</Button>
      </SheetTrigger>
      <SheetContent side="start">
        <SheetHeader>
          <SheetTitle>Start Sheet</SheetTitle>
          <SheetDescription>
            This sheet slides in from the start (left in LTR, right in RTL).
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">This sheet slides from the start side.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet sliding from the start (left in LTR, right in RTL).'
      }
    }
  }
};

// From Top - from component page lines 256-268
export const FromTop: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Top Sheet</SheetTitle>
          <SheetDescription>This sheet slides in from the top.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">Top sliding sheet content.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet sliding from the top of the screen.'
      }
    }
  }
};

// From Bottom - from component page lines 270-283
export const FromBottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom Sheet</SheetTitle>
          <SheetDescription>This sheet slides in from the bottom.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">Bottom sliding sheet content.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet sliding from the bottom of the screen.'
      }
    }
  }
};

// All Sides
export const AllSides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Start</Button>
        </SheetTrigger>
        <SheetContent side="start">
          <SheetHeader>
            <SheetTitle>Start Sheet</SheetTitle>
            <SheetDescription>From start side</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open End</Button>
        </SheetTrigger>
        <SheetContent side="end">
          <SheetHeader>
            <SheetTitle>End Sheet</SheetTitle>
            <SheetDescription>From end side</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
            <SheetDescription>From top</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
            <SheetDescription>From bottom</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All four sides demonstrated: start, end, top, and bottom.'
      }
    }
  }
};

// With Form - from component page lines 293-325
export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" defaultValue="Nuno Marques" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              defaultValue="ositaka@example.com"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet with form inputs for editing profile information.'
      }
    }
  }
};

// Navigation Menu
export const NavigationMenu: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Navigation Menu</Button>
      </SheetTrigger>
      <SheetContent side="start">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Browse through the menu options.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start">
              Home
            </Button>
            <Button variant="ghost" className="justify-start">
              Products
            </Button>
            <Button variant="ghost" className="justify-start">
              About
            </Button>
            <Button variant="ghost" className="justify-start">
              Contact
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet used as a navigation menu sliding from the start.'
      }
    }
  }
};

// RTL From End
export const RTLFromEnd: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">فتح النهاية</Button>
      </SheetTrigger>
      <SheetContent side="end">
        <SheetHeader>
          <SheetTitle>لوحة النهاية</SheetTitle>
          <SheetDescription>تنزلق هذه اللوحة من النهاية (اليمين في LTR، اليسار في RTL).</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">تنزلق هذه اللوحة من جانب النهاية.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet in RTL sliding from end (left in RTL). Demonstrates automatic positioning.'
      }
    }
  }
};

// RTL From Start
export const RTLFromStart: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">فتح البداية</Button>
      </SheetTrigger>
      <SheetContent side="start">
        <SheetHeader>
          <SheetTitle>لوحة البداية</SheetTitle>
          <SheetDescription>تنزلق هذه اللوحة من البداية (اليسار في LTR، اليمين في RTL).</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">تنزلق هذه اللوحة من جانب البداية.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet in RTL sliding from start (right in RTL). Demonstrates automatic positioning.'
      }
    }
  }
};

// RTL With Form
export const RTLWithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">تعديل الملف الشخصي</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>تعديل الملف الشخصي</SheetTitle>
          <SheetDescription>
            قم بإجراء تغييرات على ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name-rtl">الاسم</Label>
            <Input id="name-rtl" placeholder="أدخل اسمك" defaultValue="نونو ماركيز" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email-rtl">البريد الإلكتروني</Label>
            <Input
              id="email-rtl"
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              defaultValue="ositaka@example.com"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">حفظ التغييرات</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet with form in RTL. All content flows right-to-left correctly.'
      }
    }
  }
};

// RTL All Sides
export const RTLAllSides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">فتح البداية</Button>
        </SheetTrigger>
        <SheetContent side="start">
          <SheetHeader>
            <SheetTitle>لوحة البداية</SheetTitle>
            <SheetDescription>من جانب البداية</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">فتح النهاية</Button>
        </SheetTrigger>
        <SheetContent side="end">
          <SheetHeader>
            <SheetTitle>لوحة النهاية</SheetTitle>
            <SheetDescription>من جانب النهاية</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">فتح الأعلى</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>لوحة الأعلى</SheetTitle>
            <SheetDescription>من الأعلى</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">فتح الأسفل</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>لوحة الأسفل</SheetTitle>
            <SheetDescription>من الأسفل</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
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
        story: 'All four sides in RTL: start, end, top, bottom with proper positioning.'
      }
    }
  }
};
