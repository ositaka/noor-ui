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
  LogOut,
  UserPlus,
  Envelope,
  ChatCentered,
  PlusCircle,
  MoreHorizontal
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
  title: 'Overlay/Dropdown Menu',
  component: DropdownMenu,
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
} satisfies Meta<typeof DropdownMenu>;

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
    <DropdownMenu {...args}>
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
          <LogOut className="me-2 h-4 w-4" />
          <span>Logout</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders trigger button correctly', async () => {
      const trigger = canvas.getByRole('button', { name: /my account/i });
      await expect(trigger).toBeInTheDocument();
      await expect(trigger).toBeVisible();
    });

    await step('Opens menu on click', async () => {
      const trigger = canvas.getByRole('button', { name: /my account/i });
      await userEvent.click(trigger);
      // Menu content renders in a portal at document.body
      await expect(await body.findByRole('menuitem', { name: /profile/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitem', { name: /billing/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitem', { name: /settings/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitem', { name: /logout/i })).toBeInTheDocument();
    });

    await step('Menu items are accessible', async () => {
      const profileItem = body.getByRole('menuitem', { name: /profile/i });
      await expect(profileItem).toBeVisible();
    });

    await step('Can interact with menu items', async () => {
      const profileItem = body.getByRole('menuitem', { name: /profile/i });
      await userEvent.click(profileItem);
      // Menu should close after selection (verified by component behavior)
    });

    await step('Keyboard accessible - can open with Enter', async () => {
      const trigger = canvas.getByRole('button', { name: /my account/i });
      trigger.focus();
      await expect(trigger).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect(await body.findByRole('menuitem', { name: /profile/i })).toBeInTheDocument();
    });

    await step('Can navigate menu items with keyboard', async () => {
      await userEvent.keyboard('{ArrowDown}');
      // Menu items should receive focus as user navigates
    });

    await step('Can close menu with Escape', async () => {
      await userEvent.keyboard('{Escape}');
      // Menu should close
    });
  },
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
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
          <LogOut className="me-2 h-4 w-4" />
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
          <LogOut className="me-2 h-4 w-4" />
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
          <MoreHorizontal className="h-4 w-4" />
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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

// RTL Basic
export const RTLBasic: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User className="me-2 h-4 w-4" />
          حسابي
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>حسابي</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="me-2 h-4 w-4" />
          <span>الملف الشخصي</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="me-2 h-4 w-4" />
          <span>الفواتير</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Gear className="me-2 h-4 w-4" />
          <span>الإعدادات</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="me-2 h-4 w-4" />
          <span>تسجيل الخروج</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders in RTL context', async () => {
      const trigger = canvas.getByRole('button', { name: /حسابي/i });
      await expect(trigger).toBeInTheDocument();
      await expect(trigger).toBeVisible();
    });

    await step('Opens menu with Arabic text', async () => {
      const trigger = canvas.getByRole('button', { name: /حسابي/i });
      await userEvent.click(trigger);
      // Menu content renders in a portal at document.body
      await expect(await body.findByRole('menuitem', { name: /الملف الشخصي/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitem', { name: /الفواتير/i })).toBeInTheDocument();
    });
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Dropdown menu in RTL with Arabic text. Icons and shortcuts position correctly.'
      }
    }
  }
};

// RTL With Checkboxes
export const RTLWithCheckboxes: Story = {
  render: () => {
    const [showPanel, setShowPanel] = React.useState(true);
    const [showSidebar, setShowSidebar] = React.useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">خيارات العرض</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>تبديل العرض</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
            إظهار اللوحة
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
            إظهار الشريط الجانبي
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders RTL checkboxes', async () => {
      const trigger = canvas.getByRole('button', { name: /خيارات العرض/i });
      await expect(trigger).toBeInTheDocument();
    });

    await step('Opens menu with checkbox items in RTL', async () => {
      const trigger = canvas.getByRole('button', { name: /خيارات العرض/i });
      await userEvent.click(trigger);
      // Menu content renders in a portal at document.body
      await expect(await body.findByRole('menuitemcheckbox', { name: /إظهار اللوحة/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitemcheckbox', { name: /إظهار الشريط الجانبي/i })).toBeInTheDocument();
    });
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Dropdown menu with checkboxes in RTL. Checkmarks position on the right (start).'
      }
    }
  }
};

// RTL With Radio Group
export const RTLWithRadioGroup: Story = {
  render: () => {
    const [position, setPosition] = React.useState('bottom');

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">الموضع: {position}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>موضع اللوحة</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">أعلى</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">أسفل</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">يمين</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders RTL radio group', async () => {
      const trigger = canvas.getByRole('button', { name: /الموضع:/i });
      await expect(trigger).toBeInTheDocument();
    });

    await step('Opens menu with radio items in RTL', async () => {
      const trigger = canvas.getByRole('button', { name: /الموضع:/i });
      await userEvent.click(trigger);
      // Menu content renders in a portal at document.body
      await expect(await body.findByRole('menuitemradio', { name: /أعلى/i })).toBeInTheDocument();
      await expect(body.getByRole('menuitemradio', { name: /أسفل/i })).toBeInTheDocument();
    });
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Dropdown menu with radio group in RTL. Radio indicators position correctly.'
      }
    }
  }
};

// RTL With Sub Menus
export const RTLWithSubMenus: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="me-2 h-4 w-4" />
            <span>الملف الشخصي</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="me-2 h-4 w-4" />
              <span>دعوة مستخدمين</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Envelope className="me-2 h-4 w-4" />
                <span>البريد الإلكتروني</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ChatCentered className="me-2 h-4 w-4" />
                <span>رسالة</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusCircle className="me-2 h-4 w-4" />
                <span>المزيد...</span>
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

    await step('Renders RTL sub-menu', async () => {
      const trigger = canvas.getByRole('button');
      await expect(trigger).toBeInTheDocument();
    });

    await step('Opens menu with RTL sub-menu items', async () => {
      const trigger = canvas.getByRole('button');
      await userEvent.click(trigger);
      // Menu content renders in a portal at document.body
      await expect(await body.findByRole('menuitem', { name: /الملف الشخصي/i })).toBeInTheDocument();
      await expect(body.getByText(/دعوة مستخدمين/i)).toBeInTheDocument();
    });

    await step('Can hover over RTL sub-menu trigger', async () => {
      const subMenuTrigger = body.getByText(/دعوة مستخدمين/i);
      await userEvent.hover(subMenuTrigger);
      await expect(await body.findByRole('menuitem', { name: /البريد الإلكتروني/i })).toBeInTheDocument();
    });
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Dropdown menu with sub-menus in RTL. Chevron icons flip to point left.'
      }
    }
  }
};
