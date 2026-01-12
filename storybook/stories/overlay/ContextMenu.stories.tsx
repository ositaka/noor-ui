import type { Meta, StoryObj } from '@storybook/react';
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
  Trash2,
  Edit,
  Star,
  Archive
} from 'lucide-react';
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
  title: 'Overlay/Context Menu',
  component: ContextMenu,
  parameters: {
    layout: 'centered'
  },
  tags: ['!autodocs'],
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
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-full max-w-md h-32 px-4 flex items-center justify-center border-dashed border-2 cursor-context-menu">
          <p className="text-muted-foreground">Right click here</p>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          <Edit className="me-2 h-4 w-4" />
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
          <Trash2 className="me-2 h-4 w-4" />
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
          <Edit className="me-2 h-4 w-4" />
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
          <Trash2 className="me-2 h-4 w-4" />
          <span>Delete</span>
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
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
          <Edit className="me-2 h-4 w-4" />
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
          <Trash2 className="me-2 h-4 w-4" />
          <span>Delete</span>
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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
                <Trash2 className="me-2 h-4 w-4" />
                <span>Delete</span>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
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
              <Edit className="me-2 h-4 w-4" />
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
  globals: {
    direction: 'ltr',
    locale: 'en'
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

// RTL Basic
export const RTLBasic: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-full max-w-md h-32 px-4 flex items-center justify-center border-dashed border-2 cursor-context-menu">
          <p className="text-muted-foreground">انقر بزر الماوس الأيمن هنا</p>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          <Edit className="me-2 h-4 w-4" />
          <span>تعديل</span>
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy className="me-2 h-4 w-4" />
          <span>نسخ</span>
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Share className="me-2 h-4 w-4" />
          <span>مشاركة</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Download className="me-2 h-4 w-4" />
          <span>تحميل</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">
          <Trash2 className="me-2 h-4 w-4" />
          <span>حذف</span>
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Context menu in RTL with Arabic text. Icons and shortcuts position correctly.'
      }
    }
  }
};

// RTL With Icons
export const RTLWithIcons: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="w-64 h-32 flex items-center justify-center border-dashed border-2 cursor-context-menu">
          <p className="text-muted-foreground">انقر بزر الماوس الأيمن</p>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>
          <Edit className="me-2 h-4 w-4" />
          <span>تعديل</span>
          <ContextMenuShortcut>⌘E</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy className="me-2 h-4 w-4" />
          <span>نسخ</span>
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Share className="me-2 h-4 w-4" />
          <span>مشاركة</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">
          <Trash2 className="me-2 h-4 w-4" />
          <span>حذف</span>
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Context menu with icons in RTL. Layout mirrors correctly.'
      }
    }
  }
};

// RTL With Checkboxes
export const RTLWithCheckboxes: Story = {
  render: () => {
    const [showBookmarks, setShowBookmarks] = React.useState(true);
    const [showReadingList, setShowReadingList] = React.useState(false);

    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <Card className="w-64 h-32 flex items-center justify-center border-dashed border-2 cursor-context-menu">
            <p className="text-muted-foreground">انقر بزر الماوس الأيمن للخيارات</p>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>خيارات العرض</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
            إظهار الإشارات المرجعية
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={showReadingList} onCheckedChange={setShowReadingList}>
            إظهار قائمة القراءة
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
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
        story: 'Context menu with checkboxes in RTL. Checkmarks position on the right (start).'
      }
    }
  }
};

// RTL File Explorer
export const RTLFileExplorer: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <div className="space-y-2">
        {['مستند.pdf', 'صورة.png', 'فيديو.mp4'].map((file) => (
          <ContextMenu key={file}>
            <ContextMenuTrigger>
              <div className="flex items-center gap-2 p-3 rounded border hover:bg-accent cursor-context-menu">
                <span className="text-sm">{file}</span>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <Copy className="me-2 h-4 w-4" />
                <span>نسخ</span>
              </ContextMenuItem>
              <ContextMenuItem>
                <Download className="me-2 h-4 w-4" />
                <span>تحميل</span>
              </ContextMenuItem>
              <ContextMenuItem>
                <Star className="me-2 h-4 w-4" />
                <span>إضافة إلى المفضلة</span>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>
                <Archive className="me-2 h-4 w-4" />
                <span>أرشفة</span>
              </ContextMenuItem>
              <ContextMenuItem className="text-destructive">
                <Trash2 className="me-2 h-4 w-4" />
                <span>حذف</span>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
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
        story: 'File explorer pattern in RTL with Arabic filenames and menu items.'
      }
    }
  }
};
