import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '../../../components/ui/dialog';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import * as React from 'react';

const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
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
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    defaultOpen: false
  },
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;
    const dir = isRTL ? 'rtl' as const : 'ltr' as const;

    return (
    <Dialog {...args} dir={dir}>
      <DialogTrigger asChild>
        <Button>{t('Open Dialog', 'فتح النافذة')}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('Are you absolutely sure?', 'هل أنت متأكد تماماً؟')}</DialogTitle>
          <DialogDescription>{t('This action cannot be undone.', 'لا يمكن التراجع عن هذا الإجراء.')}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    );
  },
};

// Basic Dialog - from component page lines 164-176
export const BasicDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Simple dialog with title and description. No actions.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens basic dialog', async () => {
      const trigger = canvas.getByRole('button', { name: /open dialog/i });
      await userEvent.click(trigger);

      const dialog = await body.findByRole('dialog');
      await expect(dialog).toBeInTheDocument();
      await expect(within(dialog).getByText('Are you absolutely sure?')).toBeInTheDocument();
    });

    await step('Closes with close button', async () => {
      const dialog = body.getByRole('dialog');
      const closeButton = within(dialog).getByRole('button', { name: /close/i });
      await userEvent.click(closeButton);

      await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
    });
  }
};

// With Form - from component page lines 228-253
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Nuno Marques" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@ositaka" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Dialog with form inputs for editing profile information.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens form dialog', async () => {
      const trigger = canvas.getByRole('button', { name: /edit profile/i });
      await userEvent.click(trigger);

      const dialog = await body.findByRole('dialog');
      await expect(dialog).toBeInTheDocument();
    });

    await step('Form fields are accessible and editable', async () => {
      const nameInput = body.getByLabelText('Name');
      const usernameInput = body.getByLabelText('Username');

      await expect(nameInput).toHaveValue('Nuno Marques');
      await expect(usernameInput).toHaveValue('@ositaka');

      await userEvent.clear(nameInput);
      await userEvent.type(nameInput, 'Jane Doe');
      await expect(nameInput).toHaveValue('Jane Doe');
    });

    await step('Save button is present', async () => {
      const saveButton = body.getByRole('button', { name: /save changes/i });
      await expect(saveButton).toBeInTheDocument();
    });

    await step('Can navigate form with keyboard', async () => {
      const nameInput = body.getByLabelText('Name');
      nameInput.focus();
      await expect(nameInput).toHaveFocus();

      await userEvent.tab();
      const usernameInput = body.getByLabelText('Username');
      await expect(usernameInput).toHaveFocus();
    });
  }
};

// Confirmation Dialog - from component page lines 267-284
export const ConfirmationDialog: Story = {
  render: () => {
    const handleDelete = fn();
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your
              data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Destructive confirmation dialog with Cancel and Delete buttons.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens confirmation dialog', async () => {
      const trigger = canvas.getByRole('button', { name: /delete account/i });
      await userEvent.click(trigger);

      const dialog = await body.findByRole('dialog');
      await expect(dialog).toBeInTheDocument();
    });

    await step('Contains Cancel and Delete buttons', async () => {
      const dialog = body.getByRole('dialog');
      const cancelButton = within(dialog).getByRole('button', { name: /cancel/i });
      const deleteButton = within(dialog).getByRole('button', { name: /delete/i });

      await expect(cancelButton).toBeInTheDocument();
      await expect(deleteButton).toBeInTheDocument();
    });

    await step('Cancel button closes dialog', async () => {
      const dialog = body.getByRole('dialog');
      const cancelButton = within(dialog).getByRole('button', { name: /cancel/i });
      await userEvent.click(cancelButton);

      await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
    });
  }
};

// Settings Dialog - from component page lines 301-324
export const SettingsDialog: Story = {
  render: () => {
    const handleSave = fn();
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Settings</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account Settings</DialogTitle>
            <DialogDescription>Make changes to your account preferences here.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Configure your notification preferences and privacy settings.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Settings dialog with content and save/cancel actions.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens settings dialog', async () => {
      const trigger = canvas.getByRole('button', { name: /open settings/i });
      await userEvent.click(trigger);

      const dialog = await body.findByRole('dialog');
      await expect(dialog).toBeInTheDocument();
      await expect(within(dialog).getByText('Account Settings')).toBeInTheDocument();
    });

    await step('Settings content is displayed', async () => {
      const dialog = body.getByRole('dialog');
      const content = within(dialog).getByText(/configure your notification preferences/i);
      await expect(content).toBeInTheDocument();
    });

    await step('Has Cancel and Save buttons', async () => {
      const dialog = body.getByRole('dialog');
      await expect(within(dialog).getByRole('button', { name: /cancel/i })).toBeInTheDocument();
      await expect(within(dialog).getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    });
  }
};

// Controlled Dialog
export const ControlledDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Dialog is {open ? 'open' : 'closed'}
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Open Controlled Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's state is controlled externally via React state.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Dialog with controlled open state using React state.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Status text shows closed state initially', async () => {
      const status = canvas.getByText(/dialog is closed/i);
      await expect(status).toBeInTheDocument();
    });

    await step('Opens controlled dialog and updates status', async () => {
      const trigger = canvas.getByRole('button', { name: /open controlled dialog/i });
      await userEvent.click(trigger);

      const dialog = await body.findByRole('dialog');
      await expect(dialog).toBeInTheDocument();
      await expect(canvas.getByText(/dialog is open/i)).toBeInTheDocument();
    });

    await step('Close button updates state and closes dialog', async () => {
      const dialog = body.getByRole('dialog');
      // Get all close buttons - there's the X icon button and the "Close" action button
      const closeButtons = within(dialog).getAllByRole('button', { name: /close/i });
      // Click the action button with visible text "Close" (last button in the list)
      await userEvent.click(closeButtons[closeButtons.length - 1]);

      await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
      await expect(canvas.getByText(/dialog is closed/i)).toBeInTheDocument();
    });

    await step('State persists across interactions', async () => {
      const trigger = canvas.getByRole('button', { name: /open controlled dialog/i });
      await userEvent.click(trigger);

      const dialog = await body.findByRole('dialog');
      await expect(dialog).toBeInTheDocument();

      // Close with X button (first button in the list)
      const closeButtons = within(dialog).getAllByRole('button', { name: /close/i });
      await userEvent.click(closeButtons[0]);
      await expect(canvas.getByText(/dialog is closed/i)).toBeInTheDocument();
    });
  }
};

// Multiple Dialogs
export const MultipleDialogs: Story = {
  render: () => (
    <div className="flex gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Info Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Information</DialogTitle>
            <DialogDescription>This is an informational dialog.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>OK</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Warning Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Warning</DialogTitle>
            <DialogDescription>This action requires confirmation.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive">Proceed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Multiple independent dialog instances on the same page.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Both dialog triggers are present', async () => {
      const infoTrigger = canvas.getByRole('button', { name: /info dialog/i });
      const warningTrigger = canvas.getByRole('button', { name: /warning dialog/i });

      await expect(infoTrigger).toBeInTheDocument();
      await expect(warningTrigger).toBeInTheDocument();
    });

    await step('First dialog opens independently', async () => {
      const infoTrigger = canvas.getByRole('button', { name: /info dialog/i });
      await userEvent.click(infoTrigger);

      const dialog = await body.findByRole('dialog');
      await expect(within(dialog).getByText('Information')).toBeInTheDocument();
      await expect(within(dialog).getByText('This is an informational dialog.')).toBeInTheDocument();
    });

    await step('First dialog closes', async () => {
      const dialog = body.getByRole('dialog');
      const okButton = within(dialog).getByRole('button', { name: /ok/i });
      await userEvent.click(okButton);

      await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
    });

    await step('Second dialog opens independently', async () => {
      const warningTrigger = canvas.getByRole('button', { name: /warning dialog/i });
      await userEvent.click(warningTrigger);

      const dialog = await body.findByRole('dialog');
      await expect(within(dialog).getByText('Warning')).toBeInTheDocument();
      await expect(within(dialog).getByText('This action requires confirmation.')).toBeInTheDocument();
    });

    await step('Second dialog has its own buttons', async () => {
      const dialog = body.getByRole('dialog');
      await expect(within(dialog).getByRole('button', { name: /cancel/i })).toBeInTheDocument();
      await expect(within(dialog).getByRole('button', { name: /proceed/i })).toBeInTheDocument();
    });
  }
};

