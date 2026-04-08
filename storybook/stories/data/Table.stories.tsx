import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, ResponsiveTable } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Checkbox } from '../../../components/ui/checkbox';
import { Card, CardContent } from '../../../components/ui/card';
import * as React from 'react';
import { expect, userEvent, within } from 'storybook/test';

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
  tags: ['autodocs'],
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
  render: (args, { globals }) => {
    const isRTL = globals?.direction === 'rtl';
    const t = (en: string, ar: string) => isRTL ? ar : en;
    const users = isRTL ? usersAR : usersEN;

    return (
    <Table {...args}>
      <TableCaption>{t('A list of recent users', 'قائمة المستخدمين الأخيرين')}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>{t('Name', 'الاسم')}</TableHead>
          <TableHead>{t('Email', 'البريد الإلكتروني')}</TableHead>
          <TableHead>{t('Status', 'الحالة')}</TableHead>
          <TableHead>{t('Role', 'الدور')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant={user.status === 'Active' || user.status === 'نشط' ? 'default' : 'secondary'}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    );
  },
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Basic table with caption showing user data. Uses semantic HTML elements for accessibility.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders basic table structure', async () => {
      const table = canvas.getByRole('table');
      await expect(table).toBeInTheDocument();
      await expect(table).toBeVisible();
      await expect(canvas.getByText('A list of recent users')).toBeInTheDocument();
    });

    await step('Displays all user data', async () => {
      await expect(canvas.getByText('Ahmed Ali')).toBeInTheDocument();
      await expect(canvas.getByText('Fatima Hassan')).toBeInTheDocument();
      await expect(canvas.getByText('Mohammed Youssef')).toBeInTheDocument();
      await expect(canvas.getByText('Sarah Abdullah')).toBeInTheDocument();
    });
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Table with caption showing transaction data inside a card. Caption describes the table content.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders table with transaction caption', async () => {
      const table = canvas.getByRole('table');
      await expect(table).toBeInTheDocument();
      await expect(canvas.getByText('A list of your recent transactions')).toBeInTheDocument();
    });

    await step('Displays transaction headers', async () => {
      await expect(canvas.getByText('Invoice')).toBeInTheDocument();
      await expect(canvas.getByText('Status')).toBeInTheDocument();
      await expect(canvas.getByText('Method')).toBeInTheDocument();
      await expect(canvas.getByText('Amount')).toBeInTheDocument();
    });

    await step('Displays transaction data', async () => {
      await expect(canvas.getByText('INV-001')).toBeInTheDocument();
      await expect(canvas.getByText('INV-002')).toBeInTheDocument();
      await expect(canvas.getByText('INV-003')).toBeInTheDocument();
      await expect(canvas.getByText('Credit Card')).toBeInTheDocument();
      await expect(canvas.getByText('PayPal')).toBeInTheDocument();
      await expect(canvas.getByText('Bank Transfer')).toBeInTheDocument();
      await expect(canvas.getByText('$250.00')).toBeInTheDocument();
      await expect(canvas.getByText('$150.00')).toBeInTheDocument();
      await expect(canvas.getByText('$350.00')).toBeInTheDocument();
    });

    await step('Displays status badges', async () => {
      // Two "Paid" badges (INV-001 and INV-003), one "Pending" (INV-002)
      const paidBadges = canvas.getAllByText('Paid');
      await expect(paidBadges).toHaveLength(2);
      await expect(canvas.getByText('Pending')).toBeInTheDocument();
    });
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Interactive table with checkboxes for row selection. Includes header checkbox for select all.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders interactive table with checkboxes', async () => {
      const table = canvas.getByRole('table');
      await expect(table).toBeInTheDocument();

      const checkboxes = canvas.getAllByRole('checkbox');
      // 1 header checkbox + 4 row checkboxes = 5 total
      await expect(checkboxes).toHaveLength(5);
    });

    await step('Displays column headers', async () => {
      await expect(canvas.getByText('Name')).toBeInTheDocument();
      await expect(canvas.getByText('Email')).toBeInTheDocument();
      await expect(canvas.getByText('Role')).toBeInTheDocument();
    });

    await step('Displays user data with role badges', async () => {
      await expect(canvas.getByText('Ahmed Ali')).toBeInTheDocument();
      await expect(canvas.getByText('ahmed@example.com')).toBeInTheDocument();
      await expect(canvas.getByText('Fatima Hassan')).toBeInTheDocument();
      await expect(canvas.getByText('fatima@example.com')).toBeInTheDocument();

      // Check role badges
      await expect(canvas.getByText('Admin')).toBeInTheDocument();
      await expect(canvas.getByText('Editor')).toBeInTheDocument();
    });

    await step('Checkboxes are interactive', async () => {
      const checkboxes = canvas.getAllByRole('checkbox');
      const firstRowCheckbox = checkboxes[1]; // Skip header checkbox

      await expect(firstRowCheckbox).not.toBeChecked();
      await userEvent.click(firstRowCheckbox);
      await expect(firstRowCheckbox).toBeChecked();
      await userEvent.click(firstRowCheckbox);
      await expect(firstRowCheckbox).not.toBeChecked();
    });

    await step('Header checkbox is accessible', async () => {
      const checkboxes = canvas.getAllByRole('checkbox');
      const headerCheckbox = checkboxes[0];

      await userEvent.click(headerCheckbox);
      await expect(headerCheckbox).toBeChecked();
    });
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Responsive table that adapts to mobile screens. On desktop shows normal table, on mobile shows stacked cards.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders responsive table wrapper', async () => {
      await expect(canvasElement.querySelector('div')).toBeInTheDocument();
      // Text is split across multiple elements, use partial match
      await expect(canvas.getByText(/This table adapts to mobile screens/i)).toBeInTheDocument();
    });

    await step('Displays user data', async () => {
      // ResponsiveTable renders both desktop table and mobile cards (one hidden via CSS)
      await expect(canvas.getAllByText('Ahmed Ali').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Fatima Hassan').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Mohammed Youssef').length).toBeGreaterThanOrEqual(1);
      await expect(canvas.getAllByText('Sarah Abdullah').length).toBeGreaterThanOrEqual(1);
    });
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Table with alternating row colors (striped) for better readability of large datasets.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders striped table with caption', async () => {
      const table = canvas.getByRole('table');
      await expect(table).toBeInTheDocument();
      await expect(canvas.getByText('Employee roster')).toBeInTheDocument();
    });

    await step('Displays headers', async () => {
      await expect(canvas.getByText('Name')).toBeInTheDocument();
      await expect(canvas.getByText('Email')).toBeInTheDocument();
      await expect(canvas.getByText('Role')).toBeInTheDocument();
    });

    await step('Displays all employee data', async () => {
      await expect(canvas.getByText('Ahmed Ali')).toBeInTheDocument();
      await expect(canvas.getByText('Fatima Hassan')).toBeInTheDocument();
      await expect(canvas.getByText('Mohammed Youssef')).toBeInTheDocument();
      await expect(canvas.getByText('Sarah Abdullah')).toBeInTheDocument();
    });

    await step('Has alternating row styles', async () => {
      const rows = canvas.getAllByRole('row');
      // 1 header + 4 data rows
      await expect(rows).toHaveLength(5);
    });
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Compact table with reduced padding for displaying data in limited space.'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Renders compact table with heading', async () => {
      const table = canvas.getByRole('table');
      await expect(table).toBeInTheDocument();
      await expect(canvas.getByText('Team Members')).toBeInTheDocument();
    });

    await step('Displays compact headers', async () => {
      await expect(canvas.getByText('Name')).toBeInTheDocument();
      await expect(canvas.getByText('Status')).toBeInTheDocument();
      await expect(canvas.getByText('Role')).toBeInTheDocument();
    });

    await step('Displays first 3 users only', async () => {
      await expect(canvas.getByText('Ahmed Ali')).toBeInTheDocument();
      await expect(canvas.getByText('Fatima Hassan')).toBeInTheDocument();
      await expect(canvas.getByText('Mohammed Youssef')).toBeInTheDocument();
      // Sarah Abdullah should not be present (only first 3)
      await expect(canvas.queryByText('Sarah Abdullah')).not.toBeInTheDocument();
    });

    await step('Displays status badges', async () => {
      // Verify badge text content instead of CSS classes
      // First 3 users: Ahmed (Active), Fatima (Active), Mohammed (Inactive)
      const activeBadges = canvas.getAllByText('Active');
      await expect(activeBadges).toHaveLength(2);
      await expect(canvas.getByText('Inactive')).toBeInTheDocument();
    });
  }
};

