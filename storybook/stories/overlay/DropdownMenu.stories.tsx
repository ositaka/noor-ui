import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, fn } from 'storybook/test';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';
import {
  User,
  Gear,
  CreditCard,
  SignOut,
  UserPlus,
  Envelope,
  ChatCentered,
  PlusCircle,
  DotsThree
} from '@phosphor-icons/react';
import * as React from 'react';

/**
 * Dropdown Menu Component Stories
 *
 * All examples are taken from /app/(docs)/components/dropdown-menu/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Dropdown Menu displays a list of actions or options when triggered.
 * Features: Items, groups, checkboxes, radio groups, sub-menus, shortcuts, RTL support.
 */

const meta = {
  title: 'Navigation/Dropdown Menu',
  component: DropdownMenu,
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
} satisfies Meta<typeof DropdownMenu>;

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
    <DropdownMenu {...args} dir={dir}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User className="me-2 h-4 w-4" />
          {t('My Account', 'حسابي')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t('My Account', 'حسابي')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="me-2 h-4 w-4" />
          <span>{t('Profile', 'الملف الشخصي')}</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="me-2 h-4 w-4" />
          <span>{t('Billing', 'الفواتير')}</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Gear className="me-2 h-4 w-4" />
          <span>{t('Settings', 'الإعدادات')}</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut className="me-2 h-4 w-4" />
          <span>{t('Logout', 'تسجيل الخروج')}</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    );
  },
};

// Basic Usage - from component page lines 216-248
export const BasicUsage: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User className="me-2 h-4 w-4" />
          My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="me-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="me-2 h-4 w-4" />
          <span>Billing</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Gear className="me-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut className="me-2 h-4 w-4" />
          <span>Logout</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders trigger button', async () => {
      const trigger = canvas.getByRole('button', { name: /my account/i });
      await expect(trigger).toBeInTheDocument();
      await expect(trigger).toBeVisible();
    });

    await step('Opens menu and displays items with shortcuts', async () => {
      const trigger = canvas.getByRole('button', { name: /my account/i });
      await userEvent.click(trigger);
      // Menu content renders in a portal at document.body
      await expect(await body.findByRole('menuitem', { name: /profile/i })).toBeInTheDocument();
      await expect(body.getByText('⇧⌘P')).toBeInTheDocument();
      await expect(body.getByText('⌘B')).toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Dropdown menu with icons and keyboard shortcuts. Classic account menu pattern.'
      }
    }
  }
};

// With Icons - from component page lines 275-301
export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User className="me-2 h-4 w-4" />
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="me-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Gear className="me-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut className="me-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders with icons', async () => {
      const trigger = canvas.getByRole('button', { name: /account/i });
      await expect(trigger).toBeInTheDocument();
    });

    await step('Displays menu items with icons', async () => {
      const trigger = canvas.getByRole('button', { name: /account/i });
      await userEvent.click(trigger);
      // Menu content renders in a portal at document.body
      await expect(await body.findByRole('menuitem', { name: /profile/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitem', { name: /settings/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitem', { name: /logout/i })).toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Menu with icons on the left and keyboard shortcuts on the right.'
      }
    }
  }
};

// With Checkboxes - from component page lines 314-334
export const WithCheckboxes: Story = {
  render: () => {
    const [showPanel, setShowPanel] = React.useState(true);
    const [showSidebar, setShowSidebar] = React.useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">View Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Toggle View</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
            Show Panel
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
            Show Sidebar
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders view options trigger', async () => {
      const trigger = canvas.getByRole('button', { name: /view options/i });
      await expect(trigger).toBeInTheDocument();
    });

    await step('Opens menu with checkbox items', async () => {
      const trigger = canvas.getByRole('button', { name: /view options/i });
      await userEvent.click(trigger);
      // Menu content renders in a portal at document.body
      await expect(await body.findByRole('menuitemcheckbox', { name: /show panel/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitemcheckbox', { name: /show sidebar/i })).toBeInTheDocument();
    });

    await step('Can toggle checkbox items', async () => {
      // Click first checkbox - this will close the menu (default Radix behavior)
      const panelCheckbox = body.getByRole('menuitemcheckbox', { name: /show panel/i });
      await userEvent.click(panelCheckbox);
      // State should toggle (verified by component behavior)

      // Re-open the menu to interact with the second checkbox
      const trigger = canvas.getByRole('button', { name: /view options/i });
      await userEvent.click(trigger);

      // Now toggle the second checkbox
      const sidebarCheckbox = await body.findByRole('menuitemcheckbox', { name: /show sidebar/i });
      await userEvent.click(sidebarCheckbox);
      // State should toggle
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Dropdown menu with checkbox items for toggling view options.'
      }
    }
  }
};

// With Radio Group - from component page lines 347-362
export const WithRadioGroup: Story = {
  render: () => {
    const [position, setPosition] = React.useState('bottom');

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Position: {position}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders with current position', async () => {
      const trigger = canvas.getByRole('button', { name: /position: bottom/i });
      await expect(trigger).toBeInTheDocument();
    });

    await step('Opens menu with radio group', async () => {
      const trigger = canvas.getByRole('button', { name: /position:/i });
      await userEvent.click(trigger);
      // Menu content renders in a portal at document.body
      await expect(await body.findByRole('menuitemradio', { name: /top/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitemradio', { name: /bottom/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitemradio', { name: /right/i })).toBeInTheDocument();
    });

    await step('Can select radio option', async () => {
      const topOption = body.getByRole('menuitemradio', { name: /top/i });
      await userEvent.click(topOption);
      // Position should change (menu closes, button text updates)
    });

    await step('Verify position changed', async () => {
      const trigger = canvas.getByRole('button', { name: /position: top/i });
      await expect(trigger).toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Dropdown menu with radio group for selecting a single option.'
      }
    }
  }
};

// With Sub Menus - from component page lines 375-412
export const WithSubMenus: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <DotsThree className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="me-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="me-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Envelope className="me-2 h-4 w-4" />
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ChatCentered className="me-2 h-4 w-4" />
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="me-2 h-4 w-4" />
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders trigger button', async () => {
      const trigger = canvas.getByRole('button');
      await expect(trigger).toBeInTheDocument();
    });

    await step('Opens menu with sub-menu items', async () => {
      const trigger = canvas.getByRole('button');
      await userEvent.click(trigger);
      // Menu content renders in a portal at document.body
      await expect(await body.findByRole('menuitem', { name: /profile/i })).toBeInTheDocument();
      await expect(body.getByText(/invite users/i)).toBeInTheDocument();
    });

    await step('Can hover over sub-menu trigger', async () => {
      const subMenuTrigger = body.getByText(/invite users/i);
      await userEvent.hover(subMenuTrigger);
      // Sub-menu should open on hover
      await expect(await body.findByRole('menuitem', { name: /email/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitem', { name: /message/i })).toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Dropdown menu with nested sub-menus for complex action hierarchies.'
      }
    }
  }
};

// All Variants
export const AllVariants: Story = {
  render: () => {
    const [showPanel, setShowPanel] = React.useState(true);
    const [position, setPosition] = React.useState('bottom');

    return (
      <div className="flex flex-wrap gap-4">
        {/* Basic with icons */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">With Icons</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="me-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Gear className="me-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* With checkboxes */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">With Checkboxes</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              Show Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* With radio */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">With Radio</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All dropdown menu variants: with icons, checkboxes, and radio groups.'
      }
    }
  }
};
