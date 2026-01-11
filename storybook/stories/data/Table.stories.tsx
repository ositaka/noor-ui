import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, ResponsiveTable } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Checkbox } from '../../../components/ui/checkbox';
import { Card, CardContent } from '../../../components/ui/card';
import * as React from 'react';

/**
 * Table Component Stories
 *
 * All examples are taken from /app/(docs)/components/table/page.tsx
 * Uses exact same text and data as the component documentation.
 *
 * Note: Table is a responsive component for displaying structured data.
 * Uses semantic HTML with proper text alignment for RTL/LTR support.
 * Includes TableHeader, TableBody, TableRow, TableHead, TableCell, and TableCaption sub-components.
 */

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded'
  },
  tags: ['!autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' }
    }
  }
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for English stories
const usersEN = [
  { id: '1', name: 'Ahmed Ali', email: 'ahmed@example.com', status: 'Active', role: 'Admin' },
  { id: '2', name: 'Fatima Hassan', email: 'fatima@example.com', status: 'Active', role: 'User' },
  { id: '3', name: 'Mohammed Youssef', email: 'mohammed@example.com', status: 'Inactive', role: 'User' },
  { id: '4', name: 'Sarah Abdullah', email: 'sarah@example.com', status: 'Active', role: 'Editor' },
];

// Sample data for Arabic stories
const usersAR = [
  { id: '1', name: 'أحمد علي', email: 'ahmed@example.com', status: 'نشط', role: 'مسؤول' },
  { id: '2', name: 'فاطمة حسن', email: 'fatima@example.com', status: 'نشط', role: 'مستخدم' },
  { id: '3', name: 'محمد يوسف', email: 'mohammed@example.com', status: 'غير نشط', role: 'مستخدم' },
  { id: '4', name: 'سارة عبدالله', email: 'sarah@example.com', status: 'نشط', role: 'محرر' },
];

// Default - Interactive playground with controls (hidden from stories list to avoid ID conflicts)
export const Default: Story = {
  args: {
    className: ''
  },
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  render: (args) => (
    <Table {...args}>
      <TableCaption>A list of recent users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersEN.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      story: {
        inline: false
      }
    }
  }
};

// Basic Table - from component page lines 242-271
export const BasicTable: Story = {
  render: () => (
    <div className="w-full">
      <Table>
        <TableCaption>A list of recent users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersEN.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
        story: 'Basic table with caption showing user data. Uses semantic HTML elements for accessibility.'
      }
    }
  }
};

// With Caption - from component page lines 355-394
export const WithCaption: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableCaption>A list of your recent transactions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV-001</TableCell>
              <TableCell><Badge>Paid</Badge></TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV-002</TableCell>
              <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
              <TableCell>PayPal</TableCell>
              <TableCell>$150.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV-003</TableCell>
              <TableCell><Badge>Paid</Badge></TableCell>
              <TableCell>Bank Transfer</TableCell>
              <TableCell>$350.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Table with caption showing transaction data inside a card. Caption describes the table content.'
      }
    }
  }
};

// Interactive Table with Checkboxes - from component page lines 397-432
export const InteractiveTable: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());

    return (
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersEN.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
        story: 'Interactive table with checkboxes for row selection. Includes header checkbox for select all.'
      }
    }
  }
};

// Mobile Responsive Table - from component page lines 435-483
export const MobileResponsiveTable: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-4">
          This table adapts to mobile screens by showing a 2-column layout (label + value) instead of horizontal scrolling. Resize your browser to see it in action.
        </p>
        <ResponsiveTable headers={['Name', 'Email', 'Status', 'Role']}>
          <TableBody>
            {usersEN.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ResponsiveTable>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Responsive table that adapts to mobile screens. On desktop shows normal table, on mobile shows stacked cards.'
      }
    }
  }
};

// Striped Rows
export const StripedRows: Story = {
  render: () => (
    <div className="w-full">
      <Table>
        <TableCaption>Employee roster</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersEN.map((user, index) => (
            <TableRow
              key={user.id}
              className={index % 2 === 0 ? 'bg-muted/50' : ''}
            >
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
        story: 'Table with alternating row colors (striped) for better readability of large datasets.'
      }
    }
  }
};

// Compact Table
export const CompactTable: Story = {
  render: () => (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-6">
        <h3 className="text-sm font-medium mb-4">Team Members</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-8 px-2">Name</TableHead>
              <TableHead className="h-8 px-2">Status</TableHead>
              <TableHead className="h-8 px-2">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersEN.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell className="p-2 text-sm">{user.name}</TableCell>
                <TableCell className="p-2 text-sm">
                  <Badge variant="outline" className="h-5 text-xs">{user.status}</Badge>
                </TableCell>
                <TableCell className="p-2 text-sm">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'ltr',
    locale: 'en'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Compact table with reduced padding for displaying data in limited space.'
      }
    }
  }
};

// RTL Example - Basic Table
export const RTLExample: Story = {
  render: () => (
    <div className="w-full">
      <Table>
        <TableCaption>قائمة بالمستخدمين الحديثين</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>البريد الإلكتروني</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الدور</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersAR.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.status === 'نشط' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
        story: 'Basic table in RTL mode with Arabic text. Text alignment uses text-start for proper RTL display.'
      }
    }
  }
};

// RTL With Caption
export const RTLWithCaption: Story = {
  render: () => (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableCaption>قائمة بمعاملاتك الأخيرة</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>الفاتورة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>الطريقة</TableHead>
              <TableHead>المبلغ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV-001</TableCell>
              <TableCell><Badge>مدفوع</Badge></TableCell>
              <TableCell>بطاقة ائتمان</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV-002</TableCell>
              <TableCell><Badge variant="secondary">قيد الانتظار</Badge></TableCell>
              <TableCell>باي بال</TableCell>
              <TableCell>$150.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV-003</TableCell>
              <TableCell><Badge>مدفوع</Badge></TableCell>
              <TableCell>تحويل بنكي</TableCell>
              <TableCell>$350.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ),
  globals: {
    direction: 'rtl',
    locale: 'ar'
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Transaction table in RTL with Arabic text. All content flows naturally right-to-left.'
      }
    }
  }
};

// RTL Interactive Table
export const RTLInteractiveTable: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set());

    return (
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الدور</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersAR.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
        story: 'Interactive table with checkboxes in RTL mode. Checkbox positioning adapts to RTL layout.'
      }
    }
  }
};

// RTL Striped Rows
export const RTLStripedRows: Story = {
  render: () => (
    <div className="w-full">
      <Table>
        <TableCaption>قائمة الموظفين</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>البريد الإلكتروني</TableHead>
            <TableHead>الدور</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersAR.map((user, index) => (
            <TableRow
              key={user.id}
              className={index % 2 === 0 ? 'bg-muted/50' : ''}
            >
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
        story: 'Striped table in RTL mode with Arabic text. Alternating row colors work perfectly in both directions.'
      }
    }
  }
};
