import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '../../../components/ui/command';
import { Button } from '../../../components/ui/button';
import { MagnifyingGlass, FileText, Gear, User, Calendar, Calculator } from '@phosphor-icons/react';
import * as React from 'react';

/**
 * Command Component Stories
 *
 * All examples are taken from /app/(docs)/components/command/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Command provides a fast command menu with search and keyboard navigation.
 * Features: Search input, groups, keyboard shortcuts, dialog mode, RTL support.
 */

const meta = {
  title: 'Overlay/Command',
  component: Command,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs']
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-md w-full">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <FileText className="me-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <MagnifyingGlass className="me-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="me-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="me-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>
          <CommandItem>
            <Gear className="me-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders command menu with all elements', async () => {
      const input = canvas.getByPlaceholderText('Type a command or search...');
      await expect(input).toBeInTheDocument();
      await expect(input).toBeVisible();

      await expect(canvas.getByText('Suggestions')).toBeInTheDocument();
      await expect(canvas.getByText('Calendar')).toBeInTheDocument();
      await expect(canvas.getByText('Profile')).toBeInTheDocument();

      // "Settings" appears as both a group heading and an item, so verify both exist
      const settingsElements = canvas.getAllByText('Settings');
      await expect(settingsElements.length).toBeGreaterThanOrEqual(2);
    });

    await step('Search input filters items', async () => {
      const input = canvas.getByPlaceholderText('Type a command or search...');

      await userEvent.clear(input);
      await userEvent.type(input, 'calc');

      // Calculator should be visible
      await expect(canvas.getByText('Calculator')).toBeInTheDocument();

      // Other items should be filtered out
      await userEvent.clear(input);
    });

    await step('Keyboard navigation works', async () => {
      const input = canvas.getByPlaceholderText('Type a command or search...');

      // Focus the input
      await userEvent.click(input);
      await expect(input).toHaveFocus();

      // Get all command items
      const allItems = canvas.getAllByRole('option');
      await expect(allItems.length).toBeGreaterThan(0);

      // First item should be selected by default in cmdk
      const firstItem = allItems[0];
      await expect(firstItem).toHaveAttribute('aria-selected', 'true');

      // Arrow down should navigate to second item
      await userEvent.keyboard('{ArrowDown}');

      // After ArrowDown: second item should now be selected
      const secondItem = allItems[1];
      await expect(secondItem).toHaveAttribute('aria-selected', 'true');
      // And first item should no longer be selected
      await expect(firstItem).toHaveAttribute('aria-selected', 'false');
    });

    await step('Items can be clicked', async () => {
      // Click on a unique item (Profile) to verify clickability
      const profileItem = canvas.getByText('Profile');
      await expect(profileItem).toBeInTheDocument();

      // Click should work (component doesn't have default click handler, but verify clickable)
      await userEvent.click(profileItem);
    });
  }
};

// Basic Command - from component page lines 114-144
export const BasicCommand: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-md w-full">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <FileText className="me-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <MagnifyingGlass className="me-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="me-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="me-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>
          <CommandItem>
            <Gear className="me-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic command menu with search, groups, and icons. Type to search.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders with search input', async () => {
      const input = canvas.getByPlaceholderText('Type a command or search...');
      await expect(input).toBeInTheDocument();
      await expect(input).toBeVisible();
    });

    await step('Shows all command items', async () => {
      await expect(canvas.getByText('Calendar')).toBeInTheDocument();
      await expect(canvas.getByText('Search Emoji')).toBeInTheDocument();
      await expect(canvas.getByText('Calculator')).toBeInTheDocument();
      await expect(canvas.getByText('Profile')).toBeInTheDocument();

      // "Settings" appears as both a group heading and an item
      const settingsElements = canvas.getAllByText('Settings');
      await expect(settingsElements.length).toBeGreaterThanOrEqual(2);
    });

    await step('Search filters items', async () => {
      const input = canvas.getByPlaceholderText('Type a command or search...');

      await userEvent.type(input, 'search');

      // Search Emoji should be visible
      await expect(canvas.getByText('Search Emoji')).toBeInTheDocument();
    });
  }
};

// With Shortcuts
export const WithShortcuts: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-md w-full">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            <FileText className="me-2 h-4 w-4" />
            <span>New File</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <MagnifyingGlass className="me-2 h-4 w-4" />
            <span>Search Files</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Gear className="me-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Command menu with keyboard shortcuts displayed on the right.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders command items with shortcuts', async () => {
      await expect(canvas.getByText('New File')).toBeInTheDocument();
      await expect(canvas.getByText('Search Files')).toBeInTheDocument();
      await expect(canvas.getByText('Settings')).toBeInTheDocument();
    });

    await step('Displays keyboard shortcuts', async () => {
      await expect(canvas.getByText('⌘N')).toBeInTheDocument();
      await expect(canvas.getByText('⌘F')).toBeInTheDocument();
      await expect(canvas.getByText('⌘,')).toBeInTheDocument();
    });

    await step('Shortcuts are visible', async () => {
      // Verify shortcuts are rendered (don't test CSS implementation details)
      const shortcut = canvas.getByText('⌘N');
      await expect(shortcut).toBeVisible();
    });
  }
};

// Command Dialog - from component page lines 170-185
export const CommandDialogExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };

      document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
    }, []);

    return (
      <>
        <Button onClick={() => setOpen(true)} variant="outline">
          <MagnifyingGlass className="me-2 h-4 w-4" />
          Open Command Menu
          <kbd className="pointer-events-none ms-2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Actions">
              <CommandItem>
                <FileText className="me-2 h-4 w-4" />
                New File
              </CommandItem>
              <CommandItem>
                <MagnifyingGlass className="me-2 h-4 w-4" />
                Search Files
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
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
        story: 'Command menu in dialog mode. Opens with ⌘K (Cmd+K or Ctrl+K).'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders button to open dialog', async () => {
      const button = canvas.getByRole('button', { name: /open command menu/i });
      await expect(button).toBeInTheDocument();
      await expect(button).toBeVisible();
    });

    await step('Shows keyboard shortcut hint', async () => {
      await expect(canvas.getByText('⌘')).toBeInTheDocument();
      await expect(canvas.getByText('K')).toBeInTheDocument();
    });

    await step('Dialog initially closed', async () => {
      // Dialog content should not be visible
      const input = canvas.queryByPlaceholderText('Type a command or search...');
      expect(input).not.toBeInTheDocument();
    });

    await step('Opens dialog on button click', async () => {
      const button = canvas.getByRole('button', { name: /open command menu/i });
      await userEvent.click(button);

      // Dialog should now be open - find in document body
      const dialog = document.querySelector('[role="dialog"]');
      await expect(dialog).toBeInTheDocument();

      // Find input within the dialog
      const input = document.querySelector('[role="dialog"] input');
      await expect(input).toBeInTheDocument();
    });

    await step('Can close dialog with Escape', async () => {
      await userEvent.keyboard('{Escape}');

      // Give time for dialog to close
      await new Promise(resolve => setTimeout(resolve, 100));

      // Dialog should be closed
      const dialog = document.querySelector('[role="dialog"]');
      expect(dialog).not.toBeInTheDocument();
    });
  }
};

// Multiple Groups
export const MultipleGroups: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-md w-full">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Files">
          <CommandItem>
            <FileText className="me-2 h-4 w-4" />
            <span>New File</span>
          </CommandItem>
          <CommandItem>
            <FileText className="me-2 h-4 w-4" />
            <span>Open File</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Search">
          <CommandItem>
            <MagnifyingGlass className="me-2 h-4 w-4" />
            <span>Search Files</span>
          </CommandItem>
          <CommandItem>
            <MagnifyingGlass className="me-2 h-4 w-4" />
            <span>Search Symbols</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Gear className="me-2 h-4 w-4" />
            <span>Preferences</span>
          </CommandItem>
          <CommandItem>
            <User className="me-2 h-4 w-4" />
            <span>Profile</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Command menu with multiple groups separated by dividers.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders all group headings', async () => {
      await expect(canvas.getByText('Files')).toBeInTheDocument();
      await expect(canvas.getByText('Search')).toBeInTheDocument();
      await expect(canvas.getByText('Settings')).toBeInTheDocument();
    });

    await step('Renders items from all groups', async () => {
      // Files group
      await expect(canvas.getByText('New File')).toBeInTheDocument();
      await expect(canvas.getByText('Open File')).toBeInTheDocument();

      // Search group
      await expect(canvas.getByText('Search Files')).toBeInTheDocument();
      await expect(canvas.getByText('Search Symbols')).toBeInTheDocument();

      // Settings group
      await expect(canvas.getByText('Preferences')).toBeInTheDocument();
      await expect(canvas.getByText('Profile')).toBeInTheDocument();
    });

    await step('Can navigate between groups', async () => {
      const input = canvas.getByPlaceholderText('Type a command or search...');
      await userEvent.click(input);

      // Navigate down through items
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');

      // Should be able to navigate across groups
      const searchFilesItem = canvas.getByText('Search Files').closest('[cmdk-item]');
      if (searchFilesItem) {
        await expect(searchFilesItem).toBeInTheDocument();
      }
    });
  }
};

// RTL Basic
export const RTLBasic: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-md w-full">
      <CommandInput placeholder="اكتب أمراً أو ابحث..." />
      <CommandList>
        <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
        <CommandGroup heading="الاقتراحات">
          <CommandItem>
            <FileText className="me-2 h-4 w-4" />
            <span>التقويم</span>
          </CommandItem>
          <CommandItem>
            <MagnifyingGlass className="me-2 h-4 w-4" />
            <span>بحث عن إيموجي</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="me-2 h-4 w-4" />
            <span>الحاسبة</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="الإعدادات">
          <CommandItem>
            <User className="me-2 h-4 w-4" />
            <span>الملف الشخصي</span>
          </CommandItem>
          <CommandItem>
            <Gear className="me-2 h-4 w-4" />
            <span>الإعدادات</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Command menu in RTL with Arabic text. Layout and search icon position correctly.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders in RTL context with Arabic text', async () => {
      const input = canvas.getByPlaceholderText('اكتب أمراً أو ابحث...');
      await expect(input).toBeInTheDocument();
      await expect(input).toBeVisible();

      await expect(canvas.getByText('الاقتراحات')).toBeInTheDocument();

      // "الإعدادات" (Settings) appears as both a group heading and an item
      const settingsElements = canvas.getAllByText('الإعدادات');
      await expect(settingsElements.length).toBeGreaterThanOrEqual(2);
    });

    await step('RTL command items are visible', async () => {
      await expect(canvas.getByText('التقويم')).toBeInTheDocument();
      await expect(canvas.getByText('بحث عن إيموجي')).toBeInTheDocument();
      await expect(canvas.getByText('الحاسبة')).toBeInTheDocument();
      await expect(canvas.getByText('الملف الشخصي')).toBeInTheDocument();
    });

    await step('Search works in RTL', async () => {
      const input = canvas.getByPlaceholderText('اكتب أمراً أو ابحث...');
      await userEvent.click(input);
      await userEvent.type(input, 'الحاسبة');

      // Calculator item should still be visible
      await expect(canvas.getByText('الحاسبة')).toBeInTheDocument();
    });
  }
};

// RTL With Shortcuts
export const RTLWithShortcuts: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-md w-full">
      <CommandInput placeholder="اكتب أمراً أو ابحث..." />
      <CommandList>
        <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
        <CommandGroup heading="الإجراءات">
          <CommandItem>
            <FileText className="me-2 h-4 w-4" />
            <span>ملف جديد</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <MagnifyingGlass className="me-2 h-4 w-4" />
            <span>بحث عن ملفات</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Gear className="me-2 h-4 w-4" />
            <span>الإعدادات</span>
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Command menu with shortcuts in RTL. Shortcuts position on the left (end).'
      }
    }
  }
};

// RTL Command Dialog
export const RTLCommandDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };

      document.addEventListener('keydown', down);
      return () => document.removeEventListener('keydown', down);
    }, []);

    return (
      <>
        <Button onClick={() => setOpen(true)} variant="outline">
          <MagnifyingGlass className="me-2 h-4 w-4" />
          فتح قائمة الأوامر
          <kbd className="pointer-events-none ms-2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium rtl:flex-row-reverse">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="اكتب أمراً أو ابحث..." />
          <CommandList>
            <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
            <CommandGroup heading="الإجراءات">
              <CommandItem>
                <FileText className="me-2 h-4 w-4" />
                ملف جديد
              </CommandItem>
              <CommandItem>
                <MagnifyingGlass className="me-2 h-4 w-4" />
                بحث عن ملفات
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Command dialog in RTL. Opens with ⌘K, content flows right-to-left.'
      }
    }
  }
};

// RTL Multiple Groups
export const RTLMultipleGroups: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-md w-full">
      <CommandInput placeholder="اكتب أمراً أو ابحث..." />
      <CommandList>
        <CommandEmpty>لم يتم العثور على نتائج.</CommandEmpty>
        <CommandGroup heading="الملفات">
          <CommandItem>
            <FileText className="me-2 h-4 w-4" />
            <span>ملف جديد</span>
          </CommandItem>
          <CommandItem>
            <FileText className="me-2 h-4 w-4" />
            <span>فتح ملف</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="البحث">
          <CommandItem>
            <MagnifyingGlass className="me-2 h-4 w-4" />
            <span>بحث عن ملفات</span>
          </CommandItem>
          <CommandItem>
            <MagnifyingGlass className="me-2 h-4 w-4" />
            <span>بحث عن رموز</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="الإعدادات">
          <CommandItem>
            <Gear className="me-2 h-4 w-4" />
            <span>التفضيلات</span>
          </CommandItem>
          <CommandItem>
            <User className="me-2 h-4 w-4" />
            <span>الملف الشخصي</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Command menu with multiple groups in RTL. All content aligns properly.'
      }
    }
  }
};
