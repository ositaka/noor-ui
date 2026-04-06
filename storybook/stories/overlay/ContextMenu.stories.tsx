import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuCheckboxItem,
  ContextMenuShortcut
} from '../../../components/ui/context-menu';
import { Card } from '../../../components/ui/card';
import {
  Copy,
  Share,
  Download,
  Trash,
  PencilSimple,
  Star,
  Archive
} from '@phosphor-icons/react';
import * as React from 'react';

/**
 * Context Menu Component Stories
 *
 * All examples are taken from /app/(docs)/components/context-menu/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Context Menu appears on right-click (or long press on touch devices).
 * Features: Items, checkboxes, shortcuts, icons, RTL support, accessibility.
 */

const meta = {
  title: 'Navigation/Context Menu',
  component: ContextMenu,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onOpenChange: {
      control: false
    }
  }
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Interactive playground with controls
export const Default: Story = {
  args: {
    onOpenChange: fn()
  },
  render: (args) => (
    <ContextMenu onOpenChange={args.onOpenChange}>
      <ContextMenuTrigger>
        <Card className="w-full max-w-md h-32 px-4 flex items-center justify-center border-dashed border-2 cursor-context-menu">
          <p className="text-muted-foreground">Right click here</p>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem onSelect={fn()}>
          <PencilSimple className="me-2 h-4 w-4" />
          <span>Edit</span>
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={fn()}>
          <Copy className="me-2 h-4 w-4" />
          <span>Copy</span>
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={fn()}>
          <Share className="me-2 h-4 w-4" />
          <span>Share</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={fn()}>
          <Download className="me-2 h-4 w-4" />
          <span>Download</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive" onSelect={fn()}>
          <Trash className="me-2 h-4 w-4" />
          <span>Delete</span>
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// Basic Usage - from component page lines 166-199
export const BasicUsage: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-full max-w-md h-32 px-4 flex items-center justify-center border-dashed border-2 cursor-context-menu">
          <p className="text-muted-foreground">Right click here</p>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          <PencilSimple className="me-2 h-4 w-4" />
          <span>Edit</span>
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy className="me-2 h-4 w-4" />
          <span>Copy</span>
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Share className="me-2 h-4 w-4" />
          <span>Share</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Download className="me-2 h-4 w-4" />
          <span>Download</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">
          <Trash className="me-2 h-4 w-4" />
          <span>Delete</span>
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders trigger', async () => {
      const trigger = canvas.getByText('Right click here');
      await expect(trigger).toBeInTheDocument();
    });

    await step('Opens on right-click', async () => {
      const trigger = canvas.getByText('Right click here');
      await userEvent.pointer({ keys: '[MouseRight>]', target: trigger });

      // Context menu renders in portal at document.body
      const editItem = await body.findByRole('menuitem', { name: /edit/i });
      await expect(editItem).toBeInTheDocument();

      // Verify shortcuts are present
      const shortcut = body.getByText('⌘E');
      await expect(shortcut).toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Context menu with icons and keyboard shortcuts. Right-click to open.'
      }
    }
  }
};

// With Icons - from component page lines 226-254
export const WithIcons: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-64 h-32 flex items-center justify-center border-dashed border-2 cursor-context-menu">
          <p className="text-muted-foreground">Right click me</p>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          <PencilSimple className="me-2 h-4 w-4" />
          <span>Edit</span>
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy className="me-2 h-4 w-4" />
          <span>Copy</span>
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Share className="me-2 h-4 w-4" />
          <span>Share</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">
          <Trash className="me-2 h-4 w-4" />
          <span>Delete</span>
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Context menu with icons on the left and keyboard shortcuts on the right.'
      }
    }
  }
};

// With Checkboxes - from component page lines 267-289
export const WithCheckboxes: Story = {
  render: () => {
    const [showBookmarks, setShowBookmarks] = React.useState(true);
    const [showReadingList, setShowReadingList] = React.useState(false);

    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <Card className="w-64 h-32 flex items-center justify-center border-dashed border-2 cursor-context-menu">
            <p className="text-muted-foreground">Right click for options</p>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>View Options</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
            Show Bookmarks
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={showReadingList} onCheckedChange={setShowReadingList}>
            Show Reading List
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Opens context menu', async () => {
      const trigger = canvas.getByText('Right click for options');
      await userEvent.pointer({ keys: '[MouseRight>]', target: trigger });

      // Context menu renders in portal at document.body
      const label = await body.findByText('View Options');
      await expect(label).toBeInTheDocument();
    });

    await step('Shows checkbox items with correct initial states', async () => {
      const bookmarksItem = body.getByRole('menuitemcheckbox', { name: /Show Bookmarks/i });
      const readingListItem = body.getByRole('menuitemcheckbox', { name: /Show Reading List/i });

      await expect(bookmarksItem).toBeInTheDocument();
      await expect(bookmarksItem).toHaveAttribute('data-state', 'checked');
      await expect(readingListItem).toBeInTheDocument();
      await expect(readingListItem).toHaveAttribute('data-state', 'unchecked');
    });

    await step('Toggles checkbox state on click', async () => {
      const readingListItem = body.getByRole('menuitemcheckbox', { name: /Show Reading List/i });
      await userEvent.click(readingListItem);

      // Need to reopen menu to see state change
      const trigger = canvas.getByText('Right click for options');
      await userEvent.pointer({ keys: '[MouseRight>]', target: trigger });

      const updatedItem = await body.findByRole('menuitemcheckbox', { name: /Show Reading List/i });
      await expect(updatedItem).toHaveAttribute('data-state', 'checked');
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Context menu with checkbox items for toggling view options.'
      }
    }
  }
};

// File Explorer - from component page lines 303-334
export const FileExplorer: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <div className="space-y-2">
        {['Document.pdf', 'Image.png', 'Video.mp4'].map((file) => (
          <ContextMenu key={file}>
            <ContextMenuTrigger>
              <div className="flex items-center gap-2 p-3 rounded border hover:bg-accent cursor-context-menu">
                <span className="text-sm">{file}</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <Copy className="me-2 h-4 w-4" />
                <span>Copy</span>
              </ContextMenuItem>
              <ContextMenuItem>
                <Download className="me-2 h-4 w-4" />
                <span>Download</span>
              </ContextMenuItem>
              <ContextMenuItem>
                <Star className="me-2 h-4 w-4" />
                <span>Add to Favorites</span>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Archive className="me-2 h-4 w-4" />
                <span>Archive</span>
              </ContextMenuItem>
              <ContextMenuItem className="text-destructive">
                <Trash className="me-2 h-4 w-4" />
                <span>Delete</span>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('Renders multiple file items', async () => {
      const docFile = canvas.getByText('Document.pdf');
      const imgFile = canvas.getByText('Image.png');
      const vidFile = canvas.getByText('Video.mp4');

      await expect(docFile).toBeInTheDocument();
      await expect(imgFile).toBeInTheDocument();
      await expect(vidFile).toBeInTheDocument();
    });

    await step('Each file has its own context menu', async () => {
      const imgFile = canvas.getByText('Image.png');
      await userEvent.pointer({ keys: '[MouseRight>]', target: imgFile });

      // Context menu renders in portal at document.body
      const copyItem = await body.findByText('Copy');
      const downloadItem = body.getByText('Download');
      const favoritesItem = body.getByText('Add to Favorites');

      await expect(copyItem).toBeInTheDocument();
      await expect(downloadItem).toBeInTheDocument();
      await expect(favoritesItem).toBeInTheDocument();
    });
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'File explorer pattern with context menus for each file.'
      }
    }
  }
};

// All Variants
export const AllVariants: Story = {
  render: () => {
    const [showBookmarks, setShowBookmarks] = React.useState(true);

    return (
      <div className="flex flex-wrap gap-4">
        {/* With Icons */}
        <ContextMenu>
          <ContextMenuTrigger>
            <Card className="w-48 h-24 flex items-center justify-center border-dashed border-2 cursor-context-menu">
              <p className="text-sm text-muted-foreground">With Icons</p>
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuItem>
              <PencilSimple className="me-2 h-4 w-4" />
              <span>Edit</span>
            </ContextMenuItem>
            <ContextMenuItem>
              <Copy className="me-2 h-4 w-4" />
              <span>Copy</span>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        {/* With Checkboxes */}
        <ContextMenu>
          <ContextMenuTrigger>
            <Card className="w-48 h-24 flex items-center justify-center border-dashed border-2 cursor-context-menu">
              <p className="text-sm text-muted-foreground">With Checkboxes</p>
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuLabel>Options</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
              Show Panel
            </ContextMenuCheckboxItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'All context menu variants: with icons and with checkboxes.'
      }
    }
  }
};

