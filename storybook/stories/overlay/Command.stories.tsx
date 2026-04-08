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
import { MagnifyingGlass, FileText, Gear, User, Calendar, Calculator } from '@phosphor-icons/react';
import * as React from 'react';

const meta = {
  title: 'Data Display/Command',
  component: Command,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  parameters: {
    controls: { disable: true }
  },
  render: (_args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;

    return (
    <Command className="rounded-lg border shadow-md max-w-md w-full">
      <CommandInput placeholder={t('Type a command or search...', 'اكتب أمراً أو ابحث...')} />
      <CommandList>
        <CommandEmpty>{t('No results found.', 'لم يتم العثور على نتائج.')}</CommandEmpty>
        <CommandGroup heading={t('Suggestions', 'اقتراحات')}>
          <CommandItem>
            <FileText className="me-2 h-4 w-4" />
            <span>{t('Calendar', 'التقويم')}</span>
          </CommandItem>
          <CommandItem>
            <MagnifyingGlass className="me-2 h-4 w-4" />
            <span>{t('Search Emoji', 'بحث عن رموز')}</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="me-2 h-4 w-4" />
            <span>{t('Calculator', 'الآلة الحاسبة')}</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t('Settings', 'الإعدادات')}>
          <CommandItem>
            <User className="me-2 h-4 w-4" />
            <span>{t('Profile', 'الملف الشخصي')}</span>
          </CommandItem>
          <CommandItem>
            <Gear className="me-2 h-4 w-4" />
            <span>{t('Settings', 'الإعدادات')}</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
    );
  },
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
  parameters: {
    controls: { disable: true },
    docs: {
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
  parameters: {
    controls: { disable: true },
    docs: {
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
  parameters: {
    controls: { disable: true },
    docs: {
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Command menu with multiple groups separated by dividers.'
      }
    }
  }
};

