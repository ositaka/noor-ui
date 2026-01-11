import type { Meta, StoryObj } from '@storybook/react';
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
import { Search, FileText, Settings, User, Calendar, Calculator } from 'lucide-react';
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
            <Search className="me-2 h-4 w-4" />
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
            <Settings className="me-2 h-4 w-4" />
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
            <Search className="me-2 h-4 w-4" />
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
            <Settings className="me-2 h-4 w-4" />
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
      disable: true,
      description: {
        story: 'Basic command menu with search, groups, and icons. Type to search.'
      }
    }
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
            <Search className="me-2 h-4 w-4" />
            <span>Search Files</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="me-2 h-4 w-4" />
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
      disable: true,
      description: {
        story: 'Command menu with keyboard shortcuts displayed on the right.'
      }
    }
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
          <Search className="me-2 h-4 w-4" />
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
                <Search className="me-2 h-4 w-4" />
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
      disable: true,
      description: {
        story: 'Command menu in dialog mode. Opens with ⌘K (Cmd+K or Ctrl+K).'
      }
    }
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
            <Search className="me-2 h-4 w-4" />
            <span>Search Files</span>
          </CommandItem>
          <CommandItem>
            <Search className="me-2 h-4 w-4" />
            <span>Search Symbols</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Settings className="me-2 h-4 w-4" />
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
      disable: true,
      description: {
        story: 'Command menu with multiple groups separated by dividers.'
      }
    }
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
            <Search className="me-2 h-4 w-4" />
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
            <Settings className="me-2 h-4 w-4" />
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
      disable: true,
      description: {
        story: 'Command menu in RTL with Arabic text. Layout and search icon position correctly.'
      }
    }
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
            <Search className="me-2 h-4 w-4" />
            <span>بحث عن ملفات</span>
            <CommandShortcut>⌘F</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="me-2 h-4 w-4" />
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
      disable: true,
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
          <Search className="me-2 h-4 w-4" />
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
                <Search className="me-2 h-4 w-4" />
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
      disable: true,
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
            <Search className="me-2 h-4 w-4" />
            <span>بحث عن ملفات</span>
          </CommandItem>
          <CommandItem>
            <Search className="me-2 h-4 w-4" />
            <span>بحث عن رموز</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="الإعدادات">
          <CommandItem>
            <Settings className="me-2 h-4 w-4" />
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
      disable: true,
      description: {
        story: 'Command menu with multiple groups in RTL. All content aligns properly.'
      }
    }
  }
};
