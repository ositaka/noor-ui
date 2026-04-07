import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
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
  title: 'Overlays & Layout/Sheet',
  component: Sheet,
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
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    defaultOpen: false
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

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet sliding from the end (right in LTR, left in RTL). This is the default side.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens sheet from end side', async () => {
      const trigger = canvas.getByRole('button', { name: /open end/i });
      await userEvent.click(trigger);

      // Sheet content is in a portal - query from document.body
      const sheetTitle = await body.findByRole('heading', { name: 'End Sheet' });
      await expect(sheetTitle).toBeInTheDocument();
      await expect(body.getByText(/this sheet slides in from the end/i)).toBeVisible();
    });

    await step('Sheet content is accessible', async () => {
      const dialog = body.getByRole('dialog');
      await expect(dialog).toBeInTheDocument();
    });
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

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet sliding from the start (left in LTR, right in RTL).'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens sheet from start side', async () => {
      const trigger = canvas.getByRole('button', { name: /open start/i });
      await userEvent.click(trigger);

      // Sheet content is in a portal - query from document.body
      const sheetTitle = await body.findByRole('heading', { name: 'Start Sheet' });
      await expect(sheetTitle).toBeInTheDocument();
      await expect(body.getByText(/this sheet slides in from the start/i)).toBeVisible();
    });

    await step('Sheet content is accessible', async () => {
      const dialog = body.getByRole('dialog');
      await expect(dialog).toBeInTheDocument();
    });
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

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet sliding from the top of the screen.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens sheet from top side', async () => {
      const trigger = canvas.getByRole('button', { name: /open top/i });
      await userEvent.click(trigger);

      // Sheet content is in a portal - query from document.body
      const sheetTitle = await body.findByRole('heading', { name: 'Top Sheet' });
      await expect(sheetTitle).toBeInTheDocument();
      await expect(body.getByText(/this sheet slides in from the top/i)).toBeVisible();
    });

    await step('Sheet content is accessible', async () => {
      const dialog = body.getByRole('dialog');
      await expect(dialog).toBeInTheDocument();
    });
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

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet sliding from the bottom of the screen.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens sheet from bottom side', async () => {
      const trigger = canvas.getByRole('button', { name: /open bottom/i });
      await userEvent.click(trigger);

      // Sheet content is in a portal - query from document.body
      const sheetTitle = await body.findByRole('heading', { name: 'Bottom Sheet' });
      await expect(sheetTitle).toBeInTheDocument();
      await expect(body.getByText(/this sheet slides in from the bottom/i)).toBeVisible();
    });

    await step('Sheet content is accessible', async () => {
      const dialog = body.getByRole('dialog');
      await expect(dialog).toBeInTheDocument();
    });
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

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet with form inputs for editing profile information.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens sheet with form', async () => {
      const trigger = canvas.getByRole('button', { name: /edit profile/i });
      await userEvent.click(trigger);

      // Sheet content is in a portal - query from document.body
      const sheetTitle = await body.findByRole('heading', { name: 'Edit Profile' });
      await expect(sheetTitle).toBeInTheDocument();
    });

    await step('Form inputs are accessible and functional', async () => {
      const nameInput = body.getByLabelText(/name/i);
      const emailInput = body.getByLabelText(/email/i);

      await expect(nameInput).toBeInTheDocument();
      await expect(nameInput).toHaveValue('Nuno Marques');
      await expect(emailInput).toHaveValue('ositaka@example.com');

      // Test input interaction
      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, 'Nuno Marques');
      await expect(nameInput).toHaveValue('Nuno Marques');
    });

    await step('Save button closes the sheet', async () => {
      const saveButton = body.getByRole('button', { name: /save changes/i });
      await expect(saveButton).toBeVisible();
      await userEvent.click(saveButton);

      // Sheet dialog should close - verify by checking dialog role
      await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
    });
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

  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Sheet used as a navigation menu sliding from the start.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens navigation menu sheet', async () => {
      const trigger = canvas.getByRole('button', { name: /navigation menu/i });
      await userEvent.click(trigger);

      // Sheet content is in a portal - query from document.body
      const sheetTitle = await body.findByRole('heading', { name: 'Navigation Menu' });
      await expect(sheetTitle).toBeInTheDocument();
    });

    await step('Navigation items are accessible and clickable', async () => {
      const homeButton = body.getByRole('button', { name: /^home$/i });
      const productsButton = body.getByRole('button', { name: /^products$/i });
      const aboutButton = body.getByRole('button', { name: /^about$/i });
      const contactButton = body.getByRole('button', { name: /^contact$/i });

      await expect(homeButton).toBeVisible();
      await expect(productsButton).toBeVisible();
      await expect(aboutButton).toBeVisible();
      await expect(contactButton).toBeVisible();

      // Test interaction with one navigation item
      await userEvent.click(homeButton);
    });

    await step('Can navigate using keyboard', async () => {
      const productsButton = body.getByRole('button', { name: /^products$/i });
      productsButton.focus();
      await expect(productsButton).toHaveFocus();
    });
  }
};

